import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { ReadinessStat } from "../types/dashboard.types";

const SIZE = 132;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ReadinessCard({ readiness }: { readiness: ReadinessStat }) {
  const blueFraction = readiness.masteryPercent / 100;
  const purpleFraction = 0.07;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>TARGET READINESS</Text>
          <View style={styles.labelDot} />
        </View>

        <Text style={styles.title}>SEE Readiness</Text>

        <View style={styles.trackRow}>
          <MaterialCommunityIcons name="check-decagram-outline" size={16} color={colors.purple} />
          <Text style={styles.trackLabel}>{readiness.trackLabel}</Text>
        </View>

        <View style={styles.boxes}>
          <View style={styles.box}>
            <Text style={styles.boxLabel}>SUBJECTS</Text>
            <Text style={styles.boxValue}>{readiness.subjectsActive}</Text>
            <Text style={styles.boxSub}>{readiness.subjectsActiveSub}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxLabel}>ACCURACY</Text>
            <Text style={styles.boxValueBlue}>{readiness.accuracyAvg}</Text>
          </View>
        </View>
      </View>

      <View style={styles.donutWrap}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="#E2E7F2"
            strokeWidth={STROKE}
            fill="none"
          />
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={colors.purple}
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${CIRCUMFERENCE * purpleFraction} ${CIRCUMFERENCE}`}
            transform={`rotate(${-90 + 360 * blueFraction} ${SIZE / 2} ${SIZE / 2})`}
          />
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={colors.primary}
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${CIRCUMFERENCE * blueFraction} ${CIRCUMFERENCE}`}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        </Svg>

        <View style={styles.donutCenter}>
          <View style={styles.donutValueRow}>
            <Text style={styles.donutValue}>{readiness.masteryPercent}</Text>
            <Text style={styles.donutPercent}>%</Text>
          </View>
          <Text style={styles.donutLabel}>MASTERY</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBlue,
    borderRadius: 24,
    padding: 16,
    marginTop: 16,
  },
  left: {
    flex: 1,
    paddingRight: 8,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    ...monoText(10, "700"),
    color: colors.primary,
    letterSpacing: 1,
  },
  labelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 6,
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  trackLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.purple,
  },
  boxes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  box: {
    flex: 1,
    backgroundColor: colors.boxLight,
    borderRadius: 12,
    padding: 12,
  },
  boxLabel: {
    ...monoText(9, "700"),
    color: colors.textSecondary,
    letterSpacing: 0.8,
  },
  boxValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 6,
  },
  boxSub: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 2,
  },
  boxValueBlue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 6,
  },
  donutWrap: {
    width: SIZE,
    height: SIZE,
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
  donutValueRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  donutValue: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  donutPercent: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 2,
  },
  donutLabel: {
    ...monoText(9, "700"),
    color: colors.textSecondary,
    letterSpacing: 1,
    marginTop: 2,
  },
});