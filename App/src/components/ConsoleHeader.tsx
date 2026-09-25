import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArohanLogo from "./ArohanLogo";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { CohortHeader } from "../types/cohort.types";

export default function ConsoleHeader({
  header,
  avatarUrl,
  onNotification,
}: {
  header: CohortHeader;
  avatarUrl: string;
  onNotification?: () => void;
}) {
  const insets = useSafeAreaInsets();
  const [notificationsVisible, setNotificationsVisible] = React.useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <ArohanLogo size={36} borderRadius={10} />

      <View style={styles.titleWrap}>
        <Text style={styles.title} numberOfLines={1}>
          {header.appTitle}
        </Text>
        <Text style={styles.sub}>{header.appSub}</Text>
      </View>

      <View style={styles.consoleChip}>
        <Text style={styles.consoleChipText}>{header.consoleChip}</Text>
      </View>

      <Pressable style={styles.bellButton} onPress={() => setNotificationsVisible(true)}>
        <MaterialIcons name="notifications-none" size={19} color={colors.textPrimary} />
        <View style={styles.bellDot} />
      </Pressable>

      <Image source={{ uri: avatarUrl }} style={styles.avatar} />

      {notificationsVisible ? (
        <View style={styles.panelLayer}>
          <Pressable style={styles.panelDismiss} onPress={() => setNotificationsVisible(false)} />
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Examiner broadcasts</Text>
            <Text style={styles.modalBody}>No new broadcasts. Your faculty alerts will appear here.</Text>
            <Pressable style={styles.modalButton} onPress={() => setNotificationsVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    zIndex: 100,
    overflow: "visible",
    paddingHorizontal: 12,
    paddingBottom: 10,
    backgroundColor: colors.surfaceLight,
    shadowColor: "#1B2559",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 100,
  },
  titleWrap: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  sub: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 1,
  },
  consoleChip: {
    backgroundColor: "#E6DDFB",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  consoleChipText: {
    ...monoText(8, "700"),
    color: "#6D28D9",
    letterSpacing: 0.6,
  },
  bellButton: {
    marginLeft: 10,
    padding: 2,
  },
  bellDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.crimson,
    borderWidth: 1,
    borderColor: colors.white,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 9,
    marginLeft: 10,
    backgroundColor: colors.border,
  },
  panelLayer: {
    position: "absolute",
    zIndex: 1000,
    elevation: 1000,
    top: 58,
    right: 8,
    width: 280,
  },
  panelDismiss: {
    position: "absolute",
    top: -58,
    right: -8,
    bottom: -1000,
    left: -1000,
    backgroundColor: "rgba(15, 30, 78, 0.24)",
  },
  modalCard: {
    width: 280,
    backgroundColor: colors.surfaceLight,
    borderRadius: 16,
    padding: 16,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  modalBody: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    marginTop: 8,
  },
  modalButton: {
    alignSelf: "flex-end",
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
  },
  modalButtonText: {
    ...monoText(10, "700"),
    color: colors.primary,
  },
});