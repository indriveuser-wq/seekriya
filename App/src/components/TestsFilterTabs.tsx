import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

interface TestsFilterTabsProps {
  tabs: string[];
  activeTab: string;
  onSelect: (tab: string) => void;
}

export default function TestsFilterTabs({ tabs, activeTab, onSelect }: TestsFilterTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      {tabs.map((tab) => {
        const active = tab === activeTab;
        return (
          <Pressable
            key={tab}
            style={[styles.tab, active && styles.tabActive]}
            onPress={() => onSelect(tab)}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{tab}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 16,
    height: 36,
    flexGrow: 0,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingRight: 16,
  },
  tab: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabActive: {
    backgroundColor: "#DCE4F2",
  },
  label: {
    ...monoText(11, "600"),
    color: colors.textPrimary,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: "700",
  },
});