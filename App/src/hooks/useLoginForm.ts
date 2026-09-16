import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { mockCredentials } from "../mocks/auth.mock";
import { login } from "../services/auth.service";
import { UserProfile, UserRole } from "../types/auth.types";

export function useLoginForm(onSuccess?: (user: UserProfile) => void) {
  const [role, setRole] = useState<UserRole>("student");
  const [identifier, setIdentifier] = useState(mockCredentials.identifier);
  const [password, setPassword] = useState(mockCredentials.password);
  const [showPassword, setShowPassword] = useState(false);
  const [keepActive, setKeepActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async () => {
    if (loading) return;

    if (!identifier.trim() || !password) {
      setError("Symbol ID and password are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const user = await login({ identifier, password, role, keepActive });
      onSuccess?.(user);
    } catch (e: any) {
      const message = e?.message ?? "Login failed. Please try again.";
      setError(message);
      Alert.alert("Login failed", message);
    } finally {
      setLoading(false);
    }
  }, [identifier, password, role, keepActive, loading, onSuccess]);

  return {
    role,
    setRole,
    identifier,
    setIdentifier,
    password,
    setPassword,
    showPassword,
    toggleShowPassword: () => setShowPassword((v) => !v),
    keepActive,
    toggleKeepActive: () => setKeepActive((v) => !v),
    loading,
    error,
    submit,
  };
}