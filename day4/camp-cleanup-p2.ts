import { readFile } from 'node:fs/promises'

// consts for camp
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


let pairsWithOverlap: number = 0

const spreadSection = (elfSection: string): number[] => {
  let elfSectionNumbers: string[] = elfSection.split('-')
  let spreadElfSections = []

  for (let index = Number(elfSectionNumbers[0]); index <= Number(elfSectionNumbers[1]); index++) {
    spreadElfSections.push(index)
  }
  return spreadElfSections
}

const hasOverlap = (arr1: number[], arr2: number[]): boolean => {
  return arr1.some(item => arr2.includes(item))
}


const contents = await readContents()
let arr: string[] = contents.split('\n')


arr.forEach((pairs) => {
  let elfTeam: string[] = pairs.split(',')
  const elf1Section = spreadSection(elfTeam[0])
  const elf2Section = spreadSection(elfTeam[1])

  if (hasOverlap(elf1Section,elf2Section)) {
    pairsWithOverlap++
  }
});

console.log(pairsWithOverlap)