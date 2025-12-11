/**
 * Add examples to nouns - Batch 14 (100 nouns: Drag to E-brevelåda)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin005833": ["Draget i rummet var kallt.", "كان تيار الهواء في الغرفة بارداً."],
    "Lexin005842": ["Draggen höll båten på plats.", "أبقت المرساة القارب في مكانه."],
    "Lexin005844": ["Draghjälpen gav löparen fart.", "أعطت مساعدة السحب العداء سرعة."],
    "Lexin005847": ["Dragkampen avgjordes snabbt.", "حُسمت مباراة جر الحبل بسرعة."],
    "Lexin005848": ["Dragkedjan fastnade.", "علق السحاب."],
    "Lexin005851": ["Dragningen skedde på lördagen.", "تم سحب القرعة يوم السبت."],
    "Lexin005854": ["Dragningen i hockey var snabb.", "كانت المراوغة في الهوكي سريعة."],
    "Lexin005855": ["Dragningskraften håller oss på jorden.", "تبقينا قوة الجاذبية على الأرض."],
    "Lexin005856": ["Dragon används i matlagning.", "يُستخدم الطرخون في الطبخ."],
    "Lexin005857": ["Artisten var dragplåster för festivalen.", "كان الفنان نجم الجذب للمهرجان."],
    "Lexin005858": ["Dragspelet spelade folkmusik.", "عزف الأكورديون موسيقى شعبية."],
    "Lexin005861": ["Draken sprutade eld i sagan.", "نفث التنين النار في الحكاية."],
    "Lexin005862": ["Draken flög högt i vinden.", "طارت الطيارة الورقية عالياً في الريح."],
    "Lexin005867": ["Draperiet dolde fönstret.", "أخفت الستارة النافذة."],
    "Lexin005888": ["Dressen var elegant.", "كانت البدلة أنيقة."],
    "Lexin005890": ["Dressingen smakade gott på salladen.", "كانت صلصة السلطة لذيذة."],
    "Lexin005892": ["Drevet jagade vildsvin.", "طارد فريق الصيد الخنزير البري."],
    "Lexin005895": ["Dribblingen var imponerande.", "كانت المراوغة مثيرة للإعجاب."],
    "Lexin005896": ["Drickan var kall.", "كان الشراب بارداً."],
    "Lexin005900": ["Drickspengen gavs till servitören.", "أُعطي البقشيش للنادل."],
    "Lexin005901": ["Dricksvattnet var rent.", "كان ماء الشرب نظيفاً."],
    "Lexin005909": ["Drillen var hård.", "كان التمرين قاسياً."],
    "Lexin005913": ["Drillborren gjorde hålet.", "ثقب المثقاب الحفرة."],
    "Lexin005916": ["Drivan blockerade vägen.", "سد كوم الثلج الطريق."],
    "Lexin005918": ["Drivbänken odlade plantor.", "زرع المشتل الزجاجي الشتلات."],
    "Lexin005919": ["Driven för att rekrytera var intensiv.", "كانت حملة التوظيف مكثفة."],
    "Lexin005922": ["Han var på driven hela dagen.", "كان يتسكع طوال اليوم."],
    "Lexin005930": ["Drivhuset hade tropiska växter.", "احتوى المشتل على نباتات استوائية."],
    "Lexin005932": ["Drivkraften bakom projektet var stor.", "كانت القوة الدافعة وراء المشروع كبيرة."],
    "Lexin005933": ["Drivmedlet var dyrt.", "كان الوقود غالياً."],
    "Lexin005936": ["Drogen var förbjuden.", "كان المخدر محظوراً."],
    "Lexin005939": ["Dromedaren har en puckel.", "للجمل حدبة واحدة."],
    "Lexin005940": ["Droppet från taket störde.", "أزعج الطرطشة من السقف."],
    "Lexin005941": ["Droppet gav patienten vätska.", "أعطت القسطرة المريض سوائل."],
    "Lexin005949": ["Droskan körde oss hem.", "أوصلتنا التاكسي للبيت."],
    "Lexin005951": ["Drottningen leder bisamhället.", "تقود ملكة النحل خلية النحل."],
    "Lexin005952": ["Drottningen är mäktigast i schack.", "ملكة الشطرنج أقوى قطعة."],
    "Lexin005954": ["Drottningsylten serverades till middag.", "قُدم مربى الملكة للعشاء."],
    "Lexin005958": ["Drullen tappade glaset.", "أسقط الأحمق الكأس."],
    "Lexin005959": ["Drummeln förstörde mötet.", "أفسد الأحمق الاجتماع."],
    "Lexin005961": ["Drunkningen undveks.", "تم تجنب الموت غرقاً."],
    "Lexin005964": ["Druvsockern gav snabb energi.", "أعطى سكر العنب طاقة سريعة."],
    "Lexin005979": ["Dråpslaget drabbade ekonomin.", "ضربت الكارثة الاقتصاد."],
    "Lexin005985": ["Dräktigheten begränsade lasten.", "حددت قدرة الحمل الحمولة."],
    "Lexin005995": ["Drängen arbetade på gården.", "عمل صبي المزرعة في المزرعة."],
    "Lexin006003": ["Dröjsmålet var oacceptabelt.", "كان التأخير غير مقبول."],
    "Lexin006009": ["Drömmaren fantiserade om framtiden.", "تخيل المتخيل المستقبل."],
    "Lexin006011": ["Drönaren flög inte.", "لم يطر الدبور."],
    "Lexin006013": ["En drös med människor kom.", "جاءت مجموعة من الناس."],
    "Lexin006019": ["Dubben satt fast i däcket.", "ثبت المسمار القصير في الإطار."],
    "Lexin006028": ["Dubbelgångaren såg identisk ut.", "بدا الشبيه متطابقاً."],
    "Lexin006031": ["Dubbelmoralen var uppenbar.", "كانت الأخلاقيات المزدوجة واضحة."],
    "Lexin006037": ["Dubbla snedstreck används i URL.", "تُستخدم الشرطتان المائلتان في الروابط."],
    "Lexin006040": ["Dubbletten såldes.", "بيعت النسخة المزدوجة."],
    "Lexin006046": ["Duellen hölls vid gryningen.", "أُقيمت المبارزة عند الفجر."],
    "Lexin006047": ["Duetten var vacker.", "كانت الأغنية الثنائية جميلة."],
    "Lexin006048": ["Duffeln var varm.", "كان البالطو دافئاً."],
    "Lexin006050": ["Inte ett dugg!", "ولا شيء!"],
    "Lexin006052": ["Duggregnet föll stilla.", "سقط الرذاذ بهدوء."],
    "Lexin006065": ["Dumburken visade nyheter.", "عرض التلفزيون الأخبار."],
    "Lexin006072": ["Dunet var mjukt.", "كان الريش ناعماً."],
    "Lexin006073": ["Dundret hördes långt.", "سُمع الضجيج من بعيد."],
    "Lexin006075": ["Dungen låg vid sjön.", "كان الدغل بجانب البحيرة."],
    "Lexin006083": ["Dunsen var hög.", "كانت الخبطة عالية."],
    "Lexin006086": ["Duon spelade jazz.", "عزف الثنائي الجاز."],
    "Lexin006090": ["Dur ger en glad känsla.", "يعطي مقام الدور شعوراً سعيداً."],
    "Lexin006093": ["Durken i båten var våt.", "كانت أرض القارب مبللة."],
    "Lexin006096": ["Leva i dus.", "العيش في ترف."],
    "Lexin006098": ["Duschen var varm.", "كان الاستحمام دافئاً."],
    "Lexin006106": ["Dvalan varade i timmar.", "استمر السبات ساعات."],
    "Lexin006108": ["Dvärgen var liten men stark.", "كان القزم صغيراً لكن قوياً."],
    "Lexin006110": ["Dy fastnade på skorna.", "لصق الطين بالأحذية."],
    "Lexin006113": ["Det hjälpte inte ett dyft.", "لم يساعد شيء."],
    "Lexin006120": ["Dykaren utforskade vraket.", "استكشف الغواص الحطام."],
    "Lexin006126": ["Dynen rörde sig med vinden.", "تحركت الهضبة مع الريح."],
    "Lexin006127": ["Dynan var bekväm.", "كانت الوسادة مريحة."],
    "Lexin006130": ["Dynamon genererade el.", "ولّد المولد الكهرباء."],
    "Lexin006131": ["Dynastin regerade i 200 år.", "حكمت السلالة 200 سنة."],
    "Lexin006133": ["Dyningen var kraftig.", "كان ارتفاع الأمواج قوياً."],
    "Lexin006136": ["Dyrgripen bevarades noggrant.", "حُفظ الكنز بعناية."],
    "Lexin006137": ["Dyrken öppnade låset.", "فتح فاتح الأقفال القفل."],
    "Lexin006141": ["Dysenterien spred sig.", "انتشر الزحار."],
    "Lexin006149": ["Dådet chockade samhället.", "صدم العمل الإجرامي المجتمع."],
    "Lexin006153": ["Dåligheten var oroande.", "كان الشيء غير الحميد مقلقاً."],
    "Lexin006155": ["Dånet av åskan skrämde.", "أخاف دوي الرعد."],
    "Lexin006163": ["Däcket punkterades.", "ثُقب الإطار."],
    "Lexin006164": ["Däggdjuret ammar sina ungar.", "يُرضع اللبون صغاره."],
    "Lexin006203": ["Dödligheten minskade.", "انخفضت الوفيات."],
    "Lexin006207": ["Dödläget bröts.", "كُسر التوقف التام."],
    "Lexin006209": ["Dödsbeviset undertecknades.", "وُقعت شهادة الوفاة."],
    "Lexin006210": ["Dödsboet inventerades.", "جُردت التركة."],
    "Lexin006212": ["Dödsboanmälan lämnades in.", "قُدم إشعار حصر الإرث."],
    "Lexin006218": ["Dödshjälpen diskuterades.", "نُوقشت المساعدة على الموت."],
    "Lexin006220": ["Dödskallar syntes på flaskan.", "ظهرت الجماجم على الزجاجة."],
    "Lexin006222": ["Dödsrunan publicerades.", "نُشر النعي."],
    "Lexin006224": ["Dödsstraffet avskaffades.", "أُلغي حكم الإعدام."],
    "Lexin006239": ["Dörrknackningen pågick hela dagen.", "استمر طرق الأبواب طوال اليوم."],
    "Lexin006250": ["Han lystnade med dövörat.", "أنصت بأذن صماء."],
    "Lexin006251": ["E är den femte bokstaven.", "E هو الحرف الخامس."],
    "Lexin006253": ["E-brevelådan var full.", "كان صندوق البريد الإلكتروني ممتلئاً."]
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

const backupPath = DATA_FILE + '.backup_nouns14_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 1400 nouns!`);
