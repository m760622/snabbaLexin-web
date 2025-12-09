
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch6.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin000410": "Läran om ljud och dess utbredning",
    "Lexin000411": "Platta som används för att förbättra akustiken i ett rum",
    "Lexin000422": "Underhåll som måste göras omedelbart på grund av fel",
    "Lexin000431": "Vattenledningsbro; bro som leder vatten över en dal eller väg",
    "Lexin000437": "System som varnar vid fara, t.ex. inbrott eller brand",
    "Lexin000477": "Nisch eller fördjupning i väggen, ofta för säng",
    "Lexin000478": "Färg baserad på alkydolja som bindemedel",
    "Lexin00486": "Väg kantad av träd på båda sidor", // Corrected ID from Lexin000486? No, file says Lexin000486. Let's stick to file ID.
    // Note: I will trust the JSON IDs.
    "Lexin000486": "Väg som kantas av träd",
    "Lexin000496": "Ämne som framkallar allergi",
    "Lexin000529": "Egendom som ägs av det allmänna (stat/kommun)",
    "Lexin000535": "Kostnad som inte är direkt kopplad till en specifik produkt (t.ex. administration)",
    "Lexin000539": "Plats som är tillgänglig för alla (t.ex. torg, park)",
    "Lexin000549": "Ventilation som omsätter luften i hela lokalen",
    "Lexin000571": "Standardiserade bestämmelser för avtal inom byggbranschen",
    "Lexin000579": "Regler som gäller för ordning och säkerhet på en plats",
    "Lexin000586": "Rekommendationer från myndighet om hur regler bör tillämpas",
    "Lexin000589": "Mark som ägs gemensamt av flera fastigheter",
    "Lexin000592": "Som drivs utan vinstintresse, ofta om bostadsbolag",
    "Lexin000596": "Krav på kvalitet som gäller generellt för projektet",
    "Lexin000598": "Vattenområde som är tillgängligt för allmänheten",
    "Lexin000604": "Rum för samvaro och gemensamma aktiviteter",
    "Lexin000633": "Material som avsatts av rinnande vatten (sediment)",
    "Lexin000634": "Jord som bildats av alluviala avlagringar",
    "Lexin000640": "Risk som kan leda till allvarlig skada eller dödsfall",
    "Lexin000654": "Upphöjd uteplats, ofta utan tak",
    "Lexin000664": "Energi från förnybara källor (ej fossil)",
    "Lexin000666": "Håltagning där hålen är förskjutna i rader",
    "Lexin000668": "Instrument för mätning av höjd över havet",
    "Lexin000669": "Höjd över havet",
    "Lexin000672": "Cementtyp med hög motståndskraft mot värme och kemikalier",
    "Lexin000673": "Bindemedel i aluminatcement",
    "Lexin000674": "Beläggning av aluminium på annat material",
    "Lexin000676": "Tunn folie av aluminium, används bl.a. som ångspärr",
    "Lexin000677": "Plåt tillverkad av aluminium",
    "Lexin000678": "Kemikalie som används bl.a. vid vattenrening",
    "Lexin000679": "Skifferart som innehåller alun och ibland uran",
    "Lexin000681": "Referensverk för tekniska beskrivningar i byggbranschen",
    "Lexin000701": "Organiskförening som härrör från ammoniak",
    "Lexin000706": "Färglös gas med stark lukt, används i kylsystem",
    "Lexin000719": "Lån där man bara betalar ränta under en period",
    "Lexin000720": "Lån där man betalar både ränta och amortering vid varje betalningstillfälle",
    "Lexin000722": "Plan för arbetsmiljöarbetet på en byggarbetsplats",
    "Lexin000752": "Undersöka noggrant för att förstå sammansättning eller funktion",
    "Lexin000754": "Beräkning av dimensioner baserad på teoretisk analys",
    "Lexin000774": "Ansökan om att få lämna anbud i en upphandling",
    "Lexin000775": "Avtal om hur anbud ska hanteras",
    "Lexin000776": "Förfrågan om att inkomma med anbud",
    "Lexin000777": "Följebrev till ett anbud",
    "Lexin000778": "Blankett för att lämna anbud",
    "Lexin000779": "Processen för att hämta in och utvärdera anbud",
    "Lexin000780": "Officiell förfrågan till leverantörer att lämna pris",
    "Lexin000781": "Säkerhet som lämnas för att garantera anbudet",
    "Lexin000783": "Granskning av inkomna anbud",
    "Lexin000784": "Handling som ingår i anbudsunderlaget eller anbudet",
    "Lexin000785": "Ekonomisk beräkning som ligger till grund för anbudet",
    "Lexin000786": "Otillåtet samarbete mellan anbudsgivare",
    "Lexin000787": "Det totala priset i ett anbud",
    "Lexin000788": "Den skrivna texten i ett anbud",
    "Lexin000789": "Tiden då anbudet är giltigt och bindande",
    "Lexin000790": "Tävling där flera företag lämnar anbud",
    "Lexin000791": "Underlag som beskriver vad som ska upphandlas",
    "Lexin000792": "Utvärdering av vilket anbud som är bäst",
    "Lexin000793": "Officiell öppning av inkomna anbud",
    "Lexin000805": "Del av en helhet",
    "Lexin000807": "Boendeform där man äger en andel av fastigheten/tiden",
    "Lexin000809": "Lägenhet i ett andelshus",
    "Lexin000825": "Skyddsutrustning för att förhindra inandning av skadliga ämnen",
    "Lexin000846": "Instrument som mäter vindhastighet",
    "Lexin000891": "Ved som skadats av t.ex. röta eller insekter",
    "Lexin000894": "Virke som har angripits av skadegörare",
    "Lexin000900": "Gata som används för att nå en fastighet",
    "Lexin000901": "Plats avsedd för att stanna och lasta/lossa",
    "Lexin000932": "Bjälke som används för att förankra konstruktioner",
    "Lexin000934": "Järn som används för förankring",
    "Lexin000935": "Skruv som används för att fästa i betong eller sten",
    "Lexin000936": "Avslutning på en förankringskonstruktion",
    "Lexin000937": "Räfflad spik för starkare fäste (t.ex. i balkskor)",
    "Lexin000938": "Verktyg för att skjuta fast ankarspik",
    "Lexin000954": "Signal som visar att hissen har kommit",
    "Lexin000965": "System av byggnader, vägar eller maskiner",
    "Lexin000966": "Arbete med att bygga vägar, broar och mark",
    "Lexin000967": "Anläggningsarbete som utförs under markytan (t.ex. tunnlar)",
    "Lexin000969": "Avgift för anslutning till kommunalt nät (VA/EL)",
    "Lexin000970": "Fastighet som är taxerad som industrimark eller liknande",
    "Lexin000971": "Konstruktör specialiserad på anläggningsbyggnad",
    "Lexin000972": "Tillstånd som krävs för vissa anläggningsarbeten",
    "Lexin000973": "Tillfällig väg för byggtrafik",
    "Lexin000974": "Ytan som en anläggning upptar",
    "Lexin000980": "Uppmaning eller krav från myndighet",
    "Lexin000992": "Period då man kan anmäla sig",
    "Lexin000997": "Påpekande om fel eller brist vid besiktning",
    "Lexin001007": "Sidobyggnad eller tillbyggnad",
    "Lexin001009": "Meddelande i tidning eller webb (här om upphandling)",
    "Lexin001010": "Sätta in en annons",
    "Lexin001015": "Lån med konstant belopp att betala (ränta + amortering)",
    "Lexin001017": "Den positiva elektroden i en elektrolytisk cell",
    "Lexin001038": "Process för att öka halten av ett ämne i malm",
    "Lexin001039": "Signal för att kalla på hissen för färd nedåt",
    "Lexin001041": "Knapp för att kalla på hissen",
    "Lexin001049": "Del av väg eller konstruktion där en förändring börjar"
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
