import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { Trajectory, TrajectoryStep } from "../types/progress.types";

const SIZE = 170;
const RINGS = [
  { radius: 78, color: colors.primary, percent: 68 },
  { radius: 66, color: colors.purple, percent: 54 },
  { radius: 54, color: colors.amber, percent: 40 },
];

const STEP_STYLE: Record<TrajectoryStep["tone"], { bg: string; fg: string; label: string; sub: string }> = {
  blue: { bg: colors.primary, fg: colors.white, label: colors.textPrimary, sub: colors.textSecondary },
  purple: { bg: "#8B5CF6", fg: colors.white, label: "#7C3AED", sub: "#7C3AED" },
  gray: { bg: "#DDE1EA", fg: "#9AA1B0", label: "#9AA1B0", sub: "#B9BFCE" },
};

export default function TrajectoryCard({ trajectory }: { trajectory: Trajectory }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.tagRow}>
          <View style={styles.tagDot} />
          <Text style={styles.tag}>{trajectory.telemetryTag}</Text>
        </View>
        <View style={styles.daysWrap}>
          <View style={styles.daysChip}>
            <Text style={styles.daysChipText}>{trajectory.daysChip}</Text>
          </View>
          <Text style={styles.daysSub}>{trajectory.daysSub}</Text>
        </View>
      </View>

      <Text style={styles.title}>{trajectory.title}</Text>

      <View style={styles.donutWrap}>
        <Svg width={SIZE} height={SIZE}>
          {RINGS.map((ring) => {
            const circumference = 2 * Math.PI * ring.radius;
            return (
              <React.Fragment key={ring.radius}>
                <Circle cx={SIZE / 2} cy={SIZE / 2} r={ring.radius} stroke="#E4E8F2" strokeWidth={8} fill="none" />
                <Circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={ring.radius}
                  stroke={ring.color}
                  strokeWidth={8}
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${(circumference * ring.percent) / 100} ${circumference}`}
                  transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                />
              </React.Fragment>
            );
          })}
        </Svg>

        <View style={styles.donutCenter}>
          <Text style={styles.centerPercent}>{trajectory.centerPercent}</Text>
          <Text style={styles.centerLabel}>{trajectory.centerLabel}</Text>
          <View style={styles.gpaPill}>
            <Text style={styles.gpaText}>{trajectory.gpaPill}</Text>
          </View>
        </View>
      </View>

      <View style={styles.stepsRow}>
        {trajectory.steps.map((step) => {
          const tone = STEP_STYLE[step.tone];
          return (
            <View key={step.label} style={styles.stepCol}>
              <View style={[styles.stepCircle, { backgroundColor: tone.bg }]}>
                <MaterialIcons name={step.icon as any} size={14} color={tone.fg} />
              </View>
              <Text style={[styles.stepLabel, { color: tone.label }]}>{step.label}</Text>
              <Text style={[styles.stepSub, { color: tone.sub }]}>{step.sub}</Text>
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
    borderRadius: 20,
    padding: 16,
    marginTop: 14,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  tag: {
    ...monoText(9, "700"),
    color: colors.primary,
    letterSpacing: 1,
  },
  daysWrap: {
    alignItems: "flex-end",
  },
  daysChip: {
    backgroundColor: colors.crimsonSoft,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  daysChipText: {
    ...monoText(9, "700"),
    color: colors.crimson,
  },
  daysSub: {
    ...monoText(8, "600"),
    color: colors.textSecondary,
    marginTop: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 6,
  },
  donutWrap: {
    width: SIZE,
    height: SIZE,
    alignSelf: "center",
    marginTop: 14,
  },
  donutCenter: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  centerPercent: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  centerLabel: {
    ...monoText(8, "700"),
    color: colors.primary,
    letterSpacing: 1,
    marginTop: 2,
  },
  gpaPill: {
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 6,
  },
  gpaText: {
    ...monoText(8, "700"),
    color: colors.purple,
  },
  stepsRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  stepCol: {
    flex: 1,
    alignItems: "center",
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  stepLabel: {
    ...monoText(9, "700"),
    marginTop: 6,
  },
  stepSub: {
    ...monoText(8, "600"),
    marginTop: 2,
  },
});