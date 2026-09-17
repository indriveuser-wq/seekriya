import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ProgressBar from "./ProgressBar";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { TeacherProfile } from "../types/teacher.types";

export default function TeacherProfileCard({ profile }: { profile: TeacherProfile }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.avatarWrap}>
          <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
          <View style={styles.badge}>
            <MaterialIcons name="check" size={9} color={colors.white} />
          </View>
        </View>

        <View style={styles.nameWrap}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {profile.name}
            </Text>
            <View style={styles.roleChip}>
              <Text style={styles.roleText}>{profile.roleChip}</Text>
            </View>
          </View>
          <Text style={styles.subtitle} numberOfLines={1}>
            {profile.subtitle}
          </Text>
        </View>

        <View style={styles.seeBadge}>
          <MaterialIcons name="school" size={15} color={colors.amber} />
          <Text style={styles.seeBadgeText}>{profile.badgeLabel}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>{profile.cohortLabel}</Text>
          <View style={styles.valueRow}>
            <Text style={styles.valueDark}>{profile.cohortValue}</Text>
            <Text style={styles.valueSub}>{profile.cohortSub}</Text>
          </View>
          <View style={styles.footRow}>
            <MaterialIcons name="check-circle" size={11} color={colors.primary} />
            <Text style={styles.footBlue}>{profile.cohortFoot}</Text>
          </View>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>{profile.targetLabel}</Text>
          <Text style={styles.valueAmber}>{profile.targetValue}</Text>
          <ProgressBar percent={profile.targetProgress} color={colors.amber} height={4} style={styles.targetBar} />
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>{profile.qaLabel}</Text>
          <View style={styles.valueRow}>
            <Text style={styles.valueCrimson}>{profile.qaValue}</Text>
            <Text style={styles.qaSub}>{profile.qaSub}</Text>
          </View>
          <View style={styles.footRow}>
            <MaterialIcons name="pending-actions" size={11} color={colors.crimson} />
            <Text style={styles.footCrimson}>{profile.qaFoot}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9EBF5",
    borderRadius: 20,
    padding: 14,
    marginTop: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.border,
  },
  badge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
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
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    flexShrink: 1,
  },
  roleChip: {
    backgroundColor: "#CFE0F8",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  roleText: {
    ...monoText(8, "700"),
    color: "#1D4ED8",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 10.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  seeBadge: {
    backgroundColor: colors.beige,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    gap: 3,
  },
  seeBadgeText: {
    ...monoText(9, "700"),
    color: colors.amber,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#F4F6FB",
    borderRadius: 12,
    padding: 10,
  },
  statLabel: {
    ...monoText(8.5, "600"),
    color: colors.textSecondary,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginTop: 4,
  },
  valueDark: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  valueSub: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  valueAmber: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.amber,
    marginTop: 4,
  },
  valueCrimson: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.crimson,
  },
  qaSub: {
    fontSize: 10,
    color: colors.crimson,
  },
  targetBar: {
    marginTop: 8,
  },
  footRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  footBlue: {
    ...monoText(8.5, "700"),
    color: colors.primary,
  },
  footCrimson: {
    ...monoText(8.5, "700"),
    color: colors.crimson,
  },
});