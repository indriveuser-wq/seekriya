import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { ScanSheet } from "../types/liveExam.types";

export default function ScanSheetSection({
  scanSheet,
  onCamera,
  onGallery,
  onDelete,
}: {
  scanSheet: ScanSheet;
  onCamera?: () => void;
  onGallery?: () => void;
  onDelete?: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons name="document-scanner" size={18} color={colors.primary} />
        <View style={styles.headerText}>
          <Text style={styles.title}>{scanSheet.title}</Text>
          <Text style={styles.subtitle}>{scanSheet.subtitle}</Text>
        </View>
      </View>

      <View style={styles.buttonsRow}>
        <Pressable style={styles.cameraButton} onPress={onCamera}>
          <MaterialIcons name="photo-camera" size={14} color={colors.white} />
          <Text style={styles.cameraText}>{scanSheet.cameraLabel}</Text>
        </Pressable>

        <Pressable style={styles.galleryButton} onPress={onGallery}>
          <MaterialIcons name="photo-library" size={14} color={colors.textPrimary} />
          <Text style={styles.galleryText}>{scanSheet.galleryLabel}</Text>
        </Pressable>
      </View>

      <View style={styles.attachmentRow}>
        <MaterialIcons name="image" size={16} color={colors.primary} />
        <View style={styles.attachmentText}>
          <Text style={styles.attachmentName}>{scanSheet.attachment.name}</Text>
          <Text style={styles.attachmentMeta}>{scanSheet.attachment.meta}</Text>
        </View>
        <View style={styles.attachmentChip}>
          <Text style={styles.attachmentChipText}>{scanSheet.attachment.chip}</Text>
        </View>
        <Pressable onPress={onDelete} hitSlop={8}>
          <MaterialIcons name="delete" size={15} color={colors.crimson} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9EBF4",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginTop: 2,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  cameraText: {
    ...monoText(10.5, "700"),
    color: colors.white,
  },
  galleryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#DFE3EE",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  galleryText: {
    ...monoText(10.5, "700"),
    color: colors.textPrimary,
  },
  attachmentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F4F6FB",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  attachmentText: {
    flex: 1,
  },
  attachmentName: {
    ...monoText(10, "700"),
    color: colors.textPrimary,
  },
  attachmentMeta: {
    ...monoText(9),
    color: colors.textSecondary,
    marginTop: 2,
  },
  attachmentChip: {
    backgroundColor: "#D1F0DC",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  attachmentChipText: {
    ...monoText(8, "700"),
    color: "#15803D",
  },
});