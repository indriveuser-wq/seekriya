import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

interface ActionButtonsProps {
  confirmLabel: string;
  reevaluateLabel: string;
  onConfirm?: () => void;
  onReevaluate?: () => void;
}

export default function ActionButtons({
  confirmLabel,
  reevaluateLabel,
  onConfirm,
  onReevaluate,
}: ActionButtonsProps) {
  return (
    <>
      <Pressable style={styles.confirmButton} onPress={onConfirm}>
        <MaterialIcons name="check-circle" size={16} color={colors.white} />
        <Text style={styles.confirmText}>{confirmLabel}</Text>
      </Pressable>

      <Pressable style={styles.reevaluateButton} onPress={onReevaluate}>
        <MaterialIcons name="cached" size={14} color={colors.crimson} />
        <Text style={styles.reevaluateText}>{reevaluateLabel}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#4338CA",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 16,
  },
  confirmText: {
    ...monoText(11.5, "700"),
    color: colors.white,
  },
  reevaluateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 10,
  },
  reevaluateText: {
    ...monoText(10.5, "700"),
    color: colors.crimson,
  },
});