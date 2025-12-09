
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch4.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin012684": "Utbildningsprogram anpassade för den enskilde eleven",
    "Lexin012696": "Teknik inom industrin",
    "Lexin013354": "Ha anställning vid en cirkus",
    "Lexin013453": "Avdelning på universitet för juridikstudier",
    "Lexin014542": "Läsa in betyg man saknar från grundskolan",
    "Lexin014709": "Som har talang eller intresse för konst",
    "Lexin015396": "Förmåga att tala och förstå svenska",
    "Lexin015426": "De specifika delarna av en utbildning",
    "Lexin015541": "Kurs som hålls på kvällstid",
    "Lexin015543": "Arbetspass som infaller på kvällen",
    "Lexin016069": "Obestatta tjänster; jobb som går att söka",
    "Lexin016221": "Finns tillgänglig på webben",
    "Lexin016457": "Utbildningsinriktningar som är specifika för en viss skola/ort",
    "Lexin016798": "Situationen är svår (ofta om ekonomi/arbetsmarknad)",
    "Lexin017941": "Person som hjälper elever att utveckla sitt modersmål",
    "Lexin018574": "Gymnasieprogram som finns i hela landet",
    "Lexin018599": "Område som rör natur och miljö",
    "Lexin018895": "Nytryck of böcker eller material",
    "Lexin020709": "Arbetsförmedlingens webbplats för jobbannonser",
    "Lexin020997": "Utbildning som blandar praktik och teori",
    "Lexin020998": "Utbildning som blandar praktik och teori",
    "Lexin020999": "Utbildning med fokus på praktiska moment",
    "Lexin021001": "Yrkesutbildning med mycket praktik",
    "Lexin021002": "Nästan helt och hållet (i praktiken)",
    "Lexin021580": "På ett eller annat vis",
    "Lexin021584": "I ett längre tidsperspektiv",
    "Lexin021907": "Som utgår från verkligheten; genomförbara",
    "Lexin022316": "Verksamhetsområde för restauranger",
    "Lexin022317": "Köket på en restaurang",
    "Lexin022465": "System som gäller för hela landet",
    "Lexin023952": "Vara i skolan utan att göra nytta (slang/uttryck)",
    "Lexin024164": "Göra vad som krävs för att bli behörig",
    "Lexin024565": "Skriva ut instruktioner på papper",
    "Lexin024886": "Inte uppfört sig väl",
    "Lexin025766": "Studierna fokuseras på specifika ämnen",
    "Lexin025778": "Program som är skräddarsydda för särskilda behov",
    "Lexin025804": "Dumma sig; vara clown",
    "Lexin026662": "Val av studier och framtida yrke",
    "Lexin026667": "Det specifika område man studerar",
    "Lexin026677": "Betyg eller omdömen från studier",
    "Lexin026718": "Hamnarbetare som lastar och lossar fartyg",
    "Lexin026823": "Arbete som lokalvårdare",
    "Lexin027202": "Färdigheter i svenska språket",
    "Lexin027418": "Studie- och yrkesvägledare",
    "Lexin027654": "Specifika krav för att komma in på en utbildning",
    "Lexin027714": "Söka information inuti något",
    "Lexin027715": "Rekrytera rätt personer för jobbet",
    "Lexin027718": "Databas med arbetssökande (historisk term)",
    "Lexin027771": "Utnyttja möjligheten att utbilda sig",
    "Lexin027772": "Klara av gymnasiet",
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
