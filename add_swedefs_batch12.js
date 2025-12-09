
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch12.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin005565": "Ändra väg för trafik eller ledning",
    "Lexin005588": "Ho i köksbänk för diskning",
    "Lexin005593": "Beräkning av nutida värde på framtida betalningar",
    "Lexin005641": "Chef för ett visst geografiskt distrikt inom företaget",
    "Lexin005642": "Person ansvarig för ekonomin i distriktet",
    "Lexin005834": "Luftström genom otäthet (eller kraft vid dragning)",
    "Lexin005836": "Balk som utsätts för dragkrafter",
    "Lexin005837": "Band av metall t.ex. för att hålla ihop takstol",
    "Lexin005838": "Last som drar ut materialet",
    "Lexin005841": "Verktyg för att dra elkabel i rör",
    "Lexin005849": "Kraften som drar i något",
    "Lexin005859": "Spänning i material orsakad av dragkraft",
    "Lexin005860": "Stång som tar upp dragkrafter",
    "Lexin005907": "Det att hålla en anläggning igång (förvaltning)",
    "Lexin005938": "Kemiska substanser (här kanske i betydelsen tillsatser/material)",
    "Lexin005945": "Plåt som leder bort vatten från t.ex. fönster",
    "Lexin005990": "Bortledning av vatten från marken",
    "Lexin005991": "Brunn som samlar upp dräneringsvatten",
    "Lexin005992": "Perforerat rör som leder bort grundvatten",
    "Lexin005993": "Hela systemet för att dränera en grund",
    "Lexin005994": "Vatten som leds bort genom dränering",
    "Lexin006007": "Böter som entreprenören betalar vid försening",
    "Lexin006029": "Spik med två huvuden för tillfälliga konstruktioner",
    "Lexin006061": "Materials förmåga att deformeras utan att spricka (seghet)",
    "Lexin006071": "Lastbil för transport av massor i terräng",
    "Lexin006112": "Spik med litet huvud för lister",
    "Lexin006125": "Träplugg för att foga samman virke",
    "Lexin006196": "Tyngden av byggnadens egna delar (stomme, tak)",
    "Lexin006226": "Egenvikt hos en konstruktion eller fartyg",
    "Lexin006237": "Öppningsbar skiva för att stänga en ingång",
    "Lexin006238": "Ramen som dörrbladet hänger i",
    "Lexin006240": "Den vertikala delen av en dörrkarm",
    "Lexin006241": "Hålet i väggen där dörren sitter",
    "Lexin006258": "Ritning som visar elinstallationer",
    "Lexin006292": "Behandling av yta efter gjutning eller bearbetning",
    "Lexin006313": "Härdning som fortsätter efter den första fasen",
    "Lexin006370": "Linjen som skiljer två fastigheter åt",
    "Lexin006375": "Entreprenörens kontroll av sitt eget arbete",
    "Lexin006387": "Krav på materialets funktion (t.ex. hållfasthet)",
    "Lexin006388": "Spänning som finns kvar i materialet efter tillverkning",
    "Lexin006414": "Hårt träslag som används till golv och inredning",
    "Lexin006434": "Bro för vilda djur över väg/järnväg",
    "Lexin006439": "Person som arbetar med ekonomi",
    "Lexin006444": "Gårdsbyggnad för jordbrukets behov (ladugård, maskinhall)",
    "Lexin006446": "Möte där ekonomiska frågor avhandlas",
    "Lexin006452": "Plan för föreningens eller projektets ekonomi",
    "Lexin006454": "Frågor som rör kostnader och lönsamhet",
    "Lexin006457": "Värden mätta i pengar",
    "Lexin006463": "Samspel mellan organismer och miljö",
    "Lexin006470": "Elektrisk ström",
    "Lexin006480": "Mått på materials styvhet",
    "Lexin006486": "När strömmen försvinner",
    "Lexin006489": "Förbränning som avger värme och ljus",
    "Lexin006495": "Material som tål mycket höga temperaturer (t.ex. i ugnar)",
    "Lexin006502": "Som drivs med elektricitet, inte bensin/diesel",
    "Lexin006506": "Plats för eldning inomhus (kamin/öppen spis)",
    "Lexin006515": "Person som installerar el",
    "Lexin006517": "Ledare som överför ström (t.ex. vid svetsning)",
    "Lexin006534": "Värmeelement (radiator) eller Byggdel (prefab)",
    "Lexin006535": "Hus byggt av prefabricerade moduler",
    "Lexin006546": "Tillförsel av elektricitet till en byggnad",
    "Lexin006547": "Spik som ytbehandlats med zink på elektrisk väg",
    "Lexin006550": "Montering av elutrustning och ledningar",
    "Lexin006554": "Kanal i plast eller metall för elkablar",
    "Lexin006555": "Apparat för att bryta eller sluta strömkrets",
    "Lexin006561": "Apparat som mäter elförbrukning",
    "Lexin006562": "Skåp där elmätaren sitter (fasadskåp)",
    "Lexin006563": "Ledningsnät för distribution av el",
    "Lexin006566": "Obehaglig stöt av elektricitet genom kroppen",
    "Lexin006567": "Kontakt i väggen för att ta ut ström",
    "Lexin006575": "Hård glashaltig beläggning på metall",
    "Lexin006580": "Förpackningsmaterial för skydd under transport",
    "Lexin006581": "Skräp från förpackningar",
    "Lexin006582": "Band av plast eller stål för att säkra godset",
    "Lexin006601": "Utsläpp av gaser eller partiklar till luften",
    "Lexin006655": "Förmåga att utföra arbete (el, värme)",
    "Lexin006656": "Varifrån energin kommer (sol, vind, vatten)",
    "Lexin006657": "Beräkning av en byggnads energianvändning",
    "Lexin006658": "Anläggningar för produktion av energi",
    "Lexin006659": "Hur mycket energi som går åt",
    "Lexin006660": "Att minska användningen av energi",
    "Lexin006661": "Minskad kostnad genom lägre energiförbrukning",
    "Lexin006662": "Intyg om byggnadens energiprestanda",
    "Lexin006663": "Åtgärder för att använda energin smartare",
    "Lexin006664": "Att vara sparsam med energin",
    "Lexin006665": "Ingenjör expert på energisystem",
    "Lexin006667": "Ursprunget till energin (t.ex. olja, vind)",
    "Lexin006668": "Att spara energi till senare (t.ex. i batteri)",
    "Lexin006669": "Mängd energi mätt i kWh eller Joule",
    "Lexin006671": "Byte från fossila till förnybara energikällor",
    "Lexin006673": "Hur effektivt en byggnad använder energi",
    "Lexin006675": "Skog som odlas för att bli bränsle",
    "Lexin006677": "Att ta tillvara energi ur t.ex. avfall",
    "Lexin006693": "Fönster med bara en glasruta (dålig isolering)",
    "Lexin006700": "Chef för en mindre enhet inom organisationen",
    "Lexin006731": "Hus med bara en våning (utan trappor)",
    "Lexin006752": "Eget avlopp och vatten (ej kommunalt)",
    "Lexin006754": "Väg som sköts av vägförening eller markägare",
    "Lexin006758": "Avloppsanläggning för ett hushåll",
    "Lexin006774": "Våningsplanet där huvudentrén finns"
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
