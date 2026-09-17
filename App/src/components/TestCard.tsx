import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { ChipModel, TestCardModel } from "../types/testsCenter.types";

const CHIP_STYLES: Record<ChipModel["tone"], { bg: string; fg: string }> = {
  purple: { bg: "#E6DDFB", fg: "#7C3AED" },
  amber: { bg: colors.beige, fg: colors.amber },
  gray: { bg: "#DFE3EE", fg: "#5D6373" },
  blue: { bg: "#CFE0F8", fg: "#1D4ED8" },
};

function Chip({ chip }: { chip: ChipModel }) {
  const tone = CHIP_STYLES[chip.tone];
  return (
    <View style={[styles.chip, { backgroundColor: tone.bg }]}>
      <Text style={[styles.chipText, { color: tone.fg }]}>{chip.label}</Text>
    </View>
  );
}

export default function TestCard({ card, onAction }: { card: TestCardModel; onAction: (id: string) => void }) {
  const actionColor = card.action.tone === "blue" ? colors.primary : "#3A3F4E";

  return (
    <View style={styles.container}>
      {/* Top row */}
      <View style={styles.topRow}>
        <Chip chip={card.statusChip} />
        <Chip chip={card.categoryChip} />
        <View style={styles.spacer} />

        {card.score ? (
          <View style={styles.scoreRow}>
            <Text style={[styles.scoreValue, { color: card.score.gradeTone === "blue" ? colors.primary : colors.amber }]}>
              {card.score.value}
            </Text>
            <Text style={styles.scoreTotal}>/100</Text>
            <View style={[styles.gradeChip, { backgroundColor: card.score.gradeTone === "blue" ? "#CFE0F8" : colors.beige }]}>
              <Text style={[styles.gradeText, { color: card.score.gradeTone === "blue" ? "#1D4ED8" : colors.amber }]}>
                {card.score.grade}
              </Text>
            </View>
          </View>
        ) : card.icon ? (
          <View style={[styles.iconBox, { backgroundColor: card.iconTone === "purple" ? "#E6DDFB" : "#CFE0F8" }]}>
            <MaterialIcons name={card.icon as any} size={18} color={card.iconTone === "purple" ? colors.purple : colors.primary} />
          </View>
        ) : null}
      </View>

      <Text style={styles.title}>{card.title}</Text>
      <Text style={styles.subtitle}>{card.subtitle}</Text>

      {/* Meta row */}
      {card.meta ? (
        <View style={styles.metaRow}>
          {card.meta.hours ? (
            <View style={styles.metaItem}>
              <MaterialIcons name="schedule" size={13} color={colors.amber} />
              <Text style={styles.metaText}>{card.meta.hours}</Text>
            </View>
          ) : null}
          {card.meta.marks ? (
            <View style={styles.metaItem}>
              <MaterialIcons name="assignment" size={13} color={colors.primary} />
              <Text style={styles.metaText}>{card.meta.marks}</Text>
            </View>
          ) : null}
          <View style={styles.spacer} />
          {card.meta.rightChip ? <Chip chip={card.meta.rightChip} /> : null}
        </View>
      ) : null}

      {/* Footnote row */}
      {card.footnote ? (
        <View style={styles.footRow}>
          {card.footnote.left ? <Text style={styles.footLeft}>{card.footnote.left}</Text> : null}
          <View style={styles.spacer} />
          {card.footnote.right ? (
            <View style={styles.footRight}>
              <MaterialIcons
                name={card.footnote.right.icon as any}
                size={12}
                color={card.footnote.right.tone === "amber" ? colors.amber : colors.primary}
              />
              <Text style={[styles.footRightText, { color: card.footnote.right.tone === "amber" ? colors.amber : colors.primary }]}>
                {card.footnote.right.label}
              </Text>
            </View>
          ) : null}
        </View>
      ) : null}

      {/* Action button */}
      <Pressable style={({ pressed }) => [styles.action, pressed && styles.pressed]} onPress={() => onAction(card.id)}>
        <Text style={[styles.actionText, { color: actionColor }]}>{card.action.label}</Text>
        <MaterialIcons
          name={
            card.action.icon === "chevron"
              ? "chevron-right"
              : card.action.icon === "arrow"
              ? "arrow-forward"
              : "visibility"
          }
          size={14}
          color={actionColor}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 18,
    padding: 14,
    marginTop: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chipText: {
    ...monoText(8.5, "700"),
    letterSpacing: 0.5,
  },
  spacer: {
    flex: 1,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  scoreValue: {
    ...monoText(15, "800"),
  },
  scoreTotal: {
    ...monoText(9),
    color: colors.textSecondary,
  },
  gradeChip: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginLeft: 2,
  },
  gradeText: {
    ...monoText(9, "800"),
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginTop: 3,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaText: {
    ...monoText(9.5, "600"),
    color: colors.textPrimary,
  },
  footRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  footLeft: {
    ...monoText(9.5),
    color: colors.textSecondary,
  },
  footRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  footRightText: {
    ...monoText(9.5, "700"),
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#DFE3EE",
    borderRadius: 10,
    paddingVertical: 11,
    marginTop: 12,
  },
  pressed: {
    opacity: 0.85,
  },
  actionText: {
    ...monoText(10.5, "700"),
  },
});