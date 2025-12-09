
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch23.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin028716": "Höjden på hela byggnaden",
    "Lexin028739": "Hur mycket trafik som passerar",
    "Lexin028745": "Lampa som styr trafiken (rött, gult, grönt)",
    "Lexin028749": "Skylt som visar trafikregler",
    "Lexin028773": "Golv av träribbor utomhus (altan)",
    "Lexin028775": "Olja för att skydda trätrall",
    "Lexin028797": "Öppenhet och tydlighet i processer",
    "Lexin028805": "Sätt att lösa transporter på",
    "Lexin028806": "Planering av hur gods och folk ska flyttas",
    "Lexin028816": "Lampor i trapphuset",
    "Lexin028817": "Konstruktion för att gå upp och ner",
    "Lexin028818": "Handledare och skydd vid trappa",
    "Lexin028819": "Lös stege som kan ställas upp (A-stege)",
    "Lexin028860": "List med tre sidor (för gjutformar eller tak)",
    "Lexin028910": "Att må bra på jobbet",
    "Lexin028957": "Gångbana vid sidan av gatan",
    "Lexin028995": "Metod att pressa in skyddsmedel i trä",
    "Lexin028997": "Borr som drivs av tryckluft",
    "Lexin029005": "Arbetsplats där man inte skadar sig",
    "Lexin029031": "Arbete med trämaterial",
    "Lexin029037": "Område med växter runt huset",
    "Lexin029039": "Uteplats byggd av trä (altan)",
    "Lexin029048": "Små bitar av hugget trä (bränsle)",
    "Lexin029051": "Lim för att fästa trä",
    "Lexin029073": "Skruv avsedd för trä",
    "Lexin029075": "Bärande stomme av trä",
    "Lexin029093": "När materialet försvagas av belastning",
    "Lexin029138": "Gammalt mått (2,54 cm)",
    "Lexin029168": "Väg eller rör genom berg eller under jord",
    "Lexin029170": "Tåg som går under jorden",
    "Lexin029298": "Väggar som går vinkelrätt mot huskroppen",
    "Lexin029367": "Förstärkning framme i skon",
    "Lexin029388": "Färg som täcker träets yta men visar strukturen",
    "Lexin029395": "Mjuk sten som håller värme bra (i kaminer)",
    "Lexin029437": "Band som tätar skarvar",
    "Lexin029439": "Lager som stoppar vatten (i badrum/tak)",
    "Lexin029535": "Entreprenör anlitad av huvudentreprenören",
    "Lexin029567": "Person som sköter underhåll",
    "Lexin029570": "Marken under ytan",
    "Lexin029571": "Att gräva ner kablar",
    "Lexin029586": "Mjuk plastfolie under laminatgolv",
    "Lexin029587": "Företag som levererar till en entreprenör",
    "Lexin029755": "Att göra något aktuellt igen",
    "Lexin029764": "Nivå dit avloppsvatten kan stiga vid stopp",
    "Lexin029807": "Att kolla vad som hände sen",
    "Lexin029815": "Regler för hur man ska uppföra sig (Code of Conduct)",
    "Lexin029820": "Sak som ska göras",
    "Lexin029828": "Processen att köpa in tjänster eller varor",
    "Lexin029841": "Att stoppa ett beslut eller avtal",
    "Lexin029906": "Som har mätts upp",
    "Lexin030036": "Att göra huset varmt",
    "Lexin030137": "Pengar som betalas ut",
    "Lexin030185": "Inglasat rum i anslutning till huset",
    "Lexin030194": "Yttervägg som inte är bärande",
    "Lexin030201": "Hur något ser ut eller är konstruerat",
    "Lexin030227": "Hål där man grävt",
    "Lexin030246": "Göra ytan jämn",
    "Lexin030255": "Byggnadsdel som sticker ut utan stöd under",
    "Lexin030305": "Markera var saker ska vara på marken",
    "Lexin030358": "Verktyg och maskiner",
    "Lexin030380": "Stöd som sticker ut",
    "Lexin030410": "Mäta ut var huset ska stå på tomten",
    "Lexin030418": "När allmänheten får tycka till om en plan",
    "Lexin030456": "Göra något bättre eller skapa nytt",
    "Lexin030594": "Tak med fall åt alla fyra sidor",
    "Lexin030726": "Spik med tjockt rostskydd för utomhusbruk",
    "Lexin030727": "Fläkt som blåser varmluft",
    "Lexin030730": "Vatten som värmts upp",
    "Lexin030731": "Panna som värmer vatten till element och kranar",
    "Lexin030736": "Skylt som varnar för fara",
    "Lexin030737": "Plastband för att spärra av område",
    "Lexin030744": "Försiktighet, särskilt vid renovering av gamla hus",
    "Lexin030750": "Kläder som syns bra (ofta gula/orange)",
    "Lexin030782": "Hur vattnet rinner bort",
    "Lexin030786": "Grävd kanal för vatten",
    "Lexin030792": "Systemet av vattenrör i staden",
    "Lexin030794": "Rörböj som stoppar lukt från avloppet",
    "Lexin030798": "Verktyg för att se om något är vågrätt",
    "Lexin030800": "Plats där man renar vatten",
    "Lexin030801": "Anläggning för dricksvatten eller avlopp",
    "Lexin030804": "Stort rör under väg för vatten",
    "Lexin030807": "Mängden vatten",
    "Lexin030816": "Högsta chefen för företaget",
    "Lexin030823": "Möte som hålls varje vecka",
    "Lexin030871": "Byte av luft i ett rum",
    "Lexin030894": "Vad det faktiskt kostade",
    "Lexin030906": "Det arbete man utför",
    "Lexin030908": "Del av verksamheten",
    "Lexin030923": "Låda för handverktyg",
    "Lexin030961": "Maskin som plattar till marken genom att vibrera",
    "Lexin030962": "Mätning av vibrationer vid sprängning",
    "Lexin030978": "Området precis bredvid vägen",
    "Lexin031113": "Skiva som leder luftströmmar vid takfoten",
    "Lexin031131": "Plåtränna där två takfall möts",
    "Lexin031133": "Maskin med roterande skiva för kapning/slipning",
    "Lexin031159": "Planering för byggande i kyla och snö",
    "Lexin031210": "Hur trögflytande en vätska är",
    "Lexin031343": "Värme, Ventilation och Sanitet",
    "Lexin031401": "Ett plan i ett flervåningshus",
    "Lexin031402": "Ritning över en våning"
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
