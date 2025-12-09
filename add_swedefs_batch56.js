
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch56.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin012861": "Skriftligt meddelande till domstolen",
    "Lexin012897": "Den som har saken (besittning)",
    "Lexin012899": "Tiden man ägt eller haft något",
    "Lexin012942": "Inbördeskrig",
    "Lexin012989": "Myndighet som registrerar fastigheter (Lantmäteriet)",
    "Lexin012995": "Begränsning",
    "Lexin013030": "Vårdinrättning eller fängelse",
    "Lexin013037": "Att komma till rätten när man är kallad",
    "Lexin013042": "Vad man tycker om anklagelsen (erkänner/förnekar)",
    "Lexin013073": "Person som sitter i fängelse",
    "Lexin013108": "Övervakning med fotboja",
    "Lexin013115": "Tillfälligt beslut som gäller tills vidare",
    "Lexin013117": "Tillfälligt beslut om t.ex. vårdnad",
    "Lexin013118": "Krav på ett tillfälligt beslut",
    "Lexin013216": "Gammalt namn på flyktingbyrå",
    "Lexin013239": "Protest mot ett krav",
    "Lexin013288": "Rätt för barnbarn att ärva om föräldern är död",
    "Lexin013400": "Den som har jour (jobbar natt/helg)",
    "Lexin013407": "Åklagare som jobbar utanför kontorstid",
    "Lexin013454": "Företag eller förening som kan ha rättigheter (inte en människa)",
    "Lexin013455": "Hjälp av en jurist",
    "Lexin013458": "Område där en domstol har makt",
    "Lexin013523": "Att män och kvinnor har samma rättigheter",
    "Lexin013654": "Brev om att man måste komma till domstolen",
    "Lexin013655": "Hyra där värme och el inte ingår",
    "Lexin013690": "Domstolen över förvaltningsrätten",
    "Lexin013695": "Vanlig åklagare",
    "Lexin013833": "Undersökning av läget (t.ex. brottslighet)",
    "Lexin014024": "När man klagar på bodelningen i domstol",
    "Lexin014025": "När man klagar på ett testamente för att göra det ogiltigt",
    "Lexin014072": "Villkor i ett avtal",
    "Lexin014099": "Person som anlitar en advokat",
    "Lexin014408": "Risk att den misstänkte förstör bevis eller påverkar vittnen",
    "Lexin014648": "Lagar om fri konkurrens (mot karteller)",
    "Lexin014662": "Domare som beslutar om konkurs",
    "Lexin014745": "Lagen om lån till privatpersoner",
    "Lexin014756": "Gräl mellan kund och säljare",
    "Lexin014773": "Förbud att besöka eller kontakta en person",
    "Lexin014798": "Att lura någon med kreditkort",
    "Lexin014817": "Vård istället för fängelse (om man går med på det)",
    "Lexin014826": "Tillsyn eller visitering",
    "Lexin014929": "Mutor och maktmissbruk",
    "Lexin014944": "När motpartens advokat förhör ett vittne",
    "Lexin015086": "Att handla på avbetalning",
    "Lexin015123": "Fängelsestraff",
    "Lexin015125": "Frivård (straff ute i samhället)",
    "Lexin015131": "Kriminalvården",
    "Lexin015200": "Myndighet som driver in skulder (Kronofogden)",
    "Lexin015473": "Fortfarande häktad",
    "Lexin015474": "Beslut att man ska stanna i häktet",
    "Lexin015477": "Att hålla kvar någon",
    "Lexin015515": "Skyddat boende för kvinnor",
    "Lexin015527": "Betala en skuld genom att stryka en motfordran",
    "Lexin015536": "Att reservera platser för en viss grupp",
    "Lexin015677": "Det käranden begär i målet",
    "Lexin015761": "Att tvinga någon till sexuell handling eller kroppskontakt",
    "Lexin015763": "Handel med människor (slaveri/prostitution)",
    "Lexin015764": "Olaglig relation (historisk term eller felöversättning)",
    "Lexin015814": "Lag om att lämna ut brottslingar till andra länder",
    "Lexin015823": "Giltigt skäl att inte komma (t.ex. sjukdom)",
    "Lexin015824": "När domen inte längre kan överklagas",
    "Lexin015825": "Dom som vunnit laga kraft (slutgiltig)",
    "Lexin015844": "Utbildad domare (jurist)",
    "Lexin015850": "Att ställa någon inför rätta och straffa dem",
    "Lexin015858": "Den del av arvet barnen alltid har rätt till (hälften)",
    "Lexin015859": "Person som följer lagen",
    "Lexin015869": "Paragrafen i lagen som gäller",
    "Lexin015876": "De som stiftar lagar (Riksdagen)",
    "Lexin015878": "Lagar och regler",
    "Lexin015886": "Ändring i lagen",
    "Lexin015887": "Brott mot lagen",
    "Lexin016100": "Ingen får straffas utan lagstöd",
    "Lexin016102": "Viss sak man får i testamente (t.ex. en klocka)",
    "Lexin016110": "ID-kort eller behörighet (t.ex. läkare)",
    "Lexin016112": "Visa vem man är (ID)",
    "Lexin016129": "Person utan specialistkunskap (eller nämndeman)",
    "Lexin016160": "Ha extremt lite pengar (existensminimum)",
    "Lexin016236": "Brott av samma typ",
    "Lexin016507": "Lag om tvångsvård inom psykiatrin",
    "Lexin016568": "Lag om straff för ungdomar",
    "Lexin016629": "Lag om tvångsvård av missbrukare",
    "Lexin016633": "Lag om tvångsvård av unga",
    "Lexin016801": "Att sluta utreda brottet (lägga ner)",
    "Lexin016998": "Pengar från staten om arbetsgivaren går i konkurs",
    "Lexin017032": "Allt som inte är fastigheter (pengar, bilar, aktier)",
    "Lexin017138": "Att använda sin makt fel",
    "Lexin017200": "Att betala en borgenär men inte andra (brott)",
    "Lexin017400": "Avsiktligt och kallblodigt",
    "Lexin017417": "Vilket land man tillhör",
    "Lexin017422": "Att avkunna domen",
    "Lexin017449": "Hålla med om (erkänna sakomständighet)",
    "Lexin017455": "Godkännande",
    "Lexin017459": "Att hjälpa någon att begå brott",
    "Lexin017483": "Försöka få parterna att komma överens",
    "Lexin017492": "Möte mellan brottsoffer och gärningsman",
    "Lexin017515": "Att ha bidragit till skadan själv",
    "Lexin017662": "Mål om uppehållstillstånd och asyl",
    "Lexin017706": "Brott som skadar naturen",
    "Lexin017717": "Miljöbalken",
    "Lexin017745": "Person under 18 år"
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
