import { CategoryTabs } from "@/components/category-tabs";
import { CategoryId } from "@/types";

interface HeroSectionProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export function HeroSection({
  selectedCategory,
  onSelectCategory,
}: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-4">
        <h1
          className="bg-gradient-to-r from-white to-primary bg-clip-text text-center text-5xl font-semibold leading-[48px] tracking-tight text-transparent"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          AI
          <br />
          Content Generator
        </h1>
        <p className="max-w-[672px] text-center text-lg leading-7 tracking-tight text-muted-foreground">
          Generate compelling content from trending news across multiple
          categories. Select a topic, choose your tone, and let AI craft
          engaging narratives tailored to your needs.
        </p>
      </div>
      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
    </div>
  );
}