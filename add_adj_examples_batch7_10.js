// Add examples to adjectives - Batch 7-10 (300-500)
const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
let dictionaryData = eval(match[1]);

const COL_ID = 0;
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;

const examples = {
    // Common adjectives without examples
    "Lexin004830": { swe: "Platsen var förbjuden.", arb: "كان المكان محظوراً." },
    "Lexin004845": { swe: "Hon var förbryllad över svaret.", arb: "كانت محتارة من الجواب." },
    "Lexin004860": { swe: "Dörren var förchockad.", arb: "كان الباب مغلقاً." },
    "Lexin004875": { swe: "Boken var föredömlig.", arb: "كان الكتاب مثالياً." },
    "Lexin004890": { swe: "Problemet var förekommande.", arb: "كانت المشكلة متكررة." },
    "Lexin004905": { swe: "Han var förenklad i sin förklaring.", arb: "كان مبسطاً في شرحه." },
    "Lexin004920": { swe: "Stilen var förfinad.", arb: "كان الأسلوب راقياً." },
    "Lexin004935": { swe: "Glädjen var förgjord.", arb: "كانت الفرحة تالفة." },
    "Lexin004950": { swe: "Situationen var förhandenvarande.", arb: "كان الوضع حالياً." },
    "Lexin004965": { swe: "Bidraget var förhöjt.", arb: "كانت المساهمة مرتفعة." },
    "Lexin004980": { swe: "Priset var förklarligt.", arb: "كان السعر مفهوماً." },
    "Lexin004995": { swe: "Kontraktet var förlängt.", arb: "كان العقد ممدداً." },
    "Lexin005010": { swe: "Han var förlägen.", arb: "كان محرجاً." },
    "Lexin005025": { swe: "Flickan var förmögen.", arb: "كانت الفتاة ثرية." },
    "Lexin005040": { swe: "Diskussionen var förnuftig.", arb: "كان النقاش عقلانياً." },
    "Lexin005055": { swe: "Svaret var förnämlig.", arb: "كان الجواب ممتازاً." },
    "Lexin005070": { swe: "Tillgången var förolämpad.", arb: "كان الوصول محدوداً." },
    "Lexin005085": { swe: "Kvaliteten var förringad.", arb: "كانت الجودة منخفضة." },
    "Lexin005100": { swe: "Mötet var försenat.", arb: "كان الاجتماع متأخراً." },
    "Lexin005115": { swe: "Målet var förskjutet.", arb: "كان الهدف مؤجلاً." },
    "Lexin005130": { swe: "Utlänningen var förståelig.", arb: "كان الأجنبي مفهوماً." },
    "Lexin005145": { swe: "Temperaturen var försvarlig.", arb: "كانت درجة الحرارة معتدلة." },
    "Lexin005160": { swe: "Arbetet var försörjande.", arb: "كان العمل مُعيلاً." },
    "Lexin005175": { swe: "Tjänsten var förtjänt.", arb: "كانت الخدمة مستحقة." },
    "Lexin005190": { swe: "Meddelandet var förtroligt.", arb: "كانت الرسالة سرية." },
    "Lexin005205": { swe: "Avtalet var förtryckande.", arb: "كان الاتفاق قمعياً." },
    "Lexin005220": { swe: "Resultatet var förvånande.", arb: "كانت النتيجة مفاجئة." },
    "Lexin005235": { swe: "Barnet var galen.", arb: "كان الطفل مجنوناً." },
    "Lexin005250": { swe: "Gatan var gammal och smal.", arb: "كان الشارع قديماً وضيقاً." },
    "Lexin005265": { swe: "Boken var gedigen.", arb: "كان الكتاب متيناً." },
    "Lexin005280": { swe: "Hon var generad av situationen.", arb: "كانت محرجة من الوضع." },
    "Lexin005295": { swe: "Idén var genial.", arb: "كانت الفكرة عبقرية." },
    "Lexin005310": { swe: "Hans tal var genuint.", arb: "كان كلامه صادقاً." },
    "Lexin005325": { swe: "Maten var gigantisk.", arb: "كان الطعام ضخماً." },
    "Lexin005340": { swe: "Priset var girigt.", arb: "كان السعر جشعاً." },
    "Lexin005355": { swe: "Han var glad över nyheten.", arb: "كان سعيداً بالخبر." },
    "Lexin005370": { swe: "Ytan var glansig.", arb: "كان السطح لامعاً." },
    "Lexin005385": { swe: "Ögonen var glasiga.", arb: "كانت العيون زجاجية." },
    "Lexin005400": { swe: "Vägen var glidande.", arb: "كان الطريق زلقاً." },
    "Lexin005415": { swe: "Atmosfären var glädjefull.", arb: "كان الجو بهيجاً." },
    "Lexin005430": { swe: "Idén var glimrande.", arb: "كانت الفكرة متألقة." },
    "Lexin005445": { swe: "Rummet var glödande.", arb: "كانت الغرفة متوهجة." },
    "Lexin005460": { swe: "Utsikten var god.", arb: "كان المنظر جيداً." },
    "Lexin005475": { swe: "Materialet var godkänt.", arb: "كانت المادة موافق عليها." },
    "Lexin005490": { swe: "Beslutet var godtyckligt.", arb: "كان القرار تعسفياً." },
    "Lexin005505": { swe: "Maten var grekisk.", arb: "كان الطعام يونانياً." },
    "Lexin005520": { swe: "Han var grym mot djuren.", arb: "كان قاسياً مع الحيوانات." },
    "Lexin005535": { swe: "Bilen var grå.", arb: "كانت السيارة رمادية." },
    "Lexin005550": { swe: "Situationen var gråaktig.", arb: "كان الوضع رمادياً." },
    "Lexin005565": { swe: "Han var gräslig.", arb: "كان مريعاً." },
    "Lexin005580": { swe: "Hennes hår var grön.", arb: "كان شعرها أخضر." },
    "Lexin005595": { swe: "Flickan var grönögd.", arb: "كانت الفتاة خضراء العينين." },
    "Lexin005610": { swe: "Villan var gulaktig.", arb: "كانت الفيلا صفراء." },
    "Lexin005625": { swe: "Golvet var gult.", arb: "كانت الأرضية صفراء." },
    "Lexin005640": { swe: "Trädgården var gyllene.", arb: "كانت الحديقة ذهبية." },
    "Lexin005655": { swe: "Känslan var gynnsam.", arb: "كان الشعور مواتياً." },
    "Lexin005670": { swe: "Situationen var gängse.", arb: "كان الوضع عادياً." },
    "Lexin005685": { swe: "Uppgiften var gäckande.", arb: "كانت المهمة محيرة." },
    "Lexin005700": { swe: "Festen var gästfri.", arb: "كانت الحفلة مضيافة." },
    "Lexin005715": { swe: "Stunden var händelserik.", arb: "كانت اللحظة حافلة بالأحداث." },
    "Lexin005730": { swe: "Resan var hård.", arb: "كانت الرحلة شاقة." },
    "Lexin005745": { swe: "Kritiken var häftig.", arb: "كان النقد عنيفاً." },
    "Lexin005760": { swe: "Överraskningen var häpnadsväckande.", arb: "كانت المفاجأة مذهلة." },
    "Lexin005775": { swe: "Han var häftig i diskussionen.", arb: "كان حاداً في النقاش." },
    "Lexin005790": { swe: "Maten var hälsosam.", arb: "كان الطعام صحياً." },
    "Lexin005805": { swe: "Upplevelsen var hänförande.", arb: "كانت التجربة ساحرة." },
    "Lexin005820": { swe: "Situationen var häpnadsvärdigt.", arb: "كان الوضع مذهلاً." },
    "Lexin005835": { swe: "Hon var hänsynsfull.", arb: "كانت مراعية للآخرين." },
    "Lexin005850": { swe: "Belöningen var häpen.", arb: "كانت المكافأة مدهشة." },
    "Lexin005865": { swe: "Han var härifrån.", arb: "كان من هنا." },
    "Lexin005880": { swe: "Reaktionen var hejdlös.", arb: "كان رد الفعل جامحاً." },
    "Lexin005895": { swe: "Situationen var hektisk.", arb: "كان الوضع محموماً." },
    "Lexin005910": { swe: "Maten var hemgjord.", arb: "كان الطعام منزلي الصنع." },
    "Lexin005925": { swe: "Känslan var hemlig.", arb: "كان الشعور سرياً." },
    "Lexin005940": { swe: "Atmosfären var hemlängtande.", arb: "كان الجو حنيناً للوطن." },
    "Lexin005955": { swe: "Rösten var hemsk.", arb: "كان الصوت مخيفاً." },
    "Lexin005970": { swe: "Dagen var het.", arb: "كان اليوم حاراً." },
    "Lexin005985": { swe: "Förklaringen var himmelsk.", arb: "كان التفسير سماوياً." },
    "Lexin006000": { swe: "Problemet var historiskt.", arb: "كانت المشكلة تاريخية." },
    "Lexin006015": { swe: "Brevet var hjärtligt.", arb: "كانت الرسالة ودية." }
};

let count = 0;
for (let i = 0; i < dictionaryData.length; i++) {
    const id = dictionaryData[i][COL_ID];
    if (examples[id] && (!dictionaryData[i][COL_EX_SWE] || dictionaryData[i][COL_EX_SWE].trim() === '')) {
        dictionaryData[i][COL_EX_SWE] = examples[id].swe;
        dictionaryData[i][COL_EX_ARB] = examples[id].arb;
        count++;
        console.log(`✓ ${dictionaryData[i][2]}`);
    }
}

const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';'
);
fs.writeFileSync('./data.js', newContent, 'utf-8');
console.log(`\n✅ Added examples to ${count} adjectives (Batch 7-10)`);
