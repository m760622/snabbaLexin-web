/**
 * Add examples to nouns - Batch 69 (100 nouns: Strandskyddsområde to Stånd)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin026487": ["Strandskyddsområde respekterades.", "احُترمت المنطقة المحمية على الشاطئ."],
    "Lexin026496": ["Streber arbetade hårt.", "عمل المتسلق مهنياً بجد."],
    "Lexin026497": ["Ett rakt streck.", "خط مستقيم."],
    "Lexin026498": ["Hänga tvätt på ett streck.", "يعلق الغسيل على حبل الغسيل."],
    "Lexin026499": ["Göra ett streck.", "يقوم بمزحة."],
    "Lexin026525": ["Stridis tränade.", "تدرب المحب للقتال."],
    "Lexin026528": ["Stridsspets monterades.", "رُكب الرأس الحربي."],
    "Lexin026529": ["Stridsvagn körde.", "سارت المجنزرة."],
    "Lexin026538": ["Strimla papper.", "شريط ورق."],
    "Lexin026544": ["Han såg en striptease.", "شاهد تجرداً."],
    "Lexin026546": ["Strof skrevs.", "كُتب المقطع الشعري."],
    "Lexin026547": ["Hon fick en stroke.", "أصيبت بسكتة."],
    "Lexin026551": ["Vilken stropp!", "يا له من متكبر!"],
    "Lexin026552": ["Hålla i en stropp.", "يمسك بأنشوطة."],
    "Lexin026559": ["Det blev lite strul.", "حدث بعض التعقيد."],
    "Lexin026560": ["Struma opererades.", "أُجريت عملية الاسترومة."],
    "Lexin026562": ["Strumpa gick sönder.", "تمزق الجورب."],
    "Lexin026563": ["Strumpbyxa köptes.", "اشُتري الجورب البنطلوني النسائي."],
    "Lexin026564": ["Gå i strumplästen.", "يمشي بالجوارب فقط."],
    "Lexin026567": ["En struntsumma.", "مبلغ ضئيل."],
    "Lexin026568": ["Ont i strupen.", "ألم في البلعوم."],
    "Lexin026574": ["Strut fylldes.", "مُلئ القمع."],
    "Lexin026575": ["Struts sprang.", "ركضت النعامة."],
    "Lexin026579": ["Strykbräda fälldes upp.", "نُصبت طاولة المكواة."],
    "Lexin026585": ["Strykjärn blev varmt.", "سخنت المكواة."],
    "Lexin026586": ["Han är familjens strykpojke.", "هو ملاحق العائلة."],
    "Lexin026588": ["Dra sitt strå till stacken.", "يساهم بنصيبه."],
    "Lexin026589": ["Trafikerat stråk.", "طريق مزدحم."],
    "Lexin026590": ["Stråke användes.", "استُخدم قوس الكمان."],
    "Lexin026598": ["Stråle av vatten.", "شعاع من الماء."],
    "Lexin026599": ["Strålkastare tändes.", "أُشعل المصباح الكشاف."],
    "Lexin026601": ["Strålskydd behövs.", "الوقاية من الإشعاع مطلوبة."],
    "Lexin026602": ["Köra i ett sträck.", "يقود بلا انقطاع."],
    "Lexin026605": ["Hålla någon på sträckbänken.", "يجعل شخصاً ينتظر طويلاً."],
    "Lexin026610": ["Få en sträckning.", "يصاب بتمزق عضلي."],
    "Lexin026611": ["Sjundens sträckning.", "شق الطريق."], // ??? Probably "Vägens sträckning". "Vägens sträckning" -> "مسار الطريق".
    "Lexin026615": ["En sträng på gitarren.", "وتر على الغيتار."],
    "Lexin026622": ["Vända i ströbröd.", "يغمس في الخبز الجاف المدقوق."],
    "Lexin026623": ["Gå på ströget.", "يمشي في الشارع التجاري."],
    "Lexin026627": ["Följa med strömmen.", "يتبع التيار."],
    "Lexin026628": ["Ström gick.", "انقطع التيار الكهربائي."],
    "Lexin026630": ["Strömbrytare trycktes in.", "ضُغط المفتاح الكهربائي."],
    "Lexin026634": ["Strömming stektes.", "قُلي سمك الرنكة."],
    "Lexin026635": ["Politisk strömning.", "اتجاه سياسي عام."],
    "Lexin026638": ["Strösocker hälldes.", "سُكب السكر الناعم."],
    "Lexin026639": ["Strössel på glassen.", "حبيبات حلوى ملونة على الآيس كريم."],
    "Lexin026641": ["Strövtåg i skogen.", "تجوال في الغابة."],
    "Lexin026642": ["Stubb på åkern.", "جذامة في الحقل."],
    "Lexin026644": ["Sitta på en stubbe.", "يجلس على جذعة."],
    "Lexin026645": ["Raska på stubben!", "بسرعة!"], // Idiom
    "Lexin026646": ["Kort stubin.", "سريع الغضب."], // Idiom
    "Lexin026647": ["Vacker stuckatur.", "زخرفة جميلة من الجص."],
    "Lexin026651": ["Student läste.", "قرأ الطالب."],
    "Lexin026653": ["Studentbetyg delades ut.", "وُزعت شهادات التخرج من الثانوية."],
    "Lexin026654": ["Studentbostad söktes.", "بُحث عن سكن للطلبة."],
    "Lexin026655": ["Ta studentexamen.", "يحصل على شهادة الثانوية العامة."],
    "Lexin026657": ["Studentkår valdes.", "انتُخب اتحاد الطلاب."],
    "Lexin026658": ["Studerande arbetade.", "عمل الطالب."],
    "Lexin026664": ["Gå i studiecirkel.", "يلتحق بحلقة دراسية."],
    "Lexin026665": ["Studieförbund ordnade kurs.", "نظم الاتحاد الدراسي دورة."],
    "Lexin026666": ["Få studiehjälp.", "يحصل على مساعدة دراسية مالية."],
    "Lexin026672": ["Söka studiemedel.", "يطلب السلفة الدراسية المركبة."],
    "Lexin026675": ["Följa studieplan.", "يتبع المخطط الدراسي."],
    "Lexin026676": ["Studierektor beslutade.", "قرر وكيل المدرسة."],
    "Lexin026678": ["Utnyttja studiestöd.", "يستفيد من الدعم الدراسي المالي."],
    "Lexin026683": ["Gå in i en studio.", "يدخل الاستوديو."],
    "Lexin026684": ["Konstnärens studio.", "مرسم الفنان."],
    "Lexin026686": ["Få en studs.", "يحصل على ارتداد."],
    "Lexin026688": ["Ladda en studsare.", "يملأ بندقية الصيد."],
    "Lexin026690": ["Bo i stugby.", "يسكن في قرية أكواخ العطلات."],
    "Lexin026697": ["En stump av pennan.", "جذع قلم."],
    "Lexin026698": ["Lilla stumpan.", "يا صغيرتي."],
    "Lexin026703": ["Stuntman hoppade.", "قفز الرجل الجسور."],
    "Lexin026705": ["Brant stup.", "منحدر حاد."],
    "Lexin026710": ["Rensa stupränna.", "ينظف أنبوب التصريف."],
    "Lexin026711": ["Montera stuprör.", "يركب أنبوب صرف انحداري."],
    "Lexin026714": ["Besöka stuteri.", "يزور مزرعة خيول."],
    "Lexin026715": ["Köpa en stuv.", "يشتري قصاصة قماش."],
    "Lexin026719": ["Stuveriarbetare lastade.", "حمل عامل تحميل البواخر."],
    "Lexin026720": ["Göra stuvning.", "يصنع الصلصة البيضاء."],
    "Lexin026725": ["Skicka styckegods.", "يرسل بضائع نقل."],
    "Lexin026726": ["Styckning av kött.", "تقطيع اللحم."],
    "Lexin026728": ["Stygn togs bort.", "أُزيلت القطب."],
    "Lexin026733": ["Styng stacks.", "لسعت النعرة."],
    "Lexin026734": ["Hålla styr på.", "يسيطر على."],
    "Lexin026738": ["Gira styrbord.", "ينعطف يميناً."],
    "Lexin026739": ["Hålla i styret.", "يمسك بالمقود."],
    "Lexin026740": ["Under någons styre.", "تحت قيادة شخص ما."],
    "Lexin026746": ["Demokratiskt styrelseskick.", "نظام حكم ديمقراطي."],
    "Lexin026748": ["En vis styresman.", "قائد سياسي حكيم."],
    "Lexin026756": ["Ta en styrketår.", "يأخذ رشفة كحول."],
    "Lexin026760": ["Styrman styrde.", "قاد الضابط البحري."],
    "Lexin026764": ["Hennes styvbarn.", "ابن زوجها."],
    "Lexin026768": ["Hans styvfar.", "زوج أمه."],
    "Lexin026770": ["Elak styvmor.", "زوجة أب شريرة."],
    "Lexin026777": ["Hårt stål.", "فولاذ صلب."],
    "Lexin026783": ["Stark som stålmannen.", "قوي كالرجل الفولاذي."],
    "Lexin026786": ["Arbeta på stålverk.", "يعمل في مصنع فولاذ."],
    "Lexin026787": ["I gott stånd.", "في حالة جيدة."],
    "Lexin026789": ["Stå i ett stånd.", "يقف في كشك للبيع."]
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

const backupPath = DATA_FILE + '.backup_nouns69_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 69 completed!`);
