# Implementation notes

## Context of use

- Likely to be used in mobile contexts, maybe in dark conditions
- Should support offline use where possible
- Consider supporting direct linking and bookmarking

## Data sources

- Movie data omdbapi.com API
- Local DB
  - movies (key by imdbID) cached from omdbapi API
  - viewingHistory
  - reviews
  - recommendationLookup

see [types](../src/types.ts) for further details.

## Searching the `omdbapi` API

- API only returns a single entity. UI should allow user to submit an explicit title search rather than substring queries.

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
