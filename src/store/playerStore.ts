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
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentMusic: (currentMusic: CurrentMusic) => void;
}

export const usePlayerStore = create<playerState>((set) => ({
  isPlaying: false,
  currentMusic: { playlist: null, song: null, songs: [] },
  setIsPlaying: (isPlaying: boolean) => set(() => ({ isPlaying })),
  setCurrentMusic: (currentMusic: CurrentMusic) =>
    set(() => ({ currentMusic })),
}));
