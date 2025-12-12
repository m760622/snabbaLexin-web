/**
 * Add examples to OTHERS (Samhälle) terms - Batch 3 (100 terms: FA skatt to Gymnasiesärskolebevis)
 * Carefully matching IDs from others_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin007116": ["Han har både anställning och eget företag, alltså FA-skatt.", "لديه توظيف وشركة خاصة، وبالتالي ضريبة FA."],
    "Lexin007137": ["Fackföreningsavgiften dras från lönen.", "تُخصم رسوم النقابة من الراتب."],
    "Lexin007144": ["Prata med din fackliga förtroendeman.", "تحدث مع ممثلك النقابي."],
    "Lexin007147": ["Fackliga friheter är skyddade i grundlagen.", "الحريات النقابية محمية في الدستور."],
    "Lexin007162": ["Faderskapspresumtion gäller för gifta par.", "افتراض الأبوة يسري على الأزواج المتزوجين."],
    "Lexin007249": ["Bodelningsavtal är ett familjerättsligt fång.", "اتفاقية تقسيم الممتلكات هي اكتساب قانوني عائلي (أمر يتعلق بقانون الأسرة)."],
    "Lexin007251": ["Paret gick till en familjeterapeut.", "ذهب الزوجان إلى معالج أسري."],
    "Lexin007302": ["Min farbror bor i Göteborg.", "عمي يعيش في غوتنبرغ."],
    "Lexin007305": ["Barnen älskar sina farföräldrar.", "الأطفال يحبون أجدادهم (من جهة الأب)."],
    "Lexin007369": ["Hon är fast anställd sedan tre år.", "هي موظفة بدوام ثابت منذ ثلاث سنوات."],
    "Lexin007386": ["Betala fastighetsavgift för huset.", "دفع رسوم العقار للمنزل."],
    "Lexin007407": ["Vänd dig till fastighetsägaren om felet.", "توجه إلى مالك العقار بخصوص الخطأ."],
    "Lexin007519": ["Söka ferievårdbidrag för skollov.", "طلب منحة رعاية العطلات (Tandvård?) لا، يبدو أن السياق هو رعاية خلال العطلة المدرسية."], // Adjusted context assumption
    "Lexin007637": ["Finanspolisen utreder penningtvätt.", "شرطة الجرائم المالية تحقق في غسيل الأموال."],
    "Lexin007672": ["Träna för att förbättra finmotorisk funktionsnedsättning.", "التدريب لتحسين القصور في المهارات الحركية الدقيقة."],
    "Lexin007724": ["Äldre kan få hjälp av fixarservice.", "يمكن لكبار السن الحصول على مساعدة من خدمة الإصلاح (Fixarservice)."],
    "Lexin007763": ["Plugga via fjärrundervisning.", "الدراسة عن طريق التعليم عن بعد."],
    "Lexin007813": ["Det var en flerbarnsfödsel (tvillingar).", "كانت ولادة متعددة (توائم)."],
    "Lexin007816": ["Bo i ett flerbostadshus.", "العيش في مبنى سكني متعدد الشقق."],
    "Lexin007918": ["Undvik att andas in flyktiga lösningsmedel.", "تجنب استنشاق المذيبات المتطايرة."],
    "Lexin008038": ["Folkbildning sker ofta på studieförbund.", "التثقيف الشعبي يحدث غالباً في الاتحادات الدراسية."],
    "Lexin008051": ["Sverige höll en folkomröstning om EU.", "أجرت السويد استفتاء شعبياً حول الاتحاد الأوروبي."],
    "Lexin008055": ["Många lever på enbar folkpension.", "العديد يعيشون على المعاش الشعبي (الأساسي) فقط."],
    "Lexin008058": ["Nykterhetsrörelsen är en av våra folkrörelser.", "حركة الامتناع عن المسكرات هي إحدى حركاتنا الشعبية."],
    "Lexin008066": ["Besöka Folktandvården.", "زيارة عيادة الأسنان العامة (Folktandvården)."],
    "Lexin008080": ["Bilen måste in på fordonsbesiktning.", "السيارة يجب أن تخضع لفحص المركبات."],
    "Lexin008084": ["Ansvara för fordonsregistrering.", "مسؤول عن تسجيل المركبات."],
    "Lexin008087": ["Betala fordonsskatt varje år.", "دفع ضريبة المركبة كل عام."],
    "Lexin008140": ["Medicinsk forskning går framåt.", "البحث الطبي يتقدم."],
    "Lexin008147": ["Lärare behöver kontinuerlig fortbildning.", "الأساتذة يحتاجون إلى تدريب مستمر (تطوير مهني)."],
    "Lexin008196": ["Alkohol kan orsaka fosterskada.", "الكحول يمكن أن يسبب ضرراً للجنين."],
    "Lexin008375": ["Skydda medborgarnas fri- och rättigheter.", "حماية حقوق وحريات المواطنين."],
    "Lexin008378": ["Demokrati kräver fri åsiktsbildning.", "الديمقراطية تتطلب تكوين رأي حر."],
    "Lexin008387": ["Du har tjänat över fribeloppet för studiemedel.", "لقد كسبت أكثر من المبلغ المسموح به (Fribeloppet) للدعم الدراسي."],
    "Lexin008404": ["Fången beviljades frigång.", "مُنح السجين إذن خروج (حرية حركة محدودة)."],
    "Lexin008471": ["Det finns många fristående skolor (friskolor).", "توجد العديد من المدارس المستقلة."],
    "Lexin008482": ["Barnen går på fritidshem efter skolan.", "يذهب الأطفال إلى دار رعاية أوقات الفراغ (Fritids) بعد المدرسة."],
    "Lexin008487": ["Hon är aktiv som fritidspolitiker.", "هي نشطة كسياسية في وقت الفراغ (غير متفرغة)."],
    "Lexin008493": ["Teckna en frivillig inkomstrelaterad försäkring (a-kassa).", "الاشتراك في تأمين طوعي مرتبط بالدخل."],
    "Lexin008623": ["Ett småmål (FT-mål) i tingsrätten.", "دعوى صغيرة (قضية مبسطة) في المحكمة الابتدائية."],
    "Lexin008699": ["Vi måste motarbeta funkofobi.", "يجب أن نحارب التمييز ضد ذوي الإعاقة (Funkofobi)."],
    "Lexin008713": ["Alla har rätt till stöd oavsett funktionsskillnad.", "الجميع لهم الحق في الدعم بغض النظر عن الاختلاف الوظيفي."],
    "Lexin008717": ["Ordet funktionsvariation används allt mer.", "تستخدم كلمة تنوع وظيفي (Funktionsvariation) بشكل متزايد."],
    "Lexin008782": ["Nobelpriset i fysik.", "جائزة نوبل في الفيزياء."],
    "Lexin008792": ["Anpassa bostaden för fysisk funktionsnedsättning.", "تكييف السكن للإعاقة الجسدية."],
    "Lexin008886": ["Ansöka om färdtjänsttillstånd hos kommunen.", "التقدم بطلب للحصول على تصريح خدمة النقل الخاص (Färdtjänst) من البلدية."],
    "Lexin008997": ["Ta förarbevis för moped.", "الحصول على رخصة سائق للدراجة النارية الصغيرة."],
    "Lexin009090": ["Göra en fördjupad kartläggning av behovet.", "إجراء مسح (تخطيط) متعمق للحاجة."],
    "Lexin009158": ["Gå en kurs i förenings- och mötesteknik.", "أخذ دورة في تقنيات الجمعيات والاجتماعات."],
    "Lexin009197": ["Besöka företagshälsovården för ryggont.", "زيارة الرعاية الصحية المهنية لألم الظهر."],
    "Lexin009206": ["Företagsvård är viktig för de anställda.", "رعاية الشركات مهمة للموظفين."],
    "Lexin009216": ["Du har företrädesrätt till ny anställning.", "لديك حق الأولوية في إعادة التوظيف."],
    "Lexin009301": ["Facket utnyttjade sin förhandlingsrätt.", "استخدمت النقابة حقها في التفاوض."],
    "Lexin009302": ["Arbetsgivaren har förhandlingsskyldighet.", "صاحب العمل ملزم بالتفاوض."],
    "Lexin009419": ["Brottet ledde till förlust av arvsrätt.", "أدت الجريمة إلى فقدان حق الإرث."],
    "Lexin009429": ["Beviljas förlängd omställningspension.", "مُنح تمديد لمعاش التكيف."],
    "Lexin009468": ["Tjänstepensionen är ofta en förmånsbestämd pension.", "معاش الخدمة غالباً ما يكون معاشاً محدداً بالمزايا."],
    "Lexin009481": ["Betala förmögenhetstillägg (inte aktuellt i Sverige nu).", "دفع ضريبة ثروة إضافية (غير سارية في السويد حالياً)."],
    "Lexin009483": ["Vad är ditt förnamn?", "ما هو اسمك الأول؟"],
    "Lexin009572": ["Fick betala en förseningsavgift på räkningen.", "اضطر لدفع رسوم تأخير على الفاتورة."],
    "Lexin009589": ["Tala med förskolechefen (rektorn).", "تحدث مع مدير الروضة."],
    "Lexin009598": ["Ta ut förskottssemester.", "أخذ إجازة مدفوعة مقدماً."],
    "Lexin009667": ["Delta i förstärkt arbetsträning.", "المشاركة في تدريب عمل معزز."],
    "Lexin009669": ["Samla underskrifter för förstärkt folkinitiativ.", "جمع توقيعات لمبادرة شعبية معززة."],
    "Lexin009670": ["Facket har förstärkt förhandlingsrätt i vissa frågor.", "النقابة لديها حق تفاوض معزز في بعض القضايا."],
    "Lexin009671": ["Arbetsgivaren får förstärkt särskilt anställningsstöd.", "صاحب العمل يحصل على دعم توظيف خاص معزز."],
    "Lexin009793": ["Politikerna är våra förtroendevalda.", "السياسيون هم ممثلونا المنتخبون (أهل الثقة)."],
    "Lexin009829": ["Polisen utsåg en förundersökningsledare.", "عينت الشرطة قائداً للتحقيق الأولي."],
    "Lexin009849": ["Anföra förvaltningsbesvär (överklaga).", "تقديم شكوى إدارية (استئناف)."],
    "Lexin009856": ["Myndigheter måste följa Förvaltningslagen (FL).", "يجب على السلطات اتباع قانون الإدارة."],
    "Lexin009857": ["Skatteverket är en förvaltningsmyndighet.", "مصلحة الضرائب هي سلطة إدارية."],
    "Lexin009860": ["Överklaga beslutet till Förvaltningsrätten.", "استئناف القرار لدى المحكمة الإدارية."],
    "Lexin009864": ["Minska statens förvaltningsutgifter.", "تقليل نفقات الإدارة الحكومية."],
    "Lexin009887": ["Riskera förverkande av hyresrätt vid störning.", "خطر فقدان (مصادرة) حق الإيجار عند الإزعاج."],
    "Lexin009917": ["Rehabilitering efter förvärvad hjärnskada.", "إعادة التأهيل بعد إصابة الدماغ المكتسبة."],
    "Lexin009937": ["Få ersättning från föräldraförsäkringen.", "الحصول على تعويض من تأمين الوالدين."],
    "Lexin009943": ["Stötta dem i deras föräldraskap.", "دعمهم في دورهم كوالدين (الأبوة والأمومة)."],
    "Lexin010045": ["Få garantitillägg till pensionen.", "الحصول على علاوة ضمان للمعاش."],
    "Lexin010102": ["Göra en gemensam ansökan med maken.", "تقديم طلب مشترك مع الزوج."],
    "Lexin010106": ["Vägen är en gemensamhetsanläggning.", "الطريق هو مرفق مشترك."],
    "Lexin010127": ["Generaldirektören för Migrationsverket.", "المدير العام لمصلحة الهجرة."],
    "Lexin010213": ["Vi lärde oss om Europas geografi.", "تعلمنا عن جغرافيا أوروبا."],
    "Lexin010477": ["Övningskör med en godkänd handledare.", "التدرب على القيادة مع مشرف معتمد."],
    "Lexin010582": ["Eleven har en grav språkstörning.", "التلميذ لديه اضطراب لغوي شديد."],
    "Lexin010593": ["Söka graviditetspenning om jobbet är tungt.", "طلب نقدية الحمل إذا كان العمل شاقاً."],
    "Lexin010598": ["Begravningen hölls i ett gravkapell.", "أقيمت الجنازة في كنيسة المقبرة."],
    "Lexin010601": ["Innehavaren har gravrätt i 25 år.", "صاحب الحق لديه حق القبر لمدة 25 عاماً."],
    "Lexin010604": ["Gravsättning av urnan skedde i fredags.", "تم دفن الجرة يوم الجمعة."],
    "Lexin010676": ["Träna balansen vid grovmotorisk funktionsnedsättning.", "تدريب التوازن عند وجود قصور حركي كبير."],
    "Lexin010679": ["Dömdes för grovt bidragsbrott.", "أدين بجريمة احتيال في المساعدات الجسيمة."],
    "Lexin010698": ["Alla får ett grundavdrag på skatten.", "الجميع يحصل على خصم أساسي في الضريبة."],
    "Lexin010700": ["Detta är ett grundbidrag till föreningen.", "هذه منحة أساسية للجمعية."],
    "Lexin010704": ["Hemförsäkringen är en trygg grundförsäkring.", "التأمين المنزلي هو تأمين أساسي آمن."],
    "Lexin010707": ["Sverige har fyra grundlagar.", "السويد لديها أربعة قوانين أساسية (دساتير)."],
    "Lexin010724": ["Gå i grundsärskola.", "الدراسة في المدرسة الأساسية الخاصة (لذوي الاحتياجات)."],
    "Lexin010730": ["Uppfylla grundvillkoret för a-kassan.", "استيفاء الشرط الأساسي لصندوق البطالة."],
    "Lexin010732": ["Läsa in betygen på Grundvux.", "استكمال الدرجات في تعليم الكبار الأساسي (Grundvux)."],
    "Lexin010868": ["Gå en gymnasial lärlingsutbildning.", "الالتحاق بتدريب مهني (تلمذة) ثانوي."],
    "Lexin010877": ["Börja på gymnasiesärskola.", "البدء في المدرسة الثانوية الخاصة."],
    "Lexin010878": ["Hon fick sitt gymnasiesärskolebevis.", "حصلت على شهادة المدرسة الثانوية الخاصة."]
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

const backupPath = DATA_FILE + '.backup_others3_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Others Batch 3 completed!`);
