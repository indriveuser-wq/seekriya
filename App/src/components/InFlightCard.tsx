import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { InFlightTopic } from "../types/topicDrill.types";

export default function InFlightCard({ topic, onResume }: { topic: InFlightTopic; onResume: () => void }) {
  return (
    <LinearGradient colors={["#C9BAF1", "#E9EBF5"]} start={[0, 0]} end={[1, 0]} style={styles.container}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name="bookmark-check-outline" size={18} color="#6D28D9" />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.tag}>{topic.tag}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {topic.title}
        </Text>
        <Text style={styles.meta}>{topic.meta}</Text>
      </View>

      <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onResume}>
        <Text style={styles.buttonText}>{topic.actionLabel}</Text>
        <MaterialIcons name="arrow-forward" size={13} color={colors.white} />
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 12,
    marginTop: 16,
    gap: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#D8CCF6",
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
  },
  tag: {
    ...monoText(8.5, "700"),
    color: "#6D28D9",
    letterSpacing: 1,
  },
  title: {
    fontSize: 14.5,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 2,
  },
  meta: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  buttonText: {
    ...monoText(11, "700"),
    color: colors.white,
  },
});