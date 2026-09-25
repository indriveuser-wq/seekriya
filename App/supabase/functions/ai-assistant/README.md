# AI Assistant Function

The app calls this Supabase Edge Function for content drafting and student explanations.

## OpenRouter free model

```bash
supabase functions deploy ai-assistant
supabase secrets set AI_PROVIDER=openrouter
supabase secrets set OPENROUTER_API_KEY=your_openrouter_key
supabase secrets set OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct:free
```

## Gemini

```bash
supabase functions deploy ai-assistant
supabase secrets set AI_PROVIDER=gemini
supabase secrets set GEMINI_API_KEY=your_gemini_key
supabase secrets set GEMINI_MODEL=gemini-2.0-flash
```

Keep provider keys in Supabase secrets only. Never put them in the Expo `.env` file.
