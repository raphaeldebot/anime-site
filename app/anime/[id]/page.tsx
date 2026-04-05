type AnimePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AnimePage({ params }: AnimePageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-400">
          Fiche anime
        </p>

        <h1 className="mb-6 text-4xl font-bold">Anime #{id}</h1>

        <p className="text-zinc-300">
          La vraie page détail viendra ensuite. Pour l’instant, on vérifie juste
          que le lien fonctionne.
        </p>
      </div>
    </main>
  );
}