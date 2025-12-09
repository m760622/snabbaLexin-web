
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch10.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin004028": "Plan som ligger i marknivå",
    "Lexin004042": "De regler för byggande som Boverket ger ut",
    "Lexin004061": "Dörr konstruerad för att stå emot brand",
    "Lexin004063": "Som lätt tar eld",
    "Lexin004064": "Filt av icke brännbart material för att kväva eld",
    "Lexin004066": "Försäkring som ger ersättning vid brandskador",
    "Lexin004068": "Isolering som skyddar mot brandspridning eller värme",
    "Lexin004070": "Förmåga hos en konstruktion att motstå brand",
    "Lexin004071": "Tiden en byggnadsdel står emot brand",
    "Lexin004072": "Vägg som ska förhindra att brand sprider sig",
    "Lexin004073": "Regler som styr hur brandskydd ska utformas",
    "Lexin004075": "Vattenuttag för brandsläckning",
    "Lexin004076": "Verktyg som används vid brandsläckning",
    "Lexin004078": "Dokumentation av byggnadens brandskydd",
    "Lexin004079": "Färg som sväller vid värme och skyddar mot brand",
    "Lexin004080": "Klassificering av hur bra ett material står emot brand",
    "Lexin004081": "Apparat för att släcka mindre bränder",
    "Lexin004082": "Konstruerad för att inte brinna",
    "Lexin004083": "Arbetet med att förhindra och skydda mot bränder",
    "Lexin004085": "Hur väl ett material tål eld",
    "Lexin004087": "Apparat som larmar vid rök eller värme",
    "Lexin004088": "System för att vädra ut brandgaser",
    "Lexin004111": "Avståndet från sida till sida",
    "Lexin004137": "Hur länge något brinner",
    "Lexin004158": "Bärande balk i en brokonstruktion",
    "Lexin004159": "Den del av bron där trafiken går",
    "Lexin004160": "Konstruktion av en bro",
    "Lexin004166": "Färdig del som används för att bygga en bro",
    "Lexin004167": "Konstruktionen som bron vilar på vid landfästet",
    "Lexin004186": "Stöd som bär upp bron mellan landfästena",
    "Lexin004190": "Räcke längs kanten på en bro",
    "Lexin004261": "Bågig konstruktion som bär upp en bro",
    "Lexin004268": "Blandning av bindemedel, sand och vatten (för murning/puts)",
    "Lexin004274": "Maskin för att blanda bruk",
    "Lexin004284": "Hål i marken för vatten eller avlopp",
    "Lexin004286": "Lock som täcker en brunn",
    "Lexin004302": "Summan av alla våningsplans areor",
    "Lexin004303": "Den totala golvytan i en byggnad",
    "Lexin004309": "Den totala vikten inklusive last",
    "Lexin004310": "Byggnadens totala volym",
    "Lexin004343": "Utvinning av malm eller sten",
    "Lexin004356": "Som måste göras snabbt",
    "Lexin004370": "Verktyg för att bända isär saker",
    "Lexin004374": "Sågat trästycke, tunnare än en planka",
    "Lexin004386": "Avfall som kan förbrännas för energiåtervinning",
    "Lexin004397": "Svetsning med gaslåga",
    "Lexin004398": "Tiden en lampa lyser eller något brinner",
    "Lexin004438": "Handbok för stålkonstruktioner från Boverket",
    "Lexin004439": "Bruttoarea (förkortning)",
    "Lexin004450": "Erbjudande om pris vid en auktion eller upphandling",
    "Lexin004453": "Plan för ekonomin i ett projekt",
    "Lexin004454": "Den som lämnar ett anbud",
    "Lexin004455": "Processen där bud lämnas",
    "Lexin004496": "Gods som transporteras löst i lastrummet (ej förpackat)",
    "Lexin004498": "Transport av bulkgods",
    "Lexin004501": "Traktor med schaktblad",
    "Lexin004504": "Utsläpp av ljud/buller från en källa",
    "Lexin004505": "Hur buller sprids i omgivningen",
    "Lexin004507": "Instrument för att mäta ljudnivå",
    "Lexin004508": "Att mäta bullernivån",
    "Lexin004509": "Styrkan på bullret",
    "Lexin004510": "Gränsvärde för tillåtet buller",
    "Lexin004512": "Åtgärder för att minska buller",
    "Lexin004513": "Skärm som stänger ute buller",
    "Lexin004519": "Grov skruv med mutter och ofta sexkantigt huvud",
    "Lexin004521": "Verktyg för att skjuta in bultar i hårt material",
    "Lexin004546": "Utbyggnad på fasaden med fönster",
    "Lexin004562": "Hållplats eller terminal för bussar",
    "Lexin004563": "Större knutpunkt för busstrafik",
    "Lexin004566": "Lokal för försäljning av varor",
    "Lexin004567": "Framsidan av en butik mot gatan",
    "Lexin004575": "Konstruera eller uppföra byggnader",
    "Lexin004577": "Anmälan till kommunen om mindre byggåtgärder",
    "Lexin004578": "Person som arbetar med att bygga hus",
    "Lexin004579": "Arbete som rör uppförande eller renovering av byggnad",
    "Lexin004580": "Platsen där ett bygge pågår",
    "Lexin004581": "Skräp och rester från byggarbete",
    "Lexin004582": "Lagar och regler som styr byggandet",
    "Lexin004583": "Alla företag och aktiviteter som rör byggande",
    "Lexin004586": "Försäkring som täcker fel i byggnationen under 10 år",
    "Lexin004587": "Fukt som finns i materialet vid byggandet",
    "Lexin004588": "Ritningar och beskrivningar för bygget",
    "Lexin004589": "Processen att ta fram bygghandlingar",
    "Lexin004590": "Den som låter utföra ett byggnadsarbete",
    "Lexin004591": "Tillfällig hiss på en byggarbetsplats",
    "Lexin004592": "Ingenjör utbildad inom byggteknik",
    "Lexin004593": "Kontroll av att bygget följer reglerna",
    "Lexin004594": "Vad det kostar att bygga",
    "Lexin004595": "Stor lyftkran på byggarbetsplats",
    "Lexin004597": "Tillstånd från kommunen att få bygga",
    "Lexin004598": "Ansökan om bygglov",
    "Lexin004599": "Material som används för att bygga hus",
    "Lexin004600": "Teknik eller sätt att bygga på",
    "Lexin004602": "Person eller företag som ansvarar för bygget",
    "Lexin004604": "Energi som krävs för fastighetens drift (pumpar, fläktar etc.)",
    "Lexin004605": "Avgränsad del av en byggnad (t.ex. vägg, tak)",
    "Lexin004606": "Viktiga papper som rör byggnaden",
    "Lexin004609": "Byggnadens höjd från marken till taket",
    "Lexin004610": "Tjänsteman som granskar byggen",
    "Lexin004611": "Person som beräknar byggnadens bärighet"
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
