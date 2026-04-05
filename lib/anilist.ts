const ANILIST_API_URL = "https://graphql.anilist.co";

export async function fetchTrendingAnime() {
  const query = `
    query {
      Page(page: 1, perPage: 6) {
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