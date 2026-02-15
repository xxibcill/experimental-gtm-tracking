"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { trackScrollDepth } from "@/lib/gtm";

export default function ScrollTracking() {
  const [scrollDepth, setScrollDepth] = useState(0);
  const [thresholds, setThresholds] = useState<{ [key: number]: boolean }>({
    25: false,
    50: false,
    75: false,
    100: false,
  });
  const pagePath = "/scroll-tracking";
  const maxScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;

      if (scrollableHeight <= 0) return;

      const currentScrollDepth = Math.min(
        Math.round((scrollTop / scrollableHeight) * 100),
        100
      );

      maxScrollRef.current = Math.max(maxScrollRef.current, currentScrollDepth);
      setScrollDepth(maxScrollRef.current);

      // Track each threshold only once
      const newThresholds = { ...thresholds };

      [25, 50, 75, 100].forEach((threshold) => {
        if (maxScrollRef.current >= threshold && !newThresholds[threshold]) {
          newThresholds[threshold] = true;
          trackScrollDepth(threshold, pagePath);
        }
      });

      setThresholds(newThresholds);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [thresholds]);

  // Scroll to section helpers
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200 sticky top-0 bg-white z-50">
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
          <Link href="/" className="text-base font-medium hover:text-gray-400 transition-colors">
            Home
          </Link>
          <Link href="/tracking-demo" className="text-base font-medium hover:text-gray-400 transition-colors">
            Tracking Demo
          </Link>
          <Link href="/ecommerce" className="text-base font-medium hover:text-gray-400 transition-colors">
            Ecommerce
          </Link>
          <Link href="/scroll-tracking" className="text-base font-medium hover:text-gray-400 transition-colors">
            Scroll Tracking
          </Link>
          <Link href="/video-tracking" className="text-base font-medium hover:text-gray-400 transition-colors">
            Video Tracking
          </Link>
          <Link href="/user-engagement" className="text-base font-medium hover:text-gray-400 transition-colors">
            User Engagement
          </Link>
        </div>
      </nav>

      {/* Scroll Progress Indicator */}
      <div className="sticky top-[57px] left-0 right-0 h-2 bg-gray-200 z-40">
        <div
          className="h-full bg-blue-600 transition-all duration-150"
          style={{ width: `${scrollDepth}%` }}
        />
      </div>

      <main className="flex-1">
        <div className="max-w-4xl mx-auto py-16 px-8">
          <h1 className="text-4xl font-bold mb-4">Scroll Depth Tracking</h1>
          <p className="text-lg text-gray-600 mb-8">
            This page demonstrates scroll depth tracking. Scroll down to see the events fire.
            Open your browser console to see the dataLayer events.
          </p>

          {/* Current Scroll Depth */}
          <div className="mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Current Scroll Depth</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-150"
                  style={{ width: `${scrollDepth}%` }}
                />
              </div>
              <span className="text-2xl font-bold text-blue-600">{scrollDepth}%</span>
            </div>
          </div>

          {/* Threshold Markers */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4">Threshold Markers</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                { depth: 25, label: "25%" },
                { depth: 50, label: "50%" },
                { depth: 75, label: "75%" },
                { depth: 100, label: "100%" },
              ].map(({ depth, label }) => (
                <div
                  key={depth}
                  className={`p-4 rounded-lg text-center ${
                    thresholds[depth]
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-gray-100 border-2 border-gray-300"
                  }`}
                >
                  <div className="text-3xl mb-2">
                    {thresholds[depth] ? "✓" : "○"}
                  </div>
                  <div className="font-bold">{label}</div>
                  <div className="text-sm text-gray-600">
                    {thresholds[depth] ? "Reached" : "Not reached"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mb-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Quick Navigation</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("section-1")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Section 1 (25%)
              </button>
              <button
                onClick={() => scrollToSection("section-2")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Section 2 (50%)
              </button>
              <button
                onClick={() => scrollToSection("section-3")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Section 3 (75%)
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Top
              </button>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Section 1 */}
            <section id="section-1" className="min-h-[50vh] p-8 bg-white border border-gray-200 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Section 1</h2>
              <p className="text-gray-600 mb-4">
                This is the first section of the page. Scroll down to reach 25% depth.
              </p>
              <p className="text-gray-600 mb-4">
                When you scroll past 25% of the page, a scroll_depth event will be pushed
                to the dataLayer with the depth value of 25.
              </p>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold mb-2">GTM Event: scroll_depth</h3>
                <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
                  {JSON.stringify(
                    {
                      event: "scroll_depth",
                      scroll_depth: 25,
                      scroll_depth_unit: "percent",
                      page_path: pagePath,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </section>

            {/* Section 2 */}
            <section id="section-2" className="min-h-[50vh] p-8 bg-white border border-gray-200 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Section 2</h2>
              <p className="text-gray-600 mb-4">
                This is the second section. Continue scrolling to reach 50% depth.
              </p>
              <p className="text-gray-600 mb-4">
                Scroll depth tracking is commonly used to measure content engagement.
                Pages with high scroll depth typically indicate more engaged users.
              </p>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold mb-2">GTM Event: scroll_depth</h3>
                <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
                  {JSON.stringify(
                    {
                      event: "scroll_depth",
                      scroll_depth: 50,
                      scroll_depth_unit: "percent",
                      page_path: pagePath,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </section>

            {/* Section 3 */}
            <section id="section-3" className="min-h-[50vh] p-8 bg-white border border-gray-200 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Section 3</h2>
              <p className="text-gray-600 mb-4">
                This is the third section. Almost at 75% depth now!
              </p>
              <p className="text-gray-600 mb-4">
                Common scroll depth thresholds used in analytics:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>25% - Quarter of the page</li>
                <li>50% - Halfway point</li>
                <li>75% - Three-quarters through</li>
                <li>100% - Full page view</li>
              </ul>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold mb-2">GTM Event: scroll_depth</h3>
                <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
                  {JSON.stringify(
                    {
                      event: "scroll_depth",
                      scroll_depth: 75,
                      scroll_depth_unit: "percent",
                      page_path: pagePath,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </section>

            {/* Section 4 */}
            <section id="section-4" className="min-h-[50vh] p-8 bg-white border border-gray-200 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Section 4 - Final Section</h2>
              <p className="text-gray-600 mb-4">
                This is the final section. Scroll all the way to reach 100% depth.
              </p>
              <p className="text-gray-600 mb-4">
                When you reach the bottom of this page, the scroll_depth event will fire
                with a value of 100, indicating the user has viewed the entire page.
              </p>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold mb-2">GTM Event: scroll_depth (Complete)</h3>
                <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
                  {JSON.stringify(
                    {
                      event: "scroll_depth",
                      scroll_depth: 100,
                      scroll_depth_unit: "percent",
                      page_path: pagePath,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </section>
          </div>

          {/* Implementation Notes */}
          <div className="mt-16 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Implementation Notes</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>How it works:</strong> The scroll tracking is implemented using a
                React useEffect hook that listens to the window scroll event. It calculates
                the scrollable height of the page and tracks the percentage scrolled.
              </p>
              <p>
                <strong>GTM Configuration:</strong> In GTM, you would create a Custom Event
                trigger for the event name "scroll_depth" and then create tags to send this
                data to Google Analytics.
              </p>
              <p>
                <strong>Thresholds:</strong> Each threshold (25%, 50%, 75%, 100%) is tracked
                only once per page load to avoid duplicate events.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
