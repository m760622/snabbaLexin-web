
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch39.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);
console.log(`Loaded ${dictionaryData.length} entries.`);

const updates = {
    "Lexin011880": "Den som ger uppdraget (t.ex. till en advokat eller god man)",
    "Lexin011893": "Hem för vård eller boende (HVB-hem)",
    "Lexin011942": "Pant där saken stannar hos ägaren (t.ex. huslån)",
    "Lexin011954": "Kostnad för att få använda något (t.ex. bostad)",
    "Lexin011955": "Att hyra saker (t.ex. bil, verktyg)",
    "Lexin011957": "Kontrakt om hyra",
    "Lexin011958": "Bostadsbidrag",
    "Lexin011959": "Hus med lägenheter som hyrs ut",
    "Lexin011961": "Den som hyr",
    "Lexin011968": "Kapitel i lagboken om hyra",
    "Lexin011972": "Domstolsliknande instans för hyresfrågor",
    "Lexin011974": "Nämnder för hyrestvister",
    "Lexin012131": "Åklagarens begäran att någon ska häktas",
    "Lexin012132": "Skriftlig begäran om häktning",
    "Lexin012133": "Dokumentet där åklagaren ber rätten häkta någon",
    "Lexin012136": "Skäl för att hålla någon häktad (t.ex. risk för flykt)",
    "Lexin012138": "Hur länge någon suttit häktad",
    "Lexin012145": "Att dela lika (50/50) vid skilsmässa",
    "Lexin012184": "När polisen hämtar någon till förhör eller rättegång",
    "Lexin012250": "Fastighet som har rätt att använda en annans mark (servitut)",
    "Lexin012267": "Avsluta ett avtal omedelbart (vid avtalsbrott)",
    "Lexin012274": "Påstå eller göra gällande",
    "Lexin012308": "Brott mot rikets säkerhet (t.ex. förräderi)",
    "Lexin012309": "Mycket allvarligt brott mot staten",
    "Lexin012323": "Domstol man kan överklaga till",
    "Lexin012331": "Sveriges högsta domstol (HD)",
    "Lexin012391": "Dålig hörsel",
    "Lexin012403": "Liten högtalare i örat (används av tolkar/vakter)",
    "Lexin012456": "Vanligt brott (stöld, misshandel etc.)",
    "Lexin012458": "Nämndemän (dömer tillsammans med juristdomaren)",
    "Lexin012459": "Beslut under rättegången (ej själva domen)",
    "Lexin012472": "Ersättning för psykiskt lidande",
    "Lexin012473": "Föreningar för sport, hobby, kultur (ej vinstdrivande)",
    "Lexin012481": "Att sitta i förvar tills polisen vet vem man är",
    "Lexin012484": "Pass, körkort eller ID-kort",
    "Lexin012558": "Rättigheter till idéer, konst och uppfinningar",
    "Lexin012559": "Mål om patent, upphovsrätt och varumärken",
    "Lexin012609": "Vid osäkerhet ska man fria hellre än fälla (latin)",
    "Lexin012647": "Testamente mellan makar",
    "Lexin012659": "När värdet följer inflationen",
    "Lexin012670": "Likgiltighetsuppsåt",
    "Lexin012672": "När man inser risken men gör det ändå",
    "Lexin012674": "Tvingande lag (går ej att avtala bort)",
    "Lexin012677": "Straffets effekt på den dömde (ska avskräcka)",
    "Lexin012743": "Skyldighet att berätta",
    "Lexin012799": "Att stoppa ett beslut tillfälligt",
    "Lexin012809": "Början",
    "Lexin012837": "Belopp som används för att räkna ut pension",
    "Lexin012898": "Hur länge man ägt något",
    "Lexin012926": "Säkerhetskontroll vid entré (t.ex. till domstolen)",
    "Lexin012946": "Att åka in i landet",
    "Lexin012947": "Visum",
    "Lexin012948": "Passkontroll",
    "Lexin012969": "När man vet att något kommer hända som följd av handlingen",
    "Lexin012986": "Registrering i fastighetsregistret",
    "Lexin012987": "Domare som beslutar om lagfart och inteckning",
    "Lexin012988": "Hur man söker lagfart",
    "Lexin012991": "Systemet med lagfart och fastighetsregister",
    "Lexin012992": "Ärende om fastighet (ej tvist)",
    "Lexin013001": "När man inte kan betala sina skulder",
    "Lexin013023": "Nivå i rättssystemet (tingsrätt, hovrätt, HD)",
    "Lexin013074": "Fångar på anstalt",
    "Lexin013084": "Belåna fastighet",
    "Lexin013087": "Säkerhet i fast egendom",
    "Lexin013088": "Lån med huset som säkerhet",
    "Lexin013092": "Myndighet som jobbade med integration (nedlagd)",
    "Lexin013096": "Personlig sfär som ska respekteras",
    "Lexin013109": "Fotboja (IÖV)",
    "Lexin013114": "Tillfälligt (tills vidare)",
    "Lexin013116": "Beslut som gäller tills domen kommer",
    "Lexin013132": "Avdelning för internationella mål",
    "Lexin013133": "Lagar om vilket lands lag som gäller",
    "Lexin013134": "Regler mellan stater",
    "Lexin013135": "Folkrätt",
    "Lexin013136": "ICC (Haag)",
    "Lexin013137": "IRO (föregångare till UNHCR)",
    "Lexin013138": "Straff mot länder (t.ex. handelsblockad)",
    "Lexin013145": "Frågor från riksdagen till regeringen",
    "Lexin013147": "Internationellt polissamarbete",
    "Lexin013176": "När domaren har egenintresse i saken (jäv)",
    "Lexin013193": "Inbrott i kassaskåp eller låst utrymme",
    "Lexin013220": "Inflyttning till Sverige",
    "Lexin013289": "Rätt för barnbarn att ärva om föräldern är död",
    "Lexin013301": "Sista tiden av straffet med fotboja",
    "Lexin013313": "Tolked (löfte att tolka rätt)",
    "Lexin013314": "Vittnesed (löfte att tala sanning)",
    "Lexin013326": "Rätt att jaga på marken",
    "Lexin013327": "Tid på året då man får jaga",
    "Lexin013353": "Att ha två jobb",
    "Lexin013379": "Hyra av åkermark",
    "Lexin013381": "Gård, skog eller mark",
    "Lexin013393": "Markägare",
    "Lexin013398": "Domstol som tjänstgör på helger för häktningar",
    "Lexin013408": "Domstolen kan lagen (latin)",
    "Lexin013419": "Rättslig",
    "Lexin013450": "Läran om lag och rätt",
    "Lexin013452": "Rättsvetenskaplig litteratur",
    "Lexin013456": "Vårdnad om barn",
    "Lexin013461": "Utbildad domare (till skillnad från nämndeman)",
    "Lexin013472": "Regeringsdepartement för lag och rätt"
};

let count = 0;
dictionaryData.forEach(entry => {
    // console.log(`Checking ${entry[0]}`); // Too noisy
    if (updates[entry[0]]) {
        // console.log(`Updating ${entry[0]}`);
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
