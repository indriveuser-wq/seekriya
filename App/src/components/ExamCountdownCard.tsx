import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

interface ExamCountdownCardProps {
  daysToExam: number;
  candidatesCount: number;
  onPress?: () => void;
}

export default function ExamCountdownCard({
  daysToExam,
  candidatesCount,
  onPress,
}: ExamCountdownCardProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name="timer-outline" size={20} color={colors.amber} />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.title}>{daysToExam} Days to SEE Board Exam</Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {`Join ${candidatesCount.toLocaleString("en-US")}+ Class 10 candidates preparing…`}
        </Text>
      </View>

      <MaterialCommunityIcons name="trending-up" size={18} color={colors.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.amberSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
  },
  title: {
    ...monoText(13, "700"),
    color: colors.amber,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
  },
});