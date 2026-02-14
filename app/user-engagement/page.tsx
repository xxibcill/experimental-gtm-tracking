"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { trackUserEngagement, trackEvent } from "@/lib/gtm";

export default function UserEngagement() {
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [engagementScore, setEngagementScore] = useState(0);
  const [sessionCount, setSessionCount] = useState(1);
  const [lastActive, setLastActive] = useState(Date.now());

  const startTimeRef = useRef(Date.now());
  const activeTimeRef = useRef(0);
  const engagementTrackedRef = useRef(false);

  // Track time on page every second
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setTimeOnPage(elapsed);

      // Update active time if user is active
      if (isActive) {
        activeTimeRef.current += 1;

        // Calculate engagement score based on active time
        // Score = (active_time / total_time) * 100 + bonus for interactions
        const baseScore = Math.min(100, (activeTimeRef.current / elapsed) * 100);
        setEngagementScore(Math.round(baseScore));
      }

      // Track engagement at intervals (30 seconds, 1 minute, 2 minutes, 5 minutes)
      const intervals = [30, 60, 120, 300];
      const shouldTrack = intervals.includes(elapsed);

      if (shouldTrack && !engagementTrackedRef.current) {
        trackUserEngagement(elapsed, engagementScore);
        engagementTrackedRef.current = true;
        setTimeout(() => {
          engagementTrackedRef.current = false;
        }, 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, engagementScore]);

  // Track user activity
  useEffect(() => {
    const handleActivity = () => {
      setIsActive(true);
      setLastActive(Date.now());

      // Track user interaction
      trackEvent("user_activity", {
        activity_type: "page_interaction",
        time_on_page: timeOnPage,
      });
    };

    const handleInactivity = () => {
      // Consider user inactive after 30 seconds of no interaction
      if (Date.now() - lastActive > 30000) {
        setIsActive(false);
        trackEvent("user_inactive", {
          inactive_duration: Date.now() - lastActive,
        });
      }
    };

    // Listen for user interactions
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("scroll", handleActivity);

    // Check for inactivity every 10 seconds
    const inactivityCheck = setInterval(handleInactivity, 10000);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      clearInterval(inactivityCheck);
    };
  }, [lastActive, timeOnPage]);

  // Track when user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      const totalTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      trackUserEngagement(totalTime, engagementScore);

      // Also track page exit
      trackEvent("page_exit", {
        page_path: "/user-engagement",
        time_on_page: totalTime,
        engagement_score: engagementScore,
        session_count: sessionCount,
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [engagementScore, sessionCount]);

  // Simulate session tracking
  const incrementSession = () => {
    setSessionCount((prev) => prev + 1);
    trackEvent("session_increment", {
      new_session_count: sessionCount + 1,
    });
  };

  // Format time as MM:SS or HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  // Get engagement level based on score
  const getEngagementLevel = (score: number): { label: string; color: string } => {
    if (score >= 80) return { label: "High", color: "text-green-600" };
    if (score >= 50) return { label: "Medium", color: "text-yellow-600" };
    return { label: "Low", color: "text-red-600" };
  };

  const engagementLevel = getEngagementLevel(engagementScore);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={40}
              height={16}
              priority
            />
          </Link>
          <span className="font-semibold text-lg">GTM Learning</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-gray-600">
            Home
          </Link>
          <Link href="/tracking-demo" className="text-sm font-medium hover:text-gray-600">
            Tracking Demo
          </Link>
          <Link href="/ecommerce" className="text-sm font-medium hover:text-gray-600">
            Ecommerce
          </Link>
          <Link href="/scroll-tracking" className="text-sm font-medium hover:text-gray-600">
            Scroll Tracking
          </Link>
          <Link href="/video-tracking" className="text-sm font-medium hover:text-gray-600">
            Video Tracking
          </Link>
          <Link href="/user-engagement" className="text-sm font-medium hover:text-gray-600">
            User Engagement
          </Link>
        </div>
      </nav>

      <main className="flex-1 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">User Engagement Tracking</h1>
          <p className="text-lg text-gray-600 mb-12">
            This page demonstrates user engagement and time-on-page tracking. Interact with the page
            to see engagement metrics update. Open your browser console to see the dataLayer events.
          </p>

          {/* Time on Page */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Time Metrics */}
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Time on Page</h2>
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {formatTime(timeOnPage)}
                  </div>
                  <p className="text-gray-600">Total time on this page</p>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Active Time:</span>
                    <span className="font-medium">{formatTime(activeTimeRef.current)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${isActive ? "text-green-600" : "text-gray-400"}`}>
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Engagement Score */}
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Engagement Score</h2>
                <div className="text-center">
                  <div className="relative inline-block">
                    <svg className="w-32 h-32" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${engagementScore * 2.83} 283`}
                        transform="rotate(-90 50 50)"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">{engagementScore}%</span>
                    </div>
                  </div>
                  <p className={`mt-2 font-medium ${engagementLevel.color}`}>
                    {engagementLevel.label} Engagement
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Session Count */}
          <section className="mb-12">
            <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Session Tracking</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Current Session Count:</p>
                  <p className="text-3xl font-bold text-purple-600">{sessionCount}</p>
                </div>
                <button
                  onClick={incrementSession}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  data-gtm-category="session"
                  data-gtm-action="increment"
                  data-gtm-label="session_count"
                >
                  Simulate New Session
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Click the button to simulate a user returning for another session. This would
                typically happen automatically when a user returns to the site.
              </p>
            </div>
          </section>

          {/* Interactive Elements to Boost Engagement */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Boost Your Engagement</h2>
            <p className="text-gray-600 mb-6">
              Interact with these elements to increase your engagement score:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => {
                  trackEvent("engagement_interaction", {
                    interaction_type: "button_click",
                    interaction_element: "cta_button",
                  });
                  setEngagementScore((prev) => Math.min(100, prev + 5));
                }}
                className="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">👆</span>
                <p className="mt-2 text-sm">Click Button</p>
              </button>

              <button
                onClick={() => {
                  trackEvent("engagement_interaction", {
                    interaction_type: "form_focus",
                    interaction_element: "search_input",
                  });
                  setEngagementScore((prev) => Math.min(100, prev + 3));
                }}
                className="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">🔍</span>
                <p className="mt-2 text-sm">Use Search</p>
              </button>

              <button
                onClick={() => {
                  trackEvent("engagement_interaction", {
                    interaction_type: "share",
                    interaction_element: "share_button",
                  });
                  setEngagementScore((prev) => Math.min(100, prev + 10));
                }}
                className="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">📤</span>
                <p className="mt-2 text-sm">Share Content</p>
              </button>

              <button
                onClick={() => {
                  trackEvent("engagement_interaction", {
                    interaction_type: "bookmark",
                    interaction_element: "bookmark_button",
                  });
                  setEngagementScore((prev) => Math.min(100, prev + 8));
                }}
                className="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">🔖</span>
                <p className="mt-2 text-sm">Bookmark</p>
              </button>
            </div>
          </section>

          {/* Event Preview */}
          <section className="mb-12">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold mb-2">Latest Engagement Event</h3>
              <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
                {JSON.stringify(
                  {
                    event: "user_engagement",
                    engagement_time_seconds: timeOnPage,
                    engagement_score: engagementScore,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </section>

          {/* Implementation Notes */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Implementation Notes</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>How it works:</strong> This page tracks user engagement through:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Time on Page:</strong> Calculates total time since page load
                </li>
                <li>
                  <strong>Active Time:</strong> Tracks time when user is actively interacting
                  (mouse, keyboard, scroll)
                </li>
                <li>
                  <strong>Engagement Score:</strong> A calculated metric based on active time
                  percentage and interactions
                </li>
                <li>
                  <strong>Session Count:</strong> Simulates tracking returning users
                </li>
              </ul>
              <p>
                <strong>Tracked Events:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>user_engagement</strong> - Fired at 30s, 1min, 2min, 5min intervals
                </li>
                <li>
                  <strong>user_activity</strong> - Fired on user interactions
                </li>
                <li>
                  <strong>user_inactive</strong> - Fired when user becomes inactive
                </li>
                <li>
                  <strong>page_exit</strong> - Fired when user leaves the page
                </li>
              </ul>
              <p>
                <strong>GTM Configuration:</strong> Use these events to create segments for
                highly engaged users, set up retention campaigns, or identify pages that need
                improvement.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
