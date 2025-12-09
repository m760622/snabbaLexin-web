
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch1.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin000133": "Som har aktuell kunskap; informerad",
    "Lexin000723": "Riklig; som förekommer i stor mängd (ofta om beröm)",
    "Lexin000739": "Uppbyggande (om ämnesomsättning)",
    "Lexin002910": "Avsiktlig; planerad (ofta om något negativt)",
    "Lexin003277": "Värt något; av betydelse (oftast i nekande satser)",
    "Lexin003348": "Som innehåller en bild; metaforisk",
    "Lexin003592": "Hindrad från att fungera eller röra sig",
    "Lexin003614": "Som lider av blodbrist; blek",
    "Lexin004372": "Lätt saltad (om vatten)",
    "Lexin004553": "Mycket blyg",
    "Lexin005684": "Förbannad; förstärkande kraftuttryck",
    "Lexin005689": "Förbannad; kraftuttryck",
    "Lexin006741": "Överens; eniga",
    "Lexin009014": "Mycket arg; fördömd",
    "Lexin009019": "Förbannad; kraftuttryck (mildare form)",
    "Lexin009274": "Förhäxad; förtrollad",
    "Lexin009627": "Som har det bra ordnat för sig",
    "Lexin009833": "Bestämd på förhand (om åsikt)",
    "Lexin011170": "Rådlös; som inte vet vad man ska göra",
    "Lexin012764": "Informerad och samtyckande",
    "Lexin012863": "Konserverad i lag (om mat)",
    "Lexin013869": "Som rör katalys (kemisk reaktion)",
    "Lexin016256": "Betalningsförmögen; som har kontanter",
    "Lexin016647": "Stängda (om dörrar)",
    "Lexin017014": "Värt mödan",
    "Lexin017378": "Färglös; utan glans",
    "Lexin017443": "Sliten; illa behandlad",
    "Lexin018484": "Som har en mörk blå färg",
    "Lexin018611": "Som följer naturens ordning; normal",
    "Lexin018797": "Utan förväntningar; neutral",
    "Lexin019045": "Som befinner sig på platsen",
    "Lexin019358": "Utan att ha uträttat sitt ärende",
    "Lexin019427": "Inte krönt (ofta bildligt om mästare)",
    "Lexin019706": "Brist; dålig tillgång",
    "Lexin019912": "Något man inte talar om; underförstått",
    "Lexin019960": "Osäker; inte avgjord",
    "Lexin019968": "Som man inte har gjort upp om (ofta om konflikt)",
    "Lexin020070": "Ganska bra; inte så dålig",
    "Lexin020613": "Som ger ifrån sig ett högt, vasst ljud",
    "Lexin020642": "Gnällig; överkänslig",
    "Lexin021671": "Ökning av lön eller pris",
    "Lexin021775": "Ren; fullständig (ofta om något negativt)",
    "Lexin021933": "Kontanta (om pengar)",
    "Lexin023506": "Som visar sig vara sann (om förutsägelse)",
    "Lexin024151": "Utan skada eller förlust",
    "Lexin024989": "Listig; smart",
    "Lexin025839": "Helt säker; bestämd",
    "Lexin026242": "Byråkratisk; oflexibel",
    "Lexin026578": "Snabb; som går bra (om försäljning)",
    "Lexin026815": "Ordentlig; skötsam"
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
