
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch43.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin018879": "Inget straff utan lag (latin)",
    "Lexin018880": "Inget brott utan lag (latin)",
    "Lexin018900": "Att skapa en helt ny fastighet av mark",
    "Lexin018950": "Den som har rätt att använda egendomen (t.ex. hyresgästen)",
    "Lexin018995": "Lekmannadomare i tingsrätt och hovrätt",
    "Lexin019020": "Rätten att starta och driva företag",
    "Lexin019037": "Polis som jobbar nära medborgarna i ett område",
    "Lexin019084": "Muntligt testamente vid nödsituation",
    "Lexin019100": "Person i livsfara eller stor nöd",
    "Lexin019128": "Slarv eller oförsiktighet (motsats till uppsåt)",
    "Lexin019156": "Tomt utan hus",
    "Lexin019168": "Att handskas med hemligheter man inte får se",
    "Lexin019169": "Brottslig hantering av hemlig information",
    "Lexin019199": "Beskrivning av det man säljer (t.ex. huset)",
    "Lexin019203": "Det som faktiskt hände vid brottet (handlingen)",
    "Lexin019209": "Regler om skulder och avtal",
    "Lexin019242": "Att ta emot pant till oskäligt hög ränta",
    "Lexin019249": "Att ta något som ingen äger",
    "Lexin019288": "Advokat som staten betalar i förvaltningsmål (tvångsvård mm)",
    "Lexin019292": "Grupptalan som drivs av en myndighet",
    "Lexin019294": "Regler mellan staten och medborgarna (t.ex. straffrätt, förvaltningsrätt)",
    "Lexin019295": "När staten eller kommunen köper varor/tjänster",
    "Lexin019296": "Regler för hur myndigheter köper saker",
    "Lexin019297": "Advokat i brottmål som betalas av staten",
    "Lexin019301": "OSL (lagen om vad som är hemligt hos myndigheter)",
    "Lexin019304": "Rätten att ta del av allmänna handlingar",
    "Lexin019305": "Insyn i myndigheternas arbete",
    "Lexin019306": "Organisationer som lyder under offentlig rätt",
    "Lexin019308": "Överenskommelse om skuldsanering som domstolen beslutar",
    "Lexin019309": "Ackord som tvingas fram i domstol",
    "Lexin019317": "Förslag till avtal (anbud)",
    "Lexin019321": "Principen att myndigheten/domstolen ska utreda ärendet själv",
    "Lexin019322": "Servitut som bildas av myndighet (lantmäteriet)",
    "Lexin019333": "Att ha hus på någon annans mark",
    "Lexin019334": "Byggnad på annans mark (lös egendom)",
    "Lexin019375": "Att domstolen säger nej till käromålet (den som stämde förlorar)",
    "Lexin019380": "Skäl till att ett avtal inte gäller (t.ex. tvång)",
    "Lexin019399": "Att inte lyda",
    "Lexin019400": "Att inte lyda polisen eller ordningsvakt",
    "Lexin019421": "Regel att otydliga avtal tolkas till nackdel för den som skrev det",
    "Lexin019439": "Att göra något bara för att jäklas",
    "Lexin019445": "Kidnappning eller att låsa in någon",
    "Lexin019446": "Stalkning (att förfölja och trakassera någon)",
    "Lexin019447": "Att hota någon med brott",
    "Lexin019449": "Piratkopiering (brott mot upphovsrätten)",
    "Lexin019451": "Att sprida filmer med grovt våld",
    "Lexin019453": "Att ladda ner eller dela upphovsrättsskyddat material",
    "Lexin019474": "Att stjäla fjärrvärme",
    "Lexin019475": "Att tjuvlyssna eller spela in samtal olovligt",
    "Lexin019476": "Att hantera falska sedlar",
    "Lexin019477": "Spioneribrott",
    "Lexin019478": "Brott mot vapenlagen (kemiska vapen)",
    "Lexin019479": "Innehav av minor",
    "Lexin019480": "Hantering av ämnen som man gör knark av",
    "Lexin019481": "Miljöbrott med kemikalier",
    "Lexin019482": "Att stjäla el",
    "Lexin019483": "Att bilda en privat armé eller milis",
    "Lexin019485": "Spioneri",
    "Lexin019486": "Spioneri för främmande makt",
    "Lexin019487": "Flyktingspionage",
    "Lexin019488": "Spioneri mot Sverige",
    "Lexin019489": "Att värva soldater till främmande makt",
    "Lexin019492": "T.ex. tvegifte eller äktenskap med barn",
    "Lexin019493": "Att ingå partnerskap olagligt (finns ej längre)",
    "Lexin019530": "Att göra om hyresrätter till bostadsrätter",
    "Lexin019537": "När advokaten inte får ta fallet pga intressekonflikt",
    "Lexin019539": "DO (ombudsman mot diskriminering)",
    "Lexin019551": "Att domen ska gälla direkt (behöver inte vänta på laga kraft)",
    "Lexin019552": "All bevisning måste läggas fram direkt under rättegången",
    "Lexin019553": "Principen att domen bara får grundas på det som sagts i salen",
    "Lexin019554": "Förundersökningen får inte ligga till grund för domen, allt måste tas om",
    "Lexin019574": "Domstolsförhandling varannan vecka för häktade",
    "Lexin019615": "Tittar på beslutet en gång till",
    "Lexin019623": "När domarna röstar om utgången i målet",
    "Lexin019679": "Person under 18 år (eller under förvaltare)",
    "Lexin019701": "Som kostar pengar eller kräver motprestation",
    "Lexin019720": "Neutral och rättvis",
    "Lexin019749": "Den som får betalt sist vid konkurs",
    "Lexin019750": "Fordringsägare utan säkerhet",
    "Lexin019784": "Den som leder förhandlingen",
    "Lexin019795": "Överklagande (till skillnad från resning)",
    "Lexin019796": "Vanliga sätt att klaga på en dom",
    "Lexin019806": "Regler för ordning (t.ex. på allmän plats)",
    "Lexin019807": "Uniformerad polis som patrullerar",
    "Lexin019808": "Den vanliga polisen",
    "Lexin019810": "Vakt med vissa polisbefogenheter (utbildad av polisen)",
    "Lexin019811": "Vakter som upprätthåller ordning",
    "Lexin019820": "Oärlighet",
    "Lexin019821": "Att lura borgenärerna t.ex. inför konkurs",
    "Lexin019822": "Bedrägligt beteende (mindre grovt bedrägeri)",
    "Lexin019828": "Svar ja, men med ändrade villkor (gäller som avslag och nytt anbud)",
    "Lexin019836": "Företagets personnummer",
    "Lexin019837": "Talan som förs av en organisation (t.ex. facket eller KO)",
    "Lexin019840": "Verksamhet med viss struktur",
    "Lexin019841": "Att organisera flyktingsmuggling",
    "Lexin019861": "Att bli ägare till något som ingen ägde innan",
    "Lexin019917": "Brott: att ljuga under ed i en skriftlig försäkran",
    "Lexin019921": "Att intyga något falskt i ett dokument (t.ex. passansökan)",
    "Lexin019922": "Att skriva och använda falska intyg",
    "Lexin019931": "Dödsbo som inte har delats upp än"
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
