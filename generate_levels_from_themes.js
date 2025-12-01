const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

// --- Helper Functions ---

function extractVariable(content, varName) {
    const regex = new RegExp(`const ${varName} = ([\\[\\{][\\s\\S]*?)(?:;\\s*$|;\\s*const|;\\s*function|;\\s*//)`, 'm');
    // A bit hacky regex to capture the object/array definition. 
    // Since the file is well-formatted, we can try to match balanced brackets or just grab until the next const/function.
    // Actually, let's use a simpler approach: find the start, then match braces.

    const startIdx = content.indexOf(`const ${varName} =`);
    if (startIdx === -1) return null;

    let openBrace = content.indexOf(varName === 'WC_PREDEFINED_LEVELS' ? '{' : '[', startIdx);
    if (openBrace === -1) return null;

    let balance = 0;
    let inString = false;
    let stringChar = '';
    let endIdx = -1;

    for (let i = openBrace; i < content.length; i++) {
        const char = content[i];

        if (inString) {
            if (char === stringChar && content[i - 1] !== '\\') {
                inString = false;
            }
        } else {
            if (char === '"' || char === "'" || char === '`') {
                inString = true;
                stringChar = char;
            } else if (char === '{' || char === '[') {
                balance++;
            } else if (char === '}' || char === ']') {
                balance--;
                if (balance === 0) {
                    endIdx = i + 1;
                    break;
                }
            }
        }
    }

    if (endIdx !== -1) {
        const jsonStr = content.substring(openBrace, endIdx);
        try {
            // We need to eval because it's JS object notation, not strict JSON (keys might not be quoted, comments, etc)
            // But wait, the file seems to have quoted keys for dictionary but maybe not for themes?
            // Let's try to use eval safely-ish.
            return eval('(' + jsonStr + ')');
        } catch (e) {
            console.error(`Failed to eval ${varName}:`, e);
            return null;
        }
    }
    return null;
}

function getSubsets(letters) {
    const results = new Set();
    const count = Math.pow(2, letters.length);
    for (let i = 0; i < count; i++) {
        let subset = "";
        for (let j = 0; j < letters.length; j++) {
            if ((i & (1 << j)) > 0) {
                subset += letters[j];
            }
        }
        if (subset.length >= 2) {
            const perms = getPermutations(subset);
            perms.forEach(p => results.add(p));
        }
    }
    return Array.from(results);
}

function getPermutations(str) {
    if (str.length <= 1) return [str];
    const allPerms = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const remainingChars = str.slice(0, i) + str.slice(i + 1);
        const remainingPerms = getPermutations(remainingChars);
        for (const perm of remainingPerms) {
            allPerms.push(char + perm);
        }
    }
    return allPerms;
}

// --- Main Logic ---

