
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch30.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin011044": "Gevär som skjuter hagel",
    "Lexin011201": "Brott som begås genom att man gör något aktivt",
    "Lexin011205": "Kravet på själva handlingen för att det ska vara brott",
    "Lexin011287": "Pengar till gravid som inte kan jobba",
    "Lexin011289": "Olycka där något går sönder (t.ex. flygplan)",
    "Lexin011396": "Polisen filmar i smyg",
    "Lexin011399": "Polisen avlyssnar ett rum i smyg",
    "Lexin011401": "Polisen avlyssnar samtal i smyg",
    "Lexin011404": "Polisen kollar vem någon ringer till",
    "Lexin011459": "Fras: Man kan inte lita på henne",
    "Lexin011741": "Andra domstolsinstansen (efter tingsrätten)",
    "Lexin011843": "Polisen söker igenom någons bostad",
    "Lexin011870": "Själva rättegången i domstolen",
    "Lexin011892": "Boende för barn eller unga som behöver stöd",
    "Lexin012127": "Lokal där misstänkta sitter inlåsta i väntan på rättegång",
    "Lexin012271": "Påstår bestämt",
    "Lexin012332": "Sveriges högsta domstol",
    "Lexin012427": "Fras: I den oordningen/situationen",
    "Lexin012651": "Händelse (ofta negativ eller farlig)",
    "Lexin012671": "Man inser att det finns en risk men gör det ändå",
    "Lexin012680": "Plan för hur en person ska rehabiliteras",
    "Lexin012748": "Ta reda på fakta",
    "Lexin013072": "Person som sitter i fängelse",
    "Lexin013302": "Lagen om fotboja",
    "Lexin013312": "Fras vid kondoleans (när någon dött)",
    "Lexin013460": "Juriststudent",
    "Lexin013612": "Stort bråk och oordning",
    "Lexin013697": "Kläder som smälter in i omgivningen",
    "Lexin013712": "Det finns skäl att tro att personen gjort det",
    "Lexin014407": "Risk att den misstänkte förstör bevis",
    "Lexin014602": "Undersökning av skicket på något",
    "Lexin014797": "Bedrägeri med stulna kortuppgifter",
    "Lexin014815": "Vård istället för fängelse (för missbrukare)",
    "Lexin015066": "Polisstyrka specialiserad på upplopp",
    "Lexin015067": "Brev med hot om inkasso",
    "Lexin015122": "Myndigheten som sköter fängelser och häkten",
    "Lexin015124": "Straff som avtjänas ute i samhället",
    "Lexin015228": "Polisen undersöker en persons kropp (kläder eller naken)",
    "Lexin015485": "Att ta egendom i beslag för att säkra betalning",
    "Lexin015568": "Högtidlig handling i kyrkan",
    "Lexin015581": "Person som ofta sitter i fängelse (slang)",
    "Lexin015582": "Person som är van vid fängelseliv (slang)",
    "Lexin015817": "Rätt att göra något enligt lag",
    "Lexin015854": "Metoder som lagen tillåter",
    "Lexin016205": "Har sjukdomen diabetes",
    "Lexin016224": "Ungdom som bråkar och förstör",
    "Lexin016245": "Gärningsmannen var likgiltig inför följderna",
    "Lexin016459": "Mindre fängelse (anstalt)",
    "Lexin016569": "Ungdomstjänst eller ungdomsvård",
    "Lexin016627": "Anmälan om tvångsvård av missbrukare",
    "Lexin016628": "Behandlingshem för tvångsvård (LVM)",
    "Lexin016658": "Att vägra lyda order (militärt eller på anstalt)",
    "Lexin016823": "Kostnad för läkarbesök",
    "Lexin016830": "Hälsoundersökning",
    "Lexin016833": "Lapp med medicinbeställning från läkare",
    "Lexin016835": "Grupp av läkare",
    "Lexin016839": "Ersättning för vårdkostnader",
    "Lexin016840": "Prislista för vård",
    "Lexin016852": "Företag som tillverkar medicin",
    "Lexin017435": "Genom att ta sig in olovligt",
    "Lexin017450": "Håller med om",
    "Lexin017503": "Hjälp till brottsling",
    "Lexin017736": "Ansiktsuttryck",
    "Lexin017805": "Gammalt ord för brottsling",
    "Lexin017852": "Personen som man tror gjort brottet",
    "Lexin017995": "En klassisk svensk kniv",
    "Lexin018326": "Den som blivit utsatt för brott",
    "Lexin018548": "Att ha knark på sig",
    "Lexin018550": "Brottet att ha narkotika",
    "Lexin018702": "Säger att det inte är sant",
    "Lexin018827": "Böter med fast belopp",
    "Lexin018956": "Att slippa straff",
    "Lexin019107": "Att använda för mycket våld i självförsvar",
    "Lexin019108": "Rätt att försvara sig med våld",
    "Lexin019110": "Acceptera domen och inte överklaga",
    "Lexin019129": "Slarv eller oförsiktighet som orsakar skada",
    "Lexin019202": "De yttre omständigheterna för ett brott",
    "Lexin019237": "Fras: Tog tag i mig hårt",
    "Lexin019239": "Att ta orimligt mycket betalt (lånehaj)",
    "Lexin019266": "Som man inte kan undvika eller avstå från",
    "Lexin019491": "Att göra sig av med något man inte äger men har hand om",
    "Lexin019575": "Ta hand om (tvångs)vård av person",
    "Lexin019579": "Polisen tar körkortet",
    "Lexin019580": "Polisen tar passet",
    "Lexin019955": "Alla är överens om detta",
    "Lexin019970": "Fula ord och glåpord",
    "Lexin020342": "Polisbil",
    "Lexin020343": "Åkte runt och vaktade",
    "Lexin020380": "Låda för pengar",
    "Lexin020390": "Böter på ett fast belopp",
    "Lexin020401": "Låta någon sluta jobba pga ålder",
    "Lexin020404": "Avgift till pensionen",
    "Lexin020406": "Som har rätt till pension",
    "Lexin020409": "Förmån i form av pension",
    "Lexin020410": "Försäkring för pensionen",
    "Lexin020413": "Sparade pengar till pension",
    "Lexin020415": "Poäng som bestämmer pensionens storlek",
    "Lexin020418": "Eget sparande till pensionen",
    "Lexin020419": "Konto för pensionssparande",
    "Lexin020420": "Fond för pensionspengar"
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
