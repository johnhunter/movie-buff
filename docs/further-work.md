# Further work

## Tasks

- [x] Create repo and basic app
- [x] Setup API interaction and key
- [x] Get movie search and selection working
- [x] Setup store and localStorage persistence
- [ ] Get movie detail view working
- [ ] Add review editing
- [ ] Add recommendations
- [ ] Add unit tests
- [ ] Add component tests
- [ ] Add integration tests (mocked API)
- [ ] Add an ErrorBoundary component to the App
- [ ] Style the UI
- [ ] Add throttling to the movie search

## Further improvements

How the solution might be developed and alternative approaches.

- Consider refactoring the movie API search into Redux, probably in a separate store slice. Thunks should be a good enough approach for data fetching.
- Consider migrating localStorage to an API, can be handled in redux.
- Create responsive view optimised for larger screens.
