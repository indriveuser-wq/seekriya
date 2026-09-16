import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

interface CheckboxRowProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
  rightAdornment?: React.ReactNode;
}

export default function CheckboxRow({ checked, onToggle, label, rightAdornment }: CheckboxRowProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onToggle} style={styles.touchArea}>
        <View style={[styles.box, checked && styles.boxChecked]}>
          {checked && <MaterialIcons name="check" size={14} color={colors.white} />}
        </View>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
      {rightAdornment}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  touchArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexShrink: 1,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#B9BFCE",
    alignItems: "center",
    justifyContent: "center",
  },
  boxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 13,
    color: colors.textPrimary,
    flexShrink: 1,
  },
});