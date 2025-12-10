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

const COL_SWE = 2;
const COL_EX = 6;
const COL_EX_ARB = 7;

const updates = {
    "Bitvis": { swe: "Vägen var bitvis hal och svårkörd.", arb: "كان الطريق زلقاً وصعب القيادة في بعض أجزائه." },
    "Alarmerande": { swe: "Rapporten visar på en alarmerande ökning av utsläpp.", arb: "يظهر التقرير زيادة مقلقة في الانبعاثات." },
    "Allehanda": { swe: "Butiken säljer allehanda prylar och verktyg.", arb: "المتجر يبيع جميع أنواع الأدوات والأغراض." },
    "Allena": { swe: "Människan lever icke av bröd allena.", arb: "ليس بالخبز وحده يحيا الإنسان." },
    "Allenarådande": { swe: "Hon är allenarådande i företaget.", arb: "هي الحاكم المطلق (صاحبة القرار الوحيد) في الشركة." },
    "Allsköns": { swe: "Han samlar på allsköns bråte.", arb: "يجمع شتى أنواع الخردة." },
    "Angränsande": { swe: "Vi besökte även de angränsande länderna.", arb: "قمنا بزيارة الدول المجاورة أيضاً." },
    "Annalkande": { swe: "De sökte skydd för det annalkande ovädret.", arb: "بحثوا عن مأوى من العاصفة القادمة." },
    "Annorlunda": { swe: "Hon har en annorlunda klädstil som sticker ut.", arb: "لديها أسلوب ملابس مختلف يبرز عن الآخرين." },
    "Avgörande": { swe: "Målet blev avgörande för matchens utgång.", arb: "كان الهدف حاسماً لنتيجة المباراة." },
    "Avskräckande": { swe: "Straffet ska ha en avskräckande effekt.", arb: "يجب أن يكون للعقاب تأثير رادع." },
    "Avväpnande": { swe: "Han log ett avväpnande leende mot henne.", arb: "ابتسم لها ابتسامة ساحرة (مجردة من السلاح)." },
    "Bakom": { swe: "Han stod bakom dörren och lyssnade.", arb: "وقف خلف الباب يستمع." },
    "Bakre": { swe: "Boken låg i den bakre delen av bilen.", arb: "كان الكتاب في الجزء الخلفي من السيارة." },
    "Banbrytande": { swe: "Forskaren gjorde en banbrytande upptäckt.", arb: "قام الباحث باكتشاف رائد." },
    "Barfota": { swe: "Barnen sprang barfota i gräset.", arb: "ركض الأطفال حفاة على العشب." },
    "Bedjande": { swe: "Hon kastade en bedjande blick på honom.", arb: "ألقت عليه نظرة توسل." },
    "Befriande": { swe: "Det var befriande att äntligen säga sanningen.", arb: "كان من المحرر أن أقول الحقيقة أخيراً." },
    "Begynnande": { swe: "Han visade tecken på begynnande demens.", arb: "أظهر علامات الخرف المبكر." },
    "Behövande": { swe: "Organisationen hjälper behövande familjer.", arb: "تساعد المنظمة العائلات المحتاجة." },
    "Beklämmande": { swe: "Det var en beklämmande tystnad i rummet.", arb: "كان هناك صمت مخيب للآمال (محرج) في الغرفة." },
    "Beläst": { swe: "Han är mycket beläst och kan citera många klassiker.", arb: "إنه مثقف جداً ويمكنه اقتباس العديد من الكلاسيكيات." },
    "Bergis": { swe: "Jag är bergis på att han kommer.", arb: "أنا متأكد تماماً من أنه سيأتي." },
    "Beroende": { swe: "Vi är beroende av vädret för utflykten.", arb: "نحن معتمدون على الطقس في الرحلة." },
    "Berått": { swe: "Brottet begicks med berått mod.", arb: "ارتكبت الجريمة مع سبق الإصرار والترصد." },
    "Beräknande": { swe: "Han är en kall och beräknande affärsman.", arb: "إنه رجل أعمال بارد ومحسوب الخطوات." },
    "Besparad": { swe: "Jag önskar att jag hade blivit besparad den detaljen.", arb: "تمنيت لو جنبتني تلك التفصيلة." },
    "Bestickande": { swe: "Resonemanget verkar bestickande vid första anblicken.", arb: "يبدو المنطق مقنعاً (مغرياً) للوهلة الأولى." },
    "Bestående": { swe: "Olyckan gav honom inga bestående men.", arb: "الحادث لم يسبب له أي إصابات دائمة." },
    "Betecknande": { swe: "Det är betecknande för honom att komma för sent.", arb: "من السمات المميزة له أن يأتي متأخراً." },
    "Betjänt": { swe: "Ingen är betjänt av att vi bråkar.", arb: "لا أحد يستفيد من شجارنا." },
    "Betryggande": { swe: "Vi har ett betryggande avstånd till kanten.", arb: "لدينا مسافة آمنة (مطمئنة) عن الحافة." },
    "Betungande": { swe: "Arbetet kändes tungt och betungande.", arb: "شعر بأن العمل شاق ومرهق." },
    "Betydande": { swe: "Hon har gjort betydande framsteg i skolan.", arb: "لقد حققت تقدماً ملحوظاً في المدرسة." },
    "Bevekande": { swe: "Han talade med bevekande stämma.", arb: "تحدث بصوت مؤثر (استعطافي)." },
    "Bevänt": { swe: "Det är inte mycket bevänt med den gamla bilen.", arb: "لا فائدة كبيرة من تلك السيارة القديمة." },
    "Bitande": { swe: "Det var en bitande kall vinterdag.", arb: "كان يوماً شتوياً قارس البرودة." },
    "Blotta": { swe: "Bara blotta tanken gör mig rädd.", arb: "مجرد التفكير في الأمر يخيفني." },
    "Bländande": { swe: "Hon log ett bländande vackert leende.", arb: "ابتسمت ابتسامة جميلة ومبهرة." },
    "Borterst": { swe: "Huset ligger borterst på gatan.", arb: "يقع المنزل في أقصى الشارع." },
    "Bortre": { swe: "Vi satt vid den bortre ändan av bordet.", arb: "جلسنا في الطرف البعيد من الطاولة." },
    "Bosnisk": { swe: "Han talar flytande bosniska och svenska.", arb: "يتحدث البوسنية والسويدية بطلاقة." }, // Adj -> noun usage in ex is ok or "bosnisk mat"
    "Braskande": { swe: "Tidningarna hade braskande rubriker om skandalen.", arb: "كانت الصحف تحمل عناوين صارخة حول الفضيحة." },
    "Brådis": { swe: "Jag kan inte prata nu, jag har brådis.", arb: "لا أستطيع التحدث الآن، أنا في عجلة من أمري." },
    "Brådskande": { swe: "Detta är ett brådskande ärende som inte kan vänta.", arb: "هذه مسألة عاجلة لا تحتمل الانتظار." },
    "Bräckt": { swe: "Vi badade i bräckt vatten.", arb: "سبحنا في مياه قليلة الملوحة (مياه مسوسة)." },
    "Brännande": { swe: "Frågan är av brännande aktualitet.", arb: "المسألة ذات أهمية (حرارة) ملحة حالياً." },
    "Bäst": { swe: "Det vore bäst om du stannade hemma.", arb: "سيكون من الأفضل لو بقيت في المنزل." },
    "Bättre": { swe: "Jag mår mycket bättre idag.", arb: "أشعر بتحسن كبير اليوم." },
    "Disträ": { swe: "Han är ofta disträ och glömmer var han lagt nycklarna.", arb: "غالباً ما يكون شارداً وينسى أين وضع المفاتيح." },
    "Diverse": { swe: "Lådan innehöll diverse småsaker.", arb: "احتوى الصندوق على أشياء صغيرة متنوعة." },
    "Dräpande": { swe: "Hon fällde en dräpande kommentar.", arb: "أطلقت تعليقاً لاذعاً (قاتلاً)." },
    "Dyrköpt": { swe: "Det var en dyrköpt erfarenhet.", arb: "كانت تجربة باهظة الثمن." },
    "Dåvarande": { swe: "Den dåvarande statsministern höll ett tal.", arb: "ألقى رئيس الوزراء آنذاك خطاباً." },
    "Efterföljande": { swe: "Vi diskuterade saken under den efterföljande middagen.", arb: "ناقشنا الأمر خلال العشاء اللاحق." },
    "Enahanda": { swe: "Arbetet vid löpande bandet kan vara enahanda.", arb: "العمل في خط الإنتاج يمكن أن يكون رتيباً." },
    "Enastående": { swe: "Utsikten från toppen var helt enastående.", arb: "كان المنظر من القمة استثنائياً تماماً." },
    "Ensamstående": { swe: "Hon är ensamstående mamma till två barn.", arb: "هي أم عازبة لطفلين." },
    "Ense": { swe: "Vi är ense om att vi måste spara pengar.", arb: "نحن متفقون على ضرورة توفير المال." },
    "Enstaka": { swe: "Endast enstaka biljetter finns kvar.", arb: "لم يتبق سوى تذاكر فردية (قليلة)." },
    "Extra": { swe: "Jag behöver en extra filt, det är kallt.", arb: "أحتاج إلى بطانية إضافية، الجو بارد." },
    "Fascinerande": { swe: "Boken var helt fascinerande från början till slut.", arb: "الكتاب كان مذهلاً تماماً من البداية إلى النهاية." },
    "Fel": { swe: "Jag slog fel nummer av misstag.", arb: "طلبت الرقم الخطأ عن طريق الخطأ." },
    "Finito": { swe: "Nu är det finito med tramset!", arb: "الآن انتهى الهراء!" },
    "Fortlöpande": { swe: "Vi gör fortlöpande kontroller av utrustningen.", arb: "نقوم بفحوصات مستمرة للمعدات." },
    "Framstående": { swe: "Han är en framstående forskare inom sitt fält.", arb: "هو باحث بارز في مجاله." },
    "Framtida": { swe: "Vi måste tänka på våra framtida behov.", arb: "يجب أن نفكر في احتياجاتنا المستقبلية." },
    "Framträdande": { swe: "Hon har en framträdande roll i filmen.", arb: "لديها دور بارز في الفيلم." },
    "Frestad": { swe: "Han blev frestad att äta kakan.", arb: "شعر بإغراء لأكل الكعكة." },
    "Fristående": { swe: "Huset har ett fristående garage.", arb: "المنزل يحتوي على مرآب مستقل." }
};

let modifiedCount = 0;

dictionaryData.forEach(entry => {
    // Matches by word strict
    const word = entry[COL_SWE] ? entry[COL_SWE].trim() : "";

    // Some entries might have case differences or spaces, verify in updates
    // The keys in `updates` match `list_all_adj_tautologies.js` exactly
    if (updates[word]) {
        console.log(`Fixing [${word}]...`);
        entry[COL_EX] = updates[word].swe;
        entry[COL_EX_ARB] = updates[word].arb;
        modifiedCount++;
    }
});

const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Fixed ${modifiedCount} Adjective Tautologies (Batch 1).`);
