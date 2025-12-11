/**
 * Add examples to nouns - Batch 61 (100 nouns: Sikt to Skamfläck)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin023870": ["Sikten användes.", "استُخدم الغربال."],
    "Lexin023874": ["Siktet justerades.", "عُدل المهداف."],
    "Lexin023876": ["Silen användes.", "استُخدمت المصفاة."],
    "Lexin023882": ["Silikon användes.", "استُخدم السيليكون."],
    "Lexin023883": ["Silke bars.", "ارتُدي الحرير."],
    "Lexin023885": ["Silon fylldes.", "مُلئت الصومعة."],
    "Lexin023886": ["Siluett syntes.", "ظهرت الصورة المظللة."],
    "Lexin023889": ["Sim gjordes.", "أُجريت السباحة."],
    "Lexin023891": ["Simmare tävlade.", "تنافس السباح."],
    "Lexin023896": ["Simskola gicks.", "التُحق بمدرسة تعليم السباحة."],
    "Lexin023897": ["Simulator användes.", "استُخدم جهاز المحاكاة."],
    "Lexin023904": ["Singel spelades.", "لُعبت المباراة الفردية."],
    "Lexin023905": ["Singel köptes.", "اشتُريت الاسطوانة الفردية."],
    "Lexin023906": ["Singel lades.", "وُضعت الحصباء."],
    "Lexin023908": ["Singelolycka skedde.", "حدث الحادث الفردي."],
    "Lexin023910": ["Singular användes.", "استُخدم المفرد."],
    "Lexin023912": ["Sinne behövdes.", "احتُيج إلى الحاسة."],
    "Lexin023913": ["Sinne förlorades.", "فُقدت النفس."],
    "Lexin023915": ["Sinnelag visades.", "أُظهر المزاج."],
    "Lexin023918": ["Sinnesfrånvaro förekom.", "حدث تشتت الذهن."],
    "Lexin023924": ["Sinnevärlden upplevdes.", "جُرب عالم الواقع."],
    "Lexin023930": ["Sionism diskuterades.", "نوقشت الصهيونية."],
    "Lexin023932": ["Sippa blommade.", "أزهرت شقائق النعمان."],
    "Lexin023934": ["Sirap användes.", "استُخدم الشراب المركز."],
    "Lexin023935": ["Siren ljöd.", "دوى النفير."],
    "Lexin023946": ["På sistone hände det.", "حدث مؤخراً."],
    "Lexin023947": ["Sisu visades.", "أُظهر السيسو."],
    "Lexin023949": ["Sits användes.", "استُخدم المقعد."],
    "Lexin023964": ["Sittning hölls.", "عُقد الاجتماع."],
    "Lexin023965": ["Sittstrejk förekom.", "حدث الإضراب الملازم."],
    "Lexin023971": ["Sjabbel förekom.", "حدث الإهمال."],
    "Lexin023974": ["Sjal bars.", "ارتُدي الشال."],
    "Lexin023975": ["Sjalett bars.", "ارتُديت الشالة."],
    "Lexin023978": ["Sjok skars.", "قُطعت الكتلة."],
    "Lexin023980": ["Sjua spelades.", "لُعب السابع."],
    "Lexin023984": ["Sjuka drabbade.", "أصاب المرض."],
    "Lexin023987": ["Sjukanmälan gjordes.", "أُجري إشعار المرض."],
    "Lexin024000": ["Sjukersättning betalades.", "دُفع التعويض المرضي."],
    "Lexin024001": ["Sjukfrånvaro registrerades.", "سُجل الغياب المرضي."],
    "Lexin024002": ["Sjukförsäkring gällde.", "سرى التأمين الصحي."],
    "Lexin024004": ["Sjukgymnast hjälpte.", "ساعد خبير العلاج الطبيعي."],
    "Lexin024005": ["Sjukgymnastik gavs.", "أُعطي العلاج الطبيعي."],
    "Lexin024007": ["Sjukhem besöktes.", "زُيرت دار الرعاية طويلة الأمد."],
    "Lexin024010": ["Sjukhussjuka spreds.", "انتشرت عدوى المستشفيات."],
    "Lexin024016": ["Sjukjournal fördes.", "أُمسك سجل المرض."],
    "Lexin024023": ["Sjukling vårdades.", "رُعي المريض."],
    "Lexin024027": ["Sjukpenningförsäkring gällde.", "سرى تأمين النقدية المرضية."],
    "Lexin024028": ["Sjukpenninggrundande inkomst beräknades.", "حُسب الدخل تُحسب عليه النقدية المرضية."],
    "Lexin024031": ["Sjukpensionär fick stöd.", "حصل المتقاعد مرضياً على دعم."],
    "Lexin024034": ["Sjukskrivning gjordes.", "أُجري التسجيل المرضي."],
    "Lexin024036": ["Sjukstuga besöktes.", "زُير المستشفى الريفي."],
    "Lexin024037": ["Sjuksyster hjälpte.", "ساعدت الممرضة."],
    "Lexin024039": ["Sjukvårdare arbetade.", "عمل التمرجي."],
    "Lexin024040": ["Sjukvårdsbiträde hjälpte.", "ساعد مساعد الممرض."],
    "Lexin024041": ["Sjukvårdsersättning betalades.", "دُفع تعويض العناية الطبية."],
    "Lexin024043": ["Sjukvårdshuvudman beslutade.", "قررت اللجنة السياسية للرعاية الطبية."],
    "Lexin024046": ["Sjukvårdstolk anlitades.", "استُعين بمترجم شفهي طبي."],
    "Lexin024053": ["Sjutillhållarlås installerades.", "رُكب القفل السباعي."],
    "Lexin024062": ["Själamässa hölls.", "أُقيم القداس الروحي."],
    "Lexin024066": ["Själsstyrka visades.", "أُظهرت العزيمة."],
    "Lexin024069": ["Självaktning behölls.", "حُفظ احترام الذات."],
    "Lexin024070": ["Självbestämmande gavs.", "أُعطي تقرير المصير."],
    "Lexin024071": ["Självbevarelsedrift aktiverades.", "نُشطت غريزة البقاء."],
    "Lexin024072": ["Självbiografi skrevs.", "كُتبت سيرة الذات."],
    "Lexin024080": ["Självförverkligande uppnåddes.", "بُلغت تلبية الرغبة الذاتية."],
    "Lexin024085": ["Självhävdelse visades.", "أُظهر إظهار النفس."],
    "Lexin024088": ["Självkostnadspris gällde.", "سرى سعر التكلفة الشخصية."],
    "Lexin024094": ["Självrisk betalades.", "دُفعت التكلفة الذاتية."],
    "Lexin024095": ["Självservering besöktes.", "زُير مطعم الخدمة الذاتية."],
    "Lexin024098": ["Självstyre gavs.", "أُعطي الحكم الذاتي."],
    "Lexin024101": ["Självsvåld förekom.", "حدث العناد."],
    "Lexin024115": ["Sjögräs växte.", "نما العشب البحري."],
    "Lexin024117": ["Sjöman arbetade.", "عمل البحار."],
    "Lexin024118": ["Sjömil mättes.", "قيس الميل البحري."],
    "Lexin024123": ["Sjörövare angrep.", "هاجم القرصان."],
    "Lexin024125": ["Sjösjuka drabbade.", "أصاب دوار البحر."],
    "Lexin024127": ["Sjöslag utkämpades.", "خيضت الموقعة البحرية."],
    "Lexin024128": ["Till sjöss.", "في عرض البحر."],
    "Lexin024129": ["Sjöstjärna syntes.", "ظهر نجم البحر."],
    "Lexin024131": ["Sjötunga fångades.", "صيد سمك موسى."],
    "Lexin024134": ["Skabb behandlades.", "عولج الجرب."],
    "Lexin024147": ["Skadeglädje visades.", "أُظهر الفرح بالأذى."],
    "Lexin024159": ["Skadeverkning märktes.", "لوحظ أثر الضرر."],
    "Lexin024167": ["Skafferi användes.", "استُخدمت خزانة الطعام."],
    "Lexin024168": ["Skaffning ordnades.", "رُتبت المؤونة."],
    "Lexin024170": ["Skaft hölls.", "مُسكت القصبة."],
    "Lexin024171": ["Skaft syntes.", "ظهر العنق."],
    "Lexin024172": ["Ur skaft.", "خارج الوعي."],
    "Lexin024183": ["Skal skalades.", "قُشرت القشرة."],
    "Lexin024188": ["Skalbagge kröp.", "زحفت الخنفساء."],
    "Lexin024189": ["Skald diktade.", "نظم الشاعر."],
    "Lexin024190": ["Skaldjur åts.", "أُكل الحيوان الصدفي."],
    "Lexin024191": ["Skalk skars.", "قُطع الطرف القاسي."],
    "Lexin024193": ["Skall hördes.", "سُمع النباح."],
    "Lexin024196": ["Skalle undersöktes.", "فُحصت الجمجمة."],
    "Lexin024198": ["Skallgång ordnades.", "نُظم البحث الجماعي عن مفقود."],
    "Lexin024200": ["Skallra rasslades.", "حُركت الخشخيشة."],
    "Lexin024203": ["Skalp togs.", "أُخذت فروة الرأس."],
    "Lexin024204": ["Skalpell användes.", "استُخدمت سكين الجراح."],
    "Lexin024210": ["Skamfläck syntes.", "ظهر الشيء المشين."]
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

const backupPath = DATA_FILE + '.backup_nouns61_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 6100 nouns!`);
