import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ScanSheetSection from "./ScanSheetSection";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { AnswerEditor, ScanSheet } from "../types/liveExam.types";

interface AnswerEditorCardProps {
  editor: AnswerEditor;
  scanSheet: ScanSheet;
}

export default function AnswerEditorCard({ editor, scanSheet }: AnswerEditorCardProps) {
  const [tab, setTab] = useState<"type" | "scan">("type");
  const [draft, setDraft] = useState(editor.draft);
  const [flagged, setFlagged] = useState(false);

  return (
    <View style={styles.container}>
      {/* Tabs + autosaved */}
      <View style={styles.tabsRow}>
        <View style={styles.tabsContainer}>
          <Pressable style={[styles.tab, tab === "type" && styles.tabActive]} onPress={() => setTab("type")}>
            <MaterialIcons name="edit-note" size={14} color={tab === "type" ? colors.primary : colors.textPrimary} />
            <Text style={[styles.tabText, tab === "type" && styles.tabTextActive]}>{editor.typeTab}</Text>
          </Pressable>

          <Pressable style={[styles.tab, tab === "scan" && styles.tabActive]} onPress={() => setTab("scan")}>
            <MaterialIcons name="photo-camera" size={14} color={tab === "scan" ? colors.primary : colors.textPrimary} />
            <Text style={[styles.tabText, tab === "scan" && styles.tabTextActive]}>{editor.scanTab}</Text>
          </Pressable>
        </View>

        <View style={styles.autosavedRow}>
          <View style={styles.autosavedDot} />
          <Text style={styles.autosavedText}>{editor.autosavedLabel}</Text>
        </View>
      </View>

      {tab === "type" ? (
        <>
          {/* Insert symbols */}
          <View style={styles.insertRow}>
            <Text style={styles.insertLabel}>{editor.insertLabel}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.symbolsScroll} contentContainerStyle={styles.symbolsContent}>
              {editor.symbols.map((symbol) => (
                <Pressable key={symbol} style={styles.symbolButton} onPress={() => setDraft((d) => d + symbol)}>
                  <Text style={styles.symbolText}>{symbol}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Draft text area */}
          <View style={styles.draftBox}>
            <TextInput
              style={styles.draftInput}
              value={draft}
              onChangeText={setDraft}
              multiline
              textAlignVertical="top"
              placeholder="Type your answer…"
              placeholderTextColor={colors.textMuted}
            />

            <View style={styles.draftFooter}>
              <Text style={styles.wordsText}>{editor.wordsLabel}</Text>
              <View style={styles.formatRow}>
                <MaterialIcons name="check-circle" size={13} color={colors.primary} />
                <Text style={styles.formatText}>{editor.formatLabel}</Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <ScanSheetSection
          scanSheet={scanSheet}
          onCamera={() => console.log("launch-camera")}
          onGallery={() => console.log("gallery")}
          onDelete={() => console.log("delete-attachment")}
        />
      )}

      {/* Flag + reset */}
      <View style={styles.flagRow}>
        <Pressable style={styles.flagTouch} onPress={() => setFlagged((v) => !v)}>
          <View style={[styles.flagBox, flagged && styles.flagBoxChecked]}>
            {flagged ? <MaterialIcons name="check" size={13} color={colors.white} /> : null}
          </View>
          <Text style={styles.flagText}>{editor.flagLabel}</Text>
        </Pressable>

        <Pressable onPress={() => setDraft("")}>
          <Text style={styles.resetText}>{editor.resetLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 20,
    padding: 14,
    marginTop: 14,
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#E2E5F0",
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabActive: {
    backgroundColor: colors.white,
  },
  tabText: {
    ...monoText(10.5, "600"),
    color: colors.textPrimary,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: "700",
  },
  autosavedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginLeft: "auto",
  },
  autosavedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  autosavedText: {
    ...monoText(9.5, "700"),
    color: colors.textPrimary,
  },
  insertRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E4E7F0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 12,
  },
  insertLabel: {
    ...monoText(8.5, "700"),
    color: colors.textSecondary,
    letterSpacing: 0.6,
  },
  symbolsScroll: {
    flex: 1,
    height: 30,
    flexGrow: 1,
  },
  symbolsContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingRight: 4,
  },
  symbolButton: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: "#EDEFF6",
    alignItems: "center",
    justifyContent: "center",
  },
  symbolText: {
    ...monoText(11, "600"),
    color: colors.textPrimary,
  },
  draftBox: {
    backgroundColor: "#E9EBF4",
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },
  draftInput: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 24,
    minHeight: 180,
    padding: 0,
  },
  draftFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  wordsText: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
  formatRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  formatText: {
    ...monoText(9.5, "700"),
    color: colors.primary,
  },
  flagRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  flagTouch: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexShrink: 1,
  },
  flagBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#B9BFCE",
    alignItems: "center",
    justifyContent: "center",
  },
  flagBoxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  flagText: {
    ...monoText(11, "600"),
    color: colors.textPrimary,
    flexShrink: 1,
  },
  resetText: {
    ...monoText(9.5, "700"),
    color: colors.textPrimary,
  },
});