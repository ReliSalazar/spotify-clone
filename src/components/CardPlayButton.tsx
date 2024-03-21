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
    setCurrentMusic({
      playlist: {
        id,
        albumId: 1,
        title:"My Playlist",
        color: { accent: "#da2735", dark: "#7f1d1d" },
        cover:"https://picsum.photos/id/237/200/300",
        artists:["Your Name"],
      },
      song: null,
      songs: [],
    });

    setIsPlaying(!isPlaying);
  };

  const isPlayingPlaylist = isPlaying && currentMusic.playlist?.id === id;

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
