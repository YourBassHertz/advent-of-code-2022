import { readFile } from 'node:fs/promises'
let contents: string = ''

try {
  const filePath = new URL('./input.txt', import.meta.url)
  contents = await readFile(filePath, { encoding: 'utf8' })
} catch (err) {
  if (err instanceof Error) console.log(err.message)
}

// consts for rucksack
const priorities: string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q',
'r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
'Q','R','S','T','U','V','W','X','Y','Z']

const badgeFinder = (array1: string[], array2: string[], array3: string[]): string => {
  const eq1 = array1.filter(o => array2.find(o2 => o === o2))
  const eq2 = array3.filter(o => eq1.find(o2 => o === o2))[0]
  return eq2
}

let arr: string[] = contents.split('\n')

let priorityScore: number = 0

for (let index = 0; index < arr.length; index += 3) {
  const elf1Contents = arr[index].split('')
  const elf2Contents = arr[index + 1].split('')
  const elf3Contents = arr[index + 2].split('')

  const badge: string = badgeFinder(elf1Contents,elf2Contents,elf3Contents)

  priorityScore += priorities.indexOf(badge) + 1
}

console.log(priorityScore)