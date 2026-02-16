"use client";

import { useRefId } from "@/hooks/use-ref-id";

/**
 * RefIdProvider Component
 * This component initializes ref_id tracking on mount.
 * It should be included once in the root layout.
 */
export function RefIdProvider({ children }: { children: React.ReactNode }) {
  useRefId();
  return <>{children}</>;
}
