import { readFile, writeFile } from 'node:fs/promises';
// type FileSystem = Record<string, number | Record<string, number>>;
// Constants
// Utilities
const readContents = async () => {
    let data = '';
    try {
        const filePath = new URL('./input.txt', import.meta.url);
        data = await readFile(filePath, { encoding: 'utf8' });
    }
    catch (err) {
        if (err instanceof Error)
            console.log(err.message);
    }
    return data;
};
// Methodsss
const writeContents = async (fileSystem) => {
    const outputFilePath = new URL('./output.json', import.meta.url);
    writeFile(outputFilePath, fileSystem, 'utf8');
};
const identifyFileSystem = (rawCommads) => {
    const commandsArr = rawCommads.split('\n');
    let fileSystem = {
        "/": {}
    };
    let currentDirPath = [];
    for (let index = 0; index < commandsArr.length; index++) {
        const line = commandsArr[index];
        switch (true) {
            // cd action
            case line.includes('$ cd'):
                console.log('cd action');
                const cdInput = line.split(' ')[2];
                currentDirPath = setCurrentDir(currentDirPath, cdInput);
                // console.log('before cdInAction fileSystem', fileSystem)
                // fileSystem = cdInAction(fileSystem, cdInput)
                console.log(currentDirPath);
                break;
            // ls action
            case line.includes('$ ls'):
                console.log('ls action');
                // fill the fileSystem with values in the current directory and increment index by one since we want to get past the ls command
                fileSystem = lsAction(fileSystem, index + 1, commandsArr, currentDirPath);
                break;
            default:
                break;
        }
    }
    // console.log(currentDirPath)
    return fileSystem;
};
const cdInAction = (fileSystem, cdInput) => {
    if (cdInput !== '..') {
        fileSystem[cdInput] = {};
    }
    // console.log('updated fileSystem', fileSystem)
    return fileSystem;
};
const lsAction = (fileSystem, startingIndex, commandsArr, currentDirPath) => {
    const previousExecutedCommands = startingIndex;
    for (let index = 0; index < commandsArr.length - previousExecutedCommands; index++) {
        const currentCommand = commandsArr[index + previousExecutedCommands];
        const currentCommandArr = currentCommand.split(' ');
        console.log('currentCommand: ', currentCommand);
        if (currentCommandArr[0] !== '$') {
            console.log('currentDirPath before update: ', currentDirPath);
            updateDir(fileSystem, currentDirPath, currentCommandArr, undefined);
        }
        else {
            break;
        }
        // break
        // fileSystem[currentCommandArr[1]] = Number(currentCommandArr[0])
        // } else if (currentCommandArr[0] === 'dir') {
        //   updateDir(fileSystem, currentDirPath[currentDirPath.length - 1], Number(currentCommandArr[0]))
        //   fileSystem[currentCommandArr[1]] = {}
        // }
    }
    return fileSystem;
};
const setCurrentDir = (currentDirPath, cdInput) => {
    if (cdInput === '..') {
        currentDirPath.pop();
    }
    else {
        currentDirPath.push(cdInput);
    }
    return currentDirPath;
};
const isNum = (v) => {
    return /\d/.test(v);
};
// TODO: this is where I left off. what's happening is some directories have the same name, so it's not getting to the real directory that's further down the list
// TODO: need to see if there's a way to compare the parent directory name to the path in the currentDirPath
const updateDir = (node, currentDirPath, currentCommandArr, parentDir) => {
    const needle = currentDirPath[currentDirPath.length - 1];
    const actualParentDir = currentDirPath[currentDirPath.length - 2];
    Object.keys(node).some(k => {
        if (currentCommandArr[1] === 'fgnljzg.zvv') {
            console.log('currentCommandArr', currentCommandArr);
            console.log('Number(currentCommandArr[0])', Number(currentCommandArr));
        }
        // find current directory
        if (k === needle && parentDir === actualParentDir) {
            currentCommandArr[0] === 'dir' ? (node[k][currentCommandArr[1]] = {} || 1) : node[k][currentCommandArr[1]] = Number(currentCommandArr[0]);
        }
        else if (typeof node === 'object') {
            updateDir(node[k], currentDirPath, currentCommandArr, k);
        }
    });
};
// Start the process
const contents = await readContents();
const fileSystem = identifyFileSystem(contents);
// console.log(fileSystem)
writeContents(JSON.stringify(fileSystem));
