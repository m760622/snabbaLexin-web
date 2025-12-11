/**
 * Add examples to nouns - Batch 27 (100 nouns: Hylsnyckel to Hövlighetsvisit)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin011918": ["Hylsnyckeln användes.", "استُخدم المفتاح الإطاري."],
    "Lexin011919": ["Hymnen sjöngs.", "أُنشدت الترتيلة."],
    "Lexin011920": ["Hyndan skällde.", "نبحت الكلبة."],
    "Lexin011921": ["Hyndan föraktades.", "احتُقرت المرأة السيئة."],
    "Lexin011931": ["Hypnosen användes.", "استُخدم التنويم المغناطيسي."],
    "Lexin011941": ["Hypoteket sattes.", "وُضع الرهن."],
    "Lexin011960": ["Hyresgästen betalade.", "دفع المستأجر."],
    "Lexin011965": ["Hyresgästföreningen hjälpte.", "ساعد اتحاد المستأجرين."],
    "Lexin011966": ["Hyreshuset renoverades.", "رُممت العمارة السكنية."],
    "Lexin011967": ["Hyreskontraktet undertecknades.", "وُقع عقد الاستئجار."],
    "Lexin011970": ["Hyreslägenheten var bekväm.", "كانت شقة الاستئجار مريحة."],
    "Lexin011971": ["Hyresnämnden medlade.", "توسطت لجنة شؤون الاستئجار."],
    "Lexin011977": ["Hyresvärden reparerade.", "أصلح المؤجر."],
    "Lexin011984": ["Hysterin spred sig.", "انتشرت الهستيريا."],
    "Lexin011988": ["Hytten var liten.", "كانت القمرة صغيرة."],
    "Lexin011989": ["Hyttan producerade glas.", "أنتج المسبك الزجاج."],
    "Lexin011991": ["Hyveln slipades.", "سُنّ المسحاج."],
    "Lexin011992": ["Hyvelbänken stod stadigt.", "وقفت طاولة النجارة ثابتة."],
    "Lexin011999": ["Hålan var mörk.", "كان الكهف مظلماً."],
    "Lexin012000": ["Hålfoten stöddes.", "دُعم قوس القدم."],
    "Lexin012001": ["Håligheten fylldes.", "امتلأ الفراغ."],
    "Lexin012008": ["Hållaren höll fast.", "أمسكت المساكة."],
    "Lexin012040": ["Han hade hållhake på mig.", "كان لديه مأخذ علي."],
    "Lexin012041": ["Hålligången fortsatte.", "استمر الحفل الصاخب."],
    "Lexin012047": ["Hållpunkten bestämdes.", "حُددت النقطة الأساسية."],
    "Lexin012049": ["Hålslaget användes.", "استُخدمت ثقابة الورق."],
    "Lexin012052": ["Håltimmen utnyttjades.", "استُغلت ساعة الفراغ."],
    "Lexin012072": ["Hårdhandskarna togs på.", "اتُخذت الإجراءات القاسية."],
    "Lexin012082": ["Hårdvaran uppgraderades.", "رُقيت التجهيزات."],
    "Lexin012086": ["Hårnålen sattes på plats.", "وُضع مشبك الشعر."],
    "Lexin012087": ["Hårnålskurvan var farlig.", "كان المنعطف الحاد خطيراً."],
    "Lexin012098": ["Hårtesten analyserades.", "حُللت خصلة الشعر."],
    "Lexin012099": ["Hårtorken blåste.", "نفخ مجفف الشعر."],
    "Lexin012100": ["Håven användes för att fånga fjärilar.", "استُخدم كيس الشبكة لصيد الفراشات."],
    "Lexin012103": ["Häcken hoppades.", "قُفز الحاجز."],
    "Lexin012108": ["Häftan sattes på.", "وُضعت المادة اللاصقة."],
    "Lexin012115": ["Häftstiftet höll pappret.", "أمسك الدبوس الورقة."],
    "Lexin012116": ["Häggen blommade.", "أزهر الكرز العنقودي."],
    "Lexin012118": ["Hägringen syntes i öknen.", "ظهر السراب في الصحراء."],
    "Lexin012123": ["Häktet var säkert.", "كان حبس التحقيق آمناً."],
    "Lexin012139": ["Hälen gjorde ont.", "آلم عقب القدم."],
    "Lexin012140": ["Hälaren greps.", "اعتُقل مخفي المسروقات."],
    "Lexin012142": ["Häleriet avslöjades.", "اكتُشف التعامل بالمسروقات."],
    "Lexin012148": ["Hällen var het.", "كانت البلاطة ساخنة."],
    "Lexin012150": ["Hällregnet föll.", "سقط المطر المنهمر."],
    "Lexin012151": ["Hällristningen studerades.", "دُرست الرسومات على الصخور."],
    "Lexin012162": ["Hälsobrunnen besöktes.", "زُير بئر المياه الصحية."],
    "Lexin012165": ["Hälsohemmet erbjöd vila.", "قدمت المصحة الراحة."],
    "Lexin012167": ["Hälsokortet uppdaterades.", "حُدثت بطاقة التسجيل الصحي."],
    "Lexin012168": ["Hälsokosten var populär.", "كان الغذاء الصحي شائعاً."],
    "Lexin012173": ["Hälsovården förbättrades.", "تحسنت الرعاية الصحية."],
    "Lexin012174": ["Hälsovårdsnämnden beslutade.", "قررت لجنة الرعاية الصحية."],
    "Lexin012196": ["Hängaren bar jackan.", "حملت العلاقة الجاكيت."],
    "Lexin012197": ["Hängavtalet tecknades.", "وُقعت الاتفاقية المحلية."],
    "Lexin012200": ["Hänget blomstrade.", "ازدهرت الأزهار المعلقة."],
    "Lexin012201": ["Hänget var vackert.", "كانت الحلية المعلقة جميلة."],
    "Lexin012211": ["Hängmattan svingade.", "تأرجحت الأرجوحة الشبكية."],
    "Lexin012213": ["Hängslet höll byxorna.", "أمسكت الحمالة البنطلون."],
    "Lexin012214": ["Hänryckningen var total.", "كان الاستمتاع تاماً."],
    "Lexin012222": ["Häpnaden var stor.", "كان الاندهاش كبيراً."],
    "Lexin012226": ["Hären marscherade.", "سار الجيش."],
    "Lexin012227": ["Häradet styrdes.", "أُدير القضاء."],
    "Lexin012233": ["Härden isolerades.", "عُزل المركز."],
    "Lexin012261": ["Hästhoven växte.", "نما حافر الحصان."],
    "Lexin012262": ["Hästkuren hjälpte.", "ساعد العلاج القوي."],
    "Lexin012263": ["Hästsvansen bands.", "رُبط ذيل الحصان."],
    "Lexin012264": ["Det är ingen hästväg!", "هذا ليس بالشيء الغريب!"],
    "Lexin012266": ["Hättan bars.", "ارتُديت الطاقية."],
    "Lexin012278": ["Häxan trollade.", "سحرت الساحرة."],
    "Lexin012279": ["Höet lagrades.", "خُزن القش."],
    "Lexin012280": ["Höften gjorde ont.", "آلم الورك."],
    "Lexin012305": ["Högfärden kritiserades.", "انتُقدت الكبرياء."],
    "Lexin012312": ["Höghuset var högt.", "كانت البناية العالية شاهقة."],
    "Lexin012314": ["Höginkomsttagaren betalade mer skatt.", "دفع ذو الدخل المرتفع ضريبة أكثر."],
    "Lexin012320": ["Högmodet föregår fall.", "الاعتزاز يسبق السقوط."],
    "Lexin012321": ["Högmässan hölls.", "أُقيم القداس."],
    "Lexin012333": ["Högstadiet var svårt.", "كانت المرحلة العليا صعبة."],
    "Lexin012334": ["Högsäsongen pågick.", "جرت فترة العمل المكثف."],
    "Lexin012337": ["Högtalaren ljöd.", "صدحت السماعة."],
    "Lexin012338": ["Högtiden firades.", "احتُفل بالعيد."],
    "Lexin012340": ["Högtrafiken orsakade köer.", "سببت حركة المرور المزدحمة طوابير."],
    "Lexin012342": ["Högtrycket gav sol.", "أعطى الضغط المرتفع شمساً."],
    "Lexin012350": ["Höjdaren anlände.", "وصل رفيع المستوى."],
    "Lexin012351": ["Höjdhoppet vanns.", "فاز القفز العالي."],
    "Lexin012356": ["Höken flög.", "طار الصقر."],
    "Lexin012357": ["Höljet skyddade.", "حمى الغطاء."],
    "Lexin012362": ["Hönsen kacklade.", "صاح الدجاج."],
    "Lexin012367": ["Hörapparaten hjälpte.", "ساعد جهاز السمع."],
    "Lexin012372": ["Hörcentralen undersökte.", "فحص مركز عيادة السمع."],
    "Lexin012373": ["Hörluren sattes på.", "وُضعت السماعة."],
    "Lexin012375": ["Hörnan var trång.", "كانت الزاوية ضيقة."],
    "Lexin012378": ["Hörntanden var vass.", "كان الناب حاداً."],
    "Lexin012381": ["Hörsalen var full.", "كانت صالة الاستماع ممتلئة."],
    "Lexin012404": ["Hörsägen spreds.", "انتشرت الإشاعة."],
    "Lexin012406": ["Hösnuvan plågade.", "أزعجت حمى القش."],
    "Lexin012409": ["I höstas regnade det.", "أمطرت خريف العام الفائت."],
    "Lexin012411": ["Höstdagjämningen kom.", "جاء الاعتدال الخريفي."],
    "Lexin012413": ["Hötorgskonsten såldes.", "بيع الفن المبتذل."],
    "Lexin012414": ["Hövdingen ledde stammen.", "قاد الزعيم القبيلة."],
    "Lexin012416": ["Hövlighetsvisiten gjordes.", "أُجريت زيارة المجاملة."]
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

const backupPath = DATA_FILE + '.backup_nouns27_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 2700 nouns!`);
