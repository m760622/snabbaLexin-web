/**
 * Add examples - Batch 5 (Final batch tonight - 100 more essential words)
 */

const fs = require('fs');

const examples = {
    // === QUESTION WORDS AND PHRASES ===
    "Lexin030628": { // Vad - ماذا
        exSwe: "Vad heter du?",
        exArb: "ما اسمك؟"
    },
    "Lexin030676": { // Var - أين
        exSwe: "Var bor du?",
        exArb: "أين تسكن؟"
    },
    "Lexin030629": { // Vad för - أي نوع
        exSwe: "Vad för mat gillar du?",
        exArb: "أي نوع من الطعام تحب؟"
    },
    "Lexin018280": { // När - متى
        exSwe: "När börjar filmen?",
        exArb: "متى يبدأ الفيلم؟"
    },
    "Lexin012453": { // Hur - كيف
        exSwe: "Hur mår du idag?",
        exArb: "كيف حالك اليوم؟"
    },
    "Lexin030618": { // Varför - لماذا
        exSwe: "Varför kom du sent?",
        exArb: "لماذا تأخرت؟"
    },
    "Lexin031028": { // Vem - من
        exSwe: "Vem är det som ringer?",
        exArb: "من المتصل؟"
    },
    "Lexin031023": { // Vilket - أي
        exSwe: "Vilket språk pratar du hemma?",
        exArb: "أي لغة تتحدث في البيت؟"
    },
    "Lexin012454": { // Hur länge - كم من الوقت
        exSwe: "Hur länge har du bott i Sverige?",
        exArb: "منذ متى تسكن في السويد؟"
    },
    "Lexin012455": { // Hur mycket - كم (للكمية)
        exSwe: "Hur mycket kostar det?",
        exArb: "كم يكلف هذا؟"
    },
    "Lexin012456": { // Hur många - كم (للعدد)
        exSwe: "Hur många barn har du?",
        exArb: "كم طفلاً لديك؟"
    },

    // === PRONOUNS ===
    "Lexin012691": { // Jag - أنا
        exSwe: "Jag heter Ahmed och jag kommer från Syrien.",
        exArb: "اسمي أحمد وأنا من سوريا."
    },
    "Lexin005808": { // Du - أنت
        exSwe: "Vill du ha en kopp kaffe?",
        exArb: "هل تريد فنجان قهوة؟"
    },
    "Lexin011309": { // Han - هو
        exSwe: "Han arbetar som ingenjör.",
        exArb: "يعمل كمهندس."
    },
    "Lexin011774": { // Hon - هي
        exSwe: "Hon studerar medicin på universitetet.",
        exArb: "تدرس الطب في الجامعة."
    },
    "Lexin031081": { // Vi - نحن
        exSwe: "Vi bor i Malmö sedan två år.",
        exArb: "نسكن في مالمو منذ سنتين."
    },
    "Lexin018739": { // Ni - أنتم
        exSwe: "Vad vill ni beställa?",
        exArb: "ماذا تريدون أن تطلبوا؟"
    },
    "Lexin005186": { // De - هم
        exSwe: "De kommer från olika länder.",
        exArb: "يأتون من بلدان مختلفة."
    },
    "Lexin005343": { // Den - هو/هي (للأشياء)
        exSwe: "Boken är bra, den handlar om historia.",
        exArb: "الكتاب جيد، يتحدث عن التاريخ."
    },
    "Lexin005366": { // Det - هو/هي (för ett-ord)
        exSwe: "Huset är stort. Det har fem rum.",
        exArb: "البيت كبير. فيه خمس غرف."
    },

    // === COMMON EXPRESSIONS ===
    "Lexin027685": { // Tack - شكراً
        exSwe: "Tack så mycket för hjälpen!",
        exArb: "شكراً جزيلاً على المساعدة!"
    },
    "Lexin027694": { // Tack så mycket - شكراً جزيلاً
        exSwe: "Tack så mycket, du är snäll!",
        exArb: "شكراً جزيلاً، أنت لطيف!"
    },
    "Lexin030546": { // Varsågod - تفضل
        exSwe: "Varsågod, kaffet är klart.",
        exArb: "تفضل، القهوة جاهزة."
    },
    "Lexin029551": { // Ursäkta - عفواً/عذراً
        exSwe: "Ursäkta, var ligger stationen?",
        exArb: "عذراً، أين تقع المحطة؟"
    },
    "Lexin008113": { // Förlåt - آسف
        exSwe: "Förlåt att jag kom för sent.",
        exArb: "آسف لأنني تأخرت."
    },
    "Lexin012104": { // Hej - مرحباً
        exSwe: "Hej! Hur mår du?",
        exArb: "مرحباً! كيف حالك؟"
    },
    "Lexin012105": { // Hej då - وداعاً
        exSwe: "Hej då! Vi ses imorgon.",
        exArb: "وداعاً! نراك غداً."
    },
    "Lexin010362": { // God morgon - صباح الخير
        exSwe: "God morgon! Sov du gott?",
        exArb: "صباح الخير! هل نمت جيداً؟"
    },
    "Lexin010355": { // God kväll - مساء الخير
        exSwe: "God kväll! Välkommen hem.",
        exArb: "مساء الخير! أهلاً بعودتك."
    },
    "Lexin010361": { // God natt - تصبح على خير
        exSwe: "God natt, sov så gott!",
        exArb: "تصبح على خير، نم جيداً!"
    },
    "Lexin030312": { // Välkommen - أهلاً وسهلاً
        exSwe: "Välkommen till Sverige!",
        exArb: "أهلاً وسهلاً في السويد!"
    },
    "Lexin011964": { // Hur står det till - كيف الحال
        exSwe: "Hur står det till med dig?",
        exArb: "كيف الحال معك؟"
    },
    "Lexin003966": { // Bra - بخير/جيد
        exSwe: "Jag mår bra, tack!",
        exArb: "أنا بخير، شكراً!"
    },

    // === NUMBERS & COUNTING ===
    "Lexin006732": { // En/Ett - واحد
        exSwe: "Jag vill ha en kaffe och ett te.",
        exArb: "أريد قهوة واحدة وشاي واحد."
    },
    "Lexin029440": { // Två - اثنان
        exSwe: "Vi har två barn.",
        exArb: "لدينا طفلان."
    },
    "Lexin028357": { // Tre - ثلاثة
        exSwe: "Det tar tre timmar att köra dit.",
        exArb: "يستغرق الأمر ثلاث ساعات للوصول."
    },
    "Lexin008697": { // Fyra - أربعة
        exSwe: "Året har fyra årstider.",
        exArb: "السنة لها أربعة فصول."
    },
    "Lexin007559": { // Fem - خمسة
        exSwe: "Jag arbetar fem dagar i veckan.",
        exArb: "أعمل خمسة أيام في الأسبوع."
    },
    "Lexin023799": { // Sex - ستة
        exSwe: "Butiken stänger klockan sex.",
        exArb: "يغلق المتجر الساعة السادسة."
    },
    "Lexin023223": { // Sju - سبعة
        exSwe: "Veckan har sju dagar.",
        exArb: "الأسبوع سبعة أيام."
    },
    "Lexin032002": { // Åtta - ثمانية
        exSwe: "Skolan börjar klockan åtta.",
        exArb: "تبدأ المدرسة الساعة الثامنة."
    },
    "Lexin018755": { // Nio - تسعة
        exSwe: "Banken öppnar klockan nio.",
        exArb: "يفتح البنك الساعة التاسعة."
    },
    "Lexin028148": { // Tio - عشرة
        exSwe: "Det kostar tio kronor.",
        exArb: "يكلف عشر كرونات."
    },
    "Lexin011785": { // Hundra - مائة
        exSwe: "Det var hundra personer på mötet.",
        exArb: "كان هناك مائة شخص في الاجتماع."
    },
    "Lexin029431": { // Tusen - ألف
        exSwe: "Resan kostar tusen kronor.",
        exArb: "تكلف الرحلة ألف كرونة."
    },

    // === MORE COMMON ADJECTIVES ===
    "Lexin000460": { // Alla - الجميع/كل
        exSwe: "Alla barn går till skolan.",
        exArb: "جميع الأطفال يذهبون إلى المدرسة."
    },
    "Lexin018225": { // Många - كثير
        exSwe: "Det finns många svenskar i Thailand.",
        exArb: "هناك كثير من السويديين في تايلاند."
    },
    "Lexin018226": { // Mycket - كثيراً
        exSwe: "Jag gillar dig mycket.",
        exArb: "أحبك كثيراً."
    },
    "Lexin016170": { // Lite - قليل
        exSwe: "Jag pratar lite svenska.",
        exArb: "أتحدث السويدية قليلاً."
    },
    "Lexin012136": { // Hel - كامل
        exSwe: "Jag arbetade hela dagen.",
        exArb: "عملت اليوم كاملاً."
    },
    "Lexin011282": { // Halv - نصف
        exSwe: "Det tar en halv timme att gå dit.",
        exArb: "يستغرق نصف ساعة للوصول."
    },
    "Lexin008198": { // Första - أول
        exSwe: "Det är första gången jag är här.",
        exArb: "هذه أول مرة أكون فيها هنا."
    },
    "Lexin024049": { // Sista - آخر
        exSwe: "Det är sista bussen ikväll.",
        exArb: "هذه آخر حافلة الليلة."
    },
    "Lexin018295": { // Nästa - التالي
        exSwe: "Nästa buss kommer om tio minuter.",
        exArb: "الحافلة التالية بعد عشر دقائق."
    },
    "Lexin027447": { // Samma - نفس
        exSwe: "Vi bor på samma gata.",
        exArb: "نسكن في نفس الشارع."
    },
    "Lexin000737": { // Annan/Annat - آخر/غير
        exSwe: "Kan jag få en annan storlek?",
        exArb: "هل يمكنني الحصول على مقاس آخر؟"
    },
    "Lexin006224": { // Egen - خاص
        exSwe: "Jag har mitt eget rum.",
        exArb: "لدي غرفتي الخاصة."
    },

    // === EVERYDAY ACTIONS PHRASES ===
    "Lexin030148": { // Vakna - يستيقظ
        exSwe: "Jag vaknar klockan sex varje morgon.",
        exArb: "أستيقظ الساعة السادسة كل صباح."
    },
    "Lexin025698": { // Somna - ينام/يغفو
        exSwe: "Barnet somnar snabbt efter middagen.",
        exArb: "ينام الطفل سريعاً بعد العشاء."
    },
    "Lexin027103": { // Stanna - يبقى/يقف
        exSwe: "Hur länge ska du stanna i Sverige?",
        exArb: "كم ستبقى في السويد؟"
    },
    "Lexin003813": { // Bo - يسكن
        exSwe: "Jag bor i en lägenhet i Stockholm.",
        exArb: "أسكن في شقة في ستوكهولم."
    },
    "Lexin007767": { // Flytta - ينتقل
        exSwe: "Vi ska flytta till en större lägenhet.",
        exArb: "سننتقل إلى شقة أكبر."
    },
    "Lexin001268": { // Arbeta - يعمل
        exSwe: "Min pappa arbetar på en fabrik.",
        exArb: "أبي يعمل في مصنع."
    },
    "Lexin026500": { // Studera - يدرس
        exSwe: "Hon studerar ekonomi på universitetet.",
        exArb: "تدرس الاقتصاد في الجامعة."
    },
    "Lexin022239": { // Resa - يسافر
        exSwe: "Vi reser till Turkiet i sommar.",
        exArb: "سنسافر إلى تركيا في الصيف."
    },
    "Lexin002915": { // Besöka - يزور
        exSwe: "Jag besöker mina föräldrar varje helg.",
        exArb: "أزور والديّ كل عطلة نهاية أسبوع."
    },
    "Lexin007623": { // Finna - يجد
        exSwe: "Jag kan inte finna mina nycklar.",
        exArb: "لا أستطيع إيجاد مفاتيحي."
    },
    "Lexin025643": { // Söka - يبحث
        exSwe: "Han söker jobb sedan tre månader.",
        exArb: "يبحث عن عمل منذ ثلاثة أشهر."
    },
    "Lexin003055": { // Betala - يدفع
        exSwe: "Kan jag betala med kort?",
        exArb: "هل يمكنني الدفع بالبطاقة؟"
    },
    "Lexin014965": { // Köpa - يشتري
        exSwe: "Jag ska köpa mat efter jobbet.",
        exArb: "سأشتري الطعام بعد العمل."
    },
    "Lexin027463": { // Sälja - يبيع
        exSwe: "Vi ska sälja vår bil.",
        exArb: "سنبيع سيارتنا."
    },
    "Lexin003792": { // Bjuda - يدعو
        exSwe: "Jag bjuder dig på middag.",
        exArb: "أدعوك على العشاء."
    },
    "Lexin011411": { // Hända - يحدث
        exSwe: "Vad har hänt?",
        exArb: "ماذا حدث؟"
    },
    "Lexin007596": { // Finnas - يوجد
        exSwe: "Det finns en park nära mitt hus.",
        exArb: "يوجد حديقة قريبة من بيتي."
    },
    "Lexin003548": { // Bli - يصبح
        exSwe: "Jag vill bli läkare.",
        exArb: "أريد أن أصبح طبيباً."
    },
    "Lexin011036": { // Ha - يملك
        exSwe: "Har du tid att prata?",
        exArb: "هل لديك وقت للحديث؟"
    },
    "Lexin030569": { // Vara - يكون
        exSwe: "Jag vill vara med dig.",
        exArb: "أريد أن أكون معك."
    },
    "Lexin012660": { // Ja - نعم
        exSwe: "Ja, det stämmer.",
        exArb: "نعم، هذا صحيح."
    },
    "Lexin018626": { // Nej - لا
        exSwe: "Nej, tack. Jag är mätt.",
        exArb: "لا، شكراً. أنا شبعان."
    },
    "Lexin013739": { // Kanske - ربما
        exSwe: "Kanske kommer jag imorgon.",
        exArb: "ربما آتي غداً."
    },
    "Lexin000541": { // Alltid - دائماً
        exSwe: "Hon kommer alltid i tid.",
        exArb: "تأتي دائماً في الموعد."
    },
    "Lexin000429": { // Aldrig - أبداً
        exSwe: "Jag har aldrig varit i Japan.",
        exArb: "لم أذهب أبداً إلى اليابان."
    },
    "Lexin019105": { // Nu - الآن
        exSwe: "Jag måste gå nu.",
        exArb: "يجب أن أذهب الآن."
    },
    "Lexin023629": { // Snart - قريباً
        exSwe: "Filmen börjar snart.",
        exArb: "سيبدأ الفيلم قريباً."
    },
    "Lexin022098": { // Redan - بالفعل
        exSwe: "Jag har redan ätit.",
        exArb: "أكلت بالفعل."
    },
    "Lexin032078": { // Också - أيضاً
        exSwe: "Jag vill också ha glass.",
        exArb: "أريد أيضاً آيس كريم."
    },
    "Lexin002472": { // Bara - فقط
        exSwe: "Jag vill bara vila.",
        exArb: "أريد أن أستريح فقط."
    }
};

// Load and parse
const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    const parsed = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
    dictionaryData = parsed;
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

let changesCount = 0;

for (const [lexinId, example] of Object.entries(examples)) {
    for (let i = 0; i < dictionaryData.length; i++) {
        if (dictionaryData[i][0] === lexinId && !dictionaryData[i][7]) {
            dictionaryData[i][7] = example.exSwe;
            dictionaryData[i][8] = example.exArb;
            changesCount++;
            console.log(`✓ ${dictionaryData[i][2]}`);
            break;
        }
    }
}

const newDataStr = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';';
fs.writeFileSync('./data.js', newDataStr);

console.log(`\n✅ Batch 5 (Final tonight): Added ${changesCount} examples.`);
console.log(`📊 TOTAL TONIGHT: ~${269 + changesCount} examples added!`);
