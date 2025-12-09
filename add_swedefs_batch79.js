
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch79.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin023723": "Nerver som skickar signaler från kroppen till hjärnan",
    "Lexin023788": "Ungdomsmottagning för 23-30-åringar",
    "Lexin023810": "Sexlivet",
    "Lexin023811": "Hjälp med problem i sexlivet",
    "Lexin023814": "Lust att ha sex",
    "Lexin023822": "Sjukdom som smittar via sex (klamydia, gonorré)",
    "Lexin023823": "STI (t.ex. herpes, klamydia)",
    "Lexin023916": "Cell som tar emot sinnesintryck",
    "Lexin023920": "Vad vi ser/hör/känner",
    "Lexin023923": "Humör (glad/ledsen)",
    "Lexin023929": "Hjärtats naturliga pacemaker",
    "Lexin023955": "Benen man sitter på",
    "Lexin023995": "När man är döende (palliativ fas)",
    "Lexin023996": "Som kan orsaka sjukdom (bakterier/virus)",
    "Lexin023997": "Hur sjukdomen utvecklas",
    "Lexin023998": "Anamnes (vad läkaren frågar om)",
    "Lexin023999": "Att förstå att man är sjuk",
    "Lexin024011": "Vårdrelaterad infektion",
    "Lexin024022": "Patologiska förändringar",
    "Lexin024045": "1177 Vårdguiden (ring för råd)",
    "Lexin024126": "Illamående på båt/bil",
    "Lexin024135": "Hudsjukdom av kvalster (klåda)",
    "Lexin024202": "Skador på huvudet",
    "Lexin024283": "Gnuggar/skaver (om skor)",
    "Lexin024290": "Alla ben i kroppen",
    "Lexin024301": "Benet på framsidan av underbenet",
    "Lexin024473": "Sjuksköterska på skolan",
    "Lexin024494": "Torkat blod på ett sår",
    "Lexin024592": "Sår av friktion (t.ex. ramla)",
    "Lexin024595": "Leverskada pga alkohol eller hepatit",
    "Lexin024596": "Blir mindre",
    "Lexin024656": "Ben på ryggen vid axeln",
    "Lexin024744": "Vaccination",
    "Lexin024862": "Körtel i halsen som styr ämnesomsättningen",
    "Lexin024863": "Cancer i thyreoidea",
    "Lexin024864": "T3 och T4 (styr ämnesomsättningen)",
    "Lexin024968": "Med slem",
    "Lexin024969": "Hostar upp slem",
    "Lexin024970": "Slemmig hosta",
    "Lexin024971": "Lossar slem så man kan hosta upp det",
    "Lexin024981": "Mödomshinnan",
    "Lexin024993": "Göra glasögon efter recept",
    "Lexin025052": "Brott utan sår (huden är hel)",
    "Lexin025057": "Vård på sjukhus (inlagd)",
    "Lexin025144": "Vanlig röntgen (utan kontrast)",
    "Lexin025173": "Papilla på tungan som känner smak",
    "Lexin025174": "Papiller på tungan",
    "Lexin025177": "Förmågan att känna smak",
    "Lexin025229": "Person som har smitta men inte är sjuk",
    "Lexin025233": "Var smittan kommer från",
    "Lexin025236": "Sveriges lag om smittskydd",
    "Lexin025237": "Läkare som jobbar med smittskydd",
    "Lexin025239": "Hitta vem som smittade vem",
    "Lexin025240": "Hur sjukdomen sprids (luft/kontakt)",
    "Lexin025241": "Virus, bakterier m.m.",
    "Lexin025259": "Röd tunga vid scharlakansfeber",
    "Lexin025273": "Sjukdom som börjar långsamt",
    "Lexin025283": "Små fläckar på huden",
    "Lexin025323": "Ont",
    "Lexin025324": "Värk",
    "Lexin025326": "Behandling mot smärta",
    "Lexin025327": "När smärtan började",
    "Lexin025328": "Utan smärta",
    "Lexin025329": "Signaler som talar om smärta",
    "Lexin025332": "Smärtstillande (t.ex. Alvedon)",
    "Lexin025334": "Analgetika (smärtstillande medicin)",
    "Lexin025335": "Att ta bort eller minska smärta",
    "Lexin025340": "Hur man upplever smärtan",
    "Lexin025341": "Smärta som rör sig i kroppen",
    "Lexin025387": "Brott på snedden (i benet)",
    "Lexin025484": "Del av innerörat (cochlea)",
    "Lexin025584": "Hur mycket socker (t.ex. i blodet)",
    "Lexin025595": "Socialtjänstlagen",
    "Lexin025599": "Solsäng (UV-ljus)",
    "Lexin025637": "Kroppslig sjukdom (ej psykisk)",
    "Lexin025752": "Spastik (stelhet pga hjärnskada)",
    "Lexin025754": "Pinne för att titta i halsen",
    "Lexin025821": "Manliga könscellen",
    "Lexin025835": "Lepra (gammal sjukdom)",
    "Lexin025850": "Likvor",
    "Lexin025852": "Mellersta hinnan runt hjärnan (arachnoidea)",
    "Lexin025867": "Brott som roterat (av vridrörelser)",
    "Lexin025871": "Mätning av lungfunktionen",
    "Lexin025886": "Brott i många bitar",
    "Lexin025895": "Tarmparasit (Ascaris)",
    "Lexin025903": "Parasiter (t.ex. malaria)",
    "Lexin025917": "Körtlarna som gör saliv",
    "Lexin025937": "Smitta andra",
    "Lexin025944": "Hur smittan sprids",
    "Lexin025951": "Barnmask (klåda i rumpan)",
    "Lexin025970": "Analys av språk (logopedi)",
    "Lexin026022": "De första levnadsåren",
    "Lexin026036": "Huvudvärk pga stress och spänningar",
    "Lexin026059": "De fem sinnena (syn/hörsel/lukt/smak/känsel)",
    "Lexin026060": "Vad man upplever genom sinnena",
    "Lexin026104": "Bakterier som ger infektioner (t.ex. MRSA)",
    "Lexin026124": "Cell som kan bli vilken cell som helst",
    "Lexin026125": "Benmärgstransplantation",
    "Lexin026163": "Smärta som kommer när man börjar röra sig",
    "Lexin026169": "Myndighet för skolstöd för funktionshinder"
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
