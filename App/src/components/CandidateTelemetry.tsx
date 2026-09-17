import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import StudentRowCard from "./StudentRowCard";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { StudentCardModel } from "../types/cohort.types";

interface CandidateTelemetryProps {
  title: string;
  sub: string;
  chip: string;
  filters: string[];
  students: StudentCardModel[];
  onNudge?: (id: string) => void;
  onDossier?: (id: string) => void;
}

export default function CandidateTelemetry({
  title,
  sub,
  chip,
  filters,
  students,
  onNudge,
  onDossier,
}: CandidateTelemetryProps) {
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.sub}>{sub}</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{chip}</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll} contentContainerStyle={styles.filtersContent}>
        {filters.map((filter, index) => {
          const active = index === activeFilter;
          return (
            <Pressable
              key={filter}
              style={[styles.filterChip, active && styles.filterChipActive]}
              onPress={() => setActiveFilter(index)}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{filter}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {students.map((student) => (
        <StudentRowCard key={student.id} student={student} onNudge={onNudge} onDossier={onDossier} />
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
  },
  headerText: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  sub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chip: {
    backgroundColor: "#CFE0F8",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chipText: {
    ...monoText(8.5, "700"),
    color: "#1D4ED8",
  },
  filtersScroll: {
    marginTop: 10,
    height: 28,
    flexGrow: 0,
  },
  filtersContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 16,
  },
  filterChip: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#ECEEF6",
  },
  filterChipActive: {
    backgroundColor: "#5B21B6",
  },
  filterText: {
    ...monoText(9, "600"),
    color: colors.textPrimary,
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: "700",
  },
});