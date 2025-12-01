const fs = require('fs');

const DATA_FILE = 'wordConnectData.js';
const LEXIN_PATH = 'Lexin20210201.csv';

// Theme Definitions (Same as generator)
const THEMES = {
    1: { name: "Food", keywords: ["mat", "äta", "dryck", "smak", "koka", "steka", "restaurang", "kök", "frukt", "grönsak", "bröd", "vatten", "kaffe", "te", "lunch", "middag", "frukost", "hungrig", "mätt", "recept", "skål", "tallrik", "glas", "kopp", "äpple", "banan", "bär", "kaka", "tårta", "glass", "ost", "smör", "mjölk", "kött", "fisk", "kyckling", "krydda", "salt", "socker", "peppar"] },
    2: { name: "Nature", keywords: ["natur", "träd", "skog", "blomma", "växt", "djur", "hav", "sjö", "vatten", "berg", "sten", "himmel", "sol", "måne", "stjärna", "moln", "regn", "snö", "vind", "väder", "årstid", "vinter", "vår", "sommar", "höst", "park", "gräs", "mark", "jord", "eld", "luft", "ö", "strand", "flod"] },
    3: { name: "Travel", keywords: ["resa", "åka", "bil", "buss", "tåg", "flyg", "båt", "cykel", "trafik", "väg", "gata", "karta", "pass", "biljett", "hotell", "semester", "turist", "besök", "utflykt", "bagage", "väska", "station", "flygplats", "hamn", "land", "stad", "värld", "karta", "norr", "söder", "öster", "väster"] },
    4: { name: "Daily Life", keywords: ["vardag", "jobb", "arbete", "skola", "hem", "fritid", "tid", "klocka", "dag", "natt", "morgon", "kväll", "vecka", "månad", "år", "pengar", "handla", "butik", "städa", "tvätta", "laga", "sova", "vakna", "äta", "dricka", "prata", "lyssna", "titta", "läsa", "skriva", "leka", "spela", "vän", "hjälp"] },
    5: { name: "Body", keywords: ["kropp", "huvud", "hår", "öga", "öra", "näsa", "mun", "tand", "hals", "arm", "hand", "finger", "mage", "rygg", "ben", "fot", "tå", "hjärta", "blod", "sjuk", "frisk", "ont", "medicin", "läkare", "sjukhus", "hälsa", "stark", "svag", "trött", "pigg", "sova", "vila", "springa", "gå"] },
    6: { name: "Clothes", keywords: ["kläder", "klä", "tröja", "byxa", "kjol", "klänning", "jacka", "kappa", "rock", "sko", "strumpa", "mössa", "vante", "halsduk", "slips", "skjorta", "blus", "kavaj", "kostym", "tyg", "sy", "knapp", "ficka", "storlek", "färg", "röd", "blå", "gul", "grön", "svart", "vit", "tvätta", "mode"] },
    7: { name: "Family", keywords: ["familj", "släkt", "mamma", "pappa", "förälder", "barn", "son", "dotter", "bror", "syster", "syskon", "farfar", "farmor", "morfar", "mormor", "kusin", "man", "fru", "make", "maka", "gift", "bröllop", "skilja", "sambo", "pojke", "flicka", "kille", "tjej", "vän", "kompis", "granne", "namn", "heta", "kalla"] },
    8: { name: "House & Home", keywords: ["hus", "hem", "lägenhet", "villa", "rum", "kök", "badrum", "sovrum", "vardagsrum", "hall", "fönster", "dörr", "golv", "tak", "vägg", "möbel", "bord", "stol", "soffa", "säng", "lampa", "matta", "gardin", "skåp", "hylla", "nyckel", "lås", "bo", "bygga", "måla", "trädgård", "balkong", "garage"] },
    9: { name: "City & Traffic", keywords: ["stad", "by", "samhälle", "centrum", "torg", "gata", "väg", "trafik", "bil", "buss", "tåg", "cykel", "bro", "tunnel", "hus", "byggnad", "park", "affär", "bank", "post", "skola", "sjukhus", "polis", "brandkår", "kyrka", "bibliotek", "bio", "restaurang", "café", "karta", "plats", "stanna", "köra", "gå"] },
    10: { name: "Animals", keywords: ["djur", "hund", "katt", "häst", "ko", "gris", "får", "get", "höna", "tupp", "fågel", "fisk", "orm", "spindel", "fluga", "mygga", "bi", "fjäril", "varg", "björn", "älg", "rådjur", "räv", "hare", "mus", "råtta", "svans", "päls", "vinge", "bo", "jaga", "tam", "vild"] }
};

