import { describe, it, expect } from 'vitest';
import type { MovieDetail, MovieData } from '@/types';
import {
  appendRecommendations,
  transformMovieData,
  getMatchingRecommendationIds,
} from './utils';

describe('appendRecommendations', () => {
  it('Creates a new RecommendationLookup with terms from a movie', () => {
    const movie = {
      imdbID: 'x123',
      Actors: ['Bruce Willis', 'Alan Rickman', 'Bonnie Bedelia'],
      Genre: ['Action', 'Thriller'],
    } as MovieDetail;

    const result = appendRecommendations(movie);

    expect(result).toStrictEqual({
      'Bruce Willis': ['x123'],
      'Alan Rickman': ['x123'],
      'Bonnie Bedelia': ['x123'],
      Action: ['x123'],
      Thriller: ['x123'],
    });
  });

  it('Appends a given RecommendationLookup with terms from a movie', () => {
    const movie = {
      imdbID: 'x123',
      Actors: ['Bruce Willis', 'Alan Rickman', 'Bonnie Bedelia'],
      Genre: ['Action', 'Thriller'],
    } as MovieDetail;
    const existing = {
      'Bruce Willis': ['a456'],
      Action: ['a456'],
    };

    const result = appendRecommendations(movie, existing);

    expect(result).toStrictEqual({
      'Bruce Willis': ['a456', 'x123'],
      'Alan Rickman': ['x123'],
      'Bonnie Bedelia': ['x123'],
      Action: ['a456', 'x123'],
      Thriller: ['x123'],
    });
  });

  it('Does not append ids if duplicate movie', () => {
    const movie = {
      imdbID: 'x123',
      Genre: ['Action'],
    } as MovieDetail;
    const existing = {
      Action: ['x123'],
    };

    const result = appendRecommendations(movie, existing);

    expect(result).toStrictEqual(existing);
  });
});

describe('transformMovieData', () => {
  it('transforms the API data', () => {
    const data: MovieData = {
      imdbID: 'tt0095016',
      Title: 'Die Hard',
      Year: '1988',
      Released: '20 Jul 1988',
      Genre: 'Action, Thriller',
      Director: 'John McTiernan',
      Actors: 'Bruce Willis, Alan Rickman, Bonnie Bedelia',
      Plot: 'The plot content',
      Awards: 'Nominated for 4 Oscars. 8 wins & 6 nominations total',
      Poster: 'some/url',
      Ratings: [
        {
          Source: 'Internet Movie Database',
          Value: '8.2/10',
        },
      ],
    };

    const result = transformMovieData(data);

    expect(result).toStrictEqual({
      imdbID: 'tt0095016',
      Title: 'Die Hard',
      Year: '1988',
      Released: '20 Jul 1988',
      Genre: ['Action', 'Thriller'],
      Director: 'John McTiernan',
      Actors: ['Bruce Willis', 'Alan Rickman', 'Bonnie Bedelia'],
      Plot: 'The plot content',
      Awards: 'Nominated for 4 Oscars. 8 wins & 6 nominations total',
      Poster: 'some/url',
      Ratings: [
        {
          Source: 'Internet Movie Database',
          Value: '8.2/10',
        },
      ],
      review: '',
    });
  });
});

describe('getMatchingRecommendationIds', () => {
  it('Returns ids that match terms', () => {
    const terms = ['A', 'B', 'C'];
    const recommendations = {
      A: ['a456'],
      B: ['b789', 'c123'],
      C: ['c123'],
      X: ['xxxx'],
    };

    const result = getMatchingRecommendationIds(terms, recommendations);

    expect(result).toStrictEqual(['a456', 'b789', 'c123']);
  });
  it('Does not include duplicates', () => {
    const terms = ['A', 'B', 'C'];
    const recommendations = {
      A: ['xxxx'],
      B: ['b789', 'xxxx'],
      C: ['xxxx'],
      X: ['xxxx'],
    };

    const result = getMatchingRecommendationIds(terms, recommendations);

    expect(result).toStrictEqual(['xxxx', 'b789']);
  });
  it('Excludes a given id', () => {
    const terms = ['A', 'B', 'C'];
    const recommendations = {
      A: ['a456'],
      B: ['b789'],
      C: ['c123'],
    };

    const result = getMatchingRecommendationIds(terms, recommendations, 'b789');

    expect(result).toStrictEqual(['a456', 'c123']);
  });
});
