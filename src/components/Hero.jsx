import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b0f1a] via-[#0a0e19] to-[#0b0f1a]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0f1a]/20 to-[#0b0f1a] pointer-events-none" />
      <div className="relative z-10 flex h-full flex-col items-center justify-end p-8 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_8px_30px_rgba(99,102,241,0.35)]">
          Ultra‑Advanced AI Video Editor
        </h1>
        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70">
          Create, auto‑edit and publish studio‑grade videos with automation that outpaces anything you’ve seen. Prompt‑to‑video, smart timeline, effects and cloud sync built‑in.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="#get-started" className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-colors">
            Get started
          </a>
          <a href="#generator" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">
            Try AI Generator
          </a>
        </div>
      </div>
    </section>
  );
}
