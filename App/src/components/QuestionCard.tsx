import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { DrillQuestion } from "../types/practiceDrill.types";

export default function QuestionCard({
  question,
  onBookmark,
}: {
  question: DrillQuestion;
  onBookmark?: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{question.chapterChip}</Text>
        </View>
        <Pressable style={styles.bookmarkButton} onPress={onBookmark}>
          <MaterialIcons name="bookmark-border" size={15} color={colors.textPrimary} />
        </Pressable>
      </View>

      <Text style={styles.questionText}>{question.text}</Text>

      <View style={styles.sourceRow}>
        <MaterialIcons name="psychology-alt" size={15} color={colors.purple} />
        <Text style={styles.sourceText}>{question.sourceLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9EBF4",
    borderRadius: 20,
    padding: 16,
    marginTop: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chip: {
    backgroundColor: "#DFE3EE",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexShrink: 1,
  },
  chipText: {
    fontSize: 9,
    fontWeight: "700",
    color: colors.textPrimary,
    letterSpacing: 0.5,
    fontFamily: "Menlo",
  },
  bookmarkButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#DFE3EE",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  questionText: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.textPrimary,
    lineHeight: 28,
    marginTop: 12,
  },
  sourceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 7,
    marginTop: 12,
  },
  sourceText: {
    flex: 1,
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 17,
  },
});