/**
 * ADD EXAMPLES - BATCH 10 (Correct Word Matching)
 * Focus on vocabulary that typically lacks examples
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

const examples = {
    // ==========================================
    // CLOTHING ITEMS (Specific)
    // ==========================================
    "Kostym|Substantiv": { exSwe: "Han har en svart kostym.", exArb: "لديه بدلة سوداء." },
    "Kappa|Substantiv": { exSwe: "Ta på dig kappan.", exArb: "ارتدِ المعطف." },
    "Regnrock|Substantiv": { exSwe: "Det regnar, ta på regnrocken.", exArb: "إنها تمطر، ارتدِ معطف المطر." },
    "Strumpor|Substantiv": { exSwe: "Jag köpte nya strumpor.", exArb: "اشتريت جوارب جديدة." },
    "Underkläder|Substantiv": { exSwe: "Byt till rena underkläder.", exArb: "بدّل إلى ملابس داخلية نظيفة." },
    "Bälte|Substantiv": { exSwe: "Jag behöver ett nytt bälte.", exArb: "أحتاج حزاماً جديداً." },
    "Smycke|Substantiv": { exSwe: "Hon har fina smycken.", exArb: "لديها مجوهرات جميلة." },
    "Ring|Substantiv": { exSwe: "Han gav henne en ring.", exArb: "أعطاها خاتماً." },
    "Halsband|Substantiv": { exSwe: "Halsbandet är av silver.", exArb: "القلادة من فضة." },
    "Armband|Substantiv": { exSwe: "Armbandet är av guld.", exArb: "السوار من ذهب." },
    "Örhänge|Substantiv": { exSwe: "Hon har vackra örhängen.", exArb: "لديها أقراط جميلة." },
    "Slips|Substantiv": { exSwe: "Han bär en röd slips.", exArb: "يرتدي ربطة عنق حمراء." },
    "Tofflor|Substantiv": { exSwe: "Jag har tofflor hemma.", exArb: "لدي شباشب في البيت." },
    "Sandaler|Substantiv": { exSwe: "Jag bär sandaler på sommaren.", exArb: "أرتدي الصنادل في الصيف." },
    "Underkjol|Substantiv": { exSwe: "Hon har en underkjol.", exArb: "لديها تحتانية." },

    // ==========================================
    // BUILDING PARTS
    // ==========================================
    "Skorsten|Substantiv": { exSwe: "Röken kommer ur skorstenen.", exArb: "الدخان يخرج من المدخنة." },
    "Terrass|Substantiv": { exSwe: "Vi sitter på terrassen.", exArb: "نجلس على الشرفة." },
    "Veranda|Substantiv": { exSwe: "Husets veranda är stor.", exArb: "شرفة البيت كبيرة." },
    "Fasad|Substantiv": { exSwe: "Fasaden behöver målas.", exArb: "الواجهة تحتاج للطلاء." },
    "Grund|Substantiv": { exSwe: "Husets grund är stabil.", exArb: "أساس البيت متين." },
    "Pelare|Substantiv": { exSwe: "Pelarna är av marmor.", exArb: "الأعمدة من الرخام." },
    "Tröskel|Substantiv": { exSwe: "Snubbla inte på tröskeln.", exArb: "لا تتعثر بالعتبة." },
    "Räcke|Substantiv": { exSwe: "Håll i räcket.", exArb: "أمسك بالدرابزين." },
    "Gång|Substantiv": { exSwe: "Gången är smal.", exArb: "الممر ضيق." },
    "Ingång|Substantiv": { exSwe: "Ingången är till vänster.", exArb: "المدخل على اليسار." },
    "Utgång|Substantiv": { exSwe: "Var är utgången?", exArb: "أين المخرج؟" },
    "Nödutgång|Substantiv": { exSwe: "Nödutgången är där.", exArb: "مخرج الطوارئ هناك." },

    // ==========================================
    // OFFICE & STATIONERY
    // ==========================================
    "Häftapparat|Substantiv": { exSwe: "Lägg tillbaka häftapparaten.", exArb: "أعد الدباسة إلى مكانها." },
    "Gem|Substantiv": { exSwe: "Fäst papperna med ett gem.", exArb: "ثبّت الأوراق بمشبك." },
    "Tejp|Substantiv": { exSwe: "Kan jag låna tejp?", exArb: "هل يمكنني استعارة شريط لاصق؟" },
    "Lim|Substantiv": { exSwe: "Limma fast bilden.", exArb: "ألصق الصورة." },
    "Pärm|Substantiv": { exSwe: "Lägg pappren i pärmen.", exArb: "ضع الأوراق في المجلد." },
    "Mapp|Substantiv": { exSwe: "Jag sparar filen i mappen.", exArb: "أحفظ الملف في المجلد." },
    "Kuvert|Substantiv": { exSwe: "Lägg brevet i kuvertet.", exArb: "ضع الرسالة في الظرف." },
    "Frimärke|Substantiv": { exSwe: "Sätt på ett frimärke.", exArb: "ضع طابعاً بريدياً." },
    "Kalender|Substantiv": { exSwe: "Jag skriver in mötet i kalendern.", exArb: "أكتب الاجتماع في التقويم." },
    "Anteckningsbok|Substantiv": { exSwe: "Jag skriver i min anteckningsbok.", exArb: "أكتب في دفتر ملاحظاتي." },
    "Whiteboard|Substantiv": { exSwe: "Läraren skriver på whiteboardtavlan.", exArb: "يكتب المعلم على السبورة البيضاء." },

    // ==========================================
    // TOOLS & EQUIPMENT
    // ==========================================
    "Hammare|Substantiv": { exSwe: "Slå in spiken med hammaren.", exArb: "ادق المسمار بالمطرقة." },
    "Skruvmejsel|Substantiv": { exSwe: "Jag behöver en skruvmejsel.", exArb: "أحتاج مفك براغي." },
    "Tång|Substantiv": { exSwe: "Dra ut spiken med tången.", exArb: "اسحب المسمار بالكماشة." },
    "Såg|Substantiv": { exSwe: "Jag sågar brädorna.", exArb: "أنشر الألواح." },
    "Borr|Substantiv": { exSwe: "Borra ett hål i väggen.", exArb: "احفر ثقباً في الحائط." },
    "Måttband|Substantiv": { exSwe: "Mät med måttbandet.", exArb: "قِس بشريط القياس." },
    "Vattenpass|Substantiv": { exSwe: "Kontrollera med vattenpasset.", exArb: "تحقق بميزان الماء." },
    "Stege|Substantiv": { exSwe: "Klättra upp på stegen.", exArb: "اصعد السلم." },
    "Spade|Substantiv": { exSwe: "Gräv med spaden.", exArb: "احفر بالمجرفة." },
    "Kratta|Substantiv": { exSwe: "Kratta löven.", exArb: "اجمع الأوراق بالمشط." },
    "Slang|Substantiv": { exSwe: "Vattna med slangen.", exArb: "اسقِ بالخرطوم." },
    "Vattenkanna|Substantiv": { exSwe: "Fyll vattenkannan.", exArb: "املأ إبريق الماء." },
    "Gräsklippare|Substantiv": { exSwe: "Gräsklipparen fungerar inte.", exArb: "جزازة العشب لا تعمل." },

    // ==========================================
    // MEDICAL & PHARMACY
    // ==========================================
    "Apotek|Substantiv": { exSwe: "Köp medicinen på apoteket.", exArb: "اشترِ الدواء من الصيدلية." },
    "Plåster|Substantiv": { exSwe: "Sätt på ett plåster.", exArb: "ضع لاصقة جرح." },
    "Bandage|Substantiv": { exSwe: "Linda bandaget runt armen.", exArb: "لفّ الضماد حول الذراع." },
    "Spruta|Substantiv": { exSwe: "Sjuksköterskan ger en spruta.", exArb: "تعطي الممرضة حقنة." },
    "Piller|Substantiv": { exSwe: "Ta ett piller.", exArb: "تناول حبة." },
    "Salva|Substantiv": { exSwe: "Smörj med salvan.", exArb: "ادهن بالمرهم." },
    "Hostmedicin|Substantiv": { exSwe: "Ta hostmedicin.", exArb: "تناول دواء السعال." },
    "Värktablett|Substantiv": { exSwe: "Ta en värktablett.", exArb: "تناول مسكناً." },
    "Termometer|Substantiv": { exSwe: "Mät febern med termometern.", exArb: "قِس الحرارة بالميزان." },
    "Blodprov|Substantiv": { exSwe: "Jag tar ett blodprov.", exArb: "آخذ تحليل دم." },
    "Röntgen|Substantiv": { exSwe: "Jag ska ta röntgen.", exArb: "سآخذ صورة أشعة." },
    "Undersökning|Substantiv": { exSwe: "Jag har en undersökning.", exArb: "لدي فحص طبي." },

    // ==========================================
    // VERBS - HOUSEHOLD
    // ==========================================
    "Dammsuger|Verb": { exSwe: "Jag dammsuger golvet.", exArb: "أكنس الأرضية بالمكنسة الكهربائية." },
    "Moppar|Verb": { exSwe: "Hon moppar golvet.", exArb: "تمسح الأرضية." },
    "Torkar|Verb": { exSwe: "Jag torkar bordet.", exArb: "أمسح الطاولة." },
    "Sorterar|Verb": { exSwe: "Vi sorterar soporna.", exArb: "نفرز القمامة." },
    "Viker|Verb": { exSwe: "Jag viker tvätten.", exArb: "أطوي الغسيل." },
    "Hänger|Verb": { exSwe: "Häng upp jackan.", exArb: "علّق السترة." },
    "Plockar|Verb": { exSwe: "Vi plockar bär i skogen.", exArb: "نجمع التوت في الغابة." },
    "Rengör|Verb": { exSwe: "Rengör ugnen.", exArb: "نظّف الفرن." },
    "Putsar|Verb": { exSwe: "Han putsar fönstren.", exArb: "يلمّع النوافذ." },
    "Syr|Verb": { exSwe: "Hon syr kläder.", exArb: "تخيط الملابس." },
    "Stickar|Verb": { exSwe: "Mormor stickar en tröja.", exArb: "جدتي تحيك سترة." },
    "Virkar|Verb": { exSwe: "Hon virkar en duk.", exArb: "تشتغل الكروشيه." },

    // ==========================================
    // VERBS - MOVEMENT
    // ==========================================
    "Kryper|Verb": { exSwe: "Bebisen kryper.", exArb: "الطفل يزحف." },
    "Rullar|Verb": { exSwe: "Bollen rullar.", exArb: "الكرة تتدحرج." },
    "Glider|Verb": { exSwe: "Han glider på isen.", exArb: "ينزلق على الجليد." },
    "Snurrar|Verb": { exSwe: "Hon snurrar runt.", exArb: "تدور حول نفسها." },
    "Skakar|Verb": { exSwe: "Skaka flaskan.", exArb: "رجّ الزجاجة." },
    "Vickar|Verb": { exSwe: "Hunden vickar på svansen.", exArb: "الكلب يهز ذيله." },
    "Böjer|Verb": { exSwe: "Böj knäna.", exArb: "اثنِ ركبتيك." },
    "Sträcker|Verb": { exSwe: "Sträck på dig.", exArb: "تمدد." },
    "Lyfter|Verb": { exSwe: "Han lyfter vikterna.", exArb: "يرفع الأثقال." },
    "Sänker|Verb": { exSwe: "Sänk armen.", exArb: "أنزل ذراعك." },
    "Vänder|Verb": { exSwe: "Vänd på sidan.", exArb: "اقلب الصفحة." },
    "Svänger|Verb": { exSwe: "Svänger till höger.", exArb: "ينعطف يميناً." },

    // ==========================================
    // VERBS - DAILY ACTIVITIES (More)
    // ==========================================
    "Rastar|Verb": { exSwe: "Jag rastar hunden.", exArb: "أمشّي الكلب." },
    "Matar|Verb": { exSwe: "Jag matar katten.", exArb: "أطعم القطة." },
    "Planterar|Verb": { exSwe: "Vi planterar blommor.", exArb: "نزرع الزهور." },
    "Vattnar|Verb": { exSwe: "Jag vattnar blommorna.", exArb: "أسقي الأزهار." },
    "Klipper|Verb": { exSwe: "Han klipper gräset.", exArb: "يقص العشب." },
    "Rensar|Verb": { exSwe: "Vi rensar ogräs.", exArb: "ننظف الأعشاب الضارة." },
    "Pryder|Verb": { exSwe: "Blommorna pryder rummet.", exArb: "الأزهار تزين الغرفة." },
    "Dekorerar|Verb": { exSwe: "Vi dekorerar till jul.", exArb: "نزين للعيد." },
    "Packar|Verb": { exSwe: "Jag packar väskan.", exArb: "أحزم الحقيبة." },
    "Packar upp|Verb": { exSwe: "Vi packar upp presenterna.", exArb: "نفتح الهدايا." },
    "Parkerar|Verb": { exSwe: "Han parkerar bilen.", exArb: "يركن السيارة." },
    "Tankar|Verb": { exSwe: "Jag tankar bilen.", exArb: "أملأ خزان السيارة." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - BATCH 10 (Final Batch)');
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
