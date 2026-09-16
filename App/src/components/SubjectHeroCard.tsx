import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { HeroStat, SubjectHero } from "../types/subjectDetail.types";

const DONUT_SIZE = 60;
const DONUT_STROKE = 7;
const R = (DONUT_SIZE - DONUT_STROKE) / 2;
const C = 2 * Math.PI * R;

const TONE_COLOR: Record<HeroStat["tone"], string> = {
  dark: colors.textPrimary,
  amber: colors.amber,
  blue: colors.primary,
};

export default function SubjectHeroCard({ hero }: { hero: SubjectHero }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.chipsRow}>
          <View style={styles.corePill}>
            <Text style={styles.coreText}>{hero.coreLabel}</Text>
          </View>
          <View style={styles.trackRow}>
            <MaterialIcons name="military-tech" size={12} color={colors.amber} />
            <Text style={styles.trackText}>{hero.trackLabel}</Text>
          </View>
        </View>

        <Text style={styles.title}>{hero.name}</Text>
        <Text style={styles.subtitle}>{hero.nameNe}</Text>

        <View style={styles.statsRow}>
          {hero.stats.map((stat) => (
            <View key={stat.label} style={styles.statBox}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <View style={styles.statValueRow}>
                <Text style={[styles.statValue, { color: TONE_COLOR[stat.tone] }]}>
                  {stat.value}
                </Text>
                {stat.suffix ? <Text style={styles.statSuffix}>{stat.suffix}</Text> : null}
                {stat.sub ? <Text style={styles.statSuffix}>{stat.sub}</Text> : null}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.right}>
        <View style={styles.donutWrap}>
          <Svg width={DONUT_SIZE} height={DONUT_SIZE}>
            <Circle cx={DONUT_SIZE / 2} cy={DONUT_SIZE / 2} r={R} stroke="#DDE3F0" strokeWidth={DONUT_STROKE} fill="none" />
            <Circle
              cx={DONUT_SIZE / 2}
              cy={DONUT_SIZE / 2}
              r={R}
              stroke={colors.primary}
              strokeWidth={DONUT_STROKE}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${(C * hero.masteryPercent) / 100} ${C}`}
              transform={`rotate(-90 ${DONUT_SIZE / 2} ${DONUT_SIZE / 2})`}
            />
          </Svg>
          <View style={styles.donutCenter}>
            <Text style={styles.donutText}>{hero.masteryPercent}%</Text>
          </View>
        </View>
        <Text style={styles.doneLabel}>{hero.doneLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#DFE4F2",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#CFD8EA",
  },
  left: {
    flex: 1,
    paddingRight: 10,
  },
  chipsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  corePill: {
    backgroundColor: colors.primarySoft,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  coreText: {
    ...monoText(8.5, "700"),
    color: colors.primary,
    letterSpacing: 0.6,
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trackText: {
    ...monoText(9, "700"),
    color: colors.amber,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 3,
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
    ...monoText(8, "700"),
    color: colors.textSecondary,
    letterSpacing: 0.6,
  },
  statValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginTop: 5,
    flexWrap: "wrap",
  },
  statValue: {
    ...monoText(14, "800"),
  },
  statSuffix: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
  right: {
    alignItems: "center",
    justifyContent: "center",
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
    ...monoText(12, "800"),
    color: colors.textPrimary,
  },
  doneLabel: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
    marginTop: 6,
  },
});