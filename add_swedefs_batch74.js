
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch74.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin012759": "Sätta in (t.ex. spiral)",
    "Lexin012760": "Sättandet",
    "Lexin012795": "Att andas in medicin",
    "Lexin012797": "Apparat för astmamedicin",
    "Lexin012811": "Som inte orkar göra något (passiv)",
    "Lexin012818": "Sprutor",
    "Lexin012819": "Behandling med sprutor",
    "Lexin012828": "Benbrott där delarna tryckts ihop",
    "Lexin012852": "Tiden från smitta tills man blir sjuk",
    "Lexin012864": "När något lagras i kroppen",
    "Lexin012884": "Inuti",
    "Lexin012907": "Djupast in",
    "Lexin012908": "Förse med nerver",
    "Lexin012910": "Delen av örat där hörsel och balans sitter",
    "Lexin012918": "Hepatit B (smittar via blod)",
    "Lexin012921": "Under en tid av",
    "Lexin012928": "Inlärning",
    "Lexin012936": "Muskeln som håller tätt (ej viljestyrd)",
    "Lexin012937": "Blödning inuti kroppen (syns inte utanpå)",
    "Lexin012938": "Operation av benbrott med spikar/plattor",
    "Lexin012940": "Hjärta, lungor, lever m.m.",
    "Lexin012941": "Körtlar som tillverkar hormoner (t.ex. sköldkörteln)",
    "Lexin012952": "Fokuseras på",
    "Lexin012964": "När man sprutar in spermier",
    "Lexin012973": "Bli sjuk",
    "Lexin013004": "Svårt att somna",
    "Lexin013048": "Hur mycket insulin man ska ta",
    "Lexin013051": "När blodsockret blir för lågt (skakig/hungrig)",
    "Lexin013054": "Sprutor som ser ut som pennor",
    "Lexin013058": "Apparat som ger insulin hela tiden",
    "Lexin013060": "När kroppen inte svarar på insulin (typ 2 diabetes)",
    "Lexin013063": "Spruta för diabetiker",
    "Lexin013069": "När man läggs in på sjukhus",
    "Lexin013097": "Rätt att få vara ifred och bestämma själv",
    "Lexin013107": "Mycket stark smärta",
    "Lexin013128": "När mediciner påverkar varandra",
    "Lexin013150": "Smärta som kommer och går (intervall)",
    "Lexin013158": "Tvätt av underlivet",
    "Lexin013165": "Vätskebrist (dehydrering)",
    "Lexin013166": "Blödning i hjärnan",
    "Lexin013167": "Spruta i muskeln (t.ex. i armen/skinkan)",
    "Lexin013169": "Dropp",
    "Lexin013170": "Spruta i blodet",
    "Lexin013171": "I en ven",
    "Lexin013172": "Direkt i blodet",
    "Lexin013173": "Ges i en ven",
    "Lexin013184": "Ämne i magen som behövs för B12-vitamin",
    "Lexin013284": "Undersökning med radioaktivt ämne (scintigrafi)",
    "Lexin013397": "Vårdcentral som har öppet kvällar/helger",
    "Lexin013543": "För lite järn i blodet (ger blodbrist)",
    "Lexin013597": "Kräkning som ser ut som kaffesump (gammalt blod)",
    "Lexin013663": "Kallsvettig (av rädsla/smärta)",
    "Lexin013684": "Hutrymme i hjärtat som pumpar ut blod",
    "Lexin013694": "Vätskan i ögat",
    "Lexin013750": "Rör man sätter i blodkärl för dropp",
    "Lexin013760": "Minsta blodkärlen",
    "Lexin013761": "Kapillär",
    "Lexin013785": "Hölje runt led eller organ",
    "Lexin013877": "Slang till urinblåsan",
    "Lexin013895": "Terapi där man ändrar tankar och beteende",
    "Lexin013904": "Operation för att ta ut barnet",
    "Lexin013939": "Bordetella pertussis",
    "Lexin013940": "Tappa luften",
    "Lexin013945": "Ben i skallen bakom ögonen",
    "Lexin013968": "När man inte får luft (agonal andning)",
    "Lexin013970": "Person som behandlar ryggont",
    "Lexin013975": "Operation",
    "Lexin013976": "Att operera",
    "Lexin014022": "Vanlig könssjukdom",
    "Lexin014083": "Som kliar",
    "Lexin014104": "Tiden då mensen slutar",
    "Lexin014171": "När det kliar",
    "Lexin014180": "Löss i kläderna",
    "Lexin014258": "Smärta som nyper",
    "Lexin014312": "Leden i knät",
    "Lexin014323": "Baksidan av knät",
    "Lexin014326": "Kan vara cancer eller ofarligt",
    "Lexin014332": "Stelnar (om blod)",
    "Lexin014363": "Saltvatten för sår eller dropp",
    "Lexin014368": "Lungsjukdom (ofta av rökning)",
    "Lexin014381": "Magsmärtor hos spädbarn",
    "Lexin014410": "Känslig tarm (ger gaser/ont)",
    "Lexin014419": "Kameraundersökning av tjocktarmen",
    "Lexin014422": "Påse på magen (stomi)",
    "Lexin014424": "Undersökning av livmodertappen",
    "Lexin014447": "Komma långsamt (om sjukdom)",
    "Lexin014554": "Nya problem som tillstöter",
    "Lexin014567": "Att trycka ihop",
    "Lexin014568": "Hårt bandage för att stoppa blödning/svullnad",
    "Lexin014601": "Hur bra man orkar springa",
    "Lexin014608": "Vårtor i underlivet",
    "Lexin014677": "Behandling utan operation (t.ex. gips/medicin)",
    "Lexin014769": "Eksem av något man rört vid (t.ex. nickel)",
    "Lexin014778": "Smitta vid beröring",
    "Lexin014780": "Ämnen man får eksem av",
    "Lexin014807": "Dra ihop sig",
    "Lexin014822": "Vätska som syns på röntgen",
    "Lexin014823": "Röntgen med kontrastvätska",
    "Lexin014856": "Buktande utåt (som en boll)",
    "Lexin014867": "Förmåga att styra rörelser"
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
