# Implementation notes

## Context of use

- Likely to be used in mobile contexts, maybe in dark conditions
- Should support offline use where possible
- Consider supporting direct linking and bookmarking

## Data sources

- Movie data omdbapi.com API
- Local DB
  - movies (key by imdbID) cached from omdbapi API
  - viewings
  - reviews
  - recommendationLookup

see [types](../src/types.ts) for further details.

## Local store

Initial assumption was to use the localStorage as the source of truth with an eventual state management solution. It became clear that updating the localStorage would be wasted effort and adopting Redux would be faster and avoid needless refactor later.

Note that movie search results from the api are not stored. Just the selected one is written to the store. Caching could be considered as the movie data is unlikely to change often.

## Screens

### Home:

- Find a movie
  - View details
- Viewing history
  - View details

### Movie details:

- Movie details
- Poster image
- Recommended movies list
- Review (with Edit action)
- Add to history
