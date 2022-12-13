import { readFile, writeFile } from 'node:fs/promises'

// Types
type FileSystem = {
  "/": Record<string, number>
  [key: string]: number | Record<string, number>
};
// type FileSystem = Record<string, number | Record<string, number>>;

// Constants

// Utilities
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

// Methodsss
const writeContents = async (fileSystem: string) => {
  const outputFilePath = new URL('./output.json', import.meta.url)
  writeFile(outputFilePath, fileSystem, 'utf8');
}

const identifyFileSystem = (rawCommads: string): FileSystem => {
  const commandsArr = rawCommads.split('\n')
  let fileSystem = {
    "/": {}
  }
  let currentDirPath: string[] = []
  
  for (let index = 0; index < commandsArr.length; index++) {
    const line = commandsArr[index];

    switch (true) {

      // cd action
      case line.includes('$ cd'):
        console.log('cd action')
        const cdInput = line.split(' ')[2]
        currentDirPath = setCurrentDir(currentDirPath, cdInput)
        // console.log('before cdInAction fileSystem', fileSystem)
        // fileSystem = cdInAction(fileSystem, cdInput)
        console.log(currentDirPath)
        break
      
      // ls action
      case line.includes('$ ls'):
        console.log('ls action')
        // fill the fileSystem with values in the current directory and increment index by one since we want to get past the ls command
        fileSystem = lsAction(fileSystem,index+1,commandsArr,currentDirPath)
        break
      default:
        break
    } 
  }

  // console.log(currentDirPath)
  return fileSystem
}

const lsAction = (
  fileSystem: FileSystem, 
  startingIndex: number, 
  commandsArr: string[],
  currentDirPath: string[]
): FileSystem => {
  const previousExecutedCommands = startingIndex;
  for (let index = 0; index < commandsArr.length - previousExecutedCommands; index++) {
    const currentCommand = commandsArr[index + previousExecutedCommands]
    const currentCommandArr = currentCommand.split(' ')

    console.log('currentCommand: ', currentCommand)
    if (currentCommandArr[0] !== '$') {
      console.log('currentDirPath before update: ', currentDirPath)
      updateDir(fileSystem, currentDirPath, currentCommandArr, undefined)
    } else {
      break
    }
    
  }

  return fileSystem
}

const setCurrentDir = (currentDirPath: string[], cdInput: string): string[] => {
  if (cdInput === '..') {
    currentDirPath.pop()
  } else {
    currentDirPath.push(cdInput)
  }
  return currentDirPath
}

const isNum = (v: string): boolean => {
  return /\d/.test(v);
}

const updateDir = (
  node: Record<string,any>,
  currentDirPath: string[],
  currentCommandArr: string[],
  parentDir: string | undefined
) => {
  const needle = currentDirPath[currentDirPath.length - 1]
  const actualParentDir = currentDirPath[currentDirPath.length - 2]
  Object.keys(node).some(k => {

    if (currentCommandArr[1] === 'fgnljzg.zvv') {
      console.log('currentCommandArr', currentCommandArr)
      console.log('Number(currentCommandArr[0])', Number(currentCommandArr))
    }
    // find current directory
    if (k === needle && parentDir === actualParentDir) {

      currentCommandArr[0] === 'dir' ? (node[k][currentCommandArr[1]] = {} || 1) : node[k][currentCommandArr[1]] = Number(currentCommandArr[0])
    } else if (typeof node === 'object') {
      updateDir(node[k], currentDirPath, currentCommandArr, k)
    }
  })  
}

// TODO: need to create a similar command to 'updateDir' that loops through each node and finds the ones that aren't 
// TODO: tentative logic: if current dir has no other dirs in it, add the files, then go back up (might just do 
// TODO: nested loops here, but that'd be hard if we don't know how deep they go)
const sumDirsAndFindCertainOnes = (
  node: Record<string,any>,
  currentDirPath: string[],
  currentCommandArr: string[],
  parentDir: string | undefined
) => {
  const needle = currentDirPath[currentDirPath.length - 1]
  const actualParentDir = currentDirPath[currentDirPath.length - 2]
  Object.keys(node).some(k => {

    if (currentCommandArr[1] === 'fgnljzg.zvv') {
      console.log('currentCommandArr', currentCommandArr)
      console.log('Number(currentCommandArr[0])', Number(currentCommandArr))
    }
    // find current directory
    if (k === needle && parentDir === actualParentDir) {

      currentCommandArr[0] === 'dir' ? (node[k][currentCommandArr[1]] = {} || 1) : node[k][currentCommandArr[1]] = Number(currentCommandArr[0])
    } else if (typeof node === 'object') {
      updateDir(node[k], currentDirPath, currentCommandArr, k)
    }
  })  
}

// Start the process
const contents = await readContents()
const fileSystem = identifyFileSystem(contents)

// TODO: need to create a similar command to 'updateDir' that loops through each node and finds the ones that aren't 

// console.log(fileSystem)
writeContents(JSON.stringify(fileSystem))
