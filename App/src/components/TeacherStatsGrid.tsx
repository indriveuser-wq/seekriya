import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ProgressBar from "./ProgressBar";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { StatCard } from "../types/teacherSettings.types";

const TONE = {
  blue: { bg: "#CFE0F8", fg: colors.primary },
  purple: { bg: "#E6DDFB", fg: "#6D28D9" },
  amber: { bg: "#F5E7CB", fg: colors.amber },
  gray: { bg: "#E2E5F0", fg: "#5D6373" },
};

export default function TeacherStatsGrid({ stats }: { stats: StatCard[] }) {
  const firstRow = stats.slice(0, 2);
  const secondRow = stats.slice(2, 4);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {firstRow.map((stat) => (
          <StatBox key={stat.id} stat={stat} />
        ))}
      </View>
      <View style={[styles.row, styles.rowSecond]}>
        {secondRow.map((stat) => (
          <StatBox key={stat.id} stat={stat} />
        ))}
      </View>
    </View>
  );
}

function StatBox({ stat }: { stat: StatCard }) {
  const tone = TONE[stat.iconTone];

  return (
    <View style={styles.box}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>{stat.label}</Text>
        <MaterialIcons name={stat.icon as any} size={14} color={tone.fg} />
      </View>
      <Text style={styles.value}>{stat.value}</Text>
      {stat.sub ? <Text style={styles.sub}>{stat.sub}</Text> : null}
      {stat.progress != null ? (
        <ProgressBar percent={stat.progress} color={colors.amber} height={4} style={styles.bar} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  rowSecond: {
    marginTop: 10,
  },
  box: {
    flex: 1,
    backgroundColor: "#ECEEF6",
    borderRadius: 14,
    padding: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    ...monoText(8, "700"),
    color: colors.textSecondary,
    letterSpacing: 0.8,
    flexShrink: 1,
  },
  value: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
    marginTop: 6,
  },
  sub: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 3,
  },
  bar: {
    marginTop: 8,
  },
});