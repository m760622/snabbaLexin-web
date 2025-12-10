const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
let prefix = "";
let suffix = "";

if (dataContent.includes('const dictionaryData =')) {
    prefix = "const dictionaryData = ";
    suffix = ";";
    dictionaryData = JSON.parse(dataContent.replace(prefix, '').replace(/;$/, ''));
} else {
    process.exit(1);
}

const COL_EX = 7;     // CORRECT COLUMN for Examples
const COL_EX_ARB = 8; // CORRECT COLUMN for Arabic Examples

const updates = {
    // Adverbs / Expressions
    "Ad notam": { swe: "Han tog kritiken ad notam.", arb: "أخذ النقد بعين الاعتبار." },
    "Härs och tvärs": { swe: "Bilarna körde härs och tvärs över fältet.", arb: "قادت السيارات في كل الاتجاهات (عشوائياً) عبر الحقل." },
    "I kraft": { swe: "Lagen träder i kraft vid årsskiftet.", arb: "يدخل القانون حيز التنفيذ في مطلع العام." },
    "Nota bene": { swe: "Nota bene, detta är bara ett förslag.", arb: "لاحظ جيداً، هذا مجرد اقتراح." },
    "Poste restante": { swe: "Brevet skickades som poste restante.", arb: "أُرسلت الرسالة لتبقى في مكتب البريد حتى استلامها." },
    "Kortsynt": { swe: "Det var ett kortsynt beslut av ledningen.", arb: "كان قراراً قصير النظر من الإدارة." }, // Adj but idiomatic
    "Tagen": { swe: "Hon såg tagen ut efter beskedet.", arb: "بدت متأثرة (مصدومة) بعد الخبر." },

    // Nouns/Compounds
    "Permanent uppehållstillstånd": { swe: "Han har fått permanent uppehållstillstånd i Sverige.", arb: "لقد حصل على تصريح إقامة دائمة في السويد." },
    "Rekommenderade brev": { swe: "Viktiga dokument bör skickas som rekommenderade brev.", arb: "يجب إرسال الوثائق المهمة كرسائل مسجلة." },
    "Röda korset": { swe: "Röda korset hjälper människor i krigsdrabbade områden.", arb: "يساعد الصليب الأحمر الناس في المناطق المتضررة من الحرب." },
    "Röda halvmånen": { swe: "Röda halvmånen verkar i många muslimska länder.", arb: "يعمل الهلال الأحمر في العديد من الدول الإسلامية." },
    "Personligt ombud": { swe: "Han fick hjälp av ett personligt ombud.", arb: "تلقى مساعدة من ممثل شخصي." },
    "Offentlig försvarare": { swe: "Rätten utsåg en offentlig försvarare åt den misstänkte.", arb: "عينت المحكمة محامياً عاماً (دفاعاً رسمياً) للمشتبه به." },
    "Villkorlig dom": { swe: "Han dömdes till villkorlig dom och böter.", arb: "حُكم عليه بالسجن مع وقف التنفيذ وغرامة." },
    "Grov stöld": { swe: "Han åtalades för grov stöld.", arb: "اتُهم بالسرقة المشددة (الجسيمة)." },
    "Laglig rätt": { swe: "Du har laglig rätt att överklaga beslutet.", arb: "لديك حق قانوني في استئناف القرار." },
    "Gemensam vårdnad": { swe: "Föräldrarna har gemensam vårdnad om barnen.", arb: "يتمتع الوالدان بحضانة مشتركة للأطفال." },
    "Enskild vårdnad": { swe: "Hon fick enskild vårdnad om dottern.", arb: "حصلت على حضانة منفردة لابنتها." },
    "Juridisk person": { swe: "Ett aktiebolag är en juridisk person.", arb: "الشركة المساهمة هي شخصية اعتبارية (قانونية)." },
    "Fysisk person": { swe: "Lagen gäller både fysisk och juridisk person.", arb: "ينطبق القانون على كل من الأشخاص الطبيعيين والاعتباريين." },
    "Fast egendom": { swe: "Köp av fast egendom kräver skriftligt avtal.", arb: "شراء العقارات (الممتلكات الثابتة) يتطلب عقداً مكتوباً." },
    "Lös egendom": { swe: "Möbler räknas som lös egendom.", arb: "يعتبر الأثاث من ممتلكات منقولة." },
    "Tystnadsplikt": { swe: "Läkare har tystnadsplikt om sina patienter.", arb: "الأطباء ملزمون بواجب السرية (كتمان السر) تجاه مرضاهم." },
    "Allmänna arvsfonden": { swe: "Pengarna tillföll Allmänna arvsfonden.", arb: "ذهبت الأموال إلى صندوق الميراث العام." },
    "Allmän pension": { swe: "Alla har rätt till allmän pension.", arb: "للجميع الحق في المعاش التقاعدي العام." },
    "Garantipension": { swe: "För de med låg inkomst finns garantipension.", arb: "يوجد معاش ضمان (تكميلي) لذوي الدخل المنخفض." },
    "Inkomstpension": { swe: "Inkomstpensionen baseras på din livsarbetsinkomst.", arb: "يستند معاش الدخل إلى دخل العمل طوال حياتك." },
    "Premiepension": { swe: "Du kan själv placera din premiepension.", arb: "يمكنك استثمار معاشك التقاعدي المتميز بنفسك." },
    "Tjänstepension": { swe: "Många arbetsgivare betalar in tjänstepension.", arb: "يدفع العديد من أصحاب العمل معاش التقاعد المهني." },
    "Sjukpenning": { swe: "Du kan få sjukpenning om du inte kan arbeta.", arb: "يمكنك الحصول على نقدية مرضية إذا لم تستطع العمل." },
    "Föräldrapenning": { swe: "Föräldrapenning ger dig tid med ditt barn.", arb: "تمنحك نقدية الوالدين وقتاً مع طفلك." },
    "Barnbidrag": { swe: "Barnbidraget betalas ut varje månad.", arb: "يتم دفع علاوة الأطفال كل شهر." },
    "Bostadsbidrag": { swe: "Familjen sökte bostadsbidrag hos Försäkringskassan.", arb: "تقدمت العائلة بطلب للحصول على بدل سكن من صندوق التأمين الاجتماعي." },
    "Underhållsstöd": { swe: "Försäkringskassan betalar ut underhållsstöd.", arb: "يدفع صندوق التأمين الاجتماعي دعم النفقة." },
    "Etableringsersättning": { swe: "Nyanlända kan få etableringsersättning.", arb: "يمكن للقادمين الجدد الحصول على تعويض الترسيخ." },
    "Aktivitetsstöd": { swe: "Den som deltar i program kan få aktivitetsstöd.", arb: "يمكن لمن يشارك في البرامج الحصول على دعم الأنشطة." },
    "Försörjningsstöd": { swe: "Kommunen beviljade försörjningsstöd.", arb: "وافقت البلدية على دعم المعيشة (المساعدة الاجتماعية)." },
    "A - kassa": { swe: "Det är viktigt att vara med i en a-kassa.", arb: "من المهم أن تكون عضواً في صندوق البطالة." },
    "Arbetsförmedlingen": { swe: "Hon är inskriven på Arbetsförmedlingen.", arb: "هي مسجلة في مكتب العمل." },
    "Svenska för invandrare": { swe: "Han studerar svenska för invandrare (SFI).", arb: "هو يدرس السويدية للمهاجرين (SFI)." },
    "Komvux": { swe: "Hon läser in gymnasiet på Komvux.", arb: "تستكمل دراستها الثانوية في تعليم الكبار (Komvux)." },
    "Högskola": { swe: "Han vill söka till högskola eller universitet.", arb: "يريد التقدم للكلية أو الجامعة." },
    "Yrkeshögskola": { swe: "Yrkeshögskola leder ofta direkt till jobb.", arb: "غالباً ما يؤدي التعليم المهني العالي مباشرة إلى وظيفه." },
    "Folkhögskola": { swe: "Folkhögskolan har en annan pedagogik.", arb: "تتبع الكلية الشعبية منهجاً دراسياً مختلفاً." },
    "Studiebidrag": { swe: "Alla gymnasieelever får studiebidrag.", arb: "يحصل جميع طلاب الثانوية على منحة دراسية." },
    "Studielån": { swe: "Många studenter tar studielån för att klara sig.", arb: "يأخذ العديد من الطلاب قروضاً دراسية لتدبير أمورهم." },
    "Legitimation": { swe: "Du måste visa legitimation på banken.", arb: "يجب عليك إبراز الهوية في البنك." },
    "Personnummer": { swe: "Ditt personnummer består av tio eller tolv siffror.", arb: "يتكون رقمك الشخصي من عشرة أو اثني عشر رقماً." },
    "Samordningsnummer": { swe: "Asylsökande får ofta ett samordningsnummer.", arb: "غالباً ما يحصل طالبو اللجوء على رقم تنسيقي." }
};

let modifiedCount = 0;

dictionaryData.forEach(entry => {
    const word = entry[2] ? entry[2].trim() : "";
    if (updates[word]) {
        console.log(`Fixing Expression (Batch 2) [${word}]...`);
        // Use CORRECT indices 7 and 8
        entry[COL_EX] = updates[word].swe;
        entry[COL_EX_ARB] = updates[word].arb;
        // Also ensure Forms column (Idx 6) is just the word if it was empty/tautological logic?
        // No, leave forms alone unless we know they are broken. Example column is what matters.
        modifiedCount++;
    }
});

const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Fixed ${modifiedCount} Expressions/Terms (Batch 2).`);
