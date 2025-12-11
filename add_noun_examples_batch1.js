/**
 * Add examples to nouns - Batch 1 (100 nouns)
 * Swedish example sentences with Arabic translations
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

// Examples for each noun - format: { id: [sweExample, arbExample] }
const examples = {
    "Lexin000123": ["Bokstaven A är den första i alfabetet.", "الحرف آ هو الأول في الأبجدية."],
    "Lexin000124": ["Han spelade ett A på pianot.", "عزف نغمة لا على البيانو."],
    "Lexin000126": ["Min A-inkomst redovisas på skattedeklarationen.", "يُعلَن دخل خدمتي في الإقرار الضريبي."],
    "Lexin000129": ["Arbetsgivaren betalar in A-skatt varje månad.", "يدفع صاحب العمل ضريبة الدخل كل شهر."],
    "Lexin000143": ["Abbén ledde mässan i kapellet.", "قاد الأب القداس في الكنيسة."],
    "Lexin000144": ["Abbedissan styrde klostret med klok hand.", "أدارت رئيسة الدير الدير بحكمة."],
    "Lexin000145": ["Vi fångade en stor abborre i sjön.", "اصطدنا سمكة فرخ كبيرة في البحيرة."],
    "Lexin000146": ["Barnen lär sig abc i första klass.", "يتعلم الأطفال الحروف الأبجدية في الصف الأول."],
    "Lexin000147": ["Min dotter läser i sin abc-bok varje kväll.", "تقرأ ابنتي في كتاب الحروف كل مساء."],
    "Lexin000148": ["FN arbetar för att minska spridningen av ABC-stridsmedel.", "تعمل الأمم المتحدة على الحد من انتشار أسلحة الدمار الشامل."],
    "Lexin000158": ["Varje abonnent får ett kundnummer.", "يحصل كل مشترك على رقم عميل."],
    "Lexin000163": ["Hon sökte abortrådgivning på vårdcentralen.", "طلبت استشارة حول الإجهاض في المركز الصحي."],
    "Lexin000164": ["Trollkarlen sa abrakadabra och kaninen försvann.", "قال الساحر أبراكادابرا واختفى الأرنب."],
    "Lexin000172": ["Absolutism är vanligt i vissa religiösa grupper.", "الامتناع التام عن الكحول شائع في بعض المجموعات الدينية."],
    "Lexin000173": ["Som absolutist dricker han aldrig alkohol.", "بصفته ممتنعاً عن الكحول، لا يشرب أبداً."],
    "Lexin000191": ["Abstraktion är ett viktigt begrepp inom filosofin.", "التجريد مفهوم مهم في الفلسفة."],
    "Lexin000192": ["Hans teori var en ren abstraktion utan praktisk nytta.", "كانت نظريته فكراً تجريدياً بحتاً بدون فائدة عملية."],
    "Lexin000204": ["Staten tar ut accis på alkohol och tobak.", "تفرض الدولة ضريبة على الكحول والتبغ."],
    "Lexin000206": ["Aceton används för att ta bort nagellack.", "يُستخدم الأسيتون لإزالة طلاء الأظافر."],
    "Lexin000223": ["Företaget gick i konkurs och begärde ackord.", "أفلست الشركة وطلبت تسوية الديون."],
    "Lexin000231": ["Hon arbetar alltid med stor ackuratess.", "تعمل دائماً بدقة كبيرة."],
    "Lexin000233": ["Många ungdomar lider av acne.", "يعاني كثير من المراهقين من حب الشباب."],
    "Lexin000234": ["Filmen var full av action och spänning.", "كان الفيلم مليئاً بالإثارة والتشويق."],
    "Lexin000248": ["Den svenska adeln hade stora privilegier förr.", "كان للنبلاء السويديين امتيازات كبيرة قديماً."],
    "Lexin000249": ["Han var adept hos den berömda konstnären.", "كان تلميذاً لدى الفنان الشهير."],
    "Lexin000253": ["Ett adjektiv beskriver ett substantiv.", "الصفة تصف الاسم."],
    "Lexin000255": ["Adjunkten undervisade i svenska och historia.", "درّس المعلم اللغة السويدية والتاريخ."],
    "Lexin000281": ["Adrenalin frigörs när man blir rädd.", "يُفرز الأدرينالين عند الشعور بالخوف."],
    "Lexin000284": ["Adressaten var inte hemma när paketet kom.", "لم يكن المرسل إليه في المنزل عند وصول الطرد."],
    "Lexin000286": ["Under advent tänder vi ett ljus varje söndag.", "خلال فترة المجيء نضيء شمعة كل أحد."],
    "Lexin000287": ["Ordet 'snabbt' är ett adverb.", "كلمة 'بسرعة' هي ظرف."],
    "Lexin000288": ["Adverbialet anger tid i meningen.", "يشير الظرف إلى الزمن في الجملة."],
    "Lexin000291": ["Han kontaktade en advokatbyrå för juridisk hjälp.", "تواصل مع مكتب محاماة للحصول على مساعدة قانونية."],
    "Lexin000295": ["Jag skickade ett aerogram till min familj.", "أرسلت رسالة جوية إلى عائلتي."],
    "Lexin000296": ["Efter hjärnblödningen fick hon afasi.", "أصيبت بفقدان الكلام بعد نزيف الدماغ."],
    "Lexin000300": ["Han kände stor affektion för sin gamla lärare.", "شعر بمودة كبيرة تجاه معلمه القديم."],
    "Lexin000301": ["Ringen har ett högt affektionsvärde för henne.", "للخاتم قيمة عاطفية كبيرة لديها."],
    "Lexin000316": ["Han är en framgångsrik affärsman.", "هو رجل أعمال ناجح."],
    "Lexin000322": ["Oscar Wildes aforismer är berömda.", "أقوال أوسكار وايلد المأثورة مشهورة."],
    "Lexin000323": ["Många afrikaner talar flera språk.", "يتحدث كثير من الأفارقة عدة لغات."],
    "Lexin000325": ["Afrofrisyren blev populär på 1970-talet.", "أصبحت التسريحة الأفريقية شائعة في السبعينيات."],
    "Lexin000327": ["Aga är förbjudet i Sverige sedan 1979.", "الضرب محظور في السويد منذ عام 1979."],
    "Lexin000330": ["Agenten samlade hemlig information.", "جمع العميل معلومات سرية."],
    "Lexin000331": ["Agenten förhandlade fram ett bra avtal.", "تفاوض الوكيل على اتفاق جيد."],
    "Lexin000338": ["Aggregatet genererar elektricitet till hela byggnaden.", "تولد مجموعة الآلات الكهرباء لكل المبنى."],
    "Lexin000345": ["Agnarna separeras från vetet vid tröskning.", "تُفصل القشور عن القمح عند الدرس."],
    "Lexin000348": ["Agronomen gav råd om odlingsmetoder.", "قدم المهندس الزراعي نصائح حول طرق الزراعة."],
    "Lexin000350": ["Han hade en aha-upplevelse när han förstod lösningen.", "شعر بلحظة إدراك عندما فهم الحل."],
    "Lexin000351": ["Aids sprids genom blodsmitta.", "ينتقل الإيدز عن طريق الدم."],
    "Lexin000360": ["Brist på tålamod är hans akilleshäl.", "قلة الصبر هي نقطة ضعفه."],
    "Lexin000362": ["Akrobaten gjorde fantastiska konster på trapetsen.", "قدم البهلوان حركات رائعة على الأرجوحة."],
    "Lexin000363": ["Tröjan är gjord av akryl.", "الكنزة مصنوعة من الأكريل."],
    "Lexin000366": ["Vigselakten hölls i kyrkan.", "أُقيم حفل الزفاف في الكنيسة."],
    "Lexin000368": ["Alla akter finns i arkivet.", "جميع الملفات موجودة في الأرشيف."],
    "Lexin000377": ["Företaget är ett aktiebolag.", "الشركة هي شركة مساهمة."],
    "Lexin000396": ["Hon får aktivitetsersättning på grund av sin sjukdom.", "تحصل على تعويض نشاط بسبب مرضها."],
    "Lexin000400": ["Han visade stor aktning för sina föräldrar.", "أظهر احتراماً كبيراً لوالديه."],
    "Lexin000401": ["Aktrisen spelade huvudrollen i filmen.", "لعبت الممثلة الدور الرئيسي في الفيلم."],
    "Lexin000404": ["Nyheten har stor aktualitet.", "للخبر أهمية راهنة كبيرة."],
    "Lexin000407": ["Aktören gestaltade sin roll briljant.", "جسد الممثل دوره ببراعة."],
    "Lexin000408": ["Hon behandlades med akupunktur mot ryggsmärta.", "عولجت بالإبر الصينية لآلام الظهر."],
    "Lexin000409": ["Salens akustik var utmärkt.", "كانت صوتيات القاعة ممتازة."],
    "Lexin000426": ["Han fördes till akutmottagningen efter olyckan.", "نُقل إلى قسم الطوارئ بعد الحادث."],
    "Lexin000429": ["Akvarellen föreställde en solnedgång.", "صوّرت اللوحة المائية غروب الشمس."],
    "Lexin000430": ["Fisken simmar i akvariet.", "تسبح السمكة في الحوض المائي."],
    "Lexin000433": ["Alen växer vid vattendrag.", "ينمو شجر النوس قرب المجاري المائية."],
    "Lexin000434": ["Statyn var huggen i alabaster.", "نُحت التمثال من المرمر."],
    "Lexin000435": ["Aladåben serverades som förrätt.", "قُدم الألادوب كمقبلات."],
    "Lexin000438": ["Albanen berättade om sitt hemland.", "روى الألباني عن وطنه."],
    "Lexin000441": ["Hon talar flytande albanska.", "تتحدث الألبانية بطلاقة."],
    "Lexin000442": ["Albanskan arbetade som tolk.", "عملت الألبانية كمترجمة."],
    "Lexin000443": ["Albinon har vit hud och rött hår.", "للأبرص بشرة بيضاء وشعر أحمر."],
    "Lexin000445": ["Albumet är fullt av gamla fotografier.", "الألبوم مليء بالصور القديمة."],
    "Lexin000451": ["Det svenska alfabetet har 29 bokstäver.", "تتكون الأبجدية السويدية من 29 حرفاً."],
    "Lexin000455": ["Alger växer i sjön på sommaren.", "تنمو الطحالب في البحيرة صيفاً."],
    "Lexin000456": ["Algeriern berättade om sin kultur.", "روى الجزائري عن ثقافته."],
    "Lexin000461": ["Han kände alienation från samhället.", "شعر بالاغتراب عن المجتمع."],
    "Lexin000463": ["Alikan satt på taket och kraxade.", "جلست الزاغة على السقف وصاحت."],
    "Lexin000464": ["Alkemi var föregångare till modern kemi.", "كانت الخيمياء سلفاً للكيمياء الحديثة."],
    "Lexin000466": ["Alkoholism är ett allvarligt hälsoproblem.", "إدمان الكحول مشكلة صحية خطيرة."],
    "Lexin000467": ["Alkoholisten sökte hjälp för sitt beroende.", "طلب مدمن الكحول المساعدة للتخلص من إدمانه."],
    "Lexin000470": ["Alkoholpolikliniken erbjuder gratis rådgivning.", "تقدم عيادة علاج الإدمان استشارات مجانية."],
    "Lexin000475": ["Polisen gjorde alkotest på föraren.", "أجرت الشرطة فحص كحول للسائق."],
    "Lexin000476": ["Sängen står i alkoven.", "السرير موجود في الحجرة الصغيرة."],
    "Lexin000485": ["Allén leder fram till slottet.", "يؤدي الممشى المشجر إلى القصر."],
    "Lexin000487": ["Berättelsen är en allegori för livet.", "القصة مجاز للحياة."],
    "Lexin000489": ["Tack vare allemansrätten får man plocka bär i skogen.", "بفضل حق التجول يمكن قطف التوت في الغابة."],
    "Lexin000522": ["Allmogen levde av jordbruk.", "عاش الفلاحون من الزراعة."],
    "Lexin000527": ["Allmän advokatbyrå ger gratis juridisk rådgivning.", "يقدم مكتب المحاماة العام استشارات قانونية مجانية."],
    "Lexin000532": ["Allmän försäkring ger grundtrygghet vid sjukdom.", "يوفر التأمين العام حماية أساسية عند المرض."],
    "Lexin000542": ["Han kontrollerade att han fanns med i allmän röstlängd.", "تحقق من وجوده في قائمة الناخبين."],
    "Lexin000555": ["God allmänbildning är viktig.", "المعرفة العامة الجيدة مهمة."],
    "Lexin000562": ["Citatet har blivit allmängods.", "أصبح الاقتباس شائعاً بين الناس."],
    "Lexin000588": ["Byns allmänning används för bete.", "تُستخدم أرض القرية المشاعة للرعي."],
    "Lexin000620": ["Alltiallo hjälper till med allt hemma.", "الخادم يساعد في كل شيء في المنزل."],
    "Lexin000644": ["Almen i parken är över hundra år gammal.", "شجرة الدردار في الحديقة عمرها أكثر من مئة عام."],
    "Lexin000649": ["Boken är hans senaste alster.", "الكتاب هو آخر إنتاجاته."],
    "Lexin000652": ["Hon sjunger alt i kören.", "تغني بصوت الآلتو في الجوقة."],
    "Lexin000653": ["Vi åt middag på altanen.", "تناولنا العشاء على الشرفة."],
    "Lexin000655": ["Prästen stod vid altaret.", "وقف الكاهن عند المذبح."]
};

// Load data
let content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);
if (!match) { console.error('Could not find dictionaryData'); process.exit(1); }

let data = eval(match[1]);
console.log(`Loaded ${data.length} entries from data.js`);

// Column indices
const COL_ID = 0;
const COL_SWE_EXAMPLE = 7;
const COL_ARB_EXAMPLE = 8;

// Update entries
let updated = 0;
for (let i = 0; i < data.length; i++) {
    const id = data[i][COL_ID];
    if (examples[id]) {
        data[i][COL_SWE_EXAMPLE] = examples[id][0];
        data[i][COL_ARB_EXAMPLE] = examples[id][1];
        updated++;
    }
}

console.log(`\n📊 Updated ${updated} entries with examples\n`);

if (updated === 0) {
    console.log('❌ No entries were updated');
    process.exit(1);
}

// Backup
const backupPath = DATA_FILE + '.backup_nouns1_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

// Save
fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ data.js updated!`);
console.log(`\n🎉 Done! Added examples to ${updated} nouns.`);
