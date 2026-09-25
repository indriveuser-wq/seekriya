import React from "react";
import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AuthorCard from "../components/AuthorCard";
import BoardTipCard from "../components/BoardTipCard";
import DefinitionCard from "../components/DefinitionCard";
import LabCard from "../components/LabCard";
import MetricCard from "../components/MetricCard";
import NotesMetaBar from "../components/NotesMetaBar";
import PracticeCta from "../components/PracticeCta";
import SchematicCard from "../components/SchematicCard";
import TopicDrillHeader from "../components/TopicDrillHeader";
import UnderstoodRow from "../components/UnderstoodRow";
import { useTopicNotes } from "../hooks/useTopicNotes";
import { mockUserProfile } from "../mocks/auth.mock";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

type Props = NativeStackScreenProps<RootStackParamList, "TopicNotes">;

function SectionHeader({ title, dot, right }: { title: string; dot?: boolean; right?: React.ReactNode }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionLeft}>
        {dot ? <View style={styles.sectionDot} /> : null}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {right}
    </View>
  );
}

export default function TopicNotesScreen({ navigation, route }: Props) {
  const { topicId } = route.params;
  const { data, loading } = useTopicNotes(topicId);

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

      <TopicDrillHeader
        title={data.headerTitle}
        subtitle={data.headerSubtitle}
        streakDays={mockUserProfile.streakDays}
        avatarUrl={mockUserProfile.avatarUrl}
        onBack={() => navigation.goBack()}
        onNotification={() => Alert.alert("Notifications", "You are all caught up.")}
      />
      <View style={styles.blueRule} />

      <NotesMetaBar
        meta={data.meta}
        onAudio={() => Alert.alert("Audio lesson", "Ramesh Sir's audio lesson is ready to play.")}
        onBookmark={() => Alert.alert("Saved", "This note was added to your study vault.")}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Tags + title */}
        <View style={styles.tagsRow}>
          <View style={styles.gradeChip}>
            <Text style={styles.gradeChipText}>{data.meta.gradeChip}</Text>
          </View>
          <View style={styles.yieldChip}>
            <Text style={styles.yieldChipText}>{data.meta.yieldChip}</Text>
          </View>
        </View>

        <Text style={styles.title}>{data.meta.title}</Text>

        <AuthorCard author={data.meta.author} />

        {/* Section 1 */}
        <SectionHeader title={data.section1Title} dot />
        <Text style={styles.paragraph}>{data.section1Paragraph}</Text>
        <DefinitionCard tag={data.definitionTag} segments={data.definitionSegments} />

        {/* Section 2 */}
        <SectionHeader
          title={data.section2Title}
          right={<Text style={styles.hint}>{data.section2Hint}</Text>}
        />
        {data.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}

        {/* Section 3 */}
        <SectionHeader
          title={data.section3Title}
          right={
            <View style={styles.sectionChip}>
              <Text style={styles.sectionChipText}>{data.section3Chip}</Text>
            </View>
          }
        />
        <SchematicCard schematic={data.schematic} />
        <LabCard lab={data.lab} />

        {/* Board tip */}
        <BoardTipCard
          title={data.boardTipTitle}
          segments={data.boardTipSegments}
          quote={data.boardTipQuote}
        />

        <UnderstoodRow
          title={data.understood.title}
          sub={data.understood.sub}
          toggleLabel={data.understood.toggleLabel}
          onToggle={() => Alert.alert("Mastery updated", "+25 Mastery XP added.")}
        />

        <PracticeCta
          label={data.cta.label}
          duration={data.cta.duration}
          xp={data.cta.xp}
          onPress={() => navigation.navigate("Practice")}
        />
      </ScrollView>
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
  blueRule: {
    height: 3,
    backgroundColor: colors.primary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  gradeChip: {
    backgroundColor: "#CFE0F8",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  gradeChipText: {
    ...monoText(8.5, "700"),
    color: "#1D4ED8",
    letterSpacing: 0.6,
  },
  yieldChip: {
    backgroundColor: colors.beige,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  yieldChipText: {
    ...monoText(8.5, "700"),
    color: colors.amber,
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    lineHeight: 30,
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
  },
  sectionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  sectionTitle: {
    ...monoText(12, "800"),
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  hint: {
    ...monoText(9, "600"),
    color: colors.textSecondary,
  },
  sectionChip: {
    backgroundColor: "#CFE0F8",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  sectionChipText: {
    ...monoText(8.5, "700"),
    color: "#1D4ED8",
  },
  paragraph: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 21,
    marginTop: 10,
  },
});