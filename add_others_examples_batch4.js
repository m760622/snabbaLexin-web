/**
 * Add examples to OTHERS (Samhälle) terms - Batch 4 (100 terms: Gynna to Kontrollavgift)
 * Carefully matching IDs from others_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin010893": ["Beslutet gynnar småföretagare.", "القرار يفيد أصحاب المشاريع الصغيرة."],
    "Lexin010947": ["Skriv ett gåvobrev när du ger bort huset.", "اكتب سند هبة عند التبرع بالمنزل."],
    "Lexin010951": ["Gåvor mellan makar måste registreras.", "الهدايا بين الزوجين يجب أن تُسجل."],
    "Lexin011066": ["Köra på halkbana under körkortsutbildningen.", "القيادة على مسار زلق (Halkbana) أثناء تدريب القيادة."],
    "Lexin011185": ["Få stöd för sitt handikapp (funktionsnedsättning).", "الحصول على دعم للإعاقة."],
    "Lexin011204": ["Offentlighetsprincipen kallas också handlingsoffentlighet.", "مبدأ العلنية يسمى أيضاً علانية الوثائق."],
    "Lexin011243": ["Sjukhuset har strikta regler för hantering av riskavfall.", "للمستشفى قواعد صارمة للتعامل مع النفايات الخطرة."],
    "Lexin011276": ["Polisen rapporterade många hastighetsöverträdelser.", "أبلغت الشرطة عن العديد من مخالفات السرعة."],
    "Lexin011354": ["De är helsyskon (samma mamma och pappa).", "هم أشقاء (نفس الأم والأب)."],
    "Lexin011370": ["Lära sig laga mat i hem- och konsumentkunskap.", "تعلم الطهي في مادة التدبير المنزلي وشؤون المستهلك."],
    "Lexin011452": ["Flyktingar kan få hemutrustningslån från CSN.", "يمكن للاجئين الحصول على قرض تجهيز منزلي من CSN."],
    "Lexin011517": ["Göra en hindersprövning innan vigseln.", "إجراء فحص موانع الزواج قبل الزفاف."],
    "Lexin011519": ["Skatteverket utfärdar hindersprövningsbevis.", "تصدر مصلحة الضرائب شهادة فحص موانع الزواج."],
    "Lexin011549": ["Studera Sveriges historia.", "دراسة تاريخ السويد."],
    "Lexin011560": ["Du har rätt till hittelön om du hittar plånboken.", "لك الحق في مكافأة العثور (Hittelön) إذا وجدت المحفظة."],
    "Lexin011894": ["Ungdomen placerades på ett HVB-boende.", "وُضع الشاب في سكن رعاية وعلاج (HVB)."],
    "Lexin011953": ["Betala hyra varje månad.", "دفع الإيجار كل شهر."],
    "Lexin011962": ["Jag är hyresgäst hos kommunala bostadsbolaget.", "أنا مستأجر لدى شركة الإسكان البلدية."],
    "Lexin011969": ["Hyreslagen reglerar förhållandet mellan värd och hyresgäst.", "قانون الإيجار ينظم العلاقة بين المالك والمستأجر."],
    "Lexin011973": ["Vända sig till Hyresnämnden vid tvist.", "التوجه إلى لجنة الإيجارات في حال النزاع."],
    "Lexin011976": ["Hamna i en hyrestvist med värden.", "الوقوع في نزاع إيجار مع المالك."],
    "Lexin012161": ["Vården styrs av Hälso- och sjukvårdslagen (HSL).", "تُحكم الرعاية الصحية بقانون الرعاية الصحية والطبية (HSL)."],
    "Lexin012163": ["Fyll i en hälsodeklaration inför försäkringen.", "املأ إقراراً صحياً للتأمين."],
    "Lexin012198": ["Företaget tecknade hängavtal med facket.", "وقعت الشركة اتفاقية ملحقة (Hängavtal) مع النقابة."],
    "Lexin012326": ["Naturvetenskapsprogrammet är ett högskoleförberedande program.", "برنامج العلوم الطبيعية هو برنامج تحضيري للجامعة."],
    "Lexin012327": ["Skriva högskoleprovet för att komma in på universitetet.", "كتابة اختبار القدرات الجامعية (Högskoleprovet) لدخول الجامعة."],
    "Lexin012399": ["Det finns hjälpmedel för hörselskadade.", "توجد وسائل مساعدة لضعاف السمع."],
    "Lexin012412": ["Skolan börjar på höstterminen.", "تبدأ المدرسة في فصل الخريف."],
    "Lexin012483": ["Visa giltig identitetshandling (ID-kort).", "إبراز وثيقة هوية سارية (بطاقة الهوية)."],
    "Lexin012498": ["Vi har lektion i idrott och hälsa (gymnastik).", "لدينا درس في الرياضة والصحة."],
    "Lexin012612": ["Få inackorderingstillägg om man bor på annan ort.", "الحصول على علاوة إقامة (Inackorderingstillägg) إذا سكن المرء في منطقة أخرى (للدراسة)."],
    "Lexin012646": ["Makar kan skriva ett inbördes testamente.", "يمكن للزوجين كتابة وصية متبادلة."],
    "Lexin012655": ["Skattesänkningen är ett incitament för att jobba.", "تخفيض الضرائب هو حافز للعمل."],
    "Lexin012676": ["Jobba inom individ- och familjeomsorg (IFO).", "العمل في رعاية الأفراد والأسر (IFO)."],
    "Lexin012681": ["Göra en individuell behandlingsplan.", "وضع خطة علاج فردية."],
    "Lexin012682": ["Eleven har en individuell studieplan.", "الطالب لديه خطة دراسية فردية."],
    "Lexin012742": ["Yttrandefrihet och informationsfrihet hör ihop.", "حرية التعبير وحرية المعلومات مترابطان."],
    "Lexin012789": ["Företaget får dra av ingående moms.", "يمكن للشركة خصم ضريبة القيمة المضافة المدخلة."],
    "Lexin012840": ["Försäkringen täcker inkomstförlust vid sjukdom.", "يغطي التأمين خسارة الدخل عند المرض."],
    "Lexin012842": ["Den allmänna pensionen är inkomstrelaterad pension.", "المعاش العام هو معاش مرتبط بالدخل."],
    "Lexin012843": ["Betala inkomstskatt till kommunen.", "دفع ضريبة الدخل للبلدية."],
    "Lexin012844": ["Skatten beräknas enligt Inkomstskattelagen (IL).", "تُحسب الضريبة وفقاً لقانون ضريبة الدخل (IL)."],
    "Lexin012845": ["Det finns tre inkomstslag: tjänst, kapital och näringsverksamhet.", "توجد ثلاثة أنواع للدخل: الوظيفة، رأس المال، والنشاط التجاري."],
    "Lexin012990": ["Skicka lagfartsansökan till Inskrivningsmyndigheten (Lantmäteriet).", "أرسل طلب تثبيت الملكية إلى سلطة التسجيل (Lantmäteriet)."],
    "Lexin013083": ["Du kan inteckna huset för att ta lån.", "يمكنك رهن المنزل للحصول على قرض."],
    "Lexin013095": ["Värna om den personliga integriteten.", "حماية السلامة الشخصية (الخصوصية)."],
    "Lexin013101": ["Stöd till personer med intellektuell funktionsnedsättning.", "دعم للأشخاص ذوي الإعاقة الذهنية."],
    "Lexin013127": ["Intern revision granskar företagets rutiner.", "المراجعة الداخلية تدقق في إجراءات الشركة."],
    "Lexin013130": ["Bo på internat under skoltiden.", "العيش في سكن داخلي أثناء الدراسة."],
    "Lexin013160": ["Det finns ett intjänandetak för pensionen.", "يوجد سقف كسب للمعاش التقاعدي."],
    "Lexin013161": ["Pensionsrätten baseras på intjänandeåret.", "حق المعاش يستند إلى سنة الكسب."],
    "Lexin013189": ["Nyanlända kan gå introduktionsprogram på gymnasiet.", "يمكن للقادمين الجدد الالتحاق ببرنامج تمهيدي في الثانوية."],
    "Lexin013203": ["Företagets intäkter ökade i år.", "زادت إيرادات الشركة هذا العام."],
    "Lexin013213": ["Få invaliditetsförmån från försäkringsbolaget.", "الحصول على تعويض عجز من شركة التأمين."],
    "Lexin013230": ["Göra investeringsavdrag för maskiner.", "إجراء خصم استثماري للآلات."],
    "Lexin013287": ["Gå i sina föräldrars ställe enligt istadarätt (arvsrätt).", "الحلول محل الوالدين وفقاً لحق التمثيل (في الميراث)."],
    "Lexin013352": ["Delta i jobb- och utvecklingsgarantin.", "المشاركة في ضمان الوظيفة والتطوير."],
    "Lexin013359": ["Ungdomar kan få plats i jobbgarantin för ungdomar.", "يمكن للشباب الحصول على مكان في ضمان الوظيفة للشباب."],
    "Lexin013361": ["Få lägre skatt tack vare jobbskatteavdrag.", "الحصول على ضريبة أقل بفضل خصم ضريبة العمل."],
    "Lexin013362": ["Gå på jobbsökaraktiviteter med coachning.", "الذهاب إلى أنشطة البحث عن عمل مع توجيه."],
    "Lexin013374": ["Jordabalken (JB) reglerar fastigheter.", "قانون الأراضي (JB) ينظم العقارات."],
    "Lexin013402": ["Barnet placerades i ett jourhem akut.", "وُضع الطفل في منزل طوارئ (Jourhem) بشكل عاجل."],
    "Lexin013406": ["Arbeta jourtid på helgen.", "العمل بنظام المناوبة (Jourtid) في عطلة نهاية الأسبوع."],
    "Lexin013498": ["Domstolen kan jämka skadeståndet.", "يمكن للمحكمة تعديل (تخفيف) التعويض."],
    "Lexin013526": ["Anlita en jämställdhetsexpert.", "الاستعانة بخبير مساواة."],
    "Lexin013529": ["Alla arbetsplatser ska ha en jämställdhetsplan.", "يجب أن يكون لدى جميع أماكن العمل خطة مساواة."],
    "Lexin013563": ["Domaren anmälde jäv.", "أعلن القاضي تنحيه لوجود مصلحة (Jäv) أو قرابة."],
    "Lexin013565": ["Nämndemännen var jäviga.", "كان المحلفون غير محايدين (Jäviga)."],
    "Lexin013581": ["Kabinettssekreteraren är näst högst på UD.", "سكرتير مجلس الوزراء هو الثاني في وزارة الخارجية."],
    "Lexin013685": ["Kammarkollegiet hanterar arvsfonden.", "Kammarkollegiet تدير صندوق الميراث."],
    "Lexin013763": ["Dra av kapitalförlust i deklarationen.", "خصم خسارة رأس المال في الإقرار الضريبي."],
    "Lexin013764": ["Beskatta kapitalinkomster (ränta, utdelning).", "فرض ضريبة على دخل رأس المال (فائدة، أرباح أسهم)."],
    "Lexin013769": ["Betala skatt på kapitalvinst vid husförsäljning.", "دفع ضريبة على ربح رأس المال عند بيع المنزل."],
    "Lexin013810": ["Ingen ersättning utgår för karensdagar.", "لا يُدفع تعويض عن أيام الانتظار (Karensdagar - الأيام الأولى من المرض)."],
    "Lexin013835": ["Samla in kartläggningsmaterial om eleven.", "جمع مواد مسح (تخطيط) عن الطالب."],
    "Lexin013901": ["Vi bor i ett kedjehus.", "نحن نعيش في منزل متصل (سلسلة منازل)."],
    "Lexin013909": ["Läsa kemi i skolan.", "دراسة الكيمياء في المدرسة."],
    "Lexin013983": ["Välja kistgrav på kyrkogården.", "اختيار قبر نعش (Kistgrav) في المقبرة."],
    "Lexin014026": ["Väcka talan om klander av testamente.", "رفع دعوى للطعن في الوصية."],
    "Lexin014027": ["Lämna in en klandertalan till tingsrätten.", "تقديم دعوى طعن إلى المحكمة الابتدائية."],
    "Lexin014374": ["Minska koldioxidutsläppen.", "تقليل انبعاثات ثاني أكسيد الكربون."],
    "Lexin014427": ["Förvara urnor i kolumbarier.", "حفظ الجرار (الرفات) في كوات المقابر (Kolumbarier)."],
    "Lexin014478": ["Riksdagen har olika utskott och kommittéer.", "لدى البرلمان لجان مختلفة."],
    "Lexin014486": ["Läsa upp betyg på Komvux (kommunal vuxenutbildning).", "تحسين الدرجات في تعليم الكبار البلدي (Komvux)."],
    "Lexin014488": ["Gå med i Kommunal (Svenska Kommunalarbetareförbundet).", "الانضمام إلى نقابة عمال البلدية."],
    "Lexin014489": ["Kommunallagen styr kommunernas arbete.", "قانون البلديات يحكم عمل البلديات."],
    "Lexin014494": ["Kommunalskatter går till vård och skola.", "ضرائب البلدية تذهب للرعاية والمدارس."],
    "Lexin014496": ["Kommundirektören är högsta tjänsteman.", "مدير البلدية هو أعلى موظف حكومي (في البلدية)."],
    "Lexin014534": ["Satsa på kompetenshöjning för personalen.", "الاستثمار في رفع كفاءة الموظفين."],
    "Lexin014547": ["Få komplettering upp till norm (försörjningsstöd).", "الحصول على تكملة لرفع الدخل إلى المعيار (دعم الإعالة)."],
    "Lexin014589": ["Bestämma konceptionstiden (befruktningstiden).", "تحديد وقت الحمل (الإخصاب)."],
    "Lexin014653": ["Du får inte bedriva konkurrerande verksamhet.", "لا يسمح لك بممارسة نشاط منافس."],
    "Lexin014665": ["Konkursförvaltaren tar över tillgångarna.", "مدير التفليسة يتولى الأصول."],
    "Lexin014703": ["Regeringsformen är en del av vår konstitution.", "نظام الحكم هو جزء من دستورنا."],
    "Lexin014728": ["Skriva ett konsultavtal.", "كتابة اتفاقية استشاري."],
    "Lexin014762": ["Moms är en konsumtionsskatt.", "ضريبة القيمة المضافة هي ضريبة استهلاك."],
    "Lexin014779": ["Använda en kontakttolk vid läkarbesöket.", "استخدام مترجم فوري (تواصلي) عند زيارة الطبيب."],
    "Lexin014786": ["Redovisa moms enligt kontantprincipen (bokslutsmetoden).", "الإبلاغ عن ضريبة القيمة المضافة وفقاً للمبدأ النقدي."],
    "Lexin014819": ["Statsrådet måste kontrasignera beslutet.", "يجب على الوزير توقيع القرار (توقيع مضاد)."],
    "Lexin014829": ["Fick en kontrollavgift (parkeringsböter) på bilen.", "حصلت على رسوم فحص (غرامة وقوف) على السيارة."]
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

const backupPath = DATA_FILE + '.backup_others4_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Others Batch 4 completed!`);
