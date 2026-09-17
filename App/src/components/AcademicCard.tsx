import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { AcademicSection } from "../types/settings.types";

export default function AcademicCard({
  academic,
  onEditDate,
  onChangeElectives,
}: {
  academic: AcademicSection;
  onEditDate?: () => void;
  onChangeElectives?: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name="verified" size={16} color={colors.primary} />
        <Text style={styles.sectionTitle}>{academic.title}</Text>
        <Text style={styles.sectionRight}>{academic.rightLabel}</Text>
      </View>

      <View style={styles.card}>
        {/* CDC grid row */}
        <View style={styles.row}>
          <View style={[styles.iconBox, { backgroundColor: "#CFE0F8" }]}>
            <MaterialIcons name="grid-view" size={16} color={colors.primary} />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle} numberOfLines={1}>
              {academic.gridTitle}
            </Text>
            <Text style={styles.rowSub}>{academic.gridSub}</Text>
          </View>
          <View style={styles.lockedChip}>
            <MaterialIcons name="check-circle" size={10} color={colors.primary} />
            <Text style={styles.lockedText}>{academic.lockedChip}</Text>
          </View>
        </View>

        {/* Exam datum box */}
        <View style={styles.datumBox}>
          <View style={styles.datumTop}>
            <MaterialIcons name="event" size={15} color={colors.amber} />
            <Text style={styles.datumTitle}>{academic.datumTitle}</Text>
            <View style={styles.spacer} />
            <Pressable onPress={onEditDate}>
              <Text style={styles.editLabel}>{academic.editLabel}</Text>
            </Pressable>
          </View>

          <View style={styles.datumValueRow}>
            <Text style={styles.datumValue}>{academic.datumValue}</Text>
            <View style={styles.daysChip}>
              <Text style={styles.daysChipText}>{academic.daysChip}</Text>
            </View>
          </View>

          <Text style={styles.datumSub}>{academic.datumSub}</Text>
        </View>

        {/* Electives */}
        <View style={styles.electivesHeader}>
          <Text style={styles.electivesLabel}>{academic.electivesLabel}</Text>
          <Pressable onPress={onChangeElectives}>
            <Text style={styles.changeLabel}>{academic.changeLabel}</Text>
          </Pressable>
        </View>
        <View style={styles.electivesRow}>
          {academic.electives.map((elective) => (
            <View key={elective.code} style={styles.electiveBox}>
              <Text style={styles.electiveCode}>{elective.code}</Text>
              <Text style={styles.electiveName}>{elective.name}</Text>
            </View>
          ))}
        </View>

        {/* GPA calibration */}
        <View style={styles.gpaHeader}>
          <MaterialIcons name="military-tech" size={14} color={colors.purple} />
          <Text style={styles.gpaLabel}>{academic.gpaLabel}</Text>
          <View style={styles.spacer} />
          <Text style={styles.gpaValue}>{academic.gpaValue}</Text>
        </View>

        <View style={styles.sliderTrack}>
          <View style={[styles.sliderFill, { width: `${academic.gpaFill}%` }]} />
          <View style={[styles.sliderThumb, { left: `${academic.gpaFill}%` }]} />
        </View>

        <View style={styles.gpaLabelsRow}>
          {academic.gpaLabels.map((item) => (
            <Text key={item.label} style={[styles.gpaLabelText, item.active && styles.gpaLabelActive]}>
              {item.label}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  sectionTitle: {
    ...monoText(11, "800"),
    color: colors.textPrimary,
    letterSpacing: 0.8,
    flex: 1,
    lineHeight: 16,
  },
  sectionRight: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
    textAlign: "right",
    width: 56,
    lineHeight: 13,
  },
  card: {
    backgroundColor: "#E9EBF5",
    borderRadius: 16,
    padding: 12,
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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
  rowTitle: {
    ...monoText(10.5, "700"),
    color: colors.textPrimary,
  },
  rowSub: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  lockedChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#CFE0F8",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  lockedText: {
    ...monoText(8, "700"),
    color: colors.primary,
    letterSpacing: 0.6,
  },
  datumBox: {
    backgroundColor: "#F8F9FC",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  datumTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  datumTitle: {
    ...monoText(10, "700"),
    color: colors.textPrimary,
  },
  spacer: {
    flex: 1,
  },
  editLabel: {
    ...monoText(9, "700"),
    color: colors.primary,
  },
  datumValueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 8,
  },
  datumValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.amber,
    flexShrink: 1,
  },
  daysChip: {
    backgroundColor: colors.beige,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  daysChipText: {
    ...monoText(8.5, "700"),
    color: colors.amber,
  },
  datumSub: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 4,
  },
  electivesHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  electivesLabel: {
    ...monoText(10, "700"),
    color: colors.textPrimary,
  },
  changeLabel: {
    ...monoText(9, "700"),
    color: colors.primary,
  },
  electivesRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
  },
  electiveBox: {
    flex: 1,
    backgroundColor: "#F8F9FC",
    borderRadius: 10,
    padding: 8,
  },
  electiveCode: {
    ...monoText(8, "700"),
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  electiveName: {
    ...monoText(10, "700"),
    color: colors.textPrimary,
    marginTop: 3,
  },
  gpaHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
  },
  gpaLabel: {
    ...monoText(10, "700"),
    color: colors.textPrimary,
  },
  gpaValue: {
    ...monoText(11, "800"),
    color: colors.purple,
  },
  sliderTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DDE1EC",
    marginTop: 12,
  },
  sliderFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  sliderThumb: {
    position: "absolute",
    top: -4,
    marginLeft: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  gpaLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  gpaLabelText: {
    ...monoText(7.5, "600"),
    color: colors.textSecondary,
  },
  gpaLabelActive: {
    color: colors.primary,
    fontWeight: "800",
  },
});