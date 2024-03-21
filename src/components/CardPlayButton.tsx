import React from "react";
import { Pause, Play } from "./Player.tsx";

interface CardPlayButtonProps {
  id: string;
}

const CardPlayButton: React.FC<CardPlayButtonProps> = ({ id }) => {
  return (
    <div className="card-play-button rounded-full bg-green-500 p-2">
      <Play className="text-black" />
    </div>
  );
};

export default CardPlayButton;
