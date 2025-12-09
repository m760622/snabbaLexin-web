
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch63.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin002588": "När ett ägg och spermie smälter ihop",
    "Lexin002591": "Befruktning",
    "Lexin002593": "Fuktig (t.ex. slemhinnor)",
    "Lexin002647": "Ge vård eller medicin",
    "Lexin002670": "Burk eller flaska för prov",
    "Lexin002700": "Täcker insidan (t.ex. slemhinna)",
    "Lexin002713": "Oro",
    "Lexin002732": "När man anstränger kroppen hårt",
    "Lexin002739": "Skador för att man jobbat fel (förslitning)",
    "Lexin002771": "Det vita på tungan eller tänderna",
    "Lexin002774": "Ligger (t.ex. organens plats)",
    "Lexin002801": "De celler som bygger upp skelettet",
    "Lexin002805": "Hinnan runt benet (gör ont om man slår i)",
    "Lexin002808": "Bakterier i skelettet",
    "Lexin002809": "Inflammation i benet",
    "Lexin002811": "Hårdaste benet i kroppen (i örat)",
    "Lexin002812": "Det mjuka inuti benet där blod bildas",
    "Lexin002813": "Byta ut benmärg (vid leukemi)",
    "Lexin002814": "När bakterier äter upp benet",
    "Lexin002817": "Sjukdom i skelettet",
    "Lexin002818": "Operation för att skrapa rent benet",
    "Lexin002820": "När skelettet blir skört (lätt att bryta ben)",
    "Lexin002821": "Snäckan i örat (hörseln)",
    "Lexin002822": "Cancer eller knöl i skelettet",
    "Lexin002823": "Hur starkt benet är",
    "Lexin002824": "Röntgen för att mäta benskörhet",
    "Lexin002825": "Det material skelettet är gjort av",
    "Lexin002826": "Skelettvävnad",
    "Lexin002840": "Ökad risk att få en sjukdom",
    "Lexin002842": "Där benet slutar (i en led)",
    "Lexin002843": "Ändarna på skelettbenen",
    "Lexin002846": "Att man vet att metoden funkar (evidens)",
    "Lexin002857": "Att vara redo (t.ex. läkare i beredskap)",
    "Lexin002858": "Jour",
    "Lexin002981": "Smakar illa (som galla)",
    "Lexin003052": "Som inte går över",
    "Lexin003053": "Skada i hjärnan som aldrig läker helt",
    "Lexin003054": "Handikapp man har kvar",
    "Lexin003059": "Delar",
    "Lexin003068": "Fasta tider för medicin",
    "Lexin003081": "När det inte blir som man hoppats",
    "Lexin003086": "Jobbigt (t.ex. klåda)",
    "Lexin003108": "Medicin som sänker pulsen",
    "Lexin003109": "Hjärtmedicin (mot högt blodtryck)",
    "Lexin003144": "Inlärt beteende (Pavlovs hundar)",
    "Lexin003201": "Skydd för tänderna när man sover",
    "Lexin003289": "Har kvar",
    "Lexin003320": "Hålrum i ansiktsskelettet (t.ex. vid näsan)",
    "Lexin003323": "Ämne som neutraliserar syra",
    "Lexin003343": "Skapas",
    "Lexin003351": "Där det tillverkas (t.ex. blod i märgen)",
    "Lexin003357": "Det gula ämnet i galla (från döda blodkroppar)",
    "Lexin003380": "Hinnan på ögat (det vita)",
    "Lexin003381": "Ögoninflammation",
    "Lexin003389": "Vävnad som håller ihop kroppen",
    "Lexin003394": "Stödjevävnad",
    "Lexin003396": "Celler som gör bindväv",
    "Lexin003397": "Trådar som gör huden stark (kollagen)",
    "Lexin003398": "Sömmar mellan skallens ben",
    "Lexin003400": "Hinna av bindväv",
    "Lexin003401": "Hinnor runt muskler m.m.",
    "Lexin003402": "Påse runt en led",
    "Lexin003403": "Skikt av bindväv",
    "Lexin003404": "Det hårda som bildas när ett ben läker",
    "Lexin003405": "Fibrer i kroppen",
    "Lexin003409": "Körtlar ovanpå njurarna (stresshormoner)",
    "Lexin003410": "En av binjurarna",
    "Lexin003411": "Yttre delen av binjuren (kortison)",
    "Lexin003412": "Inre delen av binjuren (adrenalin)",
    "Lexin003415": "Samling av blodprover för forskning",
    "Lexin003421": "Kemin i kroppen",
    "Lexin003424": "Läran om livet",
    "Lexin003440": "Hormon som höjer kalk i blodet",
    "Lexin003441": "Liten körtel bakom sköldkörteln",
    "Lexin003443": "De 4 små körtlarna som sty kalkbalansen",
    "Lexin003446": "När ett bi sticker",
    "Lexin003458": "Där spermier lagras (ovanpå testikeln)",
    "Lexin003491": "Träd som många är allergiska mot",
    "Lexin003506": "Nerv som både känner och styr muskler",
    "Lexin003513": "Tumör med olika sorters celler",
    "Lexin003528": "Inflammation i ögonlockskanten",
    "Lexin003533": "När man är vit i ansiktet",
    "Lexin003550": "Där synnerven går ut (man ser inget där)",
    "Lexin003553": "Att inte se någonting",
    "Lexin003554": "Det att vara blind",
    "Lexin003559": "Första delen av tjocktarmen",
    "Lexin003560": "Akut ont i magen (höger sida)",
    "Lexin003580": "Smärta som hugger till snabbt",
    "Lexin003591": "Stoppa effekten av något",
    "Lexin003598": "Den röda vätskan i kroppen",
    "Lexin003599": "Tecken på blödning i tarmen",
    "Lexin003601": "Klumpar av levrat blod",
    "Lexin003602": "Blåmärke eller hematom",
    "Lexin003604": "Blodet i kärlen",
    "Lexin003605": "Med blod i",
    "Lexin003606": "När man kräks blod",
    "Lexin003608": "För lite röda blodkroppar",
    "Lexin003609": "Lågt blodvärde",
    "Lexin003610": "Leukemi",
    "Lexin003611": "Cancer i benmärgen"
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
