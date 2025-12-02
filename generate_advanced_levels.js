const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

// --- DATA STRUCTURE ---
const ADVANCED_THEMES = {
    1: [ // Food
        { main: "SKÅL", targets: ["SKÅL", "KÅL"], data: { "SKÅL": { "t": "وعاء", "s": "Jag häller soppan i en skål.", "st": "أصب الحساء في وعاء." }, "KÅL": { "t": "ملفوف", "s": "Kål är en nyttig grönsak.", "st": "الملفوف خضار صحي." } } },
        { main: "FISK", targets: ["FISK", "SIK"], data: { "FISK": { "t": "سمك", "s": "Vi äter färsk fisk till middag.", "st": "نأكل سمكاً طازجاً للعشاء." }, "SIK": { "t": "سمك السيك", "s": "Sik är en populär matfisk.", "st": "السيك سمكة طعام شائعة." } } },
        { main: "GRÖT", targets: ["GRÖT", "ÖRT"], data: { "GRÖT": { "t": "عصيدة", "s": "Jag äter varm gröt till frukost.", "st": "آكل العصيدة الساخنة للفطور." }, "ÖRT": { "t": "عشبة", "s": "Timjan är en doftande ört.", "st": "الزعتر عشبة فواحة." } } },
        { main: "MJÖLK", targets: ["MJÖLK", "MJÖL", "LÖK"], data: { "MJÖLK": { "t": "حليب", "s": "Barnet dricker ett glas kall mjölk.", "st": "يشرب الطفل كوباً من الحليب البارد." }, "MJÖL": { "t": "طحين", "s": "Vi behöver mjöl för att baka bröd.", "st": "نحتاج الطحين لخبز الخبز." }, "LÖK": { "t": "بصل", "s": "Jag hackar lök till såsen.", "st": "أفرم البصل للصلصة." } } },
        { main: "TORSK", targets: ["TORSK", "OST", "KOR"], data: { "TORSK": { "t": "سمك القد", "s": "Torsk är en mycket god fisk.", "st": "القد سمكة لذيذة جداً." }, "OST": { "t": "جبن", "s": "Jag älskar ost på mackan.", "st": "أحب الجبن على الشطيرة." }, "KOR": { "t": "أبقار", "s": "Korna betar gräs på ängen.", "st": "الأبقار ترعى العشب في المرج." } } },
        { main: "BÄREN", targets: ["BÄREN", "BÄR", "BEN"], data: { "BÄREN": { "t": "التوت", "s": "Alla bären är mogna och söta.", "st": "جميع التوت ناضج وحلو." }, "BÄR": { "t": "توت", "s": "Skogen är full av blå bär.", "st": "الغابة مليئة بالتوت الأزرق." }, "BEN": { "t": "عظم / ساق", "s": "Hunden gnager på ett stort ben.", "st": "الكلب يقضم عظماً كبيراً." } } },
        { main: "SAFT", targets: ["SAFT", "FAT", "FAST", "FAS"], data: { "SAFT": { "t": "عصير", "s": "Barnen dricker kall saft i trädgården.", "st": "يشرب الأطفال العصير البارد في الحديقة." }, "FAT": { "t": "طبق", "s": "Lägg maten på ett stort fat.", "st": "ضع الطعام على طبق كبير." }, "FAST": { "t": "ثابت", "s": "Vi har en fast tid för mötet.", "st": "لدينا وقت ثابت للاجتماع." }, "FAS": { "t": "مرحلة", "s": "Detta är projektets första fas.", "st": "هذه هي المرحلة الأولى للمشروع." } } },
        { main: "ÄTER", targets: ["ÄTER", "ÄRT", "TRÄ", "TÄR"], data: { "ÄTER": { "t": "يأكل", "s": "Han äter en stor smörgås nu.", "st": "هو يأكل شطيرة كبيرة الآن." }, "ÄRT": { "t": "بازلاء", "s": "En grön ärt låg på tallriken.", "st": "كانت هناك حبة بازلاء خضراء على الطبق." }, "TRÄ": { "t": "خشب", "s": "Bordet är gjort av massivt trä.", "st": "الطاولة مصنوعة من الخشب الصلب." }, "TÄR": { "t": "يستهلك / يقطع", "s": "Oron tär på hans krafter.", "st": "القلق يستنزف قواه." } } },
        { main: "KAKOR", targets: ["KAKOR", "KAKA", "KOK"], data: { "KAKOR": { "t": "كعك", "s": "Vi bakar goda kakor till fikat.", "st": "نخبز كعكاً لذيذاً للاستراحة." }, "KAKA": { "t": "كعكة", "s": "Vill du ha en liten kaka?", "st": "هل تريد كعكة صغيرة؟" }, "KOK": { "t": "غليان", "s": "Vattnet har nått kokpunkten nu.", "st": "وصل الماء إلى نقطة الغليان الآن." } } },
        { main: "SMÖRGÅS", targets: ["SMÖRGÅS", "SMÖR", "GRÖT", "GÅS", "RÅG"], data: { "SMÖRGÅS": { "t": "شطيرة", "s": "Jag vill ha en smörgås med ost.", "st": "أريد شطيرة بالجبن." }, "SMÖR": { "t": "زبدة", "s": "Bre lite smör på brödet.", "st": "ادهن القليل من الزبدة على الخبز." }, "GRÖT": { "t": "عصيدة", "s": "Varm gröt är gott på morgonen.", "st": "العصيدة الساخنة لذيذة في الصباح." }, "GÅS": { "t": "إوزة", "s": "En vit gås simmar i dammen.", "st": "إوزة بيضاء تسبح في البركة." }, "RÅG": { "t": "جاودار", "s": "Detta bröd är bakat av råg.", "st": "هذا الخبز مخبوز من الجاودار." } } },
    ],
    2: [ // Nature
        { main: "ÅSKA", targets: ["ÅSKA", "ASK"], data: { "ÅSKA": { "t": "رعد", "s": "Vi hörde åska och såg blixtar.", "st": "سمعنا الرعد ورأينا البرق." }, "ASK": { "t": "شجرة الدردار / علبة", "s": "En liten ask tändstickor låg på bordet.", "st": "كانت هناك علبة كبريت صغيرة على الطاولة." } } },
        { main: "BERG", targets: ["BERG", "BER", "GER"], data: { "BERG": { "t": "جبل", "s": "Vi besteg ett högt berg.", "st": "تسلقنا جبلاً عالياً." }, "BER": { "t": "يطلب / يصلي", "s": "Han ber om hjälp med läxan.", "st": "يطلب المساعدة في الواجب المنزلي." }, "GER": { "t": "يعطي", "s": "Solen ger oss ljus och värme.", "st": "الشمس تعطينا الضوء والدفء." } } },
        { main: "RÖNN", targets: ["RÖNN", "ÖRN"], data: { "RÖNN": { "t": "شجرة الغبيراء", "s": "Rönnens bär är röda på hösten.", "st": "توت الغبيراء أحمر في الخريف." }, "ÖRN": { "t": "نسر", "s": "Örnen flyger högt över bergen.", "st": "النسر يطير عالياً فوق الجبال." } } },
        { main: "SVALA", targets: ["SVALA", "SVAL", "VAL"], data: { "SVALA": { "t": "سنونو", "s": "En svala gör ingen sommar, sägs det.", "st": "يقال إن سنونوة واحدة لا تصنع الصيف." }, "SVAL": { "t": "بارد / منعش", "s": "En sval vind blåser från havet.", "st": "تهب رياح منعشة من البحر." }, "VAL": { "t": "حوت / خيار", "s": "Vi såg en stor val i havet.", "st": "رأينا حوتاً كبيراً في البحر." } } },
        { main: "VIND", targets: ["VIND", "VID", "VIN", "DIN"], data: { "VIND": { "t": "ريح", "s": "En stark vind blåser i träden.", "st": "رياح قوية تعصف بالأشجار." }, "VID": { "t": "واسع / عند", "s": "Huset ligger vid en vacker sjö.", "st": "يقع المنزل عند بحيرة جميلة." }, "VIN": { "t": "نبيذ", "s": "Rött vin passar bra till kött.", "st": "النبيذ الأحمر يناسب اللحم جيداً." }, "DIN": { "t": "لك", "s": "Är detta din nya bil?", "st": "هل هذه سيارتك الجديدة؟" } } },
        { main: "MYROR", targets: ["MYROR", "MYRA", "ROM"], data: { "MYROR": { "t": "نمل", "s": "Myror är mycket starka insekter.", "st": "النمل حشرات قوية جداً." }, "MYRA": { "t": "نملة", "s": "En liten myra bär ett stort blad.", "st": "نملة صغيرة تحمل ورقة كبيرة." }, "ROM": { "t": "بطرخ / روما", "s": "Alla vägar bär till Rom.", "st": "كل الطرق تؤدي إلى روما." } } },
        { main: "HALVÖ", targets: ["HALVÖ", "HAV", "LÖV", "LAV"], data: { "HALVÖ": { "t": "شبه جزيرة", "s": "Italien är en stor halvö.", "st": "إيطاليا شبه جزيرة كبيرة." }, "HAV": { "t": "بحر", "s": "Havet är djupt och blått.", "st": "البحر عميق وأزرق." }, "LÖV": { "t": "ورقة شجر", "s": "Gula löv faller från träden.", "st": "أوراق صفراء تتساقط من الأشجار." }, "LAV": { "t": "أشنة", "s": "Lavar växer på gamla stenar.", "st": "تنمو الأشنات على الحجارة القديمة." } } },
        { main: "REGN", targets: ["REGN", "REN", "GREN", "GEN"], data: { "REGN": { "t": "مطر", "s": "Efter regn kommer solsken.", "st": "بعد المطر يأتي شروق الشمس." }, "REN": { "t": "رنة / نظيف", "s": "Luften är ren och frisk här.", "st": "الهواء نظيف ومنعش هنا." }, "GREN": { "t": "غصن", "s": "Fågeln sitter på en gren.", "st": "الطائر يجلس على غصن." }, "GEN": { "t": "جين", "s": "Gener bestämmer vår ögonfärg.", "st": "الجينات تحدد لون عيوننا." } } },
        { main: "SKOG", targets: ["SKOG", "SKO", "KO", "OS"], data: { "SKOG": { "t": "غابة", "s": "Vi går en promenad i skogen.", "st": "نذهب في نزهة في الغابة." }, "SKO": { "t": "حذاء", "s": "Jag har tappat min ena sko.", "st": "لقد فقدت فردة حذائي." }, "KO": { "t": "بقرة", "s": "En ko betar på ängen.", "st": "بقرة ترعى في المرج." }, "OS": { "t": "دخان / رائحة كريهة", "s": "Det luktar os från köket.", "st": "تفوح رائحة دخان من المطبخ." } } },
        { main: "BJÖRK", targets: ["BJÖRK", "RÖK", "BÖR", "KÖR"], data: { "BJÖRK": { "t": "شجرة البتولا", "s": "Björken har en vit stam.", "st": "شجرة البتولا لها جذع أبيض." }, "RÖK": { "t": "دخان", "s": "Ingen rök utan eld.", "st": "لا دخان بلا نار." }, "BÖR": { "t": "ينبغي", "s": "Du bör äta mer grönsaker.", "st": "ينبغي عليك أكل المزيد من الخضروات." }, "KÖR": { "t": "يقود / جوقة", "s": "Han kör bilen mycket försiktigt.", "st": "هو يقود السيارة بحذر شديد." } } },
    ],
    3: [ // Travel
        { main: "RESA", targets: ["RESA", "SER"], data: { "RESA": { "t": "سفر / رحلة", "s": "Vi ska åka på en lång resa.", "st": "سنذهب في رحلة طويلة." }, "SER": { "t": "يرى", "s": "Jag ser en båt på havet.", "st": "أرى قارباً في البحر." } } },
        { main: "BILA", targets: ["BILA", "BIL"], data: { "BILA": { "t": "يسافر بالسيارة", "s": "Vi ska bila genom hela Europa.", "st": "سنسافر بالسيارة عبر أوروبا كلها." }, "BIL": { "t": "سيارة", "s": "Min bil är parkerad utanför huset.", "st": "سيارتي متوقفة خارج المنزل." } } },
        { main: "LAND", targets: ["LAND", "DAL"], data: { "LAND": { "t": "أرض / بلد", "s": "Sverige är ett vackert land.", "st": "السويد بلد جميل." }, "DAL": { "t": "وادي", "s": "Huset ligger i en grön dal.", "st": "يقع المنزل في وادي أخضر." } } },
        { main: "KANOT", targets: ["KANOT", "TANK", "KANT"], data: { "KANOT": { "t": "زورق", "s": "Vi paddlar kanot på den lugna sjön.", "st": "نجدف بالزورق في البحيرة الهادئة." }, "TANK": { "t": "خزان", "s": "Bilen har en full tank bensin.", "st": "السيارة بها خزان وقود ممتلئ." }, "KANT": { "t": "حافة", "s": "Han stod på kanten av bryggan.", "st": "وقف على حافة الرصيف." } } },
        { main: "DRIVA", targets: ["DRIVA", "VIDA", "RIVA"], data: { "DRIVA": { "t": "ينجرف / يدير", "s": "Vinden får båten att driva iväg.", "st": "الرياح تجعل القارب ينجرف بعيداً." }, "VIDA": { "t": "واسع / عريض", "s": "De har rest över vida hav.", "st": "لقد سافروا عبر بحار واسعة." }, "RIVA": { "t": "يهدم / يمزق", "s": "De ska riva det gamla huset.", "st": "سيهدمون المنزل القديم." } } },
        { main: "SKOGS", targets: ["SKOGS", "SKOG", "KOGG"], data: { "SKOGS": { "t": "غابة (مضاف)", "s": "Vi gick till skogs för att plocka bär.", "st": "ذهبنا إلى الغابة لقطف التوت." }, "SKOG": { "t": "غابة", "s": "Det finns många träd i skogen.", "st": "يوجد الكثير من الأشجار في الغابة." }, "KOGG": { "t": "سفينة تجارية قديمة", "s": "En kogg är ett gammalt fartyg.", "st": "الكوج هي سفينة قديمة." } } },
        { main: "SORTER", targets: ["SORTER", "RESOR", "ORTER", "STORA"], data: { "SORTER": { "t": "أنواع / أصناف", "s": "Det finns många sorter av äpplen.", "st": "هناك العديد من أصناف التفاح." }, "RESOR": { "t": "رحلات", "s": "Mina resor har lärt mig mycket.", "st": "رحلاتي علمتني الكثير." }, "ORTER": { "t": "أماكن / مناطق", "s": "Vi besökte många olika orter.", "st": "زرنا العديد من الأماكن المختلفة." }, "STORA": { "t": "كبيرة", "s": "De stora båtarna ligger i hamnen.", "st": "القوارب الكبيرة راسية في الميناء." } } },
        { main: "SEGLAR", targets: ["SEGLAR", "REGLA", "LAGER", "ALGER"], data: { "SEGLAR": { "t": "يبحر", "s": "Båten seglar över det blå havet.", "st": "القارب يبحر عبر البحر الأزرق." }, "REGLA": { "t": "يغلق بمزلاج", "s": "Du måste regla dörren ordentligt.", "st": "يجب عليك إغلاق الباب بالمزلاج بإحكام." }, "LAGER": { "t": "مخزون / طبقة", "s": "Varan finns i vårt lager.", "st": "السلعة موجودة في مخزوننا." }, "ALGER": { "t": "طحالب", "s": "Det finns gröna alger i vattnet.", "st": "توجد طحالب خضراء في الماء." } } },
        { main: "POSTER", targets: ["POSTER", "SPORT", "ORTER", "ROPET"], data: { "POSTER": { "t": "ملصقات / بنود", "s": "Det hänger många poster på väggen.", "st": "هناك العديد من الملصقات معلقة على الجدار." }, "SPORT": { "t": "رياضة", "s": "Fotboll är en populär sport.", "st": "كرة القدم رياضة شعبية." }, "ORTER": { "t": "أماكن", "s": "Vi besökte vackra orter.", "st": "زرنا أماكن جميلة." }, "ROPET": { "t": "النداء / الصرخة", "s": "Vi hörde ropet från skogen.", "st": "سمعنا النداء من الغابة." } } },
        { main: "KAPTENS", targets: ["KAPTENS", "KAPTEN", "PAKET", "SPETA", "SKENA"], data: { "KAPTENS": { "t": "للقبطان (مضاف)", "s": "Detta är kaptens gamla hatt.", "st": "هذه قبعة القبطان القديمة." }, "KAPTEN": { "t": "قبطان", "s": "Kapten styr båten säkert.", "st": "القبطان يقود القارب بأمان." }, "PAKET": { "t": "طرد / حزمة", "s": "Jag fick ett stort paket med posten.", "st": "تلقيت طرداً كبيراً بالبريد." }, "SPETA": { "t": "شظية / عود", "s": "Hon fick en speta i fingret.", "st": "دخلت شظية في إصبعها." }, "SKENA": { "t": "سكة / قضيب", "s": "Tåget rullar på sin skena.", "st": "القطار يسير على سكته." } } }
    ],
    4: [ // Daily
        { main: "VÄGG", targets: ["VÄGG", "ÄGG"], data: { "VÄGG": { "t": "جدار", "s": "Tavlan hänger på den vita väggen.", "st": "اللوحة معلقة على الجدار الأبيض." }, "ÄGG": { "t": "بيض", "s": "Hönan lägger ett ägg varje dag.", "st": "الدجاجة تبيض بيضة كل يوم." } } },
        { main: "BORD", targets: ["BORD", "ORD"], data: { "BORD": { "t": "طاولة", "s": "Maten står färdig på bordet.", "st": "الطعام جاهز على الطاولة." }, "ORD": { "t": "كلمة", "s": "Ett enda ord kan betyda mycket.", "st": "كلمة واحدة قد تعني الكثير." } } },
        { main: "KVÄLL", targets: ["KVÄLL", "VÄL", "ÄLV"], data: { "KVÄLL": { "t": "مساء", "s": "Vi ses i kväll klockan åtta.", "st": "نلتقي هذا المساء في الساعة الثامنة." }, "VÄL": { "t": "حسناً / جيداً", "s": "Det går väl bra för dig?", "st": "الأمور تسير جيداً معك، أليس كذلك؟" }, "ÄLV": { "t": "نهر", "s": "En bred älv rinner genom staden.", "st": "نهر عريض يجري عبر المدينة." } } },
        { main: "TENTA", targets: ["TENTA", "NATT", "ETT"], data: { "TENTA": { "t": "امتحان", "s": "Jag har en svår tenta imorgon.", "st": "لدي امتحان صعب غداً." }, "NATT": { "t": "ليل", "s": "Katten jagar möss på natten.", "st": "القط يطارد الفئران في الليل." }, "ETT": { "t": "واحد", "s": "Jag har bara ett äpple kvar.", "st": "لدي تفاحة واحدة فقط متبقية." } } },
        { main: "GENOM", targets: ["GENOM", "GEM", "MEN"], data: { "GENOM": { "t": "عبر / خلال", "s": "Vi gick en promenad genom skogen.", "st": "مشينا في نزهة عبر الغابة." }, "GEM": { "t": "مشبك ورق", "s": "Håll ihop pappren med ett litet gem.", "st": "امسك الأوراق بمشبك ورق صغير." }, "MEN": { "t": "لكن", "s": "Jag vill gå ut, men det regnar.", "st": "أريد الخروج، لكنها تمطر." } } },
        { main: "TORKA", targets: ["TORKA", "TAK", "KAR"], data: { "TORKA": { "t": "يجفف / جفاف", "s": "Häng tvätten på tork i solen.", "st": "علق الغسيل ليجف في الشمس." }, "TAK": { "t": "سقف", "s": "Taket på huset behöver lagas.", "st": "سقف المنزل يحتاج إلى إصلاح." }, "KAR": { "t": "حوض", "s": "Ett stort kar fyllt med vatten.", "st": "حوض كبير مملوء بالماء." } } },
        { main: "GARDIN", targets: ["GARDIN", "GRIND", "DAG", "RINGA"], data: { "GARDIN": { "t": "ستارة", "s": "Dra för gardinen för fönstret.", "st": "أغلق الستارة أمام النافذة." }, "GRIND": { "t": "بوابة", "s": "Glöm inte att stänga grinden.", "st": "لا تنس إغلاق البوابة." }, "DAG": { "t": "يوم", "s": "Det är en vacker dag idag.", "st": "إنه يوم جميل اليوم." }, "RINGA": { "t": "يتصل", "s": "Jag ska ringa dig senare ikväll.", "st": "سأتصل بك لاحقاً هذا المساء." } } },
        { main: "ALTAN", targets: ["ALTAN", "GATA", "TALANG", "ANA"], data: { "ALTAN": { "t": "شرفة", "s": "Vi dricker kaffe på altanen.", "st": "نشرب القهوة في الشرفة." }, "GATA": { "t": "شارع", "s": "Barnen leker på en lugn gata.", "st": "الأطفال يلعبون في شارع هادئ." }, "TALANG": { "t": "موهبة", "s": "Hon har en stor musikalisk talang.", "st": "لديها موهبة موسيقية كبيرة." }, "ANA": { "t": "يشك / يظن", "s": "Jag anar att något är fel.", "st": "أظن أن هناك خطأ ما." } } },
        { main: "SPEGEL", targets: ["SPEGEL", "SPEL", "SE", "SEG"], data: { "SPEGEL": { "t": "مرآة", "s": "Hon tittade sig i spegeln.", "st": "نظرت إلى نفسها في المرآة." }, "SPEL": { "t": "لعبة", "s": "Detta är ett mycket roligt spel.", "st": "هذه لعبة ممتعة جداً." }, "SE": { "t": "يرى", "s": "Kan du se vad som står där?", "st": "هل يمكنك رؤية ما هو مكتوب هناك؟" }, "SEG": { "t": "قاسي / لزج", "s": "Köttet var segt och svårtuggat.", "st": "كان اللحم قاسياً وصعب المضغ." } } },
        { main: "FÖNSTER", targets: ["FÖNSTER", "FEST", "FÖR", "FÖRE", "RÖST"], data: { "FÖNSTER": { "t": "نافذة", "s": "Titta ut genom fönstret.", "st": "انظر من خلال النافذة." }, "FEST": { "t": "حفلة", "s": "Vi ska ha fest på lördag.", "st": "سنقيم حفلة يوم السبت." }, "FÖR": { "t": "لأجل / جداً", "s": "Det är alldeles för varmt här.", "st": "الجو حار جداً هنا." }, "FÖRE": { "t": "قبل", "s": "Kom gärna lite före klockan åtta.", "st": "تعال من فضلك قبل الساعة الثامنة بقليل." }, "RÖST": { "t": "صوت", "s": "Han talade med låg röst.", "st": "تحدث بصوت منخفض." } } },
    ],
    5: [ // Health
        { main: "TAND", targets: ["TAND", "DNA"], data: { "TAND": { "t": "سن", "s": "Jag har ont i en tand.", "st": "لدي ألم في سن." }, "DNA": { "t": "حمض نووي", "s": "DNA finns i alla celler.", "st": "الحمض النووي موجود في كل الخلايا." } } },
        { main: "TARM", targets: ["TARM", "ARM"], data: { "TARM": { "t": "أمعاء", "s": "Tarmen är lång.", "st": "الأمعاء طويلة." }, "ARM": { "t": "ذراع", "s": "Han bröt sin arm.", "st": "كسر ذراعه." } } },
        { main: "PULS", targets: ["PULS", "LUS"], data: { "PULS": { "t": "نبض", "s": "Känn din puls.", "st": "تحسس نبضك." }, "LUS": { "t": "قملة", "s": "En lus i håret.", "st": "قملة في الشعر." } } },
        { main: "HÄLSA", targets: ["HÄLSA", "HÄL", "HALS"], data: { "HÄLSA": { "t": "صحة", "s": "Hälsa är viktigt.", "st": "الصحة مهمة." }, "HÄL": { "t": "كعب", "s": "Jag har ont i hälen.", "st": "لدي ألم في الكعب." }, "HALS": { "t": "حلق / رقبة", "s": "Hon har ett halsband runt halsen.", "st": "لديها قلادة حول رقبتها." } } },
        { main: "MAGE", targets: ["MAGE", "MAG", "GEM"], data: { "MAGE": { "t": "معدة", "s": "Jag har ont i magen.", "st": "لدي ألم في معدتي." }, "MAG": { "t": "قدرة / معدة", "s": "Hon har en stark mag.", "st": "لديها معدة قوية." }, "GEM": { "t": "مشبك ورق", "s": "Fäst pappret med ett gem.", "st": "ثبت الورقة بمشبك." } } },
        { main: "FEBER", targets: ["FEBER", "BRE", "BER"], data: { "FEBER": { "t": "حمى", "s": "Barnet har hög feber.", "st": "الطفل لديه حمى عالية." }, "BRE": { "t": "يدهن", "s": "Bre smör på brödet.", "st": "ادهن الزبدة على الخبز." }, "BER": { "t": "يصلي / يطلب", "s": "Han ber till Gud.", "st": "هو يصلي لله." } } },
        { main: "GRAVID", targets: ["GRAVID", "GRAV", "GAV", "VAD"], data: { "GRAVID": { "t": "حامل", "s": "Hon är gravid i femte månaden.", "st": "هي حامل في الشهر الخامس." }, "GRAV": { "t": "قبر", "s": "Lägg blommor på graven.", "st": "ضع الزهور على القبر." }, "GAV": { "t": "أعطى", "s": "Han gav mig en present.", "st": "أعطاني هدية." }, "VAD": { "t": "بطة الساق / ماذا", "s": "Jag har ont i vaden.", "st": "لدي ألم في بطة الساق." } } },
        { main: "HANDLED", targets: ["HANDLED", "HAND", "ANDE", "LED"], data: { "HANDLED": { "t": "معصم", "s": "Jag stukade handleden.", "st": "لويت معصمي." }, "HAND": { "t": "يد", "s": "Tvätta händerna.", "st": "اغسل يديك." }, "ANDE": { "t": "روح", "s": "Anden i flaskan.", "st": "الجني في الزجاجة." }, "LED": { "t": "مفصل / طرييق", "s": "Jag har ont i en led.", "st": "لدي ألم في مفصل." } } },
        { main: "LEVER", targets: ["LEVER", "LEVE", "REV"], data: { "LEVER": { "t": "كبد", "s": "Levern är ett viktigt organ.", "st": "الكبد عضو مهم." }, "LEVE": { "t": "يعيش", "s": "Hon ska leva länge.", "st": "ستعيش طويلاً." }, "REV": { "t": "شقوق / صدع", "s": "Det blev en rev i kläd", "st": "حدث شق في الملابس." } } },
        { main: "SJUK", targets: ["SJUK", "SJU"], data: { "SJUK": { "t": "مريض", "s": "Han är sjuk idag.", "st": "هو مريض اليوم." }, "SJU": { "t": "سبعة", "s": "Klockan är sju.", "st": "الساعة السابعة." } } },
    ],
    6: [ // School/Work
        { main: "LÄRA", targets: ["LÄRA", "LÄR"], data: { "LÄRA": { "t": "تعلم", "s": "Att lära är att leva.", "st": "التعلم هو الحياة." }, "LÄR": { "t": "يعلم", "s": "Han lär sig svenska.", "st": "هو يتعلم السويدية." } } },
        { main: "LÄXA", targets: ["LÄXA", "LÄS", "ÄXA"], data: { "LÄXA": { "t": "واجب منزلي", "s": "Jag har mycket läxa idag.", "st": "لدي الكثير من الواجب المنزلي اليوم." }, "LÄS": { "t": "اقرأ", "s": "Läs boken noga.", "st": "اقرأ الكتاب بعناية." }, "ÄXA": { "t": "يذم / ينتقد", "s": "Ulla äxar sin rival.", "st": "أولا تنتقد منافستها." } } },
        { main: "TEST", targets: ["TEST", "SET"], data: { "TEST": { "t": "اختبار", "s": "Vi har ett test idag.", "st": "لدينا اختبار اليوم." }, "SET": { "t": "مجموعة", "s": "Ett set med verktyg.", "st": "مجموعة أدوات." } } },
        { main: "ÄMNE", targets: ["ÄMNE", "ÄMN", "MEN"], data: { "ÄMNE": { "t": "مادة دراسية / موضوع", "s": "Matematik är mitt favoritämne.", "st": "الرياضيات هي مادتي المفضلة." }, "ÄMN": { "t": "مادة", "s": "Ett farligt ämne.", "st": "مادة خطرة." }, "MEN": { "t": "لكن", "s": "Jag vill, men kan inte.", "st": "أريد، لكن لا أستطيع." } } },
        { main: "SKRIV", targets: ["SKRIV", "RIV", "VIK"], data: { "SKRIV": { "t": "اكتب", "s": "Skriv ditt namn här.", "st": "اكتب اسمك هنا." }, "RIV": { "t": "مزق", "s": "Riv inte sönder pappret.", "st": "لا تمزق الورقة." }, "VIK": { "t": "طوى", "s": "Vik pappret på mitten.", "st": "اطو الورقة من المنتصف." } } },
        { main: "BERÖM", targets: ["BERÖM", "BÖR", "MÖR"], data: { "BERÖM": { "t": "مدح", "s": "Hon fick beröm för sitt arbete.", "st": "تلقت المديح على عملها." }, "BÖR": { "t": "ينبغي", "s": "Du bör gå nu.", "st": "ينبغي عليك الذهاب الآن." }, "MÖR": { "t": "طري", "s": "Köttet är mört.", "st": "اللحم طري." } } },
        { main: "KONTOR", targets: ["KONTOR", "KORT", "TOK", "ORT"], data: { "KONTOR": { "t": "مكتب", "s": "Jag jobbar på kontor.", "st": "أعمل في مكتب." }, "KORT": { "t": "قصير / بطاقة", "s": "Ett kort möte.", "st": "اجتماع قصير." }, "TOK": { "t": "مجنون / أحمق", "s": "Han är en riktig tok.", "st": "إنه أحمق حقاً." }, "ORT": { "t": "منطقة / مكان", "s": "En liten ort på landet.", "st": "منطقة صغيرة في الريف." } } },
        { main: "BLOCK", targets: ["BLOCK", "BOK"], data: { "BLOCK": { "t": "دفتر / كتلة", "s": "Skriv i ditt block.", "st": "اكتب في دفترك." }, "BOK": { "t": "كتاب", "s": "Jag läser en bok.", "st": "أقرأ كتاباً." } } },
        { main: "STUDIE", targets: ["STUDIE", "TID", "UT", "IDÉ"], data: { "STUDIE": { "t": "دراسة", "s": "En ny studie visar detta.", "st": "تظهر دراسة جديدة هذا." }, "TID": { "t": "وقت", "s": "Vad är det för tid?", "st": "كم الوقت؟" }, "UT": { "t": "خارج", "s": "Gå ut och lek.", "st": "اخرج والعب." }, "IDÉ": { "t": "فكرة", "s": "Jag har en bra idé.", "st": "لدي فكرة جيدة." } } },
        { main: "VERKTYG", targets: ["VERKTYG", "VERK", "YRKE", "TYP", "TYG"], data: { "VERKTYG": { "t": "أداة", "s": "Hammaren är ett verktyg.", "st": "المطرقة أداة." }, "VERK": { "t": "عمل / مصنع", "s": "Ett stort verk.", "st": "عمل كبير." }, "YRKE": { "t": "مهنة", "s": "Vad har du för yrke?", "st": "ما هي مهنتك؟" }, "TYP": { "t": "نوع", "s": "Vilken typ av bil har du?", "st": "ما نوع السيارة التي لديك؟" }, "TYG": { "t": "قماش", "s": "Klänningen är sydd av fint tyg.", "st": "الفستان مخيط من قماش فاخر." } } },
    ],
    7: [ // Shopping/Clothes
        { main: "PRIS", targets: ["PRIS"], data: { "PRIS": { t: "سعر", s: "Vad är det för pris på tröjan?", st: "ما هو سعر السترة؟" } } },
        { main: "VARA", targets: ["VARA", "VAR"], data: { "VARA": { t: "سلعة / يكون", s: "Det är en bra vara.", st: "إنها سلعة جيدة." }, "VAR": { t: "أين", s: "Var är mina nycklar?", st: "أين مفاتيحي؟" } } },
        { main: "MODE", targets: ["MODE", "MED"], data: { "MODE": { t: "موضة", s: "Hon följer alltid senaste mode.", st: "هي تتبع دائماً أحدث صيحات الموضة." }, "MED": { t: "مع", s: "Kom med mig.", st: "تعال معي." } } },
        { main: "FLUGA", targets: ["FLUGA"], data: { "FLUGA": { t: "ربطة عنق / ذبابة", s: "Han hade en röd fluga på festen.", st: "كان يرتدي ربطة عنق حمراء في الحفل." } } },
        { main: "MÄRKE", targets: ["MÄRKE", "ÄRM"], data: { "MÄRKE": { t: "ماركة / علامة", s: "Det är ett känt märke.", st: "إنها ماركة معروفة." }, "ÄRM": { t: "كم", s: "Ärmen är för lång.", st: "الكم طويل جداً." } } },
        { main: "LAGER", targets: ["LAGER", "REA"], data: { "LAGER": { t: "مخزون / طبقة", s: "Varan finns i lager.", st: "السلعة متوفرة في المخزون." }, "REA": { t: "تخفيضات", s: "Jag köpte den på rea.", st: "اشتريتها في التخفيضات." } } },
        { main: "KOSTAR", targets: ["KOSTAR", "KORT", "SKOR", "STOR"], data: { "KOSTAR": { t: "يكلف", s: "Vad kostar den?", st: "كم يكلف هذا؟" }, "KORT": { t: "قصير / بطاقة", s: "Betalar du med kort?", st: "هل تدفع بالبطاقة؟" }, "SKOR": { t: "أحذية", s: "Jag behöver nya skor.", st: "أحتاج أحذية جديدة." }, "STOR": { t: "كبير", s: "Huset är mycket stort.", st: "المنزل كبير جداً." } } },
        { main: "MODERN", targets: ["MODERN", "MODE", "REN", "MEN"], data: { "MODERN": { t: "حديث", s: "Det är en modern byggnad.", st: "إنه مبنى حديث." }, "MODE": { t: "موضة", s: "Mode växlar snabbt.", st: "الموضة تتغير بسرعة." }, "REN": { t: "نظيف", s: "Håll naturen ren.", st: "حافظ على نظافة الطبيعة." }, "MEN": { t: "لكن", s: "Jag vill, men kan inte.", st: "أريد، لكن لا أستطيع." } } },
        { main: "ORANGE", targets: ["ORANGE", "REA", "REN", "NOG"], data: { "ORANGE": { t: "برتقالي", s: "Apelsinen är orange.", st: "البرتقالة برتقالية." }, "REA": { t: "تخفيضات", s: "Det är stor rea nu.", st: "هناك تخفيضات كبيرة الآن." }, "REN": { t: "نظيف", s: "Vattnet är rent.", st: "الماء نظيف." }, "NOG": { t: "ربما / كاف", s: "Det är nog sant.", st: "ربما يكون ذلك صحيحاً." } } },
        { main: "SKJORTA", targets: ["SKJORTA", "SKOR", "STOR", "KOSTAR", "KORT"], data: { "SKJORTA": { t: "قميص", s: "Han stryker sin skjorta.", st: "هو يكوي قميصه." }, "SKOR": { t: "أحذية", s: "Ta av dig dina skor.", st: "اخلع حذائك." }, "STOR": { t: "كبير", s: "En stor stark, tack.", st: "واحدة كبيرة وقوية، من فضلك (بيرة)." }, "KOSTAR": { t: "يكلف", s: "Det kostar för mycket.", st: "هذا يكلف كثيراً جداً." }, "KORT": { t: "قصير", s: "Livet är kort.", st: "الحياة قصيرة." } } }
    ],
    8: [ // Transport
        { main: "RESA", targets: ["RESA", "REA"], data: { "RESA": { t: "سفر", s: "Vi ska på en lång resa.", st: "سنذهب في رحلة طويلة." }, "REA": { t: "تخفيضات", s: "Det är stor rea i butiken.", st: "هناك تخفيضات كبيرة في المتجر." } } },
        { main: "VAGN", targets: ["VAGN", "VAN"], data: { "VAGN": { t: "عربة", s: "Tågets vagn är full.", st: "عربة القطار ممتلئة." }, "VAN": { t: "معتاد", s: "Han är van vid resor.", st: "هو معتاد على السفر." } } },
        { main: "SPÅR", targets: ["SPÅR", "SÅR"], data: { "SPÅR": { t: "قضبان / آثار", s: "Tåget stannar vid spår tre.", st: "يتوقف القطار عند القضيب الثالث." }, "SÅR": { t: "جرح", s: "Han fick ett sår på handen.", st: "أصيب بجرح في يده." } } },
        { main: "MAST", targets: ["MAST", "MAT", "SAM"], data: { "MAST": { t: "صاري", s: "Båtens mast är tio meter hög.", st: "صاري القارب يبلغ عشرة أمتار." }, "MAT": { t: "طعام", s: "Maten serveras ombord.", st: "يُقدم الطعام على متن الطائرة." }, "SAM": { t: "سوياً", s: "Vi reser sam med vänner.", st: "نسافر سوية مع الأصدقاء." } } },
        { main: "HAMN", targets: ["HAMN", "HAN", "MAN"], data: { "HAMN": { t: "ميناء", s: "Båten ligger i hamn.", st: "القارب في الميناء." }, "HAN": { t: "هو", s: "Han reser ofta utomlands.", st: "هو يسافر كثيراً للخارج." }, "MAN": { t: "شخص", s: "Man kan åka tåg därifrån.", st: "يمكن للمرء أن يأخذ القطار من هناك." } } },
        { main: "KANOT", targets: ["KANOT", "KANT", "NOT"], data: { "KANOT": { t: "زورق", s: "Vi paddlar kanot på sjön.", st: "نجدف بالزورق في البحيرة." }, "KANT": { t: "حافة", s: "Stå inte vid vägkanten.", st: "لا تقف عند حافة الطريق." }, "NOT": { t: "نوتة موسيقية", s: "Hon sjunger rätt på varje not.", st: "هي تغني كل نوتة بشكل صحيح." } } },
        { main: "MOTOR", targets: ["MOTOR", "MOT", "ORM", "TOM"], data: { "MOTOR": { t: "محرك", s: "Bilens motor låter konstigt.", st: "محرك السيارة يصدر صوتاً غريباً." }, "MOT": { t: "ضد", s: "Vi kör mot norr.", st: "نقود باتجاه الشمال." }, "ORM": { t: "ثعبان", s: "En orm korsade vägen.", st: "ثعبان عبر الطريق." }, "TOM": { t: "فارغ", s: "Tanken är nästan tom.", st: "الخزان شبه فارغ." } } },
        { main: "VÄSTER", targets: ["VÄSTER", "VÄST", "VET", "ÄRT"], data: { "VÄSTER": { t: "غرب", s: "Vi färdas mot väster.", st: "نسافر نحو الغرب." }, "VÄST": { t: "سترة", s: "Han har en vit väst på sig.", st: "يرتدي سترة بيضاء." }, "VET": { t: "يعلم", s: "Han vet vägen hem.", st: "هو يعرف الطريق إلى المنزل." }, "ÄRT": { t: "بازلاء", s: "Ärter är gröna.", st: "البازلاء خضراء." } } },
        { main: "MATROS", targets: ["MATROS", "MAT", "MAST", "MOT", "MOR"], data: { "MATROS": { t: "بحار", s: "Han jobbar som matros på färjan.", st: "يعمل كبحار على العبارة." }, "MAT": { t: "طعام", s: "God mat på flygplanet.", st: "طعام جيد على الطائرة." }, "MAST": { t: "صاري", s: "Segelbåtens mast är stark.", st: "صاري المركب الشراعي قوي." }, "MOT": { t: "نحو / ضد", s: "Båten seglar mot vinden.", st: "يبحر القارب ضد الريح." }, "MOR": { t: "أم", s: "Min mor älskar att resa.", st: "أمي تحب السفر." } } },
        { main: "ANKOMST", targets: ["ANKOMST", "NOT", "NATO", "NOTA", "AKT"], data: { "ANKOMST": { t: "وصول", s: "Ankomst klockan tio.", st: "الوصول في الساعة العاشرة." }, "NOT": { t: "نوتة", s: "Varje not i melodin.", st: "كل نوتة في اللحن." }, "NATO": { t: "الناتو", s: "NATO är en försvarsallians.", st: "الناتو تحالف دفاعي." }, "NOTA": { t: "فاتورة", s: "Kan vi få notan, tack?", st: "هل يمكننا الحصول على الفاتورة؟" }, "AKT": { t: "احترام / حذر", s: "Var akt om trafiken.", st: "احذر من حركة المرور." } } }
    ],
    9: [ // Law
        { main: "LAG", targets: ["LAG", "ALG", "GAL"], data: { "LAG": { t: "قانون", s: "Lagen är lika för alla.", st: "القانون سواسية للجميع." }, "ALG": { t: "طحالب", s: "Det växer alger i sjön.", st: "تنمو الطحالب في البحيرة." }, "GAL": { t: "يصيح", s: "Tuppen gal tidigt.", st: "صاح الديك مبكراً." } } },
        { main: "DOM", targets: ["DOM", "MOD"], data: { "DOM": { t: "حكم", s: "Domaren avkunnade en hård dom.", st: "أصدر القاضي حكماً قاسياً." }, "MOD": { t: "شجاعة", s: "Det krävs mod för att tala sanning.", st: "يتطلب الأمر شجاعة لقول الحقيقة." } } },
        { main: "RÄTT", targets: ["RÄTT", "TRÄ", "ÄTT"], data: { "RÄTT": { t: "حق", s: "Alla har rätt till rättvisa.", st: "للجميع الحق في العدالة." }, "TRÄ": { t: "خشب", s: "Ett hus av trä.", st: "منزل من الخشب." }, "ÄTT": { t: "عائلة / سلالة", s: "En gammal kunglig ätt.", st: "سلالة ملكية قديمة." } } },
        { main: "BROTT", targets: ["BROTT", "BOT", "BRO"], data: { "BROTT": { t: "جريمة", s: "Brott ska bestraffas.", st: "الجريمة يجب معاقبتها." }, "BOT": { t: "غرامة", s: "Han fick böta tusen kronor.", st: "غرّم بألف كرونة." }, "BRO": { t: "جسر", s: "En bro över floden.", st: "جسر فوق النهر." } } },
        { main: "STAT", targets: ["STAT", "SATT", "ATT"], data: { "STAT": { t: "دولة", s: "Staten ska skydda sina medborgare.", st: "يجب على الدولة حماية مواطنيها." }, "SATT": { t: "جلس", s: "Han satt ner.", st: "جلس." }, "ATT": { t: "أن", s: "Det är svårt att förstå.", st: "من الصعب أن نفهم." } } },
        { main: "LAGAR", targets: ["LAGAR", "LAG", "LAGA"], data: { "LAGAR": { t: "قوانين", s: "Vi måste följa landets lagar.", st: "يجب أن نتبع قوانين البلاد." }, "LAG": { t: "قانون", s: "En ny lag antogs.", st: "تم تبني قانون جديد." }, "LAGA": { t: "يصلح", s: "Laga det som är trasigt.", st: "أصلح ما كُسر." } } },
        { main: "MAKT", targets: ["MAKT", "MAT", "AKT", "TAM"], data: { "MAKT": { t: "سلطة / قوة", s: "Politiker har stor makt.", st: "السياسيون لديهم سلطة كبيرة." }, "MAT": { t: "طعام", s: "God mat på restaurangen.", st: "طعام جيد في المطعم." }, "AKT": { t: "وثيقة / احترام", s: "Ta akt om varningen.", st: "انتبه للتحذير." }, "TAM": { t: "أليف", s: "En tam katt.", st: "قطة أليفة." } } },
        { main: "DOMARE", targets: ["DOMARE", "DOM", "DOMAR", "ORD"], data: { "DOMARE": { t: "قاضي / حكم", s: "Domaren är opartisk.", st: "القاضي محايد." }, "DOM": { t: "حكم", s: "En rättvis dom.", st: "حكم عادل." }, "DOMAR": { t: "أحكام", s: "Domarnas beslut är slutgiltiga.", st: "قرارات القضاة نهائية." }, "ORD": { t: "كلمة", s: "Jag håller mitt ord.", st: "أحافظ على كلمتي." } } },
        { main: "STRAFF", targets: ["STRAFF", "STAFF", "FAST", "SAFT"], data: { "STRAFF": { t: "عقاب", s: "Straffet var rättvist.", st: "كانت العقوبة عادلة." }, "STAFF": { t: "طاقم", s: "En kompetent staff.", st: "طاقم مؤهل." }, "FAST": { t: "ثابت", s: "En fast regel.", st: "قاعدة ثابتة." }, "SAFT": { t: "عصير", s: "Färsk saft.", st: "عصير طازج." } } },
        { main: "ARVET", targets: ["ARVET", "ARV", "VAR", "ÄRTA"], data: { "ARVET": { t: "الإرث", s: "Arvet fördelades enligt lagen.", st: "تم توزيع الإرث حسب القانون." }, "ARV": { t: "إرث", s: "Hon fick ett stort arv.", st: "حصلت على إرث كبير." }, "VAR": { t: "أين", s: "Var är beviset?", st: "أين الدليل؟" }, "ÄRTA": { t: "يغيظ", s: "Sluta ärta honom.", st: "توقف عن إغاظته." } } }
    ],
    10: [ // Islam
        { main: "TRO", targets: ["TRO", "ROT", "ORT"], data: { "TRO": { t: "إيمان", s: "Tro kan försätta berg.", st: "الإيمان يمكنه نقل الجبال." }, "ROT": { t: "جذر", s: "Kärleken är roten till allt gott.", st: "الحب هو جذر كل خير." }, "ORT": { t: "مكان", s: "En liten ort.", st: "مكان صغير." } } },
        { main: "FRED", targets: ["FRED", "RED"], data: { "FRED": { t: "سلام", s: "Vi vill ha fred på jorden.", st: "نريد السلام على الأرض." }, "RED": { t: "ركب", s: "Han red på en häst.", st: "ركب حصاناً." } } },
        { main: "FRID", targets: ["FRID", "FRI"], data: { "FRID": { t: "سلام / راحة", s: "Vila i frid.", st: "ارقد في سلام." }, "FRI": { t: "حر", s: "Tanken är fri.", st: "الفكر حر." } } },
        { main: "ALLAH", targets: ["ALLAH", "HALL", "ALLA"], data: { "ALLAH": { t: "الله", s: "Det finns ingen gud utom Allah.", st: "لا إله إلا الله." }, "HALL": { t: "قاعة", s: "En stor hall.", st: "قاعة كبيرة." }, "ALLA": { t: "الجميع", s: "Alla människor är lika.", st: "جميع الناس سواسية." } } },
        { main: "TRON", targets: ["TRON", "TRO", "TORN", "ROT"], data: { "TRON": { t: "الإيمان", s: "Tron är stark.", st: "الإيمان قوي." }, "TRO": { t: "إيمان / يؤمن", s: "Jag tror på Gud.", st: "أنا أؤمن بالله." }, "TORN": { t: "برج", s: "Ett högt torn.", st: "برج عالٍ." }, "ROT": { t: "جذر", s: "Trädet har djupa rötter.", st: "للشجرة جذور عميقة." } } },
        { main: "BEDER", targets: ["BEDER", "BED", "BER", "RED"], data: { "BEDER": { t: "صلوات", s: "Hon gör sina beder dagligen.", st: "تؤدي صلواتها يومياً." }, "BED": { t: "صلاة", s: "Bönen är en bed till Gud.", st: "الصلاة دعاء إلى الله." }, "BER": { t: "يصلي / يطلب", s: "Han ber till Gud.", st: "يصلي لله." }, "RED": { t: "ركب", s: "Profeten red en kamel.", st: "ركب النبي جملاً." } } },
        { main: "ISLAM", targets: ["ISLAM", "SAL", "SAM", "SIL"], data: { "ISLAM": { t: "إسلام", s: "Islam betyder fred och underkastelse.", st: "الإسلام يعني السلام والاستسلام." }, "SAL": { t: "قاعة", s: "En stor sal.", st: "قاعة كبيرة." }, "SAM": { t: "سوياً", s: "Vi ber sam.", st: "نصلي سوياً." }, "SIL": { t: "مصفاة", s: "Ett sil för att sila.", st: "مصفاة للتصفية." } } },
        { main: "MOSKÉN", targets: ["MOSKÉN", "MOSKÉ", "SON", "MEN"], data: { "MOSKÉN": { t: "المسجد", s: "Vi går till moskén på fredagar.", st: "نذهب إلى المسجد أيام الجمعة." }, "MOSKÉ": { t: "مسجد", s: "En vacker moské.", st: "مسجد جميل." }, "SON": { t: "ابن", s: "Profetens son.", st: "ابن النبي." }, "MEN": { t: "لكن", s: "Jag vill, men kan inte.", st: "أريد، لكن لا أستطيع." } } },
        { main: "AMEN", targets: ["AMEN", "MAN", "MEN", "ENA"], data: { "AMEN": { t: "آمين", s: "Vi säger amen efter bönen.", st: "نقول آمين بعد الصلاة." }, "MAN": { t: "شخص", s: "Man ska vara god.", st: "يجب على المرء أن يكون صالحاً." }, "MEN": { t: "لكن", s: "Det är sant, men svårt.", st: "هذا صحيح، لكنه صعب." }, "ENA": { t: "يوحد", s: "Tron enar människor.", st: "الإيمان يوحد الناس." } } },
        { main: "PROFET", targets: ["PROFET", "TRO", "PRO", "PORT"], data: { "PROFET": { t: "نبي", s: "Muhammed är Guds sista profet.", st: "محمد هو خاتم أنبياء الله." }, "TRO": { t: "إيمان", s: "Stark tro i Gud.", st: "إيمان قوي بالله." }, "PRO": { t: "لصالح", s: "Han är pro fred.", st: "هو مؤيد للسلام." }, "PORT": { t: "بوابة", s: "Paradisets port.", st: "بوابة الجنة." } } }
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
