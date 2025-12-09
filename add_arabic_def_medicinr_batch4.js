/**
 * Add Arabic definitions for MedicinR terms - Batch 4
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

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB_DEF = 5;

// Arabic definitions for MedicinR terms - Batch 4
const arabicDefinitions = {
    "Näthinna - Näthinnan, Retina": "الشبكية (في العين)",
    "Observationen, Bevakningen": "الملاحظة (المراقبة)",
    "Oförklarligt Nedstämd eller": "كآبة غير مبررة أو",
    "Ojämnheter i hornhinnan": "عدم انتظام سطح القرنية",
    "Okbenet, kindben, kindknota, Os zygomaticum": "عظم الوجنة",
    "Opioider": "أفيونيات (مسكنات أفيونية)",
    "Oro, irritabilitet, aggressivitet": "قلق، تهيج، عدوانية",
    "Osteotomi": "قطع العظم (جراحة تقويمية)",
    "Otoskleros": "تصلب الأذن (تصلب الركاب)",
    "Otoskopi - otoskopin": "تنظير الأذن",
    "Panikångest": "نوبة هلع (قلق شديد)",
    "Perifer, - phericus": "محيطي (طرفي)",
    "Pilsk": "مثار جنسياً (شهواني - عامية)",
    "Platthet": "تسطح",
    "Proktit": "التهاب المستقيم",
    "Proteskirurgi": "جراحة البُدَل (المفاصل الصناعية)",
    "PSVT - Paroxysmal Supraventrikulär takykardi, Latin: Paroxysmal supraventricular tachycardia ( PSVT )": "تسرع القلب فوق البطيني الانتيابي (PSVT)",
    "Psykiska stress": "إجهاد نفسي (توتر)",
    "Psykologkontakt": "اتصال بطبيب نفسي (استشارة)",
    "Pupillen, Pupilla": "البؤبؤ (حدقة العين)",
    "Påfallande ( anmärkningsvärd, tydlig, märkbar )": "ملحوظ (لافت للنظر - بارز)",
    "Påfallande och avvikande": "ملحوظ وشاذ (منحرف عن الطبيعي)",
    "Raka bukmuskler": "عضلات البطن المستقيمة",
    "Raseri": "نوبات غضب شديد",
    "Regnbågshinnan, Iris": "القزحية",
    "Rehabiliteringsträning ( konservativt )": "تدريب تأهيلي (علاج محافظ)",
    "Reparera menisken ( laga )": "إصلاح الغضروف الهلالي",
    "Resistens, motståndskraft - motståndskraftiga": "مقاومة (للمناعة أو الأدوية)",
    "Retinopati": "اعتلال الشبكية",
    "Revben, costa": "ضلع",
    "Ringkota ( Atlas kota ), Atlas": "الفقرة الحاملة (الأطلس - الفقرة العنقية الأولى)",
    "Riskfaktorer": "عوامل الخطر",
    "Rivits upp": "تمزق (انشرم)",
    "Rodnader": "احمرار",
    "Rotation av knäleden": "دوران مفصل الركبة",
    "Rotfrukter": "خضروات جذرية (جذور)",
    "Rundmaskar, nematoder, nematodes": "ديدان اسطوانية (نيماتودا)",
    "Ryggbedövning": "تخدير نصفي (شوكي/فوق الجافية)",
    "Ryggraden, columna vertebralis": "العمود الفقري",
    "Röntgenbilder": "صور أشعة سينية",
    "Sadelled": "مفصل سرجي",
    "Saltlösning spolas in": "ضخ محلول ملحي (للغسيل)",
    "Samtalskontakt": "تواصل للكلام (علاج بالكلام)",
    "Scharlakansfeber, Skarlatina, Scarlatina": "حمى قرمزية",
    "Schistosomer, Schistosoma": "منشقات (بلهارسيا)",
    "Screeningtester ( sållningsundersökningar )": "فحوصات مسح (غربلة)",
    "Sedan barnsben": "منذ الطفولة المبكرة",
    "Sekundär hypertoni": "ارتفاع ضغط الدم الثانوي",
    "Senhinna - senhinnan, Sklera": "صلبة العين (بياض العين)",
    "Senkomplikationer": "مضاعفات متأخرة",
    "Senorna": "الأوتار",
    "Silbenet, Os ethmoidale": "العظم الغربالي",
    "Sinnesstämning ( humör, lynne, håg, temperament )": "مزاج (حالة نفسية)",
    "Sittben, Os ischii": "عظم الورك (الإسك)",
    "Sjukdomen bryter ut": "يتفشى المرض (يظهر فجأة)",
    "Sjukpenningstillägg": "علاوة المرض (إعانة مرضية)",
    "Skadas": "يُصاب (يتضرر)",
    "Skakning": "رعشة (ارتجاج)",
    "Skarp värk": "ألم حاد",
    "Skenben - Skenbenet, tibia": "عظم القصبة (الظنبوب)",
    "Skoinlägg": "نعل داخلي (فرش حذاء طبي)",
    "Skruvar": "براغي (جراحية)",
    "Skulderblad, scapula": "لوح الكتف",
    "Skulderbladet, scapula": "لوح الكتف",
    "Skällande hosta": "سعال نباحي",
    "Slaggprodukter": "فضلات (منتجات ثانوية)",
    "SLE - Systemisk Lupus Erythematosus": "الذئبة الحمامية الجهازية (SLE)",
    "Slitits loss": "انخلع (انتزع/تمزق بعيداً)",
    "Slöjsänka": "معدل الترسيب (SR - تسمية عامية/قديمة)",
    "Smearprov": "مسحة (مثل مسحة عنق الرحم)",
    "Smegma": "لخن (إفرازات قلفية - Smegma)",
    "Smegma bakterier": "بكتيريا اللخن",
    "Smittspridning - Smittspridningen": "انتشار العدوى",
    "Små bitar av brosket har": "قطع صغيرة من الغضروف قد",
    "Smärtlindrande inflammationsdämpande läkemedel": "مسكنات ومضادات للالتهاب",
    "Smärtlindrande läkemedel, Paracetamol": "مسكنات ألم (مثل باراسيتامول)",
    "Smärtstillande medel, Analgetika": "مسكنات الألم",
    "Snabbsänka": "فحص CRP (البروتين المتفاعل C)",
    "Sneda bukmuskler": "عضلات البطن المائلة",
    "Snedläge": "وضعية مائلة",
    "Snellens hakar": "لوحة سنيلين (لفحص النظر)",
    "Sniffning": "استنشاق (شم مذيبات)",
    "Spannmål": "حبوب (قمح وشعير)",
    "Spasm": "تشنج",
    "Specialistläkare": "طبيب أخصائي",
    "Specialskor": "أحذية خاصة (طبية)",
    "Sputomprov": "فحص البلغم",
    "SSRI, Selektiva serotonin återupptagshämmare": "مثبطات استرداد السيروتونين الانتقائية (SSRI)",
    "ST, läkare": "طبيب مقيم (في تخصص)",
    "Stabiliserande": "مُثبِّت",
    "Stavar": "عصي (خلايا ضوئية في الشبكية)",
    "STB, Särskilt tandvårdsbidrag": "دعم خاص لطب الأسنان (STB)",
    "Steloperation - Artrodes": "إيثاق المفصل (تثبيت جراحي)",
    "Stentbehandling": "علاج بالدعامات (شبكات)",
    "Stickan, reagenssticka": "شريط الفحص (الغميسة)",
    "Stickande värk": "ألم واخز",
    "Stora urinmängder": "كميات بول كبيرة",
    "Stora urinmängder, törst, torra slemhinnor": "تبول كثير، عطش، جفاف الأغشية",
    "Stramande värk": "ألم شادي (مشدود)",
    "Stressigt liv": "حياة مليئة بالتوتر"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'MedicinR.' && !currentDef.trim() && arabicDefinitions[word]) {
        entry[COL_ARB_DEF] = arabicDefinitions[word];
        updatedCount++;
        console.log(`✅ ${word}`);
    }
});

// Write back to data.js
const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log(`\n📊 Uppdaterade ${updatedCount} ord.`);
console.log('✅ Ändringar sparade i data.js');
