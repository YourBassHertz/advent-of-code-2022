import { readFile } from 'node:fs/promises';
// Types
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
const findStartingCharForMarker = (datastream) => {
    let startingCharPosition = 0;
    const startingPoint = 0;
    const endingPoint = 4;
    for (let index = 0; index < datastream.length; index++) {
        const testingDataStream = datastream.substring(startingPoint + index, endingPoint + index);
        if (!isUnique(testingDataStream)) {
            startingCharPosition = index + endingPoint + 1; // making it the 'countable' number, not index number
        }
        else {
            break;
        }
    }
    return startingCharPosition;
};
const isUnique = (str) => {
    return new Set(str).size == str.length;
};
// Start the process
const contents = await readContents();
const startingCharPosition = findStartingCharForMarker(contents);
console.log('start-of-packet marker location', startingCharPosition);
