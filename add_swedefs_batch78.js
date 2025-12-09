
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch78.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin020940": "Avancerad undersökning för cancer",
    "Lexin020960": "Efter en operation",
    "Lexin021103": "P-piller, kondom, spiral m.m.",
    "Lexin021119": "Allergitest på underarmen",
    "Lexin021127": "Första gången man smittas",
    "Lexin021131": "Vätska som njuren först gör (mest vatten)",
    "Lexin021132": "Vårdcentral (inte sjukhus)",
    "Lexin021236": "I förebyggande syfte",
    "Lexin021238": "Kvinnligt könshormon (gulkroppshormon)",
    "Lexin021241": "Förutsägelse om sjukdomsförloppet",
    "Lexin021242": "Förutsägelser",
    "Lexin021258": "Glasögon med glidande styrka",
    "Lexin021309": "Blodpropp",
    "Lexin021323": "Cancer i prostatan",
    "Lexin021324": "Vanligt hos äldre män (svårt att kissa)",
    "Lexin021325": "Körtel runt urinröret hos män",
    "Lexin021334": "När implantatet lossnar",
    "Lexin021345": "Encelliga parasiter (t.ex. amöba)",
    "Lexin021419": "Hudsjukdom med fjällande fläckar",
    "Lexin021429": "Hjälp att fungera efter psykisk sjukdom",
    "Lexin021432": "Som rör sinnet/känslolivet",
    "Lexin021438": "Svårigheter pga psykisk ohälsa",
    "Lexin021444": "Operation på hjärnan mot psykisk sjukdom",
    "Lexin021454": "Kroppsligt symtom av psykiskt orsak",
    "Lexin021455": "Samtalsterapeut",
    "Lexin021478": "Pulver (t.ex. talkpuder)",
    "Lexin021488": "Tandnerven",
    "Lexin021490": "Hjärtslagen man kan känna vid handleden",
    "Lexin021491": "Vitalparametrar",
    "Lexin021493": "Pulsen (hjärtfrekvensen vid handleden)",
    "Lexin021497": "Pulver (t.ex. medicin)",
    "Lexin021502": "Hjärtats uppgift",
    "Lexin021509": "Påsen som testiklarna hänger i",
    "Lexin021524": "Det svarta hålet i ögat",
    "Lexin021673": "Djur med päls (t.ex. katt/hund - allergi)",
    "Lexin021724": "Strålning från radioaktiva ämnen",
    "Lexin021727": "Behandling av sköldkörteln med radioaktivt jod",
    "Lexin021857": "Ljud vid andning (bronkit/lunginflammation)",
    "Lexin021884": "Sticka för att testa blod/urin",
    "Lexin021919": "Papper från läkaren för att hämta medicin",
    "Lexin021920": "Medicin man kan köpa utan läkare",
    "Lexin021923": "Gen som inte syns om man har en dominant gen",
    "Lexin021969": "Pris som staten betalar för medicin",
    "Lexin021978": "Automatiska reaktioner (t.ex. knäreflex)",
    "Lexin022059": "Styra (t.ex. hormoner)",
    "Lexin022077": "Träning efter skada/sjukdom",
    "Lexin022119": "Via ändtarmen (stolpiller)",
    "Lexin022124": "Kameraundersökning av ändtarmen",
    "Lexin022218": "Att sätta tillbaka på plats",
    "Lexin022249": "Försäkring för sjukvård utomlands",
    "Lexin022278": "Test om bakterien klarar antibiotika",
    "Lexin022279": "Bakterier som inte dör av antibiotika (MRSA)",
    "Lexin022301": "Tabletter som smälter i munnen",
    "Lexin022311": "Maskin som andas åt patienten",
    "Lexin022337": "Torrhosta som kliar i halsen",
    "Lexin022340": "Skada på näthinnan (diabetesögon)",
    "Lexin022368": "Ben i bröstkorgen",
    "Lexin022398": "Blodgruppsprotein (Rh+ / Rh-)",
    "Lexin022421": "Mycket",
    "Lexin022422": "Stor blödning",
    "Lexin022512": "Muskler som stänger (t.ex. i magen/ändtarmen)",
    "Lexin022537": "Personer som lättare blir sjuka",
    "Lexin022538": "Grupper som är mer utsatta",
    "Lexin022592": "Blir röd",
    "Lexin022632": "Hudinfektion med röda fläckar",
    "Lexin022679": "Virus som ger förkylning/lunginflammation hos små barn",
    "Lexin022721": "Stjärten",
    "Lexin022788": "Vanligt prov man tar regelbundet",
    "Lexin022805": "Ofrivillig muskelryckning",
    "Lexin022810": "Nervsträngen i ryggraden",
    "Lexin022813": "Hålrummet i ryggraden",
    "Lexin022814": "Nerv som går ut från ryggmärgen",
    "Lexin022815": "Likvor (vätska runt hjärnan/ryggmärgen)",
    "Lexin022816": "CSF (cerebrospinalvätska)",
    "Lexin022820": "Plötslig smärta i nedre ryggen",
    "Lexin022821": "Svårt att röra ryggen",
    "Lexin022859": "Hjärtflimmer eller annan oregelbundenhet",
    "Lexin022896": "Sädesslag (råg)",
    "Lexin023127": "Cellerna som bär syre i blodet",
    "Lexin023128": "Erytrocyter",
    "Lexin023147": "Hjälp att sluta röka",
    "Lexin023148": "Nikotinplåster, nikotintuggummi m.m.",
    "Lexin023159": "Sluta röka",
    "Lexin023168": "Bilder av skelettet med röntgenstrålar",
    "Lexin023192": "Svårt att röra sig (stelt)",
    "Lexin023198": "Förmåga att röra sig",
    "Lexin023300": "Produktion av saliv",
    "Lexin023301": "Spott (vätska i munnen)",
    "Lexin023302": "Körtel som gör saliv",
    "Lexin023361": "Allvarliga smittsamma sjukdomar",
    "Lexin023379": "Sex",
    "Lexin023398": "När muskeln drar ihop sig",
    "Lexin023399": "Värkar (vid förlossning)",
    "Lexin023403": "Utslag som flyter ihop",
    "Lexin023434": "Få rörelserna att fungera ihop",
    "Lexin023504": "Hur säker man måste vara",
    "Lexin023587": "Nukleärmedicinsk undersökning",
    "Lexin023672": "Urinen som lämnar kroppen",
    "Lexin023713": "Komplikationer som kommer sent",
    "Lexin023716": "Strukturer som fäster muskler vid ben"
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
