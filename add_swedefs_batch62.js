
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch62.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin001496": "Böjen på armen (insidan)",
    "Lexin001523": "Blod med mycket syre (från hjärtat)",
    "Lexin001524": "De minsta artärerna",
    "Lexin001525": "När blodkärlen blir stela och trånga",
    "Lexin001526": "Opererad koppling mellan artär och ven (för dialys)",
    "Lexin001527": "T.ex. ett organ från ett djur till en människa",
    "Lexin001528": "Ledgångsreumatism som förstör lederna",
    "Lexin001546": "Ledinflammation",
    "Lexin001559": "Anlag som styr hur vi blir (DNA)",
    "Lexin001566": "Allt DNA i en cell",
    "Lexin001573": "När hjärtat slår i fel takt",
    "Lexin001623": "Delar av hjärnan som kopplar ihop intryck",
    "Lexin001624": "Förmåga att koppla ihop tankar",
    "Lexin001637": "Plötsligt svårt att andas vid astma",
    "Lexin001662": "Den översta kotan i nacken",
    "Lexin001672": "Böjveckseksem (vanlig allergi)",
    "Lexin001678": "Punkt i hjärtat som styr pulsen",
    "Lexin001680": "När muskler eller organ krymper",
    "Lexin001712": "Apparat som mäter hörseln",
    "Lexin001724": "Känning innan anfallet kommer",
    "Lexin001725": "När läkaren lyssnar på hjärta/lungor",
    "Lexin001733": "När kroppen attackerar sig själv",
    "Lexin001740": "Saker kroppen sköter själv (t.ex. andning/puls)",
    "Lexin001741": "Nervknutar som styr inre organ",
    "Lexin001742": "Delen av nervsystemet som inte styrs med viljan",
    "Lexin001774": "Att ta bilder på insidan av kroppen (röntgen)",
    "Lexin001776": "Tänderna längst fram",
    "Lexin001802": "Försvinna som ånga",
    "Lexin001815": "Skräp som kroppen gör sig av med",
    "Lexin001819": "Giftiga ämnen som ska ut",
    "Lexin001824": "Vätska som rinner ut",
    "Lexin001832": "Bajs",
    "Lexin001833": "Prov på bajset",
    "Lexin001840": "Skickar ut (t.ex. värme/lukt)",
    "Lexin001841": "Kommer ut från",
    "Lexin001849": "Leverns funktion att rensa blod",
    "Lexin001850": "Behandling för att sluta med droger",
    "Lexin001870": "Går ut ifrån",
    "Lexin001874": "Mycket viktig uppgift",
    "Lexin001877": "Kan botas eller fixas",
    "Lexin001908": "Göra kortare",
    "Lexin001947": "Att ta bort något",
    "Lexin001949": "Tas bort (opereras bort)",
    "Lexin001950": "Att ge ifrån sig syre",
    "Lexin001961": "Att bli mycket mager",
    "Lexin002004": "Skiljs åt",
    "Lexin002024": "Övningar för att slappna av",
    "Lexin002033": "Att det blir smalare",
    "Lexin002038": "Visar sig som (smärta)",
    "Lexin002051": "Låta bli",
    "Lexin002060": "När kroppen inte vill ha det nya organet",
    "Lexin002061": "Immunförsvaret attackerar det nya organet",
    "Lexin002073": "Producerar vätska (t.ex. hormoner/svett)",
    "Lexin002075": "Att det minskar",
    "Lexin002096": "Minskar i styrka",
    "Lexin002147": "Axeln",
    "Lexin002152": "Nervtråd",
    "Lexin002153": "Många nervtrådar ihop",
    "Lexin002154": "Den långa delen av nervcellen",
    "Lexin002158": "Gulsot som sprids via blod/sex",
    "Lexin002161": "Vitamin viktigt för nerverna (tiamin)",
    "Lexin002162": "Vitamin viktigt för blodet (finns i kött)",
    "Lexin002234": "Bågarna längst bak i munnen",
    "Lexin002235": "Delar av ryggmärgen som tar emot känsel",
    "Lexin002237": "Rummet bakom regnbågshinnan",
    "Lexin002238": "Där bak och uppe",
    "Lexin002247": "Som dödar bakterier",
    "Lexin002249": "Som stoppar bakterier att växa",
    "Lexin002251": "Hjärnhinneinflammation orsakad av bakterier (farlig)",
    "Lexin002253": "Prov där man låter bakterier växa för att se vilken sort det är",
    "Lexin002255": "Små organismer som kan göra en sjuk",
    "Lexin002256": "Bakterierna",
    "Lexin002257": "Läkare som kan allt om bakterier",
    "Lexin002258": "Svar på vilket bakterie det är",
    "Lexin002260": "Där bak",
    "Lexin002267": "Att kunna stå stadigt",
    "Lexin002270": "Nerven som skickar balanssignaler till hjärnan",
    "Lexin002271": "Organet i örat som styr balansen",
    "Lexin002272": "Yrsel",
    "Lexin002275": "Celler som känner av hur huvudet lutar",
    "Lexin002276": "Sinnet som gör att vi inte ramlar",
    "Lexin002277": "Tecken på fel på balansen (yrsel)",
    "Lexin002296": "Att vidga kärl i hjärtat med en liten ballong",
    "Lexin002306": "Väg för nervsignaler",
    "Lexin002325": "Långa maskar i tarmen (Binnikemask)",
    "Lexin002385": "Att föda barn",
    "Lexin002398": "Tiden när man är barn",
    "Lexin002399": "Vad som är bra för barnet",
    "Lexin002404": "BVC",
    "Lexin002412": "MVC",
    "Lexin002418": "Se det ur barnets synvinkel",
    "Lexin002423": "Sjukdomar nästan alla barn får (vattkoppor m.m.)",
    "Lexin002429": "Infektion i livmodern efter förlossning",
    "Lexin002454": "Snäll hudcancer (sprider sig sällan)",
    "Lexin002505": "Att handskas med sin ledsnad",
    "Lexin002507": "Hantering",
    "Lexin002579": "Bli fri från",
    "Lexin002582": "Släpps fri",
    "Lexin002585": "Ägg som mött en spermie",
    "Lexin002586": "Ägget när det börjar dela sig"
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