// Hardcoded themes from user request
const WC_THEMES = [
    {
        id: 'food',
        name: 'Mat & Dryck / الطعام والشراب',
        icon: '🍎',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
        accent: '#e11d48',
        words: [
            { word: "MAT", sentence: "Mat är viktigt för hälsan." },
            { word: "ÄTA", sentence: "Vi ska äta middag nu." },
            { word: "KAFFE", sentence: "Jag dricker kaffe varje morgon." },
            { word: "MJÖLK", sentence: "Barn behöver mjölk för att växa." },
            { word: "BRÖD", sentence: "Färskt bröd doftar gott." },
            { word: "KOCK", sentence: "Kocken lagar god mat." },
            { word: "RECEPT", sentence: "Följ receptet noga." },
            { word: "SMAK", sentence: "Matens smak var fantastisk." },
            { word: "LUNCH", sentence: "Vi äter lunch klockan tolv." },
            { word: "GRÖT", sentence: "Gröt är nyttig frukost." }
        ]
    },
    {
        id: 'nature',
        name: 'Naturen / الطبيعة',
        icon: '🌲',
        background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
        accent: '#059669',
        words: [
            { word: "TRÄD", sentence: "Trädet ger oss skugga." },
            { word: "SOL", sentence: "Solen skiner idag." },
            { word: "HAV", sentence: "Havet är blått och djupt." },
            { word: "SKOG", sentence: "Vi promenerar i skogen." },
            { word: "BERG", sentence: "Berget är högt att bestiga." },
            { word: "FLOD", sentence: "Floden rinner genom staden." },
            { word: "MOLN", sentence: "Det finns vita moln på himlen." },
            { word: "STJÄRNA", sentence: "En stjärna lyser i natten." },
            { word: "BLAD", sentence: "Trädens blad faller på hösten." },
            { word: "MARK", sentence: "Marken är täckt av snö." }
        ]
    },
    {
        id: 'travel',
        name: 'Resor / السفر',
        icon: '✈️',
        background: 'linear-gradient(to top, #4481eb 0%, #04befe 100%)',
        accent: '#2563eb',
        words: [
            { word: "RESA", sentence: "Att resa är att leva." },
            { word: "TÅG", sentence: "Tåget går i tid." },
            { word: "BIL", sentence: "Vi åker bil till jobbet." },
            { word: "BUSS", sentence: "Bussen stannar vid hållplatsen." },
            { word: "FLYG", sentence: "Flyget lyfter mot solen." },
            { word: "KARTA", sentence: "Vi behöver en karta för att hitta." },
            { word: "VÄSKA", sentence: "Packa din väska inför resan." },
            { word: "PASS", sentence: "Glöm inte ditt pass." },
            { word: "HOTELL", sentence: "Vi bor på ett fint hotell." },
            { word: "TURIST", sentence: "Många turister besöker staden." }
        ]
    },
    {
        id: 'daily',
        name: 'Vardag / الحياة اليومية',
        icon: '🏠',
        background: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
        accent: '#d97706',
        words: [
            { word: "HEM", sentence: "Borta bra men hemma bäst." },
            { word: "HUS", sentence: "De bor i ett rött hus." },
            { word: "RUM", sentence: "Mitt rum är städat." },
            { word: "SÄNG", sentence: "Sängen är mjuk och skön." },
            { word: "STOL", sentence: "Sitt ner på en stol." },
            { word: "BORD", sentence: "Maten står på bordet." },
            { word: "DÖRR", sentence: "Stäng dörren efter dig." },
            { word: "NYCKEL", sentence: "Jag tappade min nyckel." },
            { word: "LAMPA", sentence: "Tänd lampan när det blir mörkt." },
            { word: "SOFFA", sentence: "Vi sitter i soffan och pratar." }
        ]
    },
    {
        id: 'health',
        name: 'Hälsa / الصحة',
        icon: '❤️',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        accent: '#ef4444',
        words: [
            { word: "SJUK", sentence: "Han är sjuk idag." },
            { word: "LÄKARE", sentence: "Läkaren hjälper patienter." },
            { word: "KROPP", sentence: "Träning är bra för kroppen." },
            { word: "HJÄRTA", sentence: "Hjärtat slår för dig." },
            { word: "MEDICIN", sentence: "Ta din medicin i tid." },
            { word: "TAND", sentence: "Borsta varje tand noga." },
            { word: "BLOD", sentence: "Blod ger liv åt kroppen." },
            { word: "HÄLSA", sentence: "Hälsa är viktigare än pengar." },
            { word: "VÅRD", sentence: "Alla har rätt till vård." },
            { word: "SÖMN", sentence: "God sömn ger energi." }
        ]
    },
    {
        id: 'work',
        name: 'Arbete / العمل',
        icon: '💼',
        background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
        accent: '#2563eb',
        words: [
            { word: "JOBB", sentence: "Jag trivs på mitt jobb." },
            { word: "CHEF", sentence: "Chefen leder mötet." },
            { word: "LÖN", sentence: "Lönen kommer varje månad." },
            { word: "KONTOR", sentence: "Vi arbetar på ett kontor." },
            { word: "MÖTE", sentence: "Vi har ett viktigt möte." },
            { word: "KOLLEGA", sentence: "Min kollega är hjälpsam." },
            { word: "DATOR", sentence: "Jag arbetar vid min dator." },
            { word: "RAST", sentence: "Nu tar vi en rast." },
            { word: "AVTAL", sentence: "Vi skrev på ett avtal." },
            { word: "PLAN", sentence: "Vi har en bra plan." }
        ]
    },
    {
        id: 'education',
        name: 'Utbildning / التعليم',
        icon: '🎓',
        background: 'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)',
        accent: '#7c3aed',
        words: [
            { word: "SKOLA", sentence: "Barnen går i skolan." },
            { word: "LÄRA", sentence: "Man lär sig något nytt varje dag." },
            { word: "BOK", sentence: "Läs en bok för att lära." },
            { word: "PENNA", sentence: "Skriv med en penna." },
            { word: "ELEV", sentence: "Eleven lyssnar på läraren." },
            { word: "LÄRARE", sentence: "Läraren undervisar klassen." },
            { word: "PROV", sentence: "Vi har prov imorgon." },
            { word: "KURS", sentence: "Jag går en kurs i svenska." },
            { word: "LÄXA", sentence: "Gör din läxa efter skolan." },
            { word: "KLASS", sentence: "Hela klassen åkte på utflykt." }
        ]
    },
    {
        id: 'transport',
        name: 'Transport / المواصلات',
        icon: '🚌',
        background: 'linear-gradient(to right, #f6d365 0%, #fda085 100%)',
        accent: '#f59e0b',
        words: [
            { word: "BUSS", sentence: "Bussen är ett bra transportmedel." },
            { word: "TÅG", sentence: "Tåget rullar på rälsen." },
            { word: "BIL", sentence: "Bilen behöver bensin." },
            { word: "CYKEL", sentence: "Det är nyttigt att cykla." },
            { word: "RESA", sentence: "En resa vidgar vyerna." },
            { word: "VÄG", sentence: "Vägen är lång och krokig." },
            { word: "BRO", sentence: "Vi kör över en bro." },
            { word: "HJUL", sentence: "Hjulet snurrar fort." },
            { word: "SPÅR", sentence: "Följ spåret i snön." },
            { word: "FÄRJA", sentence: "Vi tog färjan över havet." }
        ]
    },
    {
        id: 'law',
        name: 'Lag & Rätt / القانون',
        icon: '⚖️',
        background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
        accent: '#4b5563',
        words: [
            { word: "LAG", sentence: "Lagen gäller för alla." },
            { word: "DOM", sentence: "Domstolen avkunnade sin dom." },
            { word: "RÄTT", sentence: "Gör det som är rätt." },
            { word: "POLIS", sentence: "Polisen skyddar samhället." },
            { word: "STRAFF", sentence: "Brott leder till straff." },
            { word: "ADVOKAT", sentence: "Advokaten försvarar sin klient." },
            { word: "BROTT", sentence: "Stöld är ett brott." },
            { word: "BEVIS", sentence: "Det finns bevis för brottet." },
            { word: "VITTNE", sentence: "Vittnet såg vad som hände." },
            { word: "LAGAR", sentence: "Vi måste följa landets lagar." }
        ]
    },
    {
        id: 'islam',
        name: 'Islam / الإسلام',
        icon: '☪️',
        background: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
        accent: '#10b981',
        words: [
            { word: "ALLAH", sentence: "Allah är barmhärtig." },
            { word: "BÖN", sentence: "Bönen ger ro i själen." },
            { word: "KORAN", sentence: "Koranen är en helig bok." },
            { word: "MOSKÉ", sentence: "Vi ber i moskén." },
            { word: "FASTA", sentence: "Vi fastar under Ramadan." },
            { word: "ZAKAT", sentence: "Zakat hjälper de fattiga." },
            { word: "HAJJ", sentence: "Hajj är en resa till Mecka." },
            { word: "IMAM", sentence: "Imamen leder bönen." },
            { word: "FRED", sentence: "Islam betyder fred." },
            { word: "DUA", sentence: "Gör dua för dina nära." }
        ]
    }
];

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);

