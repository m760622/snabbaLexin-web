const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

// --- DATA STRUCTURE ---
const ADVANCED_THEMES = {
    1: [ // Food
        { main: "MOS", targets: ["MOS", "SOM"], data: { "MOS": { t: "هريس", s: "Korv med mos är gott.", st: "السجق مع الهريس لذيذ." }, "SOM": { t: "مثل", s: "Som man bäddar får man ligga.", st: "كما تزرع تحصد." } } },
        { main: "ROT", targets: ["ROT", "TRO"], data: { "ROT": { t: "جذر", s: "Morot är en rot.", st: "الجزر هو نوع من الجذور." }, "TRO": { t: "إيمان", s: "Tro kan försätta berg.", st: "الإيمان يمكنه نقل الجبال." } } },
        { main: "KAKA", targets: ["KAKA", "AKA"], data: { "KAKA": { t: "كعكة", s: "Vi bakar en kaka.", st: "نحن نخبز كعكة." }, "AKA": { t: "تُعرف بـ", s: "Hon är känd, aka stjärnan.", st: "هي مشهورة، وتُعرف بالنجمة." } } },
        { main: "LISTA", targets: ["LISTA", "SILA", "STIL"], data: { "LISTA": { t: "قائمة", s: "Skriv en lista.", st: "اكتب قائمة." }, "SILA": { t: "يصفي", s: "Sila mygg.", st: "يصفي البعوض." }, "STIL": { t: "أسلوب", s: "Din stil.", st: "أسلوبك." } } },
        { main: "STEKA", targets: ["STEKA", "KAST", "ASK"], data: { "STEKA": { t: "يقلي", s: "Vi ska steka.", st: "سنقلي." }, "KAST": { t: "رمية", s: "Ett kast.", st: "رمية." }, "ASK": { t: "علبة", s: "En ask.", st: "علبة." } } },
        { main: "MATEN", targets: ["MATEN", "TEAM", "META"], data: { "MATEN": { t: "الطعام", s: "Maten är klar.", st: "الطعام جاهز." }, "TEAM": { t: "فريق", s: "Vi är ett bra team.", st: "نحن فريق جيد." }, "META": { t: "يصطاد", s: "Att meta fisk är roligt.", st: "صيد السمك ممتع." } } },
        { main: "FLASKA", targets: ["FLASKA", "FALSK", "SKALA", "KALAS"], data: { "FLASKA": { t: "زجاجة", s: "En flaska vatten.", st: "زجاجة ماء." }, "FALSK": { t: "زائف", s: "Det låter falsk.", st: "يبدو صوته نشازاً." }, "SKALA": { t: "يقشر", s: "Skala en banan.", st: "قشر الموزة." }, "KALAS": { t: "حفلة", s: "Vi ska på kalas.", st: "سنذهب إلى حفلة." } } },
        { main: "SALLAD", targets: ["SALLAD", "ALLAS", "LADA", "DALA"], data: { "SALLAD": { t: "سلطة", s: "En fräsch sallad.", st: "سلطة طازجة." }, "ALLAS": { t: "للجميع", s: "Det är allas ansvar.", st: "إنها مسؤولية الجميع." }, "LADA": { t: "حظيرة", s: "En lada.", st: "حظيرة." }, "DALA": { t: "يهبط", s: "Solen dala.", st: "الشمس تغيب." } } },
        { main: "SKEDAR", targets: ["SKEDAR", "DERAS", "KADER", "SKADE"], data: { "SKEDAR": { t: "ملاعق", s: "Vi behöver skedar.", st: "نحتاج ملاعق." }, "DERAS": { t: "لهم", s: "Det är deras.", st: "إنه لهم." }, "KADER": { t: "كادر", s: "En kader.", st: "كادر." }, "SKADE": { t: "أذى", s: "Till skade.", st: "للأذى." } } },
        { main: "FRUKOST", targets: ["FRUKOST", "FROST", "KUST", "KORT", "STOR"], data: { "FRUKOST": { t: "فطور", s: "Frukost är viktig.", st: "الفطور مهم." }, "FROST": { t: "صقيع", s: "Det är frost ute.", st: "يوجد صقيع في الخارج." }, "KUST": { t: "ساحل", s: "Vi bor vid kusten.", st: "نعيش عند الساحل." }, "KORT": { t: "قصير", s: "Livet är kort.", st: "الحياة قصيرة." }, "STOR": { t: "كبير", s: "En stor stark.", st: "واحدة كبيرة." } } }
    ],
    2: [ // Nature
        { main: "SOL", targets: ["SOL", "LOS"], data: { "SOL": { t: "شمس", s: "Inget nytt under solen.", st: "لا جديد تحت الشمس." }, "LOS": { t: "يفك", s: "Kasta loss.", st: "فك الحبال." } } },
        { main: "HAV", targets: ["HAV", "AV"], data: { "HAV": { t: "بحر", s: "De sju haven.", st: "البحار السبعة." }, "AV": { t: "من / عن", s: "En bok av mig.", st: "كتاب من تأليفي." } } },
        { main: "TRÄD", targets: ["TRÄD", "TRÄ"], data: { "TRÄD": { t: "شجرة", s: "Ett träd i skogen.", st: "شجرة في الغابة." }, "TRÄ": { t: "يُدخل", s: "Trä nålen.", st: "أدخل الخيط في الإبرة." } } },
        { main: "STENAR", targets: ["STENAR", "ENAR", "RESA"], data: { "STENAR": { t: "أحجار", s: "Kasta inte stenar.", st: "لا ترمِ الحجارة." }, "ENAR": { t: "عرعر", s: "Enar är gröna.", st: "أشجار العرعر خضراء." }, "RESA": { t: "سفر", s: "Att resa.", st: "السفر." } } },
        { main: "DALAR", targets: ["DALAR", "DALA", "LADA"], data: { "DALAR": { t: "وديان", s: "Berg och dal.", st: "جبال ووديان." }, "DALA": { t: "يهبط", s: "Solen dala.", st: "الشمس تغيب." }, "LADA": { t: "حظيرة", s: "Hästen i en lada.", st: "الحصان في الحظيرة." } } },
        { main: "FLODEN", targets: ["FLODEN", "FLOD", "ODEN"], data: { "FLODEN": { t: "النهر", s: "Floden rinner.", st: "النهر يجري." }, "FLOD": { t: "فيضان", s: "Ebb och flod.", st: "المد والجزر." }, "ODEN": { t: "أودين", s: "Guden Oden.", st: "الإله أودين." } } },
        { main: "STJÄRNA", targets: ["STJÄRNA", "TJÄRNA", "RÄNTA", "TÄRNA"], data: { "STJÄRNA": { t: "نجمة", s: "Du är min stjärna.", st: "أنت نجمتي." }, "TJÄRNA": { t: "بحيرة", s: "En liten tjärna.", st: "بحيرة صغيرة." }, "RÄNTA": { t: "فائدة", s: "Ränta på ränta.", st: "فائدة مركبة." }, "TÄRNA": { t: "وصيفة", s: "Lucia tärna.", st: "وصيفة لوسيا." } } },
        { main: "BUSKAR", targets: ["BUSKAR", "BRUKA", "SKURA", "RUSA"], data: { "BUSKAR": { t: "شجيرات", s: "I buskarna.", st: "في الشجيرات." }, "BRUKA": { t: "يفلح", s: "Bruka jorden.", st: "فلاحة الأرض." }, "SKURA": { t: "يفرك", s: "Skura golvet.", st: "فرك الأرضية." }, "RUSA": { t: "يندفع", s: "Rusa iväg.", st: "يندفع بعيداً." } } },
        { main: "VÄRDET", targets: ["VÄRDET", "VÄRDE", "TRÄDE", "VÄDRET"], data: { "VÄDRET": { t: "الطقس", s: "Prata om vädret.", st: "الحديث عن الطقس." }, "VÄRDE": { t: "قيمة", s: "Högt värde.", st: "قيمة عالية." }, "TRÄDE": { t: "بور", s: "Ligga i träde.", st: "متروكة بوراً." }, "VÄRDET": { t: "القيمة", s: "Värdet av allt.", st: "قيمة كل شيء." } } },
        { main: "NATUREN", targets: ["NATUREN", "NATUR", "RUNT", "TUNA", "RUTA"], data: { "NATUREN": { t: "الطبيعة", s: "Skydda naturen.", st: "احمِ الطبيعة." }, "NATUR": { t: "طبيعة", s: "Vacker natur.", st: "طبيعة جميلة." }, "RUNT": { t: "حول", s: "Jorden runt.", st: "حول الأرض." }, "TUNA": { t: "ساحة", s: "Eskilstuna stad.", st: "مدينة إسكيلستونا." }, "RUTA": { t: "مربع", s: "En ruta.", st: "مربع." } } }
    ],
    3: [ // Travel
        { main: "RESA", targets: ["RESA", "RES"], data: { "RESA": { t: "سفر", s: "Att resa är att leva.", st: "السفر هو الحياة." }, "RES": { t: "سافر", s: "Res dig upp.", st: "انهض." } } },
        { main: "GATA", targets: ["GATA", "TAG"], data: { "GATA": { t: "شارع", s: "Gå över gatan.", st: "اعبر الشارع." }, "TAG": { t: "قبضة", s: "Ta ett tag.", st: "أمسك به." } } },
        { main: "BRO", targets: ["BRO", "BOR"], data: { "BRO": { t: "جسر", s: "Över en bro.", st: "فوق جسر." }, "BOR": { t: "يسكن", s: "Var bor du?", st: "أين تسكن؟" } } },
        { main: "RESAN", targets: ["RESAN", "RESA", "SENA"], data: { "RESAN": { t: "الرحلة", s: "Resan var lång.", st: "كانت الرحلة طويلة." }, "SENA": { t: "متأخرة", s: "Sena kvällar.", st: "أمسيات متأخرة." } } },
        { main: "PLATS", targets: ["PLATS", "LAST", "STAL"], data: { "PLATS": { t: "مكان", s: "Ta plats.", st: "خذ مكاناً." }, "LAST": { t: "حمل", s: "Tung last.", st: "حمل ثقيل." }, "STAL": { t: "سرق", s: "Han stal cykeln.", st: "سرق الدراجة." } } },
        { main: "ÖSTER", targets: ["ÖSTER", "RÖST", "REST"], data: { "ÖSTER": { t: "شرق", s: "Solen i öster.", st: "الشمس في الشرق." }, "RÖST": { t: "صوت", s: "Vacker röst.", st: "صوت جميل." }, "REST": { t: "سافر", s: "Vi har rest.", st: "لقد سافرنا." } } },
        { main: "SEGLAR", targets: ["SEGLAR", "SEGLA", "LAGER", "SEGRA"], data: { "SEGLAR": { t: "يبحر", s: "Han seglar.", st: "هو يبحر." }, "SEGLA": { t: "إبحار", s: "Att segla.", st: "الإبحار." }, "LAGER": { t: "مخزون", s: "På lager.", st: "في المخزون." }, "SEGRA": { t: "ينتصر", s: "Att segra.", st: "الانتصار." } } },
        { main: "BUSSAR", targets: ["BUSSAR", "RUSA", "BRAS", "BARS"], data: { "BUSSAR": { t: "حافلات", s: "Bussarna går.", st: "الحافلات تسير." }, "RUSA": { t: "يندفع", s: "Rusa iväg.", st: "يندفع." }, "BRAS": { t: "نار", s: "En bras.", st: "نار (موقد)." }, "BARS": { t: "حُمل", s: "Han bars ut.", st: "حُمل للخارج." } } },
        { main: "FÄRDEN", targets: ["FÄRDEN", "FÄRDE", "ÄNDER", "NÄRDE"], data: { "FÄRDEN": { t: "الرحلة", s: "Färden mot norr.", st: "الرحلة نحو الشمال." }, "FÄRDE": { t: "خطر", s: "Fara å färde.", st: "خطر محدق." }, "ÄNDER": { t: "بط", s: "Mata änder.", st: "إطعام البط." }, "NÄRDE": { t: "غذى", s: "Han närde en dröm.", st: "كان يغذي حلماً." } } },
        { main: "VÄRLDEN", targets: ["VÄRLDEN", "VÄRDE", "LÄRDE", "VÄRLD"], data: { "VÄRLDEN": { t: "العالم", s: "Hela världen.", st: "العالم بأسره." }, "VÄRDE": { t: "قيمة", s: "Ett värde.", st: "قيمة." }, "LÄRDE": { t: "علماء", s: "De lärde.", st: "العلماء." }, "VÄRLD": { t: "عالم", s: "En värld.", st: "عالم." } } }
    ],
    4: [ // Daily
        { main: "RUM", targets: ["RUM", "MUR"], data: { "RUM": { t: "غرفة", s: "Mitt rum.", st: "غرفتي." }, "MUR": { t: "جدار", s: "En mur.", st: "جدار." } } },
        { main: "HUS", targets: ["HUS"], data: { "HUS": { t: "بيت", s: "Rött hus.", st: "بيت أحمر." } } },
        { main: "TAK", targets: ["TAK", "AKT"], data: { "TAK": { t: "سقف", s: "Taket läcker.", st: "السقف يسرب." }, "AKT": { t: "فصل", s: "Första akten.", st: "الفصل الأول." } } },
        { main: "STOL", targets: ["STOL", "LOTS", "SOL"], data: { "STOL": { t: "كرسي", s: "En stol.", st: "كرسي." }, "LOTS": { t: "مرشد", s: "En lots.", st: "مرشد." }, "SOL": { t: "شمس", s: "Sol.", st: "شمس." } } },
        { main: "BORD", targets: ["BORD", "ORD", "BOR"], data: { "BORD": { t: "طاولة", s: "På bordet.", st: "على الطاولة." }, "ORD": { t: "كلمة", s: "Ett ord.", st: "كلمة." }, "BOR": { t: "يسكن", s: "Vi bor.", st: "نحن نسكن." } } },
        { main: "SÄNG", targets: ["SÄNG", "ÄNG"], data: { "SÄNG": { t: "سرير", s: "Mjuk säng.", st: "سرير ناعم." }, "ÄNG": { t: "مرج", s: "På en äng.", st: "في مرج." } } },
        { main: "DÖRRAR", targets: ["DÖRRAR", "DÖRR", "RÖRA", "RÖDA"], data: { "DÖRRAR": { t: "أبواب", s: "Öppna dörrar.", st: "أبواب مفتوحة." }, "DÖRR": { t: "باب", s: "Stäng dörren.", st: "أغلق الباب." }, "RÖRA": { t: "فوضى", s: "Vilken röra.", st: "يا لها من فوضى." }, "RÖDA": { t: "حمر", s: "Röda rosor.", st: "ورود حمراء." } } },
        { main: "MATTAN", targets: ["MATTAN", "MATTA", "MANAT", "TANT"], data: { "MATTAN": { t: "السجادة", s: "På mattan.", st: "على السجادة." }, "MATTA": { t: "سجادة", s: "En matta.", st: "سجادة." }, "MANAT": { t: "حث", s: "Han manat.", st: "هو حث." }, "TANT": { t: "سيدة", s: "En tant.", st: "سيدة." } } },
        { main: "SOFFAN", targets: ["SOFFAN", "SOFFA", "FANS"], data: { "SOFFAN": { t: "الأريكة", s: "I soffan.", st: "في الأريكة." }, "SOFFA": { t: "أريكة", s: "En soffa.", st: "أريكة." }, "FANS": { t: "معجبين", s: "Många fans.", st: "معجبين كثر." } } },
        { main: "GARDIN", targets: ["GARDIN", "DRAG", "RING", "GRAD", "GRAN"], data: { "GARDIN": { t: "ستارة", s: "Dra för gardinen.", st: "أسدل الستارة." }, "DRAG": { t: "سحبة", s: "Ett drag.", st: "سحبة." }, "RING": { t: "خاتم", s: "Guldring.", st: "خاتم ذهب." }, "GRAD": { t: "درجة", s: "En grad.", st: "درجة واحدة." }, "GRAN": { t: "تنوب", s: "En gran.", st: "شجرة تنوب." } } }
    ],
    5: [ // Health
        { main: "TÅR", targets: ["TÅR", "RÅT"], data: { "TÅR": { t: "دموع", s: "Tårarna rann.", st: "انهمرت الدموع." }, "RÅT": { t: "نيء", s: "Rått kött.", st: "لحم نيء." } } },
        { main: "HALS", targets: ["HALS", "SAL"], data: { "HALS": { t: "حلق", s: "Ont i halsen.", st: "ألم في الحلق." }, "SAL": { t: "قاعة", s: "En sal.", st: "قاعة." } } },
        { main: "ÖGA", targets: ["ÖGA"], data: { "ÖGA": { t: "عين", s: "Ett öga.", st: "عين." } } },
        { main: "PULS", targets: ["PULS", "SLUP", "PLUS"], data: { "PULS": { t: "نبض", s: "Känn pulsen.", st: "تحسس النبض." }, "SLUP": { t: "قارب", s: "En slup.", st: "قارب." }, "PLUS": { t: "زائد", s: "Ett plus.", st: "زائد." } } },
        { main: "FRISK", targets: ["FRISK", "RISK", "SKRI"], data: { "FRISK": { t: "صحي", s: "Frisk luft.", st: "هواء نقي." }, "RISK": { t: "خطر", s: "En risk.", st: "خطر." }, "SKRI": { t: "صرخة", s: "Ett skri.", st: "صرخة." } } },
        { main: "LEVER", targets: ["LEVER", "ELEV", "REV"], data: { "LEVER": { t: "كبد", s: "Levern renar.", st: "الكبد ينقي." }, "ELEV": { t: "تلميذ", s: "En elev.", st: "تلميذ." }, "REV": { t: "شِعب", s: "Ett rev.", st: "شِعب (مرجانية)." } } },
        { main: "SMÄRTA", targets: ["SMÄRTA", "SMÄRT", "SÄRTA", "MÄTAR"], data: { "SMÄRTA": { t: "ألم", s: "Stor smärta.", st: "ألم كبير." }, "SMÄRT": { t: "نحيل", s: "Han är smärt.", st: "هو نحيل." }, "SÄRTA": { t: "بطة", s: "En särta.", st: "بطة." }, "MÄTAR": { t: "عداد", s: "En mätare.", st: "عداد." } } }, // Fixed 5-7 (Replaced HJÄRTA/SMÄRT with SMÄRTA/SMÄRT/SÄRTA/MÄTAR)
        { main: "ANDAS", targets: ["ANDAS", "SAND", "DANS", "ANDA"], data: { "ANDAS": { t: "يتنفس", s: "Andas in.", st: "تنفس." }, "SAND": { t: "رمل", s: "Sand.", st: "رمل." }, "DANS": { t: "رقص", s: "En dans.", st: "رقصة." }, "ANDA": { t: "روح", s: "I anda.", st: "بروح." } } },
        { main: "STYRKA", targets: ["STYRKA", "YRKA", "KRYA", "TYSK"], data: { "STYRKA": { t: "قوة", s: "Stor styrka.", st: "قوة كبيرة." }, "YRKA": { t: "يطالب", s: "Yrka bifall.", st: "المطالبة." }, "KRYA": { t: "يتعافى", s: "Krya på dig.", st: "بالشفاء." }, "TYSK": { t: "ألماني", s: "En tysk.", st: "ألماني." } } },
        { main: "SJUKDOM", targets: ["SJUKDOM", "SJUK", "DOM", "MJUK", "MOS"], data: { "SJUKDOM": { t: "مرض", s: "Sjukdom.", st: "مرض." }, "SJUK": { t: "مريض", s: "Sjuk.", st: "مريض." }, "DOM": { t: "حكم", s: "En dom.", st: "حكم." }, "MJUK": { t: "ناعم", s: "Mjuk.", st: "ناعم." }, "MOS": { t: "هريس", s: "Mos.", st: "هريس." } } }
    ],
    6: [ // Work
        { main: "LÖN", targets: ["LÖN", "ÖN"], data: { "LÖN": { t: "راتب", s: "Lönen.", st: "الراتب." }, "ÖN": { t: "الجزيرة", s: "På ön.", st: "في الجزيرة." } } },
        { main: "CHEF", targets: ["CHEF", "FE"], data: { "CHEF": { t: "مدير", s: "Min chef.", st: "مديري." }, "FE": { t: "جنية", s: "En fe.", st: "جنية." } } },
        { main: "YRKE", targets: ["YRKE", "RYK"], data: { "YRKE": { t: "مهنة", s: "Ditt yrke.", st: "مهنتك." }, "RYK": { t: "دخن", s: "Ryk.", st: "دخن (أمر)." } } },
        { main: "AVTAL", targets: ["AVTAL", "VALT", "LAVA"], data: { "AVTAL": { t: "اتفاقية", s: "Ett avtal.", st: "اتفاقية." }, "VALT": { t: "مختار", s: "Har valt.", st: "اختار." }, "LAVA": { t: "حمم", s: "Lava.", st: "حمم." } } },
        { main: "PLIKT", targets: ["PLIKT", "PILT", "LIKT"], data: { "PLIKT": { t: "واجب", s: "Din plikt.", st: "واجبك." }, "PILT": { t: "صبي", s: "En pilt.", st: "صبي." }, "LIKT": { t: "مشابه", s: "Det är likt.", st: "مشابه." } } },
        { main: "BYGGA", targets: ["BYGGA", "BYGG", "GABY"], data: { "BYGGA": { t: "يبني", s: "Bygga hus.", st: "بناء منزل." }, "BYGG": { t: "بناء", s: "Bygg.", st: "بناء." }, "GABY": { t: "غابي", s: "Gaby.", st: "غابي." } } },
        { main: "KONTOR", targets: ["KONTOR", "KORT", "ORO", "ROT"], data: { "KONTOR": { t: "مكتب", s: "På kontor.", st: "في مكتب." }, "KORT": { t: "قصير", s: "Kort.", st: "قصير." }, "ORO": { t: "قلق", s: "Känna oro.", st: "الشعور بالقلق." }, "ROT": { t: "جذر", s: "Rot.", st: "جذر." } } },
        { main: "LOKAL", targets: ["LOKAL", "KOLA", "KALL"], data: { "LOKAL": { t: "محلي", s: "Lokal.", st: "محلي." }, "KOLA": { t: "توفي", s: "Kola.", st: "توفي." }, "KALL": { t: "بارد", s: "Kall.", st: "بارد." } } },
        { main: "RIKARE", targets: ["RIKARE", "RIKA", "KARR", "REKA"], data: { "RIKARE": { t: "أغنى", s: "Blev rikare.", st: "أصبح أغنى." }, "RIKA": { t: "أغنياء", s: "Rika.", st: "أغنياء." }, "KARR": { t: "مستنقع", s: "Karr.", st: "مستنقع." }, "REKA": { t: "يستطلع", s: "Reka.", st: "يستطلع." } } },
        { main: "PENSION", targets: ["PENSION", "SPION", "PION", "SNIP", "SION"], data: { "PENSION": { t: "تقاعد", s: "Pension.", st: "تقاعد." }, "SPION": { t: "جاسوس", s: "Spion.", st: "جاسوس." }, "PION": { t: "فاوانيا", s: "Pion.", st: "فاوانيا." }, "SNIP": { t: "قارب", s: "Snip.", st: "قارب." }, "SION": { t: "صهيون", s: "Sion.", st: "صهيون." } } }
    ],
    7: [ // Education
        { main: "PROV", targets: ["PROV", "ROV"], data: { "PROV": { t: "اختبار", s: "Ett prov.", st: "اختبار." }, "ROV": { t: "فريسة", s: "Ett rov.", st: "فريسة." } } },
        { main: "KURS", targets: ["KURS", "SUR"], data: { "KURS": { t: "دورة", s: "En kurs.", st: "دورة." }, "SUR": { t: "غاضب", s: "Han är sur.", st: "هو غاضب." } } },
        { main: "RAST", targets: ["RAST", "RAS"], data: { "RAST": { t: "استراحة", s: "En rast.", st: "استراحة." }, "RAS": { t: "انهيار", s: "Ett ras.", st: "انهيار." } } },
        { main: "SKOLA", targets: ["SKOLA", "SKAL", "KOLA"], data: { "SKOLA": { t: "مدرسة", s: "Skolan.", st: "المدرسة." }, "SKAL": { t: "قشرة", s: "Ett skal.", st: "قشرة." }, "KOLA": { t: "توفي", s: "En kola.", st: "توفي." } } },
        { main: "TAVLA", targets: ["TAVLA", "TALA", "LAVA"], data: { "TAVLA": { t: "لوحة", s: "En tavla.", st: "لوحة." }, "TALA": { t: "تحدث", s: "Att tala.", st: "التحدث." }, "LAVA": { t: "حمم", s: "Lava.", st: "حمم." } } },
        { main: "KARTA", targets: ["KARTA", "RAKA", "ARTA"], data: { "KARTA": { t: "خريطة", s: "En karta.", st: "خريطة." }, "RAKA": { t: "مستقيم", s: "Raka vägen.", st: "طريق مستقيم." }, "ARTA": { t: "تتطور", s: "Det artar sig.", st: "الأمور تتطور." } } },
        { main: "TERMIN", targets: ["TERMIN", "TIMER", "RITEN", "INTER"], data: { "TERMIN": { t: "فصل دراسي", s: "En termin.", st: "فصل دراسي." }, "TIMER": { t: "مؤقت", s: "En timer.", st: "مؤقت." }, "RITEN": { t: "الطقس", s: "Riten.", st: "الطقس (الديني)." }, "INTER": { t: "إنتر", s: "Inter.", st: "إنتر." } } },
        { main: "PENNOR", targets: ["PENNOR", "ROPEN", "REP", "REN"], data: { "PENNOR": { t: "أقلام", s: "Pennor.", st: "أقلام." }, "ROPEN": { t: "الصرخات", s: "Ropen.", st: "الصرخات." }, "REP": { t: "حبل", s: "Ett rep.", st: "حبل." }, "REN": { t: "نظيف", s: "Ren.", st: "نظيف." } } },
        { main: "SKRIVA", targets: ["SKRIVA", "SKIVA", "VIRKA", "ARKIV"], data: { "SKRIVA": { t: "يكتب", s: "Att skriva.", st: "الكتابة." }, "SKIVA": { t: "شريحة", s: "En skiva.", st: "شريحة." }, "VIRKA": { t: "يكروشيه", s: "Virka.", st: "عمل الكروشيه." }, "ARKIV": { t: "أرشيف", s: "Arkiv.", st: "أرشيف." } } },
        { main: "STUDENT", targets: ["STUDENT", "STUND", "DUNST", "STUT", "SUNT"], data: { "STUDENT": { t: "طالب", s: "En student.", st: "طالب." }, "STUND": { t: "لحظة", s: "En stund.", st: "لحظة." }, "DUNST": { t: "بخار", s: "En dunst.", st: "بخار." }, "STUT": { t: "ثور صغير", s: "En stut.", st: "ثور صغير." }, "SUNT": { t: "صحي", s: "Sunt liv.", st: "حياة صحية." } } }
    ],
    8: [ // Transport
        { main: "VAGN", targets: ["VAGN", "VAN"], data: { "VAGN": { t: "عربة", s: "En vagn.", st: "عربة." }, "VAN": { t: "معتاد", s: "Han är van.", st: "هو معتاد." } } },
        { main: "ÅRA", targets: ["ÅRA", "RÅA"], data: { "ÅRA": { t: "مجاديف", s: "En åra.", st: "مجاديف." }, "RÅA": { t: "نيئة", s: "Råa.", st: "نيئة." } } },
        { main: "LAST", targets: ["LAST", "SAL"], data: { "LAST": { t: "حمل", s: "En last.", st: "حمل." }, "SAL": { t: "قاعة", s: "En sal.", st: "قاعة." } } },
        { main: "MOTOR", targets: ["MOTOR", "ROM", "ORM"], data: { "MOTOR": { t: "محرك", s: "Motor.", st: "محرك." }, "ROM": { t: "روم", s: "Rom.", st: "روم." }, "ORM": { t: "ثعبان", s: "En orm.", st: "ثعبان." } } },
        { main: "VÄGAR", targets: ["VÄGAR", "GRAV", "VARG"], data: { "VÄGAR": { t: "طرق", s: "Vägar.", st: "طرق." }, "GRAV": { t: "قبر", s: "En grav.", st: "قبر." }, "VARG": { t: "ذئب", s: "En varg.", st: "ذئب." } } },
        { main: "BILAR", targets: ["BILAR", "BILA", "LIRA"], data: { "BILAR": { t: "سيارات", s: "Bilar.", st: "سيارات." }, "BILA": { t: "فأس", s: "En bila.", st: "فأس." }, "LIRA": { t: "يعزف", s: "Lira boll.", st: "لعب الكرة." } } },
        { main: "TRAFIK", targets: ["TRAFIK", "KRAFT", "FRAKT", "FIKA"], data: { "TRAFIK": { t: "مرور", s: "Trafik.", st: "مرور." }, "KRAFT": { t: "قوة", s: "Kraft.", st: "قوة." }, "FRAKT": { t: "شحن", s: "Frakt.", st: "شحن." }, "FIKA": { t: "استراحة قهوة", s: "En fika.", st: "استراحة قهوة." } } },
        { main: "BILIST", targets: ["BILIST", "LIST", "SLIT", "STIL"], data: { "BILIST": { t: "سائق", s: "En bilist.", st: "سائق." }, "LIST": { t: "قائمة", s: "En list.", st: "قائمة." }, "SLIT": { t: "كدح", s: "Slit och släp.", st: "كدح وعناء." }, "STIL": { t: "أسلوب", s: "Din stil.", st: "أسلوبك." } } },
        { main: "VAGNAR", targets: ["VAGNAR", "VARG", "GRAV", "VANA"], data: { "VAGNAR": { t: "عربات", s: "Vagnar.", st: "عربات." }, "VARG": { t: "ذئب", s: "Varg.", st: "ذئب." }, "GRAV": { t: "قبر", s: "Grav.", st: "قبر." }, "VANA": { t: "عادة", s: "En vana.", st: "عادة." } } },
        { main: "STATION", targets: ["STATION", "STAT", "STAN", "NOTA", "TONA"], data: { "STATION": { t: "محطة", s: "Stationen.", st: "المحطة." }, "STAT": { t: "دولة", s: "En stat.", st: "دولة." }, "STAN": { t: "المدينة", s: "I stan.", st: "في المدينة." }, "NOTA": { t: "فاتورة", s: "En nota.", st: "فاتورة." }, "TONA": { t: "تتلاشى", s: "Tona bort.", st: "تتلاشى." } } }
    ],
    9: [ // Law
        { main: "LAG", targets: ["LAG", "GAL"], data: { "LAG": { t: "قانون", s: "En lag.", st: "قانون." }, "GAL": { t: "يصيح", s: "Tuppen gal.", st: "الديك يصيح." } } },
        { main: "DOM", targets: ["DOM", "MOD"], data: { "DOM": { t: "حكم", s: "En dom.", st: "حكم." }, "MOD": { t: "شجاعة", s: "Ha mod.", st: "كن شجاعاً." } } },
        { main: "RÄTT", targets: ["RÄTT", "TÄT"], data: { "RÄTT": { t: "حق", s: "Ha rätt.", st: "أن تكون محقاً." }, "TÄT": { t: "كثيف", s: "Tät dimma.", st: "ضباب كثيف." } } },
        { main: "BROTT", targets: ["BROTT", "BORT", "BOTT"], data: { "BROTT": { t: "جريمة", s: "Ett brott.", st: "جريمة." }, "BORT": { t: "بعيداً", s: "Gå bort.", st: "اذهب بعيداً." }, "BOTT": { t: "سكن", s: "Har bott.", st: "سكن." } } },
        { main: "POLIS", targets: ["POLIS", "SILO", "SOL"], data: { "POLIS": { t: "شرطة", s: "Polisen.", st: "الشرطة." }, "SILO": { t: "صومعة", s: "En silo.", st: "صومعة." }, "SOL": { t: "شمس", s: "Sol.", st: "شمس." } } },
        { main: "LAGAR", targets: ["LAGAR", "LAGA", "GALA"], data: { "LAGAR": { t: "قوانين", s: "Lagar.", st: "قوانين." }, "LAGA": { t: "يصلح", s: "Laga mat.", st: "يطبخ." }, "GALA": { t: "حفل", s: "En gala.", st: "حفل." } } },
        { main: "DOMARE", targets: ["DOMARE", "DOMAR", "DAMER", "MODE"], data: { "DOMARE": { t: "قاضي", s: "En domare.", st: "قاضي." }, "DOMAR": { t: "أحكام", s: "Domar.", st: "أحكام." }, "DAMER": { t: "سيدات", s: "Damer.", st: "سيدات." }, "MODE": { t: "موضة", s: "Mode.", st: "موضة." } } },
        { main: "REGLER", targets: ["REGLER", "REGEL", "LEGER", "GER"], data: { "REGLER": { t: "قواعد", s: "Regler.", st: "قواعد." }, "REGEL": { t: "قاعدة", s: "En regel.", st: "قاعدة." }, "LEGER": { t: "سبائك", s: "Legering.", st: "سبيكة." }, "GER": { t: "يعطي", s: "Ger.", st: "يعطي." } } },
        { main: "STRAFF", targets: ["STRAFF", "STAFF", "FART", "SAFT"], data: { "STRAFF": { t: "عقاب", s: "Ett straff.", st: "عقاب." }, "STAFF": { t: "طاقم", s: "Staff.", st: "طاقم." }, "FART": { t: "سرعة", s: "Fart.", st: "سرعة." }, "SAFT": { t: "عصير", s: "Saft.", st: "عصير." } } },
        { main: "ARVET", targets: ["ARVET", "ARV", "VAR", "RET"], data: { "ARVET": { t: "الإرث", s: "Arvet.", st: "الإرث." }, "ARV": { t: "إرث", s: "Arv.", st: "إرث." }, "VAR": { t: "أين", s: "Var?", st: "أين؟" }, "RET": { t: "إغاظة", s: "Ret.", st: "إغاظة." } } }
    ],
    10: [ // Islam
        { main: "TRO", targets: ["TRO", "ROT"], data: { "TRO": { t: "إيمان", s: "Min tro.", st: "إيماني." }, "ROT": { t: "جذر", s: "En rot.", st: "جذر." } } },
        { main: "FRID", targets: ["FRID", "FRI"], data: { "FRID": { t: "سلام", s: "Frid.", st: "سلام." }, "FRI": { t: "حر", s: "Fri.", st: "حر." } } },
        { main: "FRED", targets: ["FRED", "RED"], data: { "FRED": { t: "سلام", s: "Fred.", st: "سلام." }, "RED": { t: "ركب", s: "Han red.", st: "هو ركب." } } },
        { main: "ALLAH", targets: ["ALLAH", "HALL", "ALLA"], data: { "ALLAH": { t: "الله", s: "Allah.", st: "الله." }, "HALL": { t: "قاعة", s: "En hall.", st: "قاعة." }, "ALLA": { t: "الجميع", s: "Alla.", st: "الجميع." } } },
        { main: "ISLAM", targets: ["ISLAM", "SILA", "MILA"], data: { "ISLAM": { t: "إسلام", s: "Islam.", st: "الإسلام." }, "SILA": { t: "يصفي", s: "Sila.", st: "يصفي." }, "MILA": { t: "ميل", s: "En mila.", st: "ميل (فحم)." } } },
        { main: "ZAKAT", targets: ["ZAKAT", "KATA", "AKTA"], data: { "ZAKAT": { t: "زكاة", s: "Zakat.", st: "زكاة." }, "KATA": { t: "كاتا", s: "Kata (karate).", st: "كاتا (كاراتيه)." }, "AKTA": { t: "يحذر", s: "Akta dig.", st: "احذر." } } },
        { main: "MOSKÉN", targets: ["MOSKÉN", "MOSKÉ", "SON", "SKO"], data: { "MOSKÉN": { t: "المسجد", s: "Moskén.", st: "المسجد." }, "MOSKÉ": { t: "مسجد", s: "En moské.", st: "مسجد." }, "SON": { t: "ابن", s: "En son.", st: "ابن." }, "SKO": { t: "حذاء", s: "En sko.", st: "حذاء." } } },
        { main: "KORNA", targets: ["KORNA", "KORA", "ARK", "KAN"], data: { "KORNA": { t: "الأبقار", s: "Korna betar.", st: "الأبقار ترعى." }, "KORA": { t: "يختار", s: "Kora en vinnare.", st: "اختيار فائز." }, "ARK": { t: "سفينة / ورقة", s: "Noaks ark.", st: "سفينة نوح." }, "KAN": { t: "يستطيع", s: "Jag kan.", st: "أنا أستطيع." } } },
        { main: "HELIGT", targets: ["HELIGT", "HELIG", "HELT", "LITE"], data: { "HELIGT": { t: "مقدس", s: "Heligt.", st: "مقدس." }, "HELIG": { t: "مقدس", s: "Helig.", st: "مقدس." }, "HELT": { t: "تماماً", s: "Helt.", st: "تماماً." }, "LITE": { t: "قليل", s: "Lite.", st: "قليل." } } },
        { main: "PROFET", targets: ["PROFET", "POET", "PORT", "FORT", "REP"], data: { "PROFET": { t: "نبي", s: "En profet.", st: "نبي." }, "POET": { t: "شاعر", s: "En poet.", st: "شاعر." }, "PORT": { t: "بوابة", s: "En port.", st: "بوابة." }, "FORT": { t: "بسرعة", s: "Gå fort.", st: "امشِ بسرعة." }, "REP": { t: "حبل", s: "Ett rep.", st: "حبل." } } }
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
