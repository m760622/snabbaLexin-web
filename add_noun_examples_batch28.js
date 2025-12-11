/**
 * Add examples to nouns - Batch 28 (100 nouns: I-land to Inrättning)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin012425": ["I-landet exporterade.", "صدرت الدولة الصناعية."],
    "Lexin012447": ["Iakttagelsen noterades.", "دُونت الملاحظة."],
    "Lexin012468": ["Idealismen inspirerade.", "ألهمت المثالية."],
    "Lexin012469": ["Idealisten kämpade.", "كافح الشخص المثالي."],
    "Lexin012482": ["Identitetshandlingen visades.", "أُظهرت الوثيقة."],
    "Lexin012485": ["Identitetskortet krävdes.", "طُلبت بطاقة الهوية."],
    "Lexin012487": ["Ideologin diskuterades.", "نوقشت الأيديولوجية."],
    "Lexin012489": ["Idiomet var typiskt.", "كانت اللهجة نموذجية."],
    "Lexin012490": ["Idioten gjorde fel.", "أخطأ الأحمق."],
    "Lexin012496": ["Idolen beundrades.", "أُعجب بالمثال."],
    "Lexin012497": ["Idrotten var populär.", "كانت الرياضة شائعة."],
    "Lexin012503": ["Idyllen var fridfull.", "كانت الرومانطيقية هادئة."],
    "Lexin012531": ["Ikonen dyrkades.", "عُبدت الأيقونة."],
    "Lexin012545": ["Illdådet straffades.", "عوقبت الجريمة."],
    "Lexin012548": ["Illustrationen förklarade.", "شرح التصوير."],
    "Lexin012550": ["Illviljan märktes.", "لوحظ سوء النية."],
    "Lexin012554": ["Imagen förbättrades.", "تحسن المفهوم."],
    "Lexin012555": ["Imitationen var exakt.", "كان التقليد دقيقاً."],
    "Lexin012557": ["Imman lade sig.", "استقر الضباب الخفيف."],
    "Lexin012562": ["Immigranten anlände.", "وصل المهاجر."],
    "Lexin012564": ["Immigrationen ökade.", "زادت الهجرة."],
    "Lexin012580": ["Imperativ används vid uppmaningar.", "تُستخدم صيغة الأمر عند الطلب."],
    "Lexin012582": ["Imperfekt anger förfluten tid.", "تشير صيغة الماضي للزمن الماضي."],
    "Lexin012583": ["Imperialismen kritiserades.", "انتُقد الاستعمار."],
    "Lexin012584": ["Imperialisten expanderade.", "توسع الاستعماري."],
    "Lexin012585": ["Imperiet föll.", "سقطت الإمبراطورية."],
    "Lexin012593": ["Importen ökade.", "زاد الاستيراد."],
    "Lexin012595": ["Impotensen behandlades.", "عولجت العنة."],
    "Lexin012602": ["Impulsen kom plötsligt.", "جاء الحافز فجأة."],
    "Lexin012610": ["Inackorderingen betalades.", "دُفع السكن والطعام."],
    "Lexin012611": ["Inackorderingstillägget beviljades.", "مُنحت علاوة السكن والطعام."],
    "Lexin012617": ["Inaveln var skadlig.", "كان الاستيلاد الداخلي ضاراً."],
    "Lexin012620": ["Inbetalningskortet fylldes i.", "مُلئت حوالة الدفع."],
    "Lexin012622": ["Inbillningen var falsk.", "كان التخيل خاطئاً."],
    "Lexin012626": ["Inbjudan skickades.", "أُرسلت الدعوة."],
    "Lexin012633": ["Inblicken gavs.", "أُعطيت النظرة."],
    "Lexin012635": ["Inbrottet upptäcktes.", "اكتُشف السطو."],
    "Lexin012643": ["Inbytet godkändes.", "وُوفق على المقايضة."],
    "Lexin012648": ["Inbördeskriget pågick.", "استمرت الحرب الأهلية."],
    "Lexin012649": ["Incesten var förbjuden.", "كان سفاح القربى محظوراً."],
    "Lexin012654": ["Incitamentet motiverade.", "حفز الحافز."],
    "Lexin012657": ["Index uppdaterades.", "حُدث الفهرس."],
    "Lexin012658": ["Index visade inflationen.", "أظهر المؤشر التضخم."],
    "Lexin012660": ["Indexregleringen tillämpades.", "طُبق تعديل المؤشر."],
    "Lexin012661": ["Indianen levde i reservatet.", "عاش الهندي الأحمر في المحمية."],
    "Lexin012662": ["Indiciet tydde på brott.", "أشارت الإشارة إلى جريمة."],
    "Lexin012664": ["Indiern reste hem.", "عاد الهندي للوطن."],
    "Lexin012665": ["Indignationen växte.", "نمت النقمة."],
    "Lexin012667": ["Indikationen var tydlig.", "كانت الإشارة واضحة."],
    "Lexin012675": ["Individen respekterades.", "احتُرم الفرد."],
    "Lexin012678": ["Individualisten tänkte annorlunda.", "فكر الفردي بشكل مختلف."],
    "Lexin012685": ["Indoktrineringen kritiserades.", "انتُقد تلقين المبادئ."],
    "Lexin012689": ["Indrivningen genomfördes.", "نُفذت الجباية."],
    "Lexin012700": ["Infallet var genialt.", "كانت الخاطرة عبقرية."],
    "Lexin012701": ["Infallsvinkeln var ny.", "كان المنطلق جديداً."],
    "Lexin012702": ["Infanteriet marscherade.", "سارت المشاة."],
    "Lexin012705": ["Infarkten var allvarlig.", "كان الاحتشاء خطيراً."],
    "Lexin012706": ["Infarten var smal.", "كان المدخل ضيقاً."],
    "Lexin012720": ["Infinitiv är verbets grundform.", "صيغة المصدر هي الشكل الأساسي للفعل."],
    "Lexin012721": ["Infinitivmärket är att.", "أداة المصدر هي att."],
    "Lexin012724": ["Inflammationen behandlades.", "عولج الالتهاب."],
    "Lexin012739": ["Inflyttningen skedde.", "حدث الانتقال."],
    "Lexin012745": ["Informationstekniken utvecklades.", "تطورت تقنيات المعلومات."],
    "Lexin012746": ["Informatören svarade.", "أجاب موظف الاستعلامات."],
    "Lexin012751": ["Infrastrukturen byggdes ut.", "وُسعت البنية التحتية."],
    "Lexin012756": ["Infödingen kände området.", "عرف الساكن الأصلي المنطقة."],
    "Lexin012762": ["Införseln stoppades.", "أُوقف الإدخال."],
    "Lexin012767": ["Ingefäran användes.", "استُخدم الزنجبيل."],
    "Lexin012771": ["Ingenmanslandet var farligt.", "كانت المنطقة المجردة من السلاح خطيرة."],
    "Lexin012778": ["Ingivelsen följdes.", "اتُبع الهاجس."],
    "Lexin012780": ["Ingrediensen blandades.", "خُلط المكون."],
    "Lexin012791": ["Ingångssidan laddades.", "حُملت صفحة الدخول."],
    "Lexin012802": ["Inhopparen spelade bra.", "لعب اللاعب البديل جيداً."],
    "Lexin012803": ["Inhägnaden var säker.", "كان المكان المسيج آمناً."],
    "Lexin012807": ["Initialen skrevs.", "كُتب الحرف الاستهلالي."],
    "Lexin012817": ["Injektionen gavs.", "أُعطيت الحقنة."],
    "Lexin012822": ["Inkallelseordern kom.", "جاءت الدعوة."],
    "Lexin012824": ["Inkassot krävdes.", "طُلبت الجباية."],
    "Lexin012826": ["Inkassobyrån ringde.", "اتصلت شركة الجباية."],
    "Lexin012827": ["Inkastet togs.", "أُخذت الرمية الجانبية."],
    "Lexin012846": ["Inkomsttagaren betalade skatt.", "دفع المستخدم الضريبة."],
    "Lexin012850": ["Inkräktaren avvisades.", "طُرد الدخيل."],
    "Lexin012851": ["Inkubationstiden varierade.", "تفاوتت فترة الحضانة."],
    "Lexin012859": ["Inkörsporten öppnades.", "فُتح المدخل."],
    "Lexin012860": ["Inlagan skickades.", "أُرسل الاستدعاء."],
    "Lexin012865": ["Inlandet var glesbefolkat.", "كانت داخلية البلاد قليلة السكان."],
    "Lexin012867": ["Inledningen var intressant.", "كانت الافتتاحية مثيرة."],
    "Lexin012870": ["Inlevelsen var stark.", "كانت المعايشة قوية."],
    "Lexin012871": ["Inloppet var trångt.", "كان المدخل ضيقاً."],
    "Lexin012873": ["Inlägget kommenterades.", "عُلق على إبداء الرأي."],
    "Lexin012875": ["Inlämningen skedde.", "حدث التسليم."],
    "Lexin012876": ["Inlärningen underlättades.", "سُهل التعلم."],
    "Lexin012894": ["Innegrejen blev populär.", "أصبح الشيء المبتدع شائعاً."],
    "Lexin012895": ["Innehavet registrerades.", "سُجلت الملكية."],
    "Lexin012896": ["Innehavaren betalade.", "دفع المالك."],
    "Lexin012903": ["Innehållsförteckningen lästes.", "قُرئت لائحة المحتويات."],
    "Lexin012904": ["Innern passade.", "مرر قلب الوسط."],
    "Lexin012915": ["Innovationen presenterades.", "قُدم الابتكار."],
    "Lexin012944": ["Inredningen var modern.", "كان الأثاث عصرياً."],
    "Lexin012958": ["Inrättningen grundades.", "أُسست المؤسسة."]
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

const backupPath = DATA_FILE + '.backup_nouns28_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 2800 nouns!`);
