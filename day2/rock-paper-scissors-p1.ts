import { readFile } from 'node:fs/promises'
let contents: string = ''

try {
  const filePath = new URL('./input.txt', import.meta.url)
  contents = await readFile(filePath, { encoding: 'utf8' })
} catch (err) {
  if (err instanceof Error) console.log(err.message)
}
  

/* 
  Key:
  Rock = A or X (1 pt)
  Paper = B or Y (2 pt)
  Scissors = C or Z (3 pt)

  (0 if you lost, 3 if the round was a draw, and 6 if you won).
*/

let arr: string[] = contents.split('\n')
let groupedArr = arr.map(rpsRes => {
  return rpsRes.split(' ')
})

console.log(arr)
console.log(groupedArr)
let score: number = 0
const choiceScore: { [key: string] : number } = {
  'A': 1,
  'B': 2,
  'C': 3,
  'X': 1,
  'Y': 2,
  'Z': 3
}

// win, lose, draw score
const wldScore: { [key: string] : number } = {
  'AX': 3, // rock vs rock = draw
  'AY': 6, // rock vs paper = win
  'AZ': 0, // rock vs scissors = lose
  'BX': 0, // paper vs rock = lose
  'BY': 3, // paper vs paper = draw
  'BZ': 6, // paper vs scissors = win
  'CX': 6, // scissors vs rock = win
  'CY': 0, // scissors vs paper = lose
  'CZ': 3 // scissors vs scissors = draw
}
// Alternative way (probably more correct, but the one above makes more sense, impo)
// let totalsObj: Record<string, number> = {}

groupedArr.forEach((round: string[]) => {
  console.log(round)
  let them = round[0]
  let me = round[1]

  console.log ('them: ', them)
  console.log ('me: ', me)
  console.log ('choiceScore[me]: ', choiceScore[me])
  console.log ('wldScore[`${them}${me}`]: ', wldScore[`${them}${me}`])

  score += choiceScore[me]
  score += wldScore[`${them}${me}`]
})

console.log(score)