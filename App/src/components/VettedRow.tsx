import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

export default function VettedRow({
  vetted,
  onPress,
}: {
  vetted: { title: string; sub: string };
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <MaterialIcons name="history" size={16} color={colors.textPrimary} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{vetted.title}</Text>
        <Text style={styles.sub}>{vetted.sub}</Text>
      </View>
      <View style={styles.chevronBox}>
        <MaterialIcons name="chevron-right" size={14} color={colors.textPrimary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9EBF5",
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    marginBottom: 8,
  },
  textWrap: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  title: {
    ...monoText(10, "700"),
    color: colors.textPrimary,
  },
  sub: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chevronBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: "#DFE3EE",
    alignItems: "center",
    justifyContent: "center",
  },
});