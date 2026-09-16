import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { MatrixTone, PracticeMatrix } from "../types/topicDrill.types";

const TONE_STYLES: Record<MatrixTone, { bg: string; fg: string }> = {
  blue: { bg: "#CFE0F8", fg: colors.primary },
  purple: { bg: "#E0D7F9", fg: colors.purple },
  red: { bg: "#F7D9D4", fg: colors.crimson },
};

interface PracticeMatricesProps {
  title: string;
  settingsLabel: string;
  matrices: PracticeMatrix[];
  onPress?: (id: string) => void;
  onSettings?: () => void;
}

export default function PracticeMatrices({
  title,
  settingsLabel,
  matrices,
  onPress,
  onSettings,
}: PracticeMatricesProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={onSettings}>
          <Text style={styles.settings}>{settingsLabel}</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        {matrices.map((matrix) => {
          const tone = TONE_STYLES[matrix.tone];
          return (
            <Pressable
              key={matrix.id}
              style={styles.card}
              onPress={() => onPress?.(matrix.id)}
            >
              {matrix.badge ? <View style={styles.badgeDot} /> : null}
              <View style={[styles.iconBox, { backgroundColor: tone.bg }]}>
                <MaterialIcons name={matrix.icon as any} size={16} color={tone.fg} />
              </View>
              <Text style={styles.cardTitle}>{matrix.title}</Text>
              <Text
                style={[
                  styles.cardSub,
                  matrix.subTone === "red" ? styles.cardSubRed : undefined,
                ]}
              >
                {matrix.sub}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  settings: {
    ...monoText(10, "700"),
    color: colors.primary,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "#E9EBF4",
    borderRadius: 14,
    padding: 12,
  },
  badgeDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.crimson,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 10,
  },
  cardSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 3,
  },
  cardSubRed: {
    color: colors.crimson,
  },
});