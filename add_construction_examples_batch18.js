/**
 * Add examples to CONSTRUCTION terms - Batch 18 (100 terms: Transparens to Vägledning)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin028797": ["Vi strävar efter transparens i affärerna.", "نحن نسعى للشفافية في الأعمال."],
    "Lexin028805": ["Hitta smarta transportlösningar.", "إيجاد حلول نقل ذكية."],
    "Lexin028806": ["Transportplanering är viktigt för logistiken.", "تخطيط النقل مهم للوجستيات."],
    "Lexin028816": ["Byta lampa i trapphusbelysningen.", "تغيير مصباح في إضاءة بيت الدرج."],
    "Lexin028817": ["Gå upp för trapporna.", "اصعد الدرج."],
    "Lexin028818": ["Hålla i trappräcket när man går ner.", "الإمساك بدرابزين الدرج عند النزول."],
    "Lexin028819": ["Klättra upp på en trappstege.", "تسلق سلم مزدوج (ترايبود)."],
    "Lexin028860": ["Sätta en trekantslist i formen.", "وضع شريط مثلثي (Chamfer strip) في القالب."],
    "Lexin028910": ["Skapa trivsel på arbetsplatsen.", "خلق رفاهية في مكان العمل."],
    "Lexin028957": ["Gå på trottoaren.", "امش على الرصيف."],
    "Lexin028995": ["Köpa virke med tryckimpregnering.", "شراء خشب معالج بالضغط."],
    "Lexin028997": ["Borra i berget med tryckluftsborr.", "الحفر في الصخر بمثقاب يعمل بالهواء المضغوط."],
    "Lexin029005": ["Vi jobbar för en trygg arbetsplats.", "نحن نعمل من أجل مكان عمل آمن."],
    "Lexin029031": ["Utföra fint träarbete.", "تنفيذ أعمال خشبية دقيقة."],
    "Lexin029037": ["Anlägga en ny trädgård.", "إنشاء حديقة جديدة."],
    "Lexin029039": ["Bygga ett stort trädäck.", "بناء سطح خشبي كبير (Deck)."],
    "Lexin029048": ["Elda med träflis.", "الحرق بفتات الخشب (Träflis)."],
    "Lexin029051": ["Laga stolen med trälim.", "إصلاح الكرسي بغراء خشب."],
    "Lexin029073": ["Skruva fast brädan med träskruv.", "تثبيت اللوح ببراغي خشب."],
    "Lexin029075": ["Huset har en trästomme.", "المنزل له هيكل خشبي."],
    "Lexin029093": ["Metall kan bli trött av belastning.", "المعدن يمكن أن يجهد (يصبح تعباً) من الحمل."],
    "Lexin029138": ["Spiken är tre tum lång.", "المسمار طوله ثلاث بوصات."],
    "Lexin029168": ["Köra genom en tunnel.", "القيادة عبر نفق."],
    "Lexin029170": ["Ta tunnelbanan till jobbet.", "استقلال المترو إلى العمل."],
    "Lexin029298": ["Tvärväggarna styvar upp huset.", "الجدران العرضية تقوي المنزل."],
    "Lexin029367": ["Skor med tåhätta av stål.", "أحذية بمقدمة فولاذية."],
    "Lexin029388": ["Måla huset med täcklasyr.", "طلاء المنزل بطلاء نصف شفاف (Täcklasyr)."],
    "Lexin029395": ["En kamin av täljsten.", "مدفأة من الحجر الصابوني."],
    "Lexin029437": ["Sätta tätband runt fönstret.", "وضع شريط عزل حول النافذة."],
    "Lexin029439": ["Lägga tätskikt i badrummet.", "وضع طبقة عازلة (للمياه) في الحمام."],
    "Lexin029535": ["Anlita en underentreprenör för elen.", "التعاقد مع مقاول باطن للكهرباء."],
    "Lexin029567": ["Ringa en underhållstekniker.", "الاتصال بفني صيانة."],
    "Lexin029570": ["Bygga garage under jord.", "بناء مرآب تحت الأرض."],
    "Lexin029571": ["Arbeta med underjord kabelläggning.", "العمل بتمديد الكابلات تحت الأرض."],
    "Lexin029586": ["Lägga underlagsfoam under golvet.", "وضع فوم تحتي (بطانة) تحت الأرضية."],
    "Lexin029587": ["Vi har problem med en underleverantör.", "لدينا مشكلة مع أحد الموردين الفرعيين."],
    "Lexin029755": ["Göra en uppdatering av ritningarna.", "إجراء تحديث للرسومات."],
    "Lexin029764": ["Kolla var uppdämningsnivån ligger.", "تحقق أين يقع مستوى الارتجاع (في الصرف)."],
    "Lexin029807": ["Göra en uppföljning av arbetet.", "إجراء متابعة للعمل."],
    "Lexin029815": ["Följa företagets uppförandekod.", "اتباع مدونة قواعد السلوك للشركة."],
    "Lexin029820": ["Min uppgift är att måla.", "مهمتي هي الطلاء."],
    "Lexin029828": ["Vi ska göra en ny upphandling.", "سنجري مناقصة (شراء) جديدة."],
    "Lexin029841": ["Begära upphävande av beslutet.", "طلب إلغاء القرار."],
    "Lexin029906": ["Kontrollera de uppmätta värdena.", "فحص القيم المقاسة."],
    "Lexin030036": ["Installera vattenburen uppvärmning.", "تركيب تدفئة مركزية (بالماء)."],
    "Lexin030137": ["Vänta på utbetalning av lönen.", "انتظار صرف الراتب."],
    "Lexin030185": ["Inglasat uterum mot trädgården.", "غرفة زجاجية خارجية (Uterum) تجاه الحديقة."],
    "Lexin030194": ["Isolera utfackningsväggen.", "عزل الجدار الخارجي غير الحامل."],
    "Lexin030201": ["Diskutera kökets utformning.", "مناقشة تصميم المطبخ."],
    "Lexin030227": ["Göra en arkeologisk utgrävning.", "إجراء حفريات أثرية."],
    "Lexin030246": ["Göra en utjämning av marken.", "إجراء تسوية للأرض."],
    "Lexin030255": ["Balkongen är en utkragning.", "الشرفة عبارة عن بروز (كابولي)."],
    "Lexin030305": ["Göra en utmärkning av tomtgränsen.", "تحديد وعلامة حدود الأرض."],
    "Lexin030358": ["Lämna tillbaka lånad utrustning.", "إعادة المعدات المستعارة."],
    "Lexin030380": ["Montera ett utskjutande stöd.", "تركيب دعامة بارزة."],
    "Lexin030410": ["Beställa utstakning av huset.", "طلب تحديد موقع البناء (Utstakning)."],
    "Lexin030418": ["Detaljplanen är på utställning.", "الخطة التفصيلية معروضة للجمهور (للمراجعة)."],
    "Lexin030456": ["Vi vill utveckla området.", "نريد تطوير المنطقة."],
    "Lexin030594": ["Villan har ett valmat tak.", "الفيلا لها سقف هرمي (Valmat)."],
    "Lexin030726": ["Använda varmförzinkad spik ute.", "استخدام مسامير مجلفنة ساخنة في الخارج."],
    "Lexin030727": ["Torka golvet med en varmluftsfläkt.", "تجفيف الأرضية بمروحة هواء ساخن."],
    "Lexin030730": ["Vi har inget varmvatten.", "ليس لدينا ماء ساخن."],
    "Lexin030731": ["Installera en varmvattenpanna (beredare).", "تركيب سخان مياه (panna/beredare)."],
    "Lexin030736": ["Sätta upp en varningsskylt.", "وضع لافتة تحذير."],
    "Lexin030737": ["Spärra av med varningstejp.", "تطويق بشريط تحذير."],
    "Lexin030744": ["Renovera med varsamhet.", "التجديد بحذر (للحفاظ على القديم)."],
    "Lexin030750": ["Alla ska bära varselkläder.", "الجميع يجب أن يرتدي ملابس واضحة (عكسية)."],
    "Lexin030782": ["Fixa vattenavrinning från taket.", "إصلاح تصريف المياه من السقف."],
    "Lexin030786": ["Gräva en vattenkanal.", "حفر قناة مائية."],
    "Lexin030792": ["Koppla in sig på kommunens vattenledningsnät.", "التوصيل بشبكة أنابيب المياه البلدية."],
    "Lexin030794": ["Rensa vattenlåset under vasken.", "تنظيف كوع التصريف (S-trap) تحت المغسلة."],
    "Lexin030798": ["Kolla att det är rakt med vattenpass.", "تحقق من أنه مستوٍ باستخدام ميزان ماء."],
    "Lexin030800": ["Jobba på en vattenreningsanläggning.", "العمل في محطة تنقية مياه."],
    "Lexin030801": ["Bygga ett nytt vattenreningsverk.", "بناء محطة معالجة مياه جديدة."],
    "Lexin030804": ["Lägga en vattentrumma under vägen.", "وضع عبارة مياه (culvert pipe) تحت الطريق."],
    "Lexin030807": ["Dammarna rymmer en stor vattenvolym.", "السدود تتسع لكمية كبيرة من المياه."],
    "Lexin030816": ["Vår VD beslutade om bygget.", "مديرنا التنفيذي قرر البناء."],
    "Lexin030823": ["Vi tar det på nästa veckomöte.", "سنناقش ذلك في الاجتماع الأسبوعي القادم."],
    "Lexin030871": ["Förbättra ventilationen i huset.", "تحسين التهوية في المنزل."],
    "Lexin030894": ["Räkna ut den verkliga kostnaden.", "حساب التكلفة الفعلية."],
    "Lexin030906": ["Starta en ny verksamhet.", "بدء نشاط تجاري جديد."],
    "Lexin030908": ["Ansvara för ett verksamhetsområde.", "تحمل مسؤولية منطقة عمل."],
    "Lexin030923": ["Hämta hammaren i verktygslådan.", "أحضر المطرقة من صندوق الأدوات."],
    "Lexin030961": ["Köra padda (vibrationsplatta) på gruset.", "تشغيل الرصاصة (Padda) على الحصى."],
    "Lexin030962": ["Sätta upp mätare för vibrationsövervakning.", "تركيب أجهزة لمراقبة الاهتزازات."],
    "Lexin030978": ["Klippa gräset vid vägkanten.", "قص العشب عند حافة الطريق."],
    "Lexin031113": ["Montera vindavledare vid takfoten.", "تركيب حارفات الرياح عند حافة السقف."],
    "Lexin031131": ["Täta vinkelrännan ordentligt.", "عزل الوادي (في السقف) بشكل جيد."],
    "Lexin031133": ["Kapa järnet med en vinkelslip.", "قطع الحديد بجلاخة زاوية (صاروخ)."],
    "Lexin031159": ["Göra en vinterplanering.", "إعداد خطة شتوية."],
    "Lexin031210": ["Färgen har hög viskositet.", "الطلاء له لزوجة عالية."],
    "Lexin031343": ["Ring en VVS-montör.", "اتصل بفني تدفئة وتهوية وسباكة (VVS)."],
    "Lexin031401": ["Bo på tredje våningen.", "العيش في الطابق الثالث."],
    "Lexin031402": ["Titta på våningsplanet.", "انظر إلى مخطط الطابق."],
    "Lexin031470": ["Lagra virket väderskyddat.", "تخزين الخشب محميًا من الطقس."],
    "Lexin031477": ["Bygga en ny väg.", "بناء طريق جديد."],
    "Lexin031483": ["Måla väggen vit.", "طلاء الجدار باللون الأبيض."],
    "Lexin031484": ["Kontrollera väggkonstruktionen.", "فحص هيكل الجدار."],
    "Lexin031487": ["Köra väghyvel för att jämna till vägen.", "تشغيل ممهدة الطرق (Grader) لتسوية الطريق."],
    "Lexin031493": ["Få vägledning av en expert.", "الحصول على توجيه من خبير."]
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

const backupPath = DATA_FILE + '.backup_construction18_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 18 completed!`);
