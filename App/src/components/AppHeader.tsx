import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import ArohanLogo from "./ArohanLogo";

interface AppHeaderProps {
  title: string;
  subtitle: string;
  badge: string;
  streakDays: number;
  avatarUrl: string;
  onNotificationPress?: () => void;
  onAvatarPress?: () => void;
}

export default function AppHeader({
  title,
  subtitle,
  badge,
  streakDays,
  avatarUrl,
  onNotificationPress,
  onAvatarPress,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <ArohanLogo size={40} borderRadius={12} />

      <View style={styles.titleWrap}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.spacer} />

      <View style={styles.streakPill}>
        <Text style={styles.streakEmoji}>🔥</Text>
        <Text style={styles.streakValue}>{streakDays}</Text>
      </View>

      <Pressable style={styles.iconButton} onPress={onNotificationPress}>
        <MaterialCommunityIcons name="bell-outline" size={20} color={colors.textPrimary} />
      </Pressable>

      <Pressable onPress={onAvatarPress}>
        <View style={styles.avatarWrap}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <View style={styles.avatarDot} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: colors.surfaceLight,
    shadowColor: "#1B2559",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  titleWrap: {
    marginLeft: 10,
    flexShrink: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  badge: {
    marginLeft: 8,
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    ...monoText(10, "700"),
    color: colors.primary,
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
  iconButton: {
    marginLeft: 12,
    padding: 4,
  },
  avatarWrap: {
    marginLeft: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.border,
  },
  avatarDot: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.gold,
    borderWidth: 2,
    borderColor: colors.surfaceLight,
  },
});