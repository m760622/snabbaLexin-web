/**
 * إضافة أمثلة للدفعة الثانية من الأفعال الشائعة بدون أمثلة
 * Add examples for second batch of common verbs without examples
 */

const fs = require('fs');

// Load and parse dictionary
const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

// أمثلة للدفعة الثانية من الأفعال
const verbExamples = {
    // === الأفعال 1-25 ===
    "Tutar": {
        exSwe: "Bilen tutar i korsningen.",
        exArb: "السيارة تزمر عند التقاطع."
    },
    "Tågar": {
        exSwe: "Studenterna tågar genom staden.",
        exArb: "الطلاب يسيرون في موكب عبر المدينة."
    },
    "Tätar": {
        exSwe: "Han tätar fönstren för vintern.",
        exArb: "يسد النوافذ استعداداً للشتاء."
    },
    "Vadar": {
        exSwe: "Barnen vadar i bäcken.",
        exArb: "الأطفال يخوضون في الجدول."
    },
    "Åskar": {
        exSwe: "Det åskar och blixtrar ute.",
        exArb: "ترعد السماء وتبرق في الخارج."
    },
    "Äktar": {
        exSwe: "Han äktar henne i kyrkan.",
        exArb: "يتزوجها في الكنيسة."
    },
    "Ömmar": {
        exSwe: "Jag ömmar för de fattiga.",
        exArb: "أشفق على الفقراء."
    },
    "Avbalkar": {
        exSwe: "De avbalkar rummet med en gardin.",
        exArb: "يفصلون الغرفة بستارة."
    },
    "Avbildar": {
        exSwe: "Konstnären avbildar naturen.",
        exArb: "الفنان يرسم الطبيعة."
    },
    "Avlastar": {
        exSwe: "Lastbilen avlastar varorna.",
        exArb: "الشاحنة تفرغ البضائع."
    },
    "Avlossar": {
        exSwe: "Soldaten avlossar sitt vapen.",
        exArb: "الجندي يطلق سلاحه."
    },
    "Avlämnar": {
        exSwe: "Budet avlämnar paketet.",
        exArb: "المندوب يسلم الطرد."
    },
    "Avrundar": {
        exSwe: "Läraren avrundar lektionen.",
        exArb: "المعلم يختم الدرس."
    },
    "Avrustar": {
        exSwe: "Landet avrustar sin militär.",
        exArb: "الدولة تنزع سلاح جيشها."
    },
    "Avrättar": {
        exSwe: "Diktatorn avrättar sina fiender.",
        exArb: "الديكتاتور يعدم أعداءه."
    },
    "Avspisar": {
        exSwe: "Hon avspisar hans förslag.",
        exArb: "ترفض اقتراحه."
    },
    "Avstavar": {
        exSwe: "Barnet avstavar orden när han läser.",
        exArb: "الطفل يهجئ الكلمات عند القراءة."
    },
    "Avsätter": {
        exSwe: "Folket avsätter presidenten.",
        exArb: "الشعب يعزل الرئيس."
    },
    "Avtackar": {
        exSwe: "Chefen avtackar den pensionerade kollegan.",
        exArb: "المدير يشكر الزميل المتقاعد."
    },
    "Avverkar": {
        exSwe: "De avverkar skogen för att bygga.",
        exArb: "يقطعون الغابة للبناء."
    },
    "Avvänjer": {
        exSwe: "Mamman avvänjer barnet från bröstmjölk.",
        exArb: "الأم تفطم الطفل."
    },
    "Avväpnar": {
        exSwe: "Polisen avväpnar brottslingen.",
        exArb: "الشرطة تنزع سلاح المجرم."
    },
    "Bedrövar": {
        exSwe: "Nyheten bedrövar hela familjen.",
        exArb: "الخبر يحزن العائلة كلها."
    },
    "Befaller": {
        exSwe: "Kungen befaller sina tjänare.",
        exArb: "الملك يأمر خدمه."
    },
    "Bekommer": {
        exSwe: "Det bekommer mig inte alls.",
        exArb: "لا يؤثر عليّ على الإطلاق."
    },

    // === الأفعال 26-50 ===
    "Bekämpar": {
        exSwe: "Läkarna bekämpar sjukdomen.",
        exArb: "الأطباء يكافحون المرض."
    },
    "Bekänner": {
        exSwe: "Han bekänner sina synder.",
        exArb: "يعترف بذنوبه."
    },
    "Belastar": {
        exSwe: "Skulden belastar hans ekonomi.",
        exArb: "الدين يثقل اقتصاده."
    },
    "Belägrar": {
        exSwe: "Armén belägrar staden.",
        exArb: "الجيش يحاصر المدينة."
    },
    "Bestiger": {
        exSwe: "De bestiger berget tidigt på morgonen.",
        exArb: "يتسلقون الجبل في الصباح الباكر."
    },
    "Betäcker": {
        exSwe: "Snön betäcker marken.",
        exArb: "الثلج يغطي الأرض."
    },
    "Föraktar": {
        exSwe: "Han föraktar lögner.",
        exArb: "يحتقر الكذب."
    },
    "Försakar": {
        exSwe: "Hon försakar allt för sin familj.",
        exArb: "تضحي بكل شيء من أجل عائلتها."
    },
    "Försenar": {
        exSwe: "Olyckan försenar trafiken.",
        exArb: "الحادث يؤخر حركة المرور."
    },
    "Försonas": {
        exSwe: "De försonas efter många år.",
        exArb: "يتصالحون بعد سنوات عديدة."
    },
    "Förströr": {
        exSwe: "Musiken förströr sinnet.",
        exArb: "الموسيقى تسلي العقل."
    },
    "Förtalar": {
        exSwe: "Hon förtalar sina kollegor.",
        exArb: "تشوه سمعة زملائها."
    },
    "Förädlar": {
        exSwe: "Fabriken förädlar råvaror.",
        exArb: "المصنع يكرر المواد الخام."
    },
    "Utkommer": {
        exSwe: "Boken utkommer nästa månad.",
        exArb: "يصدر الكتاب الشهر القادم."
    },
    "Utnämner": {
        exSwe: "Regeringen utnämner en ny minister.",
        exArb: "الحكومة تعين وزيراً جديداً."
    },
    "Anslår": {
        exSwe: "Kommunen anslår pengar till skolan.",
        exArb: "البلدية تخصص أموالاً للمدرسة."
    },
    "Backar": {
        exSwe: "Hon backar bilen försiktigt.",
        exArb: "تريجع السيارة بحذر."
    },
    "Bajsar": {
        exSwe: "Bebisen bajsar i blöjan.",
        exArb: "الرضيع يتغوط في الحفاضة."
    },
    "Bandar": {
        exSwe: "Han bandar samtalet.",
        exArb: "يسجل المحادثة."
    },
    "Bankar": {
        exSwe: "Någon bankar på dörren.",
        exArb: "أحدهم يطرق الباب بقوة."
    },
    "Bastar": {
        exSwe: "De bastar efter träningen.",
        exArb: "يستحمون بالساونا بعد التمرين."
    },
    "Baxnar": {
        exSwe: "Jag baxnar av överraskning.",
        exArb: "أُصدم من المفاجأة."
    },
    "Biktar": {
        exSwe: "Han biktar sig för prästen.",
        exArb: "يعترف للكاهن."
    },
    "Bistår": {
        exSwe: "Organisationen bistår flyktingar.",
        exArb: "المنظمة تساعد اللاجئين."
    },
    "Bockar": {
        exSwe: "Han bockar artigt för gästerna.",
        exArb: "ينحني بأدب للضيوف."
    },

    // === الأفعال 51-75 ===
    "Bommar": {
        exSwe: "Spelaren bommar målet.",
        exArb: "اللاعب يخطئ الهدف."
    },
    "Breder": {
        exSwe: "Hon breder smör på brödet.",
        exArb: "تدهن الزبدة على الخبز."
    },
    "Bräker": {
        exSwe: "Fåret bräker på ängen.",
        exArb: "الخروف يثغو في المرج."
    },
    "Bussar": {
        exSwe: "Skolan bussar eleverna till museet.",
        exArb: "المدرسة تنقل الطلاب بالحافلة للمتحف."
    },
    "Bänder": {
        exSwe: "Tjuven bänder upp låset.",
        exArb: "اللص يكسر القفل."
    },
    "Bärgar": {
        exSwe: "Räddningstjänsten bärgar bilen.",
        exArb: "فرق الإنقاذ تسحب السيارة."
    },
    "Campar": {
        exSwe: "Vi campar vid sjön.",
        exArb: "نعسكر عند البحيرة."
    },
    "Daddar": {
        exSwe: "Pappan daddar med bebisen.",
        exArb: "الأب يداعب الرضيع."
    },
    "Daltar": {
        exSwe: "Farmor daltar med barnbarnen.",
        exArb: "الجدة تدلل الأحفاد."
    },
    "Darrar": {
        exSwe: "Jag darrar av kyla.",
        exArb: "أرتجف من البرد."
    },
    "Deltar": {
        exSwe: "Alla deltar i mötet.",
        exArb: "الجميع يشاركون في الاجتماع."
    },
    "Diggar": {
        exSwe: "Jag diggar den här musiken!",
        exArb: "أحب هذه الموسيقى!"
    },
    "Diktar": {
        exSwe: "Poeten diktar vackra verser.",
        exArb: "الشاعر ينظم أبياتاً جميلة."
    },
    "Dillar": {
        exSwe: "Han dillar om ingenting.",
        exArb: "يثرثر عن لا شيء."
    },
    "Dockar": {
        exSwe: "Fartyget dockar i hamnen.",
        exArb: "السفينة ترسو في الميناء."
    },
    "Drejar": {
        exSwe: "Hantverkaren drejar en vas.",
        exArb: "الحرفي يشكل مزهرية بالطين."
    },
    "Driver": {
        exSwe: "Han driver med mig!",
        exArb: "إنه يمزح معي!"
    },
    "Dubbar": {
        exSwe: "Kungen dubbar riddaren.",
        exArb: "الملك يمنحه لقب فارس."
    },
    "Duckar": {
        exSwe: "Hon duckar för bollen.",
        exArb: "تنحني لتتفادى الكرة."
    },
    "Dumpar": {
        exSwe: "De dumpar avfall olagligt.",
        exArb: "يرمون النفايات بشكل غير قانوني."
    },
    "Dämmer": {
        exSwe: "De dämmer floden för att bygga en damm.",
        exArb: "يسدون النهر لبناء سد."
    },
    "Fajtas": {
        exSwe: "Pojkarna fajtas på skolgården.",
        exArb: "الأولاد يتشاجرون في ساحة المدرسة."
    },
    "Famlar": {
        exSwe: "Han famlar efter ljusknappen i mörkret.",
        exArb: "يتلمس زر الإضاءة في الظلام."
    },
    "Fattar": {
        exSwe: "Nu fattar jag vad du menar!",
        exArb: "الآن فهمت ما تقصد!"
    },
    "Filmar": {
        exSwe: "Hon filmar bröllopet.",
        exArb: "تصور حفل الزفاف."
    },

    // === الأفعال 76-100 ===
    "Fintar": {
        exSwe: "Spelaren fintar motståndaren.",
        exArb: "اللاعب يراوغ الخصم."
    },
    "Flaxar": {
        exSwe: "Fågeln flaxar med vingarna.",
        exArb: "الطائر يرفرف بجناحيه."
    },
    "Flippar": {
        exSwe: "Han flippar ur när han hör nyheten.",
        exArb: "يفقد أعصابه عندما يسمع الخبر."
    },
    "Flörtar": {
        exSwe: "Hon flörtar med honom på festen.",
        exArb: "تغازله في الحفلة."
    },
    "Forsar": {
        exSwe: "Vattnet forsar genom dalen.",
        exArb: "الماء يتدفق عبر الوادي."
    },
    "Fossar": {
        exSwe: "Regnet fossar ner från himlen.",
        exArb: "المطر ينهمر من السماء."
    },
    "Frackar": {
        exSwe: "De frackar brunnen för vatten.",
        exArb: "يحفرون البئر للحصول على الماء."
    },
    "Fräser": {
        exSwe: "Katten fräser åt hunden.",
        exArb: "القطة تفحّ على الكلب."
    },
    "Funkar": {
        exSwe: "Datorn funkar inte.",
        exArb: "الكمبيوتر لا يعمل."
    },
    "Gapar": {
        exSwe: "Barnet gapar av förvåning.",
        exArb: "الطفل يفغر فمه من الدهشة."
    },
    "Gissar": {
        exSwe: "Jag gissar att det regnar imorgon.",
        exArb: "أخمن أنها ستمطر غداً."
    },
    "Glider": {
        exSwe: "Skridskoåkaren glider på isen.",
        exArb: "المتزلج ينزلق على الجليد."
    },
    "Glimmar": {
        exSwe: "Stjärnorna glimmar på himlen.",
        exArb: "النجوم تتلألأ في السماء."
    },
    "Glänser": {
        exSwe: "Bilen glänser efter tvätten.",
        exArb: "السيارة تلمع بعد الغسيل."
    },
    "Gnager": {
        exSwe: "Musen gnager på osten.",
        exArb: "الفأر يقضم الجبن."
    },
    "Gnuggar": {
        exSwe: "Han gnuggar ögonen när han vaknar.",
        exArb: "يفرك عينيه عندما يستيقظ."
    },
    "Godtar": {
        exSwe: "Chefen godtar förslaget.",
        exArb: "المدير يقبل الاقتراح."
    },
    "Grenar": {
        exSwe: "Vägen grenar sig vid skogen.",
        exArb: "الطريق يتفرع عند الغابة."
    },
    "Gripar": {
        exSwe: "Polisen gripar tjuven.",
        exArb: "الشرطة تقبض على اللص."
    },
    "Grälar": {
        exSwe: "De grälar om pengar.",
        exArb: "يتشاجرون على المال."
    },
    "Gräverar": {
        exSwe: "Konstnären graverar sitt namn.",
        exArb: "الفنان ينقش اسمه."
    },
    "Gömmer": {
        exSwe: "Barnet gömmer sig bakom soffan.",
        exArb: "الطفل يختبئ خلف الأريكة."
    },
    "Hakar": {
        exSwe: "Gärningmannen hakar tag i offret.",
        exArb: "الجاني يمسك بالضحية."
    },
    "Halkar": {
        exSwe: "Hon halkar på isen.",
        exArb: "تنزلق على الجليد."
    },
    "Hamnar": {
        exSwe: "Bollen hamnar i målet.",
        exArb: "الكرة تستقر في المرمى."
    }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة الثانية من الأفعال');
console.log('     ADD EXAMPLES FOR SECOND BATCH OF VERBS');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0;
let alreadyHasExample = 0;
let notFound = 0;
const notFoundList = [];

for (const [targetWord, example] of Object.entries(verbExamples)) {
    let found = false;

    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        const entryWord = entry[2];
        const entryType = entry[1];

        // Match word (case-insensitive) and must be a verb
        const wordMatch = entryWord && entryWord.toLowerCase() === targetWord.toLowerCase();
        const isVerb = entryType && entryType.includes('Verb');

        if (wordMatch && isVerb) {
            found = true;

            // Check if already has example
            if (entry[7] && entry[7].trim() !== '') {
                alreadyHasExample++;
                console.log(`⚠️  ${entryWord} - لديه مثال بالفعل`);
            } else {
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                addedCount++;
                console.log(`✅ ${entryWord} - تمت إضافة المثال`);
            }
            break;
        }
    }

    if (!found) {
        console.log(`❌ لم يُعثر على: ${targetWord}`);
        notFoundList.push(targetWord);
        notFound++;
    }
}

// Save updated data
const newDataStr = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';';
fs.writeFileSync('./data.js', newDataStr);

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`✅ الأمثلة المضافة: ${addedCount}`);
console.log(`⚠️  لديها أمثلة مسبقاً: ${alreadyHasExample}`);
console.log(`❌ لم يُعثر عليها: ${notFound}`);
console.log(`📊 المجموع: ${Object.keys(verbExamples).length}`);
console.log('═══════════════════════════════════════════════════════════════');

if (notFoundList.length > 0) {
    console.log('\nالأفعال التي لم يُعثر عليها:');
    notFoundList.forEach(w => console.log(`  - ${w}`));
}
