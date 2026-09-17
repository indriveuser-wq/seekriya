import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { TestsStat } from "../types/testsCenter.types";

const VALUE_COLOR: Record<TestsStat["tone"], string> = {
  dark: colors.textPrimary,
  amber: colors.amber,
  purple: colors.purple,
};

const FOOT_COLOR = {
  blue: colors.primary,
  amber: colors.amber,
};

export default function TestsStatsRow({ stats }: { stats: TestsStat[] }) {
  return (
    <View style={styles.container}>
      {stats.map((stat) => (
        <View key={stat.label} style={styles.box}>
          <Text style={styles.label}>{stat.label}</Text>
          <Text style={[styles.value, { color: VALUE_COLOR[stat.tone] }]}>{stat.value}</Text>

          {stat.footPlain ? (
            <Text style={styles.footPlain}>{stat.footPlain}</Text>
          ) : (
            <View style={styles.footRow}>
              <MaterialIcons
                name={stat.footIcon as any}
                size={11}
                color={FOOT_COLOR[stat.footTone ?? "blue"]}
              />
              <Text style={[styles.footLabel, { color: FOOT_COLOR[stat.footTone ?? "blue"] }]}>
                {stat.footLabel}
              </Text>
            </View>
          )}
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
    alignItems: "center",
  },
  label: {
    ...monoText(8.5, "700"),
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  value: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 6,
  },
  footRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  footLabel: {
    ...monoText(8.5, "700"),
  },
  footPlain: {
    ...monoText(8.5, "600"),
    color: colors.textPrimary,
    marginTop: 6,
  },
});