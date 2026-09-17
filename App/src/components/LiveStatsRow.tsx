import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { LiveStat } from "../types/liveExam.types";

export default function LiveStatsRow({ stats }: { stats: LiveStat[] }) {
  return (
    <View style={styles.container}>
      {stats.map((stat) => (
        <View key={stat.label} style={styles.box}>
          <Text style={styles.label}>{stat.label}</Text>
          <View style={styles.valueRow}>
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={[styles.foot, { color: stat.footTone === "purple" ? colors.purple : colors.primary }]}>
              {stat.footLabel}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  box: {
    flex: 1,
    backgroundColor: "#ECEEF6",
    borderRadius: 14,
    padding: 12,
  },
  label: {
    ...monoText(8.5, "700"),
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
    gap: 6,
  },
  value: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  foot: {
    ...monoText(9.5, "700"),
  },
});