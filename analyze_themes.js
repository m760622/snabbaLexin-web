const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';
const content = fs.readFileSync(LEXIN_PATH, 'utf8');
const lines = content.split('\n');

const highQualityPool = [];

// Parse High Quality Pool (Same logic as generator)
for (const line of lines) {
    const parts = line.split(';');
    if (parts.length < 12) continue;
    let word = parts[2] ? parts[2].trim().split(',')[0].trim().replace(/[^a-zA-ZåäöÅÄÖ]/g, '') : "";
    let translation = parts[3] ? parts[3].trim() : "";
    if (!word || word.length < 3 || word.length > 7 || !translation) continue;

    // Simplified check for valid sentence presence (just to match pool size roughly)
    // In real generator we check sentence length etc.
    // Let's assume we use the same pool.

    // Combine all text for keyword search: Word + Translation + Example + Definition
    // We'll search in the whole line for simplicity and broadness
    const fullText = line.toLowerCase();

    highQualityPool.push({
        w: word.toUpperCase(),
        text: fullText
    });
}

console.log(`Pool Size: ${highQualityPool.length}`);

// Define Keywords for Chapters
const themes = {
    1: { name: "Food", keywords: ["mat", "äta", "dryck", "smak", "koka", "steka", "restaurang", "kök", "frukt", "grönsak", "bröd", "vatten", "kaffe", "te", "lunch", "middag", "frukost", "hungrig", "mätt", "recept", "skål", "tallrik", "glas", "kopp", "äpple", "banan", "bär", "kaka", "tårta", "glass", "ost", "smör", "mjölk", "kött", "fisk", "kyckling", "krydda", "salt", "socker", "peppar"] },
    2: { name: "Nature", keywords: ["natur", "träd", "skog", "blomma", "växt", "djur", "hav", "sjö", "vatten", "berg", "sten", "himmel", "sol", "måne", "stjärna", "moln", "regn", "snö", "vind", "väder", "årstid", "vinter", "vår", "sommar", "höst", "park", "gräs", "mark", "jord", "eld", "luft", "ö", "strand", "flod"] },
    3: { name: "Travel", keywords: ["resa", "åka", "bil", "buss", "tåg", "flyg", "båt", "cykel", "trafik", "väg", "gata", "karta", "pass", "biljett", "hotell", "semester", "turist", "besök", "utflykt", "bagage", "väska", "station", "flygplats", "hamn", "land", "stad", "värld", "karta", "norr", "söder", "öster", "väster"] },
    4: { name: "Daily Life", keywords: ["vardag", "jobb", "arbete", "skola", "hem", "fritid", "tid", "klocka", "dag", "natt", "morgon", "kväll", "vecka", "månad", "år", "pengar", "handla", "butik", "städa", "tvätta", "laga", "sova", "vakna", "äta", "dricka", "prata", "lyssna", "titta", "läsa", "skriva", "leka", "spela", "vän", "hjälp"] },
    5: { name: "Body", keywords: ["kropp", "huvud", "hår", "öga", "öra", "näsa", "mun", "tand", "hals", "arm", "hand", "finger", "mage", "rygg", "ben", "fot", "tå", "hjärta", "blod", "sjuk", "frisk", "ont", "medicin", "läkare", "sjukhus", "hälsa", "stark", "svag", "trött", "pigg", "sova", "vila", "springa", "gå"] },
    6: { name: "Clothes", keywords: ["kläder", "klä", "tröja", "byxa", "kjol", "klänning", "jacka", "kappa", "rock", "sko", "strumpa", "mössa", "vante", "halsduk", "slips", "skjorta", "blus", "kavaj", "kostym", "tyg", "sy", "knapp", "ficka", "storlek", "färg", "röd", "blå", "gul", "grön", "svart", "vit", "tvätta", "mode"] },
    7: { name: "Family", keywords: ["familj", "släkt", "mamma", "pappa", "förälder", "barn", "son", "dotter", "bror", "syster", "syskon", "farfar", "farmor", "morfar", "mormor", "kusin", "man", "fru", "make", "maka", "gift", "bröllop", "skilja", "sambo", "pojke", "flicka", "kille", "tjej", "vän", "kompis", "granne", "namn", "heta", "kalla"] },
    8: { name: "House & Home", keywords: ["hus", "hem", "lägenhet", "villa", "rum", "kök", "badrum", "sovrum", "vardagsrum", "hall", "fönster", "dörr", "golv", "tak", "vägg", "möbel", "bord", "stol", "soffa", "säng", "lampa", "matta", "gardin", "skåp", "hylla", "nyckel", "lås", "bo", "bygga", "måla", "trädgård", "balkong", "garage"] },
    9: { name: "City & Traffic", keywords: ["stad", "by", "samhälle", "centrum", "torg", "gata", "väg", "trafik", "bil", "buss", "tåg", "cykel", "bro", "tunnel", "hus", "byggnad", "park", "affär", "bank", "post", "skola", "sjukhus", "polis", "brandkår", "kyrka", "bibliotek", "bio", "restaurang", "café", "karta", "plats", "stanna", "köra", "gå"] },
    10: { name: "Animals", keywords: ["djur", "hund", "katt", "häst", "ko", "gris", "får", "get", "höna", "tupp", "fågel", "fisk", "orm", "spindel", "fluga", "mygga", "bi", "fjäril", "varg", "björn", "älg", "rådjur", "räv", "hare", "mus", "råtta", "svans", "päls", "vinge", "bo", "jaga", "tam", "vild"] }
};

console.log("\nTheme Coverage Analysis:");

for (let ch = 1; ch <= 10; ch++) {
    const theme = themes[ch];
    const matches = highQualityPool.filter(entry => {
        // Use regex for whole word matching
        // We only check the text part (definitions/examples), not the word itself to avoid circular logic?
        // Actually, checking the full line is okay if we use word boundaries.
        // But better to check the context (translation, sentence).

        return theme.keywords.some(k => {
            const regex = new RegExp(`\\b${k}\\b`, 'i');
            return regex.test(entry.text);
        });
    });

    console.log(`Chapter ${ch} (${theme.name}): ${matches.length} matches.`);
    // Show a few examples
    const examples = matches.slice(0, 10).map(m => m.w).join(", ");
    console.log(`  Examples: ${examples}`);
}
