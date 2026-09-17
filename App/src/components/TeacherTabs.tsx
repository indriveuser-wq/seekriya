import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

const TAB_ICONS = ["smart-toy", "menu-book", "bar-chart"];

interface TeacherTabsProps {
  tabs: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function TeacherTabs({ tabs, activeIndex, onSelect }: TeacherTabsProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const active = index === activeIndex;
        return (
          <Pressable
            key={tab}
            style={[styles.tab, active && styles.tabActive]}
            onPress={() => onSelect(index)}
          >
            <MaterialIcons
              name={TAB_ICONS[index] as any}
              size={15}
              color={active ? colors.white : "#3A3F4E"}
            />
            <Text style={[styles.label, active && styles.labelActive]}>{tab}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    backgroundColor: "#E9EBF5",
    borderRadius: 14,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  label: {
    ...monoText(10.5, "600"),
    color: colors.textPrimary,
    textAlign: "center",
    flexShrink: 1,
  },
  labelActive: {
    color: colors.white,
    fontWeight: "700",
  },
});