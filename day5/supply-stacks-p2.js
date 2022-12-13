import { readFile } from 'node:fs/promises';
// Constants
const initialStackDepth = 7;
const stackWidth = 8;
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
    for (let index = 0; index <= initialStackDepth; index++) {
        const element = arr[index];
        stacks.push(element
            .replaceAll('    ', '[x]')
            .replaceAll(' ', '')
            .replaceAll('[', '')
            .replaceAll(']', '')
            .replaceAll('x', ' ')
            .split(''));
    }
    return stacks;
};
const getAndFormatInstructions = (arr) => {
    const formattedInstructions = [];
    const instructionsRaw = arr.slice(initialStackDepth + 3);
    instructionsRaw.forEach((instruction) => {
        const insArr = instruction
            .replaceAll('move ', '')
            .replaceAll(' from', '')
            .replaceAll(' to', '')
            .split(' ');
        formattedInstructions.push({
            move: Number(insArr[0]),
            from: Number(insArr[1]),
            to: Number(insArr[2])
        });
    });
    return formattedInstructions;
};
const getTheMoveStack = (instruction) => {
    let numberOfBoxesGrabbed = 0;
    let moveStack = [];
    const from = instruction.from - 1;
    // Loop through all the stacks and grab the right amount of boxes to move
    for (let downTheStacks = 0; downTheStacks < stacks.length; downTheStacks++) {
        const row = stacks[downTheStacks];
        // Check if the row is empty and the number of boxes grabbed does not exceed the amount to move
        if (row[from] !== ' ' && numberOfBoxesGrabbed < instruction.move) {
            moveStack.push(row[from]);
            stacks[downTheStacks][from] = ' ';
            numberOfBoxesGrabbed++;
        }
        else {
            continue;
        }
    }
    return moveStack;
};
const moveTheStack = (moveStack, stacks, instruction) => {
    let howFarDownCount = 0;
    const to = instruction.to - 1;
    const reversedMoveStack = moveStack.reverse();
    // identify when to start adding the box
    for (let downTheStacks = 0; downTheStacks < stacks.length; downTheStacks++) {
        const colVal = stacks[downTheStacks][to];
        if (colVal === ' ') {
            howFarDownCount++;
        }
        else {
            break;
        }
    }
    for (let count = 0; count < reversedMoveStack.length; count++) {
        // find the row above the row with a box in it and updated it
        if (stacks[howFarDownCount - 1] === undefined) {
            const newRow = [];
            // Create a new row to add to the stacks
            for (let index = 0; index <= stackWidth; index++) {
                if (index === to) {
                    newRow.push(reversedMoveStack[count]);
                }
                else {
                    newRow.push(' ');
                }
            }
            stacks.unshift(newRow);
        }
        else {
            stacks[howFarDownCount - 1][to] = reversedMoveStack[count];
        }
        howFarDownCount--;
    }
    // clean up empty rows
    for (let downTheStacks = 0; downTheStacks < stacks.length; downTheStacks++) {
        if (stacks[downTheStacks].every(box => box === ' ')) {
            stacks.shift();
        }
    }
    return stacks;
};
const processInstructions = (stacks, instructions) => {
    // Get boxes to move and replace them with an x
    instructions.forEach((instruction) => {
        const to = instruction.to - 1;
        const moveStack = getTheMoveStack(instruction);
        stacks = moveTheStack(moveStack, stacks, instruction);
    });
    return stacks;
};
const contents = await readContents();
let arr = contents.split('\n');
const stacks = getAndFormatStacks(arr);
const instructions = getAndFormatInstructions(arr);
const finalStack = processInstructions(stacks, instructions);
// What the stacks look like
for (let index = 0; index < finalStack.length; index++) {
    const element = finalStack[index];
    console.log(element.join(''));
}
