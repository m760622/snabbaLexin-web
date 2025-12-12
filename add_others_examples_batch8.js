/**
 * Add examples to OTHERS (Samhälle) terms - Batch 8 (100 terms: Statsskick to Urngrav)
 * Carefully matching IDs from others_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin026208": ["Sveriges statsskick är konstitutionell monarki.", "نظام الحكم في السويد هو ملكية دستورية."],
    "Lexin026211": ["Läsa statsvetenskap vid universitetet.", "دراسة العلوم السياسية في الجامعة."],
    "Lexin026311": ["Stiftelser delar ut pengar till forskning.", "توزع المؤسسات (Stiftelser) أموالاً للبحث."],
    "Lexin026351": ["Söka stipendier för studier utomlands.", "التقدم للحصول على منح دراسية للدراسة في الخارج."],
    "Lexin026376": ["Sprida stoftet (askan) i minneslunden.", "نثر الغبار (الرماد) في حديقة الذكرى."],
    "Lexin026531": ["Strejk är en facklig stridsåtgärd.", "الإضراب هو إجراء نضالي (صناعي) نقابي."],
    "Lexin026532": ["Parterna varslade om stridsåtgärder.", "أخطر الطرفان بإجراءات نضالية (إضراب/إغلاق)."],
    "Lexin026536": ["Hundägare har strikt skadeståndsansvar.", "أصحاب الكلاب لديهم مسؤولية تعويض صارمة (Strikt)."],
    "Lexin026674": ["Studieombudet hjälper till med cirklar.", "ممثل الدراسة يساعد في الدوائر الدراسية."],
    "Lexin026681": ["Det krävs god studievana för att klara kursen.", "مطلوب عادة دراسية جيدة لاجتياز الدورة."],
    "Lexin026745": ["Anställda har rätt till styrelserepresentation.", "للموظفين الحق في التمثيل في مجلس الإدارة."],
    "Lexin026747": ["Sverige har ett demokratiskt styrelseskick.", "السويد لديها نظام حكم ديمقراطي."],
    "Lexin026766": ["Göra en styvbarnsadoption.", "اجراء تبني طفل الزوج/الزوجة (Styvbarn)."],
    "Lexin026852": ["God man agerar som ställföreträdare.", "الوصي يتصرف كنائب (ممثل)."],
    "Lexin026872": ["Hålla stämma i bostadsrättsföreningen.", "عقد اجتماع عام (جمعيّة عمومية) في جمعية الإسكان."],
    "Lexin026883": ["Lämna in en stämning mot företaget.", "رفع دعوى قضائية ضد الشركة."],
    "Lexin026904": ["Rättegången hölls bakom stängda dörrar.", "عقدت المحاكمة خلف أبواب مغلقة (سرية)."],
    "Lexin026996": ["Lagen är subsidiär till annan lagstiftning.", "القانون ثانوي (تكميلي) لتشريعات أخرى."],
    "Lexin027011": ["Successionsordningen (SO) reglerar tronföljden.", "قانون التوارث (SO) ينظم ولاية العهد."],
    "Lexin027096": ["Kaffet var slut, vi drack ett surrogat.", "نفدت القهوة، شربنا بديلاً."],
    "Lexin027098": ["Surrogatmoderskap är inte tillåtet i svensk vård.", "الأمومة البديلة غير مسموح بها في الرعاية الصحية السويدية."],
    "Lexin027215": ["SKL heter numera Sveriges Kommuner och Regioner (SKR).", "تسمى SKL الآن البلديات والمحافظات السويدية (SKR)."],
    "Lexin027352": ["Facket tog till sympatiåtgärder.", "لجأت النقابة إلى إجراءات تضامنية."],
    "Lexin027402": ["Föreningen för synskadade.", "جمعية ذوي الإعاقة البصرية (المكفوفين)."],
    "Lexin027412": ["Göra en synundersökning hos optikern.", "إجراء فحص نظر (بصر) عند أخصائي البصريات."],
    "Lexin027466": ["Prata med SYV (studie- och yrkesvägledaren).", "تحدث مع مرشد الدراسة والمهنة (SYV)."],
    "Lexin027534": ["Jag vill säga upp ett avtal.", "أريد إنهاء (فسخ) عقد."],
    "Lexin027627": ["Vi är särbor men ses på helgerna.", "نحن نعيش منفصلين (Särbor - أحباء في مسكنين) لكن نلتقي في عطلات نهاية الأسبوع."],
    "Lexin027639": ["Följa en särskild behandlingsplan.", "اتباع خطة علاج خاصة."],
    "Lexin027643": ["Arvet ska vara mottagarens särskilda egendom.", "يجب أن يكون الميراث ملكية خاصة للمستلم (لا تدخل في الممتلكات المشتركة للزوجين)."],
    "Lexin027662": ["Särskilda varianter av gymnasieprogram.", "أنواع (متغيرات) خاصة من برامج الثانوية."],
    "Lexin027665": ["Få särskilt anställningsstöd för att komma i jobb.", "الحصول على دعم توظيف خاص للدخول في العمل."],
    "Lexin027666": ["Få särskilt bidrag till glasögon.", "الحصول على إعانة خاصة للنظارات."],
    "Lexin027667": ["Flytta till ett särskilt boende (äldreboende).", "الانتقال إلى سكن خاص (رعاية المسنين)."],
    "Lexin027668": ["Söka särskilt bostadstillägg till pensionärer (SBTP).", "طلب علاوة سكن خاصة للمتقاعدين."],
    "Lexin027670": ["Få stöd genom SIUS (särskilt introduktions- och uppföljningsstöd).", "الحصول على دعم عبر SIUS (دعم مقدمة ومتابعة خاص)."],
    "Lexin027671": ["Särskilt pensionstillägg för långvarigt sjuka.", "علاوة معاش خاصة للمرضى لفترات طويلة."],
    "Lexin027676": ["Gå i särskola om man har inlärningssvårigheter.", "الذهاب إلى مدرسة خاصة (للإحتياجات الخاصة) إذا كان لدى المرء صعوبات تعلم."],
    "Lexin027678": ["Läsa på Särvux (särskild utbildning för vuxna).", "الدراسة في Särvux (تعليم خاص للكبار)."],
    "Lexin027681": ["Jobba med säsongsanställning på sommaren.", "العمل بتوظيف موسمي في الصيف."],
    "Lexin027816": ["Det finns ett takbelopp för högkostnadsskyddet.", "يوجد سقف (حد أقصى) لحماية التكلفة العالية."],
    "Lexin027865": ["Talmannen leder riksdagens arbete.", "رئيس البرلمان يقود عمل البرلمان."],
    "Lexin028008": ["Din taxerade inkomst står i deklarationen.", "دخلك الخاضع للضريبة موجود في الإقرار."],
    "Lexin028016": ["Husets taxeringsvärde påverkar skatten.", "القيمة الضريبية للمنزل تؤثر على الضريبة."],
    "Lexin028019": ["Du måste ha taxiförarlegitimation för att köra taxi.", "يجب أن يكون لديك بطاقة تعريف سائق تاكسي لقيادة التاكسي."],
    "Lexin028124": ["Skriva teoriprov för körkort.", "كتابة الاختبار النظري لرخصة القيادة."],
    "Lexin028155": ["Köra terränghjuling i skogen.", "قيادة دراجة رباعية (للتضاريس) في الغابة."],
    "Lexin028202": ["En tidig granskning av ärendet.", "مراجعة مبكرة للقضية."],
    "Lexin028207": ["Bra tidplanering är viktigt för projektet.", "التخطيط الزمني الجيد مهم للمشروع."],
    "Lexin028208": ["Vi har ett tidplaneringsmöte imorgon.", "لدينا اجتماع تخطيط زمني غداً."],
    "Lexin028215": ["Ansöka om tidsbegränsat bygglov.", "طلب تصريح بناء محدد المدة."],
    "Lexin028225": ["Vi ligger efter i tidsschemat.", "نحن متأخرون عن الجدول الزمني."],
    "Lexin028239": ["Diskussionen om förbud mot tiggeri.", "النقاش حول حظر التسول."],
    "Lexin028331": ["Redovisa tillgångar och skulder.", "الإبلاغ عن (عرض) الأصول والخصوم (الديون)."],
    "Lexin028398": ["Få en tillsvidareanställning (fast jobb).", "الحصول على توظيف حتى إشعار آخر (وظيفة ثابتة)."],
    "Lexin028405": ["Länsstyrelsen är en av våra tillsynsmyndigheter.", "مجلس إدارة المحافظة هو أحد سلطات الرقابة لدينا."],
    "Lexin028478": ["Målet togs upp i Tingsrätten.", "نُظرت القضية في المحكمة الابتدائية."],
    "Lexin028571": ["Prästen bor i en tjänstebostad.", "يعيش الكاهن في سكن وظيفي."],
    "Lexin028574": ["Bilen är en skattepliktig tjänsteförmån.", "السيارة هي ميزة وظيفية خاضعة للضريبة."],
    "Lexin028577": ["Tjänstemännen på verket.", "الموظفون في المصلحة."],
    "Lexin028578": ["TCO (Tjänstemännens Centralorganisation).", "TCO (المنظمة المركزية للموظفين)."],
    "Lexin028619": ["Ringa tolkförmedlingen för att boka tolk.", "الاتصال بوكالة الترجمة لحجز مترجم."],
    "Lexin028622": ["Facket har tolkningsföreträde vid tvist om lön.", "للنقابة أولوية التفسير في نزاعات الرواتب."],
    "Lexin028748": ["Övningsköra på en trafikskola.", "التدرب على القيادة في مدرسة تعليم القيادة."],
    "Lexin028770": ["Du behöver traktorkort för att köra traktor på väg.", "تحتاج إلى رخصة جرار لقيادة الجرار على الطريق."],
    "Lexin028807": ["Transportstyrelsen utfärdar körkort.", "مجلس النقل يصدر رخص القيادة."],
    "Lexin028852": ["Skadan drabbade tredje man (oskyldig part).", "أصاب الضرر طرفاً ثالثاً (طرفاً بريئاً)."],
    "Lexin028882": ["Ställa någon inför tribunalen (domstolen).", "تقديم شخص ما إلى المحكمة (Tribunal)."],
    "Lexin028994": ["Offentlighetsprincipen finns i Tryckfrihetsförordningen (TF).", "مبدأ العلنية موجود في قانون حرية الصحافة (TF)."],
    "Lexin029008": ["Trygghetsanställning för äldre arbetslösa.", "توظيف أمان للعاطلين عن العمل كبار السن."],
    "Lexin029009": ["Flytta till ett trygghetsboende (för 70+).", "الانتقال إلى سكن أمان (لمن هم فوق 70)."],
    "Lexin029010": ["Få ersättning från TFA (Trygghetsförsäkring vid arbetsskada).", "الحصول على تعويض من TFA (تأمين الأمان عند إصابة العمل)."],
    "Lexin029011": ["Larma trygghetsjouren om något händer.", "تنبيه خدمة طوارئ الأمان إذا حدث شيء ما."],
    "Lexin029068": ["Barnet placerades i en träningsfamilj.", "وُضع الطفل في عائلة تدريب."],
    "Lexin029069": ["Gå i träningsskola (inriktning inom särskolan).", "الذهاب إلى مدرسة تدريب (تخصص داخل المدرسة الخاصة)."],
    "Lexin029129": ["Stoppades i tullen.", "أُوقف في الجمارك."],
    "Lexin029153": ["Köra tung motorcykel (A-behörighet).", "قيادة دراجة نارية ثقيلة (فئة A)."],
    "Lexin029200": ["Uppsägning sker enligt turordning (sist in, först ut).", "الفصل يتم وفقاً لترتيب الدور (الأخير دخولاً، الأول خروجاً)."],
    "Lexin029221": ["Dömd för tvegifte (bigami).", "أدين بتعدد الأزواج (الزواج من اثنين)."],
    "Lexin029261": ["Begära tvångsbodelning vid skilsmässa.", "طلب تقسيم ممتلكات قسري عند الطلاق."],
    "Lexin029276": ["Tvångsäktenskap är olagligt.", "الزواج القسري غير قانوني."],
    "Lexin029341": ["Läsa svenska för invandrare (sfi).", "دراسة السويدية للمهاجرين (sfi)."],
    "Lexin029342": ["Svenska Kraftnät sköter elnätet.", "شبكة الطاقة السويدية تدير شبكة الكهرباء."],
    "Lexin029573": ["Gruvarbetare är ofta underjordsarbetare.", "عمال المناجم هم غالباً عمال تحت الأرض."],
    "Lexin029620": ["Militärens underrättelseverksamhet.", "نشاط الاستخبارات العسكرية."],
    "Lexin029623": ["Kommunens budget visar underskott.", "ميزانية البلدية تظهر عجزاً."],
    "Lexin029660": ["Det är förbjudet att sälja alkohol till underårig.", "يمنع بيع الكحول للقاصرين."],
    "Lexin029678": ["Särskilda regler för unga lagöverträdare.", "قواعد خاصة للمخالفين القانونيين الصغار (الأحداث)."],
    "Lexin029762": ["Jag är uppdragstagare, inte anställd.", "أنا متعهد (منفذ مهمة)، لست موظفاً."],
    "Lexin029774": ["EU-medborgare behöver inte uppehållskort (men familjemedlemmar kan behöva).", "مواطنو الاتحاد الأوروبي لا يحتاجون إلى بطاقة إقامة (لكن أفراد الأسرة قد يحتاجونها)."],
    "Lexin029838": ["Lagen om upphovsrätt skyddar konstnärer.", "قانون حق المؤلف يحمي الفنانين."],
    "Lexin029860": ["Jag kuggade på uppkörningen.", "رسبت في اختبار القيادة العملي (Uppkörning)."],
    "Lexin029883": ["Får jag upplåta lägenheten i andra hand?", "هل يجوز لي تأجير الشقة من الباطن؟"],
    "Lexin029885": ["Det finns olika upplåtelseformer för bostäder.", "توجد أشكال حيازة مختلفة للمساكن."],
    "Lexin029886": ["Betala en upplåtelseinsats till föreningen.", "دفع مساهمة حيازة (إيداع) للجمعية."],
    "Lexin029927": ["Fastighetsägaren fick ett upprustningsföreläggande.", "تلقى مالك العقار أمراً بالترميم."],
    "Lexin029945": ["Han blev uppsagd på grund av arbetsbrist.", "تم فصله بسبب نقص العمل."],
    "Lexin029997": ["Uppsägning på grund av arbetsbrist är vanligast.", "الفصل بسبب نقص العمل هو الأكثر شيوعاً."],
    "Lexin029998": ["Uppsägning på grund av personliga skäl (misskötsamhet).", "الفصل لأسباب شخصية (سوء سلوك)."],
    "Lexin030095": ["Graven är en urngrav.", "القبر هو قبر جرة (للرماد)."]
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

const backupPath = DATA_FILE + '.backup_others8_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Others Batch 8 completed!`);
