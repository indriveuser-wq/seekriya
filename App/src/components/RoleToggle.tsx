import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { UserRole } from "../types/auth.types";

interface RoleToggleProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
}

const OPTIONS: { key: UserRole; label: string; icon: "school" | "card-account-details-outline" }[] = [
  { key: "student", label: "Student Aspirant", icon: "school" },
  { key: "teacher", label: "Teacher / Examiner", icon: "card-account-details-outline" },
];

export default function RoleToggle({ value, onChange }: RoleToggleProps) {
  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => {
        const active = option.key === value;
        return (
          <Pressable
            key={option.key}
            style={[styles.option, active && styles.optionActive]}
            onPress={() => onChange(option.key)}
          >
            <MaterialCommunityIcons
              name={option.icon}
              size={16}
              color={active ? colors.primary : colors.textSecondary}
            />
            <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>
              {option.label}
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
    backgroundColor: "#E2E5F0",
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  option: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 11,
    borderRadius: 10,
  },
  optionActive: {
    backgroundColor: colors.primarySoft,
  },
  optionLabel: {
    ...monoText(12, "600"),
    color: colors.textSecondary,
  },
  optionLabelActive: {
    color: colors.primary,
    fontWeight: "700",
  },
});