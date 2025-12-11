/**
 * Add examples to nouns - Batch 22 (100 nouns: Försäkringsbesked to Geschäft)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin009721": ["Försäkringsbeskedet skickades.", "أُرسل كشف التأمين."],
    "Lexin009722": ["Försäkringsbolaget betalade.", "دفعت شركة التأمين."],
    "Lexin009723": ["Försäkringskassan handlade ärendet.", "تولت صندوق التأمينات القضية."],
    "Lexin009725": ["Försäkringsläkaren undersökte.", "فحص طبيب التأمين."],
    "Lexin009726": ["Försäkringspremien betalades.", "دُفع قسط التأمين."],
    "Lexin009729": ["Försäljaren hjälpte kunden.", "ساعد البائع الزبون."],
    "Lexin009738": ["Försändelsen levererades.", "سُلم الطرد."],
    "Lexin009744": ["Försöket lyckades.", "نجحت التجربة."],
    "Lexin009750": ["Hon blev försökskanin.", "أصبحت أرنب تجارب."],
    "Lexin009753": ["Försörjningen säkrades.", "ضُمن التموين."],
    "Lexin009755": ["Försörjningsplikten gäller.", "يسري واجب الإعالة."],
    "Lexin009774": ["I förtid gick han.", "ذهب مبكراً."],
    "Lexin009775": ["Förtidspensionen beviljades.", "مُنح التقاعد المسبق."],
    "Lexin009792": ["Förtroendeuppdraget fullföljdes.", "نُفذت مهمة الثقة."],
    "Lexin009796": ["Förtroligheten växte.", "نمت العلاقة الحميمة."],
    "Lexin009808": ["Förtröstan gav styrka.", "أعطى الأمل قوة."],
    "Lexin009827": ["Förundersökningen pågick.", "جرى التحقيق الأولي."],
    "Lexin009841": ["Förvalt värde användes.", "استُخدمت القيمة الأصلية."],
    "Lexin009844": ["Förvaltaren skötte affärerna.", "أدار المسؤول الأعمال."],
    "Lexin009847": ["Förvaltningen fungerade.", "عملت الإدارة."],
    "Lexin009851": ["Förvaltningsdomstolen dömde.", "حكمت المحكمة الإدارية."],
    "Lexin009866": ["Förvandlingen var dramatisk.", "كان التغيير دراماتيكياً."],
    "Lexin009875": ["Förvaringen var säker.", "كان التخزين آمناً."],
    "Lexin009876": ["Förvaringsboxen låstes.", "أُغلق صندوق الأمانات."],
    "Lexin009901": ["Förvånansvärt nog lyckades han.", "نجح بشكل مفاجئ."],
    "Lexin009904": ["I förväg beställdes.", "طُلب مسبقاً."],
    "Lexin009921": ["Förvärvsarbetet fortsatte.", "استمر العمل الكاسب."],
    "Lexin009922": ["Förvärvskällan var stabil.", "كان مصدر الدخل مستقراً."],
    "Lexin009924": ["Förvärvstillståndet beviljades.", "مُنح تصريح الشراء."],
    "Lexin009927": ["Förväxlingen skedde.", "حدث الاختلاط."],
    "Lexin009929": ["Föryngringen märktes.", "لوحظ التجديد."],
    "Lexin009933": ["Föräldern kom på mötet.", "حضر الوالد الاجتماع."],
    "Lexin009936": ["Föräldraförsäkringen täckte kostnaden.", "غطى تأمين الوالدين التكلفة."],
    "Lexin009938": ["Föräldraledigheten godkändes.", "وُوفق على إجازة الأبوة."],
    "Lexin009940": ["Föräldramötet hölls.", "عُقد اجتماع أولياء الأمور."],
    "Lexin009953": ["Förödmjukelsen var svår.", "كانت الإهانة صعبة."],
    "Lexin009961": ["G är den sjunde bokstaven.", "G هو الحرف السابع."],
    "Lexin009963": ["Gabardinen var slitstarkt.", "كانت القبردين متينة."],
    "Lexin009964": ["Gadden stack.", "لسعت الزبانى."],
    "Lexin009968": ["Gaget betalades ut.", "دُفعت المكافأة."],
    "Lexin009973": ["Galan var lyckad.", "كان المهرجان ناجحاً."],
    "Lexin009979": ["Galenpannan tog risker.", "خاطر المتهور."],
    "Lexin009980": ["Galgen hängde i garderoben.", "تعلقت العلاقة في الخزانة."],
    "Lexin009981": ["Galgen restes.", "نُصبت المشنقة."],
    "Lexin009982": ["Galghumorn lättade stämningen.", "خفف المزاح السخيف الأجواء."],
    "Lexin009983": ["Gallan producerades i levern.", "أُنتجت الصفراء في الكبد."],
    "Lexin009991": ["Galleriet visade konst.", "عرض المعرض الفني فناً."],
    "Lexin009992": ["Galleriet var historiskt.", "كان البهو تاريخياً."],
    "Lexin009993": ["Gallerian hade många butiker.", "احتوى المجمع على متاجر كثيرة."],
    "Lexin009994": ["Han hade gallfeber.", "كان لديه ضغينة."],
    "Lexin010003": ["Gallstenen opererades.", "أُجريت عملية حصوة المرارة."],
    "Lexin010007": ["Gallupundersökningen genomfördes.", "أُجري استطلاع الرأي."],
    "Lexin010010": ["Galningen arresterades.", "اعتُقل المجنون."],
    "Lexin010013": ["Galoschen skyddade skon.", "حمى الكلوش الحذاء."],
    "Lexin010014": ["Galten var stor.", "كان ذكر الخنزير كبيراً."],
    "Lexin010016": ["Galären seglade.", "أبحر القادس."],
    "Lexin010017": ["Gamen kretsade.", "حلقت الحدأة."],
    "Lexin010019": ["Gamlingen mindes förr.", "تذكر العجوز الماضي."],
    "Lexin010023": ["Gammaldansen spelas.", "يُعزف الرقص الشعبي."],
    "Lexin010028": ["Gangstern greps.", "اعتُقل قاطع الطريق."],
    "Lexin010034": ["Gaphalsen störde.", "أزعج الصخاب."],
    "Lexin010035": ["Gapskrattet hördes.", "سُمعت الضحكة العالية."],
    "Lexin010037": ["Garanten betalade.", "دفع الكفيل."],
    "Lexin010042": ["Garantibeviset sparades.", "حُفظت شهادة الضمان."],
    "Lexin010050": ["Garnet färgades.", "صُبغ خيط الصوف."],
    "Lexin010052": ["Garnisonen övades.", "تدربت الثكنة العسكرية."],
    "Lexin010058": ["Gasen var tunn.", "كان الشاش رقيقاً."],
    "Lexin010061": ["Gasbindan lades på.", "وُضعت ضمادة الشاش."],
    "Lexin010065": ["Gasmasken skyddade.", "حمى القناع ضد الغازات."],
    "Lexin010066": ["Gasolen användes.", "استُخدم غاز البروبان."],
    "Lexin010077": ["Gatlyktan lyste.", "أضاء مصباح الشارع."],
    "Lexin010083": ["Gaveln renoverades.", "رُمم الجملون."],
    "Lexin010096": ["Gelikar samlades.", "تجمع النظراء."],
    "Lexin010112": ["Gemålen stod vid sidan.", "وقف الزوج بجانب."],
    "Lexin010114": ["Genen studerades.", "دُرست الموِّرثة."],
    "Lexin010119": ["Generalen kommenderade.", "أمر الجنرال."],
    "Lexin010129": ["Generalförsamlingen röstade.", "صوتت الجمعية العمومية."],
    "Lexin010133": ["Generalkonsuln representerade.", "مثل القنصل العام."],
    "Lexin010138": ["Generalplanen följdes.", "اتُبع المخطط العام."],
    "Lexin010139": ["Generalrepetitionen gick bra.", "سارت التكرار العام جيداً."],
    "Lexin010143": ["Generationen förändras.", "يتغير الجيل."],
    "Lexin010145": ["Generatorn producerade ström.", "أنتج المولد تياراً."],
    "Lexin010150": ["Generositeten imponerade.", "أثار الكرم الإعجاب."],
    "Lexin010156": ["Gengångaren skrämde.", "أخاف الشبح."],
    "Lexin010157": ["I gengäld hjälpte han.", "في المقابل ساعد."],
    "Lexin010158": ["Geniet hade idéer.", "كانت للنابغة أفكار."],
    "Lexin010161": ["Han hade geniknöl.", "كان لديه ذكاء."],
    "Lexin010163": ["Genitiv anger tillhörighet.", "تشير حالة المضاف إليه للملكية."],
    "Lexin010164": ["Genmälet publicerades.", "نُشرت الإجابة."],
    "Lexin010174": ["Genomfarten var trång.", "كان المعبر ضيقاً."],
    "Lexin010187": ["Genomklappningen kom.", "جاء الانهيار."],
    "Lexin010189": ["Genomköraren var hård.", "كان التدريب القاسي شديداً."],
    "Lexin010193": ["Genomslaget var stort.", "كان الأثر كبيراً."],
    "Lexin010201": ["Genrepet avslutades.", "انتهى التكرار العام."],
    "Lexin010207": ["Gentjänsten uppskattades.", "قُدرت الخدمة البديلة."],
    "Lexin010208": ["Gentlemannen hjälpte.", "ساعد الجنتلمان."],
    "Lexin010214": ["Geologin studerar jorden.", "تدرس الجيولوجيا الأرض."],
    "Lexin010215": ["Geometrin är viktig.", "الهندسة مهمة."],
    "Lexin010232": ["Gerillan kämpade.", "قاتلت حركة المقاومة."],
    "Lexin010235": ["Geschäftet avslöjades.", "اكتُشف العمل المُريب."]
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

const backupPath = DATA_FILE + '.backup_nouns22_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 2200 nouns!`);
