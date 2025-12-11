/**
 * Add examples to nouns - Batch 24 (100 nouns: Grundfärg to Haklapp)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin010703": ["Grundfärgen torkade.", "جف دهان الأساس."],
    "Lexin010705": ["Grundlagen skyddar rättigheter.", "يحمي الدستور الحقوق."],
    "Lexin010721": ["Grundskolan är obligatorisk.", "المدرسة الأساسية إلزامية."],
    "Lexin010727": ["Grundvattnet pumpades upp.", "ضُخت المياه الجوفية."],
    "Lexin010735": ["Grunkan låg på bordet.", "استلقى الشيء على الطاولة."],
    "Lexin010742": ["Gruppförsäkringen tecknades.", "عُقد التأمين الجماعي."],
    "Lexin010744": ["Grupplivförsäkringen gällde.", "سرى التأمين الجماعي على الحياة."],
    "Lexin010747": ["Gruset knarrade.", "صرّ الحصى."],
    "Lexin010750": ["Gruvan producerade järn.", "أنتج المنجم الحديد."],
    "Lexin010755": ["Grynen kokades.", "طُبخت الحبة المقشرة."],
    "Lexin010756": ["Gryningen kom tidigt.", "جاء الفجر مبكراً."],
    "Lexin010757": ["Grynnan var farlig.", "كان الحيد البحري خطيراً."],
    "Lexin010759": ["Grytan stod på spisen.", "وقف القدر على الموقد."],
    "Lexin010760": ["Grytlappen skyddade handen.", "حمت مساكة الأواني اليد."],
    "Lexin010768": ["Gråsparven kvittrade.", "زقزق العصفور الدوري."],
    "Lexin010783": ["Gränden var mörk.", "كان الزقاق مظلماً."],
    "Lexin010786": ["Gränsfallet var svårt.", "كان الوضع غير المحدد صعباً."],
    "Lexin010794": ["Gränsvärdet överskreds.", "تجاوزت القيمة الحدية."],
    "Lexin010798": ["Gräshoppan hoppade.", "قفزت الجرادة."],
    "Lexin010801": ["Gräslöken hackades.", "فُرم البصل الأخضر."],
    "Lexin010803": ["Gräsroten organiserade sig.", "نظم الشخص العادي نفسه."],
    "Lexin010804": ["Gräsänkan väntade.", "انتظرت المغيبة."],
    "Lexin010805": ["Gräsänklingen lagade mat.", "طبخ المغيب."],
    "Lexin010809": ["Grävlingen grävde.", "حفر الغرير."],
    "Lexin010812": ["Grävskopan arbetade.", "عملت الحفارة الميكانيكية."],
    "Lexin010813": ["Grödan skördades.", "حُصد المحصول."],
    "Lexin010817": ["Gröngölingen sågs i skogen.", "شوهد النقار في الغابة."],
    "Lexin010818": ["Grönområdet bevarades.", "حُفظت المنطقة الخضراء."],
    "Lexin010819": ["Grönsaken var färsk.", "كانت الخضروات طازجة."],
    "Lexin010821": ["Grönsallaten användes.", "استُخدم الخس."],
    "Lexin010824": ["Gröten åts till frukost.", "أُكل الثريد على الفطور."],
    "Lexin010827": ["Gubben satt på bänken.", "جلس العجوز على المقعد."],
    "Lexin010832": ["Gudbarnet dopades.", "عُمد ابن المعمودية."],
    "Lexin010833": ["Gudfadern gavs.", "عُين العراب."],
    "Lexin010834": ["Gudinnan dyrkades.", "عُبدت الإلهة."],
    "Lexin010835": ["Gudmorn var snäll.", "كانت العرابة لطيفة."],
    "Lexin010838": ["Gudstjänsten hölls.", "أُقيم القداس."],
    "Lexin010842": ["Gulan separerades.", "فُصل الصفار."],
    "Lexin010846": ["Guldet vanns.", "فُزي بالميدالية الذهبية."],
    "Lexin010849": ["Gullvivan blommade.", "أزهر زهر الربيع."],
    "Lexin010852": ["Gumman log.", "ابتسمت المرأة العجوز."],
    "Lexin010853": ["Gummit var elastiskt.", "كان المطاط مرناً."],
    "Lexin010856": ["Gungan svängde.", "تأرجحت الأرجوحة."],
    "Lexin010859": ["Gunstlingen favoriserades.", "فُضل المحبوب."],
    "Lexin010865": ["Gycklet var elakt.", "كان الاستهزاء شريراً."],
    "Lexin010866": ["Gylfen stängdes.", "أُغلقت فتحة السروال."],
    "Lexin010875": ["Gymnasieskolan förberedde studenter.", "جهزت الثانوية الطلاب."],
    "Lexin010879": ["Gymnasisten studerade.", "درس طالب الثانوية."],
    "Lexin010881": ["Gymnasten tränade.", "تدرب الرياضي."],
    "Lexin010882": ["Gymnastiken var rolig.", "كانت الرياضة ممتعة."],
    "Lexin010884": ["Gympingen började.", "بدأت الرياضة على الموسيقى."],
    "Lexin010885": ["Gynekologen undersökte.", "فحص طبيب الأمراض النسائية."],
    "Lexin010898": ["Gyttjan var djup.", "كان الوحل عميقاً."],
    "Lexin010900": ["Gåendet var tröttande.", "كان السير متعباً."],
    "Lexin010901": ["Gågatan var livlig.", "كان شارع المشاة نشطاً."],
    "Lexin010907": ["Gångjärnet gnisslade.", "صرّ المفصل."],
    "Lexin010910": ["Gångtrafikanten korsade.", "عبر الماشي."],
    "Lexin010913": ["I går regnade det.", "أمطرت أمس."],
    "Lexin010934": ["Gården var stor.", "كانت الساحة كبيرة."],
    "Lexin010935": ["Gården producerade mjölk.", "أنتجت المزرعة الحليب."],
    "Lexin010937": ["Gåsen kacklade.", "صاحت الوزة."],
    "Lexin010940": ["De gick i gåsmarsch.", "ساروا في طابور."],
    "Lexin010942": ["Gåtan löstes.", "حُلت الأحجية."],
    "Lexin010953": ["Han drev gäck med henne.", "سخر منها."],
    "Lexin010954": ["Gäddan fångades.", "صيد سمك الكراكي."],
    "Lexin010955": ["Gälarna fungerade.", "عملت الخياشيم."],
    "Lexin010956": ["Gälden betalades.", "سُدد الدين."],
    "Lexin010957": ["Gäldenären var skyldig.", "كان المدين مديناً."],
    "Lexin010962": ["Gänget samlades.", "تجمعت العصابة."],
    "Lexin010963": ["Gängan passade.", "لاءمت سن اللولب."],
    "Lexin010967": ["Gärdet plöjdes.", "حُرث الحقل."],
    "Lexin010968": ["Gärdsgården lagades.", "رُمم السياج."],
    "Lexin010975": ["Gärningsmannen greps.", "اعتُقل مرتكب الجريمة."],
    "Lexin010982": ["Gästarbetaren arbetade.", "عمل العامل الزائر."],
    "Lexin010985": ["Gästgivargården serverade.", "قدم المطعم الطعام."],
    "Lexin010986": ["Gästhamnen var full.", "كان ميناء الضيوف ممتلئاً."],
    "Lexin010989": ["Gäststuderanden läste.", "درس الطالب الزائر."],
    "Lexin010991": ["Gödseln spreds.", "نُثر السماد."],
    "Lexin010998": ["Gömstället hittades.", "وُجد المخبأ."],
    "Lexin011014": ["Planen var i görningen.", "كانت الخطة قيد التنفيذ."],
    "Lexin011015": ["Göromålen väntade.", "انتظرت الأعمال."],
    "Lexin011016": ["Gösen fångades.", "صيد الصندر."],
    "Lexin011019": ["Göteborgaren reste.", "سافر شخص من يوتيبوري."],
    "Lexin011020": ["H är den åttonde bokstaven.", "H هو الحرف الثامن."],
    "Lexin011026": ["Han hade hack på mig.", "كان يطاردني."],
    "Lexin011027": ["Hackan användes.", "استُخدمت المعزقة."],
    "Lexin011031": ["Hackaren bröt sig in.", "اخترق المتطفل."],
    "Lexin011032": ["Hackern programmerade.", "برمج هاوي البرمجة."],
    "Lexin011033": ["Hackkycklingen kritiserades.", "انتُقد الملاحق."],
    "Lexin011034": ["Hackspetten hackade.", "نقر نقار الخشب."],
    "Lexin011038": ["Hafset syntes.", "ظهر الإهمال."],
    "Lexin011039": ["Hafsverket kasserades.", "رُفض العمل المهمل."],
    "Lexin011041": ["Hagen var grön.", "كان المرعى أخضر."],
    "Lexin011042": ["Haglet föll.", "سقط البرد."],
    "Lexin011043": ["Haglen träffade målet.", "أصاب الخردق الهدف."],
    "Lexin011047": ["Hajen simmade.", "سبح سمك القرش."],
    "Lexin011048": ["Hajen lurade folk.", "خدع المحتال الناس."],
    "Lexin011052": ["Hakan var skarp.", "كان الذقن حاداً."],
    "Lexin011055": ["Hakkorset är en symbol.", "الصليب المعقوف رمز."],
    "Lexin011056": ["Haklappen bands.", "رُبطت مريلة الطفل."]
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

const backupPath = DATA_FILE + '.backup_nouns24_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 2400 nouns!`);
