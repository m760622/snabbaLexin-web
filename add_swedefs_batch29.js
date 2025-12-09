
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch29.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin006966": "Organisation för samarbete över gränserna inom EU",
    "Lexin018576": "Polisens experter på tekniska bevis (tidigare SKL)",
    "Lexin019149": "Läkare som utför obduktioner",
    "Lexin022535": "Som innebär en fara eller risk",
    "Lexin022540": "Genomgång av vilka risker som finns",
    "Lexin022542": "Hur stor risken bedöms vara",
    "Lexin023079": "Tandläkarexpertis inom rättsväsendet (identifiering)",
    "Lexin031812": "Gammalt namn på Arbetsmiljöverket",
    "Lexin032145": "Säljaren äger varan tills den är betald",
    "Lexin032146": "Att bli ägare genom att ha haft saken länge",
    "Lexin032147": "Utredning om vem som äger vad",
    "Lexin032216": "Brott begånget i tjänsten (tjänstefel)",
    "Lexin032283": "Brott som kränker någons ära (förtal)",
    "Lexin034196": "Tolkning efter att talaren pratat klart",
    "Lexin000833": "Domstol som prövar överklagade domar (Hovrätten)",
    "Lexin000888": "Brott mot person (misshandel, ofredande)",
    "Lexin000905": "Beslut av åklagare att låsa in misstänkt",
    "Lexin000990": "Skyldighet att anmäla (t.ex. oro för barn)",
    "Lexin001094": "Fängelse (anstalt)",
    "Lexin001130": "Skäl som gör att man slipper straff (t.ex. nödvärn)",
    "Lexin001438": "Att försöka försvara något som inte går att försvara",
    "Lexin001464": "Band runt armen (t.ex. ordningsvaktsbindel)",
    "Lexin001510": "Lokal hos polisen för tillfälligt frihetsberövade",
    "Lexin001511": "Militärt straff (historiskt)",
    "Lexin001942": "Att berätta vad man sett under ed i domstol",
    "Lexin002098": "Att sitta i fängelse den tid man dömts till",
    "Lexin002500": "Ta hänsyn till",
    "Lexin002735": "Polisens register över dömda personer",
    "Lexin002764": "Beslutar om kvarstad eller beslag",
    "Lexin002829": "Regeringen efterskänker ett straff",
    "Lexin002832": "Hela straffet tas bort i efterhand",
    "Lexin002833": "Akt där nåd beviljas",
    "Lexin002991": "Polisen tar hand om ett föremål",
    "Lexin003030": "Ger ett straff",
    "Lexin003122": "Krav på betalning via Kronofogden",
    "Lexin003540": "Domstolen säger att man inte är skyldig",
    "Lexin003569": "Slang för att bli sugen på narkotika",
    "Lexin003576": "Läkaren har konstaterat gonorré",
    "Lexin003677": "Sår som blöder (äldre juridisk term)",
    "Lexin003731": "Blåmärke",
    "Lexin004035": "Blankett för att redovisa dödsboets tillgångar",
    "Lexin004055": "Slangord för cannabis",
    "Lexin004236": "Beskrivning av vad som hänt vid brottet",
    "Lexin004247": "Misstanke om att ett brott begåtts",
    "Lexin004255": "Straffet blir mildare eller tas bort",
    "Lexin004256": "Villkor som måste uppfyllas för att det ska vara ett brott",
    "Lexin004257": "Vilken typ av brott det kallas (t.ex. stöld)",
    "Lexin004339": "Verktyg för inbrott (kofot)",
    "Lexin004569": "Kniv med delat skaft (förbjuden)",
    "Lexin004792": "Straff att betala pengar",
    "Lexin004796": "Dömer till böter",
    "Lexin004845": "Rum i fängelse eller häkte",
    "Lexin005127": "Böter baserade på inkomst",
    "Lexin005553": "Gärningsmannen ville uppnå effekten",
    "Lexin005746": "Domstolens beslut att upplösa äktenskapet",
    "Lexin006275": "Brott som kräver att en viss skada uppstått",
    "Lexin006305": "Att avstå från sin rätt",
    "Lexin006397": "Småhus som man äger själv",
    "Lexin006528": "Övervakning med fotboja istället för fängelse",
    "Lexin006617": "Ett formellt brev eller dokument",
    "Lexin006619": "En liten bindel runt armen (nedsättande)",
    "Lexin006716": "Enkelt läkarintyg (t.ex. om skador)",
    "Lexin006755": "Domstolen diskuterar domen utan åhörare",
    "Lexin006858": "Säger att man gjort brottet",
    "Lexin007175": "Man trodde fel om fakta",
    "Lexin007239": "Placerad i fosterhem",
    "Lexin007645": "Avtryck av fingrarna för identifiering",
    "Lexin007914": "Risk att den misstänkte rymmer",
    "Lexin008210": "Elektronisk övervakning",
    "Lexin008229": "Bildbevis",
    "Lexin008382": "Dom där den åtalade frias",
    "Lexin008403": "När intagna får vistas utanför fängelset",
    "Lexin008413": "Straff där man låses in",
    "Lexin008414": "Fängelsestraff",
    "Lexin008497": "Myndighet för straff utanför fängelse",
    "Lexin008583": "Hjälpt till att genomföra brottet",
    "Lexin008652": "Information om hur man överklagar",
    "Lexin008766": "Att hitta något och behålla det olagligt",
    "Lexin008859": "Straff där man berövas friheten",
    "Lexin008862": "Slang för fängelse/arrest",
    "Lexin008909": "Domstolen tror på vittnet",
    "Lexin008982": "Regler för de som sitter i fängelse",
    "Lexin009148": "Böter direkt av polisen som man måste godkänna",
    "Lexin009336": "Förhör med målsägande eller tilltalad i rätten",
    "Lexin009342": "Person som var med vid polisförhöret",
    "Lexin009444": "Order från chef (gör att man slipper ansvar ibland)",
    "Lexin009453": "Något som påstås vara brott men kanske inte är det",
    "Lexin009457": "Saker som gör brottet mindre allvarligt",
    "Lexin009488": "Säger att man inte gjort brottet",
    "Lexin009509": "Beslutar att makarna ska vänta 6 månader",
    "Lexin009634": "Tingsrätten (första domstolen)",
    "Lexin009706": "Saker som gör brottet mer allvarligt",
    "Lexin009746": "Att försöka göra ett brott men misslyckas",
    "Lexin009826": "Polisens utredning innan åtal",
    "Lexin009871": "Migrationsverket låser in person som ska utvisas",
    "Lexin010104": "Båda makarna vill skiljas",
    "Lexin010639": "Polisen tar fast en misstänkt (akut)",
    "Lexin010669": "Allvarlig anlagd brand",
    "Lexin010670": "Stöld som är extra allvarlig",
    "Lexin010681": "Rån med vapen eller våld"
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
