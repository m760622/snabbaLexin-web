
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch14.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin007691": "Snickare som utför finsnickeri (möbler, inredning)",
    "Lexin007692": "Att spackla för att få en mycket slät yta",
    "Lexin007708": "Läggning av sten i sicksack-mönster",
    "Lexin007728": "Arbetet att fästa något så det sitter still",
    "Lexin007729": "Punkt som används som utgångspunkt för mätning",
    "Lexin007746": "System som dämpar stötar",
    "Lexin007762": "Styrning av maskin eller apparat på avstånd",
    "Lexin007765": "System för uppvärmning från central anläggning",
    "Lexin007791": "Synlig, brinnande gas från eld",
    "Lexin007794": "Lägsta temperatur då en vätska avger brännbara ångor",
    "Lexin007796": "Behandlad för att inte brinna lätt",
    "Lexin007808": "Elkabel som är platt",
    "Lexin007815": "Hus med fler än två bostäder",
    "Lexin007819": "Hus avsett för flera hushåll",
    "Lexin007829": "Arbetstid som kan varieras inom vissa gränser",
    "Lexin007850": "Maskin som gör flis av trä",
    "Lexin007859": "Botten i en flod eller å",
    "Lexin007892": "Bild tagen från luften (flygfoto)",
    "Lexin007898": "Plats för start och landning av flygplan",
    "Lexin007899": "Plats för start och landning av flygplan (mkr)",
    "Lexin007905": "Anläggning för flygtrafik med terminaler",
    "Lexin007930": "Avfall i vätskeform (t.ex. oljespill)",
    "Lexin007931": "Bitumen som gjorts flytande med lösningsmedel",
    "Lexin007932": "Bro som vilar på pontoner på vattnet",
    "Lexin007933": "Golv som ligger löst på underlaget utan att sitta fast",
    "Lexin007937": "Flytande anläggning för reparation av fartyg",
    "Lexin007943": "Lättflytande spackel för golvavjämning",
    "Lexin007944": "Ändra läge på något",
    "Lexin007963": "Märke av smuts eller missfärgning",
    "Lexin007970": "Apparat som förflyttar luft",
    "Lexin007971": "Rum eller aggregat för ventilation",
    "Lexin007972": "Kåpa över spis som samlar upp matos",
    "Lexin007974": "Rum där fläktaggregat är placerade",
    "Lexin007977": "Utstickande kant på rör eller balk",
    "Lexin007985": "Mängd vätska/gas som passerar per tidsenhet",
    "Lexin007987": "Planlösning som visar hur man rör sig i byggnaden",
    "Lexin007988": "Diagram som visar ett flöde eller process",
    "Lexin008010": "Inramning runt dörr eller fönster",
    "Lexin008014": "Mellanrum mellan två byggnadsdelar (t.ex. kakel)",
    "Lexin008015": "Att fylla fogarna med bruk eller massa",
    "Lexin008021": "Bruk avsett för fogning",
    "Lexin008023": "List som täcker en fog",
    "Lexin008026": "Mjuk massa för tätning av fogar",
    "Lexin008027": "Bredden på en fog",
    "Lexin008028": "Arbetet att fylla fogar",
    "Lexin008029": "Maskin för rationell fogning",
    "Lexin008030": "Handsåg för trä",
    "Lexin008072": "Tapet på en vägg som bryter av mot de andra",
    "Lexin008076": "Ventilation med fläktar (mekanisk)",
    "Lexin008079": "Transportmedel på hjul",
    "Lexin008081": "Bredden på ett fordon",
    "Lexin008082": "Sensor som känner av bilar (i vägbanan)",
    "Lexin008085": "Trafikljus för bilar",
    "Lexin008100": "Ge något en viss form",
    "Lexin008110": "Hur lätt ett material kan formas",
    "Lexin008119": "Design och utformning av en produkt/byggnad",
    "Lexin008120": "Gjutning i form",
    "Lexin008124": "Slitstark plywood för gjutformar",
    "Lexin008126": "Rördel som är böjd eller formad",
    "Lexin008127": "Tegelsten med speciell form",
    "Lexin008131": "Tillfällig konstruktion (form) för gjutning",
    "Lexin008141": "Arbete för att ta fram ny kunskap och teknik",
    "Lexin008157": "Kontroll som sker löpande under arbetet",
    "Lexin008182": "Bränslen som olja, kol och naturgas",
    "Lexin008183": "Produktion utan användning av fossila bränslen",
    "Lexin008218": "Person som går till fots",
    "Lexin008233": "List längst ner på väggen mot golvet",
    "Lexin008234": "Plåt vid takfoten",
    "Lexin008237": "Hängränna vid takfoten",
    "Lexin008253": "Del av material med viss kornstorlek",
    "Lexin008255": "Dokument som följer med en transport",
    "Lexin008290": "Möjlighet att ta sig fram",
    "Lexin008364": "Antal svängningar per sekund (Hz) eller antal händelser",
    "Lexin008372": "Bredden som är fri från hinder",
    "Lexin008376": "När man ser utan hinder ivägen",
    "Lexin008377": "Avståndet mellan stöd utan något i mitten",
    "Lexin008388": "Som bär sig själv utan extra stöd",
    "Lexin008389": "Balk som sticker ut och bara har stöd i ena änden",
    "Lexin008400": "Liten komplementbyggnad (max 15 kvm/nu 20?) som ej kräver bygglov",
    "Lexin008426": "Motstånd rörelse mellan ytor",
    "Lexin008427": "Motstånd rörelse (mkr)",
    "Lexin008435": "Yta där stenarna i betongen syns",
    "Lexin008436": "Yta som är synlig",
    "Lexin008438": "Hus som ligger fritt (villa)",
    "Lexin008442": "Område för rekreation",
    "Lexin008447": "Schaktning av jord utan spontning",
    "Lexin008457": "Klausul som tar bort ansvar",
    "Lexin008470": "Gjutform som står själv utan stagning mot vägg",
    "Lexin008489": "Avståndet mellan två ytor (luftspalt)",
    "Lexin008490": "Utrymme som inte är upptaget",
    "Lexin008501": "Yta utomhus som inte är bebyggd",
    "Lexin008511": "Traktor med skopa framtill",
    "Lexin008519": "Material som tål kyla och frost utan att spricka",
    "Lexin008520": "Hur djupt tjälen går i marken",
    "Lexin008521": "Djup där marken inte fryser",
    "Lexin008522": "Skada orsakad av att vatten frusit i materialet",
    "Lexin008562": "Luft som ventileras u t ur byggnaden",
    "Lexin008611": "Som löser upp eller skadar material (om kemikalie)",
    "Lexin008612": "Ämne som fräter (t.ex. syra)",
    "Lexin008626": "Vatten i ångform eller vätska i material"
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
