import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ProgressBar from "./ProgressBar";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { BadgeModel } from "../types/progress.types";

const RIGHT_COLOR = {
  amber: colors.amber,
  dark: colors.textPrimary,
  blue: colors.primary,
  gray: colors.textMuted,
};

function BadgeCard({ badge }: { badge: BadgeModel }) {
  return (
    <View style={[styles.card, badge.locked && styles.cardLocked]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconBox, badge.locked && styles.iconBoxLocked]}>
          {badge.emoji ? (
            <Text style={styles.emoji}>{badge.emoji}</Text>
          ) : (
            <MaterialIcons name={badge.icon as any} size={16} color="#9AA1B0" />
          )}
        </View>
        <Text style={[styles.rightLabel, { color: RIGHT_COLOR[badge.rightTone] }]}>
          {badge.rightLabel}
        </Text>
      </View>

      <Text style={[styles.cardTitle, badge.locked && styles.titleLocked]}>{badge.title}</Text>
      <Text style={styles.sub}>{badge.sub}</Text>

      {badge.footer === "claimed" ? (
        <View style={styles.footerRow}>
          <MaterialIcons name="check-circle" size={12} color={colors.primary} />
          <Text style={styles.claimedText}>Claimed</Text>
        </View>
      ) : badge.footer === "bar" ? (
        <ProgressBar
          percent={badge.barPercent ?? 0}
          color={colors.amber}
          trackColor="#E4E7F0"
          height={5}
          style={styles.bar}
        />
      ) : (
        <View style={styles.footerRow}>
          <MaterialIcons name="lock" size={11} color={colors.textMuted} />
          <Text style={styles.lockedText}>Locked</Text>
        </View>
      )}
    </View>
  );
}

export default function BadgesGrid({
  title,
  count,
  badges,
}: {
  title: string;
  count: string;
  badges: BadgeModel[];
}) {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.count}>{count}</Text>
      </View>

      <View style={styles.gridRow}>
        {badges.slice(0, 2).map((badge) => (
          <BadgeCard key={badge.title} badge={badge} />
        ))}
      </View>
      <View style={[styles.gridRow, styles.gridRowSecond]}>
        {badges.slice(2, 4).map((badge) => (
          <BadgeCard key={badge.title} badge={badge} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  count: {
    ...monoText(9, "700"),
    color: colors.purple,
  },
  gridRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  gridRowSecond: {
    marginTop: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#E9EBF5",
    borderRadius: 14,
    padding: 12,
  },
  cardLocked: {
    opacity: 0.55,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.amberSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxLocked: {
    backgroundColor: "#DDE1EA",
  },
  emoji: {
    fontSize: 16,
  },
  rightLabel: {
    ...monoText(8.5, "700"),
  },
  cardTitle: {
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 8,
  },
  titleLocked: {
    color: colors.textSecondary,
  },
  sub: {
    fontSize: 10,
    color: colors.textSecondary,
    lineHeight: 14,
    marginTop: 2,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
  },
  claimedText: {
    ...monoText(8.5, "700"),
    color: colors.primary,
  },
  lockedText: {
    ...monoText(8.5, "600"),
    color: colors.textMuted,
  },
  bar: {
    marginTop: 10,
  },
});