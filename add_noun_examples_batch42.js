/**
 * Add examples to nouns - Batch 42 (100 nouns: Lärling to Mans)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin016926": ["Lärlingen arbetade.", "عمل الصبي تحت التدريب."],
    "Lexin016929": ["Läromedlet användes.", "استُخدمت وسائل الإيضاح."],
    "Lexin016930": ["Läroplanen följdes.", "اتُبع المنهج التعليمي."],
    "Lexin016935": ["Läseboken lästes.", "قُرئ كتاب القراءة."],
    "Lexin016942": ["Läskedrycken dracks.", "شُرب المشروب المرطب."],
    "Lexin016944": ["Läskpappret användes.", "استُخدم ورق النشاف."],
    "Lexin016946": ["Läsningen fortsatte.", "استمرت القراءة."],
    "Lexin016948": ["Läsåret började.", "بدأت السنة الدراسية."],
    "Lexin016950": ["Lätet hördes.", "سُمع النداء."],
    "Lexin016963": ["Med lätthet klarade han.", "أتمها بسهولة."],
    "Lexin016965": ["Lättjan tog över.", "سيطر الكسل."],
    "Lexin016967": ["Lättnaden kändes.", "شُعر بالتخفيف."],
    "Lexin016973": ["Lättölet dracks.", "شُربت البيرة الخفيفة."],
    "Lexin016976": ["Löddret tvättades.", "غُسلت الرغوة."],
    "Lexin016979": ["Löftet hölls.", "أُوفي بالوعد."],
    "Lexin016981": ["Lögnhalsen avslöjades.", "اكتُشف الكذاب."],
    "Lexin016982": ["Löjet visades.", "أُظهرت السخرية."],
    "Lexin016985": ["Löjtnanten kommenderade.", "أمر الملازم الأول."],
    "Lexin016988": ["Löken skivades.", "شُرح البصل."],
    "Lexin016994": ["Löneanspråket framfördes.", "قُدمت مطالبات الراتب."],
    "Lexin016995": ["Löneavdraget gjordes.", "أُجري الخصم من الراتب."],
    "Lexin016996": ["Lönebidraget beviljades.", "مُنحت علاوة الراتب."],
    "Lexin017000": ["Löneglidningen fortsatte.", "استمر ترافع الأجور."],
    "Lexin017002": ["Lönelyftet gavs.", "أُعطيت زيادة الراتب."],
    "Lexin017006": ["Löningen kom.", "جاء الراتب."],
    "Lexin017008": ["Lönnen växte.", "نما الاسفندان."],
    "Lexin017010": ["Lönnmordet skedde.", "حدث الاغتيال."],
    "Lexin017015": ["Löntagaren arbetade.", "عمل المستخدم."],
    "Lexin017018": ["Löparen sprang.", "ركض العداء."],
    "Lexin017019": ["Löparen lades.", "وُضع الغطاء الضيق."],
    "Lexin017020": ["Löparen flyttades.", "نُقل الفيل."],
    "Lexin017026": ["Löpningen pågick.", "استمر العدو."],
    "Lexin017028": ["Löpsedeln lästes.", "قُرئ الإعلان."],
    "Lexin017035": ["Lösdrivaren vandrade.", "تشرد المتشرد."],
    "Lexin017037": ["Lösen betalades.", "دُفع رسم التخليص."],
    "Lexin017046": ["Lösningen blandades.", "خُلط المحلول."],
    "Lexin017048": ["Lösningsmedlet användes.", "استُخدمت المادة المذيبة."],
    "Lexin017049": ["Lösnumret köptes.", "اشتُري العدد المفرد."],
    "Lexin017053": ["Lösöret såldes.", "بيعت المنقولات."],
    "Lexin017056": ["Lövbiffen stektes.", "قُليت شريحة اللحم الرقيقة."],
    "Lexin017061": ["Macken besöktes.", "زُيرت محطة الوقود."],
    "Lexin017062": ["Mackan åts.", "أُكل السندويش."],
    "Lexin017064": ["Madonnan dyrkades.", "عُبدت العذراء."],
    "Lexin017065": ["Madrassen lades.", "وُضعت الفرشة."],
    "Lexin017066": ["Maffian greps.", "اعتُقلت المافيا."],
    "Lexin017070": ["Magasinet fylldes.", "امتلأ المخزن."],
    "Lexin017072": ["Magasinet laddades.", "شُحن مخزن الذخيرة."],
    "Lexin017077": ["Magin användes.", "استُخدم السحر."],
    "Lexin017081": ["Magkatarren behandlades.", "عولج التهاب كيس المعدة."],
    "Lexin017083": ["Magnecyl togs.", "أُخذ الماجنيسيل."],
    "Lexin017084": ["Magneten attraherade.", "جذب المغناطيس."],
    "Lexin017092": ["Magnolian blommade.", "أزهرت المغنولية."],
    "Lexin017096": ["Magsåret behandlades.", "عولجت قرحة المعدة."],
    "Lexin017101": ["Mahogny är dyrt.", "خشب الماهوغني غالٍ."],
    "Lexin017102": ["Maj är varm.", "مايو دافئ."],
    "Lexin017104": ["Majblomman såldes.", "بيعت زهرة أيار."],
    "Lexin017105": ["Majestätet hyllades.", "أُكرمت الجلالة."],
    "Lexin017106": ["Majonnäsen serverades.", "قُدم الميونيز."],
    "Lexin017107": ["Majoren kommenderade.", "أمر الرائد."],
    "Lexin017111": ["Majs odlades.", "زُرعت الذرة."],
    "Lexin017112": ["Majstången restes.", "رُفعت سارية عيد منتصف الصيف."],
    "Lexin017113": ["I mak gick de.", "ساروا ببطء."],
    "Lexin017117": ["Makadamen lades.", "وُضع الحصى."],
    "Lexin017121": ["Makaroner åts.", "أُكلت المعكرونة."],
    "Lexin017122": ["Maken hjälpte.", "ساعد الزوج."],
    "Lexin017123": ["Maken hittades.", "وُجد النظير."],
    "Lexin017125": ["Make-up användes.", "استُخدم المكياج."],
    "Lexin017128": ["Makrillen åts.", "أُكل الإسقمري."],
    "Lexin017134": ["Maktfaktorn analyserades.", "حُلل عامل القوة."],
    "Lexin017139": ["Maktspråket talades.", "تُكلمت لغة القوة."],
    "Lexin017142": ["Malen kröp.", "زحفت العثة."],
    "Lexin017144": ["Malen fångades.", "صيد السلور."],
    "Lexin017145": ["Malajen tjänstgjorde.", "خدم المجند."],
    "Lexin017151": ["Mallen följdes.", "اتُبع النموذج."],
    "Lexin017154": ["Malmen bröts.", "استُخرج المعدن الخام."],
    "Lexin017156": ["Det lades i malpåse.", "أُخرج من الخدمة."],
    "Lexin017157": ["Malten användes.", "استُخدم الملت."],
    "Lexin017158": ["Malören inträffade.", "حدث الحادث المؤسف."],
    "Lexin017159": ["Malörten smakade.", "ذُق طعم الأفسنتين."],
    "Lexin017161": ["Mammografin gjordes.", "أُجري تصوير الثدي شعاعياً."],
    "Lexin017171": ["Manbyggnaden byggdes.", "بُني المبنى الرئيسي في العزبة."],
    "Lexin017172": ["Manchester användes.", "استُخدم القماش القطني المخدد."],
    "Lexin017173": ["Mandarinen åts.", "أُكل اليوسفي."],
    "Lexin017174": ["Mandatet gavs.", "أُعطي الانتداب."],
    "Lexin017176": ["Mandeln åts.", "أُكل اللوز."],
    "Lexin017177": ["Mandlarna svällde.", "انتفخت اللوزتان."],
    "Lexin017178": ["Mandolinen spelades.", "عُزف المندولين."],
    "Lexin017179": ["Maneret syntes.", "ظهر الأسلوب."],
    "Lexin017180": ["Maneten stacks.", "لسع قنديل البحر."],
    "Lexin017181": ["Manfallet var stort.", "كانت خسارة الأفراد كبيرة."],
    "Lexin017182": ["Mangeln användes.", "استُخدمت المكواة الأسطوانية."],
    "Lexin017186": ["Mani visades.", "أُظهر الهوس."],
    "Lexin017187": ["Manicken användes.", "استُخدمت الأداة."],
    "Lexin017188": ["Manifestet skrevs.", "كُتب الإعلان."],
    "Lexin017190": ["Maningen gavs.", "أُعطيت المناشدة."],
    "Lexin017197": ["Mannan kom.", "جاء المن."],
    "Lexin017198": ["Mannagrynen kokades.", "طُبخ السميد."],
    "Lexin017199": ["I mannaminne skedde det.", "حدث في تاريخ الإنسان."],
    "Lexin017201": ["Mannekängen visade.", "عرضت عارضة الأزياء."],
    "Lexin017203": ["Vi var mans nog.", "كنا كثيرين من بيننا."]
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

const backupPath = DATA_FILE + '.backup_nouns42_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 4200 nouns!`);
