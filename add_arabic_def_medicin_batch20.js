/**
 * Add Arabic definitions for Medicin terms - Batch 20
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

// Arabic definitions for Medicin terms - Batch 20
const arabicDefinitions = {
    "Smärtvandring": "انتشار الألم (تحرك الألم)",
    "Snedfraktur": "كسر مائل",
    "Snäckan": "القوقعة (في الأذن)",
    "Sockerhalt": "نسبة السكر (المحتوى السكري)",
    "SOL": "قانون الخدمات الاجتماعية (SOL)",
    "Solarium": "جهاز تسمير (سرير شمسي)",
    "Somatisk sjukdom": "مرض جسدي",
    "Spasticitet": "تشنج عضلي (شناج - Spasticity)",
    "Spatel": "خافض اللسان (لملعقة مسطحة)",
    "Spermie": "حيوان منوي",
    "Spetälska": "جذام",
    "Spinalvätska": "سائل نخاعي",
    "Spindelvävshinnan": "غشاء العنكبوتية (سحايا)",
    "Spiralfraktur": "كسر لولبي (حلزوني)",
    "Spirometri": "قياس التنفس",
    "Splitterfraktur": "كسر مفتت",
    "Spolmask": "دودة الصفر (ديدان مدورة)",
    "Spordjur": "بويغيات (طفيليات)",
    "Spottkörtlarna": "الغدد اللعابية",
    "Sprida smittan": "ينشر العدوى",
    "Spridningsvägar": "طرق الانتشار (مسارات)",
    "Springmask": "دودة دبوسية",
    "Språkanalys": "تحليل لغوي",
    "Spädbarnasålder": "سن الرضاعة",
    "Spänningshuvudvärk": "صداع توتري (Spänningshuvudvärk)",
    "SSinnen": "الحواس (Sinnen)",
    "SSinnesintryck": "انطباعات حسية (Sinnesintryck)",
    "Stafylokocker": "بكتيريا عنقودية (Staphylococcus)",
    "Stamcell": "خلية جذعية",
    "Stamcelltransplantation": "زراعة الخلايا الجذعية",
    "Startsmärta": "ألم البدء (عند بداية الحركة)",
    "Statens Institut för Handikappfrågor i skolan ( SIH )": "معهد الدولة لقضايا الإعاقة في المدارس (SIH)",
    "Stavformad bakterie": "بكتيريا عصوية",
    "Stelkrampsbakterier": "بكتيريا الكزاز (تيتانوس)",
    "Steloperation": "إيثاق المفصل (تثبيت المفصل جراحياً)",
    "Stenos": "تضيق (قناة/شريان)",
    "Sterilitet": "عقم",
    "Stetoskop": "سماعة طبيب",
    "Stickningar": "وخزات",
    "Stigbygeln": "الركاب (عظمة بالأذن)",
    "Stillasittande": "خامل (نمط حياة قليل الحركة)",
    "Stimulera": "يحفز (ينشط)",
    "Stomi": "فغرة (فتحة خارجية للإخراج)",
    "Stora kretsloppet": "الدورة الدموية الكبرى",
    "Stora kroppspulsådern": "الشريان الأبهر (الأورطي)",
    "Storhjärnan": "المخ (الدماغ الكبير)",
    "Streptokock": "مكورات عقدية (Streptococcus)",
    "Stressfraktur": "كسر إجهادي",
    "Stroke": "سكتة دماغية (جلطة/نزيف)",
    "Stroke, slaganfall": "سكتة دماغية (جلطة)",
    "Struma": "تضخم الغدة الدرقية (دراق)",
    "Struphuvudet": "الحنجرة",
    "Struplock, epiglottis": "لسان المزمار",
    "Struplocksinflammation, epiglottis": "التهاب لسان المزمار",
    "Strålar ner": "يمتد لأسفل (ينتشر الألم)",
    "Strålbenet": "عظم الكعبرة (بالساعد)",
    "Stråldos": "جرعة إشعاعية",
    "Sträckning": "تمزق (شد عضلي) أو بسط",
    "Sträv tunga": "لسان خشن (مكسو)",
    "Städet": "السندان (عظمة بالأذن)",
    "Stämband": "أحبال صوتية",
    "Stödförband": "رباط داعم",
    "Stödjande bevisning": "أدلة داعمة (مؤيدة)",
    "Stödjevävnad": "نسيج داعم",
    "Stötdämpande sula": "نعل ممتص للصدمات",
    "Subjektiva symtom": "أعراض ذاتية (يشعر بها المريض)",
    "Subkutant, injiceras i underhuden": "حقن تحت الجلد (SC)",
    "Sublingualt, under tungan": "تحت اللسان",
    "Successiv försämring": "تدهور تدريجي",
    "Suddigt": "ضبابي (غير واضح)",
    "Sugklocka": "محجم (جهاز شفط للولادة - شفاط)",
    "Sugtablett": "قرص استحلاب (للمص)",
    "Suppositorier": "تحاميل (لبوس)",
    "Sura maguppstötningar": "ارتجاع حمضي (حموضة)",
    "Sura uppstötningar": "تجشؤ حامضي",
    "Surt": "حامض (مذاق)",
    "Svag stråle": "تيار ضعيف (للبول)",
    "Svag urinstråle": "ضعف تدفق البول",
    "Svalg": "البلعوم (الحلق)",
    "Svalg, farynx": "البلعوم",
    "Svalget, farynx": "البلعوم",
    "Svalgodling": "مسحة الحلق (مزرعة)",
    "Svallning": "تورد (هبة ساخنة أو تورم)",
    "Svamp": "فطر",
    "Svampar": "فطريات",
    "Svampinfektion": "عدوى فطرية",
    "Svampinfektion i underlivet": "فطريات مهبلية (أو تناسلية)",
    "Svansbenet": "عظم الذنب (العصعص)",
    "Svanskotor": "فقرات عصعصية",
    "Svettning": "تعرق",
    "Svimning": "إغماء",
    "Svininfluensan, HN": "إنفلونزا الخنازير (H1N1)",
    "Svullna lymfkörtlar": "تضخم العقد اللمفاوية",
    "Sväljningsmekanismen": "آلية البلع",
    "Sväljningsreflexen": "منعكس البلع",
    "Sväljsvårigheter": "صعوبات البلع (عسر البلع)",
    "Svällkropparna": "الأجسام الكهفية (للانتصاب)",
    "Symtomlindrande": "مخفف للأعراض (تلطيفي)",
    "Syncentral": "مركز البصر",
    "Syncentrum": "مركز البصر"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = (entry[COL_SWE] || '').trim(); // Trim Swedish word to match key if needed
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'Medicin.' && !currentDef.trim() && arabicDefinitions[word]) {
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
