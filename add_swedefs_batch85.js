const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch85.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin024464": "Läkare på skola",
    "Lexin026571": "Inflammation i struphuvudet",
    "Lexin026933": "Strumpa som stödjer benen",
    "Lexin027328": "Bakterier som orsakar syfilis",
    "Lexin027383": "Rådgivare för synnedsatta",
    "Lexin027427": "Produktion av syre",
    "Lexin027456": "Autoimmun sjukdom som påverkar hela kroppen",
    "Lexin027509": "Vätska för sårbehandling",
    "Lexin028194": "Övergående stroke",
    "Lexin028936": "Blodpropp",
    "Lexin029348": "Läkemedel mot sköldkörtelöverproduktion",
    "Lexin030053": "Urinledare",
    "Lexin030612": "Hjärtats mitralklaff",
    "Lexin031090": "EKG i vila",
    "Lexin031652": "Desinfektion med värme",
    "Lexin031816": "Medicin för arbetsrelaterade sjukdomar",
    "Lexin031892": "Utvidgade ådror",
    "Lexin032121": "Många, flera",
    "Lexin032122": "Många gånger",
    "Lexin032338": "Öden, livsöden",
    "Lexin032353": "Baksidan av ögat",
    "Lexin032560": "Det moraliska jaget (psykoanalys)",
    "Lexin032614": "För mycket hormonproduktion",
    "Lexin033526": "Djup depression med stelhet",
    "Lexin033527": "Lugnande läkemedel",
    "Lexin034197": "Soppa med slem",
    "Lexin034198": "Första tuberkulos",
    "Lexin034199": "Pågående tuberkulos",
    "Lexin034200": "Undersökning med mikroskop",
    "Lexin034201": "Mycket frisk",
    "Lexin034202": "Kolik hos spädbarn",
    "Lexin034203": "Vård av spädbarn",
    "Lexin034204": "Plan för åtgärder",
    "Lexin034244": "Stav",
    "Lexin034245": "Lager i huden",
    "Lexin034246": "Hormonproducerande organ",
    "Lexin000210": "Smärtstillande och febernedsättande läkemedel",
    "Lexin000421": "Akut medicinsk vård",
    "Lexin000494": "Ämne som ger allergi",
    "Lexin000497": "Överkänslighetsreaktion",
    "Lexin000500": "Som orsakar allergi",
    "Lexin000501": "Ämne som orsakar allergi",
    "Lexin000503": "Astma orsakad av allergi",
    "Lexin000504": "Allergisk mot",
    "Lexin000505": "Reaktion vid allergi",
    "Lexin000506": "Snuva orsakad av allergi",
    "Lexin000507": "Reaktioner vid allergi",
    "Lexin000508": "Sjukdomar orsakade av allergi",
    "Lexin000510": "Tecken på allergi",
    "Lexin000511": "Hudutslag från allergikontakt",
    "Lexin000512": "Tecken på allergi",
    "Lexin000514": "Undersökning av allergi",
    "Lexin000617": "Allt möjligt",
    "Lexin000641": "Allvarliga benbrott",
    "Lexin000843": "Blodbrist",
    "Lexin000869": "Ange symptomen i tregradig skala",
    "Lexin001188": "Protein som bekämpar främmande ämnen",
    "Lexin001229": "Använt glasögon",
    "Lexin001671": "Allergi som är ärftlig",
    "Lexin001673": "Eksem som är ärftligt",
    "Lexin001685": "Tömma vätska",
    "Lexin001688": "Vara högfärdig",
    "Lexin001689": "Spionera på flyktingar",
    "Lexin001755": "Av ren självbevarelsedrift",
    "Lexin001953": "Resultatet avläses",
    "Lexin002183": "Badar i sötvatten",
    "Lexin002190": "Klåda efter bad",
    "Lexin002199": "Småsaker, oviktiga saker",
    "Lexin002373": "Utan skor",
    "Lexin002387": "Akutmottagning för barn",
    "Lexin002549": "Spruta som bedövar",
    "Lexin002880": "Bestigning av berg",
    "Lexin003089": "Besvären",
    "Lexin003093": "Svår, jobbig",
    "Lexin003345": "Bilden faller på näthinnan",
    "Lexin003346": "Bilder i genomskärning",
    "Lexin003395": "Vävnad som binder samman",
    "Lexin003451": "Biståndsprojekt",
    "Lexin003481": "Oönskade effekter av läkemedel",
    "Lexin003600": "Blod i urinen",
    "Lexin004010": "Bosätta sig där",
    "Lexin004018": "Medel som botar",
    "Lexin004486": "Buktar ut",
    "Lexin004762": "Eksem i böjveck",
    "Lexin005014": "Allergiläkemedel",
    "Lexin005189": "Skaka av köld, rädsla eller ilska",
    "Lexin005427": "Det är för tungt",
    "Lexin005441": "Detektivromaner",
    "Lexin005481": "Lös avföring",
    "Lexin005762": "Domningar",
    "Lexin005808": "Mängder av läkemedel",
    "Lexin006016": "Du är fullt återställd",
    "Lexin006017": "Du är ingen duvunge längre",
    "Lexin006117": "24 timmar",
    "Lexin006407": "Parasitsjukdom från Egypten",
    "Lexin006465": "Hudutslag",
    "Lexin006504": "Eldsmärke, födelsemärke",
    "Lexin006509": "Elefantiasis"
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
