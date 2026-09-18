import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { EvaluationConfig } from "../types/teacherSettings.types";

export default function EvaluationCard({ config }: { config: EvaluationConfig }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons name="rule" size={15} color={colors.primary} />
        <Text style={styles.title}>{config.title}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.rowText}>
          <Text style={styles.rowLabel}>{config.answerModeLabel}</Text>
          <Text style={styles.rowSub}>{config.answerModeSub}</Text>
        </View>
        <MaterialIcons name="tune" size={15} color={colors.textSecondary} />
      </View>

      <View style={styles.row}>
        <View style={styles.rowText}>
          <Text style={styles.rowLabel}>{config.diagramLabel}</Text>
          <Text style={styles.rowSub}>{config.diagramSub}</Text>
        </View>
        <View style={styles.requiredChip}>
          <Text style={styles.requiredText}>{config.diagramChip}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.rowText}>
          <Text style={styles.rowLabel}>{config.guardianLabel}</Text>
          <Text style={styles.rowSub}>{config.guardianSub}</Text>
        </View>
        <View style={styles.enabledChip}>
          <Text style={styles.enabledText}>{config.guardianChip}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    marginHorizontal: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FC",
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  rowText: {
    flex: 1,
    marginRight: 10,
  },
  rowLabel: {
    fontSize: 11.5,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  rowSub: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  requiredChip: {
    backgroundColor: "#F5E7CB",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  requiredText: {
    ...monoText(7.5, "700"),
    color: colors.amber,
    letterSpacing: 0.5,
  },
  enabledChip: {
    backgroundColor: "#CFE0F8",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  enabledText: {
    ...monoText(7.5, "700"),
    color: "#1D4ED8",
    letterSpacing: 0.5,
  },
});