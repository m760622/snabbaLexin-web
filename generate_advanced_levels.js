const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

// --- DATA STRUCTURE ---
const ADVANCED_THEMES = {
    1: [ // Food
        { main: "SKÅL", targets: ["SKÅL", "KÅL"], data: { "SKÅL": { "t": "وعاء", "s": "Jag häller soppan i en skål.", "st": "أصب الحساء في وعاء." }, "KÅL": { "t": "ملفوف", "s": "Kål är en nyttig grönsak.", "st": "الملفوف خضار صحي." } } },
        { main: "SAFT", targets: ["SAFT", "FAT"], data: { "SAFT": { "t": "عصير", "s": "Barnen dricker saft.", "st": "الأطفال يشربون العصير." }, "FAT": { "t": "طبق / برميل", "s": "Lägg kakan på ett fat.", "st": "ضع الكعكة على طبق." } } },
        { main: "KNIV", targets: ["KNIV", "VIN"], data: { "KNIV": { "t": "سكين", "s": "Akta dig för kniven.", "st": "احذر من السكين." }, "VIN": { "t": "نبيذ", "s": "Ett glas rött vin.", "st": "كأس من النبيذ الأحمر." } } },
        { main: "KAKOR", targets: ["KAKOR", "KOKA", "KORA"], data: { "KAKOR": { "t": "كعك", "s": "Vi bakade goda kakor.", "st": "خبزنا كعكاً لذيذاً." }, "KOKA": { "t": "يغلي", "s": "Vattnet börjar koka.", "st": "الماء يبدأ بالغليان." }, "KORA": { "t": "يختار / ينتخب", "s": "De ska kora en vinnare.", "st": "سيختارون فائزاً." } } },
        { main: "SKALA", targets: ["SKALA", "KALAS", "SALA"], data: { "SKALA": { "t": "يقشر", "s": "Kan du skala potatisen?", "st": "هل يمكنك تقشير البطاطس؟" }, "KALAS": { "t": "حفلة", "s": "Vi hade ett roligt kalas.", "st": "أقمنا حفلة ممتعة." }, "SALA": { "t": "يملح (السمك)", "s": "Man måste sala fisken väl.", "st": "يجب تمليح السمك جيداً." } } },
        { main: "BAKAR", targets: ["BAKAR", "BAKA", "BARA"], data: { "BAKAR": { "t": "يخبز (صيغة المضارع)", "s": "Hon bakar bröd varje dag.", "st": "هي تخبز الخبز كل يوم." }, "BAKA": { "t": "يخبز", "s": "Vi ska baka en tårta.", "st": "سنخبز كعكة." }, "BARA": { "t": "فقط", "s": "Jag vill bara ha vatten.", "st": "أريد ماء فقط." } } },
        { main: "FISKAR", targets: ["FISKAR", "FISKA", "FRISK", "SIKAR"], data: { "FISKAR": { "t": "أسماك", "s": "Det finns många fiskar i sjön.", "st": "يوجد الكثير من الأسماك في البحيرة." }, "FISKA": { "t": "يصطاد سمك", "s": "Att fiska är avkopplande.", "st": "صيد السمك مريح للأعصاب." }, "FRISK": { "t": "صحي / طازج", "s": "Luften är frisk efter regnet.", "st": "الهواء منعش بعد المطر." }, "SIKAR": { "t": "أسماك السيك", "s": "Sikar trivs i kallt vatten.", "st": "تعيش أسماك السيك في الماء البارد." } } },
        { main: "ROSTAR", targets: ["ROSTAR", "OSTAR", "ROSTA", "STORA"], data: { "ROSTAR": { "t": "يحمص / يصدأ", "s": "Han rostar bröd till frukost.", "st": "هو يحمص الخبز للإفطار." }, "OSTAR": { "t": "أجبان", "s": "Vi provade olika ostar.", "st": "جربنا أجباناً مختلفة." }, "ROSTA": { "t": "يحمص", "s": "Kan du rosta brödet?", "st": "هل يمكنك تحميص الخبز؟" }, "STORA": { "t": "كبيرة", "s": "De har stora planer.", "st": "لديهم خطط كبيرة." } } },
        { main: "SKÅLAR", targets: ["SKÅLAR", "KÅLAR", "SKÅLA", "SKÅRA"], data: { "SKÅLAR": { "t": "أوعية / يشرب نخب", "s": "Vi lyfter våra skålar.", "st": "نرفع كؤوسنا (لشرب النخب)." }, "KÅLAR": { "t": "أنواع الملفوف", "s": "Olika kålar växer i landet.", "st": "أنواع مختلفة من الملفوف تنمو في الحقل." }, "SKÅLA": { "t": "يشرب نخب", "s": "Låt oss skåla för brudparet.", "st": "دعونا نشرب نخب العروسين." }, "SKÅRA": { "t": "شق / ثلم", "s": "En djup skåra i bordet.", "st": "شق عميق في الطاولة." } } },
        { main: "FRUKOST", targets: ["FRUKOST", "FRUKT", "KOST", "ROST", "KORT"], data: { "FRUKOST": { "t": "إفطار", "s": "Frukost är dagens viktigaste mål.", "st": "الإفطار هو أهم وجبة في اليوم." }, "FRUKT": { "t": "فاكهة", "s": "Ät mer frukt och grönt.", "st": "تناول المزيد من الفاكهة والخضروات." }, "KOST": { "t": "نظام غذائي", "s": "En balanserad kost är bra för hälsan.", "st": "النظام الغذائي المتوازن جيد للصحة." }, "ROST": { "t": "صدأ", "s": "Det finns rost på den gamla cykeln.", "st": "يوجد صدأ على الدراجة القديمة." }, "KORT": { "t": "قصير / بطاقة", "s": "Skriv ett kort meddelande.", "st": "اكتب رسالة قصيرة." } } }
    ],
    2: [ // Nature
        { main: "TRÄD", targets: ["TRÄD", "TRÄ"], data: { "TRÄD": { "t": "شجرة", "s": "Ett gammalt träd står i parken.", "st": "شجرة قديمة تقف في الحديقة." }, "TRÄ": { "t": "خشب", "s": "Möbeln är gjord av trä.", "st": "الأثاث مصنوع من الخشب." } } },
        { main: "LÖVA", targets: ["LÖVA", "LÖV"], data: { "LÖVA": { "t": "تكتسي بالأوراق", "s": "Träden börjar löva sig på våren.", "st": "تبدأ الأشجار باكتساء الأوراق في الربيع." }, "LÖV": { "t": "ورقة شجر", "s": "Ett gult löv föll från trädet.", "st": "سقطت ورقة صفراء من الشجرة." } } },
        { main: "MYRA", targets: ["MYRA", "MYR"], data: { "MYRA": { "t": "نملة", "s": "En liten myra kröp på marken.", "st": "زحفت نملة صغيرة على الأرض." }, "MYR": { "t": "مستنقع", "s": "Vi gick över en myr.", "st": "مشينا عبر مستنقع." } } },
        { main: "ANDAS", targets: ["ANDAS", "SAND", "ANDA"], data: { "ANDAS": { "t": "يتنفس", "s": "Kom ihåg att andas in djupt.", "st": "تذكر أن تتنفس بعمق." }, "SAND": { "t": "رمل", "s": "Stranden har vit och mjuk sand.", "st": "الشاطئ به رمال بيضاء وناعمة." }, "ANDA": { "t": "روح", "s": "Vi arbetar i god anda tillsammans.", "st": "نحن نعمل بروح طيبة معاً." } } },
        { main: "REGNA", targets: ["REGNA", "REGN", "GRAN"], data: { "REGNA": { "t": "تمطر", "s": "Det ska regna hela dagen.", "st": "ستنهمر الأمطار طوال اليوم." }, "REGN": { "t": "مطر", "s": "Vi behöver regn för växterna.", "st": "نحتاج المطر للنباتات." }, "GRAN": { "t": "شجرة التنوب", "s": "Vi klär granen till jul.", "st": "نزين شجرة التنوب لعيد الميلاد." } } },
        { main: "ALVAR", targets: ["ALVAR", "LAVA", "VARA"], data: { "ALVAR": { "t": "سهل ألڤار (سهل كلسي)", "s": "Ölands alvar är unikt.", "st": "سهل ألڤار في أولاند فريد من نوعه." }, "LAVA": { "t": "حمم", "s": "Vulkanen sprutade ut het lava.", "st": "قذف البركان حمماً ساخنة." }, "VARA": { "t": "سلعة / يكون", "s": "Det är en bra vara.", "st": "إنها سلعة جيدة." } } },
        { main: "GRENAR", targets: ["GRENAR", "RENAR", "GRANE", "ANGRE"], data: { "GRENAR": { "t": "أغصان", "s": "Trädets grenar sträcker sig mot himlen.", "st": "تمتد أغصان الشجرة نحو السماء." }, "RENAR": { "t": "حيوانات الرنة", "s": "Renar lever i norra Sverige.", "st": "تعيش حيوانات الرنة في شمال السويد." }, "GRANE": { "t": "شجرة تنوب", "s": "En hög grane stod vid skogsbrynet.", "st": "وقفت شجرة تنوب عالية عند حافة الغابة." }, "ANGRE": { "t": "يندم", "s": "Du kommer att angre dig.", "st": "ستندم على ذلك." } } },
        { main: "STENAR", targets: ["STENAR", "RENAR", "RENSA", "ARTEN"], data: { "STENAR": { "t": "أحجار", "s": "Kasta inte stenar.", "st": "لا ترمِ الحجارة." }, "RENAR": { "t": "حيوانات الرنة", "s": "Renar lever i norra Sverige.", "st": "تعيش حيوانات الرنة في شمال السويد." }, "RENSA": { "t": "ينظف (سمك/فطر)", "s": "Vi måste rensa fisken vi fångade.", "st": "يجب أن ننظف السمكة التي اصطدناها." }, "ARTEN": { "t": "النوع (بيولوجي)", "s": "Arten är fridlyst.", "st": "النوع محمي." } } },
        { main: "GRODAN", targets: ["GRODAN", "GRODA", "DRAGON", "ORGAN"], data: { "GRODAN": { "t": "الضفدع", "s": "Grodan hoppade i vattnet.", "st": "قفز الضفدع في الماء." }, "GRODA": { "t": "ضفدع", "s": "En grön groda.", "st": "ضفدع أخضر." }, "DRAGON": { "t": "طرخون (عشب)", "s": "Dragon passar bra till kyckling.", "st": "الطرخون يناسب الدجاج جيداً." }, "ORGAN": { "t": "عضو (جسم/موسيقى)", "s": "Hjärtat är ett viktigt organ.", "st": "القلب عضو مهم." } } },
        { main: "STJÄRNA", targets: ["STJÄRNA", "TJÄRN", "TÄRNA", "SÄRTA", "TJÄRA"], data: { "STJÄRNA": { "t": "نجمة", "s": "En stjärna föll från himlen.", "st": "سقطت نجمة من السماء." }, "TJÄRN": { "t": "بحيرة صغيرة", "s": "Vi badade i en liten tjärn.", "st": "سبحنا في بحيرة صغيرة." }, "TÄRNA": { "t": "وصيفة / طائر الخرشنة", "s": "Hon var tärna på bröllopet.", "st": "كانت وصيفة في حفل الزفاف." }, "SÄRTA": { "t": "بطة", "s": "En särta simmade i viken.", "st": "سبحت بطة في الخليج." }, "TJÄRA": { "t": "قطران", "s": "Båten var struken med tjära.", "st": "كان القارب مطلياً بالقطران." } } }
    ],
    3: [ // Travel
        { main: "RESA", targets: ["RESA", "RES"], data: { "RESA": { "t": "سفر / رحلة", "s": "Vi ska göra en lång resa.", "st": "سنقوم برحلة طويلة." }, "RES": { "t": "سافر (أمر)", "s": "Res dig upp och gå!", "st": "انهض وامشِ!" } } },
        { main: "PASS", targets: ["PASS", "ASP"], data: { "PASS": { "t": "جواز سفر", "s": "Glöm inte ditt pass.", "st": "لا تنس جواز سفرك." }, "ASP": { "t": "حور رجراج", "s": "Löven på en asp darrar.", "st": "أوراق الحور الرجراج ترتجف." } } },
        { main: "BERG", targets: ["BERG", "BER"], data: { "BERG": { "t": "جبل", "s": "Vi besteg ett högt berg.", "st": "تسلقنا جبلاً عالياً." }, "BER": { "t": "يصلي / يطلب", "s": "Hon ber om ursäkt för misstaget.", "st": "هي تعتذر عن الخطأ." } } },
        { main: "BOKAS", targets: ["BOKAS", "BOKA", "KOSA"], data: { "BOKAS": { "t": "يُحجز", "s": "Biljetterna måste bokas i förväg.", "st": "يجب حجز التذاكر مسبقاً." }, "BOKA": { "t": "يحجز", "s": "Jag ska boka ett hotellrum.", "st": "سأحجز غرفة في فندق." }, "KOSA": { "t": "وجهة / مسار", "s": "Vi styrde vår kosa mot norr.", "st": "وجهنا مسارنا نحو الشمال." } } },
        { main: "SPÅRA", targets: ["SPÅRA", "PÅSAR", "RAPS"], data: { "SPÅRA": { "t": "يتتبع", "s": "Hunden kan spåra tjuven.", "st": "يمكن للكلب تتبع اللص." }, "PÅSAR": { "t": "أكياس", "s": "Vi bar hem maten i stora påsar.", "st": "حملنا الطعام إلى المنزل في أكياس كبيرة." }, "RAPS": { "t": "لفت", "s": "Gula fält av raps.", "st": "حقول صفراء من اللفت." } } },
        { main: "ASTER", targets: ["ASTER", "RESA", "RAST"], data: { "ASTER": { "t": "زهرة النجمة", "s": "En vacker lila aster.", "st": "زهرة نجمة أرجوانية جميلة." }, "RESA": { "t": "سفر / رحلة", "s": "Vi ska göra en lång resa.", "st": "سنقوم برحلة طويلة." }, "RAST": { "t": "استراحة", "s": "Barnen leker ute på sin rast.", "st": "الأطفال يلعبون في الخارج خلال استراحتهم." } } },
        { main: "FÄRDEN", targets: ["FÄRDEN", "FÄRDE", "NÄRDE", "RÄNDE"], data: { "FÄRDEN": { "t": "الرحلة", "s": "Färden mot norr var mycket kall.", "st": "كانت الرحلة نحو الشمال باردة جداً." }, "FÄRDE": { "t": "خطر", "s": "Nu är det fara å färde.", "st": "الآن هناك خطر محدق." }, "NÄRDE": { "t": "غذى", "s": "Han närde en dröm.", "st": "كان يغذي حلماً." }, "RÄNDE": { "t": "نسج / ركض (قديم)", "s": "Hon rände väven igår.", "st": "نسجت النسيج أمس." } } },
        { main: "VÄDRET", targets: ["VÄDRET", "VÄRDET", "VÄRDE", "TRÄDE"], data: { "VÄDRET": { "t": "الطقس", "s": "Alla gillar att prata om vädret.", "st": "الجميع يحب الحديث عن الطقس." }, "VÄRDET": { "t": "القيمة", "s": "Värdet av allt vi äger är stort.", "st": "قيمة كل ما نملكه كبيرة." }, "VÄRDE": { "t": "قيمة", "s": "Detta har ett stort sentimentalt värde.", "st": "هذا له قيمة عاطفية كبيرة." }, "TRÄDE": { "t": "بور", "s": "Åkern fick ligga i träde ett år.", "st": "تُرك الحقل بوراً لمدة عام." } } },
        {
            main: "PENGAR", targets: ["PENGAR", "ANGRE", "GRANE", "REPAN"], data: {
                "PENGAR": {
                    "t": "نقود", "s": "Har du några pengar?",
                    "st": "هل لديك أي نقود؟"
                }, "ANGRE": { "t": "يندم", "s": "Du kommer att angre dig.", "st": "ستندم على ذلك." }, "GRANE": { "t": "شجرة تنوب", "s": "En hög grane stod vid skogsbrynet.", "st": "وقفت شجرة تنوب عالية عند حافة الغابة." }, "REPAN": { "t": "الخدش", "s": "Repan i lacken var djup.", "st": "الخدش في الطلاء كان عميقاً." }
            }
        },
        { main: "UTFLYKT", targets: ["UTFLYKT", "FLYKT", "FLYTT", "LYFT", "TUFT"], data: { "UTFLYKT": { "t": "نزهة", "s": "Vi åkte på en utflykt till skogen.", "st": "ذهبنا في نزهة إلى الغابة." }, "FLYKT": { "t": "هروب", "s": "Fångens flykt var dramatisk.", "st": "كان هروب السجين درامياً." }, "FLYTT": { "t": "انتقال", "s": "Vår flytt till den nya lägenheten gick bra.", "st": "انتقالنا إلى الشقة الجديدة سار بشكل جيد." }, "LYFT": { "t": "رفع / دفعة", "s": "Ett tungt lyft för ryggen.", "st": "رفع ثقيل للظهر." }, "TUFT": { "t": "خصلة", "s": "En tuft gräs växte mellan stenarna.", "st": "نبتت خصلة عشب بين الحجارة." } } }
    ],
    4: [ // Daily
        { main: "BORD", targets: ["BORD", "BOR"], data: { "BORD": { "t": "طاولة", "s": "Maten står på bordet.", "st": "الطعام على الطاولة." }, "BOR": { "t": "يسكن", "s": "Var bor du någonstans?", "st": "أين تسكن؟" } } },
        { main: "STOL", targets: ["STOL", "SOL"], data: { "STOL": { "t": "كرسي", "s": "Sitt på en stol.", "st": "اجلس على كرسي." }, "SOL": { "t": "شمس", "s": "Solen skiner idag.", "st": "الشمس مشرقة اليوم." } } },
        { main: "DÖRR", targets: ["DÖRR", "DÖR"], data: { "DÖRR": { "t": "باب", "s": "Stäng dörren, det drar kallt.", "st": "أغلق الباب، هناك تيار هواء بارد." }, "DÖR": { "t": "يموت", "s": "Blomman dör utan vatten.", "st": "الزهرة تموت بدون ماء." } } },
        { main: "SKOLA", targets: ["SKOLA", "KOLA", "SKAL"], data: { "SKOLA": { "t": "مدرسة", "s": "En ny skola ska byggas.", "st": "سيتم بناء مدرسة جديدة." }, "KOLA": { "t": "توفي", "s": "Vill du ha en seg kola?", "st": "هل تريد قطعة توفي لزجة؟" }, "SKAL": { "t": "قشرة", "s": "Apelsinens skal är tjockt.", "st": "قشرة البرتقال سميكة." } } },
        { main: "LAMPA", targets: ["LAMPA", "LAMA", "PALM"], data: { "LAMPA": { "t": "مصباح", "s": "Tänd lampan, det är mörkt.", "st": "أشعل المصباح، الجو مظلم." }, "LAMA": { "t": "لاما / مشلول", "s": "Laman är ett djur från Anderna.", "st": "اللاما حيوان من جبال الأنديز." }, "PALM": { "t": "نخلة", "s": "En hög palm växte vid stranden.", "st": "نمت نخلة طويلة عند الشاطئ." } } },
        { main: "KARTA", targets: ["KARTA", "AKTA", "RATA"], data: { "KARTA": { "t": "خريطة", "s": "Hitta vägen med en karta.", "st": "جد الطريق باستخدام خريطة." }, "AKTA": { "t": "يحذر", "s": "Akta dig för hunden!", "st": "احذر من الكلب!" }, "RATA": { "t": "يرفض", "s": "Man ska inte rata mat.", "st": "لا ينبغي رفض الطعام." } } },
        { main: "SKRIVA", targets: ["SKRIVA", "ARKIV", "SKIVA", "VIRKA"], data: { "SKRIVA": { "t": "يكتب", "s": "Jag gillar att skriva brev.", "st": "أحب كتابة الرسائل." }, "ARKIV": { "t": "أرشيف", "s": "Dokumenten finns i vårt arkiv.", "st": "الوثائق موجودة في أرشيفنا." }, "SKIVA": { "t": "شريحة", "s": "Vill du ha en skiva bröd?", "st": "هل تريد شريحة خبز؟" }, "VIRKA": { "t": "يكروشيه", "s": "Min mormor lärde mig virka.", "st": "جدتي علمتني الكروشيه." } } },
        { main: "KLÄDER", targets: ["KLÄDER", "LÄDER", "KLÄDE", "LÄRDE"], data: { "KLÄDER": { "t": "ملابس", "s": "Hon köper nya kläder.", "st": "هي تشتري ملابس جديدة." }, "LÄDER": { "t": "جلد", "s": "Jackan är av äkta läder.", "st": "السترة من الجلد الحقيقي." }, "KLÄDE": { "t": "قماش / جوخ", "s": "Ett fint kläde till dräkten.", "st": "قماش فاخر للزي." }, "LÄRDE": { "t": "علماء", "s": "De lärde tvistar om den saken.", "st": "العلماء يختلفون حول هذا الأمر." } } },
        { main: "BORSTA", targets: ["BORSTA", "BORST", "ROSTA", "STORA"], data: { "BORSTA": { "t": "يفرش / ينظف بالفرشاة", "s": "Kom ihåg att borsta tänderna.", "st": "تذكر أن تفرش أسنانك." }, "BORST": { "t": "شعيرات (فرشاة)", "s": "Borsten på penseln är hårda.", "st": "شعيرات الفرشاة قاسية." }, "ROSTA": { "t": "يحمص", "s": "Kan you rosta brödet?", "st": "هل يمكنك تحميص الخبز؟" }, "STORA": { "t": "كبيرة", "s": "De har stora planer.", "st": "لديهم خطط كبيرة." } } },
        { main: "STATION", targets: ["STATION", "NATT", "SATT", "STAT", "TANT"], data: { "STATION": { "t": "محطة", "s": "Vi möts vid nästa station.", "st": "نلتقي في المحطة التالية." }, "NATT": { "t": "ليل", "s": "Det var en mörk natt.", "st": "كانت ليلة مظلمة." }, "SATT": { "t": "جلس", "s": "Han satt tyst på sin stol.", "st": "جلس صامتاً على كرسيه." }, "STAT": { "t": "دولة", "s": "Staten ansvarar för vård och skola.", "st": "الدولة مسؤولة عن الرعاية الصحية والمدارس." }, "TANT": { "t": "عمة / خالة / سيدة", "s": "En snäll tant gav mig godis.", "st": "سيدة لطيفة أعطتني حلوى." } } }
    ],
    5: [ // Health
        { main: "TAND", targets: ["TAND", "AND"], data: { "TAND": { "t": "سن", "s": "Jag har ont i en tand.", "st": "لدي ألم في سن." }, "AND": { "t": "بطة", "s": "En and simmar i dammen.", "st": "بطة تسبح في البركة." } } },
        { main: "SMAK", targets: ["SMAK", "ASK"], data: { "SMAK": { "t": "طعم", "s": "Matens smak var fantastisk.", "st": "طعم الطعام كان رائعاً." }, "ASK": { "t": "شجرة الدردار / علبة", "s": "En liten ask tändstickor låg på bordet.", "st": "كانت هناك علبة كبريت صغيرة على الطاولة." } } },
        { main: "BLOD", targets: ["BLOD", "BOD"], data: { "BLOD": { "t": "دم", "s": "Blod är rött.", "st": "الدم أحمر." }, "BOD": { "t": "كوخ", "s": "Vi har en bod på gården.", "st": "لدينا كوخ في الفناء." } } },
        { main: "STARK", targets: ["STARK", "KAST", "KRAS"], data: { "STARK": { "t": "قويّ", "s": "starka armar stark regering stark kyla", "st": "أذرع قوية حكومة قوية برد قارس" }, "KAST": { "t": "رمية", "s": "Det var ett mycket bra kast med bollen.", "st": "كانت رمية جيدة جداً بالكرة." }, "KRAS": { "t": "تحطّم", "s": "Vasen gick i kras.", "st": "تحطمت المزهرية." } } },
        { main: "SPORT", targets: ["SPORT", "STOR", "SORT"], data: { "SPORT": { "t": "رياضة", "s": "Fotboll är en populär sport.", "st": "كرة القدم رياضة شعبية." }, "STOR": { "t": "كبير", "s": "Han took en stor portion mat.", "st": "أخذ حصة كبيرة من الطعام." }, "SORT": { "t": "نوع", "s": "Vilken sort vill du ha?", "st": "أي نوع تريد؟" } } },
        { main: "TRÄNA", targets: ["TRÄNA", "NÄRA", "ÄRTA"], data: { "TRÄNA": { "t": "يتدرب", "s": "Jag ska träna på gymmet.", "st": "سأتدرب في الصالة الرياضية." }, "NÄRA": { "t": "قريب", "s": "Vi bor nära skolan.", "st": "نسكن قريباً من المدرسة." }, "ÄRTA": { "t": "يغيظ", "s": "Sluta ärta honom.", "st": "توقف عن إغاظته." } } },
        { main: "GRAVID", targets: ["GRAVID", "VIDGAR", "DRIVA", "VIDGA"], data: { "GRAVID": { "t": "حامل", "s": "Hon är gravid in femte månaden.", "st": "هي حامل في الشهر الخامس." }, "VIDGAR": { "t": "يُوَسِّع", "s": "medicinen vidgar blodkärlen vidgat inflytande", "st": "يوسع الدواء الأوعية الدمويّة نفوذ ممتدّ , نفوذ واسع" }, "DRIVA": { "t": "ينجرف / يدير", "s": "Vinden får båten att driva iväg.", "st": "الرياح تجعل القارب ينجرف بعيداً." }, "VIDGA": { "t": "يوسع", "s": "Vi måste vidga vägen.", "st": "يجب أن نوسع الطريق." } } },
        { main: "SKÖTER", targets: ["SKÖTER", "SÖKER", "KÖRET", "RÖKTE"], data: { "SKÖTER": { "t": "يعتني بـ", "s": "Hon sköter sina blommor.", "st": "هي تعتني بزهورها." }, "SÖKER": { "t": "يبحث", "s": "Han söker nytt jobb.", "st": "هو يبحث عن عمل جديد." }, "KÖRET": { "t": "القيادة / العمل الشاق", "s": "Det var fullt upp med köret.", "st": "كان هناك الكثير من العمل الشاق." }, "RÖKTE": { "t": "دخن (الماضي)", "s": "Han rökte en cigarr.", "st": "دخن سيجاراً." } } },
        { main: "HÄLSAN", targets: ["HÄLSAN", "HÄLSA", "LÄNSA", "ANSLÅ", "SÅLLA"], data: { "HÄLSAN": { "t": "الصحة", "s": "Hälsan är det viktigaste vi har.", "st": "الصحة هي أهم ما نملك." }, "HÄLSA": { "t": "صحة", "s": "Hälsa är viktigare än pengar.", "st": "الصحة أهم من المال." }, "LÄNSA": { "t": "يفرغ (ماء)", "s": "Vi måste länsa båten.", "st": "يجب أن نفرغ القارب من الماء." }, "ANSLÅ": { "t": "يخصص / يعلن", "s": "Regeringen ska anslå pengar.", "st": "الحكومة ستخصص أموالاً." }, "SÅLLA": { "t": "يغربل", "s": "Sålla mjölet.", "st": "غربل الدقيق." } } },
        { main: "PLÅSTER", targets: ["PLÅSTER", "LÅTER", "LÅSER", "PEST", "PÅSE"], data: { "PLÅSTER": { "t": "لاصق جروح", "s": "Sätt ett plåster på såret.", "st": "ضع لاصق جروح على الجرح." }, "LÅTER": { "t": "يبدو / يصدر صوتاً", "s": "Det låter som en bra idé.", "st": "تبدو فكرة جيدة." }, "LÅSER": { "t": "يقفل", "s": "He låser dörren.", "st": "هو يقفل الباب." }, "PEST": { "t": "طاعون", "s": "Pesten var en hemsk sjukdom.", "st": "الطاعون كان مرضاً فظيعاً." }, "PÅSE": { "t": "كيس", "s": "Jag bär maten in en påse.", "st": "أحمل الطعام في كيس." } } }
    ],
    6: [ // School/Work
        { main: "PROV", targets: ["PROV", "ROP"], data: { "PROV": { "t": "اختبار / عينة", "s": "Vi har prov in matematik imorgon.", "st": "لدينا اختبار في الرياضيات غداً." }, "ROP": { "t": "نداء", "s": "Ett rop på hjälp hördes.", "st": "سُمع نداء طلب للمساعدة." } } },
        { main: "ELEV", targets: ["ELEV", "LEV"], data: { "ELEV": { "t": "تلميذ", "s": "En new elev började in klassen.", "st": "بدأ تلميذ جديد في الصف." }, "LEV": { "t": "عِش (أمر)", "s": "Lev livet fullt ut!", "st": "عش الحياة على أكمل وجه!" } } },
        { main: "LÄRA", targets: ["LÄRA", "LÄR"], data: { "LÄRA": { "t": "يعلم / يتعلم", "s": "Att lära är att växa.", "st": "التعلم هو النمو." }, "LÄR": { "t": "يعلم", "s": "Han lär sig snabbt.", "st": "هو يتعلم بسرعة." } } },
        { main: "AVTAL", targets: ["AVTAL", "TAVLA", "TALA"], data: { "AVTAL": { "t": "اتفاقية", "s": "Vi skrev på ett avtal.", "st": "وقعنا اتفاقية." }, "TAVLA": { "t": "لوحة", "s": "Läraren skriver på en tavla.", "st": "المعلم يكتب على السبورة." }, "TALA": { "t": "تحدث", "s": "Tala är silver, tiga är guld.", "st": "الكلام من فضة والسكوت من ذهب." } } },
        { main: "MATTE", targets: ["MATTE", "TEAM", "TEMA"], data: { "MATTE": { "t": "رياضيات", "s": "Vi har matte in skolan.", "st": "لدينا رياضيات في المدرسة." }, "TEAM": { "t": "فريق", "s": "Vi är ett bra team.", "st": "نحن فريق جيد." }, "TEMA": { "t": "موضوع", "s": "Dagens tema är miljö.", "st": "موضوع اليوم هو البيئة." } } },
        { main: "RÄKNA", targets: ["RÄKNA", "NÄRA", "RÄKA"], data: { "RÄKNA": { "t": "يحسب", "s": "Kan du räkna till tio?", "st": "هل يمكنك العد إلى عشرة؟" }, "NÄRA": { "t": "قريب", "s": "Vi bor nära skolan.", "st": "نسكن قريباً من المدرسة." }, "RÄKA": { "t": "روبيان", "s": "Jag åt en räka.", "st": "أكلت روبيانة." } } },
        { main: "SJUNGA", targets: ["SJUNGA", "SJUNG", "GUNGA", "LUGNA"], data: { "SJUNGA": { "t": "يغني", "s": "Vi ska sjunga in kören.", "st": "سنغني في الجوقة." }, "SJUNG": { "t": "غنِّ (أمر)", "s": "Sjung en sång för oss.", "st": "غنِّ لنا أغنية." }, "GUNGA": { "t": "أرجوحة / يتأرجح", "s": "Barnen gungar in parken.", "st": "الأطفال يتأرجحون في الحديقة." }, "LUGNA": { "t": "يهدئ", "s": "Försök att lugna ner dig.", "st": "حاول أن تهدأ." } } },
        { main: "IDROTT", targets: ["IDROTT", "TROTT", "TORRT", "RIDIT"], data: { "IDROTT": { "t": "رياضة", "s": "Idrott är mitt favoritämne.", "st": "الرياضة هي مادتي المفضلة." }, "TROTT": { "t": "اعتقد (الماضي)", "s": "Jag hade trott det.", "st": "كنت قد اعتقدت ذلك." }, "TORRT": { "t": "جاف", "s": "Gräset är torrt.", "st": "العشب جاف." }, "RIDIT": { "t": "ركب (الماضي)", "s": "Hon har ridit in många år.", "st": "لقد ركبت الخيل لسنوات عديدة." } } },
        { main: "MATSAL", targets: ["MATSAL", "SAMLA", "SMALT", "ATLAS"], data: { "MATSAL": { "t": "غرفة طعام / مقصف", "s": "Vi äter in skolans matsal.", "st": "نأكل في مقصف المدرسة." }, "SAMLA": { "t": "يجمع", "s": "Vi ska samla in pengar.", "st": "سنجمع المال." }, "SMALT": { "t": "ضيق / ذاب", "s": "Ett smalt sund.", "st": "مضيق ضيق." }, "ATLAS": { "t": "أطلس", "s": "Jag hittade landet in min atlas.", "st": "وجدت البلد في أطلسي." } } },
        { main: "SVENSKA", targets: ["SVENSKA", "SVENSK", "VÄSKA", "VAKEN", "SVEK"], data: { "SVENSKA": { "t": "اللغة السويدية", "s": "Jag lär mig svenska.", "st": "أتعلم اللغة السويدية." }, "SVENSK": { "t": "سويدي", "s": "Han är svensk medborgare.", "st": "هو مواطن سويدي." }, "VÄSKA": { "t": "حقيبة", "s": "Jag glömde min väska på bussen.", "st": "نسيت حقيبتي في الحافلة." }, "VAKEN": { "t": "مستيقظ", "s": "Är you vaken?", "st": "هل أنت مستيقظ؟" }, "SVEK": { "t": "خيانة", "s": "Det var ett stort svek.", "st": "كانت خيانة كبيرة." } } }
    ],
    7: [ // Shopping/Clothes
        { main: "KÖPA", targets: ["KÖPA", "KÖP"], data: { "KÖPA": { "t": "يشتري", "s": "Jag ska köpa en ny bil.", "st": "سأشتري سيارة جديدة." }, "KÖP": { "t": "شراء", "s": "Det var ett bra köp.", "st": "كانت صفقة شراء جيدة." } } },
        { main: "PRIS", targets: ["PRIS", "RIS"], data: { "PRIS": { "t": "سعر / جائزة", "s": "Vad är det för pris?", "st": "ما هو السعر؟" }, "RIS": { "t": "أرز / أغصان", "s": "Vi äter ris till middag.", "st": "نأكل الأرز للعشاء." } } },
        { main: "DYRA", targets: ["DYRA", "DYR"], data: { "DYRA": { "t": "غالية (جمع)", "s": "Kläderna är mycket dyra.", "st": "الملابس غالية جداً." }, "DYR": { "t": "غالي", "s": "Bilen var för dyr.", "st": "السيارة كانت غالية جداً." } } },
        { main: "SÄLJA", targets: ["SÄLJA", "SÄLJ", "SJÄL"], data: { "SÄLJA": { "t": "يبيع", "s": "Han ska sälja sitt hus.", "st": "سيبيع منزله." }, "SÄLJ": { "t": "بِع (أمر)", "s": "Sälj bilen nu.", "st": "بع السيارة الآن." }, "SJÄL": { "t": "روح", "s": "Kropp och själ.", "st": "جسد وروح." } } },
        { main: "VÄSKA", targets: ["VÄSKA", "VÄSA", "VAKA"], data: { "VÄSKA": { "t": "حقيبة", "s": "Jag glömde min väska på bussen.", "st": "نسيت حقيبتي في الحافلة." }, "VÄSA": { "t": "يفح / يهمس بغضب", "s": "Ormen började väsa.", "st": "بدأ الثعبان بالفحيح." }, "VAKA": { "t": "يسهر / يراقب", "s": "Sjuksköterskan ska vaka i natt.", "st": "الممرضة ستسهر الليلة." } } },
        { main: "PLAST", targets: ["PLAST", "LAST", "SALT"], data: { "PLAST": { "t": "بلاستيك", "s": "Flaskan är gjord av plast.", "st": "الزجاجة مصنوعة من البلاستيك." }, "LAST": { "t": "حمل", "s": "Lasten var tung.", "st": "الحمل كان ثقيلاً." }, "SALT": { "t": "ملح", "s": "Soppan behöver lite mer salt.", "st": "الحساء يحتاج القليل من الملح الإضافي." } } },
        { main: "KLÄDER", targets: ["KLÄDER", "LÄDER", "LÄRDE", "KLÄDE"], data: { "KLÄDER": { "t": "ملابس", "s": "Hon köper nya kläder.", "st": "هي تشتري ملابس جديدة." }, "LÄDER": { "t": "جلد", "s": "Jackan är av äkta läder.", "st": "السترة من الجلد الحقيقي." }, "LÄRDE": { "t": "علماء", "s": "De lärde tvistar om den saken.", "st": "العلماء يختلفون حول هذا الأمر." }, "KLÄDE": { "t": "قماش / جوخ", "s": "Ett fint kläde till dräkten.", "st": "قماش فاخر للزي." } } },
        { main: "SKORNA", targets: ["SKORNA", "KORNA", "NORSK", "ORKAN"], data: { "SKORNA": { "t": "الأحذية", "s": "Ta på dig skorna.", "st": "ارتدِ حذائك." }, "KORNA": { "t": "الأبقار", "s": "Korna betar på ängen.", "st": "الأبقار ترعى في المرج." }, "NORSK": { "t": "نرويجي", "s": "Han är norsk medborgare.", "st": "هو مواطن نرويجي." }, "ORKAN": { "t": "إعصار", "s": "En orkan närmar sig kusten.", "st": "إعصار يقترب من الساحل." } } },
        { main: "KOSTAR", targets: ["KOSTAR", "ROSTA", "STORA", "KORTA"], data: { "KOSTAR": { "t": "يكلف", "s": "Vad kostar biljetten?", "st": "كم تكلف التذكرة؟" }, "ROSTA": { "t": "يحمص", "s": "Kan you rosta brödet?", "st": "هل يمكنك تحميص الخبز؟" }, "STORA": { "t": "كبيرة", "s": "De har stora planer.", "st": "لديهم خطط كبيرة." }, "KORTA": { "t": "فشل", "s": "komma till korta ( misslyckas )", "st": "فشل" } } },
        { main: "SKJORTA", targets: ["SKJORTA", "SKROT", "KARTA", "ROSTA", "STORA"], data: { "SKJORTA": { "t": "قميص", "s": "Han har en vit snygg skjorta.", "st": "لديه قميص أبيض أنيق." }, "SKROT": { "t": "خردة", "s": "Det ligger massa skrot här.", "st": "يوجد الكثير من الخردة هنا." }, "KARTA": { "t": "خريطة", "s": "Hitta vägen med en karta.", "st": "جد الطريق باستخدام خريطة." }, "ROSTA": { "t": "يحمص", "s": "Kan you rosta brödet?", "st": "هل يمكنك تحميص الخبز؟" }, "STORA": { "t": "كبيرة", "s": "De har stora planer.", "st": "لديهم خطط كبيرة." } } }
    ],
    8: [ // Transport
        { main: "GATA", targets: ["GATA", "TAG"], data: { "GATA": { "t": "شارع", "s": "Barnen leker på en lugn gata.", "st": "الأطفال يلعبون في شارع هادئ." }, "TAG": { "t": "قبضة", "s": "Ta ett tag i repet och dra.", "st": "أمسك بالحبل واسحب." } } },
        { main: "HAMN", targets: ["HAMN", "HAN"], data: { "HAMN": { "t": "ميناء", "s": "Båten ligger tryggt i en liten hamn.", "st": "القارب يرسو بأمان في ميناء صغير." }, "HAN": { "t": "هو", "s": "Han heter Peter och är mycket snäll.", "st": "هو اسمه بيتر ولطيف جداً." } } },
        { main: "KÖRA", targets: ["KÖRA", "ÖKAR"], data: { "KÖRA": { "t": "يقود", "s": "Får jag köra din bil?", "st": "هل يمكنني قيادة سيارتك؟" }, "ÖKAR": { "t": "يزيد", "s": "Priserna ökar varje år.", "st": "الأسعار تزيد كل عام." } } },
        { main: "KANOT", targets: ["KANOT", "NATO", "TANK"], data: { "KANOT": { "t": "زورق", "s": "Vi paddlar kanot på sjön.", "st": "نجدف بالزورق في البحيرة." }, "NATO": { "t": "الناتو", "s": "NATO är en försvarsallians.", "st": "الناتو تحالف دفاعي." }, "TANK": { "t": "دبابة / خزان", "s": "Bilen har full tank.", "st": "السيارة خزانها ممتلئ." } } },
        { main: "KÄRRA", targets: ["KÄRRA", "ÄRRA", "KARR"], data: { "KÄRRA": { "t": "عربة", "s": "Vi drog en tung kärra.", "st": "سحبنا عربة ثقيلة." }, "ÄRRA": { "t": "ندبة", "s": "Han har ett ärra på kinden.", "st": "لديه ندبة." }, "KARR": { "t": "مستنقع", "s": "Växten trivs i fuktiga karr.", "st": "النبات ينمو في المستنقعات الرطبة." } } },
        { main: "ÖSTER", targets: ["ÖSTER", "REST", "RÖST"], data: { "ÖSTER": { "t": "شرق", "s": "Solen går alltid upp i öster.", "st": "الشمس تشرق دائماً من الشرق." }, "REST": { "t": "سافر", "s": "Vi har rest hela dagen.", "st": "سافرنا طوال اليوم." }, "RÖST": { "t": "صوت", "s": "Han talade med låg röst.", "st": "تحدث بصوت منخفض." } } },
        { main: "RATTER", targets: ["RATTER", "ARTER", "RETAR", "TREAR"], data: { "RATTER": { "t": "عجلات قيادة", "s": "Bilen har två ratter (övningsbil).", "st": "السيارة لها عجلتا قيادة (سيارة تدريب)." }, "ARTER": { "t": "أنواع", "s": "Många arter av fåglar.", "st": "أنواع كثيرة من الطيور." }, "RETAR": { "t": "يغيظ", "s": "Han retar sin syster.", "st": "هو يغيظ أخته." }, "TREAR": { "t": "ثلاثات", "s": "Två trear i kortspel.", "st": "ثلاثتان في لعبة الورق." } } },
        { main: "LASTAR", targets: ["LASTAR", "ALSTRA", "SALTA", "TALAR"], data: { "LASTAR": { "t": "يحمل", "s": "De lastar lastbilen.", "st": "هم يحملون الشاحنة." }, "ALSTRA": { "t": "يولد / ينتج", "s": "Solen alstrar värme.", "st": "الشمس تولد الحرارة." }, "SALTA": { "t": "يمالح", "s": "Salta maten.", "st": "ملح الطعام." }, "TALAR": { "t": "يتحدث", "s": "Han talar svenska.", "st": "هو يتحدث السويدية." } } },
        { main: "SPÅREN", targets: ["SPÅREN", "PÅSEN", "RESAN", "RENSA"], data: { "SPÅREN": { "t": "الآثار", "s": "Följ spåren i snön.", "st": "اتبع الآثار في الثلج." }, "PÅSEN": { "t": "الكيس", "s": "Påsen är tung.", "st": "الكيس ثقيل." }, "RESAN": { "t": "الرحلة", "s": "Resan var lång.", "st": "الرحلة كانت طويلة." }, "RENSA": { "t": "ينظف / يزيل", "s": "Rensa fisken.", "st": "نظف السمكة." } } },
        { main: "LASTBIL", targets: ["LASTBIL", "LISTA", "TILLS", "BILA", "LISA"], data: { "LASTBIL": { "t": "شاحنة", "s": "En stor lastbil blockerade vägen.", "st": "شاحنة كبيرة سدت الطريق." }, "LISTA": { "t": "قائمة", "s": "Gör en lista på vad vi behöver.", "st": "اصنع قائمة بما نحتاجه." }, "TILLS": { "t": "حتى", "s": "vänta här tills jag kommer", "st": "انتظر هنا حتى آتي" }, "BILA": { "t": "يسافر بالسيارة", "s": "Vi ska bila i Europa.", "st": "سنسافر بالسيارة في أوروبا." }, "LISA": { "t": "تخفيف", "s": "En lisa för själen.", "st": "راحة للنفس." } } }
    ],
    9: [ // Law
        { main: "LAG", targets: ["LAG", "GAL"], data: { "LAG": { "t": "قانون", "s": "Lagen gäller lika för alla medborgare.", "st": "القانون يسري بالتساوي على جميع المواطنين." }, "GAL": { "t": "صاح", "s": "Tuppen gal.", "st": "صاح الديك." } } },
        { main: "DOM", targets: ["DOM", "MOD"], data: { "DOM": { "t": "حكم / قبة", "s": "Domstolen avkunnade sin dom.", "st": "أصدرت المحكمة حكمها." }, "MOD": { "t": "شجاعة", "s": "Stort mod.", "st": "شجاعة كبيرة." } } },
        { main: "LÖGN", targets: ["LÖGN", "LÖN"], data: { "LÖGN": { "t": "كذبة", "s": "Det var en lögn.", "st": "كانت تلك كذبة." }, "LÖN": { "t": "راتب", "s": "Min lön.", "st": "راتبي." } } },
        { main: "DOMAR", targets: ["DOMAR", "ORMA", "RODA"], data: { "DOMAR": { "t": "أحكام", "s": "Hårda domar.", "st": "أحكام قاسية." }, "ORMA": { "t": "يتلوى (كثعبان)", "s": "Kön ormar sig fram.", "st": "الطابور يتلوى." }, "RODA": { "t": "يجذف", "s": "Att roda båten.", "st": "أن تجذف القارب." } } },
        { main: "LAGAR", targets: ["LAGAR", "LAGA", "GALA"], data: { "LAGAR": { "t": "قوانين", "s": "Sveriges lagar.", "st": "قوانين السويد." }, "LAGA": { "t": "يصلح", "s": "Laga bilen.", "st": "أصلح السيارة." }, "GALA": { "t": "حفل", "s": "En fin gala.", "st": "حفل جميل." } } },
        { main: "SKULD", targets: ["SKULD", "GULD", "SLUT"], data: { "SKULD": { "t": "دين", "s": "Betala sin skuld.", "st": "ادفع دينك." }, "GULD": { "t": "ذهب", "s": "Rent guld.", "st": "ذهب خالص." }, "SLUT": { "t": "نهاية", "s": "Slut på filmen.", "st": "نهاية الفيلم." } } },
        { main: "DOMARE", targets: ["DOMARE", "DOMAR", "RADER", "RAMAR"], data: { "DOMARE": { "t": "قاضي", "s": "En rättvis domare.", "st": "قاض عادل." }, "DOMAR": { "t": "أحكام", "s": "Hårda domar.", "st": "أحكام قاسية." }, "RADER": { "t": "صفوف", "s": "Skriv två rader.", "st": "اكتب صفين." }, "RAMAR": { "t": "إطارات", "s": "Fina ramar.", "st": "إطارات جميلة." } } },
        { main: "VAKTER", targets: ["VAKTER", "VAKET", "KARTA", "RAKET"], data: { "VAKTER": { "t": "حراس", "s": "Två vakter stod vid dörren.", "st": "وقف حارسان عند الباب." }, "VAKET": { "t": "مستيقظ (محايد)", "s": "Ett vaket barn.", "st": "طفل مستيقظ." }, "KARTA": { "t": "خريطة", "s": "Titta på kartan.", "st": "انظر إلى الخريطة." }, "RAKET": { "t": "صاروخ", "s": "En snabb raket.", "st": "صاروخ سريع." } } },
        { main: "RÅNARE", targets: ["RÅNARE", "ARENA", "RENAR", "RÅNAR"], data: { "RÅNARE": { "t": "لص / سارق", "s": "Polisen grep rånaren.", "st": "الشرطة قبضت على السارق." }, "ARENA": { "t": "حلبة / ملعب", "s": "En stor arena.", "st": "ملعب كبير." }, "RENAR": { "t": "حيوانات الرنة", "s": "Många renar i norr.", "st": "الكثير من الرنة في الشمال." }, "RÅNAR": { "t": "يسرق", "s": "Han rånar banken.", "st": "هو يسرق البنك." } } },
        { main: "ADVOKAT", targets: ["ADVOKAT", "VAKTA", "DATA", "VAKA", "KOTA"], data: { "ADVOKAT": { "t": "محامي", "s": "En bra advokat.", "st": "محام جيد." }, "VAKTA": { "t": "يحرس", "s": "Vakta hunden.", "st": "احرس الكلب." }, "DATA": { "t": "بيانات", "s": "Spara data.", "st": "احفظ البيانات." }, "VAKA": { "t": "يسهر", "s": "Vaka hela natten.", "st": "اسهر طوال الليل." }, "KOTA": { "t": "فقرة (عظم)", "s": "En kota i ryggen.", "st": "فقرة في الظهر." } } }
    ],
    10: [ // Religion
        { main: "TRO", targets: ["TRO", "ROT"], data: { "TRO": { "t": "إيمان / يعتقد", "s": "Jag har a stark tro.", "st": "لدي إيمان قوي." }, "ROT": { "t": "جذر", "s": "Trädets rot är djup.", "st": "جذر الشجرة عميق." } } },
        { main: "BÖN", targets: ["BÖN", "ÖBO"], data: { "BÖN": { "t": "صلاة", "s": "Hon bad en bön.", "st": "صلت صلاة." }, "ÖBO": { "t": "ساكن جزيرة", "s": "Han är en öbo.", "st": "هو ساكن جزيرة." } } },
        { main: "LIV", targets: ["LIV", "VIL"], data: { "LIV": { "t": "حياة", "s": "Livet är en gåva.", "st": "الحياة هدية." }, "VIL": { "t": "يريد (عامية/قديم)", "s": "Gör vad du vil.", "st": "افعل ما تريد." } } },
        { main: "ANDEN", targets: ["ANDEN", "ANDE", "DENNA"], data: { "ANDEN": { "t": "الروح", "s": "Anden i flaskan.", "st": "الجني في الزجاجة." }, "ANDE": { "t": "روح", "s": "Den helige Ande.", "st": "الروح القدس." }, "DENNA": { "t": "هذا, هذه", "s": "denna dag detta hus dessa böcker", "st": "هذا اليوم هذا البيت هذه الكتب" } } },
        { main: "HELIG", targets: ["HELIG", "HELG", "GILLE"], data: { "HELIG": { "t": "مقدس", "s": "Koranen är en helig bok.", "st": "القرآن كتاب مقدس." }, "HELG": { "t": "عطلة نهاية أسبوع", "s": "God helg!", "st": "عطلة سعيدة!" }, "GILLE": { "t": "وليمة / نقابة", "s": "Ett stort gille.", "st": "وليمة كبيرة." } } },
        { main: "ISLAM", targets: ["ISLAM", "SILA", "LIMA"], data: { "ISLAM": { "t": "الإسلام", "s": "Islam är en världsreligion.", "st": "الإسلام دين عالمي." }, "SILA": { "t": "يصفي", "s": "Sila såsen.", "st": "صف الصلصة." }, "LIMA": { "t": "ليما (مدينة)", "s": "Lima är Perus huvudstad.", "st": "ليما هي عاصمة بيرو." } } },
        { main: "PASTOR", targets: ["PASTOR", "ROSTA", "SPORT", "SOPAR"], data: { "PASTOR": { "t": "قس", "s": "Pastorn predikade i kyrkan.", "st": "القس وعظ في الكنيسة." }, "ROSTA": { "t": "يحمص / يصدأ", "s": "Järnet rostar.", "st": "الحديد يصدأ." }, "SPORT": { "t": "رياضة", "s": "Fotboll är en sport.", "st": "كرة القدم رياضة." }, "SOPAR": { "t": "يكنس", "s": "Han sopar golvet.", "st": "هو يكنس الأرض." } } },
        { main: "SYNDER", targets: ["SYNDER", "SYNER", "RYSER", "NEDRE"], data: { "SYNDER": { "t": "خطايا", "s": "Förlåtelse för synder.", "st": "مغفرة الخطايا." }, "SYNER": { "t": "رؤى", "s": "Han hade syner.", "st": "كانت لديه رؤى." }, "RYSER": { "t": "يرتجف", "s": "Jag ryser av kyla.", "st": "أرتجف من البرد." }, "NEDRE": { "t": "سفلي", "s": "Nedre våningen.", "st": "الطابق السفلي." } } },
        { main: "ANDLIG", targets: ["ANDLIG", "DINGLA", "GLIDA", "LANDA"], data: { "ANDLIG": { "t": "روحي", "s": "Hon har ett andligt intresse.", "st": "لديها اهتمام روحي." }, "DINGLA": { "t": "يتدلى", "s": "Benen dingla från stolen.", "st": "الساقان تتدليان من الكرسي." }, "GLIDA": { "t": "ينزلق", "s": "Bilen kan glida på isen.", "st": "السيارة قد تنزلق على الجليد." }, "LANDA": { "t": "يهبط", "s": "Flygplanet ska landa.", "st": "الطائرة ستهبط." } } },
        { main: "APOSTEL", targets: ["APOSTEL", "STAPEL", "STOLPE", "ALPER", "POSTA"], data: { "APOSTEL": { "t": "رسول (حواري)", "s": "En av Jesus tolv apostlar.", "st": "واحد من حواريي يسوع الاثني عشر." }, "STAPEL": { "t": "كومة / عمود", "s": "En stapel med böcker.", "st": "كومة من الكتب." }, "STOLPE": { "t": "عمود", "s": "Körde in i en stolpe.", "st": "اصطدم بعمود." }, "ALPER": { "t": "جبال الألب", "s": "Vi åkte till Alperna.", "st": "ذهبنا إلى جبال الألب." }, "POSTA": { "t": "يرسل بالبريد", "s": "Jag ska posta brevet.", "st": "سأرسل الرسالة بالبريد." } } }
    ],
};

