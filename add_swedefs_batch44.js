
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch44.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin019932": "Dödsboet innan arvet delats ut",
    "Lexin019942": "Orimligt eller orättvist",
    "Lexin019973": "Att t.ex. köpa röster i ett val",
    "Lexin019974": "Att betala en skuld före en annan så det blir orättvist",
    "Lexin019975": "Att t.ex. betala för att få adoptera",
    "Lexin019976": "Valfusk",
    "Lexin019981": "Att köra sopor utan tillstånd",
    "Lexin019982": "Miljöbrott där man driver farlig verksamhet utan lov",
    "Lexin019983": "Att sprida inspelningar man inte får",
    "Lexin019984": "Barnpornografibrott eller spridning av nakenbilder utan lov",
    "Lexin020041": "Att slarva med sanningen i rätten (brott)",
    "Lexin020068": "Att låta bli att göra något man måste, så det blir ett brott",
    "Lexin020096": "Avtal ska hållas (latin)",
    "Lexin020097": "Avtal om något olagligt eller omoraliskt (gäller ej)",
    "Lexin020164": "Bevis på att fastigheten är pantsatt",
    "Lexin020167": "Rätt att ta egendom om lånet inte betalas",
    "Lexin020168": "Säkerhet i egendom",
    "Lexin020169": "Att lämna något som säkerhet för lån",
    "Lexin020204": "Del av lagtext (§)",
    "Lexin020247": "Den som bråkar i domstolen (kärande eller svarande)",
    "Lexin020249": "Sidorna i en tvist",
    "Lexin020266": "Rätt att vara part i rättegången (t.ex. måste man finnas)",
    "Lexin020267": "Förhör med kärande eller svarande (inte vittne)",
    "Lexin020268": "Rättskapacitet i rättegång",
    "Lexin020269": "Att kunna vara part i mål",
    "Lexin020272": "Bevis genom vad parten säger",
    "Lexin020304": "Krav på pass vid resa",
    "Lexin020317": "PRV (myndighet för patent och varumärken)",
    "Lexin020319": "Immaterialrätt",
    "Lexin020320": "Att stjäla någons uppfinning",
    "Lexin020354": "Förhörsmetod (Planning, Engage, Account, Closure, Evaluation)",
    "Lexin020391": "Att göra falska pengar",
    "Lexin020393": "Lån av pengar",
    "Lexin020394": "Att göra svarta pengar vita",
    "Lexin020467": "Rätt att bo i Sverige för alltid (PUT)",
    "Lexin020468": "Permanent uppehållstillstånd",
    "Lexin020470": "Bostad där man bor jämt (inte sommarstuga)",
    "Lexin020476": "Ändring av stiftelse eller testamente av myndighet",
    "Lexin020495": "Namn, födelsedatum och sånt",
    "Lexin020507": "Vittnen och sakkunniga (människor som bevis)",
    "Lexin020509": "Tvång mot person (t.ex. häktning eller reseförbud)",
    "Lexin020523": "Skada på människa (fysisk eller psykisk)",
    "Lexin020527": "Information som kan kopplas till en person",
    "Lexin020528": "Data om personer (namn, bild, ip-nummer)",
    "Lexin020529": "Lagen om personuppgifter (ersatt av GDPR)",
    "Lexin020532": "Utredning om den misstänktes liv (för straffet)",
    "Lexin020666": "PBL (lagen om hur man får bygga)",
    "Lexin020667": "Mål om bygglov m.m.",
    "Lexin020794": "Slutanförande i rättegången",
    "Lexin020795": "Advokatens tal till domstolen på slutet",
    "Lexin020796": "Slutpläderingar",
    "Lexin020836": "Dokument med regler/policy",
    "Lexin020845": "Cell hos polisen (max 24 timmar)",
    "Lexin020846": "Område som en viss polisstyrka ansvarar för",
    "Lexin020847": "Polisområde",
    "Lexin020848": "Polismyndigheten",
    "Lexin020850": "Svensk polis utomlands (FN-tjänst)",
    "Lexin020851": "Regeringens regler för polisen",
    "Lexin020853": "Myndigheten Polisen",
    "Lexin020856": "Polischef",
    "Lexin020857": "Politiker som har insyn i polisen",
    "Lexin020859": "Hur polisen är organiserad",
    "Lexin020861": "Polisanmälan eller promemoria",
    "Lexin020863": "Polisarbete",
    "Lexin020864": "Polisväsendet",
    "Lexin020872": "Var man står politiskt",
    "Lexin020939": "Att domen kan verkställas (kronofogden kan agera)",
    "Lexin020948": "Tidning för kungörelser och konkurser",
    "Lexin021034": "Domsom blir vägledande för andra domstolar",
    "Lexin021036": "Tillstånd att överklaga till HD för att få ett prejudikat",
    "Lexin021037": "Högsta domstolen eller Högsta förvaltningsdomstolen",
    "Lexin021038": "Varning om att bevis inte får tas med om de kommer in för sent",
    "Lexin021073": "När tiden gått ut så man inte kan dömas eller kräva pengar",
    "Lexin021074": "Att brottet eller skulden är för gammal",
    "Lexin021085": "Granskar om tidningar brutit mot reglerna (numera MO)",
    "Lexin021099": "Att förhindra brott",
    "Lexin021101": "Förebyggande (avskräckande)",
    "Lexin021122": "Att översätta text muntligt direkt när man ser den",
    "Lexin021136": "Att chefen ansvarar för vad de anställda gör",
    "Lexin021142": "Låneivare som har säkerhet (pant) och får betalt först",
    "Lexin021143": "De som går före i konkus",
    "Lexin021152": "Belopp som ändras varje år och styr bidrag m.m.",
    "Lexin021161": "Advokat man väljer och betalar själv",
    "Lexin021163": "Aktiebolag som inte säljs på börsen",
    "Lexin021172": "Regler mellan privatpersoner (familjerätt, avtalsrätt)",
    "Lexin021173": "Föreningar och bolag (ej statliga)",
    "Lexin021176": "Fördelar eller undantag från straff",
    "Lexin021193": "Rättegång",
    "Lexin021195": "Rätt att föra talan (t.ex. ombud)",
    "Lexin021196": "Förmåga att förstå rättegången (psykiskt)",
    "Lexin021198": "Domarens styrning av rättegången",
    "Lexin021199": "Hur domstolen driver målet framåt",
    "Lexin021200": "Grundregel för rättegången",
    "Lexin021201": "Muntlighet, omedelbarhet, offentlighet m.m.",
    "Lexin021202": "Principerna för rättegången",
    "Lexin021203": "Lagen om hur rättegångar går till (rättegångsbalken)",
    "Lexin021205": "Grundord i processrätt (talan, laga kraft osv.)",
    "Lexin021210": "Amsvar för skador som en produkt orsakar",
    "Lexin021221": "Att varor inte ska vara farliga",
    "Lexin021222": "Lag om att produkter måste vara säkra"
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
