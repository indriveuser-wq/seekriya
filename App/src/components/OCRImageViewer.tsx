import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { OCRInfo } from "../types/aiCalibration.types";

interface OCRImageViewerProps {
  imageUrl: string;
  ocrInfo: OCRInfo;
}

export default function OCRImageViewer({ imageUrl, ocrInfo }: OCRImageViewerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons name="edit" size={14} color={colors.textPrimary} />
        <Text style={styles.headerTitle}>Candidate Handwritten Submission</Text>
        <View style={styles.aiBoxBadge}>
          <MaterialIcons name="smart-toy" size={10} color={colors.primary} />
          <Text style={styles.aiBoxText}>AI Box: ON</Text>
        </View>
      </View>

      <View style={styles.ocrStatus}>
        <MaterialIcons name="document-scanner" size={12} color={colors.primary} />
        <Text style={styles.ocrText}>Optical Character Recognition (OCR) Active</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        
        {/* Detection boxes would be rendered here as absolute positioned views */}
        <View style={styles.detectionBox1}>
          <Text style={styles.detectionLabel}>Delivery Tube Entry</Text>
          <Text style={styles.confidenceText}>conf: 0.58</Text>
        </View>
        
        <View style={styles.detectionBox2}>
          <MaterialIcons name="info" size={10} color={colors.white} />
          <Text style={styles.detectionLabelSmall}>Apparatus Geometry Verified</Text>
          <Text style={styles.detectionNote}>Trough & inverted jar identified correctly</Text>
        </View>

        <View style={styles.imageControls}>
          <MaterialIcons name="zoom-in" size={18} color={colors.white} />
          <MaterialIcons name="contrast" size={18} color={colors.white} />
          <MaterialIcons name="fullscreen" size={18} color={colors.white} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  aiBoxBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#CFE0F8",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  aiBoxText: {
    ...monoText(8.5, "700"),
    color: colors.primary,
  },
  ocrStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  ocrText: {
    ...monoText(9.5, "600"),
    color: colors.primary,
  },
  imageContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#F8F9FC",
    minHeight: 280,
  },
  image: {
    width: "100%",
    height: 280,
  },
  detectionBox1: {
    position: "absolute",
    top: 80,
    left: 120,
    backgroundColor: "rgba(49, 46, 129, 0.9)",
    borderRadius: 6,
    padding: 6,
    minWidth: 100,
  },
  detectionLabel: {
    ...monoText(8, "700"),
    color: colors.white,
    marginBottom: 2,
  },
  confidenceText: {
    fontSize: 9,
    color: "#93C5FD",
  },
  detectionBox2: {
    position: "absolute",
    top: 140,
    left: 80,
    backgroundColor: "rgba(21, 128, 61, 0.9)",
    borderRadius: 6,
    padding: 6,
    minWidth: 140,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detectionLabelSmall: {
    ...monoText(8, "700"),
    color: colors.white,
    flex: 1,
  },
  detectionNote: {
    fontSize: 8.5,
    color: "#DCFCE7",
    marginTop: 2,
  },
  imageControls: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    gap: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 8,
    padding: 6,
  },
});