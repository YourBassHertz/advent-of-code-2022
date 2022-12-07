import { readFile } from 'node:fs/promises'

// Types
type Instruction = {
  move: number,
  from: number,
  to: number,
}
type Instructions = Instruction[]
type Stacks = string[][]

// Constants
const initialStackDepth = 7
const stackWidth = 8


// Methods
const readContents = async (): Promise<string> => {
  let data = ''
  try {
    const filePath = new URL('./input.txt', import.meta.url)
    data = await readFile(filePath, { encoding: 'utf8' })
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
  }

  return data
}

const getAndFormatStacks = (arr: string[]): Stacks => {
  let stacks = []

  // make an even set of stacks with spaces and items
  for (let index = 0; index <= initialStackDepth; index++) {
    const element = arr[index];
    stacks.push(element
      .replaceAll('    ', '[x]')
      .replaceAll(' ', '')
      .replaceAll('[', '')
      .replaceAll(']', '')
      .replaceAll('x', ' ')
      .split('')
    )
  }

  return stacks
}

const getAndFormatInstructions = (arr: string[]): Instructions => {
  const formattedInstructions: Instructions = []
  const instructionsRaw = arr.slice(initialStackDepth + 3)

  instructionsRaw.forEach((instruction) => {
    const insArr = instruction
      .replaceAll('move ', '')
      .replaceAll(' from', '')
      .replaceAll(' to', '')
      .split(' ')
      formattedInstructions.push(
        { 
          move: Number(insArr[0]),
          from: Number(insArr[1]),
          to: Number(insArr[2])
        }
      )
  })
  return formattedInstructions
}

const getTheMoveStack = (instruction: Instruction): string[] => {
  let numberOfBoxesGrabbed = 0
  let moveStack: string[] = []
  const from = instruction.from - 1

  // Loop through all the stacks and grab the right amount of boxes to move
  for (let downTheStacks = 0; downTheStacks < stacks.length; downTheStacks++) {
    const row = stacks[downTheStacks]

    // Check if the row is empty and the number of boxes grabbed does not exceed the amount to move
    if (row[from] !== ' ' && numberOfBoxesGrabbed < instruction.move) {
      moveStack.push(row[from])
      stacks[downTheStacks][from] = ' '
      numberOfBoxesGrabbed++
    } else {
      continue
    }
    
  }
  
  return moveStack
}

const moveTheStack = (moveStack: string[], stacks: Stacks, instruction: Instruction): Stacks => {
  let howFarDownCount = 0;
  const to = instruction.to - 1

  // identify when to start adding the box
  for (let downTheStacks = 0; downTheStacks < stacks.length; downTheStacks++) {
    const colVal = stacks[downTheStacks][to]
    
    if (colVal === ' ') { 
      howFarDownCount++ 
    } else {
      break
    }
  }

  for (let count = 0; count < moveStack.length; count++) {
    // find the row above the row with a box in it and updated it
    if (stacks[howFarDownCount - 1] === undefined) {
      const newRow = [];

      // Create a new row to add to the stacks
      for (let index = 0; index <= stackWidth; index++) {
        if (index === to) {
          newRow.push(moveStack[count])
        } else {
          newRow.push(' ')
        }
      }
      // console.log(newRow)
      stacks.unshift(newRow)
    } else {
      stacks[howFarDownCount - 1][to] = moveStack[count]
    }
    howFarDownCount--
  }

  // clean up empty rows
  for (let downTheStacks = 0; downTheStacks < stacks.length; downTheStacks++) {
    if (stacks[downTheStacks].every(box => box === ' ')) {
      stacks.shift()
    }
  }

  return stacks
}

const processInstructions = (stacks: Stacks, instructions: Instructions): Stacks => {
  
  // Get boxes to move and replace them with an x
  instructions.forEach((instruction) => {
    const to = instruction.to - 1

    const moveStack = getTheMoveStack(instruction)
    stacks = moveTheStack(moveStack,stacks,instruction)

  })

  return stacks
}

const contents = await readContents()
let arr: string[] = contents.split('\n')
const stacks = getAndFormatStacks(arr)
const instructions = getAndFormatInstructions(arr)

const finalStack = processInstructions(stacks, instructions)

// What the stacks look like
for (let index = 0; index < finalStack.length; index++) {
  const element = finalStack[index];
  console.log(element.join('')) 
}