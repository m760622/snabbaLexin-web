
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch11.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin004612": "Samling av föreskrifter och råd för byggande (äldre begrepp)",
    "Lexin004614": "Kommunal nämnd som beslutar i byggfrågor",
    "Lexin004615": "Tillfällig konstruktion för att nå höga höjder vid bygge",
    "Lexin004616": "Klassificering av byggnad baserat på användning eller utformning",
    "Lexin004617": "Färdigställt byggnadsprojekt (ofta större anläggning)",
    "Lexin004620": "Standard eller regel för byggande",
    "Lexin004621": "Hela processen från idé till färdig byggnad",
    "Lexin004622": "Bestämmelser som styr utförandet av byggprojekt",
    "Lexin004623": "Rätten att bygga på en viss plats enligt plan",
    "Lexin004624": "Möte med kommunen för att gå igenom byggprojektet",
    "Lexin004625": "Tidpunkten då byggarbetet påbörjas",
    "Lexin004626": "Undersökning av byggnadens tekniska status",
    "Lexin004627": "Tiden det tar att färdigställa bygget",
    "Lexin004628": "Utrustning för att torka ut fukt ur byggnaden",
    "Lexin004660": "Böjd konstruktion (t.ex. i valv eller fönster)",
    "Lexin004662": "Såg för metall med bygel (båge)",
    "Lexin004702": "Verktyg för att bända eller bryta",
    "Lexin004705": "Arbetsyta i kök eller verkstad",
    "Lexin004711": "Del av byggnad som bär last",
    "Lexin004712": "System av bärande delar i en byggnad",
    "Lexin004722": "Förmåga att bära last utan att gå sönder",
    "Lexin004723": "Indelning av mark eller konstruktion efter bärighet",
    "Lexin004725": "Riktning angiven i grader (kompassriktning)",
    "Lexin004727": "Lager av material som bär upp överbyggnaden (t.ex. väg)",
    "Lexin004728": "Grusmaterial avsett för bärlager",
    "Lexin004729": "Förtillverkad del till bärlagret",
    "Lexin004730": "Form för att gjuta bärlagret",
    "Lexin004731": "Tjockleken på bärlagret",
    "Lexin004732": "Primär bärande balk",
    "Lexin004733": "Läkt som bär upp takpannor eller fasadmaterial",
    "Lexin004739": "Hela den bärande stommen i ett byggnadsverk",
    "Lexin004757": "Verktyg för att böja rör utan att de knäcks",
    "Lexin004805": "Datorstödd konstruktion och design",
    "Lexin004806": "Datafil som innehåller en CAD-ritning",
    "Lexin004807": "Digital 3D-modell skapad i CAD",
    "Lexin004808": "Programvara för att rita och konstruera",
    "Lexin004809": "Ritning skapad med hjälp av CAD",
    "Lexin004834": "Tak för bil, ofta utan väggar",
    "Lexin004850": "Betong med luftporer för isolering (lättbetong)",
    "Lexin004866": "Isoleringsmaterial av plastskum (frigolit)",
    "Lexin004871": "Isolering tillverkad av återvunnet papper/träfiber",
    "Lexin004875": "Maskin för att blanda cement och vatten",
    "Lexin004876": "Bruk baserat på cement",
    "Lexin004877": "Blandning av cement och vatten (bindemedel)",
    "Lexin004878": "Vattning blandning av cement",
    "Lexin004879": "Tunnflytande blandning av cement och vatten",
    "Lexin004880": "Skiva av träspån bunden med cement",
    "Lexin004881": "Metod att förstärka jord med cement",
    "Lexin004882": "Produktion av cement",
    "Lexin004883": "Europeiska standardiseringsorganisationen",
    "Lexin004893": "Längdmått (en hundradels meter)",
    "Lexin004909": "Avstånd mellan mitten på två detaljer (t.ex. reglar)",
    "Lexin004918": "Godkännande enligt viss standard",
    "Lexin004920": "Dokument som intygar kompetens eller kvalitet",
    "Lexin004976": "Såg med runt, roterande sågblad",
    "Lexin004981": "Luft som återförs till lokalen (återluft)",
    "Lexin005022": "Utsläpp av koldioxid som påverkar klimatet",
    "Lexin005066": "Väg avsedd för cykeltrafik",
    "Lexin005067": "Låst utrymme för parkering av cyklar",
    "Lexin005068": "Plats där cykelbana korsar väg",
    "Lexin005139": "Regn- och smältvatten som rinner på hårdgjorda ytor",
    "Lexin005140": "Brunn för att samla upp dagvatten",
    "Lexin005143": "Lågt område mellan höjder (t.ex. på tak)",
    "Lexin005161": "Små partiklar i luften",
    "Lexin005162": "Konstruktion för att däma upp vatten",
    "Lexin005165": "Filter som fångar upp damm",
    "Lexin005166": "Processen att rena luft från damm",
    "Lexin005167": "Mängden damm i luften",
    "Lexin005171": "Yta som torkat så pass att damm inte fastnar",
    "Lexin005209": "Elektronisk utrustning för databehandling",
    "Lexin005248": "Fel eller brist i material eller utförande",
    "Lexin005257": "Förändring av form på grund av last",
    "Lexin005355": "Massa per volymenhet (t.ex. kg/m3)",
    "Lexin005360": "Att lämna avfall på soptipp",
    "Lexin005361": "Plan för hur fyllnadsmassor ska placeras",
    "Lexin005362": "Upplagsplats för avfall (soptipp)",
    "Lexin005391": "Formgivning och utseende",
    "Lexin005392": "Den grundläggande idén för utformningen",
    "Lexin005409": "Ren framställd asfalt",
    "Lexin005410": "Ren framställd tjära",
    "Lexin005431": "Liten eller specifik del av en konstruktion",
    "Lexin005433": "Hur noggrant något beskrivs eller ritas",
    "Lexin005435": "Försäljning direkt till konsument",
    "Lexin005436": "Kommunal plan som styr byggandet i ett område",
    "Lexin005437": "Ritning som visar en detalj i stor skala",
    "Lexin005439": "Tidsplan som visar aktiviteter noggrant",
    "Lexin005442": "Kabel i marken som känner av fordon (vid trafikljus/bom)",
    "Lexin005450": "Hård, mörk bergart (svart granit)",
    "Lexin005466": "Maskin som kan gräva snett",
    "Lexin005468": "Grafisk presentation av data",
    "Lexin005473": "Borr med diamantspets för hårda material",
    "Lexin005475": "Måttet tvärs över en cirkel",
    "Lexin005476": "Tjockleken på ett rör eller en stång",
    "Lexin005526": "Fog som tillåter material att röra sig vid temp.växlingar",
    "Lexin005532": "Mått på en byggdel (längd, bredd, höjd)",
    "Lexin005533": "De förutsättningar man utgår från vid beräkning",
    "Lexin005534": "Kraven som ställs på konstruktionen",
    "Lexin005535": "Hur mycket måtten får avvika från ritningen",
    "Lexin005555": "Kostnader direkt kopplade till produktionen (material, lön)",
    "Lexin005563": "Företagsledare"
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
