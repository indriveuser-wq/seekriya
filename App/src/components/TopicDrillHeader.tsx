import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArohanLogo from "./ArohanLogo";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

interface TopicDrillHeaderProps {
  title: string;
  subtitle: string;
  streakDays: number;
  avatarUrl: string;
  onBack: () => void;
  onNotification?: () => void;
}

export default function TopicDrillHeader({
  title,
  subtitle,
  streakDays,
  avatarUrl,
  onBack,
  onNotification,
}: TopicDrillHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 6 }]}>
      <Pressable onPress={onBack} hitSlop={10} style={styles.backButton}>
        <MaterialIcons name="arrow-back-ios" size={20} color={colors.textPrimary} />
      </Pressable>

      <ArohanLogo size={38} borderRadius={11} />

      <View style={styles.titleWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.spacer} />

      <View style={styles.streakPill}>
        <Text style={styles.streakEmoji}>🔥</Text>
        <Text style={styles.streakValue}>{streakDays}</Text>
      </View>

      {onNotification ? (
        <Pressable style={styles.bellButton} onPress={onNotification}>
          <MaterialIcons name="notifications-none" size={19} color={colors.textPrimary} />
        </Pressable>
      ) : null}

      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingBottom: 10,
    backgroundColor: colors.surfaceLight,
    shadowColor: "#1B2559",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  backButton: {
    padding: 6,
    marginRight: 4,
  },
  titleWrap: {
    marginLeft: 10,
    flexShrink: 1,
  },
  title: {
    ...monoText(13, "800"),
    color: colors.textPrimary,
    letterSpacing: 0.6,
  },
  subtitle: {
    ...monoText(10),
    color: colors.textSecondary,
    marginTop: 1,
  },
  spacer: {
    flex: 1,
  },
  streakPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cream,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  streakEmoji: {
    fontSize: 12,
  },
  streakValue: {
    ...monoText(12, "700"),
    color: colors.textPrimary,
  },
  bellButton: {
    marginLeft: 12,
    padding: 2,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 10,
    marginLeft: 12,
    backgroundColor: colors.border,
  },
});