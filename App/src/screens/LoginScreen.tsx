import React from "react";
import { Alert, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AppBottomNav from "../components/AppBottomNav";
import AppHeader from "../components/AppHeader";
import ArohanLogo from "../components/ArohanLogo";
import CheckboxRow from "../components/CheckboxRow";
import ComplianceBanner from "../components/ComplianceBanner";
import DividerWithText from "../components/DividerWithText";
import ExamCountdownCard from "../components/ExamCountdownCard";
import InputField from "../components/InputField";
import NepalFlagIcon from "../components/NepalFlagIcon";
import PrimaryButton from "../components/PrimaryButton";
import RoleToggle from "../components/RoleToggle";
import SocialAuthButton from "../components/SocialAuthButton";
import { useExamCountdown } from "../hooks/useExamCountdown";
import { useLoginForm } from "../hooks/useLoginForm";
import { mockLoginMeta, mockUserProfile } from "../mocks/auth.mock";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const form = useLoginForm((user) => {
  if (user.role === "teacher") {
    navigation.navigate("Teacher");
  } else {
    navigation.navigate("Home");
  }
});
  const { data: countdown } = useExamCountdown();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surfaceLight} />

      <AppHeader
        title={mockLoginMeta.appName}
        subtitle={mockLoginMeta.headerSubtitle}
        badge={mockLoginMeta.gradeBadge}
        streakDays={mockUserProfile.streakDays}
        avatarUrl={mockUserProfile.avatarUrl}
        onNotificationPress={() => console.log("notifications")}
        onAvatarPress={() => console.log("profile")}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top chips */}
        <View style={styles.chipsRow}>
          <View style={styles.chip}>
            <View style={styles.chipDot} />
            <Text style={styles.chipText}>{mockLoginMeta.gridLabel}</Text>
          </View>

          <Pressable style={styles.chip}>
            <MaterialCommunityIcons name="translate" size={14} color={colors.primary} />
            <Text style={styles.chipText}>{mockLoginMeta.languageLabel}</Text>
          </Pressable>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <ArohanLogo size={76} borderRadius={20} />
            <View style={styles.seeBadge}>
              <MaterialIcons name="auto-awesome" size={10} color={colors.goldText} />
              <Text style={styles.seeBadgeText}>SEE</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>
            <Text style={styles.heroTitleDark}>{mockLoginMeta.appName} </Text>
            <Text style={styles.heroTitleBlue}>{mockLoginMeta.appNameNe}</Text>
          </Text>

          <Text style={styles.heroSubtitle}>{mockLoginMeta.tagline}</Text>
        </View>

        {/* Role toggle */}
        <RoleToggle value={form.role} onChange={form.setRole} />

        {/* Logging-in status */}
        <View style={styles.loggingRow}>
          <View style={styles.loggingDot} />
          <Text style={styles.loggingText} numberOfLines={1}>
            {`Logging in as ${mockUserProfile.gradeLabel} (${mockUserProfile.fullName})`}
          </Text>
          <Text style={styles.loggingActive}>
            {mockUserProfile.isActive ? "ACTIVE" : "INACTIVE"}
          </Text>
        </View>

        {/* Form card */}
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>MOBILE NUMBER / SEE SYMBOL ID</Text>
          <InputField
            value={form.identifier}
            onChangeText={form.setIdentifier}
            placeholder="SEE-2081-0492"
            autoCapitalize="characters"
            leftAdornment={
              <View style={styles.prefix}>
                <NepalFlagIcon size={18} />
                <Text style={styles.prefixText}>+977</Text>
              </View>
            }
            rightAdornment={<MaterialIcons name="verified" size={20} color={colors.primary} />}
          />

          <View style={styles.passwordLabelRow}>
            <Text style={styles.fieldLabel}>SECURITY PASSWORD / PIN</Text>
            <Pressable onPress={() => console.log("reset-with-sms")}>
              <Text style={styles.resetLink}>Reset with SMS</Text>
            </Pressable>
          </View>
          <InputField
            value={form.password}
            onChangeText={form.setPassword}
            placeholder="••••••••"
            secure={!form.showPassword}
            letterSpacing={3}
            leftAdornment={
              <MaterialCommunityIcons name="lock-outline" size={18} color={colors.textPrimary} />
            }
            rightAdornment={
              <Pressable onPress={form.toggleShowPassword} hitSlop={8}>
                <MaterialCommunityIcons
                  name={form.showPassword ? "eye" : "eye-off"}
                  size={18}
                  color={colors.textSecondary}
                />
              </Pressable>
            }
          />

          <CheckboxRow
            checked={form.keepActive}
            onToggle={form.toggleKeepActive}
            label="Keep active for daily streaks"
            rightAdornment={
              <View style={styles.streakNote}>
                <Text style={styles.streakNoteEmoji}>🔥</Text>
                <Text style={styles.streakNoteText}>5x Streak</Text>
              </View>
            }
          />

          <PrimaryButton
            title="Launch SEE Journey"
            loading={form.loading}
            onPress={form.submit}
            icon={<MaterialIcons name="arrow-forward" size={18} color={colors.white} />}
          />

          <DividerWithText label="OR INSTANT ACCESS WITH" />

          <View style={styles.socialRow}>
            <SocialAuthButton
              label="School Google"
              icon={<MaterialIcons name="domain" size={20} color={colors.primary} />}
              onPress={() => console.log("school-google")}
            />
            <SocialAuthButton
              label="Teacher Pass QR"
              icon={<MaterialIcons name="qr-code-scanner" size={20} color={colors.purple} />}
              onPress={() => console.log("teacher-pass-qr")}
            />
          </View>
        </View>

        {/* Exam countdown */}
        {countdown && (
          <ExamCountdownCard
            daysToExam={countdown.daysToExam}
            candidatesCount={countdown.candidatesCount}
            onPress={() => console.log("countdown")}
          />
        )}

        <ComplianceBanner text={mockLoginMeta.complianceNote} />

        <Pressable style={styles.registerRow} onPress={() => console.log("register")}>
          <Text style={styles.registerText}>Don't have an Arohan account? </Text>
          <Text style={styles.registerLink}>Register with School Code</Text>
          <MaterialIcons name="chevron-right" size={16} color={colors.primary} />
        </Pressable>
      </ScrollView>

      <AppBottomNav activeKey="tests" bottomInset={insets.bottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 8,
  },
  chipsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E2E5F0",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gold,
  },
  chipText: {
    ...monoText(11, "700"),
    color: colors.textPrimary,
  },
  hero: {
    alignItems: "center",
    marginTop: 28,
    marginBottom: 24,
  },
  heroIconWrap: {
    position: "relative",
  },
  seeBadge: {
    position: "absolute",
    right: -14,
    bottom: -4,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: colors.gold,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  seeBadgeText: {
    ...monoText(10, "700"),
    color: colors.goldText,
  },
  heroTitle: {
    marginTop: 18,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  heroTitleDark: {
    color: colors.textPrimary,
  },
  heroTitleBlue: {
    color: colors.primary,
  },
  heroSubtitle: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: "center",
    maxWidth: 320,
  },
  loggingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  loggingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  loggingText: {
    ...monoText(11),
    color: colors.textPrimary,
    flexShrink: 1,
  },
  loggingActive: {
    ...monoText(11, "700"),
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
  },
  fieldLabel: {
    ...monoText(11, "700"),
    color: colors.textSecondary,
    letterSpacing: 0.6,
  },
  prefix: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  prefixText: {
    ...monoText(13, "700"),
    color: colors.textPrimary,
  },
  passwordLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 8,
  },
  resetLink: {
    ...monoText(11, "700"),
    color: colors.primary,
  },
  streakNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  streakNoteEmoji: {
    fontSize: 12,
  },
  streakNoteText: {
    ...monoText(11, "700"),
    color: colors.amber,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },
  registerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 16,
    marginBottom: 8,
  },
  registerText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  registerLink: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },
});