import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ProgressBar from "./ProgressBar";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { Bottleneck, Hotspot } from "../types/cohort.types";

interface HotspotDiagnosticsProps {
  title: string;
  hint: string;
  bottleneck: Bottleneck;
  hotspots: Hotspot[];
  onPushSortie: () => void;
  onHotspotPress?: (id: string) => void;
}

export default function HotspotDiagnostics({
  title,
  hint,
  bottleneck,
  hotspots,
  onPushSortie,
  onHotspotPress,
}: HotspotDiagnosticsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons name="radar" size={16} color="#6D28D9" />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
      <View style={styles.rule} />

      <View style={styles.bottleneckCard}>
        <View style={styles.bottleneckHeader}>
          <View style={styles.bottleneckIcon}>
            <MaterialIcons name="science" size={15} color={colors.crimson} />
          </View>
          <View style={styles.bottleneckChip}>
            <Text style={styles.bottleneckChipText}>{bottleneck.chip}</Text>
          </View>
        </View>

        <Text style={styles.bottleneckTitle}>{bottleneck.title}</Text>

        <View style={styles.thresholdBox}>
          <View style={styles.thresholdRow}>
            <Text style={styles.thresholdLabel}>{bottleneck.thresholdLabel}</Text>
            <Text style={styles.thresholdValue}>{bottleneck.thresholdValue}</Text>
          </View>
          <ProgressBar percent={bottleneck.progress} color={colors.crimson} height={5} style={styles.thresholdBar} />
          <View style={styles.noteRow}>
            <MaterialIcons name="error" size={12} color={colors.crimson} />
            <Text style={styles.note}>{bottleneck.note}</Text>
          </View>
        </View>

        <Pressable style={({ pressed }) => [styles.sortieButton, pressed && styles.pressed]} onPress={onPushSortie}>
          <MaterialIcons name="rocket-launch" size={15} color={colors.white} />
          <Text style={styles.sortieText}>{bottleneck.actionLabel}</Text>
        </Pressable>
      </View>

      {hotspots.map((hotspot) => (
        <Pressable key={hotspot.id} style={styles.hotspotRow} onPress={() => onHotspotPress?.(hotspot.id)}>
          <View style={styles.hotspotIcon}>
            <MaterialIcons name={hotspot.icon as any} size={16} color={colors.amber} />
          </View>
          <View style={styles.hotspotText}>
            <View style={styles.hotspotTags}>
              <View style={styles.subjectChip}>
                <Text style={styles.subjectChipText}>{hotspot.subjectChip}</Text>
              </View>
              <Text style={styles.hotspotAcc}>{hotspot.acc}</Text>
            </View>
            <Text style={styles.hotspotTitle} numberOfLines={1}>
              {hotspot.title}
            </Text>
            <Text style={styles.hotspotSub} numberOfLines={1}>
              {hotspot.sub}
            </Text>
          </View>
          <View style={styles.chevronBox}>
            <MaterialIcons name="chevron-right" size={14} color={colors.textPrimary} />
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    lineHeight: 20,
  },
  hint: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
    textAlign: "right",
    width: 80,
    lineHeight: 12,
  },
  rule: {
    height: 2,
    backgroundColor: colors.crimson,
    borderRadius: 1,
    marginTop: 6,
  },
  bottleneckCard: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 12,
    marginTop: 10,
  },
  bottleneckHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bottleneckIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#F7D9D4",
    alignItems: "center",
    justifyContent: "center",
  },
  bottleneckChip: {
    backgroundColor: colors.crimsonSoft,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  bottleneckChipText: {
    ...monoText(8, "700"),
    color: colors.crimson,
    letterSpacing: 0.6,
  },
  bottleneckTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    lineHeight: 20,
    marginTop: 8,
  },
  thresholdBox: {
    backgroundColor: "#E8EFFB",
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  thresholdRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  thresholdLabel: {
    ...monoText(9, "600"),
    color: colors.textPrimary,
    flexShrink: 1,
  },
  thresholdValue: {
    ...monoText(8.5, "700"),
    color: colors.crimson,
  },
  thresholdBar: {
    marginTop: 6,
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginTop: 8,
  },
  note: {
    flex: 1,
    fontSize: 10,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  sortieButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#4338CA",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 10,
  },
  pressed: {
    opacity: 0.9,
  },
  sortieText: {
    ...monoText(10.5, "700"),
    color: colors.white,
  },
  hotspotRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECEEF6",
    borderRadius: 14,
    padding: 10,
    marginTop: 10,
  },
  hotspotIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#F5E7CB",
    alignItems: "center",
    justifyContent: "center",
  },
  hotspotText: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  hotspotTags: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  subjectChip: {
    backgroundColor: "#CFE0F8",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  subjectChipText: {
    ...monoText(8, "700"),
    color: "#1D4ED8",
  },
  hotspotAcc: {
    ...monoText(8.5, "700"),
    color: colors.amber,
  },
  hotspotTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 4,
  },
  hotspotSub: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chevronBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: "#DFE3EE",
    alignItems: "center",
    justifyContent: "center",
  },
});