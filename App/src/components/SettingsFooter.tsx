import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

export default function SettingsFooter({
  version,
  compliance,
}: {
  version: string;
  compliance: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.versionRow}>
        <View style={styles.dot} />
        <Text style={styles.version}>{version}</Text>
      </View>
      <Text style={styles.compliance}>{compliance}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 18,
    marginBottom: 8,
  },
  versionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  version: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
  },
  compliance: {
    ...monoText(8, "600"),
    color: colors.textMuted,
    marginTop: 4,
    textAlign: "center",
  },
});