import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { MetricColumn, MetricModel, Tone } from "../types/topicNotes.types";

const TONE_COLOR: Record<Tone, string> = {
  blue: colors.primary,
  amber: colors.amber,
  gray: colors.textSecondary,
  crimson: colors.crimson,
  dark: colors.textPrimary,
};

function FormulaColumn({ column }: { column: MetricColumn }) {
  return (
    <View style={styles.column}>
      <Text style={[styles.colTitle, { color: TONE_COLOR[column.titleTone] }]}>{column.title}</Text>
      <Text style={styles.formula}>{column.formula}</Text>
      <Text style={styles.colSub}>{column.sub}</Text>
    </View>
  );
}

function ReactivityColumn({ column }: { column: MetricColumn }) {
  return (
    <View style={[styles.column, styles.reactBox]}>
      <Text style={[styles.colTitle, { color: TONE_COLOR[column.titleTone] }]}>{column.title}</Text>
      <Text style={styles.reactBody}>{column.body}</Text>
      <View
        style={[
          styles.reactChip,
          column.chipTone === "amber" ? styles.reactChipAmber : styles.reactChipGray,
        ]}
      >
        <Text
          style={[
            styles.reactChipText,
            column.chipTone === "amber" ? styles.reactChipTextAmber : styles.reactChipTextGray,
          ]}
        >
          {column.chip}
        </Text>
      </View>
    </View>
  );
}

function CombustionColumn({ column, last }: { column: MetricColumn; last: boolean }) {
  return (
    <View style={[styles.column, !last && styles.combustionColumn]}>
      <View style={styles.combustionTitleRow}>
        <MaterialIcons name={column.icon as any} size={13} color={TONE_COLOR[column.titleTone]} />
        <Text style={[styles.colTitle, { color: TONE_COLOR[column.titleTone] }]}>{column.title}</Text>
      </View>
      <Text style={styles.reactBody}>{column.body}</Text>
    </View>
  );
}

export default function MetricCard({ metric }: { metric: MetricModel }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{metric.label}</Text>

      <View style={styles.columnsRow}>
        {metric.kind === "formula" &&
          metric.columns.map((column) => <FormulaColumn key={column.title} column={column} />)}
        {metric.kind === "reactivity" &&
          metric.columns.map((column) => <ReactivityColumn key={column.title} column={column} />)}
        {metric.kind === "combustion" &&
          metric.columns.map((column, index) => (
            <CombustionColumn
              key={column.title}
              column={column}
              last={index === metric.columns.length - 1}
            />
          ))}
      </View>
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
  label: {
    ...monoText(8.5, "700"),
    color: colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 10,
  },
  columnsRow: {
    flexDirection: "row",
    gap: 10,
  },
  column: {
    flex: 1,
  },
  colTitle: {
    ...monoText(10.5, "700"),
  },
  formula: {
    ...monoText(15, "800"),
    color: colors.textPrimary,
    marginTop: 6,
  },
  colSub: {
    ...monoText(9.5),
    color: colors.textSecondary,
    marginTop: 4,
  },
  reactBox: {
    backgroundColor: "#E2E5F0",
    borderRadius: 10,
    padding: 10,
  },
  reactBody: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginTop: 5,
  },
  reactChip: {
    alignSelf: "flex-start",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
    marginTop: 8,
  },
  reactChipGray: {
    backgroundColor: "#D5D9E4",
  },
  reactChipAmber: {
    backgroundColor: colors.beige,
  },
  reactChipText: {
    ...monoText(8.5, "700"),
  },
  reactChipTextGray: {
    color: colors.textSecondary,
  },
  reactChipTextAmber: {
    color: colors.amber,
  },
  combustionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  combustionColumn: {
    borderRightWidth: 1,
    borderRightColor: "#DDE1EC",
    paddingRight: 10,
  },
});