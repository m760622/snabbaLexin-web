/**
 * إضافة أمثلة للدفعة الثالثة من الأفعال الشائعة بدون أمثلة
 * Add examples for third batch of common verbs without examples
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

// أمثلة للدفعة الثالثة من الأفعال
const verbExamples = {
    // === الأفعال 1-25 ===
    "Månde": {
        exSwe: "Du månde förstå situationen.",
        exArb: "يجب أن تفهم الوضع."
    },
    "Flexar": {
        exSwe: "Hon flexar och börjar klockan tio.",
        exArb: "تعمل بدوام مرن وتبدأ الساعة العاشرة."
    },
    "Flinar": {
        exSwe: "Han flinar åt skämtet.",
        exArb: "يبتسم ساخراً من النكتة."
    },
    "Flåsar": {
        exSwe: "Hunden flåsar i värmen.",
        exArb: "الكلب يلهث في الحر."
    },
    "Fnyser": {
        exSwe: "Hon fnyser åt hans förslag.",
        exArb: "تسخر من اقتراحه."
    },
    "Fryser": {
        exSwe: "Jag fryser utan jacka.",
        exArb: "أشعر بالبرد بدون سترة."
    },
    "Fräter": {
        exSwe: "Syran fräter på metallen.",
        exArb: "الحمض يأكل المعدن."
    },
    "Fuskar": {
        exSwe: "Eleven fuskar på provet.",
        exArb: "الطالب يغش في الامتحان."
    },
    "Fyndar": {
        exSwe: "Hon fyndar på loppmarknaden.",
        exArb: "تجد صفقات رائعة في سوق البرغوث."
    },
    "Fållar": {
        exSwe: "Skräddaren fållar byxorna.",
        exArb: "الخياط يخيط حاشية البنطال."
    },
    "Garvar": {
        exSwe: "Vi garvar åt hans historier.",
        exArb: "نضحك على قصصه."
    },
    "Gipsar": {
        exSwe: "Läkaren gipsar det brutna benet.",
        exArb: "الطبيب يجبس الساق المكسورة."
    },
    "Gnolar": {
        exSwe: "Han gnolar på en melodi.",
        exArb: "يدندن لحناً."
    },
    "Golvar": {
        exSwe: "Boxaren golvar sin motståndare.",
        exArb: "الملاكم يطرح خصمه أرضاً."
    },
    "Gormar": {
        exSwe: "Chefen gormar åt anställda.",
        exArb: "المدير يصرخ على الموظفين."
    },
    "Gulnar": {
        exSwe: "Löven gulnar på hösten.",
        exArb: "تصفر الأوراق في الخريف."
    },
    "Gynnar": {
        exSwe: "Lagen gynnar de rika.",
        exArb: "القانون يفضل الأغنياء."
    },
    "Gängar": {
        exSwe: "Mekanikern gängar skruven.",
        exArb: "الميكانيكي يلولب البرغي."
    },
    "Gästar": {
        exSwe: "Artisten gästar en TV-show.",
        exArb: "الفنان يظهر كضيف في برنامج تلفزيوني."
    },
    "Hackar": {
        exSwe: "Fågeln hackar på trädet.",
        exArb: "الطائر ينقر على الشجرة."
    },
    "Haffar": {
        exSwe: "Polisen haffar tjuven.",
        exArb: "الشرطة تمسك اللص."
    },
    "Halsar": {
        exSwe: "Han halsar läsken direkt ur flaskan.",
        exArb: "يشرب المشروب الغازي مباشرة من الزجاجة."
    },
    "Hickar": {
        exSwe: "Bebisen hickar efter maten.",
        exArb: "الرضيع يصاب بالحازوقة بعد الطعام."
    },
    "Hytter": {
        exSwe: "Han hytter med näven åt grannen.",
        exArb: "يهدد جاره بقبضته."
    },
    "Hyvlar": {
        exSwe: "Snickaren hyvlar brädan.",
        exArb: "النجار يسحج اللوح."
    },

    // === الأفعال 26-50 ===
    "Häckar": {
        exSwe: "Fåglarna häckar i trädet.",
        exArb: "الطيور تعشش في الشجرة."
    },
    "Jobbar": {
        exSwe: "Jag jobbar på ett kontor.",
        exArb: "أعمل في مكتب."
    },
    "Jumpar": {
        exSwe: "Han jumpar varje morgon.",
        exArb: "يقفز كل صباح."
    },
    "Kalkar": {
        exSwe: "Bonden kalkar åkern.",
        exArb: "المزارع يرش الجير على الحقل."
    },
    "Karvar": {
        exSwe: "Han karvar sitt namn i trädet.",
        exArb: "ينحت اسمه على الشجرة."
    },
    "Kedjar": {
        exSwe: "De kedjar fast cykeln vid stolpen.",
        exArb: "يقيدون الدراجة بالعمود."
    },
    "Kickar": {
        exSwe: "Spelaren kickar bollen hårt.",
        exArb: "اللاعب يركل الكرة بقوة."
    },
    "Killar": {
        exSwe: "Storebror killar lillasyster.",
        exArb: "الأخ الكبير يدغدغ أخته الصغيرة."
    },
    "Kippar": {
        exSwe: "Han kippar efter luft.",
        exArb: "يلهث طالباً الهواء."
    },
    "Kissar": {
        exSwe: "Barnet kissar i pottan.",
        exArb: "الطفل يتبول في القصرية."
    },
    "Kletar": {
        exSwe: "Barnet kletar med maten.",
        exArb: "الطفل يوسخ بالطعام."
    },
    "Klöser": {
        exSwe: "Katten klöser på möbeln.",
        exArb: "القطة تخدش الأثاث."
    },
    "Knegar": {
        exSwe: "Han knegar på med jobbet.",
        exArb: "يكدح في العمل."
    },
    "Knixar": {
        exSwe: "Flickan knixar för kungen.",
        exArb: "الفتاة تنحني احتراماً للملك."
    },
    "Knogar": {
        exSwe: "Studenten knogar med uppsatsen.",
        exArb: "الطالب يكدح في كتابة المقال."
    },
    "Knotar": {
        exSwe: "Han knotar över sina problem.",
        exArb: "يتذمر من مشاكله."
    },
    "Krigar": {
        exSwe: "Länderna krigar mot varandra.",
        exArb: "الدول تحارب بعضها."
    },
    "Krusar": {
        exSwe: "Vinden krusar vattnet.",
        exArb: "الريح تموج الماء."
    },
    "Krälar": {
        exSwe: "Bebisen krälar på golvet.",
        exArb: "الرضيع يزحف على الأرض."
    },
    "Krökar": {
        exSwe: "De krökar på helgen.",
        exArb: "يشربون الكحول في نهاية الأسبوع."
    },
    "Kuggar": {
        exSwe: "Han kuggar på körkortet.",
        exArb: "يسقط في امتحان رخصة القيادة."
    },
    "Kungör": {
        exSwe: "Kungen kungör det nya beslutet.",
        exArb: "الملك يعلن القرار الجديد."
    },
    "Kvider": {
        exSwe: "Fågeln kvider i buren.",
        exArb: "الطائر يغرد في القفص."
    },
    "Kväker": {
        exSwe: "Grodorna kväker vid dammen.",
        exArb: "الضفادع تنق عند البركة."
    },
    "Kysser": {
        exSwe: "Hon kysser barnet godnatt.",
        exArb: "تقبل الطفل ليلة سعيدة."
    },

    // === الأفعال 51-75 ===
    "Kånkar": {
        exSwe: "Han kånkar på tunga väskor.",
        exArb: "يحمل حقائب ثقيلة بصعوبة."
    },
    "Käftar": {
        exSwe: "De käftar om politiken.",
        exArb: "يتجادلون حول السياسة."
    },
    "Lackar": {
        exSwe: "Nagellacket lackar av.",
        exArb: "طلاء الأظافر يتقشر."
    },
    "Langar": {
        exSwe: "Han langar mig saltet.",
        exArb: "يناولني الملح."
    },
    "Larmar": {
        exSwe: "Barnen larmar i lekrummet.",
        exArb: "الأطفال يصخبون في غرفة اللعب."
    },
    "Lassar": {
        exSwe: "De lassar varorna på lastbilen.",
        exArb: "يحملون البضائع على الشاحنة."
    },
    "Leasar": {
        exSwe: "Vi leasar en bil i tre år.",
        exArb: "نستأجر سيارة لمدة ثلاث سنوات."
    },
    "Liftar": {
        exSwe: "Han liftar till stan.",
        exArb: "يطلب توصيلة إلى المدينة."
    },
    "Limmar": {
        exSwe: "Hon limmar fast affischen på väggen.",
        exArb: "تلصق الملصق على الحائط."
    },
    "Linkar": {
        exSwe: "Han linkar efter skadan.",
        exArb: "يعرج بعد الإصابة."
    },
    "Lirar": {
        exSwe: "De lirar fotboll på helgen.",
        exArb: "يلعبون كرة القدم في نهاية الأسبوع."
    },
    "Lovar": {
        exSwe: "Han lovar att komma i tid.",
        exArb: "يعد أن يأتي في الوقت."
    },
    "Lugnar": {
        exSwe: "Mamman lugnar det gråtande barnet.",
        exArb: "الأم تهدئ الطفل الباكي."
    },
    "Lurar": {
        exSwe: "Han lurar på mig bakom dörren.",
        exArb: "يتربص بي خلف الباب."
    },
    "Lyser": {
        exSwe: "Lampan lyser starkt.",
        exArb: "المصباح يضيء بقوة."
    },
    "Lyftar": {
        exSwe: "Han lyftar vikter på gymmet.",
        exArb: "يرفع الأثقال في النادي."
    },
    "Lyssnar": {
        exSwe: "Jag lyssnar på musik.",
        exArb: "أستمع إلى الموسيقى."
    },
    "Lånar": {
        exSwe: "Jag lånar en bok från biblioteket.",
        exArb: "أستعير كتاباً من المكتبة."
    },
    "Läcker": {
        exSwe: "Kranen läcker vatten.",
        exArb: "الصنبور يسرب الماء."
    },
    "Läggar": {
        exSwe: "Hon läggar barnen tidigt.",
        exArb: "تنيم الأطفال مبكراً."
    },
    "Lärar": {
        exSwe: "Han lärar sig svenska.",
        exArb: "يتعلم السويدية."
    },
    "Manar": {
        exSwe: "Ledaren manar folket till lugn.",
        exArb: "القائد يحث الشعب على الهدوء."
    },
    "Mattar": {
        exSwe: "De mattar golvet i vardagsrummet.",
        exArb: "يفرشون غرفة المعيشة بالسجاد."
    },
    "Meckar": {
        exSwe: "Han meckar med bilen.",
        exArb: "يصلح السيارة."
    },
    "Mixar": {
        exSwe: "Hon mixar en smoothie.",
        exArb: "تخلط عصيراً."
    },

    // === الأفعال 76-100 ===
    "Mobbar": {
        exSwe: "De mobbar den nya eleven.",
        exArb: "يتنمرون على الطالب الجديد."
    },
    "Morrar": {
        exSwe: "Hunden morrar åt främlingen.",
        exArb: "الكلب يزمجر على الغريب."
    },
    "Muckar": {
        exSwe: "Han muckar med alla.",
        exArb: "يتشاجر مع الجميع."
    },
    "Mullrar": {
        exSwe: "Åskan mullrar i fjärran.",
        exArb: "الرعد يهدر في البعيد."
    },
    "Mumlar": {
        exSwe: "Han mumlar något ohörbart.",
        exArb: "يتمتم بشيء غير مسموع."
    },
    "Målar": {
        exSwe: "Hon målar ett porträtt.",
        exArb: "ترسم صورة شخصية."
    },
    "Mäklar": {
        exSwe: "Han mäklar fred mellan parterna.",
        exArb: "يتوسط للسلام بين الأطراف."
    },
    "Märker": {
        exSwe: "Jag märker ingen skillnad.",
        exArb: "لا ألاحظ أي فرق."
    },
    "Mätar": {
        exSwe: "Läkaren mätar blodtrycket.",
        exArb: "الطبيب يقيس ضغط الدم."
    },
    "Nafsar": {
        exSwe: "Valpen nafsar på skorna.",
        exArb: "الجرو يعض الحذاء بخفة."
    },
    "Naggar": {
        exSwe: "Tvivlet naggar hans självförtroende.",
        exArb: "الشك ينخر في ثقته بنفسه."
    },
    "Nappar": {
        exSwe: "Fisken nappar på betet.",
        exArb: "السمكة تعض الطُعم."
    },
    "Nickar": {
        exSwe: "Hon nickar instämmande.",
        exArb: "تومئ برأسها موافقة."
    },
    "Nosar": {
        exSwe: "Hunden nosar på maten.",
        exArb: "الكلب يشم الطعام."
    },
    "Nyser": {
        exSwe: "Jag nyser av allergin.",
        exArb: "أعطس من الحساسية."
    },
    "Nystar": {
        exSwe: "Polisen nystar i fallet.",
        exArb: "الشرطة تحقق في القضية."
    },
    "Nätar": {
        exSwe: "Fiskaren nätar fisk.",
        exArb: "الصياد يصيد بالشبكة."
    },
    "Närmar": {
        exSwe: "Stormen närmar sig kusten.",
        exArb: "العاصفة تقترب من الساحل."
    },
    "Ordnar": {
        exSwe: "Hon ordnar allt till festen.",
        exArb: "ترتب كل شيء للحفلة."
    },
    "Packar": {
        exSwe: "Jag packar väskan för resan.",
        exArb: "أحزم الحقيبة للسفر."
    },
    "Pallar": {
        exSwe: "Jag pallar inte mer idag.",
        exArb: "لا أتحمل المزيد اليوم."
    },
    "Pantar": {
        exSwe: "Vi pantar tomburkar.",
        exArb: "نرجع العلب الفارغة مقابل المال."
    },
    "Passar": {
        exSwe: "Den här skjortan passar mig bra.",
        exArb: "هذا القميص يناسبني جيداً."
    },
    "Pekar": {
        exSwe: "Han pekar på kartan.",
        exArb: "يشير إلى الخريطة."
    },
    "Pillar": {
        exSwe: "Sluta pilla på näsan!",
        exArb: "توقف عن العبث بأنفك!"
    }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة الثالثة من الأفعال');
console.log('     ADD EXAMPLES FOR THIRD BATCH OF VERBS');
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

        const wordMatch = entryWord && entryWord.toLowerCase() === targetWord.toLowerCase();
        const isVerb = entryType && entryType.includes('Verb');

        if (wordMatch && isVerb) {
            found = true;

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
