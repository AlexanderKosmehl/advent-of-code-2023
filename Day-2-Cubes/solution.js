import { readFileSync } from 'fs'

// const filePath = './input-example.txt'
// const filePath = './input-example-advanced.txt'
const filePath = './input.txt'

const inputFile = readFileSync(new URL(filePath, import.meta.url), { encoding: 'utf-8' })
const inputLines = inputFile.split(/\r?\n/)

const gameState = inputLines.map((line) => {
  const [gameString, setsString] = line.split(':')
  const gameId = Number(/\d+/.exec(gameString)[0])

  const setStrings = setsString.split(';')
  const sets = setStrings.map((setString) => {
    const redCubes = Number(/\d+(?= red)/.exec(setString))
    const greenCubes = Number(/\d+(?= green)/.exec(setString))
    const blueCubes = Number(/\d+(?= blue)/.exec(setString))

    return {
      red: isNaN(redCubes) ? 0 : redCubes,
      green: isNaN(greenCubes) ? 0 : greenCubes,
      blue: isNaN(blueCubes) ? 0 : blueCubes
    }
  })

  return {
    gameId,
    sets
  }
})

function isGamePossible (game) {
  return game.sets.every((set) => set.red <= 12 && set.green <= 13 && set.blue <= 14)
}

const firstSolution = gameState
  .filter(isGamePossible)
  .reduce((sum, game) => sum + game.gameId, 0)

console.log('First Solution: ', firstSolution)

const alternativeCubes = gameState.map((game) => {
  return {
    red: Math.max(...game.sets.map((set) => set.red)),
    green: Math.max(...game.sets.map((set) => set.green)),
    blue: Math.max(...game.sets.map((set) => set.blue))
  }
})

const gamePowers = alternativeCubes.map((game) => game.red * game.green * game.blue)
const secondSolution = gamePowers.reduce((sum, gamePower) => sum + gamePower, 0)

console.log('Second Solutions: ', secondSolution)
