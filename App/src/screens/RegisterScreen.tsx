import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import ArohanLogo from "../components/ArohanLogo";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import RoleToggle from "../components/RoleToggle";
import { registerAccount } from "../services/auth.service";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { UserRole } from "../types/auth.types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (loading) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!fullName.trim() || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      Alert.alert("Complete your details", "Enter your full name and a valid email address.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Password too short", "Use at least 8 characters for your password.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match", "Check both password fields and try again.");
      return;
    }

    setLoading(true);
    try {
      const result = await registerAccount({ fullName, email: normalizedEmail, password, role });
      Alert.alert(
        "Account created",
        result.needsEmailConfirmation
          ? "Check your email to confirm your account, then sign in."
          : "Your account is ready. You can sign in now.",
        [{ text: "Go to sign in", onPress: () => navigation.navigate("Login") }],
      );
    } catch (error: any) {
      Alert.alert("Registration failed", error?.message ?? "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.surfaceLight} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={18} color={colors.textPrimary} />
          <Text style={styles.backText}>Back to sign in</Text>
        </Pressable>

        <View style={styles.hero}>
          <ArohanLogo size={64} borderRadius={18} />
          <Text style={styles.title}>Create your Arohan account</Text>
          <Text style={styles.subtitle}>Use your email to access SEE learning and exam readiness.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>ACCOUNT TYPE</Text>
          <RoleToggle value={role} onChange={setRole} />

          <Text style={styles.label}>FULL NAME</Text>
          <InputField
            value={fullName}
            onChangeText={setFullName}
            placeholder="Your full name"
            leftAdornment={<MaterialIcons name="person-outline" size={18} color={colors.primary} />}
          />

          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <InputField
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            leftAdornment={<MaterialIcons name="email" size={18} color={colors.primary} />}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <InputField
            value={password}
            onChangeText={setPassword}
            placeholder="At least 8 characters"
            secure={!showPassword}
            leftAdornment={<MaterialCommunityIcons name="lock-outline" size={18} color={colors.textPrimary} />}
            rightAdornment={
              <Pressable onPress={() => setShowPassword((value) => !value)} hitSlop={8}>
                <MaterialCommunityIcons name={showPassword ? "eye" : "eye-off"} size={18} color={colors.textSecondary} />
              </Pressable>
            }
          />

          <Text style={styles.label}>CONFIRM PASSWORD</Text>
          <InputField
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Repeat your password"
            secure={!showPassword}
            leftAdornment={<MaterialCommunityIcons name="lock-check-outline" size={18} color={colors.textPrimary} />}
          />

          <PrimaryButton
            title="Create account"
            loading={loading}
            onPress={submit}
            icon={<MaterialIcons name="arrow-forward" size={18} color={colors.white} />}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 32 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 8 },
  backText: { ...monoText(11, "700"), color: colors.textPrimary },
  hero: { alignItems: "center", paddingVertical: 22 },
  title: { fontSize: 24, fontWeight: "700", color: colors.textPrimary, textAlign: "center", marginTop: 14 },
  subtitle: { fontSize: 13, lineHeight: 19, color: colors.textSecondary, textAlign: "center", marginTop: 7, maxWidth: 330 },
  card: { backgroundColor: colors.surfaceLight, borderRadius: 18, padding: 16, shadowColor: colors.navy, shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  label: { ...monoText(10, "700"), color: colors.textSecondary, marginTop: 14, marginBottom: 7 },
});
