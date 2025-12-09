
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch61.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin000424": "Infektioner som kommer plötsligt",
    "Lexin000427": "Avdelning på sjukhus för akuta skador",
    "Lexin000432": "Kanal mellan hjärnans hålrum",
    "Lexin000444": "Person som saknar pigment i huden",
    "Lexin000447": "Protein i blodet (viktigt för njurarna)",
    "Lexin000448": "Hormon som styr kroppens saltbalans",
    "Lexin000468": "Hur mycket alkohol man dricker",
    "Lexin000472": "Psykisk sjukdom orsakad av alkohol",
    "Lexin000495": "Ämne som framkallar allergi (t.ex. pollen)",
    "Lexin000509": "Besvär när man är allergisk",
    "Lexin000513": "Typiska tecken på allergi",
    "Lexin000534": "Hur man mår i allmänhet",
    "Lexin000543": "När man känner sig hängig och sjuk",
    "Lexin000545": "När man är svag i hela kroppen",
    "Lexin000553": "Behandling av hela kroppen (inte bara lokalt)",
    "Lexin000557": "Smittsam sjukdom som måste anmälas (t.ex. salmonella)",
    "Lexin000566": "Infektion i hela kroppen (sepsis)",
    "Lexin000594": "Symtom som märks i hela kroppen (t.ex. feber)",
    "Lexin000600": "Fysik och hälsa just nu",
    "Lexin000601": "Påverkan på hela kroppen",
    "Lexin000607": "Mat som innehåller allt kroppen behöver",
    "Lexin000642": "Farliga följder",
    "Lexin000650": "Skapa eller bilda",
    "Lexin000691": "Bil för sjuktransport",
    "Lexin000703": "Kroppens byggstenar (i proteiner)",
    "Lexin000712": "Att mata barnet med bröstmjölk",
    "Lexin000713": "Tiden då mamman ammar",
    "Lexin000728": "Att operera bort en kroppsdel (t.ex. ben)",
    "Lexin000735": "Enzym i saliven som bryter ner mat",
    "Lexin000736": "Svår magsjuka orsakad av amöbor",
    "Lexin000737": "Encelliga djur (parasiter)",
    "Lexin000741": "Livshotande allergisk reaktion",
    "Lexin000743": "Sex i analen eller munnen",
    "Lexin000745": "Smärtstillande medicin",
    "Lexin000750": "Undersökning av prov",
    "Lexin000756": "Ändtarmens öppning",
    "Lexin000766": "Läran om kroppens byggnad",
    "Lexin000767": "Förändringar i kroppens byggnad",
    "Lexin000803": "Luften man andas ut",
    "Lexin000814": "När man flåsar efter ansträngning",
    "Lexin000820": "Luft in och ut ur lungorna",
    "Lexin000821": "Lungor och luftvägar",
    "Lexin000822": "Antal andetag per minut",
    "Lexin000824": "Lungor, luftrör m.m.",
    "Lexin000826": "Svårt att andas",
    "Lexin000828": "När man inte får luft",
    "Lexin000829": "Andnöd",
    "Lexin000845": "Blodbrist (lågt Hb)",
    "Lexin000852": "Hur ofta anfallen kommer",
    "Lexin000853": "Det kommer och går (inte hela tiden)",
    "Lexin000854": "Ont som kommer i intervaller (t.ex. njursten)",
    "Lexin000879": "Röntgen av hjärnans blodkärl",
    "Lexin000880": "Röntgen av blodkärl med kontrast",
    "Lexin000889": "Hur smittsam bakterien är",
    "Lexin000893": "Går på och skadar (t.ex. virus)",
    "Lexin000896": "Som ligger bredvid",
    "Lexin000904": "Hoppackning av celler eller vätska",
    "Lexin000957": "Det man ärvt från föräldrar (gener)",
    "Lexin000962": "Skapa en öppning (t.ex. stomi)",
    "Lexin000989": "Sjukdomar som läkaren måste rapportera (smittskydd)",
    "Lexin001044": "Byggs på hög",
    "Lexin001046": "Klump eller samling",
    "Lexin001057": "Skelettet i ansiktet",
    "Lexin001059": "Skallen (främre delen)",
    "Lexin001102": "Att kissa på sig när man hostar/hoppar",
    "Lexin001161": "Mängd",
    "Lexin001172": "Medicin mot virus",
    "Lexin001174": "Penicillin m.m.",
    "Lexin001175": "Kur med antibiotika",
    "Lexin001176": "Ämnen som dödar bakterier",
    "Lexin001177": "Medicin mot depression (Lyckopiller)",
    "Lexin001178": "SSRI-preparat m.m.",
    "Lexin001179": "Hormon som sparar vatten i kroppen",
    "Lexin001180": "Ämne som kroppen bildar antikroppar mot",
    "Lexin001181": "Allergimedicin",
    "Lexin001183": "Behandling som stoppar hormoner (vid cancer)",
    "Lexin001184": "Vanliga värktabletter (t.ex. Ipren/Voltaren)",
    "Lexin001190": "Kroppens försvarsprotein",
    "Lexin001191": "Immunförsvarets vapen mot smitta",
    "Lexin001196": "Ämne som skyddar cellerna (finns i frukt)",
    "Lexin001199": "Medicin mot hepatit/MS",
    "Lexin001212": "Rumpan (öppningen)",
    "Lexin001231": "Stora kroppspulsådern",
    "Lexin001232": "Böjen på stora kroppspulsådern",
    "Lexin001247": "Slaganfall (Stroke)",
    "Lexin001251": "Affär som säljer medicin",
    "Lexin001253": "Instrument",
    "Lexin001258": "Blindtarmsinflammation",
    "Lexin001263": "Smetas på huden (t.ex. salva)",
    "Lexin001278": "Lust att äta",
    "Lexin001286": "Hinnan runt hjärnan (mellersta)",
    "Lexin001301": "EKG när man cyklar (belastning)",
    "Lexin001302": "När hjärtat drar ihop sig och pumpar",
    "Lexin001377": "När man är för sjuk för att jobba",
    "Lexin001459": "Pulsådern i överarmen",
    "Lexin001468": "Pulsådern vid lillfingersidan",
    "Lexin001469": "Leden mellan överarm och underarm",
    "Lexin001470": "Armbågen",
    "Lexin001491": "Gropen under armen",
    "Lexin001492": "Armhålor (plural)"
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
