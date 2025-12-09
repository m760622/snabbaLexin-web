
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch33.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin001151": "Avgift till domstolen för att ansöka",
    "Lexin001152": "Mål där man ansöker om något (t.ex. adoption)",
    "Lexin001364": "Brott mot reglerna om säkerhet på jobbet",
    "Lexin001394": "Bråk om lagar på arbetsplatsen",
    "Lexin001503": "Person som hyr mark av någon",
    "Lexin001505": "Att hyra mark (t.ex. för jordbruk)",
    "Lexin001506": "Domstol som löser tvister om arrende",
    "Lexin001507": "Domstolar för arrenden",
    "Lexin001520": "Slag eller typ av brott",
    "Lexin001536": "Kapitel eller stycke i lagtext (särskilt EU-rätt)",
    "Lexin001550": "Brott mot fridlysta växter och djur",
    "Lexin001554": "De som har rätt att ärva",
    "Lexin001556": "Den som har dött och lämnar arvet",
    "Lexin001560": "Att tacka nej till att ärva",
    "Lexin001565": "Delen av arvet man ska ha",
    "Lexin001567": "Reglerna för vem som ärver först",
    "Lexin001569": "Lagen om arv",
    "Lexin001570": "När man delar upp arvet mellan arvingarna",
    "Lexin001622": "Föreningar och bolag",
    "Lexin001625": "Regler för föreningar och bolag",
    "Lexin001643": "Advokatbyrå specialiserad på asyl",
    "Lexin001644": "Avdelning på Migrationsverket",
    "Lexin001645": "Tjänsteman som utreder asylärenden",
    "Lexin001715": "Att se och höra saker som inte finns (psykos)",
    "Lexin001719": "Tolk som klarat svårt prov i juridik",
    "Lexin001764": "Att ångra en beställning",
    "Lexin001844": "Pengar man måste betala (t.ex. till domstolen)",
    "Lexin001845": "Straffavgift till fond för brottsoffer (800 kr)",
    "Lexin001875": "När domstolen ska bestämma domen",
    "Lexin001900": "Vinst från t.ex. aktier eller skog",
    "Lexin001905": "Barn, barnbarn o.s.v.",
    "Lexin001913": "Att göra barn",
    "Lexin001925": "Död person",
    "Lexin001938": "Hemlig inspelning av samtal",
    "Lexin001976": "Dra ifrån tid man suttit häktad från straffet",
    "Lexin001989": "Dokument där man säger vad man tänker göra",
    "Lexin001990": "Att göra något med flit för att uppnå ett mål",
    "Lexin002000": "Att hållas isolerad från andra",
    "Lexin002007": "Domstolen lägger ner målet",
    "Lexin002019": "Nej till ansökan",
    "Lexin002048": "Att dela upp en tomt i flera delar",
    "Lexin002052": "Att säga att man inte vill ha arvet",
    "Lexin002081": "Att bryta mot ett kontrakt",
    "Lexin002085": "Rätten att bestämma själv vad man avtalar om",
    "Lexin002087": "Att ha ett avtal med någon",
    "Lexin002089": "Lagen om hur avtal ingås",
    "Lexin002090": "Reglerna om avtal",
    "Lexin002091": "Rätt att använda grannens mark enligt avtal",
    "Lexin002093": "Bråk om vad avtalet betyder",
    "Lexin002100": "Att sitta av sin tid i fängelse",
    "Lexin002123": "Rymt eller håller sig undan",
    "Lexin002126": "Neka någon att komma in eller stanna",
    "Lexin002129": "Beslut att någon inte får komma in i landet",
    "Lexin002285": "Stora kapitel i lagboken (t.ex. Brottsbalken)",
    "Lexin002355": "Pengar man har på banken",
    "Lexin002384": "Att döda sitt nyfödda barn (mamman)",
    "Lexin002386": "Plats för förhör med barn (trygg miljö)",
    "Lexin002409": "Våld mot barn",
    "Lexin002413": "Myndighet som bevakar barns rättigheter",
    "Lexin002414": "Barnombudsmannen",
    "Lexin002419": "Brott med barnporr",
    "Lexin002458": "Regel om prisbasbelopp",
    "Lexin002554": "Sträng order",
    "Lexin002597": "Den som bestämmer (på fartyg/plan)",
    "Lexin002601": "Använda",
    "Lexin002736": "Listan över dömda personer",
    "Lexin002785": "Fullmakt eller tillåtelse",
    "Lexin002803": "Saker man får behålla vid utmätning (det nödvändigaste)",
    "Lexin002804": "Gåva eller testamente (inget krav på motprestation)",
    "Lexin002828": "Ge nåd",
    "Lexin002836": "Benådning",
    "Lexin002837": "Hur man brukar göra med nåd",
    "Lexin002849": "Förbereda ett ärende för beslut",
    "Lexin002854": "Jurist som förbereder mål åt domarna",
    "Lexin002855": "Tiden innan huvudförhandlingen",
    "Lexin002939": "Undersöka noga (t.ex. en bil)",
    "Lexin002952": "Att ha en sak hos sig (fysiskt)",
    "Lexin002953": "Att någon tar eller flyttar saken man har",
    "Lexin002956": "Rätt att bo kvar (besittningsskydd)",
    "Lexin002957": "Rätt att behålla hyreskontrakt",
    "Lexin002998": "Avgörande",
    "Lexin003000": "Beslut som avslutar målet eller inte",
    "Lexin003007": "Förklaringen till varför beslutet blev så",
    "Lexin003026": "Att muta någon",
    "Lexin003049": "Kopia där någon intygar att den är äkta",
    "Lexin003085": "Gammalt ord för överklagande",
    "Lexin003095": "Text som förklarar hur man överklagar",
    "Lexin003127": "Kravbrev",
    "Lexin003128": "Mål om pengar",
    "Lexin003222": "Officiell utredning eller förslag",
    "Lexin003243": "Säga ja till",
    "Lexin003246": "Godkänns",
    "Lexin003255": "Hur starka bevis som krävs",
    "Lexin003257": "Själva bevisen (saker)",
    "Lexin003258": "Bevismaterialet",
    "Lexin003260": "Typ av bevis (vittne, dokument, sak)",
    "Lexin003261": "Att visa att något är sant",
    "Lexin003262": "Att säkra bevis innan rättegången startar",
    "Lexin003264": "Vad beviset ska visa",
    "Lexin003265": "Det man vill bevisa"
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
