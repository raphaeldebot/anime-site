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

      <main className="bg-black text-white">
        <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl items-center px-6 py-20">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">
              Neko Raifu
            </p>

            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
              Créer. Dessiner. Partager.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-zinc-300">
              Plateforme dédiée à l&apos;esthétique anime, aux outils créatifs,
              aux idées de personnages, à la pratique du dessin, aux nouveautés
              anime et webtoon, et à la communauté.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-10">
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-zinc-400">
              Découvrir selon tes envies
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trouve un anime selon ton mood
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {envies.map((envie) => (
              <button
                key={envie}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/10"
              >
                {envie}
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-10">
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-zinc-400">
              Nouveautés anime
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tendances du moment
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {nouveautes.map((anime: any) => (
              <Link
                key={anime.id}
                href={`/anime/${anime.id}`}
                className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 transition hover:-translate-y-1 hover:border-white/20 hover:bg-zinc-900/80"
              >
                <img
                  src={anime.coverImage?.large}
                  alt={anime.title?.english || anime.title?.romaji}
                  className="h-80 w-full object-cover"
                />

                <div className="p-6">
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
                    {anime.season} {anime.seasonYear}
                  </p>

                  <h3 className="mb-3 text-xl font-semibold">
                    {anime.title?.english || anime.title?.romaji}
                  </h3>

                  <p className="mb-4 text-sm text-zinc-400">
                    {anime.genres?.slice(0, 3).join(" • ")}
                  </p>

                  <div className="space-y-2 text-sm text-zinc-300">
                    {anime.averageScore && <p>Score : {anime.averageScore}/100</p>}
                    {anime.episodes && <p>Épisodes : {anime.episodes}</p>}
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