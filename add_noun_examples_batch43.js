/**
 * Add examples to nouns - Batch 43 (100 nouns: Manschett to Medium)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin017205": ["Manschetten tvättades.", "غُسلت أساور القميص."],
    "Lexin017206": ["Mansgrisen kritiserades.", "انتُقد الرجل الخنزير."],
    "Lexin017207": ["Manskapet arbetade.", "عمل الطاقم."],
    "Lexin017210": ["Mantalsskrivningen skedde.", "تم التسجيل السكني."],
    "Lexin017211": ["Manteln bars.", "ارتُديت القلنسوة."],
    "Lexin017214": ["Manualen lästes.", "قُرئ دليل الإرشادات."],
    "Lexin017216": ["Manuellt arbete utfördes.", "أُدي العمل اليدوي."],
    "Lexin017217": ["Manuset skrevs.", "كُتب النص."],
    "Lexin017218": ["Manuskriptet lämnades.", "سُلم النص المخطوط."],
    "Lexin017219": ["Manövern genomfördes.", "أُجريت المناورة العسكرية."],
    "Lexin017220": ["Manövern lyckades.", "نجحت المناورة اليدوية."],
    "Lexin017223": ["Maraton sprangs.", "رُكض الماراثون."],
    "Lexin017224": ["Mardrömmen skrämde.", "أفزع الكابوس."],
    "Lexin017225": ["Margarin användes.", "استُخدم المرجرين."],
    "Lexin017230": ["Marginalskatten beräknades.", "حُسب مستوى الضريبة."],
    "Lexin017234": ["Marijuana är olagligt.", "المرهوانة غير قانونية."],
    "Lexin017236": ["Marinen patrullerade.", "قام سلاح البحرية بدورية."],
    "Lexin017237": ["Marinaden användes.", "استُخدم النقيع."],
    "Lexin017239": ["Marionetten rörde sig.", "تحركت الدمية المتحركة."],
    "Lexin017243": ["Mark byttes.", "بُدل المارك."],
    "Lexin017248": ["Markisen fälldes.", "أُنزلت حاجبة الشمس."],
    "Lexin017249": ["Markisen talade.", "تحدث الدوق."],
    "Lexin017256": ["Marknadsekonomin fungerade.", "نجح اقتصاد العرض والطلب."],
    "Lexin017261": ["Marknadspriset bestämdes.", "حُدد سعر السوق."],
    "Lexin017266": ["Marktjänsten arbetade.", "عملت الخدمة الأرضية."],
    "Lexin017268": ["Marmelad smakade gott.", "طعم المربى جيداً."],
    "Lexin017269": ["Marmor är hårt.", "الرخام صلب."],
    "Lexin017271": ["Marockanen reste hem.", "عاد المغربي للوطن."],
    "Lexin017273": ["Mars är kall.", "مارس بارد."],
    "Lexin017275": ["Marschen spelades.", "عُزف المارش."],
    "Lexin017276": ["Marschallen tändes.", "أُضيء المشعل."],
    "Lexin017280": ["Marsipan smakade gott.", "طعمت عجينة اللوز جيداً."],
    "Lexin017281": ["Marskalken kommenderade.", "أمر العماد."],
    "Lexin017282": ["Marskalken ledde.", "قاد العريف."],
    "Lexin017284": ["Marsvinet åts.", "أُكل خنزير غينيا."],
    "Lexin017285": ["Martyren hyllades.", "أُكرم الشهيد."],
    "Lexin017286": ["Marxismen studerades.", "دُرست الماركسية."],
    "Lexin017287": ["Marxisten demonstrerade.", "تظاهر الماركسي."],
    "Lexin017289": ["Marängen bakades.", "خُبز المرنغ."],
    "Lexin017291": ["Mascara användes.", "استُخدم الكحل."],
    "Lexin017292": ["Masken kröp.", "زحفت الدودة."],
    "Lexin017294": ["Masken bars.", "ارتُدي القناع."],
    "Lexin017299": ["Maskeraden hölls.", "أُقيم الحفل التنكري."],
    "Lexin017304": ["Maskinen startade.", "شغلت الآلة."],
    "Lexin017306": ["Maskineriet fungerade.", "عملت الميكانيكية."],
    "Lexin017307": ["Maskinisten arbetade.", "عمل عامل الماكينات."],
    "Lexin017308": ["Maskinparken moderniserades.", "حُدثت مجموعة الماكينات."],
    "Lexin017310": ["Maskinskrivning lärdes.", "تُعلم الضرب على الآلة الطابعة."],
    "Lexin017311": ["Maskningen fortsatte.", "استمر التلكؤ."],
    "Lexin017313": ["Maskoten förde tur.", "جلب جالب الحظ الحظ."],
    "Lexin017314": ["Maskrosen blommade.", "أزهرت الهندباء البرية."],
    "Lexin017316": ["Maskulinum användes.", "استُخدم المذكر."],
    "Lexin017317": ["Masochisten led.", "عانى الماسوشي."],
    "Lexin017322": ["Massan formades.", "شُكلت العجينة."],
    "Lexin017324": ["Massagen hjälpte.", "ساعد التدليك."],
    "Lexin017325": ["Massakern skedde.", "حدثت المذبحة."],
    "Lexin017330": ["Massivet besöktes.", "زُيرت سلسلة الجبال."],
    "Lexin017334": ["Massmediet rapporterade.", "أبلغت وسائل الإعلام."],
    "Lexin017336": ["Masten restes.", "رُفع الدقل."],
    "Lexin017346": ["Matarbussen körde.", "سارت باص الخط الفرعي."],
    "Lexin017347": ["Matberedaren användes.", "استُخدمت ماكينة تحضير الطعام."],
    "Lexin017348": ["Matchen spelades.", "لُعبت المباراة."],
    "Lexin017353": ["Materia studerades.", "دُرس الماديّ."],
    "Lexin017355": ["Materialismen kritiserades.", "انتُقد المذهب المادي."],
    "Lexin017356": ["Materialisten köpte.", "اشترى المادي."],
    "Lexin017357": ["Materielen levererades.", "سُلمت المواد."],
    "Lexin017359": ["Matinén visades.", "عُرض العرض النهاري."],
    "Lexin017360": ["Matjessillen åts.", "أُكلت رنكة ماتييس."],
    "Lexin017364": ["Matrosen arbetade.", "عمل البحار."],
    "Lexin017367": ["Matsalen användes.", "استُخدمت صالة الطعام."],
    "Lexin017368": ["Matsedeln lästes.", "قُرئت لائحة الطعام."],
    "Lexin017369": ["Matsilvret putsades.", "لُمع الأدوات الفضية للمائدة."],
    "Lexin017370": ["Matskeden användes.", "استُخدمت ملعقة الطعام."],
    "Lexin017371": ["Matsmältningen fungerade.", "عمل هضم الطعام."],
    "Lexin017375": ["Matsäcken packades.", "حُزمت زوادة الطعام."],
    "Lexin017381": ["Matte är svårt.", "الرياضيات صعبة."],
    "Lexin017382": ["Matten klappade hunden.", "ربتت مربية الحيوان على الكلب."],
    "Lexin017384": ["Matvraket åt.", "أكل النهم."],
    "Lexin017385": ["Matvägraren vägrade.", "رفض رافض الطعام."],
    "Lexin017388": ["Maximum nåddes.", "بُلغ الحد الأقصى."],
    "Lexin017390": ["Mazarinen bakades.", "خُبز المزارين."],
    "Lexin017403": ["Medaljen gavs.", "أُعطيت الميدالية."],
    "Lexin017404": ["Medaljongen bars.", "ارتُديت القلادة."],
    "Lexin017406": ["Medansvar togs.", "أُخذت المشاركة في المسؤولية."],
    "Lexin017407": ["Medarbetaren hjälpte.", "ساعد المساعد."],
    "Lexin017429": ["Medelklassen växte.", "نمت الطبقة الوسطى."],
    "Lexin017430": ["Medelmåttan nöjde sig.", "رضي الشخص المتوسط."],
    "Lexin017433": ["Medelpunkten hittades.", "وُجدت نقطة المحور."],
    "Lexin017437": ["Medeltalet beräknades.", "حُسب متوسط القيمة."],
    "Lexin017438": ["Medeltiden studerades.", "دُرست العصور الوسطى."],
    "Lexin017440": ["Medelvägen valdes.", "اختُير الحل الوسط."],
    "Lexin017453": ["Medgivandet gavs.", "أُعطي الإقرار."],
    "Lexin017456": ["Medgång rådde.", "ساد النجاح."],
    "Lexin017460": ["Medhjälparen hjälpte.", "ساعدت المساعدة."],
    "Lexin017469": ["Medicinaren studerade.", "درس الطبيب."],
    "Lexin017475": ["Medinflytande krävdes.", "طُلب حق المشاركة في القرارات."],
    "Lexin017477": ["Medisterkorven stektes.", "قُلي سجق ميدستر."],
    "Lexin017478": ["Meditation praktiserades.", "مورس التأمل."],
    "Lexin017480": ["Mediet användes.", "استُخدمت الوسيلة الإعلامية."],
    "Lexin017481": ["Medium valdes.", "اختُير المتوسط."]
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

const backupPath = DATA_FILE + '.backup_nouns43_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 4300 nouns!`);
