
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch77.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin018554": "I näsan",
    "Lexin018613": "Medicin från naturen (inte receptbelagd)",
    "Lexin018630": "Förbindelsen mellan mamman och fostret",
    "Lexin018663": "Muskler i benen och fötterna",
    "Lexin018664": "Pylorus (där maten lämnar magen)",
    "Lexin018689": "Njursjukdom",
    "Lexin018712": "Neuron (cell i hjärnan/nerverna)",
    "Lexin018713": "Snabba signaler i nerverna",
    "Lexin018716": "Hjärnan, ryggmärgen och alla nerver",
    "Lexin018717": "Celler som bygger upp hjärnan och nerver",
    "Lexin018722": "När nerver inte fungerar (t.ex. förlamning)",
    "Lexin018723": "Test av reflexer, känsel och balans",
    "Lexin018725": "Diagnoser som ADHD och autism",
    "Lexin018742": "Eksem av metall (smycken, knappar)",
    "Lexin018765": "Organen som renar blodet och bildar urin",
    "Lexin018767": "Yttre delen av njuren",
    "Lexin018768": "Där urinen samlas innan den går till urinledaren",
    "Lexin018770": "Små rör inuti njuren",
    "Lexin018772": "Svår smärta när en sten fastnar i ledaren",
    "Lexin018773": "När njurarna inte renar blodet",
    "Lexin018774": "När ämnen börjar läcka ut i urinen",
    "Lexin018819": "Bakterier som ska finnas i tarmen/huden",
    "Lexin018911": "Benet mellan axeln och halsen",
    "Lexin018918": "De första 28 dagarna av livet",
    "Lexin019018": "Mat och dryck",
    "Lexin019051": "Blod ur näsan",
    "Lexin019054": "Medicin man droppar i näsan",
    "Lexin019056": "Hålrummet bakom näsan",
    "Lexin019058": "Väggen mellan näsborrarna",
    "Lexin019060": "Medicin man sprutar i näsan",
    "Lexin019067": "Täppt i näsan",
    "Lexin019076": "När hinnan lossnar (synfel/gardin i synfältet)",
    "Lexin019204": "Tecken på sjukdom som läkaren ser",
    "Lexin019229": "Förlossningsvård",
    "Lexin019336": "När man vill ha barn men inte kan",
    "Lexin019354": "Att inte känna igen saker/personer",
    "Lexin019355": "Att inte kunna göra rörelser man vill",
    "Lexin019413": "Något som inte är slätt",
    "Lexin019472": "Toppen på penis",
    "Lexin019496": "Känsla av att inte må bra",
    "Lexin019505": "Skada som händer plötsligt",
    "Lexin019684": "Nyttiga fetter (flytande)",
    "Lexin019685": "Fett från växter och fisk",
    "Lexin019704": "Mens vid fel tid eller för mycket",
    "Lexin019707": "Artralgi",
    "Lexin019730": "Operation",
    "Lexin019734": "Ta bort med operation",
    "Lexin019764": "Medicin man dricker i droppar",
    "Lexin019786": "Svårt att hitta ord",
    "Lexin019824": "Slarv med mat och sömn",
    "Lexin019825": "När mensen inte kommer som den ska",
    "Lexin019826": "Arytmi",
    "Lexin019832": "Del av kroppen med speciell uppgift",
    "Lexin019869": "Ingen energi",
    "Lexin019885": "Varför det hände",
    "Lexin019894": "Skor anpassade för fötterna",
    "Lexin019895": "Stöd för leder (t.ex. knäskydd)",
    "Lexin019897": "Skena som stöttar",
    "Lexin019939": "Sex utan kondom",
    "Lexin020019": "Mycket svår smärta (smärtskattning 10)",
    "Lexin020027": "Öppning in till innerörat",
    "Lexin020062": "Parasitsjukdom från katter/kött (farlig för gravida)",
    "Lexin020083": "Batteri som styr hjärtat",
    "Lexin020098": "Svar på vävnadsprov (om det är cancer)",
    "Lexin020128": "När läkaren känner med händerna",
    "Lexin020136": "Sjukdom som sprids i hela världen",
    "Lexin020146": "Återkommande panikattacker",
    "Lexin020153": "Benet i pannan",
    "Lexin020156": "Främre delen av hjärnan (personlighet)",
    "Lexin020236": "Skakningar och stelhet",
    "Lexin020299": "Att få färdiga antikroppar (snabb effekt)",
    "Lexin020300": "Andas in andras rök",
    "Lexin020325": "Där man kan klaga på vården",
    "Lexin020327": "Vad det kostar att gå till läkaren",
    "Lexin020329": "Läkarens anteckningar om dig",
    "Lexin020350": "BUP",
    "Lexin020432": "Stryka på",
    "Lexin020460": "Påsdialys (via magen)",
    "Lexin020462": "När läkaren knackar på kroppen",
    "Lexin020477": "Blodbrist pga B12-brist",
    "Lexin020478": "Svälja",
    "Lexin020520": "Att man blir annorlunda (t.ex. vid demens)",
    "Lexin020521": "Psykisk diagnos (t.ex. Borderline)",
    "Lexin020542": "Avancerad röntgen för cancer",
    "Lexin020546": "Kort frånvaroattack (epilepsi)",
    "Lexin020551": "Surhetsgrad",
    "Lexin020571": "Färg",
    "Lexin020572": "Hopfärgad",
    "Lexin020614": "Ljud vid astma",
    "Lexin020617": "Tung andning",
    "Lexin020626": "Känsla som sockerdricka",
    "Lexin020629": "Mask i magen",
    "Lexin020650": "Placering (boende)",
    "Lexin020723": "Blodplättar (trombocyter)",
    "Lexin020801": "När en bebis dör utan förklaring",
    "Lexin020805": "Bakterie som ger lunginflammation/öroninflammation",
    "Lexin020807": "Sjukdom orsakad av pneumokocker",
    "Lexin020839": "Barnförlamning (utrotad i Sverige)",
    "Lexin020879": "Frömjöl (ger allergi)",
    "Lexin020880": "Pollen från blommor/träd"
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
