
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch7.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin001050": "Fil som används för att jämna till ansatser på trä",
    "Lexin001060": "Skydd för ansiktet vid arbete",
    "Lexin001063": "Inköp av material eller tjänster",
    "Lexin001064": "Köpa ny mark för att ersätta mark som tagits i anspråk",
    "Lexin001070": "Koppla samman delar eller system",
    "Lexin001073": "Plats eller punkt där två saker kopplas ihop",
    "Lexin001074": "Enhet som används för att göra en elektrisk anslutning",
    "Lexin001075": "Sladd som används för att koppla in en apparat",
    "Lexin001076": "Rör eller kanal för att dra ledningar",
    "Lexin001077": "Komponent för att fästa en elektrisk ledare",
    "Lexin001078": "Ledningar som går från huvudnätet till fastigheten",
    "Lexin001079": "Måtten på den del som ska anslutas",
    "Lexin001080": "Plint där en eller flera ledare kan anslutas",
    "Lexin001081": "Det håll som anslutningen sker ifrån",
    "Lexin001082": "Ritning som visar hur delar ska kopplas ihop",
    "Lexin001083": "Den elektriska spänning som krävs vid anslutning",
    "Lexin001084": "Tabell som visar vilka anslutningar som ska göras",
    "Lexin001126": "Person som leder arbetet och har ansvar på en arbetsplats",
    "Lexin001127": "Besiktning för att fastställa vem som ansvarar för fel",
    "Lexin001132": "Hur ansvaret är uppdelat mellan olika parter",
    "Lexin001133": "Försäkring som täcker skadeståndsskyldighet",
    "Lexin001135": "Det område eller de uppgifter någon ansvarar för",
    "Lexin001138": "Verktyg för att driva in spik eller liknande",
    "Lexin001140": "Åtdragning av bult eller skruv till viss kraft",
    "Lexin001141": "Fel som uppstår vid montering eller åtdragning",
    "Lexin001158": "Besked om att ett anbud eller en ansökan godtagits",
    "Lexin001171": "Arbete för att motverka mutor och oegentligheter",
    "Lexin001202": "Hårt kol med hög kolhalt",
    "Lexin001209": "Material som lätt kan börja brinna",
    "Lexin001211": "Det att något börjar brinna",
    "Lexin001213": "Peka ut eller tilldela plats/resurser",
    "Lexin001214": "Pengar som avsatts för ett visst ändamål",
    "Lexin001220": "Område som pekats ut för viss användning i plan",
    "Lexin001221": "Person eller organisation som brukar byggnaden",
    "Lexin001227": "Förbud mot att använda en byggnad eller anläggning",
    "Lexin001228": "Vad något ska användas till",
    "Lexin001261": "Lägga på eller stryka på (t.ex. färg)",
    "Lexin001305": "Undersökning av hur ett arbete utförs",
    "Lexin001306": "Inställning till arbetet",
    "Lexin001315": "Bänk anpassad för att utföra arbete vid",
    "Lexin001430": "Yta eller storlek på ett område",
    "Lexin001453": "Linjal med olika skalor som används av arkitekter",
    "Lexin001461": "Hållare för ljuskälla (lampa) eller vattenkran",
    "Lexin001476": "Betong förstärkt med stål",
    "Lexin001479": "Stål eller nät som gjuts in i betong för styrka",
    "Lexin001480": "Lista över all armering som ingår i konstruktionen",
    "Lexin001481": "Järnstänger för armering av betong",
    "Lexin001482": "Verktyg för att klippa armeringsjärn",
    "Lexin001483": "Färdigmonterad korg av armering",
    "Lexin001484": "Svetsat nät av armeringsjärn",
    "Lexin001485": "Nät av stål för armering",
    "Lexin001486": "Ritning som visar hur armeringen ska placeras",
    "Lexin001487": "Detaljerad beskrivning av armeringen",
    "Lexin001488": "Stål avsett för armering",
    "Lexin001489": "Stång av stål för armering",
    "Lexin001493": "Kran med en utliggande arm",
    "Lexin001495": "Skydd för armarna vid arbete",
    "Lexin001508": "Hyra mark eller fastighet på lång tid",
    "Lexin001579": "Område belagt med asfalt",
    "Lexin001581": "Naturligt förekommande fast asfalt",
    "Lexin001582": "Lim baserat på asfalt",
    "Lexin001583": "Asfalt löst i lösningsmedel",
    "Lexin001584": "Blandning av asfalt och stenmaterial",
    "Lexin001585": "Papp impregnerad med asfalt (takpapp)",
    "Lexin001586": "Redskap för att jämna ut asfalt",
    "Lexin001587": "Person som arbetar med asfaltering",
    "Lexin001588": "Arbetet att lägga ut asfalt",
    "Lexin001589": "Spridning av asfalt på vägbanan",
    "Lexin001590": "Maskin som skär i asfalt",
    "Lexin001591": "Anläggning där asfalt tillverkas",
    "Lexin001604": "Process där aska återanvänds",
    "Lexin001679": "Inglasad innergård eller ljusgård",
    "Lexin001775": "Tång för att klippa av tråd eller spik",
    "Lexin001778": "Tillfälligt stopp i arbetet eller driften",
    "Lexin001779": "Tiden då driften ligger nere",
    "Lexin001792": "Del av en organisation eller byggnad",
    "Lexin001793": "Chef för en avdelning",
    "Lexin001797": "Betongyta som jämnats med rätskiva",
    "Lexin001798": "Yta som har jämnats till",
    "Lexin001799": "Metod att jämna av nylagd betong",
    "Lexin001805": "Vätskas övergång till gasform",
    "Lexin001810": "Material som kasseras (sopor)",
    "Lexin001811": "Plats för hantering av avfall",
    "Lexin001812": "Kärl för insamling av avfall",
    "Lexin001813": "System för att ta hand om avfall",
    "Lexin001814": "Rör eller lucka för att kasta sopor i",
    "Lexin001816": "Rum avsett för soptunnor",
    "Lexin001817": "Utrymme för sopsortering/hantering",
    "Lexin001818": "Anläggning som behandlar avfall",
    "Lexin001821": "Väg som leder bort från en motorväg",
    "Lexin001822": "Borttagning av fett och olja",
    "Lexin001823": "När färg eller puts lossnar i flagor",
    "Lexin001853": "Energi som lämnar ett system",
    "Lexin001854": "Värme som strålar ut eller avges",
    "Lexin001887": "Filter som tar bort kalk ur vatten",
    "Lexin001892": "Borttagning av is från t.ex. tak eller flygplan",
    "Lexin001893": "Göra en yta plan och slät",
    "Lexin001894": "Betonggolv som har jämnats av",
    "Lexin001895": "Slät och jämn yta",
    "Lexin001896": "Verktyg eller maskin för avjämning"
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
