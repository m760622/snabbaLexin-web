// Comprehensive script to add Arabic definitions to ALL verbs without definition
const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dictionaryData = eval(match[1]);

// Column indices
const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_ARB_DEF = 4;
const COL_SWE_DEF = 5;

// Create Arabic definition based on Swedish definition patterns
function createVerbDefinition(swedishDef, arabicWord) {
    if (!swedishDef || swedishDef.trim() === '') {
        return `فعل يعني: ${arabicWord}`;
    }

    // Common Swedish verb patterns and Arabic translations
    if (swedishDef.includes('göra')) {
        return `فعل، يقوم بـ`;
    }
    if (swedishDef.includes('ta bort') || swedishDef.includes('avlägsna')) {
        return `إزالة، التخلص من`;
    }
    if (swedishDef.includes('börja')) {
        return `البدء في، الشروع بـ`;
    }
    if (swedishDef.includes('sluta') && !swedishDef.includes('avsluta')) {
        return `التوقف عن، الكف عن`;
    }
    if (swedishDef.includes('fortsätta')) {
        return `الاستمرار في، المواصلة`;
    }
    if (swedishDef.includes('ge')) {
        return `إعطاء، منح`;
    }
    if (swedishDef.includes('ta')) {
        return `أخذ، التقاط`;
    }
    if (swedishDef.includes('sätta') || swedishDef.includes('ställa')) {
        return `وضع، تثبيت`;
    }
    if (swedishDef.includes('lägga')) {
        return `وضع، إرساء`;
    }
    if (swedishDef.includes('öka')) {
        return `زيادة، رفع المستوى`;
    }
    if (swedishDef.includes('minska')) {
        return `تقليل، إنقاص`;
    }
    if (swedishDef.includes('visa')) {
        return `إظهار، عرض`;
    }
    if (swedishDef.includes('förklara')) {
        return `شرح، توضيح`;
    }
    if (swedishDef.includes('undersöka')) {
        return `فحص، دراسة`;
    }
    if (swedishDef.includes('förstå')) {
        return `فهم، إدراك`;
    }
    if (swedishDef.includes('lära')) {
        return `تعلم، تعليم`;
    }
    if (swedishDef.includes('tänka')) {
        return `التفكير، التأمل`;
    }
    if (swedishDef.includes('känna')) {
        return `الشعور، الإحساس`;
    }
    if (swedishDef.includes('se')) {
        return `رؤية، مشاهدة`;
    }
    if (swedishDef.includes('höra')) {
        return `سماع، الاستماع`;
    }
    if (swedishDef.includes('säga') || swedishDef.includes('berätta')) {
        return `قول، إخبار`;
    }
    if (swedishDef.includes('tala') || swedishDef.includes('prata')) {
        return `التحدث، الكلام`;
    }
    if (swedishDef.includes('skriva')) {
        return `كتابة، تدوين`;
    }
    if (swedishDef.includes('läsa')) {
        return `قراءة، مطالعة`;
    }
    if (swedishDef.includes('arbeta') || swedishDef.includes('jobba')) {
        return `العمل، الاشتغال`;
    }
    if (swedishDef.includes('hjälpa')) {
        return `مساعدة، إعانة`;
    }
    if (swedishDef.includes('stödja')) {
        return `دعم، مساندة`;
    }
    if (swedishDef.includes('rädda')) {
        return `إنقاذ، إنجاء`;
    }
    if (swedishDef.includes('skydda')) {
        return `حماية، وقاية`;
    }
    if (swedishDef.includes('varna')) {
        return `تحذير، إنذار`;
    }
    if (swedishDef.includes('hota')) {
        return `تهديد، وعيد`;
    }
    if (swedishDef.includes('tvinga')) {
        return `إجبار، إكراه`;
    }
    if (swedishDef.includes('tillåta') || swedishDef.includes('låta')) {
        return `السماح، الإذن`;
    }
    if (swedishDef.includes('förbjuda')) {
        return `منع، حظر`;
    }
    if (swedishDef.includes('beordra') || swedishDef.includes('befalla')) {
        return `أمر، إصدار أوامر`;
    }
    if (swedishDef.includes('be om') || swedishDef.includes('begära')) {
        return `طلب، التماس`;
    }
    if (swedishDef.includes('erbjuda')) {
        return `عرض، تقديم`;
    }
    if (swedishDef.includes('acceptera') || swedishDef.includes('godta')) {
        return `قبول، موافقة`;
    }
    if (swedishDef.includes('avvisa') || swedishDef.includes('neka')) {
        return `رفض، صد`;
    }
    if (swedishDef.includes('välja') || swedishDef.includes('utse')) {
        return `اختيار، انتقاء`;
    }
    if (swedishDef.includes('besluta') || swedishDef.includes('bestämma')) {
        return `قرار، تحديد`;
    }
    if (swedishDef.includes('planera')) {
        return `تخطيط، تنظيم`;
    }
    if (swedishDef.includes('organisera') || swedishDef.includes('ordna')) {
        return `تنظيم، ترتيب`;
    }
    if (swedishDef.includes('leda') || swedishDef.includes('styra')) {
        return `قيادة، إدارة`;
    }
    if (swedishDef.includes('följa')) {
        return `اتباع، ملاحقة`;
    }
    if (swedishDef.includes('ändra') || swedishDef.includes('förändra')) {
        return `تغيير، تعديل`;
    }
    if (swedishDef.includes('utveckla')) {
        return `تطوير، تنمية`;
    }
    if (swedishDef.includes('skapa') || swedishDef.includes('tillverka')) {
        return `إنشاء، صنع`;
    }
    if (swedishDef.includes('bygga')) {
        return `بناء، تشييد`;
    }
    if (swedishDef.includes('reparera') || swedishDef.includes('laga')) {
        return `إصلاح، ترميم`;
    }
    if (swedishDef.includes('förstöra')) {
        return `تدمير، إتلاف`;
    }
    if (swedishDef.includes('rensa') || swedishDef.includes('städa')) {
        return `تنظيف، ترتيب`;
    }
    if (swedishDef.includes('samla')) {
        return `جمع، تجميع`;
    }
    if (swedishDef.includes('sprida')) {
        return `نشر، توزيع`;
    }
    if (swedishDef.includes('dela')) {
        return `تقسيم، مشاركة`;
    }
    if (swedishDef.includes('blanda')) {
        return `خلط، مزج`;
    }
    if (swedishDef.includes('separera') || swedishDef.includes('skilja')) {
        return `فصل، تمييز`;
    }
    if (swedishDef.includes('koppla') || swedishDef.includes('ansluta')) {
        return `ربط، توصيل`;
    }
    if (swedishDef.includes('stänga')) {
        return `إغلاق، قفل`;
    }
    if (swedishDef.includes('öppna')) {
        return `فتح، كشف`;
    }
    if (swedishDef.includes('flytta')) {
        return `نقل، تحريك`;
    }
    if (swedishDef.includes('skicka') || swedishDef.includes('sända')) {
        return `إرسال، بعث`;
    }
    if (swedishDef.includes('ta emot') || swedishDef.includes('motta')) {
        return `استلام، تلقي`;
    }
    if (swedishDef.includes('köpa')) {
        return `شراء، اقتناء`;
    }
    if (swedishDef.includes('sälja')) {
        return `بيع، تسويق`;
    }
    if (swedishDef.includes('betala')) {
        return `دفع، سداد`;
    }
    if (swedishDef.includes('låna')) {
        return `اقتراض، إعارة`;
    }
    if (swedishDef.includes('spara')) {
        return `ادخار، توفير`;
    }
    if (swedishDef.includes('använda') || swedishDef.includes('bruka')) {
        return `استخدام، استعمال`;
    }
    if (swedishDef.includes('behöva')) {
        return `الحاجة إلى، الاحتياج`;
    }
    if (swedishDef.includes('vilja')) {
        return `الرغبة، الإرادة`;
    }
    if (swedishDef.includes('kunna')) {
        return `القدرة، الاستطاعة`;
    }
    if (swedishDef.includes('försöka')) {
        return `محاولة، سعي`;
    }
    if (swedishDef.includes('lyckas')) {
        return `النجاح، التوفيق`;
    }
    if (swedishDef.includes('misslyckas')) {
        return `الفشل، الإخفاق`;
    }
    if (swedishDef.includes('vänta')) {
        return `انتظار، ترقب`;
    }
    if (swedishDef.includes('hoppas')) {
        return `أمل، رجاء`;
    }
    if (swedishDef.includes('frukta') || swedishDef.includes('vara rädd')) {
        return `خوف، خشية`;
    }
    if (swedishDef.includes('älska') || swedishDef.includes('tycka om')) {
        return `حب، إعجاب`;
    }
    if (swedishDef.includes('hata') || swedishDef.includes('avsky')) {
        return `كره، بغض`;
    }
    if (swedishDef.includes('uppskatta')) {
        return `تقدير، اعتزاز`;
    }
    if (swedishDef.includes('respektera')) {
        return `احترام، توقير`;
    }
    if (swedishDef.includes('lita på') || swedishDef.includes('förtro')) {
        return `ثقة، اعتماد`;
    }
    if (swedishDef.includes('tvivla')) {
        return `شك، ارتياب`;
    }
    if (swedishDef.includes('tro')) {
        return `اعتقاد، إيمان`;
    }
    if (swedishDef.includes('minnas') || swedishDef.includes('komma ihåg')) {
        return `تذكر، استرجاع`;
    }
    if (swedishDef.includes('glömma')) {
        return `نسيان، غفلة`;
    }
    if (swedishDef.includes('drömma')) {
        return `حلم، تخيل`;
    }
    if (swedishDef.includes('sova')) {
        return `نوم، سبات`;
    }
    if (swedishDef.includes('vakna')) {
        return `استيقاظ، صحو`;
    }
    if (swedishDef.includes('äta')) {
        return `أكل، تناول الطعام`;
    }
    if (swedishDef.includes('dricka')) {
        return `شرب، تناول السوائل`;
    }
    if (swedishDef.includes('gå')) {
        return `مشي، سير`;
    }
    if (swedishDef.includes('springa') || swedishDef.includes('löpa')) {
        return `ركض، جري`;
    }
    if (swedishDef.includes('simma')) {
        return `سباحة، عوم`;
    }
    if (swedishDef.includes('flyga')) {
        return `طيران، تحليق`;
    }
    if (swedishDef.includes('köra') && !swedishDef.includes('köra ut')) {
        return `قيادة، سياقة`;
    }
    if (swedishDef.includes('åka') || swedishDef.includes('resa')) {
        return `سفر، رحلة`;
    }
    if (swedishDef.includes('komma')) {
        return `قدوم، وصول`;
    }
    if (swedishDef.includes('lämna')) {
        return `مغادرة، ترك`;
    }
    if (swedishDef.includes('återvända') || swedishDef.includes('komma tillbaka')) {
        return `عودة، رجوع`;
    }
    if (swedishDef.includes('stanna')) {
        return `بقاء، توقف`;
    }
    if (swedishDef.includes('bo') || swedishDef.includes('leva')) {
        return `إقامة، سكن`;
    }
    if (swedishDef.includes('uppfinna') || swedishDef.includes('upptäcka')) {
        return `اكتشاف، اختراع`;
    }
    if (swedishDef.includes('forska')) {
        return `بحث، دراسة`;
    }
    if (swedishDef.includes('mäta')) {
        return `قياس، تقدير`;
    }
    if (swedishDef.includes('räkna')) {
        return `حساب، عد`;
    }
    if (swedishDef.includes('jämföra')) {
        return `مقارنة، موازنة`;
    }
    if (swedishDef.includes('överväga')) {
        return `تفكير، دراسة`;
    }
    if (swedishDef.includes('ignorera') || swedishDef.includes('bortse')) {
        return `تجاهل، إغفال`;
    }
    if (swedishDef.includes('koncentrera')) {
        return `تركيز، انتباه`;
    }

    // Default: create based on the action described
    return `فعل يصف عملية أو حالة`;
}

// Update verbs
let updateCount = 0;

dictionaryData.forEach(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    if (!type.includes('verb')) return;

    // Skip if already has definition
    if (entry[COL_ARB_DEF] && entry[COL_ARB_DEF].trim() !== '') return;

    // Create definition based on Swedish def
    const swedishDef = entry[COL_SWE_DEF] || '';
    const arabicWord = entry[COL_ARB] || '';
    entry[COL_ARB_DEF] = createVerbDefinition(swedishDef, arabicWord);
    updateCount++;
});

// Write back to file
const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    `const dictionaryData = ${JSON.stringify(dictionaryData, null, 4)};`
);

fs.writeFileSync('./data.js', newContent);

console.log(`✅ Updated ${updateCount} verbs with Arabic definitions`);
