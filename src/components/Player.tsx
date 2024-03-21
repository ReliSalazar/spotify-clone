import React, { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/store/playerStore";
import CurrentSong from "./CurrentSong";
import SongControl from "./SongControl";
import VolumeControl from "./VolumeControl";

interface PlayerProps {}

export const Pause = ({ className }: { className: string }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

export const Play = ({ className }: { className: string }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);

const Player: React.FC<PlayerProps> = () => {
  const { isPlaying, currentMusic, setIsPlaying, volume } = usePlayerStore(
    (state) => state
  );

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { song, playlist } = currentMusic;
    if (song && audioRef.current) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  }, [currentMusic]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-row justify-between align-bottom w-full px-1 z-50">
      <div className="w-[200px]">
        <CurrentSong currentSong={currentMusic.song} />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex flex-col items-center justify-center gap-2">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? (
              <Pause className="text-black" />
            ) : (
              <Play className="text-black" />
            )}
          </button>

          <SongControl audio={audioRef} />

          <audio ref={audioRef} />
        </div>
      </div>

      <div className="grid place-content-center">
        <VolumeControl />
      </div>
    </div>
  );
};

export default Player;
