import Link from "next/link";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Outils", href: "/" },
  { label: "Entraînements", href: "/" },
  { label: "Communauté", href: "/" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-4 text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.35em] text-white"
        >
          Neko Raifu
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}