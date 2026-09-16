import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { AttentionItem } from "../types/dashboard.types";

interface AttentionCardProps {
  item: AttentionItem;
  onPractice: () => void;
}

export default function AttentionCard({ item, onPractice }: AttentionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.leftTags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
          <Text style={styles.subject}>{item.subject}</Text>
        </View>

        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPractice}>
          <Text style={styles.buttonText}>Practice Now</Text>
          <Text style={styles.bolt}>⚡</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.detail}>
        Your practice accuracy is <Text style={styles.detailBold}>{item.accuracyPercent}%</Text>
        {" • "}
        Exam weightage: {item.weightage}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.crimsonSoft,
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  leftTags: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },
  tag: {
    backgroundColor: colors.crimson,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    ...monoText(9, "700"),
    color: colors.white,
    letterSpacing: 0.6,
  },
  subject: {
    ...monoText(11, "700"),
    color: colors.crimson,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.crimson,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pressed: {
    opacity: 0.85,
  },
  buttonText: {
    ...monoText(11, "700"),
    color: colors.white,
  },
  bolt: {
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.crimson,
    marginTop: 10,
  },
  detail: {
    fontSize: 13,
    color: colors.crimson,
    lineHeight: 20,
    marginTop: 6,
  },
  detailBold: {
    fontWeight: "700",
  },
});