
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch83.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin033887": "Känslomässigt avstängda/oengagerade",
    "Lexin033888": "Förmåga att utföra arbete",
    "Lexin033889": "Ovanliga eller atypiska symtom",
    "Lexin033890": "Domning/stickningar i kroppen",
    "Lexin033891": "Emotionell avtrubbning/likgiltighet",
    "Lexin033892": "Fas där man aktivt bearbetar upplevelser",
    "Lexin033893": "Oförmågatt ge/ta emot behandlingshjälp",
    "Lexin033894": "Symtom som syns i beteendet",
    "Lexin033895": "Medicinsk definition baserad på biologi",
    "Lexin033896": "Manodepressiv sjukdom",
    "Lexin033897": "Vikt delat med längden i kvadrat",
    "Lexin033898": "Emotionellt instabil personlighetsstörning",
    "Lexin033899": "Bultande smärta (pulserar)",
    "Lexin033900": "Att vara delaktig",
    "Lexin033901": "Dagdrömmeri",
    "Lexin033902": "Förändrat medvetandetillstånd",
    "Lexin033903": "Har nedsatt funktion",
    "Lexin033904": "Försämring av minnet",
    "Lexin033905": "Ihållande nedstämdhet (kronisk)",
    "Lexin033906": "Negativa effekter/biverkningar",
    "Lexin033907": "Stress orsakad av ekonomiska problem",
    "Lexin033908": "Känslomässiga faktorer",
    "Lexin033909": "Att fastna i något (tanke/beteende)",
    "Lexin033910": "Minne av händelser längre tillbaka i tiden",
    "Lexin033911": "Undvikande personlighet pga rädsla",
    "Lexin033912": "Psykologiskt försvar",
    "Lexin033913": "Den vikt man borde ha",
    "Lexin033914": "Generaliserad ångest (hela tiden orolig)",
    "Lexin033915": "Skala för att bedöma funktionsnivå",
    "Lexin033916": "Bra förutsättningar för något",
    "Lexin033917": "Förmåga att agera",
    "Lexin033918": "Ätstörning med hetsätning",
    "Lexin033919": "Ökad känslighet för smärta",
    "Lexin033920": "Person med hysteri",
    "Lexin033921": "Fortsätt",
    "Lexin033922": "Krama",
    "Lexin033923": "Var tyst",
    "Lexin033924": "Fortsätt att kämpa/uthärda",
    "Lexin033925": "Smärta utan känd orsak",
    "Lexin033926": "Teorier om hur man lär sig",
    "Lexin033927": "Nyskapande",
    "Lexin033928": "Sömnpiller",
    "Lexin033929": "Att avskärma sig från andra",
    "Lexin033930": "KBT (samtalsterapi)",
    "Lexin033931": "Behandlar rygg och leder",
    "Lexin033932": "Problem med tankeförmågor",
    "Lexin033933": "Allvarliga benbrott",
    "Lexin033934": "Fastställt/bekräftat",
    "Lexin033935": "Omdebatterad/kontroversiell",
    "Lexin033936": "Skapande/fantasifulla",
    "Lexin033937": "Hur man upplever sin kropp",
    "Lexin033938": "Vanligt förfarande/tradition",
    "Lexin033939": "Inte intresserade/engagerade",
    "Lexin033940": "Räddningslina",
    "Lexin033941": "Lusten att leva",
    "Lexin033942": "Alternativ verklighet/fantasivärld",
    "Lexin033943": "Smärta som förvärras",
    "Lexin033944": "Manipulerande (personer)",
    "Lexin033945": "Fas med förhöjd aktivitet (bipolär)",
    "Lexin033946": "Bipolär sjukdom",
    "Lexin033947": "Feltolkar/missförstår",
    "Lexin033948": "Utsatt för mobbning",
    "Lexin033949": "Normala reaktioner",
    "Lexin033950": "Smärta från nervskada",
    "Lexin033951": "Smärta från vävnadsskada",
    "Lexin033952": "Nyliga minnen",
    "Lexin033953": "Tvångssyndrom",
    "Lexin033954": "Tvångsmässigt fokus på hälsosam kost",
    "Lexin033955": "Personlighetsstörning med misstänksamhet",
    "Lexin033956": "Oaktivitet/handlingsförlamning",
    "Lexin033957": "Överdriven uppmärksamhet på detaljer",
    "Lexin033958": "Tränga in i",
    "Lexin033959": "Nervceller som stelnar/förtvinar",
    "Lexin033960": "Pejorativ term (bör undvikas)",
    "Lexin033961": "Effekt av sockerpiller",
    "Lexin033962": "Möjliga/potentiella",
    "Lexin033963": "Praktiska uppgifter",
    "Lexin033964": "Överföra känslor till andra",
    "Lexin033965": "Protestaktioner",
    "Lexin033966": "Psykodynamiskt synsätt (Freud)",
    "Lexin033967": "Situationer med sociala och psykiska aspekter",
    "Lexin033968": "Kroppsliga symtom pga psyke",
    "Lexin033969": "Märkbar/uppenbar",
    "Lexin033970": "Förnuftiga/logiska",
    "Lexin033971": "Smärta som känns på annan plats",
    "Lexin033972": "Logiskt tänkande/argumentation",
    "Lexin033973": "Förlust av gamla minnen",
    "Lexin033974": "Faktorer som ökar risk för sjukdom",
    "Lexin033975": "Rättspsykiatri",
    "Lexin033976": "Avvikande personlighet liknande schizofreni",
    "Lexin033977": "Schizofreni",
    "Lexin033978": "Åtskillnad/separation",
    "Lexin033979": "Kemiskt ämne som skickar signaler",
    "Lexin033980": "Låtsas/härma",
    "Lexin033981": "Förmåga att förstå sig själv",
    "Lexin033982": "Att skada sig själv avsiktligt",
    "Lexin033983": "Självskadebeteende",
    "Lexin033984": "Tillit till sig själv",
    "Lexin033985": "Tvivlare/kritiker",
    "Lexin033986": "Anklaga/lägga skuld på"
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
