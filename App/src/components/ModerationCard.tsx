import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { ModerationInfo } from "../types/testsCenter.types";

export default function ModerationCard({ moderation }: { moderation: ModerationInfo }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.iconBox}>
          <MaterialIcons name="verified-user" size={16} color={colors.white} />
        </View>
        <Text style={styles.title}>{moderation.title}</Text>
        <View style={styles.badgeBox}>
          <Text style={styles.badge}>{moderation.badge}</Text>
        </View>
      </View>
      <Text style={styles.body}>{moderation.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6DDFB",
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#4338CA", // Dark indigo
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  badgeBox: {
    backgroundColor: "#312E81", // Dark purple pill
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badge: {
    ...monoText(8.5, "700"),
    color: colors.white,
  },
  body: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 17,
    marginTop: 8,
  },
});