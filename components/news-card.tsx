"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ToneSelector } from "@/components/tone-selector";
import { GenerateButton } from "@/components/generate-button";
import { GeneratedContent } from "@/components/generated-content";
import { NewsStory, ToneOfVoice } from "@/types";

interface NewsCardProps {
  story: NewsStory;
  selectedTone: ToneOfVoice;
  onToneChange: (tone: ToneOfVoice) => void;
  onGenerate: () => void;
  generatedContent?: string;
  generatedTone?: ToneOfVoice;
  isGenerating?: boolean;
  isExpanded?: boolean;
}

export function NewsCard({
  story,
  selectedTone,
  onToneChange,
  onGenerate,
  generatedContent,
  generatedTone,
  isGenerating,
  isExpanded,
}: NewsCardProps) {
  return (
    <AccordionItem
      value={story.id}
      className={`rounded-[10px] border-0 transition-all ${
        isExpanded
          ? "border-2 border-primary bg-card shadow-[0px_10px_15px_0px_rgba(143,143,255,0.1),0px_4px_6px_0px_rgba(143,143,255,0.1)]"
          : "border border-border bg-card"
      }`}
    >
      <AccordionTrigger className="items-center px-6 py-5 hover:no-underline [&>svg]:size-5">
        <span className="text-base font-normal tracking-tight text-foreground">
          {story.title}
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-0">
        <div className="flex flex-col gap-6 border-t border-border pt-6">
          <p className="text-base leading-[26px] tracking-tight text-muted-foreground">
            {story.description}
          </p>
          <ToneSelector value={selectedTone} onChange={onToneChange} />
          <GenerateButton onClick={onGenerate} isLoading={isGenerating} />
          {generatedContent && generatedTone && (
            <GeneratedContent
              content={generatedContent}
              tone={generatedTone}
              category={story.categoryId}
              cluster={story.title}
            />
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}