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

// consts for camp
const spreadSection = (elfSection: string): number[] => {
  let elfSectionNumbers: string[] = elfSection.split('-')
  let spreadElfSections = []

  for (let index = Number(elfSectionNumbers[0]); index <= Number(elfSectionNumbers[1]); index++) {
    spreadElfSections.push(index)
  }
  return spreadElfSections
}

const hasOverlap = (arr1: number[], arr2: number[]): boolean => {
  const check1 = arr1.every(elem => arr2.includes(elem))
  const check2 = arr2.every(elem => arr1.includes(elem))

  return check1 || check2
}

const contents = await readContents()
let arr: string[] = contents.split('\n')
let pairsWithOverlap: number = 0


arr.forEach((pairs) => {
  let elfTeam: string[] = pairs.split(',')
  const elf1Section = spreadSection(elfTeam[0])
  const elf2Section = spreadSection(elfTeam[1])

  if (hasOverlap(elf1Section,elf2Section)) {
    pairsWithOverlap++
  }
});

console.log(pairsWithOverlap)