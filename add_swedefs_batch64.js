
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch64.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin003612": "Ställe där man lämnar blod",
    "Lexin003613": "Hur blodet rör sig runt i kroppen",
    "Lexin003617": "Mängden blod som passerar",
    "Lexin003620": "När man blöder mycket",
    "Lexin003623": "Blod som strömmar genom vävnad",
    "Lexin003626": "A, B, AB och 0",
    "Lexin003627": "Test för att se vilken blodgrupp man har",
    "Lexin003632": "Celler i blodet (röda, vita, blodplättar)",
    "Lexin003633": "Blodets celler",
    "Lexin003634": "Som har många blodkärl",
    "Lexin003639": "Rören som blodet åker i (artärer och vener)",
    "Lexin003640": "Sjukdom i blodkärlen (ofta vid diabetes)",
    "Lexin003641": "Nystan av blodkärl i njuren som renar blodet",
    "Lexin003642": "Hjärtat och alla blodkärl",
    "Lexin003644": "Vätskan i blodet (utan blodkroppar)",
    "Lexin003645": "Celler som gör att blodet levrar sig",
    "Lexin003646": "Blodplättarna",
    "Lexin003650": "Prov på blodet",
    "Lexin003651": "Att ta ett blodprov",
    "Lexin003656": "Hur mycket socker man har i blodet",
    "Lexin003657": "Nivån av glukos i blodet",
    "Lexin003658": "Siffran som visar blodsockret",
    "Lexin003660": "När blodet stannar upp (stas)",
    "Lexin003661": "Blodet som rinner",
    "Lexin003664": "Prov som visar om man har inflammation (Sänkan)",
    "Lexin003665": "Blod som kommer till en vävnad",
    "Lexin003667": "Att få blod från någon annan",
    "Lexin003668": "Trycket i blodkärlen",
    "Lexin003669": "Blodtrycket",
    "Lexin003670": "När blodtrycket plötsligt sjunker",
    "Lexin003671": "Högt blodtryck",
    "Lexin003672": "Ökning av blodtrycket",
    "Lexin003673": "Medicin mot högt blodtryck",
    "Lexin003679": "Mängden blod i kroppen (ca 5 liter)",
    "Lexin003680": "Vener (blodkärl)",
    "Lexin003681": "Transfusion av blod",
    "Lexin003697": "Blodtryck (felstavat)",
    "Lexin003700": "Utan skydd",
    "Lexin003717": "Benet längst ner i bäckenet framtill",
    "Lexin003718": "fogen mellan blygdbenen (foglossning)",
    "Lexin003730": "Blödning under huden",
    "Lexin003737": "Något som blåser luft (t.ex. lungor)",
    "Lexin003739": "Prostata",
    "Lexin003740": "Körtel hos män som sitter under urinblåsan",
    "Lexin003744": "Urinvägsinfektion i blåsan",
    "Lexin003746": "Som ser ut som en blåsa",
    "Lexin003747": "Xtra ljud när hjärtat slår (kan vara fel på klaff)",
    "Lexin003748": "Ovanligt ljud från hjärtat",
    "Lexin003750": "Utslag på huden",
    "Lexin003753": "Att kissa",
    "Lexin003763": "Iris (reglerar ljusinsläppet)",
    "Lexin003771": "Sjukdom där blodet inte levrar sig",
    "Lexin003775": "När det rinner blod",
    "Lexin003776": "Lätt att börja blöda",
    "Lexin003777": "Där blodet kommer ifrån",
    "Lexin003778": "Risk att börja blöda",
    "Lexin003785": "Vikt i förhållande till längd",
    "Lexin003868": "Rik på blodkärl",
    "Lexin003890": "Tops",
    "Lexin003935": "Sjukdom som sprids av fästingar",
    "Lexin003953": "När något slutar fungera (t.ex. känsel)",
    "Lexin003954": "Symtom på att en nervfunktion är borta (t.ex. förlamning)",
    "Lexin004045": "Del av njuren som fångar upp urinen",
    "Lexin004053": "Långsam puls",
    "Lexin004140": "Hjälporganisation för barn",
    "Lexin004143": "När det fattas något",
    "Lexin004144": "Gå sönder",
    "Lexin004172": "Sakta ner",
    "Lexin004174": "Medicin som inte botar men saktar ner sjukdomen (HIV/MS)",
    "Lexin004175": "Mediciner mot HIV",
    "Lexin004177": "Luftrören som går ner i lungorna",
    "Lexin004178": "Skadade och utvidgade luftrör",
    "Lexin004180": "Luftrörskatarr",
    "Lexin004181": "Lunginflammation som börjar i luftrören",
    "Lexin004182": "Att titta ner i luftrören med kamera",
    "Lexin004184": "Addisons sjukdom (gör huden brun)",
    "Lexin004196": "Celler i brosk",
    "Lexin004197": "Led som sitter ihop med brosk",
    "Lexin004198": "Förbindelse med brosk",
    "Lexin004200": "Brosk (mjukt ben)",
    "Lexin004201": "Vävnad som är hårdare än muskler men mjukare än ben",
    "Lexin004202": "Ytan på ändarna av benen (glatta)",
    "Lexin004294": "Tablett som löses upp i vatten",
    "Lexin004296": "Magsår som gått hål på magsäcken",
    "Lexin004317": "Del av hjärnstammen",
    "Lexin004328": "Börja plötsligt (t.ex. epidemi)",
    "Lexin004344": "När ögat inte bryter ljuset rätt (närsynt/långsynt)",
    "Lexin004346": "Löses upp",
    "Lexin004348": "När en inre kroppsdel tränger ut genom en öppning",
    "Lexin004381": "Stoppa blödning med värme",
    "Lexin004384": "Sveda",
    "Lexin004403": "Körtel bakom bröstbenet (viktig för immunförsvaret hos barn)",
    "Lexin004415": "Benet mitt på bröstkorgen",
    "Lexin004416": "Bröstbenet",
    "Lexin004418": "Operation där man tar bort tumören men sparar bröstet",
    "Lexin004419": "Varböld i bröstet (ofta vid amning)",
    "Lexin004420": "Cancer i bröstet",
    "Lexin004421": "Operation för att göra brösten större",
    "Lexin004427": "Muskler mellan revbenen",
    "Lexin004428": "Ryggkotorna som revbenen sitter i"
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
