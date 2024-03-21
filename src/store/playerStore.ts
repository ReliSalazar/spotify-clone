import { create } from "zustand";
import type { Playlist, Song } from "@/lib/data";

interface CurrentMusic {
  playlist: Playlist | null;
  song: Song | null;
  songs: Song[];
}

interface playerState {
  isPlaying: boolean;
  currentMusic: CurrentMusic;
  volume: number;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentMusic: (currentMusic: CurrentMusic) => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<playerState>((set) => ({
  isPlaying: false,
  currentMusic: { playlist: null, song: null, songs: [] },
  volume: 1,
  setIsPlaying: (isPlaying: boolean) => set(() => ({ isPlaying })),
  setCurrentMusic: (currentMusic: CurrentMusic) =>
    set(() => ({ currentMusic })),
  setVolume: (volume: number) => set(() => ({ volume })),
}));
