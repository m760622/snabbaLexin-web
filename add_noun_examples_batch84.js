/**
 * Add examples to nouns - Batch 84 (100 nouns: Zoologi to Ätt)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin031877": ["Studera zoologi.", "يدرس علم الحيوان."],
    "Lexin031879": ["Kameran har zoom.", "الكاميرا فيها زووم."],
    "Lexin031880": ["Dyrt zoomobjektiv.", "عدسة تزويم غالية."],
    "Lexin031881": ["Odla zucchini.", "يزرع الكوسا."],
    "Lexin031885": ["Fiska i ån.", "يصطاد في الجدول."],
    "Lexin031889": ["Flytta på åbäket.", "ينقل الشيء الضخم."],
    "Lexin031890": ["Skära av en åder.", "يقطع شرياناً."],
    "Lexin031891": ["Guldgula ådror.", "خيوط ذهبية صفراء (عروق)."],
    "Lexin031900": ["Gå på åhörardag.", "يحضر يوم المستمعين."],
    "Lexin031901": ["Många åhörare.", "مستمعون كثر."],
    "Lexin031904": ["Ett gammalt åk.", "عربة قديمة (سيارة متهالكة)."],
    "Lexin031905": ["Andra åket.", "الشوط الثاني."],
    "Lexin031907": ["Ploja åkern.", "يحرث الحقل."],
    "Lexin031913": ["Driva ett åkeri.", "يدير شركة نقليات."],
    "Lexin031916": ["Åklagaren yrkade på fängelse.", "طلب المدعي العام السجن."],
    "Lexin031920": ["Lindrig åkomma.", "وعكة خفيفة."],
    "Lexin031925": ["Hal som en ål.", "زلق كالأنقليس."],
    "Lexin031928": ["För länge sedan i en annan ålder.", "منذ زمن بعيد في عصر آخر."],
    "Lexin031929": ["Tryggad ålderdom.", "شيخوخة آمنة."],
    "Lexin031931": ["Bo på ålderdomshem.", "يعيش في دار مسنين."],
    "Lexin031936": ["Ta ut ålderspension.", "يصرف تقاعد الشيخوخة."],
    "Lexin031943": ["Hjälpa en åldring.", "يساعد عجوزاً."],
    "Lexin031944": ["Jobba inom åldringsvården.", "يعمل في رعاية المسنين."],
    "Lexin031950": ["Koka i ånga.", "يطهو بالبخار."],
    "Lexin031953": ["Känna ånger.", "يشعر بالندم."],
    "Lexin031957": ["Utnyttja ångerveckan.", "يستفيد من أسبوع الندم (حق الإرجاع)."],
    "Lexin031968": ["Tappa årorna.", "يفقد المجاديف."],
    "Lexin031969": ["Vänta i åratal.", "ينتظر لسنوات."],
    "Lexin031971": ["En fin årgång.", "سنة إنتاج جيدة (نبيذ)."],
    "Lexin031972": ["Förra århundradet.", "القرن الماضي."],
    "Lexin031979": ["Läs i årsboken.", "اقرأ في الكتاب السنوي."],
    "Lexin031980": ["Fira årsdag.", "يحتفل بذكرى سنوية."],
    "Lexin031981": ["En stor årskull.", "دفعة مواليد كبيرة."],
    "Lexin031982": ["Gå i årskurs 9.", "يدرس في الصف التاسع."],
    "Lexin031983": ["Kallelse till årsmöte.", "دعوة للاجتماع السنوي."],
    "Lexin031985": ["Vid årsskiftet.", "عند رأس السنة."],
    "Lexin031986": ["Min favoritårstid.", "فصلي المفضل."],
    "Lexin031988": ["Senaste årtiondet.", "العقد الأخير."],
    "Lexin031989": ["Nytt årtusende.", "ألفية جديدة."],
    "Lexin031990": ["Följa åsen.", "يتبع حافة الجبل."],
    "Lexin031997": ["Mycket folk på åskådarplats.", "ناس كثر في مقاعد المتفرجين."],
    "Lexin032000": ["Politisk åskådning.", "رؤية سياسية."],
    "Lexin032001": ["Envis som en åsna.", "عنيد كحمار."],
    "Lexin032036": ["Göra ett återbesök.", "يقوم بزيارة مراجعة."],
    "Lexin032042": ["Inlämning till återbruk.", "تسليم لإعادة الاستخدام."],
    "Lexin032044": ["Få återbäring på skatten.", "يحصل على استرداد ضريبي."],
    "Lexin032045": ["Få ett återfall.", "ينتكس (يعود للمرض/الإدمان)."],
    "Lexin032061": ["Återgång till arbetet.", "العودة للعمل."],
    "Lexin032067": ["På återhörande!", "إلى اللقاء (على الهاتف)!"],
    "Lexin032074": ["Vid min återkomst.", "عند عودتي."],
    "Lexin032075": ["Få återkoppling.", "يحصل على تغذية راجعة (ملاحظات)."],
    "Lexin032076": ["Påbörja återresan.", "يبدأ رحلة العودة."],
    "Lexin032078": ["Ett kärt återseende.", "لقاء متجدد سعيد."],
    "Lexin032086": ["Ta en återställare.", "يشرب كأساً لعلاج الدوار."],
    "Lexin032091": ["Blåsa till återtåg.", "يعلن التراجع."],
    "Lexin032093": ["Det får återverkningar.", "سيكون له تداعيات."],
    "Lexin032094": ["Inga negativa återverkningar.", "بلا ارتدادات سلبية."],
    "Lexin032101": ["Utan återvändo.", "بلا رجعة."],
    "Lexin032102": ["Köra in i en återvändsgata.", "يدخل في شارع مسدود."],
    "Lexin032117": ["Känna åtrå.", "يشعر برغبة جامحة."],
    "Lexin032125": ["Ekonomisk åtstramning.", "تقشف اقتصادي."],
    "Lexin032127": ["Klockan åtta.", "الساعة الثامنة."],
    "Lexin032131": ["En åttondel av kakan.", "ثمن الكعكة."],
    "Lexin032133": ["Känna äckel.", "يشعر بالاشمئزاز."],
    "Lexin032138": ["Investera i ädelmetall.", "يستثمر في المعادن الثمينة."],
    "Lexin032139": ["Visa ädelmod.", "يظهر نبل الأخلاق."],
    "Lexin032140": ["Ring med ädelsten.", "خاتم بحجر كريم."],
    "Lexin032155": ["Kokt ägg.", "بيضة مسلوقة."],
    "Lexin032164": ["Lös äggula.", "صفار بيض رخو."],
    "Lexin032166": ["Protein och äggvita.", "بروتين وزلال."],
    "Lexin032167": ["Vispa äggvitan.", "يخفق بياض البيض."],
    "Lexin032173": ["Ha i sin ägo.", "يملك في حوزته."],
    "Lexin032174": ["Hennes käraste ägodel.", "أثمن ممتلكاتها."],
    "Lexin032188": ["Visa äktenskapscertifikat.", "يبرز شهادة الزواج."],
    "Lexin032190": ["Skriva äktenskapsförord.", "يكتب عقد (ممتلكات) زواج."],
    "Lexin032195": ["Ta ut äktenskapsskillnad.", "يطلب الطلاق."],
    "Lexin032201": ["Satsa på äldreomsorg.", "يستثمر في رعاية المسنين."],
    "Lexin032206": ["Han har en älskarinna.", "لديه عشيقة."],
    "Lexin032209": ["Ung och het älskog.", "حب شبابي ملتهب."],
    "Lexin032213": ["Dansa som en älva.", "ترقص كحورية."],
    "Lexin032214": ["Inneha ett ämbete.", "يشغل منصباً رسمياً."],
    "Lexin032215": ["Statligt ämbete.", "إدارة حكومية."],
    "Lexin032227": ["Jobba som ämneslärare.", "يعمل كمدرس مادة."],
    "Lexin032229": ["Exempel på ämnesnamn.", "مثال على اسم المادة."],
    "Lexin032230": ["Snabb ämnesomsättning.", "استقلاب (أيض) سريع."],
    "Lexin032238": ["Ramla på ändan.", "يسقط على مؤخرته."],
    "Lexin032243": ["Bestämd ändelse.", "لاحقة التعريف."],
    "Lexin032249": ["Göra en ändring.", "يجري تعديلاً."],
    "Lexin032251": ["Bussens ändstation.", "محطة الباص الأخيرة."],
    "Lexin032252": ["Undersöka ändtarmen.", "يفحص المستقيم."],
    "Lexin032259": ["Känna ängslan.", "يشعر بالقلق (الهلع)."],
    "Lexin032261": ["Bli änka.", "تصبح أرملة."],
    "Lexin032263": ["Få en änkestöt.", "يضرب كوعه (ضربة الكهرباء)."],
    "Lexin032265": ["Leva som änkling.", "يعيش كأرمل."],
    "Lexin032281": ["Stämma för ärekränkning.", "يرفع قضية قذف/تشهير."],
    "Lexin032295": ["Täckt av ärg.", "مغطى بالصدأ الأخضر (الزنجار)."],
    "Lexin032301": ["Ha ett ärr.", "لديه ندبة."],
    "Lexin032306": ["Äta ärtsoppa.", "يأكل شوربة بازلاء."],
    "Lexin032314": ["Göra ett äskande.", "يقدم طلباً (مالياً) رسمياً."],
    "Lexin032320": ["Sista i sin ätt.", "آخر سلالته."]
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

const backupPath = DATA_FILE + '.backup_nouns84_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 84 completed!`);
