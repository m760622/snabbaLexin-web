
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch67.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin006485": "Trådar som gör vävnad elastisk",
    "Lexin006518": "Undersökning av hjärnans signaler",
    "Lexin006519": "Resultatet av en EEG-undersökning",
    "Lexin006520": "Resultatet av en EKG-undersökning",
    "Lexin006521": "Salter i blodet (natrium, kalium m.m.)",
    "Lexin006522": "Saltbalansen i kroppen",
    "Lexin006523": "Undersökning av musklernas signaler",
    "Lexin006584": "Blodpropp som flyttat sig (t.ex. till lungan)",
    "Lexin006586": "Början till ett foster (första veckorna)",
    "Lexin006587": "Tiden när fostret är ett embryo",
    "Lexin006588": "Embryot",
    "Lexin006628": "Hjärninflammation (fästingar/virus)",
    "Lexin006629": "Djur som bara består av en cell (t.ex. amöbor)",
    "Lexin006634": "Inflammation inuti hjärtat (på klaffarna)",
    "Lexin006635": "Hinnan inuti hjärtat",
    "Lexin006637": "Psykisk sjukdom som kommer inifrån (arv)",
    "Lexin006639": "Om körtlar: utsöndrar till blodet eller ut ur kroppen",
    "Lexin006640": "Hormonsystemet",
    "Lexin006641": "Körtlar som tillverkar hormoner",
    "Lexin006643": "Läkare som kan hormonsjukdomar",
    "Lexin006645": "Vätska i innerörat",
    "Lexin006646": "Sjukdom där livmoderslemhinna växer på fel ställe",
    "Lexin006647": "Fabriken inuti cellen (ER)",
    "Lexin006648": "När man tittar in i kroppen med kamera",
    "Lexin006649": "När man tittar ner i magen med slan",
    "Lexin006650": "Titthålskirurgi",
    "Lexin006651": "Undersökningar med kamera inuti kroppen",
    "Lexin006672": "Hur kroppen använder energi (metabolism)",
    "Lexin006676": "När kroppen skapar energi av mat",
    "Lexin006709": "Benbrott utan komplikationer",
    "Lexin006712": "Nyttigt fett (olivolja, avokado)",
    "Lexin006744": "Bara på ena sidan",
    "Lexin006745": "När man jobbar snett eller fel",
    "Lexin006765": "En specifik sorts djur",
    "Lexin006768": "Magtarminflammation",
    "Lexin006769": "Bakterier som finns i tarmen",
    "Lexin006788": "Tydlig (kan bara tolkas på ett sätt)",
    "Lexin006800": "Ämne som driver kemiska reaktioner i kroppen",
    "Lexin006801": "Biologiska katalysatorer",
    "Lexin006802": "Enzymet",
    "Lexin006804": "När många blir sjuka samtidigt",
    "Lexin006805": "Som en epidemi",
    "Lexin006806": "Gulsot som smittar",
    "Lexin006807": "Som hör till en epidemi",
    "Lexin006808": "Överhuden (det man ser)",
    "Lexin006809": "Inflammation i bitestikeln (gör mycket ont)",
    "Lexin006810": "Tallkottkörteln (sömn)",
    "Lexin006811": "Mjukt lock som täcker luftstrupen när man sväljer",
    "Lexin006815": "Sjukdom med krampanfall",
    "Lexin006818": "Kramper vid epilepsi",
    "Lexin006823": "Celler som täcker ytor (hud/slemhinna)",
    "Lexin006824": "Vävnad som täcker kroppen",
    "Lexin006836": "Impotens",
    "Lexin006878": "Rosfeber (hudinfektion)",
    "Lexin006879": "Knölros (utslag på benen)",
    "Lexin006883": "Röret maten åker ner i",
    "Lexin006884": "Åderbråck i matstrupen (vid leversjukdom)",
    "Lexin006889": "Högt blodtryck utan känd orsak",
    "Lexin006895": "Maskin som krossar njursten",
    "Lexin006945": "Länder i Europa",
    "Lexin006969": "Det blå kortet (rätt till vård i EU)",
    "Lexin006991": "Upprymdhet",
    "Lexin006995": "Sjukdom med prickar (t.ex. mässling)",
    "Lexin007029": "Orsaker som kommer utifrån (t.ex. miljö)",
    "Lexin007030": "Psykos orsakad av yttre saker (droger/skada)",
    "Lexin007031": "Olika typer av körtlar",
    "Lexin007032": "Körtlar som har utförsgång (svett/spott)",
    "Lexin007053": "Utandning",
    "Lexin007090": "Simmaröra (inflammation i hörselgången)",
    "Lexin007099": "Hjärtat slår ett extra slag",
    "Lexin007100": "När ägget fastnar i äggledaren (X)",
    "Lexin007104": "Armar och ben",
    "Lexin007169": "När vita blodkroppar äter upp bakterier",
    "Lexin007191": "Ett ben i fingret eller tån",
    "Lexin007219": "Hosta och andnöd hos barn (virus)",
    "Lexin007221": "Tänderna mellan hörntand och kindtand",
    "Lexin007291": "Ont i en kroppsdel som är borta",
    "Lexin007318": "Läran om läkemedel",
    "Lexin007321": "Läkemedel",
    "Lexin007337": "Halsfluss (inflammation i svalget)",
    "Lexin007365": "Katalogen med alla mediciner",
    "Lexin007412": "Sitta fast",
    "Lexin007417": "Bestämma vilken sjukdom det är",
    "Lexin007428": "Som sitter ihop med",
    "Lexin007445": "Djurliv",
    "Lexin007454": "Plötslig feber",
    "Lexin007455": "När man skakar av feber",
    "Lexin007498": "Bråck i ljumsken (långt ner)",
    "Lexin007501": "Barnsjukdom med röda kinder",
    "Lexin007523": "Då man kan få barn (15-45 år)",
    "Lexin007524": "Då ägglossning sker",
    "Lexin007536": "Celler som lagrar fett",
    "Lexin007537": "Lipider",
    "Lexin007539": "Fet",
    "Lexin007541": "Hölje av fett",
    "Lexin007542": "Fettknöl (lipom)",
    "Lexin007543": "Samling av fett",
    "Lexin007544": "Som liknar fett",
    "Lexin007545": "Delar av fettmolekylen",
    "Lexin007546": "Beståndsdelar i fett"
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
