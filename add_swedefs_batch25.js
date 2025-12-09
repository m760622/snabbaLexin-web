
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch25.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin010811": "Förare av grävmaskin",
    "Lexin011111": "Ersättning på 50 procent av full nivå",
    "Lexin011249": "Har ordnat dagis eller barnvakt",
    "Lexin011250": "Det finns ett arbete för mig",
    "Lexin011251": "Har vikarierat på en tjänst",
    "Lexin011328": "Ersättning på 100 procent",
    "Lexin012328": "Elektricitet med hög spänning (farlig)",
    "Lexin012683": "Skäl som beror på personen själv",
    "Lexin012980": "Registrerad i ett register",
    "Lexin012981": "Registrerad hos Försäkringskassan",
    "Lexin012982": "Registrerad som arbetssökande (inskriven)",
    "Lexin012983": "Anmäld som sökande hos Arbetsförmedlingen",
    "Lexin013159": "Pension som man arbetat ihop",
    "Lexin013620": "Ersättning beräknad på alla dagar i veckan",
    "Lexin013621": "Beräkning som inkluderar helger",
    "Lexin013622": "En hel månad (t.ex. 1-31 januari)",
    "Lexin013846": "Kort för att stämpla a-kassa (förr)",
    "Lexin014545": "Att skicka in saknade handlingar",
    "Lexin015836": "Vad lagen säger",
    "Lexin016047": "Brottet ger fängelsestraff",
    "Lexin016267": "Att ha samma värde eller rättigheter",
    "Lexin017017": "Fackförbund för anställda",
    "Lexin018093": "Vara lika mycket värt som sjukersättning",
    "Lexin018922": "Nyss flyttat till platsen",
    "Lexin019403": "Fullständig rättighet",
    "Lexin019404": "Helt fri rätt till något",
    "Lexin019436": "Arbeten som inte kräver utbildning",
    "Lexin019526": "Om jag har rätt",
    "Lexin020178": "Pappas ledighet med barn",
    "Lexin020287": "Passar min utbildning och erfarenhet",
    "Lexin020408": "Frågor om pension",
    "Lexin020417": "Rätt till pension som man tjänat in",
    "Lexin020871": "Ombud som hjälper politiska flyktingar med studier",
    "Lexin022041": "Kort i ett register",
    "Lexin022140": "Ganska fort",
    "Lexin022905": "Råkade få en infektion just där",
    "Lexin022999": "Rätt att få pengar",
    "Lexin023131": "Utslag på huden",
    "Lexin023276": "Giltigt skäl att avskeda någon",
    "Lexin023985": "Sjuk väldigt ofta",
    "Lexin023989": "Jag har anmält att jag är sjuk",
    "Lexin024009": "Sjukdom man får på sjukhuset (vårdrelaterad)",
    "Lexin024029": "Nivån på sjukpenninggrundande inkomst",
    "Lexin026091": "Sjukdom som inte går över",
    "Lexin026624": "Tillfälliga korta jobb",
    "Lexin026670": "Lagen om rätt att vara ledig för studier",
    "Lexin026753": "Bevisa att man har rätt",
    "Lexin026759": "Information som är bevisad sann",
    "Lexin026784": "Skena av stål (t.ex. för tåg eller dörrar)",
    "Lexin026817": "Jobb med städning",
    "Lexin027657": "Särskilda boenden eller skolor",
    "Lexin027680": "Jobb bara under en säsong (t.ex. sommarjobb)",
    "Lexin028303": "VAB (Vård av barn)",
    "Lexin028313": "Som har en försäkring",
    "Lexin029172": "Vagn i tunnelbanetåget",
    "Lexin029522": "Under totalt (tid eller summa)",
    "Lexin029966": "Rätt att vänta med betalning eller skatt",
    "Lexin030138": "Avi för att hämta ut pengar (förr)",
    "Lexin030178": "Som inte kom eller hände",
    "Lexin030179": "Att inte få sin sjukpenning utbetald",
    "Lexin030217": "Att inte längre få ersättning från Försäkringskassan",
    "Lexin030470": "Barn med intellektuell funktionsnedsättning",
    "Lexin030675": "Var mycket rädd eller orolig",
    "Lexin031672": "Tiden man gör lumpen (militärtjänst)",
    "Lexin031826": "Utbildning till ett yrke",
    "Lexin034138": "Rätt att få sjukpenning",
    "Lexin034239": "Pension man får när man blir gammal",
    "Lexin034240": "Avgift till staten för pensioner",
    "Lexin034241": "Pension till barn som mist en förälder",
    "Lexin034242": "Att jobba mindre och ta ut lite pension",
    "Lexin034243": "Inkomst som ligger till grund för ersättning",
    "Lexin000530": "Grundpension för alla (förr)",
    "Lexin000537": "Den statliga pensionen",
    "Lexin033063": "Uppdelad i två motsatser (t.ex. man/kvinna)",
    "Lexin033064": "Att vara bisexuell",
    "Lexin033065": "Personer som gillar både män och kvinnor",
    "Lexin033066": "Lesbisk kvinna med traditionellt kvinnlig stil",
    "Lexin033067": "Biblisk stad (ofta i uttryck om synd)",
    "Lexin033068": "Normen att heterosexualitet är det normala",
    "Lexin033069": "Personer som gillar samma kön",
    "Lexin033070": "Att bli gjord till åtlöje",
    "Lexin033071": "Att ingå (t.ex. partnerskap)",
    "Lexin033072": "Sammanhang",
    "Lexin033073": "Som beror på sammanhanget",
    "Lexin033075": "Alltför intim eller påträngande",
    "Lexin033077": "Av samma kön",
    "Lexin033078": "Undervisning i skolan om sex och relationer",
    "Lexin033079": "Lagen som förbjuder köp av sexuella tjänster",
    "Lexin033080": "Expert på sexualitet",
    "Lexin033081": "Risk för sexuellt våld",
    "Lexin033082": "Brott av sexuell natur (t.ex. våldtäkt)",
    "Lexin033083": "Person som begått sexualbrott",
    "Lexin033085": "Våld med sexuella inslag",
    "Lexin033086": "En persons sexuella aktiviteter",
    "Lexin033087": "Vetenskapen om sexualitet",
    "Lexin033088": "Som rör sex",
    "Lexin033089": "Syftning på sex",
    "Lexin033090": "Problem med sexlivet (t.ex. impotens)",
    "Lexin033091": "Hur man ser på sin egen sexualitet",
    "Lexin033092": "Fysisk kontakt av sexuell art"
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
