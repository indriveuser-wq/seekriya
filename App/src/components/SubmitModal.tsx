import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { SubmitModalInfo } from "../types/liveExam.types";

const TONE_COLOR = {
  blue: colors.primary,
  amber: colors.amber,
  gray: "#8A90A0",
};

export default function SubmitModal({
  submit,
  visible,
  onConfirm,
  onCancel,
}: {
  submit: SubmitModalInfo;
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!visible) return null;

  return (
      <View
        style={styles.overlay}
        accessibilityViewIsModal
        accessibilityRole="alert"
        accessibilityLabel={submit.title}
      >
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <MaterialIcons name="assignment-turned-in" size={20} color={colors.primary} />
          </View>

          <Text style={styles.title}>{submit.title}</Text>
          <Text style={styles.body}>{submit.body}</Text>

          <View style={styles.statsRow}>
            {submit.stats.map((stat) => (
              <View key={stat.label} style={styles.statBox}>
                <Text style={[styles.statValue, { color: TONE_COLOR[stat.tone] }]}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          <Pressable style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmText}>{submit.confirmLabel}</Text>
          </Pressable>

          <Pressable style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelText}>{submit.cancelLabel}</Text>
          </Pressable>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(23,26,43,0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    backgroundColor: colors.surfaceLight,
    borderRadius: 20,
    padding: 20,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 12,
  },
  body: {
    fontSize: 12.5,
    color: colors.textSecondary,
    lineHeight: 19,
    marginTop: 6,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#ECEEF6",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  statValue: {
    ...monoText(15, "800"),
  },
  statLabel: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
    marginTop: 2,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 16,
  },
  confirmText: {
    ...monoText(12, "700"),
    color: colors.white,
  },
  cancelButton: {
    backgroundColor: "#E2E5F0",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  cancelText: {
    ...monoText(11.5, "700"),
    color: colors.textPrimary,
  },
});