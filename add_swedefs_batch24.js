
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch24.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin031470": "Som inte påverkas av regn och vind",
    "Lexin031477": "Mark byggd för att köra på",
    "Lexin031483": "Det som avgränsar ett rum eller hus",
    "Lexin031484": "Hur väggen är uppbyggd (reglar, isolering, skivor)",
    "Lexin031487": "Maskin som hyvlar grusvägar jämna",
    "Lexin031493": "Hjälp att hitta rätt eller göra rätt",
    "Lexin031497": "Alla vägar i ett område",
    "Lexin031504": "Skötsel av vägar (plogning, lagning)",
    "Lexin031508": "Maskin som plattar till asfalt",
    "Lexin031554": "Maskin för att platta till mark",
    "Lexin031602": "Vad något är värt i pengar",
    "Lexin031654": "Material som håller värmen kvar i huset",
    "Lexin031655": "Matta med elslingor för golvvärme",
    "Lexin031659": "Systemet för uppvärmning (pannor, rör, element)",
    "Lexin031660": "Apparat som flyttar värme mellan luft/vatten",
    "Lexin031661": "Processen där värme flyttas",
    "Lexin031662": "Att ta vara på värmen i frånluften",
    "Lexin031666": "Säkerhetsarbete för att rädda liv",
    "Lexin031711": "Flytande ämne (som vatten eller olja)",
    "Lexin031806": "Person utbildad för ett hantverk",
    "Lexin031807": "Tidigare erfarenhet av yrket",
    "Lexin031837": "Att göra ytan fin (slipa, måla)",
    "Lexin031962": "Maskin som gör ånga",
    "Lexin031964": "Plastfolie som stoppar fuktig luft",
    "Lexin032051": "Grop som fyllts igen med jord",
    "Lexin032108": "Sak man gör för att fixa ett problem",
    "Lexin032141": "Fint träslag (t.ex. ek, teak)",
    "Lexin032305": "Små runda stenar för trädgårdsgångar",
    "Lexin032390": "Som gäller båda parter",
    "Lexin032446": "Skydd man stoppar i öronen",
    "Lexin032543": "Tid mellan två tillstånd (t.ex. vid flytt)",
    "Lexin032630": "Kommunens plan för markanvändning i stort",
    "Lexin032678": "Att göra fel eller gå över gränsen",
    "Lexin032727": "Bedrägeri med falska fakturor för annonser",
    "Lexin032728": "Bedrägeri med stulna kortuppgifter",
    "Lexin032729": "Brott där man lurar till sig pengar",
    "Lexin032730": "Brott mot den man är skyldig pengar (t.ex. vid konkurs)",
    "Lexin032731": "Bedrägeri via internet eller dator",
    "Lexin032732": "Att straffas två gånger för samma brott (förbjudet)",
    "Lexin032733": "Företag som köper fakturor",
    "Lexin032734": "Att skicka bluffakturor",
    "Lexin032735": "Verksamhet som bara skapar falska fakturor",
    "Lexin032736": "Brott på börsen (t.ex. insiderbrott)",
    "Lexin032737": "Teknisk undersökning av bevis",
    "Lexin032738": "Att ta pengar man fått förtroende att hantera",
    "Lexin032739": "Brott av den som är skyldig pengar",
    "Lexin032740": "Handel med aktier baserat på hemlig information",
    "Lexin032741": "Betalning med sedlar och mynt",
    "Lexin032742": "Otillåten påverkan på aktiekurser",
    "Lexin032743": "Bedrägeri med moms mellan länder",
    "Lexin032744": "Enkla brott som det finns många av",
    "Lexin032745": "Hantering av kontanter",
    "Lexin032746": "Större utredning som drivs som projekt",
    "Lexin032747": "Person som utreder skattefusk",
    "Lexin032748": "Jurist expert på skatteregler",
    "Lexin032749": "Land med mycket låg skatt",
    "Lexin032750": "Person som granskar skattedeklarationer",
    "Lexin032751": "Kopiering av kortuppgifter vid automat",
    "Lexin032752": "Betalning som kan följas (kort/Swish)",
    "Lexin032753": "Arbete utan att betala skatt",
    "Lexin032754": "Att missbruka sin maktställning mot huvudmannen",
    "Lexin019265": "Organisationen för ekonomiskt samarbete och utveckling",
    "Lexin000582": "Statligt system för pension",
    "Lexin000730": "Att operera bort en kroppsdel",
    "Lexin001118": "Regler för jobbet (lön, tid, semester)",
    "Lexin001331": "Parterna på arbetsmarknaden",
    "Lexin001332": "Intyg om hur mycket man jobbat",
    "Lexin001338": "Nedsatt förmåga att arbeta",
    "Lexin001357": "Lagar som gäller arbete (LAS, MBL)",
    "Lexin001994": "Att ge någon sparken",
    "Lexin002079": "Kontraktet gäller inte längre",
    "Lexin002250": "Sjukdom orsakad av bakterier",
    "Lexin002308": "Vanlig maginfektion",
    "Lexin004193": "Ställ för informationsblad",
    "Lexin004208": "Skelettet i handleden är av",
    "Lexin004511": "Hörselskada av högt ljud",
    "Lexin004898": "Förhandlingar på riksnivå",
    "Lexin004899": "Huvudorganisation (t.ex. LO)",
    "Lexin005223": "Dagarna som är kvar",
    "Lexin005421": "Personen kunde arbeta",
    "Lexin005644": "Vårdcentral",
    "Lexin005777": "När domstolen avgör ett ärende",
    "Lexin006015": "Du har rätt att få pension",
    "Lexin006725": "Enligt de regler som gäller nu",
    "Lexin006931": "Barn med svår sjukdom",
    "Lexin006938": "Barn som ofta är sjukt",
    "Lexin007133": "Fackföreningen",
    "Lexin007756": "Ersättning på 25 procent",
    "Lexin008454": "Anmälan att man är frisk igen",
    "Lexin008800": "Bli förkyld",
    "Lexin008803": "Få rätt till pengar från försäkring",
    "Lexin009157": "Hur man håller möten i en förening",
    "Lexin009431": "Fortsatte vara sjukskriven",
    "Lexin009715": "Blankett för att få sjukpenning",
    "Lexin009720": "Att lura försäkringsbolaget",
    "Lexin009912": "När förlossningen närmar sig",
    "Lexin009923": "Tiden man arbetar och tjänar pengar",
    "Lexin009942": "Pengar för att vara hemma med nyfödd",
    "Lexin010040": "Summa som garanteras",
    "Lexin010080": "Kommunens kontor för gator och trafik"
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
