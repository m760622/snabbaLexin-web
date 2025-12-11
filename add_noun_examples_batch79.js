/**
 * Add examples to nouns - Batch 79 (100 nouns: Uppslagsverk to Utsäde)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin029974": ["Läsa i ett uppslagsverk.", "يقرأ في موسوعة."],
    "Lexin029978": ["Stor uppslutning i tåget.", "انخراط كبير في المسيرة."],
    "Lexin029983": ["Kristi uppståndelse.", "نشور المسيح."],
    "Lexin029985": ["Göra en uppställning.", "يقوم بترتيب."],
    "Lexin029995": ["Få sin uppsägning.", "يتلقى قرار إقالته."],
    "Lexin029999": ["Tre månaders uppsägningstid.", "فترة إنذار ثلاثة أشهر."],
    "Lexin030001": ["Teaterns uppsättning.", "إنتاج (ترتيب) المسرح."],
    "Lexin030007": ["Sjukhusets upptagningsområde.", "منطقة خدمات المستشفى."],
    "Lexin030013": ["En farlig upptrappning.", "تصعيد خطير."],
    "Lexin030014": ["Ett lyckat uppträdande.", "عرض ناجح."],
    "Lexin030015": ["Konstigt uppträdande.", "تصرف غريب."],
    "Lexin030016": ["Ställa till med uppträde.", "يفتعل شجاراً."],
    "Lexin030025": ["Ett bryskt uppvaknande.", "استيقاظ مفاجئ."],
    "Lexin030035": ["Husets uppvärmning.", "نظام تدفئة المنزل."],
    "Lexin030037": ["Under sin uppväxt.", "خلال فترة نموه."],
    "Lexin030043": ["Hur mycket är uret?", "كم الساعة؟"],
    "Lexin030044": ["Se på uret.", "ينظر إلى الساعة."],
    "Lexin030047": ["Anrika uran.", "يُخصّب اليورانيوم."],
    "Lexin030049": ["Allt snabbare urbanisering.", "تحضر متسارع."],
    "Lexin030050": ["Svenskt urberg.", "صخر عتيق سويدي."],
    "Lexin030055": ["Lämna urin.", "يعطي عينة بول."],
    "Lexin030057": ["Tömma urinblåsan.", "يفرغ المثانة."],
    "Lexin030073": ["Ta ett urinprov.", "يأخذ عينة بول."],
    "Lexin030080": ["Få en urinvägsinfektion.", "يصاب بالتهاب المجاري البولية."],
    "Lexin030082": ["Smali urklipp.", "قصاصات صغيرة."],
    "Lexin030083": ["Gammal urkund.", "وثيقة قديمة."],
    "Lexin030090": ["Gå till en urmakare.", "يذهب لساعاتي."],
    "Lexin030091": ["Staden urmakeri.", "محل الساعات في المدينة."],
    "Lexin030094": ["Urna med aska.", "جرة رماد."],
    "Lexin030098": ["Vara i ursinne.", "يكون في حالة غضب شديد."],
    "Lexin030103": ["Vandra i urskog.", "يتجول في غابة كثيفة."],
    "Lexin030108": ["Tågets urspåring.", "خروج القطار عن المسار."],
    "Lexin030112": ["Redan i urtiden.", "منذ الأزل (ما قبل التاريخ)."],
    "Lexin030133": ["Bara ett utanverk.", "مجرد واجهة زائفة."],
    "Lexin030142": ["Söka utbildningsbidrag.", "يطلب معونة دراسية."],
    "Lexin030154": ["Vulkanens utbrott.", "ثوران البركان."],
    "Lexin030157": ["Stort utbud av varor.", "تشكيلة واسعة من البضائع."],
    "Lexin030159": ["Göra en utbyggnad.", "يقوم بتوسيع (بناء)."],
    "Lexin030170": ["Ett utdrag ur boken.", "مقتطف من الكتاب."],
    "Lexin030181": ["Det råder utegångsförbud.", "هناك منع تجول."],
    "Lexin030182": ["Gilla uteliv.", "يحب حياة السهر."],
    "Lexin030183": ["Friskt uteliv.", "حياة هواء طلق صحية."],
    "Lexin030197": ["Förbjuda utfart.", "يمنع الخروج (بالسيارة)."],
    "Lexin030204": ["Offentlig utfrågning.", "استجواب علني."],
    "Lexin030205": ["Använda som utfyllnad.", "يستخدم كتكملة."],
    "Lexin030206": ["Åka på utfärd.", "يذهب في نزهة."],
    "Lexin030209": ["Ge en utfästelse.", "يعطي وعداً."],
    "Lexin030221": ["Tidningens utgivare.", "ناشر الصحيفة."],
    "Lexin030222": ["Bokens utgivning.", "نشر الكتاب."],
    "Lexin030223": ["Känslosamma utgjutelser.", "فيض من المشاعر (هذر)."],
    "Lexin030225": ["Få en utgjutning.", "يصاب بكدمة."],
    "Lexin030226": ["Arkeologisk utgrävning.", "حفريات أثرية."],
    "Lexin030231": ["Nödutgång.", "مخرج طوارئ."],
    "Lexin030237": ["Andra utgåvan.", "الطبعة الثانية."],
    "Lexin030239": ["Gammalt uthus.", "مبنى خارجي قديم."],
    "Lexin030248": ["Ett första utkast.", "مسودة أولى."],
    "Lexin030249": ["Stoppad av utkastare.", "أوقفه حارس المدخل."],
    "Lexin030259": ["Få utlandsvård.", "يتلقى رعاية في الخارج."],
    "Lexin030260": ["Sjöns utlopp.", "مخرج البحيرة."],
    "Lexin030263": ["Öka utlåningen.", "يزيد الإعارة."],
    "Lexin030265": ["Mina utlägg för resan.", "نفقاتي للرحلة."],
    "Lexin030271": ["Kräva utlämning.", "يطلب تسليم (المجرم)."],
    "Lexin030278": ["Han är utlänning.", "هو أجنبي."],
    "Lexin030284": ["Fjällets utlöpare.", "امتداد الجبل."],
    "Lexin030289": ["Bombens utlösning.", "انفجار القنبلة."],
    "Lexin030290": ["Få utlösning.", "يحصل på قذف/هزة جماع."],
    "Lexin030296": ["Lider av utmattning.", "يعاني من الإرهاق."],
    "Lexin030303": ["Få en utmärkelse.", "يحصل على وسام."],
    "Lexin030308": ["Hot om utmätning.", "تهديد بحجز الممتلكات."],
    "Lexin030319": ["Båt med utombordsmotor.", "قارب بمحرك خارجي."],
    "Lexin030328": ["Det är en utopi.", "هذه يوتوبيا (خيال)."],
    "Lexin030331": ["Vakta vid en utpost.", "يحرس في مخفر أمامي."],
    "Lexin030347": ["Tala utrikiska.", "يتحدث لغة أجنبية."],
    "Lexin030349": ["Första utrop.", "النداء الأول (في المزاد)."],
    "Lexin030352": ["Sätta utropstecken.", "يضع علامة تعجب."],
    "Lexin030357": ["Dyr utrustning.", "تجهيزات غالية."],
    "Lexin030359": ["Brandkårens utryckning.", "خروج فرقة الإطفاء."],
    "Lexin030374": ["Husets utsida.", "واجهة المنزل."],
    "Lexin030375": ["Vacker utsikt.", "مشهد جميل."],
    "Lexin030376": ["Dåliga utsikter.", "توقعات سيئة."],
    "Lexin030378": ["Göra ett utskick.", "يرسا رسالة جماعية."],
    "Lexin030381": ["Sitta i utskottet.", "عضو في اللجنة الفرعية."],
    "Lexin030384": ["Skicka en utskrift.", "يرسل نسخة مطبوعة."],
    "Lexin030388": ["Få en utskällning.", "يتلقى توبيخاً."],
    "Lexin030389": ["Tillstånd för utskänkning.", "رخصة تقديم الخمور."],
    "Lexin030390": ["Domstolens utslag.", "حكم المحكمة."],
    "Lexin030392": ["Få utslag på huden.", "يصاب بطفح جلدي."],
    "Lexin030398": ["Hotas av utslagning.", "مهدد بالإقصاء (الهزيمة الاجتماعية)."],
    "Lexin030400": ["Ordföranden har utslagsröst.", "للرئيس صوت الترجيح."],
    "Lexin030403": ["Farliga utsläpp.", "انبعاثات (تلوث) خطيرة."],
    "Lexin030407": ["Utspisning av soppa.", "توزيع الحساء."],
    "Lexin030412": ["Hon har utstrålning.", "لديها كاريزما (شخصية قوية)."],
    "Lexin030413": ["I stor utsträckning.", "إلى حد كبير."],
    "Lexin030415": ["En märklig utstyrsel.", "زي غريب."],
    "Lexin030417": ["Gå på utställning.", "يذهب لمعرض."],
    "Lexin030421": ["Risk för utstötning.", "خطر النبذ (الطرد)."],
    "Lexin030422": ["Utsugning av de fattiga.", "استغلال الفقراء."],
    "Lexin030423": ["Leva i utsvävning.", "يعيش في مجون."],
    "Lexin030424": ["Inga utsvävningar!", "بلا خروج عن الموضوع!"],
    "Lexin030426": ["Så sitt utsäde.", "يزرع بذاره."]
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

const backupPath = DATA_FILE + '.backup_nouns79_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 79 completed!`);
