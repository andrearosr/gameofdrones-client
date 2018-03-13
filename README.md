# Game of Drones

This game is almost exactly like Rock-Paper-Scissors, except for one key difference: **when you play the game of drones, either you win, or you die.**

## Getting Started

1. Clone this repo in your preferred location and change to the `gameofdrones-client` directory.

[Optional] The `master` branch uses a [heroku-hosted API](https://gofdrones.herokuapp.com/api/v1). If you want to use a local server instead, run from the project directory:

`git fetch && git checkout ar/local-server`

2. Run `npm install` or `yarn install`
3. Start the dev server using `npm start`
4. Open [http://localhost:8080](http://localhost:8080)

## Available Commands

- `npm start` - start the dev server
- `npm clean` - delete the dist folder
- `npm run production` - create a production ready build in `dist` folder
- `npm run lint` - execute an eslint check
- `npm test` - run all tests
- `npm run test:watch` - run all tests in watch mode

## Production code

Run `npm run production`. The production-ready code will be located under `dist` folder.

## How to use it

### Game tab

The initial screen will prompt for the two players' (or "champions") names. You must complete this small form before proceeding. Once you have selected the names, click 'Start' to start the game.

The "main sequence" will take turns prompting each user, by name, to choose their move (or "weapon"). Click on the icon of the selected move and click 'Accept' to advance to the next turn. Each "round" takes two turns, and immediate computes the result, which will appear on the Scoreboard at the right side. Whoever wins this round gets an additional point added to their state, which is also displayed on the right sidebar.

Once a player reaches 3 points, the game will end and their name will appear on the screen, along with a button to reset the game.

### Leaderboard

At any point during the game, select the 'Leaderboard' tab to see player's score.

When a player first selects a name, a "find or create" operation will be performed on backend. Once they win, one point will be added to their score and the leaderboard will be updated.
