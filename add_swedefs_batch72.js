
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch72.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin011609": "Skallen (benet som skyddar hjärnan)",
    "Lexin011610": "Alla ben i skallen",
    "Lexin011611": "Hjärnstammen (kopplar hjärnan till ryggmärgen)",
    "Lexin011612": "Delen under storhjärnan",
    "Lexin011614": "Cancer eller cysta i hjärnan",
    "Lexin011616": "Hålrum i hjärnan med vätska",
    "Lexin011617": "Veck på hjärnans yta",
    "Lexin011618": "Ultraljudsundersökning av hjärta",
    "Lexin011619": "Sjukdom i hjärta eller kärl",
    "Lexin011620": "Samlingsnamn för hjärtproblem och stroke",
    "Lexin011621": "HLR (trycka på bröstet och blåsa)",
    "Lexin011625": "När hjärtat slår oregelbundet",
    "Lexin011626": "Muskeln som pumpar blod",
    "Lexin011628": "Övre delen av hjärtat",
    "Lexin011629": "Ett hjärtslag (fyllnad och pumpning)",
    "Lexin011631": "Medfött fel på hjärtat",
    "Lexin011634": "Puls",
    "Lexin011638": "Undersökning med slang in i hjärtat (via ljumsken)",
    "Lexin011641": "Ljudet av klaffarna (dunk-dunk)",
    "Lexin011643": "Muskeln i hjärtväggen",
    "Lexin011644": "Myokardiet",
    "Lexin011645": "Förmaksflimmer eller andra rytmfel",
    "Lexin011646": "Takten hjärtat slår i",
    "Lexin011647": "När hjärtat drar ihop sig (systole)",
    "Lexin011648": "Väggen mellan höger och vänster hjärthalva",
    "Lexin011650": "Ett slag",
    "Lexin011651": "Hjärtats spets (pekar åt vänster)",
    "Lexin011653": "När hjärtat inte orkar pumpa tillräckligt",
    "Lexin011654": "Säcken runt hjärtat",
    "Lexin011655": "Perikardiet",
    "Lexin011656": "Ljuden läkaren lyssnar på",
    "Lexin011657": "Hjärtats arbete",
    "Lexin011660": "Toppen på huvudet",
    "Lexin011661": "Ben på toppen av skallen",
    "Lexin011663": "Parietalbenet",
    "Lexin011664": "Del av hjärnan vid hjässan (känsel)",
    "Lexin011692": "Sitter ihop",
    "Lexin011705": "Signalämne som sprids i blodet",
    "Lexin011706": "Medicin med hormoner (t.ex. vid klimakteriet)",
    "Lexin011707": "Behandling mot cancer med hormoner",
    "Lexin011708": "Problem med hormonbalansen",
    "Lexin011709": "Alla organ som gör hormoner",
    "Lexin011710": "Sjukdomar som diabetes eller struma",
    "Lexin011711": "Signalämnen",
    "Lexin011713": "För mycket eller för lite hormon",
    "Lexin011717": "Genomskinliga delen av ögat",
    "Lexin011718": "Yttersta lagret av huden",
    "Lexin011719": "Döda hudceller",
    "Lexin011720": "Proteintrådar i huden",
    "Lexin011721": "När hudens celler fylls med keratin",
    "Lexin011726": "Att hosta (retning i halsen)",
    "Lexin011727": "Förkylningssymtom",
    "Lexin011728": "Plötslig hosta som inte slutar",
    "Lexin011730": "Anfall av hosta",
    "Lexin011731": "Medicin mot hosta (t.ex. Nipaxon)",
    "Lexin011751": "Lagen om vård",
    "Lexin011755": "Prick eller sår på huden",
    "Lexin011756": "Svettkörtlar och talgkörtlar",
    "Lexin011757": "Löss och skabb",
    "Lexin011758": "Röd hud (inflammation)",
    "Lexin011759": "Dermatos",
    "Lexin011760": "Knöl på huden",
    "Lexin011761": "Eksem eller prickar",
    "Lexin011762": "Utslag",
    "Lexin011763": "Där huden viker sig (t.ex. armhålan)",
    "Lexin011766": "Plötslig smärta",
    "Lexin011767": "Håll",
    "Lexin011785": "Virus som ger vårtor och cellförändringar",
    "Lexin011792": "När man blir glad och ledsen fort",
    "Lexin011819": "Husläkare",
    "Lexin011823": "Damm",
    "Lexin011841": "Vanlig mat",
    "Lexin011860": "Kroppsdelen med hjärnan och ansiktet",
    "Lexin011863": "Stora luftrören som går in i lungorna",
    "Lexin011867": "Skallen och hjärnan",
    "Lexin011869": "Muskler för att tugga och göra miner",
    "Lexin011878": "Löss i håret",
    "Lexin011883": "Viktigaste uppgiften",
    "Lexin011889": "Ont i huvudet",
    "Lexin011890": "Överdelen (på sängen)",
    "Lexin011897": "Brosk i lederna",
    "Lexin011913": "Renlighet",
    "Lexin011923": "Ljudkänslighet",
    "Lexin011924": "Högt blodsocker",
    "Lexin011926": "Njurtumör",
    "Lexin011930": "Att andas för fort (vid panik)",
    "Lexin011934": "Hormon från hypofysen (styr andra körtlar)",
    "Lexin011935": "Lågt blodsocker (insulinkänning)",
    "Lexin011940": "Allergivaccination (sprutor)",
    "Lexin011945": "Del av hjärnan som styr hunger/törst/hormoner",
    "Lexin011947": "Sjukdom med låg ämnesomsättning (trött, frusen)",
    "Lexin011948": "Svullen hud vid hypotyreos",
    "Lexin011949": "För långsam andning",
    "Lexin011985": "Gammaldags ord för panik/konverteringssyndrom",
    "Lexin011994": "Skrapar bort",
    "Lexin012002": "Hål (karies)",
    "Lexin012007": "Skydda mot",
    "Lexin012039": "Hur starkt något är",
    "Lexin012044": "Stygn i sidan",
    "Lexin012048": "Hålrum"
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
