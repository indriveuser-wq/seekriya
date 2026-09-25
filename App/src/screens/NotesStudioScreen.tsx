import React, { useMemo, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ActiveCurriculumCard from "../components/ActiveCurriculumCard";
import AlignmentCard from "../components/AlignmentCard";
import ConsoleHeader from "../components/ConsoleHeader";
import CurriculumSourceBar from "../components/CurriculumSourceBar";
import ModuleCard from "../components/ModuleCard";
import PrimaryButton from "../components/PrimaryButton";
import SearchAndFilters from "../components/SearchAndFilters";
import TeacherBottomNav from "../components/TeacherBottomNav";
import VectorIndexCard from "../components/VectorIndexCard";
import { useNotesStudio } from "../hooks/useNotesStudio";
import { mockTeacher } from "../mocks/teacher.mock";
import { colors } from "../theme/colors";
import { monoText } from "../theme/typography";
import { RootStackParamList } from "../navigation/AppNavigator";
import { askAI } from "../services/ai.service";
import { ModuleCardModel } from "../types/notesStudio.types";

export default function NotesStudioScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, loading } = useNotesStudio();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const visibleModules = useMemo(() => {
    const category = ["", "chemistry", "physics", "biology"][activeTab];
    const query = searchQuery.trim().toLowerCase();

    return (data?.modules ?? []).filter((module) => {
      const matchesCategory = !category || module.unitTag.toLowerCase().includes(category);
      const matchesQuery = !query || [module.title, module.unitTag, module.description, module.footerInfo]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [activeTab, data?.modules, searchQuery]);

  if (loading || !data) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const openContentStudio = () => navigation.navigate("TeacherContent");

  const handleModuleAction = async (module: ModuleCardModel, label: string) => {
    if (label === "Open Note Editor" || label === "Edit Notes") {
      openContentStudio();
      return;
    }

    if (label === "Gen AI Questions") {
      openContentStudio();
      return;
    }

    if (label === "View (24)" || label === "View details") {
      Alert.alert(module.title, `${module.footerInfo}.`);
      return;
    }

    if (label === "Re-index with AI") {
      try {
        const result = await askAI<{ message: string }>({
          action: "reindex_module",
          title: module.title,
          context: module.description ?? module.statusBox?.body,
        });
        Alert.alert("Re-index complete", result.message);
      } catch (error: any) {
        Alert.alert("Re-index unavailable", error?.message ?? "Deploy the ai-assistant Edge Function and try again.");
      }
    }
  };

  const runCurriculumCheck = async () => {
    try {
      const result = await askAI<{ message: string }>({
        action: "curriculum_check",
        context: data.modules.map((module) => `${module.unitTag}: ${module.title}`).join("\n"),
      });
      Alert.alert("Curriculum check complete", result.message);
    } catch (error: any) {
      Alert.alert("Curriculum check unavailable", error?.message ?? "Deploy the ai-assistant Edge Function and try again.");
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surfaceLight} />

      <ConsoleHeader
        header={data.header}
        avatarUrl={mockTeacher.profile.avatarUrl}
        onNotification={() => Alert.alert("Notifications", "You are all caught up.")}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CurriculumSourceBar source={data.source} />

        <PrimaryButton
          title="Add curriculum content"
          onPress={() => navigation.navigate("TeacherContent")}
          icon={<MaterialIcons name="add" size={18} color={colors.white} />}
        />

        <ActiveCurriculumCard curriculum={data.curriculum} onUpload={openContentStudio} />

        <VectorIndexCard vectorIndex={data.vectorIndex} />

        <SearchAndFilters
          placeholder={data.searchPlaceholder}
          tabs={data.tabs}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          onTabChange={setActiveTab}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{data.sectionTitle}</Text>
          <Text style={styles.sortLabel}>{data.sortLabel}</Text>
        </View>

        {visibleModules.map((module) => (
          <ModuleCard key={module.id} module={module} onAction={handleModuleAction} />
        ))}

        <AlignmentCard alignment={data.alignment} onPress={runCurriculumCheck} />
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