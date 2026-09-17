import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { colors } from "../theme/colors";
import { RichSegment } from "../types/topicNotes.types";

const TONE_COLOR: Record<string, string> = {
  blue: colors.primary,
  amber: colors.amber,
  crimson: colors.crimson,
  gray: colors.textSecondary,
  dark: colors.textPrimary,
};

interface RichTextProps {
  segments: RichSegment[];
  style?: StyleProp<TextStyle>;
}

export default function RichText({ segments, style }: RichTextProps) {
  return (
    <Text style={style}>
      {segments.map((segment, index) => (
        <Text
          key={index}
          style={[
            segment.tone ? { color: TONE_COLOR[segment.tone] } : undefined,
            segment.bold ? { fontWeight: "700" } : undefined,
            segment.italic ? { fontStyle: "italic" } : undefined,
            segment.underline ? { textDecorationLine: "underline" } : undefined,
          ]}
        >
          {segment.text}
        </Text>
      ))}
    </Text>
  );
}