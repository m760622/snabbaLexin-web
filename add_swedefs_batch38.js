
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch38.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin009855": "Lag om hur myndigheter ska handlägga ärenden",
    "Lexin009858": "Lag om hur man överklagar myndighetsbeslut i domstol",
    "Lexin009859": "Domstol som dömer i förvaltningsmål (skatt, försäkringskassan m.m.)",
    "Lexin009861": "Första instans i förvaltningsdomstolarna",
    "Lexin009862": "Som rör förvaltningsrätt",
    "Lexin009863": "Lagar som styr myndigheternas verksamhet",
    "Lexin009867": "Att ljuga om vem som är ens barn eller förälder",
    "Lexin009870": "Att ändra i ett äkta dokument så det blir falskt",
    "Lexin009879": "Beslut att sätta någon i förvar (låsa in)",
    "Lexin009881": "Mista rätten till något",
    "Lexin009884": "När staten tar hand om brottsverktyg eller vinst från brott",
    "Lexin009885": "När man förlorar rätten att ärva",
    "Lexin009888": "När man förlorar äganderätten till något",
    "Lexin009916": "Skaffa sig (köpa, ärva, få)",
    "Lexin009925": "Tillstånd att få köpa fastighet (förr)",
    "Lexin009956": "Begå brott",
    "Lexin009958": "Den som gjort brottet",
    "Lexin010103": "När båda parter vill samma sak (t.ex. skiljas)",
    "Lexin010109": "Att bo och leva ihop som en familj",
    "Lexin010126": "Högsta chef för en statlig myndighet",
    "Lexin010131": "Luddig lagregel som täcker in mycket",
    "Lexin010132": "Generalregeln",
    "Lexin010141": "Högsta chef i en organisation (t.ex. FN, Röda Korset)",
    "Lexin010144": "När föräldrarna lämnar över företaget till barnen",
    "Lexin010154": "DNA-test",
    "Lexin010155": "FN-regler om flyktingar",
    "Lexin010165": "Svaromål eller motbevisning",
    "Lexin010314": "Bestickning (att muta)",
    "Lexin010458": "Etiska regler för advokater",
    "Lexin010459": "Rätt sätt att bokföra på",
    "Lexin010460": "Etiska regler för mäklare",
    "Lexin010461": "Etiska regler för inkasso",
    "Lexin010463": "Regler för vad tidningar får skriva",
    "Lexin010464": "Regler för hur bokföring ska göras",
    "Lexin010465": "Etiska regler för tolkar",
    "Lexin010472": "Personer som hjälper andra med ekonomi och rätt",
    "Lexin010479": "Uppdraget att vara god man",
    "Lexin010488": "Att köpa något av någon som inte ägde det (men man trodde det)",
    "Lexin010491": "När myndigheter gör som de vill utan lagstöd",
    "Lexin010585": "Papper som visar om huset är belånat",
    "Lexin010587": "Bevis om inteckningar",
    "Lexin010627": "Brott mot gravfrid",
    "Lexin010640": "Ta fast en misstänkt",
    "Lexin010642": "Frihetsberövande av misstänkt (max 12 timmar)",
    "Lexin010666": "Upprepade kränkningar mot närstående (kvinnofridskränkning)",
    "Lexin010668": "Misshandel som ger svåra skador",
    "Lexin010678": "Allvarlig (om brott)",
    "Lexin010694": "Varför man vill ha rätt (juridiskt stöd)",
    "Lexin010711": "Första utredningen hos Migrationsverket",
    "Lexin010734": "Det ursprungliga ärendet",
    "Lexin010743": "Boende med personal för flera personer",
    "Lexin010745": "Grupptalan (många stämmer en)",
    "Lexin010787": "Passkontroll vid gränsen",
    "Lexin010792": "Bevakning av gränsen",
    "Lexin010948": "Den som ger en gåva",
    "Lexin010949": "Gåvobrev",
    "Lexin010950": "Saker man får gratis",
    "Lexin010952": "Den som får gåvan",
    "Lexin010972": "Handling (oftast brottslig)",
    "Lexin010974": "Åklagarens beskrivning av vad som hänt",
    "Lexin011013": "Komma överens utan rättegång (förlikning)",
    "Lexin011126": "Syskon som bara har en gemensam förälder",
    "Lexin011133": "Boende för fångar i slutet av strafftiden",
    "Lexin011165": "Mutbrott där man betalar för påverkan",
    "Lexin011167": "Hur man brukar göra i branschen (praxis)",
    "Lexin011189": "DO (ansvarar även för funktionshinder)",
    "Lexin011202": "Rätt att ingå avtal och sköta sina affärer",
    "Lexin011203": "Rätten att läsa myndigheternas dokument",
    "Lexin011206": "Krav på att ett visst handlande skett för att det ska vara brott",
    "Lexin011215": "De olika stegen i en process",
    "Lexin011218": "Sak som lämnas som säkerhet för lån",
    "Lexin011275": "Köra för fort",
    "Lexin011304": "Att sköta sig och följa lagen",
    "Lexin011306": "Laglydigt liv",
    "Lexin011309": "Våld i namn av heder",
    "Lexin011355": "Syskon med samma mamma och pappa",
    "Lexin011384": "När säljaren kommer hem till dig",
    "Lexin011385": "Avtal vid dörrknackning",
    "Lexin011397": "Dold kameraövervakning (kräver beslut)",
    "Lexin011398": "Kameraövervakning i lönndom",
    "Lexin011400": "Buggningsutrustning i rum",
    "Lexin011403": "Telefonavlyssning",
    "Lexin011405": "Koll på vem någon ringer (inte vad som sägs)",
    "Lexin011451": "Lån från CSN för flyktingar att köpa möbler",
    "Lexin011515": "Något som gör att rättegången inte kan starta",
    "Lexin011518": "Koll hos Skatteverket att man får gifta sig",
    "Lexin011520": "Att förstöra bevis",
    "Lexin011521": "Att blockera vägen med flit",
    "Lexin011680": "Dragningskraft till samma kön",
    "Lexin011742": "Instansen över tingsrätten",
    "Lexin011743": "Domstolar i andra instans",
    "Lexin011744": "Domare som är under utbildning i hovrätten",
    "Lexin011745": "Yngre jurister i hovrätten",
    "Lexin011746": "Chef för en avdelning på hovrätten",
    "Lexin011747": "Ordinarie domare i hovrätten",
    "Lexin011784": "Skäl att få stanna av medmänsklighet (t.ex. sjukdom)",
    "Lexin011835": "Att dela ekonomi och hem",
    "Lexin011873": "Rättegången där allt avgörs",
    "Lexin011874": "Själva rättegångstillfället",
    "Lexin011875": "Förhör som hålls av den som kallat vittnet"
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
fs.writeFileSync(dataPath, newContent, 'utf8');
fs.unlinkSync(tempFile);
