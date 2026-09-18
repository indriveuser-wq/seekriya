import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { CurriculumAuthority } from "../types/teacherSettings.types";

const CHIP_STYLES: Record<string, { bg: string; fg: string }> = {
  blue: { bg: "#CFE0F8", fg: "#1D4ED8" },
  gray: { bg: "#E2E5F0", fg: "#5D6373" },
};

export default function CurriculumAuthorityCard({
  curriculum,
}: {
  curriculum: CurriculumAuthority;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons name="menu-book" size={15} color={colors.primary} />
        <Text style={styles.title}>{curriculum.title}</Text>
        <View style={styles.spacer} />
        <Text style={styles.rightLabel}>{curriculum.rightLabel}</Text>
      </View>

      {curriculum.items.map((item) => {
        const chipStyle = CHIP_STYLES[item.chipTone];
        return (
          <View key={item.title} style={styles.itemRow}>
            <View style={styles.itemText}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSub}>{item.subtitle}</Text>
            </View>
            <View style={[styles.chip, { backgroundColor: chipStyle.bg }]}>
              <Text style={[styles.chipText, { color: chipStyle.fg }]}>{item.chip}</Text>
            </View>
          </View>
        );
      })}

      <View style={styles.registryRow}>
        <MaterialIcons name="check-box" size={13} color={colors.primary} />
        <Text style={styles.registryLabel}>{curriculum.registryLabel}</Text>
        <Text style={styles.registryValue}>{curriculum.registryValue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    marginHorizontal: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  title: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  spacer: {
    flex: 1,
  },
  rightLabel: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FC",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  itemText: {
    flex: 1,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  itemSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chip: {
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  chipText: {
    ...monoText(7.5, "700"),
    letterSpacing: 0.5,
  },
  registryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#DDE1EC",
  },
  registryLabel: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
  registryValue: {
    ...monoText(9, "700"),
    color: colors.textPrimary,
  },
});