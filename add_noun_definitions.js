// Comprehensive script to add Arabic definitions to ALL nouns without definition
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
function createNounDefinition(swedishDef, arabicWord) {
    if (!swedishDef || swedishDef.trim() === '') {
        return `اسم يشير إلى: ${arabicWord}`;
    }

    // Common Swedish noun patterns and Arabic translations
    if (swedishDef.includes('person som')) {
        return `شخص يقوم بعمل أو له صفة معينة`;
    }
    if (swedishDef.includes('man som') || swedishDef.includes('kvinna som')) {
        return `شخص يقوم بعمل أو مهنة معينة`;
    }
    if (swedishDef.includes('plats där') || swedishDef.includes('ställe där')) {
        return `مكان معين أو موقع`;
    }
    if (swedishDef.includes('känsla av') || swedishDef.includes('att känna')) {
        return `شعور أو إحساس`;
    }
    if (swedishDef.includes('handling att') || swedishDef.includes('det att')) {
        return `فعل أو عملية`;
    }
    if (swedishDef.includes('egenskap att') || swedishDef.includes('tillstånd')) {
        return `صفة أو حالة`;
    }
    if (swedishDef.includes('tidpunkt') || swedishDef.includes('period') || swedishDef.includes('tid då')) {
        return `فترة زمنية أو وقت`;
    }
    if (swedishDef.includes('grupp av') || swedishDef.includes('samling av')) {
        return `مجموعة أو تجمع`;
    }
    if (swedishDef.includes('mängd av') || swedishDef.includes('stor mängd')) {
        return `كمية أو مقدار`;
    }
    if (swedishDef.includes('verktyg för') || swedishDef.includes('redskap')) {
        return `أداة أو وسيلة`;
    }
    if (swedishDef.includes('maskin som') || swedishDef.includes('apparat')) {
        return `آلة أو جهاز`;
    }
    if (swedishDef.includes('medicin') || swedishDef.includes('läkemedel') || swedishDef.includes('medicinskt')) {
        return `دواء أو علاج طبي`;
    }
    if (swedishDef.includes('sjukdom') || swedishDef.includes('åkomma')) {
        return `مرض أو حالة صحية`;
    }
    if (swedishDef.includes('djur') || swedishDef.includes('fisken') || swedishDef.includes('fågel') || swedishDef.includes('insekt')) {
        return `حيوان أو كائن حي`;
    }
    if (swedishDef.includes('växt') || swedishDef.includes('träd') || swedishDef.includes('blomma') || swedishDef.includes('grönsak')) {
        return `نبات أو شجرة`;
    }
    if (swedishDef.includes('frukt') || swedishDef.includes('bär')) {
        return `فاكهة أو ثمرة`;
    }
    if (swedishDef.includes('mat') || swedishDef.includes('maträtt') || swedishDef.includes('födoämne')) {
        return `طعام أو وجبة`;
    }
    if (swedishDef.includes('dryck') || swedishDef.includes('läsk') || swedishDef.includes('alkohol')) {
        return `مشروب أو شراب`;
    }
    if (swedishDef.includes('klädesplagg') || swedishDef.includes('plagg') || swedishDef.includes('klänning')) {
        return `قطعة ملابس أو لباس`;
    }
    if (swedishDef.includes('möbel') || swedishDef.includes('stol') || swedishDef.includes('bord')) {
        return `قطعة أثاث`;
    }
    if (swedishDef.includes('byggnad') || swedishDef.includes('hus') || swedishDef.includes('lokal')) {
        return `مبنى أو منشأة`;
    }
    if (swedishDef.includes('fordon') || swedishDef.includes('bil') || swedishDef.includes('båt') || swedishDef.includes('flygplan')) {
        return `وسيلة نقل أو مركبة`;
    }
    if (swedishDef.includes('yrke') || swedishDef.includes('arbete med') || swedishDef.includes('arbete som')) {
        return `مهنة أو حرفة`;
    }
    if (swedishDef.includes('vetenskap') || swedishDef.includes('lära om') || swedishDef.includes('studium')) {
        return `علم أو دراسة`;
    }
    if (swedishDef.includes('sport') || swedishDef.includes('idrott') || swedishDef.includes('spel')) {
        return `رياضة أو لعبة`;
    }
    if (swedishDef.includes('musik') || swedishDef.includes('instrument') || swedishDef.includes('sang') || swedishDef.includes('melodi')) {
        return `موسيقى أو آلة موسيقية`;
    }
    if (swedishDef.includes('konst') || swedishDef.includes('målning') || swedishDef.includes('skulptur')) {
        return `فن أو عمل فني`;
    }
    if (swedishDef.includes('bok') || swedishDef.includes('text') || swedishDef.includes('dokument') || swedishDef.includes('skrift')) {
        return `كتاب أو نص مكتوب`;
    }
    if (swedishDef.includes('film') || swedishDef.includes('teater') || swedishDef.includes('drama')) {
        return `فيلم أو عمل درامي`;
    }
    if (swedishDef.includes('religion') || swedishDef.includes('kyrka') || swedishDef.includes('tro') || swedishDef.includes('gudstjänst')) {
        return `دين أو شيء متعلق بالدين`;
    }
    if (swedishDef.includes('politik') || swedishDef.includes('regering') || swedishDef.includes('stat') || swedishDef.includes('parti')) {
        return `سياسة أو أمر حكومي`;
    }
    if (swedishDef.includes('lag') || swedishDef.includes('rätt') || swedishDef.includes('domstol') || swedishDef.includes('juridisk')) {
        return `قانون أو أمر قضائي`;
    }
    if (swedishDef.includes('ekonomi') || swedishDef.includes('pengar') || swedishDef.includes('valuta') || swedishDef.includes('pris')) {
        return `اقتصاد أو أمر مالي`;
    }
    if (swedishDef.includes('krig') || swedishDef.includes('militär') || swedishDef.includes('vapen') || swedishDef.includes('soldat')) {
        return `حرب أو أمر عسكري`;
    }
    if (swedishDef.includes('teknik') || swedishDef.includes('dator') || swedishDef.includes('internet') || swedishDef.includes('program')) {
        return `تقنية أو أمر تكنولوجي`;
    }
    if (swedishDef.includes('kemisk') || swedishDef.includes('ämne') || swedishDef.includes('grundämne')) {
        return `مادة كيميائية`;
    }
    if (swedishDef.includes('metall') || swedishDef.includes('mineral')) {
        return `معدن أو مادة`;
    }
    if (swedishDef.includes('färg')) {
        return `لون أو صبغة`;
    }
    if (swedishDef.includes('form') || swedishDef.includes('figur') || swedishDef.includes('geometri')) {
        return `شكل أو صورة`;
    }
    if (swedishDef.includes('storlek') || swedishDef.includes('mått') || swedishDef.includes('dimension')) {
        return `حجم أو قياس`;
    }
    if (swedishDef.includes('ljud') || swedishDef.includes('buller') || swedishDef.includes('ton')) {
        return `صوت أو ضجيج`;
    }
    if (swedishDef.includes('ljus') || swedishDef.includes('lampa') || swedishDef.includes('belysning')) {
        return `ضوء أو إضاءة`;
    }
    if (swedishDef.includes('värme') || swedishDef.includes('temperatur') || swedishDef.includes('kyla')) {
        return `حرارة أو درجة حرارة`;
    }
    if (swedishDef.includes('väder') || swedishDef.includes('klimat') || swedishDef.includes('regn') || swedishDef.includes('sol')) {
        return `طقس أو مناخ`;
    }
    if (swedishDef.includes('vatten') || swedishDef.includes('hav') || swedishDef.includes('sjö') || swedishDef.includes('flod')) {
        return `ماء أو مسطح مائي`;
    }
    if (swedishDef.includes('berg') || swedishDef.includes('skog') || swedishDef.includes('natur')) {
        return `طبيعة أو تضاريس`;
    }
    if (swedishDef.includes('land') || swedishDef.includes('geografisk') || swedishDef.includes('kontinent')) {
        return `بلد أو منطقة جغرافية`;
    }
    if (swedishDef.includes('språk') || swedishDef.includes('ord') || swedishDef.includes('grammatik')) {
        return `لغة أو مصطلح لغوي`;
    }
    if (swedishDef.includes('ordklass') || swedishDef.includes('satsdel')) {
        return `مصطلح نحوي أو لغوي`;
    }
    if (swedishDef.includes('bok') || swedishDef.includes('stav')) {
        return `حرف أو رمز`;
    }
    if (swedishDef.includes('siffra') || swedishDef.includes('tal') || swedishDef.includes('nummer') || swedishDef.includes('antal')) {
        return `رقم أو عدد`;
    }
    if (swedishDef.includes('dag') || swedishDef.includes('vecka') || swedishDef.includes('månad') || swedishDef.includes('år')) {
        return `يوم أو فترة زمنية`;
    }
    if (swedishDef.includes('fest') || swedishDef.includes('högtid') || swedishDef.includes('firande')) {
        return `احتفال أو مناسبة`;
    }
    if (swedishDef.includes('familj') || swedishDef.includes('släkt') || swedishDef.includes('förälder') || swedishDef.includes('barn')) {
        return `عائلة أو قرابة`;
    }
    if (swedishDef.includes('vän') || swedishDef.includes('relation') || swedishDef.includes('kontakt')) {
        return `صداقة أو علاقة`;
    }
    if (swedishDef.includes('känsla') || swedishDef.includes('emotion') || swedishDef.includes('sinne')) {
        return `شعور أو عاطفة`;
    }
    if (swedishDef.includes('tanke') || swedishDef.includes('idé') || swedishDef.includes('uppfattning')) {
        return `فكرة أو مفهوم`;
    }
    if (swedishDef.includes('minne') || swedishDef.includes('hågkomst')) {
        return `ذاكرة أو تذكر`;
    }
    if (swedishDef.includes('dröm') || swedishDef.includes('fantasi') || swedishDef.includes('önskan')) {
        return `حلم أو خيال`;
    }
    if (swedishDef.includes('plan') || swedishDef.includes('strategi') || swedishDef.includes('mål')) {
        return `خطة أو هدف`;
    }
    if (swedishDef.includes('problem') || swedishDef.includes('svårighet') || swedishDef.includes('utmaning')) {
        return `مشكلة أو تحدي`;
    }
    if (swedishDef.includes('lösning') || swedishDef.includes('svar') || swedishDef.includes('resultat')) {
        return `حل أو نتيجة`;
    }
    if (swedishDef.includes('förändring') || swedishDef.includes('utveckling') || swedishDef.includes('framsteg')) {
        return `تغيير أو تطور`;
    }
    if (swedishDef.includes('början') || swedishDef.includes('start') || swedishDef.includes('inledning')) {
        return `بداية أو انطلاق`;
    }
    if (swedishDef.includes('slut') || swedishDef.includes('avslutning') || swedishDef.includes('ände')) {
        return `نهاية أو ختام`;
    }
    if (swedishDef.includes('del') || swedishDef.includes('bit') || swedishDef.includes('stycke')) {
        return `جزء أو قطعة`;
    }
    if (swedishDef.includes('helhet') || swedishDef.includes('enhet') || swedishDef.includes('system')) {
        return `كل أو نظام`;
    }
    if (swedishDef.includes('typ') || swedishDef.includes('sort') || swedishDef.includes('slag') || swedishDef.includes('art')) {
        return `نوع أو صنف`;
    }
    if (swedishDef.includes('exempel') || swedishDef.includes('prov') || swedishDef.includes('fall')) {
        return `مثال أو حالة`;
    }
    if (swedishDef.includes('regel') || swedishDef.includes('norm') || swedishDef.includes('princip')) {
        return `قاعدة أو مبدأ`;
    }
    if (swedishDef.includes('metod') || swedishDef.includes('sätt') || swedishDef.includes('teknik')) {
        return `طريقة أو أسلوب`;
    }
    if (swedishDef.includes('orsak') || swedishDef.includes('anledning') || swedishDef.includes('skäl')) {
        return `سبب أو علة`;
    }
    if (swedishDef.includes('effekt') || swedishDef.includes('verkan') || swedishDef.includes('konsekvens')) {
        return `تأثير أو نتيجة`;
    }

    // Default: create based on the noun described
    return `اسم يشير إلى شيء أو مفهوم`;
}

// Update nouns
let updateCount = 0;

dictionaryData.forEach(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    if (!type.includes('subst')) return;

    // Skip if already has definition
    if (entry[COL_ARB_DEF] && entry[COL_ARB_DEF].trim() !== '') return;

    // Create definition based on Swedish def
    const swedishDef = entry[COL_SWE_DEF] || '';
    const arabicWord = entry[COL_ARB] || '';
    entry[COL_ARB_DEF] = createNounDefinition(swedishDef, arabicWord);
    updateCount++;
});

// Write back to file
const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    `const dictionaryData = ${JSON.stringify(dictionaryData, null, 4)};`
);

fs.writeFileSync('./data.js', newContent);

console.log(`✅ Updated ${updateCount} nouns with Arabic definitions`);
