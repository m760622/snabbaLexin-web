
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch40.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin013473": "Statens jurist som kontrollerar myndigheter (JK)",
    "Lexin013475": "JK (myndighet som granskar andra myndigheter)",
    "Lexin013478": "Riksdagens ombudsman som granskar myndigheter (JO)",
    "Lexin013500": "Ändras för att bli mer rättvist (t.ex. ett skadestånd)",
    "Lexin013502": "Krav på ändring av testamente för att få sin laglott",
    "Lexin013527": "Myndighet för jämställdhet (numera DO)",
    "Lexin013680": "Övervakning med filmkamera",
    "Lexin013686": "Myndighet som har hand om bl.a. tolkar och arvsfond",
    "Lexin013687": "Regler för tolkar utfärdade av Kammarkollegiet",
    "Lexin013691": "Domstol som prövar överklaganden från förvaltningsrätten",
    "Lexin013692": "Andra instansen i förvaltningsdomstolarna",
    "Lexin013770": "Skatt på vinst vid försäljning av t.ex. aktier eller hus",
    "Lexin013774": "Att ta kontroll över fordon med våld (t.ex. flygplan)",
    "Lexin013775": "Sjöröveri eller flygkapning",
    "Lexin013776": "Sabotage mot flyg eller båt",
    "Lexin013831": "Olagligt samarbete mellan företag för att hålla priser uppe",
    "Lexin013911": "Fusk med att anmäla farliga kemikalier",
    "Lexin014005": "Begäran att en dom ska rivas upp pga grovt fel",
    "Lexin014006": "Att klaga på ett allvarligt rättegångsfel",
    "Lexin014007": "Resning på grund av fel",
    "Lexin014008": "Den som överklagar",
    "Lexin014028": "Talan för att få något ogiltigförklarat (t.ex. testamente)",
    "Lexin014030": "Överklagas eller kritiseras",
    "Lexin014102": "Kunder hos advokat eller socialtjänst",
    "Lexin014169": "Att dela upp en fastighet i mindre delar",
    "Lexin014346": "Speciell metod att förhöra vittnen (för att minnas bättre)",
    "Lexin014450": "Bolag med två typer av ägare (komplementär och kommanditdelägare)",
    "Lexin014451": "Företagsform (KB)",
    "Lexin014452": "Delägare i KB som bara riskerar sin insats",
    "Lexin014481": "Fastighetsskatt/avgift",
    "Lexin014482": "Rätt för kommunen att köpa fastighet före andra (avskaffad)",
    "Lexin014490": "Lagen som styr kommunernas arbete",
    "Lexin014492": "Regler för kommuner",
    "Lexin014498": "Kommunens riksdag (de som beslutar)",
    "Lexin014500": "Att skicka handlingar till motparten för yttrande",
    "Lexin014501": "Delgivning av information",
    "Lexin014513": "När Migrationsverket placerar en flykting i en kommun",
    "Lexin014515": "Kommunens regering",
    "Lexin014525": "Avtal mellan delägare i ett bolag",
    "Lexin014530": "Ersättning",
    "Lexin014533": "Behörighet eller kunskap",
    "Lexin014540": "Delägare i KB som är personligt ansvarig för allt",
    "Lexin014543": "Extra utredning när den första inte räcker",
    "Lexin014581": "Regeln att rättegången ska ske i ett sammanhang utan avbrott",
    "Lexin014588": "Tiden då barnet blev till",
    "Lexin014613": "Tolkar som tolkar simultant på möten",
    "Lexin014614": "Simultantolkning",
    "Lexin014641": "När man handlar som om man accepterat avtalet utan att skriva på",
    "Lexin014645": "Böter för företag som konkurrerar orättvist",
    "Lexin014646": "Hinder för fri konkurrens (monopol etc.)",
    "Lexin014650": "Myndighet som övervakar konkurrens",
    "Lexin014651": "Konkurrensverket",
    "Lexin014658": "När tillgångarna inte räcker till skulderna och allt tas om hand",
    "Lexin014659": "Tingsrättens beslut om konkurs",
    "Lexin014660": "Det som finns kvar av det konkursade företaget",
    "Lexin014661": "Lista på alla skulder och tillgångar i konkursen",
    "Lexin014663": "Processen vid en konkurs",
    "Lexin014664": "Jurist som sköter konkursboet",
    "Lexin014666": "Lagen om konkurs",
    "Lexin014671": "Avtal som gäller muntligt (kräver ingen form)",
    "Lexin014704": "Riksdagsutskott som granskar regeringen",
    "Lexin014705": "KU",
    "Lexin014732": "Jobb som konsult",
    "Lexin014733": "Personal på konsulat",
    "Lexin014736": "Privatperson som köper varor eller tjänster",
    "Lexin014737": "Hjälp till konsumenter",
    "Lexin014738": "Köp av privatperson från företag",
    "Lexin014739": "Avtal mellan företag och konsument",
    "Lexin014740": "Kontrakt med konsument",
    "Lexin014742": "Relationen mellan säljare och köpare",
    "Lexin014743": "Försäkring som ingår i köp",
    "Lexin014744": "Lån till konsumenter",
    "Lexin014747": "Lag som skyddar konsumenter vid köp av varor",
    "Lexin014748": "KKL (lag för konsumentköp)",
    "Lexin014750": "Chef för Konsumentverket (KO)",
    "Lexin014753": "Konsumentvägledare i kommunen",
    "Lexin014755": "Lag om köp av tjänster (hantverkare m.m.)",
    "Lexin014759": "Myndighet för konsumentfrågor",
    "Lexin014767": "Grooming (brott)",
    "Lexin014775": "Personer som förmedlar kontakt",
    "Lexin014785": "Köp där man betalar direkt",
    "Lexin014787": "Pris vid direktbetalning",
    "Lexin014788": "Pris om man inte tar lån",
    "Lexin014804": "Rätten att få höra och bemöta motpartens bevisning",
    "Lexin014805": "Att båda sidor ska få komma till tals",
    "Lexin014813": "Att bryta mot ett avtal",
    "Lexin014816": "Straff där man får vård för missbruk istället för fängelse",
    "Lexin014820": "Spionage mot spioner",
    "Lexin014851": "Internationella överenskommelser",
    "Lexin014862": "Som ägs gemensamt",
    "Lexin014864": "Mellanform mellan hyresrätt och bostadsrätt",
    "Lexin014865": "Förening som äger kooperativa hyresrätter",
    "Lexin014994": "Krav på att motparten ska betala rättegångskostnaderna",
    "Lexin014998": "Begäran om ersättning för kostnader",
    "Lexin015071": "CSN (eller annan myndighet som kräver in pengar)",
    "Lexin015078": "Hur mycket man får låna",
    "Lexin015079": "Fordran på grund av kredit",
    "Lexin015080": "Skuldbrev",
    "Lexin015081": "Banken eller låneinstitutet",
    "Lexin015082": "Långivare"
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
