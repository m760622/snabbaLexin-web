const fs = require('fs');
const vm = require('vm');

try {
    let code = fs.readFileSync('./data.js', 'utf8');
    code = code.replace('const dictionaryData', 'dictionaryData');
    const sandbox = { dictionaryData: null };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);
    const data = sandbox.dictionaryData;

    // Filter for 'Se.' and 'JuridikS.'/'JuridikTB.'
    const seEntries = data.filter(item => item[1] === 'Se.').slice(0, 5);
    const jurSEntries = data.filter(item => item[1] === 'JuridikS.').slice(0, 5);
    const jurTBEntries = data.filter(item => item[1] === 'JuridikTB.').slice(0, 5);

    console.log('--- sample: Se. ---');
    console.log(JSON.stringify(seEntries, null, 2));

    console.log('\n--- sample: JuridikS. ---');
    console.log(JSON.stringify(jurSEntries, null, 2));

    console.log('\n--- sample: JuridikTB. ---');
    console.log(JSON.stringify(jurTBEntries, null, 2));

} catch (e) {
    console.error(e);
}
