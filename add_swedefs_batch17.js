
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch17.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin012462": "ID-kort för personalliggare på byggarbetsplatser",
    "Lexin012598": "Virke behandlat för att motstå röta (tryckimpregnerat)",
    "Lexin012599": "Behandling av material för att göra det tåligt",
    "Lexin012641": "Som är en del av konstruktionen",
    "Lexin012750": "Tjänster kopplade till infrastruktur",
    "Lexin012752": "Grundläggande system som vägar och avlopp",
    "Lexin012815": "Metod att fylla hålrum med flytande massa",
    "Lexin012816": "Bruk som används vid injektering",
    "Lexin012832": "Att räkna med eller omfatta alla",
    "Lexin012855": "Att skaffa material eller tjänster",
    "Lexin012856": "Person som ansvarar för inköp",
    "Lexin012874": "Arbetet att lägga t.ex. matta eller rör",
    "Lexin012877": "Mätning för att bestämma läge eller storlek",
    "Lexin012909": "Vägg inne i byggnaden",
    "Lexin012924": "Temperaturen inne i huset",
    "Lexin013015": "Person som leder installationsarbetet",
    "Lexin013016": "Montör som utför installationer (el/VVS)",
    "Lexin013017": "Person som samordnar olika installatörer",
    "Lexin013018": "Företag eller person som utför installationer",
    "Lexin013025": "Karm som monteras i befintlig karm (vid byte)",
    "Lexin013098": "Rätt att få vara ifred; eller dataintegritet",
    "Lexin013110": "Samspelar med varandra",
    "Lexin013120": "Insidan av en byggnad",
    "Lexin013177": "Samtal med berörda parter",
    "Lexin013178": "Personer eller grupper som påverkas av projektet",
    "Lexin013276": "Handskar som skyddar mot el",
    "Lexin013277": "Verktyg isolerade för att klara spänning",
    "Lexin013278": "Skyddande skal runt strömförande delar",
    "Lexin013375": "Borrning i mark för undersökning eller pålning",
    "Lexin013382": "Maskin för att platta till jord",
    "Lexin013387": "Kabel avsedd att grävas ner",
    "Lexin013524": "Lika villkor för män och kvinnor",
    "Lexin013542": "Metalliskt grundämne; används i stål",
    "Lexin013552": "Spår för tåg",
    "Lexin013570": "Byggnad med kulturhistoriskt skydd",
    "Lexin013575": "Ränna att lägga kablar i",
    "Lexin013576": "Sax för att klippa kabel",
    "Lexin013582": "Ledningar för el eller data",
    "Lexin013599": "Plats vid vattnet där båtar lägger till",
    "Lexin013608": "Keramiska plattor för vägg",
    "Lexin013609": "Fästmassa för kakel",
    "Lexin013628": "Borste för att stryka på kalkfärg",
    "Lexin013629": "Bruk baserat på kalk (utan cement)",
    "Lexin013630": "Färg baserad på både kalk och cement",
    "Lexin013632": "Färg baserad på kalk",
    "Lexin013633": "Målning utförd med kalkfärg",
    "Lexin013635": "Tegelsten tillverkad av kalk och sand",
    "Lexin013636": "Bergart som består av kalk",
    "Lexin013638": "Beräkning av kostnad",
    "Lexin013641": "Processen att räkna ut kostnader",
    "Lexin013642": "Ingenjör som arbetar med kalkylering",
    "Lexin013648": "Asfalt som läggs kall (lagningsmassa)",
    "Lexin013657": "Kall luft som faller ner från fönster",
    "Lexin013705": "Spik med gängor för bättre fäste (ankarspik)",
    "Lexin013706": "Spik med kamgängor (ankarspik) - dubblett",
    "Lexin013717": "Rör eller kanaler för ledningsdragning",
    "Lexin013743": "Förstärkning av kanten på platta eller balk",
    "Lexin013748": "Sten som skiljer väg från trottoar",
    "Lexin013819": "Skruv för att fästa dörr- och fönsterkarmar",
    "Lexin013826": "Utveckling i yrkeslivet",
    "Lexin013829": "Avbildning av geografiskt område",
    "Lexin013867": "Förteckning över varor eller produkter",
    "Lexin013913": "Vilka ämnen ett material består av",
    "Lexin013920": "Material av bränd lera",
    "Lexin013922": "Plattor av keramik (kakel/klinker)",
    "Lexin014015": "U-formad fästanordning",
    "Lexin014017": "Verktyg för att skjuta fast klammer",
    "Lexin014089": "Innehåller lim eller klister (primer)",
    "Lexin014097": "System där golvbrädor hakas i varandra",
    "Lexin014106": "Förändring av jordens klimat",
    "Lexin014107": "Hot mot klimatet",
    "Lexin014108": "Påverkan på klimatet (utsläpp)",
    "Lexin014109": "Byggnadens skal (väggar, tak, grund) som isolerar",
    "Lexin014110": "Utmaning att minska klimatpåverkan",
    "Lexin014118": "Hårda keramiska plattor för golv",
    "Lexin014125": "Tång för att klippa av tråd eller kabel",
    "Lexin014129": "Pensel för att stryka på tapetklister",
    "Lexin014210": "Kvalitet, Miljö och Arbetsmiljö",
    "Lexin014373": "Utsläpp av växthusgasen CO2",
    "Lexin014385": "När en konstruktion rasar samman",
    "Lexin014390": "Arbetskamrat",
    "Lexin014405": "När två objekt stöter ihop",
    "Lexin014443": "Kyla för att ge behagligt inomhusklimat",
    "Lexin014449": "De som ska leva i framtiden",
    "Lexin014483": "Mark som ägs av kommunen",
    "Lexin014505": "Avdelning för information och PR",
    "Lexin014558": "Del av en helhet",
    "Lexin014560": "Material sammansatt av olika material",
    "Lexin014566": "Förband för att stoppa blödning",
    "Lexin014569": "Maskin som komprimerar luft eller gas",
    "Lexin014570": "Maskin som pressar ihop avfall",
    "Lexin014576": "Föremål med spetsig topp och rund bas (trafikkon)",
    "Lexin014591": "Högste chef för en koncern",
    "Lexin014595": "Komponenter som lagrar el",
    "Lexin014596": "Avfuktare som kondenserar vatten ur luften",
    "Lexin014647": "Förmåga att hävda sig mot konkurrenter",
    "Lexin014713": "Beräkningar av hållfasthet och stabilitet",
    "Lexin014714": "Del av den bärande stommen",
    "Lexin014715": "Ansvarig för konstruktionsritningar",
    "Lexin014716": "Ritning som visar hur huset ska byggas (K-ritning)"
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
