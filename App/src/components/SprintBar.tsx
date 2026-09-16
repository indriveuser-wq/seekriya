import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { SprintInfo } from "../types/topicDrill.types";

interface SprintBarProps {
  sprint: SprintInfo;
  onPress: () => void;
  bottomInset: number;
}

export default function SprintBar({ sprint, onPress, bottomInset }: SprintBarProps) {
  return (
    <View style={[styles.container, { marginBottom: Math.max(bottomInset, 12) }]}>
      <View style={styles.dot} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{sprint.title}</Text>
        <Text style={styles.sub}>{sprint.sub}</Text>
      </View>

      <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
        <Text style={styles.buttonText}>{sprint.actionLabel}</Text>
        <MaterialIcons name="play-arrow" size={16} color={colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6E9F4",
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 12,
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.amber,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    ...monoText(12, "700"),
    color: colors.textPrimary,
  },
  sub: {
    ...monoText(10.5),
    color: colors.textSecondary,
    marginTop: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  buttonText: {
    ...monoText(11, "800"),
    color: colors.white,
    letterSpacing: 0.6,
  },
});