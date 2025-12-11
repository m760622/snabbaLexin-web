/**
 * Add examples to nouns - Batch 63 (100 nouns: Skovel to Skäggstubb)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin024519": ["Skovel användes.", "استُخدم الجاروف."],
    "Lexin024528": ["Skrank installerades.", "رُكب الدرابزين."],
    "Lexin024529": ["Skrapa användes.", "استُخدمت الكاشطة."],
    "Lexin024535": ["Skrattgrop syntes.", "ظهرت النونة."],
    "Lexin024537": ["Skred skedde.", "حدث الانهيار."],
    "Lexin024542": ["Skreva syntes.", "ظهر الفلع."],
    "Lexin024546": ["Skribent skrev.", "كتب الكاتب."],
    "Lexin024553": ["Skriftspråk lärdes.", "تُعلمت اللغة المكتوبة."],
    "Lexin024561": ["Skrin öppnades.", "فُتح الصندوق."],
    "Lexin024563": ["Skripta arbetade.", "عملت سكرتيرة الفيلم."],
    "Lexin024564": ["Skritt hördes.", "سُمع الخبب."],
    "Lexin024567": ["Skrivbok användes.", "استُخدمت الكراسة."],
    "Lexin024575": ["Skrivkramp drabbade.", "أصاب تشنج الكتابة."],
    "Lexin024577": ["Skrivmaskin användes.", "استُخدمت الآلة الطابعة."],
    "Lexin024580": ["Skrock förekom.", "حدثت الخرافة."],
    "Lexin024581": ["Skrot samlades.", "جُمع السكراب."],
    "Lexin024585": ["Skrott kastades.", "أُلقي لب الثمرة."],
    "Lexin024586": ["Skrov byggdes.", "بُني الهيكل."],
    "Lexin024588": ["Skrovmål intogs.", "تُناولت الوجبة الضخمة."],
    "Lexin024589": ["Skrubb användes.", "استُخدمت الحجيرة."],
    "Lexin024593": ["Skrud bars.", "ارتُدي الزي الرسمي."],
    "Lexin024602": ["Skruv skruvades.", "شُد البرغي."],
    "Lexin024609": ["Skruvstäd användes.", "استُخدمت القامطة."],
    "Lexin024612": ["Skrymsle hittades.", "وُجد المربض."],
    "Lexin024616": ["Skryt hördes.", "سُمع الفخر بالنفس."],
    "Lexin024619": ["Skrå bildades.", "شُكلت النقابة."],
    "Lexin024620": ["Skrål hördes.", "سُمع الصداح."],
    "Lexin024622": ["Skråma syntes.", "ظهر الخدش."],
    "Lexin024623": ["Skräck kändes.", "شُعر بالخوف."],
    "Lexin024626": ["Skräddare sydde.", "خاط الخياط."],
    "Lexin024634": ["Skrämsel förekom.", "حدث الترويع."],
    "Lexin024635": ["Skrämskott hördes.", "سُمع التهديد الفارغ."],
    "Lexin024636": ["Skrän hördes.", "سُمع العويل."],
    "Lexin024638": ["Skräp kastades.", "أُلقيت القمامة."],
    "Lexin024642": ["Skröna berättades.", "رُويت القصة الكاذبة."],
    "Lexin024650": ["Skuld betalades.", "دُفع الدين."],
    "Lexin024652": ["Skuldebrev undertecknades.", "وُقعت الكمبيالة."],
    "Lexin024654": ["Skulderblad undersöktes.", "فُحص لوح الكتف."],
    "Lexin024659": ["Skuldra användes.", "استُخدم الكتف."],
    "Lexin024662": ["För sin skull.", "من أجله."],
    "Lexin024665": ["Skulptur skapades.", "صُنع التمثال."],
    "Lexin024666": ["Skulptör arbetade.", "عمل النحات."],
    "Lexin024669": ["Skum bildades.", "تكونت الرغوة."],
    "Lexin024670": ["Skumgummi användes.", "استُخدم المطاط الرغوي."],
    "Lexin024673": ["Skummjölk dracks.", "شُرب الحليب المقشد."],
    "Lexin024674": ["Skumpa dracks.", "شُربت الشمبانيا."],
    "Lexin024677": ["Skumraskaffärer avslöjades.", "اكتُشفت الأعمال المريبة."],
    "Lexin024680": ["Skurborste användes.", "استُخدمت المقشة."],
    "Lexin024682": ["Skurk greps.", "اعتُقل الغشاش."],
    "Lexin024683": ["Skurtrasa användes.", "استُخدمت الممسحة."],
    "Lexin024684": ["Skuta seglade.", "أبحرت السفينة الصغيرة."],
    "Lexin024687": ["Skval föll.", "هطل المطر الذي لا ينقطع."],
    "Lexin024689": ["Skvaller spreds.", "انتشرت الإشاعات."],
    "Lexin024690": ["Skvallerbytta skvallrade.", "نمت النميمة."],
    "Lexin024691": ["Skvallerpress lästes.", "قُرئت صحافة الإشاعات."],
    "Lexin024693": ["Skvalp hördes.", "سُمع الرش."],
    "Lexin024696": ["Inte ett skvatt.", "ولا قدر قليل."],
    "Lexin024700": ["Sky syntes.", "ظهرت السماء."],
    "Lexin024701": ["Sky serverades.", "قُدم المرق."],
    "Lexin024707": ["Skyddat arbete gavs.", "أُعطي العمل في ورشة محمية."],
    "Lexin024711": ["Skyddsföreskrift följdes.", "اتُبعت الإرشادات الوقائية."],
    "Lexin024716": ["Skyddshelgon åkallades.", "استُنجد بالقديس الحامي."],
    "Lexin024719": ["Skyddsinstruktör hjälpte.", "ساعد مرشد الوقاية."],
    "Lexin024722": ["Skyddskläder bars.", "ارتُديت ملابس الوقاية."],
    "Lexin024725": ["Skyddslag gällde.", "سرى قانون الوقاية."],
    "Lexin024726": ["Skyddsling hjälptes.", "ساعد المحمي."],
    "Lexin024728": ["Skyddsombud valde.", "اختار مندوب الوقاية."],
    "Lexin024731": ["Skyddsområde bevakades.", "حُرست المنطقة العسكرية المحمية."],
    "Lexin024734": ["Skyddsrum användes.", "استُخدم الملجأ."],
    "Lexin024738": ["Skyddstillsyn gavs.", "أُعطيت الرعاية الوقائية."],
    "Lexin024745": ["Skyddsängel beskyddade.", "حمى الملاك الحارس."],
    "Lexin024746": ["Skyfall föll.", "هطل المطر الهاطل."],
    "Lexin024747": ["Skyffel användes.", "استُخدم الرفش."],
    "Lexin024756": ["Skyldighet uppfylldes.", "أُوفي الالتزام."],
    "Lexin024761": ["Skylt hängdes.", "عُلقت اللوحة."],
    "Lexin024763": ["Skyltdocka stod.", "وقفت دمية العرض."],
    "Lexin024764": ["Skyltfönster dekorerades.", "زُينت نافذة العرض."],
    "Lexin024765": ["Skymf gavs.", "أُعطي التحقير."],
    "Lexin024769": ["Skymning kom.", "جاء الغروب."],
    "Lexin024770": ["Skymt syntes.", "ظهرت اللمحة."],
    "Lexin024772": ["I skymundan stod han.", "وقف في الخلفية."],
    "Lexin024775": ["Skynke lades.", "وُضع الغطاء."],
    "Lexin024777": ["Skyskrapa byggdes.", "بُنيت ناطحة السحاب."],
    "Lexin024778": ["Skytt sköt.", "أطلق الرامي."],
    "Lexin024779": ["Skytte utövades.", "مورست الرماية."],
    "Lexin024780": ["Skyttegrav grävdes.", "حُفر خندق الرماية."],
    "Lexin024781": ["Skyttekung utsågs.", "اختير أفضل هداف."],
    "Lexin024782": ["Skyttel användes.", "استُخدم المكوك."],
    "Lexin024783": ["Skyttel åkte.", "سارت وسيلة النقل المكوكية."],
    "Lexin024784": ["Skytteltrafik pågick.", "استمرت حركة المرور المكوكية."],
    "Lexin024786": ["Skådebröd visades.", "عُرض خبز المنظر."],
    "Lexin024787": ["Skådeplats besöktes.", "زُير مسرح الأحداث."],
    "Lexin024788": ["Skådespel framfördes.", "قُدمت المسرحية."],
    "Lexin024789": ["Skådespelare agerade.", "مثل الممثل."],
    "Lexin024790": ["Skådis spelade.", "مثل الممثل."],
    "Lexin024797": ["Skåning talade.", "تحدث السكوني."],
    "Lexin024800": ["Skåpbil kördes.", "قيدت سيارة الستايشن."],
    "Lexin024801": ["Skåra syntes.", "ظهر الخدش."],
    "Lexin024802": ["Skägg rakades.", "حُلقت اللحية."],
    "Lexin024803": ["Skäggstubb syntes.", "ظهرت اللحية النابتة."]
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

const backupPath = DATA_FILE + '.backup_nouns63_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 6300 nouns!`);
