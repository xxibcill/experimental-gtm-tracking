import { Briefcase, Settings, PlayCircle } from "lucide-react";
import { CryptoIcon } from "@/components/icons/crypto-icon";
import { CategoryId } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  crypto: ({ className }: { className?: string }) => (
    <CryptoIcon className={className} size={24} />
  ),
  briefcase: Briefcase,
  settings: Settings,
  "play-circle": PlayCircle,
};

interface CategoryTabProps {
  icon: string;
  label: string;
  categoryId: CategoryId;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryTab({
  icon,
  label,
  isActive,
  onClick,
}: CategoryTabProps) {
  const IconComponent = iconMap[icon] ?? Briefcase;

  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-2 rounded-full px-6 py-2.5 text-lg tracking-tight transition-all ${
        isActive
          ? "bg-primary text-white shadow-[0px_10px_15px_0px_rgba(143,143,255,0.2),0px_4px_6px_0px_rgba(143,143,255,0.2)]"
          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
      }`}
    >
      <span
        className={`flex items-center justify-center size-6 rounded-full border ${
          isActive ? "border-white bg-primary" : "border-muted-foreground"
        }`}
      >
        <IconComponent className="size-3" />
      </span>
      {label}
    </button>
  );
}