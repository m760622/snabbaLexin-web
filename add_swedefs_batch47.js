
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch47.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin023901": "Tolkning samtidigt som någon talar (i hörlurar)",
    "Lexin023919": "Tillfällig mentalsjukdom (används inte som juridisk term längre)",
    "Lexin023937": "Polisens register inom Schengen (efterlysta personer m.m.)",
    "Lexin023938": "SiS (myndighet som driver ungdomshem och LVM-hem)",
    "Lexin024096": "Att skada sig själv",
    "Lexin024114": "Att köra båt onykter (promillegräns 0,2 för stora båtar)",
    "Lexin024143": "Följden av en skada",
    "Lexin024149": "Vandalisering eller förstörelse",
    "Lexin024154": "Skyldighet att betala skadestånd",
    "Lexin024155": "Pengar för skada (t.ex. sveda och värk)",
    "Lexin024156": "Regler om när man ska betala skadestånd",
    "Lexin024157": "Den som måste betala skadestånd",
    "Lexin024160": "Resultatet av t.ex. ett miljögift",
    "Lexin024247": "Kostnad man får dra av i deklarationen",
    "Lexin024248": "Brott där arbetsgivaren inte betalar in skatt för anställda",
    "Lexin024249": "När man medvetet inte betalar skatt",
    "Lexin024250": "Lag om hur skatt ska betalas",
    "Lexin024252": "De på Skatteverket som utreder brott",
    "Lexin024253": "Lagen om straff för skattebrott",
    "Lexin024255": "Mindre allvarligt slarv med skatten",
    "Lexin024262": "Mål i förvaltningsrätten om skatt",
    "Lexin024265": "Som man måste betala skatt för (inkomst, vinst)",
    "Lexin024269": "Minskning av skatten (t.ex. RUT-avdrag)",
    "Lexin024270": "Lagar om skatt",
    "Lexin024305": "På låtsas (t.ex. skenäktenskap)",
    "Lexin024321": "Regel vid bodelning för att det inte ska bli orättvist",
    "Lexin024339": "Jurist som tingsrätten utser för att dela ett arv",
    "Lexin024356": "Avtal att tvister ska lösas av skiljemän, inte domstol",
    "Lexin024358": "Domen i ett skiljeförfarande",
    "Lexin024359": "Privat rättegång utanför domstolen",
    "Lexin024360": "Processen hos skiljemännen",
    "Lexin024361": "Text i avtal om att man ska använda skiljedomstol",
    "Lexin024363": "De som dömer i skiljedomstolen",
    "Lexin024365": "Gruppen av skiljemän",
    "Lexin024378": "Upplösning av äktenskap",
    "Lexin024461": "Lag om skolan (rättigheter och skyldigheter)",
    "Lexin024703": "Säkerhet mot något",
    "Lexin024713": "De som ansvarar för skyddet",
    "Lexin024720": "Det som lagen vill skydda (t.ex. liv, miljö)",
    "Lexin024721": "Värde som skyddas",
    "Lexin024739": "Straff där man slipper fängelse men har övervakare",
    "Lexin024740": "Dom till skyddstillsyn",
    "Lexin024741": "Påföljd i frihet med prövotid",
    "Lexin024814": "Tillräcklig tid att tänka (t.ex. vid uppsägning av avtal)",
    "Lexin024958": "Att äga en människa",
    "Lexin025043": "När åklagaren och advokaten sammanfattar målet på slutet",
    "Lexin025067": "Sista domstolen som kan döma (HD/HFD)",
    "Lexin025068": "Högsta instans",
    "Lexin025074": "Beslut som avslutar målet (dom eller avskrivning)",
    "Lexin025077": "Fängelser som man inte kan rymma ifrån (säkerhetsklass 1-2)",
    "Lexin025079": "Frågor som bara kan besvaras med ja eller nej",
    "Lexin025081": "Konkursförvaltarens redovisning när konkursen är klar",
    "Lexin025082": "Redovisning av pengarna i ett dödsbo eller konkurs",
    "Lexin025084": "Besked om man får pengar tillbaka eller ska betala restskatt",
    "Lexin025120": "Föräldrar, morföräldrar och barn, barnbarn",
    "Lexin025126": "När man inte får döma/utreda pga att man är släkt",
    "Lexin025252": "Lagen om straff för smuggling",
    "Lexin025292": "Tvistemål om små belopp (förenklat förfarande)",
    "Lexin025515": "Hur det påverkar människors liv och samhället",
    "Lexin025516": "Avgifter som arbetsgivaren betalar för pension och sjukvård",
    "Lexin025519": "Värderingar i samhället",
    "Lexin025532": "Samlad lagstiftning om, sjukpenning, pension m.m.",
    "Lexin025534": "Mål om t.ex. sjukpenning eller bostadsbidrag",
    "Lexin025550": "Politikerna i kommunen som ansvarar för socialtjänsten",
    "Lexin025552": "Nämnden för individ- och familjeomsorg",
    "Lexin025563": "Kommunens hjälp till medborgarna (försörjningsstöd, barnavård)",
    "Lexin025566": "SoL (lagen om kommunens socialtjänst)",
    "Lexin025613": "När alla ansvarar för hela skulden (en för alla, alla för en)",
    "Lexin025615": "Gemensamt betalningsansvar",
    "Lexin025720": "Att i hemlighet titta på någon eller något",
    "Lexin025721": "Polisspaning",
    "Lexin025763": "Domstol för speciella frågor (t.ex. Arbetsdomstolen)",
    "Lexin025764": "Inte allmänna domstolar",
    "Lexin025772": "Rättegångsregler för vissa mål",
    "Lexin025776": "Strafflagar utanför brottsbalken (t.ex. trafikbrottslagen)",
    "Lexin025861": "Att ge hemlig information till främmande makt",
    "Lexin025863": "Brottet spioneri",
    "Lexin025938": "Att t.ex. hälla gift i vattnet",
    "Lexin025939": "Allmänfarligt brott",
    "Lexin026045": "Register över spärrade kort eller pass",
    "Lexin026085": "Grundregler för en förening",
    "Lexin026087": "Föreningens lag",
    "Lexin026097": "När domstolen gör en överenskommelse till en dom",
    "Lexin026135": "Färdiga papper att fylla i (t.ex. hyreskontrakt)",
    "Lexin026167": "Landet Sverige eller statsmakten",
    "Lexin026171": "NFC (Nationellt forensiskt centrum, fd SKL)",
    "Lexin026188": "Pengar från staten till kommuner eller föreningar",
    "Lexin026190": "Kungen (monark) eller president",
    "Lexin026200": "Regeringschefen",
    "Lexin026202": "Medlem av regeringen",
    "Lexin026203": "Läran om staten och grundlagarna",
    "Lexin026212": "Åklagare vid Riksenheten mot korruption el.dyl.",
    "Lexin026310": "Lag om hur stiftelser ska skötas",
    "Lexin026312": "Dokumentet som bildar stiftelsen",
    "Lexin026447": "Följden av ett brott (böter eller fängelse)",
    "Lexin026448": "Straff utanför fängelse (villkorlig dom, skyddstillsyn)",
    "Lexin026450": "Att bestämma hur långt straffet ska bli",
    "Lexin026451": "Risk att bli straffad",
    "Lexin026454": "Att en handling är ett brott",
    "Lexin026456": "Olagligt (finns straff för det)"
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
