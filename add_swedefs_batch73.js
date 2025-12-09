
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch73.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin012053": "Stora vener som leder blod till hjärtat",
    "Lexin012058": "Strån på huvudet eller kroppen",
    "Lexin012060": "Huden på huvudet under håret",
    "Lexin012064": "Ojämn och fast",
    "Lexin012065": "Främre delen av gommen (ben)",
    "Lexin012066": "Yttersta hinnnan runt hjärnan",
    "Lexin012067": "Dura mater",
    "Lexin012085": "Roten till hårstråt",
    "Lexin012090": "Muskeln som får håret att resa sig (gåshud)",
    "Lexin012091": "Delen av håret under huden",
    "Lexin012092": "Hårets fäste",
    "Lexin012093": "Kapillärer (minsta blodkärlen)",
    "Lexin012094": "Hårstråt som syns",
    "Lexin012096": "Grop i huden där håret växer",
    "Lexin012097": "Hårfollikel",
    "Lexin012114": "Plötsligt och starkt (om smärta)",
    "Lexin012141": "Benet i hälen (kalkaneus)",
    "Lexin012146": "Knölen bak på hälen",
    "Lexin012160": "Nämnd som granskar fel inom vården",
    "Lexin012166": "Fyllig undersökning av kroppen",
    "Lexin012176": "Bromsa eller stoppa",
    "Lexin012199": "Bröst som hänger ner",
    "Lexin012229": "Ha i sig (om bakterier)",
    "Lexin012231": "Bär på",
    "Lexin012238": "Genom detta",
    "Lexin012256": "Kommer från (ursprung)",
    "Lexin012269": "Ta bort stoppet",
    "Lexin012277": "När muskler jobbar över en led",
    "Lexin012281": "Delen där benet möter bålen",
    "Lexin012282": "Bäckenbenet",
    "Lexin012284": "Benen som bildar bäckenet",
    "Lexin012285": "Muskler runt bäckenet",
    "Lexin012290": "Ny höftkula av metall/plast",
    "Lexin012302": "Största delen av levern",
    "Lexin012311": "Allvarlig (om feber eller sjukdom)",
    "Lexin012315": "Frikort (när man nått taket)",
    "Lexin012317": "Gräns för hur mycket man betalar för vård",
    "Lexin012336": "För högt tryck i blodkärlen",
    "Lexin012368": "Apparat som förstärker ljud",
    "Lexin012369": "Hjälpmedel för hörseln",
    "Lexin012379": "Vassa tänderna i hörnen",
    "Lexin012384": "Hammaren, städet och stigbygeln",
    "Lexin012387": "Del av hjärnan som tolkar ljud",
    "Lexin012388": "Centrum i hjärnan för hörsel",
    "Lexin012390": "Finne i örat",
    "Lexin012392": "Nerven från örat till hjärnan",
    "Lexin012393": "Örat",
    "Lexin012394": "Förmågan att höra",
    "Lexin012395": "Hårceller i innerörat",
    "Lexin012398": "Person som hör dåligt",
    "Lexin012400": "Problem med hörseln (t.ex. tinnitus)",
    "Lexin012402": "Tecken på fel i örat",
    "Lexin012430": "Tillsammans med",
    "Lexin012434": "Där ... sitter",
    "Lexin012438": "Ungefär (snitt)",
    "Lexin012441": "Vid naveln",
    "Lexin012443": "Tillsammans",
    "Lexin012454": "Utslag av irritation (ej allergi)",
    "Lexin012521": "Kanyl (sprutspets)",
    "Lexin012522": "Tom inuti",
    "Lexin012523": "Organ som är som påsar eller rör (t.ex. mage/tarm)",
    "Lexin012525": "Som inte slutar",
    "Lexin012526": "När man kräks hela tiden",
    "Lexin012527": "Smärta som inte går över",
    "Lexin012537": "Sista delen av tunntarmen",
    "Lexin012538": "Tarmvred (stopp i tarmen)",
    "Lexin012541": "Som luktar illa",
    "Lexin012567": "Behandling som påverkar immunförsvaret",
    "Lexin012568": "Svagt immunförsvar",
    "Lexin012570": "Antikroppar (proteiner som skyddar)",
    "Lexin012571": "IgG, IgA, IgM etc.",
    "Lexin012573": "Motståndskraft mot sjukdom",
    "Lexin012574": "Skyddet mot infektioner",
    "Lexin012575": "Lära om immunförsvaret",
    "Lexin012576": "När kroppen försvarar sig",
    "Lexin012577": "Behandling med antikroppar eller vaccin",
    "Lexin012578": "Svar från immunförsvaret",
    "Lexin012579": "Metod att stärka immunförsvaret (t.ex. mot cancer)",
    "Lexin012581": "När man måste kissa/bajsa akut",
    "Lexin012587": "Svinkoppor (sår i ansiktet)",
    "Lexin012603": "När nervsignaler startar",
    "Lexin012604": "Signaler i nerverna",
    "Lexin012607": "När signalen går vidare",
    "Lexin012615": "Att dra in luft",
    "Lexin012616": "Luften vi andas in",
    "Lexin012686": "Indragen bröstkorg eller indragen i olycka",
    "Lexin012692": "Hälla i droppar (t.ex. i örat)",
    "Lexin012711": "Infektionsmedicin",
    "Lexin012712": "Avdelning för smittsamma sjukdomar",
    "Lexin012714": "Hur lätt man blir sjuk",
    "Lexin012715": "Sjukdomar orsakade av bakterier/virus",
    "Lexin012716": "Vård av infektioner",
    "Lexin012717": "Smittämnen (virus/bakterier)",
    "Lexin012725": "Kroppens reaktion på skada (rött/svullet/ont)",
    "Lexin012726": "Katarr",
    "Lexin012729": "Medicin mot inflammation (NSAID/Kortison)",
    "Lexin012730": "Antiinflammatorisk",
    "Lexin012731": "Tecken på inflammation",
    "Lexin012732": "Sjukdomar som Ulcerös kolit och Crohns",
    "Lexin012754": "Ge vätska direkt i blodet"
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
