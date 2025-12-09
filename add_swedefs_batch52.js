
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch52.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin000043": "Ringa stöld (snatteri)",
    "Lexin000044": "Att ta något man lånat (gammalt brott, nu förskingring/olovligt förfogande)",
    "Lexin000045": "Miljöbrott av oaktsamhet (mindre grovt)",
    "Lexin000046": "Liten skadegörelse (t.ex. klotter)",
    "Lexin000047": "När en mamma dödar sitt barn vid födseln (historiskt brott)",
    "Lexin000048": "Att kränka någon (kalla någon fula ord)",
    "Lexin000049": "Att lura myndigheterna om vem som är ens barn/förälder",
    "Lexin000050": "Skadegörelse som kostar mycket eller är farlig",
    "Lexin000051": "Bedrägeri som rör mycket pengar",
    "Lexin000052": "Att hantera farliga kemikalier utan lov",
    "Lexin000053": "Att inte lyda polisen vid ordningshållning",
    "Lexin000054": "Att köra bil utan körkort",
    "Lexin000055": "Mindre allvarligt skattebrott",
    "Lexin000056": "Slarv som skadar borgenärerna (ekobrott)",
    "Lexin000057": "Att fuska med bidrag (t.ex. EU-stöd)",
    "Lexin000058": "Oaktsamhet med narkotika",
    "Lexin000060": "Att ta sitt barn utan lov (om man inte har vårdnaden)",
    "Lexin000061": "Stöld där man t.ex. har vapen eller stjäl från någon som sover",
    "Lexin000062": "Skattebrott med stora belopp",
    "Lexin000063": "Att betala en skuld före en annan (otillåtet vid obestånd)",
    "Lexin000064": "Att tvinga någon att göra något (utan våld, t.ex. utpressning)",
    "Lexin000065": "Att starta en privat armé (kårverksamhet)",
    "Lexin000066": "Att sälja eller ge bort något man inte äger (men har hand om)",
    "Lexin000067": "Att driva miljöfarlig verksamhet utan tillstånd",
    "Lexin000068": "Att köra full (rattfylla)",
    "Lexin000069": "Sabotage (förstörelse av viktig infrastruktur)",
    "Lexin000070": "Sex med barn (olagligt)",
    "Lexin000071": "Att gå eller köra där man inte får (t.ex. över åkern)",
    "Lexin000072": "Utpressning (hota för pengar)",
    "Lexin000073": "Grov fridskränkning (upprepade brott mot närstående)",
    "Lexin000074": "Grovt rattfylleri (hög promille)",
    "Lexin000075": "Bokföringsbrott (att inte bokföra affärshändelser)",
    "Lexin000076": "Att hindra inspektörer från att kolla miljön",
    "Lexin000077": "Sabotage som är livsfarligt eller rör försvaret",
    "Lexin000078": "Misshandel (att slå någon)",
    "Lexin000079": "Ocker (att ta orimligt mycket betalt av någon i nöd)",
    "Lexin000080": "Olaga hot (hota att skada någon)",
    "Lexin000081": "Rån (stöld med våld)",
    "Lexin000082": "Sexuellt övergrepp mot barn (utan våld men olagligt)",
    "Lexin000083": "Att smita från en trafikolycka",
    "Lexin000084": "Trolöshet mot huvudman (att svika förtroendet i tjänsten)",
    "Lexin000085": "Att uppmana till brott",
    "Lexin000086": "Att lämna fel uppgifter i deklarationen (av slarv)",
    "Lexin000087": "Sabotage på flygplats (kapning etc.)",
    "Lexin000089": "Behörighetsmissbruk (att använda sin makt fel)",
    "Lexin000090": "Att inte ge info om miljörisker",
    "Lexin000091": "Misshandel som ger svåra skador",
    "Lexin000092": "Rån med vapen eller våld som ger svåra skador",
    "Lexin000093": "Att tränga sig in hos någon (hemfridsbrott)",
    "Lexin000094": "Häleri (att köpa stöldgods)",
    "Lexin000095": "Myteri (vägra lyda order i militären eller på skepp)",
    "Lexin000096": "Att gå in i fabrik eller kontor utan lov (olaga intrång)",
    "Lexin000097": "Att inte betala in skatten man dragit från lönen",
    "Lexin000098": "Penningtvätt (att göra svarta pengar vita)",
    "Lexin000099": "Ofredande (t.ex. knuffas eller ringabusa)",
    "Lexin000100": "Olovligt brukande (att använda annans sak)",
    "Lexin000101": "Skattebrott (fel redovisning)",
    "Lexin000102": "Bilstöld (tillgrepp av fortskaffningsmedel)",
    "Lexin000103": "Nedskräpning",
    "Lexin000104": "Vållande till annans död (oaktsamhet)",
    "Lexin000105": "Mindre allvarlig penningtvätt",
    "Lexin000106": "Brytande av posthemlighet (öppna andras brev)",
    "Lexin000107": "Egenmäktigt förfarande (t.ex. flytta en bil eller byta lås)",
    "Lexin000108": "Fyndförseelse (att behålla något man hittat)",
    "Lexin000109": "Hets mot folkgrupp (rasism)",
    "Lexin000110": "Oredligt förfarande (lura någon, gammalt brott)",
    "Lexin000111": "Röstköp (brott vid val)",
    "Lexin000112": "Barnpornografibrott",
    "Lexin000113": "Vållande till kroppsskada (oaktsamhet)",
    "Lexin000114": "Slarv med skattedeklaration",
    "Lexin000115": "Framkallande av fara för annan (t.ex. kasta sten från bro)",
    "Lexin000116": "Intrång i förvar (gömma undan beslagtagna saker)",
    "Lexin000117": "Diskriminering i näringsverksamhet",
    "Lexin000118": "Självtäkt (att ta tillbaka sin stulna cykel själv)",
    "Lexin000119": "Svindleri (lura allmänheten eller placerare)",
    "Lexin000120": "Sexköp där offret är barn",
    "Lexin000121": "Olovlig avlyssning (buggning)",
    "Lexin000122": "Dataintrång (hacka dator)",
    "Lexin000202": "Tiden man har på sig att svara ja",
    "Lexin000215": "När alla ropar ja (utan rösträkning)",
    "Lexin000224": "Uppgörelse om att betala mindre skuld",
    "Lexin000279": "Föräldrar som adopterat",
    "Lexin000302": "Känslomässigt värde (ej pengar)",
    "Lexin000321": "Företagande",
    "Lexin000558": "Slarv som kan skada många (t.ex. med eld)",
    "Lexin000575": "Papper hos myndigheter som alla får läsa",
    "Lexin000599": "Att åklagaren driver brottet (inte målsäganden)",
    "Lexin000663": "Ett annat val",
    "Lexin000665": "Annat straff än fängelse (t.ex. samhällstjänst)",
    "Lexin000709": "När staten förlåter brott",
    "Lexin000721": "Tiden man betalar av ett lån",
    "Lexin000751": "Bevis från labb (t.ex. DNA eller droger)",
    "Lexin000773": "Erbjudande (offert)",
    "Lexin000837": "Att hyra ut sin lägenhet till någon annan",
    "Lexin000884": "Brott som bara utreds om offret anmäler",
    "Lexin000906": "Att låsa in en misstänkt (beslutas av åklagare)",
    "Lexin000952": "Boende för nyanlända asylsökande",
    "Lexin000978": "Uppmana eller be om",
    "Lexin000983": "Rapport till polisen eller anmälan till tävling",
    "Lexin000988": "Skyldighet att anmäla (t.ex. för personal som ser barn fara illa)"
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
