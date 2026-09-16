import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import RichText from "./RichText";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { RichSegment } from "../types/topicNotes.types";

interface BoardTipCardProps {
  title: string;
  segments: RichSegment[];
  quote: string;
}

export default function BoardTipCard({ title, segments, quote }: BoardTipCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons name="warning" size={14} color={colors.crimson} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <RichText segments={segments} style={styles.body} />

      <View style={styles.quoteBox}>
        <Text style={styles.quote}>{quote}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F8FC",
    borderLeftWidth: 3,
    borderLeftColor: colors.crimson,
    borderRadius: 14,
    padding: 14,
    marginTop: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  title: {
    ...monoText(9.5, "700"),
    color: colors.crimson,
    letterSpacing: 0.5,
    flexShrink: 1,
  },
  body: {
    fontSize: 12.5,
    color: "#4A4F5E",
    lineHeight: 20,
    marginTop: 8,
  },
  quoteBox: {
    backgroundColor: "#E8F0FB",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  quote: {
    fontSize: 12,
    fontStyle: "italic",
    color: colors.primary,
    lineHeight: 19,
  },
});