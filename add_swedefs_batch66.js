
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch66.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin005266": "När diskarna i ryggen blir platta och dåliga",
    "Lexin005311": "En del av symtomen (inte alla)",
    "Lexin005352": "Utskott på nervcellen som tar emot signaler",
    "Lexin005366": "Plåster som ger medicin långsamt genom huden",
    "Lexin005373": "Nedstämdhet (psykisk sjukdom)",
    "Lexin005374": "Lättare depression (ångest)",
    "Lexin005379": "Fettreservern i kroppen",
    "Lexin005382": "Hudinflammation (eksem)",
    "Lexin005383": "Läran om huden och dess sjukdomar",
    "Lexin005416": "När vävnad förstörs",
    "Lexin005420": "Hjärna och ryggmärg",
    "Lexin005423": "Riskfaktorer för hjärtat (fetma, högt tryck m.m.)",
    "Lexin005424": "Nerverna ute i kroppen",
    "Lexin005438": "Skärpa (att se klart)",
    "Lexin005452": "Sjukdom där man kissar enorma mängder (hormonbrist)",
    "Lexin005453": "Diabetes (för högt blodsockerr)",
    "Lexin005454": "Medvetslöshet pga diabetes",
    "Lexin005457": "Svårläkta sår på fötterna vid diabetes",
    "Lexin005461": "Muskeln som sköter andningen",
    "Lexin005471": "Rening av blodet med maksin",
    "Lexin005483": "Lös mage",
    "Lexin005485": "När hjärtat vilar och fylls med blod",
    "Lexin005487": "Undertrycket (det låga värdet)",
    "Lexin005489": "Del av hjärnan (talamus/hypotalamus)",
    "Lexin005498": "När celler utvecklas till olika typer",
    "Lexin005499": "Hur lik cancercellen är en frisk cell",
    "Lexin005502": "Otydlig eller utspridd",
    "Lexin005578": "Stötdämpare mellan kotorna",
    "Lexin005584": "När disken går sönder och trycker på en nerv",
    "Lexin005634": "Stukning",
    "Lexin005647": "Sjuksköterska på vårdcentralen",
    "Lexin005661": "Fickor på tarmen",
    "Lexin005671": "Avstånd inåt",
    "Lexin005673": "Stora förändringar",
    "Lexin005678": "Pälsdjursallergi",
    "Lexin005681": "Veterinärklinik",
    "Lexin005694": "Arvsmassan",
    "Lexin005696": "Byggstenar i DNA",
    "Lexin005698": "Den kemiska beteckningen för DNA",
    "Lexin005750": "Anlag som bestämmer (slår ut andra)",
    "Lexin005760": "När det känner 'sovande' i en kroppsdel",
    "Lexin005787": "Gåva (t.ex. organ)",
    "Lexin005788": "Kort där man säger JA till organ donering",
    "Lexin005789": "Där man anmäler om man vill donera organ",
    "Lexin005790": "Den som ger organ eller blod",
    "Lexin005793": "Grejer",
    "Lexin005795": "Signalämne i hjärnan (belöning)",
    "Lexin005799": "Olagliga medel för att bli starkare",
    "Lexin005800": "Att fusk med droger i sport",
    "Lexin005816": "Cell som bildats vid delning",
    "Lexin005817": "När cancern sprider sig",
    "Lexin005818": "Metastaser",
    "Lexin005823": "Få en sjukdom",
    "Lexin005902": "Vatten man kan dricka",
    "Lexin005942": "Näring eller medicin direkt i blodet",
    "Lexin005948": "Smitta via hosta/nysning",
    "Lexin005966": "Allt man dricker",
    "Lexin005973": "Rinna långsamt",
    "Lexin006030": "Att få en ny sjukdom när man redan är sjuk",
    "Lexin006033": "När man ser två bilder",
    "Lexin006034": "På båda sidor (bilateral)",
    "Lexin006036": "Med två lager vägg",
    "Lexin006044": "Asylsökande som ska tillbaka till första EU-landet",
    "Lexin006087": "Tarmen precis efter magsäcken",
    "Lexin006091": "Hårda hjärnhinnan (ytterst)",
    "Lexin006109": "Att man är mycket kortväxt",
    "Lexin006142": "Svår magsjuka med blodig diarré",
    "Lexin006143": "Orolig mage / magkatarr",
    "Lexin006165": "Djur som diar sina ungar (t.ex. människor)",
    "Lexin006167": "Lugnande medicin",
    "Lexin006183": "På så sätt",
    "Lexin006185": "Sedan",
    "Lexin006202": "Som leder till döden",
    "Lexin006204": "Hur många som dör",
    "Lexin006205": "Dödstalen",
    "Lexin006219": "Att hjälpa någon att dö (ej lagligt i Sverige)",
    "Lexin006248": "Att inte höra något",
    "Lexin006280": "Muskel eller körtel som gör jobbet",
    "Lexin006281": "Nerver som går UT från hjärnan (till muskler)",
    "Lexin006294": "Utvecklingsstörning",
    "Lexin006295": "Moderkakan",
    "Lexin006296": "När moderkakan kommer ut",
    "Lexin006297": "När det droppar urin efter man kissat klart",
    "Lexin006386": "Hur något är",
    "Lexin006391": "Att sköta sin sjukdom själv (t.ex. ta insulin)",
    "Lexin006393": "Att bo själv (med stöd)",
    "Lexin006419": "Mätning av hjärtats rytm",
    "Lexin006420": "Hjärtundersökning",
    "Lexin006426": "Ultraljud av hjärnan (sällsynt nu)",
    "Lexin006427": "Ultraljud av hjärtat",
    "Lexin006429": "Ultraljud",
    "Lexin006435": "Ultraljudsundersökning av hjärtat",
    "Lexin006473": "Cancer",
    "Lexin006474": "Cellförändringar som kan bli cancer",
    "Lexin006475": "Cancerknöl",
    "Lexin006476": "Inte godartad (farlig)",
    "Lexin006479": "Förmåga att dra ihop sig igen",
    "Lexin006482": "Töjbar",
    "Lexin006483": "Brosk som t.ex. ytterörat är gjort av",
    "Lexin006484": "Fysikaliskt begrepp om kroppar"
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
