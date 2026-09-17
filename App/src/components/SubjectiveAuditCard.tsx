import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { SubjectiveAudit } from "../types/testResult.types";

export default function SubjectiveAuditCard({ audit }: { audit: SubjectiveAudit }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.questionWrap}>
          <Text style={styles.groupLabel}>{audit.groupLabel}</Text>
          <Text style={styles.question}>{audit.question}</Text>
        </View>
        <View style={styles.scoreCol}>
          <Text style={styles.score}>{audit.score}</Text>
          <Text style={styles.scoreTotal}>{audit.scoreTotal}</Text>
        </View>
      </View>

      <View style={styles.aiPill}>
        <MaterialIcons name="auto-awesome" size={11} color={colors.purple} />
        <Text style={styles.aiPillText}>{audit.aiPill}</Text>
      </View>

      <View style={styles.findingBox}>
        <MaterialIcons name="check-circle-outline" size={16} color={colors.primary} />
        <View style={styles.findingText}>
          <Text style={styles.strengthsTag}>{audit.strengthsTag}</Text>
          <Text style={styles.findingBody}>{audit.strengthsBody}</Text>
        </View>
      </View>

      <View style={[styles.findingBox, styles.missingBox]}>
        <MaterialIcons name="cancel" size={16} color={colors.crimson} />
        <View style={styles.findingText}>
          <Text style={styles.missingTag}>{audit.missingTag}</Text>
          <Text style={styles.findingBody}>{audit.missingBody}</Text>
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
    marginTop: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  questionWrap: {
    flex: 1,
    paddingRight: 10,
  },
  groupLabel: {
    ...monoText(8.5, "700"),
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  question: {
    fontSize: 13.5,
    fontWeight: "700",
    color: colors.textPrimary,
    lineHeight: 20,
    marginTop: 6,
  },
  scoreCol: {
    alignItems: "flex-start",
  },
  score: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primary,
  },
  scoreTotal: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
    marginTop: 2,
  },
  aiPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    backgroundColor: "#E6DDFB",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  aiPillText: {
    ...monoText(8, "700"),
    color: colors.purple,
    letterSpacing: 0.6,
  },
  findingBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F4F6FB",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  missingBox: {
    marginTop: 8,
  },
  findingText: {
    flex: 1,
    marginLeft: 8,
  },
  strengthsTag: {
    ...monoText(9, "700"),
    color: colors.primary,
  },
  missingTag: {
    ...monoText(9, "700"),
    color: colors.crimson,
  },
  findingBody: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 17,
    marginTop: 3,
  },
});