import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import RichText from "./RichText";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { DrillFeedback } from "../types/practiceDrill.types";

const EQUATION_COLOR = {
  blue: colors.primary,
  amber: colors.amber,
  gray: colors.textSecondary,
};

export default function FeedbackCard({ feedback }: { feedback: DrillFeedback }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.checkCircle}>
          <MaterialIcons name="verified" size={16} color={colors.white} />
        </View>

        <View style={styles.titleWrap}>
          <Text style={styles.titleLine}>{feedback.titleLine1}</Text>
          <Text style={styles.titleLine}>{feedback.titleLine2}</Text>
          <Text style={styles.xpLine}>{feedback.xpLine}</Text>
        </View>

        <View style={styles.cohortPill}>
          <Text style={styles.cohortText}>{feedback.cohortLabel}</Text>
        </View>
      </View>

      {/* Rationale */}
      <View style={styles.rationaleBox}>
        <View style={styles.rationaleTagRow}>
          <MaterialIcons name="school" size={13} color={colors.purple} />
          <Text style={styles.rationaleTag}>{feedback.rationaleTag}</Text>
        </View>
        <RichText segments={feedback.rationaleSegments} style={styles.rationaleBody} />
      </View>

      {/* High probability */}
      <View style={styles.highBox}>
        <MaterialIcons name="stars" size={16} color={colors.amber} />
        <View style={styles.highTextWrap}>
          <Text style={styles.highTag}>{feedback.highTag}</Text>
          <Text style={styles.highBody}>{feedback.highBody}</Text>
        </View>
      </View>

      {/* Reaction equation */}
      <View style={styles.equationBox}>
        <Image source={{ uri: feedback.equationImageUrl }} style={styles.equationThumb} />
        <View style={styles.equationTextWrap}>
          <Text style={styles.equationLabel}>{feedback.equationLabel}</Text>
          <Text style={styles.equationRow}>
            {feedback.equationParts.map((part, index) => (
              <Text key={index} style={[styles.equationPart, { color: EQUATION_COLOR[part.tone] }]}>
                {part.text}
              </Text>
            ))}
          </Text>
        </View>
        <View style={styles.equationChip}>
          <Text style={styles.equationChipText}>{feedback.equationChip}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E4E7F3",
    borderRadius: 20,
    padding: 14,
    marginTop: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrap: {
    flex: 1,
    marginLeft: 10,
  },
  titleLine: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
  xpLine: {
    ...monoText(9, "700"),
    color: colors.amber,
    marginTop: 3,
  },
  cohortPill: {
    backgroundColor: "#DFE3EE",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    maxWidth: 100,
  },
  cohortText: {
    ...monoText(9, "700"),
    color: colors.textPrimary,
  },
  rationaleBox: {
    backgroundColor: "#F4F6FB",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  rationaleTagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rationaleTag: {
    ...monoText(9, "700"),
    color: colors.purple,
    letterSpacing: 0.8,
  },
  rationaleBody: {
    fontSize: 13,
    color: "#4A4F5E",
    lineHeight: 21,
    marginTop: 6,
  },
  highBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F8F9FC",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  highTextWrap: {
    flex: 1,
    marginLeft: 8,
  },
  highTag: {
    ...monoText(9, "700"),
    color: colors.amber,
    letterSpacing: 0.6,
  },
  highBody: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
    marginTop: 3,
  },
  equationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FC",
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
  },
  equationThumb: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#2A2E42",
  },
  equationTextWrap: {
    flex: 1,
    marginLeft: 8,
  },
  equationLabel: {
    ...monoText(9, "700"),
    color: colors.textPrimary,
  },
  equationRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
  },
  equationPart: {
    ...monoText(9.5, "700"),
  },
  equationChip: {
    backgroundColor: "#DFE3EE",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 6,
  },
  equationChipText: {
    ...monoText(8.5, "700"),
    color: colors.textPrimary,
  },
});