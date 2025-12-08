/**
 * دفعات 46-50: إضافة أمثلة للأفعال المتبقية
 */
const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

const verbExamples = {
    // الأفعال من القائمة الحالية
    "Söndrar": { exSwe: "De söndrar papperet i bitar.", exArb: "يمزقون الورق قطعاً." },
    "Tisslar": { exSwe: "De tisslar och tasslar om grannen.", exArb: "يتهامسون عن الجار." },
    "Tjafsar": { exSwe: "De tjafsar om småsaker.", exArb: "يتشاجرون على أمور تافهة." },
    "Tjallar": { exSwe: "Han tjallar till polisen.", exArb: "يبلغ الشرطة." },
    "Trallar": { exSwe: "Hon trallar en melodi.", exArb: "تترنم بلحن." },
    "Trummar": { exSwe: "Han trummar på bordet.", exArb: "يقرع على الطاولة." },
    "Trycker": { exSwe: "Han trycker på knappen.", exArb: "يضغط على الزر." },
    "Tröskar": { exSwe: "Bonden tröskar vetet.", exArb: "المزارع يدرس القمح." },

    // U-V-W-Å verbs
    "Urartar": { exSwe: "Festen urartar.", exArb: "الحفلة تفلت من السيطرة." },
    "Urskuldrar": { exSwe: "Han urskuldar sig.", exArb: "يعتذر." },
    "Utartar": { exSwe: "Situationen utartar.", exArb: "الوضع يتدهور." },
    "Utbildar": { exSwe: "Universitetet utbildar läkare.", exArb: "الجامعة تدرب الأطباء." },
    "Utbrister": { exSwe: "Hon utbrister i gråt.", exArb: "تنفجر بالبكاء." },
    "Utdelar": { exSwe: "De utdelar priser.", exArb: "يوزعون الجوائز." },
    "Utför": { exSwe: "Han utför arbetet.", exArb: "ينفذ العمل." },
    "Utgör": { exSwe: "Det utgör ett problem.", exArb: "يشكل مشكلة." },
    "Utlöser": { exSwe: "Knappen utlöser alarmet.", exArb: "الزر يفعل الإنذار." },
    "Utmärker": { exSwe: "Kvalitet utmärker produkten.", exArb: "الجودة تميز المنتج." },
    "Utnyttjar": { exSwe: "Han utnyttjar möjligheten.", exArb: "يستغل الفرصة." },
    "Utrustar": { exSwe: "De utrustar soldaterna.", exArb: "يجهزون الجنود." },
    "Utspelar": { exSwe: "Händelsen utspelar sig här.", exArb: "الحدث يجري هنا." },
    "Uttalar": { exSwe: "Hon uttalar ordet rätt.", exArb: "تنطق الكلمة صحيحاً." },
    "Uttömar": { exSwe: "De uttömar förrådet.", exArb: "يستنزفون المخزون." },
    "Vajar": { exSwe: "Flaggan vajar i vinden.", exArb: "العلم يرفرف في الريح." },
    "Valsar": { exSwe: "De valsar på dansgolvet.", exArb: "يرقصون الفالس على حلبة الرقص." },
    "Vanklar": { exSwe: "Han vanklar hem.", exArb: "يترنح إلى البيت." },
    "Vankrar": { exSwe: "Mannen vankrar längs gatan.", exArb: "الرجل يتجول في الشارع." },
    "Vaplar": { exSwe: "Hon vaplar runt utan mål.", exArb: "تتمايل بلا هدف." },
    "Varar": { exSwe: "Mötet varar i två timmar.", exArb: "الاجتماع يستمر ساعتين." },
    "Vargar": { exSwe: "Han vargar i sig maten.", exArb: "يلتهم الطعام." },
    "Varnar": { exSwe: "Skylten varnar för fara.", exArb: "اللافتة تحذر من الخطر." },
    "Varslar": { exSwe: "Företaget varslar om uppsägningar.", exArb: "الشركة تعلن عن تسريحات." },
    "Varvar": { exSwe: "Han varvar upp motorn.", exArb: "يرفع دورات المحرك." },
    "Vattar": { exSwe: "Hon vattar blommorna.", exArb: "تسقي الزهور." },
    "Vecklar": { exSwe: "Han vecklar ut kartan.", exArb: "يفتح الخريطة." },
    "Veknar": { exSwe: "Hon veknar för hans böner.", exArb: "تلين لتوسلاته." },
    "Velar": { exSwe: "Han velar om beslutet.", exArb: "يتردد في القرار." },
    "Ventilerar": { exSwe: "De ventilerar rummet.", exArb: "يهوون الغرفة." },
    "Verkar": { exSwe: "Det verkar bra.", exArb: "يبدو جيداً." },
    "Vibrar": { exSwe: "Telefonen vibrerar.", exArb: "الهاتف يهتز." },
    "Vidgar": { exSwe: "De vidgar vägen.", exArb: "يوسعون الطريق." },
    "Vidmakthåller": { exSwe: "De vidmakthåller ordningen.", exArb: "يحافظون على النظام." },
    "Vijar": { exSwe: "Golvet vijar under vikten.", exArb: "الأرضية تنحني تحت الوزن." },
    "Vikar": { exSwe: "Hon vikar för sin kollega.", exArb: "تنوب عن زميلتها." },
    "Viker": { exSwe: "Hon viker papper.", exArb: "تطوي الورق." },
    "Vilar": { exSwe: "Han vilar på soffan.", exArb: "يستريح على الأريكة." },
    "Villas": { exSwe: "Han villas bort i skogen.", exArb: "يتوه في الغابة." },
    "Vimlar": { exSwe: "Det vimlar av folk.", exArb: "يعج بالناس." },
    "Vindlar": { exSwe: "Vägen vindlar genom bergen.", exArb: "الطريق يتعرج عبر الجبال." },
    "Vinkar": { exSwe: "Barnet vinkar till mamma.", exArb: "الطفل يلوح لأمه." },
    "Vinnar": { exSwe: "Laget vinnar matchen.", exArb: "الفريق يفوز بالمباراة." },
    "Vintrar": { exSwe: "Djuren vintrar i bon.", exArb: "الحيوانات تقضي الشتاء في الأوكار." },
    "Virar": { exSwe: "Hon virar halsduken runt halsen.", exArb: "تلف الوشاح حول رقبتها." },
    "Virrar": { exSwe: "Han virrar bort sig.", exArb: "يضل طريقه." },
    "Virvar": { exSwe: "Tankarna virvar i huvudet.", exArb: "الأفكار تدور في الرأس." },
    "Viskar": { exSwe: "Hon viskar i hans öra.", exArb: "تهمس في أذنه." },
    "Vispar": { exSwe: "Hon vispar ägg.", exArb: "تخفق البيض." },
    "Visslar": { exSwe: "Han visslar en melodi.", exArb: "يصفر لحناً." },
    "Vissnar": { exSwe: "Blommorna vissnar utan vatten.", exArb: "الزهور تذبل بدون ماء." },
    "Vistar": { exSwe: "De vistar i stugan.", exArb: "يقيمون في الكوخ." },
    "Vitnar": { exSwe: "Himlen vitnar.", exArb: "السماء تبيض." },
    "Vittnar": { exSwe: "Hon vittnar i rätten.", exArb: "تشهد في المحكمة." },
    "Vittrar": { exSwe: "Stenen vittrar.", exArb: "الحجر يتفتت." },
    "Väljer": { exSwe: "Han väljer en bok.", exArb: "يختار كتاباً." },
    "Vänder": { exSwe: "Hon vänder sidan.", exArb: "تقلب الصفحة." },
    "Vänjer": { exSwe: "Han vänjer sig vid klimatet.", exArb: "يتأقلم مع المناخ." },
    "Väntar": { exSwe: "Hon väntar på bussen.", exArb: "تنتظر الحافلة." },
    "Värdar": { exSwe: "De värdar festen.", exArb: "يستضيفون الحفلة." },
    "Värker": { exSwe: "Tanden värker.", exArb: "السن يؤلم." },
    "Värmer": { exSwe: "Solen värmer.", exArb: "الشمس تدفئ." },
    "Värnar": { exSwe: "De värnar om miljön.", exArb: "يحافظون على البيئة." },
    "Väser": { exSwe: "Ormen väser.", exArb: "الأفعى تفح." },
    "Väver": { exSwe: "Hon väver en matta.", exArb: "تنسج سجادة." },
    "Växer": { exSwe: "Barnet växer snabbt.", exArb: "الطفل ينمو بسرعة." },
    "Växlar": { exSwe: "Han växlar pengar.", exArb: "يصرف المال." },
    "Vågar": { exSwe: "Hon vågar inte hoppa.", exArb: "لا تجرؤ على القفز." },
    "Vårdar": { exSwe: "Hon vårdar trädgården.", exArb: "تعتني بالحديقة." },
    "Våtnar": { exSwe: "Marken våtnar av regn.", exArb: "الأرض تبتل من المطر." },
    "Åker": { exSwe: "Han åker till jobbet.", exArb: "يذهب إلى العمل." },
    "Ålar": { exSwe: "Han ålar sig under staketet.", exArb: "يتسلل تحت السياج." },
    "Åmar": { exSwe: "Han åmar sig framåt.", exArb: "يندفع للأمام." },
    "Ångrar": { exSwe: "Han ångrar sitt beslut.", exArb: "يندم على قراره." },
    "Återgår": { exSwe: "De återgår till arbetet.", exArb: "يعودون للعمل." },
    "Återvänder": { exSwe: "Han återvänder hem.", exArb: "يعود للبيت." },
    "Äger": { exSwe: "Hon äger ett hus.", exArb: "تملك بيتاً." },
    "Älskar": { exSwe: "Hon älskar sin familj.", exArb: "تحب عائلتها." },
    "Ämnar": { exSwe: "Han ämnar resa.", exArb: "ينوي السفر." },
    "Ändrar": { exSwe: "Han ändrar planen.", exArb: "يغير الخطة." },
    "Ärar": { exSwe: "De ärar hjältarna.", exArb: "يكرمون الأبطال." },
    "Ärvar": { exSwe: "Hon ärvar huset.", exArb: "ترث البيت." },
    "Ättar": { exSwe: "Han ättar från en kunglig familj.", exArb: "ينحدر من عائلة ملكية." },
    "Ökar": { exSwe: "Priserna ökar.", exArb: "الأسعار ترتفع." },
    "Öppnar": { exSwe: "Han öppnar dörren.", exArb: "يفتح الباب." },
    "Övar": { exSwe: "Hon övar piano.", exArb: "تتدرب على البيانو." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة 46-50');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0, alreadyHasExample = 0, notFound = 0;
for (const [targetWord, example] of Object.entries(verbExamples)) {
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
            found = true;
            if (entry[7] && entry[7].trim() !== '') { alreadyHasExample++; }
            else { dictionaryData[i][7] = example.exSwe; dictionaryData[i][8] = example.exArb; addedCount++; console.log(`✅ ${entry[2]}`); }
            break;
        }
    }
    if (!found) notFound++;
}
fs.writeFileSync('./data.js', 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';');
console.log(`\n✅ المضافة: ${addedCount} | ⚠️ موجودة: ${alreadyHasExample} | ❌ غير موجودة: ${notFound}`);