if (!dictMatch) {
    console.error("Could not find WC_DICTIONARY");
    process.exit(1);
}

let WC_DICTIONARY;

try {
    eval('WC_DICTIONARY = ' + dictMatch[1]);
} catch (e) {
    console.error("Error parsing data:", e);
    process.exit(1);
}

console.log(`Loaded ${WC_THEMES.length} themes and ${WC_DICTIONARY.length} dictionary words.`);

const allDictWords = new Set(WC_DICTIONARY.map(w => w.w));
const newLevels = {};
let wordsAddedToDict = 0;

// 2. Process Themes
WC_THEMES.forEach((theme, themeIndex) => {
    const chapter = themeIndex + 1;
    console.log(`Processing Chapter ${chapter}: ${theme.name}`);

    theme.words.forEach((item, wordIndex) => {
        const levelId = `${chapter}-${wordIndex + 1}`;
        const mainWord = item.word.toUpperCase();

        // Add to dictionary if missing
        if (!allDictWords.has(mainWord)) {
            console.log(`  Adding missing word: ${mainWord}`);
            WC_DICTIONARY.push({
                w: mainWord,
                t: "TODO_TRANSLATION", // We don't have translation in theme, only sentence
                s: item.sentence,
                st: "TODO_ARABIC_SENTENCE"
            });
            allDictWords.add(mainWord);
            wordsAddedToDict++;
        }

        // Generate Level Data
        const letters = mainWord.split('');
        // Shuffle letters? No, the game shuffles them. We just provide the set.
        // But let's shuffle them here just in case to avoid giving the answer.
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }

        const subsets = getSubsets(mainWord);
        const validWords = subsets.filter(w => allDictWords.has(w));

        // Ensure main word is in validWords
        if (!validWords.includes(mainWord)) validWords.push(mainWord);

        // Sort valid words
        validWords.sort((a, b) => a.length - b.length || a.localeCompare(b));

        // Select target words (Words to find)
        // Heuristic: Main word + up to 4 other longest valid words
        let targetWords = [mainWord];
        const otherValid = validWords.filter(w => w !== mainWord).reverse(); // Longest first

        // Add a few others, preferably length >= 3
        for (const w of otherValid) {
            if (targetWords.length < 5 && w.length >= 2) {
                targetWords.push(w);
            }
        }

        // Sort target words by length for display
        targetWords.sort((a, b) => a.length - b.length);

        newLevels[levelId] = {
            letters: letters,
            words: targetWords,
            validWords: validWords
        };
    });
});

