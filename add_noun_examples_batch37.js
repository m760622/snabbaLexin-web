/**
 * Add examples to nouns - Batch 37 (100 nouns: Krön to Kål)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin015321": ["Krönet nåddes.", "بُلغت القمة."],
    "Lexin015323": ["Krönikan skrevs.", "كُتب العرض التاريخي."],
    "Lexin015325": ["Kuben byggdes.", "بُني المكعب."],
    "Lexin015326": ["Kubanen reste hem.", "عاد الكوبي للوطن."],
    "Lexin015328": ["Kubben bars.", "ارتُديت الطاقية الرجالية."],
    "Lexin015329": ["Kubikmetern mättes.", "قيس المتر المكعب."],
    "Lexin015333": ["Kuggen slogs av.", "كُسر سن العجلة."],
    "Lexin015334": ["Kuggfrågan ställdes.", "طُرح السؤال المحير."],
    "Lexin015335": ["Kugghjulet roterade.", "دارت العجلة المسننة."],
    "Lexin015336": ["Kuken var erigerad.", "كان القضيب منتصباً."],
    "Lexin015341": ["Kulissen flyttades.", "نُقلت كواليس المسرح."],
    "Lexin015342": ["Kullen föddes.", "وُلد بطن من المواليد."],
    "Lexin015343": ["Kullagret byttes.", "بُدل محمل الكريات."],
    "Lexin015347": ["Kullerstenen lades.", "وُضع حجر الشوارع."],
    "Lexin015349": ["Kulmen nåddes.", "بُلغت الذروة."],
    "Lexin015352": ["Kulramen användes.", "استُخدم المعداد."],
    "Lexin015353": ["Kulspetspennan skrevs med.", "كُتب بقلم الحبر الجاف."],
    "Lexin015354": ["Kulsprutan avfyrades.", "أُطلق المدفع الرشاش."],
    "Lexin015355": ["Kulstötning är en gren.", "قذف الكرة المصمتة رياضة."],
    "Lexin015356": ["Kulten kritiserades.", "انتُقد الإعجاب."],
    "Lexin015359": ["Kulturen uppskattades.", "قُدرت الثقافة."],
    "Lexin015360": ["Kulturen växte.", "نمت الزراعة."],
    "Lexin015369": ["Kulturnämnden beslutade.", "قررت لجنة الثقافة."],
    "Lexin015374": ["Kulören valdes.", "اختُير اللون."],
    "Lexin015376": ["Kummin doftar.", "الكمون يفوح."],
    "Lexin015377": ["Kumpanen greps.", "اعتُقل شريك الجريمة."],
    "Lexin015384": ["Kungen spelades.", "لُعب الملك."],
    "Lexin015389": ["Kungörelsen publicerades.", "نُشر الإعلان الرسمي."],
    "Lexin015392": ["Kunnandet visades.", "أُظهرت المعرفة."],
    "Lexin015398": ["Kupan skyddade.", "حمى القفير."],
    "Lexin015399": ["Kupén var bekväm.", "كانت الكابينة مريحة."],
    "Lexin015400": ["Kupén kördes.", "قيدت الكوبيه."],
    "Lexin015402": ["Kupolen lyste.", "أضاءت القبة."],
    "Lexin015403": ["Kupongen klipptes.", "قُصت القسيمة."],
    "Lexin015404": ["Kuppen misslyckades.", "فشل الانقلاب."],
    "Lexin015405": ["Kuren genomfördes.", "أُجريت المداواة."],
    "Lexin015406": ["Kuraget visades.", "أُظهرت الشجاعة."],
    "Lexin015409": ["Kuratorn rådgav.", "نصح المرشد الاجتماعي."],
    "Lexin015410": ["Kurden reste hem.", "عاد الكردي للوطن."],
    "Lexin015412": ["Kurdiska talas.", "تُتحدث الكردية."],
    "Lexin015413": ["Kurdiskan anlände.", "وصلت الكردية."],
    "Lexin015415": ["Kuriositeten visades.", "عُرضت التحفة."],
    "Lexin015416": ["Kuriren skickades.", "أُرسل الساعي."],
    "Lexin015419": ["Kurorten besöktes.", "زُير المنتجع."],
    "Lexin015420": ["Kurran var kall.", "كانت الزنزانة باردة."],
    "Lexin015421": ["Kurragömma lektes.", "لُعبت لعبة الغماية."],
    "Lexin015424": ["Kursen steg.", "ارتفعت القيمة."],
    "Lexin015425": ["Kursen slutfördes.", "اكتملت الدورة الدراسية."],
    "Lexin015428": ["Kurvan var skarp.", "كان المنعطف حاداً."],
    "Lexin015431": ["Kusken styrde.", "قاد الحوذي."],
    "Lexin015441": ["Kutymen följdes.", "اتُبع التقليد."],
    "Lexin015444": ["Kuvertet dukades.", "رُتبت لوازم المائدة."],
    "Lexin015445": ["Kuvösen skyddade barnet.", "حمت الحاضنة الطفل."],
    "Lexin015448": ["Kvacksalvaren avvisades.", "رُفض المشعوذ."],
    "Lexin015451": ["Kvadraten ritades.", "رُسم المربع."],
    "Lexin015453": ["Kvalet var svårt.", "كان العذاب صعباً."],
    "Lexin015454": ["Kvalet spelades.", "لُعب التأهيل."],
    "Lexin015461": ["Kvalifikationsåret räknades.", "حُسبت سنة التأهيل."],
    "Lexin015475": ["Kvargen åts.", "أُكلت خثارة اللبن."],
    "Lexin015479": ["Kvarlevorna hittades.", "وُجدت الرفات."],
    "Lexin015481": ["Kvarlåtenskapen delades.", "قُسمت التركة."],
    "Lexin015482": ["Kvarnen malde.", "طحنت الطاحونة."],
    "Lexin015483": ["Kvarskatten betalades.", "دُفعت الضريبة المستحقة."],
    "Lexin015489": ["Kvarten var bra.", "كان النزل جيداً."],
    "Lexin015490": ["Kvartalet slutade.", "انتهى ربع السنة."],
    "Lexin015491": ["Kvarteret var lugnt.", "كان الحي هادئاً."],
    "Lexin015493": ["Kvartetten spelade.", "عزف الموسيقيون الأربعة."],
    "Lexin015497": ["Kvasten sopade.", "كنست المكنسة."],
    "Lexin015500": ["Kverulansen tröttade.", "أتعب التذمر."],
    "Lexin015501": ["Kverulanten klagade.", "اشتكى المتذمر."],
    "Lexin015507": ["Kvicksilver är flytande.", "الزئبق سائل."],
    "Lexin015509": ["Kvigan betade.", "رعت العجلة."],
    "Lexin015516": ["Kvinnokliniken besöktes.", "زُيرت عيادة النساء."],
    "Lexin015517": ["Kvinnosakskvinna kämpade.", "كافحت المرأة المؤمنة بالمساواة."],
    "Lexin015518": ["Kvintetten spelade.", "عزف الموسيقيون الخمسة."],
    "Lexin015519": ["Kvirret fortsatte.", "استمر التذمر."],
    "Lexin015520": ["Kvisten bröts.", "كُسر الغصن الصغير."],
    "Lexin015524": ["Kvittensen gavs.", "أُعطي وصل القبض."],
    "Lexin015532": ["Kvoten beräknades.", "حُسب خارج القسمة."],
    "Lexin015533": ["Kvoten bestämdes.", "حُددت الحصة."],
    "Lexin015542": ["På kvällskvisten kom han.", "جاء مساءً."],
    "Lexin015547": ["Kväve finns i luften.", "النتروجين موجود في الهواء."],
    "Lexin015552": ["Kycklingmamman oroade sig.", "قلقت الأم الخائفة على أطفالها."],
    "Lexin015553": ["Kyffet var fuktigt.", "كان المسكن الحقير رطباً."],
    "Lexin015554": ["Kylen var full.", "كانت الثلاجة ممتلئة."],
    "Lexin015558": ["Kylaren läckte.", "تسرب جهاز التبريد."],
    "Lexin015563": ["Kynnet analyserades.", "حُللت الطبيعة الشخصية."],
    "Lexin015564": ["Kyparen serverade.", "قدم الجرسون."],
    "Lexin015569": ["Kyrkobokföringen uppdaterades.", "حُدث قيد النفوس الكنسي."],
    "Lexin015570": ["Kyrkofullmäktige sammanträdde.", "اجتمع مجلس الكنيسة الأعلى."],
    "Lexin015571": ["Kyrkogården besöktes.", "زُيرت المقبرة."],
    "Lexin015572": ["Kyrkoherden predikade.", "وعظ القسيس."],
    "Lexin015573": ["Kyrkomötet hölls.", "عُقد الاجتماع الكنسي."],
    "Lexin015574": ["Kyrkovalet ägde rum.", "أُجريت الانتخابات الكنسية."],
    "Lexin015576": ["Kyssen gavs.", "أُعطيت القبلة."],
    "Lexin015578": ["Kådan var klibbig.", "كان الراتينج لزجاً."],
    "Lexin015579": ["Kåken var gammal.", "كانت البناية المتداعية قديمة."],
    "Lexin015580": ["Kåken var kall.", "كان السجن بارداً."],
    "Lexin015583": ["Han la kål på honom.", "قتله."],
    "Lexin015584": ["Kålen kokades.", "طُبخ الكرنب."]
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

const backupPath = DATA_FILE + '.backup_nouns37_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 3700 nouns!`);
