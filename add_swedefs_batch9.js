
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch9.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin002878": "Borttagning av lösa stenar från bergvägg eller tak",
    "Lexin002881": "Vertikalt eller lutande hål i berg (schakt)",
    "Lexin002882": "Grävarbete eller sprängning i berg",
    "Lexin002883": "Tvärsnitt som visar bergets profil",
    "Lexin002885": "Sprängning av en mindre mängd berg",
    "Lexin002889": "Metod att losshålla berg genom sprängning",
    "Lexin002890": "Spänningar som finns naturligt i berggrunden",
    "Lexin002892": "Det tryck som berget utövar på t.ex. en tunnel",
    "Lexin002893": "Mängd berg som tas ut ur t.ex. en tunnel",
    "Lexin002894": "Värmeenergi som lagrats i berggrunden",
    "Lexin002915": "Det tryck man använder vid beräkning (dimensionering)",
    "Lexin002943": "Person som utför besiktning",
    "Lexin002944": "Plan för när och hur besiktningar ska ske",
    "Lexin002945": "Dokument som upprättas vid besiktning",
    "Lexin002979": "Text som beskriver utförande eller material",
    "Lexin002980": "Samlade beskrivningar för ett projekt",
    "Lexin002999": "Avgörande som fattas i en fråga",
    "Lexin003002": "Rätt att fatta beslut i vissa frågor",
    "Lexin003006": "Person som har rätt att fatta beslut",
    "Lexin003047": "Intyga att något är sant eller äkta",
    "Lexin003062": "Den som beställer ett arbete (byggherre)",
    "Lexin003065": "Begäran om leverans av vara eller tjänst",
    "Lexin003066": "Arbete som utförs på beställning",
    "Lexin003105": "Parkering avsedd för besökare",
    "Lexin003129": "Plan för när betalningar ska ske under projektet",
    "Lexin003152": "Byggmaterial av cement, vatten och ballast",
    "Lexin003153": "Yrkesarbetare som arbetar med betong",
    "Lexin003154": "Beläggning av betong på t.ex. en väg",
    "Lexin003155": "Lastbil med roterande behållare för betong",
    "Lexin003156": "Maskin för att blanda betong",
    "Lexin003157": "Bro byggd av betong",
    "Lexin003159": "Form som betong gjuts i",
    "Lexin003160": "Arbetet att fylla formen med betong",
    "Lexin003161": "Maskin för att glätta (släta till) betongytor",
    "Lexin003162": "Bärande konstruktion av betong",
    "Lexin003163": "Klassificering av betongens egenskaper (t.ex. hållfasthet)",
    "Lexin003164": "Den blandade massan av betong",
    "Lexin003165": "Takpannor tillverkade av betong",
    "Lexin003166": "Platta av betong, ofta som grund",
    "Lexin003167": "Testning av betongens egenskaper",
    "Lexin003168": "Maskin som pumpar betong genom slangar",
    "Lexin003169": "Rör tillverkat av betong",
    "Lexin003170": "En viss mängd betong som blandats samtidigt",
    "Lexin003171": "Ett lager av betong",
    "Lexin003172": "Byggskivor av betongmaterial",
    "Lexin003173": "Utrustning för att spruta betong",
    "Lexin003174": "Fabrik där betong tillverkas",
    "Lexin003175": "Block eller sten av betong för murning",
    "Lexin003176": "Såg för att såga i betong",
    "Lexin003177": "Temperaturen i betongen (viktigt vid härdning)",
    "Lexin003178": "Transport av betong till arbetsplatsen",
    "Lexin003192": "Behandlad med bets (om trä)",
    "Lexin003235": "Område som ska bevaras (kulturmiljö)",
    "Lexin003280": "Samling av föreskrifter från Boverket",
    "Lexin003286": "Area i bostad som inte är boarea (t.ex. pannrum, garage)",
    "Lexin003332": "Dokument som fogas till ett huvudkdokument",
    "Lexin003367": "Maskinhammare för att bila (hugga) i betong/sten",
    "Lexin003372": "Trafik med motorfordon",
    "Lexin003379": "Objekt som binder samman delar",
    "Lexin003383": "Ämne som binder samman partiklar (t.ex. cement, lim)",
    "Lexin003392": "Det att något fastnar eller binder",
    "Lexin003393": "Tiden det tar för ett material att härda/binda",
    "Lexin003416": "Bränsle från organiskt material",
    "Lexin003418": "Gas framställd genom rötning av organiskt material",
    "Lexin003425": "Rikt och varierat växt- och djurliv",
    "Lexin003468": "Utbytbara skruvmejselspetsar för borrmaskin/skruvdragare",
    "Lexin003475": "Bindemedel utvunnet ur olja (finns i asfalt)",
    "Lexin003476": "Grusmaterial som bundits samman med bitumen",
    "Lexin003477": "Bitumen uppslammat i vatten",
    "Lexin003478": "Som innehåller bitumen",
    "Lexin003485": "Grövre virke eller balk av trä",
    "Lexin003486": "Bärande konstruktion i golv eller tak",
    "Lexin003518": "Skrapning av yta tills den blir helt ren",
    "Lexin003555": "Prov som görs utan att veta vad som testas (eller kontrollprov)",
    "Lexin003581": "Anordning som skyddar mot blixtnedslag",
    "Lexin003590": "Chef för ett större arbetsblock/avsnitt",
    "Lexin003596": "Jordart som innehåller mycket block (stora stenar)",
    "Lexin003712": "Tung och mjuk metall",
    "Lexin003724": "Lättbetong som kan avge radon",
    "Lexin003745": "Lampa el. brännare som ger en het låga",
    "Lexin003764": "När ljus stör seendet",
    "Lexin003765": "Skydd mot bländande ljus",
    "Lexin003769": "Metod att rengöra ytor med t.ex. sandstråle",
    "Lexin003790": "Arean i en bostad som man bor på",
    "Lexin003792": "Byggskiva (träfiberskiva)",
    "Lexin003794": "Lamell av boardskiva",
    "Lexin003803": "Formning av material genom böjning (ofta plåt/armering)",
    "Lexin003804": "Maskin för att bocka material",
    "Lexin003805": "Verktyg för bockning",
    "Lexin003843": "Anteckna ekonomiska transaktioner",
    "Lexin003933": "Göra hål med borr",
    "Lexin003936": "Hål som gjorts genom borrning",
    "Lexin003939": "Maskin för att borra",
    "Lexin003946": "Redskap med borst för målning eller rengöring",
    "Lexin003993": "Hus avsett att bo i",
    "Lexin003994": "Kvarter med bostadshus",
    "Lexin003996": "Område som domineras av bostäder",
    "Lexin004004": "Kvalitetsnivå på bostäder",
    "Lexin004022": "Den understa balken i en stomme",
    "Lexin004025": "Gjuten platta som huset står på (grund)"
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
