
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch34.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin003266": "Fakta som man vill bevisa",
    "Lexin003270": "Domstolens bedömning av hur starka bevisen är",
    "Lexin003274": "Intygas av vittnen (namnteckning)",
    "Lexin003302": "Att lura till sig bidrag man inte har rätt till",
    "Lexin003308": "Säga ja till en begäran (t.ex. i domstol)",
    "Lexin003312": "Skicka med (ett dokument)",
    "Lexin003364": "Hänsyn till omständigheter som ger mildare straff",
    "Lexin003376": "Som man måste följa (t.ex. ett avtal)",
    "Lexin003430": "Område där man inte får skada naturen",
    "Lexin003461": "Att hjälpa någon juridiskt",
    "Lexin003464": "Person som hjälper en part i rätten (t.ex. advokat)",
    "Lexin003588": "Grupp av partier eller länder",
    "Lexin003808": "Delning av egendom medan man fortfarande är gift",
    "Lexin003809": "Jurist som tingsrätten utser för att dela egendom",
    "Lexin003815": "Uträkning av om man har råd att bo kvar",
    "Lexin003829": "Möbler och saker i hemmet",
    "Lexin003847": "Lag om hur företag ska redovisa sin ekonomi",
    "Lexin003857": "Att läsa lagen exakt som det står",
    "Lexin003862": "Typ av företag (t.ex. AB, HB)",
    "Lexin003863": "Ägarna i ett handelsbolag eller kommanditbolag",
    "Lexin003865": "Möte där aktieägarna beslutar om bolaget",
    "Lexin003866": "Aktiebolagets högsta beslutande organ",
    "Lexin003867": "Myndighet som registrerar företag",
    "Lexin003921": "Löfte att betala någons skuld om den inte kan",
    "Lexin003981": "Hemmet och sakerna i det",
    "Lexin003982": "Lägenhet med bostadsrätt",
    "Lexin003985": "Att hyra mark för att ha sitt hus på",
    "Lexin003986": "Arrende för boende",
    "Lexin003999": "Förening som äger huset där medlemmarna bor",
    "Lexin004000": "Register över alla lägenheter i föreningen",
    "Lexin004031": "Den som bäst känner till dödsboet (oftast anhörig)",
    "Lexin004037": "Utredning av dödsboets tillgångar och skulder",
    "Lexin004038": "Person som tingsrätten utser att sköta dödsboet",
    "Lexin004092": "Verksamhetsområde",
    "Lexin004149": "Dålig information om miljörisker",
    "Lexin004207": "Brott av militär personal",
    "Lexin004210": "Brott som drabbar många (t.ex. mordbrand/sprängning)",
    "Lexin004211": "Allmänfarliga brott",
    "Lexin004212": "Brott som olaga hot, hemfridsbrott, ofredande",
    "Lexin004213": "Att skada en grav eller en död kropp",
    "Lexin004214": "Skändning av lik eller grav",
    "Lexin004215": "Våldsbrott (mord, misshandel)",
    "Lexin004216": "Att olagligt tvinga fram eller hindra åsikter",
    "Lexin004217": "Svåra brott mot civila (folkrättsbrott)",
    "Lexin004218": "Massmord, tortyr m.m.",
    "Lexin004219": "Att bygga eller göra intrång i skyddad natur",
    "Lexin004220": "Brott mot en enskild individ",
    "Lexin004221": "T.ex. misshandel eller sexualbrott",
    "Lexin004222": "Att ta reda på hur någon röstat",
    "Lexin004223": "Spioneri, landsförräderi m.m.",
    "Lexin004224": "Brott som hotar rikets säkerhet",
    "Lexin004228": "Mål som handlar om brott och straff",
    "Lexin004229": "Gången i ett brottmål",
    "Lexin004233": "Att utreda och straffa brott",
    "Lexin004234": "Ingripande mot brott",
    "Lexin004237": "Beskrivning av vad brottsligheten består i",
    "Lexin004238": "Arbete för att minska brottsligheten",
    "Lexin004239": "Myndighet som forskar om brott (Brå)",
    "Lexin004240": "Lista över alla brott",
    "Lexin004243": "Handling som är olaglig",
    "Lexin004245": "Kriminella gäng och nätverk",
    "Lexin004250": "Myndighet som ger ersättning till brottsoffer",
    "Lexin004251": "Brottsoffermyndigheten",
    "Lexin004252": "Platsen där brottet skedde",
    "Lexin004253": "Tekbisk undersökning av platsen",
    "Lexin004254": "Straffet för ett brott",
    "Lexin004258": "Pengar man kan få om man utsatts för brott",
    "Lexin004260": "Polisens arbete med att lösa brottet",
    "Lexin004270": "Att använda t.ex. ett falskt körkort",
    "Lexin004329": "Att öppna andras brev eller lyssna på samtal",
    "Lexin004524": "Person som agerar åt någon annan för att dölja vem det är",
    "Lexin004536": "Barn- och ungdomspsykiatrin",
    "Lexin004619": "Gammal del av lagboken om fastigheter",
    "Lexin004647": "Stöldgods",
    "Lexin004787": "Företag vars aktier köps och säljs på börsen",
    "Lexin004793": "Straff där man betalar pengar till staten",
    "Lexin004794": "Dömd till både pengar och fängelse",
    "Lexin004795": "Lag om hur böter ska drivas in",
    "Lexin004836": "Olyckshändelse (latin)",
    "Lexin004944": "Lag om checkar (används sällan nu)",
    "Lexin004948": "Chef för en åklagarkammare",
    "Lexin004949": "Hög åklagarchat",
    "Lexin005005": "Polis utan uniform",
    "Lexin005006": "Rättegång om pengar eller avtal (inte brott)",
    "Lexin005007": "Tvistemålsprocess",
    "Lexin005008": "Regler mellan privatpersoner/företag",
    "Lexin005009": "Privaträtt",
    "Lexin005010": "Tvist som inte handlar om straff",
    "Lexin005011": "Lagar som inte är straffrätt",
    "Lexin005058": "Oaktsamhet (latin)",
    "Lexin005091": "Att ta fingeravtryck och foto på misstänkt",
    "Lexin005101": "Lista över vad som händer i målet",
    "Lexin005109": "Ersättning för förlorad arbetsinkomst vid rättegång",
    "Lexin005199": "Tidigare namn på Integritetsskyddsmyndigheten (IMY)",
    "Lexin005200": "Att hacka sig in i datorer",
    "Lexin005202": "Pantbrev som finns digitalt",
    "Lexin005299": "Att överlämna handlingar bevisligen",
    "Lexin005302": "Person som jobbar med att delge folk",
    "Lexin005327": "Att vara delägare",
    "Lexin005342": "Laglig rätt att demonstrera"
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
