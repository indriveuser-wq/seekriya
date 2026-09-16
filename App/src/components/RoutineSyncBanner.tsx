import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

interface RoutineSyncBannerProps {
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export default function RoutineSyncBanner({ title, subtitle, onPress }: RoutineSyncBannerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <MaterialIcons name="sync" size={18} color={colors.primary} />
      </View>

      <View style={styles.textWrap}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.titleDot} />
        </View>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>

      <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
        <Text style={styles.buttonText}>Routine</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9EBF4",
    borderRadius: 16,
    padding: 14,
    marginTop: 18,
    gap: 12,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  title: {
    ...monoText(12, "700"),
    color: colors.textPrimary,
    flexShrink: 1,
  },
  titleDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.amber,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  buttonText: {
    ...monoText(11, "700"),
    color: colors.white,
  },
});