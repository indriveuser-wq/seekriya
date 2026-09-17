import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ProgressBar from "./ProgressBar";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { ResultStatBox } from "../types/testResult.types";

const ICON_COLOR = {
  blue: colors.primary,
  purple: colors.purple,
  amber: colors.amber,
  dark: colors.textPrimary,
};

function StatBox({ stat }: { stat: ResultStatBox }) {
  return (
    <View style={styles.box}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>{stat.label}</Text>
        <MaterialIcons name={stat.icon as any} size={15} color={ICON_COLOR[stat.iconTone]} />
      </View>

      {stat.key !== "tally" ? (
        <View style={styles.valueRow}>
          <Text style={styles.value}>{stat.value}</Text>
          {stat.valueSuffix ? <Text style={styles.suffix}>{stat.valueSuffix}</Text> : null}
        </View>
      ) : null}

      {stat.progress != null ? (
        <View style={styles.progressRow}>
          <ProgressBar percent={stat.progress} style={styles.progress} />
          <Text style={styles.progressLabel}>{stat.progressLabel}</Text>
        </View>
      ) : null}

      {stat.footText ? (
        <Text
          style={[
            stat.footTone === "purple" ? styles.footPurple : styles.footGray,
            stat.key === "subjective" ? styles.footMono : undefined,
          ]}
        >
          {stat.footText}
        </Text>
      ) : null}

      {stat.tally ? (
        <>
          <View style={styles.tallyRow}>
            {stat.tally.dots.map((dot, index) => (
              <View key={index} style={styles.tallyItem}>
                <View style={[styles.tallyDot, { backgroundColor: dot.color }]} />
                <Text style={styles.tallyCount}>{dot.count}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.tallySummary}>{stat.tally.summary}</Text>
        </>
      ) : null}
    </View>
  );
}

export default function ResultStatsGrid({ stats }: { stats: ResultStatBox[] }) {
  const firstRow = stats.slice(0, 2);
  const secondRow = stats.slice(2, 4);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {firstRow.map((stat) => (
          <StatBox key={stat.key} stat={stat} />
        ))}
      </View>
      <View style={[styles.row, styles.rowSecond]}>
        {secondRow.map((stat) => (
          <StatBox key={stat.key} stat={stat} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
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
    ...monoText(8.5, "700"),
    color: colors.textSecondary,
    letterSpacing: 1,
    flexShrink: 1,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginTop: 6,
  },
  value: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  suffix: {
    ...monoText(10, "600"),
    color: colors.textSecondary,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  progress: {
    flex: 1,
    height: 5,
  },
  progressLabel: {
    ...monoText(9, "700"),
    color: colors.primary,
  },
  footPurple: {
    color: colors.purple,
    marginTop: 6,
  },
  footMono: {
    ...monoText(8.5, "700"),
  },
  footGray: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 5,
  },
  tallyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  tallyItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tallyDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  tallyCount: {
    ...monoText(9, "600"),
    color: colors.textPrimary,
  },
  tallySummary: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
    marginTop: 6,
  },
});