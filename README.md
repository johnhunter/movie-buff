# Movie-buff

An MVF for keeping track of viewed movies and adding personal reviews.

## Technology stack

The front-end stack is based on using [Vite](https://vitejs.dev/) for its leverage of ES module support in the browser and convention based approach. Testing uses [Testing Library](https://testing-library.com/) and [Vitest](https://vitest.dev/). We're using [react-query](https://tanstack.com/query/v4) for api requests.

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
