import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { RootStackParamList } from "../navigation/AppNavigator";

export type TeacherTabKey = "dashboard" | "notes" | "qbank" | "performance" | "settings";

const TABS: {
  key: TeacherTabKey;
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  screen: keyof RootStackParamList;
}[] = [
  { key: "dashboard", label: "Dashboard", icon: "grid-view", screen: "Teacher" },
  { key: "notes", label: "Notes Studio", icon: "menu-book", screen: "Teacher" },
  { key: "qbank", label: "Q-Bank", icon: "folder-copy", screen: "Teacher" },
  { key: "performance", label: "Performance", icon: "insights", screen: "TeacherCohort" },
  { key: "settings", label: "Settings", icon: "tune", screen: "Settings" },
];

export default function TeacherBottomNav({
  activeKey,
  bottomInset = 0,
}: {
  activeKey: TeacherTabKey;
  bottomInset?: number;
}) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<{ name: string }>();

  return (
    <View style={[styles.container, { marginBottom: Math.max(bottomInset, 12) }]}>
      {TABS.map((tab) => {
        const active = tab.key === activeKey;
        return (
          <Pressable
            key={tab.key}
            style={styles.tab}
            onPress={() => {
              if (tab.screen === route.name) return;
              navigation.navigate(tab.screen as any);
            }}
          >
            <MaterialIcons name={tab.icon} size={19} color={active ? "#5B21B6" : "#3A3F4E"} />
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#ECEEF8",
    padding: 8,
    shadowColor: "#1B2559",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 8,
  },
  label: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
  labelActive: {
    color: "#5B21B6",
    fontWeight: "700",
  },
});