"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  ExternalLink,
  Clock,
  Eye,
} from "lucide-react";

interface YouTubeVideo {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  startTime?: number; // in seconds
}

interface AutoYouTubePlayerProps {
  currentView: "carousel" | "player";
  selectedChannel?: any;
  onClose: () => void;
  conferences?: any[];
  currentIndex: number;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  renderConferenceLogo: (conference: any, size: string) => React.ReactNode;
  handleConferenceSelect: (conference: any) => void;
}

const AUTO_YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: "video-1",
    youtubeId: "tq6kVYunCTk",
    title: "Telugu Conference Highlights",
    description:
      "Experience the best moments from our Telugu community conference",
    startTime: 124, // Start at 2:04
  },
  {
    id: "video-2",
    youtubeId: "D7cGir2NC5A",
    title: "Community Celebration",
    description: "Join us in celebrating our vibrant Telugu community",
    startTime: 0, // Start from beginning
  },
];

export default function AutoYouTubePlayer({
  currentView,
  selectedChannel,
  onClose,
  conferences = [],
  currentIndex,
}: AutoYouTubePlayerProps) {
  // YouTube Player State
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoAutoPlaying, setIsVideoAutoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [showVideoControls, setShowVideoControls] = useState(true);
  const [isVideoHovered, setIsVideoHovered] = useState(false);

  const videoIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const currentVideo = AUTO_YOUTUBE_VIDEOS[currentVideoIndex];
  const currentConference = conferences[currentIndex];

  // Auto-advance videos
  useEffect(() => {
    if (isVideoAutoPlaying && !isVideoHovered && currentView === "carousel") {
      videoIntervalRef.current = setInterval(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % AUTO_YOUTUBE_VIDEOS.length);
        setVideoProgress(0);
        setIsVideoLoading(true);
      }, 30000); // Change video every 30 seconds
    }

    return () => {
      if (videoIntervalRef.current) {
        clearInterval(videoIntervalRef.current);
      }
    };
  }, [isVideoAutoPlaying, isVideoHovered, currentView]);

  // Auto-hide video controls
  useEffect(() => {
    if (showVideoControls) {
      controlsTimeoutRef.current = setTimeout(() => {
        if (!isVideoHovered) {
          setShowVideoControls(false);
        }
      }, 3000);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showVideoControls, isVideoHovered]);

  // Video progress simulation (since we can't get real progress from embedded YouTube)
  useEffect(() => {
    if (isVideoAutoPlaying && !isVideoLoading) {
      const progressInterval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 100 / 30; // 30 second videos
        });
      }, 1000);

      return () => clearInterval(progressInterval);
    }
  }, [isVideoAutoPlaying, isVideoLoading]);

  const handleVideoMouseEnter = () => {
    setIsVideoHovered(true);
    setShowVideoControls(true);
  };

  const handleVideoMouseLeave = () => {
    setIsVideoHovered(false);
  };

  const nextVideo = () => {
    setIsVideoAutoPlaying(false);
    setCurrentVideoIndex((prev) => (prev + 1) % AUTO_YOUTUBE_VIDEOS.length);
    setVideoProgress(0);
    setIsVideoLoading(true);
    setTimeout(() => setIsVideoAutoPlaying(true), 5000);
  };

  const prevVideo = () => {
    setIsVideoAutoPlaying(false);
    setCurrentVideoIndex((prev) =>
      prev === 0 ? AUTO_YOUTUBE_VIDEOS.length - 1 : prev - 1,
    );
    setVideoProgress(0);
    setIsVideoLoading(true);
    setTimeout(() => setIsVideoAutoPlaying(true), 5000);
  };

  const toggleVideoAutoPlay = () => {
    setIsVideoAutoPlaying(!isVideoAutoPlaying);
  };

  const getYouTubeEmbedUrl = (video: YouTubeVideo) => {
    const baseUrl = `https://www.youtube.com/embed/${video.youtubeId}`;
    const params = new URLSearchParams({
      autoplay: "1",
      mute: isVideoMuted ? "1" : "0",
      controls: "0", // Hide YouTube controls to use custom ones
      rel: "0",
      modestbranding: "1",
      enablejsapi: "1",
      start: video.startTime?.toString() || "0",
      loop: "1",
      playlist: video.youtubeId, // Required for loop to work
    });

    return `${baseUrl}?${params.toString()}`;
  };

  const openInYouTube = () => {
    const url = `https://www.youtube.com/watch?v=${currentVideo.youtubeId}${currentVideo.startTime ? `&t=${currentVideo.startTime}s` : ""}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative flex-1 overflow-hidden rounded-2xl shadow-2xl bg-black">
      {currentView === "player" && selectedChannel ? (
        /* Regular VideoPlayer when a specific channel is selected */
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative bg-black flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              Now Playing: {selectedChannel.name}
            </h3>
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Close Player
            </button>
          </div>
        </div>
      ) : (
        /* Auto-Playing YouTube Video Player */
        <div
          className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-black"
          onMouseEnter={handleVideoMouseEnter}
          onMouseLeave={handleVideoMouseLeave}
        >
          {/* YouTube Video */}
          <div className="relative w-full h-full">
            <iframe
              ref={iframeRef}
              key={`${currentVideo.youtubeId}-${currentVideoIndex}`}
              width="100%"
              height="100%"
              src={getYouTubeEmbedUrl(currentVideo)}
              title={currentVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              onLoad={() => {
                setIsVideoLoading(false);
              }}
            />

            {/* Loading Overlay */}
            {isVideoLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                  <p className="text-lg">Loading Video...</p>
                </div>
              </div>
            )}

            {/* Custom Video Controls Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 transition-opacity duration-300 ${
                showVideoControls ? "opacity-100" : "opacity-0"
              } pointer-events-none z-20`}
            >
              {/* Top Controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {currentVideo.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {currentVideo.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>Auto-Playing</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        Video {currentVideoIndex + 1} of{" "}
                        {AUTO_YOUTUBE_VIDEOS.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={openInYouTube}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                    title="Open in YouTube"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg transition-colors"
                    title="Back to Carousel"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Center Play/Pause Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                <button
                  onClick={toggleVideoAutoPlay}
                  className="bg-black/60 hover:bg-black/80 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110"
                  title={
                    isVideoAutoPlaying ? "Pause Auto-Play" : "Resume Auto-Play"
                  }
                >
                  {isVideoAutoPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8" />
                  )}
                </button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-white/20 rounded-full h-1">
                    <div
                      className="bg-red-500 h-1 rounded-full transition-all duration-1000"
                      style={{ width: `${videoProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={prevVideo}
                      className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg transition-colors"
                      title="Previous Video"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={toggleVideoAutoPlay}
                      className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg transition-colors"
                      title={isVideoAutoPlaying ? "Pause" : "Play"}
                    >
                      {isVideoAutoPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>

                    <button
                      onClick={nextVideo}
                      className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg transition-colors"
                      title="Next Video"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setIsVideoMuted(!isVideoMuted)}
                      className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg transition-colors"
                      title={isVideoMuted ? "Unmute" : "Mute"}
                    >
                      {isVideoMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setVideoProgress(0);
                        setIsVideoLoading(true);
                        // Reload current video
                        setCurrentVideoIndex(currentVideoIndex);
                      }}
                      className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg transition-colors"
                      title="Restart Video"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => {
                        if (iframeRef.current) {
                          iframeRef.current.requestFullscreen?.();
                        }
                      }}
                      className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg transition-colors"
                      title="Fullscreen"
                    >
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Navigation Arrows */}
            <button
              onClick={prevVideo}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-30 ${
                showVideoControls ? "opacity-100" : "opacity-0"
              }`}
              title="Previous Video"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextVideo}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-30 ${
                showVideoControls ? "opacity-100" : "opacity-0"
              }`}
              title="Next Video"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Video Indicators */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
            {AUTO_YOUTUBE_VIDEOS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentVideoIndex(index);
                  setVideoProgress(0);
                  setIsVideoLoading(true);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentVideoIndex
                    ? "bg-red-500 scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                title={`Play ${AUTO_YOUTUBE_VIDEOS[index].title}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
