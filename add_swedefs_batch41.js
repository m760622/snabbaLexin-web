
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch41.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin015084": "Avgifter och ränta för ett lån",
    "Lexin015087": "Koll om någon kan betala tillbaka ett lån (kreditkoll)",
    "Lexin015090": "Lagen om hur kreditupplysning får gå till",
    "Lexin015107": "Att försöka starta ett krig (brott mot rikets säkerhet)",
    "Lexin015108": "Risk för krig",
    "Lexin015109": "Brott mot krigets lagar (t.ex. döda civila)",
    "Lexin015111": "Vapenvägrare (om man vägrar kriga)",
    "Lexin015116": "Polis som utreder brott (spaning och utredning)",
    "Lexin015117": "Som rör polisens utredande arbete",
    "Lexin015118": "Statens politik för att bekämpa brott",
    "Lexin015119": "NFC (där polisen undersöker bevis tekniskt)",
    "Lexin015126": "Personal på fängelse eller häkte",
    "Lexin015127": "Myndigheten som ansvarar för fängelser och frivård",
    "Lexin015128": "Kriminalvården (KV)",
    "Lexin015129": "Fängelse eller anstalt",
    "Lexin015130": "Chef inom kriminalvården",
    "Lexin015132": "Nämnd som beslutar om villkorlig frigivning m.m.",
    "Lexin015133": "Den gamla ledningen för kriminalvården",
    "Lexin015202": "Kronofogden (driver in skulder)",
    "Lexin015212": "Undersökning av kroppen (t.ex. blodprov eller urinprov)",
    "Lexin015219": "Aga (att slå barn som straff)",
    "Lexin015224": "Straff som känns i kroppen (spöstraff)",
    "Lexin015227": "Tafts (utanpå kläderna) och genomsökning av väskor",
    "Lexin015306": "Att smygfotografera någon på toaletten eller privat",
    "Lexin015310": "Elakheter som sårar någons känslor eller ära",
    "Lexin015311": "Pengar man får för att man blivit kränkt (skadestånd)",
    "Lexin015370": "Skyddat område för att bevara kulturhistoria",
    "Lexin015390": "Offentligt meddelande (annons från myndighet)",
    "Lexin015417": "Personer som smugglar droger åt andra",
    "Lexin015435": "Myndighet som bevakar sjögränserna",
    "Lexin015436": "Kustbevakningen (KBV)",
    "Lexin015460": "Tid man måste ha varit med i a-kassan innan man får ersättning",
    "Lexin015514": "Brott där man slår eller hotar en kvinna man lever med",
    "Lexin015529": "Bevis på betalning",
    "Lexin015534": "Regel om hur man delar egendom",
    "Lexin015537": "Flykting som FN väljer ut till Sverige (vidarebosättning)",
    "Lexin015659": "Den som stämmer någon i domstol",
    "Lexin015678": "Det som käranden begär i domstolen",
    "Lexin015710": "Att man inte känner sig som man eller kvinna (transperson)",
    "Lexin015712": "Överlåtelse av egendom mot pengar",
    "Lexin015713": "Att betala för sex med barn",
    "Lexin015714": "Att betala för sex (straffbart i Sverige)",
    "Lexin015717": "Kvitto på att fastighetsköpet är klart och betalt",
    "Lexin015718": "Pappret där det står att man köpt något",
    "Lexin015719": "Avtalet om köpet",
    "Lexin015721": "Det första kontraktet vid husköp",
    "Lexin015722": "Saken som säljs",
    "Lexin015726": "Regler för köpet",
    "Lexin015730": "Lag som gäller köp mellan privatpersoner eller företag",
    "Lexin015732": "Regler om köp och sälj",
    "Lexin015746": "Att polisen tar körkortet",
    "Lexin015799": "Distansavtalslagen (ångerrätt vid internetköp)",
    "Lexin015801": "Lagen om DNA-test och genetik i vården",
    "Lexin015803": "Lag om ställföreträdare för ensamkommande barn",
    "Lexin015804": "Lag om att polisen får kolla utlänningar inne i landet",
    "Lexin015807": "LOU (regler för när staten/kommunen köper saker)",
    "Lexin015808": "Lag om att få ett slutdatum på livstidsstraff",
    "Lexin015809": "Terroristbrottslagen",
    "Lexin015813": "Lag om att vissa tolkar har tystnadsplikt",
    "Lexin015815": "Omsorgslag (numera ersatt av LSS)",
    "Lexin015818": "Rättighet att göra något enligt lag (t.ex. polisen får använda våld)",
    "Lexin015819": "På rätt sätt (formellt korrekt)",
    "Lexin015821": "Att ha blivit ägare på ett lagligt sätt",
    "Lexin015828": "Svensk författningssamling (SFS)",
    "Lexin015834": "Marknadsmissbrukslagen (insiderbrott m.m.)",
    "Lexin015835": "Lagen om särskild utlänningskontroll (LSU)",
    "Lexin015847": "Beviset på att man äger fastigheten",
    "Lexin015849": "Bli åtalad och dömd",
    "Lexin015851": "Att göra lagar lika i olika länder (EU-anpassning)",
    "Lexin015852": "Kedjan av ägare bakåt i tiden",
    "Lexin015856": "Att överklaga kommunens beslut för att de gjort fel",
    "Lexin015861": "Att man följer lagen",
    "Lexin015866": "Rätt att pröva om en lag strider mot grundlagen",
    "Lexin015868": "Paragraf i lagen",
    "Lexin015870": "Domare som granskar nya lagförslag",
    "Lexin015879": "Arbetet med att skriva nya lagar",
    "Lexin015883": "Hur man ska förstå lagen",
    "Lexin015915": "Statens representant i länet",
    "Lexin015930": "Regionfullmäktige (de som styr i regionen)",
    "Lexin015954": "Myndighet som sköter kartor och fastighetsgränser",
    "Lexin015956": "Möte där Lantmäteriet bestämmer gränser",
    "Lexin015958": "Lantmäteriet",
    "Lexin015959": "Lantmäteriet (verket)",
    "Lexin016034": "Att hyra med rätt att köpa sen",
    "Lexin016035": "Långtidshyra",
    "Lexin016036": "Finansiering genom hyra",
    "Lexin016049": "Person som sitter i en styrelse eller nämnd",
    "Lexin016050": "Medlemmar i en styrelse",
    "Lexin016051": "Frågor där man lägger svaret i munnen på den som svarar",
    "Lexin016079": "Rätt att dra el- eller vattenledningar över annans mark",
    "Lexin016098": "Reglerna för vem som ärver om det inte finns testamente",
    "Lexin016099": "Arvsordningen i lagen",
    "Lexin016103": "Någon som får en viss sak i testamente (inte andel)",
    "Lexin016111": "ID-handling",
    "Lexin016130": "Nämndeman (domare utan juristutbildning)",
    "Lexin016131": "Icke-experter",
    "Lexin016153": "Två kvinnor i relation",
    "Lexin016158": "Avsiktsförklaring (före det riktiga avtalet)",
    "Lexin016173": "Den som säljer varor till företag",
    "Lexin016185": "Livsstil"
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
