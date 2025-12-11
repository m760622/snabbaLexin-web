/**
 * Add examples to nouns - Batch 49 (100 nouns: Ondo to Pannbiff)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin019697": ["Ondo fanns.", "وُجد الشر."],
    "Lexin019699": ["Ondskan visades.", "أُظهر اللؤم."],
    "Lexin019713": ["Han föll i onåd.", "سقط في الازدراء."],
    "Lexin019714": ["I onödan gjordes det.", "فُعل دون ضرورة."],
    "Lexin019726": ["Operationen gjordes.", "أُجريت العملية الجراحية."],
    "Lexin019731": ["Operatören övervakade.", "راقب المشغل."],
    "Lexin019735": ["Operetten framfördes.", "قُدم الأوبريت."],
    "Lexin019739": ["Opium är farligt.", "الأفيون خطير."],
    "Lexin019742": ["Opponenten kritiserade.", "انتقد الغريم."],
    "Lexin019743": ["Opponenten ifrågasatte.", "تساءل المناوئ."],
    "Lexin019746": ["Opportunisten anpassade sig.", "تكيف الانتهازي."],
    "Lexin019752": ["Optik studerades.", "دُرست البصريات."],
    "Lexin019753": ["Optikern hjälpte.", "ساعد النظاراتي."],
    "Lexin019755": ["Optimism rådde.", "ساد التفاؤل."],
    "Lexin019756": ["Optimisten log.", "ابتسم المتفائل."],
    "Lexin019758": ["Option gavs.", "أُعطي حق الاختيار."],
    "Lexin019759": ["Optionen köptes.", "اشتُري سند تأمين حق الاختيار."],
    "Lexin019762": ["Oraklet talade.", "تحدث الحكيم."],
    "Lexin019771": ["Ordbehandlaren användes.", "استُخدم معالج النصوص."],
    "Lexin019772": ["Ordbehandling lärdes.", "تُعلمت معالجة النصوص."],
    "Lexin019776": ["Orden samlades.", "تجمع المحفل السري."],
    "Lexin019777": ["Orden gavs.", "أُعطي الوسام."],
    "Lexin019781": ["Ordern lades.", "وُضع الطلب."],
    "Lexin019782": ["Ordföljden ändrades.", "تغير ترتيب الكلمات."],
    "Lexin019785": ["Ordförrådet utökades.", "توسعت المعجمية."],
    "Lexin019790": ["Ordinationen följdes.", "اتُبعت الوصفة."],
    "Lexin019797": ["Ordklassen identifierades.", "حُدد قسم الكلام."],
    "Lexin019799": ["Ordleken skrattade åt.", "ضُحك على التلاعب بالكلمات."],
    "Lexin019809": ["Ordningsvakten ingrep.", "تدخل حارس النظام."],
    "Lexin019813": ["Ordspråket citerades.", "استُشهد بالمثل."],
    "Lexin019814": ["Ordstävet sades.", "قيل المثل السائر."],
    "Lexin019815": ["Ordvalet var bra.", "كانت طريقة التعبير جيدة."],
    "Lexin019838": ["Organisatören planerade.", "خطط المنظم."],
    "Lexin019845": ["Organismen studerades.", "دُرس الكائن الحي."],
    "Lexin019846": ["Organisten spelade.", "عزف عازف الأرغن."],
    "Lexin019847": ["Orgasm är naturligt.", "هزة الجماع طبيعية."],
    "Lexin019849": ["Orgeln spelades.", "عُزف الأرغن."],
    "Lexin019856": ["Orienteringen pågick.", "استمرت رياضة تحديد الاتجاه."],
    "Lexin019857": ["Orienteringsämnet lärdes.", "تُعلمت المادة العامة."],
    "Lexin019859": ["Originalet var roligt.", "كان الأصيل مضحكاً."],
    "Lexin019865": ["Ork behövdes.", "احتُيج إلى القدرة."],
    "Lexin019870": ["Orkestern spelade.", "عزفت الأوركسترا."],
    "Lexin019872": ["Ornamentet sattes.", "وُضعت الزخرفة."],
    "Lexin019881": ["Oroshärden identifierades.", "حُدد مصدر الشغب."],
    "Lexin019882": ["Orosmolnet syntes.", "ظهرت الغيمة المنذرة."],
    "Lexin019883": ["Orren jagades.", "طُورد الطهيوج الأسود."],
    "Lexin019892": ["Ortopeden hjälpte.", "ساعد المجبر."],
    "Lexin019900": ["Han anade oråd.", "خطر له الاشتباه."],
    "Lexin019911": ["Os steg.", "صعد الدخان."],
    "Lexin019928": ["Oskick förekom.", "حدث سوء التصرف."],
    "Lexin019937": ["Oskuld bevarades.", "حُفظت البراءة."],
    "Lexin019950": ["Ost visade.", "أظهر الشرق."],
    "Lexin019969": ["I otid kom han.", "جاء في وقت خاطئ."],
    "Lexin019997": ["Otrohet avslöjades.", "اكتُشفت الخيانة."],
    "Lexin020000": ["I ottan vaknade hon.", "استيقظت في الصباح الباكر."],
    "Lexin020001": ["Otukt är förbjudet.", "الزنا محرم."],
    "Lexin020020": ["Outsidern vann.", "فاز الخارجي."],
    "Lexin020021": ["Outsidern levde ensam.", "عاش الخارج عن المجتمع وحده."],
    "Lexin020032": ["Ovana visades.", "أُظهرت قلة الخبرة."],
    "Lexin020036": ["Ovanligheten noterades.", "لوحظ غير الطبيعي."],
    "Lexin020043": ["Overallen bars.", "ارتُدي الأوفرول."],
    "Lexin020045": ["Overheadprojektorn användes.", "استُخدم جهاز العرض العلوي."],
    "Lexin020055": ["Oväder kom.", "جاءت العاصفة."],
    "Lexin020061": ["Oxen drog.", "جر الثور."],
    "Lexin020063": ["Ozon är farligt.", "الأوزون خطير."],
    "Lexin020077": ["P betyder parkering.", "P تعني الوقوف."],
    "Lexin020079": ["P-piller användes.", "استُخدمت حبوب منع الحمل."],
    "Lexin020080": ["P-platsen användes.", "استُخدم مكان الوقوف."],
    "Lexin020082": ["Pacemakern implanterades.", "زُرع الميقاع."],
    "Lexin020084": ["Pacifism diskuterades.", "نوقشت اللاعنفية."],
    "Lexin020085": ["Pacifisten demonstrerade.", "تظاهر اللاعنفي."],
    "Lexin020086": ["Pack samlades.", "تجمعت الزمرة."],
    "Lexin020088": ["Packet öppnades.", "فُتح المغلف."],
    "Lexin020092": ["Packen lades.", "وُضعت الحزمة."],
    "Lexin020093": ["Packningen gjordes.", "حُزمت الأمتعة."],
    "Lexin020100": ["Paddan hoppade.", "قفز العلجوم."],
    "Lexin020101": ["Paddeln användes.", "استُخدم المجذاف."],
    "Lexin020104": ["Pajen bakades.", "خُبزت الفطيرة."],
    "Lexin020106": ["Pajasen skämtade.", "مزح المهرج."],
    "Lexin020109": ["Pakethållaren användes.", "استُخدم الحامل."],
    "Lexin020110": ["Paketresan bokades.", "حُجزت الرحلة المتكاملة."],
    "Lexin020113": ["Palatset besöktes.", "زُير القصر."],
    "Lexin020114": ["Palavern fortsatte.", "استمر اللغو."],
    "Lexin020115": ["Palestiniern talade.", "تحدث الفلسطيني."],
    "Lexin020116": ["Paletten användes.", "استُخدم الملون."],
    "Lexin020117": ["Palisander är dyrbart.", "الخشب البرازيلي ثمين."],
    "Lexin020119": ["Pallen användes.", "استُخدمت المصطبة."],
    "Lexin020120": ["Han hade pall.", "كان له صمود."],
    "Lexin020126": ["Palmen växte.", "نمت النخلة."],
    "Lexin020127": ["Palmsöndag firades.", "احتُفل بأحد السعف."],
    "Lexin020129": ["Palsternackan kokades.", "طُبخ الجزر الأبيض."],
    "Lexin020130": ["Palten åts.", "أُكلت العجينة بالدم."],
    "Lexin020131": ["Paltbrödet bakades.", "خُبز الخبز بالدم."],
    "Lexin020132": ["Paltorna bars.", "ارتُديت الملابس المهترئة."],
    "Lexin020133": ["Pamfletten skrevs.", "كُتب الطعن."],
    "Lexin020134": ["Pampen beslutade.", "قرر عظيم الشأن."],
    "Lexin020137": ["Panelen sattes.", "وُضع اللوح."],
    "Lexin020138": ["Panelen diskuterade.", "ناقشت جماعة المناقشين."],
    "Lexin020149": ["Pannan användes.", "استُخدمت المقلاة."],
    "Lexin020154": ["Pannbiffen stektes.", "قُلي الهمبرجر."]
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

const backupPath = DATA_FILE + '.backup_nouns49_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 4900 nouns! 🎯`);
