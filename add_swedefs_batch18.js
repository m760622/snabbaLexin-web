
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch18.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin014719": "Person som räknar ut hur byggnaden ska hålla",
    "Lexin014726": "Expert som hyrs in för ett uppdrag",
    "Lexin014727": "Rådgivning eller möte med expert",
    "Lexin014730": "Företag som säljer experttjänster",
    "Lexin014731": "Det jobb konsulten ska göra",
    "Lexin014793": "Som pågår hela tiden utan avbrott",
    "Lexin014810": "Skriftligt avtal mellan parter",
    "Lexin014811": "Arbete som utförs enligt ett kontrakt",
    "Lexin014812": "Summan som avtalats i kontraktet",
    "Lexin014814": "Dagen då kontraktet skrevs under",
    "Lexin014827": "Person som ser till att byggregler följs (KA)",
    "Lexin014831": "Tester för att se att allt är rätt",
    "Lexin014832": "Att titta efter så att det stämmer",
    "Lexin014837": "Dokument som visar vad som ska kontrolleras",
    "Lexin014970": "Träbit mellan reglar för att styva upp väggen",
    "Lexin014995": "Gissning av vad det kommer att kosta",
    "Lexin014997": "Att hålla koll på kostnaderna under projektet",
    "Lexin015022": "Påverkan som kan få något att röra sig eller gå sönder",
    "Lexin015048": "Stor maskin för att lyfta tunga saker högt",
    "Lexin015068": "Gränsen för vad som är godkänt",
    "Lexin015144": "Plan för hur man hanterar olyckor eller kriser",
    "Lexin015172": "Böjda metalldelar för att hänga saker på",
    "Lexin015231": "Att sönderdela sten eller betong",
    "Lexin015233": "Maskin som krossar sten till grus",
    "Lexin015269": "Grund där det finns ett lågt utrymme under golvet",
    "Lexin015373": "Tunnel för ledningar under marken",
    "Lexin015379": "Den som köper varan eller tjänsten",
    "Lexin015382": "De som svarar på kundernas frågor",
    "Lexin015464": "Målet för vilken kvalitet man vill nå",
    "Lexin015465": "Hur bra kvaliteten är",
    "Lexin015466": "Att se till att kvaliteten blir bra",
    "Lexin015494": "List formad som en kvarts cirkel",
    "Lexin015555": "Skåp eller system för att hålla mat kall",
    "Lexin015613": "Våning som ligger helt eller delvis under marken",
    "Lexin015616": "Ritning över källaren",
    "Lexin015663": "Behållare för vätska (t.ex. expansionskärl)",
    "Lexin015695": "Del av huset där värme läcker ut snabbare",
    "Lexin015740": "Delen av vägen där bilar kör",
    "Lexin015742": "Ett av spåren på vägen (fil)",
    "Lexin015778": "Färg som ger en hård och blank yta",
    "Lexin015781": "Träfiberskiva med lackad yta (används i inredning)",
    "Lexin015798": "Regel som bestämts av riksdagen",
    "Lexin015829": "Möte som leds av lagbasen (förmannen)",
    "Lexin015841": "Plats där man förvarar material",
    "Lexin015896": "Träskiva uppbyggd av stavar",
    "Lexin015897": "Material av flera tunna skikt (ofta plast/papper)",
    "Lexin015898": "Verktyg för att kapa laminatgolv",
    "Lexin015919": "Naturen och omgivningen runt bygget",
    "Lexin015952": "Person som mäter ut tomtgränser",
    "Lexin015975": "Signal som varnar för inbrott eller brand",
    "Lexin015979": "List där man kopplar in larmkablar",
    "Lexin015980": "Kabel till larmet",
    "Lexin015990": "Verktyg som använder ljusstråle för mätning",
    "Lexin015997": "Tyngd som en konstruktion utsätts för",
    "Lexin016002": "Maskiner som lastar material (hjullastare)",
    "Lexin016003": "Provbelastning för att se att det håller",
    "Lexin016004": "När belastningen ändras",
    "Lexin016005": "Genomskinlig färg som låter träet synas",
    "Lexin016012": "Gummi-material",
    "Lexin016013": "Mjuk fogmassa",
    "Lexin016014": "Färg som är vattenlöslig (väggfärg)",
    "Lexin016037": "Murblock av lättklinker (små lerkulor)",
    "Lexin016072": "Tid när man inte arbetar",
    "Lexin016080": "Hur ledningarna är dragna",
    "Lexin016090": "Stång att hålla sig i vid trappa",
    "Lexin016149": "Jordart med mycket små partiklar (tät)",
    "Lexin016151": "Bergart bildad av lera",
    "Lexin016170": "Att man kan lita på att varorna kommer",
    "Lexin016171": "Hur lång tid det tar att få varan",
    "Lexin016174": "Att bedöma hur bra en leverantör är",
    "Lexin016276": "Basiskt ämne (kalciumoxid)",
    "Lexin016280": "Mycket stark balk av hoplimmade brädor",
    "Lexin016305": "Golvmatta av naturmaterial",
    "Lexin016306": "Olja från linfrö (används till trä och färg)",
    "Lexin016377": "Det man hör",
    "Lexin016382": "Åtgärder för att stoppa buller",
    "Lexin016385": "Som minskar ljudnivån",
    "Lexin016399": "Hur ljust eller mörkt det är",
    "Lexin016427": "Panelbrädor med lockläkt över springorna",
    "Lexin016433": "Gångbana utomhus som leder till lägenhetsdörrar",
    "Lexin016441": "Planering av transporter och materialflöden",
    "Lexin016442": "Person som sköter logistiken",
    "Lexin016458": "Krav som gäller bara i kommunen",
    "Lexin016486": "Att ta av gods från lastbilen",
    "Lexin016537": "Maskin som ger tryckluft",
    "Lexin016550": "Värmepump som tar värme ur uteluften",
    "Lexin016575": "Papp som läggs under golv för att dämpa stegljud",
    "Lexin016660": "När man lyfter något tungt",
    "Lexin016665": "Maskin för tunga lyft",
    "Lexin016666": "Arbetet med att lyfta något specifikt",
    "Lexin016667": "Grejor man använder för att lyfta (stroppar, kätting)",
    "Lexin016737": "Vad som behövs på lång sikt",
    "Lexin016765": "Anordning för att låsa dörren",
    "Lexin016767": "Delen av låset som sitter inuti dörrbladet",
    "Lexin016790": "Var något, t.ex. huset, är placerat",
    "Lexin016792": "Bostad i ett flerfamiljshus",
    "Lexin016797": "Kontroll av att huset hamnat på rätt plats",
    "Lexin016860": "Träribbor som bär upp takpannorna",
    "Lexin016882": "Hur långt något är",
    "Lexin016962": "Betong som väger mindre och isolerar bättre (blåbetong/Leca)"
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
