export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black/80 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-sm font-semibold uppercase tracking-[0.3em]">
          Neko Raifu
        </a>

        <nav className="flex items-center gap-6 text-sm text-zinc-300">
          <a href="/">Accueil</a>
          <a href="/">Outils</a>
          <a href="/">Entraînements</a>
          <a href="/">Communauté</a>
        </nav>
      </div>
    </header>
  );
}