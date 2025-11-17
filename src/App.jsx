import { useState } from 'react';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import Generator from './components/Generator';

function App() {
  const [editorProject, setEditorProject] = useState(null);
  const [showGenerator, setShowGenerator] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Hero />
        <Dashboard onOpenEditor={setEditorProject} onOpenGenerator={() => setShowGenerator(true)} />
      </div>
      {editorProject && <Editor project={editorProject} onClose={() => setEditorProject(null)} />}
      {showGenerator && <Generator onClose={() => setShowGenerator(false)} />}
    </div>
  );
}

export default App
