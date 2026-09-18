import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { ActiveCurriculum } from "../types/notesStudio.types";

export default function ActiveCurriculumCard({ curriculum }: { curriculum: ActiveCurriculum }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons name="menu-book" size={16} color={colors.textPrimary} />
        <Text style={styles.headerLabel}>ACTIVE TEACHING CURRICULUM</Text>
        <View style={styles.spacer} />
        <MaterialIcons name="swap-vert" size={16} color={colors.textSecondary} />
      </View>

      <Text style={styles.title}>{curriculum.title}</Text>

      <View style={styles.metaRow}>
        <View style={styles.unitsChip}>
          <Text style={styles.unitsText}>{curriculum.unitsLabel}</Text>
        </View>
        <Text style={styles.edition}>{curriculum.editionLabel}</Text>
      </View>

      <Pressable style={styles.uploadButton}>
        <MaterialIcons name="add-circle-outline" size={16} color={colors.white} />
        <Text style={styles.uploadText}>{curriculum.uploadLabel}</Text>
        <MaterialIcons name="expand-more" size={18} color={colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  headerLabel: {
    ...monoText(9, "700"),
    color: colors.textPrimary,
    letterSpacing: 0.8,
  },
  spacer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  unitsChip: {
    backgroundColor: "#E6DDFB",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unitsText: {
    ...monoText(8.5, "700"),
    color: "#6D28D9",
  },
  edition: {
    fontSize: 10.5,
    color: colors.textSecondary,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#312E81",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 12,
  },
  uploadText: {
    ...monoText(11, "700"),
    color: colors.white,
  },
});