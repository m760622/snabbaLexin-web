const fs = require('fs');
const vm = require('vm');

try {
    let code = fs.readFileSync('./data.js', 'utf8');
    code = code.replace('const dictionaryData', 'dictionaryData');
    const sandbox = { dictionaryData: null };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);
    const data = sandbox.dictionaryData;

    // Same target types
    const targetTypes = ['JuridikS.', 'JuridikTB.', 'Se.', 'MigrationTB.', 'Militär.'];
    const pendingBatch = [];

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const type = item[1];
        const sweVal = item[7]; // Swedish Example

        if (targetTypes.includes(type) && (!sweVal || sweVal.trim() === '')) {
            // Found a missing one!
            pendingBatch.push({
                id: item[0],
                word: item[2],
                type: type,
                defSv: item[5] || '',
                defAr: item[3] || item[4] || ''
            });
        }
    }

    console.log(`Found ${pendingBatch.length} remaining specialized terms.`);

    // Take next 100
    const batch = pendingBatch.slice(0, 100);

    if (batch.length > 0) {
        fs.writeFileSync('./specialized_pending_batch.json', JSON.stringify(batch, null, 2));
        console.log(`Saved next ${batch.length} items to specialized_pending_batch.json`);
    } else {
        console.log("No more specialized terms missing examples!");
    }

} catch (e) {
    console.error("Error:", e);
}
