import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { CalibrationItem } from "../types/aiCalibration.types";

export default function CalibrationItemCard({ item }: { item: CalibrationItem }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.itemTitle}>
          {item.id}. {item.title}
        </Text>
        {item.teacherAdjustment ? (
          <View style={styles.borderlineBadge}>
            <Text style={styles.borderlineText}>Borderline</Text>
          </View>
        ) : null}
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreText}>
            {item.currentMarks} / {item.maxMarks}
          </Text>
        </View>
      </View>

      {item.chemicalEquation ? (
        <View style={styles.equationBox}>
          <Text style={styles.equation}>{item.chemicalEquation}</Text>
          {item.catalyst ? <Text style={styles.catalyst}>{item.catalyst}</Text> : null}
        </View>
      ) : null}

      {item.aiStatus === "confirmed" ? (
        <View style={styles.confirmedBox}>
          <MaterialIcons name="auto-awesome" size={12} color={colors.primary} />
          <Text style={styles.confirmedText}>AI Score Confirmed Correct</Text>
          <Text style={styles.matchText}>{item.aiMatch}</Text>
        </View>
      ) : null}

      {item.aiStatus === "provisional" ? (
        <>
          <View style={styles.provisionalBox}>
            <Text style={styles.provisionalLabel}>AI Provisional Mark:</Text>
            <Text style={styles.provisionalScore}>
              {item.aiScore?.current} / {item.aiScore?.max}
            </Text>
          </View>
          {item.flag ? (
            <View style={styles.flagBox}>
              <MaterialIcons
                name={item.flag.type === "error" ? "error" : "warning"}
                size={12}
                color={colors.crimson}
              />
              <Text style={styles.flagText}>AI Flag: "{item.flag.text}"</Text>
            </View>
          ) : null}
          {item.teacherAdjustment ? (
            <View style={styles.adjustmentRow}>
              <Text style={styles.adjustmentLabel}>RAMESH SIR ADJUSTMENT</Text>
              <Text style={styles.adjustedScore}>
                {item.teacherAdjustment.to} / {item.maxMarks}
              </Text>
              <View style={styles.deltaBadges}>
                <View style={styles.deltaBadgeNegative}>
                  <Text style={styles.deltaText}>-{Math.abs(item.teacherAdjustment.delta).toFixed(1)}</Text>
                </View>
                <View style={styles.deltaBadgePositive}>
                  <Text style={styles.deltaText}>+{item.teacherAdjustment.delta.toFixed(1)}</Text>
                </View>
              </View>
            </View>
          ) : null}
        </>
      ) : null}

      {item.aiStatus === "note" && item.aiNote ? (
        <View style={styles.noteBox}>
          <MaterialIcons name="notes" size={12} color={colors.textSecondary} />
          <Text style={styles.noteText}>AI note: {item.aiNote}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9FC",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  itemTitle: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  borderlineBadge: {
    backgroundColor: colors.beige,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  borderlineText: {
    ...monoText(8, "700"),
    color: colors.amber,
  },
  scoreBadge: {
    backgroundColor: "#E6DDFB",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  scoreText: {
    ...monoText(9, "700"),
    color: "#6D28D9",
  },
  equationBox: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 8,
    marginTop: 6,
  },
  equation: {
    ...monoText(10, "600"),
    color: colors.textPrimary,
  },
  catalyst: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  confirmedBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#DCFCE7",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  confirmedText: {
    flex: 1,
    ...monoText(9.5, "700"),
    color: "#15803D",
  },
  matchText: {
    ...monoText(9, "700"),
    color: "#15803D",
  },
  provisionalBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  provisionalLabel: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
  provisionalScore: {
    ...monoText(10, "700"),
    color: colors.crimson,
  },
  flagBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  flagText: {
    flex: 1,
    ...monoText(9, "600"),
    color: colors.crimson,
  },
  adjustmentRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  adjustmentLabel: {
    ...monoText(9, "800"),
    color: colors.textPrimary,
    marginBottom: 6,
  },
  adjustedScore: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 6,
  },
  deltaBadges: {
    flexDirection: "row",
    gap: 6,
  },
  deltaBadgeNegative: {
    backgroundColor: "#FEE2E2",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  deltaBadgePositive: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  deltaText: {
    ...monoText(9, "800"),
    color: colors.white,
  },
  noteBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  noteText: {
    flex: 1,
    fontSize: 10.5,
    color: colors.textSecondary,
    lineHeight: 15,
  },
});