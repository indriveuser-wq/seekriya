import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import RichText from "./RichText";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { GapCardModel } from "../types/testInsights.types";

export default function GapCard({ gap }: { gap: GapCardModel }) {
  return (
    <View style={styles.container}>
      <View style={styles.tagRow}>
        <MaterialIcons name="warning" size={14} color={colors.crimson} />
        <Text style={styles.tag}>{gap.tag}</Text>
      </View>

      <Text style={styles.title}>{gap.title}</Text>

      <RichText segments={gap.segments} style={styles.body} />

      <View style={styles.footerRow}>
        <View style={styles.freqBox}>
          <Text style={styles.freqLabel}>{gap.freqLabel}</Text>
        </View>
        <View style={styles.freqNoteWrap}>
          <Text style={styles.freqNote}>{gap.freqNote}</Text>
          <MaterialIcons name="analytics" size={14} color={colors.crimson} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.crimsonSoft,
    borderRadius: 16,
    padding: 14,
    marginTop: 14,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tag: {
    ...monoText(9, "700"),
    color: colors.crimson,
    letterSpacing: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.crimson,
    lineHeight: 21,
    marginTop: 8,
  },
  body: {
    fontSize: 12,
    color: "#C0182B",
    lineHeight: 18,
    marginTop: 6,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  freqBox: {
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  freqLabel: {
    ...monoText(8, "700"),
    color: colors.crimson,
    letterSpacing: 0.5,
    lineHeight: 12,
  },
  freqNoteWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
  },
  freqNote: {
    fontSize: 10.5,
    color: colors.crimson,
    lineHeight: 14,
    flexShrink: 1,
    textAlign: "right",
  },
});