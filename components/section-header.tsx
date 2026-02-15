import { Briefcase, Settings, PlayCircle } from "lucide-react";
import { CryptoIcon } from "@/components/icons/crypto-icon";
import { CategoryId } from "@/types";

const iconMap: Record<CategoryId, React.ComponentType<{ className?: string }>> = {
  crypto: ({ className }) => <CryptoIcon size={16} className={className} />,
  politics: Briefcase,
  business: Briefcase,
  technology: Settings,
  entertainment: PlayCircle,
};

interface SectionHeaderProps {
  categoryId: CategoryId;
  categoryLabel: string;
}

export function SectionHeader({
  categoryId,
  categoryLabel,
}: SectionHeaderProps) {
  const Icon = iconMap[categoryId];

  return (
    <div className="flex items-center gap-4">
      <span className="flex items-center justify-center size-12 rounded-full border-[1.5px] border-white">
        <Icon className="size-4 text-white" />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Trending in {categoryLabel}
        </h2>
        <p className="text-sm text-muted-foreground">
          Select a news story to generate content
        </p>
      </div>
    </div>
  );
}