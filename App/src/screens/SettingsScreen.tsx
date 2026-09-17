import React from "react";
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AcademicCard from "../components/AcademicCard";
import AppBottomNav from "../components/AppBottomNav";
import AppHeader from "../components/AppHeader";
import SettingsFooter from "../components/SettingsFooter";
import SettingsSectionCard from "../components/SettingsSectionCard";
import SettingsSubHeader from "../components/SettingsSubHeader";
import { useSettings } from "../hooks/useSettings";
import { mockLoginMeta, mockUserProfile } from "../mocks/auth.mock";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export default function SettingsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { data, loading } = useSettings();

  if (loading || !data) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surfaceLight} />

      <AppHeader
        title={mockLoginMeta.appName}
        subtitle="Tests"
        badge={mockLoginMeta.gradeBadge}
        streakDays={mockUserProfile.streakDays}
        avatarUrl={mockUserProfile.avatarUrl}
        onNotificationPress={() => console.log("notifications")}
        onAvatarPress={() => console.log("profile")}
      />

      <SettingsSubHeader header={data.header} onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AcademicCard
          academic={data.academic}
          onEditDate={() => console.log("edit-date")}
          onChangeElectives={() => console.log("change-electives")}
        />

        {data.sections.map((section) => (
          <SettingsSectionCard
            key={section.id}
            section={section}
            onRowPress={(rowId) => console.log("settings-row:", rowId)}
          />
        ))}

        <SettingsFooter version={data.footerVersion} compliance={data.footerCompliance} />
      </ScrollView>

      <AppBottomNav activeKey="tests" bottomInset={insets.bottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 8,
  },
});