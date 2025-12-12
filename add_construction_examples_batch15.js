/**
 * Add examples to CONSTRUCTION terms - Batch 15 (100 terms: Parkett golv to Representant)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin020235": ["Lägga in nytt parkettgolv i vardagsrummet.", "تركيب أرضية باركيه جديدة في غرفة المعيشة."],
    "Lexin020265": ["Projektet drivs i partnering.", "يُدار المشروع بنظام الشراكة (Partnering)."],
    "Lexin020348": ["Alla byggen måste följa PBL.", "جميع المباني يجب أن تتبع قانون التخطيط والبناء (PBL)."],
    "Lexin020353": ["Läs detaljerna i PBF.", "اقرأ التفاصيل في مرسوم التخطيط والبناء (PBF)."],
    "Lexin020371": ["Gjuta en bärande pelare.", "صب عمود حامل."],
    "Lexin020373": ["Elda med pellets i pannan.", "الحرق بكريات الوقود (pellets) في المرجل."],
    "Lexin020398": ["Måla listerna med en liten pensel.", "طلاء القوائم بفرشاة صغيرة."],
    "Lexin020450": ["Vi använder Performance Management för att mäta framgång.", "نستخدم إدارة الأداء لقياس النجاح."],
    "Lexin020461": ["Studera markens perkolation.", "دراسة تغلغل (perkolation) المياه في التربة."],
    "Lexin020492": ["Fråga vår personalansvarig om lönen.", "اسأل مسؤول شؤون الموظفين عن الراتب."],
    "Lexin020493": ["Skicka papperen till personalavdelningen.", "أرسل الأوراق إلى قسم شؤون الموظفين."],
    "Lexin020494": ["Vår personalchef slutar snart.", "مدير شؤون الموظفين لدينا سيستقيل قريباً."],
    "Lexin020499": ["Hög personalomsättning är ett problem.", "دوران الموظفين المرتفع يمثل مشكلة."],
    "Lexin020500": ["Följa företagets personalpolicy.", "اتباع سياسة الموظفين في الشركة."],
    "Lexin020517": ["Anpassa arbetsplatsen efter personliga behov.", "تكييف مكان العمل حسب الاحتياجات الشخصية."],
    "Lexin020651": ["Bestämma husets placering på tomten.", "تحديد تموضع المنزل على الأرض."],
    "Lexin020668": ["Betala kommunens planavgift.", "دفع رسوم التخطيط للبلدية."],
    "Lexin020671": ["Arbeta som planerare på kommunen.", "العمل كمخطط في البلدية."],
    "Lexin020673": ["Ha god planering i projektet.", "الحصول على تخطيط جيد في المشروع."],
    "Lexin020674": ["Godkänna planeringsprogrammet.", "الموافقة على برنامج التخطيط."],
    "Lexin020676": ["Planhyvla virket innan målning.", "سحج (تنعم) الخشب قبل الطلاء."],
    "Lexin020678": ["Sätta upp ett plank runt tomten.", "إقامة سور خشبي (plank) حول الأرض."],
    "Lexin020682": ["Kommunens planläggning tar tid.", "عملية تخطيط البلدية تأخذ وقتاً."],
    "Lexin020686": ["Studera planritningen för våning 2.", "دراسة المسقط الأفقي للطابق الثاني."],
    "Lexin020697": ["Rör av plast.", "أنابيب من البلاستيك."],
    "Lexin020711": ["Prata med platschefen på bygget.", "تحدث مع مدير الموقع في البناء."],
    "Lexin020713": ["Göra en geoteknisk platsundersökning.", "إجراء فحص جيوتقني للموقع."],
    "Lexin020716": ["Gjuta ett platt bärlag.", "صب بلاطة مسطحة (بدون كمرات ساقطة)."],
    "Lexin020718": ["Huset grundläggs med platta på mark.", "يؤسس المنزل ببلاطة على الأرض (لبشة)."],
    "Lexin020725": ["Anlita en duktig plattsättare.", "توظيف مبلط ماهر."],
    "Lexin020769": ["Sockeln ligger på plushöjd +5,20.", "القاعدة تقع على منسوب +5,20."],
    "Lexin020775": ["Skruva upp plywood på väggen.", "تثبيت البليود على الجدار."],
    "Lexin020786": ["Lägga tak av plåt.", "وضع سقف من الصاج."],
    "Lexin020788": ["Bygga innervägg med plåtregel.", "بناء جدار داخلي بقوائم معدنية (Studs)."],
    "Lexin020921": ["Blanda betong med Portlandcement.", "خلط الخرسانة بأسمنت بورتلاند."],
    "Lexin020930": ["Isolera ljud med porös board.", "عزل الصوت بلوح ليفي مسامي."],
    "Lexin020989": ["Ta emot en praktikant från skolan.", "استقبال متدرب من المدرسة."],
    "Lexin021000": ["Följa praktiska riktlinjer för murning.", "اتباع الإرشادات العملية للبناء."],
    "Lexin021025": ["Använda prefab-byggnation för att spara tid.", "استخدام البناء الجاهز لتوفير الوقت."],
    "Lexin021026": ["Montera en prefabricerad trappa.", "تركيب درج مسبق الصنع."],
    "Lexin021090": ["Maskinen har hög prestanda.", "الآلة ذات أداء عالٍ."],
    "Lexin021111": ["Tomten är prickad mark och får ej bebyggas.", "الأرض هي ارض منقطة (محظورة البناء) ولا يجوز البناء عليها."],
    "Lexin021129": ["Minska användningen av primärenergi.", "تقليل استخدام الطاقة الأولية."],
    "Lexin021130": ["Kolla tomtgränserna på primärkartan.", "تحقق من حدود الأرض على الخريطة الأساسية."],
    "Lexin021149": ["Vad är ditt pris?", "ما هو سعرك؟"],
    "Lexin021154": ["Vi måste göra en prishöjning nästa år.", "يجب أن نقوم بزيادة الأسعار العام المقبل."],
    "Lexin021155": ["Diskutera prissättning av jobbet.", "مناقشة تسعير العمل."],
    "Lexin021157": ["Lämna en prisuppgift på renoveringen.", "تقديم عرض سعر للتجديد."],
    "Lexin021167": ["Vi jobbar mest mot privatkunder.", "نعمل غالباً مع عملاء خواص."],
    "Lexin021212": ["Starta produktionen av elementen.", "بدء إنتاج العناصر."],
    "Lexin021213": ["Rapportera till produktionschefen.", "تقديم تقرير لمدير الإنتاج."],
    "Lexin021214": ["Vår produktionsingenjör optimerar flödet.", "مهندس الإنتاج لدينا يحسن التدفق."],
    "Lexin021215": ["Göra en produktionskalkyl.", "إجراء حساب تكلفة الإنتاج."],
    "Lexin021216": ["Jobba som produktionsledare.", "العمل كقائد إنتاج."],
    "Lexin021217": ["Använda ett system för produktionsstyrning.", "استخدام نظام للتحكم في الإنتاج."],
    "Lexin021220": ["Vi måste öka vår produktivitet.", "يجب أن نزيد إنتاجيتنا."],
    "Lexin021240": ["Göra en ekonomisk prognos.", "إجراء تنبؤ اقتصادي."],
    "Lexin021260": ["Starta ett nytt byggprojekt.", "بدء مشروع بناء جديد."],
    "Lexin021261": ["Göra ett projektbesök på plats.", "القيام بزيارة للمشروع في الموقع."],
    "Lexin021262": ["Projektchefen har det övergripande ansvaret.", "مدير المشروع لديه المسؤولية الشاملة."],
    "Lexin021263": ["Projektera den nya skolan.", "تصميم (projektera) المدرسة الجديدة."],
    "Lexin021266": ["Vi är i fasen för projektering.", "نحن في مرحلة التصميم/التخطيط."],
    "Lexin021268": ["Jobba som projektingenjör.", "العمل كمهندس مشروع."],
    "Lexin021271": ["Utse en ny projektledare.", "تعيين مدير مشروع جديد."],
    "Lexin021273": ["Projektet närmar sig projektslut.", "المشروع يقترب من نهايته."],
    "Lexin021274": ["Hålla alla projekttider.", "الالتزام بجميع مواعيد المشروع."],
    "Lexin021275": ["Arbeta med projektutveckling av bostäder.", "العمل في تطوير مشاريع الإسكان."],
    "Lexin021341": ["Skriva protokoll vid byggmötet.", "كتابة محضر اجتماع البناء."],
    "Lexin021451": ["Den psykosociala arbetsmiljön är viktig.", "بيئة العمل النفسية والاجتماعية مهمة."],
    "Lexin021533": ["Slå in spiken med en purr.", "إدخال مسمار باستخدام (purr) الخرامه ."],
    "Lexin021548": ["Laga sprickor i putsen.", "إصلاح شقوق في اللياسة (المحادة)."],
    "Lexin021549": ["Fasaden är en putsad vägg.", "الواجهة عبارة عن جدار مليس."],
    "Lexin021553": ["Rör av PVC-plast.", "أنابيب من بلاستيك PVC."],
    "Lexin021607": ["Vi har ett pågående arbete här.", "لدينا عمل جارٍ هنا."],
    "Lexin021608": ["Informera om pågående arbeten.", "الإبلاغ عن الأعمال الجارية."],
    "Lexin021623": ["Marken kräver pålning.", "الأرض تتطلب عمل خوازيق (pålning)."],
    "Lexin021624": ["Stärka grunden med ett pålverk.", "تقوية الأساس بشبكة خوازيق."],
    "Lexin021667": ["Analysera byggets påverkan på samhället.", "تحليل تأثير البناء على المجتمع."],
    "Lexin021715": ["Bo i ett gavelradhus.", "العيش في منزل رادهوس (متصل) طرفي."],
    "Lexin021716": ["Byta termostat på radiatorn.", "تغيير ثرموستات المشعاع (الردياتير)."],
    "Lexin021730": ["Mäta radon i källaren.", "قياس غاز الرادون في القبو."],
    "Lexin021774": ["Montera fönstret i dess ram.", "تركيب النافذة في إطارها."],
    "Lexin021788": ["Bygga en ramp för rullstolar.", "بناء منحدر للكراسي المتحركة."],
    "Lexin021794": ["Resa stålstommen (ramverket).", "نصب الهيكل الفولاذي (الإطار)."],
    "Lexin021824": ["Göra en rappning på teglet.", "عمل طرطشة (rappning) على الطوب."],
    "Lexin021828": ["Sköta rapportering av tillbud.", "إدارة الإبلاغ عن الحوادث الوشيقة."],
    "Lexin021870": ["Företaget har hög rating.", "الشركة لديها تصنيف (ائتماني) عالٍ."],
    "Lexin021996": ["Spika upp en regel i taket.", "تسمير عارضة (regel) في السقف."],
    "Lexin021998": ["Serva maskinen regelbundet.", "صيانة الآلة بانتظام."],
    "Lexin022024": ["Arbeta i region Syd.", "العمل في المنطقة الجنوبية."],
    "Lexin022027": ["Rapportera till vår regionchef.", "تقديم تقرير لمديرنا الإقليمي."],
    "Lexin022028": ["Regionekonomen har koll på siffrorna.", "الخبير الاقتصادي الإقليمي يتابع الأرقام."],
    "Lexin022056": ["Väggen byggs av träreglar.", "الجدار يُبنى من عوارض خشبية."],
    "Lexin022096": ["Lämna ett rekommendationsförslag.", "تقديم مقترح توصية."],
    "Lexin022135": ["Rita om till relationshandling.", "إعادة الرسم إلى رسومات واقع الحال (As-built)."],
    "Lexin022188": ["Renovera badrummet.", "تجديد الحمام."],
    "Lexin022201": ["Utföra en reparation av taket.", "إجراء إصلاح للسقف."],
    "Lexin022202": ["Laga trappan med reparationsbruk.", "إصلاح الدرج بمونة إصلاح."],
    "Lexin022203": ["Få en offert på reparationskostnaden.", "الحصول على عرض سعر لتكلفة الإصلاح."],
    "Lexin022220": ["Träffa en representant för facket.", "مقابلة ممثل للنقابة."]
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

const backupPath = DATA_FILE + '.backup_construction15_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 15 completed!`);
