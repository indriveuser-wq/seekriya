import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { ExamNavBar } from "../types/liveExam.types";

export default function ExamActionBar({
  nav,
  onPrev,
  onBookmark,
  onNext,
}: {
  nav: ExamNavBar;
  onPrev?: () => void;
  onBookmark?: () => void;
  onNext?: () => void;
}) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.prevButton} onPress={onPrev}>
        <MaterialIcons name="arrow-back" size={16} color={colors.textPrimary} />
        <Text style={styles.prevText}>{nav.prevLabel}</Text>
      </Pressable>

      <Pressable style={styles.bookmarkButton} onPress={onBookmark}>
        <MaterialIcons name="bookmark-border" size={18} color={colors.textPrimary} />
      </Pressable>

      <Pressable style={({ pressed }) => [styles.nextButton, pressed && styles.pressed]} onPress={onNext}>
        <Text style={styles.nextText}>{nav.nextLabel}</Text>
        <MaterialIcons name="arrow-forward" size={16} color={colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#1B2559",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -4 },
    elevation: 6,
  },
  prevButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E2E5F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  prevText: {
    ...monoText(11, "700"),
    color: colors.textPrimary,
  },
  bookmarkButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E2E5F0",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 13,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  nextText: {
    ...monoText(12, "700"),
    color: colors.white,
  },
});