export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-20">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">
            Neko Raifu
          </p>

          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
            Build. Draw. Share.
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-zinc-300">
            A platform for anime aesthetics, creative tools, character ideas,
            drawing practice, and community.
          </p>
        </div>
      </section>
    </main>
  );
}