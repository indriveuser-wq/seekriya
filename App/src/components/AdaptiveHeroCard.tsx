import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { AdaptiveHero } from "../types/testsCenter.types";

export default function AdaptiveHeroCard({
  hero,
  onStart,
  onSettings,
}: {
  hero: AdaptiveHero;
  onStart: () => void;
  onSettings: () => void;
}) {
  return (
    <LinearGradient colors={["#E6DDFB", "#D9E6FA"]} start={[0, 0]} end={[1, 0]} style={styles.container}>
      <View style={styles.tagRow}>
        <View style={styles.tagPill}>
          <MaterialIcons name="auto-awesome" size={12} color="#1D4ED8" />
          <Text style={styles.tagText}>{hero.tag}</Text>
        </View>
        <Text style={styles.marks}>{hero.marksLabel}</Text>
      </View>

      <Text style={styles.title}>{hero.title}</Text>
      <Text style={styles.subtitle}>{hero.subtitle}</Text>

      <View style={styles.noteRow}>
        <MaterialIcons name="psychology" size={15} color={colors.purple} />
        <Text style={styles.note}>{hero.note}</Text>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={({ pressed }) => [styles.startButton, pressed && styles.pressed]} onPress={onStart}>
          <Text style={styles.startText}>{hero.actionLabel}</Text>
          <MaterialIcons name="arrow-forward" size={16} color={colors.white} />
        </Pressable>

        <Pressable style={styles.settingsButton} onPress={onSettings}>
          <MaterialIcons name="tune" size={18} color={colors.textPrimary} />
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 16,
    marginTop: 14,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tagPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#CFE0F8",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  tagText: {
    ...monoText(9, "700"),
    color: "#1D4ED8",
    letterSpacing: 0.8,
  },
  marks: {
    ...monoText(10, "700"),
    color: colors.amber,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 3,
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 10,
  },
  note: {
    flex: 1,
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 17,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
  },
  startButton: {
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
  startText: {
    ...monoText(12.5, "700"),
    color: colors.white,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EDEFF6",
    alignItems: "center",
    justifyContent: "center",
  },
});