import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { AIStudioConfig } from "../types/teacherSettings.types";

export default function AIStudioCard({ config }: { config: AIStudioConfig }) {
  const [rubricOn, setRubricOn] = useState(config.rubricDefault);
  const [bilingualOn, setBilingualOn] = useState(config.bilingualDefault);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons name="smart-toy" size={15} color={colors.primary} />
        <Text style={styles.title}>{config.title}</Text>
        <View style={styles.spacer} />
        <View style={styles.engineChip}>
          <Text style={styles.engineChipText}>{config.engineChip}</Text>
        </View>
      </View>

      <View style={styles.bloomRow}>
        <Text style={styles.bloomLabel}>{config.bloomLabel}</Text>
        <Text style={styles.bloomValue}>
          {config.bloomValue}{" "}
          <Text style={styles.bloomSub}>{config.bloomSub}</Text>
        </Text>
        <MaterialIcons name="tune" size={15} color={colors.textSecondary} />
      </View>
      <Text style={styles.modeLabel}>{config.modeLabel}</Text>

      <View style={styles.thresholdRow}>
        <Text style={styles.thresholdLabel}>{config.thresholdLabel}</Text>
        <Text style={styles.thresholdValue}>{config.thresholdValue}</Text>
      </View>

      <View style={styles.sliderTrack}>
        <View style={[styles.sliderFill, { width: `${config.thresholdPercent}%` }]} />
        <View style={[styles.sliderThumb, { left: `${config.thresholdPercent}%` }]} />
      </View>
      <Text style={styles.thresholdNote}>{config.thresholdNote}</Text>

      <View style={styles.toggleRow}>
        <View style={styles.toggleText}>
          <Text style={styles.toggleLabel}>{config.rubricLabel}</Text>
          <Text style={styles.toggleSub}>{config.rubricSub}</Text>
        </View>
        <Switch
          value={rubricOn}
          onValueChange={setRubricOn}
          trackColor={{ false: "#D3D8E4", true: "#9CC3F5" }}
          thumbColor={rubricOn ? colors.primary : "#F4F6FB"}
        />
      </View>

      <View style={styles.toggleRow}>
        <View style={styles.toggleText}>
          <Text style={styles.toggleLabel}>{config.bilingualLabel}</Text>
          <Text style={styles.toggleSub}>{config.bilingualSub}</Text>
        </View>
        <Switch
          value={bilingualOn}
          onValueChange={setBilingualOn}
          trackColor={{ false: "#D3D8E4", true: "#9CC3F5" }}
          thumbColor={bilingualOn ? colors.primary : "#F4F6FB"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    marginHorizontal: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  title: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  spacer: {
    flex: 1,
  },
  engineChip: {
    backgroundColor: "#E6DDFB",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  engineChipText: {
    ...monoText(7.5, "700"),
    color: "#6D28D9",
    letterSpacing: 0.5,
  },
  bloomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  bloomLabel: {
    ...monoText(9.5, "600"),
    color: colors.textPrimary,
    flex: 1,
  },
  bloomValue: {
    ...monoText(9.5, "700"),
    color: colors.primary,
  },
  bloomSub: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
  },
  modeLabel: {
    fontSize: 11,
    color: colors.textPrimary,
    marginTop: 3,
  },
  thresholdRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  thresholdLabel: {
    ...monoText(9.5, "600"),
    color: colors.textPrimary,
  },
  thresholdValue: {
    ...monoText(9.5, "700"),
    color: colors.amber,
  },
  sliderTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DDE1EC",
    marginTop: 10,
  },
  sliderFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.amber,
  },
  sliderThumb: {
    position: "absolute",
    top: -5,
    marginLeft: -7,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.amber,
  },
  thresholdNote: {
    fontSize: 9.5,
    color: colors.textSecondary,
    lineHeight: 14,
    marginTop: 6,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#DDE1EC",
  },
  toggleText: {
    flex: 1,
    marginRight: 10,
  },
  toggleLabel: {
    fontSize: 11.5,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  toggleSub: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
});