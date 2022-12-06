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
  Rock = A (1 pt)
  Paper = B (2 pt)
  Scissors = C (3 pt)
  Lose = X
  Draw = Y
  Win = Z

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
    'C': 3
};
// win, lose, draw choice
const wldChoice = {
    'AX': 'C',
    'AY': 'A',
    'AZ': 'B',
    'BX': 'A',
    'BY': 'B',
    'BZ': 'C',
    'CX': 'B',
    'CY': 'C',
    'CZ': 'A' // if scissors is chosen and win = rock
};
const wldScoreP2 = {
    'X': 0,
    'Y': 3,
    'Z': 6 // win
};
// Alternative way (probably more correct, but the one above makes more sense, impo)
// let totalsObj: Record<string, number> = {}
groupedArr.forEach((round) => {
    console.log(round);
    let them = round[0];
    let wld = round[1];
    let me = wldChoice[`${them}${wld}`];
    console.log('them: ', them);
    console.log('wld: ', wld);
    console.log('choiceScore[wld]: ', choiceScore[wld]);
    console.log('wldScore[`${them}${wld}`]: ', wldChoice[`${them}${wld}`]);
    score += choiceScore[me];
    score += wldScoreP2[wld];
});
console.log(score);
