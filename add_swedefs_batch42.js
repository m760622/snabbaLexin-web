
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch42.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin016200": "Avtal om rätt att använda något (t.ex. programvara eller patent)",
    "Lexin016244": "När man inte bryr sig om ifall det man gör leder till brott",
    "Lexin016258": "Pengar man har direkt tillgängliga (kontanter eller på banken)",
    "Lexin016260": "Att avsluta ett företag och sälja allt det äger",
    "Lexin016261": "Avveckling av bolag",
    "Lexin016368": "Fängelsestraff utan tidsgräns (Sveriges strängaste straff)",
    "Lexin016410": "Där asylsökande får hjälp av Migrationsverket",
    "Lexin016411": "ID-kort för asylsökande (LMA-kort)",
    "Lexin016412": "Lagen om mottagande av asylsökande m.fl.",
    "Lexin016496": "När man delar upp vem som ska få vad (t.ex. vid arv)",
    "Lexin016533": "Flygplan eller helikopter",
    "Lexin016630": "Rättegång om att tvångsvårda missbrukare",
    "Lexin016634": "Rättegång om att tvångsomhänderta barn",
    "Lexin016635": "Lagen om vård av unga (tvångsvård)",
    "Lexin016648": "När allmänheten inte får vara med i rättssalen",
    "Lexin016793": "Hyra av mark men inte för jordbruk eller bostad",
    "Lexin016869": "Krav för att få ett tillstånd (t.ex. att man är skötsam)",
    "Lexin016902": "Förvaltningsrätten (domstol som ersatte länsrätten)",
    "Lexin016903": "Chefen för polisen i ett län (titel som inte används längre)",
    "Lexin016905": "Förvaltningsrätt (fd länsrätt)",
    "Lexin016906": "Domstolen som dömer i mål mot myndigheter (numera förvaltningsrätt)",
    "Lexin016910": "Statlig myndighet som ser till att regeringens beslut följs i länet",
    "Lexin016911": "Myndighet i varje län",
    "Lexin016969": "Att vara slarvig och inte tänka sig för",
    "Lexin016999": "Lag om att staten betalar lönen om företaget går i konkurs",
    "Lexin017027": "Nummer i en serie (t.ex. ärendenummer)",
    "Lexin017033": "Allt man äger som inte är fastighet (hus/mark)",
    "Lexin017034": "Saker, pengar, aktier m.m.",
    "Lexin017043": "Pengarna man betalar för ett hus",
    "Lexin017054": "Möbler, kläder och andra saker man har hemma",
    "Lexin017124": "Mannen eller kvinnan man är gift med",
    "Lexin017126": "Regler för hur mycket maken ärver",
    "Lexin017152": "Färdiga exempel att skriva efter",
    "Lexin017244": "Domstol som prövar miljö- och fastighetsfrågor",
    "Lexin017255": "Domstol för konkurrens- och marknadsföringsfrågor",
    "Lexin017259": "Lag om reklam och marknadsföring",
    "Lexin017262": "Regler om reklam och konkurrens",
    "Lexin017263": "Vad huset skulle kosta om man sålde det idag",
    "Lexin017333": "TV, tidningar och radio",
    "Lexin017410": "MBL (lag om fackets rätt att vara med och bestämma)",
    "Lexin017413": "Person som tillhör ett land",
    "Lexin017419": "Vanlig person utsedd att granska polisen (finns ej längre)",
    "Lexin017420": "Medborgare som övervakar polisförhör",
    "Lexin017425": "Pratglad",
    "Lexin017458": "Brottet att hjälpa någon annan att begå brott",
    "Lexin017463": "Att lyssna i ett annat rum (medhörning)",
    "Lexin017464": "Rum där man kan lyssna på förhöret utan att synas",
    "Lexin017538": "Organisation med flera länder som medlemmar",
    "Lexin017539": "Mellanstatlig organisation",
    "Lexin017621": "Moms (skatt på varor och tjänster)",
    "Lexin017661": "Domstolar som beslutar om asyl och uppehållstillstånd",
    "Lexin017664": "Myndigheten som beslutar om invandring och asyl",
    "Lexin017666": "Högsta instans i migrationsmål",
    "Lexin017691": "Titel i militären (t.ex. löjtnant, major)",
    "Lexin017705": "Lagen som ska skydda naturen och miljön",
    "Lexin017707": "Domstol för miljömål (nu Mark- och miljödomstolen)",
    "Lexin017711": "Slarv med farliga kemikalier (miljöbrott)",
    "Lexin017713": "Att förstöra naturen",
    "Lexin017715": "Stor olycka för naturen",
    "Lexin017719": "Rättegångar om miljöbrott eller tillstånd",
    "Lexin017720": "Märkning av miljövänliga varor (Svanen, Bra Miljöval)",
    "Lexin017725": "Lagar om miljön",
    "Lexin017759": "Medlem i regeringen",
    "Lexin017800": "Att använda falska papper eller någon annans ID",
    "Lexin017824": "Att sköta sig dåligt (t.ex. i fängelset)",
    "Lexin017835": "Att direkt säga att man inte godtar domen (krävs ej längre)",
    "Lexin017928": "Att vara mamma",
    "Lexin017930": "Regeln att den som föder barnet är mamman",
    "Lexin018005": "Mammas bror",
    "Lexin018012": "Mormor och morfar",
    "Lexin018038": "Mammas syster",
    "Lexin018050": "När motpartens advokat förhör ditt vittne",
    "Lexin018107": "Kvitto på att man tagit emot något",
    "Lexin018108": "Plats där Migrationsverket tar emot asylsökande",
    "Lexin018142": "Infiltratör eller spion",
    "Lexin018264": "MFoF (myndighet för adoptionsfrågor m.m.)",
    "Lexin018267": "Statliga och kommunala organ (Skatteverket, Polisen m.fl.)",
    "Lexin018309": "Ärenden om socialbidrag eller tvångsvård",
    "Lexin018330": "Brott som åklagaren bara får åtala om offret vill det",
    "Lexin018331": "Brottsoffret (i rättegången)",
    "Lexin018335": "Person som står som ansvarig för ett bolag för att skydda de riktiga ägarna",
    "Lexin018373": "Det mäklaren får betalt",
    "Lexin018383": "Enkla brott som det finns många av (snatteri, trafikbrott)",
    "Lexin018387": "Att köpa och sälja människor (slaveri)",
    "Lexin018388": "Kidnappning",
    "Lexin018406": "Att kopiera märkeskläder och sälja dem som äkta",
    "Lexin018503": "Namn Namnsson (fingerat namn)",
    "Lexin018551": "Lagen om narkotikabrott",
    "Lexin018566": "Vilket land man är medborgare i",
    "Lexin018570": "Polisens elitstyrka (NI)",
    "Lexin018577": "Register över alla lägenheter i Sverige",
    "Lexin018616": "Skyddat träd eller naturföremål",
    "Lexin018618": "Område där naturen är skyddad",
    "Lexin018625": "Myndighet som ansvarar för miljöfrågor",
    "Lexin018675": "Att skräpa ner ute (brottsligt)",
    "Lexin018695": "Domen hindrar att man döms igen för samma sak (res judicata)",
    "Lexin018730": "Som inte tar ställning",
    "Lexin018779": "NOA (nationell avdelning inom polisen)",
    "Lexin018821": "Varken grovt eller ringa brott",
    "Lexin018854": "Jurist som jobbar på tingsrätten (tingsnotarie)"
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
