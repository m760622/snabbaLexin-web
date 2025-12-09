
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch76.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin016584": "Propp i lungan",
    "Lexin016587": "Sjukdomar som astma och KOL",
    "Lexin016592": "Vätska i lungorna",
    "Lexin016621": "Hormon som styr ägglossning",
    "Lexin016675": "Viktig del av immunförsvaret",
    "Lexin016676": "Körtlar som svullnar vid infektion",
    "Lexin016679": "Svullnad pga stopp i lymfsystemet",
    "Lexin016742": "När man ser dåligt på nära håll",
    "Lexin016760": "Kroppens största ben",
    "Lexin016782": "När vätska rinner ut (t.ex. urin/blod)",
    "Lexin016786": "Hudens mellersta lager",
    "Lexin016832": "Vad läkaren bestämt att patienten ska ha",
    "Lexin016843": "Medicin",
    "Lexin016845": "Överkänslighet mot medicin (t.ex. penicillin)",
    "Lexin016846": "Att ta medicin mot sjukdom",
    "Lexin016848": "Hur mycket medicin man ska ta",
    "Lexin016850": "Försäkring vid skador av medicin",
    "Lexin016851": "Lista över mediciner",
    "Lexin016856": "Myndighet som kontrollerar läkemedel",
    "Lexin016859": "Blir bra (om sår/benbrott)",
    "Lexin016875": "Kotorna i svanken (L1-L5)",
    "Lexin016884": "När barnet växer på längden",
    "Lexin017051": "Pediculus (i håret eller på kroppen)",
    "Lexin017057": "Träd som tappar löven (t.ex. björk - allergi)",
    "Lexin017069": "Magen och tarmarna",
    "Lexin017082": "Gastrit (ont i magen)",
    "Lexin017087": "MR (undersökning med magnetkamera)",
    "Lexin017089": "MR-undersökning",
    "Lexin017090": "MR (magnetröntgen - fast man använder inte röntgenstrålar)",
    "Lexin017097": "Bakterien som ger magsår",
    "Lexin017100": "Organet där maten blandas med syra",
    "Lexin017131": "Stora parasiter (t.ex. mask)",
    "Lexin017146": "Sjukdom som sprids av myggor (i tropikerna)",
    "Lexin017162": "Röntgen av brösten",
    "Lexin017163": "Undersökning för bröstcancer",
    "Lexin017196": "Det viktigaste manliga könshormonet",
    "Lexin017303": "Litet bihang på tjocktarmen (blindtarmen)",
    "Lexin017339": "Celler som ger allergiska reaktioner",
    "Lexin017373": "När kroppen tar hand om maten",
    "Lexin017374": "Röret maten åker ner i",
    "Lexin017445": "Fel man har när man föds",
    "Lexin017473": "Bedömning av ålder (t.ex. på röntegn)",
    "Lexin017474": "Symboler inom vården",
    "Lexin017507": "Att vara vaken och förstå (RLS-skala)",
    "Lexin017508": "Hur vaken patienten är (vaken/medvetslös)",
    "Lexin017532": "Färgämne i huden (skyddar mot sol)",
    "Lexin017537": "Blödning vid ägglossning eller annat",
    "Lexin017540": "Delen mellan vrist och tår",
    "Lexin017544": "Delen mellan handled och fingrar",
    "Lexin017547": "Stötdämpare mellan ryggkotorna",
    "Lexin017558": "Där hammaren, städet och stigbygeln finns",
    "Lexin017597": "Tiden mellan mens",
    "Lexin017598": "När mensen är oregelbunden eller konstig",
    "Lexin017633": "Ämnesomsättning (kroppens kemi)",
    "Lexin017643": "Biverkning av medicin eller sjukdom",
    "Lexin017672": "Bakterier, virus, svamp",
    "Lexin017701": "Nämnd som kontrollerar mat och miljö",
    "Lexin017749": "Ämnen kroppen behöver (t.ex. järn, kalk)",
    "Lexin017776": "Svårt att få barn",
    "Lexin017789": "Hur mycket blod hjärtat pumpar på en minut",
    "Lexin017808": "Slem som är gult/grönt/blodigt",
    "Lexin017868": "Koprovtagning (kissa lite först, sen i burken)",
    "Lexin017874": "Hinnan närmast hjärnan (pia mater)",
    "Lexin017881": "Flagor från hårbotten",
    "Lexin017884": "Organ som renar blodet (sitter till vänster)",
    "Lexin017885": "Lien",
    "Lexin017889": "Bildas i muskler vid hård träning",
    "Lexin017893": "Barnets första tänder",
    "Lexin017922": "Ger näring till fostret",
    "Lexin017954": "Svag men ihållande smärta (t.ex. mensvärk)",
    "Lexin017972": "En typ av vita blodkroppar",
    "Lexin018006": "Inflammatorisk tarmsjukdom (hela tarmen)",
    "Lexin018056": "Fysisk aktivitet",
    "Lexin018069": "Nerv som styr muskler",
    "Lexin018087": "Hur bra man tål sjukdomar",
    "Lexin018152": "MS (nervsjukdom)",
    "Lexin018153": "Sjukdom som skadar nerverna",
    "Lexin018206": "Ont i armbågen av datorarbete",
    "Lexin018217": "När en muskel går sönder",
    "Lexin018218": "Myocyt",
    "Lexin018219": "En enda muskeltråd",
    "Lexin018220": "Många muskelceller ihop",
    "Lexin018221": "När muskler blir mindre (av stillasittande)",
    "Lexin018224": "Stel i musklerna",
    "Lexin018226": "Muskulatur",
    "Lexin018239": "Förändringar i DNA",
    "Lexin018241": "Ändras genetiskt",
    "Lexin018254": "Insekt som suger blod",
    "Lexin018271": "Tar slut i (om kärl/gångar)",
    "Lexin018276": "Ofarlig knuta i livmodern",
    "Lexin018293": "Allvarlig form av hypotyreos",
    "Lexin018369": "Lagom, inte mycket",
    "Lexin018436": "Fett som är hårt i kylen (t.ex. smör)",
    "Lexin018449": "MVC (kontroller för gravida)",
    "Lexin018453": "Där man kollar gravida",
    "Lexin018456": "Svamp som växer på mat/hus",
    "Lexin018508": "Hjärnloben längst bak (syn)",
    "Lexin018510": "Kan inte böja nacken (tecken på hjärnhinneinflammation)",
    "Lexin018514": "Huden under nageln",
    "Lexin018541": "Behandlar muskler och leder"
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
