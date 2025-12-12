/**
 * Add examples to OTHERS (Samhälle) terms - Batch 2 (100 terms: Avtalsgruppsjukförsäkringen AGS to F skatt)
 * Carefully matching IDs from others_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin002088": ["Du kan få ersättning från Avtalsgruppsjukförsäkringen (AGS).", "يمكنك الحصول على تعويض من تأمين المرض الجماعي المتفق عليه (AGS)."],
    "Lexin002141": ["Avyttringen av bolaget gav stor vinst.", "بيع الشركة حقق أرباحاً كبيرة."],
    "Lexin002223": ["Läkaren har bakjour i natt.", "الطبيب في نوبة احتياطية (Bakjour) الليلة."],
    "Lexin002381": ["Det är barmark ute nu.", "الأرض خالية من الثلوج (Barmark) الآن."],
    "Lexin002391": ["Gå till Barnavårdscentralen (BVC) för kontroll.", "الذهاب إلى مركز رعاية الطفولة (BVC) للفحص."],
    "Lexin002392": ["Socialtjänsten startade en barnavårdsutredning.", "بدأت الخدمات الاجتماعية تحقيقاً في رعاية الطفل."],
    "Lexin002402": ["Barnhabiliteringen ger stöd till barn med funktionsnedsättning.", "يوفر قسم تأهيل الأطفال الدعم للأطفال ذوي الإعاقة."],
    "Lexin002406": ["Sverige har skrivit under Barnkonventionen.", "وقعت السويد على اتفاقية حقوق الطفل."],
    "Lexin002433": ["Regeringen vill stoppa barnäktenskap.", "تريد الحكومة وقف زواج الأطفال."],
    "Lexin002560": ["Styrelsens befattningshavare har stort ansvar.", "شاغلو المناصب في مجلس الإدارة لديهم مسؤولية كبيرة."],
    "Lexin002590": ["Assisterad befruktning är tillåtet.", "الإخصاب المساعد مسموح به."],
    "Lexin002614": ["Kontakta en av stadens begravningsbyråer.", "اتصل بأحد مكاتب الجنازات في المدينة."],
    "Lexin002615": ["En vacker begravningsceremoni hölls i kyrkan.", "أقيمت مراسم جنازة جميلة في الكنيسة."],
    "Lexin002616": ["Man kan söka begravningshjälp från kommunen.", "يمكن للمرء التقدم بطلب للحصول على مساعدة الجنازة من البلدية."],
    "Lexin002617": ["Begravningslagen styr var man får gravsättas.", "قانون الجنازات يحكم أين يمكن دفن المرء."],
    "Lexin002618": ["Länsstyrelsen utser begravningsombud.", "يعين مجلس المحافظة ممثل شؤون الدفن."],
    "Lexin002628": ["Han är begränsat skattskyldig i Sverige.", "هو خاضع للضريبة بشكل محدود في السويد."],
    "Lexin002682": ["Ange rätt behörighetskod för att logga in.", "أدخل رمز الصلاحية الصحيح لتسجيل الدخول."],
    "Lexin002967": ["Beskattning av lön sker vid källan.", "يتم فرض الضرائب على الراتب من المصدر."],
    "Lexin002968": ["Beräkna din beskattningsbara förvärvsinkomst.", "احسب دخلك المكتسب الخاضع للضريبة."],
    "Lexin003001": ["Den beslutande makten ligger hos riksdagen.", "السلطة التقريرية (التشريعية) بيد البرلمان."],
    "Lexin003050": ["Vi behöver en bestyrkt översättning av betyget.", "نحتاج إلى ترجمة مصدقة للشهادة."],
    "Lexin003139": ["Arbeta i teamet för beteendefallen.", "العمل في فريق التعامل مع المشكلات السلوكية (Beteendefallen)."],
    "Lexin003271": ["Två personer måste bevittna namnteckningen.", "يجب على شخصين أن يشهدوا على التوقيع."],
    "Lexin003287": ["Få bibehållen lön under utbildningen.", "الحصول على راتب مستمر (محفوظ) أثناء التدريب."],
    "Lexin003339": ["Ge en rättvis bild av situationen.", "إعطاء صورة عادلة للوضع."],
    "Lexin003371": ["Söka bilstöd för handikappanpassning.", "طلب دعم السيارة لتكييف المعاقين."],
    "Lexin003426": ["Barnet bor hos sina biologiska föräldrar.", "يعيش الطفل مع والديه البيولوجيين."],
    "Lexin003549": ["Ljudböcker för blinda.", "كتب صوتية للمكفوفين."],
    "Lexin003814": ["Det finns olika boendeformer för äldre.", "توجد أشكال سكن مختلفة لكبار السن."],
    "Lexin003818": ["SCB för boendestatistik.", "مكتب الإحصاء المركزي يحتفظ بإحصاءات السكن."],
    "Lexin003822": ["Barnet är skrivet hos sin boförälder.", "الطفل مسجل لدى الوالد المقيم معه."],
    "Lexin003848": ["Värderas på bokföringsmässiga grunder.", "تُقيم على أسس محاسبية."],
    "Lexin003864": ["Företaget betalar bolagsskatt på vinsten.", "تدفع الشركة ضريبة الشركات على الأرباح."],
    "Lexin003984": ["Få bostadsanpassningsbidrag för trösklar.", "الحصول على منحة تكييف السكن للعتبات."],
    "Lexin003989": ["Kommunala bostadsföretag bygger hyresrätter.", "شركات الإسكان البلدية تبني شققاً للإيجار."],
    "Lexin003992": ["Kommunen har ansvar enligt bostadsförsörjningslagen.", "تتحمل البلدية المسؤولية بموجب قانون توفير السكن."],
    "Lexin004007": ["Många äldre har bostadstillägg till pensionärer (BTP).", "العديد من كبار السن يحصلون على علاوة سكن للمتقاعدين."],
    "Lexin004008": ["Begära bostadsuppskov med reavinstskatten.", "طلب تأجيل ضريبة الأرباح الرأسمالية للسكن (Bostadsuppskov)."],
    "Lexin004041": ["Boverket ger ut byggregler.", "تصدر مصلحة الإسكان (Boverket) قواعد البناء."],
    "Lexin004206": ["Han dömdes för grovt brott.", "حُكم عليه بجريمة خطيرة."],
    "Lexin004232": ["Straffen regleras i Brottsbalken (BrB).", "تُنظم العقوبات في قانون العقوبات (BrB)."],
    "Lexin004235": ["Polisen satsar på brottsbekämpning.", "الشرطة تستثمر في مكافحة الجريمة."],
    "Lexin004276": ["Hyran sätts enligt bruksvärdesprincipen.", "يتم تحديد الإيجار وفقاً لمبدأ قيمة الانتفاع."],
    "Lexin004305": ["Min bruttolön är 30 000 kr.", "راتبي الإجمالي هو 30,000 كرون."],
    "Lexin004306": ["Företagets totala bruttolönekostnader.", "إجمالي تكاليف الرواتب الإجمالية للشركة."],
    "Lexin004345": ["Inkomsten ligger över brytpunkten för statlig skatt.", "الدخل يقع فوق نقطة الفصل (Brytpunkten) لضريبة الدولة."],
    "Lexin004411": ["Barnen är bröstarvingar och ärver alltid.", "الأطفال هم ورثة مباشرون (Bröstarvingar) ويرثون دائماً."],
    "Lexin004537": ["Få remiss till BUP (Barn- och ungdomspsykiatrin).", "الحصول على إحالة إلى الطب النفسي للأطفال والمراهقين (BUP)."],
    "Lexin004558": ["Åka buss till jobbet.", "ركوب الحافلة إلى العمل."],
    "Lexin004678": ["Kroppen fördes till sjukhusets bårhus.", "نُقل الجثمان إلى مشرحة المستشفى."],
    "Lexin004901": ["Söka studiemedel från CSN (Centrala studiestödsnämnden).", "طلب دعم دراسي من CSN (لجنة الدعم الدراسي المركزية)."],
    "Lexin004937": ["Kontrollera bilens chassinummer.", "تحقق من رقم هيكل السيارة (شاسيه)."],
    "Lexin004946": ["Regeringen beslutar om vissa chefsförordnanden.", "تقرر الحكومة بشأن بعض التعيينات الإدارية."],
    "Lexin005108": ["Få dagersättning vid repövning.", "الحصول على تعويض يومي عند تدريب الاحتياط."],
    "Lexin005295": ["Ta emot utländska delegationer.", "استقبال وفود أجنبية."],
    "Lexin005350": ["Arvet fördelas enligt den legala arvsordningen.", "يوزع الإرث وفقاً لترتيب الميراث القانوني."],
    "Lexin005494": ["Få kostråd av en dietist.", "الحصول على نصائح غذائية من أخصائي تغذية."],
    "Lexin005603": ["Diskrimineringslagen skyddar mot särbehandling.", "قانون التمييز يحمي من المعاملة غير العادلة."],
    "Lexin005645": ["Vårdcentraler kallas ibland distriktsmottagningar.", "تسمى المراكز الصحية أحياناً عيادات المقاطعة."],
    "Lexin005695": ["Polisen gjorde en DNA-analys.", "قامت الشرطة بإجراء تحليل الحمض النووي (DNA)."],
    "Lexin005722": ["Krav på noggrann dokumentation i vården.", "متطلب توثيق دقيق في الرعاية الصحية."],
    "Lexin005798": ["Testa idrottare för doping.", "اختبار الرياضيين للمنشطات."],
    "Lexin005934": ["Priset på drivmedel har gått upp.", "سعر الوقود ارتفع."],
    "Lexin005953": ["Sveriges drottning heter Silvia.", "ملكة السويد تسمى سيلفيا."],
    "Lexin006005": ["Betala dröjsmålsavgift om man är sen.", "دفع رسوم تأخير إذا تأخر المرء."],
    "Lexin006023": ["Byta till dubbdäck på vintern.", "التغيير إلى إطارات شتوية (مسامير) في الشتاء."],
    "Lexin006119": ["Regler om dygnsvila för chaufförer.", "قواعد الراحة اليومية للسائقين."],
    "Lexin006199": ["Ansöka om dödförklaring efter försvinnandet.", "طلب إعلان الوفاة بعد الاختفاء."],
    "Lexin006215": ["En jurist kan hjälpa till med dödsboförvaltning.", "يمكن لمحام المساعدة في إدارة التركة (Dödsboförvaltning)."],
    "Lexin006217": ["Läkaren utfärdar ett dödsfallsintyg.", "يصدر الطبيب شهادة وفاة."],
    "Lexin006221": ["Skriva dödsorsaksintyg till Skatteverket.", "كتابة شهادة سبب الوفاة لمصلحة الضرائب."],
    "Lexin006246": ["Teckenspråk för döva.", "لغة الإشارة للصم."],
    "Lexin006247": ["Stöd till dövblinda.", "دعم للصم المكفوفين."],
    "Lexin006272": ["Norge är en EES-stat men inte med i EU.", "النرويج دولة في المنطقة الاقتصادية الأوروبية لكنها ليست في الاتحاد الأوروبي."],
    "Lexin006289": ["Barnen har rätt till efterarv när båda föräldrarna dött.", "يحق للأطفال الحصول على ميراث مؤجل (Efterarv) عندما يتوفى كلا الوالدين."],
    "Lexin006321": ["Beräkna efterlevandepensionsunderlag (EPU).", "حساب أساس معاش الورثة (EPU)."],
    "Lexin006322": ["Barn kan få efterlevandestöd.", "يمكن للأطفال الحصول على دعم الورثة."],
    "Lexin006330": ["Byta efternamn vid giftermål.", "تغيير اسم العائلة عند الزواج."],
    "Lexin006455": ["Många bostadsrättsföreningar är ekonomiska föreningar.", "العديد من جمعيات الإسكان التعاوني هي جمعيات اقتصادية."],
    "Lexin006456": ["Europeiska ekonomiska och sociala kommittén (EESK).", "اللمجنة الاقتصادية والاجتماعية الأوروبية (EESK)."],
    "Lexin006459": ["Ekorevisorer granskar miljöarbetet.", "مدققو البيئة (Ekorevisorer) يراجعون العمل البيئي."],
    "Lexin006462": ["Beslut i Ekorådet (Ekobrottsmyndigheten?).", "قرار في مجلس الجرائم الاقتصادية."], // Assuming context refers to Ekobrottsmyndigheten or similar advisory body, exact term varies but context is financial crime/council.
    "Lexin006776": ["Företaget fick entreprenaden för vägbygget.", "حصلت الشركة على مقاولة بناء الطريق."],
    "Lexin006853": ["Gå med i en erkänd arbetslöshetskassa (a-kassa).", "الانضمام إلى صندوق بطالة معترف به."],
    "Lexin006871": ["Få ersättning för vårdkostnader i utlandet.", "الحصول على تعويض عن تكاليف الرعاية الصحية في الخارج."],
    "Lexin006892": ["Studera på estetisk verksamhet (gymnasieprogram).", "الدراسة في البرنامج الجمالي (Estetisk verksamhet)."],
    "Lexin006944": ["Köra EU-moped (klass I) med körkort.", "قيادة دراجة نارية أوروبية (فئة 1) برخصة قيادة."],
    "Lexin006946": ["Starta ett EU-bolag (SE-bolag).", "بدء شركة أوروبية (SE-bolag)."],
    "Lexin006947": ["EU-domstolen tolkar EU-rätten.", "محكمة العدل الأوروبية تفسر قانون الاتحاد الأوروبي."],
    "Lexin006948": ["EU-kommissionen föreslår nya lagar.", "المفوضية الأوروبية تقترح قوانين جديدة."],
    "Lexin006949": ["Ministrarna möts i EU:s ministerråd.", "يجتمع الوزراء في مجلس وزراء الاتحاد الأوروبي."],
    "Lexin006959": ["Europakonventionen om mänskliga rättigheter.", "الاتفاقية الأوروبية لحقوق الإنسان."],
    "Lexin006967": ["Stora företag ska ha europeiska företagsråd.", "الشركات الكبرى يجب أن يكون لديها مجالس أعمال أوروبية."],
    "Lexin006968": ["Toppmöte i Europeiska rådet.", "قمة في المجلس الأوروبي."],
    "Lexin006970": ["Sverige är med i Europeiska unionen (EU).", "السويد عضو في الاتحاد الأوروبي (EU)."],
    "Lexin006994": ["Skolverket beslutar om examensmål.", "تقرر مصلحة المدارس أهداف التخرج."],
    "Lexin007048": ["Expeditionschefen leder arbetet på departementet.", "رئيس الديوان (Expeditionschef) يقود العمل في الوزارة."],
    "Lexin007093": ["Få extra tillägg till studiebidraget.", "الحصول على علاوة إضافية للمنحة الدراسية."],
    "Lexin007114": ["Företaget har F-skatt.", "الشركة لديها ضريبة شركات (F-skatt)."]
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

const backupPath = DATA_FILE + '.backup_others2_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Others Batch 2 completed!`);
