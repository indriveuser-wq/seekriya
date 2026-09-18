import React from "react";
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native"; // <-- Added Text here
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ActiveCurriculumCard from "../components/ActiveCurriculumCard";
import AlignmentCard from "../components/AlignmentCard";
import ConsoleHeader from "../components/ConsoleHeader";
import CurriculumSourceBar from "../components/CurriculumSourceBar";
import ModuleCard from "../components/ModuleCard";
import SearchAndFilters from "../components/SearchAndFilters";
import TeacherBottomNav from "../components/TeacherBottomNav";
import VectorIndexCard from "../components/VectorIndexCard";
import { useNotesStudio } from "../hooks/useNotesStudio";
import { mockTeacher } from "../mocks/teacher.mock";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

export default function NotesStudioScreen() {
  const insets = useSafeAreaInsets();
  const { data, loading } = useNotesStudio();

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

      <ConsoleHeader
        header={data.header}
        avatarUrl={mockTeacher.profile.avatarUrl}
        onNotification={() => console.log("notifications")}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CurriculumSourceBar source={data.source} />

        <ActiveCurriculumCard curriculum={data.curriculum} />

        <VectorIndexCard vectorIndex={data.vectorIndex} />

        <SearchAndFilters placeholder={data.searchPlaceholder} tabs={data.tabs} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{data.sectionTitle}</Text>
          <Text style={styles.sortLabel}>{data.sortLabel}</Text>
        </View>

        {data.modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}

        <AlignmentCard alignment={data.alignment} />
      </ScrollView>

      <TeacherBottomNav activeKey="notes" bottomInset={insets.bottom} />
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
    padding: 12,
    paddingBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 4,
  },
  sectionTitle: {
    ...monoText(10, "800"),
    color: colors.textPrimary,
    letterSpacing: 0.8,
  },
  sortLabel: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
});