import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

interface AICalibrationHeaderProps {
  title: string;
  subtitle: string;
  auditBadge: string;
  reviewCount: string;
}

export default function AICalibrationHeader({
  title,
  subtitle,
  auditBadge,
  reviewCount,
}: AICalibrationHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.badgesRow}>
        <View style={styles.auditBadge}>
          <MaterialIcons name="rule" size={12} color={colors.white} />
          <Text style={styles.auditBadgeText}>{auditBadge}</Text>
        </View>
        <View style={styles.reviewCount}>
          <Text style={styles.reviewCountText}>{reviewCount}</Text>
        </View>
      </View>

      <Text style={styles.mainTitle}>{title}</Text>
      <Text style={styles.mainSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  badgesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  auditBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#7C3AED",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  auditBadgeText: {
    ...monoText(9, "700"),
    color: colors.white,
  },
  reviewCount: {
    backgroundColor: "#F5E7CB",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  reviewCountText: {
    ...monoText(9, "700"),
    color: colors.amber,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 12,
  },
  mainSubtitle: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 16,
    marginTop: 4,
  },
});