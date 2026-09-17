import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { StudioConfig } from "../types/teacher.types";

export default function QuestionStudioCard({
  studio,
  onGenerate,
  onChangeFocus,
}: {
  studio: StudioConfig;
  onGenerate?: () => void;
  onChangeFocus?: () => void;
}) {
  const [pattern, setPattern] = useState(studio.defaultPattern);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.iconBox}>
          <MaterialIcons name="psychology" size={17} color={colors.white} />
        </View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{studio.title}</Text>
          <Text style={styles.subtitle}>{studio.subtitle}</Text>
        </View>
        <View style={styles.engineChip}>
          <View style={styles.engineDot} />
          <Text style={styles.engineText}>{studio.engineLabel}</Text>
        </View>
      </View>

      <View style={styles.boxesRow}>
        <View style={styles.box}>
          <View style={styles.boxLabelRow}>
            <MaterialIcons name="science" size={11} color={colors.textPrimary} />
            <Text style={styles.boxLabel}>{studio.subjectLabel}</Text>
          </View>
          <Text style={styles.boxValueDark}>{studio.subjectValue}</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.boxLabelRow}>
            <MaterialIcons name="speed" size={11} color={colors.textPrimary} />
            <Text style={styles.boxLabel}>{studio.standardLabel}</Text>
          </View>
          <View style={styles.standardRow}>
            <Text style={styles.boxValueAmber}>{studio.standardValue}</Text>
            <View style={styles.bloomChip}>
              <Text style={styles.bloomText}>{studio.bloomChip}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.focusBox}>
        <View style={styles.focusText}>
          <Text style={styles.boxLabel}>{studio.focusLabel}</Text>
          <Text style={styles.focusValue} numberOfLines={1}>
            {studio.focusValue}
          </Text>
        </View>
        <Pressable style={styles.changeChip} onPress={onChangeFocus}>
          <Text style={styles.changeText}>{studio.changeLabel}</Text>
        </Pressable>
      </View>

      <View style={styles.patternBox}>
        <View style={styles.patternHeader}>
          <Text style={styles.boxLabel}>{studio.patternLabel}</Text>
          <Text style={styles.patternValue}>{studio.patternValue}</Text>
        </View>
        <View style={styles.patternRow}>
          {studio.patterns.map((item) => {
            const active = item === pattern;
            return (
              <Pressable
                key={item}
                style={[styles.patternChip, active && styles.patternChipActive]}
                onPress={() => setPattern(item)}
              >
                <Text style={[styles.patternChipText, active && styles.patternChipTextActive]}>
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Pressable style={({ pressed }) => [styles.generateButton, pressed && styles.pressed]} onPress={onGenerate}>
        <MaterialIcons name="auto-awesome" size={16} color={colors.white} />
        <Text style={styles.generateText}>{studio.generateLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9EBF5",
    borderRadius: 20,
    padding: 14,
    marginTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#8B5CF6",
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrap: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 10.5,
    color: colors.textSecondary,
    lineHeight: 15,
    marginTop: 2,
  },
  engineChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#CFE0F8",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 74,
  },
  engineDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  engineText: {
    ...monoText(8.5, "700"),
    color: colors.primary,
    flexShrink: 1,
  },
  boxesRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  box: {
    flex: 1,
    backgroundColor: "#F4F6FB",
    borderRadius: 10,
    padding: 10,
  },
  boxLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  boxLabel: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
  },
  boxValueDark: {
    ...monoText(10.5, "700"),
    color: colors.textPrimary,
    marginTop: 5,
  },
  standardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 5,
  },
  boxValueAmber: {
    ...monoText(10.5, "700"),
    color: colors.amber,
    flexShrink: 1,
  },
  bloomChip: {
    backgroundColor: colors.beige,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  bloomText: {
    ...monoText(8, "700"),
    color: colors.amber,
  },
  focusBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F6FB",
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  focusText: {
    flex: 1,
    marginRight: 8,
  },
  focusValue: {
    ...monoText(11.5, "700"),
    color: colors.textPrimary,
    marginTop: 4,
  },
  changeChip: {
    backgroundColor: "#CFE0F8",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  changeText: {
    ...monoText(8.5, "700"),
    color: colors.primary,
  },
  patternBox: {
    backgroundColor: "#F4F6FB",
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  patternHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  patternValue: {
    ...monoText(8.5, "700"),
    color: colors.primary,
  },
  patternRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 8,
  },
  patternChip: {
    flex: 1,
    backgroundColor: "#E2E5F0",
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: "center",
  },
  patternChipActive: {
    backgroundColor: colors.primary,
  },
  patternChipText: {
    ...monoText(9, "600"),
    color: colors.textPrimary,
  },
  patternChipTextActive: {
    color: colors.white,
    fontWeight: "700",
  },
  generateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 13,
    marginTop: 12,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  generateText: {
    ...monoText(11.5, "700"),
    color: colors.white,
  },
});