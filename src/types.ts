export type Status = 'loading' | 'error' | 'success';

export type Terms = string[];

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface MovieDetail<T = Terms> extends Movie {
  Director: string;
  Released: string;
  Genre: T;
  Actors: T;
  Plot: string;
  Awards: string;
  Ratings: Rating[];
  review?: string;
}

export type MovieApiData = MovieDetail<string>;

export type Rating = {
  Source: string;
  Value: String;
};

export type Movies = Record<string, MovieDetail>;

export type Viewing = {
  imdbID: string;
  viewedDate: string; // ISO date
};
export type ViewingHistory = Viewing[];

export type Review = {
  imdbID: string;
  content: string;
};

/**
 * Maps a term to a list of movie ids
 */
export type RecommendationLookup = Record<string, string[]>;
