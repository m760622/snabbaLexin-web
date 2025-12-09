
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch48.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin026457": "Spannet mellan lägsta och högsta straffet för ett brott",
    "Lexin026458": "Hur långt t.ex. ett fängelsestraff är",
    "Lexin026459": "När man är gammal nog att straffas (15 år)",
    "Lexin026461": "Att bestämma exakt hur mycket straff någon ska få",
    "Lexin026462": "Processen för brottmål",
    "Lexin026463": "Lagarna om hur brott utreds och döms",
    "Lexin026464": "Handling som inte är brottslig (t.ex. nödvärn)",
    "Lexin026467": "Vilka straff som finns för ett brott (från böter till fängelse)",
    "Lexin026468": "Straffskalan (minimi- och maximistraff)",
    "Lexin026471": "Beslut att inte åtala unga (varning istället)",
    "Lexin026476": "Hur allvarligt brottet är (mäts i månader/år)",
    "Lexin026478": "Böter som åklagaren beslutar om (utan rättegång)",
    "Lexin026534": "Ansvar för skador även om man inte gjort fel (t.ex. hundägare)",
    "Lexin026535": "Skadeståndsansvar oavsett culpa (fel)",
    "Lexin026732": "Att hugga av en kroppsdel",
    "Lexin026742": "De som leder ett bolag eller en förening",
    "Lexin026767": "När man adopterar sin makes/makas barn",
    "Lexin026850": "Person som företräder någon annan (t.ex. god man)",
    "Lexin026853": "Vikarie eller företrädare",
    "Lexin026854": "När företrädaren har egna intressen i saken",
    "Lexin026859": "Rätt att binda företaget pga sin tjänst (t.ex. butikspersonal)",
    "Lexin026863": "Beviskravet i brottmål (högsta kravet)",
    "Lexin026874": "Att inleda en rättsprocess mot någon",
    "Lexin026882": "Ansökan till domstol om att stämma någon",
    "Lexin026888": "Person som delger stämningar",
    "Lexin026892": "Skatt när man köper fastighet (lagfartskostnad)",
    "Lexin026896": "Att planera brott tillsammans med andra (medhjälp)",
    "Lexin026900": "När allmänheten inte får vara med i rättssalen (sekretess)",
    "Lexin026901": "Lyckta dörrar",
    "Lexin026903": "Rättegång utan publik",
    "Lexin026951": "Brott: att störa t.ex. en begravning eller demonstration",
    "Lexin026987": "Gärningsmannens uppsåt eller oaktsamhet (insidan)",
    "Lexin026997": "Som gäller i andra hand",
    "Lexin027007": "Att lura till sig bidrag (ofta från EU)",
    "Lexin027012": "Regler om arv och testamente",
    "Lexin027051": "Snabba straff (t.ex. böter på plats)",
    "Lexin027053": "Snabb process hos Kronofogden (betalningsföreläggande)",
    "Lexin027063": "Vanligt förnuft (common sense)",
    "Lexin027097": "Ersättning för något (t.ex. försäkringspengar istället för bilen)",
    "Lexin027158": "Den som blir stämd i tvistemål",
    "Lexin027163": "Svarandens svar på stämningen",
    "Lexin027186": "Ersättning för fysiskt och psykiskt lidande under läketiden",
    "Lexin027196": "SFS (alla svenska lagar och förordningar)",
    "Lexin027213": "Föreningen för alla advokater",
    "Lexin027214": "Hjälper svenska företag utomlands (Business Sweden)",
    "Lexin027229": "Att smita från lumpen eller krigstjänst",
    "Lexin027245": "Att lura allmänheten eller bolag (ekobrott)",
    "Lexin027270": "Regler om släktskap genom giftermål",
    "Lexin027438": "Syskons barn (niece/nevö)",
    "Lexin027551": "Avdelning som jobbar med säkerhet",
    "Lexin027553": "Marginal för säkerhet",
    "Lexin027554": "Regler för att undvika olyckor",
    "Lexin027555": "Löfte om säkerhet",
    "Lexin027556": "Domstolar/anstalter klassas efter hur säkra de är",
    "Lexin027559": "Hur man tänker kring säkerhet på en arbetsplats",
    "Lexin027560": "Varning eller info om säkerhet",
    "Lexin027561": "Standarder för säkerhet",
    "Lexin027566": "Expert på säkerhet (t.ex. farligt gods)",
    "Lexin027567": "Sal i domstolen med extra säkerhet (glasväggar etc)",
    "Lexin027568": "Skydd mot spioneri och sabotage",
    "Lexin027569": "När skyddsombudet stoppar jobbet pga fara",
    "Lexin027571": "Larm och lås m.m.",
    "Lexin027573": "Varning för fara",
    "Lexin027626": "Par som är ihop men bor på olika håll",
    "Lexin027642": "Person som tar hand om dödsboet när arvingarna inte kan",
    "Lexin027645": "Förtur till betalning vid konkurs (t.ex. pant)",
    "Lexin027646": "Vårdnadshavare som inte är förälder (t.ex. vid dödsfall)",
    "Lexin027649": "Speciell effekt av t.ex. en dom",
    "Lexin027650": "Beslut av förvaltningsrätten om att vårdtid tar slut",
    "Lexin027651": "Åklagare som utreder poliser",
    "Lexin027652": "Krav på tillstånd för att få åtala (t.ex. vissa ärekränkningsbrott)",
    "Lexin027653": "Resning, domvilla eller återställande av försutten tid",
    "Lexin027658": "Sätt att klaga på laga kraft-vunna domar",
    "Lexin027660": "Kontroll på flygplatser eller domstolar",
    "Lexin027661": "SiS-hem (tvångsvård av unga)",
    "Lexin027669": "Vårdnadshavare utsedd av rätten",
    "Lexin027717": "Den som söker (t.ex. jobb, bidrag eller stämning)",
    "Lexin027801": "Brott: att ta emot muta (tjänsteman)",
    "Lexin027802": "Att gå där man inte får (t.ex. över tomt)",
    "Lexin027803": "Att ta emot pengar från utlandet för att påverka opinionen",
    "Lexin027870": "Svårt att prata",
    "Lexin028012": "Fastighet som beskattas som en enhet",
    "Lexin028013": "Ekonomisk enhet för taxering",
    "Lexin028033": "Tolk för döva",
    "Lexin028034": "Tolkar för teckenspråk",
    "Lexin028059": "Experter som dömer i tekniska mål (t.ex. i Mark- och miljödomstolen)",
    "Lexin028066": "Hemlig avlyssning av telefon (tvångsmedel)",
    "Lexin028071": "Förhör per telefon",
    "Lexin028087": "Tolkning efter syftet med lagen (ändamålstolkning)",
    "Lexin028092": "Att se vem någon ringer till (lista på samtal)",
    "Lexin028151": "Våld för att skrämma en befolkning eller regering",
    "Lexin028153": "Brott med terroristuppsåt",
    "Lexin028165": "Papper om vem som ska ärva",
    "Lexin028167": "Den som får arv genom testamente",
    "Lexin028169": "Den som skriver testamentet",
    "Lexin028170": "Testamentsgivare",
    "Lexin028211": "Att äga en andel av ett semesterboende (vecka)",
    "Lexin028216": "Timeshare (semesterboende)",
    "Lexin028217": "Delat boende",
    "Lexin028282": "Har fått rätt till (t.ex. skadestånd)"
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
