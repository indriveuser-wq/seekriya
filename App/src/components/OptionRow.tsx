import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { DrillOption } from "../types/practiceDrill.types";

interface OptionRowProps {
  option: DrillOption;
  onSelect?: (key: string) => void;
}

export default function OptionRow({ option, onSelect }: OptionRowProps) {
  const selected = option.state === "selected";

  return (
    <Pressable
      style={[styles.container, selected && styles.containerSelected, !selected && styles.containerIdle]}
      onPress={() => onSelect?.(option.key)}
    >
      <View style={[styles.letterBox, selected && styles.letterBoxSelected]}>
        <Text style={[styles.letter, selected && styles.letterSelected]}>{option.key}</Text>
      </View>

      <View style={styles.textWrap}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, selected && styles.titleSelected]}>{option.title}</Text>
          {selected && option.selectedChip ? (
            <View style={styles.selectedChip}>
              <Text style={styles.selectedChipText}>{option.selectedChip}</Text>
            </View>
          ) : null}
        </View>
        <Text style={[styles.formula, selected && styles.formulaSelected]}>{option.formula}</Text>
      </View>

      {selected ? (
        <View style={styles.checkCircle}>
          <MaterialIcons name="check" size={14} color={colors.primary} />
        </View>
      ) : (
        <View style={styles.radioCircle} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
  },
  containerIdle: {
    backgroundColor: "#ECEEF6",
    opacity: 0.6,
  },
  containerSelected: {
    backgroundColor: colors.primary,
  },
  letterBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: "#DFE3EE",
    alignItems: "center",
    justifyContent: "center",
  },
  letterBoxSelected: {
    backgroundColor: colors.primaryDark,
  },
  letter: {
    ...monoText(11, "700"),
    color: colors.textSecondary,
  },
  letterSelected: {
    color: colors.white,
  },
  textWrap: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6B7280",
  },
  titleSelected: {
    color: colors.white,
  },
  selectedChip: {
    backgroundColor: colors.white,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  selectedChipText: {
    ...monoText(8, "800"),
    color: colors.primary,
    letterSpacing: 0.6,
  },
  formula: {
    fontSize: 11,
    color: "#9AA1B0",
    marginTop: 2,
  },
  formulaSelected: {
    color: "#CFE0F8",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#B9BFCE",
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});