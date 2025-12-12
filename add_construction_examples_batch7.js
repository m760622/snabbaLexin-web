/**
 * Add examples to CONSTRUCTION terms - Batch 7 (100 terms: Detektorslinga to Energiomställning)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin005442": ["Gräva ner en detektorslinga vid infarten.", "دفن حلقة كاشف عند المدخل."],
    "Lexin005450": ["Bänkskiva av svart diabas.", "سطح عمل من الدياباز الأسود."],
    "Lexin005466": ["Använda en diagonal schaktningsmaskin för diket.", "استخدام آلة حفر قطري للخندق."],
    "Lexin005468": ["Rita ett diagram över förbrukningen.", "رسم مخطط بياني للاستهلاك."],
    "Lexin005473": ["Borra i graniten med en diamantborrmaskin.", "الحفر في الجرانيت بمثقاب ماسي."],
    "Lexin005526": ["Lämna plats för en dilatationsfog i konstruktionen.", "ترك مساحة لفاصل تمدد في الهيكل."],
    "Lexin005532": ["Kontrollera balkens dimension.", "فحص أبعاد العارضة."],
    "Lexin005533": ["Redovisa dimensioneringsgrunder för projektet.", "عرض أسس التصميم (الأبعاد) للمشروع."],
    "Lexin005534": ["Uppfylla alla dimensioneringskriterier.", "تلبية جميع معايير التصميم."],
    "Lexin005555": ["Minska byggets direkta kostnader.", "تقليل التكاليف المباشرة للبناء."],
    "Lexin005563": ["Möte med företagets direktör.", "اجتماع مع مدير الشركة."],
    "Lexin005588": ["Installera en rostfri diskho.", "تركيب حوض غسيل (مجلى) غير قابل للصدأ."],
    "Lexin005593": ["Göra en diskontering av framtida hyror.", "إجراء خصم للإيجارات المستقبلية (لحساب القيمة الحالية)."],
    "Lexin005641": ["Rapportera till distriktschefen.", "إرسال تقرير لمدير المنطقة."],
    "Lexin005642": ["Distriktsekonomen sköter fakturorna.", "المحاسب الإقليمي يهتم بالفواتير."],
    "Lexin005834": ["Det är drag från fönstret.", "يوجد تيار هوائي من النافذة."],
    "Lexin005836": ["Förstärka konstruktionens dragbalk.", "تقوية عارضة الشد في الهيكل."],
    "Lexin005837": ["Fästa takstolen med dragband.", "تثبيت جملون السقف بشريط ربط (شد)."],
    "Lexin005838": ["Testa stålets dragbelastning.", "اختبار حمل الشد للفولاذ."],
    "Lexin005841": ["Dra elkabeln med en dragfjäder.", "سحب كابل الكهرباء باستخدام سلك سحب (نابض)."],
    "Lexin005849": ["Loket har stor dragkraft.", "القاطرة لديها قوة سحب كبيرة."],
    "Lexin005859": ["Beräkna tillåten dragspänning.", "حساب إجهاد الشد المسموح به."],
    "Lexin005860": ["Montera en dragstång av stål.", "تركيب قضيب شد (توتير) من الفولاذ."],
    "Lexin005907": ["Ansvara för fastighetens drift.", "مسؤول عن تشغيل (إدارة) العقار."],
    "Lexin005938": ["Tillsätta kemiska droger i betongen.", "إضافة مواد كيميائية (إضافات) للخرسانة."],
    "Lexin005945": ["Plåtslagaren monterar droppbleck.", "السمكري يركب لوح تقطير (لمنع تسرب الماء)."],
    "Lexin005990": ["Huset behöver ny dränering.", "المنزل يحتاج إلى صرف صحي (تصريف مياه جوفية) جديد."],
    "Lexin005991": ["Koppla rören till en dräneringsbrunn.", "توصيل الأنابيب بئر صرف."],
    "Lexin005992": ["Lägga ut dräneringsrör runt huset.", "وضع أنابيب صرف حول المنزل."],
    "Lexin005993": ["Ett effektivt dräneringssystem.", "نظام صرف فعال."],
    "Lexin005994": ["Pumpa bort dräneringsvatten.", "ضخ مياه الصرف بعيداً."],
    "Lexin006007": ["Kräva dröjsmålsvite för förseningen.", "المطالبة بغرامة تأخير."],
    "Lexin006029": ["Använda dubbelhuvad spik till formen.", "استخدام مسمار برأسين للقالب (لسهولة الفك)."],
    "Lexin006061": ["Stålet har god duktilitet.", "الفولاذ يتمتع بمطيلية (ليونة) جيدة."],
    "Lexin006071": ["Köra bort jorden med en dumper.", "نقل التربة بشاحنة قلابة (dumper)."],
    "Lexin006112": ["Spika lister med dyckert.", "تسمير القوائم (brims) بمسمار بلا رأس (dyckert)."],
    "Lexin006125": ["Sammanfoga timret med en dymling.", "وصل الخشب بـ (dymling) وتد خشبي."],
    "Lexin006196": ["Beräkna takets döda laster.", "حساب الأحمال الميتة للسقف."],
    "Lexin006226": ["Konstruktionens dödvikt är 5 ton.", "الوزن الذاتي (الميت) للهيكل هو 5 أطنان."],
    "Lexin006237": ["Montera en ny dörr.", "تركيب باب جديد."],
    "Lexin006238": ["Måla om en dörrkarm.", "إعادة طلاء إطار الباب."],
    "Lexin006240": ["Luta stegen mot dörrposten.", "إسناد السلم على دعامة الباب."],
    "Lexin006241": ["Dörröppningen är för smal.", "فتحة الباب ضيقة جداً."],
    "Lexin006258": ["Titta på E-ritningen för placering av uttag.", "انظر إلى الرسم الكهربائي لمعرفة مواقع المقابس."],
    "Lexin006292": ["Ytan kräver efterbehandling.", "السطح يتطلب معالجة لاحقة."],
    "Lexin006313": ["Betongens efterhärdning tar tid.", "تصلب الخرسانة اللاحق يأخذ وقتاً."],
    "Lexin006370": ["Muren står precis på egendomsgränsen.", "الجدار يقف تماماً على حد الملكية."],
    "Lexin006375": ["Utföra egenkontroll av arbetet.", "إجراء فحص ذاتي للعمل."],
    "Lexin006387": ["Uppfylla alla egenskapskrav.", "تلبية جميع متطلبات الخصائص."],
    "Lexin006388": ["Minska materialets egenspänning.", "تقليل الإجهاد الداخلي للمادة."],
    "Lexin006414": ["Lägga ett golv av ek.", "تثبيت أرضية من السنديان (البلوط)."],
    "Lexin006434": ["Bygga en ekodukt över motorvägen.", "بناء معبر بيئي للحيوانات فوق الطريق السريع."],
    "Lexin006439": ["Projektet har en egen ekonom.", "المشروع لديه محاسب خاص."],
    "Lexin006444": ["Renovera en gammal ekonomibyggnad.", "تجديد مبنى زراعي (خدمي) قديم."],
    "Lexin006446": ["Kalla till ett ekonomimöte.", "الدعوة لاجتماع اقتصادي (لمناقشة الميزانية)."],
    "Lexin006452": ["Upprätta en ekonomisk plan för bygget.", "إعداد خطة مالية للبناء."],
    "Lexin006454": ["Beakta de ekonomiska aspekterna.", "مراعاة الجوانب الاقتصادية."],
    "Lexin006457": ["Skapa stora ekonomiska värden.", "خلق قيم اقتصادية كبيرة."],
    "Lexin006463": ["Påverka det lokala ekosystemet.", "التأثير على النظام البيئي المحلي."],
    "Lexin006470": ["Vi har ingen el på bygget än.", "ليس لدينا كهرباء في الموقع بعد."],
    "Lexin006480": ["Materialet har hög elasticitetsmodul.", "المادة لديها معامل مرونة عالي."],
    "Lexin006486": ["Arbetet stoppades av ett elavbrott.", "العمل توقف بسبب انقطاع الكهرباء."],
    "Lexin006489": ["Värma huset med eld.", "تدفئة المنزل بالنار."],
    "Lexin006495": ["Mura ugnen med eldfast material.", "بناء الفرن بمواد مقاومة للنار."],
    "Lexin006502": ["Köpa en eldriven såg.", "شراء منشار يعمل بالكهرباء."],
    "Lexin006506": ["Sota ur husets eldstad.", "تنظيف (شحبار) موقد المنزل."],
    "Lexin006515": ["Ringa en elektriker.", "الاتصال بكهربائي."],
    "Lexin006517": ["Byta elektrod i svetsen.", "تغيير قطب اللحام."],
    "Lexin006534": ["Lufta elementet.", "تنفيس المشعاع (الرادياتير)."],
    "Lexin006535": ["Montera ett färdigt elementhus.", "تركيب منزل جاهز (مسبق الصنع)."],
    "Lexin006546": ["Säkra byggnadens elförsörjning.", "تأمين التغذية الكهربائية للمبنى."],
    "Lexin006547": ["Använda elförzinkad spik inomhus.", "استخدام مسامير مجلفنة كهربائياً في الداخل."],
    "Lexin006550": ["Göra en ny elinstallation.", "عمل تمديدات كهربائية جديدة."],
    "Lexin006554": ["Dra kablarna i en elkanal.", "سحب الكابلات في قناة كهربائية."],
    "Lexin006555": ["Byta ut en trasig elkopplare.", "استبدال مفتاح كهربائي مكسور."],
    "Lexin006561": ["Läsa av elmätaren.", "قراءة عداد الكهرباء."],
    "Lexin006562": ["Nyckeln till elmätarskåpet.", "مفتاح خزانة عداد الكهرباء."],
    "Lexin006563": ["Koppla upp sig mot det allmänna elnätet.", "الربط مع شبكة الكهرباء العامة."],
    "Lexin006566": ["Få elstötar av maskinen.", "الحصول على صدمات كهربائية من الآلة."],
    "Lexin006567": ["Montera fler eluttag i köket.", "تركيب المزيد من مقابس الكهرباء في المطبخ."],
    "Lexin006575": ["Badkaret har en yta av emalj.", "حوض الاستحمام له سطح من المينا."],
    "Lexin006580": ["Ta bort allt emballage.", "إزالة جميع مواد التغليف."],
    "Lexin006581": ["Slänga emballageavfall i containern.", "رمي مخلفات التغليف في الحاوية."],
    "Lexin006582": ["Klippa av emballagebanden.", "قص أشرطة التغليف."],
    "Lexin006601": ["Minska emissionen av farliga ämnen.", "تقليل انبعاث المواد الخطرة."],
    "Lexin006655": ["Spara energi genom isolering.", "توفير الطاقة من خلال العزل."],
    "Lexin006656": ["Använda förnybara energikällor.", "استخدام مصادر طاقة متجددة."],
    "Lexin006657": ["Göra en energianalys av huset.", "إجراء تحليل طاقة للمنزل."],
    "Lexin006658": ["Bygga nya energianläggningar.", "بناء منشآت طاقة جديدة."],
    "Lexin006659": ["Minska husets energianvändning.", "تقليل استهلاك الطاقة للمنزل."],
    "Lexin006660": ["Göra en stor energibesparing.", "تحقيق توفير كبير في الطاقة."],
    "Lexin006661": ["Beräkna möjliga energibesparingar.", "حساب وفورات الطاقة الممكنة."],
    "Lexin006662": ["Upprätta en energideklaration vid försäljning.", "إعداد شهادة طاقة عند البيع."],
    "Lexin006663": ["Satsa på energieffektivisering.", "الاستثمار في كفاءة الطاقة."],
    "Lexin006664": ["God energihushållning i fastigheten.", "إدارة جيدة للطاقة في العقار."],
    "Lexin006665": ["Konsultera en energiingenjör.", "استشارة مهندس طاقة."],
    "Lexin006667": ["Välja en miljövänlig energikälla.", "اختيار مصدر طاقة صديق للبيئة."],
    "Lexin006668": ["System för energilagring.", "نظام لتخزين الطاقة."],
    "Lexin006669": ["Beräkna den totala energimängden.", "حساب كمية الطاقة الإجمالية."],
    "Lexin006671": ["Bidra till samhällets energiomställning.", "المساهمة في تحول الطاقة في المجتمع."]
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

const backupPath = DATA_FILE + '.backup_construction7_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 7 completed!`);
