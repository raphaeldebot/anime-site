"use client";

import Link from "next/link";
import { useRef } from "react";

type Anime = {
    id: number;
    title?: {
        english?: string | null;
        romaji?: string | null;
    };
    coverImage?: {
        large?: string | null;
    };
    genres?: string[];
    averageScore?: number | null;
    episodes?: number | null;
    season?: string | null;
    seasonYear?: number | null;
};

type TrendingSliderProps = {
    nouveautes: Anime[];
};

export default function TrendingSlider({
    nouveautes,
}: TrendingSliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);

    const scrollSlider = (direction: "left" | "right") => {
        const container = sliderRef.current;
        if (!container) return;

        const firstCard = container.querySelector<HTMLElement>("[data-slider-card]");
        if (!firstCard) return;

        const styles = window.getComputedStyle(container);
        const gap = parseFloat(styles.columnGap || styles.gap || "0");
        const step = firstCard.offsetWidth + gap;

        const visibleColumns = Math.max(1, Math.floor(container.clientWidth / step));
        const currentColumn = Math.round(container.scrollLeft / step);

        const nextColumn =
            direction === "left"
                ? Math.max(0, currentColumn - visibleColumns)
                : currentColumn + visibleColumns;

        container.scrollTo({
            left: nextColumn * step,
            behavior: "smooth",
        });
    };

    return (
        <section className="mx-auto mt-8 max-w-6xl">
            <div className="mb-8">
                <p className="mb-2 text-sm uppercase tracking-[0.3em] text-zinc-400">
                    Nouveautés anime
                </p>
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                    Tendances du moment
                </h2>
            </div>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => scrollSlider("left")}
                    className="absolute left-[-20px] top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/10 lg:flex"
                    aria-label="Voir les tendances précédentes"
                >
                    ←
                </button>

                <button
                    type="button"
                    onClick={() => scrollSlider("right")}
                    className="absolute right-[-20px] top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/10 lg:flex"
                    aria-label="Voir les tendances suivantes"
                >
                    →
                </button>

                <div
                    ref={sliderRef}
                    className="hide-scrollbar grid grid-flow-col grid-rows-2 auto-cols-[240px] gap-5 overflow-x-auto overflow-y-hidden py-2 scroll-smooth snap-x snap-mandatory sm:auto-cols-[255px] lg:auto-cols-[270px]"        >
                    {nouveautes.map((anime) => (
                        <Link
                            key={anime.id}
                            href={`/anime/${anime.id}`}
                            data-slider-card
                            className="neon-card group h-full rounded-[2rem] snap-start transition duration-300 hover:-translate-y-1"
                        >
                            <span className="neon-card-border" />

                            <div className="neon-card-inner flex h-full flex-col border border-white/8 shadow-[0_14px_34px_rgba(0,0,0,0.34)] transition duration-300 group-hover:border-white/15 group-hover:shadow-[0_22px_48px_rgba(0,0,0,0.46)]">                                <div className="relative overflow-hidden">
                                <img
                                    src={anime.coverImage?.large || ""}
                                    alt={
                                        anime.title?.english ||
                                        anime.title?.romaji ||
                                        "Anime"
                                    }
                                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            </div>

                                <div className="flex min-h-[190px] flex-1 flex-col bg-[linear-gradient(180deg,rgba(10,8,18,0.96)_0%,rgba(8,8,12,0.985)_100%)] p-4 transition duration-300 group-hover:bg-[linear-gradient(135deg,rgba(255,77,141,0.18)_0%,rgba(124,58,237,0.14)_45%,rgba(34,197,94,0.1)_100%),linear-gradient(180deg,rgba(10,8,18,0.96)_0%,rgba(8,8,12,0.985)_100%)]">
                                    <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-zinc-400">
                                        {anime.season} {anime.seasonYear}
                                    </p>

                                    <h3 className="mb-3 min-h-[72px] text-lg font-semibold leading-tight">
                                        {anime.title?.english || anime.title?.romaji}
                                    </h3>

                                    <p className="mb-4 text-sm text-zinc-400">
                                        {anime.genres?.slice(0, 3).join(" • ")}
                                    </p>

                                    <div className="mt-auto space-y-1 text-sm text-zinc-300">
                                        {anime.averageScore && (
                                            <p>Score : {anime.averageScore}/100</p>
                                        )}
                                        {anime.episodes && <p>Épisodes : {anime.episodes}</p>}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}