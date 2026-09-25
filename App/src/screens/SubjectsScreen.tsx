import React from "react";
import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppBottomNav from "../components/AppBottomNav";
import AppHeader from "../components/AppHeader";
import RoutineSyncBanner from "../components/RoutineSyncBanner";
import SubjectCard from "../components/SubjectCard";
import SubjectTabs from "../components/SubjectTabs";
import SyllabusCountdownCard from "../components/SyllabusCountdownCard";
import { useSubjects } from "../hooks/useSubjects";
import { mockLoginMeta, mockUserProfile } from "../mocks/auth.mock";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";

export default function SubjectsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, loading, activeCategory, setActiveCategory, filteredSubjects } = useSubjects();

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
        subtitle="Subjects"
        badge={mockLoginMeta.gradeBadge}
        streakDays={mockUserProfile.streakDays}
        avatarUrl={mockUserProfile.avatarUrl}
        onNotificationPress={() => Alert.alert("Notifications", "You are all caught up.")}
        onAvatarPress={() => navigation.navigate("Settings")}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SyllabusCountdownCard countdown={data.countdown} />

        <SubjectTabs
          categories={data.categories}
          activeKey={activeCategory}
          onSelect={setActiveCategory}
        />

        {filteredSubjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onExplore={(id) => navigation.navigate("SubjectDetail", { subjectId: id })}
            onSwitch={(id) => Alert.alert("Subject selected", `${id} is now in your study plan.`)}
          />
        ))}

        <RoutineSyncBanner
          title={data.routineNote}
          subtitle={data.routineVerifiedFor}
          onPress={() => Alert.alert("Routine synced", "Your study routine is up to date.")}
        />
      </ScrollView>

      <AppBottomNav activeKey="subjects" bottomInset={insets.bottom} />
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