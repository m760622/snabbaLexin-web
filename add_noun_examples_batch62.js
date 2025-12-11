/**
 * Add examples to nouns - Batch 62 (100 nouns: Skamgrepp to Skottår)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin024211": ["Skamgrepp användes.", "استُخدم التصرف اللا أخلاقي."],
    "Lexin024214": ["Vid skampålen stod han.", "وقف عند التحقير."],
    "Lexin024216": ["Skamvrå användes.", "استُخدمت زاوية الخزي."],
    "Lexin024223": ["Skans byggdes.", "بُني الحصن."],
    "Lexin024226": ["Skapare arbetade.", "عمل الخالق."],
    "Lexin024227": ["Skapelse gjordes.", "أُنجز الإبداع."],
    "Lexin024231": ["Skare bildades.", "تكونت القشرة الجليدية."],
    "Lexin024236": ["I skarpen.", "بشكل شديد."],
    "Lexin024237": ["Skarpsinne visades.", "أُظهر الذكاء."],
    "Lexin024238": ["Skarpsyn visades.", "أُظهرت حدة البصر."],
    "Lexin024241": ["Skata skrattade.", "ضحكت العقعق."],
    "Lexin024242": ["Skateboard användes.", "استُخدم السكيت بورد."],
    "Lexin024256": ["Skattekolumn studerades.", "دُرس عمود الضريبة."],
    "Lexin024259": ["Skattekrona beräknades.", "حُسبت نسبة ضريبة البلدية."],
    "Lexin024267": ["Skattepliktig inkomst uppnåddes.", "بُلغ الدخل الخاضع للضريبة."],
    "Lexin024276": ["Skatteutjämning gjordes.", "أُجريت التسوية الضرائبية."],
    "Lexin024278": ["Skatteåterbäring betalades.", "دُفع فائض الضريبة."],
    "Lexin024279": ["Skattsedel skickades.", "أُرسلت قسيمة الضربية النهائية."],
    "Lexin024280": ["Skav märktes.", "لوحظ الكشط."],
    "Lexin024281": ["Skavank hittades.", "وُجد النقص."],
    "Lexin024299": ["Skenben bröts.", "كُسر الظنبوب."],
    "Lexin024302": ["Skenbild skapades.", "أُنشئت الصورة الزائفة."],
    "Lexin024308": ["Skepp seglade.", "أبحرت السفينة."],
    "Lexin024309": ["Skepp besöktes.", "زُير الجناح."],
    "Lexin024311": ["Skeppare styrde.", "قاد القبطان."],
    "Lexin024317": ["Sketch framfördes.", "قُدم المشهد المسرحي."],
    "Lexin024323": ["Skick visades.", "أُظهرت الآداب."],
    "Lexin024326": ["Skickelse drabbade.", "أصاب القدر."],
    "Lexin024329": ["Skida användes.", "استُخدم الغمد."],
    "Lexin024330": ["Skiffer bröts.", "استُخرج الطفل القيري."],
    "Lexin024334": ["Skiftarbetare arbetade.", "عمل عامل الوردية."],
    "Lexin024336": ["Skiftarbete gjordes.", "أُجري عمل الوردية."],
    "Lexin024338": ["Skifte gjordes.", "أُجري تقسيم الممتلكات."],
    "Lexin024341": ["Skiftgång ordnades.", "نُظم العمل ضمن وردية."],
    "Lexin024343": ["Skiftnyckel användes.", "استُخدم المفتاح الإنجليزي."],
    "Lexin024345": ["Skifttillägg betalades.", "دُفعت علاوة الوردية."],
    "Lexin024357": ["Skiljedom gavs.", "أُعطي قرار التحكيم."],
    "Lexin024362": ["Skiljeman avgjorde.", "قرر مسؤول التحكيم."],
    "Lexin024364": ["Skiljenämnd sammanträdde.", "اجتمع مجلس التحكيم."],
    "Lexin024370": ["Skiljetecken sattes.", "وُضعت علامة الترقيم."],
    "Lexin024371": ["Skiljeväg nåddes.", "بُلغ مفترق الطرق."],
    "Lexin024373": ["Skillingtryck sjöngs.", "غُني الكتيب."],
    "Lexin024375": ["Skillnad märktes.", "لوحظ الفرق."],
    "Lexin024381": ["Skimmer syntes.", "ظهر اللمعان."],
    "Lexin024395": ["Skit låg.", "وُجدت القذارة."],
    "Lexin024399": ["Skitsnack talades.", "تُحدث بكلام فارغ."],
    "Lexin024402": ["Skiva användes.", "استُخدمت اسطوانة ذاكرة الحاسوب."],
    "Lexin024403": ["Skiva hölls.", "أُقيم الحفل."],
    "Lexin024405": ["Skivspelare användes.", "استُخدم الغرامافون."],
    "Lexin024406": ["Skivstång lyftes.", "رُفعت الثقلة."],
    "Lexin024408": ["Skjul byggdes.", "بُني الكوخ."],
    "Lexin024409": ["Skjutbana besöktes.", "زُير مضمار الرماية."],
    "Lexin024424": ["Skodon köptes.", "اشتُري الحذاء."],
    "Lexin024426": ["Skogsbruk bedrevs.", "مورست الحراجة."],
    "Lexin024428": ["Skogsdöd skedde.", "حدث إتلاف الغابات."],
    "Lexin024429": ["Skogsmulleskola gicks.", "التُحق بمدرسة الطبيعة."],
    "Lexin024430": ["Skohorn användes.", "استُخدمت الكرتة."],
    "Lexin024437": ["Skojare greps.", "اعتُقل المخادع."],
    "Lexin024440": ["Skokräm användes.", "استُخدمت البوية."],
    "Lexin024443": ["Skola gicks.", "التُحق بالمدرسة."],
    "Lexin024446": ["Skolbespisning serverades.", "قُدم مطعم المدرسة."],
    "Lexin024447": ["Skolbänk användes.", "استُخدمت طاولة المدرسة."],
    "Lexin024448": ["Skolexempel gavs.", "أُعطي مثال نموذجي."],
    "Lexin024452": ["Skolgård besöktes.", "زُيرت باحة المدرسة."],
    "Lexin024453": ["Skolhem besöktes.", "زُيرت مدرسة الأحداث."],
    "Lexin024454": ["Skolhälsovård gavs.", "أُعطيت الرعاية الصحية المدرسية."],
    "Lexin024456": ["Skolk förekom.", "حدث الغياب غير الشرعي."],
    "Lexin024458": ["Skolkontor arbetade.", "عملت إدارة المدرسة."],
    "Lexin024459": ["Skolkort användes.", "استُخدمت البطاقة المدرسية."],
    "Lexin024460": ["Skolkurator hjälpte.", "ساعد المرشد الاجتماعي في المدرسة."],
    "Lexin024463": ["Skolleda kändes.", "شُعر بالإعياء المدرسي."],
    "Lexin024466": ["Skolmåltid serverades.", "قُدمت الوجبة الغذائية المدرسية."],
    "Lexin024467": ["Skolplikt gällde.", "سرى التعليم الإجباري."],
    "Lexin024469": ["Skolpsykolog hjälpte.", "ساعد الخبير النفساني المدرسي."],
    "Lexin024470": ["Skolskjuts ordnades.", "نُظم نقل التلاميذ."],
    "Lexin024472": ["Skolsköterska hjälpte.", "ساعدت ممرضة المدرسة."],
    "Lexin024474": ["Skolstyrelse beslutade.", "قرر مجلس التربية والتعليم."],
    "Lexin024475": ["Skoltandvård gavs.", "أُعطيت رعاية الأسنان المدرسية."],
    "Lexin024476": ["Skoltermin startade.", "بدأ الفصل الدراسي."],
    "Lexin024478": ["Skolunderbyggnad krävdes.", "احتُيج إلى أساس تعليمي."],
    "Lexin024479": ["Skolungdom studerade.", "درس أطفال المدارس."],
    "Lexin024483": ["Skolår avslutades.", "انتهت السنة الدراسية."],
    "Lexin024484": ["Skomakare lagade.", "أصلح مصلح الأحذية."],
    "Lexin024485": ["Skomakeri besöktes.", "زُير محل تصليح الأحذية."],
    "Lexin024489": ["Skopa användes.", "استُخدمت المغرفة."],
    "Lexin024492": ["Skorpa bildades.", "تكونت القشرة."],
    "Lexin024493": ["Skorpa åts.", "أُكل البقسماط."],
    "Lexin024498": ["Skorstensfejare arbetade.", "عمل منظف المداخن."],
    "Lexin024500": ["Skorv syntes.", "ظهرت السفينة العتيقة."],
    "Lexin024501": ["Skorv behandlades.", "عولجت الهبرية."],
    "Lexin024502": ["Skoskav uppstod.", "حدث الكشط من الحذاء."],
    "Lexin024503": ["Skoter kördes.", "قيد السكوتر."],
    "Lexin024506": ["Skott växte.", "نمت النبتة."],
    "Lexin024508": ["Skottdag inföll.", "حل يوم السنة الكبيسة."],
    "Lexin024509": ["Skotte talade.", "تحدث الاسكتلندي."],
    "Lexin024510": ["I skottgluggen.", "عرضة للهجوم."],
    "Lexin024512": ["Skottkärra användes.", "استُخدمت العربة."],
    "Lexin024514": ["Skottlossning hördes.", "سُمع إطلاق النيران."],
    "Lexin024515": ["Skottpengar betalades.", "دُفعت المكافأة النقدية."],
    "Lexin024517": ["Skottår inföll.", "حلت السنة الكبيسة."]
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

const backupPath = DATA_FILE + '.backup_nouns62_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 6200 nouns!`);
