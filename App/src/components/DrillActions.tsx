import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

interface DrillActionsProps {
  explainLabel: string;
  savedLabel: string;
  nextLabel: string;
  targetPrefix: string;
  targetHighlight: string;
  onExplain?: () => void;
  onSaved?: () => void;
  onNext?: () => void;
}

export default function DrillActions({
  explainLabel,
  savedLabel,
  nextLabel,
  targetPrefix,
  targetHighlight,
  onExplain,
  onSaved,
  onNext,
}: DrillActionsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable style={({ pressed }) => [styles.explainButton, pressed && styles.pressed]} onPress={onExplain}>
          <MaterialIcons name="auto-awesome" size={15} color={colors.purple} />
          <Text style={styles.explainText}>{explainLabel}</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.savedButton, pressed && styles.pressed]} onPress={onSaved}>
          <MaterialCommunityIcons name="bookmark-check-outline" size={15} color={colors.textPrimary} />
          <Text style={styles.savedText}>{savedLabel}</Text>
        </Pressable>
      </View>

      <Pressable style={({ pressed }) => [styles.nextButton, pressed && styles.nextPressed]} onPress={onNext}>
        <Text style={styles.nextText}>{nextLabel}</Text>
        <MaterialIcons name="arrow-forward" size={16} color={colors.white} />
      </Pressable>

      <Text style={styles.targetNote}>
        {targetPrefix}
        <Text style={styles.targetHighlight}>{targetHighlight}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  explainButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#E6DDFB",
    borderRadius: 12,
    paddingVertical: 13,
  },
  savedButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#E9EBF4",
    borderRadius: 12,
    paddingVertical: 13,
  },
  pressed: {
    opacity: 0.85,
  },
  explainText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.purple,
  },
  savedText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 10,
  },
  nextPressed: {
    backgroundColor: colors.primaryDark,
  },
  nextText: {
    ...monoText(13, "800"),
    color: colors.white,
    letterSpacing: 1,
  },
  targetNote: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  targetHighlight: {
    fontWeight: "700",
    color: colors.amber,
  },
});