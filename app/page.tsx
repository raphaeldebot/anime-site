import Link from "next/link";
import Header from "@/components/Header";
import { fetchTrendingAnime } from "@/lib/anilist";

const envies = [
  "Romance",
  "Fantasy",
  "Sombre",
  "School Life",
  "Personnage froid",
  "Héroïne forte",
  "Rivalité",
  "Mystère",
];

export default async function Home() {
  const nouveautes = await fetchTrendingAnime();

  return (
    <>
      <Header />

      <main className="px-4 pb-16 pt-8 text-white">
        <section className="mx-auto grid min-h-[calc(100vh-120px)] max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-12">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-zinc-400">
              Neko Raifu
            </p>

            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
              Créer. Dessiner. Partager.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-zinc-300">
              Une plateforme inspirée de l’univers anime pour découvrir des
              nouveautés, explorer des personnages, trouver des idées créatives
              et construire une vraie communauté.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
              >
                Découvrir
              </Link>

              <Link
                href="/"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10"
              >
                Explorer les nouveautés
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-400">
              Découvrir selon tes envies
            </p>

            <div className="flex flex-wrap gap-3">
              {envies.map((envie) => (
                <button
                  key={envie}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 backdrop-blur-xl transition hover:bg-white/10"
                >
                  {envie}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-6xl">
          <div className="mb-8">
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-zinc-400">
              Nouveautés anime
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Tendances du moment
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {nouveautes.map((anime: any) => (
              <Link
                key={anime.id}
                href={`/anime/${anime.id}`}
                className="neon-card group h-full rounded-[2rem] transition duration-300 hover:-translate-y-1"
              >
                <span className="neon-card-border" />

                <div className="neon-card-inner h-full border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition duration-300 group-hover:border-white/20">
                  <div className="relative overflow-hidden">
                    <img
                      src={anime.coverImage?.large}
                      alt={anime.title?.english || anime.title?.romaji}
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  <div className="flex min-h-[250px] flex-col bg-[linear-gradient(135deg,rgba(255,77,141,0.015)_0%,rgba(124,58,237,0.01)_45%,rgba(34,197,94,0.008)_100%),linear-gradient(180deg,rgba(10,8,18,0.97)_0%,rgba(8,8,12,0.98)_100%)] p-5 transition duration-300 group-hover:bg-[linear-gradient(135deg,rgba(255,77,141,0.32)_0%,rgba(124,58,237,0.22)_45%,rgba(34,197,94,0.18)_100%),linear-gradient(180deg,rgba(10,8,18,0.97)_0%,rgba(8,8,12,0.98)_100%)]">
                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-400">
                      {anime.season} {anime.seasonYear}
                    </p>

                    <h3 className="mb-3 min-h-[90px] text-xl font-semibold leading-tight">
                      {anime.title?.english || anime.title?.romaji}
                    </h3>

                    <p className="mb-5 text-sm text-zinc-400">
                      {anime.genres?.slice(0, 3).join(" • ")}
                    </p>

                    <div className="mt-auto space-y-2 text-sm text-zinc-300">
                      {anime.averageScore && <p>Score : {anime.averageScore}/100</p>}
                      {anime.episodes && <p>Épisodes : {anime.episodes}</p>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}