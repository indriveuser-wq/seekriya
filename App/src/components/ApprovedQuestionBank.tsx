import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { ApprovedQuestion, TabItem } from "../types/questionBank.types";

interface ApprovedQuestionBankProps {
  title: string;
  count: string;
  filters: TabItem[];
  questions: ApprovedQuestion[];
  exportLabel: string;
  onExport?: () => void;
}

export default function ApprovedQuestionBank({
  title,
  count,
  filters,
  questions,
  exportLabel,
  onExport,
}: ApprovedQuestionBankProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons name="inventory-2" size={16} color={colors.primary} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.spacer} />
        <Text style={styles.count}>{count}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => {
          const active = filter.key === activeFilter;
          return (
            <Pressable
              key={filter.key}
              style={[styles.filterChip, active && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter.key)}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {questions.map((question) => (
        <View key={question.id} style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionType}>
              {question.type} • {question.marks}
            </Text>
            <Text style={styles.questionMeta}>
              {question.subject} • {question.chapter}
            </Text>
            <MaterialIcons name="more-vert" size={16} color={colors.textMuted} />
          </View>
          <Text style={styles.questionPrompt} numberOfLines={2}>
            {question.prompt}
          </Text>
          <View style={styles.questionFooter}>
            <View style={styles.usedRow}>
              <MaterialIcons name="check" size={12} color={colors.primary} />
              <Text style={styles.usedText}>Used in {question.usedInTests} Tests</Text>
            </View>
            <Text style={styles.successRate}>Success Rate: {question.successRate}%</Text>
          </View>
        </View>
      ))}

      <Pressable style={styles.exportButton} onPress={onExport}>
        <MaterialIcons name="print" size={14} color={colors.primary} />
        <Text style={styles.exportText}>{exportLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  spacer: {
    flex: 1,
  },
  count: {
    ...monoText(9, "700"),
    color: colors.textSecondary,
  },
  filtersScroll: {
    height: 32,
    flexGrow: 0,
    marginBottom: 10,
  },
  filtersContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  filterChip: {
    backgroundColor: "#ECEEF6",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterChipActive: {
    backgroundColor: "#312E81",
  },
  filterText: {
    ...monoText(9.5, "600"),
    color: colors.textPrimary,
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: "700",
  },
  questionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  questionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  questionType: {
    ...monoText(9, "700"),
    color: colors.textPrimary,
  },
  questionMeta: {
    flex: 1,
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
  questionPrompt: {
    fontSize: 11.5,
    color: colors.textPrimary,
    lineHeight: 16,
    marginBottom: 8,
  },
  questionFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  usedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  usedText: {
    ...monoText(8.5, "600"),
    color: colors.primary,
  },
  successRate: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#E6DDFB",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 8,
  },
  exportText: {
    ...monoText(10, "700"),
    color: colors.primary,
  },
});