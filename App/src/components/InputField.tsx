import React from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from "react-native";
import { colors } from "../theme/colors";

interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secure?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: KeyboardTypeOptions;
  letterSpacing?: number;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
}

export default function InputField({
  value,
  onChangeText,
  placeholder,
  secure = false,
  autoCapitalize = "none",
  keyboardType,
  letterSpacing,
  leftAdornment,
  rightAdornment,
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      {leftAdornment}
      <TextInput
        style={[styles.input, letterSpacing ? { letterSpacing } : undefined]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        secureTextEntry={secure}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        autoCorrect={false}
      />
      {rightAdornment}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
});