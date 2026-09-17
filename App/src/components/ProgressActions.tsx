import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

export default function ProgressActions({
  generateLabel,
  exportLabel,
  onGenerate,
  onExport,
}: {
  generateLabel: string;
  exportLabel: string;
  onGenerate?: () => void;
  onExport?: () => void;
}) {
  return (
    <>
      <Pressable style={({ pressed }) => [styles.generate, pressed && styles.pressed]} onPress={onGenerate}>
        <MaterialIcons name="auto-stories" size={16} color={colors.white} />
        <Text style={styles.generateText}>{generateLabel}</Text>
      </Pressable>

      <Pressable style={styles.exportButton} onPress={onExport}>
        <MaterialIcons name="share-windows" size={14} color={colors.primary} />
        <Text style={styles.exportText}>{exportLabel}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  generate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 13,
    marginTop: 16,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  generateText: {
    ...monoText(11, "700"),
    color: colors.white,
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#ECEEF6",
    borderRadius: 12,
    paddingVertical: 11,
    marginTop: 10,
    marginBottom: 8,
  },
  exportText: {
    ...monoText(9.5, "700"),
    color: colors.primary,
  },
});