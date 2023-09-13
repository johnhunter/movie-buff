export type Status = 'loading' | 'error' | 'success';

export type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Released: string;
  Genre: string[];
  Actors: string[];
  Plot: string;
  Poster?: string; // always available?
  Ratings: Rating[];
};

export type Rating = {
  Source: string;
  Value: String;
};

export type Movies = Record<string, Movie>;

export type Viewing = {
  imdbID: string;
  date: Date;
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
