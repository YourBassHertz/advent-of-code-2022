import { readFile } from 'node:fs/promises';
// consts for camp
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
const contents = await readContents();
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
