
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch22.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin025849": "Använt vatten från toalett, bad och disk",
    "Lexin025880": "Lucka för att reglera luftflöde",
    "Lexin025881": "Smala träribbor i staket eller räcke",
    "Lexin025901": "Att göra spår i brädor så de kan sättas ihop",
    "Lexin025934": "Söndrig del i material (klyfta)",
    "Lexin025968": "Verktyg för att sprutmåla",
    "Lexin025983": "Användning av sprängmedel för att ta bort berg",
    "Lexin025991": "Lister som delar in fönsterrutan i mindre fält",
    "Lexin026003": "Liten hyvel för finjustering",
    "Lexin026005": "Skiva av limmat sågspån",
    "Lexin026006": "Skruv speciellt för spånskivor",
    "Lexin026037": "Kraften när man spänner något",
    "Lexin026070": "Göra marken fastare (t.ex. med kalk)",
    "Lexin026116": "Stängsel av trä eller metall",
    "Lexin026133": "Bestämd nivå för kvalitet (t.ex. ISO)",
    "Lexin026158": "Besked från kommunen att man får börja bygga",
    "Lexin026230": "Tunn matta under golv för att dämpa ljud",
    "Lexin026233": "Åtgärder för att minska ljud från fotsteg",
    "Lexin026251": "Hårt material från berggrunden",
    "Lexin026256": "Hantverkare som formar eller lägger sten",
    "Lexin026260": "Svart sten som används som bränsle",
    "Lexin026261": "Att skydda gammal sten från att vittra",
    "Lexin026265": "Hantverkare som lägger gatsten",
    "Lexin026267": "Isolering gjord av smält sten",
    "Lexin026301": "Smalsågig maskin för figursågning",
    "Lexin026390": "Den bärande konstruktionen i ett hus",
    "Lexin026391": "Systemet för hur stommen är uppbyggd",
    "Lexin026488": "Skyddat område vid vatten där man inte får bygga",
    "Lexin026491": "Långsiktig plan",
    "Lexin026493": "Plan för hur företaget ska växa och utvecklas",
    "Lexin026494": "Kunder som är extra viktiga på sikt",
    "Lexin026558": "Som har en tydlig struktur eller yta",
    "Lexin026626": "Läkt som ligger vertikalt under bärläkten (för luftning)",
    "Lexin026629": "Elektroner som rör sig (elektricitet)",
    "Lexin026712": "Rör som leder ner regnvatten från takrännan",
    "Lexin026737": "Lagar och regler som styr projektet",
    "Lexin026743": "Grupp som leder ett bolag eller förening",
    "Lexin026744": "Möte med styrelsen",
    "Lexin026778": "Järn legerat med kol för att bli starkt",
    "Lexin026780": "Arbetare som monterar stålkonstruktioner",
    "Lexin026781": "Bro byggd av stål",
    "Lexin026782": "Byggnadsdelar av stål (balkar, pelare)",
    "Lexin026794": "Var man står i en fråga eller plats",
    "Lexin026868": "Verktyg för att hugga ut trä",
    "Lexin026889": "Stötta för att hålla uppe valv eller form",
    "Lexin026930": "Mur som håller undan jordmassor",
    "Lexin027048": "Resultatet av en addition",
    "Lexin027107": "Hus i en slänt med delvis nedsänkt våning",
    "Lexin027219": "Person som arbetar med svetsning",
    "Lexin027220": "Utrustning för att svetsa",
    "Lexin027221": "Skydd för ansiktet vid svetsning",
    "Lexin027442": "Att ha ett arbete",
    "Lexin027448": "Sättet delar hänger ihop på",
    "Lexin027452": "Hur bra systemet fungerar",
    "Lexin027455": "Övergripande beskrivning av tekniska system",
    "Lexin027481": "Verktyg för att kapa trä eller metall",
    "Lexin027577": "Metoder som minskar risken för olyckor",
    "Lexin027582": "Arbetet med att sälja",
    "Lexin027814": "Det som täcker huset upptill",
    "Lexin027817": "Stor träregel i takkonstruktionen",
    "Lexin027818": "Lutningen på taket",
    "Lexin027819": "Den del av taket som sticker ut utanför väggen",
    "Lexin027820": "Fönster monterat i taket",
    "Lexin027821": "Avståndet från golv till tak",
    "Lexin027822": "När man firar att taket är på plats (taklagsfest)",
    "Lexin027823": "Fönsterkupol eller lanternin",
    "Lexin027824": "Arbetet att lägga nytt tak",
    "Lexin027825": "Högsta punkten på huset (nocken)",
    "Lexin027826": "Plattor av tegel eller betong för tak",
    "Lexin027828": "Ränna som samlar upp vatten vid takfoten",
    "Lexin027829": "Balkar som bär upp taket (takstolar)",
    "Lexin027830": "Stege fastmonterad på taket",
    "Lexin027831": "Den triangelformade konstruktionen som bär taket",
    "Lexin027838": "Materialet ytterst på taket (pannor, plåt, papp)",
    "Lexin027883": "Vält med vals både fram och bak",
    "Lexin027941": "Papper eller väv för väggar",
    "Lexin027942": "Linjal för att skära tapet rakt",
    "Lexin027959": "Varmvatten i kranen",
    "Lexin028046": "Bränd lera för murning",
    "Lexin028047": "Vägg murad av tegel",
    "Lexin028049": "Enstaka sten av tegel",
    "Lexin028060": "Möte med kommunen om tekniska krav",
    "Lexin028105": "Byggnader som bara ska stå en kort tid",
    "Lexin028118": "Kikare för att mäta vinklar noga",
    "Lexin028145": "Uteplats, ofta upphöjd",
    "Lexin028175": "Att prova om det fungerar",
    "Lexin028177": "Analys av testresultat",
    "Lexin028237": "Stark elsåg som sågar fram och tillbaka",
    "Lexin028272": "Händelse som kunde blivit en olycka",
    "Lexin028273": "Ny del som byggs på huset",
    "Lexin028308": "Ge eller lägga till",
    "Lexin028391": "Tillstånd att bygga (bygglov)",
    "Lexin028436": "Att göra produkter",
    "Lexin028495": "Vagn som kan tippa lasset",
    "Lexin028596": "WC-stol eller rummet den står i",
    "Lexin028637": "Markbit där man bygger hus",
    "Lexin028640": "Karta över tomtens gränser",
    "Lexin028667": "Mätning av markens höjder och former",
    "Lexin028693": "Grund med uteluft under bjälklaget (krypgrund)",
    "Lexin028714": "Entreprenad där byggaren ansvarar för allt (även projektering)"
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
