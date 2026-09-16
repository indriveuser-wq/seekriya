import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { TopicAuthor } from "../types/topicNotes.types";

export default function AuthorCard({ author }: { author: TopicAuthor }) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrap}>
        <Image source={{ uri: author.avatarUrl }} style={styles.avatar} />
        <View style={styles.badge}>
          <MaterialIcons name="check" size={9} color={colors.white} />
        </View>
      </View>

      <View style={styles.textWrap}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{author.name}</Text>
          <View style={styles.roleChip}>
            <Text style={styles.roleText}>{author.roleChip}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>{author.subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E4E7F3",
    borderRadius: 14,
    padding: 10,
    marginTop: 14,
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.border,
  },
  badge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
    marginLeft: 10,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  roleChip: {
    backgroundColor: colors.beige,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  roleText: {
    ...monoText(8, "700"),
    color: colors.amber,
  },
  subtitle: {
    fontSize: 10.5,
    color: colors.textSecondary,
    marginTop: 3,
  },
});