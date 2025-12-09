
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch13.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin006777": "Åtagande att utföra ett arbete (bygge) åt beställare",
    "Lexin006778": "Typ av avtal mellan beställare och entreprenör",
    "Lexin006779": "Ingenjör som arbetar hos entreprenadföretag",
    "Lexin006780": "Den totala summan entreprenaden kostar",
    "Lexin006781": "Tiden som entreprenaden pågår",
    "Lexin006783": "Företag som utför arbete åt en beställare",
    "Lexin006789": "Vält med en vals för packning av asfalt/jord",
    "Lexin006826": "Fogfritt golv av härdplast (epoxi)",
    "Lexin006841": "Att ta tillvara lärdomar från tidigare projekt",
    "Lexin006861": "Nötning av markytan genom vind eller vatten",
    "Lexin006862": "Åtgärder för att förhindra erosion",
    "Lexin006872": "Krav på ekonomisk ersättning",
    "Lexin006874": "Del som ersätter en utsliten eller trasig del",
    "Lexin006912": "Byggmaterial av cement blandat med asbest (äldre)",
    "Lexin006913": "Plattor av eternit (fasad/tak)",
    "Lexin006955": "Gemensamma europeiska regler för byggkonstruktion",
    "Lexin007036": "Infästning som expanderar i borrhålet",
    "Lexin007037": "Skruv som expanderar för säker infästning",
    "Lexin007039": "Behållare som tar upp volymändringar i värmesystem",
    "Lexin007057": "Utnyttjande av mark för bebyggelse",
    "Lexin007058": "Avtal mellan kommun och byggherre om utbyggnad",
    "Lexin007059": "Kostnader för gator, VA och park vid utbyggnad",
    "Lexin007060": "Område som ska bebyggas eller utvecklas",
    "Lexin007064": "Kraftig och snabb expansion (sprängning)",
    "Lexin007066": "Ämne som kan explodera",
    "Lexin007088": "Byggnadens utsida",
    "Lexin007110": "Mekanisk frånluftsventilation",
    "Lexin007120": "Byggnad för industriell tillverkning",
    "Lexin007123": "Betong som blandas på fabrik och körs ut",
    "Lexin007124": "Hus där fabriksverksamhet bedrivs",
    "Lexin007125": "Tillverkning som sker industriellt i fabrik",
    "Lexin007128": "Utrymmen eller utrustning som underlättar verksamheten",
    "Lexin007146": "Person som företräder facket på arbetsplatsen",
    "Lexin007152": "Bärande konstruktion av stänger i trianglar",
    "Lexin007153": "Konstruktion uppbyggd som ett fackverk",
    "Lexin007172": "Blad med teknisk information om en produkt",
    "Lexin007187": "Krav på betalning för vara eller tjänst",
    "Lexin007188": "Att skicka fakturor",
    "Lexin007204": "Den höjd som vatten faller (i kraftverk eller ledning)",
    "Lexin007207": "Skydd mot att falla från hög höjd",
    "Lexin007208": "Sele och linor för arbete på hög höjd",
    "Lexin007212": "Att böja ihop plåtkanter (falsa)",
    "Lexin007226": "Måttet på en fals (t.ex. på dörr eller plåt)",
    "Lexin007227": "Metod att sammanfoga plåt genom vikning",
    "Lexin007228": "Verktyg för att göra falsar i plåt",
    "Lexin007229": "Takpanna som hakar i varandra (falstaktegel)",
    "Lexin007268": "Tunt skikt av fint trä limmat på sämre trä",
    "Lexin007269": "Smal remsa av fanér (t.ex. för kanttäckning)",
    "Lexin007296": "Risk för skada",
    "Lexin007298": "Risk som hotar hälsa eller säkerhet",
    "Lexin007312": "Spänning som är livsfarlig (högspänning)",
    "Lexin007313": "Avfall som är giftigt eller miljöfarligt",
    "Lexin007314": "Gods som kräver särskild hantering (kemikalier etc)",
    "Lexin007315": "Situation som innebär akut fara",
    "Lexin007341": "Tegel avsett för fasadmurning (synligt)",
    "Lexin007342": "Material som täcker fasaden (panel, puts, plåt)",
    "Lexin007343": "Förtillverkad del till fasaden",
    "Lexin007344": "Glas använt som fasadmaterial",
    "Lexin007345": "Hängställning för arbete på fasad",
    "Lexin007346": "Plåt som täcker fasaden",
    "Lexin007347": "Ritning som visar huset rakt framifrån/från sidan",
    "Lexin007348": "Tegelstenar avsedda att synas i fasaden",
    "Lexin007360": "Kantsten med en snedställd yta (fas)",
    "Lexin007362": "Maskin för att göra en fas (snedkant)",
    "Lexin007370": "Avfall i fast form (ej flytande)",
    "Lexin007371": "Bestämd summa som inte ändras",
    "Lexin007372": "Berg som sitter fast i berggrunden",
    "Lexin007374": "Pris som är bestämt i förväg och inte ändras",
    "Lexin007375": "Punkt med kända koordinater (fixpunkt)",
    "Lexin007376": "Skyddsanordning som inte kan flyttas enkelt",
    "Lexin007377": "Upplag som är fast inspänt",
    "Lexin007403": "Person som sköter om fastigheten (vaktmästare)",
    "Lexin007404": "Tillsyn och vård av fastigheter",
    "Lexin007477": "Som innehåller fel",
    "Lexin007480": "Virke utan kvistar eller skador",
    "Lexin007481": "Signal som visar att ett fel uppstått",
    "Lexin007482": "Att hitta var felet finns",
    "Lexin007483": "Orsaken till att något går sönder",
    "Lexin007485": "Konstruerad så att fel inte leder till olycka",
    "Lexin007486": "Arbetet att leta efter fel",
    "Lexin007487": "Tiden det tar att hitta felet",
    "Lexin007488": "Förmåga att fungera trots vissa fel",
    "Lexin007538": "Filter som fångar upp fett (i köksfläkt)",
    "Lexin007551": "Duk av syntetfiber för markarbeten (geotextil)",
    "Lexin007552": "Riktningen på fibrerna i t.ex. trä",
    "Lexin007611": "Anordning som renar vätska eller gas",
    "Lexin007612": "Duk som används i filter",
    "Lexin007613": "Utrymme där filter är placerade",
    "Lexin007617": "Processen att rena genom filter",
    "Lexin007628": "Små partiklar i betongblandning (sand)",
    "Lexin007633": "Sättet att skaffa pengar till projektet",
    "Lexin007634": "Plan för hur kapitalet ska anskaffas",
    "Lexin007654": "Finkornigt grus",
    "Lexin007655": "Yta gjord mycket slät med hyvel",
    "Lexin007659": "Jord med små partiklar (lera, silt)",
    "Lexin007669": "Makadam med liten kornstorlek",
    "Lexin007669": "Makadam med liten bitstorlek",
    "Lexin007681": "Att putsa ytan mycket slät",
    "Lexin007686": "Att slipa ytan mycket fin/slät",
    "Lexin007687": "Som har en mycket slät yta",
    "Lexin007689": "Den sista slipningen för perfekt yta"
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
