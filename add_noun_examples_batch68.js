/**
 * Add examples to nouns - Batch 68 (100 nouns: Staket to Strandhugg)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin026115": ["Staket målades.", "دُهن السياج."],
    "Lexin026118": ["Stall städades.", "نُظف الإسطبل."],
    "Lexin026119": ["Stalltips gavs.", "أُعطيت معلومات من الداخل."],
    "Lexin026120": ["Stam mättes.", "قيس جذع الشجرة."],
    "Lexin026121": ["Stam flyttade.", "انتقلت القبيلة."],
    "Lexin026122": ["Ordets stam.", "جذر الكلمة."],
    "Lexin026137": ["Standardprov skrevs.", "كُتب الاختبار النموذجي."],
    "Lexin026139": ["Stank kändes.", "شُمت الرائحة الكريهة."],
    "Lexin026143": ["Stans användes.", "استُخدمت الخراقة."],
    "Lexin026145": ["Stapel byggdes.", "بُنيت الكومة."],
    "Lexin026148": ["Stare sjöng.", "غنى الزرزور."],
    "Lexin026153": ["Starköl dracks.", "شُربت البيرة القوية."],
    "Lexin026159": ["Ligga i startgroparna.", "تأهب للانطلاق."],
    "Lexin026160": ["Starthjälp gavs.", "أُعطيت مساعدة البدء."],
    "Lexin026161": ["Startsida ändrades.", "غُيرت صفحة البدء."],
    "Lexin026162": ["Startskott gick.", "انطلقة إشارة البدء."],
    "Lexin026168": ["Statare arbetade.", "عمل العامل الزراعي الفقير."],
    "Lexin026174": ["Station öppnade.", "فُتحت المحطة."],
    "Lexin026178": ["Statist agerade.", "مثل الممثل الثانوي."],
    "Lexin026181": ["Stativ fälldes upp.", "نُصب المنصب."],
    "Lexin026192": ["Statskunskap lästes.", "دُرست العلوم السياسية."],
    "Lexin026193": ["Statskupp skedde.", "حدث انقلاب."],
    "Lexin026194": ["Statskyrka fanns.", "وجدت كنيسة الدولة."],
    "Lexin026197": ["Statsmakterna beslutade.", "قررت سلطات الدولة."],
    "Lexin026198": ["Statsman talade.", "تحدث رجل الدولة."],
    "Lexin026199": ["Statsminister valdes.", "انتُخب رئيس الوزراء."],
    "Lexin026201": ["Statsråd avgick.", "استقال الوزير."],
    "Lexin026204": ["Statssekreterare utsågs.", "عُين سكرتير الدولة."],
    "Lexin026206": ["Statsskatt betalades.", "دُفعت الضريبة الحكومية."],
    "Lexin026207": ["Statsskick ändrades.", "تغير نظام الحكم."],
    "Lexin026209": ["Statstjänsteman anställdes.", "وُظف الموظف الحكومي."],
    "Lexin026217": ["Stav bröts.", "كُسر القضيب."],
    "Lexin026222": ["Stavning rättades.", "صُححت التهجئة."],
    "Lexin026224": ["Stearin droppade.", "قطر الستيارين."],
    "Lexin026227": ["Ett steg framåt.", "خطوة إلى الأمام."],
    "Lexin026238": ["Stek åts.", "أُكلت قطعة لحم الشواء."],
    "Lexin026243": ["Stelkramp behandlades.", "عولج الكزاز."],
    "Lexin026253": ["Stencil drogs.", "نُسخ الإستنسيل."],
    "Lexin026255": ["Stengods gjordes.", "صُنع الخزف الحجري."],
    "Lexin026258": ["Stenkaka spelades.", "لُعبت اسطوانة الغرامافون."],
    "Lexin026262": ["Stenografi användes.", "استُخدم الاختزال."],
    "Lexin026264": ["Stenskott lagades.", "أُصلح أثر حجر الطريق."],
    "Lexin026269": ["Stepp dansades.", "رُقصت الستب."],
    "Lexin026270": ["Stereo köptes.", "اشُتري الستيريو."],
    "Lexin026280": ["Stetoskop användes.", "استُخدمت سماعة الطبيب."],
    "Lexin026282": ["Steward serverade.", "خدم المضيف."],
    "Lexin026283": ["Stick kändes.", "شُعر بالوخزة."],
    "Lexin026285": ["Sticka tappades.", "سقطت سنارة الحبك."],
    "Lexin026294": ["Lämna någon i sticket.", "يخذل شخصاً."],
    "Lexin026295": ["Stickling sattes.", "زُرعت الشتلة."],
    "Lexin026296": ["Stickning pågick.", "استمرت الحياكة."],
    "Lexin026298": ["Stickpropp sattes i.", "وُضع القابس الكهربائي."],
    "Lexin026302": ["Stift besöktes.", "زُيرت الأبرشية."],
    "Lexin026303": ["Stift stacks.", "وُخز الدبوس."],
    "Lexin026307": ["Stiftelse grundades.", "أُسست المؤسسة."],
    "Lexin026319": ["Stil berömdes.", "مُدح الأسلوب."],
    "Lexin026325": ["Stilett drogs.", "سُحبت السكين المنطوية."],
    "Lexin026334": ["Stilleben målades.", "رُسمت الساكنة."],
    "Lexin026335": ["Stillestånd rådde.", "سادت الهدنة."],
    "Lexin026336": ["Stillhet bröts.", "كُسر الهدوء."],
    "Lexin026338": ["Stiltje rådde.", "ساد ركود الرياح."],
    "Lexin026339": ["Stim hördes.", "سُمع الضجيج."],
    "Lexin026340": ["Stim sågs.", "شوهد فوج السمك."],
    "Lexin026345": ["Sting kändes.", "شُعر بالقرصة."],
    "Lexin026349": ["Stins visslade.", "صفر مفتش محطة القطار."],
    "Lexin026357": ["Stjälk bröts.", "كُسر ساق النبات."],
    "Lexin026360": ["Stjärngosse sjöng.", "غنى صبي اللوسيا."],
    "Lexin026361": ["Stjärnskott uppträdde.", "مثل الفنان الصاعد."],
    "Lexin026362": ["Stjärnsmäll kändes.", "شُعر بخبطة على الرأس."],
    "Lexin026363": ["Stjärt syntes.", "ظهرت المؤخرة."],
    "Lexin026364": ["Sto betade.", "رعت الفرس."],
    "Lexin026365": ["Stock sågades.", "نُشر زند الخشب."],
    "Lexin026366": ["En stock timmer.", "مجموعة أخشاب."],
    "Lexin026369": ["Stockning uppstod.", "حدث التكدس."],
    "Lexin026374": ["Gammal stofil.", "كهل غريب الأطوار."],
    "Lexin026378": ["Stoj hördes.", "سُمع القصف."],
    "Lexin026381": ["Heliga stolen.", "الكرسي الرسولي."],
    "Lexin026383": ["Stolpe restes.", "نُصب العمود."],
    "Lexin026384": ["Stolpiller gavs.", "أُعطيت التحميلة الشرجية."],
    "Lexin026401": ["Stoppning lades i.", "وُضعت الحشوة."],
    "Lexin026403": ["Stoppur startades.", "بدأت ساعة التحكيم."],
    "Lexin026411": ["Storasyster hjälpte.", "ساعدت الأخت الكبيرة."],
    "Lexin026412": ["Stordrift infördes.", "طُبق الانتاج الصناعي الموسع."],
    "Lexin026413": ["Stordåd utfördes.", "أُنجزت المأثرة."],
    "Lexin026414": ["Storebror lekte.", "لعب الأخ الأكبر."],
    "Lexin026415": ["Storfamilj bodde.", "سكنت العائلة الكبيرة."],
    "Lexin026416": ["Fysikalisk storhet.", "كمية فيزيائية."],
    "Lexin026417": ["En litterär storhet.", "شخصية أدبية عظيمة."],
    "Lexin026418": ["Storhetsvansinne visades.", "أُظهر جنون العظمة."],
    "Lexin026424": ["Stormakt agerade.", "تصرفت القوة العظمى."],
    "Lexin026427": ["Stormarknad öppnade.", "فُتح السوق المركزي."],
    "Lexin026429": ["Med stormsteg.", "بسرعة كبيرة."],
    "Lexin026430": ["Stormöte hölls.", "عُقد الاجتماع الموسع."],
    "Lexin026435": ["Storstad växte.", "نمث المدينة الكبرى."],
    "Lexin026437": ["Storsäljare såldes.", "بيع الكتاب الذي يباع كثيراً."],
    "Lexin026438": ["Stortå ömmade.", "آلم إصبع القدم الكبير."],
    "Lexin026439": ["Storverk gjordes.", "أُنجز العمل العظيم."],
    "Lexin026441": ["Bra story.", "قصة جيدة."],
    "Lexin026465": ["Straffränta betalades.", "دُفعت الفائدة الجزائية."],
    "Lexin026485": ["Strandhugg gjordes.", "أُجريت زيارة مؤقتة للشاطئ."]
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

const backupPath = DATA_FILE + '.backup_nouns68_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 68 completed!`);
