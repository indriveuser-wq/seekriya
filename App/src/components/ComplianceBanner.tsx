import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

export default function ComplianceBanner({ text }: { text: string }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="shield-check-outline" size={18} color={colors.amber} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colors.surfaceLight,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 16,
  },
  text: {
    ...monoText(11),
    color: colors.textPrimary,
    lineHeight: 18,
    flexShrink: 1,
    textAlign: "center",
  },
});