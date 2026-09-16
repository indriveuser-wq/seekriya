import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { SyllabusCountdown } from "../types/subjects.types";

const DONUT_SIZE = 64;
const DONUT_STROKE = 7;
const R = (DONUT_SIZE - DONUT_STROKE) / 2;
const C = 2 * Math.PI * R;

function MiniDonut({ percent }: { percent: number }) {
  return (
    <View style={styles.donutWrap}>
      <Svg width={DONUT_SIZE} height={DONUT_SIZE}>
        <Circle
          cx={DONUT_SIZE / 2}
          cy={DONUT_SIZE / 2}
          r={R}
          stroke="#DDE3F0"
          strokeWidth={DONUT_STROKE}
          fill="none"
        />
        <Circle
          cx={DONUT_SIZE / 2}
          cy={DONUT_SIZE / 2}
          r={R}
          stroke={colors.primary}
          strokeWidth={DONUT_STROKE}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${(C * percent) / 100} ${C}`}
          transform={`rotate(-90 ${DONUT_SIZE / 2} ${DONUT_SIZE / 2})`}
        />
      </Svg>
      <View style={styles.donutCenter}>
        <Text style={styles.donutText}>{percent}%</Text>
      </View>
    </View>
  );
}

export default function SyllabusCountdownCard({ countdown }: { countdown: SyllabusCountdown }) {
  return (
    <View style={styles.container}>
      {/* Top row: label + days pill */}
      <View style={styles.topRow}>
        <View style={styles.labelRow}>
          <View style={styles.labelDot} />
          <Text style={styles.label}>SEE 2081 COUNTDOWN</Text>
        </View>

        <View style={styles.daysPill}>
          <MaterialIcons name="timer" size={14} color={colors.primary} />
          <Text style={styles.daysValue}>{countdown.daysLeft}</Text>
          <Text style={styles.daysLabel}>Days Left</Text>
        </View>
      </View>

      {/* Middle row: title + donut */}
      <View style={styles.middleRow}>
        <View style={styles.middleLeft}>
          <Text style={styles.title}>{countdown.title}</Text>
          <View style={styles.blueprintRow}>
            <MaterialIcons name="verified-user" size={13} color={colors.primary} />
            <Text style={styles.blueprintText}>{countdown.subtitle}</Text>
          </View>
        </View>
        <MiniDonut percent={countdown.overallPercent} />
      </View>

      {/* Stat boxes */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>{countdown.activeLoadLabel}</Text>
          <Text style={styles.statValueDark}>{countdown.activeLoadValue}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>{countdown.chaptersReadyLabel}</Text>
          <Text style={styles.statValueBlue}>{countdown.chaptersReadyValue}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>{countdown.targetPaceLabel}</Text>
          <Text style={styles.statValueAmber}>{countdown.targetPaceValue}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DFE4F2",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#CFD8EA",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  labelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.amber,
  },
  label: {
    ...monoText(10, "700"),
    color: colors.amber,
    letterSpacing: 1,
  },
  daysPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "#D8DEEC",
  },
  daysValue: {
    ...monoText(15, "800"),
    color: colors.primary,
  },
  daysLabel: {
    ...monoText(10, "600"),
    color: colors.textPrimary,
  },
  middleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  middleLeft: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  blueprintRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  blueprintText: {
    ...monoText(10, "600"),
    color: colors.primary,
    flexShrink: 1,
  },
  donutWrap: {
    width: DONUT_SIZE,
    height: DONUT_SIZE,
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
  donutText: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#F4F6FB",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E1E6F2",
  },
  statLabel: {
    ...monoText(9, "700"),
    color: colors.textSecondary,
    letterSpacing: 0.6,
  },
  statValueDark: {
    ...monoText(14, "700"),
    color: colors.textPrimary,
    marginTop: 5,
  },
  statValueBlue: {
    ...monoText(14, "700"),
    color: colors.primary,
    marginTop: 5,
  },
  statValueAmber: {
    ...monoText(14, "700"),
    color: colors.amber,
    marginTop: 5,
  },
});