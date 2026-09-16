import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

export default function PrioritizeRow({ label }: { label: string }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="flash" size={15} color={colors.primary} />
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={enabled}
        onValueChange={setEnabled}
        trackColor={{ false: "#D3D8E4", true: colors.primarySoft }}
        thumbColor={enabled ? colors.primary : "#F4F6FB"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F1F3F9",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
  },
  label: {
    ...monoText(11, "600"),
    color: colors.textPrimary,
    flex: 1,
  },
});