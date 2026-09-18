import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { InstitutionalItem } from "../types/teacherSettings.types";

export default function InstitutionalCard({
  items,
  onPress,
}: {
  items: InstitutionalItem[];
  onPress?: (id: string) => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons name="account-balance" size={15} color={colors.primary} />
        <Text style={styles.title}>Institutional Faculty Desk</Text>
      </View>

      {items.map((item) => (
        <Pressable
          key={item.id}
          style={styles.row}
          onPress={() => onPress?.(item.id)}
        >
          <MaterialIcons name={item.icon as any} size={15} color={colors.textPrimary} />
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>{item.title}</Text>
            <Text style={styles.rowSub}>{item.sub}</Text>
          </View>
          <MaterialIcons name={item.actionIcon as any} size={15} color={colors.textSecondary} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEEF6",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    marginHorizontal: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FC",
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  rowText: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  rowLabel: {
    fontSize: 11.5,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  rowSub: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
});