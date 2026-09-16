import React from "react";
import { Text } from "react-native"
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import RichText from "./RichText";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { RichSegment } from "../types/topicNotes.types";

interface DefinitionCardProps {
  tag: string;
  segments: RichSegment[];
}

export default function DefinitionCard({ tag, segments }: DefinitionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.tagRow}>
        <MaterialIcons name="bolt" size={13} color={colors.amber} />
        <Text style={styles.tag}>{tag}</Text>
      </View>
      <RichText segments={segments} style={styles.body} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E4E7F3",
    borderLeftWidth: 3,
    borderLeftColor: colors.amber,
    borderRadius: 14,
    padding: 14,
    marginTop: 12,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tag: {
    ...monoText(9, "700"),
    color: colors.amber,
    letterSpacing: 0.8,
  },
  body: {
    fontSize: 12.5,
    color: "#4A4F5E",
    lineHeight: 20,
    marginTop: 8,
  },
});