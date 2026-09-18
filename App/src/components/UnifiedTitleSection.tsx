import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { UnifiedTitle } from "../types/questionBank.types";

export default function UnifiedTitleSection({ title }: { title: UnifiedTitle }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons name="verified-user" size={18} color={colors.primary} />
        <Text style={styles.mainTitle}>{title.title}</Text>
        <View style={styles.gradeChip}>
          <Text style={styles.gradeChipText}>{title.gradeChip}</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>{title.subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mainTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  gradeChip: {
    backgroundColor: "#CFE0F8",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  gradeChipText: {
    ...monoText(9, "700"),
    color: "#1D4ED8",
  },
  subtitle: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 16,
    marginTop: 4,
  },
});