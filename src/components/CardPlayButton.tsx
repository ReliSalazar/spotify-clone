import React from "react";
import { usePlayerStore } from "@/store/playerStore";
import { Pause, Play } from "./Player.tsx";

interface CardPlayButtonProps {
  id: string;
}

const CardPlayButton: React.FC<CardPlayButtonProps> = ({ id }) => {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-2"
    >
      {isPlaying ? (
        <Pause className="text-black" />
      ) : (
        <Play className="text-black" />
      )}
    </button>
  );
};

export default CardPlayButton;
