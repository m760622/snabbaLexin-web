const fs = require('fs');
try {
    const code = fs.readFileSync('/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js', 'utf8');
    // Mock globals that might be needed
    global.WC_THEMES = [];

    // Eval the code
    eval(code);

    if (typeof WC_PREDEFINED_LEVELS === 'undefined') {
        console.error("WC_PREDEFINED_LEVELS is undefined");
    } else {
        const keys = Object.keys(WC_PREDEFINED_LEVELS);
        console.log(`Success! Found ${keys.length} levels.`);
        console.log("First level:", keys[0]);
        console.log("Last level:", keys[keys.length - 1]);
        console.log("10-10 data:", WC_PREDEFINED_LEVELS["10-10"]);
    }
} catch (e) {
    console.error("Syntax Error:", e.message);
    // Print context if possible
    if (e.stack) console.error(e.stack.split('\n')[0]);
}
