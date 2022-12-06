import { readFile } from 'node:fs/promises';
const filePath = new URL('./input.txt', import.meta.url);
// consts for camp
let contents = '';
let pairsWithOverlap = 0;
const spreadSection = (elfSection) => {
    let elfSectionNumbers = elfSection.split('-');
    let spreadElfSections = [];
    for (let index = Number(elfSectionNumbers[0]); index <= Number(elfSectionNumbers[1]); index++) {
        spreadElfSections.push(index);
    }
    return spreadElfSections;
};
const hasOverlap = (arr1, arr2) => {
    return arr1.some(item => arr2.includes(item));
};
try {
    contents = await readFile(filePath, { encoding: 'utf8' });
}
catch (err) {
    err instanceof Error ? console.log(err.message) : console.log(err);
}
let arr = contents.split('\n');
arr.forEach((pairs) => {
    let elfTeam = pairs.split(',');
    const elf1Section = spreadSection(elfTeam[0]);
    const elf2Section = spreadSection(elfTeam[1]);
    if (hasOverlap(elf1Section, elf2Section)) {
        pairsWithOverlap++;
    }
});
console.log(pairsWithOverlap);
