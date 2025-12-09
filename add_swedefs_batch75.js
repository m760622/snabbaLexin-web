
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch75.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin014868": "Svårt att samordna rörelser (ataxi)",
    "Lexin014906": "Sädesslag",
    "Lexin014938": "Benet längst ner i ryggraden",
    "Lexin014964": "Hormon som dämpar inflammation",
    "Lexin014965": "Behandling med kortison mot smärta/allergi",
    "Lexin014966": "Salv mot eksem",
    "Lexin014990": "Vad man äter och hur man lever (motion/rökning)",
    "Lexin015000": "Vad man brukar äta",
    "Lexin015005": "När en kota trycks ihop (vid benskörhet)",
    "Lexin015007": "Ryggraden",
    "Lexin015041": "Kramp i benet (sendrag)",
    "Lexin015043": "Medicin som löser kramper (spasmolytika)",
    "Lexin015142": "Hur krisen utvecklas",
    "Lexin015143": "Svåra situationer",
    "Lexin015145": "Hjälp att hantera en kris",
    "Lexin015152": "Stöd vid katastrofer",
    "Lexin015182": "Arvsmassa i cellkärnan (DNA)",
    "Lexin015189": "Långvarig (går inte över)",
    "Lexin015192": "Ledgångsreumatism (RA)",
    "Lexin015193": "När njurarna fungerar dåligt permanent",
    "Lexin015194": "KOL (lungsjukdom)",
    "Lexin015196": "Smärta som varat länge (mer än 3 månader)",
    "Lexin015209": "Immunförsvaret",
    "Lexin015215": "Cell som bygger upp kroppen (smatisk cell)",
    "Lexin015216": "Kroppens celler",
    "Lexin015220": "Aorta (stora kroppspulsådern)",
    "Lexin015229": "Blod, lymfa, saliv m.m.",
    "Lexin015230": "Vävnader (muskler, fett, ben)",
    "Lexin015259": "Hjälpmedel för att gå när man skadat benet",
    "Lexin015280": "Känslan att man måste trycka på (vid förlossning)",
    "Lexin015294": "När man spyr",
    "Lexin015296": "Kräks",
    "Lexin015299": "Mjuk salva",
    "Lexin015301": "Småfel i kroppen (ont här och där)",
    "Lexin015437": "Genom huden (om medicin)",
    "Lexin015468": "Små spindeldjur i damm (ger allergi)",
    "Lexin015513": "Östrogen och progesteron",
    "Lexin015549": "Känsla av att inte få luft",
    "Lexin015602": "Benet i käken",
    "Lexin015604": "Delen av ansiktet man tuggar med",
    "Lexin015640": "När man inte känner beröring (domning)",
    "Lexin015641": "Förmågan att känna beröring/smärta",
    "Lexin015647": "IBS (orolig mage)",
    "Lexin015696": "Skador av kyla (förfrysning)",
    "Lexin015700": "Ägg eller spermie",
    "Lexin015704": "Penis, slida m.m.",
    "Lexin015708": "Sjukdom som smittar vid sex",
    "Lexin015756": "Kyssjuka (mononukleos)",
    "Lexin015772": "Provtagning",
    "Lexin015961": "Titthålsoperation i magen",
    "Lexin015970": "Allergitest på ryggen",
    "Lexin015986": "Struphuvudet",
    "Lexin016024": "Vätska i rumpan för att bajsa",
    "Lexin016029": "Medicin mot förstoppning",
    "Lexin016059": "Insekter, spindlar och kräftdjur",
    "Lexin016064": "Där ben möts och rör sig",
    "Lexin016065": "RA (inflammatorisk ledsjukdom)",
    "Lexin016066": "Den runda delen av ett ben i en led",
    "Lexin016082": "Gropen i en led där huvudet passar in",
    "Lexin016107": "Bakterie som ger lunginflammation (legionärssjuka)",
    "Lexin016175": "Vävnadsprov från levern",
    "Lexin016176": "Tumör i levern",
    "Lexin016178": "Medvetslöshet pga leversvikt",
    "Lexin016179": "Organet som renar blodet",
    "Lexin016180": "När levern slutar fungera",
    "Lexin016181": "Byta lever",
    "Lexin016186": "Stelna (koagulera)",
    "Lexin016190": "Lag om anmälan av vårdskador",
    "Lexin016272": "Blodet går från hjärtat till lungorna och tillbaka",
    "Lexin016274": "Del av hjärnan som styr balans/rörelser",
    "Lexin016288": "Vård i livets slutskede",
    "Lexin016294": "Språkforskare (eller logoped)",
    "Lexin016327": "Krossa njursten med stötvågor",
    "Lexin016344": "Cancer i livmoderkroppen",
    "Lexin016345": "Nedre delen av livmodern",
    "Lexin016346": "Cancer i livmoderhalsen (HPV)",
    "Lexin016347": "Endometrium (stöts ut vid mens)",
    "Lexin016348": "Portion (livmodertappen)",
    "Lexin016366": "Ändra mat/motion för att bli frisk",
    "Lexin016387": "Ljud (ultraljud)",
    "Lexin016392": "Vecket mellan låret och magen",
    "Lexin016397": "Behandling mot t.ex. psoriasis och gulsot",
    "Lexin016398": "Ljusterapin",
    "Lexin016416": "Operation där man tar bort en lunglob",
    "Lexin016446": "Röst- och talvård",
    "Lexin016475": "Ohyra som hoppar och biter",
    "Lexin016483": "Ramla av av sig själv",
    "Lexin016512": "Lag om stöd och service till vissa funktionshindrade",
    "Lexin016530": "Smitta som sprids i luften (aerosol)",
    "Lexin016535": "Svår andnöd (Kussmaul-andning)",
    "Lexin016543": "Bronkit eller lunginflammation",
    "Lexin016548": "Röret som leder luft till lungorna",
    "Lexin016549": "Förkylning, influensa m.m.",
    "Lexin016567": "Förmågan att känna doft",
    "Lexin016570": "Ryggvätskeprov",
    "Lexin016579": "Organet vi andas med",
    "Lexin016580": "Kärlen som leder blod till lungorna",
    "Lexin016581": "Där gasutbytet sker i lungan",
    "Lexin016582": "Tumör i lungan (ofta av rökning)",
    "Lexin016583": "Hinnan runt lungan"
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
