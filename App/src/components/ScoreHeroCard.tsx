import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { ScoreHero } from "../types/testInsights.types";

export default function ScoreHeroCard({ hero }: { hero: ScoreHero }) {
  return (
    <View style={styles.container}>
      <View style={styles.chipsRow}>
        <View style={styles.blueChip}>
          <Text style={styles.blueChipText}>{hero.gradeChip}</Text>
        </View>
        <View style={styles.purpleChip}>
          <Text style={styles.purpleChipText}>{hero.unitChip}</Text>
        </View>
      </View>

      <View style={styles.scoreRow}>
        <View style={styles.scoreLeft}>
          <Text style={styles.title} numberOfLines={1}>
            {hero.title}
          </Text>
          <Text style={styles.subtitle}>{hero.subtitle}</Text>
        </View>
        <View style={styles.scoreWrap}>
          <Text style={styles.score}>{hero.score}</Text>
          <Text style={styles.scoreTotal}>{hero.scoreTotal}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>{hero.standingLabel}</Text>
          <View style={styles.statValueRow}>
            <Text style={styles.statValue}>{hero.standingValue}</Text>
            <MaterialIcons name="military-tech" size={14} color={colors.amber} />
          </View>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>{hero.efficiencyLabel}</Text>
          <View style={styles.statValueRow}>
            <Text style={styles.statValue}>{hero.efficiencyValue}</Text>
            <MaterialIcons name="timer" size={14} color={colors.primary} />
          </View>
        </View>
      </View>

      <View style={styles.splitRow}>
        <View style={styles.splitCol}>
          <View style={styles.splitLabelRow}>
            <View style={[styles.dot, { backgroundColor: colors.primary }]} />
            <Text style={styles.splitLabel}>{hero.objectiveLabel}</Text>
          </View>
          <Text style={styles.splitValueBlue}>{hero.objectiveValue}</Text>
        </View>
        <View style={styles.splitCol}>
          <View style={styles.splitLabelRow}>
            <View style={[styles.dot, { backgroundColor: colors.amber }]} />
            <Text style={styles.splitLabel}>{hero.subjectiveLabel}</Text>
          </View>
          <Text style={styles.splitValueAmber}>{hero.subjectiveValue}</Text>
        </View>
      </View>

      <View style={styles.targetRow}>
        <Text style={styles.targetLabel}>{hero.targetLabel}</Text>
        <View style={styles.gapWrap}>
          <Text style={styles.gapLabel}>{hero.gapLabel}</Text>
          <MaterialIcons name="pending-actions" size={12} color={colors.crimson} />
        </View>
      </View>

      <View style={styles.provisionalBox}>
        <View style={styles.provisionalIcon}>
          <MaterialIcons name="auto-awesome" size={13} color={colors.primary} />
        </View>
        <View style={styles.provisionalText}>
          <Text style={styles.provisionalTitle}>{hero.provisionalTitle}</Text>
          <Text style={styles.provisionalSub} numberOfLines={1}>
            {hero.provisionalSub}
          </Text>
        </View>
        <View style={styles.provisionalChip}>
          <Text style={styles.provisionalChipText}>{hero.provisionalChip}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCE3F4",
    borderRadius: 20,
    padding: 14,
    marginTop: 12,
  },
  chipsRow: {
    flexDirection: "row",
    gap: 6,
  },
  blueChip: {
    backgroundColor: "#CFE0F8",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  blueChipText: {
    ...monoText(8.5, "700"),
    color: "#1D4ED8",
    letterSpacing: 0.6,
  },
  purpleChip: {
    backgroundColor: "#E6DDFB",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  purpleChipText: {
    ...monoText(8.5, "700"),
    color: "#7C3AED",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
  },
  scoreLeft: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 10.5,
    color: colors.textSecondary,
    lineHeight: 15,
    marginTop: 3,
  },
  scoreWrap: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  score: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.primary,
  },
  scoreTotal: {
    ...monoText(11, "600"),
    color: colors.textSecondary,
    marginLeft: 3,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#F4F6FB",
    borderRadius: 12,
    padding: 10,
  },
  statLabel: {
    ...monoText(8, "700"),
    color: colors.textSecondary,
    letterSpacing: 0.8,
  },
  statValueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    gap: 6,
  },
  statValue: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
    flexShrink: 1,
  },
  splitRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  splitCol: {
    flex: 1,
  },
  splitLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  splitLabel: {
    ...monoText(9, "600"),
    color: colors.textPrimary,
    flexShrink: 1,
  },
  splitValueBlue: {
    ...monoText(10.5, "700"),
    color: colors.primary,
    marginTop: 4,
  },
  splitValueAmber: {
    ...monoText(10.5, "700"),
    color: colors.amber,
    marginTop: 4,
  },
  targetRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  targetLabel: {
    ...monoText(9, "600"),
    color: colors.textPrimary,
    lineHeight: 14,
    flexShrink: 1,
  },
  gapWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  gapLabel: {
    ...monoText(9, "700"),
    color: colors.crimson,
    lineHeight: 14,
    textAlign: "right",
    flexShrink: 1,
  },
  provisionalBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6EBD9",
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
  },
  provisionalIcon: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: "#CFE0F8",
    alignItems: "center",
    justifyContent: "center",
  },
  provisionalText: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  provisionalTitle: {
    ...monoText(9.5, "700"),
    color: colors.textPrimary,
  },
  provisionalSub: {
    fontSize: 9,
    color: colors.textSecondary,
    marginTop: 2,
  },
  provisionalChip: {
    backgroundColor: colors.beige,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  provisionalChipText: {
    ...monoText(8, "700"),
    color: colors.amber,
    letterSpacing: 0.6,
  },
});