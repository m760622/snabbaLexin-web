
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch19.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin016991": "Betalning för utfört arbete",
    "Lexin017001": "Kostnad för personalens löner inkl. avgifter",
    "Lexin017005": "Dokumentation för att beräkna lönen",
    "Lexin017013": "Som ger ekonomisk vinst",
    "Lexin017044": "Förmåga att lösas upp i vätska",
    "Lexin017047": "Sätt att lösa ett problem eller en blandning",
    "Lexin017118": "Krossad sten utan nollfraktion (används under grund)",
    "Lexin017204": "Brutet tak (tak med två lutningar)",
    "Lexin017250": "Tillstånd att ändra marknivån (schakta/fylla)",
    "Lexin017253": "Avdelning som sköter marknadsföring och försäljning",
    "Lexin017264": "Ritning som visar hur marken ska utformas",
    "Lexin017265": "Skiva av cellplast för markisolering",
    "Lexin017267": "Arbeten med mark och grundläggning",
    "Lexin017270": "Hård och dyrbar natursten",
    "Lexin017301": "Skydd av ytor som inte ska målas",
    "Lexin017309": "Plan för vilka maskiner som behövs",
    "Lexin017318": "Märke på hård träfiberskiva",
    "Lexin017331": "Som består av samma material rakt igenom",
    "Lexin017332": "Väggar som inte är ihåliga",
    "Lexin017361": "Det översta lagret jord där växter trivs",
    "Lexin017392": "Fiberskiva av medelhård densitet",
    "Lexin017408": "Person som arbetar på företaget",
    "Lexin017616": "Kostnad utöver det planerade",
    "Lexin017702": "Person ansvarig för miljöfrågor",
    "Lexin017703": "Delar av verksamheten som påverkar miljön",
    "Lexin017704": "Grupp som arbetar med miljöfrågor",
    "Lexin017710": "Något som hotar miljön",
    "Lexin017712": "Spridning av gifter i naturen",
    "Lexin017716": "Krav på att skona miljön",
    "Lexin017718": "Lagar som skyddar miljön",
    "Lexin017722": "Plan för miljöarbetet i projektet",
    "Lexin017723": "Företagets regler för miljöarbete",
    "Lexin017724": "Hur miljön påverkas",
    "Lexin017726": "Positiva effekter för miljön",
    "Lexin017727": "Värden i naturen som ska skyddas",
    "Lexin017750": "Isolering av smält sten eller glas",
    "Lexin017848": "Tro att något är fel",
    "Lexin017926": "Göra något modernare (upprusta)",
    "Lexin017985": "Band där man sätter ihop produkter",
    "Lexin017987": "Person som monterar",
    "Lexin018017": "Kort möte på morgonen för planering",
    "Lexin018031": "Små plattor av keramik eller glas",
    "Lexin018064": "Maskin som ger kraft",
    "Lexin018073": "Stor väg för snabb trafik",
    "Lexin018190": "Vägg byggd av sten eller tegel",
    "Lexin018193": "Hantverkare som murar",
    "Lexin018194": "Block av betong eller lättklinker för murning",
    "Lexin018196": "Blandning av sand, bindemedel och vatten",
    "Lexin018197": "Hink för murbruk",
    "Lexin018201": "Verktyg för att lägga på murbruk",
    "Lexin018202": "Sten av tegel för murning",
    "Lexin018204": "Det som är murat",
    "Lexin018243": "Lagar mot korruption",
    "Lexin018307": "Det man vill uppnå",
    "Lexin018313": "Hantverkare som målar",
    "Lexin018348": "Variation av människor eller arter",
    "Lexin018370": "Hur exakt måttet stämmer",
    "Lexin018372": "Verktyg för att mäta längd (tumstock)",
    "Lexin018384": "Beräkning av mängden material",
    "Lexin018407": "Den last en maskin är byggd för",
    "Lexin018410": "U-formad spik för att fästa tråd",
    "Lexin018424": "Ta reda på storlek eller mängd",
    "Lexin018427": "Skåp för elmätare",
    "Lexin018432": "Ingenjör som mäter in utsättning",
    "Lexin018455": "Svampväxt som skadar hus",
    "Lexin018457": "Skada orsakad av mögel",
    "Lexin018520": "Bind ihop armering med ståltråd",
    "Lexin018521": "Mjuk ståltråd för najning",
    "Lexin018620": "Sten tagen direkt från naturen (granit, marmor)",
    "Lexin018632": "Hitta rätt väg",
    "Lexin018636": "System för att beskriva färger",
    "Lexin018758": "Verktyg för att nita",
    "Lexin018763": "Höjd eller plan",
    "Lexin018822": "När man gör något till standard",
    "Lexin018829": "Det som är normalt att prestera",
    "Lexin018872": "Kort spik med stort huvud",
    "Lexin018904": "Helt nytt hus",
    "Lexin018905": "Karta som underlag för bygglov",
    "Lexin018912": "Den viktigaste datan",
    "Lexin018914": "Viktiga siffror för att mäta framgång (KPI)",
    "Lexin019096": "Situation som kräver snabba åtgärder",
    "Lexin019155": "Tomt där inget hus är byggt",
    "Lexin019313": "Erbjudande att köpa ett företag",
    "Lexin019318": "Analys av inkomna anbud",
    "Lexin019465": "Färg baserad på olja (ofta linolja)",
    "Lexin019466": "Hård boardskiva impregnerad med olja",
    "Lexin019498": "Händelse som leder till skada",
    "Lexin019620": "Regler för hur ett område får bebyggas",
    "Lexin019621": "Plan över ett större område",
    "Lexin019722": "Som inte passar in",
    "Lexin019728": "Den dagliga verksamheten",
    "Lexin019751": "Samarbete mellan stat/kommun och företag",
    "Lexin019863": "Som är fel",
    "Lexin020078": "Kvalitetsmärkning från SP (RISE)",
    "Lexin020095": "Material som tätar mellan två ytor",
    "Lexin020139": "Brädor som täcker vägg (inomhus eller utomhus)",
    "Lexin020152": "Stor tank för uppvärmning av vatten",
    "Lexin020163": "Bevis på att fastigheten är pantsatt",
    "Lexin020189": "Kort spik med stort huvud för takpapp",
    "Lexin020208": "Tak där inner- och yttertak är parallella (luftat)"
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
