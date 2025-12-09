
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch59.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin028454": "Använda lagregler i ett verkligt fall",
    "Lexin028457": "Den paragraf som passar på fallet",
    "Lexin028475": "Jurist som gör praktik på domstol",
    "Lexin028736": "Brott i trafiken (t.ex. rattfylleri)",
    "Lexin028740": "Mindre fel i trafiken (t.ex. köra mot rött)",
    "Lexin028760": "Att vara elak mot någon upprepade gånger",
    "Lexin028856": "Dom när ena parten inte dyker upp (man förlorar automatiskt)",
    "Lexin028858": "Systemet med Tingsrätt, Hovrätt och Högsta domstolen",
    "Lexin028930": "Att svika ett förtroende och skada ekonomiskt",
    "Lexin029034": "Börja gälla (om lagar)",
    "Lexin029236": "Regler som inte får avtalas bort",
    "Lexin029259": "När Socialtjänsten tar hand om barn/missbrukare med tvång",
    "Lexin029262": "Att tvingas gifta sig mot sin vilja",
    "Lexin029266": "Metoder som polisen får använda (t.ex. husrannsakan/häktning)",
    "Lexin029495": "Rätt att träffa sina barn efter skilsmässa",
    "Lexin029496": "Föräldern som barnet inte bor hos men träffar",
    "Lexin029507": "Att ta bort en dom fel (t.ex. pga grovt fel)",
    "Lexin029508": "Att förstöra/gömma bevis",
    "Lexin029509": "Beslut att ta bort ett tidigare beslut",
    "Lexin029523": "Att lova att tala sanning i skrift (istället för ed)",
    "Lexin029547": "Uppgörelse om skulder utan konkurs",
    "Lexin029562": "Pengar till barnet från föräldern som inte bor där",
    "Lexin029565": "Laglig skyldighet att försörja barn/make",
    "Lexin029566": "Pengar från Försäkringskassan om bidraget inte betalas",
    "Lexin029591": "Att låta bli att göra något man borde",
    "Lexin029616": "Information från myndighet till person (delgivning)",
    "Lexin029617": "Varning om att man kan bli vräkt",
    "Lexin029644": "Utredning",
    "Lexin029652": "Brott där man gömmer sanningen för rätten",
    "Lexin029684": "Brott som begås av unga",
    "Lexin029776": "Tillstånd att bo i Sverige",
    "Lexin029822": "Sagt/berättat (i förhör)",
    "Lexin029836": "Den som skapat ett verk (konst/musik/bok)",
    "Lexin029842": "Att ta bort ett beslut/lag",
    "Lexin029882": "Hyra ut eller låna ut (rättighet)",
    "Lexin029884": "Rätten att använda något (t.ex. bostadsrätt)",
    "Lexin029964": "Få göra något senare (t.ex. betala skatt)",
    "Lexin029996": "Att säga upp ett avtal (jobb/lägenhet)",
    "Lexin030084": "Viktigt dokument (pass, betyg, kontrakt)",
    "Lexin030086": "Att förfalska en urkund",
    "Lexin030192": "Att inte vara där (frånvaro)",
    "Lexin030207": "När tingsrätten godkänner stämningen och skickar den",
    "Lexin030210": "Ett löfte som är bindande",
    "Lexin030211": "Löfte",
    "Lexin030214": "Att jobba av sitt straff",
    "Lexin030216": "Att ta med saker ut ur landet",
    "Lexin030266": "Pengar man lagt ut (får tillbaka sen)",
    "Lexin030268": "Skicka en brottsling till ett annat land",
    "Lexin030275": "När ett land begär att få en brottsling utlämnad",
    "Lexin030281": "Lagen om migration och asyl",
    "Lexin030307": "När Kronofogden tar saker för att betala skuld",
    "Lexin030311": "Saker man får behålla vid utmätning (kläder/möbler)",
    "Lexin030366": "Det någon säger i rätten (vittnesmål)",
    "Lexin030386": "Beslut om patienten får lämna psykiatrin",
    "Lexin030394": "Beslut från myndighet (t.ex. Kronofogden)",
    "Lexin030429": "Verksamheten hos Kronofogden",
    "Lexin030458": "Att berätta noggrant om sin talan i rätten",
    "Lexin030482": "Tvinga någon att lämna landet",
    "Lexin030489": "Utvisning som straff för brott",
    "Lexin030503": "Kontrollera att allt går rätt till",
    "Lexin030622": "Hur man sköter sig (levnadssätt)",
    "Lexin030654": "När man inte tar hand om t.ex. djur/barn",
    "Lexin030667": "Tillstånd att ha vapen",
    "Lexin030749": "Förvarning (t.ex. om uppsägning)",
    "Lexin030766": "Att kopiera märkeskläder olovligt (piratkopior)",
    "Lexin030768": "Smuggling",
    "Lexin030887": "Resultat/konsekvens",
    "Lexin030914": "Se till att domen blir verklighet (t.ex. fängelse/betalning)",
    "Lexin030920": "Något som hindrar verkställighet (t.ex. sjukdom)",
    "Lexin031079": "Krav för att något ska gälla",
    "Lexin031085": "Att släppas ur fängelse efter 2/3 av tiden",
    "Lexin031093": "Lura",
    "Lexin031136": "Bli slutgiltig (kan inte överklagas mer)",
    "Lexin031144": "Ekonomisk vinst av brott",
    "Lexin031246": "Hot om böter om man inte gör som myndigheten säger",
    "Lexin031268": "Eden vittnet svär",
    "Lexin031269": "Förhör med vittne i rätten",
    "Lexin031270": "När ett vittne inte får vittna (t.ex. nära släkt)",
    "Lexin031329": "Tvingas flytta från lägenheten",
    "Lexin031366": "Våld hemma (mot partner/barn)",
    "Lexin031369": "Slå eller knuffa polis/vakt",
    "Lexin031391": "Den som orsakat olyckan",
    "Lexin031393": "Att råka döda någon genom slarv (ej mord)",
    "Lexin031432": "Juridiskt ansvar för barn",
    "Lexin031442": "Slarv (som orsakar skada)",
    "Lexin031458": "När åklagaren bestämmer att det blir rättegång",
    "Lexin031490": "Dom från Högsta domstolen som visar hur lagen ska tolkas",
    "Lexin031529": "Verklig risk (för asyl)",
    "Lexin031592": "Krig",
    "Lexin031612": "Aktier och obligationer",
    "Lexin031800": "Begära att domstolen ska döma på ett visst sätt",
    "Lexin031802": "Skälen till yrkandet",
    "Lexin031861": "Gräns mot land utanför EU (Schengen)",
    "Lexin031886": "Hänvisa till (som stöd för sin sak)",
    "Lexin031887": "Kalla någon som vittne",
    "Lexin031918": "Myndigheten där åklagare jobbar",
    "Lexin031956": "Rätt att lämna tillbaka vara man köpt på nätet (14 dagar)",
    "Lexin032010": "Något man lovat göra",
    "Lexin032015": "Den åtalade frias",
    "Lexin032016": "Åklagaren har bevisat brottet"
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
