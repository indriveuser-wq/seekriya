import React from "react";
import { Alert, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AppHeader from "../components/AppHeader";
import ArohanLogo from "../components/ArohanLogo";
import CheckboxRow from "../components/CheckboxRow";
import ComplianceBanner from "../components/ComplianceBanner";
import DividerWithText from "../components/DividerWithText";
import ExamCountdownCard from "../components/ExamCountdownCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import RoleToggle from "../components/RoleToggle";
import SocialAuthButton from "../components/SocialAuthButton";
import { useExamCountdown } from "../hooks/useExamCountdown";
import { useLoginForm } from "../hooks/useLoginForm";
import { requestPasswordReset } from "../services/auth.service";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

export default function LoginScreen() {
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
            <Text style={styles.chipText}>CDC 2081/82 GRID</Text>
          </View>

          <Pressable style={styles.chip}>
            <MaterialCommunityIcons name="translate" size={14} color={colors.primary} />
            <Text style={styles.chipText}>Nepali / English</Text>
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
            <Text style={styles.heroTitleDark}>Arohan SEE </Text>
            <Text style={styles.heroTitleBlue}>(Arohan)</Text>
          </Text>

          <Text style={styles.heroSubtitle}>Nepal Grade 10 curriculum and exam readiness</Text>
        </View>

        {/* Role toggle */}
        <RoleToggle value={form.role} onChange={form.setRole} />

        {/* Logging-in status */}
        <View style={styles.loggingRow}>
          <View style={styles.loggingDot} />
          <Text style={styles.loggingText} numberOfLines={1}>
            {`Sign in as ${form.role === "teacher" ? "Teacher / Examiner" : "Student Aspirant"}`}
          </Text>
          <Text style={styles.loggingActive}>
            READY
          </Text>
        </View>

        {/* Form card */}
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
          <InputField
            value={form.email}
            onChangeText={form.setEmail}
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            leftAdornment={
              <View style={styles.prefix}>
                <MaterialIcons name="email" size={18} color={colors.primary} />
              </View>
            }
            rightAdornment={<MaterialIcons name="verified" size={20} color={colors.primary} />}
          />

          <View style={styles.passwordLabelRow}>
            <Text style={styles.fieldLabel}>SECURITY PASSWORD / PIN</Text>
            <Pressable
              onPress={async () => {
                if (!/^\S+@\S+\.\S+$/.test(form.email)) {
                  Alert.alert("Enter your email", "Provide a valid email address first.");
                  return;
                }
                try {
                  await requestPasswordReset(form.email);
                  Alert.alert("Reset email sent", "Check your inbox for the password reset link.");
                } catch (error: any) {
                  Alert.alert("Reset failed", error?.message ?? "Unable to send the reset email.");
                }
              }}
            >
              <Text style={styles.resetLink}>Reset by email</Text>
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
            rightAdornment={<MaterialIcons name="verified-user" size={18} color={colors.primary} />}
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
              onPress={() => Alert.alert("School Google", "School SSO is ready for connection.")}
            />
            <SocialAuthButton
              label="Teacher Pass QR"
              icon={<MaterialIcons name="qr-code-scanner" size={20} color={colors.purple} />}
              onPress={() => Alert.alert("Teacher Pass QR", "Scan a valid teacher pass to continue.")}
            />
          </View>
        </View>

        {/* Exam countdown */}
        {countdown && (
          <ExamCountdownCard
            daysToExam={countdown.daysToExam}
            candidatesCount={countdown.candidatesCount}
            onPress={() => Alert.alert("SEE Countdown", `${countdown.daysToExam} days remain until the exam.`)}
          />
        )}

        <ComplianceBanner text="CDC Nepal curriculum compliant" />

        <Pressable
          style={styles.registerRow}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerText}>Don't have an Arohan account? </Text>
          <Text style={styles.registerLink}>Create an account with email</Text>
          <MaterialIcons name="chevron-right" size={16} color={colors.primary} />
        </Pressable>
      </ScrollView>

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