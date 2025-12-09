const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch84.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin033987": "Att lägga skuld på någon",
    "Lexin033988": "Kroppsliga komplikationer",
    "Lexin033989": "Djup bedrövelse",
    "Lexin033990": "Uppmuntran, aktivering",
    "Lexin033991": "Problem med studiebehov",
    "Lexin033992": "Störning, avbrott",
    "Lexin033993": "Bedömning av självmordsrisk",
    "Lexin033994": "Tankar om självmord",
    "Lexin033995": "Sjukdomstillstånd med flera symtom",
    "Lexin033996": "Tabletter för att sova",
    "Lexin033997": "Mönster i hur man tänker",
    "Lexin033998": "Behov som är uppfyllda",
    "Lexin033999": "Psykisk eller fysisk skada",
    "Lexin034000": "Sätter igång, startar",
    "Lexin034001": "Tvångsmässigt tvivel",
    "Lexin034002": "Det omedvetna jaget (psykoanalys)",
    "Lexin034003": "Beteende som undviker något",
    "Lexin034004": "Värderad, uppskattad",
    "Lexin034005": "Utesluten, ignorerad",
    "Lexin034006": "Det som utlöser något",
    "Lexin034007": "Aggressivt beteende utåt",
    "Lexin034008": "Felaktiga föreställningar",
    "Lexin034009": "Smärta från inre organ",
    "Lexin034010": "Utan värde",
    "Lexin034011": "Oro, ängslan",
    "Lexin034012": "Störningar i ätbeteende",
    "Lexin034013": "Ömt vid beröring",
    "Lexin034014": "Göra något större än det är",
    "Lexin034015": "Representerad i för hög grad",
    "Lexin000567": "Läkare för allmän vård",
    "Lexin000740": "Muskelbyggande steroider",
    "Lexin001219": "Läkare som ger anvisningar",
    "Lexin001650": "När hjärtat slutar slå",
    "Lexin001794": "Läkare på en avdelning",
    "Lexin002023": "Hjärtats viloperiod",
    "Lexin003442": "Körtlar vid sköldkörteln",
    "Lexin003529": "Kramp i ögonlocket",
    "Lexin003539": "Fick strålbehandling",
    "Lexin003846": "Företag för bokföring",
    "Lexin004635": "Operation för att leda om blodflöde",
    "Lexin004814": "Vaccination mot tuberkulos",
    "Lexin004823": "Som orsakar cancer",
    "Lexin004827": "Svampinfektioner",
    "Lexin005062": "Kateter i stor ven",
    "Lexin005394": "Rengöring som dödar bakterier",
    "Lexin005495": "Expert på kost och näring",
    "Lexin006170": "Minskar sköldkörtelns hormonproduktion",
    "Lexin006412": "Andel blod som pumpas ut",
    "Lexin006436": "Ultraljudsundersökning av hjärtat",
    "Lexin006636": "Orsaker inifrån kroppen",
    "Lexin006638": "Hjärtats inre hinna",
    "Lexin007319": "Rörande läkemedel",
    "Lexin007821": "Fetter med flera dubbelbindningar",
    "Lexin008265": "När organ sjunker ner",
    "Lexin008831": "Fick godkännande",
    "Lexin011285": "Allvarligt tillstånd under graviditet",
    "Lexin011424": "Bakterie som kan orsaka sjukdom",
    "Lexin011472": "Virus som ger blåsor",
    "Lexin011632": "Snabba oregelbundna hjärtslag",
    "Lexin011927": "För högt blodtryck",
    "Lexin011937": "Överdriven rädsla för sjukdom",
    "Lexin012313": "Vätska i lungorna på hög höjd",
    "Lexin012346": "Mycket aktivitet",
    "Lexin013242": "Läkare för inre sjukdomar",
    "Lexin014370": "Inflammation i gallgångarna",
    "Lexin015054": "Artär som försörjer hjärtat",
    "Lexin015197": "Långvariga smittsamma sjukdomar",
    "Lexin015210": "Kroppens produktion av värme",
    "Lexin016836": "Undersökning av läkare",
    "Lexin017078": "Magsjuka",
    "Lexin017148": "Elakartad tumör",
    "Lexin017873": "Könssjukdom med sår",
    "Lexin017876": "Infektioner i mjuka vävnader",
    "Lexin017929": "Intyg om graviditet",
    "Lexin018248": "Bakterie som smittar sexuellt",
    "Lexin018249": "Skyddande hinna runt nerv",
    "Lexin018448": "Träning för gravida",
    "Lexin018546": "Läkare som ger narkos",
    "Lexin018759": "Tablett mot hjärtbesvär",
    "Lexin018766": "Artär till njuren",
    "Lexin018776": "Undersökning av njurarna",
    "Lexin019423": "Hjärtinfarkt utan komplikationer",
    "Lexin019989": "Inflammation i mellanörat",
    "Lexin020352": "Ballongvidgning av kranskärl",
    "Lexin020695": "Blodets vätska",
    "Lexin020841": "Virus som orsakar polio",
    "Lexin021126": "Högt blodtryck utan känd orsak",
    "Lexin021128": "Ursprungliga tumörer",
    "Lexin021171": "Läkare med egen praktik",
    "Lexin021669": "Påverkar metabolismen",
    "Lexin021725": "Tabletter med radioaktivt jod",
    "Lexin021726": "Jod som är radioaktivt",
    "Lexin022064": "Styr produktionen",
    "Lexin022118": "Läkemedel som ges i ändtarmen",
    "Lexin023821": "Infektion som sprids vid sex",
    "Lexin023967": "Läget har stabiliserats",
    "Lexin023986": "Meddela att man är sjuk",
    "Lexin024012": "Vård på sjukhus",
    "Lexin024015": "Intyg om sjukdom",
    "Lexin024047": "Information om sjukvård"
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
