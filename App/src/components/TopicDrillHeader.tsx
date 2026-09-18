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
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <Pressable onPress={onBack} hitSlop={10} style={styles.backButton}>
        <MaterialIcons name="arrow-back-ios" size={22} color={colors.textPrimary} />
      </Pressable>

      <ArohanLogo size={44} borderRadius={12} />

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
          <MaterialIcons name="notifications-none" size={22} color={colors.textPrimary} />
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
    paddingHorizontal: 16,
    paddingBottom: 14,
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
    marginLeft: 12,
    flexShrink: 1,
  },
  title: {
    ...monoText(14, "800"),
    color: colors.textPrimary,
    letterSpacing: 0.6,
  },
  subtitle: {
    ...monoText(11),
    color: colors.textSecondary,
    marginTop: 2,
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
    paddingVertical: 7,
    gap: 4,
  },
  streakEmoji: {
    fontSize: 13,
  },
  streakValue: {
    ...monoText(12, "700"),
    color: colors.textPrimary,
  },
  bellButton: {
    marginLeft: 12,
    padding: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginLeft: 12,
    backgroundColor: colors.border,
  },
});