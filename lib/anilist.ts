const ANILIST_API_URL = "https://graphql.anilist.co";

export type AnimeCard = {
  id: number;
  title?: {
    romaji?: string | null;
    english?: string | null;
    native?: string | null;
  };
  coverImage?: {
    extraLarge?: string | null;
    large?: string | null;
  };
  bannerImage?: string | null;
  description?: string | null;
  genres?: string[];
  averageScore?: number | null;
  episodes?: number | null;
  duration?: number | null;
  season?: string | null;
  seasonYear?: number | null;
  status?: string | null;
  format?: string | null;
  siteUrl?: string | null;
};

type AniListResponse<T> = {
  data: T;
  errors?: Array<{ message?: string }>;
};

export type DiscoverMoodDefinition = {
  slug: string;
  title: string;
  description: string;
  genreIn?: string[];
  tagIn?: string[];
};

export type DiscoverPageInfo = {
  currentPage: number;
  hasNextPage: boolean;
  lastPage?: number | null;
  perPage?: number | null;
  total?: number | null;
};

export type DiscoverFetchResult = {
  media: AnimeCard[];
  pageInfo: DiscoverPageInfo;
};

export const DISCOVER_MOODS: DiscoverMoodDefinition[] = [
  {
    slug: "romance",
    title: "Romance",
    description: "Des relations douces, intenses ou déchirantes.",
    genreIn: ["Romance"],
  },
  {
    slug: "fantasy",
    title: "Fantasy",
    description: "Des mondes magiques et de grandes aventures.",
    genreIn: ["Fantasy"],
  },
  {
    slug: "dark",
    title: "Sombre",
    description: "De la tension, de la psychologie et des zones d’ombre.",
    genreIn: ["Psychological", "Thriller"],
  },
  {
    slug: "school-life",
    title: "School Life",
    description: "La vie scolaire, les liens, les rivalités et le quotidien.",
    tagIn: ["School"],
  },
  {
    slug: "mystery",
    title: "Mystère",
    description: "Des secrets, des enquêtes et des révélations.",
    genreIn: ["Mystery"],
  },
  {
    slug: "strong-heroine",
    title: "Héroïne forte",
    description: "Des personnages féminins marquants et puissants.",
    tagIn: ["Female Protagonist"],
  },
];

async function anilistRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(ANILIST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données AniList.");
  }

  const json = (await response.json()) as AniListResponse<T>;

  if (json.errors?.length) {
    throw new Error(
      json.errors[0]?.message || "AniList a renvoyé une erreur."
    );
  }

  return json.data;
}

export function getDiscoverFilter(slug?: string | null) {
  if (!slug) return null;
  return DISCOVER_MOODS.find((mood) => mood.slug === slug) ?? null;
}

export async function fetchTrendingAnime(perPage = 20): Promise<AnimeCard[]> {
  const query = `
    query ($perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          bannerImage
          description(asHtml: false)
          genres
          averageScore
          episodes
          season
          seasonYear
          siteUrl
        }
      }
    }
  `;

  const data = await anilistRequest<{ Page: { media: AnimeCard[] } }>(query, {
    perPage,
  });

  return data.Page.media;
}

export async function fetchDiscoverAnime({
  mood,
  search,
  page = 1,
  perPage = 24,
}: {
  mood?: string | null;
  search?: string | null;
  page?: number;
  perPage?: number;
}): Promise<DiscoverFetchResult> {
  const activeMood = getDiscoverFilter(mood);

  const query = `
    query (
      $page: Int
      $perPage: Int
      $genreIn: [String]
      $tagIn: [String]
      $search: String
    ) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          currentPage
          hasNextPage
          lastPage
          perPage
          total
        }
        media(
          type: ANIME
          sort: TRENDING_DESC
          isAdult: false
          genre_in: $genreIn
          tag_in: $tagIn
          search: $search
        ) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          bannerImage
          description(asHtml: false)
          genres
          averageScore
          episodes
          season
          seasonYear
          siteUrl
        }
      }
    }
  `;

  const data = await anilistRequest<{
    Page: {
      media: AnimeCard[];
      pageInfo: DiscoverPageInfo;
    };
  }>(query, {
    page,
    perPage,
    genreIn: activeMood?.genreIn ?? null,
    tagIn: activeMood?.tagIn ?? null,
    search: search?.trim() || null,
  });

  return {
    media: data.Page.media,
    pageInfo: data.Page.pageInfo,
  };
}

export async function fetchAnimeById(id: string) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
          large
        }
        bannerImage
        description(asHtml: false)
        genres
        averageScore
        episodes
        duration
        season
        seasonYear
        status
        format
        siteUrl
      }
    }
  `;

  const data = await anilistRequest<{ Media: AnimeCard }>(query, {
    id: Number(id),
  });

  return data.Media;
}