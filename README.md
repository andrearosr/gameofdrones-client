# Game of Drones

This game is almost exactly like Rock-Paper-Scissors, except for one key difference: **when you play the game of drones, either you win, or you die.**

## Getting Started

Clone this repo in your preferred location. The `master` branch uses a [heroku-hosted API](https://gofdrones.herokuapp.com/api/v1). If you want to use a local server instead, run from the project directory:

`git fetch && git checkout ar/local-server`

and follow instructions below.

1. Run `npm install` or `yarn install`
2. Start the dev server using `npm start`
3. Open [http://localhost:8080](http://localhost:8080)

## Available Commands

- `npm start` - start the dev server
- `npm clean` - delete the dist folder
- `npm run production` - create a production ready build in `dist` folder
- `npm run lint` - execute an eslint check
- `npm test` - run all tests
- `npm run test:watch` - run all tests in watch mode
- `npm run coverage` - generate code coverage report in the `coverage` folder

## Production code

Run `npm run production`. The production-ready code will be located under `dist` folder.
