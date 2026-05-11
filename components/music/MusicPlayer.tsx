"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTrack, setCurrentTrack] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.7);

  const audioContextRef = useRef<AudioContext | null>(null);

  const tracks = [
    {
      title: "Track One",
      url: "/music/song1.mp3",
    },
    {
      title: "Track Two",
      url: "/music/song2.mp3",
    },
    {
      title: "Track Three",
      url: "/music/song3.mp3",
    },
  ];

  // ======================
  // INIT AUDIO CONTEXT
  // ======================
  const initializeAudio = async () => {
    if (!audioContextRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      audioContextRef.current = new AudioContextClass();
    }

    if (
      audioContextRef.current.state === "suspended"
    ) {
      await audioContextRef.current.resume();
    }
  };

  // ======================
  // PLAY / PAUSE
  // ======================
  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      // MUST happen after click
      await initializeAudio();

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ======================
  // NEXT TRACK
  // ======================
  const nextTrack = async () => {
    const next =
      (currentTrack + 1) % tracks.length;

    setCurrentTrack(next);
  };

  // ======================
  // PREVIOUS TRACK
  // ======================
  const prevTrack = async () => {
    const prev =
      currentTrack === 0
        ? tracks.length - 1
        : currentTrack - 1;

    setCurrentTrack(prev);
  };

  // ======================
  // TRACK CHANGED
  // ======================
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.load();

    if (isPlaying) {
      audio.play();
    }
  }, [currentTrack]);

  // ======================
  // AUDIO EVENTS
  // ======================
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const onPlay = () => setIsPlaying(true);

    const onPause = () => setIsPlaying(false);

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onEnded = () => {
      nextTrack();
    };

    audio.addEventListener("play", onPlay);

    audio.addEventListener("pause", onPause);

    audio.addEventListener(
      "timeupdate",
      onTimeUpdate
    );

    audio.addEventListener(
      "loadedmetadata",
      onLoadedMetadata
    );

    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);

      audio.removeEventListener("pause", onPause);

      audio.removeEventListener(
        "timeupdate",
        onTimeUpdate
      );

      audio.removeEventListener(
        "loadedmetadata",
        onLoadedMetadata
      );

      audio.removeEventListener(
        "ended",
        onEnded
      );
    };
  }, [currentTrack]);

  // ======================
  // VOLUME
  // ======================
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-xl bg-zinc-900 rounded-3xl p-8">
        <h1 className="text-3xl font-bold mb-6">
          Music Player
        </h1>

        {/* TRACK */}
        <div className="mb-8">
          <h2 className="text-xl">
            {tracks[currentTrack].title}
          </h2>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={prevTrack}
            className="bg-zinc-700 px-4 py-2 rounded"
          >
            Prev
          </button>

          <button
            onClick={togglePlayPause}
            className="bg-purple-600 px-6 py-2 rounded"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            onClick={nextTrack}
            className="bg-zinc-700 px-4 py-2 rounded"
          >
            Next
          </button>
        </div>

        {/* PROGRESS */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>
              {Math.floor(currentTime / 60)}:
              {String(
                Math.floor(currentTime % 60)
              ).padStart(2, "0")}
            </span>

            <span>
              {Math.floor(duration / 60)}:
              {String(
                Math.floor(duration % 60)
              ).padStart(2, "0")}
            </span>
          </div>

          <div className="h-2 bg-zinc-700 rounded overflow-hidden">
            <div
              className="h-full bg-purple-500"
              style={{
                width: `${
                  duration
                    ? (currentTime / duration) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        {/* VOLUME */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) =>
            setVolume(Number(e.target.value))
          }
          className="w-full"
        />

        {/* AUDIO */}
        <audio
          ref={audioRef}
          preload="metadata"
        >
          <source
            src={tracks[currentTrack].url}
            type="audio/mpeg"
          />

          Your browser does not support audio.
        </audio>
      </div>
    </div>
  );
}