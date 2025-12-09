
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch54.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin005782": "Att klaga på ett grovt formfel i rättegången",
    "Lexin006006": "Ränta man måste betala om man är sen med betalningen",
    "Lexin006025": "Avtal mellan länder för att slippa betala skatt i båda",
    "Lexin006206": "Våld som leder till döden",
    "Lexin006211": "Det juridiska namnet på den dödes egendom",
    "Lexin006267": "Möte där konkursgäldenären svär ed på sina tillgångar",
    "Lexin006269": "Skyldighet att visa upp bevis (handlingar)",
    "Lexin006318": "De som lever kvar efter att någon dött",
    "Lexin006324": "Söka efter någon som är borta",
    "Lexin006368": "Saker man äger",
    "Lexin006374": "Att skriva sitt namn själv med penna",
    "Lexin006378": "Att ta ett barn utan lov (vårdnadshavare)",
    "Lexin006380": "Att ta lagen i egna händer (rubba annans besittning)",
    "Lexin006394": "Företagets egna pengar (tillgångar minus skulder)",
    "Lexin006430": "Brott som handlar om pengar och företag",
    "Lexin006432": "Polismyndighet för ekonomiska brott (EBM)",
    "Lexin006449": "Ekobrott",
    "Lexin006529": "Straff där man övervakas hemma elektroniskt",
    "Lexin006703": "När alla tycker lika",
    "Lexin006739": "Barn som kommer till Sverige utan föräldrar",
    "Lexin006756": "När domstolen bestämmer domen utan publik",
    "Lexin006761": "När offret själv driver målet (t.ex. vid förtal)",
    "Lexin006770": "Att få sparken eller sluta ett uppdrag",
    "Lexin006854": "Att säga att man gjort brottet/är skyldig",
    "Lexin006857": "Att medge något",
    "Lexin006864": "Betala skadestånd",
    "Lexin006870": "När förloraren betalar vinnarens advokatkostnader",
    "Lexin006875": "Skyldig att betala",
    "Lexin006876": "När polisen tar någon som gör ett brott",
    "Lexin006922": "Diskriminering pga ursprung",
    "Lexin007004": "Papper som ger rätt att få hjälp av Kronofogden (t.ex. en dom)",
    "Lexin007007": "När Kronofogden säljer någons saker på auktion",
    "Lexin007043": "Beslut som skickats ut från myndigheten",
    "Lexin007080": "Lagen om att staten kan ta mark mot ersättning",
    "Lexin007082": "Förlust av äganderätt (t.ex. god tro-förvärv)",
    "Lexin007086": "Att tolka lagen brett (inte bokstavligt)",
    "Lexin007161": "Domstolsmål om vem som är pappa",
    "Lexin007165": "Socialtjänstens utredning om vem som är pappa",
    "Lexin007179": "Det som verkligen hänt",
    "Lexin007233": "Rätt att få komma till Sverige pga familj",
    "Lexin007238": "Familj som tar hand om andras barn (fosterhem)",
    "Lexin007241": "Placering i familjehem",
    "Lexin007242": "Mål om skilsmässa, vårdnad etc.",
    "Lexin007387": "Namnet på markbiten (t.ex. Berga 1:1)",
    "Lexin007392": "Deklaration för husägare vart tredje år",
    "Lexin007415": "Bestämma att det är så",
    "Lexin007416": "Bestämma summan",
    "Lexin007418": "Att hovrätten håller med tingsrätten",
    "Lexin007424": "Dom som slår fast ett rättsförhållande (t.ex. äganderätt)",
    "Lexin007473": "Problem med huset efter köp",
    "Lexin007475": "Ansvar om man varit slarvig (culpa)",
    "Lexin007484": "P-böter",
    "Lexin007643": "Påhittad (fejkad)",
    "Lexin007703": "Person som får skriva under avtal för bolaget",
    "Lexin007915": "Risk att den misstänkte rymmer (skäl för häktning)",
    "Lexin007926": "Rättslig status som flykting",
    "Lexin008048": "Att döda en hel folkgrupp",
    "Lexin008090": "Krav på pengar",
    "Lexin008094": "Den man är skyldig pengar",
    "Lexin008211": "Elektronisk övervakning istället för fängelse",
    "Lexin008281": "Att göra något farligt (brott)",
    "Lexin008308": "En förfrågan till myndighet",
    "Lexin008336": "Att hyra ett affärskoncept (t.ex. McDonald's)",
    "Lexin008358": "Militär insats för fred",
    "Lexin008397": "Låta någon gå (från häktet/fängelset)",
    "Lexin008410": "Inlåst (häktad eller i fängelse)",
    "Lexin008415": "Fängelsestraff",
    "Lexin008431": "Inte skyldig (enligt domen)",
    "Lexin008466": "Tid man har på sig",
    "Lexin008492": "Som man väljer själv",
    "Lexin008495": "Vård utan tvång",
    "Lexin008498": "Myndighet som sköter straff i frihet",
    "Lexin008500": "Straff som inte är fängelse (skyddstillsyn)",
    "Lexin008566": "Person som skilt sig",
    "Lexin008571": "Att inte vara där",
    "Lexin008580": "Hjälpa till att det händer",
    "Lexin008586": "Pass för personer utan medborgarskap",
    "Lexin008653": "Information om hur man överklagar",
    "Lexin008658": "Domsolut som tvingar någon att göra något (t.ex. betala)",
    "Lexin008844": "Dom där man blir dömd",
    "Lexin008885": "Taxi för sjuka/äldre (betalas av kommunen)",
    "Lexin008984": "Prata för någon i rätten",
    "Lexin008986": "Driva ett mål",
    "Lexin009003": "Beteende som stör allmänheten",
    "Lexin009022": "Pengar man får behålla vid löneutmätning",
    "Lexin009030": "Att planera brott (ibland straffbart)",
    "Lexin009049": "Misstag av slarv",
    "Lexin009074": "När man inte får göra något",
    "Lexin009113": "Stoppa innan det händer",
    "Lexin009119": "Åtgärd för att stoppa brott/skada",
    "Lexin009124": "Den som presenterar ärendet för beslutsfattaren",
    "Lexin009125": "Jurist som bereder målet",
    "Lexin009169": "Detaljerade regler från myndigheter",
    "Lexin009170": "Bestämma i lag/förordning",
    "Lexin009200": "När företag går ihop (fusion)",
    "Lexin009214": "Rätt att gå före",
    "Lexin009224": "När en skuld måste betalas",
    "Lexin009227": "Ränta som samlats på hög",
    "Lexin009229": "Sista betalningsdagen",
    "Lexin009230": "Tiden fram till betalning"
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
