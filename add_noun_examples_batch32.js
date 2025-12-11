/**
 * Add examples to nouns - Batch 32 (100 nouns: Kavaljer to Klunga)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin013885": ["Kavaljeren bjöd upp.", "دعا مرافق السيدة للرقص."],
    "Lexin013886": ["Kavalkaden passerade.", "مر الموكب."],
    "Lexin013887": ["Kavalleriet attackerade.", "هاجمت سرية الخيالة."],
    "Lexin013889": ["Kaveln rullade degen.", "فرد الشوبك العجين."],
    "Lexin013890": ["Kaviaren serverades.", "قُدم البطارخ."],
    "Lexin013892": ["Kavringen smakade gott.", "طعم الكافرينج جيداً."],
    "Lexin013898": ["Kedjan var lång.", "كانت السلسلة طويلة."],
    "Lexin013900": ["Kedjehuset var modernt.", "كانت البيوت المترابطة حديثة."],
    "Lexin013902": ["Kejsaren regerade.", "حكم القيصر."],
    "Lexin013903": ["Kejsarsnittet utfördes.", "أُجريت العملية القيصرية."],
    "Lexin013905": ["Kelet kändes skönt.", "شعر بالتحسيس بشكل جيد."],
    "Lexin013907": ["Kelgrisen skämdes bort.", "دُلل المدلل."],
    "Lexin013910": ["Kemikalierna lagrades.", "خُزنت الكيماويات."],
    "Lexin013914": ["Kemisten forskade.", "بحث الكيميائي."],
    "Lexin013915": ["Kemtvätten rensade kläderna.", "نظف الغسيل الجاف الملابس."],
    "Lexin013917": ["Kenneln sålde valpar.", "باع مربى الكلاب الجراء."],
    "Lexin013918": ["Kepsen skyddade mot solen.", "حمت القبعة من الشمس."],
    "Lexin013919": ["Keramiken var vacker.", "كان الخزف جميلاً."],
    "Lexin013921": ["Keramikern skapade krukor.", "صنع فنان الخزف الأواني."],
    "Lexin013923": ["Keson åts till frukost.", "أُكل الكيسو على الفطور."],
    "Lexin013924": ["Ketchupen sattes på.", "وُضع الكتشب."],
    "Lexin013930": ["Det gav en kick.", "أعطى ذلك لمحة خاطفة."],
    "Lexin013931": ["Kicken träffade målet.", "أصابت الركلة الهدف."],
    "Lexin013936": ["Kikaren användes.", "استُخدم المنظار."],
    "Lexin013937": ["Kikhostan behandlades.", "عولج السعال الديكي."],
    "Lexin013948": ["Killen spelade fotboll.", "لعب الولد كرة القدم."],
    "Lexin013949": ["Killingen lekte.", "لعب الجدي."],
    "Lexin013954": ["Kilometerskatten betalades.", "دُفعت ضريبة سيارات الديزل."],
    "Lexin013955": ["Kilowatt är en enhet.", "الكيلوواط وحدة قياس."],
    "Lexin013956": ["Kilskriften studerades.", "دُرست الكتابة المسمارية."],
    "Lexin013959": ["Kindtanden värkte.", "آلم الضرس الطاحن."],
    "Lexin013961": ["Kinesen reste hem.", "عاد الصيني للوطن."],
    "Lexin013966": ["Kiosken sålde tidningar.", "باع الكشك الصحف."],
    "Lexin013967": ["Kiosklitteraturen kritiserades.", "انتُقد الأدب الرديء."],
    "Lexin013971": ["Kiropraktorn behandlade ryggen.", "عالج مقوم العظام الظهر."],
    "Lexin013972": ["Kirurgen opererade.", "جرح الجراح."],
    "Lexin013973": ["Kirurgin utvecklades.", "تطورت الجراحة."],
    "Lexin013978": ["Kisel används i elektronik.", "يُستخدم السيليكون في الإلكترونيات."],
    "Lexin013979": ["Kisset testades.", "فُحص البول."],
    "Lexin013981": ["Kissen sov.", "نامت القطة."],
    "Lexin013982": ["Kistan bars.", "حُمل التابوت."],
    "Lexin013985": ["Kittet applicerades.", "وُضع الملاط."],
    "Lexin013986": ["Kitteln kokade.", "غلى القدر."],
    "Lexin013991": ["Kiwin var mogen.", "كان الكيوي ناضجاً."],
    "Lexin013994": ["Klacken slogs av.", "كُسر الكعب."],
    "Lexin013997": ["Klacksparken överraskade.", "فاجأت ركلة الكعب."],
    "Lexin013998": ["Kladdet raderades.", "مُحيت الخربشة."],
    "Lexin013999": ["Kladden skrevs om.", "أُعيدت كتابة المسودة."],
    "Lexin014003": ["Klaffen öppnades.", "فُتح الغطاء."],
    "Lexin014011": ["Klagomuren kontaktades.", "اتُصل بحائط المبكى."],
    "Lexin014013": ["Klammern användes.", "استُخدمت علامة القوسين."],
    "Lexin014014": ["Klammern fäste pappret.", "ثبتت القامطة الورق."],
    "Lexin014018": ["Klammerparentesen skrevs.", "كُتب القوسان."],
    "Lexin014021": ["Klamydia behandlas.", "تُعالج الكلاميديا."],
    "Lexin014023": ["Klandret var hårt.", "كان النقد قاسياً."],
    "Lexin014036": ["Klantskallen misslyckades.", "فشل الأحمق."],
    "Lexin014037": ["Klappen gavs.", "أُعطي التربيت."],
    "Lexin014038": ["Klappen öppnades.", "فُتحت الهدية."],
    "Lexin014042": ["Klappjakten pågick.", "استمرت المطاردة."],
    "Lexin014049": ["Klarinetten spelades.", "عُزفت الكلارينيت."],
    "Lexin014052": ["Klarsignalen gavs.", "أُعطيت إشارة الانطلاق."],
    "Lexin014053": ["Klarsynen hjälpte.", "ساعدت البصيرة."],
    "Lexin014062": ["Klassföreståndaren ansvarade.", "تحمل مربي الصف المسؤولية."],
    "Lexin014064": ["Klassikern lästes.", "قُرئ الكلاسيكي."],
    "Lexin014067": ["Klassläraren undervisade.", "درّس مدرس الصف."],
    "Lexin014068": ["Klassmamman organiserade.", "نظمت والدة الصف."],
    "Lexin014074": ["Klaveret spelades.", "عُزف البيانو."],
    "Lexin014078": ["Klenoden bevarades.", "حُفظت الدرة."],
    "Lexin014082": ["Kli är nyttigt.", "النخالة مفيدة."],
    "Lexin014090": ["Klichén upprepades.", "تكرر القول المبتذل."],
    "Lexin014091": ["Klicken höll ihop.", "تماسكت الزمرة."],
    "Lexin014092": ["En klick smör lades på.", "وُضعت كتلة صغيرة من الزبدة."],
    "Lexin014098": ["Klienten rådfrågade.", "استشار الزبون."],
    "Lexin014100": ["Klient-server fungerade.", "عمل جهاز شبكة خدمات الزبائن."],
    "Lexin014101": ["Klientelet växte.", "نمت مجموعة الزبائن."],
    "Lexin014103": ["Klimakteriet passerades.", "مر الأياس."],
    "Lexin014111": ["Klimax nåddes.", "بُلغت الذروة."],
    "Lexin014112": ["Klimpen smälte.", "ذابت الكتلة الصغيرة."],
    "Lexin014114": ["Klingan var vass.", "كان النصل حاداً."],
    "Lexin014119": ["Klippet sparades.", "حُفظت القصاصة."],
    "Lexin014124": ["Klippoteket var modernt.", "كان صالون الحلاقة حديثاً."],
    "Lexin014128": ["Klistret torkade.", "جف الصمغ."],
    "Lexin014132": ["Klitoris är känslig.", "البظر حساس."],
    "Lexin014134": ["Klivet var långt.", "كانت الخطوة الواسعة طويلة."],
    "Lexin014136": ["Klon var vass.", "كان المخلب حاداً."],
    "Lexin014137": ["Kloaken reparerades.", "رُممت البالوعة."],
    "Lexin014139": ["Klockan ringde.", "قرع الجرس."],
    "Lexin014141": ["Klockslaget passerade.", "مر الموعد المحدد."],
    "Lexin014143": ["Klor renar vatten.", "ينقي الكلور الماء."],
    "Lexin014144": ["Klorofyll ger grön färg.", "يعطي اليخضور اللون الأخضر."],
    "Lexin014145": ["Klosetten spolades.", "شُطف المرحاض."],
    "Lexin014146": ["Klossen lektes med.", "لُعب بالكتلة الخشبية."],
    "Lexin014147": ["Klostret besöktes.", "زُير الدير."],
    "Lexin014148": ["Klotet var runt.", "كانت الكرة مستديرة."],
    "Lexin014149": ["Klottret tvättades bort.", "غُسلت الخربشة."],
    "Lexin014151": ["Klubben träffades.", "اجتمع النادي."],
    "Lexin014152": ["Klubban slog.", "ضربت الهراوة."],
    "Lexin014153": ["Klubban slickades.", "لُحست مصاصة الحلوى."],
    "Lexin014156": ["Klumpen var tung.", "كانت الكتلة ثقيلة."],
    "Lexin014158": ["Klungan samlades.", "تجمعت المجموعة."]
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

const backupPath = DATA_FILE + '.backup_nouns32_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 3200 nouns!`);
