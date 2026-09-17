import React, { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ProgressBar from "./ProgressBar";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { RowTone, SettingRow, SettingsSectionModel } from "../types/settings.types";

const TONE: Record<RowTone, { bg: string; fg: string }> = {
  amber: { bg: "#F5E7CB", fg: colors.amber },
  blue: { bg: "#CFE0F8", fg: colors.primary },
  purple: { bg: "#E6DDFB", fg: colors.purple },
  gray: { bg: "#E2E5F0", fg: "#5D6373" },
  crimson: { bg: "#F7D9D4", fg: colors.crimson },
};

function RowControlView({
  row,
  toggleValue,
  onToggle,
  onPress,
}: {
  row: SettingRow;
  toggleValue?: boolean;
  onToggle?: () => void;
  onPress?: () => void;
}) {
  switch (row.control) {
    case "button":
      return (
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{row.controlLabel}</Text>
        </Pressable>
      );
    case "toggle":
      return (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: "#D3D8E4", true: "#9CC3F5" }}
          thumbColor={toggleValue ? colors.primary : "#F4F6FB"}
        />
      );
    case "icon":
      return (
        <MaterialIcons
          name={row.controlIcon as any}
          size={16}
          color={TONE[row.controlIconTone ?? "blue"].fg}
        />
      );
    case "chevron":
      return <MaterialIcons name="chevron-right" size={16} color={colors.textMuted} />;
    case "segment":
      return (
        <Pressable style={styles.segment} onPress={onPress}>
          <Text style={styles.segmentText}>{row.controlLabel}</Text>
        </Pressable>
      );
    case "none":
      return row.rightNote ? <Text style={styles.rightNote}>{row.rightNote}</Text> : null;
    default:
      return null;
  }
}

export default function SettingsSectionCard({
  section,
  onRowPress,
}: {
  section: SettingsSectionModel;
  onRowPress?: (rowId: string) => void;
}) {
  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      section.rows.filter((r) => r.control === "toggle").map((r) => [r.id, !!r.toggleDefault])
    )
  );

  const tone = TONE[section.iconTone];

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name={section.icon as any} size={16} color={tone.fg} />
        <Text style={styles.sectionTitle}>{section.title}</Text>
        {section.rightLabel ? (
          <Text style={[styles.sectionRight, { color: tone.fg }]}>{section.rightLabel}</Text>
        ) : null}
      </View>

      <View style={styles.card}>
        {section.rows.map((row, index) => {
          const rowTone = TONE[row.iconTone];
          return (
            <Pressable
              key={row.id}
              style={[styles.row, index === 0 && styles.rowFirst]}
              onPress={() => onRowPress?.(row.id)}
              disabled={row.control === "toggle" || row.control === "button"}
            >
              {row.control === "storage" ? (
                <>
                  <View style={[styles.iconBox, { backgroundColor: rowTone.bg }]}>
                    <MaterialIcons name={row.icon as any} size={16} color={rowTone.fg} />
                  </View>
                  <View style={styles.rowText}>
                    <View style={styles.titleRow}>
                      <Text style={styles.rowTitle}>{row.title}</Text>
                      <View style={styles.spacer} />
                      <Text style={styles.manageLabel}>{row.controlLabel}</Text>
                    </View>
                    <View style={styles.titleRow}>
                      <Text style={[styles.rowSub, { flex: 1 }]}>{row.sub}</Text>
                      <Text style={styles.mbLabel}>{row.rightNote}</Text>
                    </View>
                    <ProgressBar percent={row.progress ?? 0} height={5} style={styles.storageBar} />
                  </View>
                </>
              ) : (
                <>
                  <View style={[styles.iconBox, { backgroundColor: rowTone.bg }]}>
                    <MaterialIcons name={row.icon as any} size={16} color={rowTone.fg} />
                  </View>
                  <View style={styles.rowText}>
                    <View style={styles.titleRow}>
                      <Text
                        style={[styles.rowTitle, row.titleTone === "crimson" && styles.titleCrimson]}
                        numberOfLines={1}
                      >
                        {row.title}
                      </Text>
                      {row.chip ? (
                        <View style={styles.rowChip}>
                          <Text style={styles.rowChipText}>{row.chip}</Text>
                        </View>
                      ) : null}
                    </View>
                    {row.sub ? <Text style={styles.rowSub}>{row.sub}</Text> : null}
                  </View>
                  <RowControlView
                    row={row}
                    toggleValue={toggles[row.id]}
                    onToggle={() => setToggles((t) => ({ ...t, [row.id]: !t[row.id] }))}
                    onPress={() => onRowPress?.(row.id)}
                  />
                </>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    ...monoText(11, "800"),
    color: colors.textPrimary,
    letterSpacing: 0.8,
    flex: 1,
  },
  sectionRight: {
    ...monoText(9, "700"),
  },
  card: {
    backgroundColor: "#E9EBF5",
    borderRadius: 16,
    padding: 10,
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FC",
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
  },
  rowFirst: {
    marginTop: 0,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rowTitle: {
    ...monoText(10.5, "700"),
    color: colors.textPrimary,
    flexShrink: 1,
  },
  titleCrimson: {
    color: colors.crimson,
  },
  rowChip: {
    backgroundColor: colors.beige,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  rowChipText: {
    ...monoText(8, "700"),
    color: colors.amber,
  },
  rowSub: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 14,
  },
  spacer: {
    flex: 1,
  },
  manageLabel: {
    ...monoText(9, "700"),
    color: colors.primary,
  },
  mbLabel: {
    ...monoText(9, "700"),
    color: colors.textPrimary,
  },
  storageBar: {
    marginTop: 6,
  },
  button: {
    backgroundColor: "#DFE3EE",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  buttonText: {
    ...monoText(9, "700"),
    color: colors.textPrimary,
  },
  segment: {
    backgroundColor: "#DFE3EE",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    width: 62,
  },
  segmentText: {
    ...monoText(8.5, "700"),
    color: colors.textPrimary,
    textAlign: "center",
  },
  rightNote: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
    flexShrink: 1,
    maxWidth: 90,
    textAlign: "right",
  },
});