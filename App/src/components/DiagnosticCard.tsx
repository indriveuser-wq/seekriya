import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { DiagnosticCardModel } from "../types/testResult.types";

export default function DiagnosticCard({ card }: { card: DiagnosticCardModel }) {
  const toneColor = card.iconTone === "crimson" ? colors.crimson : colors.amber;

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <MaterialIcons name={card.icon as any} size={18} color={toneColor} />
      </View>

      <View style={styles.textWrap}>
        <View style={styles.tagRow}>
          <Text style={[styles.tag, { color: toneColor }]}>{card.tag}</Text>
          {card.chip ? (
            <View style={styles.chip}>
              <Text style={styles.chipText}>{card.chip}</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.body}>{card.body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ECEEF6",
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
    marginLeft: 10,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tag: {
    ...monoText(8.5, "700"),
    letterSpacing: 0.8,
  },
  chip: {
    backgroundColor: colors.crimsonSoft,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  chipText: {
    ...monoText(8, "700"),
    color: colors.crimson,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 4,
  },
  body: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 17,
    marginTop: 3,
  },
});