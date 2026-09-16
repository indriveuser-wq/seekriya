import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  icon?: React.ReactNode;
}

export default function PrimaryButton({ title, onPress, loading, icon }: PrimaryButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <>
          <Text style={styles.label}>{title}</Text>
          {icon}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 52,
    marginTop: 16,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  label: {
    ...monoText(15, "700"),
    color: colors.white,
  },
});