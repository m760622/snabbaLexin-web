
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
let WC_DICTIONARY;
eval('WC_DICTIONARY = ' + dictMatch[1]);

const PLANS = {
    8: [
        { main: "GATA", targets: ["GATA", "TAG"] },
        { main: "HAMN", targets: ["HAMN", "HAN"] },
        { main: "KÖRA", targets: ["KÖRA", "ÖKAR"] },
        { main: "KANOT", targets: ["KANOT", "NATO", "TANK"] },
        { main: "KÄRRA", targets: ["KÄRRA", "ÄRRA", "KARR"] },
        { main: "ÖSTER", targets: ["ÖSTER", "REST", "RÖST"] },
        { main: "RATTER", targets: ["RATTER", "ARTER", "RETAR", "TREAR"] },
        { main: "LASTAR", targets: ["LASTAR", "ALSTRA", "SALTA", "TALAR"] },
        { main: "SPÅREN", targets: ["SPÅREN", "PÅSEN", "RESAN", "RENSA"] },
        { main: "LASTBIL", targets: ["LASTBIL", "LISTA", "TILLS", "BILA", "LISA"] }
    ],
    9: [
        { main: "LAG", targets: ["LAG", "GAL"] },
        { main: "DOM", targets: ["DOM", "MOD"] },
        { main: "LÖGN", targets: ["LÖGN", "LÖN"] },
        { main: "DOMAR", targets: ["DOMAR", "ORMA", "RODA"] },
        { main: "LAGAR", targets: ["LAGAR", "LAGA", "GALA"] },
        { main: "SKULD", targets: ["SKULD", "GULD", "SLUT"] },
        { main: "DOMARE", targets: ["DOMARE", "DOMAR", "RADER", "RAMAR"] },
        { main: "VAKTER", targets: ["VAKTER", "VAKET", "KARTA", "RAKET"] },
        { main: "RÅNARE", targets: ["RÅNARE", "ARENA", "RENAR", "RÅNAR"] },
        { main: "ADVOKAT", targets: ["ADVOKAT", "VAKTA", "DATA", "VAKA", "KOTA"] }
    ],
    10: [
        { main: "TRO", targets: ["TRO", "ROT"] },
        { main: "BÖN", targets: ["BÖN", "ÖBO"] },
        { main: "LIV", targets: ["LIV", "VIL"] },
        { main: "ANDEN", targets: ["ANDEN", "ANDE", "DENNA"] },
        { main: "HELIG", targets: ["HELIG", "HELG", "GILLE", "IGEL"] },
        { main: "ISLAM", targets: ["ISLAM", "MILA", "SILA", "LIMA"] },
        { main: "PASTOR", targets: ["PASTOR", "ROSTA", "SPORT", "SOPAR"] },
        { main: "SYNDER", targets: ["SYNDER", "SYNER", "RYSER", "NEDRE"] },
        { main: "ANDLIG", targets: ["ANDLIG", "DINGLA", "GLIDA", "LANDA"] },
        { main: "APOSTEL", targets: ["APOSTEL", "STAPEL", "STOLPE", "ALPER", "POSTA"] }
    ]
};

const allData = {};

