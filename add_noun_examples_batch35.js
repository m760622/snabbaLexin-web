/**
 * Add examples to nouns - Batch 35 (100 nouns: Konsthantverk to Kotlett)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin014699": ["Konsthantverket såldes.", "بيع العمل اليدوي الفني."],
    "Lexin014701": ["Konstitutionen var stark.", "كان التكوين قوياً."],
    "Lexin014702": ["Konstitutionen ändrades.", "عُدل الدستور."],
    "Lexin014707": ["Konstnären målade.", "رسم الفنان."],
    "Lexin014718": ["Konstruktören designade.", "صمم المعمر."],
    "Lexin014721": ["Konståkningen visades.", "عُرض التزلج على الجليد."],
    "Lexin014722": ["Konsuln hjälpte.", "ساعد القنصل."],
    "Lexin014723": ["Konsulatet besöktes.", "زُيرت القنصلية."],
    "Lexin014724": ["Konsulenten rådgav.", "نصح المستشار."],
    "Lexin014725": ["Konsulten anlitades.", "استُعين بالاستشاري."],
    "Lexin014735": ["Konsumenten köpte.", "اشترى المستهلك."],
    "Lexin014746": ["Konsumentköplagen skyddar.", "يحمي قانون الشراء الاستهلاكي."],
    "Lexin014752": ["Konsumentsekreteraren rådgav.", "نصح سكرتير شؤون المستهلكين."],
    "Lexin014757": ["Konsumentupplysningen hjälpte.", "ساعد مكتب معلومات المستهلكين."],
    "Lexin014763": ["Konsumtionsvaran köptes.", "اشتُريت البضاعة الاستهلاكية."],
    "Lexin014765": ["Kontakten kopplades.", "وُصل القابس الكهربائي."],
    "Lexin014771": ["Kontaktfamiljen stöttade.", "دعمت عائلة الدعم."],
    "Lexin014774": ["Kontaktlinsen sattes in.", "وُضعت العدسة اللاصقة."],
    "Lexin014776": ["Kontaktpersonen hjälpte.", "ساعد المساند."],
    "Lexin014782": ["Kontanterna räckte.", "كفت النقود."],
    "Lexin014783": ["Kontantinsatsen betalades.", "دُفعت الدفعة النقدية."],
    "Lexin014790": ["Kontentan klargjordes.", "أُوضح المحتوى الرئيسي."],
    "Lexin014791": ["Kontinenten besöktes.", "زُيرت القارة."],
    "Lexin014796": ["Kontokortet användes.", "استُخدمت بطاقة الائتمان."],
    "Lexin014800": ["Kontoristen arbetade.", "عمل المستخدم المكتبي."],
    "Lexin014803": ["Kontrabasen spelades.", "عُزف الكمان الأجهر."],
    "Lexin014806": ["Kontrahenten skrev under.", "وقع الطرف."],
    "Lexin014809": ["Kontraktet undertecknades.", "وُقعت عمادة الأبرشية."],
    "Lexin014825": ["Kontrollen gjordes.", "أُجري الفحص."],
    "Lexin014828": ["Kontrollanten granskade.", "فحص المراقب."],
    "Lexin014830": ["Kontrollbesiktningen godkändes.", "نجح الفحص الفني للمركبات."],
    "Lexin014835": ["Kontrollmärket sattes.", "وُضعت علامة المراقبة."],
    "Lexin014836": ["Kontrollområdet övervakades.", "رُوقبت منطقة السيطرة."],
    "Lexin014838": ["Kontrolluppgiften skickades.", "أُرسل بيان مراجعة الدخل."],
    "Lexin014840": ["Kontroversen växte.", "نما الخلاف."],
    "Lexin014842": ["Konungen regerade.", "حكم الملك."],
    "Lexin014844": ["Konvalescenten vilade.", "استراح الناقه."],
    "Lexin014845": ["Konvalescenthemmet välkomnande.", "رحب مصح الناقهين."],
    "Lexin014846": ["Konvalescentvården hjälpte.", "ساعدت رعاية النقاهة."],
    "Lexin014847": ["Konventionen undertecknades.", "وُقعت الاتفاقية."],
    "Lexin014848": ["Konventionen respekterades.", "احتُرم العرف."],
    "Lexin014852": ["Konversationen fortsatte.", "استمرت المحادثة."],
    "Lexin014859": ["Kooperationen fungerade.", "نجحت الجمعية التعاونية."],
    "Lexin014861": ["Kooperativet startade.", "بدأت التعاونية."],
    "Lexin014872": ["Kopiatorn kopierade.", "نسخت الماكينة الناسخة."],
    "Lexin014874": ["Kopieringen gjordes.", "تم النسخ."],
    "Lexin014877": ["Koppar leder ström.", "ينقل النحاس التيار."],
    "Lexin014878": ["Kopplet sattes på.", "وُضع الرسن."],
    "Lexin014879": ["Kopplet jagade.", "طاردت مجموعة الكلاب."],
    "Lexin014884": ["Kopplaren greps.", "اعتُقل القواد."],
    "Lexin014885": ["Koppleri är olagligt.", "القوادة غير قانونية."],
    "Lexin014887": ["Kopplingen användes.", "استُخدم فاصل السرعات."],
    "Lexin014891": ["Kopporna behandlades.", "عولجت البثرة."],
    "Lexin014892": ["Koret smyckades.", "زُين مذبح الكنيسة."],
    "Lexin014895": ["Kordongen sattes upp.", "وُضع النطاق."],
    "Lexin014896": ["Koreografin skapades.", "وُضعت الألحان الراقصة."],
    "Lexin014898": ["Korgen bars.", "حُملت الخيزران."],
    "Lexin014899": ["Kork är lätt.", "الفلين خفيف."],
    "Lexin014900": ["Korken drogs.", "سُحبت الفلينة."],
    "Lexin014902": ["Korkskruven användes.", "استُخدمت الفتاحة اللولبية."],
    "Lexin014903": ["Kornet var litet.", "كانت الذرة صغيرة."],
    "Lexin014904": ["Kornet skördades.", "حُصد الشعر."],
    "Lexin014905": ["Kornet siktar.", "تُسدد علامة التسديد."],
    "Lexin014908": ["Korpen kraxade.", "نعق الغراب الأفحم."],
    "Lexin014911": ["Korporationen bildades.", "تشكلت التعاونية."],
    "Lexin014912": ["Korpralen kommenderade.", "أمر العريف."],
    "Lexin014915": ["Korr lästes.", "قُرئت القراءة للتصحيح."],
    "Lexin014917": ["Korrekturet rättades.", "صُححت الطبعة التجريبية."],
    "Lexin014918": ["Korrespondensen fortsatte.", "استمرت المراسلة."],
    "Lexin014919": ["Korrespondenten rapporterade.", "أبلغ المراسل."],
    "Lexin014923": ["Korrosionen spred sig.", "انتشر الصدأ."],
    "Lexin014928": ["Korruptionen avslöjades.", "اكتُشف الارتشاء."],
    "Lexin014932": ["Korset markerades.", "حُددت علامة الصليب."],
    "Lexin014933": ["Korset dyrkades.", "عُبد الصليب."],
    "Lexin014939": ["Korsdraget var kallt.", "كان التيار الهوائي بارداً."],
    "Lexin014940": ["Korselden pågick.", "استمر الوابل."],
    "Lexin014941": ["Korsetten var trång.", "كان المشد ضيقاً."],
    "Lexin014943": ["Korsförhöret genomfördes.", "أُجري الاستجواب."],
    "Lexin014946": ["Korsningen gjordes.", "تم التهجين."],
    "Lexin014948": ["Korsordet löstes.", "حُلت الكلمات المتقاطعة."],
    "Lexin014949": ["Korsryggen värkte.", "آلم القطن."],
    "Lexin014951": ["Korståget pågick.", "استمرت الحملة الصليبية."],
    "Lexin014957": ["Han drog korta.", "فشل."],
    "Lexin014958": ["Kortbyxorna bars.", "ارتُدي البنطلون القصير."],
    "Lexin014959": ["Kortegen passerade.", "مر الموكب."],
    "Lexin014962": ["I korthet förklarade han.", "شرح باختصار."],
    "Lexin014969": ["Kortleken blandades.", "خُلطت الشدة."],
    "Lexin014973": ["Kortslutningen inträffade.", "حدث التماس الكهربائي."],
    "Lexin014981": ["Korvstoppning kritiseras.", "يُنتقد حشو المعلومات."],
    "Lexin014982": ["Han gick i kos.", "اختفى."],
    "Lexin014983": ["Kosingarna räckte.", "كفت النقود."],
    "Lexin014984": ["Kosmetika användes.", "استُخدمت مستحضرات التجميل."],
    "Lexin014985": ["Kosmonauten flög.", "طار رائد الفضاء."],
    "Lexin014987": ["Kosmos är oändligt.", "الكون لا نهائي."],
    "Lexin014988": ["Kossan betade.", "رعت البقرة."],
    "Lexin014989": ["Kosten var god.", "كان الغذاء جيداً."],
    "Lexin015002": ["Kostymen bars.", "ارتُدي الزي المسرحي."],
    "Lexin015003": ["Kotan undersöktes.", "فُحصت الفقرة."],
    "Lexin015004": ["Kotknackaren behandlade.", "عالج اختصاصي تقويم العظام."],
    "Lexin015006": ["Kotletten stektes.", "شُويت الكستليتة."]
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

const backupPath = DATA_FILE + '.backup_nouns35_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 3500 nouns! 🎉`);
