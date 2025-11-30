const fs = require('fs');
const path = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';

try {
    const content = fs.readFileSync(path, 'utf8');
    // Basic syntax check by eval (safe in this controlled env)
    // We need to mock the window/global scope if the file uses it, but it seems to just define consts
    eval(content);

    if (typeof WC_PREDEFINED_LEVELS === 'undefined') {
        console.error("❌ WC_PREDEFINED_LEVELS is undefined");
        process.exit(1);
    }

    if (typeof WC_DICTIONARY === 'undefined') {
        console.error("❌ WC_DICTIONARY is undefined");
        process.exit(1);
    }

    const levelCount = Object.keys(WC_PREDEFINED_LEVELS).length;
    const dictCount = WC_DICTIONARY.length;

    console.log(`✅ Syntax OK`);
    console.log(`✅ Levels: ${levelCount}`);
    console.log(`✅ Dictionary Entries: ${dictCount}`);

    if (levelCount !== 100) {
        console.warn(`⚠️ Expected 100 levels, found ${levelCount}`);
    }

} catch (e) {
    console.error("❌ Syntax Error:", e.message);
    process.exit(1);
}
