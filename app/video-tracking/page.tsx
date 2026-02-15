"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { trackVideoEvent } from "@/lib/gtm";

interface VideoState {
  status: "idle" | "playing" | "paused" | "completed";
  currentTime: number;
  duration: number;
  progress: number;
}

export default function VideoTracking() {
  const [video1State, setVideo1State] = useState<VideoState>({
    status: "idle",
    currentTime: 0,
    duration: 0,
    progress: 0,
  });
  const [video2State, setVideo2State] = useState<VideoState>({
    status: "idle",
    currentTime: 0,
    duration: 0,
    progress: 0,
  });

  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  // Track progress milestones
  const [video1Milestones, setVideo1Milestones] = useState<number[]>([]);
  const [video2Milestones, setVideo2Milestones] = useState<number[]>([]);

  const milestones = [25, 50, 75, 100];

  const handleVideoTimeUpdate = (
    videoRef: React.RefObject<HTMLVideoElement | null>,
    videoId: string,
    videoTitle: string,
    currentMilestones: number[],
    setMilestones: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;
    const duration = video.duration || 1;
    const progress = Math.round((currentTime / duration) * 100);

    // Update state
    setVideo1State((prev) => {
      if (videoId === "intro_video") {
        return {
          ...prev,
          currentTime,
          duration,
          progress,
        };
      }
      return prev;
    });

    // Check for milestone completion
    milestones.forEach((milestone) => {
      if (progress >= milestone && !currentMilestones.includes(milestone)) {
        setMilestones((prev) => [...prev, milestone]);
        trackVideoEvent(videoId, videoTitle, "progress", milestone);
      }
    });
  };

  const handleVideo1TimeUpdate = () => {
    handleVideoTimeUpdate(
      video1Ref,
      "intro_video",
      "Introduction to GTM",
      video1Milestones,
      setVideo1Milestones
    );
    // Update state
    const video = video1Ref.current;
    if (video) {
      setVideo1State((prev) => ({
        ...prev,
        currentTime: video.currentTime,
        duration: video.duration,
        progress: Math.round((video.currentTime / (video.duration || 1)) * 100),
      }));
    }
  };

  const handleVideo2TimeUpdate = () => {
    handleVideoTimeUpdate(
      video2Ref,
      "tutorial_video",
      "Advanced Tracking Tutorial",
      video2Milestones,
      setVideo2Milestones
    );
    // Update state
    const video = video2Ref.current;
    if (video) {
      setVideo2State((prev) => ({
        ...prev,
        currentTime: video.currentTime,
        duration: video.duration,
        progress: Math.round((video.currentTime / (video.duration || 1)) * 100),
      }));
    }
  };

  const handleVideo1Play = () => {
    setVideo1State((prev) => ({ ...prev, status: "playing" }));
    trackVideoEvent("intro_video", "Introduction to GTM", "play");
  };

  const handleVideo1Pause = () => {
    setVideo1State((prev) => ({ ...prev, status: "paused" }));
    trackVideoEvent("intro_video", "Introduction to GTM", "pause");
  };

  const handleVideo1Ended = () => {
    setVideo1State((prev) => ({ ...prev, status: "completed" }));
    trackVideoEvent("intro_video", "Introduction to GTM", "complete");
  };

  const handleVideo2Play = () => {
    setVideo2State((prev) => ({ ...prev, status: "playing" }));
    trackVideoEvent("tutorial_video", "Advanced Tracking Tutorial", "play");
  };

  const handleVideo2Pause = () => {
    setVideo2State((prev) => ({ ...prev, status: "paused" }));
    trackVideoEvent("tutorial_video", "Advanced Tracking Tutorial", "pause");
  };

  const handleVideo2Ended = () => {
    setVideo2State((prev) => ({ ...prev, status: "completed" }));
    trackVideoEvent("tutorial_video", "Advanced Tracking Tutorial", "complete");
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const resetVideo = (
    videoRef: React.RefObject<HTMLVideoElement | null>,
    setState: React.Dispatch<React.SetStateAction<VideoState>>,
    setMilestones: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
    setState((prev) => ({
      status: "playing",
      currentTime: 0,
      duration: prev.duration,
      progress: 0,
    }));
    setMilestones([]);
  };

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

      <main className="flex-1 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Video Tracking</h1>
          <p className="text-lg text-gray-600 mb-12">
            This page demonstrates YouTube/video engagement tracking. Interact with the videos
            to see the tracking events. Open your browser console to see the dataLayer events.
          </p>

          {/* Video 1 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Introduction to GTM</h2>

            <div className="mb-6">
              {/* Placeholder for video - using a simple visual representation */}
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">▶</div>
                    <p className="text-sm">Demo Video Player</p>
                    <p className="text-xs text-gray-400 mt-2">
                      (Using HTML5 video element for demo)
                    </p>
                  </div>
                </div>
                {/* Simulated video with controls */}
                <video
                  ref={video1Ref}
                  className="w-full h-full opacity-0"
                  controls
                  onPlay={handleVideo1Play}
                  onPause={handleVideo1Pause}
                  onEnded={handleVideo1Ended}
                  onTimeUpdate={handleVideo1TimeUpdate}
                >
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Video Controls */}
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() =>
                  resetVideo(video1Ref, setVideo1State, setVideo1Milestones)
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Play/Reset
              </button>
              <div className="flex-1">
                <div className="flex justify-between text-base text-gray-300 mb-1">
                  <span>Status: {video1State.status}</span>
                  <span>
                    {formatTime(video1State.currentTime)} /{" "}
                    {formatTime(video1State.duration)}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${video1State.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="grid grid-cols-4 gap-4">
              {milestones.map((milestone) => (
                <div
                  key={milestone}
                  className={`p-3 rounded-lg text-center ${
                    video1Milestones.includes(milestone)
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-gray-100 border-2 border-gray-300"
                  }`}
                >
                  <div className="text-lg font-bold">{milestone}%</div>
                  <div className="text-xs text-gray-600">
                    {video1Milestones.includes(milestone) ? "✓" : "○"}
                  </div>
                </div>
              ))}
            </div>

            {/* Event Preview */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold mb-2">Last Event</h3>
              <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
                {JSON.stringify(
                  {
                    event: "video_engagement",
                    video_id: "intro_video",
                    video_title: "Introduction to GTM",
                    video_status: video1State.status,
                    video_progress: video1State.progress,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </section>

          {/* Video 2 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Advanced Tracking Tutorial</h2>

            <div className="mb-6">
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">▶</div>
                    <p className="text-sm">Advanced Tutorial Video</p>
                    <p className="text-xs text-gray-400 mt-2">
                      (Using HTML5 video element for demo)
                    </p>
                  </div>
                </div>
                <video
                  ref={video2Ref}
                  className="w-full h-full opacity-0"
                  controls
                  onPlay={handleVideo2Play}
                  onPause={handleVideo2Pause}
                  onEnded={handleVideo2Ended}
                  onTimeUpdate={handleVideo2TimeUpdate}
                >
                  <source
                    src="https://www.w3schools.com/html/movie.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Video Controls */}
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() =>
                  resetVideo(video2Ref, setVideo2State, setVideo2Milestones)
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Play/Reset
              </button>
              <div className="flex-1">
                <div className="flex justify-between text-base text-gray-300 mb-1">
                  <span>Status: {video2State.status}</span>
                  <span>
                    {formatTime(video2State.currentTime)} /{" "}
                    {formatTime(video2State.duration)}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${video2State.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="grid grid-cols-4 gap-4">
              {milestones.map((milestone) => (
                <div
                  key={milestone}
                  className={`p-3 rounded-lg text-center ${
                    video2Milestones.includes(milestone)
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-gray-100 border-2 border-gray-300"
                  }`}
                >
                  <div className="text-lg font-bold">{milestone}%</div>
                  <div className="text-xs text-gray-600">
                    {video2Milestones.includes(milestone) ? "✓" : "○"}
                  </div>
                </div>
              ))}
            </div>

            {/* Event Preview */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold mb-2">Last Event</h3>
              <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
                {JSON.stringify(
                  {
                    event: "video_engagement",
                    video_id: "tutorial_video",
                    video_title: "Advanced Tracking Tutorial",
                    video_status: video2State.status,
                    video_progress: video2State.progress,
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
                <strong>How it works:</strong> The video tracking uses HTML5 video events
                (play, pause, ended, timeupdate) to track user engagement with video content.
              </p>
              <p>
                <strong>Tracked Events:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>video_engagement</strong> with status "play" - When video starts
                  playing
                </li>
                <li>
                  <strong>video_engagement</strong> with status "pause" - When video is paused
                </li>
                <li>
                  <strong>video_engagement</strong> with status "complete" - When video finishes
                </li>
                <li>
                  <strong>video_engagement</strong> with status "progress" - At 25%, 50%, 75%,
                  100% milestones
                </li>
              </ul>
              <p>
                <strong>GTM Configuration:</strong> Create a Custom Event trigger for
                "video_engagement" and use the video_status and video_progress variables to
                differentiate between event types.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
