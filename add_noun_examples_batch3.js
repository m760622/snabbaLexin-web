/**
 * Add examples to nouns - Batch 3 (100 nouns: April to Atombomb)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin001273": ["April är vårens månad.", "أبريل هو شهر الربيع."],
    "Lexin001274": ["Aprilväder kan växla snabbt.", "طقس أبريل يمكن أن يتغير بسرعة."],
    "Lexin001281": ["Araben berättade om sin kultur.", "روى العربي عن ثقافته."],
    "Lexin001282": ["Araben är en elegant häst.", "الحصان العربي حصان أنيق."],
    "Lexin001284": ["Arabiska talas av miljoner människor.", "يتحدث العربية ملايين الناس."],
    "Lexin001285": ["Arabiskan undervisade i sitt modersmål.", "درّست العربية لغتها الأم."],
    "Lexin001291": ["Arbetaren jobbar på fabriken.", "يعمل العامل في المصنع."],
    "Lexin001292": ["Arbetarkommunen organiserar lokala aktiviteter.", "ينظم القسم المحلي للعمال أنشطة محلية."],
    "Lexin001293": ["Arbetarrörelsen kämpade för rättvisa.", "ناضلت حركة العمال من أجل العدالة."],
    "Lexin001295": ["Arbetarskydd är viktigt på byggarbetsplatser.", "حماية العمال مهمة في مواقع البناء."],
    "Lexin001310": ["Arbetsbiträdet hjälper henne med jobbet.", "يساعدها المساعد العملي في العمل."],
    "Lexin001325": ["Arbetsförmedlingen förmedlar jobb till arbetslösa.", "يوفر مكتب العمل وظائف للعاطلين."],
    "Lexin001328": ["Arbetsgivaravgiften är ca 31 procent.", "رسوم أرباب العمل حوالي 31 بالمئة."],
    "Lexin001348": ["Arbetslivserfarenhet är viktig vid anställning.", "خبرة الحياة العملية مهمة عند التوظيف."],
    "Lexin001352": ["Arbetslöshetsförsäkringen ger ekonomiskt stöd.", "يوفر تأمين البطالة دعماً مالياً."],
    "Lexin001360": ["Arbetsmarknadsstödet hjälper arbetslösa.", "تساعد إعانة سوق العمل العاطلين."],
    "Lexin001374": ["Filmen har fortfarande ett arbetsnamn.", "لا يزال للفيلم اسم عمل مؤقت."],
    "Lexin001375": ["Arbetsnedläggelsen varade i tre dagar.", "استمر الإضراب ثلاثة أيام."],
    "Lexin001391": ["Arbetsprövningen visade hans förmåga.", "أظهرت تجربة العمل قدراته."],
    "Lexin001395": ["Hon fick ersättning för arbetsskadan.", "حصلت على تعويض عن إصابة العمل."],
    "Lexin001397": ["Arbetsskadeförsäkringen täcker vårdkostnader.", "يغطي تأمين إصابات العمل تكاليف العلاج."],
    "Lexin001401": ["Arbetsstyrkan består av 50 anställda.", "تتكون القوى العاملة من 50 موظفاً."],
    "Lexin001405": ["Arbetstagaren har rätt till semester.", "للعامل الحق في الإجازة."],
    "Lexin001407": ["Arbetsterapeuten hjälpte honom träna.", "ساعده أخصائي التأهيل على التدريب."],
    "Lexin001409": ["Arbetsterapi hjälper patienter återhämta sig.", "يساعد التأهيل العملي المرضى على التعافي."],
    "Lexin001416": ["Arbetsträningen var en del av rehabiliteringen.", "كان التدريب على العمل جزءاً من إعادة التأهيل."],
    "Lexin001423": ["Arbetsvården stödjer handikappade arbetare.", "تدعم رعاية العمل العمال ذوي الإعاقة."],
    "Lexin001424": ["Arbetsvägledaren gav råd om yrken.", "قدم مرشد الاختيار المهني نصائح عن المهن."],
    "Lexin001425": ["Arbetsvägledningen hjälpte henne välja yrke.", "ساعدها الإرشاد المهني على اختيار مهنة."],
    "Lexin001428": ["Husets area är 120 kvadratmeter.", "مساحة المنزل 120 متراً مربعاً."],
    "Lexin001429": ["Markens areal mättes noggrant.", "قيست مساحة الأرض بدقة."],
    "Lexin001431": ["Arenan rymmer 50 000 åskådare.", "يتسع الملعب لـ 50,000 متفرج."],
    "Lexin001433": ["Argentinaren spelar i landslaget.", "يلعب الأرجنتيني في المنتخب الوطني."],
    "Lexin001437": ["Hans argumentation var övertygande.", "كان جداله مقنعاً."],
    "Lexin001440": ["Sopranens aria var fantastisk.", "كانت أغنية السوبرانو رائعة."],
    "Lexin001441": ["Aristokraten bodde i ett slott.", "عاش الأرستقراطي في قصر."],
    "Lexin001442": ["Aristokratin hade stora privilegier.", "كان للأرستقراطية امتيازات كبيرة."],
    "Lexin001444": ["Noas ark räddade djuren.", "أنقذت سفينة نوح الحيوانات."],
    "Lexin001445": ["Hon skrev på ett ark papper.", "كتبت على ورقة."],
    "Lexin001446": ["Arkaden har många affärer.", "يحتوي الرواق على متاجر كثيرة."],
    "Lexin001448": ["Arkeologen grävde upp gamla lämningar.", "اكتشف عالم الآثار بقايا قديمة."],
    "Lexin001449": ["Arkeologi studerar forntida kulturer.", "يدرس علم الآثار الثقافات القديمة."],
    "Lexin001450": ["Hjälten är en arketyp i litteraturen.", "البطل نموذج أصلي في الأدب."],
    "Lexin001451": ["Arkipelagen består av tusentals öar.", "يتكون الأرخبيل من آلاف الجزر."],
    "Lexin001454": ["Arkitekturen i staden är imponerande.", "العمارة في المدينة مذهلة."],
    "Lexin001455": ["Dokumenten förvaras i arkivet.", "تُحفظ الوثائق في الأرشيف."],
    "Lexin001460": ["Armaturen i köket behöver bytas.", "تحتاج تركيبات الإضاءة في المطبخ للاستبدال."],
    "Lexin001463": ["Min armbandsuret visar fel tid.", "ساعة يدي تعرض الوقت الخاطئ."],
    "Lexin001466": ["Han skadade sin armbåge.", "أصاب مرفقه."],
    "Lexin001473": ["Armeniern berättade om sitt hemland.", "روى الأرمني عن وطنه."],
    "Lexin001475": ["Armeniska har ett unikt alfabet.", "للأرمنية أبجدية فريدة."],
    "Lexin001478": ["Armeringen förstärker betongen.", "يقوي التسليح الخرسانة."],
    "Lexin001497": ["Kaffets arom fyllde rummet.", "ملأت رائحة القهوة الغرفة."],
    "Lexin001502": ["Arrendatorn odlar marken.", "يزرع المستأجر الأرض."],
    "Lexin001514": ["Hans arrogans irriterade alla.", "أزعجت غطرسته الجميع."],
    "Lexin001518": ["Han slog i arslet när han föll.", "ارتطم بمؤخرته عندما سقط."],
    "Lexin001521": ["Art directorn designade kampanjen.", "صمم المدير الفني الحملة."],
    "Lexin001535": ["I svenskan finns två artiklar.", "في السويدية توجد أداتا تعريف."],
    "Lexin001538": ["Artilleriet beskjöt fiendens ställning.", "قصفت المدفعية موقع العدو."],
    "Lexin001541": ["Artisten uppträdde inför tusentals fans.", "أدى الفنان أمام آلاف المعجبين."],
    "Lexin001543": ["Hund är ett artnamn.", "الكلب اسم نوع."],
    "Lexin001551": ["Artären för blodet bort från hjärtat.", "يحمل الشريان الدم بعيداً عن القلب."],
    "Lexin001555": ["Arvingen fick hela förmögenheten.", "حصل الوريث على كل الثروة."],
    "Lexin001558": ["Advokaten tog ut ett högt arvode.", "تقاضى المحامي أتعاباً عالية."],
    "Lexin001563": ["Arvskiftet blev komplicerat.", "أصبح تقسيم الإرث معقداً."],
    "Lexin001571": ["Arvsynden är ett kristet begrepp.", "الخطيئة الموروثة مفهوم مسيحي."],
    "Lexin001572": ["Arvtagaren tog över företaget.", "تولى الوريث إدارة الشركة."],
    "Lexin001575": ["Gamen åt av aset.", "أكل النسر من الجيفة."],
    "Lexin001576": ["Oden var den mäktigaste av asarna.", "كان أودين أقوى الآلهة الإسكندنافية."],
    "Lexin001577": ["Asbest är farligt att andas in.", "الأسبست خطر للتنفس."],
    "Lexin001578": ["Vägen är belagd med asfalt.", "الطريق مغطى بالأسفلت."],
    "Lexin001592": ["Asiaten representerade sitt land.", "مثّل الآسيوي بلاده."],
    "Lexin001596": ["Asken är ett hårt träslag.", "المُران خشب صلب."],
    "Lexin001597": ["Askan låg kvar efter elden.", "بقي الرماد بعد الحريق."],
    "Lexin001599": ["Asketen levde ett enkelt liv.", "عاش الزاهد حياة بسيطة."],
    "Lexin001600": ["Askfatet stod på bordet.", "كانت المنفضة على الطاولة."],
    "Lexin001602": ["Askkoppen var full av fimpar.", "كانت المنفضة ممتلئة بأعقاب السجائر."],
    "Lexin001603": ["Fastetiden börjar på askonsdagen.", "يبدأ الصوم يوم أربعاء الرماد."],
    "Lexin001606": ["Aspens löv darrar i vinden.", "ترتجف أوراق الحور في الريح."],
    "Lexin001609": ["Aspiranten sökte tjänsten som chef.", "تقدم المرشح للوظيفة كمدير."],
    "Lexin001612": ["Smörgåsen serverades på en assiett.", "قُدمت الشطيرة على صحن صغير."],
    "Lexin001615": ["Hon behövde assistans med flyttningen.", "احتاجت مساعدة في الانتقال."],
    "Lexin001617": ["Assistenten hjälpte chefen med rapporten.", "ساعد المساعد المدير في التقرير."],
    "Lexin001618": ["Assistenten blandade degen snabbt.", "خلطت ماكينة الطعام العجين بسرعة."],
    "Lexin001621": ["Associationen mellan orden var tydlig.", "كان الترابط بين الكلمتين واضحاً."],
    "Lexin001627": ["Paketet skickades med assurans.", "أُرسل الطرد بضمان."],
    "Lexin001629": ["Assyriern talade flera språk.", "تحدث الآشوري عدة لغات."],
    "Lexin001631": ["Astern blommar på hösten.", "تزهر النجمية في الخريف."],
    "Lexin001632": ["Asterisken hänvisar till en fotnot.", "تشير النجمة إلى حاشية."],
    "Lexin001635": ["Astma kan utlösas av allergener.", "يمكن أن يُثار الربو بمسببات الحساسية."],
    "Lexin001639": ["Astrologi används för att spå framtiden.", "يُستخدم التنجيم للتنبؤ بالمستقبل."],
    "Lexin001640": ["Astronauten flög till rymdstationen.", "طار رائد الفضاء إلى محطة الفضاء."],
    "Lexin001641": ["Astronomi studerar stjärnor och planeter.", "يدرس علم الفلك النجوم والكواكب."],
    "Lexin001654": ["Ateisten tror inte på Gud.", "الملحد لا يؤمن بالله."],
    "Lexin001656": ["Konstnären arbetade i sin ateljé.", "عمل الفنان في الاستوديو."],
    "Lexin001661": ["Atlasen visar alla länder i världen.", "يعرض الأطلس جميع دول العالم."],
    "Lexin001663": ["Atleten vann guldmedaljen.", "فاز الرياضي بالميدالية الذهبية."],
    "Lexin001666": ["Atollen ligger i Stilla havet.", "تقع الجزيرة المرجانية في المحيط الهادئ."],
    "Lexin001667": ["Atomen är materiens minsta del.", "الذرة هي أصغر جزء من المادة."],
    "Lexin001668": ["Atombomben orsakade enorm förstörelse.", "سببت القنبلة الذرية دماراً هائلاً."]
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

const backupPath = DATA_FILE + '.backup_nouns3_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns.`);
