
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch36.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin007047": "Ställe där man hämtar domar och beslut",
    "Lexin007076": "När staten tvingar till sig mark",
    "Lexin007077": "Tvångsinlösen av fastighet",
    "Lexin007078": "Att staten tar privat mark mot ersättning",
    "Lexin007079": "Mål om tvångsinlösen av mark",
    "Lexin007081": "Rättegång om expropriation",
    "Lexin007083": "När man vinner en rätt genom att någon annan förlorar den",
    "Lexin007097": "Undantag som ges mycket sällan (av regeringen)",
    "Lexin007145": "Fackförening",
    "Lexin007158": "Det att vara far till ett barn",
    "Lexin007159": "Skriftligt intyg om vem som är pappan",
    "Lexin007160": "Bekräftelse av faderskap",
    "Lexin007163": "Regeln att mammans make antas vara pappan",
    "Lexin007174": "Något som faktiskt hänt eller existerar",
    "Lexin007176": "När man misstar sig på fakta",
    "Lexin007177": "Misstag om sakinnehållet",
    "Lexin007178": "Den som faktiskt tar hand om barnet till vardags",
    "Lexin007181": "Fel på varan (fysiskt fel)",
    "Lexin007186": "Räkning",
    "Lexin007220": "Att ljuga om att någon gjort brott",
    "Lexin007222": "När larmet går utan anledning",
    "Lexin007223": "Brott att utlösa larm i onödan",
    "Lexin007224": "Att åtala någon på falska grunder",
    "Lexin007225": "Att oskyldigt peka ut någon som brottsling",
    "Lexin007240": "Föräldrar som tar hand om andras barn (fosterföräldrar)",
    "Lexin007248": "Lagar om äktenskap, barn och arv",
    "Lexin007250": "Om man är gift, singel eller sambo",
    "Lexin007253": "Ärenden om att få hit sin familj",
    "Lexin007294": "Att bli dåligt behandlad",
    "Lexin007297": "Något som hotar tryggheten i samhället",
    "Lexin007299": "Bråttom (annars kan bevis eller värden försvinna)",
    "Lexin007330": "Hastighetsbegränsning",
    "Lexin007334": "Större båt",
    "Lexin007388": "Intyg om vem som äger fastigheten (gravationsbevis)",
    "Lexin007389": "Att skapa, ändra eller ta bort fastigheter",
    "Lexin007390": "Lagen om hur fastigheter bildas",
    "Lexin007391": "Register över alla fastigheter och ägare",
    "Lexin007394": "Lån med huset som säkerhet",
    "Lexin007395": "Köp av hus eller mark",
    "Lexin007396": "Tvist om fastighet",
    "Lexin007398": "Myndighet som kontrollerar mäklare",
    "Lexin007399": "Lantmäteriets register över fastigheter",
    "Lexin007400": "Ändring av fastighetsgränser eller servitut",
    "Lexin007401": "Juridik som rör hus och mark",
    "Lexin007406": "Saker som hör till huset (t.ex. vitvaror)",
    "Lexin007421": "Domstolsbeslut om vem som är pappa",
    "Lexin007422": "Beslut om vem som är mamma (ovanligt)",
    "Lexin007425": "Dom som slår fast ett rättsförhållande",
    "Lexin007426": "Talan för att få reda på om en rättighet finns",
    "Lexin007474": "När varan är trasig eller felaktig",
    "Lexin007597": "Lokalkontor",
    "Lexin007646": "Avtryck av fingret (för identifiering)",
    "Lexin007710": "Hyra av fiskevatten",
    "Lexin007714": "Rätten att fiska i ett visst vatten",
    "Lexin007906": "Sabotage mot flygtrafik",
    "Lexin007920": "Konventionsflykting (FN-flykting)",
    "Lexin007921": "Beslut om att någon är flykting",
    "Lexin007922": "Boende för asylsökande",
    "Lexin007923": "Antal flyktingar Sverige tar emot (kvotflyktingar)",
    "Lexin007924": "Att vara flykting",
    "Lexin007925": "Första mottagandet av flyktingar",
    "Lexin007927": "Statusförklaring som flykting",
    "Lexin007995": "UNHCR",
    "Lexin008056": "Lagar som gäller mellan länder (internationell rätt)",
    "Lexin008063": "All offentlig makt utgår från folket",
    "Lexin008093": "Krav på betalning",
    "Lexin008102": "Avtal som måste vara skriftligt för att gälla",
    "Lexin008115": "Fel i hur man skrivit eller gjort ansökan",
    "Lexin008121": "Krav på hur ett dokument ska se ut (t.ex. namnteckning)",
    "Lexin008173": "Regel om vilken domstol som ska ta målet",
    "Lexin008174": "Vilken domstol man ska vända sig till",
    "Lexin008228": "Att ta kort (t.ex. för pass eller polisregister)",
    "Lexin008273": "Det står tydligt i texten",
    "Lexin008282": "Brott där man utsätter andra för risk",
    "Lexin008307": "Begära att domstolen ska döma på ett visst sätt",
    "Lexin008337": "Att hyra ett affärskoncept (t.ex. McDonalds)",
    "Lexin008373": "Inte häktad eller fängslad",
    "Lexin008374": "Rätt att göra vad man vill med egendomen",
    "Lexin008379": "Domstolen får värdera bevisen fritt",
    "Lexin008380": "Frikännande",
    "Lexin008381": "Dom där den åtalade frias",
    "Lexin008383": "Den åtalade döms inte",
    "Lexin008394": "Skyddad av lagen (får ej röras)",
    "Lexin008395": "Brott mot personlig frid (t.ex. trakasserier)",
    "Lexin008396": "Att störa eller ofreda någon",
    "Lexin008411": "Intagen i fängelse eller häkte",
    "Lexin008412": "Fängslande (arrest, häkte, fängelse)",
    "Lexin008420": "Slipper göra lumpen",
    "Lexin008432": "Döma att någon är oskyldig",
    "Lexin008445": "Person som åker utan att betala",
    "Lexin008456": "Säga ifrån att man inte tar ansvar",
    "Lexin008458": "Text i avtal som begränsar ansvar",
    "Lexin008459": "Klausul om ansvarsfrihet",
    "Lexin008460": "Villkor som tar bort ansvar",
    "Lexin008468": "Skyddad plats",
    "Lexin008494": "Att flytta tillbaka frivilligt",
    "Lexin008499": "Frivården (Kriminalvården i frihet)",
    "Lexin008563": "Bortsett från",
    "Lexin008581": "Att hjälpa en fånge att rymma",
    "Lexin008587": "Pass för utländska medborgare som saknar pass"
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
