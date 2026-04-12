import Link from "next/link";
import { DISCOVER_MOODS } from "@/lib/anilist";

const moodVisuals: Record<
  string,
  { badge: string; gradient: string }
> = {
  romance: {
    badge: "Doux / Intense",
    gradient: "from-pink-500/30 via-fuchsia-500/15 to-transparent",
  },
  fantasy: {
    badge: "Aventure / Magie",
    gradient: "from-violet-500/30 via-cyan-500/15 to-transparent",
  },
  dark: {
    badge: "Psychologique",
    gradient: "from-red-500/20 via-zinc-900/35 to-transparent",
  },
  "school-life": {
    badge: "Quotidien / Liens",
    gradient: "from-blue-500/25 via-indigo-500/15 to-transparent",
  },
  mystery: {
    badge: "Secrets / Enquête",
    gradient: "from-emerald-500/25 via-cyan-500/10 to-transparent",
  },
  "strong-heroine": {
    badge: "Lead féminin",
    gradient: "from-rose-500/30 via-purple-500/15 to-transparent",
  },
};

export default function MoodExplorer() {
  return (
    <section className="mx-auto mt-14 max-w-6xl">
      <div className="mb-8">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-zinc-400">
          Explorer
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Selon ton envie du moment
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {DISCOVER_MOODS.map((mood) => {
          const visual = moodVisuals[mood.slug];

          return (
            <Link
              key={mood.slug}
              href={`/discover?mood=${mood.slug}`}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} transition duration-500 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_35%)] opacity-70" />

              <div className="relative z-10">
                <span className="inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-zinc-200 backdrop-blur-md">
                  {visual.badge}
                </span>

                <h3 className="mt-5 text-2xl font-semibold text-white">
                  {mood.title}
                </h3>

                <p className="mt-3 max-w-[32ch] text-sm leading-6 text-zinc-300">
                  {mood.description}
                </p>

                <div className="mt-6 text-sm font-medium text-white/90 transition group-hover:translate-x-1">
                  Explorer →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}