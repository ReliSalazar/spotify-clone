import React from "react";
import { usePlayerStore } from "@/store/playerStore";
import { Pause, Play } from "./Player.tsx";

interface CardPlayButtonProps {
  id: string;
  size?: string;
}

const CardPlayButton: React.FC<CardPlayButtonProps> = ({
  id,
  size = "small",
}) => {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic.playlist?.id === id;

  const handleClick = async () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    const response = await fetch(`/api/get-info-playlist.json?id=${id}`);
    const { songs, playlist } = await response.json();

    setIsPlaying(true);
    setCurrentMusic({ songs, playlist, song: songs[0] });
  };

  const iconClassName = size === "small" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400"
    >
      {isPlayingPlaylist ? (
        <Pause className={iconClassName} />
      ) : (
        <Play className={iconClassName} />
      )}
    </button>
  );
};

export default CardPlayButton;
