import { readFileSync } from 'fs'

// const filePath = './input-example.txt'
// const filePath = './input-example-advanced.txt'
const filePath = './input-1.txt'

const inputFile = readFileSync(new URL(filePath, import.meta.url), { encoding: 'utf-8' })
const inputLines = inputFile.split(/\r?\n/)

const numberMap = [
  { word: 'one', number: '1' },
  { word: 'two', number: '2' },
  { word: 'three', number: '3' },
  { word: 'four', number: '4' },
  { word: 'five', number: '5' },
  { word: 'six', number: '6' },
  { word: 'seven', number: '7' },
  { word: 'eight', number: '8' },
  { word: 'nine', number: '9' }
]

/**
 * Searches a string for a number
 * @param {string} string The string that is searched through
 * @param {boolean} allowNumberStrings If the search should allow number words such as 'one' -> '1'
 * @returns The number as a string or undefined if none is found
 */
function checkStringForNumber (string, allowNumberStrings) {
  const regexNumberResult = /\d/.exec(string)
  if (regexNumberResult) {
    return regexNumberResult[0]
  }

  if (allowNumberStrings) {
    // check for number word
    for (const { word, number } of numberMap) {
      if (string.includes(word)) {
        return number
      }
    }
  }

  return undefined
}

/**
 * Parses a single string and returns a two digit number
 * @param {string} line The line to be parsed
 * @param {boolean} replaceNumberWords Whether or not spelled numbers should be replaced with their numeric version
 */
function parseLine (line, allowNumberStrings) {
  let leftNumber
  let rightNumber

  // left to right
  for (let leftIndex = 0; leftIndex <= line.length; leftIndex++) {
    const numberInSubstring = checkStringForNumber(line.substring(0, leftIndex), allowNumberStrings)
    if (numberInSubstring) {
      leftNumber = numberInSubstring
      break
    }
  }

  // right to left
  for (let rightIndex = line.length; rightIndex >= 0; rightIndex--) {
    const numberInSubstring = checkStringForNumber(line.substring(rightIndex, line.length), allowNumberStrings)
    if (numberInSubstring) {
      rightNumber = numberInSubstring
      break
    }
  }

  if (!leftNumber || !rightNumber) return 0

  return Number(leftNumber + rightNumber)
}

const firstSolution = inputLines.reduce((sum, currentLine) => sum + parseLine(currentLine, false), 0)
console.log('First solution', firstSolution)

const secondSolution = inputLines.reduce((sum, currentLine) => sum + parseLine(currentLine, true), 0)
console.log('Second solution: ', secondSolution)
