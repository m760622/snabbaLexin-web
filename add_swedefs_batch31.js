
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch31.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin020423": "Extra pengar till pensionärer med låg pension",
    "Lexin020424": "Tillägg till pensionen",
    "Lexin020431": "Äldreboende",
    "Lexin020496": "Personuppgifter och bakgrundsfakta",
    "Lexin020506": "Bevis som är personer (vittnen, målsägande)",
    "Lexin020508": "Tvång mot person (t.ex. gripande, häktning)",
    "Lexin020530": "Utredning om en persons personliga förhållanden",
    "Lexin020793": "Advokatens eller åklagarens slutanförande i rätten",
    "Lexin020860": "Poliser som åker runt i bil",
    "Lexin021411": "Tid då man testas (t.ex. på nytt jobb)",
    "Lexin021546": "Man tror felaktigt att någon samtyckt",
    "Lexin021582": "Starkare graden av misstanke (krävs för häktning)",
    "Lexin021603": "Straff enligt Brottsbalken",
    "Lexin021882": "Polisen slår till mot en plats",
    "Lexin021926": "Risk att personen begår nya brott",
    "Lexin021962": "Sakbevis (t.ex. fingeravtryck, vapen)",
    "Lexin021964": "Tvång mot saker (t.ex. beslag, husrannsakan)",
    "Lexin022058": "Lagar och regler som styr verksamheten",
    "Lexin022101": "Att spela upp brottsförloppet på platsen",
    "Lexin022126": "Villkor för att en lag ska gälla",
    "Lexin022246": "Förbud att lämna landet",
    "Lexin022532": "Kan komma att dömas till fängelse",
    "Lexin022654": "Avdelning hos polisen eller åklagaren",
    "Lexin022678": "Lagen som styr rättspsykiatriska undersökningar",
    "Lexin022910": "Stöld med våld eller hot om våld",
    "Lexin023022": "Domstolen kan kräva läkarintyg",
    "Lexin023088": "Tvångsvård på låst avdelning",
    "Lexin023089": "Tvångsvård men patienten bor hemma",
    "Lexin023114": "Att inte veta vad lagen säger (ursäktar oftast inte)",
    "Lexin023197": "Förmåga att röra sig",
    "Lexin023266": "Åklagaren berättar hur brottet gick till",
    "Lexin023268": "Staten tar saker som använts vid brott",
    "Lexin023365": "Person som vill störta samhällsordningen",
    "Lexin023368": "Oavlönat arbete istället för fängelse",
    "Lexin023939": "Databas för efterlysningar inom EU",
    "Lexin023940": "Myndighet som driver tvångsvårdshem (LVM/LVU)",
    "Lexin023941": "Institutioner för ungdomar och missbrukare",
    "Lexin023944": "Högsta domstolen (sista instans)",
    "Lexin023990": "Avdrag på lönen när man är sjuk (karens)",
    "Lexin023992": "Ersättning vid långvarig sjukdom (aktivitetsersättning)",
    "Lexin024003": "Del av arbetsgivaravgiften",
    "Lexin024013": "Försäkring som ger pengar vid sjukdom",
    "Lexin024017": "Gammalt namn på Försäkringskassan",
    "Lexin024019": "Ledighet pga sjukdom",
    "Lexin024020": "Som ofta är sjuk eller klen",
    "Lexin024025": "Statlig garanti för sjuklön om företaget går i konkurs",
    "Lexin024042": "Rätt till vård till subventionerat pris",
    "Lexin024044": "Geografiskt område för sjukvård",
    "Lexin024065": "Gammalt ord för psykisk sjukdom",
    "Lexin024103": "Att ta lagen i egna händer (olagligt)",
    "Lexin024158": "Skyldighet att betala skadestånd",
    "Lexin024197": "Spricka i skallbenet",
    "Lexin024304": "Bara för att det ska se ut på ett visst sätt",
    "Lexin024306": "Avtal som inte är menat att gälla på riktigt",
    "Lexin024552": "Bevis i form av dokument",
    "Lexin024737": "Straff där man slipper fängelse men övervakas",
    "Lexin024811": "Lägre graden av misstanke",
    "Lexin024909": "Välte omkull honom med våld",
    "Lexin025055": "Fängelse för ungdomar (på SiS-hem)",
    "Lexin025064": "Göra klart brottsutredningen",
    "Lexin025307": "Förolämpning eller kränkning",
    "Lexin025403": "Att dra upp i näsan (om pulver)",
    "Lexin025437": "Att ta kokain via näsan",
    "Lexin025438": "Har tagit kokain",
    "Lexin025717": "Att i hemlighet bevaka någon",
    "Lexin025781": "Tillstånd för något som annars är förbjudet",
    "Lexin026108": "Stil (slang)",
    "Lexin026324": "Kniv där bladet fälls ut med fjäder (vapen)",
    "Lexin026444": "Konsekvens av brott (fängelse/böter)",
    "Lexin026449": "Straff som inte innebär fängelse",
    "Lexin026453": "Döms för att ha hjälpt till",
    "Lexin026460": "Gammal nog att kunna dömas (15 år)",
    "Lexin026469": "Spannet mellan lägsta och högsta straff",
    "Lexin026472": "Varning istället för åtal (för unga)",
    "Lexin026473": "Böter som utdöms om man inte följer ett förbud",
    "Lexin026474": "Hur allvarligt brottet är (mäts i fängelsetid)",
    "Lexin026475": "Bedömning av straffets längd",
    "Lexin026477": "Böter man godkänner utan rättegång",
    "Lexin026758": "Bevisat så att inget tvivel finns",
    "Lexin026779": "Slang för pengar",
    "Lexin026875": "Att dra någon inför domstol (i tvistemål)",
    "Lexin026884": "Ansökan till domstolen om att stämma någon",
    "Lexin026887": "Person som delgiver stämningar",
    "Lexin026986": "Gärningsmannens avsikt (uppsåt)",
    "Lexin027050": "Förenklad process för vissa brott",
    "Lexin027052": "Förenklad rättegång",
    "Lexin027205": "Stor polisinsats för att hitta brottslingar",
    "Lexin027244": "Bedrägeri som drabbar många (t.ex. bolagsbedrägeri)",
    "Lexin027361": "Domstolen åker och tittar på platsen",
    "Lexin027388": "Mycket starka skäl (undantag)",
    "Lexin027391": "Mycket svår situation för personen (t.ex. sjukdom)",
    "Lexin027514": "Skador som gett sår",
    "Lexin027641": "Särskild typ eller art",
    "Lexin027647": "Hjälp av Kronofogden att ta tillbaka egendom",
    "Lexin027655": "Regler som gäller i specialfall",
    "Lexin028412": "Den som är åtalad för brott",
    "Lexin028604": "Det togs i beslag av polisen",
    "Lexin028958": "Som man kan lita på",
    "Lexin029148": "Bråk och oordning",
    "Lexin029171": "Fras: Tågen gick inte längre"
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
