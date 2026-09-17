import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { Diagnostics } from "../types/progress.types";

const TONE_COLOR = {
  blue: colors.primary,
  amber: colors.amber,
  crimson: colors.crimson,
};

export default function DiagnosticsSection({
  diagnostics,
  onRecovery,
}: {
  diagnostics: Diagnostics;
  onRecovery?: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{diagnostics.title}</Text>
        <Text style={styles.total}>{diagnostics.totalLabel}</Text>
      </View>

      <View style={styles.boxesRow}>
        {diagnostics.boxes.map((box) => (
          <View key={box.label} style={styles.box}>
            <View style={styles.boxValueRow}>
              <Text style={[styles.boxValue, { color: TONE_COLOR[box.tone] }]}>{box.value}</Text>
              <View style={styles.spacer} />
              <MaterialIcons name={box.icon as any} size={14} color={TONE_COLOR[box.tone]} />
            </View>
            <Text style={styles.boxLabel}>{box.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.vulnCard}>
        <View style={styles.vulnHeader}>
          <MaterialIcons name="warning" size={14} color={colors.crimson} />
          <Text style={styles.vulnTitle}>{diagnostics.vulnTitle}</Text>
          <View style={styles.spacer} />
          <View style={styles.vulnChip}>
            <Text style={styles.vulnChipText}>{diagnostics.vulnChip}</Text>
          </View>
        </View>

        {diagnostics.vulnerabilities.map((item) => (
          <View key={item.code} style={styles.vulnRow}>
            <View style={styles.codeChip}>
              <Text style={styles.codeText}>{item.code}</Text>
            </View>
            <Text style={styles.vulnItemTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.vulnAcc}>{item.acc}</Text>
          </View>
        ))}

        <Pressable style={({ pressed }) => [styles.recoveryButton, pressed && styles.pressed]} onPress={onRecovery}>
          <MaterialIcons name="auto-fix-high" size={15} color={colors.white} />
          <Text style={styles.recoveryText}>{diagnostics.recoveryLabel}</Text>
          <MaterialIcons name="arrow-forward" size={14} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  total: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
  boxesRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  box: {
    flex: 1,
    backgroundColor: "#E9EBF5",
    borderRadius: 12,
    padding: 12,
  },
  boxValueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxValue: {
    fontSize: 18,
    fontWeight: "800",
  },
  spacer: {
    flex: 1,
  },
  boxLabel: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
    marginTop: 6,
  },
  vulnCard: {
    backgroundColor: "#E9EBF5",
    borderRadius: 16,
    padding: 12,
    marginTop: 10,
  },
  vulnHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 2,
  },
  vulnTitle: {
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.crimson,
  },
  vulnChip: {
    backgroundColor: colors.crimsonSoft,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  vulnChipText: {
    ...monoText(8, "700"),
    color: colors.crimson,
  },
  vulnRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FC",
    borderRadius: 10,
    padding: 9,
    marginTop: 8,
  },
  codeChip: {
    backgroundColor: colors.crimsonSoft,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  codeText: {
    ...monoText(8, "700"),
    color: colors.crimson,
  },
  vulnItemTitle: {
    flex: 1,
    fontSize: 11,
    color: colors.textPrimary,
    marginLeft: 8,
    marginRight: 8,
  },
  vulnAcc: {
    ...monoText(8.5, "700"),
    color: colors.crimson,
  },
  recoveryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 10,
    gap: 8,
  },
  pressed: {
    opacity: 0.9,
  },
  recoveryText: {
    flex: 1,
    ...monoText(10.5, "700"),
    color: colors.white,
  },
});