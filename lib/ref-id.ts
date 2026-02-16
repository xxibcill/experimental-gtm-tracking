/**
 * Referral ID Tracking Utility
 *
 * This module handles ref_id extraction from URL parameters and localStorage persistence.
 * The ref_id is stored on first visit and reused on subsequent visits.
 */

const REF_ID_KEY = 'gtm_ref_id';
const REF_ID_PARAM = 'ref_id';

/**
 * Extract ref_id from URL query parameters
 * @param url - The URL to extract from (defaults to window.location.href)
 * @returns The ref_id if found, null otherwise
 */
export function extractRefIdFromUrl(url?: string): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const targetUrl = url || window.location.href;
    const urlObj = new URL(targetUrl);
    return urlObj.searchParams.get(REF_ID_PARAM);
  } catch {
    return null;
  }
}

/**
 * Get ref_id from localStorage
 * @returns The stored ref_id or null if not found
 */
export function getStoredRefId(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    return localStorage.getItem(REF_ID_KEY);
  } catch {
    return null;
  }
}

/**
 * Store ref_id in localStorage
 * @param refId - The ref_id to store
 */
export function storeRefId(refId: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(REF_ID_KEY, refId);
  } catch (error) {
    console.warn('Failed to store ref_id in localStorage:', error);
  }
}

/**
 * Initialize ref_id tracking
 * This should be called once when the app loads.
 * It will:
 * 1. Check URL for ref_id parameter
 * 2. If found, store it in localStorage (overwriting any existing value)
 * 3. If not found in URL, check localStorage
 * 4. Return the ref_id (from URL or localStorage)
 *
 * @returns The active ref_id or null if none found
 */
export function initRefId(): string | null {
  if (typeof window === 'undefined') return null;

  // First, check URL for ref_id
  const urlRefId = extractRefIdFromUrl();

  if (urlRefId) {
    // URL ref_id takes precedence - store it
    storeRefId(urlRefId);
    return urlRefId;
  }

  // If no URL ref_id, check localStorage
  return getStoredRefId();
}

/**
 * Get the current active ref_id
 * This returns either the stored ref_id or null
 *
 * @returns The current ref_id or null
 */
export function getCurrentRefId(): string | null {
  return getStoredRefId();
}

/**
 * Clear stored ref_id (useful for testing or logout)
 */
export function clearRefId(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(REF_ID_KEY);
  } catch (error) {
    console.warn('Failed to clear ref_id from localStorage:', error);
  }
}