// Load Data
const content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const WC_PREDEFINED_LEVELS = ({[\s\S]*?});/);
const levels = eval('(' + match[1] + ')');

// Load Lexin for full text check
const lexinContent = fs.readFileSync(LEXIN_PATH, 'utf8');
const lexinLines = lexinContent.split('\n');
const wordMap = new Map(); // Word -> Array of full text lines (definitions)

for (const line of lexinLines) {
    const parts = line.split(';');
    if (parts.length < 3) continue;
    const word = parts[2] ? parts[2].trim().split(',')[0].trim().replace(/[^a-zA-ZåäöÅÄÖ]/g, '').toUpperCase() : "";
    if (!word) continue;

    if (!wordMap.has(word)) {
        wordMap.set(word, []);
    }
    wordMap.get(word).push(line.toLowerCase());
}

// Add Arabic Keywords to Themes (Copy from generator)
const ARABIC_THEMES = {
    1: ["طعام", "أكل", "شرب", "مطبخ", "فاكهة", "خضار", "خبز", "ماء", "قهوة", "شاي", "غداء", "عشاء", "فطور", "جوع", "شبع", "وصفة", "صحن", "كأس", "كوب", "تفاح", "موز", "توت", "كعك", "جبن", "زبدة", "حليب", "لحم", "سمك", "دجاج", "بهار", "ملح", "سكر", "فلفل", "وجبة", "مطعم", "طهي", "طبخ"],
    2: ["طبيعة", "شجرة", "غابة", "زهرة", "نبات", "حيوان", "بحر", "بحيرة", "ماء", "جبل", "حجر", "سماء", "شمس", "قمر", "نجم", "غيمة", "مطر", "ثلج", "ريح", "طقس", "فصل", "شتاء", "ربيع", "صيف", "خريف", "حديقة", "عشب", "أرض", "نار", "هواء", "جزيرة", "شاطئ", "نهر"],
    3: ["سفر", "رحلة", "سيارة", "باص", "قطار", "طائرة", "قارب", "دراجة", "مرور", "طريق", "شارع", "خريطة", "جواز", "تذكرة", "فندق", "عطلة", "سائح", "زيارة", "نزهة", "حقيبة", "محطة", "مطار", "ميناء", "بلد", "مدينة", "عالم", "شمال", "جنوب", "شرق", "غرب"],
    4: ["يوم", "عمل", "شغل", "مدرسة", "بيت", "وقت", "ساعة", "نهار", "ليل", "صباح", "مساء", "أسبوع", "شهر", "سنة", "مال", "تسوق", "دكان", "تنظيف", "غسيل", "نوم", "استيقاظ", "أكل", "شرب", "كلام", "استماع", "نظر", "قراءة", "كتابة", "لعب", "صديق", "مساعدة"],
    5: ["جسم", "رأس", "شعر", "عين", "أذن", "أنف", "فم", "سن", "رقبة", "ذراع", "يد", "إصبع", "بطن", "ظهر", "رجل", "قدم", "قلب", "دم", "مريض", "صحي", "ألم", "دواء", "طبيب", "مستشفى", "صحة", "قوي", "ضعيف", "تعب", "نوم", "راحة", "ركض", "مشى"],
    6: ["ملابس", "لبس", "قميص", "بنطلون", "تنورة", "فستان", "جاكيت", "معطف", "حذاء", "جورب", "قبعة", "قفاز", "وشاح", "ربطة", "بدلة", "قماش", "خياطة", "زر", "جيب", "مقاس", "لون", "أحمر", "أزرق", "أصفر", "أخضر", "أسود", "أبيض", "غسيل", "موضة"],
    7: ["عائلة", "أقارب", "أم", "أب", "والد", "طفل", "ابن", "ابنة", "أخ", "أخت", "جد", "جدة", "عم", "خال", "زوج", "زوجة", "زواج", "طلاق", "ولد", "بنت", "صديق", "جار", "اسم"],
    8: ["بيت", "منزل", "شقة", "غرفة", "مطبخ", "حمام", "صالة", "نافذة", "شباك", "باب", "أرضية", "سقف", "جدار", "أثاث", "طاولة", "كرسي", "كنبة", "سرير", "مصباح", "سجادة", "ستارة", "خزانة", "رف", "مفتاح", "قفل", "سكن", "بناء", "دهان", "حديقة", "شرفة", "كراج"],
    9: ["مدينة", "قرية", "مجتمع", "مركز", "ساحة", "شارع", "طريق", "مرور", "سيارة", "باص", "قطار", "دراجة", "جسر", "نفق", "بناء", "حديقة", "محل", "بنك", "بريد", "مدرسة", "مستشفى", "شرطة", "إطفاء", "كنيسة", "مكتبة", "سينما", "مطعم", "مقهى", "خريطة", "مكان", "توقف", "قيادة", "مشي"],
    10: ["حيوان", "كلب", "قط", "حصان", "بقرة", "خنزير", "خروف", "ماعز", "دجاجة", "ديك", "طير", "سمك", "أفعى", "عنكبوت", "ذابة", "بعوضة", "نحلة", "فراشة", "ذئب", "دب", "غزال", "ثعلب", "أرنب", "فأر", "جرذ", "ذيل", "فرو", "جناح", "عش", "صيد", "أليف", "وحشي"]
};

