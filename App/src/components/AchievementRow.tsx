import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { Achievement } from "../types/dashboard.types";

export default function AchievementRow({ achievement }: { achievement: Achievement }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Text style={styles.trophy}>🏆</Text>
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.label}>{achievement.label}</Text>
        <Text style={styles.title}>{achievement.title}</Text>
      </View>

      <View style={styles.xpChip}>
        <Text style={styles.xpText}>+{achievement.xp} XP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.rowLight,
    borderRadius: 16,
    padding: 12,
    marginTop: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.amberSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  trophy: {
    fontSize: 18,
  },
  textWrap: {
    flex: 1,
    marginLeft: 12,
  },
  label: {
    ...monoText(9, "700"),
    color: colors.gold,
    letterSpacing: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 2,
  },
  xpChip: {
    backgroundColor: "#DFE4F0",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  xpText: {
    ...monoText(10, "700"),
    color: colors.textPrimary,
  },
});