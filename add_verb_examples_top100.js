/**
 * إضافة أمثلة لأهم 100 فعل شائع بدون أمثلة
 * Add examples for top 100 common verbs without examples
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

// أمثلة لأهم 100 فعل - Examples for top 100 verbs
const verbExamples = {
    // === الأفعال القصيرة الشائعة (1-27) ===
    "Bero": {
        exSwe: "Det beror på vädret om vi går ut.",
        exArb: "يعتمد على الطقس إذا كنا سنخرج."
    },
    "Må": {
        exSwe: "Hur mår du idag?",
        exArb: "كيف حالك اليوم؟"
    },
    "Avlar": {
        exSwe: "Bonden avlar hästar på gården.",
        exArb: "المزارع يربي الخيول في المزرعة."
    },
    "Benar": {
        exSwe: "Hon benar håret åt sidan.",
        exArb: "تفرق شعرها على الجانب."
    },
    "Betar": {
        exSwe: "Korna betar på ängen.",
        exArb: "ترعى الأبقار في المرج."
    },
    "När": {
        exSwe: "Modern när sitt barn med kärlek.",
        exArb: "الأم تغذي طفلها بالحب."
    },
    "Ror": {
        exSwe: "Han ror båten över sjön.",
        exArb: "يجدف بالقارب عبر البحيرة."
    },
    "Bedöma": {
        exSwe: "Det är svårt att bedöma situationen.",
        exArb: "من الصعب تقييم الوضع."
    },
    "Beskär": {
        exSwe: "Trädgårdsmästaren beskär träden varje vår.",
        exArb: "البستاني يقلم الأشجار كل ربيع."
    },
    "Beslår": {
        exSwe: "Polisen beslår varorna vid gränsen.",
        exArb: "الشرطة تصادر البضائع عند الحدود."
    },
    "Betsar": {
        exSwe: "Han betsar möblerna för att ge dem ny färg.",
        exArb: "يطلي الأثاث ليعطيه لوناً جديداً."
    },
    "Diar": {
        exSwe: "Kalven diar från sin mor.",
        exArb: "العجل يرضع من أمه."
    },
    "Doar": {
        exSwe: "Kören doar melodin i bakgrunden.",
        exArb: "تغني الجوقة اللحن في الخلفية."
    },
    "Duar": {
        exSwe: "Man duar ofta när man talar med barn.",
        exArb: "غالباً ما تخاطب الأطفال بصيغة 'أنت'."
    },
    "Glor": {
        exSwe: "Sluta att glor på mig!",
        exArb: "توقف عن التحديق فيّ!"
    },
    "Gnor": {
        exSwe: "Han gnor hårt på jobbet varje dag.",
        exArb: "يكدح بجد في العمل كل يوم."
    },
    "Gnyr": {
        exSwe: "Barnet gnyr när det är trött.",
        exArb: "يتذمر الطفل عندما يكون متعباً."
    },
    "Niar": {
        exSwe: "I formella sammanhang niar man äldre personer.",
        exArb: "في المناسبات الرسمية تخاطب كبار السن بصيغة الاحترام."
    },
    "Rear": {
        exSwe: "Affären rear på vintern.",
        exArb: "المتجر يقيم تخفيضات في الشتاء."
    },
    "Skor": {
        exSwe: "Smeden skor hästen med nya skor.",
        exArb: "الحداد يحذي الحصان بحدوات جديدة."
    },
    "Snör": {
        exSwe: "Hon snör skorna åt barnen.",
        exArb: "تربط الأحذية للأطفال."
    },
    "Svär": {
        exSwe: "Han svär att han är oskyldig.",
        exArb: "يقسم أنه بريء."
    },
    "Tvår": {
        exSwe: "Hon tvår sina händer noggrant.",
        exArb: "تغسل يديها بعناية."
    },
    "Töar": {
        exSwe: "Snön töar på våren.",
        exArb: "يذوب الثلج في الربيع."
    },
    "Vare": {
        exSwe: "Vare sig det regnar eller inte går vi ut.",
        exArb: "سواء أمطرت أم لا سنخرج."
    },
    "Avböjer": {
        exSwe: "Hon avböjer inbjudan artigt.",
        exArb: "ترفض الدعوة بأدب."
    },
    "Avhyser": {
        exSwe: "Hyresvärden avhyser hyresgästen.",
        exArb: "المالك يطرد المستأجر."
    },

    // === الأفعال المركبة (28-40) ===
    "Avsynar": {
        exSwe: "Inspektören avsynar byggnaden.",
        exArb: "المفتش يراقب المبنى."
    },
    "Avtågar": {
        exSwe: "Soldaterna avtågar i gryningen.",
        exArb: "يغادر الجنود عند الفجر."
    },
    "Beivrar": {
        exSwe: "Polisen beivrar brottet.",
        exArb: "الشرطة تعاقب على الجريمة."
    },
    "Bejakar": {
        exSwe: "Chefen bejakar förslaget.",
        exArb: "المدير يوافق على الاقتراح."
    },
    "Berikar": {
        exSwe: "Resor berikar livet.",
        exArb: "السفر يثري الحياة."
    },
    "Utropar": {
        exSwe: "Auktionsmästaren utropar priset.",
        exArb: "المزاد ينادي على السعر."
    },
    "Utvisar": {
        exSwe: "Domaren utvisar spelaren från planen.",
        exArb: "الحكم يطرد اللاعب من الملعب."
    },
    "Ansar": {
        exSwe: "Han ansar trädgården varje vecka.",
        exArb: "يهتم بالحديقة كل أسبوع."
    },
    "Bidar": {
        exSwe: "Han bidar sin tid tills tillfället kommer.",
        exArb: "ينتظر وقته حتى تأتي الفرصة."
    },
    "Bilar": {
        exSwe: "De bilar till sommarstugan.",
        exArb: "يقودون السيارة إلى المنزل الصيفي."
    },
    "Biter": {
        exSwe: "Hunden biter i benet.",
        exArb: "الكلب يعض في العظم."
    },
    "Boxas": {
        exSwe: "De boxas på gymmet varje kväll.",
        exArb: "يتلاكمون في النادي كل مساء."
    },
    "Bådar": {
        exSwe: "Mörka moln bådar storm.",
        exArb: "الغيوم الداكنة تنذر بعاصفة."
    },

    // === الأفعال الشائعة (41-60) ===
    "Böjer": {
        exSwe: "Han böjer sig för att plocka upp pennan.",
        exArb: "ينحني ليلتقط القلم."
    },
    "Bökar": {
        exSwe: "Grisen bökar i marken.",
        exArb: "الخنزير ينقب في الأرض."
    },
    "Dagas": {
        exSwe: "Det dagas tidigt på sommaren.",
        exArb: "يطلع الفجر مبكراً في الصيف."
    },
    "Dyker": {
        exSwe: "Hon dyker ner i poolen.",
        exArb: "تغطس في المسبح."
    },
    "Dåsar": {
        exSwe: "Han dåsar i soffan efter maten.",
        exArb: "يغفو على الأريكة بعد الطعام."
    },
    "Fikar": {
        exSwe: "Vi fikar tillsammans varje dag.",
        exArb: "نتناول القهوة معاً كل يوم."
    },
    "Fiser": {
        exSwe: "Bebisen fiser efter maten.",
        exArb: "يضرط الرضيع بعد الطعام."
    },
    "Forsa": {
        exSwe: "Vattnet forsar genom ån.",
        exArb: "يتدفق الماء عبر النهر."
    },
    "Fotar": {
        exSwe: "Han fotar fåglar i skogen.",
        exArb: "يصور الطيور في الغابة."
    },
    "Friar": {
        exSwe: "Han friar till henne på hennes födelsedag.",
        exArb: "يطلب يدها في عيد ميلادها."
    },
    "Föder": {
        exSwe: "Mamma föder barnen med omsorg.",
        exArb: "الأم تطعم الأطفال بعناية."
    },
    "Göder": {
        exSwe: "Bonden göder grisen inför slakt.",
        exArb: "المزارع يسمن الخنزير قبل الذبح."
    },
    "Hajar": {
        exSwe: "Nu hajar jag vad du menar!",
        exArb: "الآن فهمت ما تقصد!"
    },
    "Hejar": {
        exSwe: "Publiken hejar på laget.",
        exArb: "الجمهور يشجع الفريق."
    },
    "Hädar": {
        exSwe: "Det är förbjudet att häda i vissa länder.",
        exArb: "ممنوع التجديف في بعض الدول."
    },
    "Ingår": {
        exSwe: "Frokost ingår i priset.",
        exArb: "الفطور مشمول في السعر."
    },
    "Kanar": {
        exSwe: "Barnen kanar nedför kullen.",
        exArb: "ينزلق الأطفال من التل."
    },
    "Kapar": {
        exSwe: "Piraterna kapade fartyget.",
        exArb: "القراصنة اختطفوا السفينة."
    },
    "Kelar": {
        exSwe: "Katten kelar med sin ägare.",
        exArb: "القطة تتدلل مع صاحبها."
    },
    "Kisar": {
        exSwe: "Han kisar mot solen.",
        exArb: "يحول عينيه بسبب الشمس."
    },

    // === الأفعال الشائعة (61-80) ===
    "Kivas": {
        exSwe: "Barnen kivas om leksaken.",
        exArb: "الأطفال يتخاصمون على اللعبة."
    },
    "Knäar": {
        exSwe: "Benen knäar efter den långa vandringen.",
        exArb: "ترتخي الرجلان بعد المشي الطويل."
    },
    "Kolar": {
        exSwe: "Bilen kolade mitt på vägen.",
        exArb: "تعطلت السيارة في منتصف الطريق."
    },
    "Kräks": {
        exSwe: "Bebisen kräks efter maten.",
        exArb: "الرضيع يتقيأ بعد الطعام."
    },
    "Kutar": {
        exSwe: "Han kutar iväg till bussen.",
        exArb: "يركض مسرعاً إلى الحافلة."
    },
    "Kuvar": {
        exSwe: "Diktatorn kuvar folket.",
        exArb: "الديكتاتور يقهر الشعب."
    },
    "Kyler": {
        exSwe: "Fläkten kyler rummet.",
        exArb: "المروحة تبرد الغرفة."
    },
    "Lapar": {
        exSwe: "Katten lapar mjölk ur skålen.",
        exArb: "القطة تلعق الحليب من الوعاء."
    },
    "Lejer": {
        exSwe: "De lejer en stuga i fjällen.",
        exArb: "يستأجرون كوخاً في الجبال."
    },
    "Lipar": {
        exSwe: "Barnet lipar när det inte får godis.",
        exArb: "يبكي الطفل عندما لا يحصل على حلوى."
    },
    "Läker": {
        exSwe: "Såret läker snabbt.",
        exArb: "الجرح يشفى بسرعة."
    },
    "Löder": {
        exSwe: "Mekanikern löder rören ihop.",
        exArb: "الميكانيكي يلحم الأنابيب معاً."
    },
    "Mejar": {
        exSwe: "Bonden mejar gräset på ängen.",
        exArb: "المزارع يحصد العشب في المرج."
    },
    "Metar": {
        exSwe: "Han metar fisk i bäcken.",
        exArb: "يصيد السمك بالسنارة في الجدول."
    },
    "Motar": {
        exSwe: "Vakten motar bort inkräktare.",
        exArb: "الحارس يصد المتطفلين."
    },
    "Murar": {
        exSwe: "Han murar en ny vägg.",
        exArb: "يبني جداراً جديداً."
    },
    "Mutar": {
        exSwe: "Han försökte muta tjänstemannen.",
        exArb: "حاول رشوة الموظف."
    },
    "Myser": {
        exSwe: "Vi myser framför brasan.",
        exArb: "نستمتع بجو دافئ أمام المدفأة."
    },
    "Niger": {
        exSwe: "Flickan niger för drottningen.",
        exArb: "الفتاة تنحني احتراماً للملكة."
    },
    "Pikar": {
        exSwe: "Hon pikar honom för hans misstag.",
        exArb: "توبخه على أخطائه."
    },

    // === الأفعال الشائعة (81-100) ===
    "Pyser": {
        exSwe: "Luften pyser ur ballongen.",
        exArb: "يتسرب الهواء من البالون."
    },
    "Pålar": {
        exSwe: "De pålar marken för husbygget.",
        exArb: "يضعون الأوتاد في الأرض للبناء."
    },
    "Revar": {
        exSwe: "Sjömännen revar seglen i stormen.",
        exArb: "البحارة يطوون الأشرعة في العاصفة."
    },
    "Rider": {
        exSwe: "Hon rider häst varje helg.",
        exArb: "تركب الحصان كل نهاية أسبوع."
    },
    "Råmar": {
        exSwe: "Kon råmar på morgonen.",
        exArb: "تخور البقرة في الصباح."
    },
    "Röjer": {
        exSwe: "Han röjer marken för att bygga.",
        exArb: "يمهد الأرض للبناء."
    },
    "Rövar": {
        exSwe: "Piraten rövar skatter.",
        exArb: "القرصان ينهب الكنوز."
    },
    "Sanna": {
        exSwe: "Du ska sanna mina ord.",
        exArb: "ستصدق كلامي."
    },
    "Selar": {
        exSwe: "Han selar hästen innan ritten.",
        exArb: "يسرج الحصان قبل الركوب."
    },
    "Skils": {
        exSwe: "Paret skils efter tio år.",
        exArb: "الزوجان يتطلقان بعد عشر سنوات."
    },
    "Skäms": {
        exSwe: "Han skäms för sitt beteende.",
        exArb: "يخجل من تصرفه."
    },
    "Snöar": {
        exSwe: "Det snöar mycket på vintern.",
        exArb: "تثلج كثيراً في الشتاء."
    },
    "Surar": {
        exSwe: "Barnet surar när det inte får som det vill.",
        exArb: "يتجهم الطفل عندما لا يحصل على ما يريد."
    },
    "Sötar": {
        exSwe: "Hon sötar kaffet med honung.",
        exArb: "تحلي القهوة بالعسل."
    },
    "Totar": {
        exSwe: "Sekretären totar ihop papprena.",
        exArb: "السكرتيرة تجمع الأوراق."
    }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة لأهم 100 فعل شائع');
console.log('     ADD EXAMPLES FOR TOP 100 COMMON VERBS');
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
                // Skip - already has example
                alreadyHasExample++;
                console.log(`⚠️  ${entryWord} - لديه مثال بالفعل`);
            } else {
                // Add example
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                addedCount++;
                console.log(`✅ ${entryWord} - تمت إضافة المثال`);
            }
            break; // Only add to first matching entry
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
