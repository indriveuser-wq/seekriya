import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import RichText from "./RichText";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { DraftCardModel } from "../types/teacher.types";

interface DraftQueueCardProps {
  draft: DraftCardModel;
  onReject?: (id: string) => void;
  onEdit?: (id: string) => void;
  onApprove?: (id: string) => void;
}

export default function DraftQueueCard({ draft, onReject, onEdit, onApprove }: DraftQueueCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.chipsRow}>
        <View style={styles.draftChip}>
          <MaterialIcons name="psychology" size={10} color={colors.white} />
          <Text style={styles.draftChipText}>{draft.draftChip}</Text>
        </View>
        <Text style={styles.marksLabel}>{draft.marksLabel}</Text>
        <View style={styles.spacer} />
        <View style={styles.specRow}>
          <MaterialIcons name="verified-user" size={12} color={colors.primary} />
          <Text style={styles.specText}>{draft.specLabel}</Text>
        </View>
      </View>

      <View style={styles.questionBox}>
        <RichText segments={draft.questionSegments} style={styles.questionText} />
      </View>

      <View style={styles.schemeBox}>
        <View style={styles.schemeHeader}>
          <MaterialIcons name="rule" size={13} color={colors.primary} />
          <Text style={styles.schemeTag}>{draft.schemeTag}</Text>
          <View style={styles.spacer} />
          <Text style={styles.schemeTotal}>{draft.schemeTotal}</Text>
        </View>

        {draft.items.map((item) => (
          <View key={item.marks} style={styles.itemRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.itemText}>{item.text}</Text>
            <View style={styles.marksChip}>
              <Text style={styles.marksChipText}>{item.marks}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={styles.rejectButton} onPress={() => onReject?.(draft.id)}>
          <MaterialIcons name="close" size={13} color={colors.crimson} />
          <Text style={styles.rejectText}>{draft.rejectLabel}</Text>
        </Pressable>

        <Pressable style={styles.editButton} onPress={() => onEdit?.(draft.id)}>
          <MaterialIcons name="edit" size={13} color={colors.textPrimary} />
          <Text style={styles.editText}>{draft.editLabel}</Text>
        </Pressable>

        <Pressable style={styles.approveButton} onPress={() => onApprove?.(draft.id)}>
          <MaterialIcons name="check-circle" size={14} color={colors.white} />
          <Text style={styles.approveText}>{draft.approveLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9EBF5",
    borderRadius: 16,
    padding: 12,
    marginTop: 10,
  },
  chipsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  draftChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#8B5CF6",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  draftChipText: {
    ...monoText(8.5, "700"),
    color: colors.white,
  },
  marksLabel: {
    ...monoText(9, "700"),
    color: colors.amber,
  },
  spacer: {
    flex: 1,
  },
  specRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  specText: {
    ...monoText(8.5, "700"),
    color: colors.primary,
  },
  questionBox: {
    backgroundColor: "#F4F6FB",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  questionText: {
    fontSize: 12.5,
    color: colors.textPrimary,
    lineHeight: 19,
  },
  schemeBox: {
    backgroundColor: "#F8F9FC",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  schemeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  schemeTag: {
    ...monoText(8.5, "700"),
    color: colors.primary,
    letterSpacing: 0.8,
  },
  schemeTotal: {
    ...monoText(9, "700"),
    color: colors.textPrimary,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
  },
  bullet: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  itemText: {
    flex: 1,
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginLeft: 4,
    marginRight: 8,
  },
  marksChip: {
    backgroundColor: "#E2E5F0",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  marksChipText: {
    ...monoText(8.5, "700"),
    color: colors.textPrimary,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  rejectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: "#F7D9D4",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rejectText: {
    ...monoText(10, "700"),
    color: colors.crimson,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: "#E2E5F0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  editText: {
    ...monoText(10, "700"),
    color: colors.textPrimary,
  },
  approveButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
  },
  approveText: {
    ...monoText(10.5, "700"),
    color: colors.white,
  },
});