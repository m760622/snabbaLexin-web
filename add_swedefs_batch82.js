
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch82.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin030534": "Via slidan",
    "Lexin030535": "Tabletter som sätts in i slidan",
    "Lexin030536": "Medicin i slidan (stolpiller)",
    "Lexin030689": "Varsamlingar som töms",
    "Lexin030699": "Vardagliga sysslor (ADL)",
    "Lexin030787": "Att kissa",
    "Lexin030796": "Vattnets kretslopp i kroppen",
    "Lexin030850": "Mat utan kött",
    "Lexin030868": "Små vener",
    "Lexin030873": "Hjärtat stannar (livshotande)",
    "Lexin030874": "Blod som går tillbaka till hjärtat",
    "Lexin030902": "Hur länge medicinen verkar",
    "Lexin031043": "Ökning/minskning av vikt",
    "Lexin031158": "Maginfluensa (calicivirus)",
    "Lexin031185": "Infektion orsakad av virus",
    "Lexin031238": "Leukocyter (immunceller)",
    "Lexin031239": "Leukocyter",
    "Lexin031309": "Att stuka fotleden",
    "Lexin031316": "Fotleden",
    "Lexin031421": "Där man går till doktorn (primärvård)",
    "Lexin031423": "Sjukhus, vårdcentraler m.m.",
    "Lexin031469": "Väder",
    "Lexin031485": "Insekt som biter under natten",
    "Lexin031680": "Väsande andning (astma)",
    "Lexin031712": "Flytande ämne",
    "Lexin031714": "Sår som läcker",
    "Lexin031716": "Svullnad pga vätska",
    "Lexin031717": "Balansen mellan intag och utsöndring av vätska",
    "Lexin031718": "Uttorkad",
    "Lexin031719": "Vätskeersättning (t.ex. Resorb)",
    "Lexin031722": "Blemma/cysta",
    "Lexin031723": "Att dricka vätska",
    "Lexin031724": "Rum i kroppen med vätska (intra/extra)",
    "Lexin031729": "Material i kroppen (muskel, fett, ben)",
    "Lexin031730": "Biopsi",
    "Lexin031731": "Skador på kroppens vävnader",
    "Lexin031757": "Ont i benen när man växer",
    "Lexin031851": "Delen av örat man ser",
    "Lexin031860": "Metallstavar utanför benet för att stabilisera",
    "Lexin031862": "Kanalen in i örat",
    "Lexin031921": "Liten sjukdom",
    "Lexin031922": "Sjukdomar/besvär",
    "Lexin031924": "Illamående i bil/buss",
    "Lexin031934": "Hörselnedsättning av stela hörselben",
    "Lexin031939": "Behov av läsglasögon när man blir äldre",
    "Lexin031960": "Psykisk ohälsa med oro",
    "Lexin031961": "Medicin mot ångest",
    "Lexin032027": "Tar tillbaka (t.ex. njurarna)",
    "Lexin032028": "Sugs upp igen",
    "Lexin032056": "Går ihop igen",
    "Lexin032065": "Bli frisk/återhämta sig",
    "Lexin032092": "Reabsorption (t.ex. i njuren)",
    "Lexin032156": "Kvinnlig könscell",
    "Lexin032159": "Rören där ägget färdas till livmodern",
    "Lexin032160": "Salpingit",
    "Lexin032161": "När ägget lämnar äggstocken",
    "Lexin032162": "Organ där ägg produceras",
    "Lexin032163": "Äggstockarna",
    "Lexin032168": "Protein",
    "Lexin032169": "Proteiner",
    "Lexin032246": "Till exempel oftare/mindre ofta på toaletten",
    "Lexin032253": "Sista delen av tarmen",
    "Lexin032254": "Anus",
    "Lexin032292": "Gen/genuppsättning",
    "Lexin032294": "Att ärva egenskaper",
    "Lexin032302": "Att bilda ärr",
    "Lexin032356": "Medicin i ögat",
    "Lexin032358": "Håligheten där ögat sitter",
    "Lexin032363": "Salva för ögonen",
    "Lexin032376": "Förkylning (övre luftvägar)",
    "Lexin032379": "Ont vid beröring",
    "Lexin032407": "Brott som sticker ut genom huden",
    "Lexin032411": "Öppenvård (inte inlagd)",
    "Lexin032430": "Första fasen av förlossning",
    "Lexin032443": "Otit (ont i örat)",
    "Lexin032445": "Öronlappen (den man ser)",
    "Lexin032447": "Parotiskörtlar (ger saliv)",
    "Lexin032449": "Röret mellan örat och svalget",
    "Lexin032450": "Cerumen (vax i örat)",
    "Lexin032466": "Kvinnligt könshormon",
    "Lexin032485": "OAB (behöver kissa ofta)",
    "Lexin032489": "Övre delen av armen",
    "Lexin032492": "Humerus",
    "Lexin032547": "Menopaus (klimakteriet)",
    "Lexin032553": "Epidermis (yttersta hudlagret)",
    "Lexin032554": "Epidermis",
    "Lexin032573": "Maxillan",
    "Lexin032577": "Celiaki/glutenintolerans",
    "Lexin032578": "Laktosintolerans (tål ej mjölk)",
    "Lexin032699": "För hög vikt (BMI 25-30)",
    "Lexin032714": "För mycket vätska i kroppen",
    "Lexin032722": "Arm- och axelmuskler",
    "Lexin032724": "Cardia (där maten kommer ner från matstrupen)",
    "Lexin032755": "Fotvård",
    "Lexin032756": "Blanda sig i",
    "Lexin032757": "Italiensk mafiaorganisation",
    "Lexin032759": "Biträde till sjuksköterska",
    "Lexin033884": "Smärta av lätt beröring",
    "Lexin033885": "Avlägsnande av kroppsdelar",
    "Lexin033886": "Kan inte skapa nya minnen"
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
