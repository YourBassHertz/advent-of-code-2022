import { readFile } from 'node:fs/promises';
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
/*
  Key:
  Rock = A or X (1 pt)
  Paper = B or Y (2 pt)
  Scissors = C or Z (3 pt)

  (0 if you lost, 3 if the round was a draw, and 6 if you won).
*/
const contents = await readContents();
let arr = contents.split('\n');
let groupedArr = arr.map(rpsRes => {
    return rpsRes.split(' ');
});
console.log(arr);
console.log(groupedArr);
let score = 0;
const choiceScore = {
    'A': 1,
    'B': 2,
    'C': 3,
    'X': 1,
    'Y': 2,
    'Z': 3
};
// win, lose, draw score
const wldScore = {
    'AX': 3,
    'AY': 6,
    'AZ': 0,
    'BX': 0,
    'BY': 3,
    'BZ': 6,
    'CX': 6,
    'CY': 0,
    'CZ': 3 // scissors vs scissors = draw
};
// Alternative way (probably more correct, but the one above makes more sense, impo)
// let totalsObj: Record<string, number> = {}
groupedArr.forEach((round) => {
    console.log(round);
    let them = round[0];
    let me = round[1];
    console.log('them: ', them);
    console.log('me: ', me);
    console.log('choiceScore[me]: ', choiceScore[me]);
    console.log('wldScore[`${them}${me}`]: ', wldScore[`${them}${me}`]);
    score += choiceScore[me];
    score += wldScore[`${them}${me}`];
});
console.log(score);
