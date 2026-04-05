import { fetchAnimeById } from "@/lib/anilist";
import Header from "@/components/Header";
type AnimePageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function AnimePage({ params }: AnimePageProps) {
    const { id } = await params;
    const anime = await fetchAnimeById(id);

    return (
        <>
        <Header />
        <main className="min-h-screen bg-black px-6 py-20 text-white">
            <div className="mx-auto max-w-5xl">
                <div className="grid gap-10 md:grid-cols-[300px_1fr]">
                    <div>
                        <img
                            src={anime.coverImage?.extraLarge || anime.coverImage?.large}
                            alt={anime.title?.english || anime.title?.romaji}
                            className="w-full rounded-3xl object-cover"
                        />
                    </div>

                    <div>
                        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">
                            Fiche anime
                        </p>

                        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                            {anime.title?.english || anime.title?.romaji}
                        </h1>

                        {anime.title?.native && (
                            <p className="mb-6 text-zinc-400">{anime.title.native}</p>
                        )}

                        <div className="mb-6 flex flex-wrap gap-3">
                            {anime.genres?.map((genre: string) => (
                                <span
                                    key={genre}
                                    className="rounded-full border border-white/15 px-3 py-1 text-sm text-zinc-300"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>

                        <div className="mb-8 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                            {anime.season && anime.seasonYear && (
                                <p>
                                    Saison : {anime.season} {anime.seasonYear}
                                </p>
                            )}
                            {anime.averageScore && <p>Score : {anime.averageScore}/100</p>}
                            {anime.episodes && <p>Épisodes : {anime.episodes}</p>}
                            {anime.duration && <p>Durée : {anime.duration} min</p>}
                            {anime.format && <p>Format : {anime.format}</p>}
                            {anime.status && <p>Statut : {anime.status}</p>}
                        </div>

                        {anime.description && (
                            <p className="max-w-3xl leading-8 text-zinc-300">
                                {anime.description.replace(/<[^>]+>/g, "")}
                            </p>
                        )}

                        {anime.siteUrl && (
                            <a
                                href={anime.siteUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-8 inline-block rounded-full border border-white/20 px-5 py-3 text-sm font-medium transition hover:bg-white/10"
                            >
                                Voir sur AniList
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </main>
        </>
    );
}