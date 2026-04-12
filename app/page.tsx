import Link from "next/link";
import Header from "@/components/Header";
import { fetchTrendingAnime } from "@/lib/anilist";
import TrendingSlider from "@/components/TrendingSlider";
import MoodExplorer from "@/components/MoodExplorer";
import { DISCOVER_MOODS } from "@/lib/anilist";
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
              {DISCOVER_MOODS.map((mood) => (
                <Link
                  key={mood.slug}
                  href={`/discover?mood=${mood.slug}`}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 backdrop-blur-xl transition hover:bg-white/10"
                >
                  {mood.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
              <MoodExplorer />
        <TrendingSlider nouveautes={nouveautes} />
      </main>
    </>
  );
}