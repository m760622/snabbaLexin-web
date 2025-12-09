
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch65.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin004431": "Thymus och bröstkörtlar",
    "Lexin004433": "Operation för att bygga upp ett nytt bröst",
    "Lexin004465": "Tarmar och organ i magen",
    "Lexin004466": "Magen känns hård (vid undersökning)",
    "Lexin004468": "Hinnan som täcker organen i magen",
    "Lexin004469": "Inflammation i bukhinnan (akut farligt)",
    "Lexin004470": "Hålrummet där mage och tarmar ligger",
    "Lexin004471": "Organen i magen",
    "Lexin004474": "Magrutorna",
    "Lexin004475": "Vätska från bukspottkörteln som smälter maten",
    "Lexin004479": "Celler som tillverkar insulin",
    "Lexin004482": "Stå ut (som en bula)",
    "Lexin004483": "Gå inåt",
    "Lexin004484": "Gå utåt",
    "Lexin004488": "Muskler och hud runt magen",
    "Lexin004494": "Hetsätning (ätstörning)",
    "Lexin004497": "Fiber som gör att magen fungerar bättre",
    "Lexin004607": "Fett som behövs för att bygga celler",
    "Lexin004636": "Hjärtoperation där man leder om blodet",
    "Lexin004663": "Delar av innerörat som styr balansen",
    "Lexin004668": "Kroppen (utan huvud, armar och ben)",
    "Lexin004669": "Överkroppen",
    "Lexin004670": "Muskler på rygg och mage",
    "Lexin004672": "Väggen runt bålen",
    "Lexin004687": "Muskler i underlivet som håller upp organen",
    "Lexin004688": "Kniipmusklerna",
    "Lexin004689": "Benet som höfterna sitter i",
    "Lexin004690": "Hela bäckenbenet",
    "Lexin004692": "Urinblåsa, livmoder, ändtarm",
    "Lexin004693": "Gjord behållare inuti kroppen (t.ex. av tarm)",
    "Lexin004752": "Muskel som böjer en led",
    "Lexin004761": "När man böjer något (flexion)",
    "Lexin004774": "Formad som en böna (t.ex. njuren)",
    "Lexin004810": "Blindtarmen",
    "Lexin004819": "Elakartad tumör",
    "Lexin004820": "Cancer i tjocktarmen",
    "Lexin004821": "Tarmcancer",
    "Lexin004822": "Cancer i ändtarmen",
    "Lexin004826": "Vanlig svampinfektion i underlivet",
    "Lexin004832": "Övre magmunnen",
    "Lexin004848": "Kroppens minsta byggsten",
    "Lexin004849": "Enzymer inuti cellen",
    "Lexin004851": "När en cell blir två (mitos)",
    "Lexin004852": "Ökning av antal celler",
    "Lexin004853": "När celler specialiserar sig (t.ex. blir muskelcell)",
    "Lexin004854": "Trasiga delar av en cell",
    "Lexin004855": "Förstadier till cancer (t.ex. på livmodertappen)",
    "Lexin004858": "Medicin som dödar cancerceller",
    "Lexin004860": "Cellens hjärna (där DNA finns)",
    "Lexin004861": "Skalet runt cellen",
    "Lexin004862": "Hinnan runt cellen",
    "Lexin004865": "Cellens organ (t.ex. mitokondrier)",
    "Lexin004870": "Växtfibrer (kroppen kan inte bryta ner)",
    "Lexin004872": "Vävnad under huden (subcutis)",
    "Lexin004897": "Slang in i stora blodkärl för dialys",
    "Lexin004907": "Små organ som drar isär kromosomer vid delning",
    "Lexin004911": "Lillhjärnan (balans och rörelse)",
    "Lexin004912": "CP-skada (medfödd hjärnskada)",
    "Lexin004913": "Stroke (propp eller blödning)",
    "Lexin004914": "Vätskan runt hjärnan och ryggmärgen",
    "Lexin004915": "Storhjärnan",
    "Lexin004965": "Operation att ta bort gallblåsan",
    "Lexin004966": "Fett i blodet",
    "Lexin004967": "Inflammation i ögats åderhinna",
    "Lexin004979": "Blodets väg i kroppen",
    "Lexin004980": "Hjärtat och kärlen",
    "Lexin004982": "Hjärta och blodkärl",
    "Lexin004983": "Problem med blodets flöde (t.ex. kalla händer)",
    "Lexin004984": "Hjärt- och kärlsjukdomar",
    "Lexin004985": "Blodomloppet",
    "Lexin005020": "Hjärnan och ryggmärgen",
    "Lexin005023": "Döva får hörsel via inopererad elektrod",
    "Lexin005027": "Inflammationer i tarmen (Ulcerös kolit/Crohns)",
    "Lexin005032": "Tjocktarmen",
    "Lexin005040": "Läderhuden (under överhuden)",
    "Lexin005043": "Kroppens eget stresshormon",
    "Lexin005046": "Barn med CP-skada",
    "Lexin005047": "Rörelsehinder pga hjärnskada vid födseln",
    "Lexin005052": "Kronisk tarmsjukdom (hela tarmen)",
    "Lexin005053": "Crohns sjukdom (annan benämning)",
    "Lexin005061": "Sjukdom med för mycket kortison i kroppen (månansikte)",
    "Lexin005077": "Vanlig urinvägsinfektion",
    "Lexin005078": "Njure med vätskeblåsor på (ofta ärftligt)",
    "Lexin005079": "Vätskefyllda blåsor",
    "Lexin005080": "Instrument för att titta in i urinblåsan",
    "Lexin005081": "Undersökning av urinblåsan",
    "Lexin005082": "Prov på celler",
    "Lexin005083": "Cellprov",
    "Lexin005084": "Vätskan inuti cellen",
    "Lexin005085": "Cancer medicin",
    "Lexin005086": "Starka mediciner mot cancer",
    "Lexin005087": "Behandling med cellgifter",
    "Lexin005089": "Vitamin från solen och fet fisk",
    "Lexin005173": "Gammalt namn för DCD (klumpig motorik)",
    "Lexin005211": "Skiktröntgen (CT/DT)",
    "Lexin005221": "Lagren längst in",
    "Lexin005245": "Nödig (behöver bajsa)",
    "Lexin005251": "Hjärtstartare (elchock)",
    "Lexin005258": "Felformad",
    "Lexin005260": "Kroppsdelar som ser konstiga ut (t.ex. krokig rygg)"
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
