import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PrimaryButton from "../components/PrimaryButton";
import TeacherBottomNav from "../components/TeacherBottomNav";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { fetchTeacherContent, saveTeacherContent, TeacherContentItem } from "../services/teacherContent.service";
import { askAI, GeneratedContentDraft } from "../services/ai.service";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "TeacherContent">;
type ContentKind = "Subject" | "Chapter" | "Topic" | "Note" | "Question";

const KINDS: ContentKind[] = ["Subject", "Chapter", "Topic", "Note", "Question"];

export default function TeacherContentScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [kind, setKind] = useState<ContentKind>("Question");
  const [title, setTitle] = useState("");
  const [parent, setParent] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [items, setItems] = useState<TeacherContentItem[]>([]);

  const loadItems = async () => {
    try {
      setItems(await fetchTeacherContent());
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const save = async () => {
    if (!title.trim()) {
      Alert.alert("Title required", `Add a name for this ${kind.toLowerCase()}.`);
      return;
    }
    setSaving(true);
    try {
      const result = await saveTeacherContent({ kind, title, parent, body });
      await loadItems();
      Alert.alert(
        `${kind} saved`,
        result === "saved"
          ? `${title.trim()} was saved to the teacher workspace as a draft.`
          : `${title.trim()} was kept as a local draft until the content migration is deployed.`,
        [{ text: "Done", onPress: () => navigation.goBack() }],
      );
    } catch (error: any) {
      Alert.alert("Could not save draft", error?.message ?? "Try again.");
    } finally {
      setSaving(false);
    }
  };
    const generateWithAI = async () => {
      setGenerating(true);
      try {
        const draft = await askAI<GeneratedContentDraft>({
          action: "generate_content",
          contentType: kind,
          title,
          context: parent || body,
        });
        setTitle(draft.title ?? title);
        setBody(draft.body ?? body);
        setParent(draft.parentReference ?? parent);
        Alert.alert("AI draft ready", "Review the generated content before saving it.");
      } catch (error: any) {
        Alert.alert("AI unavailable", error?.message ?? "Deploy the ai-assistant Edge Function and try again.");
      } finally {
        setGenerating(false);
      }
    };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surfaceLight} />
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={18} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Content Studio</Text>
          <Text style={styles.headerSub}>Add curriculum and assessment content</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionLabel}>CONTENT TYPE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.kindRow}>
          {KINDS.map((item) => (
            <Pressable key={item} style={[styles.kindChip, kind === item && styles.kindChipActive]} onPress={() => setKind(item)}>
              <Text style={[styles.kindText, kind === item && styles.kindTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>{kind.toUpperCase()} DETAILS</Text>
          <Text style={styles.label}>{kind === "Question" ? "QUESTION TITLE" : `${kind.toUpperCase()} NAME`}</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder={kind === "Question" ? "e.g. Explain alkene addition reactions" : `Enter ${kind.toLowerCase()} name`}
            placeholderTextColor={colors.textMuted}
            style={styles.input}
          />

          {kind !== "Subject" ? (
            <>
              <Text style={styles.label}>PARENT {kind === "Question" ? "CHAPTER / TOPIC" : "SUBJECT / PARENT"}</Text>
              <TextInput value={parent} onChangeText={setParent} placeholder="Optional parent reference" placeholderTextColor={colors.textMuted} style={styles.input} />
            </>
          ) : null}

          <Text style={styles.label}>{kind === "Question" ? "PROMPT / MARKING NOTES" : "DESCRIPTION / NOTES"}</Text>
          <TextInput
            value={body}
            onChangeText={setBody}
            placeholder="Add the authoritative curriculum content"
            placeholderTextColor={colors.textMuted}
            style={[styles.input, styles.textArea]}
            multiline
            textAlignVertical="top"
          />

          <PrimaryButton
            title={saving ? "Saving draft" : `Save ${kind.toLowerCase()} draft`}
            loading={saving}
            onPress={save}
            icon={<MaterialIcons name="save" size={17} color={colors.white} />}
          />
            <Pressable style={styles.aiButton} onPress={generateWithAI} disabled={generating}>
              {generating ? <ActivityIndicator size="small" color={colors.purpleDeep} /> : <MaterialIcons name="auto-awesome" size={16} color={colors.purpleDeep} />}
              <Text style={styles.aiButtonText}>{generating ? "Generating with AI..." : "Generate draft with AI"}</Text>
            </Pressable>
        </View>

        <View style={styles.savedSection}>
          <Text style={styles.sectionLabel}>SAVED CONTENT</Text>
          {items.length === 0 ? (
            <Text style={styles.emptyText}>No saved drafts yet.</Text>
          ) : (
            items.map((item) => (
              <View key={item.id} style={styles.savedItem}>
                <View style={styles.savedIcon}>
                  <MaterialIcons name={item.content_type === "question" ? "quiz" : "description"} size={16} color={colors.primary} />
                </View>
                <View style={styles.savedText}>
                  <Text style={styles.savedTitle}>{item.title}</Text>
                  <Text style={styles.savedMeta}>{item.content_type} • {item.status}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <TeacherBottomNav activeKey="notes" bottomInset={insets.bottom} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, backgroundColor: colors.surfaceLight, elevation: 3 },
  backButton: { padding: 8, marginRight: 6 },
  headerText: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: colors.textPrimary },
  headerSub: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  content: { padding: 16, paddingBottom: 24 },
  sectionLabel: { ...monoText(9, "800"), color: colors.textSecondary, letterSpacing: 0.8, marginBottom: 8 },
  kindRow: { gap: 8, paddingBottom: 14 },
  kindChip: { backgroundColor: colors.surface, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 9 },
  kindChipActive: { backgroundColor: colors.primarySoft },
  kindText: { ...monoText(10, "700"), color: colors.textSecondary },
  kindTextActive: { color: colors.primary },
  card: { backgroundColor: colors.surfaceLight, borderRadius: 18, padding: 16, elevation: 3 },
  label: { ...monoText(9, "700"), color: colors.textSecondary, marginTop: 14, marginBottom: 7 },
  input: { minHeight: 48, borderRadius: 11, backgroundColor: colors.inputBg, paddingHorizontal: 12, paddingVertical: 12, color: colors.textPrimary, fontSize: 14 },
  textArea: { minHeight: 130 },
  savedSection: { marginTop: 22 },
  emptyText: { fontSize: 13, color: colors.textSecondary, paddingVertical: 12 },
  savedItem: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surfaceLight, borderRadius: 13, padding: 11, marginTop: 8 },
  savedIcon: { width: 32, height: 32, borderRadius: 9, alignItems: "center", justifyContent: "center", backgroundColor: colors.primarySoft },
  savedText: { flex: 1, marginLeft: 10 },
  savedTitle: { fontSize: 13, fontWeight: "700", color: colors.textPrimary },
  savedMeta: { ...monoText(9, "600"), color: colors.textSecondary, marginTop: 3 },
    aiButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, borderRadius: 11, backgroundColor: colors.purpleSoft, paddingVertical: 11, marginTop: 12 },
    aiButtonText: { ...monoText(10, "700"), color: colors.purpleDeep },
});
