
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch50.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin029965": "Skatt som man skjuter upp till framtiden (vid husförsäljning)",
    "Lexin029991": "Att göra något med flit (medvetet)",
    "Lexin029993": "Avsikt att begå brott (dolus)",
    "Lexin030029": "Person som hetsar andra till brott eller olydnad",
    "Lexin030030": "Brott: att uppmana andra att bryta mot lagen",
    "Lexin030085": "Att förfalska en namnteckning eller ett dokument",
    "Lexin030127": "Utan ansvar för att det man säljer t.ex. är äkta (vid endossement)",
    "Lexin030145": "Politikerna som styr skolan i kommunen",
    "Lexin030163": "Vad man får i gengäld (t.ex. pengar för arbete)",
    "Lexin030166": "Förslag på hur pengarna i konkursen ska delas",
    "Lexin030167": "Plan för utbetalning",
    "Lexin030168": "Hur många procent av sin fordran borgenärerna får",
    "Lexin030169": "Andel man får betalt i konkurs (ofta låg)",
    "Lexin030193": "Dom när ena parten uteblir (man förlorar automatiskt)",
    "Lexin030272": "Att skicka en misstänkt person till ett annat land",
    "Lexin030273": "Extradition (mellan länder)",
    "Lexin030276": "Ärende om att lämna ut en person",
    "Lexin030279": "Mål hos Migrationsverket och migrationsdomstolar",
    "Lexin030280": "Kontroll av pass och tillstånd (inre utlänningskontroll)",
    "Lexin030282": "Gammal instans (finns ej kvar, ersatt av Migrationsdomstol)",
    "Lexin030309": "När Kronofogden tar saker eller lön för att betala skulder",
    "Lexin030310": "Tvångsförsäljning av egendom",
    "Lexin030312": "Saker man får behålla vid utmätning (t.ex. kläder)",
    "Lexin030313": "Barnpornografibrott (numera barnpornografi)",
    "Lexin030336": "Polisens jobb att hitta bevis",
    "Lexin030340": "Förundersökning",
    "Lexin030341": "Att lämna landet",
    "Lexin030346": "UD (ansvarar för utrikespolitik)",
    "Lexin030387": "Prövning om tvångsvården ska upphöra",
    "Lexin030396": "Beslut av Kronofogden att skulden är riktig",
    "Lexin030402": "Hjälp att komma ut i samhället efter fängelse",
    "Lexin030430": "Regler om hur obetalda skulder drivs in",
    "Lexin030431": "Exekutionsrätt",
    "Lexin030455": "Att flytta från Sverige (emigration)",
    "Lexin030457": "Att förklara sin talan noga i rätten",
    "Lexin030463": "Utvecklingscentrum (inom Åklagarmyndigheten)",
    "Lexin030471": "Få beviljat (t.ex. utverka tillstånd)",
    "Lexin030487": "Beslut att man måste lämna Sverige (tvång)",
    "Lexin030488": "Deportation",
    "Lexin030490": "Ärenden om utvisning",
    "Lexin030509": "Mål om vatten och avlopp (i Mark- och miljödomstolen)",
    "Lexin030522": "Gammalt ord för överklagande",
    "Lexin030592": "Att ta med den misstänkte till brottsplatsen",
    "Lexin030599": "Rätt att välja (t.ex. vilken lag som gäller)",
    "Lexin030609": "Lagen om växlingskontor m.m.",
    "Lexin030623": "Kontroll av om man är hederlig (för t.ex. taxikort)",
    "Lexin030640": "Hjälp av Kronofogden att få tillbaka en sak eller vräka någon",
    "Lexin030655": "Djurskyddsbrott",
    "Lexin030767": "Att använda någons logotyp eller namn olagligt",
    "Lexin030834": "Teorier om att straff ska vara hämnd (öga för öga)",
    "Lexin030837": "Betalning eller motprestation (i avtal)",
    "Lexin030838": "Regel om kompensation vid bodelning",
    "Lexin030839": "Regler om vederlag",
    "Lexin030842": "Motbevisar",
    "Lexin030909": "Tiden då man jobbat eller drivit företaget",
    "Lexin030915": "Chefen för ett aktiebolag",
    "Lexin030919": "Beslut att genomföra t.ex. en utmätning eller utvisning",
    "Lexin030921": "När domen ska verkställas",
    "Lexin030948": "Med fullt uppsåt och förstånd",
    "Lexin030949": "Medvetet och friskt (inte sjuk)",
    "Lexin030977": "Hot om böter om man inte lyder (t.ex. 10 000 kr vite)",
    "Lexin030994": "Förhör som filmas (standard i tingsrätten nu)",
    "Lexin030995": "Rättegång via länk",
    "Lexin031015": "Straffavgift för olydnad",
    "Lexin031025": "Cermonin när man gifter sig",
    "Lexin031026": "Giftermål",
    "Lexin031027": "Präst eller domare som får viga par",
    "Lexin031080": "Krav för att få arva (t.ex. att man vårdar graven)",
    "Lexin031081": "Villkor för att få gåvan (t.ex. ej sälja)",
    "Lexin031082": "Förbehåll i testamente",
    "Lexin031151": "Överskott av pengar",
    "Lexin031152": "Med mål att tjäna pengar (affärsmässigt)",
    "Lexin031153": "Kommersiellt syfte",
    "Lexin031200": "Krav på visum för att resa in",
    "Lexin031201": "Tiden visumet gäller",
    "Lexin031209": "När tolken viskar för att inte störa",
    "Lexin031230": "Att vara i Sverige med tillstånd",
    "Lexin031233": "Där man bor just nu",
    "Lexin031261": "Att berätta vad man sett i domstolen",
    "Lexin031266": "Intyg om att namnteckningen är äkta (bevittning)",
    "Lexin031364": "Att slå eller hota en polis/vakt/socialsekreterare",
    "Lexin031365": "Allvarligt brott mot myndighetsperson",
    "Lexin031375": "Att göra motstånd när polisen griper en",
    "Lexin031376": "Att sprattla och bråka vid gripande",
    "Lexin031377": "När en folkmassa bråkar våldsamt (upplopp)",
    "Lexin031383": "Beskrivning av våld (kan vara olagligt våldsskildring)",
    "Lexin031388": "Sexuellt övergrepp (samlag mot viljan)",
    "Lexin031389": "Våldtäkt mot person under 15 år (alltid brott)",
    "Lexin031390": "Orsaka (vållande)",
    "Lexin031392": "Att råka döda någon genom slarv (inte mord)",
    "Lexin031394": "Att råka skada någon (inte misshandel)",
    "Lexin031395": "Miljöbrott av oaktsamhet",
    "Lexin031411": "LVM (vård av missbrukare)",
    "Lexin031412": "Hjälp från socialen",
    "Lexin031426": "Att ge pengar till mutbrott utan att kolla noga",
    "Lexin031430": "Det juridiska ansvaret för ett barn",
    "Lexin031431": "Bestämmanderätt över barn",
    "Lexin031434": "Den som har vårdnaden (oftast föräldern)",
    "Lexin031438": "Slarv med narkotika (t.ex. på sjukhus)",
    "Lexin031440": "Slarv med skatten (inte medvetet fusk)"
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
