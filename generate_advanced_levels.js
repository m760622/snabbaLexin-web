const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

// --- DATA STRUCTURE ---
const ADVANCED_THEMES = {
    1: [ // Food
        { main: "MOS", targets: ["MOS", "SOM"], data: { "MOS": { t: "هريس", s: "Jag vill ha korv med mos.", st: "أريد سجقاً مع الهريس." }, "SOM": { t: "مثل", s: "Som man bäddar får man ligga.", st: "كما تزرع تحصد." } } },
        { main: "OST", targets: ["OST", "SO"], data: { "OST": { t: "جبن", s: "Jag älskar ost.", st: "أنا أحب الجبن." }, "SO": { t: "خنزيرة", s: "En so med kultingar.", st: "خنزيرة مع خنازير صغيرة." } } },
        { main: "KAKA", targets: ["KAKA", "AKA"], data: { "KAKA": { t: "كعكة", s: "Vi bakar en kaka.", st: "نحن نخبز كعكة." }, "AKA": { t: "تُعرف بـ", s: "Hon är känd, aka stjärnan.", st: "هي مشهورة، وتُعرف بالنجمة." } } },
        { main: "LISTA", targets: ["LISTA", "SILA", "STIL"], data: { "LISTA": { t: "قائمة", s: "Jag måste skriva en lång lista.", st: "يجب أن أكتب قائمة طويلة." }, "SILA": { t: "يصفي", s: "Sila mygg och svälja kameler.", st: "يصفي البعوض ويبتلع الجمال (مثل)." }, "STIL": { t: "أسلوب", s: "Jag gillar verkligen din unika stil.", st: "أنا معجب حقاً بأسلوبك الفريد." } } },
        { main: "STEKA", targets: ["STEKA", "KAST", "ASK"], data: { "STEKA": { t: "يقلي", s: "Vi ska steka köttbullar till middag.", st: "سنقلي كرات اللحم للعشاء." }, "KAST": { t: "رمية", s: "Det var ett riktigt dåligt kast.", st: "كانت تلك رمية سيئة حقاً." }, "ASK": { t: "علبة", s: "Jag köpte en liten ask tändstickor.", st: "اشتريت علبة صغيرة من أعواد الثقاب." } } },
        { main: "MATEN", targets: ["MATEN", "TEAM", "META"], data: { "MATEN": { t: "الطعام", s: "Kom och ät, maten är klar!", st: "تعالوا لتناول الطعام، الأكل جاهز!" }, "TEAM": { t: "فريق", s: "Vi är ett bra team.", st: "نحن فريق جيد." }, "META": { t: "يصطاد", s: "Att meta fisk är roligt.", st: "صيد السمك ممتع." } } },
        { main: "FLASKA", targets: ["FLASKA", "FALSK", "SKALA", "KALAS"], data: { "FLASKA": { t: "زجاجة", s: "Kan jag få en flaska vatten?", st: "هل يمكنني الحصول على زجاجة ماء؟" }, "FALSK": { t: "زائف", s: "Det där skrattet låter väldigt falskt.", st: "تلك الضحكة تبدو مصطنعة جداً." }, "SKALA": { t: "يقشر", s: "Det är lätt att skala en banan.", st: "من السهل تقشير الموزة." }, "KALAS": { t: "حفلة", s: "Vi ska på kalas.", st: "سنذهب إلى حفلة." } } },
        { main: "BULLAR", targets: ["BULLAR", "RULLA", "LURA", "BUR"], data: { "BULLAR": { t: "كعك", s: "Vi bakar bullar.", st: "نحن نخبز الكعك." }, "RULLA": { t: "يدحرج", s: "Rulla köttbullarna.", st: "دحرج كرات اللحم." }, "LURA": { t: "يخدع", s: "Du kan inte lura mig.", st: "لا يمكنك خداعي." }, "BUR": { t: "قفص", s: "Fågeln sitter i en bur.", st: "الطائر في قفص." } } },
        { main: "SKEDAR", targets: ["SKEDAR", "DERAS", "KADER", "SKADE"], data: { "SKEDAR": { t: "ملاعق", s: "Vi behöver skedar för att äta soppa.", st: "نحتاج إلى ملاعق لتناول الحساء." }, "DERAS": { t: "لهم", s: "Det är deras ansvar att lösa detta.", st: "إنها مسؤوليتهم لحل هذا الأمر." }, "KADER": { t: "كادر", s: "En liten kader av lojala soldater.", st: "كادر صغير من الجنود المخلصين." }, "SKADE": { t: "أذى", s: "Det var inte menat till skada.", st: "لم يكن القصد إلحاق الأذى." } } },
        { main: "FRUKOST", targets: ["FRUKOST", "FROST", "KUST", "ROST", "STOR"], data: { "FRUKOST": { t: "فطور", s: "Frukost är dagens viktigaste måltid.", st: "الفطور هو أهم وجبة في اليوم." }, "FROST": { t: "صقيع", s: "Det är frost ute.", st: "يوجد صقيع في الخارج." }, "KUST": { t: "ساحل", s: "Vi bor vid kusten.", st: "نعيش عند الساحل." }, "ROST": { t: "صدأ", s: "Rost på bilen.", st: "صدأ على السيارة." }, "STOR": { t: "كبير", s: "Han beställde en stor stark öl.", st: "طلب كأساً كبيراً من البيرة القوية." } } }
    ],
    2: [ // Nature
        { main: "SOL", targets: ["SOL", "LOS"], data: { "SOL": { t: "شمس", s: "Solen skiner från en klarblå himmel.", st: "الشمس تشرق من سماء زرقاء صافية." }, "LOS": { t: "يفك", s: "Vi måste kasta loss nu genast.", st: "يجب أن نفك الحبال ونبحر فوراً." } } },
        { main: "HAV", targets: ["HAV", "AV"], data: { "HAV": { t: "بحر", s: "Han har seglat på de sju haven.", st: "لقد أبحر في البحار السبعة." }, "AV": { t: "من / عن", s: "En bok av mig.", st: "كتاب من تأليفي." } } },
        { main: "TRÄD", targets: ["TRÄD", "TRÄ"], data: { "TRÄD": { t: "شجرة", s: "Ett träd i skogen.", st: "شجرة في الغابة." }, "TRÄ": { t: "يُدخل", s: "Det är svårt att trä nålen.", st: "من الصعب إدخال الخيط في الإبرة." } } },
        { main: "STENAR", targets: ["STENAR", "ENAR", "RENAR"], data: { "STENAR": { t: "أحجار", s: "Man ska inte kasta stenar i glashus.", st: "لا ترمِ الناس بالحجارة وبيتك من زجاج." }, "ENAR": { t: "عرعر", s: "Dessa enar är gröna året om.", st: "أشجار العرعر هذه خضراء طوال العام." }, "RENAR": { t: "رنة", s: "Renar lever i norr.", st: "تعيش الرنة في الشمال." } } },
        { main: "DALAR", targets: ["DALAR", "DALA", "LADA"], data: { "DALAR": { t: "وديان", s: "Vi vandrade över berg och dal.", st: "تجولنا عبر الجبال والوديان." }, "DALA": { t: "يهبط", s: "Vi såg solen dala ner i havet.", st: "رأينا الشمس تغرب في البحر." }, "LADA": { t: "حظيرة", s: "Hästen står inne i en lada.", st: "الحصان يقف داخل الحظيرة." } } },
        { main: "FLODEN", targets: ["FLODEN", "FLOD", "ODEN"], data: { "FLODEN": { t: "النهر", s: "Floden rinner stilla genom staden.", st: "النهر يجري بهدوء عبر المدينة." }, "FLOD": { t: "فيضان", s: "Tidvattnet växlar mellan ebb och flod.", st: "المد والجزر يتبادلان الأدوار." }, "ODEN": { t: "أودين", s: "Oden var en mäktig gud i mytologin.", st: "كان أودين إلهاً قوياً في الأساطير." } } },
        { main: "STJÄRNA", targets: ["STJÄRNA", "TJÄRNA", "RÄNTA", "TÄRNA"], data: { "STJÄRNA": { t: "نجمة", s: "Du är min stjärna.", st: "أنت نجمتي." }, "TJÄRNA": { t: "بحيرة", s: "Vi badade i en liten skogstjärna.", st: "سبحنا في بحيرة غابة صغيرة." }, "RÄNTA": { t: "فائدة", s: "Ränta på ränta ger stor effekt.", st: "الفائدة المركبة تعطي تأثيراً كبيراً." }, "TÄRNA": { t: "وصيفة", s: "Hon valdes till årets Lucia tärna.", st: "تم اختيارها لتكون وصيفة لوسيا لهذا العام." } } },
        { main: "BUSKAR", targets: ["BUSKAR", "BRUKA", "SKURA", "RAK"], data: { "BUSKAR": { t: "شجيرات", s: "Katten gömde sig i buskarna.", st: "اختبأت القطة بين الشجيرات." }, "BRUKA": { t: "يفلح", s: "Man måste bruka jorden för att skörda.", st: "يجب فلاحة الأرض للحصول على الحصاد." }, "SKURA": { t: "يفرك", s: "Jag måste skura golvet i köket.", st: "يجب أن أفرك أرضية المطبخ." }, "RAK": { t: "مستقيم", s: "En rak linje.", st: "خط مستقيم." } } },
        { main: "BERGET", targets: ["BERGET", "BERG", "GET"], data: { "BERGET": { t: "الجبل", s: "Vi besteg berget.", st: "تسلقنا الجبل." }, "BERG": { t: "جبل", s: "Ett högt berg.", st: "جبل شاهق." }, "GET": { t: "ماعز", s: "En get bräkte.", st: "ماعز ثغى." } } },
        { main: "NATUREN", targets: ["NATUREN", "NATUR", "RUNT", "TUNA", "RUTA"], data: { "NATUREN": { t: "الطبيعة", s: "Vi måste alla hjälpas åt att skydda naturen.", st: "يجب أن نتعاون جميعاً لحماية الطبيعة." }, "NATUR": { t: "طبيعة", s: "Sverige har en mycket vacker natur.", st: "تتمتع السويد بطبيعة جميلة جداً." }, "RUNT": { t: "حول", s: "Han seglade jorden runt ensam.", st: "أبحر حول العالم بمفرده." }, "TUNA": { t: "ساحة", s: "Eskilstuna är en fin gammal stad.", st: "إسكيلستونا مدينة قديمة وجميلة." }, "RUTA": { t: "مربع", s: "Rita en ruta på papperet.", st: "ارسم مربعاً على الورقة." } } }
    ],
    3: [ // Travel
        { main: "RESA", targets: ["RESA", "RES"], data: { "RESA": { t: "سفر", s: "Att resa är att leva, sa han.", st: "قال إن السفر هو الحياة." }, "RES": { t: "سافر", s: "Res dig upp och kämpa vidare.", st: "انهض وواصل الكفاح." } } },
        { main: "GATA", targets: ["GATA", "TAG"], data: { "GATA": { t: "شارع", s: "Se dig för innan du går över gatan.", st: "انتبه قبل عبور الشارع." }, "TAG": { t: "قبضة", s: "Ta ett tag i repet och dra.", st: "أمسك بالحبل واسحب." } } },
        { main: "BRO", targets: ["BRO", "BOR"], data: { "BRO": { t: "جسر", s: "Vi körde över en lång bro.", st: "قدنا السيارة فوق جسر طويل." }, "BOR": { t: "يسكن", s: "Vi bor i en lägenhet i stan.", st: "نحن نسكن في شقة في المدينة." } } },
        { main: "RESAN", targets: ["RESAN", "SNAR", "SENA"], data: { "RESAN": { t: "الرحلة", s: "Resan var lång och mycket tröttsam.", st: "كانت الرحلة طويلة ومرهقة جداً." }, "SNAR": { t: "قريب", s: "En snar framtid.", st: "مستقبل قريب." }, "SENA": { t: "متأخرة", s: "Jag gillar sena kvällar på sommaren.", st: "أحب الأمسيات المتأخرة في الصيف." } } },
        { main: "PLATS", targets: ["PLATS", "LAST", "STAL"], data: { "PLATS": { t: "مكان", s: "Var vänlig och ta plats i väntrummet.", st: "تفضل بالجلوس في غرفة الانتظار." }, "LAST": { t: "حمل", s: "Lastbilen hade en mycket tung last.", st: "كانت الشاحنة تحمل حمولة ثقيلة جداً." }, "STAL": { t: "سرق", s: "Tjuven stal cykeln mitt på dagen.", st: "سرق اللص الدراجة في وضح النهار." } } },
        { main: "ÖSTER", targets: ["ÖSTER", "RÖST", "REST"], data: { "ÖSTER": { t: "شرق", s: "Solen går alltid upp i öster.", st: "الشمس تشرق دائماً من الشرق." }, "RÖST": { t: "صوت", s: "Hon har en otroligt vacker röst.", st: "لديها صوت جميل بشكل لا يصدق." }, "REST": { t: "سافر", s: "Vi har rest över hela världen.", st: "لقد سافرنا حول العالم بأسره." } } },
        { main: "SEGLAR", targets: ["SEGLAR", "SEGLA", "LAGER", "SEGRA"], data: { "SEGLAR": { t: "يبحر", s: "Han seglar sin båt varje sommar.", st: "يبحر بقاربه كل صيف." }, "SEGLA": { t: "إبحار", s: "Att segla är en underbar frihetskänsla.", st: "الإبحار يمنح شعوراً رائعاً بالحرية." }, "LAGER": { t: "مخزون", s: "Vi har varan på lager just nu.", st: "لدينا السلعة في المخزون حالياً." }, "SEGRA": { t: "ينتصر", s: "Det viktigaste är inte att segra.", st: "الأهم ليس هو الانتصار." } } },
        { main: "BUSSAR", targets: ["BUSSAR", "RUSA", "BRAS", "BARS"], data: { "BUSSAR": { t: "حافلات", s: "Bussarna går ofta in till centrum.", st: "تسير الحافلات غالباً إلى وسط المدينة." }, "RUSA": { t: "يندفع", s: "Du behöver inte rusa iväg så fort.", st: "لا داعي للاندفاع والمغادرة بهذه السرعة." }, "BRAS": { t: "نار", s: "Vi tände en bras i öppna spisen.", st: "أشعلنا ناراً في المدفأة." }, "BARS": { t: "حُمل", s: "Han bars ut på bår efter olyckan.", st: "حُمل على نقالة بعد الحادث." } } },
        { main: "FÄRDEN", targets: ["FÄRDEN", "FÄRDE", "ÄNDER", "NÄRDE"], data: { "FÄRDEN": { t: "الرحلة", s: "Färden mot norr var mycket kall.", st: "كانت الرحلة نحو الشمال باردة جداً." }, "FÄRDE": { t: "خطر", s: "Nu är det fara å färde.", st: "الآن هناك خطر محدق." }, "ÄNDER": { t: "بط", s: "Barnen gillar att mata änder i parken.", st: "يحب الأطفال إطعام البط في الحديقة." }, "NÄRDE": { t: "غذى", s: "Han närde en dröm.", st: "كان يغذي حلماً." } } },
        { main: "VÄRLDEN", targets: ["VÄRLDEN", "LÄNDER", "LÄRDE", "VÄRLD"], data: { "VÄRLDEN": { t: "العالم", s: "Han vill resa runt hela världen.", st: "يريد السفر حول العالم بأسره." }, "LÄNDER": { t: "بلدان", s: "Vi besökte många länder.", st: "زرنا العديد من البلدان." }, "LÄRDE": { t: "علماء", s: "De lärde tvistar om den saken.", st: "العلماء يختلفون حول هذا الأمر." }, "VÄRLD": { t: "عالم", s: "Vi lever i en föränderlig värld.", st: "نحن نعيش في عالم متغير." } } }
    ],
    4: [ // Daily
        { main: "RUM", targets: ["RUM", "MUR"], data: { "RUM": { t: "غرفة", s: "Detta är mitt eget lilla rum.", st: "هذه غرفتي الصغيرة الخاصة." }, "MUR": { t: "جدار", s: "De byggde en hög mur runt huset.", st: "بنوا جداراً عالياً حول المنزل." } } },
        { main: "HUS", targets: ["HUS"], data: { "HUS": { t: "بيت", s: "Vi bor i ett litet rött hus.", st: "نعيش في منزل أحمر صغير." } } },
        { main: "TAK", targets: ["TAK", "AKT"], data: { "TAK": { t: "سقف", s: "Taket läcker när det regnar mycket.", st: "السقف يسرب الماء عندما تمطر بغزارة." }, "AKT": { t: "فصل", s: "Vi såg första akten av pjäsen.", st: "شاهدنا الفصل الأول من المسرحية." } } },
        { main: "STOL", targets: ["STOL", "LOTS", "STO"], data: { "STOL": { t: "كرسي", s: "Dra fram en stol och sitt ner.", st: "اسحب كرسياً واجلس." }, "LOTS": { t: "مرشد", s: "Fartyget behövde en lots för att komma in.", st: "احتاجت السفينة إلى مرشد للدخول." }, "STO": { t: "فرس", s: "Ett sto med sitt föl.", st: "فرس مع مهرها." } } },
        { main: "BORD", targets: ["BORD", "ORD", "BOD"], data: { "BORD": { t: "طاولة", s: "Maten står framdukad på bordet.", st: "الطعام موضوع على الطاولة." }, "ORD": { t: "كلمة", s: "Ett ord kan säga mer än tusen bilder.", st: "كلمة واحدة قد تقول أكثر من ألف صورة." }, "BOD": { t: "كوخ", s: "Vi har en bod på gården.", st: "لدينا كوخ في الفناء." } } },
        { main: "SÄNG", targets: ["SÄNG", "ÄNG"], data: { "SÄNG": { t: "سرير", s: "Jag har en mycket mjuk och skön säng.", st: "لدي سرير ناعم ومريح جداً." }, "ÄNG": { t: "مرج", s: "Vi hade picknick på en blommig äng.", st: "قمنا بنزهة في مرج مليء بالزهور." } } },
        { main: "DÖRRAR", targets: ["DÖRRAR", "DÖRR", "RÖRA", "RÖDA"], data: { "DÖRRAR": { t: "أبواب", s: "Vi håller alla dörrar öppna för dig.", st: "نحن نبقي جميع الأبواب مفتوحة لك." }, "DÖRR": { t: "باب", s: "Stäng dörren, det drar kallt.", st: "أغلق الباب، هناك تيار هواء بارد." }, "RÖRA": { t: "فوضى", s: "Vilken röra du har ställt till med!", st: "يا لها من فوضى تسببت بها!" }, "RÖDA": { t: "حمر", s: "Hon fick röda rosor på sin födelsedag.", st: "حصلت على ورود حمراء في عيد ميلادها." } } },
        { main: "MATTAN", targets: ["MATTAN", "MATTA", "MANAT", "TANT"], data: { "MATTAN": { t: "السجادة", s: "Katten ligger och sover på mattan.", st: "القطة نائمة على السجادة." }, "MATTA": { t: "سجادة", s: "Vi köpte en ny matta till vardagsrummet.", st: "اشترينا سجادة جديدة لغرفة المعيشة." }, "MANAT": { t: "حث", s: "Han har manat till lugn och ro.", st: "لقد دعا إلى الهدوء والسكينة." }, "TANT": { t: "سيدة", s: "En snäll tant gav mig godis.", st: "سيدة لطيفة أعطتني الحلوى." } } },
        { main: "SOFFAN", targets: ["SOFFAN", "SOFFA", "FANS"], data: { "SOFFAN": { t: "الأريكة", s: "Vi sitter och myser i soffan.", st: "نجلس ونستمتع بالراحة على الأريكة." }, "SOFFA": { t: "أريكة", s: "Detta är en mycket bekväm soffa.", st: "هذه أريكة مريحة جداً." }, "FANS": { t: "معجبين", s: "Bandet har många hängivna fans.", st: "الفرقة لديها العديد من المعجبين المخلصين." } } },
        { main: "GARDIN", targets: ["GARDIN", "DRAG", "RING", "GRAD", "GRAN"], data: { "GARDIN": { t: "ستارة", s: "Kan du dra för gardinen är du snäll?", st: "هل يمكنك إسدال الستارة من فضلك؟" }, "DRAG": { t: "سحبة", s: "Han gjorde ett smart drag i schack.", st: "قام بحركة ذكية في الشطرنج." }, "RING": { t: "خاتم", s: "Hon bär en vacker guldring på fingret.", st: "ترتدي خاتماً ذهبياً جميلاً في إصبعها." }, "GRAD": { t: "درجة", s: "Det är bara en grad varmt ute.", st: "درجة الحرارة درجة واحدة فقط في الخارج." }, "GRAN": { t: "تنوب", s: "Vi klär en gran till jul.", st: "نزين شجرة التنوب لعيد الميلاد." } } }
    ],
    5: [ // Health
        { main: "TÅR", targets: ["TÅR", "RÅT"], data: { "TÅR": { t: "دموع", s: "Tårarna rann nerför hennes kinder.", st: "انهمرت الدموع على خديها." }, "RÅT": { t: "نيء", s: "Man ska inte äta rått kött.", st: "لا ينبغي أكل اللحم الني." } } },
        { main: "HALS", targets: ["HALS", "SAL"], data: { "HALS": { t: "حلق", s: "Jag har haft ont i halsen hela dagen.", st: "كان حلقي يؤلمني طوال اليوم." }, "SAL": { t: "قاعة", s: "Patienten ligger på en stor sal.", st: "المريض يرقد في قاعة كبيرة." } } },
        { main: "ÖGA", targets: ["ÖGA"], data: { "ÖGA": { t: "عين", s: "Håll ett öga på barnen.", st: "ابقِ عينك على الأطفال." } } },
        { main: "PULS", targets: ["PULS", "SLUP", "PLUS"], data: { "PULS": { t: "نبض", s: "Läkaren bad mig att känna pulsen.", st: "طلب مني الطبيب تحسس النبض." }, "SLUP": { t: "قارب", s: "Vi seglade med en gammal slup.", st: "أبحرنا بقارب قديم." }, "PLUS": { t: "زائد", s: "Det är ett stort plus i kanten.", st: "هذه ميزة إضافية كبيرة." } } },
        { main: "FRISK", targets: ["FRISK", "RISK", "SKRI"], data: { "FRISK": { t: "صحي", s: "Det är skönt att andas frisk luft.", st: "من الرائع تنفس الهواء النقي." }, "RISK": { t: "خطر", s: "Det finns alltid en risk med affärer.", st: "هناك دائماً مخاطرة في الأعمال التجارية." }, "SKRI": { t: "صرخة", s: "Ett gällt skri hördes i natten.", st: "سُمعت صرخة مدوية في الليل." } } },
        { main: "LEVER", targets: ["LEVER", "ELEV", "REV"], data: { "LEVER": { t: "كبد", s: "Levern renar blodet i kroppen.", st: "الكبد ينقي الدم في الجسم." }, "ELEV": { t: "تلميذ", s: "Han är en duktig elev i skolan.", st: "إنه تلميذ مجتهد في المدرسة." }, "REV": { t: "شِعب", s: "Båten gick på ett undervattens rev.", st: "اصطدم القارب بشِعب مرجاني تحت الماء." } } },
        { main: "SMÄRTA", targets: ["SMÄRTA", "SMÄRT", "SÄRTA", "MÄTAR"], data: { "SMÄRTA": { t: "ألم", s: "Hon kände en stor smärta i ryggen.", st: "شعرت بألم كبير في ظهرها." }, "SMÄRT": { t: "نحيل", s: "Han är lång och smärt i kroppen.", st: "هو طويل ونحيل الجسم." }, "SÄRTA": { t: "بطة", s: "En särta simmade i viken.", st: "سبحت بطة في الخليج." }, "MÄTAR": { t: "عداد", s: "Vi måste läsa av elmätaren nu.", st: "يجب أن نقرأ عداد الكهرباء الآن." } } }, // Fixed 5-7 (Replaced HJÄRTA/SMÄRT with SMÄRTA/SMÄRT/SÄRTA/MÄTAR)
        { main: "ANDAS", targets: ["ANDAS", "SAND", "DANS", "ANDA"], data: { "ANDAS": { t: "يتنفس", s: "Kom ihåg att andas in djupt.", st: "تذكر أن تتنفس بعمق." }, "SAND": { t: "رمل", s: "Stranden har vit och mjuk sand.", st: "الشاطئ به رمال بيضاء وناعمة." }, "DANS": { t: "رقص", s: "Får jag lov till en dans?", st: "هل تسمحين لي برقصة؟" }, "ANDA": { t: "روح", s: "Vi arbetar i god anda tillsammans.", st: "نحن نعمل بروح طيبة معاً." } } },
        { main: "STYRKA", targets: ["STYRKA", "YRKA", "KRYA", "TYSK"], data: { "STYRKA": { t: "قوة", s: "Han visade prov på stor styrka.", st: "أظهر دليلاً على قوة كبيرة." }, "YRKA": { t: "يطالب", s: "Åklagaren valde att yrka på fängelse.", st: "اختار المدعي العام المطالبة بالسجن." }, "KRYA": { t: "يتعافى", s: "Hoppas du kryar på dig snart.", st: "آمل أن تتعافى قريباً." }, "TYSK": { t: "ألماني", s: "Jag träffade en trevlig tysk turist.", st: "التقيت بسائح ألماني لطيف." } } },
        { main: "SJUKDOM", targets: ["SJUKDOM", "SJUK", "JOD", "MJUK", "KOS"], data: { "SJUKDOM": { t: "مرض", s: "Han lider av en sällsynt sjukdom.", st: "هو يعاني من مرض نادر." }, "SJUK": { t: "مريض", s: "Jag är tyvärr sjuk idag.", st: "للأسف أنا مريض اليوم." }, "JOD": { t: "يود", s: "Jod används i sår.", st: "يستخدم اليود في الجروح." }, "MJUK": { t: "ناعم", s: "Kudden är väldigt mjuk och skön.", st: "الوسادة ناعمة ومريحة جداً." }, "KOS": { t: "رحيل", s: "Han drog sin kos.", st: "لقد رحل." } } }
    ],
    6: [ // Work
        { main: "LÖN", targets: ["LÖN", "ÖN"], data: { "LÖN": { t: "راتب", s: "När får vi vår lön utbetald?", st: "متى سيتم دفع رواتبنا؟" }, "ÖN": { t: "الجزيرة", s: "Vi åkte båt till en öde ö.", st: "ذهبنا بالقارب إلى جزيرة مهجورة." } } },
        { main: "CHEF", targets: ["CHEF", "FE"], data: { "CHEF": { t: "مدير", s: "Min chef är mycket förstående.", st: "مديري متفهم جداً." }, "FE": { t: "جنية", s: "Som en god fe i sagan.", st: "مثل جنية طيبة في الحكاية." } } },
        { main: "YRKE", targets: ["YRKE", "RYK"], data: { "YRKE": { t: "مهنة", s: "Vad har du för yrke?", st: "ما هي مهنتك؟" }, "RYK": { t: "دخن", s: "Ryk ihop och sluta bråka!", st: "تماسكوا وتوقفوا عن الشجار!" } } },
        { main: "AVTAL", targets: ["AVTAL", "VALT", "TAL"], data: { "AVTAL": { t: "اتفاقية", s: "Vi har skrivit på ett nytt avtal.", st: "لقد وقعنا على اتفاقية جديدة." }, "VALT": { t: "مختار", s: "Han har valt att sluta arbeta.", st: "لقد اختار التوقف عن العمل." }, "TAL": { t: "خطاب", s: "Han höll ett tal.", st: "ألقى خطاباً." } } },
        { main: "PLIKT", targets: ["PLIKT", "PILT", "LIKT"], data: { "PLIKT": { t: "واجب", s: "Det är din plikt att hjälpa till.", st: "إنه واجبك أن تساعد." }, "PILT": { t: "صبي", s: "En liten pilt lekte på gården.", st: "صبي صغير كان يلعب في الفناء." }, "LIKT": { t: "مشابه", s: "Det är likt honom att göra så.", st: "من عادته أن يفعل ذلك." } } },
        { main: "BYGGA", targets: ["BYGGA", "BYGG", "GABY"], data: { "BYGGA": { t: "يبني", s: "Vi ska bygga ett nytt hus.", st: "سنبني منزلاً جديداً." }, "BYGG": { t: "بناء", s: "Detta är ett stabilt bygg.", st: "هذا بناء مستقر." }, "GABY": { t: "غابي", s: "Gaby är ett namn på en person.", st: "غابي هو اسم شخص." } } },
        { main: "KONTOR", targets: ["KONTOR", "KORT", "ORO", "ORT"], data: { "KONTOR": { t: "مكتب", s: "Jag arbetar på ett stort kontor.", st: "أعمل في مكتب كبير." }, "KORT": { t: "قصير", s: "Kan jag få betala med kort?", st: "هل يمكنني الدفع بالبطاقة؟" }, "ORO": { t: "قلق", s: "Jag känner en viss oro för framtiden.", st: "أشعر ببعض القلق تجاه المستقبل." }, "ORT": { t: "منطقة", s: "En liten ort.", st: "منطقة صغيرة." } } },
        { main: "LOKAL", targets: ["LOKAL", "KAL", "KALL"], data: { "LOKAL": { t: "محلي", s: "Vi hyrde en lokal för festen.", st: "استأجرنا مكاناً للحفلة." }, "KAL": { t: "أصلع", s: "En kal fläck.", st: "بقعة صلعاء." }, "KALL": { t: "بارد", s: "Vintern är mörk och kall.", st: "الشتاء مظلم وبارد." } } },
        { main: "RIKARE", targets: ["RIKARE", "RIKA", "KARR", "REKA"], data: { "RIKARE": { t: "أغنى", s: "De rika blir allt rikare.", st: "الأغنياء يزدادون غنى." }, "RIKA": { t: "أغنياء", s: "De är rika på erfarenheter.", st: "هم أغنياء بالتجارب." }, "KARR": { t: "مستنقع", s: "Växten trivs i fuktiga karr.", st: "النبات ينمو في المستنقعات الرطبة." }, "REKA": { t: "يستطلع", s: "Vi måste reka området först.", st: "يجب أن نستطلع المنطقة أولاً." } } },
        { main: "PENSION", targets: ["PENSION", "SPION", "PION", "SNIP", "SION"], data: { "PENSION": { t: "تقاعد", s: "Han gick i pension vid 65 års ålder.", st: "تقاعد في سن الخامسة والستين." }, "SPION": { t: "جاسوس", s: "Han anklagades för att vara spion.", st: "اتُهم بأنه جاسوس." }, "PION": { t: "فاوانيا", s: "En vacker pion blommar i trädgården.", st: "زهرة فاوانيا جميلة تزهر في الحديقة." }, "SNIP": { t: "قارب", s: "En liten snip guppade på vågorna.", st: "قارب صغير كان يتمايل على الأمواج." }, "SION": { t: "صهيون", s: "Sion är ett berg i Jerusalem.", st: "صهيون هو جبل في القدس." } } }
    ],
    7: [ // Education
        { main: "PROV", targets: ["PROV", "ROV"], data: { "PROV": { t: "اختبار", s: "Vi har ett svårt prov imorgon.", st: "لدينا اختبار صعب غداً." }, "ROV": { t: "فريسة", s: "Lejonet smög på sitt rov.", st: "تسلل الأسد نحو فريسته." } } },
        { main: "KURS", targets: ["KURS", "SUR"], data: { "KURS": { t: "دورة", s: "Jag går en kurs i svenska.", st: "أنا أحضر دورة في اللغة السويدية." }, "SUR": { t: "غاضب", s: "Varför är han så sur idag?", st: "لماذا هو غاضب جداً اليوم؟" } } },
        { main: "RAST", targets: ["RAST", "RAS"], data: { "RAST": { t: "استراحة", s: "Barnen leker ute på sin rast.", st: "الأطفال يلعبون في الخارج خلال استراحتهم." }, "RAS": { t: "انهيار", s: "Det gick ett ras i bergen.", st: "حدث انهيار في الجبال." } } },
        { main: "SKOLA", targets: ["SKOLA", "SKAL", "KOLA"], data: { "SKOLA": { t: "مدرسة", s: "Skolan börjar klockan åtta.", st: "المدرسة تبدأ في الساعة الثامنة." }, "SKAL": { t: "قشرة", s: "Äpplet har ett rött skal.", st: "التفاحة لها قشرة حمراء." }, "KOLA": { t: "توفي", s: "Vill du ha en seg kola?", st: "هل تريد قطعة توفي لزجة؟" } } },
        { main: "TAVLA", targets: ["TAVLA", "TALA", "LAVA"], data: { "TAVLA": { t: "لوحة", s: "Läraren skriver på en tavla.", st: "المعلم يكتب على السبورة." }, "TALA": { t: "تحدث", s: "Tala är silver, tiga är guld.", st: "الكلام من فضة والسكوت من ذهب." }, "LAVA": { t: "حمم", s: "Vulkanen sprutade ut het lava.", st: "قذف البركان حمماً ساخنة." } } },
        { main: "KARTA", targets: ["KARTA", "RAKA", "ARTA"], data: { "KARTA": { t: "خريطة", s: "Vi behöver en karta för att hitta.", st: "نحتاج إلى خريطة لنجد الطريق." }, "RAKA": { t: "مستقيم", s: "Gå raka vägen hem.", st: "اذهب مباشرة إلى المنزل." }, "ARTA": { t: "تتطور", s: "Det verkar arta sig väl.", st: "يبدو أن الأمور تتطور بشكل جيد." } } },
        { main: "TERMIN", targets: ["TERMIN", "TIMER", "RITEN", "INTER"], data: { "TERMIN": { t: "فصل دراسي", s: "Höstterminen är ganska lång.", st: "فصل الخريف الدراسي طويل نوعاً ما." }, "TIMER": { t: "مؤقت", s: "Sätt en timer på tio minuter.", st: "اضبط المؤقت على عشر دقائق." }, "RITEN": { t: "الطقس", s: "Riten utfördes med stort allvar.", st: "أقيمت الطقوس بجدية كبيرة." }, "INTER": { t: "إنتر", s: "Inter vann matchen igår.", st: "فاز إنتر بالمباراة أمس." } } },
        { main: "PENNOR", targets: ["PENNOR", "ROPEN", "REP", "REN"], data: { "PENNOR": { t: "أقلام", s: "Jag har många färgglada pennor.", st: "لدي العديد من الأقلام الملونة." }, "ROPEN": { t: "الصرخات", s: "Ropen skallade över torget.", st: "دوت الصرخات في الساحة." }, "REP": { t: "حبل", s: "Ett rep är starkare än en tråd.", st: "الحبل أقوى من الخيط." }, "REN": { t: "نظيف", s: "Luften är ren och klar här.", st: "الهواء نقي وصافٍ هنا." } } },
        { main: "SKRIVA", targets: ["SKRIVA", "SKIVA", "VIRKA", "ARKIV"], data: { "SKRIVA": { t: "يكتب", s: "Jag gillar att skriva brev.", st: "أحب كتابة الرسائل." }, "SKIVA": { t: "شريحة", s: "Vill du ha en skiva bröd?", st: "هل تريد شريحة خبز؟" }, "VIRKA": { t: "يكروشيه", s: "Min mormor lärde mig virka.", st: "جدتي علمتني الكروشيه." }, "ARKIV": { t: "أرشيف", s: "Dokumenten finns i vårt arkiv.", st: "الوثائق موجودة في أرشيفنا." } } },
        { main: "STUDENT", targets: ["STUDENT", "STUND", "DUNST", "STUT", "SUNT"], data: { "STUDENT": { t: "طالب", s: "Han är student vid universitetet.", st: "هو طالب في الجامعة." }, "STUND": { t: "لحظة", s: "Vänta en liten stund är du snäll.", st: "انتظر لحظة من فضلك." }, "DUNST": { t: "بخار", s: "En dunst av parfym kändes.", st: "شوهدت سحابة من العطر." }, "STUT": { t: "ثور صغير", s: "En ung stut betade på ängen.", st: "ثور صغير كان يرعى في المرج." }, "SUNT": { t: "صحي", s: "Det är sunt förnuft.", st: "إنه المنطق السليم." } } }
    ],
    8: [ // Transport
        { main: "VAGN", targets: ["VAGN", "VAN"], data: { "VAGN": { t: "عربة", s: "Hästen drog en tung vagn.", st: "سحب الحصان عربة ثقيلة." }, "VAN": { t: "معتاد", s: "Han är van vid hårt arbete.", st: "هو معتاد على العمل الشاق." } } },
        { main: "ÅRA", targets: ["ÅRA", "RÅA"], data: { "ÅRA": { t: "مجاديف", s: "Vi tappade en åra i sjön.", st: "أسقطنا مجدافاً في البحيرة." }, "RÅA": { t: "نيئة", s: "Grönsakerna är godast råa.", st: "الخضروات ألذ وهي نيئة." } } },
        { main: "SPÅR", targets: ["SPÅR", "PÅ", "SÅ"], data: { "SPÅR": { t: "آثار", s: "Följ spåren.", st: "اتبع الآثار." }, "PÅ": { t: "على", s: "Ligg på soffan.", st: "استلقِ على الأريكة." }, "SÅ": { t: "يزرع", s: "Så ett frö.", st: "ازرع بذرة." } } },
        { main: "MOTOR", targets: ["MOTOR", "ROM", "ORM"], data: { "MOTOR": { t: "محرك", s: "Bilen har en stark motor.", st: "السيارة لها محرك قوي." }, "ROM": { t: "روم", s: "Alla vägar bär till Rom.", st: "كل الطرق تؤدي إلى روما." }, "ORM": { t: "ثعبان", s: "Jag är rädd för ormar.", st: "أنا أخاف من الثعابين." } } },
        { main: "VÄGAR", targets: ["VÄGAR", "ARG", "VÄG"], data: { "VÄGAR": { t: "طرق", s: "Herrens vägar äro outgrundliga.", st: "طرق الرب لا يمكن سبر أغوارها." }, "ARG": { t: "غاضب", s: "Han var arg.", st: "كان غاضباً." }, "VÄG": { t: "طريق", s: "En lång väg.", st: "طريق طويل." } } },
        { main: "BILAR", targets: ["BILAR", "BILA", "LIRA"], data: { "BILAR": { t: "سيارات", s: "Det finns många bilar på vägen.", st: "هناك العديد من السيارات على الطريق." }, "BILA": { t: "فأس", s: "Bödeln höjde sin bila.", st: "رفع الجلاد فأسه." }, "LIRA": { t: "يعزف", s: "Ska vi lira lite boll?", st: "هل نلعب الكرة قليلاً؟" } } },
        { main: "TRAFIK", targets: ["TRAFIK", "KRAFT", "FRAKT", "FIKA"], data: { "TRAFIK": { t: "مرور", s: "Det är mycket trafik idag.", st: "حركة المرور كثيفة اليوم." }, "KRAFT": { t: "قوة", s: "Kunskap är makt och kraft.", st: "المعرفة هي سلطة وقوة." }, "FRAKT": { t: "شحن", s: "Vi betalar för frakt och emballage.", st: "نحن ندفع تكاليف الشحن والتغليف." }, "FIKA": { t: "استراحة قهوة", s: "Ska vi ta en fika tillsammans?", st: "هل نأخذ استراحة قهوة معاً؟" } } },
        { main: "BILIST", targets: ["BILIST", "LIST", "SLIT", "BIL"], data: { "BILIST": { t: "سائق", s: "Varje bilist måste vara uppmärksam.", st: "يجب على كل سائق أن يكون منتبهاً." }, "LIST": { t: "قائمة", s: "Han använde list för att vinna.", st: "استخدم المكر ليفوز." }, "SLIT": { t: "كدح", s: "Det var mycket slit och släp.", st: "كان هناك الكثير من الكدح والعناء." }, "BIL": { t: "سيارة", s: "En snabb bil.", st: "سيارة سريعة." } } },
        { main: "VAGNAR", targets: ["VAGNAR", "NAV", "GARN", "VANA"], data: { "VAGNAR": { t: "عربات", s: "Tåget har många vagnar.", st: "القطار له العديد من العربات." }, "NAV": { t: "محور", s: "Hjulets nav.", st: "محور العجلة." }, "GARN": { t: "غزل", s: "Nystan av garn.", st: "كرة من الغزل." }, "VANA": { t: "عادة", s: "Gammal vana sitter i.", st: "العادات القديمة تموت بصعوبة." } } },
        { main: "STATION", targets: ["STATION", "STAT", "STAN", "NOTA", "TONA"], data: { "STATION": { t: "محطة", s: "Vi möts vid nästa station.", st: "نلتقي في المحطة التالية." }, "STAT": { t: "دولة", s: "Staten ska tjäna folket.", st: "يجب أن تخدم الدولة الشعب." }, "STAN": { t: "المدينة", s: "Vi ska åka in till stan.", st: "سنذهب إلى المدينة." }, "NOTA": { t: "فاتورة", s: "Kan vi få in notan, tack?", st: "هل يمكننا الحصول على الفاتورة، من فضلك؟" }, "TONA": { t: "تتلاشى", s: "Färgerna började tona bort.", st: "بدأت الألوان تتلاشى." } } }
    ],
    9: [ // Law
        { main: "LAG", targets: ["LAG", "GAL"], data: { "LAG": { t: "قانون", s: "Lagen är lika för alla.", st: "القانون سواسية للجميع." }, "GAL": { t: "يصيح", s: "Tuppen gal tidigt på morgonen.", st: "يصيح الديك في الصباح الباكر." } } },
        { main: "DOM", targets: ["DOM", "MOD"], data: { "DOM": { t: "حكم", s: "Domaren avkunnade en hård dom.", st: "أصدر القاضي حكماً قاسياً." }, "MOD": { t: "شجاعة", s: "Det krävs mod för att tala sanning.", st: "يتطلب الأمر شجاعة لقول الحقيقة." } } },
        { main: "RÄTT", targets: ["RÄTT", "TÄT"], data: { "RÄTT": { t: "حق", s: "Gör det som är rätt.", st: "افعل ما هو صواب." }, "TÄT": { t: "كثيف", s: "Skogen var mörk och tät.", st: "كانت الغابة مظلمة وكثيفة." } } },
        { main: "BROTT", targets: ["BROTT", "BORT", "BOTT"], data: { "BROTT": { t: "جريمة", s: "Brott lönar sig inte.", st: "الجريمة لا تفيد." }, "BORT": { t: "بعيداً", s: "Gå bort och kom aldrig tillbaka.", st: "اذهب بعيداً ولا تعد أبداً." }, "BOTT": { t: "سكن", s: "Jag har bott här i hela mitt liv.", st: "لقد عشت هنا طوال حياتي." } } },
        { main: "POLIS", targets: ["POLIS", "SILO", "SIL"], data: { "POLIS": { t: "شرطة", s: "Ring polisen om du ser något.", st: "اتصل بالشرطة إذا رأيت شيئاً." }, "SILO": { t: "صومعة", s: "Bonden lagrar säd i en silo.", st: "يخزن المزارع الحبوب في صومعة." }, "SIL": { t: "مصفاة", s: "Häll pastan i en sil.", st: "صب المعكرونة في مصفاة." } } },
        { main: "LAGAR", targets: ["LAGAR", "LAGA", "GALA"], data: { "LAGAR": { t: "قوانين", s: "Vi måste följa landets lagar.", st: "يجب أن نتبع قوانين البلاد." }, "LAGA": { t: "يصلح", s: "Jag ska laga mat ikväll.", st: "سأطبخ العشاء الليلة." }, "GALA": { t: "حفل", s: "De gick på en fin gala.", st: "ذهبوا إلى حفل راقٍ." } } },
        { main: "DOMARE", targets: ["DOMARE", "DOMAR", "DAMER", "MODE"], data: { "DOMARE": { t: "قاضي", s: "Domaren blåste av matchen.", st: "أطلق الحكم صافرة نهاية المباراة." }, "DOMAR": { t: "أحكام", s: "Guds domar är rättvisa.", st: "أحكام الله عادلة." }, "DAMER": { t: "سيدات", s: "Mina damer och herrar.", st: "سيداتي وسادتي." }, "MODE": { t: "موضة", s: "Hon följer alltid senaste mode.", st: "هي تتبع دائماً أحدث صيحات الموضة." } } },
        { main: "REGLER", targets: ["REGLER", "REGEL", "LEGER", "GER"], data: { "REGLER": { t: "قواعد", s: "Det finns regler man måste följa.", st: "هناك قواعد يجب اتباعها." }, "REGEL": { t: "قاعدة", s: "Ingen regel utan undantag.", st: "لا توجد قاعدة بدون استثناء." }, "LEGER": { t: "سبائك", s: "Brons är en legering av koppar.", st: "البرونز هو سبيكة من النحاس." }, "GER": { t: "يعطي", s: "Den som ger, han får.", st: "من يعطي، يأخذ." } } },
        { main: "STRAFF", targets: ["STRAFF", "STAFF", "FART", "SAFT"], data: { "STRAFF": { t: "عقاب", s: "Han fick ett strängt straff.", st: "تلقى عقاباً شديداً." }, "STAFF": { t: "طاقم", s: "Hela vår staff är här.", st: "طاقمنا بأكمله هنا." }, "FART": { t: "سرعة", s: "Det var full fart hela dagen.", st: "كانت السرعة قصوى طوال اليوم." }, "SAFT": { t: "عصير", s: "Barnen dricker saft och äter bullar.", st: "الأطفال يشربون العصير ويأكلون الكعك." } } },
        { main: "ARVET", targets: ["ARVET", "ARV", "VAR", "RET"], data: { "ARVET": { t: "الإرث", s: "Arvet fördelades mellan barnen.", st: "تم توزيع الإرث بين الأبناء." }, "ARV": { t: "إرث", s: "Miljön är ett arv till våra barn.", st: "البيئة إرث لأطفالنا." }, "VAR": { t: "أين", s: "Var har du varit någonstans?", st: "أين كنت؟" }, "RET": { t: "إغاظة", s: "Han gjorde det bara på ret.", st: "فعل ذلك فقط للإغاظة." } } }
    ],
    10: [ // Islam
        { main: "TRO", targets: ["TRO", "ROT"], data: { "TRO": { t: "إيمان", s: "Tro kan försätta berg.", st: "الإيمان يمكنه نقل الجبال." }, "ROT": { t: "جذر", s: "Kärleken är roten till allt gott.", st: "الحب هو جذر كل خير." } } },
        { main: "FRID", targets: ["FRID", "FRI"], data: { "FRID": { t: "سلام", s: "Vila i frid.", st: "ارقد في سلام." }, "FRI": { t: "حر", s: "Tanken är fri.", st: "الفكر حر." } } },
        { main: "FRED", targets: ["FRED", "RED"], data: { "FRED": { t: "سلام", s: "Vi vill ha fred på jorden.", st: "نريد السلام على الأرض." }, "RED": { t: "ركب", s: "Han red på en vit häst.", st: "ركب حصاناً أبيض." } } },
        { main: "ALLAH", targets: ["ALLAH", "HALL", "ALLA"], data: { "ALLAH": { t: "الله", s: "Det finns ingen gud utom Allah.", st: "لا إله إلا الله." }, "HALL": { t: "قاعة", s: "Vi möttes i en stor hall.", st: "التقينا في قاعة كبيرة." }, "ALLA": { t: "الجميع", s: "Alla människor är födda fria.", st: "يولد جميع الناس أحراراً." } } },
        { main: "ISLAM", targets: ["ISLAM", "SIA", "MILA"], data: { "ISLAM": { t: "إسلام", s: "Islam betyder underkastelse och fred.", st: "الإسلام يعني الاستسلام والسلام." }, "SIA": { t: "يتنبأ", s: "Sia om framtiden.", st: "تنبأ بالمستقبل." }, "MILA": { t: "ميل", s: "De vandrade en hel mila.", st: "ساروا ميلاً كاملاً." } } },
        { main: "ZAKAT", targets: ["ZAKAT", "KATA", "AKTA"], data: { "ZAKAT": { t: "زكاة", s: "Zakat är en av islams pelare.", st: "الزكاة هي أحد أركان الإسلام." }, "KATA": { t: "كاتا", s: "Han tränar kata varje dag.", st: "يتدرب على الكاتا كل يوم." }, "AKTA": { t: "يحذر", s: "Akta dig för hunden!", st: "احذر من الكلب!" } } },
        { main: "MOSKÉN", targets: ["MOSKÉN", "MOSKÉ", "SON", "SKO"], data: { "MOSKÉN": { t: "المسجد", s: "Vi går till moskén på fredagar.", st: "نذهب إلى المسجد أيام الجمعة." }, "MOSKÉ": { t: "مسجد", s: "Det finns en vacker moské här.", st: "يوجد مسجد جميل هنا." }, "SON": { t: "ابن", s: "Han är sin fars son.", st: "إنه ابن أبيه." }, "SKO": { t: "حذاء", s: "Klämmer skon någonstans?", st: "هل يضغط الحذاء في مكان ما؟ (هل هناك مشكلة؟)" } } },
        { main: "KORNA", targets: ["KORNA", "KORA", "ARK", "KAN"], data: { "KORNA": { t: "الأبقار", s: "Korna betar lugnt på ängen.", st: "الأبقار ترعى بهدوء في المرج." }, "KORA": { t: "يختار", s: "Vi ska kora en vinnare ikväll.", st: "سنختار فائزاً الليلة." }, "ARK": { t: "سفينة / ورقة", s: "Noaks ark räddade djuren.", st: "سفينة نوح أنقذت الحيوانات." }, "KAN": { t: "يستطيع", s: "Kan du hjälpa mig med detta?", st: "هل يمكنك مساعدتي في هذا؟" } } },
        { main: "HELIGT", targets: ["HELIGT", "HELIG", "HELT", "LITE"], data: { "HELIGT": { t: "مقدس", s: "Detta är ett heligt rum.", st: "هذه غرفة مقدسة." }, "HELIG": { t: "مقدس", s: "Koranen är en helig bok.", st: "القرآن كتاب مقدس." }, "HELT": { t: "تماماً", s: "Jag håller med dig helt och hållet.", st: "أنا أتفق معك تماماً." }, "LITE": { t: "قليل", s: "Kan jag få lite mer kaffe?", st: "هل يمكنني الحصول على المزيد من القهوة؟" } } },
        { main: "PROFET", targets: ["PROFET", "POET", "PORT", "FORT", "ROP"], data: { "PROFET": { t: "نبي", s: "Muhammed är Guds sista profet.", st: "محمد هو خاتم أنبياء الله." }, "POET": { t: "شاعر", s: "Han var en känd poet.", st: "كان شاعراً مشهوراً." }, "PORT": { t: "بوابة", s: "Han stod vid himmelens port.", st: "وقف عند بوابة السماء." }, "FORT": { t: "بسرعة", s: "Tiden går så fort när man har roligt.", st: "الوقت يمضي بسرعة عندما تستمتع." }, "ROP": { t: "صرخة", s: "Ett rop på hjälp.", st: "صرخة طلب للمساعدة." } } }
    ]
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
