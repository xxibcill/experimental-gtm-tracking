"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { ToneOfVoice } from "@/types";
import { trackCopyToClipboard } from "@/lib/gtm";

interface GeneratedContentProps {
  content: string;
  tone: ToneOfVoice;
  category: string;
  cluster: string;
}

export function GeneratedContent({
  content,
  tone,
  category,
  cluster,
}: GeneratedContentProps) {
  const [copied, setCopied] = useState(false);
  const toneLabel = tone.charAt(0).toUpperCase() + tone.slice(1);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    trackCopyToClipboard(category, cluster);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-4 rounded-[10px] border border-border bg-[rgba(30,30,40,0.5)] px-6 pt-6 pb-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">
          Generated Content ({toneLabel} Tone)
        </h4>
        <button
          onClick={handleCopy}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="whitespace-pre-wrap text-base leading-[26px] tracking-tight text-foreground/90">
        {content}
      </div>
    </div>
  );
}