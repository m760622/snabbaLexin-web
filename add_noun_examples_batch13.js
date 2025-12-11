/**
 * Add examples to nouns - Batch 13 (100 nouns: Dia to Drag)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin005449": ["Dia visades på väggen.", "عُرضت الشريحة على الحائط."],
    "Lexin005451": ["Diabetes kräver daglig medicinering.", "يتطلب السكري دواءً يومياً."],
    "Lexin005458": ["Diabetikern kontrollerade blodsockret.", "قاس مريض السكري سكر الدم."],
    "Lexin005459": ["Diademet prydde prinsessans hår.", "زين التاج شعر الأميرة."],
    "Lexin005460": ["Diafragman skiljer bröst- och bukhålorna.", "يفصل الحجاب الحاجز تجويفي الصدر والبطن."],
    "Lexin005469": ["Dialekten avslöjade hans ursprung.", "كشفت اللهجة أصله."],
    "Lexin005470": ["Dialogen var konstruktiv.", "كان الحوار بنّاءً."],
    "Lexin005472": ["Diamanten gnistrade i ljuset.", "تلألأ الماس في الضوء."],
    "Lexin005477": ["Diapositivet visade landskap.", "أظهرت الشفافة منظراً طبيعياً."],
    "Lexin005480": ["Diariet registrerade alla händelser.", "سجل السجل جميع الأحداث."],
    "Lexin005491": ["Dieselmotorn var kraftfull.", "كان محرك الديزل قوياً."],
    "Lexin005492": ["Dieseloljan fylldes på.", "ملئ وقود الديزل."],
    "Lexin005496": ["Differensen mellan talen var stor.", "كان الفرق بين الأرقام كبيراً."],
    "Lexin005503": ["Difteri är numera ovanlig.", "الخناق نادر الآن."],
    "Lexin005507": ["Digerdöden dödade miljoner.", "قتل وباء الطاعون الملايين."],
    "Lexin005510": ["Digitalis behandlar hjärtsvikt.", "يعالج الديجيتاليس ضعف القلب."],
    "Lexin005512": ["Digitalpengar används online.", "تُستخدم النقود الرقمية عبر الإنترنت."],
    "Lexin005517": ["Diktamen övade skrivförmågan.", "دربت الإملاء مهارة الكتابة."],
    "Lexin005520": ["Diktaren skrev vacker poesi.", "كتب الأديب شعراً جميلاً."],
    "Lexin005521": ["Diktatet påtvingades folket.", "فُرض الأمر على الشعب."],
    "Lexin005522": ["Diktatorn styrde med järnhand.", "حكم الدكتاتور بيد من حديد."],
    "Lexin005523": ["Diktaturen förtryckte folket.", "قمعت الدكتاتورية الشعب."],
    "Lexin005528": ["Dill passar till fisk.", "الشبت يناسب السمك."],
    "Lexin005530": ["Han fick dille på musik.", "أصبح مهووساً بالموسيقى."],
    "Lexin005536": ["Dimljuset lyste i dimman.", "أضاء ضوء الضباب في الضباب."],
    "Lexin005543": ["Diplomet visade examen.", "أظهر الدبلوم الشهادة."],
    "Lexin005544": ["Diplomaten representerade sitt land.", "مثل الدبلوماسي بلاده."],
    "Lexin005547": ["Dippen smakade gott med chips.", "كانت الصلصة لذيذة مع الشيبس."],
    "Lexin005557": ["Direkthjälpen svarade på frågor.", "أجابت المساعدة المباشرة على الأسئلة."],
    "Lexin005558": ["Direktionen fattade beslutet.", "اتخذت الإدارة القرار."],
    "Lexin005562": ["Direktören ledde företaget.", "قاد المدير الشركة."],
    "Lexin005564": ["Dirigenten ledde orkestern.", "قاد المايسترو الأوركسترا."],
    "Lexin005567": ["Dis låg över landskapet.", "خيم السديم على المنظر."],
    "Lexin005572": ["Disharmonin störde relationen.", "أفسد التنافر العلاقة."],
    "Lexin005576": ["Disken lagrade data.", "خزن القرص البيانات."],
    "Lexin005577": ["Disken i ryggen var skadad.", "كان القرص الغضروفي في الظهر تالفاً."],
    "Lexin005582": ["Diskaren tvättade tallrikarna.", "غسل غاسل الأواني الصحون."],
    "Lexin005583": ["Diskbråcket orsakade smärta.", "سبب فتق القرص ألماً."],
    "Lexin005585": ["Diskbänken var i rostfritt stål.", "كانت المغسلة من الستانلس."],
    "Lexin005586": ["Disketten sparade filerna.", "حفظ قرص الكمبيوتر الملفات."],
    "Lexin005587": ["Diskhon fylldes med vatten.", "امتلأ حوض المغسلة بالماء."],
    "Lexin005589": ["Diskjockeyn spelade bra musik.", "شغل الدي جي موسيقى جيدة."],
    "Lexin005591": ["Diskot var fullt av ungdomar.", "كان الديسكو مليئاً بالشباب."],
    "Lexin005592": ["Diskomusiken hade stark rytm.", "كان لموسيقى الديسكو إيقاع قوي."],
    "Lexin005594": ["Diskoteket öppnade på kvällen.", "فتح المرقص الليلي مساءً."],
    "Lexin005595": ["Diskplockaren samlade tallrikarna.", "جمع جامع الصحون الأطباق."],
    "Lexin005604": ["Diskstället bredvid diskhon.", "رف التجفيف بجانب الحوض."],
    "Lexin005605": ["Diskusen kastades långt.", "رُمي القرص بعيداً."],
    "Lexin005612": ["Dispensären behandlade lungsjuka.", "عالجت العيادة مرضى الرئة."],
    "Lexin005624": ["Disputationen gick bra.", "سار الدفاع عن الأطروحة بشكل جيد."],
    "Lexin005628": ["Distansen var 100 meter.", "كانت المسافة 100 متر."],
    "Lexin005630": ["Distansminuten är en sjömil.", "الميل البحري ميل بحري."],
    "Lexin005633": ["Distinktionen var tydlig.", "كان الفرق واضحاً."],
    "Lexin005637": ["Distributionen skedde snabbt.", "تم التوزيع بسرعة."],
    "Lexin005638": ["Distributören levererade varorna.", "وزّع الموزع البضائع."],
    "Lexin005639": ["Distriktet omfattade flera städer.", "شملت المنطقة عدة مدن."],
    "Lexin005643": ["Distriktsläkaren tog emot patienter.", "استقبل طبيب المنطقة المرضى."],
    "Lexin005646": ["Distriktssköterskan vaccinerade barnen.", "طعّمت ممرضة المنطقة الأطفال."],
    "Lexin005648": ["Distriktssköterskebarnmorskan hjälpte vid förlossningar.", "ساعدت قابلة المنطقة في الولادات."],
    "Lexin005655": ["Det var ditt och datt.", "كان هناك أشياء مختلفة."],
    "Lexin005659": ["Divan krävde specialbehandling.", "طلب المغرور معاملة خاصة."],
    "Lexin005664": ["Divisionen gav resultatet 5.", "أعطت القسمة النتيجة 5."],
    "Lexin005680": ["Djurriket inkluderar alla djur.", "يشمل عالم الحيوان جميع الحيوانات."],
    "Lexin005682": ["Han var en riktig djäkel.", "كان عفريتاً حقيقياً."],
    "Lexin005702": ["Dobbleriet var förbjudet.", "كان القمار محظوراً."],
    "Lexin005704": ["Docenten undervisade på universitetet.", "درّس الأستاذ المساعد في الجامعة."],
    "Lexin005707": ["Dockan reparerade fartyget.", "أصلح حوض السفن السفينة."],
    "Lexin005712": ["Dogmen ifrågasattes inte.", "لم تُشكك العقيدة."],
    "Lexin005714": ["Han köpte nya dojor.", "اشترى أحذية جديدة."],
    "Lexin005718": ["Doktrinen styrde politiken.", "وجه المبدأ السياسة."],
    "Lexin005721": ["Dokumentationen var noggrann.", "كان التوثيق دقيقاً."],
    "Lexin005729": ["Doldisen undvek publicitet.", "تجنب المجهول الشهرة."],
    "Lexin005730": ["Dolken var vass.", "كان الخنجر حاداً."],
    "Lexin005731": ["Dollarn steg i värde.", "ارتفعت قيمة الدولار."],
    "Lexin005736": ["Domen var vacker.", "كانت الكاتدرائية جميلة."],
    "Lexin005738": ["Domaren dömde i målet.", "حكم القاضي في القضية."],
    "Lexin005743": ["Domarringen var från järnåldern.", "كانت الحلقة الحجرية من العصر الحديدي."],
    "Lexin005745": ["Domedag kommer enligt tron.", "يوم القيامة قادم حسب الإيمان."],
    "Lexin005749": ["Domherren sjöng i trädet.", "غنى الدغناش في الشجرة."],
    "Lexin005753": ["Domino spelas med brickor.", "تُلعب الدومينو بالقطع."],
    "Lexin005754": ["Domkapitlet sammanträdde.", "اجتمع مجلس الأبرشية."],
    "Lexin005755": ["Domkraften lyfte bilen.", "رفع المرفاع السيارة."],
    "Lexin005757": ["Domkyrkan stod i centrum.", "وقفت الكاتدرائية في المركز."],
    "Lexin005763": ["Domprosten ledde gudstjänsten.", "أدار راعي الكنيسة القداس."],
    "Lexin005764": ["Domsagan omfattade tre kommuner.", "شمل المركز القضائي ثلاث بلديات."],
    "Lexin005768": ["Domslutet var rättvist.", "كان الحكم عادلاً."],
    "Lexin005783": ["Domänen såldes.", "بيع الحقل."],
    "Lexin005784": ["Domänadressen var snabbalexxin.se.", "كان عنوان الموقع snabbalexin.se."],
    "Lexin005785": ["Donet användes vid arbetet.", "استُخدمت العدة في العمل."],
    "Lexin005786": ["Donationen gick till välgörenhet.", "ذهبت المنحة للإحسان."],
    "Lexin005794": ["Dopet hölls i kyrkan.", "أُقيم العماد في الكنيسة."],
    "Lexin005797": ["Dopfunten var av sten.", "كان جرن المعمودية من الحجر."],
    "Lexin005805": ["Doppingen dök efter fisk.", "غطس الغطاس وراء السمك."],
    "Lexin005807": ["Dosan innehöll smycken.", "احتوى الحق على مجوهرات."],
    "Lexin005810": ["Doseringsanvisningen förklarade dosen.", "شرحت تعليمات الجرعة الكمية."],
    "Lexin005811": ["Dossiern innehöll alla handlingar.", "احتوى المصنف على كل الوثائق."],
    "Lexin005815": ["Dotterbolaget ägdes av moderbolaget.", "امتلكت الشركة الأم الفرع."],
    "Lexin005820": ["Dovhjorten levde i parken.", "عاش الأيل الأسمر في الحديقة."],
    "Lexin005828": ["Draget i ansiktet var markant.", "كان الخط في الوجه واضحاً."],
    "Lexin005832": ["Draget lockade fisken.", "جذبت الصنارة السمكة."]
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

const backupPath = DATA_FILE + '.backup_nouns13_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 1300 nouns!`);
