import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { TopicDrillHero } from "../types/topicDrill.types";
import ProgressBar from "./ProgressBar";

export default function TopicHeroCard({ hero }: { hero: TopicDrillHero }) {
  return (
    <View style={styles.container}>
      <View style={styles.chipsRow}>
        <View style={styles.purpleChip}>
          <Text style={styles.purpleChipText}>{hero.chapterChip}</Text>
        </View>
        <View style={styles.blueChip}>
          <Text style={styles.blueChipText}>{hero.weightageChip}</Text>
        </View>
      </View>

      <Text style={styles.title}>{hero.title}</Text>
      <Text style={styles.subtitle}>{hero.subtitle}</Text>

      <View style={styles.innerCard}>
        <View style={styles.masteryRow}>
          <MaterialIcons name="equalizer" size={16} color={colors.primary} />
          <Text style={styles.masteryLabel}>Mastery Index</Text>

          <View style={styles.starsRow}>
            {Array.from({ length: hero.starsTotal }).map((_, i) => (
              <MaterialIcons
                key={i}
                name={i < hero.stars ? "star" : "star-border"}
                size={15}
                color={i < hero.stars ? colors.amber : "#B9BFCE"}
              />
            ))}
          </View>
          <Text style={styles.masteryPercent}>{hero.masteryPercent}%</Text>
        </View>

        <ProgressBar percent={hero.masteryPercent} style={styles.progress} />

        <View style={styles.milestoneRow}>
          <Text style={styles.milestoneLabel}>{hero.milestoneLabel}</Text>
          <Text style={styles.rankDelta}>{hero.rankDelta}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCE3F4",
    borderRadius: 20,
    padding: 16,
  },
  chipsRow: {
    flexDirection: "row",
    gap: 8,
  },
  purpleChip: {
    backgroundColor: "#E4DCF9",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  purpleChipText: {
    ...monoText(9, "700"),
    color: "#6D28D9",
    letterSpacing: 0.6,
  },
  blueChip: {
    backgroundColor: "#CFE0F8",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  blueChipText: {
    ...monoText(9, "700"),
    color: "#1D4ED8",
  },
  title: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 12.5,
    color: colors.textSecondary,
    lineHeight: 19,
    marginTop: 6,
  },
  innerCard: {
    backgroundColor: "#F6F8FC",
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
  },
  masteryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  masteryLabel: {
    ...monoText(11, "600"),
    color: colors.textPrimary,
    flex: 1,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  masteryPercent: {
    ...monoText(13, "800"),
    color: colors.primary,
    marginLeft: 4,
  },
  progress: {
    marginTop: 10,
  },
  milestoneRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 9,
    gap: 8,
  },
  milestoneLabel: {
    ...monoText(9.5, "600"),
    color: colors.textPrimary,
    flexShrink: 1,
  },
  rankDelta: {
    ...monoText(9.5, "700"),
    color: colors.primary,
  },
});