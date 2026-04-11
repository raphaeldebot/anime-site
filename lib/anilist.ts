const ANILIST_API_URL = "https://graphql.anilist.co";

export async function fetchTrendingAnime() {
  const query = `
    query {
      Page(page: 1, perPage: 24) {
        media(sort: TRENDING_DESC, type: ANIME) {
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

  const response = await fetch(ANILIST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des anime tendances.");
  }

  const json = await response.json();
  return json.data.Page.media;
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

  const response = await fetch(ANILIST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { id: Number(id) },
    }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de la fiche anime.");
  }

  const json = await response.json();
  return json.data.Media;
}