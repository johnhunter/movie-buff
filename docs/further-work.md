# Further work

## Tasks

- [x] Create repo and basic app
- [x] Setup API interaction and key
- [x] Get movie search and selection working
- [x] Setup store and localStorage persistence
- [x] Get movie detail view working
- [x] Add review editing
- [x] Add recommendations
- [x] Add utils unit tests
- [ ] Add redux unit tests
- [ ] Add component tests
- [ ] Add integration tests (mocked API)
- [ ] Add an ErrorBoundary component to the App
- [ ] Extract common UI components (e.g. lists, panels)
- [ ] Style the UI
- [ ] Add throttling to the movie search
- [ ] Add offline ability using serviceWorker

## Further improvements

How the solution might be developed and alternative approaches.

- ~Consider extracting state to a state management solution such as Redux~
- Consider refactoring the movie API search into Redux, probably in a separate store slice.
- Consider migrating localStorage to an API, can be handled in redux.
- Create responsive views optimised for larger screens.
- Create a dark theme mode for low light use cases.
- Consider normalising the data property keys PascalCase -> camelCase when fetched.
