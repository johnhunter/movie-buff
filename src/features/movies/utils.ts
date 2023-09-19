import type { MovieDetail, MovieApiData, RecommendationLookup } from '@/types';

const splitTrim = (s: string) => s.split(',').map((x) => x.trim());

/*
1. When adding a movie, add the id to a table of terms, e.g.

'Bruce Willis': ['x123']

2. When viewing a movie collect the ids of terms that match current movie, e.g.

Movie has 'Bruce Willis' so related to movie 'x123'
*/

export const appendRecommendations = (
  movie: MovieDetail,
  recommendations = {} as RecommendationLookup
): RecommendationLookup => {
  // for each actor / genre in the movie
  // create an entry in the lookup table
  const { imdbID, Actors = [], Genre = [] } = movie;
  const terms = [...Actors, ...Genre];

  const updates = terms.reduce((acc: RecommendationLookup, term: string) => {
    const ids = Array.from(acc[term] || []);

    if (!ids.includes(imdbID)) {
      ids.push(imdbID);
    }

    acc[term] = ids;

    return acc;
  }, recommendations);

  return {
    ...recommendations,
    ...updates,
  };
};

export const getMatchingRecommendationIds = (
  terms: string[],
  recommendations: RecommendationLookup,
  excludeId?: string
) => {
  const result = terms.reduce((ids: string[], term: string) => {
    ids.push(...recommendations[term]);

    return ids;
  }, []);

  const dedupedIds = [...new Set(result)];

  return excludeId ? dedupedIds.filter((id) => id !== excludeId) : dedupedIds;
};

export const transformMovieData = (d: MovieApiData): MovieDetail => {
  return {
    imdbID: d.imdbID,
    Title: d.Title,
    Director: d.Director,
    Year: d.Year,
    Poster: d.Poster,
    Released: d.Released,
    Genre: splitTrim(d.Genre),
    Actors: splitTrim(d.Actors),
    Plot: d.Plot,
    Awards: d.Awards,
    Ratings: d.Ratings,
    review: '',
  };
};
