"use client";

import { CategoryTab } from "@/components/category-tab";
import { categories } from "@/data/constants";
import { CategoryId } from "@/types";

interface CategoryTabsProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export function CategoryTabs({
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {categories.map((cat) => (
        <CategoryTab
          key={cat.id}
          icon={cat.icon}
          label={cat.label}
          categoryId={cat.id}
          isActive={selectedCategory === cat.id}
          onClick={() => onSelectCategory(cat.id)}
        />
      ))}
    </div>
  );
}