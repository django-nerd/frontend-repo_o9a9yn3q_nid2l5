import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Dashboard({ onOpenEditor, onOpenGenerator }) {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo login
    async function login() {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'demo@ai.video', name: 'Demo User' }),
      });
      const data = await res.json();
      setUser({ id: data.user_id, token: data.token });
      const listRes = await fetch(`${API}/projects?user_id=${data.user_id}`);
      const list = await listRes.json();
      setProjects(list.items || []);
      setLoading(false);
    }
    login();
  }, []);

  async function createBlank() {
    const form = new FormData();
    form.append('title', `Project ${projects.length + 1}`);
    form.append('aspect_ratio', '16:9');
    form.append('user_id', user.id);
    const res = await fetch(`${API}/projects`, { method: 'POST', body: form });
    const data = await res.json();
    onOpenEditor({ id: data.project_id, title: `Project ${projects.length + 1}` });
  }

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl font-semibold">Your workspace</h2>
        <div className="flex gap-2">
          <button onClick={createBlank} className="px-4 py-2 rounded-lg bg-indigo-500 text-white">Create from scratch</button>
          <button onClick={onOpenGenerator} className="px-4 py-2 rounded-lg bg-white/10 text-white">Create using prompt</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="text-white/60">Loading…</div>
        ) : projects.length === 0 ? (
          <div className="text-white/60">No projects yet. Create your first project.</div>
        ) : (
          projects.map(p => (
            <div key={p._id} className="rounded-xl border border-white/10 p-4 bg-white/5">
              <div className="aspect-video rounded-lg bg-black/30 flex items-center justify-center text-white/40">Preview</div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">{p.title}</div>
                  <div className="text-white/50 text-sm">{p.aspect_ratio}</div>
                </div>
                <button onClick={() => onOpenEditor({ id: p._id, title: p.title })} className="px-3 py-1.5 rounded-lg bg-indigo-500 text-white text-sm">Open</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
