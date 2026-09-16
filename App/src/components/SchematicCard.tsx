import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { SchematicData } from "../types/topicNotes.types";

export default function SchematicCard({ schematic }: { schematic: SchematicData }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>{schematic.label}</Text>
        <Text style={styles.equation}>{schematic.equation}</Text>
      </View>

      <View style={styles.darkBox}>
        <View style={styles.sideCol}>
          <Text style={styles.darkFormula}>{schematic.left.formula}</Text>
          <Text style={styles.darkName}>{schematic.left.name}</Text>
          <View style={styles.darkChip}>
            <Text style={styles.darkChipText}>{schematic.left.chip}</Text>
          </View>
        </View>

        <View style={styles.middleCol}>
          <Text style={styles.reagent}>{schematic.middle.reagent}</Text>
          <Text style={styles.reagentSub}>{schematic.middle.reagentSub}</Text>
          <MaterialIcons name="arrow-forward" size={16} color={colors.primary} style={styles.arrow} />
          <View style={styles.middleDot} />
        </View>

        <View style={styles.sideCol}>
          <Text style={styles.darkFormula}>{schematic.right.formula}</Text>
          <Text style={styles.darkName}>{schematic.right.name}</Text>
          <Text style={styles.result}>{schematic.right.result}</Text>
        </View>
      </View>

      <Text style={styles.caption}>{schematic.caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  label: {
    ...monoText(8.5, "700"),
    color: colors.textSecondary,
    letterSpacing: 1,
    flexShrink: 1,
  },
  equation: {
    ...monoText(9, "700"),
    color: colors.amber,
  },
  darkBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#171A2B",
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },
  sideCol: {
    alignItems: "center",
    flex: 1,
  },
  darkFormula: {
    ...monoText(11.5, "800"),
    color: colors.white,
  },
  darkName: {
    ...monoText(8.5),
    color: "#9AA1B0",
    marginTop: 3,
  },
  darkChip: {
    backgroundColor: "#2A2E42",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginTop: 6,
  },
  darkChipText: {
    ...monoText(7.5, "600"),
    color: "#C7CBDA",
  },
  middleCol: {
    alignItems: "center",
    paddingHorizontal: 6,
  },
  reagent: {
    ...monoText(10, "700"),
    color: colors.amber,
  },
  reagentSub: {
    ...monoText(7.5, "600"),
    color: colors.amber,
    marginTop: 2,
  },
  arrow: {
    marginTop: 5,
  },
  middleDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.amber,
    marginTop: 5,
  },
  result: {
    ...monoText(8.5, "700"),
    color: colors.white,
    marginTop: 6,
  },
  caption: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 10,
  },
});