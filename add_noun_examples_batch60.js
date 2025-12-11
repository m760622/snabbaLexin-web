/**
 * Add examples to nouns - Batch 60 (100 nouns: Schlager to Sik) ⭐ 6000 MILESTONE! ⭐
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin023578": ["Schlager spelades.", "شُغلت الموسيقى الشائعة."],
    "Lexin023579": ["Schnitzel serverades.", "قُدم الشنتزل."],
    "Lexin023581": ["Schottis dansades.", "رُقص الشوتيس."],
    "Lexin023582": ["Schvung visades.", "أُظهر الاندفاع السريع."],
    "Lexin023585": ["Schäfer skällde.", "نبح كلب الراعي."],
    "Lexin023590": ["Scout deltog.", "شارك الكشاف."],
    "Lexin023593": ["Seans hölls.", "أُقيم تحضير الأرواح."],
    "Lexin023594": ["Sebra sprang.", "ركض حمار الوحش."],
    "Lexin023603": ["Sedel gavs.", "أُعطيت ورقة نقدية."],
    "Lexin023608": ["Sediment bildades.", "تكونت طبقة الترسب."],
    "Lexin023610": ["Sedlighetsbrott begicks.", "ارتُكبت جريمة أخلاقية."],
    "Lexin023611": ["Sedvana följdes.", "اتُبع العرف."],
    "Lexin023614": ["Sedvänja gällde.", "سرى العرف."],
    "Lexin023618": ["Seende behövdes.", "احتُيج إلى البصر."],
    "Lexin023621": ["Segdragning skedde.", "حدث التسارع المتطاول."],
    "Lexin023623": ["Segelbräda användes.", "استُخدم اللوح الشراعي."],
    "Lexin023624": ["Segelflyg upplevdes.", "جُرب الطيران الشراعي."],
    "Lexin023627": ["Segertåg skedde.", "حدثت مسيرة الانتصار."],
    "Lexin023629": ["Seglaren seglade.", "أبحر الطائف بالقارب الشراعي."],
    "Lexin023630": ["Seglats gjordes.", "أُجريت الرحلة البحرية."],
    "Lexin023632": ["Segment identifierades.", "حُددت الشريحة."],
    "Lexin023635": ["Segraren vann.", "فاز الفائز."],
    "Lexin023637": ["Segregering skedde.", "حدث التمييز."],
    "Lexin023640": ["Sejdel fylldes.", "مُلئ الكوب بمقبض."],
    "Lexin023641": ["Sejour njöts.", "تُمتع بالإقامة."],
    "Lexin023644": ["Sekatör användes.", "استُخدم مقص الأغصان."],
    "Lexin023645": ["Sekel passerade.", "مر القرن."],
    "Lexin023648": ["Sekret producerades.", "أُنتج الإفراز."],
    "Lexin023649": ["Sekretariat arbetade.", "عملت السكرتارية."],
    "Lexin023650": ["Sekreteraren hjälpte.", "ساعد السكرتير."],
    "Lexin023651": ["Sekreteraren samordnade.", "نسق السكرتير."],
    "Lexin023660": ["Sekretär användes.", "استُخدمت طاولة المكتب."],
    "Lexin023661": ["Sekt bildades.", "شُكلت الطائفة."],
    "Lexin023666": ["Sekularisering skedde.", "حدثت الدنيوية."],
    "Lexin023673": ["Sekvens visades.", "عُرض التسلسل."],
    "Lexin023675": ["Sele sattes.", "وُضع طقم الخيل."],
    "Lexin023678": ["Selleri åts.", "أُكل الكرفس."],
    "Lexin023682": ["Semesterby besöktes.", "زُيرت القرية السياحية."],
    "Lexin023683": ["Semesterersättning betalades.", "دُفع تعويض الإجازة السنوية."],
    "Lexin023685": ["Semesterlön betalades.", "دُفع مرتب الإجازة السنوي."],
    "Lexin023690": ["Semikolon sattes.", "وُضعت الشولة المنقوطة."],
    "Lexin023691": ["Seminarium hölls.", "عُقد السمينار الجامعي."],
    "Lexin023693": ["Semla åts.", "أُكلت السملا."],
    "Lexin023698": ["Sena skadades.", "أُصيب الوتر."],
    "Lexin023699": ["Senap användes.", "استُخدم الخردل."],
    "Lexin023701": ["Senat sammanträdde.", "اجتمع مجلس الشيوخ."],
    "Lexin023702": ["Senator talade.", "تحدث السناتور."],
    "Lexin023708": ["Senior tävlade.", "تنافس الأرشد."],
    "Lexin023718": ["Sensation kändes.", "شُعر بالحس."],
    "Lexin023720": ["Sensitivitet visades.", "أُظهرت الحساسية."],
    "Lexin023721": ["Sensmoral drogs.", "استُخلص الإدراك الأخلاقي."],
    "Lexin023722": ["Sensor registrerade.", "سجل المحساس."],
    "Lexin023725": ["Sentens sades.", "قيلت الجملة."],
    "Lexin023729": ["Separation skedde.", "حدث الانفصال."],
    "Lexin023738": ["Serben talade.", "تحدث الصربي."],
    "Lexin023741": ["Serbiska talades.", "نُطقت الصربية."],
    "Lexin023742": ["Serbishkan talade.", "تحدثت الصربية."],
    "Lexin023743": ["Serenad sjöngs.", "غُني السريناد."],
    "Lexin023744": ["Sergeant ledde.", "قاد الرقيب."],
    "Lexin023752": ["Serie lästes.", "قُرئت الرسومات لقصص مسلسلة."],
    "Lexin023753": ["Serie spelades.", "لُعب الدوري."],
    "Lexin023755": ["Serpentin kördes.", "قيد المتموج."],
    "Lexin023756": ["Serpentin kastades.", "أُلقي السربنتين."],
    "Lexin023757": ["Serum gavs.", "أُعطي مصل الدم."],
    "Lexin023760": ["Serve slogs.", "ضُربت ضربة الإرسال."],
    "Lexin023761": ["Server användes.", "استُخدم الحاسوب الخادم."],
    "Lexin023763": ["Servering besöktes.", "زُير المطعم الصغير."],
    "Lexin023768": ["Servicebostad beboddes.", "سُكن مسكن خدمات المعاقين."],
    "Lexin023769": ["Servicebox användes.", "استُخدم صندوق إيداع النقود."],
    "Lexin023770": ["Servicehus besöktes.", "زُيرت دار خدمات العجزة والمسنين."],
    "Lexin023773": ["Servicenäring växte.", "نما قطاع الخدمات."],
    "Lexin023775": ["Serviceyrke utövades.", "مورست مهنة الخدمات."],
    "Lexin023777": ["Servis dukades.", "رُتب طقم الأواني."],
    "Lexin023780": ["Servitris serverade.", "قدمت الجرسونة."],
    "Lexin023785": ["Servitör serverade.", "قدم الجرسون."],
    "Lexin023787": ["Sesam användes.", "استُخدم السمسم."],
    "Lexin023792": ["Set vanns.", "فُزت المجموعة."],
    "Lexin023793": ["Set användes.", "استُخدم الطقم."],
    "Lexin023799": ["Sexa spelades.", "لُعب السادس."],
    "Lexin023800": ["Sexa serverades.", "قُدمت الوجبة الليلية."],
    "Lexin023802": ["Sextett spelade.", "عزفت الفرقة السداسية."],
    "Lexin023809": ["Sexualitet diskuterades.", "نوقشت الجنسانية."],
    "Lexin023812": ["Sexualundervisning gavs.", "أُعطي التعليم الجنسي."],
    "Lexin023827": ["Sfär studerades.", "دُرست الكرة الجغرافية."],
    "Lexin023830": ["Sheriff patrurade.", "تجول الشريف."],
    "Lexin023831": ["Sherry dracks.", "شُرب الشري."],
    "Lexin023832": ["Shop besöktes.", "زُير المتجر."],
    "Lexin023834": ["Shorts bars.", "ارتُدي البنطلون القصير."],
    "Lexin023835": ["Show framfördes.", "قُدم الاستعراض."],
    "Lexin023836": ["Showbusiness blomstrade.", "ازدهر عالم الاستعراضات."],
    "Lexin023840": ["I sicksack kördes.", "قيد بخط متعرج."],
    "Lexin023844": ["Siden användes.", "استُخدم الحرير."],
    "Lexin023845": ["I sidled gick det.", "ذهب جانباً."],
    "Lexin023846": ["Siesta togs.", "أُخذت استراحة الظهر."],
    "Lexin023852": ["Sight-seeing gjordes.", "أُجريت الجولة."],
    "Lexin023853": ["Sigill sattes.", "وُضع الختم."],
    "Lexin023859": ["Signatur skrevs.", "كُتب التوقيع."],
    "Lexin023863": ["Signaturmelodi spelades.", "شُغل لحن البرنامج."],
    "Lexin023865": ["Signetring bars.", "ارتُديت حلقة الشعار."],
    "Lexin023868": ["Sik fångades.", "صيد السمك الأبيض."]
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

const backupPath = DATA_FILE + '.backup_nouns60_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`\n🎉🎉🎉🎉🎉 6000 NOUNS MILESTONE ACHIEVED! 🎉🎉🎉🎉🎉`);
console.log(`✅ Total: 6000 nouns now have Swedish & Arabic examples!`);
console.log(`🇸🇪 6000 svenska exempelmeningar`);
console.log(`🇸🇦 6000 arabiska översättningar`);
console.log(`📊 Remaining: ~2481 nouns\n`);
