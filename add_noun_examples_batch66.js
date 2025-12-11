/**
 * Add examples to nouns - Batch 66 (100 nouns: Socialism to Speceriaffär)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin025539": ["Socialism diskuterades.", "نوقشت الاشتراكية."],
    "Lexin025540": ["Socialist talade.", "تحدث الاشتراكي."],
    "Lexin025542": ["Socialjour kontaktades.", "اتُصل بخفارة الخدمات الاجتماعية."],
    "Lexin025545": ["Socialkonsulent hjälpte.", "ساعد المستشار الاجتماعي."],
    "Lexin025546": ["Socialkontor besöktes.", "زُير مكتب الخدمات الاجتماعية."],
    "Lexin025547": ["Socialläkare undersökte.", "فحص الطبيب الاجتماعي."],
    "Lexin025548": ["Socialminister uttalade sig.", "صرح وزير الشؤون الاجتماعية."],
    "Lexin025549": ["Socialnämnd beslutade.", "قررت لجنة الخدمات الاجتماعية."],
    "Lexin025553": ["Socialpolitik debatterades.", "نوقشت السياسة الاجتماعية."],
    "Lexin025554": ["Socialregister gicks igenom.", "روجِع السجل الاجتماعي."],
    "Lexin025555": ["Socialsekreterare arbetade.", "عمل سكرتير الخدمات الاجتماعية."],
    "Lexin025562": ["Socialtjänst erbjöds.", "قُدمت الخدمات الاجتماعية."],
    "Lexin025568": ["Socialutskott sammanträdde.", "اجتمعت اللجنة البرلمانية للخدمات الاجتماعية."],
    "Lexin025569": ["Socialvård behövdes.", "احتُيج للرعاية الاجتماعية."],
    "Lexin025570": ["Societet samlades.", "اجتمعت الطبقة الأرستقراطية."],
    "Lexin025571": ["Sociolog forskade.", "بحث خبير العلوم الاجتماعية."],
    "Lexin025572": ["Sociologi studerades.", "دُرس علم الاجتماع."],
    "Lexin025574": ["Socionom anställdes.", "وُظف حامل شهادة العلوم الاجتماعية."],
    "Lexin025576": ["Socka stickades.", "حيك الجورب."],
    "Lexin025579": ["Socken besöktes.", "زُيرت الأبرشية."],
    "Lexin025581": ["Socker köptes.", "اشُتري السكر."],
    "Lexin025582": ["Sockerbeta skördades.", "حُصد البنجر."],
    "Lexin025583": ["Sockerdricka dracks.", "شُرب عصير الفاكهة."],
    "Lexin025585": ["Sockerkaka bakades.", "خُبزت الكعكة الاسفنجية."],
    "Lexin025586": ["Sockersjuka behandlades.", "عولج مرض السكري."],
    "Lexin025588": ["Soda användes.", "استُخدمت الصودا الكاوية."],
    "Lexin025589": ["Sodavatten serverades.", "قُدم ماء الصودا."],
    "Lexin025591": ["Soffliggare väcktes.", "أُيقظ الكسول."],
    "Lexin025593": ["Soja smakade.", "كان طعم الصويا..."],
    "Lexin025596": ["Han blev utsatt för sol-och-vår.", "تعرض للاحتيال."],
    "Lexin025598": ["Solarium besöktes.", "زُير جهاز الشمس الاصطناعية."],
    "Lexin025600": ["Slag i solarplexus.", "ضربة في الضفيرة الشمسية."],
    "Lexin025603": ["Solbränna syntes.", "ظهر سمار الشمس."],
    "Lexin025604": ["Soldat stred.", "قاتل الجندي."],
    "Lexin025606": ["Solfjäder användes.", "استُخدمت المنشة."],
    "Lexin025607": ["Solfångare installerades.", "رُكب اللوح الشمسي."],
    "Lexin025608": ["Solglasögon bars.", "ارتُديت النظارة الشمسية."],
    "Lexin025617": ["Soliditet testades.", "فُحصت سلامة المركز."],
    "Lexin025619": ["Solist spelade.", "عزف العازف الوحيد."],
    "Lexin025620": ["Solkatt syntes.", "ظهر انعكاس الشمس من المرآة."],
    "Lexin025623": ["Solnedgång sågs.", "شوهد الغروب."],
    "Lexin025625": ["Solsken värmde.", "أدفأت الشمس الساطعة."],
    "Lexin025626": ["Solsting drabbade.", "أصابت ضربة الشمس."],
    "Lexin025632": ["Somalier talade.", "تحدث الصومالي."],
    "Lexin025634": ["Somaliska talades.", "تُحدثت الصومالية."],
    "Lexin025635": ["Somaliska kom.", "جاءت الصومالية."],
    "Lexin025640": ["Sommargäst kom.", "جاء ضيف الصيف."],
    "Lexin025641": ["Sommarhus hyrdes.", "استُؤجر البيت الصيفي."],
    "Lexin025643": ["Sommarlov började.", "بدأت إجازة الصيف."],
    "Lexin025644": ["Sommarstuga såldes.", "بيع كوخ الصيف."],
    "Lexin025645": ["Sommarställe köptes.", "اشُتري منزل الصيف."],
    "Lexin025646": ["Sommartid infördes.", "طُبق التوقيت الصيفي."],
    "Lexin025649": ["I somras reste vi.", "سافرنا في الصيف الفائت."],
    "Lexin025652": ["Sond användes.", "استُخدم المسبار."],
    "Lexin025653": ["Sond sändes upp.", "أُرسل المسبار."],
    "Lexin025656": ["Sondotter hälsade.", "سلمت الحفيدة."],
    "Lexin025657": ["Sonhustru hjälpte.", "ساعدت الكنة."],
    "Lexin025659": ["Sonson lekte.", "لعب الحفيد."],
    "Lexin025661": ["Sopborste användes.", "استُخدمت المكنسة."],
    "Lexin025662": ["Sopmaja byggdes.", "بُني مجمع النفايات."],
    "Lexin025663": ["Sopnedkast stängdes.", "أُغلق فتحة القمامة."],
    "Lexin025668": ["Sopran sjöng.", "غنت السوبرانو."],
    "Lexin025669": ["Sopskyffel fylldes.", "امتلأ المجرود."],
    "Lexin025670": ["Soptipp fylldes.", "امتلأت المزبلة."],
    "Lexin025671": ["Soptunna tömdes.", "أُفرغ برميل الزبالة."],
    "Lexin025672": ["Sorbet åts.", "أُكل السوربيه."],
    "Lexin025676": ["Sork sågs.", "شوهد فأر الحقل."],
    "Lexin025677": ["Sorl hördes.", "سُمعت الهمهمة."],
    "Lexin025687": ["Sosse talade.", "تحدث الديمقراطي الاشتراكي."],
    "Lexin025688": ["Sot togs bort.", "أُزيل السخام."],
    "Lexin025690": ["Sotare kom.", "جاء منظف المداخن."],
    "Lexin025691": ["Sotare stektes.", "قُلي سمك الرنكة."],
    "Lexin025694": ["Det var ett skönt sound.", "كان تردد موسيقي مميز جميل."],
    "Lexin025695": ["Souvenir köptes.", "اشُتري التذكار."],
    "Lexin025700": ["Sovplats bokades.", "حُجزت المنامة."],
    "Lexin025703": ["Sovsäck packades.", "حُزم كيس المنامة."],
    "Lexin025704": ["Sovvagn rullade.", "تدحرجت عربة المنامة."],
    "Lexin025705": ["Spackel torkade.", "جف الملاط."],
    "Lexin025706": ["Spackel användes.", "استُخدم الملوق."],
    "Lexin025709": ["Spad kokade.", "غلى المرق."],
    "Lexin025711": ["Spader ess.", "أص بستوني."],
    "Lexin025714": ["Spak drogs.", "سُحبت ذراع التحكم."],
    "Lexin025715": ["Spaljé sattes upp.", "نُصبت التعريشة."],
    "Lexin025716": ["Spalt lästes.", "قُرأ العمود."],
    "Lexin025722": ["Spanjor dansade.", "رقص الإسباني."],
    "Lexin025723": ["Spanjorska sjöng.", "غنت الإسبانية."],
    "Lexin025727": ["Ett spann hästar.", "عربة جر تجرها خيول."],
    "Lexin025728": ["Ett spann över ån.", "باع فوق النهر."],
    "Lexin025729": ["Spannmål lagrades.", "خُزنت الحبوب."],
    "Lexin025732": ["Spanska talades.", "تُحدثت الإسبانية."],
    "Lexin025736": ["Sparbank rånades.", "سُرق بنك التوفير."],
    "Lexin025737": ["Sparbössa fylldes.", "امتلأت الحصالة."],
    "Lexin025738": ["Spargris tömdes.", "أُفرغت الحصالة على شكل خنزير."],
    "Lexin025740": ["Spark användes.", "استُخدمت الزحافة."],
    "Lexin025742": ["Sparkcykel åktes.", "رُكبت دراجة القدم."],
    "Lexin025744": ["Sparris kokades.", "سُلق الهليون."],
    "Lexin025748": ["Sparv flög.", "طار الدوري."],
    "Lexin025749": ["Spasm kändes.", "شُعر بالتشنج."],
    "Lexin025759": ["Han gjorde sig till spe.", "جعل من نفسه أضحوكة."],
    "Lexin025760": ["Speceriaffär öppnade.", "فُتح دكان البقال."]
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

const backupPath = DATA_FILE + '.backup_nouns66_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 66 completed!`);
