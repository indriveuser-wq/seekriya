import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { SortieStep, SortieTone } from "../types/topicDrill.types";

const TONE_STYLES: Record<SortieTone, {
  boxBg: string;
  circleBg: string;
  iconColor: string;
  subColor: string;
  labelColor: string;
}> = {
  learn: { boxBg: "#D9E6FA", circleBg: "#BBD4F6", iconColor: "#1D4ED8", subColor: "#1D4ED8", labelColor: colors.textPrimary },
  drill: { boxBg: "#CFE0F8", circleBg: colors.primary, iconColor: colors.white, subColor: colors.amber, labelColor: colors.textPrimary },
  test: { boxBg: "#E6DDFB", circleBg: "#8B5CF6", iconColor: colors.white, subColor: "#7C3AED", labelColor: colors.textPrimary },
  master: { boxBg: "#E4E7F0", circleBg: "#C6CBD6", iconColor: colors.white, subColor: "#8A90A0", labelColor: "#8A90A0" },
};

interface SortiePathProps {
  title: string;
  phaseLabel: string;
  steps: SortieStep[];
}

export default function SortiePath({ title, phaseLabel, steps }: SortiePathProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <MaterialIcons name="route" size={16} color={colors.purple} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.phase}>{phaseLabel}</Text>
      </View>

      <View style={styles.stepsRow}>
        {steps.map((step) => {
          const tone = TONE_STYLES[step.tone];
          return (
            <View key={step.key} style={[styles.stepBox, { backgroundColor: tone.boxBg }]}>
              {step.active ? <View style={styles.activeDot} /> : null}
              <View style={[styles.iconCircle, { backgroundColor: tone.circleBg }]}>
                <MaterialIcons name={step.icon as any} size={16} color={tone.iconColor} />
              </View>
              <Text style={[styles.stepLabel, { color: tone.labelColor }]}>{step.label}</Text>
              <Text style={[styles.stepSub, { color: tone.subColor }]}>{step.sub}</Text>
            </View>
          );
        })}
      </View>
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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  phase: {
    ...monoText(10, "600"),
    color: colors.textSecondary,
  },
  stepsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  stepBox: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  activeDot: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.amber,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  stepLabel: {
    ...monoText(10, "700"),
    marginTop: 7,
  },
  stepSub: {
    ...monoText(9, "600"),
    marginTop: 3,
  },
});