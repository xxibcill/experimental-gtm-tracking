"use client";

import { Accordion } from "@/components/ui/accordion";
import { NewsCard } from "@/components/news-card";
import { NewsStory, ToneOfVoice } from "@/types";

interface NewsCardListProps {
  stories: NewsStory[];
  expandedCardId: string | undefined;
  onExpandChange: (id: string | undefined) => void;
  selectedTones: Record<string, ToneOfVoice>;
  onToneChange: (storyId: string, tone: ToneOfVoice) => void;
  onGenerate: (storyId: string) => void;
  generatedContents: Record<string, { content: string; tone: ToneOfVoice }>;
  generatingStoryId: string | null;
}

export function NewsCardList({
  stories,
  expandedCardId,
  onExpandChange,
  selectedTones,
  onToneChange,
  onGenerate,
  generatedContents,
  generatingStoryId,
}: NewsCardListProps) {
  return (
    <Accordion
      type="single"
      collapsible
      value={expandedCardId}
      onValueChange={onExpandChange}
      className="flex flex-col gap-4"
    >
      {stories.map((story) => {
        const generatedData = generatedContents[story.id];
        return (
          <NewsCard
            key={story.id}
            story={story}
            selectedTone={selectedTones[story.id] ?? "neutral"}
            onToneChange={(tone) => onToneChange(story.id, tone)}
            onGenerate={() => onGenerate(story.id)}
            generatedContent={generatedData?.content}
            generatedTone={generatedData?.tone}
            isGenerating={generatingStoryId === story.id}
            isExpanded={expandedCardId === story.id}
          />
        );
      })}
    </Accordion>
  );
}