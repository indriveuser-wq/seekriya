import { Platform, TextStyle } from "react-native";

export const FONT_MONO = Platform.select<string | undefined>({
  ios: "Menlo",
  android: "monospace",
  default: undefined,
});

export const monoText = (
  fontSize: number,
  fontWeight: TextStyle["fontWeight"] = "400"
): TextStyle => ({
  fontFamily: FONT_MONO,
  fontSize,
  fontWeight,
});