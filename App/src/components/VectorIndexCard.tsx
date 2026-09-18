import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { VectorIndex } from "../types/notesStudio.types";

const STAT_BG = {
  blue: "rgba(59, 130, 246, 0.25)",
  red: "rgba(248, 113, 113, 0.25)",
};

const STAT_VALUE_COLOR = {
  blue: "#93C5FD",
  red: "#FCA5A5",
};

export default function VectorIndexCard({ vectorIndex }: { vectorIndex: VectorIndex }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="neurology" size={14} color="#93C5FD" />
          <Text style={styles.title}>{vectorIndex.title}</Text>
        </View>
        <MaterialIcons name="format-quote" size={20} color="rgba(255,255,255,0.4)" />
      </View>

      <View style={styles.percentRow}>
        <Text style={styles.percent}>{vectorIndex.percent}</Text>
        <View style={styles.syncChip}>
          <View style={styles.syncDot} />
          <Text style={styles.syncText}>{vectorIndex.syncChip}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        {vectorIndex.stats.map((stat) => (
          <View key={stat.label} style={[styles.statBox, { backgroundColor: STAT_BG[stat.tone] }]}>
            <Text style={[styles.statLabel, { color: STAT_VALUE_COLOR[stat.tone] }]}>{stat.label}</Text>
            <Text style={[styles.statValue, { color: STAT_VALUE_COLOR[stat.tone] }]}>{stat.value}</Text>
            {stat.sub ? <Text style={[styles.statSub, { color: STAT_VALUE_COLOR[stat.tone] }]}>{stat.sub}</Text> : null}
          </View>
        ))}
      </View>

      <View style={styles.footerRow}>
        <MaterialIcons name="check-circle" size={12} color="#93C5FD" />
        <Text style={styles.footerText}>{vectorIndex.footer}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#312E81",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  title: {
    ...monoText(9, "700"),
    color: "#E0E7FF",
    letterSpacing: 0.8,
  },
  percentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  percent: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.white,
  },
  syncChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  syncDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#4ADE80",
  },
  syncText: {
    ...monoText(8.5, "700"),
    color: "#E0E7FF",
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  statBox: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
  },
  statLabel: {
    ...monoText(8, "600"),
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 4,
  },
  statSub: {
    ...monoText(8, "600"),
    marginTop: 2,
    lineHeight: 12,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  footerText: {
    ...monoText(8.5, "600"),
    color: "#C7D2FE",
    flexShrink: 1,
  },
});