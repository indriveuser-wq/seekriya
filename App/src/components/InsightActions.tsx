import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

interface InsightAction {
  id: string;
  icon: string;
  tone: "blue" | "purple";
  title: string;
  sub: string;
}

export default function InsightActions({
  actions,
  onPress,
}: {
  actions: InsightAction[];
  onPress?: (id: string) => void;
}) {
  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <Pressable key={action.id} style={styles.button} onPress={() => onPress?.(action.id)}>
          <MaterialIcons
            name={action.icon as any}
            size={16}
            color={action.tone === "blue" ? colors.primary : colors.purple}
          />
          <View style={styles.textWrap}>
            <Text style={styles.title}>{action.title}</Text>
            <Text style={styles.sub}>{action.sub}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    marginBottom: 8,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECEEF6",
    borderRadius: 12,
    padding: 10,
    gap: 8,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 10.5,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  sub: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 1,
  },
});