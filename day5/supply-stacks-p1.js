import { readFile } from 'node:fs/promises';
// Constants
const stackDepth = 7;
// Methods
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
const getAndFormatStacks = (arr) => {
    let stacks = [];
    // make an even set of stacks with spaces and items
    for (let index = 0; index < stackDepth; index++) {
        const element = arr[index];
        stacks.push(element
            .replaceAll('    ', '[x]')
            .replaceAll(' ', '')
            .replaceAll('[', '')
            .replaceAll(']', '')
            .split(''));
    }
    return stacks;
};
const getAndFormatInstructions = (arr) => {
    const formattedInstructions = [];
    const instructionsRaw = arr.slice(stackDepth + 3);
    instructionsRaw.forEach((instruction) => {
        const insArr = instruction
            .replaceAll('move ', '')
            .replaceAll(' from ', '')
            .replaceAll(' to ', '')
            .split('');
        formattedInstructions.push({
            move: Number(insArr[0]),
            from: Number(insArr[1]),
            to: Number(insArr[2])
        });
    });
    return formattedInstructions;
};
const processInstructions = (stacks, instructions) => {
    let finalStacks = [];
    // now do the shit
    return finalStacks;
};
const contents = await readContents();
let arr = contents.split('\n');
const stacks = getAndFormatStacks(arr);
const instructions = getAndFormatInstructions(arr);
const finalStack = processInstructions(stacks, instructions);
console.log(instructions);
console.log(stacks);
