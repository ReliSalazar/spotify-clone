import React, { useEffect, useState } from "react";
import { Slider } from "./Slider";

interface SongControlProps {
  audio: React.RefObject<HTMLAudioElement>;
}


const SongControl: React.FC<SongControlProps> = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);

  const duration = audio?.current?.duration ?? 0;

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audio?.current?.currentTime ?? 0);
  };

  useEffect(() => {
    audio.current?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="flex justify-center gap-x-2 text-xs">
      <span className="opacity-50 w-12 text-right">
        {formatTime(currentTime)}
      </span>
      <Slider
        defaultValue={[0]}
        value={[audio.current?.currentTime ?? 0 * 100]}
        max={audio.current?.duration ?? 0}
        min={0}
        className="w-[400px]"
        onValueChange={(value) => {
          if (audio.current) audio.current.currentTime = value[0];
        }}
      />
      <span className="opacity-50 w-12">{formatTime(duration)}</span>
    </div>
  );
};

export default SongControl;
