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

const contents = await readContents()
let arr = contents.split('\n')
let counter: number = 0
let tmpTotal: number = 0
let totalsObj: { [key: string] : number } = {}
// Alternative way (probably more correct, but the one above makes more sense, impo)
// let totalsObj: Record<string, number> = {}

arr.forEach((element: string) => {
  if (element) {
    tmpTotal += Number(element)
  } else {
    counter++
    totalsObj[`elf ${counter}`] = tmpTotal
    tmpTotal = 0
  }
})

const sortedElves = Object.fromEntries(
  Object.entries(totalsObj).sort(([,a],[,b]) => a-b)
)
console.log(sortedElves)