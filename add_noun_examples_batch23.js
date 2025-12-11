/**
 * Add examples to nouns - Batch 23 (100 nouns: Geting to Grundforskning)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin010241": ["Getingen stack mig.", "لسعتني النحلة."],
    "Lexin010242": ["Getingboet hängde i trädet.", "تعلقت خلية النحل في الشجرة."],
    "Lexin010245": ["Gettot var isolerat.", "كان الغيتو معزولاً."],
    "Lexin010246": ["Geväret laddades.", "حُشيت البندقية."],
    "Lexin010251": ["Giffeln var färsk.", "كانت الجيفل طازجة."],
    "Lexin010253": ["Giftet var farligt.", "كان السم خطيراً."],
    "Lexin010255": ["Giftet gick inte.", "لم ينجح الزواج."],
    "Lexin010258": ["Giftermålet firades.", "احتُفل بالزواج."],
    "Lexin010264": ["Giftorätten gällde.", "سرى حق الملكية بالزواج."],
    "Lexin010267": ["Giftorättsgodset delades.", "قُسمت ممتلكات الزوجية."],
    "Lexin010270": ["Gigabiten mättes.", "قيست الجيجا بايت."],
    "Lexin010271": ["Giganten var stark.", "كان العملاق قوياً."],
    "Lexin010273": ["Gikten gav smärta.", "سبب النقرس ألماً."],
    "Lexin010275": ["Giljotinen användes förr.", "استُخدمت المقصلة قديماً."],
    "Lexin010278": ["Gillestugan var mysig.", "كانت غرفة المعيشة مريحة."],
    "Lexin010286": ["Ginsten blommade.", "أزهر الرتم."],
    "Lexin010288": ["Gipset hårdnade.", "تصلب الجبس."],
    "Lexin010294": ["Giren var skarp.", "كان الالتفاف حاداً."],
    "Lexin010295": ["Giraffen var hög.", "كانت الزرافة طويلة."],
    "Lexin010299": ["Girigbuken gav aldrig.", "لم يعط البخيل أبداً."],
    "Lexin010300": ["Girot användes för betalning.", "استُخدم نظام التجيير للدفع."],
    "Lexin010306": ["Gissningen var rätt.", "كان التخمين صحيحاً."],
    "Lexin010308": ["Gitarren klingade.", "صدحت الغيتار."],
    "Lexin010309": ["Gitarristen spelade solo.", "عزف عازف الغيتار منفرداً."],
    "Lexin010311": ["Given var min.", "كان التوزيع لي."],
    "Lexin010325": ["Gjuteriet producerade metall.", "أنتج المسبك المعدن."],
    "Lexin010331": ["Glaciären smälte.", "ذاب الجبل الجليدي."],
    "Lexin010337": ["Glamouren lockade.", "جذبت الفتنة."],
    "Lexin010348": ["Glasbruket exporterade.", "صدّر مصنع الزجاج."],
    "Lexin010353": ["Glasmästaren reparerade.", "أصلح الزجاج."],
    "Lexin010356": ["Glasyren smakade sött.", "طعم الطلاء السكري حلو."],
    "Lexin010368": ["Glidningen var långsam.", "كان الانزلاق بطيئاً."],
    "Lexin010373": ["Glittret prydde granen.", "زيّنت الزينة البراقة الشجرة."],
    "Lexin010375": ["Globen representerade jorden.", "مثلت الكرة الأرض."],
    "Lexin010382": ["Glorian lyste.", "أضاءت الهالة."],
    "Lexin010383": ["Glosan memorerades.", "حُفظت اللفظة."],
    "Lexin010399": ["Glykolen fryser inte.", "لا يتجمد الغليكول."],
    "Lexin010402": ["Glåporden sårade.", "جرحت الشتائم."],
    "Lexin010411": ["Dörren stod på glänt.", "كان الباب مفتوحاً جزئياً."],
    "Lexin010412": ["Gläntan var solig.", "كانت الفرجة مشمسة."],
    "Lexin010420": ["Glödlampan slocknade.", "انطفأت اللمبة الكهربائية."],
    "Lexin010421": ["Glöggen serverades varm.", "قُدم الجلوج ساخناً."],
    "Lexin010425": ["Glömskan var total.", "كان النسيان تاماً."],
    "Lexin010428": ["Gnabbet fortsatte.", "استمر الشجار."],
    "Lexin010449": ["Gnället irriterade.", "أزعج التذمر."],
    "Lexin010453": ["Hon hade go i sig.", "كان لديها نشاط."],
    "Lexin010454": ["Gobelängen hängde på väggen.", "علق النسيج على الجدار."],
    "Lexin010470": ["Godbiten smakade.", "طعمت القطعة اللذيذة."],
    "Lexin010474": ["Godingen var vacker.", "كانت الجذابة جميلة."],
    "Lexin010481": ["Till godo kom det.", "جاء ذلك حُبّي."],
    "Lexin010482": ["Godset var stort.", "كانت العزبة كبيرة."],
    "Lexin010483": ["Godset levererades.", "سُلمت البضائع."],
    "Lexin010484": ["Godsaken var söt.", "كانت الحلوى حلوة."],
    "Lexin010494": ["Golfen spelades.", "لُعب الغولف."],
    "Lexin010505": ["Gommen kändes torr.", "شُعر بجفاف سقف الحلق."],
    "Lexin010517": ["Gonorrén behandlades.", "عولج السيلان."],
    "Lexin010519": ["Gorillan var kraftfull.", "كانت الغوريلا قوية."],
    "Lexin010522": ["Gossen lekte.", "لعب الولد."],
    "Lexin010525": ["Gottet delades ut.", "وُزعت الحلوى."],
    "Lexin010528": ["Gottegrisen åt godis.", "أكل محب الحلوى الحلوى."],
    "Lexin010541": ["Graffiti täckte väggen.", "غطى الرسم الجدار."],
    "Lexin010542": ["Grafiken var intressant.", "كانت الفنون التخطيطية مثيرة."],
    "Lexin010545": ["Grahamsmjölet användes.", "استُخدم دقيق غراهام."],
    "Lexin010549": ["Granen pryddes.", "زُينت شجرة الصنوبر."],
    "Lexin010550": ["Granaten exploderade.", "انفجرت القذيفة."],
    "Lexin010554": ["Graniten var hård.", "كان الغرانيت صلباً."],
    "Lexin010558": ["Inte ett grann!", "ولا قليل!"],
    "Lexin010560": ["Grannlåten var för mycket.", "كانت الفخامة مبالغاً فيها."],
    "Lexin010570": ["Grapefrukten var besk.", "كانت الجريب فروت مُرة."],
    "Lexin010571": ["Gratifikationen betalades.", "دُفعت المكافأة المالية."],
    "Lexin010574": ["Gratisprogrammet laddades ner.", "نُزل البرنامج المجاني."],
    "Lexin010579": ["Gratängen var god.", "كانت الجراتانج لذيذة."],
    "Lexin010581": ["Graven besöktes.", "زُير القبر."],
    "Lexin010584": ["Gravationsbeviset utfärdades.", "صدرت شهادة الرهونات."],
    "Lexin010592": ["Graviditeten bekräftades.", "أُكد الحمل."],
    "Lexin010594": ["Graviditetstestet var positivt.", "كان فحص الحمل إيجابياً."],
    "Lexin010597": ["Gravitationen håller oss.", "تُمسكنا جاذبية الأرض."],
    "Lexin010599": ["Gravlaxen marinerades.", "خُلل سمك السلمون."],
    "Lexin010605": ["Gravyren var detaljerad.", "كان الحفر دقيقاً."],
    "Lexin010606": ["Gravölet hölls.", "أُقيم حفل بعد الدفن."],
    "Lexin010611": ["Greken reste hem.", "عاد اليوناني للوطن."],
    "Lexin010613": ["Grekiska talas i Grekland.", "تُتحدث اليونانية في اليونان."],
    "Lexin010614": ["Grekiskan var vänlig.", "كانت اليونانية لطيفة."],
    "Lexin010622": ["Grepen grävde.", "نبشت المذراة."],
    "Lexin010625": ["Greven bodde på slottet.", "سكن الكونت في القصر."],
    "Lexin010628": ["Grillen tändes.", "أُضيئت الشواية."],
    "Lexin010629": ["Grillen serverade mat.", "قدم مطعم الشواء الطعام."],
    "Lexin010633": ["Grinet var brett.", "كانت الابتسامة عريضة."],
    "Lexin010634": ["Grinet hördes.", "سُمع البكاء."],
    "Lexin010637": ["Grinden öppnades.", "فُتحت البوابة."],
    "Lexin010649": ["Grodden växte.", "نمت البذرة."],
    "Lexin010650": ["Grodmannen dök.", "غاص الغواص المحترف."],
    "Lexin010651": ["Grodperspektivet visade byggnaden.", "أظهر المنظور السفلي البناء."],
    "Lexin010652": ["Groggen blandades.", "خُلط خليط الخمر."],
    "Lexin010655": ["Gropen var djup.", "كانت الفجوة عميقة."],
    "Lexin010659": ["Grossisten sålde i parti.", "باع بائع الجملة بالجملة."],
    "Lexin010673": ["Grovarbetet var tungt.", "كان العمل الشاق ثقيلاً."],
    "Lexin010675": ["Grovköket hade tvättmaskin.", "احتوى المغسل على غسالة."],
    "Lexin010680": ["Grovt rattfylleri straffas hårt.", "يُعاقب السكر الشديد بقسوة."],
    "Lexin010702": ["Grundforskningen fortsatte.", "استمر البحث الأساسي."]
};

let content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);
if (!match) { console.error('Error'); process.exit(1); }

let data = eval(match[1]);
console.log(`Loaded ${data.length} entries`);

let updated = 0;
for (let i = 0; i < data.length; i++) {
    if (examples[data[i][0]]) {
        data[i][7] = examples[data[i][0]][0];
        data[i][8] = examples[data[i][0]][1];
        updated++;
    }
}

console.log(`\n📊 Updated ${updated} entries\n`);

const backupPath = DATA_FILE + '.backup_nouns23_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 2300 nouns!`);
