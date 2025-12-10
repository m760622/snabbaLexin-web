const fs = require('fs');
let dictionaryData = JSON.parse(fs.readFileSync('./data.js', 'utf-8').replace('const dictionaryData = ', '').replace(/;$/, ''));

dictionaryData.forEach(e => {
    let type = e[1] ? e[1].trim() : "";
    if (type === "Medicin." && /används ofta/i.test(e[6] || "")) {
        console.log(`"${e[2]}": { swe: "", arb: "" }, // Old: "${e[6]}"`);
    }
});
