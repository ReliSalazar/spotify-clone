import React from "react";
import { usePlayerStore } from "@/store/playerStore";
import { Pause, Play } from "./Player.tsx";

interface CardPlayButtonProps {
  id: string;
}

const CardPlayButton: React.FC<CardPlayButtonProps> = ({ id }) => {
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

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-2"
    >
      {isPlayingPlaylist ? (
        <Pause className="text-black" />
      ) : (
        <Play className="text-black" />
      )}
    </button>
  );
};

export default CardPlayButton;
