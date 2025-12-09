const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch87.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin015267": "Krypa upp genom fotsulorna",
    "Lexin015559": "Kylande balsam",
    "Lexin015625": "Kängor",
    "Lexin015651": "Känslor",
    "Lexin015652": "Plötsligt känslouttryck",
    "Lexin015665": "Kärleksfull",
    "Lexin015674": "Fysiker inom kärnfysik",
    "Lexin015771": "Laboratoriet",
    "Lexin015922": "Landsmän",
    "Lexin015969": "Test med lappar på huden",
    "Lexin015983": "Larver",
    "Lexin015991": "Behandling med laser",
    "Lexin016045": "Led av depression",
    "Lexin016206": "Lider av färgblindhet",
    "Lexin016207": "Lider av tinnitus",
    "Lexin016237": "Liknande symtom",
    "Lexin016287": "Lindra besvären",
    "Lexin016339": "Livet ville något annat",
    "Lexin016363": "Livsmedel",
    "Lexin016404": "Ljusstrålar samlas precis på",
    "Lexin016461": "Lokaliserade",
    "Lexin016542": "Besvär i luftrören",
    "Lexin016566": "Luktar död och förintelse",
    "Lexin016591": "Tuberkulos i lungorna",
    "Lexin016673": "Kärl för lymfa",
    "Lexin016678": "Lymfsystemet",
    "Lexin016740": "Långsynt",
    "Lexin016816": "Lägger sig under huden",
    "Lexin016824": "Läkarbesök för synproblem",
    "Lexin016826": "Läkare utan gränser",
    "Lexin016829": "Föreläggande om läkarintyg",
    "Lexin016844": "Allergier mot läkemedel",
    "Lexin017063": "Sjukdom i gula fläcken",
    "Lexin017076": "Maggropen",
    "Lexin017140": "Sjukdom i gula fläcken",
    "Lexin017238": "Biolog som studerar havet",
    "Lexin017296": "Maskar",
    "Lexin017323": "Många hjälpmedel",
    "Lexin017337": "Celler som ger allergireaktion",
    "Lexin017522": "Mejas ned",
    "Lexin017571": "Sjukdom i innerörat",
    "Lexin017741": "Mina känslor helt avtrubbade",
    "Lexin017882": "Eksem med mjäll",
    "Lexin017900": "Mobbning",
    "Lexin017960": "Virussjukdom med vårtor",
    "Lexin017969": "Blåaktig födelsefläck",
    "Lexin017983": "Montera upp en pump",
    "Lexin018251": "Mygg",
    "Lexin018277": "Muskelskikt",
    "Lexin018396": "Mänsklig avföring",
    "Lexin018740": "Nickel",
    "Lexin018741": "Allergi mot nickel",
    "Lexin019029": "Närkontakt",
    "Lexin019049": "Näsan rinner",
    "Lexin019057": "Nässelutslag",
    "Lexin019075": "Sinnesceller i näthinnan",
    "Lexin019125": "Nötter",
    "Lexin019277": "Mycket obehagligt",
    "Lexin019338": "Ofräsch",
    "Lexin019626": "Upprörd, uppskakad",
    "Lexin019658": "Omskakad av något",
    "Lexin019666": "Omvandlas",
    "Lexin019708": "Ont i magen",
    "Lexin019729": "Operativa ingrepp",
    "Lexin019792": "Ordinera halv dos",
    "Lexin019868": "Utan kraft",
    "Lexin019987": "Öroninflammation",
    "Lexin019988": "Inflammation i innerörat",
    "Lexin020384": "Penicillinbehandling",
    "Lexin020638": "Hudsjukdom med utslag",
    "Lexin020701": "Plaströr",
    "Lexin020724": "Plattor av rostfritt stål",
    "Lexin020881": "Allergi mot pollen",
    "Lexin020889": "Polyper",
    "Lexin020965": "Stressyndrom efter trauma",
    "Lexin021112": "Prickar",
    "Lexin021367": "Provtagning",
    "Lexin021440": "Psykiskt ansträngande",
    "Lexin021446": "Psykologen",
    "Lexin021676": "Pärlemorfärgad",
    "Lexin022514": "Svampinfektion på huden",
    "Lexin022737": "Runda fönstret i örat",
    "Lexin022743": "Rundmaskar",
    "Lexin022755": "Runkar huvudet",
    "Lexin022768": "Ruskar",
    "Lexin022772": "Ruskigt bra",
    "Lexin022811": "Bedövning i ryggen",
    "Lexin023475": "Sandloppor",
    "Lexin023575": "Parasiter som orsakar bilharzia",
    "Lexin023625": "Hjärtklaff",
    "Lexin023671": "Sekundär infektion",
    "Lexin023677": "SSRI-läkemedel",
    "Lexin023953": "Sitta still",
    "Lexin024174": "Starkt upprörd",
    "Lexin024176": "Starkt upprörande upplevelse",
    "Lexin024177": "Skakar",
    "Lexin024180": "Skakar i hela kroppen",
    "Lexin024664": "Skulle bara fattas att",
    "Lexin024818": "Skäller ut för småsaker",
    "Lexin024963": "Slemhinnor"
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
