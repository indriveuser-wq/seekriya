import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

interface SectionHeaderProps {
  title: string;
  chip?: string;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function SectionHeader({ title, chip, right, style }: SectionHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {chip ? (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{chip}</Text>
          </View>
        ) : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  chip: {
    backgroundColor: "#DFE4F0",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chipText: {
    ...monoText(10, "700"),
    color: colors.primary,
  },
});