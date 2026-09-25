import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { ProfileHero } from "../types/progress.types";

const TONE_COLOR = {
  purple: colors.purple,
  amber: colors.amber,
  blue: colors.primary,
};

export default function ProfileHeroCard({ profile }: { profile: ProfileHero }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.avatarWrap}>
          <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{profile.levelBadge}</Text>
          </View>
        </View>

        <View style={styles.nameWrap}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{profile.name}</Text>
            <MaterialIcons name="verified" size={14} color={colors.primary} />
          </View>
          <Text style={styles.role}>{profile.roleLabel}</Text>
        </View>

        <View style={styles.rankWrap}>
          <Text style={styles.rankLabel}>{profile.rankLabel}</Text>
          <Text style={styles.rankValue}>{profile.rankValue}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        {profile.stats.map((stat) => (
          <View key={stat.label} style={styles.statBox}>
            <View style={styles.statLabelRow}>
              {stat.iconKind === "emoji" ? (
                <Text style={styles.statEmoji}>{stat.icon}</Text>
              ) : (
                <MaterialIcons
                  name={(stat.icon === "target" ? "track-changes" : stat.icon) as any}
                  size={12}
                  color={TONE_COLOR[stat.tone]}
                />
              )}
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
            <Text style={[styles.statValue, { color: TONE_COLOR[stat.tone] }]}>{stat.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCE3F4",
    borderRadius: 20,
    padding: 14,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.border,
  },
  levelBadge: {
    position: "absolute",
    bottom: -4,
    left: -4,
    backgroundColor: colors.gold,
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  levelText: {
    ...monoText(7, "800"),
    color: colors.white,
  },
  nameWrap: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  role: {
    fontSize: 10.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rankWrap: {
    alignItems: "flex-end",
  },
  rankLabel: {
    ...monoText(8, "700"),
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  rankValue: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#F4F6FB",
    borderRadius: 12,
    padding: 10,
  },
  statLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statEmoji: {
    fontSize: 11,
  },
  statLabel: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
  },
  statValue: {
    ...monoText(13, "800"),
    marginTop: 5,
  },
});