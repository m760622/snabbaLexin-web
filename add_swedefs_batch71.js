
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch71.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin010607": "Benbrott hos barn där benet spricker men inte går av helt",
    "Lexin010618": "Sprider sig som grenar",
    "Lexin010665": "Stor och inte finfördelad",
    "Lexin010683": "Tjocktarmen",
    "Lexin010686": "Inte klar",
    "Lexin010687": "När något är grumligt",
    "Lexin010688": "Grå starr (katarakt)",
    "Lexin010701": "Det innersta benet i fingret/tån",
    "Lexin010718": "Anledningen i botten",
    "Lexin010719": "Huvudregel",
    "Lexin010720": "Sjukdomen som orsakar andra problem",
    "Lexin010765": "Hjärnans nervceller (där tankar finns)",
    "Lexin010774": "Proppar i halsmandlarna",
    "Lexin010841": "Benmärg som mest består av fett",
    "Lexin010855": "Metod att ta bort hemorrojder",
    "Lexin010886": "Läkare för kvinnosjukdomar",
    "Lexin010887": "Kvinnoläkare",
    "Lexin010888": "Kvinnosjukdomar",
    "Lexin010889": "Läran om kvinnans sjukdomar",
    "Lexin010890": "Cellprov (för att hitta cancer)",
    "Lexin010891": "Gynstol",
    "Lexin010909": "System av rör",
    "Lexin010912": "Led som bara kan böjas åt ett håll (t.ex. knä)",
    "Lexin010920": "Går sönder (t.ex. benet)",
    "Lexin010939": "När håren reser sig på huden (fryser/rädd)",
    "Lexin010941": "Hjälpmedel för att gå (rollator)",
    "Lexin011021": "Formad som bokstaven H",
    "Lexin011036": "Bakterie som ger lunginflammation (Hib)",
    "Lexin011051": "Mask i magen",
    "Lexin011089": "Böld bakom halsmandeln (peritonsillit)",
    "Lexin011091": "Muskler som håller huvudet",
    "Lexin011093": "Ont i halsen med bakterier (tonsillit)",
    "Lexin011094": "Halsfluss",
    "Lexin011097": "Kotorna i nacken (C1-C7)",
    "Lexin011098": "Nackkotorna",
    "Lexin011101": "Körtlar i halsen",
    "Lexin011103": "När det gör ont att svälja",
    "Lexin011104": "Stora blodkärlet på halsen (karotis)",
    "Lexin011121": "Som en halvmåne (t.ex. menisken)",
    "Lexin011142": "Ett av hörselbenen",
    "Lexin011146": "Kommer till",
    "Lexin011153": "Kroppsdelen längst ut på armen",
    "Lexin011174": "Insidan av handen",
    "Lexin011207": "Tvångshandlingar (OCD)",
    "Lexin011209": "Leden mellan hand och arm",
    "Lexin011210": "Handleden",
    "Lexin011222": "De små benen i handleden",
    "Lexin011235": "Muskler i handen",
    "Lexin011260": "Balans och lugn",
    "Lexin011262": "Missbildning i läppen (LKG)",
    "Lexin011270": "Nötter som många är allergiska mot",
    "Lexin011277": "Snabbt",
    "Lexin011292": "Sädesslag (nyttigt för magen)",
    "Lexin011339": "Magmunsbakterie (ger magsår)",
    "Lexin011372": "Läran om blodsjukdomar",
    "Lexin011373": "Blåmärke (blödning under huden)",
    "Lexin011374": "Blod i urinen",
    "Lexin011422": "Bloddialys (rena blodet i maskin)",
    "Lexin011423": "Blödarsjuka",
    "Lexin011425": "Det röda i blodet (bär syre)",
    "Lexin011426": "Blodvärde",
    "Lexin011427": "Bakterier som förstör blodkroppar (halsfluss)",
    "Lexin011429": "Åderbråck i ändtarmen",
    "Lexin011432": "Vård i hemmet",
    "Lexin011460": "Leverinflammation",
    "Lexin011461": "Smittsam gulsot (via mat/vatten)",
    "Lexin011462": "Gulsot via blod/sex",
    "Lexin011463": "Gulsot via blod (ofta narkomaner)",
    "Lexin011467": "Arv",
    "Lexin011468": "När något trycks ut genom en öppning",
    "Lexin011471": "Virus som ger blåsor",
    "Lexin011473": "Infektion av herpesvirus",
    "Lexin011474": "Viruset som ger munsår eller könssår",
    "Lexin011484": "När rösten låter konstig",
    "Lexin011503": "Infektion av en bakterie (vaccin finns för barn)",
    "Lexin011528": "Tunt lager vävnad",
    "Lexin011529": "Gångar i innerörat (balans)",
    "Lexin011532": "Täckt av en hinna",
    "Lexin011533": "Del av innerörat",
    "Lexin011534": "Snäckan (hörseln)",
    "Lexin011535": "Små blåsor",
    "Lexin011545": "Ämne som frisätts vid allergi",
    "Lexin011546": "Läran om vävnader (i mikroskop)",
    "Lexin011564": "Blodprov för hiv",
    "Lexin011581": "Organ som hjälper till",
    "Lexin011587": "Likvor (vätskan runt hjärnan)",
    "Lexin011589": "Organet i huvudet som tänker",
    "Lexin011590": "Hjärnan (cerebrum)",
    "Lexin011591": "Förbindelsen mellan hjärnhalvorna",
    "Lexin011592": "Bryggan mellan hjärnhalvorna",
    "Lexin011593": "Yttre lagret av hjärnan",
    "Lexin011594": "Grå substansen (cortex)",
    "Lexin011595": "Hypofysen",
    "Lexin011597": "Del av hjärnstammen",
    "Lexin011600": "Hjärnhalvorna",
    "Lexin011601": "Hinnan runt hjärnan",
    "Lexin011602": "Tre hinnor som skyddar hjärnan",
    "Lexin011605": "Stroke (propp i hjärnan)",
    "Lexin011606": "Del av hjärnan (t.ex. pannlob)",
    "Lexin011607": "Nerver som går direkt från hjärnan"
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
