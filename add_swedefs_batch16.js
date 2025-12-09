
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch16.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin010233": "Låda som styr sågen vid sågning av vinklar",
    "Lexin010234": "Såg (ofta elektrisk) för att kapa vinklar exakt",
    "Lexin010254": "Ämne som är skadligt för levande organismer",
    "Lexin010261": "Som innehåller gift (om material)",
    "Lexin010282": "Tiden då ett tillstånd eller avtal gäller",
    "Lexin010292": "Skiva av gips med papp på ytan för vägg/tak",
    "Lexin010293": "Svart fosfaterad skruv för gipsmontage",
    "Lexin010301": "Datorsystem för kartor och geografisk data",
    "Lexin010322": "Fylla form med flytande material som stelnar",
    "Lexin010323": "Asfalt som läggs ut flytande utan vältning",
    "Lexin010326": "Skarv mellan två gjutetapper",
    "Lexin010328": "Arbetet med att gjuta betong",
    "Lexin010329": "Rör av papp för gjutning av plintar",
    "Lexin010330": "Överflödigt material som sticker ut efter gjutning",
    "Lexin010341": "Hur mycket en yta reflekterar ljus (matt/blank)",
    "Lexin010347": "Genomskinligt material i fönster",
    "Lexin010349": "Remsa för att förstärka gipsskarvar",
    "Lexin010350": "Väv för att förstärka väggar vid målning",
    "Lexin010355": "Isolering gjord av smält glas",
    "Lexin010415": "Bearbetning av betongyta för att göra den slät",
    "Lexin010476": "Som klarat besiktning eller kontroll",
    "Lexin010497": "Ytan man går på i ett rum",
    "Lexin010499": "Att göra golvet plant med spackel",
    "Lexin010500": "Nivån för det färdiga golvet",
    "Lexin010501": "List som täcker springan mellan golv och vägg",
    "Lexin010502": "Plattor av t.ex. klinker för golv",
    "Lexin010503": "Värmeslingor ingjutna eller lagda i golvet",
    "Lexin010504": "Golvets area i kvadratmeter",
    "Lexin010540": "Trappstegsformad sittplats (t.ex. i aula)",
    "Lexin010555": "Hård och tålig bergart",
    "Lexin010556": "Mycket hårda keramiska plattor",
    "Lexin010562": "Grannars åsikt inför bygglov",
    "Lexin010674": "Hur ojämn en yta är",
    "Lexin010677": "Tjock stålplåt (över 3-4 mm)",
    "Lexin010699": "Första lagret asfalt eller färg",
    "Lexin010713": "Byggnadens understa del mot marken",
    "Lexin010716": "Första strykningen med färg",
    "Lexin010717": "Olja för att skydda trä före målning",
    "Lexin010728": "Vatten som finns naturligt nere i marken",
    "Lexin010729": "Hur högt grundvattnet står",
    "Lexin010739": "Ledare för en arbetsgrupp",
    "Lexin010748": "Stenmaterial med rundade korn",
    "Lexin010790": "Rör eller dubb som markerar tomtgräns",
    "Lexin010791": "Punkt som definierar en gräns",
    "Lexin010807": "Arbete med att gräva i marken",
    "Lexin010810": "Maskin för grävning",
    "Lexin010854": "Elastiskt material (naturligt eller syntetiskt)",
    "Lexin010911": "Väg avsedd för gående",
    "Lexin010936": "Utrymme mellan husen",
    "Lexin011064": "När underlaget är halt",
    "Lexin011123": "Betongvägg med isolering på ena sidan (halv sandwich)",
    "Lexin011139": "Regel som håller ihop väggens överkant",
    "Lexin011141": "Verktyg för att slå i spik",
    "Lexin011144": "Plats för båtar och fartyg",
    "Lexin011151": "Horisontell bjälke som håller ihop takstolar",
    "Lexin011162": "Värmeelement för att torka handdukar",
    "Lexin011540": "Anordning för att transportera personer/gods vertikalt",
    "Lexin011658": "Bärande innervägg i husets mitt",
    "Lexin011665": "Utbildning i Hjärt-Lung-Räddning",
    "Lexin011769": "Spik med fyrkantig genomskärning (gammaldags)",
    "Lexin011772": "Mejsel för att hugga i sten eller betong",
    "Lexin011818": "Byggnad avsedd att bo eller vistas i",
    "Lexin011832": "Energi som hyresgästen använder (ej byggnadens)",
    "Lexin011834": "El för lampor, apparater etc.",
    "Lexin011848": "Svamp som bryter ner trä i hus",
    "Lexin011865": "Det viktigaste huset på fastigheten",
    "Lexin011887": "Säkring för hela anläggningens strömtillförsel",
    "Lexin011902": "Verktyg som drivs med oljetryck",
    "Lexin011963": "De som hyr bostad eller lokal",
    "Lexin012010": "Energisystem som är bra för miljön på sikt",
    "Lexin012011": "När alla led i produktionen är hållbara",
    "Lexin012012": "Utveckling som tillgodoser dagens behov utan att äventyra framtiden",
    "Lexin012013": "Värdeskapande process som är hållbar",
    "Lexin012014": "Förmåga att hålla länge; miljömässig långsiktighet",
    "Lexin012015": "Avdelning som arbetar med miljö och CSR",
    "Lexin012016": "Krav för att något ska klassas som hållbart",
    "Lexin012017": "Redovisning av miljö- och socialt arbete",
    "Lexin012018": "Risker kopplade till miljö och socialt ansvar",
    "Lexin012019": "Plan för hur företaget ska bli mer hållbart",
    "Lexin012020": "Nya inriktningar inom hållbarhet",
    "Lexin012021": "Samhälle som är ekologiskt och socialt hållbart",
    "Lexin012022": "Metod som sparar på resurserna",
    "Lexin012050": "Såg för att göra runda hål (dosfräs)",
    "Lexin012051": "Att göra hål i väggar eller bjälklag",
    "Lexin012068": "Betong med extra hård yta",
    "Lexin012069": "Golv av hårdbetong för industri",
    "Lexin012070": "Hård träfiberskiva",
    "Lexin012081": "Virke från lövträd (t.ex. ek, bok)",
    "Lexin012153": "Tillstånd av fysiskt och psykiskt välbefinnande",
    "Lexin012154": "Regler för arbetsmiljö på företaget",
    "Lexin012155": "Arbetsmiljöarbete (Health and Safety)",
    "Lexin012164": "Som kan skada hälsan",
    "Lexin012212": "Ränna under takfoten som samlar regnvatten",
    "Lexin012235": "Glas som värmebehandlats för att bli starkare",
    "Lexin012343": "Laminatgolv eller bänkskiva med slitstark yta",
    "Lexin012349": "Avstånd vertikalt",
    "Lexin012352": "Linje på karta som binder samman punkter med samma höjd",
    "Lexin012355": "Justering uppåt",
    "Lexin012401": "Kåpor eller proppar som skyddar hörseln",
    "Lexin012455": "Likabehandling oavsett kön, ursprung etc."
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
