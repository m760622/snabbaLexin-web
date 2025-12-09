
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch20.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin020235": "Golv av trästavar i mönster",
    "Lexin020265": "Samarbetsform där beställare och entreprenör jobbar mot gemensamma mål",
    "Lexin020302": "Hus som värms upp av de boende och solen (utan radiatorer)",
    "Lexin020348": "Lagen som styr hur man får bygga i Sverige",
    "Lexin020353": "Förordning med detaljerade regler om byggande",
    "Lexin020371": "Lodrätt stöd som bär upp tak eller balk",
    "Lexin020373": "Bränsle av sammanpressat sågspån",
    "Lexin020398": "Redskap med borst för målning",
    "Lexin020450": "Styrning och uppföljning av resultat mot mål",
    "Lexin020461": "När vatten rinner ner genom jorden",
    "Lexin020492": "Chef för personalfrågor",
    "Lexin020493": "Enhet som sköter löner och anställningar",
    "Lexin020494": "Högste ansvarig för personalen",
    "Lexin020499": "Hur många som slutar och börjar på företaget",
    "Lexin020500": "Företagets regler kring personal",
    "Lexin020517": "Vad individen behöver",
    "Lexin020651": "Var något ställs eller byggs",
    "Lexin020665": "Horisontell yta eller ritning sedd uppifrån",
    "Lexin020668": "Avgift för kommunens planarbete",
    "Lexin020671": "Person som arbetar med samhällsplanering",
    "Lexin020673": "Förberedelse och strukturering av arbetet",
    "Lexin020674": "Beskrivning av hur planeringen ska gå till",
    "Lexin020676": "Att hyvla virke så sidorna blir släta",
    "Lexin020678": "Tjockare bräda (över 45 mm)",
    "Lexin020682": "Arbetet att ta fram detaljplaner",
    "Lexin020686": "Ritning som visar våningsplanet uppifrån",
    "Lexin020697": "Syntetiskt material (polymer)",
    "Lexin020711": "Chef för ett specifikt bygge",
    "Lexin020713": "Undersökning av marken innan man bygger",
    "Lexin020716": "Bjälklag utan balkar (flat slab)",
    "Lexin020718": "Grundläggning med betongplatta direkt på marken",
    "Lexin020725": "Hantverkare som sätter kakel och klinker",
    "Lexin020769": "Höjd över en nollnivå (ofta havsnivån)",
    "Lexin020775": "Kryssfanér (skiva av limmade träfanér)",
    "Lexin020786": "Tunt valsatt stål för tak eller beslag",
    "Lexin020788": "Profil av plåt för väggreglar",
    "Lexin020921": "Vanligaste typen av cement",
    "Lexin020930": "Mjuk fiberskiva för anslagstavlor eller isolering",
    "Lexin020989": "Person som gör praktik",
    "Lexin021000": "Konkreta råd för hur man ska göra",
    "Lexin021025": "Byggande med förtillverkade delar",
    "Lexin021026": "Tillverkad i fabrik för montering på plats",
    "Lexin021090": "Hur bra en maskin eller ett material fungerar",
    "Lexin021111": "Mark som inte får bebyggas (enligt detaljplan)",
    "Lexin021129": "Energi i sin ursprungliga form (t.ex. olja i marken)",
    "Lexin021130": "Grundkarta över kommunen",
    "Lexin021149": "Vad något kostar",
    "Lexin021154": "Närkostnaden ökar",
    "Lexin021155": "Att bestämma vad det ska kosta",
    "Lexin021157": "Offert eller anbud",
    "Lexin021167": "Privatpersoner som köper tjänster",
    "Lexin021212": "Tillverkning eller byggande",
    "Lexin021213": "Chef över produktionen",
    "Lexin021214": "Ingenjör som planerar produktionen",
    "Lexin021215": "Beräkning av kostnaden för att producera",
    "Lexin021216": "Arbetsledare i produktionen",
    "Lexin021217": "Planering och styrning av tillverkningen",
    "Lexin021220": "Hur mycket som produceras per timme",
    "Lexin021240": "Beräkning av framtiden",
    "Lexin021260": "Tillfälligt arbete med start och slut",
    "Lexin021261": "När man åker ut och tittar på bygget",
    "Lexin021262": "Högste ansvarig för ett projekt",
    "Lexin021263": "Att planera och rita huset",
    "Lexin021266": "Arbetet med ritningar och beskrivningar",
    "Lexin021268": "Ingenjör som jobbar i projektform",
    "Lexin021271": "Ledare för projektgruppen",
    "Lexin021273": "När projektet är färdigt",
    "Lexin021274": "Tidsplan för projektet",
    "Lexin021275": "Utveckling av fastighetsprojekt",
    "Lexin021341": "Skriftlig sammanfattning av möte eller beslut",
    "Lexin021451": "Som rör både psyke och social miljö",
    "Lexin021533": "Dorn för att slå in spikskallar",
    "Lexin021548": "Ytskikt av bruk på vägg",
    "Lexin021549": "Vägg täckt med puts",
    "Lexin021553": "Vanlig plast i rör och mattor (Polyvinylklorid)",
    "Lexin021607": "Som håller på just nu",
    "Lexin021608": "Arbeten som inte är klara",
    "Lexin021623": "Att slå ner pålar i marken för stabil grund",
    "Lexin021624": "Konstruktion av pålar",
    "Lexin021667": "Effekt på omvärlden",
    "Lexin021715": "Hus som sitter ihop med grannens hus på sidorna",
    "Lexin021716": "Element för vattenburen värme",
    "Lexin021730": "Radioaktiv gas som kan finnas i mark eller blåbetong",
    "Lexin021774": "Konstruktion som omsluter något",
    "Lexin021788": "Lutande väg för bilar eller rullstolar",
    "Lexin021794": "Bärande system av balkar och pelare",
    "Lexin021824": "Tunt lager puts (grundning)",
    "Lexin021828": "Information om hur det går",
    "Lexin021870": "Betyg på kreditvärdighet eller miljö",
    "Lexin021996": "Trästav i väggkonstruktion (45mm tjock)",
    "Lexin021998": "Återkommande med jämna mellanrum",
    "Lexin022024": "Geografiskt område",
    "Lexin022027": "Chef för en region",
    "Lexin022028": "Ekonomiansvarig för regionen",
    "Lexin022056": "De vertikala träbitarna i en vägg",
    "Lexin022096": "Förslag på vad man bör göra",
    "Lexin022135": "Ritning som visar hur det faktiskt blev byggt",
    "Lexin022188": "Bygga om eller fräscha upp gammalt hus",
    "Lexin022201": "Laga något som är trasigt",
    "Lexin022202": "Bruk för att laga skador i betong"
};

let count = 0;
dictionaryData.forEach(entry => {
    if (updates[entry[0]]) {
        entry[5] = updates[entry[0]];
        count++;
    }
});

console.log(`Updated ${count} entries.`);
const newContent = `const dictionaryData = ${JSON.stringify(dictionaryData, null, 2)};`;
fs.writeFileSync(dataPath, newContent, 'utf8');
fs.unlinkSync(tempFile);
