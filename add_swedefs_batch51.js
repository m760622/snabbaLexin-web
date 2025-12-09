
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch51.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin031441": "Lämnande av felaktig uppgift i deklarationen (av slarv)",
    "Lexin031443": "Att vara oaktsam (inte meningen, men slarvigt)",
    "Lexin031444": "Trafikbrott (t.ex. krocka pga slarv)",
    "Lexin031445": "Att hantera farliga ämnen oaktsamt",
    "Lexin031446": "Slarv med gift eller smitta",
    "Lexin031447": "Att tappa bort hemliga papper eller prata bredvid mun",
    "Lexin031448": "Att slösa bort pengar när man är skyldig andra pengar",
    "Lexin031449": "Tid på sjukhus eller behandlingshem",
    "Lexin031593": "Hot med vapen (ofta grovt olaga hot)",
    "Lexin031594": "Väpnat hot mot samhället",
    "Lexin031603": "Att staten tar värdet av brottsvinsten (pengar)",
    "Lexin031608": "Förverkande av brottsvinst",
    "Lexin031629": "Försvara sig (nödvärn)",
    "Lexin031743": "När barnet bor varannan vecka hos föräldrarna",
    "Lexin031793": "Beslut att man inte får berätta om en utredning",
    "Lexin031820": "Hur man brukar göra i branschen",
    "Lexin031849": "Det som står i testamentet",
    "Lexin031855": "Brott mot yttrandefrihetsgrundlagen (t.ex. hets mot folkgrupp)",
    "Lexin031902": "Publik i rättssalen",
    "Lexin031914": "Brott som åklagaren måste utreda (allmänt åtal)",
    "Lexin031915": "Område som en åklagarkammare ansvarar för",
    "Lexin031917": "Kontoret där åklagarna jobbar",
    "Lexin031919": "Åklagarmyndigheten och dess organisation",
    "Lexin031946": "Skyldighet enligt lag",
    "Lexin031949": "Beslutar att någon måste göra något",
    "Lexin032039": "Att man måste betala tillbaka pengar",
    "Lexin032057": "Avtal om att få sälja en tillverkares varor",
    "Lexin032070": "Ta tillbaka (t.ex. ett körkort eller en talan)",
    "Lexin032072": "Beslut att dra in ett tillstånd",
    "Lexin032077": "Beslut att man inte får resa tillbaka till Sverige",
    "Lexin032084": "Att få en ny chans att överklaga trots att tiden gått ut",
    "Lexin032085": "Återställande av försutten tid",
    "Lexin032090": "Att skickas tillbaka",
    "Lexin032098": "Att en dom prövas igen (om den var tredskodom) eller återvinning i konkurs",
    "Lexin032099": "Att ta tillbaka gåvor eller betalningar till konkursboet",
    "Lexin032150": "Pantsedlar som fastighetsägaren själv har",
    "Lexin032152": "Fastighet som består av en ägarlägenhet",
    "Lexin032157": "Donation av ägg (för IVF)",
    "Lexin032180": "Att låta bli att göra något man måste göra (brottsligt)",
    "Lexin032187": "Lagen om äktenskap och skilsmässa",
    "Lexin032189": "Bevis på att man är gift",
    "Lexin032191": "Avtal om att viss egendom ska vara enskild (inte delas vid skilsmässa)",
    "Lexin032194": "Skatteverkets register över gifta",
    "Lexin032196": "Att tvingas gifta sig (brott)",
    "Lexin032287": "Lagen om domstolsärenden",
    "Lexin032288": "Mål som inte är tvister eller brottmål (t.ex. adoption, konkurs)",
    "Lexin032309": "Lagen om arv",
    "Lexin032419": "Pågående eller avslutat ärende",
    "Lexin032422": "Frågor där man får berätta fritt (inte ja/nej)",
    "Lexin032534": "Kommunal nämnd som granskar förmyndare och gode män",
    "Lexin032556": "Det som blir över när panten är såld",
    "Lexin032565": "Att klaga på en dom till högre domstol",
    "Lexin032567": "Papperet där man överklagar",
    "Lexin032595": "När domarna diskuterar domen enskilt",
    "Lexin032615": "Mål där man klagar på myndighetsbeslut",
    "Lexin032627": "Att man ser mellan fingrarna (inte straffar)",
    "Lexin032682": "Att inte lyda polisen eller Kronofogden",
    "Lexin032693": "Att ha koll på någon (elektronisk fotboja eller övervakare)",
    "Lexin032694": "Påföljd efter fängelse eller vid frivård",
    "Lexin032695": "Personer som ansvarar för övervakningen",
    "Lexin032696": "Nämnd som beslutar om villkorlig frigivning m.m.",
    "Lexin032715": "Chef inom åklagarmyndigheten",
    "Lexin000003": "Bedrägeri (att lura någon för att tjäna på det)",
    "Lexin000004": "Förskingring (att ta pengar man har hand om)",
    "Lexin000005": "Förtal (att sprida lögner om någon)",
    "Lexin000006": "Mened (att ljuga under ed i domstol)",
    "Lexin000007": "Miljöbrott (att förorena)",
    "Lexin000008": "Mord (att döda någon med avsikt)",
    "Lexin000009": "Mordbrand (att anlägga brand som är farlig)",
    "Lexin000010": "Människorov (kidnappning)",
    "Lexin000011": "Narkotikabrott (knarkbrott)",
    "Lexin000012": "Oredlighet mot borgenär (ekobrott)",
    "Lexin000013": "Skadegörelse (att ha sönder saker)",
    "Lexin000014": "Stöld (att ta andras saker)",
    "Lexin000015": "Upplopp (våldsamma oroligheter)",
    "Lexin000016": "Urkundsförfalskning (förfalskning av dokument)",
    "Lexin000017": "Vårdslöshet i trafik (trafikfara)",
    "Lexin000019": "Våldtäkt",
    "Lexin000020": "Arbetsmiljöbrott (olyckor på jobbet)",
    "Lexin000021": "Försvårande av skattekontroll (bokföringsfusk)",
    "Lexin000022": "Ockerpantning (ta emot stöldgods som pant)",
    "Lexin000023": "Att sprida piratkopior",
    "Lexin000024": "Att stjäla el (olovlig kraftavledning)",
    "Lexin000025": "Spioneri (olovlig underrättelseverksamhet)",
    "Lexin000026": "Sexuellt ofredande (tafsande)",
    "Lexin000027": "Övergrepp i rättssak (hota vittnen)",
    "Lexin000028": "Olaga våldsskildring (sprida filmer med grovt våld)",
    "Lexin000029": "Köp av sexuell tjänst (sexköp)",
    "Lexin000031": "Olovlig värvning (rekrytering till krigstjänst)",
    "Lexin000032": "Koppleri (hallickverksamhet)",
    "Lexin000033": "Förargelseväckande beteende (t.ex. kissa offentligt)",
    "Lexin000034": "Bedrägligt beteende (ringa bedrägeri)",
    "Lexin000035": "Dråp (att döda någon, mindre grovt än mord)",
    "Lexin000036": "Förvanskning av urkund (ändra i ett dokument)",
    "Lexin000037": "Grov mordbrand",
    "Lexin000038": "Grov oredlighet mot borgenär",
    "Lexin000039": "Olaga frihetsberövande (låsa in någon)",
    "Lexin000040": "Osann partsutsaga (ljuga i rätten utan ed)",
    "Lexin000041": "Sexuellt utnyttjande av person i beroendeställning",
    "Lexin000042": "Skattebrott (skattefusk)"
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
