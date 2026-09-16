import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { LabData } from "../types/topicNotes.types";

export default function LabCard({ lab }: { lab: LabData }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: lab.imageUrl }} style={styles.thumb} />
      <View style={styles.textWrap}>
        <Text style={styles.tag}>{lab.tag}</Text>
        <Text style={styles.title}>{lab.title}</Text>
        <Text style={styles.body} numberOfLines={2}>
          {lab.body}
        </Text>
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
  thumb: {
    width: 46,
    height: 58,
    borderRadius: 8,
    backgroundColor: "#2A2E42",
  },
  textWrap: {
    flex: 1,
    marginLeft: 10,
  },
  tag: {
    ...monoText(8.5, "700"),
    color: colors.amber,
    letterSpacing: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 3,
  },
  body: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginTop: 3,
  },
});