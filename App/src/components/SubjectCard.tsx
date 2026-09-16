import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SUBJECT_STATUS_META } from "../mocks/subjects.mock";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { SecondaryTone, Subject } from "../types/subjects.types";
import ProgressBar from "./ProgressBar";

const SUBJECT_ICONS: Record<string, {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
  bg: string;
}> = {
  sci10: { name: "science", color: "#1B74E4", bg: "#D9E6FA" },
  mth10: { name: "book", color: "#B45309", bg: "#F5E7CB" },
  eng10: { name: "translate", color: "#7C3AED", bg: "#E6DDFB" },
  soc10: { name: "public", color: "#1B74E4", bg: "#D9E6FA" },
  nep10: { name: "menu-book", color: "#8A6500", bg: "#FBEFD8" },
  opm10: { name: "terminal", color: "#7C3AED", bg: "#E6DDFB" },
  com10: { name: "code", color: "#0F1E4E", bg: "#DDE3F3" },
};

const TONE_STYLES: Record<SecondaryTone, { bg: string; fg: string }> = {
  amber: { bg: "#F3EAD8", fg: "#B45309" },
  gray: { bg: "#E4E7F0", fg: "#5D6373" },
  purple: { bg: "#E6DDFB", fg: "#5B21B6" },
};

interface SubjectCardProps {
  subject: Subject;
  onExplore: (id: string) => void;
  onSwitch?: (id: string) => void;
}

export default function SubjectCard({ subject, onExplore, onSwitch }: SubjectCardProps) {
  const status = SUBJECT_STATUS_META[subject.status];
  const icon = SUBJECT_ICONS[subject.id] ?? {
    name: "school",
    color: colors.primary,
    bg: colors.primarySoft,
  };
  const tone = TONE_STYLES[subject.secondaryTone];

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onExplore(subject.id)}
      style={({ pressed }) => [
        styles.container,
        { borderTopColor: subject.accent },
        pressed && styles.pressed,
      ]}
    >
      {/* Header row: icon + title + badges */}
      <View style={styles.headerRow} pointerEvents="box-none">
        <View style={[styles.iconBox, { backgroundColor: icon.bg }]}>
          <MaterialIcons name={icon.name} size={22} color={icon.color} />
        </View>

        <View style={styles.titleWrap}>
          <Text style={styles.title}>{subject.name}</Text>
          <Text style={styles.subtitle}>{subject.subtitle}</Text>
        </View>

        <View style={styles.headerRight}>
          {subject.isElective ? (
            <View style={styles.electivePill}>
              <Text style={styles.electiveText}>{subject.electiveNote}</Text>
            </View>
          ) : null}

          {subject.showSwitch ? (
            <Pressable
              style={styles.switchButton}
              onPress={() => onSwitch?.(subject.id)}
            >
              <Text style={styles.switchText}>Switch</Text>
              <MaterialIcons name="swap-horiz" size={12} color={colors.primary} />
            </Pressable>
          ) : status.display === "pill" ? (
            <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
              <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
            </View>
          ) : (
            <Text style={[styles.statusTextPlain, { color: status.color }]}>{status.label}</Text>
          )}
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressLabelRow}>
        <Text style={styles.progressLabel}>{subject.progressLabel}</Text>
        <Text style={[styles.progressValue, { color: subject.accent }]}>
          {subject.progressValue}%
        </Text>
      </View>
      <ProgressBar
        percent={subject.progressValue}
        color={subject.accent}
        trackColor="#DDE1EC"
        style={styles.progressBar}
      />

      {/* Topics + secondary stat */}
      <View style={styles.topicsRow}>
        <MaterialIcons name={subject.activeIcon as any} size={15} color={colors.textSecondary} />
        <Text style={styles.topicsText} numberOfLines={1}>
          {subject.activeTopics}
        </Text>
        <View style={[styles.statPill, { backgroundColor: tone.bg }]}>
          <Text style={[styles.statPillText, { color: tone.fg }]}>{subject.secondaryStat}</Text>
        </View>
      </View>

      {/* Footer: CDC code + explore label (visual only, whole card is tappable) */}
      <View style={styles.footerRow}>
        <Text style={styles.cdcCode}>CDC SYLLABUS #{subject.cdcCode}</Text>
        <View style={styles.explore}>
          <Text style={styles.exploreText}>Explore Chapters</Text>
          <MaterialIcons name="arrow-forward" size={14} color={colors.primary} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9EBF4",
    borderRadius: 18,
    borderTopWidth: 3,
    padding: 14,
    marginTop: 14,
    shadowColor: "#1B2559",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrap: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 3,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: 6,
    maxWidth: 130,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    ...monoText(8.5, "700"),
    letterSpacing: 0.4,
  },
  statusTextPlain: {
    ...monoText(9, "700"),
    letterSpacing: 0.4,
  },
  electivePill: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    maxWidth: 70,
  },
  electiveText: {
    ...monoText(9, "700"),
    color: colors.purple,
  },
  switchButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.primarySoft,
    backgroundColor: colors.white,
  },
  switchText: {
    ...monoText(9, "700"),
    color: colors.primary,
  },
  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  progressLabel: {
    ...monoText(11),
    color: colors.textPrimary,
  },
  progressValue: {
    ...monoText(11, "700"),
  },
  progressBar: {
    marginTop: 6,
  },
  topicsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  topicsText: {
    flex: 1,
    fontSize: 11,
    color: colors.textSecondary,
  },
  statPill: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statPillText: {
    ...monoText(9, "700"),
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  cdcCode: {
    ...monoText(9),
    color: colors.textMuted,
    letterSpacing: 0.4,
  },
  explore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  exploreText: {
    ...monoText(11, "700"),
    color: colors.primary,
  },
});