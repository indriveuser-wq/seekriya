import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { ModuleCardModel } from "../types/notesStudio.types";

const STATUS_TONE = {
  gray: { bg: "#E2E5F0", text: colors.textSecondary, icon: colors.textSecondary },
  red: { bg: "#FEE2E2", text: colors.crimson, icon: colors.crimson },
  green: { bg: "#DCFCE7", text: "#15803D", icon: "#15803D" },
};

const BOX_TONE = {
  blue: { bg: "#EFF6FF", border: "#BFDBFE", title: "#1E40AF", text: colors.textSecondary },
  red: { bg: "#FEF2F2", border: "#FECACA", title: colors.crimson, text: colors.textSecondary },
};

const BTN_STYLE: Record<string, { bg: string; text: string; border?: string }> = {
  "dark-blue": { bg: "#312E81", text: colors.white },
  purple: { bg: "#7C3AED", text: colors.white },
  outline: { bg: "transparent", text: colors.textPrimary, border: "#D1D5DB" },
};

export default function ModuleCard({
  module,
  onAction,
}: {
  module: ModuleCardModel;
  onAction: (module: ModuleCardModel, label: string) => void;
}) {
  const statusTone = STATUS_TONE[module.timeOrStatus.tone];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.unitTag}>
          <Text style={styles.unitTagText}>{module.unitTag}</Text>
        </View>
        <View style={styles.spacer} />
        <View style={[styles.statusChip, { backgroundColor: statusTone.bg }]}>
          {module.timeOrStatus.icon ? (
            <MaterialIcons name={module.timeOrStatus.icon as any} size={10} color={statusTone.icon} />
          ) : null}
          <Text style={[styles.statusText, { color: statusTone.text }]}>{module.timeOrStatus.label}</Text>
        </View>
      </View>

      <Text style={styles.title}>{module.title}</Text>

      {module.statusBox ? (
        <View style={[styles.statusBox, { backgroundColor: BOX_TONE[module.statusBox.tone].bg }]}>
          <View style={styles.statusBoxHeader}>
            <Text style={[styles.statusBoxTitle, { color: BOX_TONE[module.statusBox.tone].title }]}>
              {module.statusBox.title}
            </Text>
            {module.statusBox.percent ? (
              <Text style={[styles.statusBoxPercent, { color: BOX_TONE[module.statusBox.tone].title }]}>
                {module.statusBox.percent}
              </Text>
            ) : null}
          </View>
          <Text style={styles.statusBoxBody}>{module.statusBox.body}</Text>
        </View>
      ) : null}

      {module.description ? <Text style={styles.description}>{module.description}</Text> : null}

      <View style={styles.footerRow}>
        <View style={styles.footerLeft}>
          {module.id === "force" ? (
            <MaterialIcons name="verified" size={12} color="#15803D" />
          ) : module.id === "light" ? (
            <MaterialIcons name="link" size={12} color={colors.textSecondary} />
          ) : (
            <MaterialIcons name="auto-stories" size={12} color="#6D28D9" />
          )}
          <Text style={styles.footerInfo}>{module.footerInfo}</Text>
        </View>
        {module.footerRight ? <Text style={styles.footerRight}>{module.footerRight}</Text> : null}
      </View>

      <View style={styles.buttonsRow}>
        {module.buttons.map((btn) => {
          const style = BTN_STYLE[btn.tone];
          return (
            <Pressable
              key={btn.label}
              style={[
                styles.button,
                { backgroundColor: style.bg, borderColor: style.border },
                btn.tone === "dark-blue" && styles.buttonFull,
              ]}
            >
              {btn.icon ? (
                <MaterialIcons name={btn.icon as any} size={14} color={style.text} />
              ) : null}
              <Text style={[styles.buttonText, { color: style.text }]}>{btn.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {module.extraIcon ? (
        <Pressable style={styles.extraIconBox} onPress={() => onAction(module, "View details")}>
          <MaterialIcons name={module.extraIcon as any} size={16} color={colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    position: "relative",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  unitTag: {
    backgroundColor: "#E6DDFB",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unitTagText: {
    ...monoText(8.5, "700"),
    color: "#6D28D9",
  },
  spacer: {
    flex: 1,
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    ...monoText(8.5, "700"),
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 8,
    lineHeight: 20,
  },
  statusBox: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
  statusBoxHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusBoxTitle: {
    ...monoText(9.5, "700"),
    flexShrink: 1,
  },
  statusBoxPercent: {
    ...monoText(9, "700"),
  },
  statusBoxBody: {
    fontSize: 10.5,
    color: colors.textSecondary,
    lineHeight: 15,
    marginTop: 4,
  },
  description: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginTop: 8,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 6,
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flex: 1,
  },
  footerInfo: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
    flexShrink: 1,
  },
  footerRight: {
    ...monoText(9, "700"),
    color: colors.crimson,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
  buttonFull: {
    flex: 1,
  },
  buttonText: {
    ...monoText(10, "700"),
  },
  extraIconBox: {
    position: "absolute",
    bottom: 14,
    right: 14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#CFE0F8",
    alignItems: "center",
    justifyContent: "center",
  },
});