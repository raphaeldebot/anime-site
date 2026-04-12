"use client";

import Link from "next/link";
import { useState } from "react";
import type { AnimeCard } from "@/lib/anilist";

type DiscoverResultsProps = {
  initialItems: AnimeCard[];
  initialPage: number;
  initialHasNextPage: boolean;
  mood?: string | null;
  search?: string | null;
};

type DiscoverApiResponse = {
  media: AnimeCard[];
  pageInfo: {
    currentPage: number;
    hasNextPage: boolean;
  };
};

export default function DiscoverResults({
  initialItems,
  initialPage,
  initialHasNextPage,
  mood,
  search,
}: DiscoverResultsProps) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(initialPage);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadMore = async () => {
    if (isLoading || !hasNextPage) return;

    setIsLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (mood) params.set("mood", mood);
      if (search) params.set("q", search);

      params.set("page", String(page + 1));
      params.set("perPage", "12");

      const response = await fetch(`/api/discover?${params.toString()}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Impossible de charger plus de résultats.");
      }

      const data = (await response.json()) as DiscoverApiResponse;

      setItems((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const nextItems = data.media.filter((item) => !existingIds.has(item.id));
        return [...prev, ...nextItems];
      });

      setPage(data.pageInfo.currentPage);
      setHasNextPage(data.pageInfo.hasNextPage);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-zinc-300 backdrop-blur-xl">
        Aucun résultat pour ce filtre.
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {items.map((anime) => (
          <Link
            key={anime.id}
            href={`/anime/${anime.id}`}
            className="neon-card group h-full rounded-[2rem] transition duration-300 hover:-translate-y-1"
          >
            <span className="neon-card-border" />

            <div className="neon-card-inner flex h-full flex-col border border-white/8 shadow-[0_14px_34px_rgba(0,0,0,0.34)] transition duration-300 group-hover:border-white/15 group-hover:shadow-[0_22px_48px_rgba(0,0,0,0.46)]">
              <div className="relative overflow-hidden">
                <img
                  src={anime.coverImage?.large || ""}
                  alt={anime.title?.english || anime.title?.romaji || "Anime"}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              </div>

              <div className="flex min-h-[220px] flex-1 flex-col bg-[linear-gradient(180deg,rgba(10,8,18,0.96)_0%,rgba(8,8,12,0.985)_100%)] p-5 transition duration-300 group-hover:bg-[linear-gradient(135deg,rgba(255,77,141,0.18)_0%,rgba(124,58,237,0.14)_45%,rgba(34,197,94,0.1)_100%),linear-gradient(180deg,rgba(10,8,18,0.96)_0%,rgba(8,8,12,0.985)_100%)]">
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-400">
                  {anime.season} {anime.seasonYear}
                </p>

                <h3 className="mb-3 min-h-[84px] text-xl font-semibold leading-tight">
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

      {error ? (
        <p className="mt-6 text-sm text-red-300">{error}</p>
      ) : null}

      {hasNextPage ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={isLoading}
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Chargement..." : "Charger plus"}
          </button>
        </div>
      ) : null}
    </div>
  );
}