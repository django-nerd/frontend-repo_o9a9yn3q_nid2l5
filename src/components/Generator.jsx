import { useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Generator({ onClose }) {
  const [prompt, setPrompt] = useState('A fast-paced tech promo showcasing AI automation, neon gradients, and dynamic typography.');
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState(null);

  async function generate() {
    setLoading(true);
    const res = await fetch(`${API}/ai/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setJob(data);
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0b0f1a] text-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">AI Video Generator</h3>
          <button onClick={onClose} className="text-white/60">Close</button>
        </div>
        <div className="mt-4">
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={5} className="w-full resize-none rounded-lg bg-white/5 p-3 border border-white/10 outline-none" />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button onClick={generate} disabled={loading} className="px-4 py-2 rounded-lg bg-indigo-500 disabled:opacity-50">{loading ? 'Queuing…' : 'Generate'}</button>
          {job && <div className="text-white/60">Job queued: {job.job_id}</div>}
        </div>
      </div>
    </div>
  );
}
