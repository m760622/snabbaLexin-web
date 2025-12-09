
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch58.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin022290": "Begäran om att få en dom omprövad (resning)",
    "Lexin022324": "Ingrepp som begränsar friheten (t.ex. för häktad)",
    "Lexin022380": "Revisorns rapport om företagets ekonomi",
    "Lexin022490": "När man inte är helt säker på att någon är skyldig",
    "Lexin022529": "Fara för att något dåligt händer",
    "Lexin022881": "Hjälp med att veta vad som är rätt (juridiskt)",
    "Lexin022914": "Ta något med våld eller hot",
    "Lexin023008": "Papper som ger rätt att företräda någon i rätten",
    "Lexin023013": "Något som gör att rättegången inte kan hållas",
    "Lexin023016": "Att bråka i domstolen i onödan",
    "Lexin023021": "Rättning av skrivfel i domen",
    "Lexin023023": "Domaren som leder förhandlingen",
    "Lexin023024": "När domarna diskuterar domen (hemligt)",
    "Lexin023045": "Person som bråkar och processar i onödan",
    "Lexin023051": "Kostnad för rättshjälp (som man betalar själv)",
    "Lexin023056": "Myndighet som sköter rättshjälpen",
    "Lexin023060": "Läkarintyg om skador för polisen",
    "Lexin023065": "Domstolarnas dömande verksamhet",
    "Lexin023066": "När en dom stoppar nya rättegångar om samma sak",
    "Lexin023073": "Bråk som avgörs i domstol",
    "Lexin023082": "Hur domstolarna har dömt tidigare (prejudikat)",
    "Lexin023087": "Vård på sjukhus för den som begått brott",
    "Lexin023100": "Försäkring som betalar advokaten",
    "Lexin023106": "Hur man använder lagen i verkligheten",
    "Lexin023207": "Välja med röstsedel",
    "Lexin023272": "Papper där experten säger vad hen tycker",
    "Lexin023287": "Skada på saker (inte personer)",
    "Lexin023351": "Något som ägs av flera fastigheter ihop (t.ex. väg)",
    "Lexin023367": "Att jobba gratis istället för fängelse",
    "Lexin023502": "Stark misstanke (räcker för häktning)",
    "Lexin023654": "Hemligt (får inte berättas)",
    "Lexin023655": "Färgmarkering i akten att det är hemligt",
    "Lexin023657": "Hemliga uppgifter",
    "Lexin023658": "Skydd för hemliga uppgifter",
    "Lexin023806": "Brott som våldtäkt eller ofredande",
    "Lexin023856": "Beskrivning av hur någon ser ut (efterlyst)",
    "Lexin024074": "Papper till Skatteverket om inkomst",
    "Lexin024082": "Som man får skylla sig själv för",
    "Lexin024104": "Att ta lagen i egna händer (olagligt)",
    "Lexin024141": "Rapport om en skada",
    "Lexin024144": "Följden av en skada",
    "Lexin024150": "Den som blivit skadad",
    "Lexin024153": "Pengar man får för en skada",
    "Lexin024251": "Brott mot skattelagen (fusk)",
    "Lexin024266": "Förmån man ska skatta för (t.ex. tjänstebil)",
    "Lexin024268": "Att fuska med bokföringen för att slippa skatt",
    "Lexin024273": "Den som ska betala skatt",
    "Lexin024389": "Döma rättvist",
    "Lexin024660": "Att få sina skulder avskrivna (om man är evighetsgäldenär)",
    "Lexin024704": "Hemlig adress (skyddad identitet)",
    "Lexin024705": "Att gömma en brottsling för polisen",
    "Lexin024709": "Person som behöver asyl (skydd)",
    "Lexin024742": "Straff där man är fri men har en övervakare",
    "Lexin024757": "Något man måste göra",
    "Lexin024812": "Den lägre graden av misstanke",
    "Lexin024813": "Att bedöma vad som är rimligt",
    "Lexin025044": "Advokatens och åklagarens sista tal i rättegången",
    "Lexin025054": "Ungdomsfängelse (på SIS-hem)",
    "Lexin025076": "Beslut som avslutar målet",
    "Lexin025251": "Att ta in varor olagligt i landet",
    "Lexin025564": "Soss (Socialtjänsten)",
    "Lexin025770": "Lärare för barn med särskilda behov",
    "Lexin025862": "Att ge hemlig info till främmande makt",
    "Lexin026134": "Färdigt kontrakt där bara namn fylls i",
    "Lexin026196": "Person som inte har något medborgarskap",
    "Lexin026466": "Regler om brott och straff",
    "Lexin026470": "Tiden man ska sitta inne",
    "Lexin026752": "Visa leg",
    "Lexin026765": "Barn till ens partner (bonusbarn)",
    "Lexin026851": "Ersättare eller ställföreträdande förälder",
    "Lexin026862": "Bevisat så att ingen kan tvivla (fällande dom)",
    "Lexin026873": "Dra någon inför rätta",
    "Lexin026885": "Papperet man skickar in för att stämma någon",
    "Lexin026897": "Att planera brott tillsammans med andra",
    "Lexin026902": "Rättegång utan publik",
    "Lexin026940": "Saker som är stulna",
    "Lexin027185": "Fysiskt och psykiskt lidande (ersättning)",
    "Lexin027389": "Mycket starka skäl",
    "Lexin027392": "Extremt svår situation (för asyl)",
    "Lexin027557": "Gå igenom metalldetektor (i domstolen)",
    "Lexin027564": "Säpo",
    "Lexin027632": "Barn från ett tidigare förhållande",
    "Lexin027633": "Papper som visar att man inte bor ihop",
    "Lexin027640": "Krav för att komma in på utbildningen",
    "Lexin027644": "Jurist som företräder barnet i brottmål (mot förälder)",
    "Lexin027648": "Snabbt beslut från Kronofogden om t.ex. vräkning",
    "Lexin027659": "Ursäkter som lagen godtar",
    "Lexin027689": "Låsa in flykting",
    "Lexin028017": "Året då skatten räknas ut",
    "Lexin028166": "Den som ser till att testamentet följs",
    "Lexin028219": "Sista datum",
    "Lexin028227": "Ersättning för tid man förlorat (i rätten)",
    "Lexin028263": "Att ångra sig frivilligt och avbryta brottet",
    "Lexin028321": "Stöld (juridiskt ord)",
    "Lexin028323": "Brott där man tar saker",
    "Lexin028354": "Offentligt meddelande",
    "Lexin028390": "Lust tillåtelse (t.ex. vapenlicens)",
    "Lexin028392": "Polisens tillstånd att demonstrera",
    "Lexin028400": "Kontroll att regler följs",
    "Lexin028444": "Ge lov"
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
