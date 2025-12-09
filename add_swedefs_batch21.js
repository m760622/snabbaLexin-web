
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch21.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin022203": "Priset för att laga något",
    "Lexin022220": "Person som talar för ett företag eller en grupp",
    "Lexin022250": "Utgifter för resor i arbetet",
    "Lexin022267": "Pengar undanlagda för oförutsedda utgifter",
    "Lexin022280": "Elektrisk last som bara ger värme (som ett element)",
    "Lexin022281": "Komponent som ger motstånd i elektrisk krets",
    "Lexin022305": "Att visa hänsyn mot andra",
    "Lexin022331": "Att vara sparsam med material och energi",
    "Lexin022470": "Justera så att det blir rakt",
    "Lexin022479": "Punkt med känd höjd att mäta utifrån",
    "Lexin022556": "Bild som visar hur man ska bygga",
    "Lexin022572": "Nedmontering av hus eller byggdelar",
    "Lexin022573": "Krav från myndighet att man måste riva",
    "Lexin022574": "Tillstånd att få riva en byggnad",
    "Lexin022575": "Beskrivning av hur rivningen ska gå till",
    "Lexin022601": "Verktyg för att rulla på färg",
    "Lexin022621": "Plats där vägar möts i en cirkel (även sliprondell)",
    "Lexin022717": "Utrymme innanför väggar",
    "Lexin022735": "Pelare som är cirkelformad",
    "Lexin022750": "Timmerstockar (inte sågade)",
    "Lexin022751": "Verktyg för att hyvla runda former",
    "Lexin022865": "Mark som inte har bearbetats än",
    "Lexin022918": "Olja direkt från marken (ej raffinerad)",
    "Lexin022926": "Brädor som spontats (ofta ohyvlade på en sida)",
    "Lexin022947": "Spik med räfflor för att sitta bättre",
    "Lexin022976": "Priset för att låna pengar",
    "Lexin023157": "Att utsätta trä för rök (eller tobaksrökning)",
    "Lexin023176": "Lång cylinder för vätska eller gas",
    "Lexin023182": "Delar till rörsystem (böjar, kopplingar)",
    "Lexin023184": "Hålets storlek i röret",
    "Lexin023190": "När något flyttar sig eller ändras",
    "Lexin023191": "Fog som tillåter material att röra sig",
    "Lexin023196": "Ränta som ändras ofta",
    "Lexin023199": "Kostnad som beror på hur mycket man gör",
    "Lexin023201": "Hantverkare som jobbar med vatten och avlopp",
    "Lexin023218": "Sjukdom i trä som gör det mjukt",
    "Lexin023247": "Vanligt tak som lutar åt två håll",
    "Lexin023293": "Den som äger fastigheten eller blir påverkad",
    "Lexin023473": "Filter med sand som renar vatten",
    "Lexin023479": "Vägg med isolering mellan två lager betong",
    "Lexin023481": "Rengöring från farliga ämnen (t.ex. asbest)",
    "Lexin023559": "Grävning och flyttning av jordmassor",
    "Lexin023567": "Ytbehandling med schellack (mot kvistar)",
    "Lexin023663": "Ritning som visar huset genomskuret",
    "Lexin023681": "Ledighet med lön",
    "Lexin023710": "Mycket erfaren projektledare",
    "Lexin023774": "Tekniker som lagar maskiner",
    "Lexin023779": "Ledning från gatan in till huset",
    "Lexin023907": "Naturligt rundslipad småsten",
    "Lexin023917": "Att känna sig trygg",
    "Lexin023968": "Karta som visar husets placering på tomten",
    "Lexin024075": "Ventilation utan fläktar (varm luft stiger)",
    "Lexin024145": "Att ingen skadar sig",
    "Lexin024162": "Som kan orsaka skada eller sjukdom",
    "Lexin024186": "Förhållandet mellan ritning och verklighet",
    "Lexin024344": "Verktyg som kan ändra storlek på greppet",
    "Lexin024347": "Tunt lager av något",
    "Lexin024349": "Hur tjockt ett lager är (t.ex. färg)",
    "Lexin024372": "Vägg som delar av ett rum",
    "Lexin024497": "Kanal för att leda ut rök",
    "Lexin024499": "Plåtbeslag runt skorstenen på taket",
    "Lexin024513": "Vagn med ett hjul för att köra last",
    "Lexin024606": "Maskin för att dra i skruvar",
    "Lexin024608": "Handverktyg för skruv",
    "Lexin024712": "Regler för hur man skyddar sig",
    "Lexin024714": "Glasögon som skyddar ögonen",
    "Lexin024715": "Handskar som skyddar händerna",
    "Lexin024717": "Hård hatt som skyddar huvudet",
    "Lexin024727": "Material för att täcka och skydda ytor",
    "Lexin024730": "Person vald att bevaka arbetsmiljön",
    "Lexin024732": "Runda på bygget för att kolla säkerheten",
    "Lexin024735": "Rum som skyddar mot krig och bomber",
    "Lexin024736": "Skor med stålhätta och spiktramp",
    "Lexin024743": "Saker man har på sig för att inte skadas",
    "Lexin024748": "Spade med platt blad",
    "Lexin024795": "Skador av hett vatten eller ånga",
    "Lexin024895": "Hur bra grepp det är på ett golv",
    "Lexin024918": "Härdad spik som kan slås i betong",
    "Lexin024927": "Färgtyp som andas (t.ex. Falu Rödfärg)",
    "Lexin024992": "Maskin som gör ytor släta",
    "Lexin025009": "Det översta lagret på en väg",
    "Lexin025047": "Den sista kontrollen innan huset godkänns",
    "Lexin025048": "Besked från kommunen att man får flytta in",
    "Lexin025049": "Papper på att bygget är klart (gammalt begrepp)",
    "Lexin025050": "Papper som visar att bygget är godkänt",
    "Lexin025053": "Tank för avlopp som töms med slambil",
    "Lexin025080": "Det färdiga resultatet",
    "Lexin025090": "Mark som lutar",
    "Lexin025275": "List som täcker springan vid dörrkarmen",
    "Lexin025398": "Hantverkare som bygger i trä",
    "Lexin025440": "Ramla på fötterna",
    "Lexin025502": "Galler på taket som stoppar snö",
    "Lexin025578": "Listen längst ner på väggen (golvsockel)",
    "Lexin025642": "Ungdom som jobbar på sommaren",
    "Lexin025683": "Anläggning som sorterar grus eller sopor",
    "Lexin025707": "Fylla igen ojämnheter med massa",
    "Lexin025841": "Verktyg för att slå in spikskallen sista biten",
    "Lexin025842": "Maskin som skjuter i spik med tryckluft",
    "Lexin025843": "Plastplugg med färdig spik i",
    "Lexin025844": "Stålskiva i skon som skyddar mot spik"
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
