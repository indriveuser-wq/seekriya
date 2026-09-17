import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { TestResultHero } from "../types/testResult.types";

const DONUT_SIZE = 150;
const DONUT_STROKE = 10;
const R = (DONUT_SIZE - DONUT_STROKE) / 2;
const C = 2 * Math.PI * R;

export default function ResultHeroCard({ hero }: { hero: TestResultHero }) {
  return (
    <LinearGradient colors={["#DCE4F6", "#E4DDF8"]} start={[0.5, 0]} end={[0.5, 1]} style={styles.container}>
      <View style={styles.chipsRow}>
        <View style={styles.blueChip}>
          <Text style={styles.blueChipText}>{hero.modelChip}</Text>
        </View>
        <View style={styles.beigeChip}>
          <Text style={styles.beigeChipText}>{hero.subjectChip}</Text>
        </View>
      </View>

      <Text style={styles.title}>{hero.title}</Text>

      <View style={styles.donutWrap}>
        <Svg width={DONUT_SIZE} height={DONUT_SIZE}>
          <Circle cx={DONUT_SIZE / 2} cy={DONUT_SIZE / 2} r={R} stroke="#E2E7F2" strokeWidth={DONUT_STROKE} fill="none" />
          <Circle
            cx={DONUT_SIZE / 2}
            cy={DONUT_SIZE / 2}
            r={R}
            stroke={colors.primary}
            strokeWidth={DONUT_STROKE}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${(C * hero.score) / 100} ${C}`}
            transform={`rotate(-90 ${DONUT_SIZE / 2} ${DONUT_SIZE / 2})`}
          />
        </Svg>
        <View style={styles.donutCenter}>
          <View style={styles.scoreRow}>
            <Text style={styles.score}>{hero.score}</Text>
            <Text style={styles.scoreTotal}>{hero.scoreTotal}</Text>
          </View>
          <Text style={styles.aggregate}>{hero.aggregateLabel}</Text>
        </View>
      </View>

      <View style={styles.gradePill}>
        <MaterialIcons name="military-tech" size={16} color={colors.amber} />
        <Text style={styles.gradeText}>{hero.gradeLabel}</Text>
      </View>

      <View style={styles.topPill}>
        <MaterialIcons name="track-changes" size={14} color={colors.crimson} />
        <Text style={styles.topText}>
          <Text style={styles.topBlue}>Top {hero.topValue} </Text>
          <Text style={styles.topDark}>{hero.topMiddle} </Text>
          <Text style={styles.topAmber}>{hero.xpLabel}</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
  },
  chipsRow: {
    flexDirection: "row",
    gap: 8,
  },
  blueChip: {
    backgroundColor: "#CFE0F8",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  blueChipText: {
    ...monoText(8.5, "700"),
    color: "#1D4ED8",
    letterSpacing: 0.6,
  },
  beigeChip: {
    backgroundColor: colors.beige,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  beigeChipText: {
    ...monoText(8.5, "700"),
    color: colors.amber,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 12,
  },
  donutWrap: {
    width: DONUT_SIZE,
    height: DONUT_SIZE,
    marginTop: 16,
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
  scoreRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  score: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  scoreTotal: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 3,
  },
  aggregate: {
    ...monoText(9, "700"),
    color: colors.primary,
    letterSpacing: 1,
    marginTop: 4,
  },
  gradePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E9EBF4",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginTop: 16,
  },
  gradeText: {
    ...monoText(12, "700"),
    color: colors.textPrimary,
  },
  topPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 10,
  },
  topText: {
    ...monoText(10.5, "600"),
  },
  topBlue: {
    color: colors.primary,
    fontWeight: "700",
  },
  topDark: {
    color: colors.textPrimary,
  },
  topAmber: {
    color: colors.amber,
    fontWeight: "700",
  },
});