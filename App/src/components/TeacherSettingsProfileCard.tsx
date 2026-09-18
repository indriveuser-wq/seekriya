import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { TeacherProfile } from "../types/teacherSettings.types";

export default function TeacherSettingsProfileCard({ profile }: { profile: TeacherProfile }) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrap}>
        <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
        <View style={styles.verifiedBadge}>
          <MaterialIcons name="check" size={10} color={colors.white} />
        </View>
      </View>

      <View style={styles.chipsRow}>
        <View style={styles.cdcChip}>
          <Text style={styles.cdcChipText}>{profile.cdcId}</Text>
        </View>
        <View style={styles.roleChip}>
          <Text style={styles.roleChipText}>{profile.roleChip}</Text>
        </View>
      </View>

      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.position}>{profile.position}</Text>

      <View style={styles.schoolRow}>
        <MaterialIcons name="school" size={12} color={colors.primary} />
        <Text style={styles.school}>{profile.school}</Text>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <MaterialIcons name="history-edu" size={14} color={colors.textSecondary} />
          <Text style={styles.metaValue}>{profile.pedagogyYears}</Text>
          <Text style={styles.metaLabel}>{profile.pedagogyLabel}</Text>
        </View>

        <View style={styles.metaItem}>
          <MaterialIcons name="groups" size={14} color={colors.textSecondary} />
          <Text style={styles.metaValue}>{profile.candidatesCount}</Text>
          <Text style={styles.metaLabel}>{profile.candidatesLabel}</Text>
        </View>

        <Text style={styles.terminalStatus}>{profile.terminalStatus}</Text>
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
    marginHorizontal: 12,
  },
  avatarWrap: {
    position: "relative",
    alignSelf: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: colors.border,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  chipsRow: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    marginBottom: 8,
  },
  cdcChip: {
    backgroundColor: "#CFE0F8",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  cdcChipText: {
    ...monoText(7.5, "700"),
    color: "#1D4ED8",
  },
  roleChip: {
    backgroundColor: "#F5E7CB",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  roleChipText: {
    ...monoText(7.5, "700"),
    color: colors.amber,
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
  },
  position: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 3,
  },
  schoolRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 6,
  },
  school: {
    fontSize: 11,
    color: colors.textPrimary,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#DDE1EC",
  },
  metaItem: {
    alignItems: "center",
  },
  metaValue: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 3,
  },
  metaLabel: {
    fontSize: 9,
    color: colors.textSecondary,
    marginTop: 1,
  },
  terminalStatus: {
    ...monoText(8.5, "700"),
    color: colors.primary,
    letterSpacing: 0.5,
  },
});