import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ProgressBar from "./ProgressBar";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { CommandSubject, MiniSubject } from "../types/progress.types";

const TONE = {
  blue: { fg: colors.primary, bg: "#CFE0F8", bar: colors.primary },
  amber: { fg: colors.amber, bg: colors.beige, bar: colors.amber },
  purple: { fg: colors.purple, bg: "#E6DDFB", bar: colors.purple },
};

interface CommandDeckProps {
  title: string;
  link: string;
  subjects: CommandSubject[];
  minis: MiniSubject[];
  expandLabel: string;
  onLink?: () => void;
  onExpand?: () => void;
}

export default function CommandDeck({ title, link, subjects, minis, expandLabel, onLink, onExpand }: CommandDeckProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={onLink}>
          <Text style={styles.link}>{link}</Text>
        </Pressable>
      </View>

      {subjects.map((subject) => {
        const tone = TONE[subject.tone];
        return (
          <View key={subject.code} style={styles.subjectCard}>
            <View style={styles.subjectRow}>
              <View style={[styles.codeChip, { backgroundColor: tone.bg }]}>
                <Text style={[styles.codeText, { color: tone.fg }]}>{subject.code}</Text>
              </View>
              <View style={styles.subjectText}>
                <Text style={styles.subjectTitle}>{subject.title}</Text>
                <Text style={styles.subjectSub}>{subject.sub}</Text>
              </View>
              <View style={styles.subjectRight}>
                <Text style={[styles.percent, { color: tone.fg }]}>{subject.percent}%</Text>
                <View style={[styles.statusChip, { backgroundColor: tone.bg }]}>
                  <Text style={[styles.statusChipText, { color: tone.fg }]}>{subject.chip}</Text>
                </View>
              </View>
            </View>

            <ProgressBar
              percent={subject.percent}
              color={tone.bar}
              trackColor="#DDE1EC"
              height={6}
              style={styles.bar}
            />

            <View style={styles.footerRow}>
              <Text style={styles.mockLabel}>{subject.mockLabel}</Text>
              <Text style={styles.strengthLabel}>{subject.strengthLabel}</Text>
            </View>
          </View>
        );
      })}

      <View style={styles.minisRow}>
        {minis.map((mini) => (
          <View key={mini.title} style={styles.miniBox}>
            <View style={styles.miniTop}>
              <Text style={styles.miniTitle}>{mini.title}</Text>
              <Text style={[styles.miniPercent, { color: mini.tone === "blue" ? colors.primary : colors.amber }]}>
                {mini.percent}
              </Text>
            </View>
            <Text style={styles.miniSub}>{mini.sub}</Text>
          </View>
        ))}
      </View>

      <Pressable style={styles.expandButton} onPress={onExpand}>
        <Text style={styles.expandText}>{expandLabel}</Text>
      </Pressable>
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
  link: {
    ...monoText(9, "700"),
    color: colors.primary,
  },
  subjectCard: {
    backgroundColor: "#E9EBF5",
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
  },
  subjectRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  codeChip: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  codeText: {
    ...monoText(11, "800"),
  },
  subjectText: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  subjectTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subjectSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
  subjectRight: {
    alignItems: "flex-end",
  },
  percent: {
    ...monoText(14, "800"),
  },
  statusChip: {
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginTop: 3,
  },
  statusChipText: {
    ...monoText(7.5, "700"),
  },
  bar: {
    marginTop: 10,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 8,
  },
  mockLabel: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
    flexShrink: 1,
  },
  strengthLabel: {
    ...monoText(8.5, "600"),
    color: colors.textPrimary,
    flexShrink: 1,
    textAlign: "right",
  },
  minisRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  miniBox: {
    flex: 1,
    backgroundColor: "#E9EBF5",
    borderRadius: 12,
    padding: 10,
  },
  miniTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  miniTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  miniPercent: {
    ...monoText(12, "800"),
  },
  miniSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 4,
  },
  expandButton: {
    backgroundColor: "#DFE3EE",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  expandText: {
    ...monoText(9.5, "700"),
    color: colors.textPrimary,
  },
});