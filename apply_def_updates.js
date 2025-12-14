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

    // Read Batch
    const batchData = JSON.parse(fs.readFileSync(batchPath, 'utf8'));

    const COL_DEF = 5; // Target column for Swedish definition

    let updates = 0;

    batchData.forEach(item => {
        const { index, def } = item;
        if (dictionaryData[index]) {
            // Update the definition
            dictionaryData[index][COL_DEF] = def;
            updates++;
        } else {
            console.warn(`Index ${index} not found in dictionary data.`);
        }
    });

    console.log(`Applied ${updates} definition updates.`);

    // Write back
    // Use JSON.stringify but we need to match the original formatting style ideally?
    // The original file is a JS file assigning a variable.
    // We can just dump it as strict JSON inside the variable assignment.
    // Note: This might change indentation or quoting style (single vs double).
    // The previous file used double quotes mostly. JSON.stringify uses double quotes.
    // It should be safe.

    const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
    fs.writeFileSync(dataPath, newContent, 'utf8');
    console.log('Successfully saved data.js');

} catch (err) {
    console.error('Error applying updates:', err);
}
