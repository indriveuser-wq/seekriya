import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

interface RecoveryCtaProps {
  title: string;
  sub: string;
  xp: string;
  onPress: () => void;
}

export default function RecoveryCta({ title, sub, xp, onPress }: RecoveryCtaProps) {
  return (
    <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={onPress}>
      <MaterialIcons name="bolt" size={18} color={colors.white} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub}>{sub}</Text>
      </View>
      <View style={styles.xpChip}>
        <Text style={styles.xpText}>{xp}</Text>
      </View>
      <MaterialIcons name="arrow-forward" size={16} color={colors.white} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 12,
    marginTop: 14,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  textWrap: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.white,
  },
  sub: {
    fontSize: 10,
    color: "#CFE0F8",
    lineHeight: 14,
    marginTop: 2,
  },
  xpChip: {
    backgroundColor: colors.primaryDark,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  xpText: {
    fontSize: 9,
    fontWeight: "700",
    color: colors.white,
    fontFamily: "Menlo",
  },
});