import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { DraftCard } from "../types/questionBank.types";

export default function DraftQuestionCard({
  draft,
  onApprove,
  onEdit,
  onClose,
}: {
  draft: DraftCard;
  onApprove?: () => void;
  onEdit?: () => void;
  onClose?: () => void;
}) {
  const [rubricExpanded, setRubricExpanded] = useState(true);

  return (
    <View style={styles.container}>
      {/* Tags */}
      <View style={styles.tagsRow}>
        <View style={styles.draftTag}>
          <MaterialIcons name="psychology" size={10} color={colors.white} />
          <Text style={styles.draftTagText}>{draft.draftNumber}</Text>
        </View>
        <View style={styles.subjectTag}>
          <Text style={styles.subjectTagText}>{draft.subject}</Text>
        </View>
      </View>

      <Text style={styles.chapter}>{draft.chapter}</Text>

      <View style={styles.marksRow}>
        <View style={styles.marksChip}>
          <Text style={styles.marksChipText}>{draft.marks}</Text>
        </View>
        <View style={styles.bloomChip}>
          <Text style={styles.bloomChipText}>{draft.bloomLevel}</Text>
        </View>
      </View>

      {/* Question Prompt */}
      <View style={styles.promptBox}>
        <View style={styles.promptHeader}>
          <MaterialIcons name="quiz" size={14} color={colors.textPrimary} />
          <Text style={styles.promptLabel}>QUESTION PROMPT</Text>
          <View style={styles.spacer} />
          {draft.nepaliViewAvailable ? (
            <View style={styles.nepaliToggle}>
              <MaterialIcons name="translate" size={12} color={colors.textSecondary} />
              <Text style={styles.nepaliText}>Nepali View</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.promptText}>{draft.questionPrompt}</Text>
      </View>

      {/* Reference */}
      <View style={styles.referenceRow}>
        <MaterialIcons name="link" size={12} color={colors.textSecondary} />
        <Text style={styles.referenceText}>Referenced from: {draft.reference}</Text>
      </View>

      {/* Images */}
      <View style={styles.imagesRow}>
        {draft.images.map((image, index) => (
          <View key={index} style={styles.imageWrap}>
            <Image source={{ uri: image.url }} style={styles.image} resizeMode="cover" />
            <View style={styles.imageCaption}>
              <Text style={styles.imageCaptionText}>{image.caption}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Rubric */}
      <View style={styles.rubricBox}>
        <Pressable
          style={styles.rubricHeader}
          onPress={() => setRubricExpanded(!rubricExpanded)}
        >
          <MaterialIcons name="rule" size={14} color={colors.primary} />
          <Text style={styles.rubricTitle}>{draft.rubricTitle}</Text>
          <View style={styles.spacer} />
          <Text style={styles.rubricTotal}>{draft.rubricTotal}</Text>
          <MaterialIcons
            name={rubricExpanded ? "expand-less" : "expand-more"}
            size={16}
            color={colors.textSecondary}
          />
        </Pressable>

        {rubricExpanded ? (
          <View style={styles.rubricContent}>
            {draft.rubricItems.map((item) => (
              <View key={item.number} style={styles.rubricItem}>
                <Text style={styles.rubricItemNumber}>{item.number}.</Text>
                <View style={styles.rubricItemText}>
                  <Text style={styles.rubricItemTitle}>{item.title}</Text>
                  <Text style={styles.rubricItemDesc}>{item.description}</Text>
                </View>
                <View style={styles.marksBox}>
                  <Text style={styles.marksBoxText}>{item.marks}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      {/* Syllabus Match */}
      <View style={styles.matchRow}>
        <View style={styles.matchBox}>
          <MaterialIcons name="verified" size={12} color={colors.primary} />
          <Text style={styles.matchLabel}>CDC Syllabus Match:</Text>
          <Text style={styles.matchValue}>{draft.syllabusMatch}</Text>
        </View>
        {draft.zeroHallucinations ? (
          <View style={styles.hallucinationBox}>
            <MaterialIcons name="check-circle" size={12} color="#15803D" />
            <Text style={styles.hallucinationText}>Zero Hallucinations Verified</Text>
          </View>
        ) : null}
      </View>

      {/* Deploy Options */}
      <View style={styles.deployBox}>
        <Text style={styles.deployLabel}>DEPLOY APPROVED QUESTION TO:</Text>
        <View style={styles.checkboxesRow}>
          <View style={styles.checkboxRow}>
            <View style={[styles.checkbox, draft.deployOptions.practiceSets && styles.checkboxChecked]}>
              {draft.deployOptions.practiceSets ? (
                <MaterialIcons name="check" size={10} color={colors.white} />
              ) : null}
            </View>
            <Text style={styles.checkboxLabel}>Practice Sets</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={[styles.checkbox, draft.deployOptions.diagnostics && styles.checkboxChecked]}>
              {draft.deployOptions.diagnostics ? (
                <MaterialIcons name="check" size={10} color={colors.white} />
              ) : null}
            </View>
            <Text style={styles.checkboxLabel}>Diagnostics</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={[styles.checkbox, draft.deployOptions.mock2081 && styles.checkboxChecked]}>
              {draft.deployOptions.mock2081 ? (
                <MaterialIcons name="check" size={10} color={colors.white} />
              ) : null}
            </View>
            <Text style={styles.checkboxLabel}>Mock 2081</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name="close" size={16} color={colors.textPrimary} />
        </Pressable>
        <Pressable style={styles.editButton} onPress={onEdit}>
          <MaterialIcons name="edit-note" size={14} color={colors.textPrimary} />
          <Text style={styles.editText}>Edit Rubric</Text>
        </Pressable>
        <Pressable style={styles.approveButton} onPress={onApprove}>
          <MaterialIcons name="check-circle" size={16} color={colors.white} />
          <Text style={styles.approveText}>Approve & Publish</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tagsRow: {
    flexDirection: "row",
    gap: 6,
  },
  draftTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#7C3AED",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  draftTagText: {
    ...monoText(8.5, "700"),
    color: colors.white,
  },
  subjectTag: {
    backgroundColor: "#CFE0F8",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  subjectTagText: {
    ...monoText(8.5, "700"),
    color: "#1D4ED8",
  },
  chapter: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
    marginTop: 6,
  },
  marksRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 6,
  },
  marksChip: {
    backgroundColor: "#F5E7CB",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  marksChipText: {
    ...monoText(8, "700"),
    color: colors.amber,
  },
  bloomChip: {
    backgroundColor: "#E6DDFB",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  bloomChipText: {
    ...monoText(8, "700"),
    color: "#6D28D9",
  },
  promptBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  promptHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  promptLabel: {
    ...monoText(8.5, "700"),
    color: colors.textPrimary,
  },
  spacer: {
    flex: 1,
  },
  nepaliToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  nepaliText: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
  },
  promptText: {
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 17,
  },
  referenceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
  },
  referenceText: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  imagesRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  imageWrap: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },
  imageCaption: {
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginTop: 4,
  },
  imageCaptionText: {
    ...monoText(8, "600"),
    color: colors.white,
    textAlign: "center",
  },
  rubricBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    marginTop: 10,
  },
  rubricHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 10,
  },
  rubricTitle: {
    ...monoText(9.5, "700"),
    color: colors.textPrimary,
  },
  rubricTotal: {
    ...monoText(9, "700"),
    color: colors.primary,
  },
  rubricContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  rubricItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginTop: 8,
  },
  rubricItemNumber: {
    ...monoText(9, "700"),
    color: colors.textPrimary,
  },
  rubricItemText: {
    flex: 1,
  },
  rubricItemTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  rubricItemDesc: {
    fontSize: 10,
    color: colors.textSecondary,
    lineHeight: 14,
    marginTop: 2,
  },
  marksBox: {
    backgroundColor: "#E6DDFB",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  marksBoxText: {
    ...monoText(8.5, "700"),
    color: "#6D28D9",
  },
  matchRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  matchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#DCFCE7",
    borderRadius: 8,
    padding: 8,
  },
  matchLabel: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
  },
  matchValue: {
    ...monoText(9, "700"),
    color: "#15803D",
  },
  hallucinationBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#DCFCE7",
    borderRadius: 8,
    padding: 8,
  },
  hallucinationText: {
    ...monoText(8.5, "700"),
    color: "#15803D",
  },
  deployBox: {
    marginTop: 10,
  },
  deployLabel: {
    ...monoText(8.5, "700"),
    color: colors.textSecondary,
    marginBottom: 8,
  },
  checkboxesRow: {
    flexDirection: "row",
    gap: 12,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    ...monoText(9, "600"),
    color: colors.textPrimary,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingVertical: 12,
  },
  editText: {
    ...monoText(10, "700"),
    color: colors.textPrimary,
  },
  approveButton: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#4338CA",
    borderRadius: 10,
    paddingVertical: 12,
  },
  approveText: {
    ...monoText(10.5, "700"),
    color: colors.white,
  },
});