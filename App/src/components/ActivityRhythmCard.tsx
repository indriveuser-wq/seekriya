import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { CohortData } from "../types/cohort.types";

export default function ActivityRhythmCard({ rhythm }: { rhythm: CohortData["rhythm"] }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.tag}>{rhythm.tag}</Text>
        <View style={styles.chip}>
          <MaterialIcons name="calendar-today" size={10} color={colors.primary} />
          <Text style={styles.chipText}>{rhythm.chip}</Text>
        </View>
      </View>

      <Text style={styles.total}>{rhythm.total}</Text>

      <View style={styles.chart}>
        {rhythm.bars.map((bar, index) => (
          <View key={index} style={styles.barCol}>
            {bar.dot ? <View style={styles.barDot} /> : null}
            <View style={[styles.bar, { height: bar.height, backgroundColor: bar.color }]} />
            <Text style={styles.barDay}>{bar.day}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footerRow}>
        <View style={styles.peakWrap}>
          <View style={styles.peakDot} />
          <Text style={styles.peakNote}>{rhythm.peakNote}</Text>
        </View>
        <View style={styles.participationRow}>
          <MaterialIcons name="verified" size={12} color={colors.primary} />
          <Text style={styles.participation}>{rhythm.participation}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 12,
    marginTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tag: {
    ...monoText(8.5, "700"),
    color: colors.textSecondary,
    letterSpacing: 1,
    flexShrink: 1,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#CFE0F8",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chipText: {
    ...monoText(8.5, "700"),
    color: colors.primary,
  },
  total: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 6,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    height: 96,
    marginTop: 12,
  },
  barCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  barDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.amber,
    marginBottom: 3,
  },
  bar: {
    width: "70%",
    borderRadius: 4,
  },
  barDay: {
    ...monoText(8, "600"),
    color: colors.textSecondary,
    marginTop: 4,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },
  peakWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
  },
  peakDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#4338CA",
    marginTop: 4,
  },
  peakNote: {
    flex: 1,
    fontSize: 9.5,
    color: colors.textSecondary,
    lineHeight: 14,
  },
  participationRow: {
    width: 70,
    alignItems: "center",
    gap: 3,
  },
  participation: {
    ...monoText(8.5, "700"),
    color: colors.primary,
    textAlign: "center",
  },
});