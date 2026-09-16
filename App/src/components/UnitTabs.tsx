import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { UnitTab } from "../types/subjectDetail.types";

interface UnitTabsProps {
  units: UnitTab[];
  activeKey: string;
  onSelect: (key: string) => void;
}

export default function UnitTabs({ units, activeKey, onSelect }: UnitTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      {units.map((unit) => {
        const active = unit.key === activeKey;
        return (
          <Pressable
            key={unit.key}
            style={[styles.tab, active && styles.tabActive]}
            onPress={() => onSelect(unit.key)}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{unit.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 14,
    height: 40,
    flexGrow: 0,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 16,
  },
  tab: {
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 8,
    backgroundColor: "#E3E6F1",
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  label: {
    ...monoText(10.5, "600"),
    color: colors.textPrimary,
  },
  labelActive: {
    color: colors.white,
    fontWeight: "700",
  },
});