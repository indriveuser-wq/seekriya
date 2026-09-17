import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { OtherQuestion } from "../types/testInsights.types";

export default function OtherQuestions({
  label,
  questions,
  onPress,
}: {
  label: string;
  questions: OtherQuestion[];
  onPress?: (id: string) => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {questions.map((question) => (
        <Pressable key={question.id} style={styles.row} onPress={() => onPress?.(question.id)}>
          <MaterialIcons
            name={question.icon as any}
            size={16}
            color={question.tone === "blue" ? colors.primary : colors.amber}
          />
          <View style={styles.textWrap}>
            <Text style={styles.title} numberOfLines={1}>
              {question.title}
            </Text>
            <Text style={styles.sub} numberOfLines={1}>
              {question.sub}
            </Text>
          </View>

          {question.chip ? (
            <View style={styles.chip}>
              <Text style={styles.chipText}>{question.chip}</Text>
            </View>
          ) : null}

          <Text
            style={[
              styles.score,
              { color: question.tone === "blue" ? colors.primary : colors.amber },
            ]}
          >
            {question.score}
          </Text>
          <MaterialIcons name="chevron-right" size={14} color={colors.textMuted} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  label: {
    ...monoText(8.5, "700"),
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECEEF6",
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
  },
  textWrap: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  title: {
    ...monoText(10.5, "700"),
    color: colors.textPrimary,
  },
  sub: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chip: {
    backgroundColor: colors.beige,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 6,
  },
  chipText: {
    ...monoText(7.5, "700"),
    color: colors.amber,
  },
  score: {
    ...monoText(10.5, "700"),
  },
});