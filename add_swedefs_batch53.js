
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch53.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin000991": "Måste anmäla enligt lag",
    "Lexin001019": "Rätt att vara anonym (källskydd)",
    "Lexin001092": "Krav på något (t.ex. skadestånd)",
    "Lexin001097": "Att få någon annan att begå ett brott",
    "Lexin001105": "Få betala senare",
    "Lexin001111": "Kontrakt om jobb",
    "Lexin001123": "Att man kan straffas eller bli skadeståndsskyldig",
    "Lexin001129": "Beslut att styrelsen skött sig bra (på årsmötet)",
    "Lexin001131": "Vem som bär ansvaret",
    "Lexin001136": "Krav på att någon ska straffas",
    "Lexin001142": "Lämnar in en ansökan",
    "Lexin001144": "Begära att bli förklarad i konkurs",
    "Lexin001145": "Stämma någon i domstol",
    "Lexin001396": "Pengar man får om man skadar sig på jobbet",
    "Lexin001564": "När arvet delas upp mellan arvingarna",
    "Lexin001616": "Pengar från Försäkringskassan för personlig assistent",
    "Lexin001647": "Migrationsverkets utredning om asylskäl",
    "Lexin001770": "Att betala lite i taget (kreditköp)",
    "Lexin001883": "Vräkning (tvingas flytta)",
    "Lexin001911": "Att meddela domen",
    "Lexin001940": "Att svära ed som tolk för alla uppdrag (vid Kammarkollegiet)",
    "Lexin002006": "Lägga ner ärendet utan åtgärd",
    "Lexin002029": "Säga nej till en ansökan",
    "Lexin002094": "Regler i ett avtal",
    "Lexin002099": "Sitta i fängelse tills straffet är slut",
    "Lexin002230": "Rättegång utan publik (lyckta dörrar)",
    "Lexin002365": "Tagen på bar gärning (medan man gör brottet)",
    "Lexin002501": "Bry sig om eller tänka på",
    "Lexin002502": "Hänsyn",
    "Lexin002537": "Gammalt namn för ringa bedrägeri (snyltning etc.)",
    "Lexin002566": "Säljs som den är (med fel och brister)",
    "Lexin002570": "Rätt att göra något",
    "Lexin002612": "Avgift via skatten för begravningsplatser",
    "Lexin002632": "Göra något olagligt",
    "Lexin002633": "Förgripa sig på någon",
    "Lexin002640": "Överklaga ett beslut till samma myndighet",
    "Lexin002642": "En formell fråga eller ansökan",
    "Lexin002664": "Kolla om någon verkligen behöver bidrag",
    "Lexin002681": "Rätt kompetens eller tillstånd",
    "Lexin002683": "Krav för att få söka (t.ex. leg. läkare)",
    "Lexin002684": "Att göra mer än man får enligt sitt uppdrag",
    "Lexin002737": "Polisens register över dömda personer",
    "Lexin002784": "Fullmakt eller tillstånd",
    "Lexin002827": "Efterskänka straff",
    "Lexin002835": "Nåd (regeringen slipper straffet)",
    "Lexin002911": "Med planering och kyla",
    "Lexin002958": "Rätt att bo kvar även om hyresvärden vill säga upp",
    "Lexin002964": "Ta ut skatt",
    "Lexin002994": "När polisen tar hand om stulet gods eller vapen",
    "Lexin002995": "Lista över beslagtagna saker",
    "Lexin003033": "Säga emot (t.ex. en faktura)",
    "Lexin003034": "Protest mot krav",
    "Lexin003071": "Regel",
    "Lexin003087": "Något som gör brottet värre",
    "Lexin003104": "Förbud att träffa någon (kontaktförbud)",
    "Lexin003113": "Betala med varor eller arbete istället för pengar",
    "Lexin003114": "Betala mat och hyra för någon",
    "Lexin003119": "Prick i registret hos kreditupplysningsföretag",
    "Lexin003120": "Den som ska betala",
    "Lexin003123": "Kravbrev från Kronofogden",
    "Lexin003124": "Ekonomi att kunna betala",
    "Lexin003126": "Stoppar betalningar (förstadium till konkurs)",
    "Lexin003232": "Besök där personal är med och lyssnar",
    "Lexin003233": "Att hålla koll på (eller anmäla krav i konkurs)",
    "Lexin003244": "Ge ledigt från fängelset en stund",
    "Lexin003249": "Visa att det är sant",
    "Lexin003252": "Den som måste bevisa (oftast åklagaren)",
    "Lexin003254": "Att ändra bevis så det ljuger",
    "Lexin003259": "Typ av bevis (vittne, dokument, etc.)",
    "Lexin003267": "När man lyssnar på vittnen och går igenom bevis",
    "Lexin003268": "Hur starkt beviset är",
    "Lexin003269": "Domstolens bedömning av bevisen",
    "Lexin003307": "Ja till yrkandet (vinst i rätten)",
    "Lexin003378": "Bevis som fäller avgörandet",
    "Lexin003845": "Brottsligt slarv med bokföringen",
    "Lexin003920": "Att lova att betala någon annans lån om de inte kan",
    "Lexin003922": "Den som gått i borgen",
    "Lexin003924": "Den man är skyldig pengar (t.ex. banken)",
    "Lexin003961": "Att inte vara på plats",
    "Lexin004033": "Förteckning över dödsboets tillgångar och skulder",
    "Lexin004209": "Brott som stör friden (t.ex. förargelseväckande beteende)",
    "Lexin004225": "Att avslöja hemligheter man inte får",
    "Lexin004241": "När man gjort flera brott samtidigt",
    "Lexin004248": "Den som blivit utsatt för brott (målsägande)",
    "Lexin004249": "Fond som betalar skadestånd till offer",
    "Lexin004413": "Barn och barnbarn (som har rätt till laglott)",
    "Lexin004523": "Person som agerar åt någon annan i hemlighet",
    "Lexin005126": "Böter baserat på inkomst (t.ex. 30 dagsböter)",
    "Lexin005278": "Papper för att deklarera",
    "Lexin005288": "Gemensam vårdnad (föräldrarna bestämmer ihop)",
    "Lexin005293": "Dom på en del av målet",
    "Lexin005301": "Att lämna över handlingar bevisligen",
    "Lexin005479": "Registrerat dokument",
    "Lexin005552": "Avsikt att göra det (ville göra det)",
    "Lexin005599": "Behandla sämre pga kön, ras etc.",
    "Lexin005703": "Olagligt spel om pengar",
    "Lexin005726": "Fel som inte syntes vid köpet",
    "Lexin005767": "Motivering till domen",
    "Lexin005769": "Resultatet av domen (t.ex. fängelse 2 år)",
    "Lexin005781": "Grovt fel i rättegången som gör att den måste tas om"
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
