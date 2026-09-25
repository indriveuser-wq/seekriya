import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const providerError = async (provider: string, response: Response) => {
  const body = await response.text();
  let detail = body;
  try {
    const parsed = JSON.parse(body);
    detail = parsed?.error?.message ?? parsed?.error ?? body;
  } catch {
    // Keep the raw response when the provider does not return JSON.
  }

  return json({ error: `${provider} request failed (${response.status}): ${String(detail).slice(0, 500)}` }, 502);
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authorization = request.headers.get("Authorization");
    if (!authorization) return json({ error: "Authentication required." }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authorization } } },
    );
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) return json({ error: "Authentication required." }, 401);

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userData.user.id)
      .maybeSingle();

    const input = await request.json();
    const action = input.action as string;
    const isTeacher = profile?.role === "teacher";
    if (["generate_content", "reindex_module", "curriculum_check"].includes(action) && !isTeacher) {
      return json({ error: "Only teacher accounts can generate curriculum content." }, 403);
    }

    const prompt = action === "generate_content"
      ? `Create a Nepal Grade 10 CDC curriculum draft. Content type: ${input.contentType ?? "question"}. Title hint: ${input.title ?? ""}. Parent reference: ${input.context ?? ""}. Return strict JSON with keys title, body, parentReference. Keep it accurate, concise, and classroom-ready. Do not invent CDC citations.`
      : action === "reindex_module"
      ? `Review this Grade 10 curriculum module for search and question-generation readiness: ${input.title ?? ""}. Context: ${input.context ?? ""}. Return strict JSON with one key message. State that the module was re-indexed and mention one concise quality observation.`
      : action === "curriculum_check"
      ? `Review this list of Nepal Grade 10 curriculum modules for coverage and duplication: ${input.context ?? ""}. Return strict JSON with one key message. Summarize the result in one or two concise sentences.`
      : `Explain this Grade 10 science learning context in simple language for a student: ${input.context ?? ""}. Return strict JSON with key explanation. Include one short example and avoid unsupported claims.`;

    const provider = (Deno.env.get("AI_PROVIDER") ?? "openrouter").toLowerCase();
    const systemPrompt = "You are a careful educational assistant. Return valid JSON only, with no markdown fences.";
    let content: string | undefined;

    if (provider === "gemini") {
      const apiKey = Deno.env.get("GEMINI_API_KEY");
      if (!apiKey) return json({ error: "GEMINI_API_KEY is not configured." }, 503);

      const model = Deno.env.get("GEMINI_MODEL") ?? "gemini-2.0-flash";
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            generationConfig: { temperature: 0.2, responseMimeType: "application/json" },
            contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\n${prompt}` }] }],
          }),
        },
      );
      if (!response.ok) return providerError("Gemini", response);
      const result = await response.json();
      content = result.candidates?.[0]?.content?.parts?.[0]?.text;
    } else {
      const apiKey = Deno.env.get("OPENROUTER_API_KEY");
      if (!apiKey) return json({ error: "OPENROUTER_API_KEY is not configured." }, 503);

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": Deno.env.get("APP_URL") ?? "https://arohan-see.app",
          "X-Title": "Arohan SEE",
        },
        body: JSON.stringify({
          model: Deno.env.get("OPENROUTER_MODEL") ?? "meta-llama/llama-3.3-70b-instruct:free",
          temperature: 0.2,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
        }),
      });
      if (!response.ok) return providerError("OpenRouter", response);
      const result = await response.json();
      content = result.choices?.[0]?.message?.content;
    }

    if (!content) return json({ error: `${provider} returned no content. Check the configured model and provider response.` }, 502);
    const cleaned = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    try {
      return json(JSON.parse(cleaned));
    } catch {
      return json({ error: `${provider} returned invalid JSON.` }, 502);
    }
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "AI request failed." }, 500);
  }
});
