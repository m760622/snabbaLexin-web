
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch32.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin029251": "Två olika sorters läkarintyg för häktade (liten rättspsykiatrisk undersökning)",
    "Lexin029273": "Tvångsvård enligt lag",
    "Lexin029503": "Håller sig undan från polisen eller straffet",
    "Lexin029504": "Litet bedrägeri eller stöld av anförtrodd egendom",
    "Lexin029555": "Pengar till barnen vid separation",
    "Lexin029593": "Att låta bli att göra något man borde göra",
    "Lexin029687": "Boende för ungdomar med problem (SiS-hem)",
    "Lexin029688": "Överenskommelse om vård för ungdom brottsling",
    "Lexin029693": "Oavlönat arbete som straff för ungdomar",
    "Lexin029786": "Ett slag underifrån mot hakan",
    "Lexin029992": "Avsikt att begå brott",
    "Lexin030274": "Att skicka en misstänkt till ett annat land",
    "Lexin030332": "Att tvinga någon till något genom hot",
    "Lexin030393": "Domstolens eller myndighetens beslut",
    "Lexin030475": "Mer omfattande läkarintyg än det vanliga",
    "Lexin030483": "Tvingad att lämna landet",
    "Lexin030501": "Att få arbeta eller studera utanför fängelset",
    "Lexin030591": "Polisen tar med den misstänkte till brottsplatsen",
    "Lexin030639": "Hjälp från Kronofogden att få in skulder",
    "Lexin030677": "Mådde dåligt efter att ha slutat med droger",
    "Lexin030682": "Jobbade som",
    "Lexin030975": "Om det blir en rättegång",
    "Lexin030976": "Om det blir rättegång",
    "Lexin031075": "Felaktig uppfattning om verkligheten",
    "Lexin031083": "Straff där man slipper fängelse om man sköter sig",
    "Lexin031086": "Släppt från fängelse i förtid",
    "Lexin031272": "Skyldighet att vittna i domstol",
    "Lexin031273": "Person som stöttar vittnen i domstolen",
    "Lexin031274": "Vad vittnet säger i rätten",
    "Lexin031347": "Olyckshändelse som ingen kan rå för",
    "Lexin031367": "Att angripa polis eller myndighetsperson",
    "Lexin031368": "Slag eller våld mot person i tjänst",
    "Lexin031382": "Polisavdelning för våldsbrott",
    "Lexin031607": "Staten tar vinsten från ett brott",
    "Lexin031622": "Rån mot värdetransport",
    "Lexin032017": "Tiden har gått ut för att kunna åtala",
    "Lexin032019": "Brottet är för gammalt för att straffas",
    "Lexin032020": "Åklagaren väljer att inte väcka åtal",
    "Lexin032046": "Att göra brott igen",
    "Lexin032564": "Begära att Hovrätten prövar domen",
    "Lexin032601": "Dömd till vård istället för fängelse",
    "Lexin032692": "Att bli kontrollerad (t.ex. av frivården)",
    "Lexin000001": "Läkarintyg enligt § 7 (för häktade)",
    "Lexin000002": "Särskilt ungdomshem enligt § 12",
    "Lexin000171": "Teorier om att straff ska vara hämnd/rättvisa",
    "Lexin000188": "Abstinensbesvär",
    "Lexin000198": "Att tacka ja till ett anbud",
    "Lexin000200": "Godkänna",
    "Lexin000203": "Tiden man har på sig att svara ja",
    "Lexin000232": "Principen att åklagare och försvarare är motparter",
    "Lexin000268": "Som rör skötsel och förvaltning",
    "Lexin000272": "Den som adopterar ett barn",
    "Lexin000276": "Det att vara adopterad",
    "Lexin000278": "Barn som blivit adopterat",
    "Lexin000280": "Syskon genom adoption",
    "Lexin000290": "Jurist som hjälper klienter i rätten",
    "Lexin000292": "Alla advokater tillsammans",
    "Lexin000312": "Kontrakt om affärer",
    "Lexin000332": "Avtal med en agent (säljare)",
    "Lexin000376": "Ägarandel i ett aktiebolag",
    "Lexin000378": "Lagen som styr aktiebolag",
    "Lexin000379": "Pengarna som ägarna satsat i bolaget",
    "Lexin000380": "Bolagets grundkapital",
    "Lexin000382": "Vinst som betalas ut till aktieägarna",
    "Lexin000383": "Person som äger aktier",
    "Lexin000473": "Utandningsprov för alkohol (blåsa)",
    "Lexin000490": "Rätten att vistas i naturen",
    "Lexin000531": "Rätt att få betalt före andra vid konkurs",
    "Lexin000540": "Att straff ska avskräcka folk från brott",
    "Lexin000544": "Lagarna om brott och straff",
    "Lexin000546": "Säkerhetskontroll vid domstol",
    "Lexin000548": "Tolk som anlitas av myndigheter",
    "Lexin000551": "Åklagare anställd av staten",
    "Lexin000559": "Brott som skadar många (t.ex. sprängning/brand)",
    "Lexin000564": "Granskar klagomål mot tidningar",
    "Lexin000565": "Kallas nu Medieombudsmannen",
    "Lexin000569": "Fond som ärver de som saknar släkt",
    "Lexin000573": "Domstolar för vanliga mål (Tingsrätt m.fl.)",
    "Lexin000578": "Statens och kommunernas pengar (skattepengar)",
    "Lexin000584": "Myndighet som löser tvister mellan kund och företag",
    "Lexin000585": "ARN (Löser konsumenttvister)",
    "Lexin000593": "Syftet att avskräcka allmänheten från brott",
    "Lexin000661": "Annat straff än det vanliga",
    "Lexin000718": "Avbetalning på lån",
    "Lexin000806": "Uträkning av hur mycket var och en ska ha",
    "Lexin000810": "Rätt till en andel av något",
    "Lexin000832": "Arvsklass 2: Föräldrar och syskon",
    "Lexin000883": "Anmälan om brott (ofta av angivare)",
    "Lexin000890": "Kritisera eller bestrida (t.ex. en dom)",
    "Lexin000909": "Frihetsberövande av misstänkt (max 3 dagar)",
    "Lexin000912": "Beslutet att anhålla någon",
    "Lexin000915": "Att starta en process i domstol",
    "Lexin000947": "Koppling till ett land eller en person",
    "Lexin000953": "Kommunen där en flykting först tas emot",
    "Lexin000968": "Rätt att använda mark för verksamhet",
    "Lexin001065": "Vad det kostade att köpa något",
    "Lexin001086": "Motparten överklagar också",
    "Lexin001096": "Att lura eller övertala någon att begå brott",
    "Lexin001147": "Formell begäran",
    "Lexin001148": "Begäran om att HD ska pröva ett gammalt mål"
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
