import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { BottomTabKey } from "../types/auth.types";
import { RootStackParamList } from "../navigation/AppNavigator";

interface AppBottomNavProps {
  activeKey: BottomTabKey;
  bottomInset?: number;
}

const TABS: {
  key: BottomTabKey;
  label: string;
  screen: keyof RootStackParamList;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  activeIcon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}[] = [
  { key: "home", label: "Home", screen: "Home", icon: "home-outline", activeIcon: "home" },
  { key: "subjects", label: "Subjects", screen: "Subjects", icon: "book-open-outline", activeIcon: "book-open" },
  { key: "practice", label: "Practice", screen: "Home", icon: "flash-outline", activeIcon: "flash" },
  { key: "tests", label: "Tests", screen: "Login", icon: "timer-outline", activeIcon: "timer" },
  { key: "progress", label: "Progress", screen: "Home", icon: "trending-up", activeIcon: "trending-up" },
];

export default function AppBottomNav({ activeKey, bottomInset = 0 }: AppBottomNavProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.container, { marginBottom: Math.max(bottomInset, 12) }]}>
      {TABS.map((tab) => {
        const active = tab.key === activeKey;
        return (
          <Pressable
            key={tab.key}
            style={[styles.tab, active && styles.tabActive]}
            onPress={() => {
              if (active) return;
              navigation.navigate(tab.screen as any);
            }}
          >
            <MaterialCommunityIcons
              name={active ? tab.activeIcon : tab.icon}
              size={20}
              color={active ? colors.primary : "#3A3F4E"}
            />
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    borderRadius: 22,
    backgroundColor: "#ECEEF8",
    padding: 6,
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
    paddingVertical: 9,
    borderRadius: 14,
  },
  tabActive: {
    backgroundColor: colors.primarySoft,
  },
  tabLabel: {
    ...monoText(10),
    color: colors.textSecondary,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: "700",
  },
});