// 3. Update File Content

// Update WC_DICTIONARY
if (wordsAddedToDict > 0) {
    console.log(`Updating dictionary with ${wordsAddedToDict} new words...`);
    // Sort dictionary
    WC_DICTIONARY.sort((a, b) => a.w.localeCompare(b.w));

    const newDictStr = JSON.stringify(WC_DICTIONARY, null, 4);
    // We need to replace the array part.
    // The regex captured the array.
    fileContent = fileContent.replace(dictMatch[1], newDictStr);
}

// Update WC_PREDEFINED_LEVELS
console.log("Updating WC_PREDEFINED_LEVELS...");
let newLevelsStr = "const WC_PREDEFINED_LEVELS = {\n";
for (let i = 1; i <= 10; i++) {
    const themeName = WC_THEMES[i - 1].name;
    const icon = WC_THEMES[i - 1].icon;
    newLevelsStr += `\n    // ===========================================\n`;
    newLevelsStr += `    // CHAPTER ${i}: ${themeName} ${icon}\n`;
    newLevelsStr += `    // ===========================================\n`;

    for (let j = 1; j <= 10; j++) {
        const key = `${i}-${j}`;
        if (newLevels[key]) {
            newLevelsStr += `    "${key}": ${JSON.stringify(newLevels[key])},\n`;
        }
    }
}
newLevelsStr += "};";

// Find existing WC_PREDEFINED_LEVELS and replace it
const levelsRegex = /const WC_PREDEFINED_LEVELS = \{[\s\S]*?\};/;
if (levelsRegex.test(fileContent)) {
    fileContent = fileContent.replace(levelsRegex, newLevelsStr);
} else {
    console.error("Could not find WC_PREDEFINED_LEVELS to replace");
    // Append if not found? No, that's risky.
}

fs.writeFileSync(dataFilePath, fileContent);
console.log("Done! wordConnectData.js updated.");
