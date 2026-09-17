import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { TestsHeader } from "../types/testsCenter.types";

export default function TestsTitleBlock({ header }: { header: TestsHeader }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.countdownChip}>
          <View style={styles.dot} />
          <Text style={styles.countdownText}>{header.countdownChip}</Text>
        </View>

        <View style={styles.spacer} />

        <View style={styles.vettedRow}>
          <MaterialIcons name="verified" size={14} color={colors.primary} />
          <Text style={styles.vettedText}>{header.vettedLabel}</Text>
        </View>
      </View>

      <Text style={styles.title}>{header.title}</Text>
      <Text style={styles.subtitle}>{header.subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  countdownChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.beige,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.amber,
  },
  countdownText: {
    ...monoText(9, "700"),
    color: colors.amber,
    letterSpacing: 0.8,
  },
  spacer: {
    flex: 1,
  },
  vettedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  vettedText: {
    ...monoText(9.5, "700"),
    color: colors.primary,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
});