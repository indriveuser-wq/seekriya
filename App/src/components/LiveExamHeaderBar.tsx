import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { LiveExamHeader, QuestionState } from "../types/liveExam.types";

const LEGEND_DOT: Record<string, string> = {
  done: colors.primary,
  review: colors.gold,
  blank: "#DDE1EC",
};

function bubbleStyle(state: QuestionState) {
  switch (state) {
    case "done":
      return { backgroundColor: colors.primary };
    case "review":
      return { backgroundColor: colors.gold };
    case "current":
      return { backgroundColor: colors.primarySoft, borderWidth: 2, borderColor: colors.primary };
    default:
      return { backgroundColor: "#E2E5F0" };
  }
}

function bubbleText(state: QuestionState) {
  if (state === "blank") return "#9AA1B0";
  if (state === "current") return colors.primary;
  return colors.white;
}

export default function LiveExamHeaderBar({
  header,
  onFinish,
  onQuestionPress,
}: {
  header: LiveExamHeader;
  onFinish: () => void;
  onQuestionPress?: (n: number) => void;
}) {
  return (
    <View style={styles.container}>
      {/* Row 1: live tag + timer + finish */}
      <View style={styles.topRow}>
        <View style={styles.liveRow}>
          <View style={[styles.liveDot, { backgroundColor: colors.crimson }]} />
          <Text style={styles.liveTag}>{header.liveTag}</Text>
        </View>

        <View style={styles.spacer} />

        <View style={styles.timerPill}>
          <MaterialIcons name="timer" size={14} color={colors.amber} />
          <Text style={styles.timerText}>{header.timer}</Text>
        </View>

        <Pressable style={({ pressed }) => [styles.finishButton, pressed && styles.pressed]} onPress={onFinish}>
          <Text style={styles.finishText}>{header.finishLabel}</Text>
        </Pressable>
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {header.title}
      </Text>

      {/* Row 3: index + legend */}
      <View style={styles.indexRow}>
        <Text style={styles.indexLabel}>{header.indexLabel}</Text>
        <View style={styles.indexChip}>
          <Text style={styles.indexChipText}>{header.indexChip}</Text>
        </View>

        <View style={styles.spacer} />

        {header.legend.map((item) => (
          <View key={item.key} style={styles.legendItem}>
            <View style={[styles.liveDot, { backgroundColor: LEGEND_DOT[item.key] }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Question bubbles */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bubblesScroll} contentContainerStyle={styles.bubblesContent}>
        {header.questions.map((q) => (
          <Pressable key={q.n} style={[styles.bubble, bubbleStyle(q.state)]} onPress={() => onQuestionPress?.(q.n)}>
            <Text style={[styles.bubbleText, { color: bubbleText(q.state) }]}>{q.n}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    shadowColor: "#1B2559",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  liveRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  liveTag: {
    ...monoText(9.5, "800"),
    color: colors.crimson,
    letterSpacing: 1,
  },
  spacer: {
    flex: 1,
  },
  timerPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.cream,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: colors.amberBorder,
  },
  timerText: {
    ...monoText(12, "700"),
    color: colors.amber,
  },
  finishButton: {
    backgroundColor: colors.crimson,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 9,
    marginLeft: 8,
  },
  pressed: {
    opacity: 0.85,
  },
  finishText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 6,
  },
  indexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  indexLabel: {
    ...monoText(9, "700"),
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  indexChip: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  indexChipText: {
    ...monoText(10, "700"),
    color: colors.white,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginLeft: 6,
  },
  legendText: {
    ...monoText(9.5, "600"),
    color: colors.textPrimary,
  },
  bubblesScroll: {
    marginTop: 10,
    height: 36,
    flexGrow: 0,
  },
  bubblesContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 16,
  },
  bubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  bubbleText: {
    ...monoText(11, "700"),
  },
});