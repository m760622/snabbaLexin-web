const fs = require('fs');

try {
    const dataPath = 'data.js';
    const batchPath = 'batch_definitions.json';

    // Read Data
    const dataContent = fs.readFileSync(dataPath, 'utf8');
    const arrayStart = dataContent.indexOf('[');
    const arrayEnd = dataContent.lastIndexOf(']');
    const prefix = dataContent.substring(0, arrayStart);
    const suffix = dataContent.substring(arrayEnd + 1);

    const arrayString = dataContent.substring(arrayStart, arrayEnd + 1);
    const getData = new Function('return ' + arrayString + ';');
    const dictionaryData = getData();

    // Create ID Map for fast lookup (ID is at column 0)
    const idMap = new Map();
    dictionaryData.forEach((row, idx) => {
        if (row && row.length > 0) {
            idMap.set(row[0], idx);
        }
    });

    // Read Batch
    const batchData = JSON.parse(fs.readFileSync(batchPath, 'utf8'));

    const COL_DEF = 5; // Target column for Swedish definition

    let updates = 0;
    let notFound = 0;

    batchData.forEach(item => {
        const { id, def } = item;

        if (id && idMap.has(id)) {
            const rowIndex = idMap.get(id);
            // Update the definition
            dictionaryData[rowIndex][COL_DEF] = def;
            updates++;
        } else {
            console.warn(`ID ${id} not found in dictionary data.`);
            notFound++;
        }
    });

    console.log(`Applied ${updates} definition updates.`);
    if (notFound > 0) console.log(`Warning: ${notFound} IDs were not found.`);

    // Write back
    // Use JSON.stringify but retain the variable assignment structure
    const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
    fs.writeFileSync(dataPath, newContent, 'utf8');
    console.log('Successfully saved data.js');

} catch (err) {
    console.error('Error applying updates:', err);
}
