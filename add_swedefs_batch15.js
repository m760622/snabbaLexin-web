
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch15.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin008628": "Förmåga att stå emot fukt utan att skadas",
    "Lexin008629": "Mängd vatten som finns i ett material",
    "Lexin008632": "Skikt som hindrar fukttransport",
    "Lexin008633": "Vattnets vikt i förhållande till materialets torrvikt",
    "Lexin008634": "Bekymmer med fukt, t.ex. mögel",
    "Lexin008635": "Åtgärd för att hindra fukt från att tränga in",
    "Lexin008636": "Material eller metod som stoppar fukt",
    "Lexin008637": "Som tål fukt bra",
    "Lexin008687": "Block av cellplast eller betong för grundläggning",
    "Lexin008689": "Den del av byggnaden som vilar mot marken (grund)",
    "Lexin008693": "När något fungerar som det ska",
    "Lexin008696": "Medel mot svamp och mögel",
    "Lexin008708": "När något inte fungerar som det ska",
    "Lexin008711": "Krav på hur byggnaden ska fungera",
    "Lexin008715": "Säkerhet mot att fel uppstår",
    "Lexin008716": "Den tid något beräknas fungera (livslängd)",
    "Lexin008734": "Virke från tall",
    "Lexin008736": "Skiva av limmade lager furufanér",
    "Lexin008737": "Sågat virke av tall",
    "Lexin008749": "Massor av jord/sten för att höja marknivån",
    "Lexin008751": "Att lägga på massor",
    "Lexin008760": "Material som används för fyllning",
    "Lexin008761": "Plats där fyllning sker",
    "Lexin008762": "Område avsett för utfyllnad",
    "Lexin008775": "Stolpe med kvadratiskt tvärsnitt",
    "Lexin008788": "Som rör kroppen eller materian",
    "Lexin008791": "Belastning på kroppen vid arbete",
    "Lexin008857": "Provtagning på plats ute på bygget",
    "Lexin008858": "Undersökning gjord på platsen",
    "Lexin008874": "Yta som är helt klar",
    "Lexin008876": "Betong som levereras färdigblandad",
    "Lexin008878": "När byggnaden blir klar",
    "Lexin008879": "Året då bygget blev klart",
    "Lexin008880": "Tiden för att göra klart projektet",
    "Lexin008881": "Som är klar att användas",
    "Lexin008893": "Putsbruk som innehåller pigment",
    "Lexin008899": "Beteckning (t.ex. NCS) som anger exakt kulör",
    "Lexin008902": "Litet prov för att se färgen",
    "Lexin008903": "Verktyg för sprutmålning",
    "Lexin008954": "Krav som uppstår som följd av ett annat krav",
    "Lexin008966": "Öppning i vägg med glas",
    "Lexin008967": "Hylla invändigt vid fönstrets nederkant",
    "Lexin008968": "Ramen som rutan sitter i",
    "Lexin008969": "Massan som håller rutan på plats",
    "Lexin008999": "Person som kör maskin eller fordon",
    "Lexin009012": "Låda med material för första hjälpen",
    "Lexin009034": "Besiktning innan slutbesiktning",
    "Lexin009035": "Protokoll från förbesiktningen",
    "Lexin009043": "Punkt där två delar möts",
    "Lexin009044": "Skruv för att sätta ihop delar",
    "Lexin009062": "Material som går åt (t.ex. skruv, spik, blad)",
    "Lexin009063": "Vara som förbrukas",
    "Lexin009070": "Gaser från eldning eller motorer",
    "Lexin009076": "Skylt som visar vad som är förbjudet",
    "Lexin009079": "Göra något bättre (renovera)",
    "Lexin009083": "Insats för att höja kvaliteten",
    "Lexin009088": "Uppdelning av kostnader eller resurser",
    "Lexin009162": "Enklare metod för att bestämma dimensioner",
    "Lexin009168": "Bestämmelse som måste följas",
    "Lexin009198": "Hälsovård kopplad till arbetet",
    "Lexin009199": "Stämningen på företaget",
    "Lexin009201": "Värderingar och vanor i ett företag",
    "Lexin009202": "Företag som köper tjänster",
    "Lexin009203": "ID-kort för anställda (ID06)",
    "Lexin009295": "Att diskutera för att nå en överenskommelse",
    "Lexin009428": "Djupet där ledningar läggs ner",
    "Lexin009459": "Göra mindre",
    "Lexin009497": "Energi som inte tar slut (sol, vind)",
    "Lexin009514": "Regel beslutad av regeringen",
    "Lexin009517": "Luft med dålig kvalitet",
    "Lexin009522": "Nersmutsning av miljö",
    "Lexin009523": "Skadliga ämnen",
    "Lexin009571": "När något tar längre tid än planerat",
    "Lexin009626": "Betong med spänd armering för högre hållfasthet",
    "Lexin009655": "Undersökning innan projektet startar",
    "Lexin009668": "Betong med ilagd armering (stål)",
    "Lexin009675": "Slarvig",
    "Lexin009719": "Avtal om ekonomiskt skydd",
    "Lexin009727": "Det skydd försäkringen ger",
    "Lexin009731": "Att sälja varor/tjänster",
    "Lexin009739": "Verktyg för att göra hål för skruvskalle",
    "Lexin009759": "System för vatten, el, avlopp",
    "Lexin009760": "Urtag i virke för sammanfogning",
    "Lexin009848": "Skötsel och administration av fastigheter",
    "Lexin009850": "Chef för en förvaltning",
    "Lexin009910": "Vad man tror ska hända",
    "Lexin009967": "Truck med gafflar för lyft",
    "Lexin010041": "Besiktning innan garantitiden går ut",
    "Lexin010044": "Skötsel som ingår i garantin",
    "Lexin010067": "Värmare som drivs med gasol",
    "Lexin010078": "Belysningsstolpe vid gata",
    "Lexin010079": "Sten för beläggning av gator",
    "Lexin010081": "Mark avsedd för gata",
    "Lexin010128": "När en entreprenör ansvarar för hela bygget (utom projektering)",
    "Lexin010146": "Maskin som producerar el",
    "Lexin010177": "Att genomföra projektet",
    "Lexin010178": "Tiden för genomförandet",
    "Lexin010216": "Systematisk ordning av former",
    "Lexin010217": "Som rör markens tekniska egenskaper",
    "Lexin010218": "Matta av konstmaterial för markarbeten"
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
