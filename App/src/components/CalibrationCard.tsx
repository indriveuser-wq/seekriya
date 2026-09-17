import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { CalibrationCardModel } from "../types/teacher.types";

export default function CalibrationCard({
  calibration,
  onReview,
}: {
  calibration: CalibrationCardModel;
  onReview?: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.iconBox}>
          <MaterialIcons name="priority-high" size={15} color={colors.crimson} />
        </View>
        <Text style={styles.title}>{calibration.title}</Text>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{calibration.chip}</Text>
        </View>
      </View>

      <View style={styles.innerBox}>
        <Image source={{ uri: calibration.thumbUrl }} style={styles.thumb} />
        <View style={styles.textWrap}>
          <View style={styles.nameRow}>
            <Text style={styles.studentName}>{calibration.studentName}</Text>
            <Text style={styles.score}>{calibration.score}</Text>
          </View>
          <Text style={styles.topic}>{calibration.topic}</Text>
          <View style={styles.noteRow}>
            <MaterialIcons name="error" size={12} color={colors.amber} />
            <Text style={styles.note}>{calibration.note}</Text>
          </View>
        </View>
      </View>

      <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onReview}>
        <Text style={styles.buttonText}>{calibration.actionLabel}</Text>
        <MaterialIcons name="arrow-forward" size={15} color={colors.textPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9EBF5",
    borderRadius: 20,
    padding: 14,
    marginTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#F7D9D4",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  chip: {
    backgroundColor: colors.crimsonSoft,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chipText: {
    ...monoText(8.5, "700"),
    color: colors.crimson,
  },
  innerBox: {
    flexDirection: "row",
    backgroundColor: "#F8F9FC",
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#2A2E42",
  },
  textWrap: {
    flex: 1,
    marginLeft: 10,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  studentName: {
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.textPrimary,
    flexShrink: 1,
  },
  score: {
    ...monoText(11.5, "800"),
    color: colors.primary,
  },
  topic: {
    fontSize: 10.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
    marginTop: 5,
  },
  note: {
    flex: 1,
    fontSize: 10.5,
    color: colors.amber,
    lineHeight: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#DFE3EE",
    borderRadius: 10,
    paddingVertical: 11,
    marginTop: 10,
  },
  pressed: {
    opacity: 0.85,
  },
  buttonText: {
    ...monoText(10.5, "700"),
    color: colors.textPrimary,
  },
});