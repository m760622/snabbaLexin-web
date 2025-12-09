const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch86.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin006548": "Elgitarr",
    "Lexin006577": "Konstgjort öga",
    "Lexin006726": "Enligt hälso- och sjukvårdslagen",
    "Lexin006728": "Enligt vårdgarantin",
    "Lexin006937": "Ett sankt område",
    "Lexin007502": "Smittsam hudrodnad",
    "Lexin007593": "Feber från parasitsjukdom",
    "Lexin007618": "Slug person",
    "Lexin007799": "Återupplevande av minnen",
    "Lexin007800": "Återupplevande av traumatiska minnen",
    "Lexin007857": "Parasitsjukdom som ger blindhet",
    "Lexin007964": "Fläckar",
    "Lexin008220": "Fotled",
    "Lexin008286": "Framkallats av",
    "Lexin008527": "Frukt",
    "Lexin008534": "Mycket svår eksem",
    "Lexin008747": "Uttryck för äckel",
    "Lexin008748": "Uttryck för förvåning",
    "Lexin008799": "Bli mycket arg",
    "Lexin008910": "Fästa tejpremsor",
    "Lexin008911": "Fästad",
    "Lexin008929": "Födelsemärke",
    "Lexin008939": "Allergi mot mat",
    "Lexin009260": "Förfäder",
    "Lexin009345": "Fullständig förstörelse",
    "Lexin009405": "Förlorade ett öga i bråk",
    "Lexin010084": "Ge effekt",
    "Lexin010182": "Genomgå",
    "Lexin010820": "Grönsallad",
    "Lexin010830": "Uttryck för lättnad",
    "Lexin010995": "Gömd i buskage",
    "Lexin011008": "Gör små sår",
    "Lexin011195": "Handled",
    "Lexin011358": "Helt avtrubbade",
    "Lexin011359": "Helt grumlig",
    "Lexin011361": "Helt utmattad",
    "Lexin011371": "Blodkärlssvulst, smultronmärke",
    "Lexin011433": "Hemsk",
    "Lexin011435": "Hemska mardrömmar",
    "Lexin011544": "Ämne som ger allergireaktion",
    "Lexin011613": "Hjärnsubstans",
    "Lexin011732": "Medicin mot hosta",
    "Lexin011753": "Huden spricker",
    "Lexin011777": "Huliganbråk",
    "Lexin011809": "Hur yttrar sig den",
    "Lexin011839": "Husläkare",
    "Lexin011903": "Kortisonkräm",
    "Lexin012006": "Hålla balansen",
    "Lexin012032": "Håller avstånd",
    "Lexin012043": "Hållit föredrag om",
    "Lexin012074": "Hårdhet",
    "Lexin012089": "Skrämmande historia",
    "Lexin012169": "Hälsokostaffär",
    "Lexin012171": "Hälsosam tallrik",
    "Lexin012295": "Höga toner",
    "Lexin012386": "Små ben i örat",
    "Lexin012396": "Celler för hörsel",
    "Lexin012405": "Hösnuva",
    "Lexin012410": "Virussjukdom hos barn",
    "Lexin012437": "I lymfknutor",
    "Lexin012446": "I vaket tillstånd",
    "Lexin012457": "Hudutslag utan allergi",
    "Lexin012553": "Ilsken av mig",
    "Lexin012709": "Infekterar vävnader",
    "Lexin012713": "Infektionskliniken",
    "Lexin012727": "Inflammation uppstår",
    "Lexin012781": "Ingredienserna",
    "Lexin012796": "Apparat för inandning av läkemedel",
    "Lexin013003": "Problem att somna",
    "Lexin013207": "Invaderar där sniglar finns",
    "Lexin013210": "Gör invalid",
    "Lexin013223": "Komplext system",
    "Lexin013244": "Inälvor",
    "Lexin013262": "Irriterar mig",
    "Lexin013401": "Jourhavande läkare",
    "Lexin013561": "Mycket svettigt",
    "Lexin013665": "Kallsvettig",
    "Lexin013666": "Benbildning vid läkning",
    "Lexin013667": "Kallus blir till ben",
    "Lexin013693": "Vätska i ögat",
    "Lexin013894": "Kognitiv beteendeterapi",
    "Lexin014084": "Kliar",
    "Lexin014177": "Kläcks i sötvatten",
    "Lexin014243": "Gå mödosamt",
    "Lexin014277": "Små knölar",
    "Lexin014289": "Knutor",
    "Lexin014437": "Kombination av",
    "Lexin014583": "Koncentrera sig på något",
    "Lexin014640": "Konkava glasögon",
    "Lexin014673": "Violinist i orkester",
    "Lexin014694": "Konstaterade",
    "Lexin014698": "Konstgjord lins inopererad",
    "Lexin014766": "Hudutslag från kontakt",
    "Lexin014794": "Kontinuerlig tinnitus",
    "Lexin014850": "Vanlig behandling",
    "Lexin014858": "Konvexa glasögon",
    "Lexin015040": "Kramper",
    "Lexin015070": "Kravlar ut",
    "Lexin015102": "Krig",
    "Lexin015254": "Krutröken"
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
