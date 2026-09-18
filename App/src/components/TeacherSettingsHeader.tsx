import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArohanLogo from "./ArohanLogo";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { TeacherSettingsHeaderInfo } from "../types/teacherSettings.types";

export default function TeacherSettingsHeader({
  header,
  avatarUrl,
  onNotification,
}: {
  header: TeacherSettingsHeaderInfo;
  avatarUrl: string;
  onNotification?: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <ArohanLogo size={44} borderRadius={12} />

      <View style={styles.titleWrap}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{header.appTitle}</Text>
          <View style={styles.gradeChip}>
            <Text style={styles.gradeChipText}>{header.gradeChip}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>{header.screenTitle}</Text>
      </View>

      <View style={styles.spacer} />

      <Pressable style={styles.bellButton} onPress={onNotification}>
        <MaterialIcons name="notifications-none" size={22} color={colors.textPrimary} />
        <View style={styles.bellDot} />
      </Pressable>

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
  titleWrap: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  gradeChip: {
    backgroundColor: "#F5E7CB",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  gradeChipText: {
    ...monoText(8, "700"),
    color: colors.amber,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: 2,
  },
  spacer: {
    flex: 1,
  },
  bellButton: {
    marginLeft: 12,
    padding: 4,
  },
  bellDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.crimson,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginLeft: 12,
    backgroundColor: colors.border,
  },
});