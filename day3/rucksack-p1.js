import { readFile } from 'node:fs/promises';
let contents = '';
try {
    const filePath = new URL('./input.txt', import.meta.url);
    contents = await readFile(filePath, { encoding: 'utf8' });
}
catch (err) {
    if (err instanceof Error)
        console.log(err.message);
}
// consts for rucksack
const priorities = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
    'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const equalChar = (array1, array2) => {
    return array1.filter(o => array2.find(o2 => o === o2))[0];
};
let arr = contents.split('\n');
// console.log(arr)
let priorityScore = 0;
arr.forEach((rucksackContents) => {
    const comp1End = rucksackContents.length / 2;
    const comp1 = rucksackContents.slice(0, comp1End).split('');
    const comp2 = rucksackContents.slice(comp1End).split('');
    const sameInBoth = equalChar(comp1, comp2);
    console.log(sameInBoth);
    console.log(priorities.indexOf(sameInBoth) + 1);
    priorityScore += priorities.indexOf(sameInBoth) + 1;
});
console.log(priorityScore);
