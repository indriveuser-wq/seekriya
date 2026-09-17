import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ProgressBar from "./ProgressBar";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { AscensionInfo } from "../types/testsCenter.types";

export default function AscensionCard({ ascension }: { ascension: AscensionInfo }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.textWrap}>
          <Text style={styles.tag}>{ascension.tag}</Text>
          <Text style={styles.title}>{ascension.title}</Text>
        </View>
        <View style={styles.iconBox}>
          <MaterialIcons name="military-tech" size={18} color={colors.amber} />
        </View>
      </View>

      <View style={styles.progressRow}>
        <ProgressBar percent={ascension.percent} style={styles.progress} />
        <Text style={styles.verified}>{ascension.verifiedLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWrap: {
    flex: 1,
    paddingRight: 10,
  },
  tag: {
    ...monoText(8.5, "700"),
    color: colors.amber,
    letterSpacing: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 4,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.amberSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  progress: {
    flex: 1,
  },
  verified: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
});