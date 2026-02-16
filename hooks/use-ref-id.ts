"use client";

import { useEffect } from "react";
import { initRefId } from "@/lib/ref-id";

/**
 * Hook to initialize ref_id tracking
 * This hook should be called once in the root layout or app component.
 * It will:
 * 1. Extract ref_id from URL on first visit
 * 2. Store it in localStorage
 * 3. Reuse stored ref_id on subsequent visits
 */
export function useRefId() {
  useEffect(() => {
    // Initialize ref_id tracking when component mounts
    const refId = initRefId();

    if (refId) {
      console.log("[RefID] Tracking initialized with ref_id:", refId);
    } else {
      console.log("[RefID] No ref_id found in URL or localStorage");
    }
  }, []);
}
