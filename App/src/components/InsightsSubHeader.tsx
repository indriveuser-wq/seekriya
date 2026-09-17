import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { InsightsMeta } from "../types/testInsights.types";

export default function InsightsSubHeader({
  meta,
  onBack,
}: {
  meta: InsightsMeta;
  onBack: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable style={styles.backRow} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={15} color={colors.primary} />
          <Text style={styles.hubLabel}>{meta.hubLabel}</Text>
        </Pressable>

        <View style={styles.spacer} />

        <View style={styles.batchChip}>
          <View style={styles.batchDot} />
          <Text style={styles.batchText}>{meta.batchChip}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.completedRow}>
          <MaterialIcons name="verified" size={14} color={colors.primary} />
          <Text style={styles.completedText}>{meta.completedLabel}</Text>
        </View>
        <Text style={styles.evaluatedText}>{meta.evaluatedLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  hubLabel: {
    ...monoText(10, "700"),
    color: colors.primary,
    letterSpacing: 1,
  },
  spacer: {
    flex: 1,
  },
  batchChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E2E5F0",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  batchDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.gold,
  },
  batchText: {
    ...monoText(9, "600"),
    color: colors.textPrimary,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  completedRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    flexShrink: 1,
  },
  completedText: {
    ...monoText(9.5, "600"),
    color: colors.textPrimary,
    lineHeight: 14,
    flexShrink: 1,
  },
  evaluatedText: {
    ...monoText(9, "700"),
    color: colors.primary,
    lineHeight: 14,
    textAlign: "right",
    flexShrink: 1,
  },
});