import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { QuestionAudit } from "../types/testInsights.types";

const TONE_COLOR = {
  blue: colors.primary,
  amber: colors.amber,
  crimson: colors.crimson,
};

export default function QuestionAuditCard({
  audit,
  onListen,
  onReply,
}: {
  audit: QuestionAudit;
  onListen?: () => void;
  onReply?: () => void;
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name="assignment" size={16} color={colors.primary} />
        <Text style={styles.sectionTitle}>{audit.sectionTitle}</Text>
        <View style={styles.spacer} />
        <Text style={styles.sectionHint}>{audit.sectionHint}</Text>
      </View>

      <View style={styles.container}>
        {/* Q header */}
        <View style={styles.qHeaderRow}>
          <View style={styles.blueChip}>
            <Text style={styles.blueChipText}>{audit.qChip}</Text>
          </View>
          <View style={styles.amberChip}>
            <Text style={styles.amberChipText}>{audit.groupChip}</Text>
          </View>
          <View style={styles.spacer} />
          <View style={styles.scoreCol}>
            <Text style={styles.score}>{audit.score}</Text>
            <Text style={styles.scoreNote}>{audit.scoreNote}</Text>
          </View>
        </View>

        <Text style={styles.questionText}>{audit.questionText}</Text>

        {/* Submitted response */}
        <View style={styles.innerBox}>
          <View style={styles.innerHeaderRow}>
            <MaterialIcons name="edit-note" size={13} color={colors.primary} />
            <Text style={styles.innerTag}>{audit.submittedTag}</Text>
            <View style={styles.submittedChip}>
              <Text style={styles.submittedChipText}>{audit.submittedChip}</Text>
            </View>
          </View>
          <Text style={styles.submittedText}>
            {audit.submittedText} <Text style={styles.submittedEquation}>{audit.submittedEquation}</Text>
          </Text>
          <Text style={styles.submittedNote}>{audit.submittedNote}</Text>
        </View>

        {/* Rubric */}
        <View style={styles.innerBox}>
          <View style={styles.innerHeaderRow}>
            <MaterialIcons name="rule" size={13} color={colors.purple} />
            <Text style={[styles.innerTag, { color: colors.purple }]}>{audit.rubricTag}</Text>
          </View>

          {audit.rubricItems.map((item) => (
            <View key={item.title} style={styles.rubricRow}>
              <MaterialIcons name={item.icon as any} size={15} color={TONE_COLOR[item.tone]} />
              <View style={styles.rubricText}>
                <Text style={styles.rubricTitle}>{item.title}</Text>
                <Text style={styles.rubricBody}>{item.body}</Text>
              </View>
              <Text style={[styles.rubricScore, { color: TONE_COLOR[item.tone] }]}>{item.score}</Text>
            </View>
          ))}
        </View>

        {/* Official scheme */}
        <View style={styles.schemeBox}>
          <View style={styles.innerHeaderRow}>
            <MaterialIcons name="auto-awesome" size={13} color={colors.primary} />
            <Text style={[styles.innerTag, { color: colors.primary, flex: 1 }]}>{audit.schemeTag}</Text>
            <View style={styles.schemeChip}>
              <Text style={styles.schemeChipText}>{audit.schemeChip}</Text>
            </View>
          </View>

          {audit.schemePoints.map((point) => (
            <Text key={point.label} style={styles.schemePoint}>
              <Text style={styles.schemeLabel}>{point.label}</Text>
              <Text style={point.mono ? styles.schemeMono : styles.schemeText}>{point.text}</Text>
            </Text>
          ))}
        </View>

        {/* Teacher insight */}
        <View style={styles.innerBox}>
          <View style={styles.teacherRow}>
            <Image source={{ uri: audit.teacherAvatar }} style={styles.teacherAvatar} />
            <Text style={styles.teacherName}>{audit.teacherName}</Text>
            <Text style={styles.teacherBadge}>{audit.teacherBadge}</Text>
          </View>
          <Text style={styles.teacherQuote}>{audit.teacherQuote}</Text>

          <View style={styles.teacherActions}>
            <Pressable style={styles.listenButton} onPress={onListen}>
              <MaterialIcons name="play-circle" size={13} color={colors.primary} />
              <Text style={styles.listenText}>{audit.listenLabel}</Text>
            </Pressable>
            <Pressable style={styles.replyButton} onPress={onReply}>
              <MaterialIcons name="chat" size={13} color={colors.textPrimary} />
              <Text style={styles.replyText}>{audit.replyLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  spacer: {
    flex: 1,
  },
  sectionHint: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 12,
    marginTop: 10,
  },
  qHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  blueChip: {
    backgroundColor: "#CFE0F8",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  blueChipText: {
    ...monoText(8.5, "700"),
    color: "#1D4ED8",
  },
  amberChip: {
    backgroundColor: colors.beige,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  amberChipText: {
    ...monoText(8.5, "700"),
    color: colors.amber,
  },
  scoreCol: {
    alignItems: "flex-end",
  },
  score: {
    ...monoText(12, "800"),
    color: colors.amber,
  },
  scoreNote: {
    ...monoText(7.5, "700"),
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  questionText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
    lineHeight: 20,
    marginTop: 10,
  },
  innerBox: {
    backgroundColor: "#F8F9FC",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  innerHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  innerTag: {
    ...monoText(8.5, "700"),
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  submittedChip: {
    backgroundColor: colors.crimsonSoft,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    maxWidth: 110,
    marginLeft: "auto",
  },
  submittedChipText: {
    ...monoText(7.5, "700"),
    color: colors.crimson,
  },
  submittedText: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 17,
    marginTop: 8,
  },
  submittedEquation: {
    ...monoText(10.5, "700"),
    color: colors.crimson,
  },
  submittedNote: {
    fontSize: 10.5,
    color: colors.crimson,
    lineHeight: 15,
    marginTop: 4,
  },
  rubricRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
  },
  rubricText: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  rubricTitle: {
    fontSize: 11.5,
    fontWeight: "700",
    color: colors.textPrimary,
    lineHeight: 16,
  },
  rubricBody: {
    fontSize: 10.5,
    color: colors.textSecondary,
    lineHeight: 15,
    marginTop: 2,
  },
  rubricScore: {
    ...monoText(10, "700"),
  },
  schemeBox: {
    backgroundColor: "#E8F0FB",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  schemeChip: {
    backgroundColor: colors.white,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    maxWidth: 70,
  },
  schemeChipText: {
    ...monoText(7.5, "700"),
    color: colors.textPrimary,
  },
  schemePoint: {
    fontSize: 11,
    color: "#4A4F5E",
    lineHeight: 17,
    marginTop: 8,
  },
  schemeLabel: {
    ...monoText(9.5, "700"),
    color: colors.primary,
  },
  schemeText: {
    fontSize: 11,
    color: "#4A4F5E",
  },
  schemeMono: {
    ...monoText(9.5, "700"),
    color: colors.primary,
  },
  teacherRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  teacherAvatar: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.border,
  },
  teacherName: {
    flex: 1,
    fontSize: 11.5,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  teacherBadge: {
    ...monoText(8.5, "700"),
    color: colors.amber,
    textAlign: "right",
    lineHeight: 12,
    maxWidth: 60,
  },
  teacherQuote: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 17,
    marginTop: 8,
  },
  teacherActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  listenButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#CFE0F8",
    borderRadius: 10,
    paddingVertical: 9,
  },
  listenText: {
    ...monoText(8.5, "700"),
    color: colors.primary,
  },
  replyButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#DFE3EE",
    borderRadius: 10,
    paddingVertical: 9,
  },
  replyText: {
    ...monoText(8.5, "700"),
    color: colors.textPrimary,
  },
});