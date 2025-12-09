
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch80.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin026221": "Baciller (stavformade bakterier)",
    "Lexin026245": "Clostridium tetani",
    "Lexin026247": "Att steloperera en led (frysa den)",
    "Lexin026263": "Förträngning i en kanal/kärl",
    "Lexin026279": "Oförmåga att få barn",
    "Lexin026281": "Förstoringsglas för hjärta/lungor",
    "Lexin026297": "Pirrande känsla (parestesi)",
    "Lexin026314": "Innerst av de tre hörselbenen",
    "Lexin026333": "Lite rörelse (orsakar sjukdom)",
    "Lexin026343": "Aktivera eller öka",
    "Lexin026388": "Påse på magen för avföring/urin",
    "Lexin026406": "Blodet går från hjärtat till kroppen och tillbaka",
    "Lexin026407": "Aorta",
    "Lexin026419": "Huvuddelen av hjärnan",
    "Lexin026506": "Bakterie som ger halsfluss m.m.",
    "Lexin026512": "Brott pga överbelastning (inte olycka)",
    "Lexin026548": "Propp eller blödning i hjärnan",
    "Lexin026549": "Hjärnblödning eller propp",
    "Lexin026561": "Förstorad sköldkörtel (i halsen)",
    "Lexin026570": "Larynx (där stämbanden sitter)",
    "Lexin026572": "Skydd som stänger luftstrupen vid sväljning",
    "Lexin026573": "Allvarlig infektion (barn - akut)",
    "Lexin026593": "Smärta som går nedåt (t.ex. i benet)",
    "Lexin026596": "Benet i underarmen på tumsidan",
    "Lexin026597": "Mängd strålning",
    "Lexin026612": "Sträcksår eller bensträckning",
    "Lexin026617": "Belagd tunga",
    "Lexin026822": "Ett av de tre hörselbenen",
    "Lexin026865": "Läpparna som gör ljud i strupen",
    "Lexin026926": "Bandage för stöd",
    "Lexin026927": "Bevis som stärker",
    "Lexin026929": "Ben, brosk, senor",
    "Lexin026965": "Sula som absorberar stötar",
    "Lexin026988": "Symtom som patienten berättar om (t.ex. smärta)",
    "Lexin026991": "Spruta under huden (t.ex. insulin)",
    "Lexin026994": "Under tungan (snabb upptagning)",
    "Lexin027014": "Blir sämre lite i taget",
    "Lexin027023": "Otydligt (syn)",
    "Lexin027040": "Hjälp att dra ut barnet vid förlossning",
    "Lexin027042": "Tablett man suger på (t.ex. hostpastill)",
    "Lexin027075": "Stolpiller",
    "Lexin027080": "Halsbränna",
    "Lexin027081": "Rapning med surt innehåll",
    "Lexin027100": "Med lågt pH",
    "Lexin027116": "Svag urinstråle",
    "Lexin027117": "Svårt att kissa med kraft",
    "Lexin027128": "Bakom munnen innan matstrupen",
    "Lexin027129": "Svalget",
    "Lexin027130": "Pharynx",
    "Lexin027131": "Ta prov från halsen för odling",
    "Lexin027137": "Blodvallning (värmeskov vid klimakteriet)",
    "Lexin027145": "Mikroorganism (candida, fotsvamp)",
    "Lexin027146": "Svampar (mikrorganismer)",
    "Lexin027147": "Infektion av svamp (candida)",
    "Lexin027148": "Svampinfektion i slidan",
    "Lexin027154": "Sista benet i ryggraden",
    "Lexin027155": "Kotorna längst ner i ryggraden",
    "Lexin027226": "Att svettas",
    "Lexin027236": "Att förlora medvetandet kortvarigt",
    "Lexin027248": "Influensa typ A (H1N1)",
    "Lexin027258": "Svullna körtlar (ofta vid infektion)",
    "Lexin027285": "Hur man sväljer",
    "Lexin027286": "Automatisk sväljning",
    "Lexin027287": "Dysfagi",
    "Lexin027289": "Gör att penis blir styv",
    "Lexin027357": "Lindrar symtom (inte botar)",
    "Lexin027368": "Klinik för synnedsättning",
    "Lexin027369": "Del av hjärnan som tolkar synen",
    "Lexin027379": "Förlust av synfält (hemianopsi)",
    "Lexin027386": "Dålig syn",
    "Lexin027410": "Inte naturligt - framställt kemiskt",
    "Lexin027422": "Kroppens pH-balans",
    "Lexin027423": "Antacida (t.ex. Novaluzid)",
    "Lexin027428": "Arterellt blod (rött)",
    "Lexin027429": "Att tillföra syre",
    "Lexin027430": "Få syre till kroppen",
    "Lexin027431": "Hur bra lungorna tar upp syre (VO2max)",
    "Lexin027461": "När hjärtat drar ihop sig (övre blodtrycket)",
    "Lexin027463": "Det övre trycket (övertrycket)",
    "Lexin027512": "Sår som blivit infekterat",
    "Lexin027513": "Byta förband på ett sår",
    "Lexin027516": "Hård yta på läkande sår",
    "Lexin027529": "Spermie",
    "Lexin027530": "Spermier",
    "Lexin027531": "Röret som spermier går genom (vas deferens)",
    "Lexin027533": "Ejakulation",
    "Lexin027612": "Vila i sängen",
    "Lexin027619": "Dåsig/okontaktbar",
    "Lexin027656": "Olika typer av boenden för äldre/funktionsnedsatta",
    "Lexin027673": "Bidrag för tandvård",
    "Lexin027674": "Specialuppdrag",
    "Lexin027685": "Barnet kommer med rumpan först",
    "Lexin027686": "Gluteus (skinkan)",
    "Lexin027734": "Snarkning med andningsuppehåll",
    "Lexin027857": "Körtlar som gör fett och svett",
    "Lexin027888": "Person som rensar tänder",
    "Lexin027892": "Köttet runt tänderna",
    "Lexin027899": "Bedömning av ålder utifrån tänder",
    "Lexin027902": "Karies",
    "Lexin027914": "Statligt bidrag till tandvård"
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
