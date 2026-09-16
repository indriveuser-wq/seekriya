import React from "react";
import Svg, { Path } from "react-native-svg";

export default function NepalFlagIcon({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 1.25} viewBox="0 0 20 25" fill="none">
      <Path
        d="M2.5 1.5 L15 9 L6.5 10.2 L17.5 20 L2.5 20 Z"
        fill="#DC143C"
        stroke="#003893"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </Svg>
  );
}