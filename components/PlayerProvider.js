"use client";
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { Play, Pause, Music2 } from "lucide-react";

const PlayerContext = createContext(null);
export const usePlayer = () => useContext(PlayerContext);

export default function PlayerProvider({ children }) {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const play = (item) => {
    if (nowPlaying && nowPlaying.id === item.id) {
      setIsPlaying((p) => !p);
      return;
    }
    setNowPlaying(item);
    setIsPlaying(true);
    setProgress(0);
  };
  const toggle = () => setIsPlaying((p) => !p);

  useEffect(() => {
    if (!audioRef.current || !nowPlaying) return;
    audioRef.current.src = nowPlaying.audio;
    if (isPlaying) audioRef.current.play().catch(() => {});
  }, [nowPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [isPlaying]);

  return (
    <PlayerContext.Provider value={{ nowPlaying, isPlaying, play, toggle }}>
      {children}

      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setProgress(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => setIsPlaying(false)}
      />

      {nowPlaying && (
        <div className="player-bar">
          <div className="player-info">
            <div className="player-cover"><Music2 size={18} /></div>
            <div className="player-text">
              <span className="player-title">{nowPlaying.title}</span>
              <span className="player-sub">{nowPlaying.sub}</span>
            </div>
          </div>
          <button className="player-toggle" onClick={toggle}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <div className="player-progress-wrap">
            <span className="eq" style={{ opacity: isPlaying ? 1 : 0.25 }}><i></i><i></i><i></i><i></i></span>
            <input
              type="range" min="0" max={duration || 0} value={progress}
              onChange={(e) => { if (audioRef.current) audioRef.current.currentTime = Number(e.target.value); }}
              className="player-seek"
              style={{ backgroundSize: `${duration ? (progress / duration) * 100 : 0}% 100%` }}
            />
          </div>
        </div>
      )}
    </PlayerContext.Provider>
  );
}
