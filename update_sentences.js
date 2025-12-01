const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

// Hardcoded themes (Same as in generate_levels_from_themes.js)
const WC_THEMES = [
    {
        id: 'food',
        name: 'Mat & Dryck / الطعام والشراب',
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

// Extract WC_DICTIONARY
const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
if (!dictMatch) {
    console.error("Could not find WC_DICTIONARY");
    process.exit(1);
}

let WC_DICTIONARY;
try {
    eval('WC_DICTIONARY = ' + dictMatch[1]);
} catch (e) {
    console.error("Error parsing dictionary:", e);
    process.exit(1);
}

let updatedCount = 0;

// Iterate through themes and update dictionary
WC_THEMES.forEach(theme => {
    theme.words.forEach(item => {
        const entry = WC_DICTIONARY.find(e => e.w === item.word);
        if (entry) {
            // Update sentence if it's missing or TODO
            // Or just update it always to match the theme
            if (entry.s !== item.sentence) {
                console.log(`Updating sentence for ${item.word}:`);
                console.log(`  Old: ${entry.s}`);
                console.log(`  New: ${item.sentence}`);
                entry.s = item.sentence;
                updatedCount++;
            }
        } else {
            console.warn(`Word not found in dictionary: ${item.word}`);
        }
    });
});

if (updatedCount > 0) {
    console.log(`Updating dictionary with ${updatedCount} sentence updates...`);
    // Sort dictionary
    WC_DICTIONARY.sort((a, b) => a.w.localeCompare(b.w));

    const newDictStr = JSON.stringify(WC_DICTIONARY, null, 4);
    fileContent = fileContent.replace(dictMatch[1], newDictStr);

    fs.writeFileSync(dataFilePath, fileContent);
    console.log("Done! wordConnectData.js updated.");
} else {
    console.log("No sentence updates needed.");
}
