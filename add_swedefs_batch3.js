
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch3.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin029536": "Upptäcka; lista ut något dolt (komma underfund med)",
    "Lexin029729": "Ända (i uttrycket 'upp till')",
    "Lexin029730": "Riktning mot högre höjd (i uttrycket 'upp mot')",
    "Lexin030124": "Utvändigt; på utsidan",
    "Lexin030516": "Frågeord för sak eller händelse",
    "Lexin030754": "På olika ställen; lite varstans",
    "Lexin030896": "Faktiskt; i sanning",
    "Lexin031976": "Denna tid på året (i uttrycket 'så här års')",
    "Lexin032470": "På ovansidan av; mer än",
    "Lexin032504": "Ut ur båten och ner i vattnet",
    "Lexin032654": "Ekonomisk kollaps (gå överstyr)",
    "Lexin012999": "Förstörd genom slag; krossad",
    // Arbetsmarknad Terms - Arabic translation is often literal. Swedef should be explanatory
    "Lexin034237": "System som ger ekonomiskt stöd vid arbetslöshet",
    "Lexin034238": "Skada eller sjukdom orsakad av arbetet",
    "Lexin001933": "Anläggning för rening av avloppsvatten",
    "Lexin003158": "Byggkomponent gjuten i betong",
    "Lexin003937": "Metod för att undersöka berggrunden via borrhål",
    "Lexin004151": "Utbildning till yrken där det saknas arbetskraft",
    "Lexin010872": "Behörighet att studera vidare efter gymnasiet",
    "Lexin031811": "Kurs som förbereder inför ett yrke",
    "Lexin031829": "Erfarenhet av att utföra ett visst arbete",
    "Lexin000359": "Studier vid högskola eller universitet",
    "Lexin000528": "Rätt att söka till högre utbildning",
    "Lexin000577": "Baskunskaper om omvärlden",
    "Lexin000834": "Alternativa studievägar eller inriktningar",
    "Lexin001333": "De som anställer personal (organisation)",
    "Lexin001355": "Marknaden där arbete köps och säljs",
    "Lexin001941": "Genomföra prov för behörighet till högskola",
    "Lexin003366": "Person som reparerar bilar",
    "Lexin004106": "Utbildning som täcker många områden",
    "Lexin004634": "Mindre samhälle på landsbygden (här kanske specifikt byggterm?)",
    "Lexin005222": "Högskolans olika avdelningar för ämnesområden",
    "Lexin005422": "Bästa sättet att kontakta mig",
    "Lexin005428": "Det är tänkt att; planen är att",
    "Lexin006442": "Ekonomiska och handelsrelaterade ämnen",
    "Lexin006615": "Många olika spännande maträtter (fras)",
    "Lexin006932": "Anställning där arbetstiden är på kvällen",
    "Lexin007680": "Något som du är intresserad av (fras)",
    "Lexin008168": "Studera vidare på högre nivå",
    "Lexin008484": "Ledare för fritidsverksamhet",
    "Lexin010722": "Godkänd utbildning motsvarande grundskolan",
    "Lexin010725": "Den första nivån av akademisk utbildning",
    "Lexin010874": "Gymnasieutbildningens syfte",
    "Lexin010876": "Studier på gymnasienivå",
    "Lexin010928": "Det går långsamt/dåligt (om process)",
    "Lexin011252": "Vi har för tillfället",
    "Lexin011807": "Mycket länge; obegränsad tid",
    "Lexin012194": "Klara av studietakten; förstå undervisningen",
    "Lexin012324": "Eftergymnasiala studier",
    "Lexin012345": "Som har lång akademisk utbildning"
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
