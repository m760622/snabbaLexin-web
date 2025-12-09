
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch26.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin033093": "Viljan att ha sex",
    "Lexin033094": "Att tafsa eller beter sig sexuellt kränkande",
    "Lexin033095": "Gammaldags ord för avvikande sexualitet",
    "Lexin033096": "Tankar på sex som inte går att stoppa",
    "Lexin033097": "Känslan av att vilja ha sex (kåthet)",
    "Lexin033098": "Hur man gör när man har sex",
    "Lexin033099": "Oönskade sexuella kommentarer eller handlingar",
    "Lexin033100": "Som inte följer normen för sex",
    "Lexin033101": "Mönster i hur man beter sig sexuellt",
    "Lexin033102": "Tillstånd när vagina krampar vid sex (vaginism)",
    "Lexin033103": "Brott där man antastar någon sexuellt",
    "Lexin033104": "Att tvinga någon till något sexuellt",
    "Lexin033105": "Att ha sex med någon (juridisk term)",
    "Lexin033106": "Brott där vuxen utnyttjar barn sexuellt",
    "Lexin033107": "Utnyttjande av någon som är beroende (t.ex. elev/patient)",
    "Lexin033108": "Infektion som sprids via sex (STI)",
    "Lexin033109": "Sjukdom som smittar vid sex (könssjukdom)",
    "Lexin033110": "Infektioner som smittar sexuellt",
    "Lexin033111": "Att göra något sexellt mot någon utan samtycke",
    "Lexin033112": "Sexuella handlingar med barn",
    "Lexin033113": "Biblisk stad (används om analsex)",
    "Lexin033114": "Förkortning för transperson eller transsexuell",
    "Lexin033115": "Personer som inte följer könsnormer",
    "Lexin033116": "Person som känner sig som motsatt kön",
    "Lexin032760": "Att ta ett barn som sitt eget",
    "Lexin032766": "Att vara okänd eller namnlös",
    "Lexin032769": "Dragningskraft till någon",
    "Lexin032771": "Att göra så att något inte längre är ett brott",
    "Lexin032772": "Sättet man möter och behandlar andra på",
    "Lexin032773": "Att vara gift med två samtidigt",
    "Lexin032777": "Medicin som hindrar virus att föröka sig (HIV)",
    "Lexin032779": "Att leva utan sex och giftermål",
    "Lexin032783": "Svårt val mellan två alternativ",
    "Lexin032785": "Lagar som förbjuder diskriminering",
    "Lexin032786": "Myndighet som arbetar mot diskriminering (DO)",
    "Lexin032787": "Förkortning av Diskrimineringsombudsmannen",
    "Lexin032788": "Den som bestämmer eller styr",
    "Lexin032791": "Straff där man avrättas",
    "Lexin032795": "Stark överdriven rädsla",
    "Lexin032797": "Förutfattade meningar om en grupp",
    "Lexin032798": "Att starkt ogilla och kritisera",
    "Lexin032799": "Stark kritik",
    "Lexin032800": "Att jaga och plåga en grupp människor",
    "Lexin032801": "Att kränka någons värdighet",
    "Lexin032802": "Behandling som kränker mänskliga rättigheter",
    "Lexin032803": "Att vara elak eller oartig mot någon",
    "Lexin032804": "Extra starkt skydd av personuppgifter",
    "Lexin032805": "När en grupp trycker ner en annan",
    "Lexin032810": "Att se saker utifrån kön och makt",
    "Lexin032815": "Samlingsnamn för icke-heterosexuella och transpersoner",
    "Lexin032817": "Emotionellt dragen till motsatta könet",
    "Lexin032821": "Smitta av HIV-viruset",
    "Lexin032822": "Inte smittad av HIV",
    "Lexin032823": "Smittad av HIV",
    "Lexin032824": "Mest homosexuell men ibland öppen för annat",
    "Lexin032827": "Person som dras till samma kön",
    "Lexin032830": "Att ställa frågor eller tvivla på",
    "Lexin032831": "Sex inom familjen (t.ex. syskon)",
    "Lexin032832": "Befruktning på konstgjord väg",
    "Lexin032833": "Att föra in sperma för befruktning",
    "Lexin032837": "Att födas med oklar könstillhörighet",
    "Lexin032838": "Närhet och förtrolighet",
    "Lexin032839": "Att inte tåla avvikelser",
    "Lexin032840": "Som inte accepterar olikheter",
    "Lexin032841": "Regler vi följer av gammal vana",
    "Lexin032844": "Att tänka på jämställdhet i alla beslut",
    "Lexin032845": "Operation som tar bort fortplantningsförmågan",
    "Lexin032846": "Straff genom att slå (aga)",
    "Lexin032847": "Skillnader mellan kulturer",
    "Lexin032848": "Tycka illa om eller känna obehag",
    "Lexin032850": "Vilket kön man känner sig som",
    "Lexin032851": "Operation för att byta kön",
    "Lexin032852": "Normer om hur män och kvinnor ska vara",
    "Lexin032854": "Att inte följa normen för sitt kön (trans)",
    "Lexin032855": "Vem man är",
    "Lexin032856": "Kärlek mellan kvinnor",
    "Lexin032857": "Att alla har samma rätt",
    "Lexin032861": "Samhälle styrt av kvinnor",
    "Lexin032862": "Gammalt ord för psykisk störning",
    "Lexin032863": "Sjukdom i själen (psykisk ohälsa)",
    "Lexin032867": "Att bara ha en partner",
    "Lexin032872": "Att ifrågasätta det som anses normalt",
    "Lexin032874": "Som strider mot moralen",
    "Lexin032875": "Grym behandling",
    "Lexin032877": "Göra så att någon inte syns eller hörs",
    "Lexin032881": "Styrt av män",
    "Lexin032882": "Samhällssystem där män har makten",
    "Lexin032889": "Juridisk form för samkönade par (före äktenskap)",
    "Lexin032891": "Förhållande till någon",
    "Lexin032893": "Riksförbundet för sexuellt likaberättigande",
    "Lexin032894": "Att dras till samma kön",
    "Lexin032895": "Sex mellan personer av samma kön",
    "Lexin032896": "Giftermål mellan två av samma kön",
    "Lexin032897": "Kön eller samlag",
    "Lexin032899": "Lust att ha sex",
    "Lexin032900": "Läran om sex",
    "Lexin032901": "Person man har sex med",
    "Lexin032902": "En persons sexuella läggning och drift",
    "Lexin032903": "Forskning om hur folk har sex",
    "Lexin032905": "Hur man praktiskt utövar sex"
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
