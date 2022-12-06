import { readFile } from 'node:fs/promises'
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

// consts for rucksack
const priorities: string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q',
'r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
'Q','R','S','T','U','V','W','X','Y','Z']

const equalChar = (array1: string[], array2: string[]): string => {
  return array1.filter(o => array2.find(o2 => o === o2))[0]
}

const contents = await readContents()
let arr: string[] = contents.split('\n')

// console.log(arr)
let priorityScore: number = 0


arr.forEach((rucksackContents) => {
  const comp1End: number = rucksackContents.length / 2
  const comp1: string[] = rucksackContents.slice(0,comp1End).split('')
  const comp2: string[] = rucksackContents.slice(comp1End).split('')
  const sameInBoth: string = equalChar(comp1,comp2)

  console.log(sameInBoth)
  console.log(priorities.indexOf(sameInBoth) + 1)

  priorityScore += priorities.indexOf(sameInBoth) + 1
})

console.log(priorityScore)