import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, Scissors, Square, Circle, MoveRight, Image as ImageIcon, Music, Video } from 'lucide-react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Editor({ project, onClose }) {
  const [timeline, setTimeline] = useState({ fps: 30, width: 1920, height: 1080, duration_ms: 15000, tracks: { video: [], audio: [], titles: [], effects: [] } });
  const [isPlaying, setPlaying] = useState(false);
  const [cursorMs, setCursorMs] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    setTimeline(t => ({ ...t, tracks: { ...t.tracks } }));
  }, [project?.id]);

  function togglePlay() {
    setPlaying(p => !p);
  }

  useEffect(() => {
    if (!isPlaying) return;
    const start = performance.now();
    const tick = (now) => {
      const dt = now - start;
      setCursorMs(ms => {
        const next = ms + 16;
        if (next >= timeline.duration_ms) {
          setPlaying(false);
          return timeline.duration_ms;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, timeline.duration_ms]);

  function addClip(type) {
    const id = Math.random().toString(36).slice(2);
    const item = { id, type, start_ms: cursorMs, end_ms: cursorMs + 3000, params: {}, transform: {} };
    setTimeline(t => ({ ...t, tracks: { ...t.tracks, [type === 'audio' ? 'audio' : 'video']: [...t.tracks[type === 'audio' ? 'audio' : 'video'], item] } }));
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0f1a] text-white grid grid-rows-[auto_1fr_auto]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="font-medium">Editing: {project.title}</div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-white/10" onClick={() => addClip('clip')}><Video className="w-4 h-4" /></button>
          <button className="px-3 py-1.5 rounded-lg bg-white/10" onClick={() => addClip('audio')}><Music className="w-4 h-4" /></button>
          <button className="px-3 py-1.5 rounded-lg bg-white/10" onClick={() => addClip('image')}><ImageIcon className="w-4 h-4" /></button>
          <button className="ml-2 px-4 py-1.5 rounded-lg bg-indigo-500">Export</button>
          <button className="ml-2 px-4 py-1.5 rounded-lg bg-white/10" onClick={onClose}>Close</button>
        </div>
      </div>

      <div className="grid grid-cols-[280px_1fr] gap-3 p-3 overflow-hidden">
        <div className="rounded-xl border border-white/10 p-3 bg-white/5 overflow-auto">
          <div className="text-white/70 mb-2">Assets</div>
          <div className="grid gap-2">
            {['clip','audio','image'].map(k => (
              <div key={k} className="rounded-lg bg-black/30 p-3 text-white/60">{k.toUpperCase()} placeholder</div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 p-3 bg-white/5 grid grid-rows-[auto_1fr]">
          <div className="flex items-center gap-2">
            <button onClick={togglePlay} className="px-3 py-1.5 rounded-lg bg-indigo-500">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <div className="text-white/60">{Math.floor(cursorMs/1000)}s</div>
          </div>
          <div className="relative mt-3 overflow-auto">
            <div className="h-40 min-w-[900px] rounded-lg bg-black/30">
              {/* Tracks */}
              <div className="absolute inset-x-0 top-6 h-8">
                {timeline.tracks.video.map(item => (
                  <div key={item.id} className="absolute top-0 h-8 bg-indigo-500/50 rounded-md" style={{ left: `${(item.start_ms / timeline.duration_ms) * 100}%`, width: `${((item.end_ms-item.start_ms)/timeline.duration_ms)*100}%` }} />
                ))}
              </div>
              <div className="absolute inset-x-0 top-20 h-8">
                {timeline.tracks.audio.map(item => (
                  <div key={item.id} className="absolute top-0 h-8 bg-emerald-500/50 rounded-md" style={{ left: `${(item.start_ms / timeline.duration_ms) * 100}%`, width: `${((item.end_ms-item.start_ms)/timeline.duration_ms)*100}%` }} />
                ))}
              </div>
              {/* Playhead */}
              <div className="absolute top-0 bottom-0 w-px bg-white" style={{ left: `${(cursorMs / timeline.duration_ms) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-white/10 flex items-center gap-3">
        <button className="px-3 py-1.5 rounded-lg bg-white/10 flex items-center gap-2"><Scissors className="w-4 h-4" /> Split</button>
        <button className="px-3 py-1.5 rounded-lg bg-white/10 flex items-center gap-2"><Square className="w-4 h-4" /> Crop</button>
        <button className="px-3 py-1.5 rounded-lg bg-white/10 flex items-center gap-2"><Circle className="w-4 h-4" /> Mask</button>
        <div className="ml-auto text-white/50 text-sm">Autosave • Cloud sync</div>
      </div>
    </div>
  );
}
