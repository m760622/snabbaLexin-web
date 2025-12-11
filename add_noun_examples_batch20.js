/**
 * Add examples to nouns - Batch 20 (100 nouns: Frilans to Förare) - 2000 MILESTONE!
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin008437": ["Frilansen arbetade hemifrån.", "عمل المستقل من البيت."],
    "Lexin008441": ["Friluftsområdet var populärt.", "كانت منطقة الهواء الطلق شائعة."],
    "Lexin008443": ["Frimuraren gick på möte.", "ذهب الماسوني إلى الاجتماع."],
    "Lexin008455": ["Friskintyget krävdes för jobbet.", "طُلبت شهادة الشفاء للعمل."],
    "Lexin008461": ["Frisksportaren levde hälsosamt.", "عاش الرياضي حياة صحية."],
    "Lexin008464": ["Frissan klippte håret.", "قصت الحلاقة الشعر."],
    "Lexin008465": ["Fristen gick ut.", "انتهت المهلة."],
    "Lexin008474": ["Frisyren var modern.", "كانت التسريحة عصرية."],
    "Lexin008479": ["Fritiden användes för sport.", "استُخدم وقت الفراغ للرياضة."],
    "Lexin008480": ["Fritidsgården hade aktiviteter.", "أقامت حديقة أوقات الفراغ نشاطات."],
    "Lexin008481": ["Fritidshemmet öppnade tidigt.", "فتحت دار الرعاية مبكراً."],
    "Lexin008483": ["Fritidshuset låg vid sjön.", "وقع بيت العطلة بجانب البحيرة."],
    "Lexin008485": ["Fritidsnämnden beslutade.", "قررت لجنة شؤون أوقات الفراغ."],
    "Lexin008488": ["Fritis stängde klockan sex.", "أغلقت دار الرعاية الساعة السادسة."],
    "Lexin008506": ["Till ingen fromma.", "دون فائدة."],
    "Lexin008512": ["Frossan skakade kroppen.", "هزت القشعريرة الجسم."],
    "Lexin008523": ["Frottén var mjuk.", "كان قماش الفروتيه ناعماً."],
    "Lexin008525": ["Frugan var hemma.", "كانت الزوجة في البيت."],
    "Lexin008539": ["Fruntimret gick förbi.", "مرت المرأة."],
    "Lexin008545": ["Frustrationen växte.", "نما الإحباط."],
    "Lexin008555": ["Frågeställningen var komplex.", "كان السؤال معقداً."],
    "Lexin008556": ["Frågetecknet saknades.", "فُقدت علامة الاستفهام."],
    "Lexin008570": ["Frånvaron noterades.", "سُجل الغياب."],
    "Lexin008574": ["Fräckisen fick skratt.", "أضحكت القصة الوقحة."],
    "Lexin008575": ["Fräknarna syntes i solen.", "ظهر النمش في الشمس."],
    "Lexin008584": ["Främlingen stannade.", "توقف الغريب."],
    "Lexin008585": ["Främlingspasset utfärdades.", "صدر جواز سفر الغرباء."],
    "Lexin008602": ["Fräsen bearbetade metallen.", "فرزت الفرازة المعدن."],
    "Lexin008616": ["Fröjden var stor.", "كان الابتهاج عظيماً."],
    "Lexin008618": ["Fröken undervisade klassen.", "درّست المعلمة الفصل."],
    "Lexin008624": ["Fuffenset avslöjades.", "كُشفت الحيلة."],
    "Lexin008640": ["Fulingen retade andra.", "أغاظ القبيح الآخرين."],
    "Lexin008651": ["Fullföljdshänvisningen förklarade överklagandet.", "شرحت إرشادات الاستئناف الطعن."],
    "Lexin008664": ["Fullkorn är nyttigt.", "الحبة الكاملة مفيدة."],
    "Lexin008666": ["Fullmakten undertecknades.", "وُقع التوكيل."],
    "Lexin008669": ["Fullmånen lyste.", "أضاء البدر."],
    "Lexin008674": ["I fullo.", "بالكامل."],
    "Lexin008680": ["Fullträffen vann priset.", "فازت الإصابة المحكمة بالجائزة."],
    "Lexin008688": ["Fundamentet var stabilt.", "كان الأساس ثابتاً."],
    "Lexin008691": ["Fundamentalisten tolkade texten bokstavligt.", "فسر الأصولي النص حرفياً."],
    "Lexin008698": ["Funkis var populärt.", "كان الأسلوب العملي شائعاً."],
    "Lexin008702": ["Funktionalismen dominerade.", "هيمنت الفعالية."],
    "Lexin008718": ["Funktionären hjälpte till.", "ساعد المساعد."],
    "Lexin008722": ["Furen användes för möbler.", "استُخدم خشب الصنوبر للأثاث."],
    "Lexin008723": ["Furan stod i skogen.", "وقفت شجرة الصنوبر في الغابة."],
    "Lexin008724": ["Furiren gav order.", "أعطى العريف الأوامر."],
    "Lexin008732": ["Fursten regerade landet.", "حكم العاهل البلاد."],
    "Lexin008733": ["Furun var ljus.", "كان خشب الصنوبر فاتحاً."],
    "Lexin008738": ["Fusionen skapade stort företag.", "أنشأ الاندماج شركة كبيرة."],
    "Lexin008739": ["Fusionen frigjorde energi.", "أطلق الاندماج النووي طاقة."],
    "Lexin008740": ["Fusket upptäcktes.", "اكتُشف الغش."],
    "Lexin008741": ["Fusket syns på arbetet.", "يظهر عدم الإتقان على العمل."],
    "Lexin008745": ["Futurum anger framtid.", "تشير صيغة المستقبل للمستقبل."],
    "Lexin008750": ["Fyllan gjorde honom yr.", "أدى السكر لدوخته."],
    "Lexin008756": ["Fylleriet straffades.", "عوقب السكر."],
    "Lexin008757": ["Fylleristen togs om hand.", "اعتُني بالسكران."],
    "Lexin008763": ["Fyllot väckte uppmärksamhet.", "لفت السكير الانتباه."],
    "Lexin008764": ["Fyndet var viktigt.", "كان الاكتشاف مهماً."],
    "Lexin008768": ["Fyndigheten var stor.", "كان المخزون كبيراً."],
    "Lexin008769": ["Fyren lyste långt.", "أضاءت المنارة بعيداً."],
    "Lexin008773": ["Fyrkanten ritades.", "رُسم الشكل الرباعي."],
    "Lexin008778": ["Fyrverkeriet lyste upp himlen.", "أضاءت الألعاب النارية السماء."],
    "Lexin008780": ["Fysiken förklarade fenomenet.", "فسرت الفيزياء الظاهرة."],
    "Lexin008807": ["Fållen syddes.", "خُيطت الحاشية."],
    "Lexin008809": ["Fånen förstod ingenting.", "لم يفهم الأحمق شيئاً."],
    "Lexin008811": ["Fånga tillfället.", "اغتنم الفرصة."],
    "Lexin008813": ["Fången flydde.", "هرب المسجون."],
    "Lexin008819": ["Fåntratten gjorde bort sig.", "أخطأ المعتوه."],
    "Lexin008828": ["Fårskallen lät sig luras.", "انخدع الأبله."],
    "Lexin008834": ["Fäet betade på ängen.", "رعى الحيوان الداجن في المرج."],
    "Lexin008836": ["Fäderneslandet försvarades.", "دُفع عن الموطن."],
    "Lexin008837": ["Fägringen var stor.", "كان الجمال عظيماً."],
    "Lexin008838": ["Fähunden fördömdes.", "أُدين الشرير."],
    "Lexin008850": ["Fältet plöjdes.", "حُرث الحقل."],
    "Lexin008851": ["Soldaterna drog ut i fält.", "خرج الجنود للحرب."],
    "Lexin008853": ["Fältassistenten besökte familjen.", "زار المساعد الميداني العائلة."],
    "Lexin008860": ["Fängelset var säkert.", "كان السجن آمناً."],
    "Lexin008867": ["Fänriken ledde plutonen.", "قاد الملازم الفصيلة."],
    "Lexin008871": ["Han var i färde.", "كان خائفاً."],
    "Lexin008884": ["Färdtjänsten hjälpte äldre.", "ساعدت خدمات النقل كبار السن."],
    "Lexin008888": ["Färgen målade väggen.", "طلى الصبغ الجدار."],
    "Lexin008889": ["Färgen var hjärter.", "كان اللون قلوب."],
    "Lexin008898": ["Färghandeln sålde penslar.", "باع محل الدهانات الفُرش."],
    "Lexin008907": ["Färsen stektes.", "قُليت اللحمة المفرومة."],
    "Lexin008916": ["Fästingen bet sig fast.", "تمسكت القرادة."],
    "Lexin008919": ["Fästmannen väntade.", "انتظر الخطيب."],
    "Lexin008920": ["Fästmön sa ja.", "قالت الخطيبة نعم."],
    "Lexin008921": ["Fästningen stod stark.", "صمد الحصن."],
    "Lexin008922": ["Födan var näringsrik.", "كان الغذاء مغذياً."],
    "Lexin008923": ["Födelsen firades.", "احتُفل بالولادة."],
    "Lexin008925": ["Födelsedatumet angavs.", "ذُكر تاريخ الميلاد."],
    "Lexin008926": ["Födelsekontrollen diskuterades.", "نُوقش تحديد النسل."],
    "Lexin008930": ["Födelsenumret ersattes av personnummer.", "استُبدل رقم الميلاد برقم الهوية."],
    "Lexin008943": ["Födseln gick bra.", "سارت الولادة بشكل جيد."],
    "Lexin008947": ["Fögderiet ansvarade för skatter.", "تولت منطقة الضرائب الضرائب."],
    "Lexin008948": ["Fölet sprang på ängen.", "ركض المهر في المرج."],
    "Lexin008962": ["Följeslagaren gick med.", "رافق رفيق الطريق."],
    "Lexin008963": ["Följetongen fortsatte.", "استمرت القصة المسلسلة."],
    "Lexin008991": ["Föraningen var stark.", "كان الهاجس قوياً."],
    "Lexin008998": ["Föraren körde försiktigt.", "قاد السائق بحذر."]
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

const backupPath = DATA_FILE + '.backup_nouns20_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`🎉🎉🎉 MILESTONE! 2000 nouns now have examples! 🎉🎉🎉`);
