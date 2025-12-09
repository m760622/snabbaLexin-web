
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch49.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin028286": "Land där man söker asyl",
    "Lexin028322": "Bilstöld (att ta ett fordon utan lov)",
    "Lexin028329": "Egendom (pengar, hus, bilar)",
    "Lexin028332": "Kronofogdens utredning om man har pengar",
    "Lexin028333": "Utredning om tillgångar",
    "Lexin028352": "Att officiellt meddela eller ge rätt",
    "Lexin028367": "Tillräckligt med pengar för att försörja sig",
    "Lexin028368": "Godtagbara skäl",
    "Lexin028393": "Enhet som ger tillstånd (t.ex. vapenlicens)",
    "Lexin028402": "Beslut av en tillsynsmyndighet (t.ex. IVO)",
    "Lexin028414": "Den som är åtalad för ett brott",
    "Lexin028423": "Dagen då man får nycklarna till huset/lägenheten",
    "Lexin028424": "Förbud att besöka en plats (t.ex. en butik eller arena)",
    "Lexin028477": "Första domstolen i de flesta mål",
    "Lexin028479": "Underrätter",
    "Lexin028562": "Fastighet som belastas av ett servitut (grannens rätt)",
    "Lexin028582": "Platsen där man arbetar",
    "Lexin028614": "Person som översätter tal direkt",
    "Lexin028615": "Utrustning för tolkning (t.ex. hörlurar)",
    "Lexin028618": "Ed som tolken svär att översätta rätt",
    "Lexin028624": "Prislista för tolkar",
    "Lexin028625": "Jobb som tolk",
    "Lexin028643": "Rätt att ha hus på kommunens mark mot avgift",
    "Lexin028645": "Avgiften (hyran) för tomträtt",
    "Lexin028646": "Den som har tomträtten",
    "Lexin028695": "Yrkesmördare eller indrivare",
    "Lexin028729": "Överlämna besittningen av en sak",
    "Lexin028732": "Överlämnande (krav för sakrättsligt skydd vid köp)",
    "Lexin028737": "Lagen om straff för trafikbrott (rattfylleri m.m.)",
    "Lexin028762": "Geografiskt område (traktamente)",
    "Lexin028793": "Avdelning för asylsökande som bara passerar",
    "Lexin028808": "Kriminalvårdens transporttjänst (NTP)",
    "Lexin028809": "Transporter av intagna",
    "Lexin028810": "Företag som fraktar gods",
    "Lexin028848": "Att stycka av en lägenhet som egen fastighet (ägarlägenhet)",
    "Lexin028850": "Arvingar i tredje ledet (far- och morföräldrar)",
    "Lexin028913": "På heder och samvete",
    "Lexin028932": "Brott mot rikets säkerhet (förräderi i förhandling)",
    "Lexin028993": "Brott i en tidning eller bok (t.ex. förtal)",
    "Lexin029028": "Ekonomiska problem (obestånd)",
    "Lexin029124": "Avgift vid import av varor",
    "Lexin029128": "Datorsystem för tull",
    "Lexin029130": "Plats där man förtullar varor",
    "Lexin029131": "Processen att anmäla varor till tullen",
    "Lexin029132": "Tullverket",
    "Lexin029133": "Myndigheten som sköter tull och gränsskydd",
    "Lexin029134": "Anställd på tullen",
    "Lexin029135": "Statliga verket för tullfrågor",
    "Lexin029210": "Uppehållstillstånd som gäller viss tid",
    "Lexin029222": "Att vara gift med två samtidigt (olagligt)",
    "Lexin029223": "Bigami",
    "Lexin029224": "Brottet att gifta sig när man redan är gift",
    "Lexin029240": "När två parter inte är överens juridiskt",
    "Lexin029250": "Mål med två motstående parter (tvistemål)",
    "Lexin029254": "Jäv för att man dömt i saken tidigare instans",
    "Lexin029258": "Att tvinga någon",
    "Lexin029260": "Slaveri eller arbete under hot",
    "Lexin029268": "När en skiftesman delar arvet mot arvingarnas vilja",
    "Lexin029277": "Process mellan två parter (kontradiktorisk)",
    "Lexin029358": "Förbud att berätta saker (sekretess)",
    "Lexin029494": "Rätt att träffa sina barn efter skilsmässa",
    "Lexin029498": "Lagenlig rätt till umgänge med barnet",
    "Lexin029501": "Att hålla sig undan polisen",
    "Lexin029512": "Regel som bryter mot huvudregeln",
    "Lexin029513": "När man inte behöver uppehållstillstånd (t.ex. EU-medborgare)",
    "Lexin029548": "Privat uppgörelse om skulder utan konkurs",
    "Lexin029554": "Pengar för försörjning (underhållsbidrag)",
    "Lexin029592": "Att inte larma eller hjälpa vid fara (brottsligt i vissa fall)",
    "Lexin029594": "Att låta bli att göra något (passivitet)",
    "Lexin029595": "Underlåtenhet att larma",
    "Lexin029596": "Att inte protestera mot ett fel (reklamation)",
    "Lexin029636": "Att en dom måste godkännas av högre instans (historiskt)",
    "Lexin029646": "Den som leder polisutredningen (FU-ledare)",
    "Lexin029647": "Köparens skyldighet att kolla varan/huset noga",
    "Lexin029650": "Namnteckning under ett dokument",
    "Lexin029651": "Att undanhålla bevis",
    "Lexin029653": "Att gömma eller förstöra ett viktigt papper",
    "Lexin029661": "Barn under 18 år",
    "Lexin029679": "Boende för unga vuxna",
    "Lexin029685": "Fängelse för unga (finns inte kvar i den formen)",
    "Lexin029689": "Vårdplan för unga lagöverträdare",
    "Lexin029694": "Obetalt arbete som straff för unga",
    "Lexin029716": "Den som ärver allt eller en kvotdel (inte saklegat)",
    "Lexin029751": "Indrivning av skatt",
    "Lexin029752": "Gamla lagen om skattebetalning",
    "Lexin029759": "Uppgift att utföra",
    "Lexin029760": "Avtal om tjänst (konsultavtal)",
    "Lexin029761": "Den som beställer jobbet",
    "Lexin029785": "Självklart eller tydligt (uppenbart ogrundat)",
    "Lexin029808": "Rapport om hur det gått",
    "Lexin029829": "Myndighet som stödjer offentlig upphandling",
    "Lexin029839": "Piratkopiering (brott mot upphovsrätten)",
    "Lexin029880": "Hyra ut eller låna ut",
    "Lexin029881": "Ge rätt att använda",
    "Lexin029887": "Tiden man får använda saken (hyrestid)",
    "Lexin029891": "Avsluta (t.ex. ett bolag)",
    "Lexin029921": "Väpnat uppror mot staten",
    "Lexin029922": "Myteri eller uppror",
    "Lexin029923": "Revolt",
    "Lexin029951": "Tillsyn eller kontroll"
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
