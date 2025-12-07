/**
 * NEW EXAMPLES - BATCH 14
 * Common nouns - places, things, concepts (50 examples)
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

const examples = {
    // ==========================================
    // PLACES & BUILDINGS
    // ==========================================
    "Flygplats|Substantiv": {
        exSwe: "Arlanda är den största flygplatsen i Sverige.",
        exArb: "أرلاندا هو أكبر مطار في السويد."
    },
    "Hamn|Substantiv": {
        exSwe: "Båten ligger i hamnen.",
        exArb: "القارب راسٍ في الميناء."
    },
    "Stadion|Substantiv": {
        exSwe: "Fotbollsmatchen spelas på stadion.",
        exArb: "تُلعب مباراة كرة القدم في الملعب."
    },
    "Museum|Substantiv": {
        exSwe: "Vi besökte ett konstmuseum.",
        exArb: "زرنا متحفاً للفنون."
    },
    "Fabrik|Substantiv": {
        exSwe: "Min pappa arbetar på en fabrik.",
        exArb: "يعمل أبي في مصنع."
    },
    "Lager|Substantiv": {
        exSwe: "Varorna förvaras i lagret.",
        exArb: "تُخزَّن البضائع في المستودع."
    },
    "Förort|Substantiv": {
        exSwe: "Vi bor i en förort till Stockholm.",
        exArb: "نسكن في ضاحية من ضواحي ستوكهولم."
    },
    "Centrum|Substantiv": {
        exSwe: "Affärerna ligger i centrum.",
        exArb: "المتاجر في وسط المدينة."
    },
    "Torg|Substantiv": {
        exSwe: "Vi träffas på torget.",
        exArb: "نلتقي في الساحة."
    },
    "Tunnel|Substantiv": {
        exSwe: "Tåget går genom tunneln.",
        exArb: "يمر القطار عبر النفق."
    },
    // ==========================================
    // NATURE
    // ==========================================
    "Skog|Substantiv": {
        exSwe: "Sverige har mycket skog.",
        exArb: "لدى السويد غابات كثيرة."
    },
    "Äng|Substantiv": {
        exSwe: "Korna betar på ängen.",
        exArb: "ترعى الأبقار في المرج."
    },
    "Dal|Substantiv": {
        exSwe: "Byn ligger i dalen.",
        exArb: "تقع القرية في الوادي."
    },
    "Klippa|Substantiv": {
        exSwe: "Fågeln sitter på klippan.",
        exArb: "يجلس الطائر على الصخرة."
    },
    "Källa|Substantiv": {
        exSwe: "Vattnet kommer från en ren källa.",
        exArb: "يأتي الماء من نبع نظيف."
    },
    "Dimma|Substantiv": {
        exSwe: "Det var tät dimma på morgonen.",
        exArb: "كان هناك ضباب كثيف في الصباح."
    },
    "Frost|Substantiv": {
        exSwe: "Det blev frost i natt.",
        exArb: "كان هناك صقيع الليلة الماضية."
    },
    "Hagel|Substantiv": {
        exSwe: "Det föll hagel under stormen.",
        exArb: "سقط البَرَد أثناء العاصفة."
    },
    // ==========================================
    // TECHNOLOGY & WORK
    // ==========================================
    "Dator|Substantiv": {
        exSwe: "Jag arbetar vid datorn hela dagen.",
        exArb: "أعمل على الكمبيوتر طوال اليوم."
    },
    "Skärm|Substantiv": {
        exSwe: "Datorskärmen är för liten.",
        exArb: "شاشة الكمبيوتر صغيرة جداً."
    },
    "Tangentbord|Substantiv": {
        exSwe: "Tangentbordet fungerar inte.",
        exArb: "لوحة المفاتيح لا تعمل."
    },
    "Mus|Substantiv": {
        exSwe: "Klicka med musen.",
        exArb: "انقر بالفأرة."
    },
    "Skrivare|Substantiv": {
        exSwe: "Skrivaren har slut på bläck.",
        exArb: "نفد الحبر من الطابعة."
    },
    "Kabel|Substantiv": {
        exSwe: "Kabeln är trasig.",
        exArb: "الكابل مكسور."
    },
    "Nätverk|Substantiv": {
        exSwe: "Nätverket är nere.",
        exArb: "الشبكة معطلة."
    },
    "Lösenord|Substantiv": {
        exSwe: "Glöm inte ditt lösenord.",
        exArb: "لا تنسَ كلمة المرور."
    },
    "Konto|Substantiv": {
        exSwe: "Jag skapade ett nytt konto.",
        exArb: "أنشأت حساباً جديداً."
    },
    "Fil|Substantiv": {
        exSwe: "Spara filen innan du stänger.",
        exArb: "احفظ الملف قبل الإغلاق."
    },
    // ==========================================
    // ABSTRACT CONCEPTS
    // ==========================================
    "Framgång|Substantiv": {
        exSwe: "Hårt arbete leder till framgång.",
        exArb: "العمل الجاد يؤدي إلى النجاح."
    },
    "Misslyckande|Substantiv": {
        exSwe: "Misslyckande är en del av lärandet.",
        exArb: "الفشل جزء من التعلم."
    },
    "Erfarenhet|Substantiv": {
        exSwe: "Han har lång erfarenhet.",
        exArb: "لديه خبرة طويلة."
    },
    "Kunskap|Substantiv": {
        exSwe: "Kunskap är makt.",
        exArb: "المعرفة قوة."
    },
    "Förståelse|Substantiv": {
        exSwe: "Tack för din förståelse.",
        exArb: "شكراً على تفهمك."
    },
    "Minne|Substantiv": {
        exSwe: "Jag har dåligt minne.",
        exArb: "لدي ذاكرة ضعيفة."
    },
    "Fantasi|Substantiv": {
        exSwe: "Barn har mycket fantasi.",
        exArb: "لدى الأطفال خيال واسع."
    },
    "Kreativitet|Substantiv": {
        exSwe: "Jobbet kräver kreativitet.",
        exArb: "يتطلب العمل إبداعاً."
    },
    "Motivation|Substantiv": {
        exSwe: "Jag har tappat motivationen.",
        exArb: "فقدت الحافز."
    },
    "Ambition|Substantiv": {
        exSwe: "Hon har stora ambitioner.",
        exArb: "لديها طموحات كبيرة."
    },
    // ==========================================
    // EVERYDAY OBJECTS
    // ==========================================
    "Nyckel|Substantiv": {
        exSwe: "Jag har tappat mina nycklar.",
        exArb: "أضعت مفاتيحي."
    },
    "Plånbok|Substantiv": {
        exSwe: "Min plånbok blev stulen.",
        exArb: "سُرقت محفظتي."
    },
    "Paraply|Substantiv": {
        exSwe: "Ta med paraplyet, det ska regna.",
        exArb: "خذ المظلة، ستمطر."
    },
    "Batteri|Substantiv": {
        exSwe: "Batteriet är urladdat.",
        exArb: "البطارية فارغة."
    },
    "Laddare|Substantiv": {
        exSwe: "Kan jag låna din laddare?",
        exArb: "هل يمكنني استعارة شاحنك؟"
    },
    "Hörlurar|Substantiv": {
        exSwe: "Jag lyssnar på musik med hörlurar.",
        exArb: "أستمع للموسيقى بالسماعات."
    },
    "Ryggsäck|Substantiv": {
        exSwe: "Min ryggsäck är full med böcker.",
        exArb: "حقيبة ظهري مليئة بالكتب."
    },
    "Kuvert|Substantiv": {
        exSwe: "Lägg brevet i kuvertet.",
        exArb: "ضع الرسالة في الظرف."
    },
    "Frimärke|Substantiv": {
        exSwe: "Du behöver ett frimärke för att skicka brevet.",
        exArb: "تحتاج طابعاً بريدياً لإرسال الرسالة."
    },
    "Verktyg|Substantiv": {
        exSwe: "Verktygen ligger i garaget.",
        exArb: "الأدوات في المرآب."
    }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - NEW BATCH 14 (50 Common Nouns)');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0;
let alreadyHasExample = 0;
let notFound = 0;

for (const [key, example] of Object.entries(examples)) {
    const [targetWord, targetType] = key.split('|');
    let found = false;

    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        const entryWord = entry[2];
        const entryType = entry[1];

        const wordMatch = entryWord && entryWord.toLowerCase() === targetWord.toLowerCase();
        const typeMatch = !targetType || targetType === '' || (entryType && entryType.includes(targetType));

        if (wordMatch && typeMatch) {
            found = true;

            if (entry[7] && entry[7].trim() !== '') {
                alreadyHasExample++;
            } else {
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                addedCount++;
                console.log(`✓ ${entryWord} (${entryType || 'N/A'})`);
            }
            break;
        }
    }

    if (!found) {
        console.log(`❌ Not found: ${targetWord} (${targetType || 'any'})`);
        notFound++;
    }
}

const newDataStr = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';';
fs.writeFileSync('./data.js', newDataStr);

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`✅ Examples added: ${addedCount}`);
console.log(`⚠️  Already had examples: ${alreadyHasExample}`);
console.log(`❌ Not found: ${notFound}`);
console.log(`📊 Total attempted: ${Object.keys(examples).length}`);
console.log('═══════════════════════════════════════════════════════════════');
