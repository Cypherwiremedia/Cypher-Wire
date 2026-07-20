"use client";
import { Play, Pause } from "lucide-react";
import { usePlayer } from "./PlayerProvider";

export function isActive(player, id) {
  return player.nowPlaying && player.nowPlaying.id === id;
}

export default function PlayButton({ item, size = "md" }) {
  const player = usePlayer();
  const active = isActive(player, item.id);
  return (
    <button
      className={"play-dot" + (size === "lg" ? " lg" : "")}
      onClick={(e) => { e.stopPropagation(); player.play(item); }}
    >
      {active && player.isPlaying ? <Pause size={size === "lg" ? 18 : 16} /> : <Play size={size === "lg" ? 18 : 16} />}
    </button>
  );
}
