# Movie-buff

An MVF for keeping track of viewed movies and adding personal reviews.

The initial deliverable is a walking skeleton to prove the technical solution and act as a focus for discussion. Both [implementation notes](docs/notes.md) and a list of [further work](docs/further-work.md) are provided in `./docs`.

## Technology stack

A React / TypeScript application, the front-end stack is based on [Vite](https://vitejs.dev/) for its leverage of ES module support in the browser and convention based approach. API requests use [Ky](https://github.com/sindresorhus/ky#readme) as a convenience wrapper to fetch.

Application state is managed by [Redux Toolkit](https://redux-toolkit.js.org/), with the store state backed to localStorage using redux middleware [Redux-LocalStorage-Simple](https://github.com/kilkelly/redux-localstorage-simple)

## Prerequisites

We assume `node@18`. You can use any Node version manager that uses the `.nvmrc` configuration file (we recommend [fnm](https://fnm.vercel.app/)).

You will need your own api key stored in a `.env` file in root, e.g.

```
VITE_API_KEY=xxx000xxx
```

see https://www.omdbapi.com/

## Npm scripts

- `npm start` starts the dev HMR environment on http://localhost:5173
- `npm test` runs the tests (will watch in a dev environment)
- `npm run preview` performs a production build and starts a web server on http://localhost:4173/
- `npm run test-ui` runs the tests, reporting in the console as well as opening the test UI interface in [`http://localhost:51204/__vitest__/`](http://localhost:51204/__vitest__/)
