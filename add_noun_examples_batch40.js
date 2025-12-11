/**
 * Add examples to nouns - Batch 40 (100 nouns: Lik to Luftmadrass) - 4000 MILESTONE! 🎉🎉🎉
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin016227": ["Liket hittades.", "وُجدت الجثة."],
    "Lexin016232": ["Likaberättigande krävdes.", "طُلبت المساواة."],
    "Lexin016246": ["Likheten var stor.", "كان الشبه كبيراً."],
    "Lexin016247": ["Likhetstecknet skrevs.", "كُتبت علامة المساواة."],
    "Lexin016250": ["Liknelsen förklarade.", "فسّرت المقارنة."],
    "Lexin016254": ["Liktorn smärtade.", "آلم مسمار القدم."],
    "Lexin016257": ["Likeven betalades.", "دُفع الدفع."],
    "Lexin016264": ["Likviditeten var hög.", "كانت السيولة عالية."],
    "Lexin016268": ["Likören serverades.", "قُدم شراب الكحول المعطر."],
    "Lexin016270": ["Liljan blommade.", "أزهر الزنبق."],
    "Lexin016273": ["Lillfingret skadades.", "أُصيب الإصبع الصغير."],
    "Lexin016278": ["Det är ren limning!", "هذا مجرد جنون!"],
    "Lexin016281": ["Lin odlades.", "زُرع الكتان."],
    "Lexin016282": ["Linan drogs.", "سُحب الحبل."],
    "Lexin016283": ["Linden växte.", "نما الزيزفون."],
    "Lexin016284": ["Lindan bands.", "لُف القماط."],
    "Lexin016293": ["Lingvisten forskade.", "بحث اللغوي."],
    "Lexin016298": ["Linjen trafikerades.", "سار الخط."],
    "Lexin016300": ["Linjen bildades.", "تشكل الخط."],
    "Lexin016301": ["Linjedomaren bedömde.", "حكم حكم الخطوط."],
    "Lexin016303": ["Linnet var mjukt.", "كان الكتان ناعماً."],
    "Lexin016304": ["Linnet bars.", "ارتُدي القميص النسائي الداخلي."],
    "Lexin016307": ["Lins åts.", "أُكل العدس."],
    "Lexin016308": ["Linsen fokuserade.", "ركزت العدسة."],
    "Lexin016310": ["Lipsillen grät.", "بكى الشخص البكاء."],
    "Lexin016315": ["Listen fungerade.", "نجح المكر."],
    "Lexin016316": ["Listen sattes.", "وُضعت الحافة."],
    "Lexin016317": ["Listan skrevs.", "كُتبت اللائحة."],
    "Lexin016328": ["Litteraturen lästes.", "قُرئ الأدب."],
    "Lexin016329": ["Litteraturen studerades.", "دُرست المؤلفات الأدبية."],
    "Lexin016336": ["Livet syddes.", "خُيط الصدار."],
    "Lexin016340": ["Livförsäkringen tecknades.", "وُقع تأمين الحياة."],
    "Lexin016343": ["Livmodern undersöktes.", "فُحص الرحم."],
    "Lexin016350": ["Livremmen spändes.", "شُد الحزام."],
    "Lexin016351": ["Livräntan betalades.", "دُفعت فائدة مدى الحياة."],
    "Lexin016354": ["Köp livs!", "اشترِ طعاماً!"],
    "Lexin016355": ["Livs besöktes.", "زُير محل المواد الغذائية."],
    "Lexin016356": ["Livsfara rådde.", "ساد خطر على الحياة."],
    "Lexin016358": ["Livsföringen ändrades.", "تغير أسلوب الحياة."],
    "Lexin016361": ["Livskvaliteten förbättrades.", "تحسنت نوعية الحياة."],
    "Lexin016364": ["Livsmedel köptes.", "اشتُريت المواد الغذائية."],
    "Lexin016367": ["Livstiden var lång.", "كان مدى الحياة طويلاً."],
    "Lexin016369": ["Livsverket slutfördes.", "اكتمل الإنجاز المهم."],
    "Lexin016373": ["Livsåskådningen diskuterades.", "نوقش مفهوم الحياة."],
    "Lexin016374": ["Livvakten skyddade.", "حمى الحارس الشخصي."],
    "Lexin016379": ["Ljudbandet spelades.", "شُغل الشريط الصوتي."],
    "Lexin016380": ["Ljuddämparen monterades.", "رُكب كاتم الصوت."],
    "Lexin016384": ["Ljudradion lyssnades.", "سُمع الراديو."],
    "Lexin016391": ["Ljumsken smärtade.", "آلمت الأربية."],
    "Lexin016393": ["Ljungen växte.", "نما الخلنج."],
    "Lexin016405": ["Ljusår mäter avstånd.", "تقيس السنة الضوئية المسافة."],
    "Lexin016414": ["Lobbyn var stor.", "كانت القاعة كبيرة."],
    "Lexin016415": ["Lobbyn påverkade.", "أثرت المجموعة المؤثرة."],
    "Lexin016418": ["Locken var vacker.", "كانت الخصلة جميلة."],
    "Lexin016419": ["Locket lyftes.", "رُفع الغطاء."],
    "Lexin016423": ["Lockbetet fungerade.", "نجح الطعم."],
    "Lexin016425": ["Lockouten pågick.", "استمر الإغلاق التعجيزي."],
    "Lexin016428": ["Lodjuret jagade.", "طارد الوشق."],
    "Lexin016430": ["Lodstrecket användes.", "استُخدمت العلامة الشاقولية."],
    "Lexin016431": ["Loftet var kallt.", "كانت الريح باردة."],
    "Lexin016432": ["Loftgången ledde in.", "قاد المسار الخارجي للداخل."],
    "Lexin016435": ["Logen var bekväm.", "كانت المقصورة مريحة."],
    "Lexin016436": ["Logen fylldes.", "امتلأت الشونة."],
    "Lexin016437": ["Loggboken skrevs.", "كُتب سجل السفينة."],
    "Lexin016443": ["Logon designades.", "صُمم الشعار."],
    "Lexin016444": ["Logopeden behandlade.", "عالج أخصائي تقويم النطق."],
    "Lexin016447": ["Logotypen skapades.", "أُنشئ الشعار."],
    "Lexin016450": ["Lojaliteten visades.", "أُظهر الوفاء."],
    "Lexin016452": ["Loket drog tåget.", "سحبت القاطرة القطار."],
    "Lexin016456": ["Lokal skattemyndighet hjälpte.", "ساعدت سلطة الضريبة المحلية."],
    "Lexin016460": ["Lokalbedövningen gavs.", "أُعطي التخدير الموضعي."],
    "Lexin016464": ["Lokalradion sände.", "بثت الإذاعة المحلية."],
    "Lexin016465": ["Lokalsamtalet kostade lite.", "كلفت المكالمة المحلية قليلاً."],
    "Lexin016466": ["Lokalvårdaren städade.", "نظف المنظف."],
    "Lexin016468": ["Looken var modern.", "كانت الوسامة حديثة."],
    "Lexin016469": ["Loppet kördes.", "أُجري العدو."],
    "Lexin016471": ["Loppet var rent.", "كان أنبوب البندقية نظيفاً."],
    "Lexin016473": ["Loppan hoppade.", "قفز البرغوث."],
    "Lexin016474": ["Loppmarknaden besöktes.", "زُير سوق السلع المستعملة."],
    "Lexin016476": ["Lorten tvättades.", "غُسلت القذارة."],
    "Lexin016478": ["Loskan spottas.", "بُصقت البصقة."],
    "Lexin016485": ["Lossningen pågick.", "استمر الانحلال."],
    "Lexin016487": ["Lotsen styrde.", "قاد مرشد السفن."],
    "Lexin016489": ["Lotten rullade.", "تدحرجت اللفة."],
    "Lexin016490": ["Lotten köptes.", "اشتُريت ورقة اليانصيب."],
    "Lexin016491": ["Lotten delades.", "قُسمت الحصة."],
    "Lexin016492": ["Lottan tjänstgjorde.", "خدمت الجندية المتطوعة."],
    "Lexin016495": ["Lotteriet hölls.", "أُقيم اليانصيب."],
    "Lexin016497": ["Lottsedeln vann.", "فازت ورقة اليانصيب."],
    "Lexin016498": ["Lovet började.", "بدأت العطلة."],
    "Lexin016499": ["Lovet gavs.", "أُعطي الإذن."],
    "Lexin016500": ["Lov gavs.", "أُعطي الثناء."],
    "Lexin016515": ["Lucia framträdde.", "ظهرت لوسيا."],
    "Lexin016517": ["Luckan öppnades.", "فُتح الباب الصغير."],
    "Lexin016520": ["Luddet borstades.", "نُظف الزغب."],
    "Lexin016523": ["Ludret föraktades.", "احتُقرت العاهرة."],
    "Lexin016524": ["Luffaren vandrade.", "تسكع المتسكع."],
    "Lexin016529": ["Luftbron upprättades.", "أُقيم الجسر الجوي."],
    "Lexin016534": ["Luftföroreningen ökade.", "زاد تلويث الهواء."],
    "Lexin016538": ["Luftmadrassen blåstes upp.", "نُفخت الفرشة الهوائية."]
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

const backupPath = DATA_FILE + '.backup_nouns40_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`\n🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉`);
console.log(`🎉🎉🎉 4000 NOUNS MILESTONE REACHED! 🎉🎉🎉`);
console.log(`🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉\n`);
