
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch35.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin005364": "Att tvingas lämna landet",
    "Lexin005365": "Pengar man lämnar som säkerhet (t.ex. för hyra)",
    "Lexin005381": "När man får äganderätt av någon annan (t.ex. köp)",
    "Lexin005413": "Bestämma att något ska användas till ett visst ändamål",
    "Lexin005546": "Personal på ambassader och konsulat",
    "Lexin005554": "Avsikt att uppnå en viss effekt",
    "Lexin005556": "Avvisning direkt vid gränsen",
    "Lexin005560": "Regler från EU som länderna måste följa",
    "Lexin005561": "Att vända sig direkt till domstolen (eller försäkringsbolag)",
    "Lexin005569": "Grupp som beslutar om bestraffning (t.ex. av anställda)",
    "Lexin005570": "Straff på jobbet eller i förening (t.ex. varning)",
    "Lexin005571": "Ärende om bestraffning",
    "Lexin005602": "Skadestånd för diskriminering",
    "Lexin005621": "Rätt att bestämma över något",
    "Lexin005622": "Rätten för parterna att styra vad rättegången handlar om",
    "Lexin005623": "Lagregel som man kan avtala bort",
    "Lexin005629": "Avtal via internet eller telefon",
    "Lexin005649": "Gammalt namn på åklagare i en viss region",
    "Lexin005679": "Att plåga djur",
    "Lexin005697": "Test av DNA för att identifiera någon",
    "Lexin005699": "Myndighet som motverkar diskriminering",
    "Lexin005727": "Försäkring mot fel i hus som inte syns",
    "Lexin005733": "Uppsåt (att göra det med flit)",
    "Lexin005737": "Domstolens slutliga avgörande",
    "Lexin005739": "Den som dömer i domstolen",
    "Lexin005740": "Löfte domaren avger att döma rätt",
    "Lexin005741": "När domaren inte får döma pga jäv",
    "Lexin005742": "Föreslår vilka som ska bli domare",
    "Lexin005747": "När rätten har tillräckligt många domare för att döma",
    "Lexin005748": "Att domstolen är fulltalig",
    "Lexin005751": "Att vara så stor på marknaden att man styr",
    "Lexin005756": "Området där en domstol bestämmer",
    "Lexin005765": "Tingsrättens område (förr)",
    "Lexin005770": "Område för en viss domstol",
    "Lexin005771": "Geografiska områden för domstolar",
    "Lexin005773": "Där rättegångar hålls",
    "Lexin005774": "Rättegång",
    "Lexin005775": "Domstolshandläggare",
    "Lexin005776": "Hur domstolarna är organiserade",
    "Lexin005778": "Skriver protokoll under rättegången",
    "Lexin005779": "Ordningsvakt och allt-i-allo på domstolen",
    "Lexin005812": "Samlade handlingar i ett ärende",
    "Lexin005813": "Diarienummer eller ärendenummer",
    "Lexin006004": "Försening",
    "Lexin006042": "Fråga till annat EU-land om asylansvar",
    "Lexin006043": "Regler om vilket EU-land som prövar asyl",
    "Lexin006213": "Enklare variant av bouppteckning",
    "Lexin006214": "De som ärver (släkt, arvingar)",
    "Lexin006230": "Att avgöra ett mål",
    "Lexin006264": "Högtidligt löfte att tala sanning",
    "Lexin006268": "Krav att lämna ut dokument",
    "Lexin006271": "Europeiska ekonomiska samarbetsområdet",
    "Lexin006277": "Ränta plus alla avgifter (den verkliga kostnaden)",
    "Lexin006290": "Arv som man får först när någon annan dött",
    "Lexin006291": "Den som väntar på efterarv",
    "Lexin006300": "När man letar efter någon (t.ex. försvunnen)",
    "Lexin006307": "Att ge med sig i förhandlingar",
    "Lexin006357": "Vård efter sjukhus eller anstalt",
    "Lexin006361": "EU-domstolen",
    "Lexin006362": "EU-rätten",
    "Lexin006377": "Att ta lagen i egna händer (brott)",
    "Lexin006379": "Att förhandla med främmande makt utan lov",
    "Lexin006405": "Tidning där EU-beslut publiceras",
    "Lexin006428": "Enhet som utreder ekonomiska brott",
    "Lexin006431": "Myndighet mot ekobrott",
    "Lexin006433": "EBM",
    "Lexin006450": "Förening som driver ekonomisk verksamhet (tex Coop)",
    "Lexin006453": "Utredning av någons ekonomi",
    "Lexin006530": "Fotboja",
    "Lexin006715": "När två personer samarbetar utan att bilda bolag",
    "Lexin006717": "Bolag som inte är juridiska personer",
    "Lexin006736": "Barn som kommer till Sverige utan föräldrar",
    "Lexin006737": "När bara en förälder har ansvaret",
    "Lexin006750": "När en person för talan för en hel grupp",
    "Lexin006751": "Firma (enskild firma)",
    "Lexin006759": "För eget bruk",
    "Lexin006760": "Vatten som ägs privat (t.ex. liten sjö)",
    "Lexin006843": "Tillstånd som krävs",
    "Lexin006851": "Påpekar eller klagar",
    "Lexin006920": "Var man kommer ifrån (kultur/folk)",
    "Lexin006924": "Vilken folkgrupp man tillhör",
    "Lexin006950": "EU-lagar",
    "Lexin006953": "Fingeravtrycksregister för asylsökande i EU",
    "Lexin006954": "Samarbete mellan åklagare i EU",
    "Lexin006956": "Bolagsform som fungerar i hela EU",
    "Lexin006957": "SE-bolag",
    "Lexin006958": "Domstolen för mänskliga rättigheter",
    "Lexin006960": "Organisation för mänskliga rättigheter i Europa",
    "Lexin006963": "Arresteringsorder som gäller i hela EU",
    "Lexin006964": "Samarbetsform för företag i EU",
    "Lexin006965": "EEIG",
    "Lexin006971": "EU:s högsta domstol",
    "Lexin006972": "Intyg som visar vem som ärver (gäller i EU)",
    "Lexin006973": "EU:s polisbyrå",
    "Lexin007002": "Verkställighet (t.ex. utmätning)",
    "Lexin007003": "Myndighets ingripande för att genomföra beslut",
    "Lexin007006": "Auktion hos Kronofogden",
    "Lexin007008": "Tvångsförsäljning av egendom",
    "Lexin007017": "Dom som kan verkställas direkt",
    "Lexin007022": "Det lilla man får behålla av lönen vid utmätning"
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
