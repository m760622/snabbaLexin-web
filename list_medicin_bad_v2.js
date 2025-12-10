const fs = require('fs');
let dictionaryData = JSON.parse(fs.readFileSync('./data.js', 'utf-8').replace('const dictionaryData = ', '').replace(/;$/, ''));

console.log("Searching for bad Medicin examples...");
dictionaryData.forEach(e => {
    let type = e[1] ? e[1].trim() : "";
    let sweEx = e[6] || "";
    let arbEx = e[7] || "";

    if (type === "Medicin." && (/används ofta/i.test(sweEx) || /används ofta/i.test(arbEx))) {
        console.log(`"${e[2]}": { swe: "", arb: "" }, // Old: S="${sweEx}" A="${arbEx}"`);
    }
});
