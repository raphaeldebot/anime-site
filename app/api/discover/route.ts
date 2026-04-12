import { NextResponse } from "next/server";
import { fetchDiscoverAnime } from "@/lib/anilist";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mood = searchParams.get("mood");
  const q = searchParams.get("q");
  const page = Number(searchParams.get("page") || "1");
  const perPage = Number(searchParams.get("perPage") || "12");

  try {
    const result = await fetchDiscoverAnime({
      mood,
      search: q,
      page,
      perPage,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Erreur inconnue lors du chargement.",
      },
      { status: 500 }
    );
  }
}