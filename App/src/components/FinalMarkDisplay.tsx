import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { FinalMark } from "../types/aiCalibration.types";

export default function FinalMarkDisplay({ finalMark }: { finalMark: FinalMark }) {
  return (
    <View style={styles.container}>
      <View style={styles.originalMark}>
        <Text style={styles.originalLabel}>Original AI:</Text>
        <Text style={styles.originalValue}>
          {finalMark.originalAI} / {finalMark.maxMarks}
        </Text>
      </View>
      <View style={styles.calibratedMark}>
        <Text style={styles.calibratedValue}>{finalMark.calibrated}</Text>
        <Text style={styles.calibratedLabel}>/ {finalMark.maxMarks}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ECEEF6",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  originalMark: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  originalLabel: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
  originalValue: {
    ...monoText(10, "700"),
    color: colors.textPrimary,
  },
  calibratedMark: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  calibratedValue: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primary,
  },
  calibratedLabel: {
    ...monoText(11, "600"),
    color: colors.textSecondary,
  },
});