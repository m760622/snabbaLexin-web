/**
 * Add examples to nouns - Batch 21 (100 nouns: Förarprov to Försäkring)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin009005": ["Förarprovet avklarades.", "اجتُيز فحص السياقة."],
    "Lexin009009": ["Förbandet täckte såret.", "غطى الرباط الجرح."],
    "Lexin009010": ["Förbandet marscherade.", "سارت الوحدة العسكرية."],
    "Lexin009017": ["Förbannelsen lyftes.", "رُفعت اللعنة."],
    "Lexin009028": ["Förberedelsen tog tid.", "استغرق الاستعداد وقتاً."],
    "Lexin009032": ["Förberedelseklassen hjälpte nyanlända.", "ساعد الصف التمهيدي الوافدين الجدد."],
    "Lexin009038": ["I förbifarten såg jag huset.", "رأيت البيت أثناء العبور."],
    "Lexin009039": ["I förbigående nämnde han det.", "ذكره أثناء المرور."],
    "Lexin009048": ["Förbiseendet rättades till.", "صُحح السهو."],
    "Lexin009051": ["Förbistringen skapade problem.", "سبب الارتباك مشاكل."],
    "Lexin009060": ["Förbrukningen ökade.", "زاد الاستهلاك."],
    "Lexin009061": ["Förbrukningsartikeln ersattes.", "استُبدلت المادة الاستهلاكية."],
    "Lexin009065": ["Förbrytaren greps.", "اعتُقل المجرم."],
    "Lexin009066": ["Förbrytelsen straffades.", "عوقبت الجريمة."],
    "Lexin009068": ["Förbränningen gav värme.", "أعطى الاحتراق حرارة."],
    "Lexin009095": ["Fördraget undertecknades.", "وُقعت المعاهدة."],
    "Lexin009112": ["Förebudet varnade.", "أنذر النذير."],
    "Lexin009123": ["Föredraget var intressant.", "كانت المحاضرة ممتعة."],
    "Lexin009137": ["Föregångaren inspirerade.", "ألهم الرائد."],
    "Lexin009140": ["Förehavandet fortsatte.", "استمرت الممارسة."],
    "Lexin009146": ["Föreläggandet var bindande.", "كان الأمر الرسمي ملزماً."],
    "Lexin009151": ["Föremålet studerades.", "دُرس الشيء."],
    "Lexin009167": ["Föreskriften följdes.", "اتُبعت التعليمات."],
    "Lexin009178": ["Föreståndaren ledde verksamheten.", "قاد المدير النشاط."],
    "Lexin009196": ["Företagshälsovården undersökte anställda.", "فحص قسم الصحة الموظفين."],
    "Lexin009207": ["Företalet förklarade bakgrunden.", "شرحت المقدمة الخلفية."],
    "Lexin009221": ["Förfadern levde för länge sedan.", "عاش السلف منذ زمن بعيد."],
    "Lexin009223": ["Förfall hindrade mötet.", "منع المانع الاجتماع."],
    "Lexin009228": ["Förfallodagen närmade sig.", "اقترب تاريخ التسديد."],
    "Lexin009232": ["Förfalskningen avslöjades.", "اكتُشف التزييف."],
    "Lexin009239": ["Författningen skyddade rättigheter.", "حمى التشريع الحقوق."],
    "Lexin009244": ["Förfining förbättrade kvaliteten.", "حسّن التطوير الجودة."],
    "Lexin009249": ["Till förfogande stod resurser.", "كانت الموارد في المتناول."],
    "Lexin009252": ["Förfriskningen serverades.", "قُدمت المرطبات."],
    "Lexin009259": ["Utan förfång för andra.", "دون أذى للآخرين."],
    "Lexin009263": ["Förföljelsen upphörde.", "توقفت الملاحقة."],
    "Lexin009268": ["Förföraren lurade många.", "خدع المُضلِّل كثيرين."],
    "Lexin009269": ["Förgasaren blandade bränslet.", "مزج المكربن الوقود."],
    "Lexin009288": ["Förgätmigejen blommade.", "أزهرت أذن الفأر."],
    "Lexin009294": ["I förhand betalades.", "دُفع مقدماً."],
    "Lexin009297": ["Förhandlingen fortsatte.", "استمر التفاوض."],
    "Lexin009303": ["Förhandsbeskedet gavs.", "أُعطيت الإجابة المسبقة."],
    "Lexin009308": ["Förhistorian studerades.", "دُرست ما قبل التاريخ."],
    "Lexin009322": ["Förhårdnaden kändes.", "أُحست القساوة."],
    "Lexin009331": ["Förhöret pågick.", "استمر التحقيق."],
    "Lexin009332": ["Förhöret i skolan gick bra.", "سار الاستجواب في المدرسة جيداً."],
    "Lexin009348": ["Förkalkningen syntes på röntgen.", "ظهر التكلس في الأشعة."],
    "Lexin009353": ["Förklaringen var tydlig.", "كان التوضيح واضحاً."],
    "Lexin009354": ["Förklaringen lämnades.", "قُدم الإعلان."],
    "Lexin009365": ["Förkortningen användes.", "استُخدم التقصير."],
    "Lexin009381": ["Förköpet sparade tid.", "وفّر الشراء المسبق الوقت."],
    "Lexin009383": ["Förlaget gav ut boken.", "نشرت دار النشر الكتاب."],
    "Lexin009384": ["Förlagan bevarades.", "حُفظ الأصل."],
    "Lexin009387": ["Förlamningen behandlades.", "عولج الشلل."],
    "Lexin009397": ["Förlikningen nåddes.", "تحققت التسوية."],
    "Lexin009408": ["Förlossningen gick bra.", "سارت الولادة جيداً."],
    "Lexin009416": ["Förlovningen firades.", "احتُفل بالخطوبة."],
    "Lexin009427": ["Förläggningen var bekväm.", "كان المخيم مريحاً."],
    "Lexin009434": ["Förlängt barnbidrag betalades.", "دُفعت نقدية الطفل المطوّلة."],
    "Lexin009442": ["Förmannen gav order.", "أعطى كبير العمال أوامر."],
    "Lexin009443": ["Förmaningen mottogs.", "تُلقي العتاب."],
    "Lexin009448": ["Förmedlingen hjälpte till.", "ساعد مكتب الوساطة."],
    "Lexin009455": ["Förmiddagen var produktiv.", "كان قبل الظهر منتجاً."],
    "Lexin009463": ["Förmyndaren skötte ekonomin.", "أدار الوصي الاقتصاد."],
    "Lexin009476": ["Förmögenheten växte.", "نمت الثروة."],
    "Lexin009482": ["Förnamnet var vanligt.", "كان الاسم الشخصي شائعاً."],
    "Lexin009502": ["Förnödenheten saknades.", "افتُقدت الضروريات."],
    "Lexin009505": ["Förolämpningen förlåttes.", "سُمحت الإهانة."],
    "Lexin009507": ["Förordet förklarade syftet.", "شرحت المقدمة الهدف."],
    "Lexin009513": ["Förordningen trädde i kraft.", "دخل التشريع الحكومي حيز التنفيذ."],
    "Lexin009530": ["Förpackningen återvanns.", "أُعيد تدوير الغلاف."],
    "Lexin009541": ["I förrgår regnade det.", "أمطرت أول أمس."],
    "Lexin009543": ["Förruttnelsen spred sig.", "انتشر التعفن."],
    "Lexin009547": ["Förrådet var tomt.", "كان المخزن فارغاً."],
    "Lexin009550": ["Förrädaren avslöjades.", "اكتُشف الخائن."],
    "Lexin009556": ["Förrättningen genomfördes.", "نُفذت المهمة."],
    "Lexin009560": ["Församlingen samlades.", "تجمعت الجماعة."],
    "Lexin009564": ["Förseelsen noterades.", "دُونت المخالفة."],
    "Lexin009570": ["Förseningen orsakade problem.", "سبب التأخير مشاكل."],
    "Lexin009581": ["Förskingringen upptäcktes.", "اكتُشف الاختلاس."],
    "Lexin009585": ["Förskjutningen mättes.", "قيس التغير في الموضع."],
    "Lexin009587": ["Förskolan öppnade tidigt.", "فتحت المدرسة التمهيدية مبكراً."],
    "Lexin009591": ["Förskoleåldern är viktig.", "سن المرحلة التمهيدية مهم."],
    "Lexin009595": ["Förskottet betalades.", "دُفعت الدفعة المقدمة."],
    "Lexin009603": ["Förskäraren skar köttet.", "قطعت سكين اللحم اللحم."],
    "Lexin009608": ["Förslitningen syntes.", "ظهر الاهتراء."],
    "Lexin009615": ["Försommaren var varm.", "كانت طلائع الصيف دافئة."],
    "Lexin009622": ["Förspelet inledde mötet.", "بدأ الاستهلال اللقاء."],
    "Lexin009636": ["Förstaden växte.", "نمت الضاحية."],
    "Lexin009637": ["Förstahandskontraktet tecknades.", "وُقع العقد المباشر."],
    "Lexin009638": ["Förstasidan visade nyheten.", "أظهرت الصفحة الأولى الخبر."],
    "Lexin009640": ["Försteget var viktigt.", "كانت الأولوية مهمة."],
    "Lexin009645": ["I förstone verkade det enkelt.", "بدا سهلاً في البداية."],
    "Lexin009646": ["Förstoppningen behandlades.", "عولج الإمساك."],
    "Lexin009650": ["Förstoringen hängdes upp.", "عُلق التكبير."],
    "Lexin009665": ["Förstärkaren höjde volymen.", "رفع مقوي الصوت مستوى الصوت."],
    "Lexin009673": ["Förstörelsen var omfattande.", "كان التخريب واسعاً."],
    "Lexin009680": ["Försurningen hotade sjöarna.", "هددت زيادة الحمضية البحيرات."],
    "Lexin009714": ["Försäkran gavs.", "أُعطي التوكيد."],
    "Lexin009718": ["Försäkringen tecknades.", "عُقد التأمين."]
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

const backupPath = DATA_FILE + '.backup_nouns21_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 2100 nouns!`);
