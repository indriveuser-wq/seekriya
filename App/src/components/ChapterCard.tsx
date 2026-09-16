import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { Chapter, ChapterStat, StatTone } from "../types/subjectDetail.types";
import ProgressBar from "./ProgressBar";

const VALUE_COLOR: Record<StatTone, string> = {
  dark: colors.textPrimary,
  blue: colors.primary,
  amber: colors.amber,
  crimson: colors.crimson,
};

function StatColumn({ stat }: { stat: ChapterStat }) {
  return (
    <View style={styles.statCol}>
      <Text style={styles.statLabel}>{stat.label}</Text>
      <Text style={[styles.statValue, { color: VALUE_COLOR[stat.tone] }]}>{stat.value}</Text>
    </View>
  );
}

interface ChapterCardProps {
  chapter: Chapter;
  onAction: (id: string) => void;
}

export default function ChapterCard({ chapter, onAction }: ChapterCardProps) {
  const { statusChip, action } = chapter;

  const containerAccent =
    chapter.accent === "blue"
      ? { borderLeftColor: colors.primary, backgroundColor: "#E6EBF7" }
      : chapter.accent === "crimson"
      ? { borderLeftColor: colors.crimson, backgroundColor: "#F3EEED" }
      : undefined;

  return (
    <View style={[styles.container, containerAccent]}>
      {/* Top row */}
      <View style={styles.topRow}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{chapter.chapterChip}</Text>
        </View>
        {chapter.marksLabel ? <Text style={styles.marksText}>{chapter.marksLabel}</Text> : null}
        <View style={styles.spacer} />

        {statusChip.tone === "amber" ? (
          <Text style={styles.statusAmber}>{statusChip.label}</Text>
        ) : (
          <View
            style={[
              styles.statusPill,
              statusChip.tone === "blue" ? styles.statusBlue : styles.statusCrimson,
            ]}
          >
            {statusChip.icon === "check" ? (
              <MaterialIcons name="check-circle" size={11} color="#1D4ED8" />
            ) : statusChip.icon === "warning" ? (
              <MaterialIcons name="warning" size={11} color={colors.crimson} />
            ) : null}
            <Text
              style={[
                styles.statusText,
                { color: statusChip.tone === "blue" ? "#1D4ED8" : colors.crimson },
              ]}
            >
              {statusChip.label}
            </Text>
          </View>
        )}
      </View>

      {/* Marks chip */}
      {chapter.marksChip ? (
        <View style={styles.marksChip}>
          <MaterialIcons name="verified" size={11} color={colors.amber} />
          <Text style={styles.marksChipText}>{chapter.marksChip}</Text>
        </View>
      ) : null}

      <Text style={styles.title}>{chapter.title}</Text>
      <Text style={styles.subtitle}>{chapter.subtitle}</Text>

      {/* Teacher note */}
      {chapter.teacherNote ? (
        <View style={styles.noteBox}>
          <View style={styles.noteTitleRow}>
            <MaterialIcons name="rate-review" size={13} color={colors.amber} />
            <Text style={styles.noteTitle}>{chapter.teacherNote.title}</Text>
          </View>
          <Text style={styles.noteQuote}>{chapter.teacherNote.quote}</Text>
        </View>
      ) : null}

      {/* Boxed stats */}
      {chapter.statsStyle === "box" ? (
        <View style={styles.statsBox}>
          {chapter.stats.map((stat) => (
            <StatColumn key={stat.label} stat={stat} />
          ))}
        </View>
      ) : null}

      {chapter.progressPercent != null ? (
        <ProgressBar
          percent={chapter.progressPercent}
          color={chapter.progressColor ?? colors.primary}
          trackColor="#DDE1EC"
          style={styles.progress}
        />
      ) : null}

      {/* Bottom row */}
      <View style={styles.bottomRow}>
        {chapter.footnote ? (
          <View style={styles.footnoteRow}>
            <MaterialIcons name="schedule" size={13} color={colors.textSecondary} />
            <Text style={styles.footnoteText}>{chapter.footnote}</Text>
          </View>
        ) : (
          <View style={styles.rowStats}>
            {chapter.stats.map((stat) => (
              <StatColumn key={stat.label} stat={stat} />
            ))}
          </View>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.actionBase,
            action.style === "primary" && styles.actionPrimary,
            action.style === "purple" && styles.actionPurple,
            action.style === "soft" && styles.actionSoft,
            pressed && styles.pressed,
          ]}
          onPress={() => onAction(chapter.id)}
        >
          {action.icon === "bolt" ? (
            <MaterialIcons name="bolt" size={13} color={colors.white} />
          ) : null}
          <Text
            style={[
              styles.actionText,
              action.style === "soft" ? styles.actionTextSoft : styles.actionTextLight,
            ]}
          >
            {action.label}
          </Text>
          {action.icon === "arrow" ? (
            <MaterialIcons name="arrow-forward" size={13} color={colors.white} />
          ) : null}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
    padding: 14,
    marginTop: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  chip: {
    backgroundColor: "#DFE3EE",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chipText: {
    ...monoText(9, "600"),
    color: colors.textPrimary,
  },
  marksText: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
  spacer: {
    flex: 1,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusBlue: {
    backgroundColor: "#D9E4FB",
  },
  statusCrimson: {
    backgroundColor: "#F7D9D4",
  },
  statusText: {
    ...monoText(9, "700"),
  },
  statusAmber: {
    ...monoText(9, "700"),
    color: colors.amber,
  },
  marksChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    backgroundColor: "#F3EAD8",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
  },
  marksChipText: {
    ...monoText(9, "700"),
    color: colors.amber,
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
  noteBox: {
    backgroundColor: "#F8ECDC",
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
  },
  noteTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  noteTitle: {
    ...monoText(9.5, "700"),
    color: colors.amber,
  },
  noteQuote: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginTop: 5,
    marginLeft: 20,
  },
  statsBox: {
    flexDirection: "row",
    backgroundColor: "#F4F6FB",
    borderRadius: 12,
    padding: 10,
    marginTop: 12,
  },
  statCol: {
    flex: 1,
  },
  statLabel: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
  },
  statValue: {
    ...monoText(11.5, "700"),
    marginTop: 4,
  },
  progress: {
    marginTop: 12,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 12,
  },
  rowStats: {
    flexDirection: "row",
    flex: 1,
    gap: 14,
  },
  footnoteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  footnoteText: {
    ...monoText(10),
    color: colors.textSecondary,
  },
  actionBase: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  actionPrimary: {
    backgroundColor: colors.primary,
  },
  actionPurple: {
    backgroundColor: colors.purple,
  },
  actionSoft: {
    backgroundColor: "#DFE3EE",
    paddingVertical: 9,
  },
  pressed: {
    opacity: 0.85,
  },
  actionText: {
    ...monoText(10.5, "700"),
  },
  actionTextLight: {
    color: colors.white,
  },
  actionTextSoft: {
    color: "#3A3F4E",
  },
});