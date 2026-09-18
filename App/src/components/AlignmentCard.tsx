import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { AlignmentCardModel } from "../types/notesStudio.types";

export default function AlignmentCard({ alignment }: { alignment: AlignmentCardModel }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.iconBox}>
          <MaterialIcons name="school" size={16} color={colors.amber} />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{alignment.title}</Text>
          <Text style={styles.sub}>{alignment.sub}</Text>
        </View>
      </View>

      <Pressable style={styles.button}>
        <MaterialIcons name="flare" size={14} color={colors.white} />
        <Text style={styles.buttonText}>{alignment.buttonLabel}</Text>
        <View style={styles.buttonSubChip}>
          <Text style={styles.buttonSubText}>{alignment.buttonSub}</Text>
        </View>
      </Pressable>
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
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#F5E7CB",
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
    fontSize: 10.5,
    color: colors.textSecondary,
    lineHeight: 15,
    marginTop: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#1E293B",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 12,
  },
  buttonText: {
    ...monoText(11, "700"),
    color: colors.white,
  },
  buttonSubChip: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  buttonSubText: {
    ...monoText(8.5, "700"),
    color: colors.white,
  },
});