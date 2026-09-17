import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

export default function PtmCard({
  ptm,
  onDownload,
}: {
  ptm: { title: string; sub: string; buttonLabel: string };
  onDownload?: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.iconBox}>
          <MaterialIcons name="picture-as-pdf" size={16} color={colors.primary} />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{ptm.title}</Text>
          <Text style={styles.sub}>{ptm.sub}</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={onDownload}>
        <MaterialIcons name="download" size={14} color={colors.primary} />
        <Text style={styles.buttonText}>{ptm.buttonLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9E6FA",
    borderRadius: 16,
    padding: 12,
    marginTop: 12,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  sub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonText: {
    ...monoText(10, "700"),
    color: colors.primary,
  },
});