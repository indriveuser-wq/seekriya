import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { Velocity } from "../types/progress.types";

const MAX = 90;
const LIGHT_BAR = "#D9DEEA";

export default function VelocityCard({ velocity }: { velocity: Velocity }) {
  return (
    <View style={styles.container}>
      <Text style={styles.tag}>{velocity.tag}</Text>

      <View style={styles.headerRow}>
        <Text style={styles.title}>{velocity.title}</Text>
        <View style={styles.trendRow}>
          <MaterialIcons name="trending-up" size={12} color={colors.primary} />
          <Text style={styles.trendText}>{velocity.trendLabel}</Text>
        </View>
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.total}>{velocity.total}</Text>
        <Text style={styles.totalSub}>{velocity.totalSub}</Text>
      </View>

      <View style={styles.chart}>
        {velocity.bars.map((bar, index) => {
          const isLight = bar.color === LIGHT_BAR;
          return (
            <View key={index} style={styles.barCol}>
              <Text style={[styles.barValue, { color: isLight ? "#9AA1B0" : bar.color }]}>
                {bar.value}
              </Text>
              <View
                style={[
                  styles.bar,
                  { height: Math.max(8, (bar.value / MAX) * 64), backgroundColor: bar.color },
                ]}
              />
              <Text style={styles.barDay}>{bar.day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9EBF5",
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
  },
  tag: {
    ...monoText(8.5, "700"),
    color: colors.primary,
    letterSpacing: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trendText: {
    ...monoText(8.5, "700"),
    color: colors.primary,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginTop: 8,
  },
  total: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  totalSub: {
    flex: 1,
    fontSize: 10.5,
    color: colors.textSecondary,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
    marginTop: 12,
    height: 96,
  },
  barCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  barValue: {
    ...monoText(8, "700"),
    marginBottom: 4,
  },
  bar: {
    width: "68%",
    borderRadius: 4,
  },
  barDay: {
    ...monoText(8, "600"),
    color: "#8A90A0",
    marginTop: 4,
  },
});