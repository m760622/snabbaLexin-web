/**
 * Add examples to nouns - Batch 56 (100 nouns: Remsa to Riskmoment)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin022165": ["Remsan klipptes.", "قُص الشريط."],
    "Lexin022169": ["Renen betar.", "ترعى الرنة."],
    "Lexin022170": ["Renen syntes.", "ظهرت الحافة."],
    "Lexin022175": ["Rengöringsmedel användes.", "استُخدمت مادة التنظيف."],
    "Lexin022177": ["Renhållningen sköttes.", "أُديرت جمع القمامة."],
    "Lexin022179": ["Rening gjordes.", "أُجري التنظيف."],
    "Lexin022180": ["Reningsverket fungerade.", "عملت منشأة التنقية."],
    "Lexin022181": ["Renlevnadsmannen levde sunt.", "عاش الورع حياة صحية."],
    "Lexin022187": ["Renommé uppnåddes.", "بُلغت السمعة."],
    "Lexin022196": ["Rep hölls.", "أُقيم التمرين."],
    "Lexin022200": ["Reparation gjordes.", "أُجري التصليح."],
    "Lexin022211": ["Repetition pågick.", "استمر التمرين."],
    "Lexin022215": ["Repmånad tjänstgjordes.", "خُدم شهر التمرين للمجندين."],
    "Lexin022222": ["Representation hölls.", "أُقيمت الوليمة."],
    "Lexin022229": ["Repression användes.", "استُخدم القمع."],
    "Lexin022232": ["Repro användes.", "استُخدمت مؤسسة الإنتاج الطباعي."],
    "Lexin022235": ["Reptilen kröp.", "زحف الحيوان من الزواحف."],
    "Lexin022239": ["Repövning gjordes.", "أُجري التمرين التكريري للمجندين."],
    "Lexin022242": ["Resande klev på.", "صعد المسافر."],
    "Lexin022243": ["Resebyrån bokade.", "حجز مكتب السفريات."],
    "Lexin022244": ["Resedokumentet visades.", "أُظهرت وثيقة السفر."],
    "Lexin022251": ["Resekostnadsersättning betalades.", "دُفع تعويض تكاليف السفر."],
    "Lexin022252": ["Reseledaren guidande.", "أرشد الدليل السياحي."],
    "Lexin022253": ["Resenären åkte.", "سافر المسافر."],
    "Lexin022258": ["Reserven spelade.", "لعب البديل الاحتياطي."],
    "Lexin022260": ["Reservatet skyddades.", "حُميت المحمية."],
    "Lexin022269": ["Reservoaren fylldes.", "مُلئ الخزان."],
    "Lexin022271": ["Resfeber kändes.", "شُعر بحمى السفر."],
    "Lexin022272": ["Resgods packades.", "حُزمت أمتعة السفر."],
    "Lexin022273": ["Residenset besöktes.", "زُير المسكن."],
    "Lexin022282": ["Reskontra fördes.", "أُمسك الدفتر الأستاذ."],
    "Lexin022284": ["Resning skedde.", "حدث النصب."],
    "Lexin022285": ["Resning utbröt.", "اندلعت الانتفاضة."],
    "Lexin022294": ["Reson saknades.", "افتُقد عين العقل."],
    "Lexin022296": ["Resonans hördes.", "سُمع إرجاع الصدى."],
    "Lexin022303": ["Respass gavs.", "أُعطي الطرد."],
    "Lexin022318": ["Restaurangvagnen besöktes.", "زُيرت عربة الأكل."],
    "Lexin022326": ["Restskatt betalades.", "دُفعت الضريبة المتبقية."],
    "Lexin022332": ["Resåren användes.", "استُخدم النابض اللولبي."],
    "Lexin022343": ["Retning kändes.", "شُعر بالتهيج."],
    "Lexin022351": ["Retstickan retades.", "ضايق الشخص المضايق."],
    "Lexin022355": ["Reumatikern behandlades.", "عولج الرثوي."],
    "Lexin022357": ["Reumatism behandlades.", "عولجت الرثية."],
    "Lexin022359": ["Revet drogs.", "سُحب خيط السنارة."],
    "Lexin022360": ["Revet syntes.", "ظهر الحيد البحري."],
    "Lexin022361": ["Revan slingrade.", "تسلق المحلاق."],
    "Lexin022367": ["Revbenet bröts.", "كُسر الضلع."],
    "Lexin022370": ["Revbensspjäll serverades.", "قُدم الإرب الضلعي."],
    "Lexin022371": ["Reveljen blåstes.", "نُفخ تبويق الاستيقاظ."],
    "Lexin022372": ["Reversen undertecknades.", "وُقع سند الدين."],
    "Lexin022376": ["Revision gjordes.", "أُجري تدقيق الحسابات."],
    "Lexin022378": ["Revisionism diskuterades.", "نوقش الإصلاحي."],
    "Lexin022379": ["Revisionsberättelsen lästes.", "قُرئ تقرير مدقق الحسابات."],
    "Lexin022382": ["Revisorn granskade.", "دقق مدقق الحسابات."],
    "Lexin022386": ["Revolt utbröt.", "اندلعت الثورة."],
    "Lexin022391": ["Revolutionären kämpade.", "قاتل الثوري."],
    "Lexin022392": ["Revolvern avfyrades.", "أُطلق المسدس."],
    "Lexin022394": ["Revyn framfördes.", "قُدم العرض المسرحي."],
    "Lexin022400": ["Ribbstolen användes.", "استُخدم سلم التمرين."],
    "Lexin022401": ["Riddaren kämpade.", "قاتل الفارس."],
    "Lexin022406": ["Riggen justerades.", "عُدلت الصواري والأشرعة."],
    "Lexin022407": ["Riggen borrade.", "حفرت منصة التنقيب."],
    "Lexin022408": ["Riggen bars.", "ارتُدي الزي."],
    "Lexin022415": ["Rikemannen donerade.", "تبرع الإنسان الغني."],
    "Lexin022423": ["Rikoschetten träffade.", "أصابت النبوة."],
    "Lexin022431": ["Riksdagsmannen röstade.", "صوت عضو البرلمان."],
    "Lexin022433": ["Riksdagspartiet sammanträdde.", "اجتمع الحزب البرلماني."],
    "Lexin022437": ["Riksdagsvalet hölls.", "أُقيمت انتخابات البرلمان."],
    "Lexin022439": ["Riksdalern sparades.", "ادُخر الريكسدالر."],
    "Lexin022446": ["Rikslikaren gällde.", "سرى النمط الوطني."],
    "Lexin022447": ["Riksmarskalken ledde.", "قاد رئيس البلاط الملكي."],
    "Lexin022448": ["Riksmötet öppnades.", "افتُتحت دورة البرلمان."],
    "Lexin022450": ["Riksorganisationen styrde.", "قادت المنظمة الوطنية."],
    "Lexin022455": ["Riksregalier visades.", "عُرضت رموز الوجاهة الملكية."],
    "Lexin022461": ["Riksspråket talades.", "نُطقت اللغة الوطنية."],
    "Lexin022462": ["Riksstämman hölls.", "عُقد اجتماع الوكلاء الوطني."],
    "Lexin022463": ["Rikssvenska talades.", "نُطقت اللغة السويدية الوطنية."],
    "Lexin022466": ["Riksvapnet visades.", "عُرض شعار الدولة."],
    "Lexin022467": ["Riksvägen kördes.", "قيد الطريق الرئيسي."],
    "Lexin022468": ["Riksåklagaren åtalade.", "قاضى مدعي عام الدولة."],
    "Lexin022478": ["Riktmärket sattes.", "وُضعت العلامة الدليلية."],
    "Lexin022481": ["Riktnumret slogs.", "طُلب رقم المنطقة الهاتفي."],
    "Lexin022484": ["Rim skrevs.", "كُتب السجع."],
    "Lexin022485": ["Rimfrost syntes.", "ظهر الندى المتجمد."],
    "Lexin022500": ["Ringblomman blommade.", "أزهر الآذريون."],
    "Lexin022501": ["Ringdans dansades.", "رُقصت الرقصة الحلقية."],
    "Lexin022505": ["Ringfingret höjdes.", "رُفع البنصر."],
    "Lexin022506": ["Ringklockan ringde.", "رن جرس الباب."],
    "Lexin022509": ["Ringleden kördes.", "قيد الطريق الدائري."],
    "Lexin022513": ["Ringning hördes.", "سُمع الرنين."],
    "Lexin022516": ["Ringräven visste.", "عرف الخبير."],
    "Lexin022517": ["Ringtrycket checkades.", "فُحص ضغط الإطار."],
    "Lexin022518": ["Rinken användes.", "استُخدمت حلبة الأيس هوكي."],
    "Lexin022520": ["Ripost gavs.", "أُعطي الجواب العاجل."],
    "Lexin022522": ["Ris samlades.", "جُمعت الأغصان."],
    "Lexin022523": ["Risgryn kokades.", "طُبخ الأرز المصقول."],
    "Lexin022524": ["Rishögen brändes.", "أُحرق كوم الحطب."],
    "Lexin022525": ["Rishögen kördes.", "قيدت العربة التالفة."],
    "Lexin022536": ["Riskgruppen identifierades.", "حُددت المجموعة المتعرضة لخطر الإصابة."],
    "Lexin022541": ["Riskmoment undveks.", "تُجنب الوضع الخطر."]
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

const backupPath = DATA_FILE + '.backup_nouns56_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 5600 nouns!`);
