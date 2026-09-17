import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { SettingsHeader } from "../types/settings.types";

export default function SettingsSubHeader({
  header,
  onBack,
}: {
  header: SettingsHeader;
  onBack: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable style={styles.backRow} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={15} color={colors.textPrimary} />
          <Text style={styles.backText}>{header.backLabel}</Text>
        </Pressable>

        <View style={styles.spacer} />

        <View style={styles.statusChip}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{header.statusChip}</Text>
        </View>
      </View>

      <View style={styles.tagRow}>
        <Text style={styles.cockpitTag}>{header.cockpitTag}</Text>
        <Text style={styles.tagDot}>•</Text>
        <Text style={styles.cohortTag}>{header.cohortTag}</Text>
      </View>

      <Text style={styles.title}>{header.title}</Text>
      <Text style={styles.subtitle}>{header.subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  backText: {
    ...monoText(10.5, "700"),
    color: colors.textPrimary,
  },
  spacer: {
    flex: 1,
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.beige,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.amber,
  },
  statusText: {
    ...monoText(8.5, "700"),
    color: colors.amber,
    letterSpacing: 0.8,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
  cockpitTag: {
    ...monoText(9, "700"),
    color: colors.primary,
    letterSpacing: 1,
  },
  tagDot: {
    color: colors.textMuted,
    fontSize: 9,
  },
  cohortTag: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 6,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
    marginTop: 6,
  },
});