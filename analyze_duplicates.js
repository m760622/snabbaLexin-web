const fs = require('fs');

try {
    const dataContent = fs.readFileSync('data.js', 'utf8');
    // Extract array content
    const arrayStart = dataContent.indexOf('[');
    const arrayEnd = dataContent.lastIndexOf(']');

    if (arrayStart === -1 || arrayEnd === -1) {
        throw new Error('Could not find array in data.js');
    }

    const arrayString = dataContent.substring(arrayStart, arrayEnd + 1);

    // Safety hack: data.js variable assignment might interfere if we just eval, 
    // but JSON.parse handles strictly JSON. data.js has comments/loose JS?
    // Let's assume it's valid JSON structure within the variable assignment.
    // However, data.js often uses single quotes or comments which JSON.parse hates.
    // Let's use `eval` in a strictly sandboxed way or just `new Function`.

    // We'll wrap it to return the array.
    const getData = new Function('return ' + arrayString + ';');
    const dictionaryData = getData();

    console.log(`Total items: ${dictionaryData.length}`);

    const idCounts = {};
    const exactDupes = new Map();
    let duplicateIds = 0;
    let exactDupeRows = 0;

    dictionaryData.forEach((item, index) => {
        const id = item[0];

        // Check ID Duplicates
        if (idCounts[id]) {
            idCounts[id]++;
            duplicateIds++;
        } else {
            idCounts[id] = 1;
        }

        // Check Exact Row Duplicates (stringify to compare)
        const rowStr = JSON.stringify(item);
        if (exactDupes.has(rowStr)) {
            exactDupes.set(rowStr, exactDupes.get(rowStr) + 1);
            exactDupeRows++;
        } else {
            exactDupes.set(rowStr, 1);
        }
    });

    console.log(`Duplicate IDs found: ${duplicateIds}`);
    console.log(`Exact Duplicate Rows found: ${exactDupeRows}`);

    if (duplicateIds > 0) {
        console.log('\nTop Duplicate IDs (Sample):');
        Object.entries(idCounts)
            .filter(([_, count]) => count > 1)
            .slice(0, 10)
            .forEach(([id, count]) => console.log(`${id}: ${count} times`));
    }

    if (exactDupeRows > 0) {
        console.log('\nSample Exact Duplicate Rows:');
        Array.from(exactDupes.entries())
            .filter(([_, count]) => count > 1)
            .slice(0, 5)
            .forEach(([row, count]) => console.log(`${count}x: ${row.substring(0, 100)}...`));
    }

} catch (err) {
    console.error('Error analyzing:', err.message);
}