// --- HELPER TO EXPAND DICTIONARY ---
function expandDictionary(themes) {
    const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
    if (!dictMatch) {
        console.error("Could not find WC_DICTIONARY");
        return;
    }
    let WC_DICTIONARY;
    try {
        eval('WC_DICTIONARY = ' + dictMatch[1]);
    } catch (e) {
        console.error("Error parsing dictionary:", e);
        return;
    }

    Object.values(themes).forEach(levels => {
        levels.forEach(level => {
            Object.keys(level.data).forEach(word => {
                const data = level.data[word];
                const existing = WC_DICTIONARY.find(e => e.w === word);
                if (existing) {
                    existing.t = data.t;
                    existing.s = data.s;
                    existing.st = data.st;
                } else {
                    WC_DICTIONARY.push({
                        w: word,
                        t: data.t,
                        s: data.s,
                        st: data.st
                    });
                }
            });
        });
    });

    WC_DICTIONARY.sort((a, b) => a.w.localeCompare(b.w));
    const newDictStr = JSON.stringify(WC_DICTIONARY, null, 4);
    fileContent = fileContent.replace(dictMatch[1], newDictStr);
}

// --- HELPER TO GENERATE LEVELS ---
function generateLevels(themes) {
    let newLevelsStr = "const WC_PREDEFINED_LEVELS = {\n";

    Object.keys(themes).forEach(chapter => {
        const levels = themes[chapter];
        newLevelsStr += `    // ===========================================\n`;
        newLevelsStr += `    // CHAPTER ${chapter}\n`;
        newLevelsStr += `    // ===========================================\n`;

        levels.forEach((level, index) => {
            const levelId = `${chapter}-${index + 1}`;
            const levelData = {
                letters: level.main.split('').sort(() => 0.5 - Math.random()),
                words: level.targets,
                validWords: level.targets
            };
            newLevelsStr += `    "${levelId}": ${JSON.stringify(levelData)},\n`;
        });
    });

    newLevelsStr += "};";

    const levelsRegex = /const WC_PREDEFINED_LEVELS = \{[\s\S]*?\};/;
    if (levelsRegex.test(fileContent)) {
        fileContent = fileContent.replace(levelsRegex, newLevelsStr);
    }
}

expandDictionary(ADVANCED_THEMES);
generateLevels(ADVANCED_THEMES);

fs.writeFileSync(dataFilePath, fileContent);
console.log("Done! wordConnectData.js updated with valid advanced levels (Round 4).");
