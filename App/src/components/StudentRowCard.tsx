import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { StudentCardModel } from "../types/cohort.types";

const BADGE_BG = {
  crimson: colors.crimson,
  amber: colors.amber,
  blue: colors.primary,
};

const TAIL_COLOR = {
  crimson: colors.crimson,
  amber: colors.amber,
  gray: colors.textSecondary,
};

export default function StudentRowCard({
  student,
  onNudge,
  onDossier,
}: {
  student: StudentCardModel;
  onNudge?: (id: string) => void;
  onDossier?: (id: string) => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.avatarWrap}>
          <Image source={{ uri: student.avatarUrl }} style={styles.avatar} />
          <View style={[styles.badge, { backgroundColor: BADGE_BG[student.badge.tone] }]}>
            <Text style={styles.badgeText}>{student.badge.text}</Text>
          </View>
        </View>

        <View style={styles.nameWrap}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{student.name}</Text>
            <View style={styles.levelChip}>
              <Text style={styles.levelChipText}>{student.levelChip}</Text>
            </View>
            {student.extraChip ? (
              <View
                style={[
                  styles.levelChip,
                  student.extraChip.tone === "blue-solid" && styles.solidChip,
                ]}
              >
                <Text
                  style={[
                    styles.levelChipText,
                    student.extraChip.tone === "blue-solid" && styles.solidChipText,
                  ]}
                >
                  {student.extraChip.label}
                </Text>
              </View>
            ) : null}
          </View>

          <View style={styles.statRow}>
            <Text style={[styles.statValue, { color: student.statTone === "crimson" ? colors.crimson : colors.primary }]}>
              {student.statValue}
            </Text>
            {student.middleIcon ? (
              <MaterialIcons name={student.middleIcon as any} size={11} color={colors.amber} />
            ) : null}
            {student.middleLabel ? <Text style={styles.middleLabel}>{student.middleLabel}</Text> : null}
            {student.tail ? (
              <Text style={[styles.tail, { color: TAIL_COLOR[student.tailTone ?? "gray"] }]}>{student.tail}</Text>
            ) : null}
          </View>
        </View>

        {student.actionChip ? (
          <View style={styles.actionChip}>
            <Text style={styles.actionChipText}>{student.actionChip}</Text>
          </View>
        ) : null}
      </View>

      {student.flag ? (
        <View style={styles.flagRow}>
          <MaterialIcons name="bubble-chart" size={12} color="#6D28D9" />
          <Text style={styles.flagText} numberOfLines={1}>
            {student.flag.text}
          </Text>
          <Pressable style={styles.nudgeButton} onPress={() => onNudge?.(student.id)}>
            <MaterialIcons name="send" size={11} color="#6D28D9" />
            <Text style={styles.nudgeText}>{student.flag.action}</Text>
          </Pressable>
        </View>
      ) : null}

      {student.footer ? (
        <Pressable style={styles.footerRow} onPress={() => onDossier?.(student.id)}>
          <Text style={styles.footerText} numberOfLines={1}>
            {student.footer.text}
          </Text>
          <Text style={styles.footerAction}>{student.footer.action}</Text>
          <MaterialIcons name="arrow-forward" size={12} color={colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 12,
    marginTop: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.border,
  },
  badge: {
    position: "absolute",
    bottom: -4,
    left: -4,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: "#ECEEF6",
  },
  badgeText: {
    ...monoText(7, "800"),
    color: colors.white,
  },
  nameWrap: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  name: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
    flexShrink: 1,
  },
  levelChip: {
    backgroundColor: "#E6DDFB",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  levelChipText: {
    ...monoText(8, "700"),
    color: "#6D28D9",
  },
  solidChip: {
    backgroundColor: colors.primary,
  },
  solidChipText: {
    color: colors.white,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
    flexWrap: "wrap",
  },
  statValue: {
    ...monoText(9.5, "700"),
  },
  middleLabel: {
    ...monoText(9.5, "700"),
    color: colors.amber,
  },
  tail: {
    ...monoText(9.5, "600"),
  },
  actionChip: {
    backgroundColor: colors.crimsonSoft,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionChipText: {
    ...monoText(8.5, "700"),
    color: colors.crimson,
  },
  flagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F8F9FC",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 7,
    marginTop: 10,
  },
  flagText: {
    flex: 1,
    ...monoText(9, "600"),
    color: "#6D28D9",
  },
  nudgeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  nudgeText: {
    ...monoText(9, "700"),
    color: "#6D28D9",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F8F9FC",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 10,
  },
  footerText: {
    flex: 1,
    ...monoText(9, "600"),
    color: colors.textPrimary,
  },
  footerAction: {
    ...monoText(9, "700"),
    color: colors.primary,
  },
});