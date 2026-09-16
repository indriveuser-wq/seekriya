import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { BoardMock } from "../types/subjectDetail.types";

export default function BoardMockCard({ mock, onPress }: { mock: BoardMock; onPress: () => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.tagRow}>
          <View style={styles.tagDot} />
          <Text style={styles.tag}>{mock.tag}</Text>
        </View>
        <Text style={styles.title}>{mock.title}</Text>
        <Text style={styles.subtitle}>{mock.subtitle}</Text>
      </View>

      <View style={styles.right}>
        <View style={styles.durationRow}>
          <MaterialIcons name="schedule" size={12} color={colors.textSecondary} />
          <Text style={styles.duration}>{mock.duration}</Text>
        </View>

        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
          <MaterialIcons name="play-arrow" size={14} color={colors.white} />
          <Text style={styles.buttonText}>{mock.actionLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9EBF4",
    borderRadius: 18,
    padding: 14,
    marginTop: 18,
    gap: 12,
  },
  left: {
    flex: 1,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tagDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.amber,
  },
  tag: {
    ...monoText(8.5, "700"),
    color: colors.amber,
    letterSpacing: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 3,
  },
  right: {
    alignItems: "flex-end",
    gap: 8,
  },
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  duration: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  buttonText: {
    ...monoText(10, "700"),
    color: colors.white,
  },
});