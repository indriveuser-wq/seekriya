import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { BoardIntel } from "../types/topicDrill.types";

export default function BoardIntelCard({ intel }: { intel: BoardIntel }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialCommunityIcons name="shield-check-outline" size={16} color={colors.amber} />
        <Text style={styles.title}>{intel.title}</Text>
        <View style={styles.spacer} />
        <View style={styles.groupChip}>
          <Text style={styles.groupText}>{intel.groupChip}</Text>
        </View>
      </View>

      <Text style={styles.body}>
        {intel.segments.map((segment, index) => (
          <Text key={index} style={segment.highlight ? styles.highlight : undefined}>
            {segment.text}
          </Text>
        ))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9EBF4",
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    ...monoText(11, "700"),
    color: colors.amber,
    letterSpacing: 0.4,
  },
  spacer: {
    flex: 1,
  },
  groupChip: {
    backgroundColor: "#DFE3EE",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  groupText: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
  body: {
    fontSize: 12.5,
    color: "#4A4F5E",
    lineHeight: 21,
    marginTop: 8,
  },
  highlight: {
    color: colors.amber,
    fontWeight: "600",
  },
});