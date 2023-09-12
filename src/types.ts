type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Released: string; // could be a date type?
  Genre: string[];
  Actors: string[];
  Plot: string;
  Poster?: string; // always available?
  Ratings: Rating[];
};

type Rating = {
  Source: string;
  Value: String;
};

type Movies = Record<string, Movie>;

type Viewing = {
  imdbID: string;
  date: Date;
};
type ViewingHistory = Viewing[];

type Review = {
  imdbID: string;
  content: string;
};

type Recommendation = {
  imdbID: string;
  kind: 'actor' | 'genre';
};

type RecommendationLookup = Recommendation[];