Object.keys(PLANS).forEach(chapter => {
    const chapterData = [];
    PLANS[chapter].forEach(level => {
        const levelObj = {
            main: level.main,
            targets: level.targets,
            data: {}
        };

        level.targets.forEach(word => {
            const entry = WC_DICTIONARY.find(e => e.w === word);
            if (entry) {
                levelObj.data[word] = {
                    t: entry.t,
                    s: entry.s,
                    st: entry.st
                };
            } else {
                // Manual data
                if (word === "TAG") levelObj.data[word] = { t: "قبضة / خذ (أمر)", s: "Ta ett tag i repet.", st: "أمسك بالحبل." };
                else if (word === "HAN") levelObj.data[word] = { t: "هو", s: "Han är min bror.", st: "هو أخي." };
                else if (word === "ÖKAR") levelObj.data[word] = { t: "يزيد", s: "Farten ökar.", st: "السرعة تزداد." };
                else if (word === "NATO") levelObj.data[word] = { t: "الناتو", s: "Sverige är med i Nato.", st: "السويد عضو في الناتو." };
                else if (word === "TANK") levelObj.data[word] = { t: "خزان", s: "Tanken är full.", st: "الخزان ممتلئ." };
                else if (word === "ÄRRA") levelObj.data[word] = { t: "يترك ندبة", s: "Såret kommer att ärra sig.", st: "الجرح سيترك ندبة." };
                else if (word === "KARR") levelObj.data[word] = { t: "مستنقع", s: "Vi gick genom ett karr.", st: "مشينا عبر مستنقع." };
                else if (word === "REST") levelObj.data[word] = { t: "بقية / سافر", s: "Han har rest jorden runt.", st: "لقد سافر حول العالم." };
                else if (word === "RÖST") levelObj.data[word] = { t: "صوت", s: "Hon har en vacker röst.", st: "لديها صوت جميل." };
                else if (word === "RATTER") levelObj.data[word] = { t: "عجلات قيادة", s: "Bilen har två ratter (övningsbil).", st: "السيارة لها عجلتا قيادة (سيارة تدريب)." };
                else if (word === "ARTER") levelObj.data[word] = { t: "أنواع", s: "Många arter av fåglar.", st: "أنواع كثيرة من الطيور." };
                else if (word === "RETAR") levelObj.data[word] = { t: "يغيظ", s: "Han retar sin syster.", st: "هو يغيظ أخته." };
                else if (word === "TREAR") levelObj.data[word] = { t: "ثلاثات", s: "Två trear i kortspel.", st: "ثلاثتان في لعبة الورق." };
                else if (word === "LASTAR") levelObj.data[word] = { t: "يحمل", s: "De lastar lastbilen.", st: "هم يحملون الشاحنة." };
                else if (word === "ALSTRA") levelObj.data[word] = { t: "يولد / ينتج", s: "Solen alstrar värme.", st: "الشمس تولد الحرارة." };
                else if (word === "SALTA") levelObj.data[word] = { t: "يمالح", s: "Salta maten.", st: "ملح الطعام." };
                else if (word === "TALAR") levelObj.data[word] = { t: "يتحدث", s: "Han talar svenska.", st: "هو يتحدث السويدية." };
                else if (word === "SPÅREN") levelObj.data[word] = { t: "الآثار", s: "Följ spåren i snön.", st: "اتبع الآثار في الثلج." };
                else if (word === "PÅSEN") levelObj.data[word] = { t: "الكيس", s: "Påsen är tung.", st: "الكيس ثقيل." };
                else if (word === "RESAN") levelObj.data[word] = { t: "الرحلة", s: "Resan var lång.", st: "الرحلة كانت طويلة." };
                else if (word === "RENSA") levelObj.data[word] = { t: "ينظف / يزيل", s: "Rensa fisken.", st: "نظف السمكة." };
                else if (word === "LISTA") levelObj.data[word] = { t: "قائمة", s: "Skriv en lista.", st: "اكتب قائمة." };
                else if (word === "TILLS") levelObj.data[word] = { t: "حتى", s: "Vänta tills jag kommer.", st: "انتظر حتى آتي." };
                else if (word === "BILA") levelObj.data[word] = { t: "يسافر بالسيارة", s: "Vi ska bila.", st: "سنسافر بالسيارة." };
                else if (word === "LISA") levelObj.data[word] = { t: "تخفيف", s: "En lisa för själen.", st: "راحة للنفس." };

                else if (word === "GAL") levelObj.data[word] = { t: "صاح", s: "Tuppen gal.", st: "صاح الديك." };
                else if (word === "MOD") levelObj.data[word] = { t: "شجاعة", s: "Stort mod.", st: "شجاعة كبيرة." };
                else if (word === "LÖN") levelObj.data[word] = { t: "راتب", s: "Min lön.", st: "راتبي." };
                else if (word === "DOMAR") levelObj.data[word] = { t: "أحكام", s: "Hårda domar.", st: "أحكام قاسية." };
                else if (word === "ORMA") levelObj.data[word] = { t: "يتلوى (كثعبان)", s: "Kön ormar sig fram.", st: "الطابور يتلوى." };
                else if (word === "RODA") levelObj.data[word] = { t: "يجذف", s: "Att roda båten.", st: "أن تجذف القارب." };
                else if (word === "LAGAR") levelObj.data[word] = { t: "قوانين", s: "Sveriges lagar.", st: "قوانين السويد." };
                else if (word === "LAGA") levelObj.data[word] = { t: "يصلح", s: "Laga bilen.", st: "أصلح السيارة." };
                else if (word === "GALA") levelObj.data[word] = { t: "حفل", s: "En fin gala.", st: "حفل جميل." };
                else if (word === "SKULD") levelObj.data[word] = { t: "دين", s: "Betala sin skuld.", st: "ادفع دينك." };
                else if (word === "GULD") levelObj.data[word] = { t: "ذهب", s: "Rent guld.", st: "ذهب خالص." };
                else if (word === "SLUT") levelObj.data[word] = { t: "نهاية", s: "Slut på filmen.", st: "نهاية الفيلم." };
                else if (word === "DOMARE") levelObj.data[word] = { t: "قاضي", s: "En rättvis domare.", st: "قاض عادل." };
                else if (word === "RADER") levelObj.data[word] = { t: "صفوف", s: "Skriv två rader.", st: "اكتب صفين." };
                else if (word === "RAMAR") levelObj.data[word] = { t: "إطارات", s: "Fina ramar.", st: "إطارات جميلة." };
                else if (word === "VAKTER") levelObj.data[word] = { t: "حراس", s: "Två vakter stod vid dörren.", st: "وقف حارسان عند الباب." };
                else if (word === "VAKET") levelObj.data[word] = { t: "مستيقظ (محايد)", s: "Ett vaket barn.", st: "طفل مستيقظ." };
                else if (word === "KARTA") levelObj.data[word] = { t: "خريطة", s: "Titta på kartan.", st: "انظر إلى الخريطة." };
                else if (word === "RAKET") levelObj.data[word] = { t: "صاروخ", s: "En snabb raket.", st: "صاروخ سريع." };
                else if (word === "RÅNARE") levelObj.data[word] = { t: "لص / سارق", s: "Polisen grep rånaren.", st: "الشرطة قبضت على السارق." };
                else if (word === "ARENA") levelObj.data[word] = { t: "حلبة / ملعب", s: "En stor arena.", st: "ملعب كبير." };
                else if (word === "RENAR") levelObj.data[word] = { t: "حيوانات الرنة", s: "Många renar i norr.", st: "الكثير من الرنة في الشمال." };
                else if (word === "RÅNAR") levelObj.data[word] = { t: "يسرق", s: "Han rånar banken.", st: "هو يسرق البنك." };
                else if (word === "ADVOKAT") levelObj.data[word] = { t: "محامي", s: "En bra advokat.", st: "محام جيد." };
                else if (word === "VAKTA") levelObj.data[word] = { t: "يحرس", s: "Vakta hunden.", st: "احرس الكلب." };
                else if (word === "DATA") levelObj.data[word] = { t: "بيانات", s: "Spara data.", st: "احفظ البيانات." };
                else if (word === "VAKA") levelObj.data[word] = { t: "يسهر", s: "Vaka hela natten.", st: "اسهر طوال الليل." };
                else if (word === "KOTA") levelObj.data[word] = { t: "فقرة (عظم)", s: "En kota i ryggen.", st: "فقرة في الظهر." };

                else if (word === "ROT") levelObj.data[word] = { t: "جذر", s: "En rot.", st: "جذر." };
                else if (word === "ÖBO") levelObj.data[word] = { t: "ساكن جزيرة", s: "Han är en öbo.", st: "هو ساكن جزيرة." };
                else if (word === "VIL") levelObj.data[word] = { t: "يريد", s: "Gör vad du vil.", st: "افعل ما تريد." };
                else if (word === "ANDEN") levelObj.data[word] = { t: "الروح", s: "Anden i flaskan.", st: "الجني في الزجاجة." };
                else if (word === "DENNA") levelObj.data[word] = { t: "هذه", s: "Denna dag.", st: "هذا اليوم." };
                else if (word === "HELIG") levelObj.data[word] = { t: "مقدس", s: "Helig mark.", st: "أرض مقدسة." };
                else if (word === "HELG") levelObj.data[word] = { t: "عطلة نهاية أسبوع", s: "Trevlig helg!", st: "عطلة سعيدة!" };
                else if (word === "GILLE") levelObj.data[word] = { t: "وليمة / نقابة", s: "Ett stort gille.", st: "وليمة كبيرة." };
                else if (word === "IGEL") levelObj.data[word] = { t: "علقة", s: "En igel i vattnet.", st: "علقة في الماء." };
                else if (word === "MILA") levelObj.data[word] = { t: "كومة فحم", s: "En mila.", st: "كومة فحم." };
                else if (word === "SILA") levelObj.data[word] = { t: "يصفي", s: "Sila.", st: "صف." };
                else if (word === "LIMA") levelObj.data[word] = { t: "ليما", s: "Staden Lima.", st: "مدينة ليما." };
                else if (word === "ROSTA") levelObj.data[word] = { t: "يحمص", s: "Rosta bröd.", st: "حمص الخبز." };
                else if (word === "SPORT") levelObj.data[word] = { t: "رياضة", s: "Sport är kul.", st: "الرياضة ممتعة." };
                else if (word === "SOPAR") levelObj.data[word] = { t: "يكنس", s: "Sopar golvet.", st: "يكنس الأرض." };
                else if (word === "SYNER") levelObj.data[word] = { t: "رؤى", s: "Syner.", st: "رؤى." };
                else if (word === "RYSER") levelObj.data[word] = { t: "يرتجف", s: "Jag ryser.", st: "أنا أرتجف." };
                else if (word === "NEDRE") levelObj.data[word] = { t: "سفلي", s: "Nedre del.", st: "الجزء السفلي." };
                else if (word === "DINGLA") levelObj.data[word] = { t: "يتدلى", s: "Dingla med benen.", st: "دلدل ساقيك." };
                else if (word === "GLIDA") levelObj.data[word] = { t: "ينزلق", s: "Glida fram.", st: "ينزلق للأمام." };
                else if (word === "LANDA") levelObj.data[word] = { t: "يهبط", s: "Landa mjukt.", st: "اهبط بنعومة." };
                else if (word === "APOSTEL") levelObj.data[word] = { t: "رسول", s: "En apostel.", st: "رسول." };
                else if (word === "STAPEL") levelObj.data[word] = { t: "كومة", s: "En stapel.", st: "كومة." };
                else if (word === "STOLPE") levelObj.data[word] = { t: "عمود", s: "En stolpe.", st: "عمود." };
                else if (word === "ALPER") levelObj.data[word] = { t: "جبال الألب", s: "Alperna.", st: "جبال الألب." };
                else if (word === "POSTA") levelObj.data[word] = { t: "يرسل", s: "Posta brev.", st: "أرسل رسالة." };

                else console.error(`Missing data for ${word}`);
            }
        });

        chapterData.push(levelObj);
    });
    allData[chapter] = chapterData;
});

console.log(JSON.stringify(allData, null, 4));
