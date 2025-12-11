/**
 * Add examples to nouns - Batch 4 (100 nouns: Atomkraft to Bakterie)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin001669": ["Atomkraft används för att producera el.", "تُستخدم الطاقة الذرية لإنتاج الكهرباء."],
    "Lexin001670": ["Atomvapen utgör ett hot mot freden.", "تشكل الأسلحة الذرية تهديداً للسلام."],
    "Lexin001676": ["ATP-grundande inkomst beräknas årligen.", "يُحسب الدخل المؤسس للتقاعد سنوياً."],
    "Lexin001677": ["Han tjänade in ATP-poäng under hela arbetslivet.", "جمع نقاط التقاعد طوال حياته العملية."],
    "Lexin001692": ["Attachén arbetar vid ambassaden.", "يعمل الملحق في السفارة."],
    "Lexin001693": ["Han bar viktiga dokument i sin attachéväska.", "حمل وثائق مهمة في حقيبته."],
    "Lexin001702": ["All attiralj fick plats i bilen.", "اتسعت السيارة لكل الملحقات."],
    "Lexin001708": ["Mod är ett viktigt attribut hos en ledare.", "الشجاعة صفة مهمة للقائد."],
    "Lexin001709": ["'Stor' fungerar som attribut i 'den stora hunden'.", "'كبير' يعمل كنعت في 'الكلب الكبير'."],
    "Lexin001710": ["Hon jobbade som au pair i Frankrike.", "عملت كفتاة أو بير في فرنسا."],
    "Lexin001714": ["Auditoriet var fullt av studenter.", "كانت قاعة المحاضرات مليئة بالطلاب."],
    "Lexin001716": ["Augusti är ofta den varmaste månaden.", "غالباً ما يكون أغسطس أحر الشهور."],
    "Lexin001723": ["Ceremonin hölls i aulan.", "أقيم الحفل في القاعة."],
    "Lexin001731": ["Artisten skrev sin autograf åt fansen.", "وقّع الفنان توقيعه للمعجبين."],
    "Lexin001734": ["Automaten gav ut fel vara.", "أخرجت الآلة منتجاً خاطئاً."],
    "Lexin001737": ["Bilen har automatlåda.", "السيارة فيها علبة سرعات أوتوماتيكية."],
    "Lexin001754": ["Läraren använde AV-hjälpmedel i undervisningen.", "استخدم المعلم وسائل سمعية بصرية في التدريس."],
    "Lexin001759": ["Avantgardet experimenterade med nya konstformer.", "جرب الرواد أشكالاً فنية جديدة."],
    "Lexin001762": ["Avbalkningen användes som lagerrum.", "استُخدم المكان المفصول كمخزن."],
    "Lexin001765": ["Avbeställningssedeln måste skickas inom 14 dagar.", "يجب إرسال استمارة الإلغاء خلال 14 يوماً."],
    "Lexin001768": ["Han tecknande ett avbetalningskontrakt för TV:n.", "وقّع عقد شراء بالتقسيط للتلفزيون."],
    "Lexin001785": ["Avbytaren kom in i andra halvlek.", "دخل البديل في الشوط الثاني."],
    "Lexin001787": ["Han tvingades göra offentlig avbön.", "أُجبر على تقديم اعتذار علني."],
    "Lexin001806": ["Aveln av hästar har en lång tradition.", "لتربية الخيول تقليد طويل."],
    "Lexin001807": ["Vi promenerade längs den vackra avenyn.", "تمشينا عبر الطريق المشجّر الجميل."],
    "Lexin001820": ["Ta avfarten mot centrum.", "خذ المخرج نحو المركز."],
    "Lexin001827": ["Avfällingen blev utstött ur sin grupp.", "نُبذ المرتد من مجموعته."],
    "Lexin001829": ["Avfärden skedde tidigt på morgonen.", "تمت المغادرة في الصباح الباكر."],
    "Lexin001863": ["Tågets avgång är klockan 10.", "موعد انطلاق القطار الساعة 10."],
    "Lexin001864": ["Avgångsbetyget krävs för universitetet.", "تُطلب شهادة التخرج للجامعة."],
    "Lexin001876": ["Hans avhandling handlade om klimatförändringar.", "تناولت أطروحته تغير المناخ."],
    "Lexin001881": ["Avhopparen sökte asyl i väst.", "طلب المنشق اللجوء في الغرب."],
    "Lexin001888": ["Jag fick en avi om att paketet väntar.", "تلقيت إشعاراً بأن الطرد ينتظر."],
    "Lexin001898": ["De gjorde avkall på sina krav.", "تنازلوا عن مطالبهم."],
    "Lexin001904": ["Avkomlingarna bor nu i olika länder.", "تعيش الذرية الآن في بلدان مختلفة."],
    "Lexin001906": ["Paret har ingen avkomma.", "ليس للزوجين أولاد."],
    "Lexin001907": ["Hon behövde lite avkoppling efter jobbet.", "احتاجت بعض الاستجمام بعد العمل."],
    "Lexin001920": ["Avlat såldes under medeltiden.", "بيعت صكوك الغفران في العصور الوسطى."],
    "Lexin001956": ["Avlöningen betalas ut den 25:e.", "يُصرف الراتب في الخامس والعشرين."],
    "Lexin001964": ["Avnämarna var nöjda med produkten.", "كان المستلمون راضين عن المنتج."],
    "Lexin001966": ["Avokado är rik på nyttiga fetter.", "الأفوكادو غني بالدهون المفيدة."],
    "Lexin001972": ["Avresan är planerad till fredag.", "المغادرة مقررة ليوم الجمعة."],
    "Lexin001979": ["Vi stannade på en avsats för att vila.", "توقفنا على منصة للراحة."],
    "Lexin002005": ["Hon fick en avskrift av dokumentet.", "حصلت على نسخة من الوثيقة."],
    "Lexin002011": ["Avskrädet slängs på tippen.", "تُرمى القمامة في المكب."],
    "Lexin002039": ["Avspelningen av videon var perfekt.", "كان عزف الفيديو مثالياً."],
    "Lexin002042": ["Avspänning mellan länderna är nödvändig.", "الاسترخاء بين البلدين ضروري."],
    "Lexin002044": ["Avstampet var kraftfullt.", "كانت الانطلاقة قوية."],
    "Lexin002056": ["Avställningen av bilen gjordes för vintern.", "تم شطب تسجيل السيارة للشتاء."],
    "Lexin002066": ["Avsändarens namn stod på kuvertet.", "كان اسم المرسل على الظرف."],
    "Lexin002071": ["Avsättningen av chefen överraskade alla.", "فاجأت إقالة المدير الجميع."],
    "Lexin002076": ["Avtagsvägen ledde till byn.", "أدى الطريق الفرعي إلى القرية."],
    "Lexin002086": ["Avtalsförhandlingen tog flera månader.", "استمرت مفاوضات العقد عدة أشهر."],
    "Lexin002105": ["Han tryckte på avtryckaren.", "ضغط على الزناد."],
    "Lexin002111": ["Avundsjuka kan förstöra relationer.", "يمكن للحسد أن يدمر العلاقات."],
    "Lexin002120": ["Det finns en avvikelse i resultaten.", "هناك انحراف في النتائج."],
    "Lexin002128": ["Avvisningen från landet skedde snabbt.", "تم الإبعاد عن البلاد بسرعة."],
    "Lexin002130": ["Hon kom på avvägar.", "ضلّت طريقها."],
    "Lexin002142": ["Axet böjer sig tungt av säden.", "تنحني السنبلة ثقيلة بالحبوب."],
    "Lexin002144": ["Han slog sig på axeln.", "ضرب كتفه."],
    "Lexin002150": ["Ett axiom behöver inte bevisas.", "البديهية لا تحتاج إثباتاً."],
    "Lexin002155": ["Boken är ett axplock av hans dikter.", "الكتاب مختارات من قصائده."],
    "Lexin002156": ["Ayatollan är en religiös ledare.", "آية الله زعيم ديني."],
    "Lexin002157": ["Azalean blommar på våren.", "تزهر الأزالية في الربيع."],
    "Lexin002159": ["B-inkomst beskattas på annat sätt.", "الدخل الثانوي يُضرب بطريقة مختلفة."],
    "Lexin002160": ["Tyska är mitt B-språk.", "الألمانية لغتي الثانوية."],
    "Lexin002163": ["Han ringde ett Ba-samtal hem.", "أجرى مكالمة يدفعها المستقبل للمنزل."],
    "Lexin002165": ["Babord är vänster på båten.", "المَيسَرة هي يسار القارب."],
    "Lexin002166": ["Babyn sov hela natten.", "نام الرضيع طوال الليل."],
    "Lexin002167": ["Bacillen orsakade infektionen.", "سببت العُصَيّة العدوى."],
    "Lexin002169": ["Ölburkar såldes i backar.", "بيعت علب البيرة في صناديق."],
    "Lexin002170": ["Backen försvarade målet.", "دافع الظهير عن المرمى."],
    "Lexin002171": ["Lägg i backen för att backa.", "ضع الغيار الخلفي للرجوع."],
    "Lexin002178": ["Bacon steker i pannan.", "البيكون يُقلى في المقلاة."],
    "Lexin002184": ["Han glömde badbyxan hemma.", "نسي ثوب السباحة في المنزل."],
    "Lexin002187": ["Baddräkten torkade snabbt.", "جف المايوه بسرعة."],
    "Lexin002188": ["Badkaret är fullt av varmt vatten.", "حوض الاستحمام ممتلئ بماء ساخن."],
    "Lexin002191": ["Badminton är en populär idrott.", "الريشة الطائرة رياضة شائعة."],
    "Lexin002192": ["Badorten lockar turister varje sommar.", "تجذب منطقة السباحة السياح كل صيف."],
    "Lexin002195": ["Hon packade kläder i en bag.", "وضعت الملابس في كيس."],
    "Lexin002197": ["Bagaren bakar bröd varje morgon.", "يخبز الخباز الخبز كل صباح."],
    "Lexin002198": ["Betala inte för sådana bagateller.", "لا تدفع لأمور تافهة كهذه."],
    "Lexin002200": ["Bageriet säljer färskt bröd.", "يبيع المخبز خبزاً طازجاً."],
    "Lexin002201": ["Bagetten var krispig och färsk.", "كانت الباجيت مقرمشة وطازجة."],
    "Lexin002202": ["Baggen ledde flocken.", "قاد الكبش القطيع."],
    "Lexin002204": ["Bajonetten fästes på geväret.", "ثُبتت الحربة على البندقية."],
    "Lexin002205": ["Lampan har bajonettfattning.", "للمصباح قاعدة حربة."],
    "Lexin002206": ["Barnet behövde göra bajs.", "احتاج الطفل للتغوط."],
    "Lexin002209": ["Hon slog sig på baken.", "ارتطمت بمؤخرتها."],
    "Lexin002210": ["Doften av färskt bak spred sig i köket.", "انتشرت رائحة الخبز الطازج في المطبخ."],
    "Lexin002215": ["Han stoppade nyckeln i bakfickan.", "وضع المفتاح في الجيب الخلفي."],
    "Lexin002216": ["Du kom på bakfoten.", "بدأت بداية خاطئة."],
    "Lexin002224": ["Projektet hamnade i baklås.", "تعرقل المشروع."],
    "Lexin002226": ["Han fick bakläxa i matte.", "أُعيدت له واجب الرياضيات."],
    "Lexin002231": ["Kakorna gräddaskes på bakplåten.", "تُخبز الكعكات على صاج الخبز."],
    "Lexin002232": ["Bakpulver får kakan att jäsa.", "يجعل البيكنج باودر الكعكة تختمر."],
    "Lexin002239": ["Han hade bakrus efter festen.", "كان مخموراً بعد الحفلة."],
    "Lexin002242": ["Baksmällan varade hela dagen.", "استمر الصداع طوال اليوم."],
    "Lexin002245": ["Han hade en baktanke med sitt förslag.", "كان لديه نية خفية من اقتراحه."],
    "Lexin002246": ["Bakterien spreds snabbt i sjukhuset.", "انتشرت البكتيريا بسرعة في المستشفى."]
};

let content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);
if (!match) { console.error('Error'); process.exit(1); }

let data = eval(match[1]);
console.log(`Loaded ${data.length} entries`);

let updated = 0;
for (let i = 0; i < data.length; i++) {
    if (examples[data[i][0]]) {
        data[i][7] = examples[data[i][0]][0];
        data[i][8] = examples[data[i][0]][1];
        updated++;
    }
}

console.log(`\n📊 Updated ${updated} entries\n`);

const backupPath = DATA_FILE + '.backup_nouns4_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns.`);
