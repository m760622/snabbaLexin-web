/**
 * Add examples to nouns - Batch 16 (100 nouns: Epileptiker to Farled)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin006816": ["Epileptikern tar medicin dagligen.", "يتناول المصروع الدواء يومياً."],
    "Lexin006820": ["Episoden var obetydlig.", "كانت الحادثة العرضية غير مهمة."],
    "Lexin006821": ["Han skrev ett roligt epistel.", "كتب رسالة مضحكة."],
    "Lexin006822": ["Episteln lästes i kyrkan.", "قُرئت الرسالة الإنجيلية في الكنيسة."],
    "Lexin006825": ["Epoken präglades av framsteg.", "تميز العهد بالتقدم."],
    "Lexin006829": ["Eran markerade en ny tid.", "دلّ العهد على زمن جديد."],
    "Lexin006834": ["Erektionen är en naturlig reaktion.", "الانتصاب رد فعل طبيعي."],
    "Lexin006845": ["Ergonomi förbättrar arbetsmiljön.", "يحسن علم العمل بيئة العمل."],
    "Lexin006847": ["Eriksgatan var en tradition.", "كان مسار الملوك تقليداً."],
    "Lexin006856": ["Erkännandet var viktigt.", "كان الاعتراف مهماً."],
    "Lexin006863": ["Erotiken var subtil.", "كان الجنسي خفياً."],
    "Lexin006865": ["Ersättaren tog över jobbet.", "تولى البديل العمل."],
    "Lexin006869": ["Ersättningen betalades ut.", "دُفع التعويض."],
    "Lexin006881": ["Eskimån levde på Grönland.", "عاش الإسكيمو في غرينلاند."],
    "Lexin006882": ["Eskorten skyddade presidenten.", "حمت المصاحبة الرئيس."],
    "Lexin006885": ["Espresson var stark och god.", "كان الإسبريسو قوياً ولذيذاً."],
    "Lexin006886": ["Esset är det högsta kortet.", "الآص أعلى ورقة."],
    "Lexin006887": ["Han var i esse.", "كان في قمة نشوته."],
    "Lexin006888": ["Essensen extraherades.", "استُخلصت الروح."],
    "Lexin006890": ["Essän var välskriven.", "كان المقال مكتوباً جيداً."],
    "Lexin006894": ["Estraden användes för tal.", "استُخدمت المنصة للخطب."],
    "Lexin006904": ["Etablissemanget var populärt.", "كانت المؤسسة شائعة."],
    "Lexin006906": ["Etagevåningen hade två plan.", "كانت للشقة طابقان."],
    "Lexin006910": ["Etern används som lösningsmedel.", "يُستخدم الأثير كمذيب."],
    "Lexin006911": ["Etermedierna sände nyheter.", "بثت وسائل الإعلام الأخبار."],
    "Lexin006914": ["Etiken styr handlingar.", "توجه الأخلاق التصرفات."],
    "Lexin006917": ["Etiketten kräver artighet.", "تتطلب قواعد التشريفات اللباقة."],
    "Lexin006943": ["Etuiet skyddade glasögonen.", "حمت الحاوية النظارات."],
    "Lexin006961": ["Europén reste i EU.", "سافر الأوروبي في الاتحاد."],
    "Lexin006976": ["Evakueringen skedde snabbt.", "تم الإجلاء بسرعة."],
    "Lexin006978": ["Evangelium berättar om Jesus.", "يروي الإنجيل عن يسوع."],
    "Lexin006979": ["Evenemanget lockade tusentals.", "جذب الحدث الآلاف."],
    "Lexin006982": ["Evergreenen spelades på radion.", "عُزفت الأغنية الخالدة على الراديو."],
    "Lexin006986": ["Evolutionen tog miljoner år.", "استغرق التطور ملايين السنين."],
    "Lexin007000": ["Exekutionen verkställdes.", "نُفذ حكم الإعدام."],
    "Lexin007001": ["Exekutionen genomfördes av myndigheten.", "نفذت السلطة الجباية."],
    "Lexin007016": ["Exercisen pågick i timmar.", "استمر التمرين ساعات."],
    "Lexin007020": ["Existensberättigandet diskuterades.", "نُوقش الحق في البقاء."],
    "Lexin007021": ["Existensminimum fastställdes.", "حُدد الحد الأدنى للمعيشة."],
    "Lexin007028": ["Exlibris klistrades i boken.", "لُصق الطابع في الكتاب."],
    "Lexin007038": ["Expansionen ökade produktionen.", "زاد التوسع الإنتاج."],
    "Lexin007044": ["Expediten hjälpte kunden.", "ساعد البائع الزبون."],
    "Lexin007045": ["Expeditionen stängde klockan fem.", "أغلق مكتب الخدمات الخامسة."],
    "Lexin007046": ["Expeditionen utforskade Arktis.", "استكشفت الحملة القطب الشمالي."],
    "Lexin007061": ["Exploatören utnyttjade arbetarna.", "استغل المستغل العمال."],
    "Lexin007067": ["Expon visade ny teknik.", "عرض المعرض تقنية جديدة."],
    "Lexin007072": ["Expressen avgick i tid.", "غادر القطار السريع في الوقت."],
    "Lexin007073": ["Expressbrevet levererades samma dag.", "سُلم الخطاب السريع نفس اليوم."],
    "Lexin007075": ["Expropriationen genomfördes.", "نُفذت مصادرة الملكية."],
    "Lexin007087": ["Exteriören var imponerande.", "كان الخارج مثيراً للإعجاب."],
    "Lexin007094": ["Extraknäcket gav extra pengar.", "أعطى العمل الإضافي مالاً إضافياً."],
    "Lexin007096": ["Extraktet koncentrerades.", "رُكز المستخلص."],
    "Lexin007098": ["Extrapriset lockade kunder.", "جذب السعر الخاص الزبائن."],
    "Lexin007103": ["Extremisten arresterades.", "اعتُقل المتطرف."],
    "Lexin007105": ["Eyelinern markerade ögonen.", "أبرز الكحل العيون."],
    "Lexin007106": ["F är den sjätte bokstaven.", "F هو الحرف السادس."],
    "Lexin007117": ["Fabeln handlade om djur.", "تناولت القصة حيوانات."],
    "Lexin007121": ["Fabrikanten producerade bilar.", "صنّع المُصنع السيارات."],
    "Lexin007130": ["Facket var tomt.", "كان الصندوق فارغاً."],
    "Lexin007134": ["Fackförbundet förhandlade.", "تفاوض اتحاد النقابات."],
    "Lexin007135": ["Fackföreningen strejkade.", "أضرب الاتحاد النقابي."],
    "Lexin007138": ["Fackklubben höll möte.", "عقد النادي النقابي اجتماعاً."],
    "Lexin007139": ["Facklan lyste upp mörkret.", "أضاء المشعل الظلام."],
    "Lexin007148": ["Facklitteraturen var informativ.", "كانت المراجع المتخصصة مفيدة."],
    "Lexin007149": ["Fackmannen reparerade maskinen.", "أصلح الخبير الآلة."],
    "Lexin007151": ["Fackpressen rapporterade nyheten.", "نقلت الصحافة المتخصصة الخبر."],
    "Lexin007155": ["Faddern var med vid dopet.", "حضر العرّاب العماد."],
    "Lexin007157": ["Faderskapet bekräftades.", "أُكد الأبوة."],
    "Lexin007168": ["Det var på faggorna.", "كان وشيكاً."],
    "Lexin007183": ["Faktorn ledde tryckeriet.", "أدار المدير الفني المطبعة."],
    "Lexin007190": ["Falangen var radikal.", "كان الجناح السياسي راديكالياً."],
    "Lexin007192": ["Falken flög högt.", "حلق الصقر عالياً."],
    "Lexin007194": ["Fallet var djupt.", "كانت الهوة عميقة."],
    "Lexin007203": ["Fallgropen undveks.", "تم تجنب الفخ."],
    "Lexin007206": ["Han var på fallrepet.", "كان على طريق الانهيار."],
    "Lexin007209": ["Fallskärmen öppnades.", "فُتحت المظلة."],
    "Lexin007211": ["Falsen höll plåtarna ihop.", "ربطت الثنية الصفائح."],
    "Lexin007230": ["Falukorven stektes.", "قُليت الفالوكورف."],
    "Lexin007232": ["Familjen åt middag tillsammans.", "تناولت العائلة العشاء معاً."],
    "Lexin007236": ["Familjedaghemmet tog emot barn.", "استقبلت دار الحضانة العائلية الأطفال."],
    "Lexin007237": ["Familjehemmet gav trygghet.", "وفر بيت التربية العائلية الأمان."],
    "Lexin007243": ["Familjepedagogen hjälpte familjen.", "ساعد الخبير الاجتماعي العائلة."],
    "Lexin007244": ["Familjepensionen utbetalades.", "صُرف تقاعد العائلة."],
    "Lexin007245": ["Familjeplanering diskuterades.", "نُوقش تحديد النسل."],
    "Lexin007246": ["Familjerådgivaren gav stöd.", "قدم المستشار العائلي الدعم."],
    "Lexin007257": ["En famn är cirka 1.8 meter.", "القامة حوالي 1.8 متر."],
    "Lexin007258": ["Famntaget var varmt.", "كان العناق دافئاً."],
    "Lexin007265": ["Fanatismen var farlig.", "كان التعصب خطيراً."],
    "Lexin007267": ["Faneren täckte möbeln.", "غطت القشرة الخشبية الأثاث."],
    "Lexin007270": ["Fanfaren ljöd högt.", "صدح النفير عالياً."],
    "Lexin007271": ["Fanjunkaren ledde soldaterna.", "قاد ضابط الصف الجنود."],
    "Lexin007282": ["Det var ett riktigt fanskap.", "كان شيئاً بغيضاً حقاً."],
    "Lexin007284": ["Fantasin skapade nya världar.", "خلق الخيال عوالم جديدة."],
    "Lexin007285": ["Fantasten älskade fotboll.", "أحب المتحمس كرة القدم."],
    "Lexin007289": ["Fantomet försvann.", "اختفى الشبح."],
    "Lexin007290": ["Han är en fantom på pianot.", "هو متفوق على البيانو."],
    "Lexin007304": ["Farföräldrarna bodde i Dalarna.", "سكن الجدان في دالارنا."],
    "Lexin007307": ["Farinen användes i bakning.", "استُخدم السكر الخام في الخبز."],
    "Lexin007309": ["Farkosten flög snabbt.", "طارت السفينة بسرعة."],
    "Lexin007310": ["Farleden markerades tydligt.", "تم تحديد المسار المائي بوضوح."]
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

const backupPath = DATA_FILE + '.backup_nouns16_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 1600 nouns!`);
