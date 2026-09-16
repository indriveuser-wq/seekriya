import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { Mission, MissionActionStyle, MissionIconKey } from "../types/dashboard.types";

const ICONS: Record<MissionIconKey, {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}> = {
  notes: { name: "note-text-outline", color: colors.primary },
  brain: { name: "head-question-outline", color: colors.purple },
  replay: { name: "replay", color: colors.gold },
};

const ACTION_STYLES: Record<MissionActionStyle, { bg: string; fg: string }> = {
  "soft-blue": { bg: colors.softButton, fg: colors.primary },
  "solid-blue": { bg: colors.primary, fg: colors.white },
  "soft-amber": { bg: colors.softButton, fg: colors.gold },
};

interface MissionRowProps {
  mission: Mission;
  onPress: () => void;
}

export default function MissionRow({ mission, onPress }: MissionRowProps) {
  const icon = ICONS[mission.iconKey];
  const action = ACTION_STYLES[mission.actionStyle];

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name={icon.name} size={20} color={icon.color} />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.title} numberOfLines={1}>
          {mission.title}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {mission.metaLeft} • {mission.metaRight}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.action,
          { backgroundColor: action.bg },
          pressed && styles.pressed,
        ]}
        onPress={onPress}
      >
        <Text style={[styles.actionText, { color: action.fg }]}>{mission.actionLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.rowLight,
    borderRadius: 16,
    padding: 12,
    marginTop: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.iconBox,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  action: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  pressed: {
    opacity: 0.8,
  },
  actionText: {
    ...monoText(11, "700"),
  },
});