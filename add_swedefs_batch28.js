
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch28.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin033021": "Överdriven sexlust hos kvinnor (gammalt begrepp)",
    "Lexin033022": "Bortopererande av förhuden",
    "Lexin033023": "Att tillfredsställa sig själv sexuellt (runka/pulla)",
    "Lexin033026": "Sexuell höjdpunkt",
    "Lexin033027": "Att dras till personer oavsett kön",
    "Lexin033028": "Sexuell avvikelse (gammalt ord)",
    "Lexin033029": "Sexuell dragning till barn",
    "Lexin033031": "Gammal teori om flickors avundsjuka på pojkar",
    "Lexin033032": "Ring som sätts runt penis för hårdare stånd",
    "Lexin033034": "Smek och hångel utan samlag",
    "Lexin033035": "Utlösning i sömnen",
    "Lexin033036": "Att ha kärleksrelationer med flera samtidigt",
    "Lexin033037": "Att komma för fort",
    "Lexin033039": "Att ha många sexpartners",
    "Lexin033040": "Teori om hur sexualiteten utvecklas",
    "Lexin033041": "Hår runt könsorganen",
    "Lexin033042": "Teori som ifrågasätter könsnormer",
    "Lexin033043": "Sex som kopplar njutning till smärta och makt",
    "Lexin033044": "Sexuell föreningsakt",
    "Lexin033045": "Olika positioner när man har sex",
    "Lexin033046": "Docka i mänsklig storlek för sex",
    "Lexin033047": "Gummiduk för säkert munsex",
    "Lexin033048": "Kvinnans könsorgan (vagina)",
    "Lexin033049": "Nyare ord för mödomshinna",
    "Lexin033050": "Männens könsceller",
    "Lexin033051": "Sätt att göra någon steril på",
    "Lexin033052": "Par som byter partner med varandra",
    "Lexin033053": "Spermier",
    "Lexin033054": "Vätskan som innehåller spermier (sperma)",
    "Lexin033055": "Tändning på att bli levande begravd",
    "Lexin033056": "Person som lever som motsatta könet utan operation",
    "Lexin033057": "Tillstånd där man upplever sig tillhöra motsatt kön",
    "Lexin033058": "Slida",
    "Lexin033059": "Mottagning för sexuell hälsa",
    "Lexin033060": "Smärta i slidöppningen",
    "Lexin033061": "Att smygtitta på andra som är nakna eller har sex",
    "Lexin033062": "Sex med djur",
    "Lexin033076": "Att trycka ner eller hämma känslor",
    "Lexin018366": "Nu räcker det, tålamodet är slut",
    "Lexin008802": "Att missförstå något helt",
    "Lexin001681": "Ord som sätts framför verb i grundform (att springa)",
    "Lexin000213": "Suck av sorg eller längtan",
    "Lexin000262": "Gammalt ord för hejdå",
    "Lexin000353": "Rop vid smärta",
    "Lexin000481": "Okej, det är bra",
    "Lexin000693": "Ord som avslutar bön (låt så ske)",
    "Lexin000757": "Gammalt kraftuttryck (ta mig tusan)",
    "Lexin002475": "Nog! (sluta)",
    "Lexin005685": "Milt svärord (jäklar)",
    "Lexin005690": "Starkt svärord (djävlar)",
    "Lexin010471": "Hälsningsfras",
    "Lexin011077": "Rop för att påkalla uppmärksamhet eller svara i telefon",
    "Lexin011314": "Vanligaste hälsningen",
    "Lexin011322": "Gladare variant av hej",
    "Lexin011811": "Rop vid firande av någon",
    "Lexin013304": "Bekräftande svar",
    "Lexin013347": "Svarar ja på en negativ fråga",
    "Lexin013348": "Inleder en förklaring eller invändning",
    "Lexin013568": "Milt utrop av förvåning (Herregud)",
    "Lexin014931": "Gammalt utrop av förvåning (Kors i taket)",
    "Lexin018955": "Uppmaning eller fråga",
    "Lexin018989": "Utrop av förvåning",
    "Lexin019407": "Utrop när något oväntat händer",
    "Lexin019416": "Godkännande",
    "Lexin020141": "Ljudet av ett skott eller smäll",
    "Lexin021318": "Sägs till någon som nyser",
    "Lexin024791": "Sägs när man höjer glaset för att dricka",
    "Lexin028517": "Tveksamt ljud eller informellt hej",
    "Lexin028565": "Informellt hej (Tjena)",
    "Lexin029201": "Milt svärord",
    "Lexin030117": "Utrop av äckel eller ogillande",
    "Lexin030755": "Artig fras när man ger något",
    "Lexin031538": "Hälsning till gäst",
    "Lexin031882": "Utrop av förvåning eller beundran",
    "Lexin031883": "Utrop av plötslig insikt",
    "Lexin032312": "Avfärdande utrop (det var inget)",
    "Lexin001218": "Kommun som ansvarar för nyanlända",
    "Lexin003377": "Avtal man måste följa",
    "Lexin026894": "Registrera när man kommer till jobbet",
    "Lexin034205": "Avtal om vad som ska vara enskild egendom i äktenskapet",
    "Lexin034206": "Att få någon annan att begå ett brott",
    "Lexin034207": "Rörelse för arbetares rättigheter",
    "Lexin034208": "Specialdomstol för tvister om kollektivavtal",
    "Lexin034210": "Uppdelning av egendom vid skilsmässa eller död",
    "Lexin034211": "Straff där man övervakas elektroniskt i hemmet",
    "Lexin034212": "Gammal lagtext om fastigheter och byggande",
    "Lexin034213": "Myndighet som övervakar diskrimineringslagen",
    "Lexin034214": "Myndighet som utreder ekonomisk brottslighet",
    "Lexin034215": "Samarbetsform för företag inom EU",
    "Lexin034216": "Intyg som gäller i hela EU vid arv",
    "Lexin034217": "Kommunal hjälp för par med problem",
    "Lexin034218": "Lagen om föräldrar och barn",
    "Lexin034219": "Att planera eller skaffa redskap för brott",
    "Lexin034220": "Överenskommelse för att slippa rättegång",
    "Lexin034221": "Polisens nedskrivna utredning av brottet",
    "Lexin034222": "Elektronisk övervakning istället för fängelse",
    "Lexin034223": "Egendom som ska delas vid skilsmässa",
    "Lexin034224": "Mål där parterna inte får göra upp själva (t.ex. vårdnad)",
    "Lexin034225": "Bråk mellan två parter som domstolen löser",
    "Lexin003462": "Jurist som arbetar under en advokat"
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
