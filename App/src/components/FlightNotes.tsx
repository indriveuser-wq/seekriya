import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { FlightModule, ModuleState } from "../types/topicDrill.types";

const MODULE_ICON: Record<ModuleState, {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  circleBg: string;
  iconColor: string;
}> = {
  done: { name: "check-circle-outline", circleBg: "#CFE0F8", iconColor: colors.primary },
  active: { name: "menu-book", circleBg: colors.primary, iconColor: colors.white },
  next: { name: "science", circleBg: "#DDE1EA", iconColor: "#8A90A0" },
};

interface FlightNotesProps {
  title: string;
  modulesCountLabel: string;
  curatorLabel: string;
  modules: FlightModule[];
  onModulePress?: (id: string) => void;
}

export default function FlightNotes({
  title,
  modulesCountLabel,
  curatorLabel,
  modules,
  onModulePress,
}: FlightNotesProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{modulesCountLabel}</Text>
      </View>

      <View style={styles.curatorRow}>
        <MaterialIcons name="workspace-premium" size={14} color={colors.amber} />
        <Text style={styles.curatorText}>{curatorLabel}</Text>
      </View>

      {modules.map((module) => {
        const icon = MODULE_ICON[module.state];
        return (
          <Pressable
            key={module.id}
            style={[styles.moduleRow, module.state === "next" && styles.moduleFaded]}
            onPress={() => onModulePress?.(module.id)}
          >
            <View style={[styles.moduleIcon, { backgroundColor: icon.circleBg }]}>
              <MaterialIcons name={icon.name} size={16} color={icon.iconColor} />
            </View>

            <View style={styles.moduleText}>
              <Text style={styles.moduleTitle} numberOfLines={1}>
                {module.title}
              </Text>
              <Text
                style={[
                  styles.moduleSub,
                  module.subTone === "blue" ? styles.moduleSubBlue : undefined,
                ]}
                numberOfLines={2}
              >
                {module.sub}
              </Text>
            </View>

            <View
              style={[
                styles.actionChip,
                module.state === "active" && styles.actionChipActive,
              ]}
            >
              <Text
                style={[
                  styles.actionText,
                  module.state === "active" && styles.actionTextActive,
                ]}
              >
                {module.actionLabel}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  count: {
    ...monoText(10, "600"),
    color: colors.textSecondary,
  },
  curatorRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginTop: 8,
  },
  curatorText: {
    ...monoText(10, "600"),
    color: colors.textPrimary,
    lineHeight: 15,
    flex: 1,
  },
  moduleRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9EBF4",
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
  },
  moduleFaded: {
    opacity: 0.75,
  },
  moduleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  moduleText: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  moduleTitle: {
    ...monoText(11, "700"),
    color: colors.textPrimary,
  },
  moduleSub: {
    fontSize: 10.5,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 15,
  },
  moduleSubBlue: {
    color: colors.primary,
  },
  actionChip: {
    backgroundColor: "#DFE3EE",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  actionChipActive: {
    backgroundColor: colors.primary,
    paddingVertical: 7,
  },
  actionText: {
    ...monoText(9, "700"),
    color: colors.textPrimary,
  },
  actionTextActive: {
    color: colors.white,
  },
});