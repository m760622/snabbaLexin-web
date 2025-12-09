
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch27.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin032906": "Som man ska skämmas för (enligt normen)",
    "Lexin032908": "Gammalt ord för analsex",
    "Lexin032910": "Förenklad bild av en grupp",
    "Lexin032911": "Ingrepp som gör att man inte kan få barn",
    "Lexin032912": "Märke av skam eller vanära",
    "Lexin032913": "Att peka ut någon som avvikande",
    "Lexin032915": "Som är ett brott och kan ge straff",
    "Lexin032917": "Något man inte får tala om eller göra",
    "Lexin032918": "Sexuellt umgänge med djur",
    "Lexin032919": "Att stå ut med eller acceptera andra; tålamod",
    "Lexin032920": "Som accepterar att andra är annorlunda",
    "Lexin032930": "Att vara i en riskfylld situation",
    "Lexin032931": "Gammalt ord för könssjukdomar",
    "Lexin032932": "Grundläggande värderingar",
    "Lexin032933": "Uppfattningar om vad som är rätt och fel",
    "Lexin033074": "Som inte pekar ut något kön",
    "Lexin023378": "Sex med nära släkting (incest)",
    "Lexin032936": "Sexuell dragning till amputerade kroppsdelar",
    "Lexin032937": "Medel som ökar sexlusten",
    "Lexin032938": "Samlag i ändtarmen",
    "Lexin032939": "Sex som involverar anus",
    "Lexin032940": "Läran om mannens sjukdomar (motsats till gynekologi)",
    "Lexin032941": "Sexuell stimulering av anus med munnen",
    "Lexin032942": "Önskan att amputera kroppsdel",
    "Lexin032943": "Person som inte känner sexuell attraktion",
    "Lexin032944": "Sexuell njutning med sig själv",
    "Lexin032945": "Att suga sin egen penis",
    "Lexin032946": "Sexuell dragning till armhålor",
    "Lexin032947": "Sexuella lekar med makt och smärta",
    "Lexin032948": "Hudveck som skyddar vaginan",
    "Lexin032949": "Stort intresse för bröst",
    "Lexin032950": "Den utstickande delen på bröstet",
    "Lexin032951": "Lesbisk med maskulin stil",
    "Lexin032952": "Samlag mellan brösten",
    "Lexin032953": "Att avbryta samlaget innan utlösning",
    "Lexin032954": "Att klä sig i det andra könets kläder",
    "Lexin032955": "Man som gillar att se sin fru ha sex med andra",
    "Lexin032956": "Sexuell stimulering av vaginan med munnen",
    "Lexin032957": "Tändning på att partnern gråter",
    "Lexin032958": "Sexuell dragning till träd",
    "Lexin032959": "Sexleksak formad som en penis",
    "Lexin032960": "Smärta vid samlag",
    "Lexin032961": "När sperma kommer ut",
    "Lexin032962": "Tändning på kräkningar",
    "Lexin032963": "När penis blir styv (stånd)",
    "Lexin032964": "Att få stånd",
    "Lexin032965": "Känsliga områden på kroppen",
    "Lexin032966": "Kondom för kvinnor",
    "Lexin032967": "Sexuell tändning på föremål eller kroppsdelar",
    "Lexin032968": "Att stimulera vaginan med fingrarna",
    "Lexin032969": "Att föra in handen i vagina eller anus",
    "Lexin032970": "Löss som lever i könshåret",
    "Lexin032971": "Sträng under ollonet",
    "Lexin032972": "Oförmåga att känna sexlust (gammalt ord)",
    "Lexin032973": "Förmåga att få barn",
    "Lexin032974": "Att komma för fort vid sex",
    "Lexin032975": "Huden som täcker ollonet",
    "Lexin032976": "Vätska som kommer före utlösning",
    "Lexin032977": "Sexuella aktiviteter innan samlaget",
    "Lexin032978": "Känslig punkt i vaginan",
    "Lexin032979": "Könsorganen",
    "Lexin032980": "Sexuell dragning till äldre personer",
    "Lexin032981": "Sexlek med urin",
    "Lexin032982": "Könskörtel (testikel eller äggstock)",
    "Lexin032983": "Skydd för könsorganen vid röntgen",
    "Lexin032984": "Sex med flera personer samtidigt",
    "Lexin032985": "Förkortning för Homosexuella, Bisexuella och Transpersoner",
    "Lexin032986": "Sexuell dragning till tonåringar",
    "Lexin032987": "Person med både manliga och kvinnliga könsorgan (gammalt ord)",
    "Lexin032988": "Samhälle där heterosex är norm",
    "Lexin032989": "Diskriminering av icke-heterosexuella",
    "Lexin032990": "Att dras till motsatt kön",
    "Lexin032991": "Par av samma kön som bor ihop",
    "Lexin032992": "Tändning på farliga brottslingar",
    "Lexin032993": "Slemhinneveck i slidöppningen (mödomshinna)",
    "Lexin032994": "Överdriven sexlust",
    "Lexin032995": "Oförmåga att få stånd",
    "Lexin032996": "Att sy ihop blygdläpparna (könsstympning)",
    "Lexin032997": "Organ inuti kroppen (livmoder, äggstockar, prostata)",
    "Lexin032998": "Sex som är annorlunda än det vanliga",
    "Lexin033000": "Vanlig könssjukdom orsakad av bakterier",
    "Lexin033002": "Tändning på lavemang",
    "Lexin033003": "Gummi som träs på penis som skydd",
    "Lexin033004": "Vårtor på könsorganen",
    "Lexin033005": "Tändning på avföring",
    "Lexin033006": "Våldtäkt för att 'bota' homosexuella (hatbrott)",
    "Lexin033007": "Vätska från urinröret vid orgasm (squirt)",
    "Lexin033008": "Upplevelsen av att tillhöra ett kön",
    "Lexin033009": "Sexuell drift",
    "Lexin033010": "Teori om mäns makt över kvinnor",
    "Lexin033011": "Åldern då man kan få barn (pubertet)",
    "Lexin033012": "Att skära bort delar av könsorganet",
    "Lexin033013": "Samlag",
    "Lexin033014": "Kvinna som älskar kvinnor",
    "Lexin033015": "Konstgjord vagina (lösfitta)",
    "Lexin033016": "Testosteron",
    "Lexin033017": "Njutning av att känna smärta",
    "Lexin033018": "Att tillfredsställa sig själv sexuellt",
    "Lexin033019": "Operation för att återställa mödomshinnan",
    "Lexin033020": "Sexuell dragning till döda kroppar"
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
