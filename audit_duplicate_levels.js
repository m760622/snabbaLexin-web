const fs = require('fs');

const DATA_FILE = 'wordConnectData.js';
const content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const WC_PREDEFINED_LEVELS = ({[\s\S]*?});/);
if (!match) {
    console.error("Could not parse WC_PREDEFINED_LEVELS");
    process.exit(1);
}
const levels = eval('(' + match[1] + ')');

const seen = new Map();
const duplicates = [];

console.log("Starting Duplicate Level Audit...");

for (const [id, level] of Object.entries(levels)) {
    // Create a unique signature for the level
    // Signature: Sorted letters + Sorted words
    const lettersSig = level.letters.slice().sort().join('');
    const wordsSig = level.words.slice().sort().join(',');
    const signature = `${lettersSig}|${wordsSig}`;

    if (seen.has(signature)) {
        duplicates.push({
            original: seen.get(signature),
            duplicate: id,
            signature: signature
        });
    } else {
        seen.set(signature, id);
    }
}

if (duplicates.length === 0) {
    console.log("✅ SUCCESS: No duplicate levels found.");
} else {
    console.log(`❌ FAILED: Found ${duplicates.length} duplicate pairs:`);
    duplicates.forEach(d => {
        console.log(`- Level ${d.duplicate} is a duplicate of Level ${d.original} (Sig: ${d.signature})`);
    });
}
