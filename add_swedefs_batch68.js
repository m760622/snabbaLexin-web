
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch68.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin007547": "Vävnad som lagrar fett",
    "Lexin007553": "Trådar (t.ex. i muskler eller mat)",
    "Lexin007554": "Protein i blodet som behövs för levring",
    "Lexin007559": "När det bildas en ficka (t.ex. tandköttsficka)",
    "Lexin007561": "Klaffar i hjärtat som liknar fickor",
    "Lexin007614": "När vätska renas genom ett filter",
    "Lexin007615": "Hur bra njurarna renar blodet",
    "Lexin007620": "För trång förhud",
    "Lexin007641": "Göra till småbitar",
    "Lexin007648": " Fingertoppen",
    "Lexin007653": "Delarna längst ut på handen",
    "Lexin007673": "Akne",
    "Lexin007725": "När man sätter fast något (t.ex. fixerar en fraktur)",
    "Lexin007742": "Som studsar tillbaka (elastisk)",
    "Lexin007749": "När huden lossnar i små bitar",
    "Lexin007750": "Som lossnar i flagor",
    "Lexin007751": "Eksem där huden lossnar",
    "Lexin007752": "När huden byts ut",
    "Lexin007755": "Ett av hålrummen i hjärnan med vätska",
    "Lexin007760": "Att se bra på långt håll (översynthet)",
    "Lexin007780": "Parasit som ger underlivsinfektion",
    "Lexin007786": "När huden ramlar av (t.ex. efter solbränna)",
    "Lexin007817": "Djur och växter (allt utom bakterier/amöbor)",
    "Lexin007822": "Nyttigaste fettet (från fisk)",
    "Lexin007836": "Små hår i luftrören som transporterar slem",
    "Lexin007837": "Hår på celler som rör sig",
    "Lexin007864": "Alla bakterier som finns normalt (t.ex. tarmflora)",
    "Lexin007879": "Man ser prickar framför ögonen (glaskroppsgrumlingar)",
    "Lexin007934": "Mixtur",
    "Lexin007935": "Blod och lymfa",
    "Lexin007936": "Vävnader som rinner",
    "Lexin007940": "Rinner (vätska)",
    "Lexin007942": "Vätska från underlivet",
    "Lexin007967": "Här och där",
    "Lexin007986": "Något är i vägen för flödet",
    "Lexin007996": "Torr och lite trasig (om hud)",
    "Lexin007997": "Torr hud",
    "Lexin008018": "Skarvar mellan benen i skallen",
    "Lexin008019": "Leder som inte rör sig mycket",
    "Lexin008024": "När bäckenet mjukas upp vid graviditet (gör ont)",
    "Lexin008042": "Hur hela befolkningen mår",
    "Lexin008043": "Sjukdomar som många har (t.ex. fetma)",
    "Lexin008065": "Tandvård som regionen driver",
    "Lexin008068": "Hormon som styr ägg och spermier",
    "Lexin008069": "Äggblåsor i äggstocken",
    "Lexin008075": "Hur mycket luft man kan blåsa ut snabbt (astmatest)",
    "Lexin008088": "Kräver",
    "Lexin008101": "Bindväv som har en speciell form (senor m.m.)",
    "Lexin008116": "När något ser annorlunda ut",
    "Lexin008143": "Transporteras",
    "Lexin008153": "Skicka signaler vidare",
    "Lexin008154": "Leder vidare",
    "Lexin008155": "Lever vidare",
    "Lexin008158": "Fortsätter",
    "Lexin008160": "Skaffar barn",
    "Lexin008161": "Reproduktion",
    "Lexin008162": "Det att skaffa barn",
    "Lexin008163": "Könsorganen",
    "Lexin008164": "Fertilitet (att kunna få barn)",
    "Lexin008166": "Sjukdom som blir värre med tiden (progressiv)",
    "Lexin008177": "Salt som finns i skelettet",
    "Lexin008179": "Grundämne viktigt för skelettet",
    "Lexin008185": "Barnet i magen (efter vecka 9)",
    "Lexin008186": "Det ofödda barnet",
    "Lexin008188": "Blodet hos fostret",
    "Lexin008189": "Undersökningar av fostret (ultraljud/KUB)",
    "Lexin008192": "Hinnan runt fostret",
    "Lexin008193": "Hinnorna",
    "Lexin008197": "Medfödda fel hos barnet",
    "Lexin008198": "Skador som skett i magen",
    "Lexin008199": "Tiden i magen",
    "Lexin008200": "Hur barnet växer i magen",
    "Lexin008201": "Utvecklingen innan födseln",
    "Lexin008202": "Vätskan som fostret ligger i",
    "Lexin008203": "Prov från fostervattnet (för att se kromosomfel)",
    "Lexin008204": "Vattnet i livmodern",
    "Lexin008208": "Delen man går på",
    "Lexin008214": "Musklerna som styr foten",
    "Lexin008219": "Leden mellan benet och foten",
    "Lexin008235": "Bakre delen av foten",
    "Lexin008236": "Benen i fotroten",
    "Lexin008241": "Under foten",
    "Lexin008242": "Undersidan av foten",
    "Lexin008248": "När något går sönder i småbitar",
    "Lexin008270": "Fött fram",
    "Lexin008279": "Riktning (anteriort-posteriort)",
    "Lexin008280": "Starta eller orsaka",
    "Lexin008285": "Ger upphov till",
    "Lexin008301": "När sjukdomen gått långt",
    "Lexin008322": "På framsidan",
    "Lexin008326": "Tydlig",
    "Lexin008330": "Tänderna i mitten fram",
    "Lexin008332": "Riktning fram",
    "Lexin008363": "Hur ofta något händer",
    "Lexin008406": "Släpps lös",
    "Lexin008423": "Kort som visar att man nått högkostnadsskyddet",
    "Lexin008428": "Motstånd när ytor glider mot varandra",
    "Lexin008475": "Utsöndringen",
    "Lexin008509": "Främre delen av hjärnan (personlighet/omdöme)",
    "Lexin008510": "Demens som drabbar personligheten först"
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
