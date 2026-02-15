"use client";

import { useState, useMemo, useEffect } from "react";
import { BackgroundGradient } from "@/components/background-gradient";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { SectionHeader } from "@/components/section-header";
import { NewsCardList } from "@/components/news-card-list";
import { categories } from "@/data/constants";
import { mockStories } from "@/data/mock-data";
import { CategoryId, ToneOfVoice } from "@/types";
import {
  trackPageView,
  trackOutputGenerated,
  trackGenerateClick,
  trackGenerateSuccess,
  trackGenerateFailed,
} from "@/lib/gtm";

const MOCK_GENERATED_CONTENT = `Breaking developments continue to reshape the landscape as key stakeholders respond to emerging trends. Industry analysts point to sustained momentum amid evolving market conditions.

Key highlights:
• Strong institutional interest driving momentum
• Regulatory clarity expected to boost confidence
• Market participants remain cautiously optimistic

The trajectory suggests continued growth opportunities for engaged participants.`;

export function ContentGeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("crypto");
  const [expandedCardId, setExpandedCardId] = useState<string | undefined>(undefined);
  const [selectedTones, setSelectedTones] = useState<Record<string, ToneOfVoice>>({});
  const [generatedContents, setGeneratedContents] = useState<
    Record<string, { content: string; tone: ToneOfVoice }>
  >({});
  const [generatingStoryId, setGeneratingStoryId] = useState<string | null>(null);

  useEffect(() => {
    trackPageView(window.location.pathname, "Content Generator");
  }, []);

  const filteredStories = useMemo(
    () => mockStories.filter((s) => s.categoryId === selectedCategory),
    [selectedCategory]
  );

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  function handleToneChange(storyId: string, tone: ToneOfVoice) {
    setSelectedTones((prev) => ({ ...prev, [storyId]: tone }));
  }

  async function handleGenerate(storyId: string) {
    const story = mockStories.find((s) => s.id === storyId);
    if (!story) return;
    if (generatingStoryId === storyId) return;

    setGeneratingStoryId(storyId);
    const tone = selectedTones[storyId] ?? "neutral";

    trackGenerateClick(story.categoryId, story.title);
    const startTime = performance.now();

    try {
      // Simulate API delay (800-1500ms)
      await new Promise((resolve) =>
        setTimeout(resolve, 800 + Math.random() * 700)
      );

      const generationTimeMs = Math.round(performance.now() - startTime);
      trackGenerateSuccess(generationTimeMs);
      trackOutputGenerated(story.categoryId, story.title);

      setGeneratedContents((prev) => ({
        ...prev,
        [storyId]: { content: MOCK_GENERATED_CONTENT, tone },
      }));
    } catch (error) {
      trackGenerateFailed("MOCK_ERROR");
    } finally {
      setGeneratingStoryId(null);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <BackgroundGradient />
      <div className="relative z-10">
        <Header />
        <main className="mx-auto max-w-[1096px] px-4">
          <div className="pt-[100px] pb-16">
            <HeroSection
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
          <div className="flex flex-col gap-8 pb-24">
            <SectionHeader
              categoryId={selectedCategory}
              categoryLabel={currentCategory?.label ?? "Crypto"}
            />
            <NewsCardList
              stories={filteredStories}
              expandedCardId={expandedCardId}
              onExpandChange={setExpandedCardId}
              selectedTones={selectedTones}
              onToneChange={handleToneChange}
              onGenerate={handleGenerate}
              generatedContents={generatedContents}
              generatingStoryId={generatingStoryId}
            />
          </div>
        </main>
      </div>
    </div>
  );
}