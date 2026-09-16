import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { SocialProof } from "../types/dashboard.types";

export default function SocialProofRow({ proof }: { proof: SocialProof }) {
  return (
    <View style={styles.container}>
      <View style={styles.avatars}>
        {proof.peers.map((peer, index) => (
          <View
            key={peer.initial}
            style={[styles.avatar, { backgroundColor: peer.color, marginLeft: index === 0 ? 0 : -6 }]}
          >
            <Text style={styles.avatarText}>{peer.initial}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.text} numberOfLines={1}>
        <Text style={styles.bold}>{proof.count} students</Text> {proof.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    marginBottom: 8,
  },
  avatars: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.background,
  },
  avatarText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.white,
  },
  text: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
    flexShrink: 1,
  },
  bold: {
    fontWeight: "700",
    color: colors.textPrimary,
  },
});