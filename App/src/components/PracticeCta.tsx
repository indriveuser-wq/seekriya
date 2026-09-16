import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

interface PracticeCtaProps {
  label: string;
  duration: string;
  xp: string;
  onPress: () => void;
}

export default function PracticeCta({ label, duration, xp, onPress }: PracticeCtaProps) {
  return (
    <View style={styles.container}>
      <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
        <MaterialIcons name="arrow-forward" size={18} color={colors.white} />
      </Pressable>

      <View style={styles.metaRow}>
        <MaterialIcons name="schedule" size={12} color={colors.textSecondary} />
        <Text style={styles.metaText}>{duration}</Text>
        <Text style={styles.metaDot}>•</Text>
        <MaterialIcons name="military-tech" size={12} color={colors.amber} />
        <Text style={styles.metaText}>{xp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  buttonText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: colors.white,
    textAlign: "center",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 10,
  },
  metaText: {
    ...monoText(9.5, "600"),
    color: colors.textSecondary,
  },
  metaDot: {
    color: colors.textMuted,
    fontSize: 10,
  },
});