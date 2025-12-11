/**
 * Add examples to nouns - Batch 25 (100 nouns: Hakparentes to Herre) - 2500 MILESTONE!
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin011059": ["Hakparentesen användes.", "استُخدمت الأقواس المعقوفة."],
    "Lexin011070": ["Hallen var stor.", "كانت القاعة كبيرة."],
    "Lexin011072": ["Hallicken arresterades.", "اعتُقل القواد."],
    "Lexin011074": ["Hallucinationen var skrämmande.", "كانت الهلوسة مخيفة."],
    "Lexin011078": ["Hallåmannen presenterade.", "قدم مقدم البرامج."],
    "Lexin011080": ["Halmen användes som strö.", "استُخدم التبن كفرشة."],
    "Lexin011087": ["Halsbrännan var obehaglig.", "كانت حرقة المعدة مزعجة."],
    "Lexin011092": ["Halsflussen behandlades.", "عولج التهاب اللوزتين."],
    "Lexin011095": ["Halsgropen syntes.", "ظهر قاع الحنجرة."],
    "Lexin011114": ["Halvbrodern bodde i Malmö.", "سكن الأخ من أحد الوالدين في مالمو."],
    "Lexin011118": ["Halvförsäkringen var billig.", "كان التأمين الجزئي رخيصاً."],
    "Lexin011120": ["Halvljuset sattes på.", "شُغل ضوء السيارة المنخفض."],
    "Lexin011122": ["Halvpensionen bokades.", "حُجزت المنامة مع وجبتين."],
    "Lexin011128": ["Halvsystern hälsade.", "سلمت الأخت من أحد الوالدين."],
    "Lexin011136": ["Hambon dansades.", "رُقصت الهامبو."],
    "Lexin011137": ["Hamburgaren var god.", "كان الهمبرجر لذيذاً."],
    "Lexin011138": ["Hamburgerköttet skivades.", "شُرح لحم الهمبرجر."],
    "Lexin011154": ["Handarbetet fortsatte.", "استمر العمل اليدوي."],
    "Lexin011157": ["Handboken lästes.", "قُرئ كتيب الإرشادات."],
    "Lexin011159": ["Handbromsen drogs.", "سُحبت الفرملة اليدوية."],
    "Lexin011164": ["Handeln öppnade tidigt.", "فتح المتجر مبكراً."],
    "Lexin011168": ["Handelsregistret uppdaterades.", "حُدث السجل التجاري."],
    "Lexin011172": ["Handfatet var rent.", "كانت المغسلة نظيفة."],
    "Lexin011173": ["Handflatan var mjuk.", "كانت راحة اليد ناعمة."],
    "Lexin011176": ["Handgemänget bröt ut.", "اندلعت المشاجرة."],
    "Lexin011184": ["Handikappet gavs.", "أُعطي سباق العدل."],
    "Lexin011187": ["Handikappersättningen betalades.", "دُفع تعويض المعوقين."],
    "Lexin011194": ["Handleden var skadad.", "أُصيب المعصم."],
    "Lexin011196": ["Handledaren hjälpte.", "ساعد المرشد."],
    "Lexin011208": ["Handlovet var smidigt.", "كان الرسغ مرناً."],
    "Lexin011225": ["Handsken var varm.", "كان القفاز دافئاً."],
    "Lexin011226": ["Handskriften bevarades.", "حُفظ المخطوط اليدوي القديم."],
    "Lexin011229": ["Handstilen var fin.", "كان خط اليد جميلاً."],
    "Lexin011232": ["I en handvändning var det klart.", "في لحظة خاطفة انتهى الأمر."],
    "Lexin011233": ["Handväskan stals.", "سُرقت حقيبة اليد."],
    "Lexin011234": ["Hanen gol.", "صاح الديك."],
    "Lexin011236": ["Hangaren var stor.", "كانت حظيرة الطائرات كبيرة."],
    "Lexin011237": ["Hangarfartyget seglade.", "أبحرت حاملة الطائرات."],
    "Lexin011244": ["Hantlangaren hjälpte till.", "ساعد المساعد."],
    "Lexin011246": ["Hantverkaren arbetade.", "عمل الحرفي."],
    "Lexin011253": ["Harangen var lång.", "كان اللغو طويلاً."],
    "Lexin011255": ["Haremet var avskilt.", "كان الحريم منعزلاً."],
    "Lexin011257": ["Harmen var stor.", "كان السخط كبيراً."],
    "Lexin011263": ["Harpan spelades.", "عُزف القيثار."],
    "Lexin011266": ["Harven användes.", "استُخدمت المسلفة."],
    "Lexin011268": ["Hasarden lockade.", "أغرى القمار."],
    "Lexin011271": ["Hasselnöten åts.", "أُكل البندق."],
    "Lexin011284": ["Havandeskapet bekräftades.", "أُكد الحمل."],
    "Lexin011286": ["Havandeskapspenningen betalades.", "دُفعت نقدية الحمل."],
    "Lexin011290": ["Haveriet rapporterades.", "أُبلغ عن التحطم."],
    "Lexin011291": ["Havren skördades.", "حُصد الشوفان."],
    "Lexin011293": ["Havregrynen kokades.", "طُبخت رقائق الشوفان."],
    "Lexin011294": ["Havsbandet var vackert.", "كان أقصى الأرخبيل جميلاً."],
    "Lexin011297": ["Heatet började.", "بدأ الشوط."],
    "Lexin011298": ["Hebreiska talas i Israel.", "تُتحدث العبرية في إسرائيل."],
    "Lexin011299": ["Heden var öde.", "كان البور قاحلاً."],
    "Lexin011307": ["Jag ger mitt hedersord.", "أعطي كلمة شرفي."],
    "Lexin011310": ["Hederssaken fullföljdes.", "نُفذت مسألة الشرف."],
    "Lexin011311": ["Hedningen omvändes.", "تحول الوثني."],
    "Lexin011318": ["Hejaren var duktig.", "كان الماهر بارعاً."],
    "Lexin011325": ["Hekton vägdes.", "وُزن الهكتوغرام."],
    "Lexin011329": ["En hela köptes.", "اشتُريت زجاجة كاملة."],
    "Lexin011330": ["Helförsäkringen tecknades.", "عُقد التأمين الشامل."],
    "Lexin011331": ["Helgen var lugn.", "كانت العطلة هادئة."],
    "Lexin011332": ["Helgdagen firades.", "احتُفل بيوم العطلة."],
    "Lexin011334": ["Helgonet dyrkades.", "عُبد القديس."],
    "Lexin011343": ["Helljuset bländade.", "أبهر الضوء العالي."],
    "Lexin011346": ["Helpensionen bokades.", "حُجزت المنامة مع جميع الوجبات."],
    "Lexin011348": ["Helsike vad jobbigt!", "يا للجحيم كم هو صعب!"],
    "Lexin011350": ["Hon var i helspänn.", "كانت في توتر شديد."],
    "Lexin011362": ["Heltiden var krävande.", "كان الدوام الكامل متطلباً."],
    "Lexin011364": ["Heltäckningsmattan lades.", "فُرشت سجادة التغطية التامة."],
    "Lexin011368": ["Hemmet var trivsamt.", "كان المسكن مريحاً."],
    "Lexin011375": ["Hembränningen var olaglig.", "كان تقطير الخمور في المنزل غير قانوني."],
    "Lexin011376": ["Hembudet mottogs.", "تُلقي العرض الداخلي."],
    "Lexin011377": ["Hembygden besöktes.", "زُير الموطن."],
    "Lexin011378": ["Hemdatorn användes.", "استُخدم الكمبيوتر الشخصي."],
    "Lexin011382": ["Hemförsäkringen täckte skadan.", "غطى التأمين المنزلي الضرر."],
    "Lexin011383": ["Hemförsäljningen ökade.", "زاد البيع المنزلي."],
    "Lexin011386": ["Hemgiften gavs.", "أُعطي المهر."],
    "Lexin011387": ["Hemhjälpen kom.", "جاء المساعد المنزلي."],
    "Lexin011391": ["Hemkunskapen var rolig.", "كان التدبير المنزلي ممتعاً."],
    "Lexin011412": ["Hemmafrun lagade mat.", "طبخت ربة البيت."],
    "Lexin011414": ["Hemmahosarbetet fortsatte.", "استمرت الإجراءات المنزلية."],
    "Lexin011416": ["Hemmanet var stort.", "كانت العزبة كبيرة."],
    "Lexin011418": ["Hemmaplan är fördelaktigt.", "أرض الفريق مفيدة."],
    "Lexin011428": ["Hemorrojderna behandlades.", "عولجت البواسير."],
    "Lexin011430": ["Hemorten registrerades.", "سُجل مكان الإقامة."],
    "Lexin011438": ["Hemslöjden bevarades.", "حُفظت المهن اليدوية."],
    "Lexin011439": ["Hemspråket talades.", "تُحدثت اللغة المتداولة."],
    "Lexin011441": ["Hemspråksläraren undervisade.", "درّس مدرس اللغة المتداولة."],
    "Lexin011442": ["Hemspråksträningen gavs.", "أُعطي التدريب على اللغة."],
    "Lexin011443": ["Hemspråksundervisningen erbjöds.", "عُرض تدريس اللغة المتداولة."],
    "Lexin011445": ["Hemsändningen ordnades.", "رُتب التوصيل للمنازل."],
    "Lexin011447": ["Hemtjänsten hjälpte.", "ساعدت الخدمة المنزلية."],
    "Lexin011453": ["Hemvisten registrerades.", "سُجل المقر."],
    "Lexin011456": ["Hemvärnet övade.", "تدرب الدفاع المدني."],
    "Lexin011466": ["Herden vaktade fåren.", "راقب الراعي الأغنام."],
    "Lexin011469": ["Heroinet beslagtogs.", "صودر الهيروين."],
    "Lexin011477": ["Herren var artig.", "كان السيد لبقاً."]
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

const backupPath = DATA_FILE + '.backup_nouns25_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`🎉🎉🎉 MILESTONE! 2500 nouns now have examples! 🎉🎉🎉`);
