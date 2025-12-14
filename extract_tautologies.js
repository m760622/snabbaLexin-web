const fs = require('fs');

try {
    const dataContent = fs.readFileSync('data.js', 'utf8');
    const arrayStart = dataContent.indexOf('[');
    const arrayEnd = dataContent.lastIndexOf(']');
    const arrayString = dataContent.substring(arrayStart, arrayEnd + 1);
    const getData = new Function('return ' + arrayString + ';');
    const dictionaryData = getData();

    const COL_SWE = 2;
    const COL_DEF = 5;
    const COL_ID = 0;
    const COL_TYPE = 1;
    const COL_ARB = 3;

    const targets = [];

    dictionaryData.forEach((item, index) => {
        const swe = (item[COL_SWE] || '').trim();
        const def = (item[COL_DEF] || '').trim();

        // Exact match check (case-sensitive often enough, or insensitive?)
        // Let's use the logic from previous step: strict equality or normalized
        if (swe && def && swe.toLowerCase() === def.toLowerCase()) {
            targets.push({
                index: index,
                id: item[COL_ID],
                word: swe,
                type: item[COL_TYPE],
                arb: item[COL_ARB] // Helpful context for generating definition
            });
        }
    });

    console.log(`Found ${targets.length} targets.`);
    fs.writeFileSync('tautologies_list.json', JSON.stringify(targets, null, 2));

} catch (err) {
    console.error(err);
}
