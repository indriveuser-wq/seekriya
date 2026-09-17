import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { CopilotInfo } from "../types/practiceDrill.types";

export default function CopilotCard({
  copilot,
  onClose,
}: {
  copilot: CopilotInfo;
  onClose: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons name="psychology" size={16} color={colors.purple} />
        <Text style={styles.title}>{copilot.title}</Text>
        <Pressable onPress={onClose} hitSlop={8}>
          <MaterialIcons name="close" size={16} color={colors.textSecondary} />
        </Pressable>
      </View>
      <Text style={styles.quote}>{copilot.quote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6DDFB",
    borderRadius: 16,
    padding: 14,
    marginTop: 14,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: "700",
    color: "#5B21B6",
  },
  quote: {
    fontSize: 12.5,
    color: "#443C63",
    lineHeight: 20,
    marginTop: 8,
  },
});