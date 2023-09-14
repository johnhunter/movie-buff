export type Status = 'loading' | 'error' | 'success';

export type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export type MovieDetail = {
  imdbID: string;
  Title: string;
  Director: string;
  Year: string;
  Poster: string;
  Released: string;
  Genre: string[];
  Actors: string[];
  Plot: string;
  Awards: string;
  Ratings: Rating[];
  review?: string;
};

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

export type Recommendation = {
  imdbID: string;
  kind: 'actor' | 'genre';
};

export type RecommendationLookup = Recommendation[];
