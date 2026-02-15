"use client";

import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export function GenerateButton({ onClick, isLoading }: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      data-action="generate"
      className="h-12 w-full rounded-[10px] bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
    >
      {isLoading ? "Generating..." : "Generate Content"}
    </Button>
  );
}