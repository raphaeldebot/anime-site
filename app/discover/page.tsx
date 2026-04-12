import Link from "next/link";
import Header from "@/components/Header";
import DiscoverResults from "@/components/DiscoverResults";
import {
  DISCOVER_MOODS,
  fetchDiscoverAnime,
  getDiscoverFilter,
} from "@/lib/anilist";

type SearchParams =
  | Record<string, string | string[] | undefined>
  | Promise<Record<string, string | string[] | undefined>>;

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
  const mood = getSingleParam(resolvedSearchParams.mood);
  const q = (getSingleParam(resolvedSearchParams.q) || "").trim();

  const activeMood = getDiscoverFilter(mood);

  const results = await fetchDiscoverAnime({
    mood,
    search: q,
    page: 1,
    perPage: 24,
  });

  return (
    <>
      <Header />

      <main className="px-4 pb-16 pt-8 text-white">
        <section className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-zinc-400">
              Neko Raifu
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Découvrir des anime
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
              {activeMood
                ? `Sélection actuelle : ${activeMood.title}.`
                : "Explore les tendances ou cherche une ambiance précise."}
              {q ? ` Recherche : “${q}”.` : ""}
            </p>

            <form
              action="/discover"
              className="mt-8 flex flex-col gap-4 md:flex-row"
            >
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Rechercher un anime, un mot-clé..."
                className="w-full rounded-full border border-white/10 bg-black/20 px-5 py-3 text-white outline-none backdrop-blur-md placeholder:text-zinc-500 focus:border-white/20"
              />

              <button
                type="submit"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
              >
                Rechercher
              </button>

              <Link
                href="/discover"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10"
              >
                Réinitialiser
              </Link>
            </form>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl">
          <div className="flex flex-wrap gap-3">
            {DISCOVER_MOODS.map((item) => {
              const isActive = item.slug === activeMood?.slug;

              return (
                <Link
                  key={item.slug}
                  href={`/discover?mood=${item.slug}`}
                  className={[
                    "rounded-full border px-4 py-2 text-sm backdrop-blur-xl transition",
                    isActive
                      ? "border-white/20 bg-white text-black"
                      : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10",
                  ].join(" ")}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl">
          <DiscoverResults
            initialItems={results.media}
            initialPage={results.pageInfo.currentPage}
            initialHasNextPage={results.pageInfo.hasNextPage}
            mood={mood ?? null}
            search={q || null}
          />
        </section>
      </main>
    </>
  );
}