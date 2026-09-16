import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { colors } from "../theme/colors";

interface ArohanLogoProps {
  size?: number;
  borderRadius?: number;
}

export default function ArohanLogo({ size = 40, borderRadius = 12 }: ArohanLogoProps) {
  const inner = size * 0.66;

  return (
    <View style={[styles.box, { width: size, height: size, borderRadius }]}>
      <Svg width={inner} height={inner} viewBox="0 0 32 32" fill="none">
        <Defs>
          <LinearGradient
            id="strokeGrad"
            x1="4"
            y1="28"
            x2="28"
            y2="4"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor="#8B5CF6" />
            <Stop offset="0.5" stopColor="#3B82F6" />
            <Stop offset="1" stopColor="#2DD4BF" />
          </LinearGradient>
        </Defs>
        <Path
          d="M4 27 L12 15 L18 21 L25 10 M25 10 L19.8 11.2 M25 10 L23.8 15.4"
          stroke="url(#strokeGrad)"
          strokeWidth={3.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M27 1.8 L28.4 4.6 L31.2 6 L28.4 7.4 L27 10.2 L25.6 7.4 L22.8 6 L25.6 4.6 Z"
          fill="#FCD34D"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#12142B",
    alignItems: "center",
    justifyContent: "center",
  },
});