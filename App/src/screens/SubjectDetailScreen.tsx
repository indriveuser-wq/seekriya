import React, { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppBottomNav from "../components/AppBottomNav";
import AppHeader from "../components/AppHeader";
import BoardMockCard from "../components/BoardMockCard";
import ChapterCard from "../components/ChapterCard";
import PrioritizeRow from "../components/PrioritizeRow";
import SubjectHeroCard from "../components/SubjectHeroCard";
import UnitTabs from "../components/UnitTabs";
import { useSubjectDetail } from "../hooks/useSubjectDetail";
import { mockLoginMeta, mockUserProfile } from "../mocks/auth.mock";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

type Props = NativeStackScreenProps<RootStackParamList, "SubjectDetail">;

export default function SubjectDetailScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { subjectId } = route.params;
  const { data, loading } = useSubjectDetail(subjectId);
  const [activeUnit, setActiveUnit] = useState("all");

  if (loading || !data) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const chapters =
    activeUnit === "all" ? data.chapters : data.chapters.filter((c) => c.unit === activeUnit);

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

      {/* Sub-header: back + CDC code */}
      <View style={styles.subHeader}>
        <Pressable style={styles.backRow} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={16} color={colors.textPrimary} />
          <Text style={styles.backText}>All Subjects</Text>
        </Pressable>

        <View style={styles.cdcChip}>
          <Text style={styles.cdcLabel}>CDC CODE</Text>
          <Text style={styles.cdcValue}>{data.hero.cdcCode}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SubjectHeroCard hero={data.hero} />

        <UnitTabs units={data.units} activeKey={activeUnit} onSelect={setActiveUnit} />

        <PrioritizeRow label={data.prioritizeLabel} />

        {chapters.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            onAction={(id) => navigation.navigate("TopicDrill", { chapterId: id })}
          />
        ))}

        <BoardMockCard mock={data.boardMock} onPress={() => console.log("launch-drill")} />
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
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  backText: {
    ...monoText(11, "700"),
    color: colors.textPrimary,
  },
  cdcChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E2E5F0",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  cdcLabel: {
    ...monoText(8, "700"),
    color: colors.textSecondary,
    letterSpacing: 0.6,
  },
  cdcValue: {
    ...monoText(9, "700"),
    color: colors.primary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 8,
  },
});