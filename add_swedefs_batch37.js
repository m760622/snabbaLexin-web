
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch37.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin008591": "Annat land",
    "Lexin008622": "Tvistemål om mindre värden (småmål)",
    "Lexin008646": "Avsluta eller genomföra (t.ex. ett brott)",
    "Lexin008659": "Att göra det man ska (betala eller leverera)",
    "Lexin008660": "Dom som tvingar någon att göra något (t.ex. betala)",
    "Lexin008661": "Krav i domstol att motparten ska göra något",
    "Lexin008668": "Den som ger fullmakt åt någon",
    "Lexin008670": "Person som har rätt att företräda någon",
    "Lexin008672": "Valda personer som beslutar (t.ex. i kommunen)",
    "Lexin008673": "Kommunfullmäktige",
    "Lexin008677": "Noggrann utredning av asylskäl",
    "Lexin008709": "Nedsatt förmåga (handikapp)",
    "Lexin008793": "Enskild människa (inte företag)",
    "Lexin008794": "Människa (juridisk term)",
    "Lexin008796": "Människor",
    "Lexin008815": "Papper som visar att man äger något (fångeshandling)",
    "Lexin008817": "Metod att fånga djur",
    "Lexin008842": "Dom där någon döms för brott",
    "Lexin008863": "Straff att sitta i fängelse",
    "Lexin009007": "Avtal om hur man ska dela egendom innan skilsmässa",
    "Lexin009026": "Göra klart allt inför rättegången",
    "Lexin009027": "Möte i domstolen för att reda ut vad bråket handlar om",
    "Lexin009029": "Att skaffa grejer för att göra ett brott (straffbart)",
    "Lexin009031": "Att planera att tjuvlyssna",
    "Lexin009075": "Regel som säger vad man inte får göra",
    "Lexin009082": "Kostnad för att renovera (avdragsgill)",
    "Lexin009096": "Internationellt avtal",
    "Lexin009122": "Presentera fakta för den som ska besluta",
    "Lexin009126": "Muntlig genomgång av ett ärende",
    "Lexin009127": "Land som skrivit under avtalet",
    "Lexin009134": "Att låtsas vara polis eller myndighetsperson",
    "Lexin009143": "Finnas",
    "Lexin009144": "Det som finns nu (aktuellt)",
    "Lexin009147": "Krav från myndighet att man måste göra något",
    "Lexin009156": "Sammanslutning av personer",
    "Lexin009159": "Rätt att starta och vara med i föreningar",
    "Lexin009161": "Enklare sätt att skicka brev från domstolen",
    "Lexin009165": "FN",
    "Lexin009194": "Böter för företag (vid brott i näringsverksamhet)",
    "Lexin009195": "Olika typer av bolag (AB, HB, etc.)",
    "Lexin009205": "Försök att rädda företag från konkurs",
    "Lexin009233": "Att göra en falsk kopia (t.ex. pengar, pass)",
    "Lexin009234": "Att flytta på gränsmarkeringar",
    "Lexin009241": "Skydd av statsskicket (Säpo)",
    "Lexin009291": "Att döda djur (smitta) eller växter",
    "Lexin009292": "Total förstörelse",
    "Lexin009299": "Att rättegångar ska vara öppna för allmänheten",
    "Lexin009300": "Muntlighetsprincipen",
    "Lexin009304": "Svar i förväg (t.ex. från Skatteverket)",
    "Lexin009335": "Utfrågning av polis eller i domstol",
    "Lexin009339": "Nedskrivet vad som sades i förhöret",
    "Lexin009340": "Den som ställer frågorna",
    "Lexin009341": "Sätt att ställa frågor på",
    "Lexin009346": "Massmord",
    "Lexin009355": "Felskrivning eller felsägning (lapsus)",
    "Lexin009356": "Misstag som kan rättas",
    "Lexin009391": "Att lura en ung person (till brott eller sex)",
    "Lexin009392": "Att lura med någon utomlands för att gifta bort dem",
    "Lexin009418": "Att man inte får ärva (t.ex. om man dödat arvlåtaren)",
    "Lexin009445": "Order från chefen",
    "Lexin009449": "När någon köper åt en annan (bulvan)",
    "Lexin009450": "Köp via mellanhand",
    "Lexin009469": "Rätt att få betalt först vid konkurs",
    "Lexin009471": "Bestämmelse om vem som får försäkringspengarna",
    "Lexin009477": "Brott som handlar om pengar (stöld, bedrägeri)",
    "Lexin009478": "Lagar om pengar och egendom",
    "Lexin009479": "Som rör ekonomi och avtal",
    "Lexin009480": "Ekonomisk förlust",
    "Lexin009484": "Kränkande behandling",
    "Lexin009487": "Att påstå att man inte skrivit under",
    "Lexin009510": "Uppdrag eller tjänst",
    "Lexin009515": "Regel beslutad av regeringen",
    "Lexin009516": "Regler från regeringen",
    "Lexin009536": "Skyldighet",
    "Lexin009537": "Tvinga någon",
    "Lexin009554": "Utföra (en officiell handling)",
    "Lexin009565": "Brott mot regler i naturreservat",
    "Lexin009632": "Barn och barnbarn (bröstarvingar)",
    "Lexin009633": "Det första säkra land en flykting kommer till",
    "Lexin009635": "Jag",
    "Lexin009652": "Lån av saker eller pengar",
    "Lexin009693": "Militären (försvaret)",
    "Lexin009695": "Domstol för signalspaning",
    "Lexin009703": "Att gömma undan pengar vid konkurs",
    "Lexin009704": "Att hindra inspektion av miljöfarlig verksamhet",
    "Lexin009707": "Saker som gör brottet värre",
    "Lexin009732": "Kostnad för att sälja (mäklararvode)",
    "Lexin009742": "Släpps fri",
    "Lexin009745": "Att börja göra ett brott men inte lyckas",
    "Lexin009747": "Försök till brott",
    "Lexin009748": "Brott som inte fullbordats",
    "Lexin009757": "Vatten, el, avlopp och sophämtning",
    "Lexin009762": "Att prata illa om en död person (brottsligt)",
    "Lexin009776": "Att låta bli att berätta, hålla tyst om",
    "Lexin009805": "Trycker undan",
    "Lexin009831": "Polisens utredning på papper",
    "Lexin009842": "Ta hand om hus eller pengar",
    "Lexin009846": "Att ha en förvaltare (tvångshjälp)",
    "Lexin009852": "Domstol som prövar myndighetsbeslut",
    "Lexin009854": "Domstolar som dömmer i mål mot myndigheter"
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
