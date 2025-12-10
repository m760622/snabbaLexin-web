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
    "Frånstötande": { swe: "Han hade ett frånstötande sätt som gjorde folk illa till mods.", arb: "كان لديه أسلوب منفر جعل الناس يشعرون بعدم الارتياح." },
    "Frånvarande": { swe: "Eleven var frånvarande från lektionen idag.", arb: "كان الطالب غائباً عن الدرس اليوم." },
    "Främmande": { swe: "Staden kändes främmande men spännande.", arb: "بدت المدينة غريبة لكنها مثيرة." },
    "Främre": { swe: "Vi satt på den främre raden i bussen.", arb: "جلسنا في الصف الأمامي في الحافلة." },
    "Främst": { swe: "Han är främst känd för sina kriminalromaner.", arb: "هو معروف في المقام الأول برواياته البوليسية." },
    "Fängslande": { swe: "Hon berättade en fängslande historia om sin resa.", arb: "روت قصة آسرة عن رحلتها." },
    "Föga": { swe: "Det var föga förvånande att de vann.", arb: "لم يكن من المستغرب (قليلاً ما كان مفاجئاً) أنهم فازوا." },
    "Följande": { swe: "Följande dag regnade det hela tiden.", arb: "في اليوم التالي هطل المطر طوال الوقت." },
    "Förbi": { swe: "Bussen körde förbi hållplatsen utan att stanna.", arb: "مرت الحافلة بالمحطة دون توقف." },
    "Föregående": { swe: "Se föregående kapitel för mer information.", arb: "انظر الفصل السابق لمزيد من المعلومات." },
    "Förkrossande": { swe: "Laget led en förkrossande förlust.", arb: "تكبد الفريق خسارة ساحقة." },
    "Förmer": { swe: "Han tror att han är förmer än alla andra.", arb: "يعتقد أنه أفضل (أرقى) من أي شخص آخر." },
    "Förmildrande": { swe: "Domstolen tog hänsyn till förmildrande omständigheter.", arb: "أخذت المحكمة في الاعتبار الظروف المخففة." },
    "Förspänt": { swe: "Hon har det väl förspänt ekonomiskt.", arb: "إنها في وضع مالي جيد (ميسورة الحال)." },
    "Försvinnande": { swe: "Chansen att vinna är försvinnande liten.", arb: "فرصة الفوز ضئيلة جداً (تتلاشى)." },
    "Förtjusande": { swe: "Vilken förtjusande liten trädgård!", arb: "يا لها من حديقة صغيرة ساحرة!" },
    "Förtroendeingivande": { swe: "Läkaren hade ett lugnt och förtroendeingivande sätt.", arb: "كان لدى الطبيب أسلوب هادئ ويبعث على الثقة." },
    "Förutvarande": { swe: "Den förutvarande ägaren hade renoverat köket.", arb: "كان المالك السابق قد قام بتجديد المطبخ." },
    "Förödande": { swe: "Jordbävningen fick förödande konsekvenser.", arb: "كان للزلزال عواقب مدمرة." },
    "Gammaldags": { swe: "Mormor har många gammaldags möbler.", arb: "لدى الجدة الكثير من الأثاث القديم الطراز." },
    "Genomgripande": { swe: "Företaget genomgår en genomgripande omorganisation.", arb: "تخضع الشركة لإعادة تنظيم شاملة (جذرية)." },
    "Genomgående": { swe: "Det finns ett genomgående tema i boken.", arb: "هناك موضوع سائد (مستمر) في الكتاب." },
    "Genomträngande": { swe: "Han hade en genomträngande blick.", arb: "كانت لديه نظرة ثاقبة." },
    "Givande": { swe: "Mötet var mycket givande och inspirerande.", arb: "كان الاجتماع مثمراً وملهماً للغاية." },
    "Glädjande": { swe: "Det är glädjande att så många kom.", arb: "من المفرح أن الكثيرين قد حضروا." },
    "Glänsande": { swe: "Bilen var nyputsad och glänsande ren.", arb: "كانت السيارة ملمعة ونظيفة وبراقة." },
    "Graverande": { swe: "Polisen hittade graverande bevis mot honom.", arb: "وجدت الشرطة أدلة دامغة ضده." },
    "Gripande": { swe: "Filmen var så gripande att alla grät.", arb: "كان الفيلم مؤثراً جداً لدرجة أن الجميع بكى." },
    "Grundläggande": { swe: "Demokrati är en grundläggande mänsklig rättighet.", arb: "الديمقراطية حق أساسي من حقوق الإنسان." },
    "Gängse": { swe: "Det är den gängse uppfattningen bland folk.", arb: "هذا هو الرأي السائد (الشائع) بين الناس." },
    "Halsbrytande": { swe: "De gjorde halsbrytande konster på cykeln.", arb: "قاموا بحركات بهلوانية خطيرة (كسر عنق) على الدراجة." },
    "Havande": { swe: "Hon är havande i sjunde månaden.", arb: "هي حامل في الشهر السابع." },
    "Hejdundrande": { swe: "De hade en hejdundrande fest igår.", arb: "أقاموا حفلة صاخبة (رائعة) بالأمس." },
    "Heltäckande": { swe: "Vi erbjuder en heltäckande lösning för era behov.", arb: "نقدم حلاً شاملاً لاحتياجاتكم." },
    "Hemmahörande": { swe: "Fartyget är hemmahörande i Göteborg.", arb: "السفينة مسجلة (موطنها) في غوتنبرغ." },
    "Hitre": { swe: "Vi stannade på den hitre sidan av floden.", arb: "بقينا على هذا الجانب (الأقرب) من النهر." },
    "Hjärtskärande": { swe: "Det hördes ett hjärtskärande skrik.", arb: "سُمعت صرخة تفطر القلب." },
    "Hårresande": { swe: "Det var en hårresande historia.", arb: "كانت قصة توقف شعر الرأس (مرعبة)." },
    "Häpnadsväckande": { swe: "Hennes prestation var häpnadsväckande bra.", arb: "كان أداؤها جيداً بشكل مذهل." },
    "Högtravande": { swe: "Han uttryckte sig på ett högtravande språk.", arb: "عبر عن نفسه بلغة منمقة (عالية النبرة)." },
    "Högtstående": { swe: "Vi fick besök av en högtstående tjänsteman.", arb: "تلقينا زيارة من مسؤول رفيع المستوى." },
    "Idel": { swe: "Det var idel solsken hela veckan.", arb: "كان الجو مشمساً تماماً طوال الأسبوع." },
    "Ihållande": { swe: "Regnet var ihållande hela natten.", arb: "كان المطر مستمراً طوال الليل." },
    "Illamående": { swe: "Hon vaknade och kände sig illamående.", arb: "استيقظت وشعرت بالغثيان." },
    "Illavarslande": { swe: "Mörka moln tornade upp sig på ett illavarslande sätt.", arb: "تجمعت الغيوم الداكنة بطريقة تنذر بالسوء." },
    "Imponerande": { swe: "Byggnaden är verkligen imponerande.", arb: "المبنى مثير للإعجاب حقاً." },
    "Inbringande": { swe: "Affären visade sig vara mycket inbringande.", arb: "تبين أن الصفقة مربحة للغاية." },
    "Inbördes": { swe: "Länderna har ingen inbördes konflikt.", arb: "البلدان ليس بينها صراع داخلي (متبادل)." },
    "Ingående": { swe: "Vi har gjort en ingående undersökning av problemet.", arb: "لقد أجرينا فحصاً دقيقاً (متعمقاً) للمشكلة." },
    "Inneboende": { swe: "Människor har en inneboende vilja att göra gott.", arb: "لدى البشر رغبة فطرية (كامنة) في فعل الخير." },
    "Innestående": { swe: "Han hade mycket pengar innestående på banken.", arb: "كان لديه الكثير من المال المودع في البنك." },
    "Innevarande": { swe: "Projektet ska vara klart under innevarande år.", arb: "يجب أن يكتمل المشروع خلال العام الجاري." },
    "Inre": { swe: "Hon kände ett inre lugn.", arb: "شعرت بسلام داخلي." },
    "Invärtes": { swe: "Medicinen är endast för invärtes bruk.", arb: "الدواء للاستخدام الداخلي فقط." },
    "Jordnära": { swe: "Han är en jordnära och praktisk person.", arb: "إنه شخص واقعي وعملي." },
    "Jourhavande": { swe: "Kontakta jourhavande läkare vid akut sjukdom.", arb: "اتصل بالطبيب المناوب في حالة المرض الشديد." },
    "Kringflackande": { swe: "Han lever ett kringflackande liv som musiker.", arb: "يعيش حياة الترحال كموسيقي." },
    "Kul": { swe: "Vi hade jättekul på festen.", arb: "استمتعنا كثيراً في الحفلة." },
    "Kvarvarande": { swe: "De kvarvarande gästerna hjälpte till att städa.", arb: "ساعد الضيوف المتبقون في التنظيف." },
    "Kvitt": { swe: "Nu är vi kvitt skulden.", arb: "الآن نحن متخلصون (خالصون) من الدين." },
    "Laga": { swe: "Du måste ha laga förfall för att missa provet.", arb: "يجب أن يكون لديك عذر شرعي (قانوني) لتغيب عن الامتحان." },
    "Likalydande": { swe: "De fick två likalydande brev.", arb: "تلقوا رسالتين متطابقتين في النص." },
    "Liknande": { swe: "Jag har aldrig sett något liknande.", arb: "لم أر شيئاً كهذا (مماثلاً) من قبل." },
    "Lila": { swe: "Hon hade en lila klänning på sig.", arb: "كانت ترتدي فستاناً أرجوانياً." },
    "Lockande": { swe: "Erbjudandet låter mycket lockande.", arb: "العرض يبدو مغرياً للغاية." },
    "Lovande": { swe: "Hon är en lovande ung talang.", arb: "إنها موهبة شابة واعدة." },
    "Lyckta": { swe: "Mötet hölls bakom lyckta dörrar.", arb: "عقد الاجتماع خلف أبواب مغلقة." },
    "Lysande": { swe: "Det var en lysande idé!", arb: "كانت تلك فكرة لامعة (عبقرية)!" }
};

let modifiedCount = 0;

dictionaryData.forEach(entry => {
    const word = entry[COL_SWE] ? entry[COL_SWE].trim() : "";
    if (updates[word]) {
        console.log(`Fixing [${word}]...`);
        entry[COL_EX] = updates[word].swe;
        entry[COL_EX_ARB] = updates[word].arb;
        modifiedCount++;
    }
});

const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Fixed ${modifiedCount} Adjective Tautologies (Batch 2).`);
