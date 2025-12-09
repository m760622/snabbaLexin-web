
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch55.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin009240": "Lag eller förordning (regler)",
    "Lexin009247": "Transportera någon (t.ex. till fängelse)",
    "Lexin009250": "Rätt att använda eller bestämma över",
    "Lexin009278": "Mindre allvarligt våld mot tjänsteman (sputta/knuffa)",
    "Lexin009298": "Sammanträde i rätten (rättegång)",
    "Lexin009343": "Person som övervakar att förhöret går rätt till",
    "Lexin009382": "Rätt att köpa före någon annan",
    "Lexin009398": "Överenskommelse för att slippa rättegång",
    "Lexin009458": "Saker som gör att straffet blir lägre",
    "Lexin009464": "Att ha ansvar för en omyndig person",
    "Lexin009486": "Säga att man inte gjort det",
    "Lexin009506": "Att kränka någons ära (fult ord)",
    "Lexin009512": "Få i uppdrag att vara god man",
    "Lexin009534": "Dömas att göra något (t.ex. betala)",
    "Lexin009596": "Pengar man får innan de egentligen ska betalas",
    "Lexin009597": "Pengar man får av föräldrar som dras från arvet sen",
    "Lexin009678": "Att låta bli att göra det man ska (slarv)",
    "Lexin009740": "Bestämma att någon är i konkurs",
    "Lexin009756": "Skyldighet enligt lag att betala mat/hyra för familj",
    "Lexin009828": "Polisens utredning av brott",
    "Lexin009830": "Dokumentation av polisens utredning",
    "Lexin009853": "Domstol som dömer mot myndigheter (t.ex. Försäkringskassan)",
    "Lexin009873": "Inlåsning av utlänning som ska utvisas",
    "Lexin009882": "Ta egendom från brottsling (statens egendom)",
    "Lexin009883": "Saker som staten tagit hand om",
    "Lexin009886": "Beslut att ta egendom",
    "Lexin009915": "Att köpa något utan att veta att det var stulet",
    "Lexin010000": "Rensa bort gamla handlingar",
    "Lexin010085": "Ge någon rätt att agera i ditt namn",
    "Lexin010105": "När båda föräldrarna ansvarar för barnet",
    "Lexin010108": "Solidariskt ansvar (alla ansvarar för allt)",
    "Lexin010149": "Ed som tolk svär en gång för alla",
    "Lexin010265": "Rätt till hälften av makens värde vid skilsmässa",
    "Lexin010281": "Som gäller (laglig)",
    "Lexin010305": "Person som hålls fången för utpressning",
    "Lexin010462": "Person som hjälper någon med ekonomi och rätt",
    "Lexin010564": "Noggrann kontroll",
    "Lexin010586": "Bevis om att fastigheten är belånad",
    "Lexin010626": "Att störa en grav eller skända en död",
    "Lexin010667": "Upprepat våld mot kvinna man lever med",
    "Lexin010671": "Mycket allvarlig våldtäkt (våld/flera gärningsmän)",
    "Lexin010672": "Livsfarlig körning",
    "Lexin010682": "Mycket allvarlig skadegörelse",
    "Lexin010693": "Skälet till stämningen",
    "Lexin010706": "Lagar som styr hur Sverige styrs (svåra att ändra)",
    "Lexin010746": "När många personer stämmer någon tillsammans",
    "Lexin010945": "Gåva mellan man och fru",
    "Lexin010946": "Papper som bevisar gåvan",
    "Lexin010958": "Den som är skyldig pengar",
    "Lexin010973": "Beskrivning av vad brottslingen gjort",
    "Lexin010976": "Den som gjort brottet",
    "Lexin011010": "Påstå att man har rätt till något",
    "Lexin011214": "Myndighetens arbete med ett ärende",
    "Lexin011220": "Förskott när man köper hus/bil",
    "Lexin011223": "Hjälp från Kronofogden att få tillbaka något",
    "Lexin011228": "Skriven med penna",
    "Lexin011280": "Brott pga offrets hudfärg/religion etc.",
    "Lexin011308": "Våld för att skydda släktens rykte",
    "Lexin011369": "HVB-hem (boende med vård)",
    "Lexin011381": "Att gå in hos någon utan lov",
    "Lexin011394": "Pass från det egna landet",
    "Lexin011402": "När polisen lyssnar på telefon i smyg",
    "Lexin011420": "Barn som bor hos föräldrarna",
    "Lexin011450": "Utredning av hur barnet har det hemma",
    "Lexin011454": "Där man bor och är folkbokförd",
    "Lexin011496": "Rasistiska uttalanden mot grupp",
    "Lexin011558": "Saker man hittat ute",
    "Lexin011845": "När polisen letar brottsbevis hemma hos någon",
    "Lexin011872": "Den stora rättegången",
    "Lexin011876": "Det viktigaste kravet i målet",
    "Lexin011881": "Den person som gode mannen hjälper",
    "Lexin011975": "Att bo i lägenhet man hyr",
    "Lexin012120": "Sätta i häkte (inlåst innan dom)",
    "Lexin012121": "Den som sitter i häkte",
    "Lexin012128": "Frihetsberövande under utredning",
    "Lexin012129": "Domstolens beslut att häkta",
    "Lexin012135": "Rättegång om personen ska häktas",
    "Lexin012137": "Anledning till häktning (t.ex. flyktrisk)",
    "Lexin012143": "Att köpa billigt och misstänka stöld",
    "Lexin012172": "Läkarundersökning (t.ex. för intyg)",
    "Lexin012217": "Hårdhet och brist på empati",
    "Lexin012268": "Avsluta ett kontrakt omedelbart",
    "Lexin012307": "Att förråda sitt land",
    "Lexin012366": "Ställa frågor till ett vittne",
    "Lexin012370": "Vittna under ed (tala sanning)",
    "Lexin012432": "Att vara ovetande om fel (ärlig)",
    "Lexin012471": "Förening som inte ska tjäna pengar (t.ex. fotboll)",
    "Lexin012474": "Skada som inte är ekonomisk (kränkning/sveda och värk)",
    "Lexin012486": "ID-kort",
    "Lexin012506": "Tvivla på uppgift",
    "Lexin012533": "När en lag börjar gälla",
    "Lexin012663": "Omständighet som tyder på brott (men inget bevis)",
    "Lexin012688": "Tvinga någon att betala skuld",
    "Lexin012722": "Komma till platsen",
    "Lexin012744": "Säkerhet för data och register",
    "Lexin012784": "Göra något (t.ex. polisen griper in)",
    "Lexin012800": "Stoppa ett beslut tills vidare",
    "Lexin012825": "Indrivning av skulder",
    "Lexin012838": "Förlorad inkomst (t.ex. vid skada)",
    "Lexin012841": "Kontroll av ekonomin för bidrag"
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
