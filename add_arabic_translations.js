/**
 * إضافة الترجمات العربية للإدخالات الناقصة
 * Add Arabic translations for entries that need them
 */

const fs = require('fs');

// Load data
const dataContent = fs.readFileSync('data.js', 'utf8');
const startIndex = dataContent.indexOf('[');

let dictionaryData;
try {
    dictionaryData = eval(dataContent.slice(startIndex));
} catch (e) {
    console.error('Error parsing data:', e);
    process.exit(1);
}

console.log(`\n📚 Total entries: ${dictionaryData.length}\n`);

// Arabic translations for the entries
const translations = {
    // Nouns (Substantiv)
    'ADDED100002': { explanation: 'سيارة إطفاء، مركبة تستخدم لإخماد الحرائق' },
    'ADDED100003': { explanation: 'سيارة شرطة، مركبة تستخدمها الشرطة' },
    'ADDED100004': { explanation: 'سوبرماركت، متجر كبير للتسوق' },
    'ADDED100005': { explanation: 'بريد إلكتروني، رسائل عبر الإنترنت' },
    'ADDED100006': { explanation: 'سباحة، رياضة السباحة في الماء' },
    'ADDED100008': { explanation: 'موقف سيارات، مكان لركن السيارات' },
    'ADDED100009': { explanation: 'محطة وقود، مكان لتعبئة الوقود' },
    'ADDED100010': { explanation: 'رضيع، طفل صغير' },
    'ADDED100011': { explanation: 'جوارب، ما يُلبس على القدمين' },
    'ADDED100012': { explanation: 'شباشب، نعال منزلية' },
    'ADDED100013': { explanation: 'صنادل، أحذية صيفية مفتوحة' },
    'ADDED100017': { explanation: 'إبريق ماء، وعاء لسقي النباتات' },
    'ADDED100018': { explanation: 'دواء للسعال، علاج الكحة' },
    'ADDED100020': { explanation: 'كرسي هزاز، كرسي يتحرك للأمام والخلف' },
    'ADDED100023': { explanation: 'توابل، بهارات تُستخدم في الطبخ' },
    'ADDED100025': { explanation: 'يوغا، تمارين للاسترخاء والتأمل' },
    'ADDED100026': { explanation: 'خَبْز، صنع الخبز والمعجنات' },
    'ADDED100027': { explanation: 'جدول أعمال، قائمة المهام والمواعيد' },
    'ADDED100028': { explanation: 'خوارزمية، مجموعة خطوات لحل مشكلة' },
    'ADDED100029': { explanation: 'طموح، رغبة قوية في النجاح' },

    // Verbs (Verb)
    'ADDED200003': { explanation: 'يحلق ذقنه، يزيل شعر الوجه' },
    'ADDED200004': { explanation: 'يضع مكياج، يتجمّل' },
    'ADDED200005': { explanation: 'يعترف، يُفضي بأسراره للكاهن' },
    'ADDED200009': { explanation: 'يطبخ، يُعدّ الطعام' },
    'ADDED200010': { explanation: 'يُفرّغ، يُخرج الأشياء من العبوة' },
    'ADDED200012': { explanation: 'ركوب الخيل، رياضة الفروسية' },
    'ADDED200013': { explanation: 'ركوب الدراجة، رياضة الدراجات' },
    'ADDED200014': { explanation: 'تمارين رياضية، جمباز' },
    'ADDED200016': { explanation: 'صندوق السيارة، مكان الأمتعة خلف السيارة' },
    'ADDED200028': { explanation: 'ينحني، يُحيّي بالانحناء' },
    'ADDED200029': { explanation: 'يُرسل فاكس، يُرسل وثيقة عبر الفاكس' },
    'ADDED200030': { explanation: 'يُغازل، يُحاول جذب انتباه شخص' },
    'ADDED200031': { explanation: 'يُركّز، يُوجّه الانتباه' },
    'ADDED200032': { explanation: 'يمسك، يقبض على شيء' },
    'ADDED200033': { explanation: 'ينهار، يسقط فجأة' },
    'ADDED200034': { explanation: 'يمسح الأرض، ينظف بالممسحة' },
    'ADDED200035': { explanation: 'يُزيّن، يُجمّل المكان' },
    'ADDED200036': { explanation: 'يُصاب بالذعر، يفقد السيطرة من الخوف' },
    'ADDED200037': { explanation: 'يُلغي الحجز، يُبطل موعداً محجوزاً' },
    'ADDED200038': { explanation: 'يُموّه، يُخفي بالتمويه' },
    'ADDED200039': { explanation: 'يستنسخ، يُنتج نسخة مطابقة' },
    'ADDED200040': { explanation: 'يُكبّر للحد الأقصى، يزيد للأقصى' },
    'ADDED200041': { explanation: 'يُصغّر للحد الأدنى، يُقلّل للأدنى' },
    'ADDED200042': { explanation: 'يستهلك، يستخدم ويُنفق' },

    // Adjectives (Adjektiv)
    'ADDED200018': { explanation: 'مُتأمّل، يُفكّر بعمق' },
    'ADDED200019': { explanation: 'مُسترخٍ، هادئ ومرتاح' },
    'ADDED200020': { explanation: 'مُلهَم، مليء بالإلهام والحماس' },
    'ADDED200023': { explanation: 'كحولي، يحتوي على كحول' },
    'ADDED200024': { explanation: 'تشريحي، متعلق بعلم التشريح' },
    'ADDED200025': { explanation: 'عربي، متعلق بالعرب أو اللغة العربية' },
    'ADDED200026': { explanation: 'فلكي، متعلق بعلم الفلك والنجوم' },
    'ADDED200027': { explanation: 'رياضي، قوي البنية' },
    'ADDED300002': { explanation: 'متعلق بالجناس، قلب ترتيب الحروف' },
    'ADDED300004': { explanation: 'معماري، متعلق بفن العمارة' },

    // More nouns
    'ADDED300003': { explanation: 'حساب، علم العمليات الحسابية' },
    'ADDED300005': { explanation: 'خفّاقة كهربائية، أداة لخفق الطعام' },
    'ADDED300006': { explanation: 'آلية، نظام تلقائي' },
    'ADDED300007': { explanation: 'إنهاء، ختام أو نهاية' },
    'ADDED300011': { explanation: 'إيثار، تفضيل مصلحة الآخرين' },

    // Special cases
    'Lexin033609': { explanation: 'فصيلة عسكرية صغيرة، وحدة من الجنود' },  // Pluton = فصيلة
    'ADDED200000': { explanation: 'في اليوم التالي، بعد اليوم' },  // Imorgon = غداً
    'ADDED300000': { explanation: 'مستقيم، بشكل مباشر' },  // Rakt = مستقيماً
    'ADDED300009': { explanation: 'مُطهّرات، مواد لقتل الجراثيم' },  // Antiseptika
};

let updatedCount = 0;

console.log('🔧 Adding Arabic translations:\n');

for (const entry of dictionaryData) {
    const id = entry[0];

    if (translations[id]) {
        const trans = translations[id];

        console.log(`ID: ${id}`);
        console.log(`  Swedish: ${entry[2]}`);
        console.log(`  Adding explanation: "${trans.explanation}"`);

        // Update field 4 (Arabic explanation)
        entry[4] = trans.explanation;

        updatedCount++;
        console.log('  ✓ Updated\n');
    }
}

console.log('='.repeat(60));
console.log(`📊 Updated ${updatedCount} entries with Arabic translations`);

if (updatedCount > 0) {
    // Backup original
    const backupName = `data.js.backup_arabic_trans_${Date.now()}`;
    fs.writeFileSync(backupName, dataContent, 'utf8');
    console.log(`📦 Backup saved to: ${backupName}`);

    // Generate new data.js content
    const newContent = `const dictionaryData = ${JSON.stringify(dictionaryData, null, 2)};`;

    // Write fixed data
    fs.writeFileSync('data.js', newContent, 'utf8');
    console.log('💾 Updated data saved to: data.js');
}

console.log('\n✨ Done!\n');
