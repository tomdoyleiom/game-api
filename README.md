# game api

Task contains 2 sections:

## part 1

- create a microsoervice with end points of the style:
- http://localhost:8080/games/:gameId
- example: http://localhost:8080/games/1 should return the [this json](https://gist.github.com/divya051988/191e42740b1bbc545e2e441337aa1228)

## part 2

- add another endpoint to your service which will return a summary of games.
- end point format: http://localhost:8080/games/report
- the report will contain:
  - the user who has added the most comments across all games
  - the game with the highest sum of likes
  - the average likes per game (rounded up to the nearest integer)
  - the output should look like [this](https://gist.github.com/divya051988/cfe18cbd24bbeec62eb2444ff55f3c34)
  - might need so add some additional test data

## Steps

- git init
- npm init
- added cors, express, dotenv, mongoose as dependencies.
- git ignored the node modules
- created catch all 404 routing
- created cluster on cloud.mongodb.com
- testing basic end point (get empty list)
- created [trello board of tasks](https://trello.com/b/Gq22iqLY/game-api)
-
