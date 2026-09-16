import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

interface SocialAuthButtonProps {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export default function SocialAuthButton({ label, icon, onPress }: SocialAuthButtonProps) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      {icon}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    paddingVertical: 16,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    ...monoText(12, "600"),
    color: colors.textPrimary,
  },
});