import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

interface ResultActionsProps {
  practiceLabel: string;
  practiceChip: string;
  reviewLabel: string;
  onPractice: () => void;
  onReview: () => void;
}

export default function ResultActions({
  practiceLabel,
  practiceChip,
  reviewLabel,
  onPractice,
  onReview,
}: ResultActionsProps) {
  return (
    <View style={styles.container}>
      <Pressable style={({ pressed }) => [styles.practiceButton, pressed && styles.pressed]} onPress={onPractice}>
        <MaterialIcons name="bolt" size={16} color={colors.white} />
        <Text style={styles.practiceText}>{practiceLabel}</Text>
        <View style={styles.drillChip}>
          <Text style={styles.drillChipText}>{practiceChip}</Text>
        </View>
      </Pressable>

      <Pressable style={styles.reviewButton} onPress={onReview}>
        <MaterialIcons name="assignment" size={16} color={colors.textPrimary} />
        <Text style={styles.reviewText}>{reviewLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
  },
  practiceButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  practiceText: {
    ...monoText(12, "700"),
    color: colors.white,
  },
  drillChip: {
    backgroundColor: colors.primaryDark,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  drillChipText: {
    ...monoText(9, "700"),
    color: colors.white,
  },
  reviewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#ECEEF6",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  reviewText: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
    lineHeight: 18,
  },
});