// Merge Arabic keywords into THEMES
for (let ch = 1; ch <= 10; ch++) {
    THEMES[ch].keywords.push(...ARABIC_THEMES[ch]);
}

console.log("Auditing Theme Compliance (Full Text Check)...\n");

let failCount = 0;

for (let ch = 1; ch <= 10; ch++) {
    const theme = THEMES[ch];
    console.log(`Checking Chapter ${ch}: ${theme.name}`);

    for (let l = 1; l <= 10; l++) {
        const id = `${ch}-${l}`;
        const level = levels[id];
        if (!level) continue;

        // Find longest word (Root Candidate)
        const words = level.words;
        const maxLength = Math.max(...words.map(w => w.length));
        const roots = words.filter(w => w.length === maxLength);

        // Check if ANY root matches the theme
        let isThematic = false;
        let matchedRoot = "";
        let matchedKeyword = "";

        for (const root of roots) {
            // Get full text entries for this root
            const entries = wordMap.get(root.toUpperCase()) || []; // Ensure root is uppercase for map lookup

            // Check if any entry contains a keyword
            for (const entry of entries) {
                for (const k of theme.keywords) {
                    // For Arabic, simple includes is fine
                    // For Swedish, use regex for word boundaries/suffixes
                    let isMatch = false;
                    if (/[\u0600-\u06FF]/.test(k)) { // Check if keyword contains Arabic characters
                        if (entry.includes(k)) isMatch = true;
                    } else {
                        const suffixes = "(?:en|et|ar|er|na|a|s|an|on|or|erna|arna|t|de|r|te|dd|tt)?";
                        const regex = new RegExp(`\\b${k}${suffixes}\\b`, 'i');
                        if (regex.test(entry)) isMatch = true;
                    }

                    if (isMatch) {
                        isThematic = true;
                        matchedRoot = root;
                        matchedKeyword = k;
                        break;
                    }
                }
                if (isThematic) break;
            }
            if (isThematic) break;
        }

        if (!isThematic) {
            console.log(`  ❌ Level ${id} [${roots.join(', ')}] - Potential Mismatch`);
            failCount++;
        } else {
            // console.log(`  ✅ Level ${id} [${matchedRoot}] (Matched: ${matchedKeyword})`);
        }
    }
}

console.log(`\nTotal Potential Mismatches: ${failCount}`);
