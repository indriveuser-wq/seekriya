import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { TabItem } from "../types/questionBank.types";

interface QuestionBankTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onSelect: (key: string) => void;
}

export default function QuestionBankTabs({ tabs, activeTab, onSelect }: QuestionBankTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      {tabs.map((tab) => {
        const active = tab.key === activeTab;
        return (
          <Pressable
            key={tab.key}
            style={[styles.tab, active && styles.tabActive]}
            onPress={() => onSelect(tab.key)}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
            {tab.count != null ? (
              <View style={[styles.countBadge, active && styles.countBadgeActive]}>
                <Text style={[styles.countText, active && styles.countTextActive]}>
                  {tab.count}
                </Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 12,
    height: 40,
    flexGrow: 0,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ECEEF6",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  tabActive: {
    backgroundColor: "#312E81",
  },
  label: {
    ...monoText(10.5, "600"),
    color: colors.textPrimary,
  },
  labelActive: {
    color: colors.white,
    fontWeight: "700",
  },
  countBadge: {
    backgroundColor: "#D1D5DB",
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  countBadgeActive: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  countText: {
    ...monoText(9, "700"),
    color: colors.textSecondary,
  },
  countTextActive: {
    color: colors.white,
  },
});