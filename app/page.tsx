import Header from "@/components/Header";

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

const nouveautes = [
  {
    titre: "Nouvel anime à découvrir",
    type: "Anime",
    genre: "Action • Fantasy",
    description:
      "Une fiche mise en avant avec l'image, le résumé, les personnages clés et les infos utiles.",
  },
  {
    titre: "Webtoon du moment",
    type: "Webtoon",
    genre: "Romance • Drame",
    description:
      "Une autre fiche pour présenter les nouveautés et aider à trouver rapidement quelque chose à lire.",
  },
  {
    titre: "Sortie récente",
    type: "Anime",
    genre: "Mystère • Surnaturel",
    description:
      "Cette zone pourra ensuite être reliée à de vraies données, filtres ou recommandations.",
  },
];

export default function Home() {
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

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
              >
                Découvrir
              </a>

              <a
                href="/"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Voir les nouveautés
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-10">
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-zinc-400">
              Découvrir selon tes envies
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trouve un anime ou un webtoon selon ton mood
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
              Nouveautés anime & webtoon
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Les dernières découvertes mises en avant
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {nouveautes.map((item) => (
              <article
                key={item.titre}
                className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6"
              >
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
                  {item.type}
                </p>

                <h3 className="mb-3 text-xl font-semibold">{item.titre}</h3>

                <p className="mb-4 text-sm text-zinc-400">{item.genre}</p>

                <p className="text-sm leading-7 text-zinc-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}