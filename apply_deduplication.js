const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

// Full block replacements to ensure targets and data are in sync
const replacements = [
    {
        // 1-2: ROT -> OST
        find: '{ main: "ROT", targets: ["ROT", "TRO"], data: { "ROT": { t: "جذر", s: "Ingefära är en ätbar rot.", st: "الزنجبيل جذر صالح للأكل." }, "TRO": { t: "إيمان", s: "Tro kan försätta berg.", st: "الإيمان يمكنه نقل الجبال." } } }',
        replace: '{ main: "OST", targets: ["OST", "SO"], data: { "OST": { t: "جبن", s: "Jag älskar ost.", st: "أنا أحب الجبن." }, "SO": { t: "خنزيرة", s: "En so med kultingar.", st: "خنزيرة مع خنازير صغيرة." } } }'
    },
    {
        // 1-8: SALLAD -> BULLAR
        find: '{ main: "SALLAD", targets: ["SALLAD", "ALLAS", "LADA", "DALA"], data: { "SALLAD": { t: "سلطة", s: "Jag vill ha en fräsch sallad.", st: "أريد سلطة طازجة." }, "ALLAS": { t: "للجميع", s: "Det är allas ansvar.", st: "إنها مسؤولية الجميع." }, "LADA": { t: "حظيرة", s: "Hästen står inne i en lada.", st: "الحصان يقف داخل الحظيرة." }, "DALA": { t: "يهبط", s: "Vi såg solen dala ner i havet.", st: "رأينا الشمس تغرب في البحر." } } }',
        replace: '{ main: "BULLAR", targets: ["BULLAR", "RULLA", "LURA", "BUR"], data: { "BULLAR": { t: "كعك", s: "Vi bakar bullar.", st: "نحن نخبز الكعك." }, "RULLA": { t: "يدحرج", s: "Rulla köttbullarna.", st: "دحرج كرات اللحم." }, "LURA": { t: "يخدع", s: "Du kan inte lura mig.", st: "لا يمكنك خداعي." }, "BUR": { t: "قفص", s: "Fågeln sitter i en bur.", st: "الطائر في قفص." } } }'
    },
    {
        // 1-10: KORT -> ROST
        find: '{ main: "FRUKOST", targets: ["FRUKOST", "FROST", "KUST", "KORT", "STOR"], data: { "FRUKOST": { t: "فطور", s: "Frukost är dagens viktigaste måltid.", st: "الفطور هو أهم وجبة في اليوم." }, "FROST": { t: "صقيع", s: "Det är frost ute.", st: "يوجد صقيع في الخارج." }, "KUST": { t: "ساحل", s: "Vi bor vid kusten.", st: "نعيش عند الساحل." }, "KORT": { t: "قصير", s: "Kan jag få betala med kort?", st: "هل يمكنني الدفع بالبطاقة؟" }, "STOR": { t: "كبير", s: "Han beställde en stor stark öl.", st: "طلب كأساً كبيراً من البيرة القوية." } } }',
        replace: '{ main: "FRUKOST", targets: ["FRUKOST", "FROST", "KUST", "ROST", "STOR"], data: { "FRUKOST": { t: "فطور", s: "Frukost är dagens viktigaste måltid.", st: "الفطور هو أهم وجبة في اليوم." }, "FROST": { t: "صقيع", s: "Det är frost ute.", st: "يوجد صقيع في الخارج." }, "KUST": { t: "ساحل", s: "Vi bor vid kusten.", st: "نعيش عند الساحل." }, "ROST": { t: "صدأ", s: "Rost på bilen.", st: "صدأ على السيارة." }, "STOR": { t: "كبير", s: "Han beställde en stor stark öl.", st: "طلب كأساً كبيراً من البيرة القوية." } } }'
    },
    {
        // 2-4: RESA -> RENAR
        find: '{ main: "STENAR", targets: ["STENAR", "ENAR", "RESA"], data: { "STENAR": { t: "أحجار", s: "Man ska inte kasta stenar i glashus.", st: "لا ترمِ الناس بالحجارة وبيتك من زجاج." }, "ENAR": { t: "عرعر", s: "Dessa enar är gröna året om.", st: "أشجار العرعر هذه خضراء طوال العام." }, "RESA": { t: "سفر", s: "Att resa är att leva, sa han.", st: "قال إن السفر هو الحياة." } } }',
        replace: '{ main: "STENAR", targets: ["STENAR", "ENAR", "RENAR"], data: { "STENAR": { t: "أحجار", s: "Man ska inte kasta stenar i glashus.", st: "لا ترمِ الناس بالحجارة وبيتك من زجاج." }, "ENAR": { t: "عرعر", s: "Dessa enar är gröna året om.", st: "أشجار العرعر هذه خضراء طوال العام." }, "RENAR": { t: "رنة", s: "Renar lever i norr.", st: "تعيش الرنة في الشمال." } } }'
    },
    {
        // 2-9: VÄRDET -> BERGET
        find: '{ main: "VÄRDET", targets: ["VÄRDET", "VÄRDE", "TRÄDE", "VÄDRET"], data: { "VÄDRET": { t: "الطقس", s: "Alla gillar att prata om vädret.", st: "الجميع يحب الحديث عن الطقس." }, "VÄRDE": { t: "قيمة", s: "Detta har ett stort sentimentalt värde.", st: "هذا له قيمة عاطفية كبيرة." }, "TRÄDE": { t: "بور", s: "Åkern fick ligga i träde ett år.", st: "تُرك الحقل بوراً لمدة عام." }, "VÄRDET": { t: "القيمة", s: "Värdet av allt vi äger är stort.", st: "قيمة كل ما نملكه كبيرة." } } }',
        replace: '{ main: "BERGET", targets: ["BERGET", "BERG", "GET"], data: { "BERGET": { t: "الجبل", s: "Vi besteg berget.", st: "تسلقنا الجبل." }, "BERG": { t: "جبل", s: "Ett högt berg.", st: "جبل شاهق." }, "GET": { t: "ماعز", s: "En get bräkte.", st: "ماعز ثغى." } } }'
    },
    {
        // 3-4: RESA -> SNAR
        find: '{ main: "RESAN", targets: ["RESAN", "RESA", "SENA"], data: { "RESAN": { t: "الرحلة", s: "Resan var lång och mycket tröttsam.", st: "كانت الرحلة طويلة ومرهقة جداً." }, "SENA": { t: "متأخرة", s: "Jag gillar sena kvällar på sommaren.", st: "أحب الأمسيات المتأخرة في الصيف." } } }', // Note: Missing RESA data in find string because it was inherited/not explicitly there? No, it IS there in the file but I missed it in my copy-paste? Let's check file content again.
        // Ah, in 3-4: { main: "RESAN", targets: ["RESAN", "RESA", "SENA"], data: { "RESAN": ..., "SENA": ... } }
        // Wait, where is RESA data in 3-4?
        // In the file view:
        // 36: { main: "RESAN", targets: ["RESAN", "RESA", "SENA"], data: { "RESAN": { ... }, "SENA": { ... } } }
        // It seems RESA data is MISSING in 3-4 data object in the file! It relies on global dictionary?
        // But my generator script populates dictionary from these objects.
        // If it's missing here, it might be using the one from 3-1.
        // Anyway, I need to match what is IN THE FILE.
        find: '{ main: "RESAN", targets: ["RESAN", "RESA", "SENA"], data: { "RESAN": { t: "الرحلة", s: "Resan var lång och mycket tröttsam.", st: "كانت الرحلة طويلة ومرهقة جداً." }, "SENA": { t: "متأخرة", s: "Jag gillar sena kvällar på sommaren.", st: "أحب الأمسيات المتأخرة في الصيف." } } }',
        replace: '{ main: "RESAN", targets: ["RESAN", "SNAR", "SENA"], data: { "RESAN": { t: "الرحلة", s: "Resan var lång och mycket tröttsam.", st: "كانت الرحلة طويلة ومرهقة جداً." }, "SNAR": { t: "قريب", s: "En snar framtid.", st: "مستقبل قريب." }, "SENA": { t: "متأخرة", s: "Jag gillar sena kvällar på sommaren.", st: "أحب الأمسيات المتأخرة في الصيف." } } }'
    },
    {
        // 3-10: VÄRDE -> LÄNDER
        find: '{ main: "VÄRLDEN", targets: ["VÄRLDEN", "VÄRDE", "LÄRDE", "VÄRLD"], data: { "VÄRLDEN": { t: "العالم", s: "Han vill resa runt hela världen.", st: "يريد السفر حول العالم بأسره." }, "VÄRDE": { t: "قيمة", s: "Detta har ett stort sentimentalt värde.", st: "هذا له قيمة عاطفية كبيرة." }, "LÄRDE": { t: "علماء", s: "De lärde tvistar om den saken.", st: "العلماء يختلفون حول هذا الأمر." }, "VÄRLD": { t: "عالم", s: "Vi lever i en föränderlig värld.", st: "نحن نعيش في عالم متغير." } } }',
        replace: '{ main: "VÄRLDEN", targets: ["VÄRLDEN", "LÄNDER", "LÄRDE", "VÄRLD"], data: { "VÄRLDEN": { t: "العالم", s: "Han vill resa runt hela världen.", st: "يريد السفر حول العالم بأسره." }, "LÄNDER": { t: "بلدان", s: "Vi besökte många länder.", st: "زرنا العديد من البلدان." }, "LÄRDE": { t: "علماء", s: "De lärde tvistar om den saken.", st: "العلماء يختلفون حول هذا الأمر." }, "VÄRLD": { t: "عالم", s: "Vi lever i en föränderlig värld.", st: "نحن نعيش في عالم متغير." } } }'
    },
    {
        // 4-4: SOL -> STO
        find: '{ main: "STOL", targets: ["STOL", "LOTS", "SOL"], data: { "STOL": { t: "كرسي", s: "Dra fram en stol och sitt ner.", st: "اسحب كرسياً واجلس." }, "LOTS": { t: "مرشد", s: "Fartyget behövde en lots för att komma in.", st: "احتاجت السفينة إلى مرشد للدخول." }, "SOL": { t: "شمس", s: "Solen skiner från en klarblå himmel.", st: "الشمس تشرق من سماء زرقاء صافية." } } }',
        replace: '{ main: "STOL", targets: ["STOL", "LOTS", "STO"], data: { "STOL": { t: "كرسي", s: "Dra fram en stol och sitt ner.", st: "اسحب كرسياً واجلس." }, "LOTS": { t: "مرشد", s: "Fartyget behövde en lots för att komma in.", st: "احتاجت السفينة إلى مرشد للدخول." }, "STO": { t: "فرس", s: "Ett sto med sitt föl.", st: "فرس مع مهرها." } } }'
    },
    {
        // 4-5: BOR -> BOD
        find: '{ main: "BORD", targets: ["BORD", "ORD", "BOR"], data: { "BORD": { t: "طاولة", s: "Maten står framdukad på bordet.", st: "الطعام موضوع على الطاولة." }, "ORD": { t: "كلمة", s: "Ett ord kan säga mer än tusen bilder.", st: "كلمة واحدة قد تقول أكثر من ألف صورة." }, "BOR": { t: "يسكن", s: "Vi bor i en lägenhet i stan.", st: "نحن نسكن في شقة في المدينة." } } }',
        replace: '{ main: "BORD", targets: ["BORD", "ORD", "BOD"], data: { "BORD": { t: "طاولة", s: "Maten står framdukad på bordet.", st: "الطعام موضوع على الطاولة." }, "ORD": { t: "كلمة", s: "Ett ord kan säga mer än tusen bilder.", st: "كلمة واحدة قد تقول أكثر من ألف صورة." }, "BOD": { t: "كوخ", s: "Vi har en bod på gården.", st: "لدينا كوخ في الفناء." } } }'
    },
    {
        // 5-10: MOS -> KOS, DOM -> JOD
        find: '{ main: "SJUKDOM", targets: ["SJUKDOM", "SJUK", "DOM", "MJUK", "MOS"], data: { "SJUKDOM": { t: "مرض", s: "Han lider av en sällsynt sjukdom.", st: "هو يعاني من مرض نادر." }, "SJUK": { t: "مريض", s: "Jag är tyvärr sjuk idag.", st: "للأسف أنا مريض اليوم." }, "DOM": { t: "حكم", s: "Domaren avkunnade en hård dom.", st: "أصدر القاضي حكماً قاسياً." }, "MJUK": { t: "ناعم", s: "Kudden är väldigt mjuk och skön.", st: "الوسادة ناعمة ومريحة جداً." }, "MOS": { t: "هريس", s: "Han kände sig helt mos i huvudet.", st: "شعر بأن رأسه مثل الهريس (مرهق جداً)." } } }',
        replace: '{ main: "SJUKDOM", targets: ["SJUKDOM", "SJUK", "JOD", "MJUK", "KOS"], data: { "SJUKDOM": { t: "مرض", s: "Han lider av en sällsynt sjukdom.", st: "هو يعاني من مرض نادر." }, "SJUK": { t: "مريض", s: "Jag är tyvärr sjuk idag.", st: "للأسف أنا مريض اليوم." }, "JOD": { t: "يود", s: "Jod används i sår.", st: "يستخدم اليود في الجروح." }, "MJUK": { t: "ناعم", s: "Kudden är väldigt mjuk och skön.", st: "الوسادة ناعمة ومريحة جداً." }, "KOS": { t: "رحيل", s: "Han drog sin kos.", st: "لقد رحل." } } }'
    },
    {
        // 6-4: LAVA -> TAL
        find: '{ main: "AVTAL", targets: ["AVTAL", "VALT", "LAVA"], data: { "AVTAL": { t: "اتفاقية", s: "Vi har skrivit på ett nytt avtal.", st: "لقد وقعنا على اتفاقية جديدة." }, "VALT": { t: "مختار", s: "Han har valt att sluta arbeta.", st: "لقد اختار التوقف عن العمل." }, "LAVA": { t: "حمم", s: "Vulkanen sprutade ut het lava.", st: "قذف البركان حمماً ساخنة." } } }',
        replace: '{ main: "AVTAL", targets: ["AVTAL", "VALT", "TAL"], data: { "AVTAL": { t: "اتفاقية", s: "Vi har skrivit på ett nytt avtal.", st: "لقد وقعنا على اتفاقية جديدة." }, "VALT": { t: "مختار", s: "Han har valt att sluta arbeta.", st: "لقد اختار التوقف عن العمل." }, "TAL": { t: "خطاب", s: "Han höll ett tal.", st: "ألقى خطاباً." } } }'
    },
    {
        // 6-7: ROT -> ORT
        find: '{ main: "KONTOR", targets: ["KONTOR", "KORT", "ORO", "ROT"], data: { "KONTOR": { t: "مكتب", s: "Jag arbetar på ett stort kontor.", st: "أعمل في مكتب كبير." }, "KORT": { t: "قصير", s: "Kan jag få betala med kort?", st: "هل يمكنني الدفع بالبطاقة؟" }, "ORO": { t: "قلق", s: "Jag känner en viss oro för framtiden.", st: "أشعر ببعض القلق تجاه المستقبل." }, "ROT": { t: "جذر", s: "Kärleken är roten till allt gott.", st: "الحب هو جذر كل خير." } } }',
        replace: '{ main: "KONTOR", targets: ["KONTOR", "KORT", "ORO", "ORT"], data: { "KONTOR": { t: "مكتب", s: "Jag arbetar på ett stort kontor.", st: "أعمل في مكتب كبير." }, "KORT": { t: "قصير", s: "Kan jag få betala med kort?", st: "هل يمكنني الدفع بالبطاقة؟" }, "ORO": { t: "قلق", s: "Jag känner en viss oro för framtiden.", st: "أشعر ببعض القلق تجاه المستقبل." }, "ORT": { t: "منطقة", s: "En liten ort.", st: "منطقة صغيرة." } } }'
    },
    {
        // 6-8: KOLA -> KAL
        find: '{ main: "LOKAL", targets: ["LOKAL", "KOLA", "KALL"], data: { "LOKAL": { t: "محلي", s: "Vi hyrde en lokal för festen.", st: "استأجرنا مكاناً للحفلة." }, "KOLA": { t: "توفي", s: "Vill du ha en seg kola?", st: "هل تريد قطعة توفي لزجة؟" }, "KALL": { t: "بارد", s: "Vintern är mörk och kall.", st: "الشتاء مظلم وبارد." } } }',
        replace: '{ main: "LOKAL", targets: ["LOKAL", "KAL", "KALL"], data: { "LOKAL": { t: "محلي", s: "Vi hyrde en lokal för festen.", st: "استأجرنا مكاناً للحفلة." }, "KAL": { t: "أصلع", s: "En kal fläck.", st: "بقعة صلعاء." }, "KALL": { t: "بارد", s: "Vintern är mörk och kall.", st: "الشتاء مظلم وبارد." } } }'
    },
    {
        // 8-3: LAST -> SPÅR
        find: '{ main: "LAST", targets: ["LAST", "SAL"], data: { "LAST": { t: "حمل", s: "Lastbilen hade en mycket tung last.", st: "كانت الشاحنة تحمل حمولة ثقيلة جداً." }, "SAL": { t: "قاعة", s: "Patienten ligger på en stor sal.", st: "المريض يرقد في قاعة كبيرة." } } }',
        replace: '{ main: "SPÅR", targets: ["SPÅR", "PÅ", "SÅ"], data: { "SPÅR": { t: "آثار", s: "Följ spåren.", st: "اتبع الآثار." }, "PÅ": { t: "على", s: "Ligg på soffan.", st: "استلقِ على الأريكة." }, "SÅ": { t: "يزرع", s: "Så ett frö.", st: "ازرع بذرة." } } }'
    },
    {
        // 8-5: VARG -> VÄG, GRAV -> ARG
        find: '{ main: "VÄGAR", targets: ["VÄGAR", "GRAV", "VARG"], data: { "VÄGAR": { t: "طرق", s: "Herrens vägar äro outgrundliga.", st: "طرق الرب لا يمكن سبر أغوارها." }, "GRAV": { t: "قبر", s: "Han vände sig i sin grav.", st: "تقلب في قبره (من الغضب)." }, "VARG": { t: "ذئب", s: "Man ska inte ropa varg.", st: "لا ينبغي الصراخ بوجود ذئب (كذباً)." } } }',
        replace: '{ main: "VÄGAR", targets: ["VÄGAR", "ARG", "VÄG"], data: { "VÄGAR": { t: "طرق", s: "Herrens vägar äro outgrundliga.", st: "طرق الرب لا يمكن سبر أغوارها." }, "ARG": { t: "غاضب", s: "Han var arg.", st: "كان غاضباً." }, "VÄG": { t: "طريق", s: "En lång väg.", st: "طريق طويل." } } }'
    },
    {
        // 8-8: STIL -> BIL
        find: '{ main: "BILIST", targets: ["BILIST", "LIST", "SLIT", "STIL"], data: { "BILIST": { t: "سائق", s: "Varje bilist måste vara uppmärksam.", st: "يجب على كل سائق أن يكون منتبهاً." }, "LIST": { t: "قائمة", s: "Han använde list för att vinna.", st: "استخدم المكر ليفوز." }, "SLIT": { t: "كدح", s: "Det var mycket slit och släp.", st: "كان هناك الكثير من الكدح والعناء." }, "STIL": { t: "أسلوب", s: "Jag gillar verkligen din unika stil.", st: "أنا معجب حقاً بأسلوبك الفريد." } } }',
        replace: '{ main: "BILIST", targets: ["BILIST", "LIST", "SLIT", "BIL"], data: { "BILIST": { t: "سائق", s: "Varje bilist måste vara uppmärksam.", st: "يجب على كل سائق أن يكون منتبهاً." }, "LIST": { t: "قائمة", s: "Han använde list för att vinna.", st: "استخدم المكر ليفوز." }, "SLIT": { t: "كدح", s: "Det var mycket slit och släp.", st: "كان هناك الكثير من الكدح والعناء." }, "BIL": { t: "سيارة", s: "En snabb bil.", st: "سيارة سريعة." } } }'
    },
    {
        // 8-9: VARG -> NAV, GRAV -> GARN
        find: '{ main: "VAGNAR", targets: ["VAGNAR", "VARG", "GRAV", "VANA"], data: { "VAGNAR": { t: "عربات", s: "Tåget har många vagnar.", st: "القطار له العديد من العربات." }, "VARG": { t: "ذئب", s: "Man ska inte ropa varg.", st: "لا ينبغي الصراخ بوجود ذئب (كذباً)." }, "GRAV": { t: "قبر", s: "Han vände sig i sin grav.", st: "تقلب في قبره (من الغضب)." }, "VANA": { t: "عادة", s: "Gammal vana sitter i.", st: "العادات القديمة تموت بصعوبة." } } }',
        replace: '{ main: "VAGNAR", targets: ["VAGNAR", "NAV", "GARN", "VANA"], data: { "VAGNAR": { t: "عربات", s: "Tåget har många vagnar.", st: "القطار له العديد من العربات." }, "NAV": { t: "محور", s: "Hjulets nav.", st: "محور العجلة." }, "GARN": { t: "غزل", s: "Nystan av garn.", st: "كرة من الغزل." }, "VANA": { t: "عادة", s: "Gammal vana sitter i.", st: "العادات القديمة تموت بصعوبة." } } }'
    },
    {
        // 9-5: SOL -> SIL
        find: '{ main: "POLIS", targets: ["POLIS", "SILO", "SOL"], data: { "POLIS": { t: "شرطة", s: "Ring polisen om du ser något.", st: "اتصل بالشرطة إذا رأيت شيئاً." }, "SILO": { t: "صومعة", s: "Bonden lagrar säd i en silo.", st: "يخزن المزارع الحبوب في صومعة." }, "SOL": { t: "شمس", s: "Solen skiner från en klarblå himmel.", st: "الشمس تشرق من سماء زرقاء صافية." } } }',
        replace: '{ main: "POLIS", targets: ["POLIS", "SILO", "SIL"], data: { "POLIS": { t: "شرطة", s: "Ring polisen om du ser något.", st: "اتصل بالشرطة إذا رأيت شيئاً." }, "SILO": { t: "صومعة", s: "Bonden lagrar säd i en silo.", st: "يخزن المزارع الحبوب في صومعة." }, "SIL": { t: "مصفاة", s: "Häll pastan i en sil.", st: "صب المعكرونة في مصفاة." } } }'
    },
    {
        // 10-5: SILA -> SIA
        find: '{ main: "ISLAM", targets: ["ISLAM", "SILA", "MILA"], data: { "ISLAM": { t: "إسلام", s: "Islam betyder underkastelse och fred.", st: "الإسلام يعني الاستسلام والسلام." }, "SILA": { t: "يصفي", s: "Sila mygg och svälja kameler.", st: "يصفي البعوض ويبتلع الجمال (مثل)." }, "MILA": { t: "ميل", s: "De vandrade en hel mila.", st: "ساروا ميلاً كاملاً." } } }',
        replace: '{ main: "ISLAM", targets: ["ISLAM", "SIA", "MILA"], data: { "ISLAM": { t: "إسلام", s: "Islam betyder underkastelse och fred.", st: "الإسلام يعني الاستسلام والسلام." }, "SIA": { t: "يتنبأ", s: "Sia om framtiden.", st: "تنبأ بالمستقبل." }, "MILA": { t: "ميل", s: "De vandrade en hel mila.", st: "ساروا ميلاً كاملاً." } } }'
    },
    {
        // 10-10: REP -> ROP
        find: '{ main: "PROFET", targets: ["PROFET", "POET", "PORT", "FORT", "REP"], data: { "PROFET": { t: "نبي", s: "Muhammed är Guds sista profet.", st: "محمد هو خاتم أنبياء الله." }, "POET": { t: "شاعر", s: "Han var en känd poet.", st: "كان شاعراً مشهوراً." }, "PORT": { t: "بوابة", s: "Han stod vid himmelens port.", st: "وقف عند بوابة السماء." }, "FORT": { t: "بسرعة", s: "Tiden går så fort när man har roligt.", st: "الوقت يمضي بسرعة عندما تستمتع." }, "REP": { t: "حبل", s: "Ett rep är starkare än en tråd.", st: "الحبل أقوى من الخيط." } } }',
        replace: '{ main: "PROFET", targets: ["PROFET", "POET", "PORT", "FORT", "ROP"], data: { "PROFET": { t: "نبي", s: "Muhammed är Guds sista profet.", st: "محمد هو خاتم أنبياء الله." }, "POET": { t: "شاعر", s: "Han var en känd poet.", st: "كان شاعراً مشهوراً." }, "PORT": { t: "بوابة", s: "Han stod vid himmelens port.", st: "وقف عند بوابة السماء." }, "FORT": { t: "بسرعة", s: "Tiden går så fort när man har roligt.", st: "الوقت يمضي بسرعة عندما تستمتع." }, "ROP": { t: "صرخة", s: "Ett rop på hjälp.", st: "صرخة طلب للمساعدة." } } }'
    }
];

let updatedCount = 0;

replacements.forEach(item => {
    if (content.includes(item.find)) {
        content = content.replace(item.find, item.replace);
        updatedCount++;
    } else {
        console.warn(`Could not find data block for replacement: ${item.find.substring(0, 50)}...`);
    }
});

fs.writeFileSync(generatorPath, content);
console.log(`Applied ${updatedCount} deduplication fixes.`);
