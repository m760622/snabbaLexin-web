
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch45.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin021294": "När regeringen officiellt utfärdar en ny lag",
    "Lexin021295": "Utfärda lag",
    "Lexin021340": "Det som skrivs ner under mötet eller rättegången",
    "Lexin021342": "Skriftlig redogörelse för vad som sagts och beslutats",
    "Lexin021343": "Personen som skriver protokollet",
    "Lexin021358": "Ersättning baserad på hur mycket man säljer",
    "Lexin021406": "När domstolen går igenom och bedömer målet",
    "Lexin021427": "Mål om tvångsvård inom psykiatrin (LPT/LRV)",
    "Lexin021433": "Hur man mår i kroppen och själen",
    "Lexin021466": "Principen att t.ex. fastighetsköp ska vara offentliga (inskrivning)",
    "Lexin021468": "Aktiebolag som får sälja aktier till allmänheten (publ)",
    "Lexin021521": "Blindskrift (braille)",
    "Lexin021545": "Situationer där man tror sig vara i fara (inbillat nödvärn)",
    "Lexin021605": "Systemet med olika straff och påföljder",
    "Lexin021779": "Stort avtal som bestämmer villkor för framtida köp",
    "Lexin021826": "När polisen låter bli att bötfälla för mindre fel",
    "Lexin021837": "Etniskt ursprung (begreppet används sällan i svensk lag nu)",
    "Lexin021866": "Godkänna ett internationellt avtal",
    "Lexin021867": "Att riksdagen godkänner ett avtal som regeringen skrivit under",
    "Lexin021869": "Godkänt (om fördrag)",
    "Lexin021892": "Avtal som blir giltiga först när saken överlämnas (t.ex. gåva)",
    "Lexin021895": "Förlust när man säljer t.ex. en aktie eller fastighet",
    "Lexin021925": "Risk att personen begår nya brott",
    "Lexin021927": "Återfallsrisk",
    "Lexin021929": "Risk för återfall i brott",
    "Lexin021939": "Att leva hederligt och skötsamt",
    "Lexin021963": "Fysiska bevis (vapen, blodspår etc.)",
    "Lexin021965": "Tvångsmedel som rör saker (beslag, husrannsakan)",
    "Lexin021982": "Princip att straffet inte får bli hårdare om bara den dömde överklagar",
    "Lexin022009": "De som styr landet (statsministern och övriga statsråd)",
    "Lexin022011": "Statsminister",
    "Lexin022013": "Sveriges viktigaste grundlag",
    "Lexin022016": "Högsta förvaltningsdomstolen (hette tidigare Regeringsrätten)",
    "Lexin022017": "HFD (högsta instans i förvaltningsmål)",
    "Lexin022026": "Chef för en region (t.ex. polisregion)",
    "Lexin022031": "Samarbetsorgan mellan kommuner och landsting (finns ej kvar)",
    "Lexin022032": "Tidigare regionalt organ",
    "Lexin022039": "Databas med information",
    "Lexin022040": "Avdelning som sköter register",
    "Lexin022042": "Geografiskt område för register",
    "Lexin022046": "Äktenskapsliknande förbund för homosexuella (avskaffat 2009)",
    "Lexin022048": "Partnerskap (ersatt av könsneutralt äktenskap)",
    "Lexin022089": "Skyldighet att klaga på fel inom viss tid",
    "Lexin022090": "Bråk om en vara man klagat på",
    "Lexin022103": "När man spelar upp brottet igen för att se hur det gick till",
    "Lexin022105": "Rekonstruktion av brottsplatsen",
    "Lexin022106": "Plan för att rädda ett företag från konkurs",
    "Lexin022107": "Person som utses att rädda företaget",
    "Lexin022129": "Beställning",
    "Lexin022138": "Idéer om att straffet ska förhindra nya brott (inte bara hämnas)",
    "Lexin022146": "Trosuppfattning",
    "Lexin022166": "Gåva som belöning för tjänst (kan vara skattepliktig)",
    "Lexin022185": "Lagar som bara handlar om straff",
    "Lexin022204": "Som syftar till att reparera skadan (t.ex. skadestånd)",
    "Lexin022227": "Hämndåtgärder (t.ex. i krig eller på jobbet)",
    "Lexin022228": "Bestraffning eller hämnd",
    "Lexin022240": "Saken är avgjord (går ej att döma i igen)",
    "Lexin022287": "Att en dom rivs upp i efterhand (extraordinärt rättsmedel)",
    "Lexin022288": "Ny rättegång pga att något blev fel förra gången",
    "Lexin022289": "Beviljande av ny prövning efter laga kraft",
    "Lexin022293": "Beslut eller uttalande",
    "Lexin022323": "Regel som begränsar något (t.ex. för häktade)",
    "Lexin022346": "Att döma någon efter en lag som inte fanns när brottet begicks (förbjudet)",
    "Lexin022383": "Person som kontrollerar företagets ekonomi",
    "Lexin022384": "Ekonomisk kontrollant (auktoriserad/godkänd)",
    "Lexin022416": "Utrikespolitik och säkerhetspolitik",
    "Lexin022417": "Sveriges trygghet mot yttre hot",
    "Lexin022418": "Brott mot rikets säkerhet (spioneri mm)",
    "Lexin022428": "Sveriges parlament",
    "Lexin022429": "JO (granskar att myndigheter följer lagen)",
    "Lexin022430": "Riksdagens ordförande (numera talmannen)",
    "Lexin022435": "Alla dokument som trycks av riksdagen (lagförslag mm)",
    "Lexin022436": "Arbetsgrupp i riksdagen (t.ex. justitieutskottet)",
    "Lexin022440": "Enhet som täcker hela landet",
    "Lexin022444": "Polisens ledningscentral nationellt",
    "Lexin022445": "Kriminalpolisen på nationell nivå (idag NOA)",
    "Lexin022451": "Den nationella polisen",
    "Lexin022452": "Chefen för hela polisen",
    "Lexin022454": "RPS (fanns förr, nu är allt en myndighet)",
    "Lexin022457": "Myndighet som granskar statens ekonomi",
    "Lexin022458": "Statens revisorer",
    "Lexin022459": "RRV (heter nu Riksrevisionen)",
    "Lexin022469": "Högsta åklagaren i Sverige (RÅ)",
    "Lexin022498": "Litet eller lindrigt (motsats till grovt)",
    "Lexin022545": "Felstavning av Riksåklagare?",
    "Lexin022578": "Myndighet för rättspsykiatri, rättskemi och rättsmedicin",
    "Lexin022871": "Att hjälpa till med brottet både med tips och handling",
    "Lexin022877": "Grupp som ger råd",
    "Lexin022880": "Hjälp och tips",
    "Lexin022882": "Konsultation",
    "Lexin022886": "När säljaren inte ägde varan eller hade rätt att sälja den",
    "Lexin022887": "När man inte får använda sin egendom hur man vill",
    "Lexin022888": "Begränsningar i äganderätten",
    "Lexin022954": "Bokföring",
    "Lexin022963": "Faktura",
    "Lexin022975": "Priset för att låna pengar",
    "Lexin023005": "När domstolen avgör ett mål",
    "Lexin023006": "Processer i domstol",
    "Lexin023009": "Fullmakt för någon att föra din talan i rätten",
    "Lexin023010": "Papper som ger advokaten rätt att företräda dig"
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
