import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ProgressBar from "./ProgressBar";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { CohortStat } from "../types/cohort.types";

const TONE = {
  blue: { bg: "#CFE0F8", fg: colors.primary },
  purple: { bg: "#E6DDFB", fg: "#6D28D9" },
  amber: { bg: "#F5E7CB", fg: colors.amber },
  crimson: { bg: "#F7D9D4", fg: colors.crimson },
  green: { bg: "#D1F0DC", fg: "#15803D" },
};

const VALUE_COLOR = {
  dark: colors.textPrimary,
  amber: colors.amber,
  crimson: colors.crimson,
};

function StatCard({ stat }: { stat: CohortStat }) {
  const iconTone = TONE[stat.iconTone];
  return (
    <View style={styles.card}>
      {stat.badge ? <View style={styles.badgeDot} /> : null}
      <View style={styles.topRow}>
        <View style={[styles.iconBox, { backgroundColor: iconTone.bg }]}>
          <MaterialIcons name={stat.icon as any} size={15} color={iconTone.fg} />
        </View>
        <View style={styles.spacer} />
        {stat.chip ? (
          <View style={[styles.chip, { backgroundColor: TONE[stat.chip.tone].bg }]}>
            {stat.chip.icon ? (
              <MaterialIcons name={stat.chip.icon as any} size={10} color={TONE[stat.chip.tone].fg} />
            ) : null}
            <Text style={[styles.chipText, { color: TONE[stat.chip.tone].fg }]}>{stat.chip.label}</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.label}>{stat.label}</Text>
      <Text style={[styles.value, { color: VALUE_COLOR[stat.valueTone] }]}>{stat.value}</Text>

      {stat.progress != null ? (
        <ProgressBar percent={stat.progress} color="#8B5CF6" height={4} style={styles.bar} />
      ) : null}

      {stat.sub ? (
        <Text style={[styles.sub, stat.subTone === "amber" && styles.subAmber]}>{stat.sub}</Text>
      ) : null}
    </View>
  );
}

export default function CohortStatsGrid({ stats }: { stats: CohortStat[] }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {stats.slice(0, 2).map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </View>
      <View style={[styles.row, styles.rowSecond]}>
        {stats.slice(2, 4).map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  rowSecond: {
    marginTop: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 12,
  },
  badgeDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.crimson,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    flex: 1,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  chipText: {
    ...monoText(8, "700"),
  },
  label: {
    ...monoText(8.5, "700"),
    color: colors.textSecondary,
    letterSpacing: 1,
    marginTop: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 4,
  },
  bar: {
    marginTop: 8,
  },
  sub: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 4,
  },
  subAmber: {
    color: colors.amber,
  },
});