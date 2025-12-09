
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch70.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin009811": "Minska i storlek och kraft (om muskler)",
    "Lexin009813": "När något krymper (atrofi)",
    "Lexin009814": "Sjukdom där muskler/organ förtvinar",
    "Lexin009911": "Sammandragningar innan förlossningen startar på riktigt",
    "Lexin009918": "Immunitet man fått efter sjukdom eller vaccin",
    "Lexin009944": "Kurs för blivande föräldrar",
    "Lexin009954": "Få ungar/barn",
    "Lexin009984": "Vätska från levern som hjälper matsmältningen",
    "Lexin009985": "Vätskan galla",
    "Lexin009986": "Produktion av galla",
    "Lexin009987": "Organet som lagrar galla",
    "Lexin009988": "Gången från gallblåsan",
    "Lexin009989": "Inflammation i gallblåsan (gör ont under höger revben)",
    "Lexin009995": "Bilirubin (gör avföringen brun)",
    "Lexin009996": "Rör som leder galla till tarmen",
    "Lexin009997": "Infektion i gallgångarna",
    "Lexin009998": "Sjukdom i gallan",
    "Lexin009999": "De minsta gallgångarna i levern",
    "Lexin010005": "Mycket ont i magen pga gallsten",
    "Lexin010006": "Operation där man tar bort gallblåsan",
    "Lexin010008": "Hela systemet med gallgångar",
    "Lexin010009": "Sjukdom hos kor som kan smitta människor (hjärnan)",
    "Lexin010020": "Antikroppar man kan få som spruta",
    "Lexin010025": "Nervknutar",
    "Lexin010026": "Kallbrand (när vävnad dör)",
    "Lexin010059": "Som skapar gas (t.ex. bönor)",
    "Lexin010060": "Att ha mycket luft i magen",
    "Lexin010062": "Tygbit att lägga på sår",
    "Lexin010063": "Fisar och rap",
    "Lexin010064": "Gaser",
    "Lexin010070": "Magkatarr",
    "Lexin010071": "Magsjuka",
    "Lexin010072": "Läran om mag- och tarmsjukdomar",
    "Lexin010074": "Undersökning av magsäcken med kamera",
    "Lexin010075": "När syre kommer in och koldioxid ut (i lungorna)",
    "Lexin010086": "Starta",
    "Lexin010093": "Gelé",
    "Lexin010095": "Vätskan mellan cellerna",
    "Lexin010107": "Huvudgallgången",
    "Lexin010115": "Arvsanlag (DNA-bit)",
    "Lexin010152": "Ärftlighetslära",
    "Lexin010162": "Herpes i underlivet",
    "Lexin010171": "Hål rakt igenom (t.ex. magsäcken)",
    "Lexin010181": "Som påverkar mycket",
    "Lexin010183": "Vara med om",
    "Lexin010188": "Gå tvärs över",
    "Lexin010194": "Låter igenom (läcker)",
    "Lexin010196": "Medelålder",
    "Lexin010204": "Att ändra i DNA",
    "Lexin010227": "Visar sig",
    "Lexin010229": "Orsakar",
    "Lexin010231": "Äldrevård",
    "Lexin010243": "Stick av insekt",
    "Lexin010256": "Farliga ämnen",
    "Lexin010260": "Gift",
    "Lexin010263": "Dit man ringer om man ätit gift",
    "Lexin010268": "Sjukdom med för mycket sköldkörtelhormon",
    "Lexin010269": "Överfunktion i sköldkörteln",
    "Lexin010290": "Gips (för benbrott)",
    "Lexin010291": "Gipsat ben/arm",
    "Lexin010338": "Körteln på halsen som styr ämnesomsättningen",
    "Lexin010339": "Små körtlar bakom sköldkörteln (styr kalk)",
    "Lexin010351": "Geléklumpen inuti ögat",
    "Lexin010358": "Synhjälpmedel",
    "Lexin010361": "Muskler vi inte kan styra (tarmar/kärl)",
    "Lexin010362": "Högt tryck i ögat (skadar synnerven)",
    "Lexin010363": "Grön starr",
    "Lexin010366": "Stödceller i hjärnan",
    "Lexin010378": "Proteiner i blodet (vissa är antikroppar)",
    "Lexin010379": "Njurinflammation",
    "Lexin010380": "Nystan av blodkärl i njuren (renar blodet)",
    "Lexin010386": "Hormon som höjer blodsockret (spruta vid kris)",
    "Lexin010387": "Lagrat socker i levern (glykogen)",
    "Lexin010388": "Druvsocker",
    "Lexin010390": "Socker i urinen (tecken på diabetes)",
    "Lexin010392": "Glukosbelastning (dricka sockerlösning)",
    "Lexin010396": "Protein i vete/råg/korn",
    "Lexin010400": "Socker",
    "Lexin010409": "Blank",
    "Lexin010467": "Tumör som inte sprider sig",
    "Lexin010468": "Snäll tumör",
    "Lexin010469": "Ofarlig",
    "Lexin010495": "Postkontoret i cellen (sorterar proteiner)",
    "Lexin010506": "Taket i munnen",
    "Lexin010508": "Bågarna längst bak i munnen",
    "Lexin010509": "Klump av lymfvävnad i halsen (tonsiller)",
    "Lexin010510": "Hårda och mjuka gommen",
    "Lexin010511": "Munhålans tak",
    "Lexin010512": "När gommen inte växt ihop (missbildning)",
    "Lexin010513": "Lilla tappen i halsen",
    "Lexin010514": "Bakterier som ger gonorré",
    "Lexin010515": "Bakterien",
    "Lexin010516": "Smittämnen",
    "Lexin010518": "Könssjukdom (droppert)",
    "Lexin010552": "Stort epilepsianfall (kramper och medvetslöshet)",
    "Lexin010567": "En sorts vita blodkroppar",
    "Lexin010568": "Vita blodkroppar med korn i",
    "Lexin010591": "Att vänta barn",
    "Lexin010595": "Stickan man kissar på",
    "Lexin010596": "Vilken vecka man är gravid i"
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
console.log("Writing data.js...");
fs.writeFileSync(dataPath, newContent, 'utf8');
fs.unlinkSync(tempFile);
console.log("Done.");
