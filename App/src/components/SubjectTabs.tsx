import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { SubjectCategory, SubjectCategoryKey } from "../types/subjects.types";

interface SubjectTabsProps {
  categories: SubjectCategory[];
  activeKey: SubjectCategoryKey;
  onSelect: (key: SubjectCategoryKey) => void;
}

export default function SubjectTabs({ categories, activeKey, onSelect }: SubjectTabsProps) {
  return (
    <View style={styles.container}>
      {categories.map((cat) => {
        const active = cat.key === activeKey;
        return (
          <Pressable
            key={cat.key}
            style={[styles.tab, active && styles.tabActive]}
            onPress={() => onSelect(cat.key)}
          >
            <Text style={[styles.label, active && styles.labelActive]}>
              {`${cat.label} (${cat.count})`}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    marginBottom: 4,
  },
  tab: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: "#E3E6F1",
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  label: {
    ...monoText(11, "600"),
    color: colors.textPrimary,
  },
  labelActive: {
    color: colors.white,
    fontWeight: "700",
  },
});