import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

interface UnderstoodRowProps {
  title: string;
  sub: string;
  toggleLabel: string;
  onToggle?: () => void;
}

export default function UnderstoodRow({ title, sub, toggleLabel, onToggle }: UnderstoodRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.checkCircle}>
        <MaterialIcons name="check" size={14} color={colors.primary} />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub}>{sub}</Text>
      </View>

      <Pressable style={styles.toggleChip} onPress={onToggle}>
        <Text style={styles.toggleText}>{toggleLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E4E7F3",
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#CFE0F8",
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    ...monoText(11, "700"),
    color: colors.textPrimary,
  },
  sub: {
    ...monoText(9, "600"),
    color: colors.amber,
    marginTop: 2,
  },
  toggleChip: {
    backgroundColor: "#DFE3EE",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  toggleText: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
});