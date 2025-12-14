const fs = require('fs');

try {
    const dataContent = fs.readFileSync('data.js', 'utf8');
    const arrayStart = dataContent.indexOf('[');
    const arrayEnd = dataContent.lastIndexOf(']');
    const arrayString = dataContent.substring(arrayStart, arrayEnd + 1);
    const getData = new Function('return ' + arrayString + ';');
    const dictionaryData = getData();

    console.log(`Analyzing ${dictionaryData.length} items for tautologies...`);

    let sweTautologies = 0;
    let arbTautologies = 0;

    // Indices based on app.js
    const COL_SWE = 2; // Word
    const COL_ARB = 3; // Word
    const COL_ARB_DEF = 4; // Def
    const COL_DEF = 5; // Swe Def

    dictionaryData.forEach((item, index) => {
        const swe = (item[COL_SWE] || '').trim().toLowerCase();
        const def = (item[COL_DEF] || '').trim().toLowerCase();

        // Check if Def exists and is exactly the same as Word (ignoring case)
        if (swe && def && swe === def) {
            sweTautologies++;
            if (sweTautologies <= 5) console.log(`SWE Tautology: "${item[COL_SWE]}" == "${item[COL_DEF]}"`);
        }

        const arb = (item[COL_ARB] || '').trim();
        const arbDef = (item[COL_ARB_DEF] || '').trim();

        if (arb && arbDef && arb === arbDef) {
            arbTautologies++;
            if (arbTautologies <= 5) console.log(`ARB Tautology: "${item[COL_ARB]}" == "${item[COL_ARB_DEF]}"`);
        }
    });

    console.log(`\nFound ${sweTautologies} Swedish Tautologies (Word == Def).`);
    console.log(`Found ${arbTautologies} Arabic Tautologies (Word == Def).`);

} catch (err) {
    console.error(err);
}
