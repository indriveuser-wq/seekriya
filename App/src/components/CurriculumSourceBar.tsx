import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { CurriculumSource } from "../types/notesStudio.types";

export default function CurriculumSourceBar({ source }: { source: CurriculumSource }) {
  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        <MaterialIcons name="settings" size={14} color={colors.primary} />
        <Text style={styles.label}>{source.label}</Text>
      </View>
      <View style={styles.chip}>
        <View style={styles.dot} />
        <Text style={styles.chipText}>{source.chip}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  label: {
    ...monoText(9, "700"),
    color: colors.primary,
    letterSpacing: 0.8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E6DDFB",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#6D28D9",
  },
  chipText: {
    ...monoText(8.5, "700"),
    color: "#6D28D9",
  },
});