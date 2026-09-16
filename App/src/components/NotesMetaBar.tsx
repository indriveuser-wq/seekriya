import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { TopicNotesMeta } from "../types/topicNotes.types";

interface NotesMetaBarProps {
  meta: TopicNotesMeta;
  onAudio?: () => void;
  onBookmark?: () => void;
}

export default function NotesMetaBar({ meta, onAudio, onBookmark }: NotesMetaBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.chip}>
        <MaterialIcons name="folder-open" size={13} color={colors.textPrimary} />
        <Text style={styles.chipText}>{meta.chapterChip}</Text>
      </View>

      <Text style={styles.dot}>•</Text>
      <Text style={styles.topic}>{meta.topicLabel}</Text>
      <Text style={styles.dot}>•</Text>
      <MaterialIcons name="schedule" size={11} color={colors.textSecondary} />
      <Text style={styles.duration}>{meta.durationLabel}</Text>

      <View style={styles.spacer} />

      <Pressable style={styles.iconButton} onPress={onAudio}>
        <MaterialIcons name="volume-up" size={15} color={colors.textPrimary} />
      </Pressable>
      <Pressable style={styles.iconButton} onPress={onBookmark}>
        <MaterialIcons name="bookmark-border" size={15} color={colors.textPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E2E5F0",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  chipText: {
    ...monoText(9.5, "700"),
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  dot: {
    color: colors.textMuted,
    fontSize: 10,
  },
  topic: {
    ...monoText(9.5, "700"),
    color: colors.primary,
  },
  duration: {
    ...monoText(9.5, "600"),
    color: colors.textSecondary,
  },
  spacer: {
    flex: 1,
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#E2E5F0",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
});