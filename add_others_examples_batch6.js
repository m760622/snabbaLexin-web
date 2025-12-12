/**
 * Add examples to OTHERS (Samhälle) terms - Batch 6 (100 terms: Nattarbete to Rh, anpassad utbildning)
 * Carefully matching IDs from others_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin018584": ["Nattarbete kräver dispenser.", "العمل الليلي يتطلب إعفاءات."],
    "Lexin018617": ["Biologi ingår i de naturorienterande ämnena (NO).", "الأحياء هي جزء من المواد العلمية الطبيعية (NO)."],
    "Lexin018670": ["Han har nedsatt arbetsförmåga på grund av skadan.", "لديه قدرة عمل منخفضة بسبب الإصابة."],
    "Lexin018896": ["Skolan har en klass för nyanlända.", "المدرسة لديها صف للقادمين الجدد."],
    "Lexin018945": ["Företaget erbjuder nystartjobb.", "الشركة تقدم وظائف البداية الجديدة (Nystartjobb)."],
    "Lexin019019": ["Näringsdepartementet hanterar industrifrågor.", "وزارة الصناعة (Näringsdepartementet) تتعامل مع قضايا الصناعة."],
    "Lexin019040": ["Du kan få närståendepenning om du vårdar en sjuk anhörig.", "يمكنك الحصول على نقدية رعاية القريب إذا كنت ترعى قريباً مريضاً."],
    "Lexin019089": ["Nödfallsövertid får tas ut vid olyckor.", "يمكن استخدام العمل الإضافي الطارئ في حالة الحوادث."],
    "Lexin019162": ["Den som bor i Sverige är obegränsat skattskyldig.", "من يعيش في السويد خاضع للضريبة بشكل غير محدود."],
    "Lexin019172": ["Få tillägg för obekväm arbetstid (OB).", "الحصول على علاوة وقت العمل غير المريح (OB)."],
    "Lexin019291": ["Jobba inom offentlig förvaltning.", "العمل في الإدارة العامة."],
    "Lexin019303": ["Offentlighetsprincipen ger insyn i myndigheter.", "مبدأ العلنية يتيح الاطلاع على السلطات."],
    "Lexin019312": ["Anvisad till ett offentligt skyddat arbete (OSA).", "موجه إلى عمل محمي عام (OSA)."],
    "Lexin019592": ["Få omkostnadsersättning för resor.", "الحصول على تعويض تكاليف السفر."],
    "Lexin019611": ["Facket förhandlade om omplacering.", "تفاوضت النقابة حول إعادة التعيين (النقل)."],
    "Lexin019612": ["Det blev många omplaceringar vid neddragningen.", "كان هناك العديد من التنقلات عند تقليص العمالة."],
    "Lexin019637": ["Beslutet togs i Omsorgsnämnden.", "تم اتخاذ القرار في لجنة الرعاية."],
    "Lexin019641": ["Söka omställningspension efter makens död.", "طلب معاش التكيف بعد وفاة الزوج."],
    "Lexin019653": ["Moms på omsättning av varor och tjänster.", "ضريبة القيمة المضافة على تداول (بيع) السلع والخدمات."],
    "Lexin019711": ["Blev omhändertagen för onykterhet.", "تم احتجازه بسبب السكر (Onykterhet)."],
    "Lexin019788": ["Min ordinarie arbetstid är 8-17.", "وقت عملي العادي هو 8-17."],
    "Lexin019789": ["Barnet har en ordinarie vårdare.", "الطفل لديه راعٍ أساسي (Ordinarie)."],
    "Lexin019880": ["Göra en orosanmälan till Socialtjänsten.", "تقديم بلاغ قلق إلى الخدمات الاجتماعية."],
    "Lexin019943": ["Domstolen underkände det oskäliga äktenskapsförordet.", "رفضت المحكمة اتفاقية الزواج غير المعقولة."],
    "Lexin020185": ["Vård för papperslösa.", "الرعاية الصحية للأشخاص غير المسجلين (بدون أوراق)."],
    "Lexin020205": ["Läs paragraf 5 i lagen.", "اقرأ الفقرة (المادة) 5 في القانون."],
    "Lexin020223": ["De bor i ena halvan av ett parhus.", "يعيشون في نصف واحد من منزل مزدوج (Parhus)."],
    "Lexin020231": ["Fick en parkeringsanmärkning (böter).", "حصل على مخالفة وقوف."],
    "Lexin020232": ["Parkeringsvakten lappade bilen.", "قام حارس الموقف (Parkeringvakt) بتحرير مخالفة للسيارة."],
    "Lexin020239": ["Sverige har parlamentarism.", "السويد لديها نظام برلماني."],
    "Lexin020318": ["Registrera patent hos PRV.", "تسجيل براءة الاختراع لدى مكتب براءات الاختراع والتسجيل (PRV)."],
    "Lexin020330": ["Patientlagen stärker patientens ställning.", "قانون المرضى يعزز وضع المريض."],
    "Lexin020359": ["Dagbarnvårdare är en form av pedagogisk omsorg.", "جليسة الأطفال النهارية هي شكل من أشكال الرعاية التربوية."],
    "Lexin020361": ["Förskolan bedriver pedagogisk verksamhet.", "تقوم الروضة بأنشطة تربوية."],
    "Lexin020403": ["Gå i pensionering vid 65.", "التقاعد عند سن 65."],
    "Lexin020405": ["Kolla din pensionsbehållning i kuvertet.", "تحقق من رصيد معاشك في المظروف."],
    "Lexin020412": ["Sjukpenning är pensionsgrundande inkomst.", "نقدية المرض هي دخل يؤسس للمعاش."],
    "Lexin020416": ["Samla pensionsrätter genom att jobba.", "جمع حقوق المعاش من خلال العمل."],
    "Lexin020421": ["Det svenska pensionssystemet är tryggt.", "نظام المعاشات السويدي آمن."],
    "Lexin020474": ["Varsla om permittering av personal.", "الإخطار بتسريح الموظفين (المؤقت)."],
    "Lexin020475": ["Få permitteringslön under stoppet.", "الحصول على راتب تسريح أثناء التوقف."],
    "Lexin020503": ["Köra personbil med B-körkort.", "قيادة سيارة ركاب برخصة B."],
    "Lexin020516": ["Stöld av personlig egendom.", "سرقة ممتلكات شخصية."],
    "Lexin020524": ["Få ersättning enligt Personskadeavtal (PSA).", "الحصول على تعويض بموجب اتفاقية الإصابات الشخصية (PSA)."],
    "Lexin020844": ["Göra en polisanmälan om stölden.", "تقديم بلاغ للشرطة عن السرقة."],
    "Lexin020849": ["Polisens kriminalunderrättelsetjänst spanar.", "خدمة الاستخبارات الجنائية التابعة للشرطة تقوم بالرصد."],
    "Lexin020854": ["Arbeta inom Polismyndigheten.", "العمل داخل جهاز الشرطة."],
    "Lexin020870": ["Söka asyl som politisk flykting.", "طلب اللجوء كلاجئ سياسي."],
    "Lexin020916": ["Miljöbalken inleds med en portalparagraf.", "يبدأ قانون البيئة بفقرة افتتاحية (تحدد الأهداف)."],
    "Lexin020996": ["Få praktisk kompetensutveckling på jobbet.", "الحصول على تطوير مهارات عملي في العمل."],
    "Lexin021035": ["Domen blev ett prejudikat för framtiden.", "أصبح الحكم سابقة قضائية للمستقبل."],
    "Lexin021041": ["Arbetsgivaren drar preliminär skatt.", "يخصم صاحب العمل الضريبة الأولية."],
    "Lexin021068": ["USA:s president bor i Vita huset.", "رئيس الولايات المتحدة يعيش في البيت الأبيض."],
    "Lexin021069": ["Riksdagens presidium leder arbetet.", "رئاسة البرلمان تقود العمل."],
    "Lexin021072": ["Brottet avskrevs p.g.a. preskription.", "شُطبت الجريمة بسبب التقادم."],
    "Lexin021076": ["Preskriptionsförlängning för skatteskulder.", "تمديد فترة التقادم للديون الضريبية."],
    "Lexin021084": ["Ministerns pressekreterare svarade.", "أجاب السكرتير الصحفي للوزير."],
    "Lexin021125": ["Arbetsgivaren har primär förhandlingsskyldighet.", "صاحب العمل لديه التزام تفاوض أولي."],
    "Lexin021133": ["Vårdcentralen är basen i primärvården.", "المركز الصحي هو أساس الرعاية الأولية."],
    "Lexin021153": ["Ersättningstaket följer prisbasbeloppsregeln.", "سقف التعويض يتبع قاعدة المبلغ الأساسي للسعر."],
    "Lexin021162": ["Spara i privat pensionssparande (IPS).", "الادخار في توفير المعاشات الخاص (IPS)."],
    "Lexin021164": ["Kommunen köper tjänster av privata aktörer.", "تشتري البلدية خدمات من جهات فاعلة خاصة."],
    "Lexin021165": ["Jobba inom den privata sektorn.", "العمل في القطاع الخاص."],
    "Lexin021169": ["Respektera privatlivets helgd.", "احترام حرمة الحياة الخاصة."],
    "Lexin021175": ["Hyra ut rum enligt privatuthyrningslagen.", "تأجير غرفة وفقاً لقانون التأجير الخاص."],
    "Lexin021250": ["Uppfylla programmålen för utbildningen.", "تحقيق أهداف البرنامج للتدريب."],
    "Lexin021256": ["Statlig skatt är en progressiv skatt.", "ضريبة الدولة هي ضريبة تصاعدية."],
    "Lexin021306": ["Regeringen lämnade en proposition till riksdagen.", "قدمت الحكومة مشروع قانون (Proposition) إلى البرلمان."],
    "Lexin021350": ["Få en prova-på-plats via Arbetsförmedlingen.", "الحصول على مكان للتجربة (Prova-på-plats) عبر مكتب العمل."],
    "Lexin021351": ["Börja med en provanställning på sex månader.", "البدء بتوظيف تجريبي لمدة ستة أشهر."],
    "Lexin021364": ["Avskedad för provokativ misskötsamhet.", "فُصل بسبب سوء سلوك استفزازي."],
    "Lexin021431": ["Ha en psykisk funktionsnedsättning.", "لديه إعاقة نفسية."],
    "Lexin021519": ["Skatt på alkohol är en punktskatt.", "الضريبة على الكحول هي ضريبة انتقائية (Punktskatt)."],
    "Lexin021714": ["Bo i radhus med liten trädgård.", "العيش في منزل ريفي (تاون هاوس) مع حديقة صغيرة."],
    "Lexin021782": ["Miljöbalken är en ramlag.", "قانون البيئة هو قانون إطاري."],
    "Lexin021793": ["Ramtiden för a-kassan är 12 månader.", "الإطار الزمني لصندوق البطالة هو 12 شهراً."],
    "Lexin021862": ["Vi har två raster på förmiddagen.", "لدينا استراحتان في الصباح."],
    "Lexin021898": ["Göra en stor realisationsvinst på aktier.", "تحقيق ربح رأسمالي كبير في الأسهم."],
    "Lexin021899": ["Betala realisationsvinstskatt (reavinstskatt).", "دفع ضريبة الأرباح الرأسمالية."],
    "Lexin021959": ["Få reduktion på skatten.", "الحصول على تخفيض في الضريبة."],
    "Lexin022010": ["Regeringen styr riket.", "الحكومة تحكم المملكة."],
    "Lexin022012": ["Regeringsformen är den viktigaste grundlagen.", "نظام الحكم هو أهم قانون أساسي (دستور)."],
    "Lexin022029": ["Sveriges regioner ansvarar för sjukvården.", "محافظات السويد مسؤولة عن الرعاية الصحية."],
    "Lexin022030": ["Rösta till regionfullmäktige.", "التصويت لمجلس المحافظة."],
    "Lexin022033": ["Akademiska sjukhuset är ett regionsjukhus.", "المستشفى الجامعي هو مستشفى إقليمي."],
    "Lexin022034": ["Specialiserad regionsjukvård.", "رعاية صحية إقليمية متخصصة."],
    "Lexin022060": ["Jag har ingen reglerad arbetstid, jag jobbar fritt.", "ليس لدي وقت عمل منظم، أعمل بحرية."],
    "Lexin022078": ["Få rehabiliteringsersättning under träningen.", "الحصول على تعويض إعادة التأهيل أثناء التدريب."],
    "Lexin022079": ["Följa stegen i rehabiliteringskedjan.", "اتباع خطوات سلسلة إعادة التأهيل."],
    "Lexin022080": ["Ansöka om rehabiliteringspenning.", "التقدم بطلب للحصول على نقدية إعادة التأهيل."],
    "Lexin022108": ["Företaget utsåg en rekonstruktör.", "عينت الشركة مسؤول إعادة الهيكلة."],
    "Lexin022116": ["Anlita rekryterings- och förmedlingstjänster.", "الاستعانة بخدمات التوظيف والوساطة."],
    "Lexin022122": ["Rektorn ansvarar för skolan.", "مدير المدرسة مسؤول عن المدرسة."],
    "Lexin022150": ["Vi valde en religiös vigsel i kyrkan.", "اخترنا زواجاً دينياً في الكنيسة."],
    "Lexin022224": ["Vi har representativ demokrati, vi väljer politiker.", "لدينا ديمقراطية تمثيلية، ننتخب السياسيين."],
    "Lexin022237": ["Finland är en republik med president.", "فنلندا جمهورية ولها رئيس."],
    "Lexin022381": ["Europeiska revisionsrätten granskar EU:s ekonomi.", "محكمة مراجعي الحسابات الأوروبية تدقق في اقتصاد الاتحاد الأوروبي."],
    "Lexin022385": ["Revisorer granskar bokföringen.", "المدققون يراجعون الحسابات."],
    "Lexin022396": ["Söka Rg-bidrag för anpassning.", "طلب منحة Rg للتكييف."],
    "Lexin022397": ["Gå i Rh-anpassad utbildning för rörelsehindrade.", "الالتحاق بتعليم مكيف Rh للمعاقين حركياً."]
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

const backupPath = DATA_FILE + '.backup_others6_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Others Batch 6 completed!`);
