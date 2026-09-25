import React from "react";
import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BoardIntelCard from "../components/BoardIntelCard";
import FlightNotes from "../components/FlightNotes";
import InFlightCard from "../components/InFlightCard";
import PracticeMatrices from "../components/PracticeMatrices";
import SortiePath from "../components/SortiePath";
import SprintBar from "../components/SprintBar";
import TopicDrillHeader from "../components/TopicDrillHeader";
import TopicHeroCard from "../components/TopicHeroCard";
import { useTopicDrill } from "../hooks/useTopicDrill";
import { mockUserProfile } from "../mocks/auth.mock";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";

type Props = NativeStackScreenProps<RootStackParamList, "TopicDrill">;

export default function TopicDrillScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { chapterId } = route.params;
  const { data, loading } = useTopicDrill(chapterId);

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
      />

      {/* Sub-header chips */}
      <View style={styles.subHeader}>
        <View style={styles.deckChip}>
          <MaterialIcons name="chevron-left" size={14} color={colors.textPrimary} />
          <Text style={styles.deckChipText}>{data.hero.deckCode}</Text>
        </View>

        <View style={styles.sectorChip}>
          <MaterialIcons name="flash-on" size={13} color={colors.amber} />
          <Text style={styles.sectorChipText}>{data.hero.sectorLabel}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TopicHeroCard hero={data.hero} />

        <SortiePath title={data.pathTitle} phaseLabel={data.phaseLabel} steps={data.steps} />

        <InFlightCard
            topic={data.inFlight}
            onResume={() => navigation.navigate("TopicNotes", { topicId: "topic-4" })}
        />

        <BoardIntelCard intel={data.intel} />

        <PracticeMatrices
          title={data.matricesTitle}
          settingsLabel={data.matricesSettingsLabel}
          matrices={data.matrices}
          onPress={(id) => Alert.alert("Practice matrix", `${id} is ready to inspect.`)}
          onSettings={() => Alert.alert("Adaptive settings", "Adaptive practice settings are ready to configure.")}
        />

        <FlightNotes
          title={data.notesTitle}
          modulesCountLabel={data.modulesCountLabel}
          curatorLabel={data.curatorLabel}
          modules={data.modules}
          onModulePress={(id) => navigation.navigate("TopicNotes", { topicId: id })}
        />
      </ScrollView>

      <SprintBar
        sprint={data.sprint}
        onPress={() => navigation.navigate("Practice")}
        bottomInset={insets.bottom}
      />
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
  deckChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E2E5F0",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  deckChipText: {
    ...monoText(11, "700"),
    color: colors.textPrimary,
    letterSpacing: 0.6,
  },
  sectorChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.beige,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sectorChipText: {
    ...monoText(9.5, "700"),
    color: colors.amber,
    letterSpacing: 0.8,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 12,
  },
});