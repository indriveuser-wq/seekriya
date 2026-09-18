import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

interface SearchAndFiltersProps {
  placeholder: string;
  tabs: string[];
}

export default function SearchAndFilters({ placeholder, tabs }: SearchAndFiltersProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <MaterialIcons name="search" size={18} color={colors.textMuted} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
        />
        <MaterialIcons name="tune" size={18} color={colors.textMuted} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll} contentContainerStyle={styles.tabsContent}>
        {tabs.map((tab, index) => {
          const active = index === activeTab;
          return (
            <Pressable
              key={tab}
              style={[styles.tab, active && styles.tabActive]}
              onPress={() => setActiveTab(index)}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECEEF6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 12,
    color: colors.textPrimary,
  },
  tabsScroll: {
    marginTop: 10,
    height: 32,
    flexGrow: 0,
  },
  tabsContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 16,
  },
  tab: {
    backgroundColor: "#ECEEF6",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  tabActive: {
    backgroundColor: "#312E81",
  },
  tabText: {
    ...monoText(9.5, "600"),
    color: colors.textPrimary,
  },
  tabTextActive: {
    color: colors.white,
    fontWeight: "700",
  },
});