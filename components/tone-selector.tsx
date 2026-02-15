"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toneOptions } from "@/data/constants";
import { ToneOfVoice } from "@/types";

interface ToneSelectorProps {
  value: ToneOfVoice;
  onChange: (value: ToneOfVoice) => void;
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-foreground">
        Tone of Voice
      </label>
      <Select value={value} onValueChange={(v) => onChange(v as ToneOfVoice)}>
        <SelectTrigger className="h-[50px] w-full rounded-[10px] border-border bg-input px-6 text-base text-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-[10px] border-border bg-card">
          {toneOptions.map((tone) => (
            <SelectItem key={tone.value} value={tone.value}>
              {tone.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}