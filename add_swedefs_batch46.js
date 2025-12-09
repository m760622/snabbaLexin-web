
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch46.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin023011": "Mindre fel i domstolen (t.ex. att störa ordningen)",
    "Lexin023012": "Hinder som gör att rättegången inte kan hållas (jäv, fel domstol)",
    "Lexin023014": "Kostnad för advokat och rättegång",
    "Lexin023015": "Pengar man får betala för rättegången om man förlorar",
    "Lexin023017": "Person som hjälper dig i rättegången (advokat)",
    "Lexin023018": "Ombud i rätten",
    "Lexin023019": "Rättens regler (rättegångsbalken)",
    "Lexin023032": "Dokument från EU (lag, direktiv)",
    "Lexin023034": "Fakta som har juridisk betydelse",
    "Lexin023035": "Sakomständighet som påverkar domen",
    "Lexin023037": "Ett mål i domstol",
    "Lexin023038": "Fel i lagenligheten (t.ex. att säljaren inte ägde varan)",
    "Lexin023039": "Vad som händer enligt lagen om man gör något (straff, skadestånd)",
    "Lexin023040": "Juridisk konsekvens",
    "Lexin023042": "Något man gör som får juridiska följder (t.ex. skriva avtal)",
    "Lexin023047": "Statligt bidrag till advokatkostnader",
    "Lexin023048": "Ekonomisk hjälp vid rättegång",
    "Lexin023049": "Rättshjälpsmyndigheten",
    "Lexin023052": "Jurist som hjälper till med rättshjälp",
    "Lexin023053": "Biträde enligt rättshjälpslagen",
    "Lexin023054": "Offentligt biträde eller advokat",
    "Lexin023055": "Lagen om vem som får rättshjälp",
    "Lexin023058": "Nämnd som beslutar om rättshjälp",
    "Lexin023059": "Myndighet för rättshjälpsfrågor",
    "Lexin023062": "Förmåga att ha rättigheter och skyldigheter (alla människor har det)",
    "Lexin023063": "Fångeskedja (bevis på vem som ägt saken i alla led)",
    "Lexin023067": "Att domen är slutgiltig och bindande",
    "Lexin023070": "Rätt att ingå avtal och sköta sina affärer (myndig)",
    "Lexin023071": "Fel som rör juridiken (t.ex. äganderättsfel)",
    "Lexin023072": "Hjälp med juridiken",
    "Lexin023075": "Sätt att klaga på en dom (överklagande, resning)",
    "Lexin023078": "Det som rättigheten gäller (saken, t.ex. bilen)",
    "Lexin023080": "Del av lagen (t.ex. straffrätt, familjerätt)",
    "Lexin023081": "Lagsystemet i ett land",
    "Lexin023092": "Lagen om rättspsykiatrisk vård med särskild utskrivningsprövning (LRV)",
    "Lexin023093": "En lag eller regel i lagen",
    "Lexin023094": "Alla lagar och regler",
    "Lexin023097": "Samhälle som bygger på lag och rätt",
    "Lexin023098": "Domstolarnas verksamhet",
    "Lexin023101": "Stat där lagen styr och alla är lika inför den",
    "Lexin023102": "Person eller företag som kan ha rättigheter (fysisk eller juridisk person)",
    "Lexin023104": "Den som vill ha sin rätt i domstol",
    "Lexin023108": "Tolkning i domstol",
    "Lexin023109": "Bråk som måste lösas i domstol",
    "Lexin023110": "Hur lagen ändras över tid genom domar",
    "Lexin023111": "Vad en handling leder till juridiskt",
    "Lexin023113": "Att man inte visste vad lagen sa (oftast ingen ursäkt)",
    "Lexin023116": "Polis, åklagare, domstolar och kriminalvård",
    "Lexin023264": "När staten tar ett föremål (förverkas)",
    "Lexin023265": "Det målet handlar om",
    "Lexin023270": "Expert som domstolen frågar",
    "Lexin023271": "Ed som experten svär",
    "Lexin023273": "Att hyra en sak (inte fastighet eller lägenhet)",
    "Lexin023277": "Lån av en sak som ska lämnas tillbaka (t.ex. låna en bok)",
    "Lexin023281": "Krav för att domstolen ska ta upp målet",
    "Lexin023282": "Hinder eller krav för rättegång",
    "Lexin023285": "Regler om ägande och pant",
    "Lexin023286": "Skada på saker (bilen, huset)",
    "Lexin023294": "Jäv för att man har egen vinning i saken",
    "Lexin023329": "Avtal om att jobba ihop",
    "Lexin023331": "Samtal hos socialtjänsten för föräldrar som bråkar om barnen",
    "Lexin023335": "Person som sköter kontakten mellan myndigheter",
    "Lexin023338": "Person som man bor och lever med utan att vara gift",
    "Lexin023339": "Avtal om vad som händer med sakerna om sambor separerar",
    "Lexin023341": "Lagen om sambors gemensamma hem och bohag",
    "Lexin023343": "Förening för att bruka jord tillsammans",
    "Lexin023348": "Samernas folkvalda organ",
    "Lexin023352": "Förening för gemensam väg, vatten eller liknande",
    "Lexin023362": "Grupp i samhället",
    "Lexin023384": "Frågor om att bo ihop",
    "Lexin023408": "Utbildning som hänger ihop",
    "Lexin023415": "När änkan/änklingen bor kvar i oskiftat bo",
    "Lexin023416": "Slå ihop två saker (t.ex. fastigheter)",
    "Lexin023428": "Möten (t.ex. i rätten)",
    "Lexin023435": "Åklagare som ansvarar för ungdomsmål",
    "Lexin023438": "Möte för att samordna insatser",
    "Lexin023467": "När flera äger något tillsammans",
    "Lexin023491": "Straffavgift (böter som myndighet beslutar om)",
    "Lexin023503": "Chans att det är sant (sannolika skäl)",
    "Lexin023551": "Inkomst som beräknas enligt en schablon",
    "Lexin023571": "EU-samarbete om öppna gränser",
    "Lexin023572": "Visum som gäller i hela Schengen",
    "Lexin023573": "Avtalet om passfrihet i Europa",
    "Lexin023612": "Lag som inte är skriven utan bygger på tradition",
    "Lexin023615": "Gammal vana som blivit som en regel",
    "Lexin023616": "Praxis eller tradition",
    "Lexin023653": "Hemlighållande av uppgifter",
    "Lexin023659": "Mål där uppgifterna är hemliga",
    "Lexin023697": "När man svarar ja på ett anbud för sent (gäller som nytt anbud)",
    "Lexin023781": "Rätt att använda en del av grannens tomt (t.ex. väg)",
    "Lexin023782": "Rätt att nyttja annans fastighet",
    "Lexin023783": "Servitut",
    "Lexin023784": "Krav för att bilda servitut",
    "Lexin023816": "Oönskade inviter eller tafsande på jobbet",
    "Lexin023817": "Brott: att blotta sig eller tafsa på någon (under 15 år eller allmänt)",
    "Lexin023819": "Brott mot barn (sexuellt)",
    "Lexin023820": "Att utnyttja någon som är beroende (t.ex. patient, elev)",
    "Lexin023824": "Våldtäkt mot barn",
    "Lexin023861": "Att skriva någon annans namn",
    "Lexin023862": "Personer som blivit skadade med kniv"
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
