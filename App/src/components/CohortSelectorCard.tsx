import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { CohortSelector } from "../types/cohort.types";

export default function CohortSelectorCard({ selector }: { selector: CohortSelector }) {
  return (
    <View style={styles.container}>
      <View style={styles.chipsRow}>
        <View style={styles.activeChip}>
          <MaterialIcons name="groups" size={11} color={colors.primary} />
          <Text style={styles.activeChipText}>{selector.activeChip}</Text>
        </View>
        <View style={styles.spacer} />
        <View style={styles.liveChip}>
          <MaterialIcons name="bolt" size={11} color="#6D28D9" />
          <Text style={styles.liveChipText}>{selector.liveChip}</Text>
        </View>
      </View>

      <Pressable style={styles.titleRow}>
        <Text style={styles.title} numberOfLines={1}>
          {selector.title}
        </Text>
        <MaterialIcons name="expand-more" size={18} color={colors.textPrimary} />
      </Pressable>
      <Text style={styles.sub} numberOfLines={1}>
        {selector.sub}
      </Text>

      <View style={styles.horizonBox}>
        <View style={styles.horizonIcon}>
          <MaterialIcons name="timer" size={16} color={colors.white} />
        </View>
        <View style={styles.horizonText}>
          <Text style={styles.horizonTag}>{selector.horizonTag}</Text>
          <Text style={styles.horizonValue}>{selector.horizonValue}</Text>
        </View>
        <View style={styles.distBox}>
          <Text style={styles.distLabel}>{selector.distLabel}</Text>
          <Text style={styles.distValue}>{selector.distValue}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 12,
    marginTop: 12,
  },
  chipsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#CFE0F8",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  activeChipText: {
    ...monoText(8.5, "700"),
    color: "#1D4ED8",
  },
  spacer: {
    flex: 1,
  },
  liveChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E6DDFB",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  liveChipText: {
    ...monoText(8.5, "700"),
    color: "#6D28D9",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  sub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 3,
  },
  horizonBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4338CA",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  horizonIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  horizonText: {
    flex: 1,
    marginLeft: 10,
  },
  horizonTag: {
    ...monoText(8, "700"),
    color: "rgba(255,255,255,0.85)",
    letterSpacing: 1,
  },
  horizonValue: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
    marginTop: 2,
  },
  distBox: {
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
  },
  distLabel: {
    ...monoText(8, "600"),
    color: "rgba(255,255,255,0.85)",
  },
  distValue: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.white,
    marginTop: 2,
  },
});