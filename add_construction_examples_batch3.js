/**
 * Add examples to CONSTRUCTION terms - Batch 3 (100 terms: Asfaltsskärare to Beck)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin001590": ["Kapa vägen med en asfaltsskärare.", "قطع الطريق بقاطعة الأسفلت."],
    "Lexin001591": ["Hämta asfalten från närmaste asfaltverk.", "جلب الأسفلت من أقرب مصنع أسفلت."],
    "Lexin001604": ["Anläggningen har system för askåtervinning.", "المنشأة لديها نظام لإعادة تدوير الرماد."],
    "Lexin001679": ["Kontoret har ett ljust atrium.", "المكتب يحتوي på باحة داخلية (atrium) مضيئة."],
    "Lexin001775": ["Klipp kabeln med en avbitartång.", "اقطع الكابل بكماشة قطع."],
    "Lexin001778": ["Vi fick ett avbrott i strömmen.", "حدث لدينا انقطاع في التيار."],
    "Lexin001779": ["Minimera avbrottstiden i produktionen.", "تقليل وقت التوقف في الإنتاج."],
    "Lexin001792": ["Jobba på en annan avdelning.", "العمل في قسم آخر."],
    "Lexin001793": ["Rapportera till din avdelningschef.", "ارفع تقريراً لمدير قسمك."],
    "Lexin001797": ["Ytan ska vara avdragen betong.", "السطح يجب أن يكون خرسانة مسواة (avdragen)."],
    "Lexin001798": ["Kontrollera den avdragna ytan.", "فحص السطح المسوى."],
    "Lexin001799": ["Avdragning av golvet med rätskiva.", "تسوية الأرضية بمسطرة التسوية."],
    "Lexin001805": ["Hindra snabb avdunstning från betongen.", "منع التبخر السريع من الخرسانة."],
    "Lexin001810": ["Sortera allt avfall på bygget.", "فرز جميع النفايات في موقع البناء."],
    "Lexin001811": ["Köra soporna till en avfallsanläggning.", "نقل النفايات إلى منشأة إدارة النفايات."],
    "Lexin001812": ["Tömma fulla avfallsbehållare.", "تفريغ حاويات النفايات الممتلئة."],
    "Lexin001813": ["Plan för avfallshantering.", "خطة لإدارة النفايات."],
    "Lexin001814": ["Kasta påsen i sopnedkastet (avfallsnedkast).", "رمي الكيس في أنبوب النفايات."],
    "Lexin001816": ["Städa i fastighetens avfallsrum.", "التنظيف في غرفة النفايات في المبنى."],
    "Lexin001817": ["Ventilation i avfallsutrymmet.", "التهوية في حيز النفايات."],
    "Lexin001818": ["Brännbart skickas till ett avfallsverk.", "المواد القابلة للاحتراق ترسل إلى محطة نفايات."],
    "Lexin001821": ["Ta avfart 5 mot centrum.", "خذ المخرج 5 نحو المركز."],
    "Lexin001822": ["Göra en avfettning innan målning.", "إجراء إزالة للشحوم قبل الطلاء."],
    "Lexin001823": ["Laga fasaden där det blivit avflagning.", "إصلاح الواجهة حيث حدث تقشر (تساقط طلاء)."],
    "Lexin001853": ["Mäta systemets avgivna energi.", "قياس الطاقة الصادرة من النظام."],
    "Lexin001854": ["Elementets avgivna värme.", "الحرارة المنبعثة من المشعاع."],
    "Lexin001887": ["Installera en avhärdare för vattnet.", "تركيب منقي (مزال عسر) للماء."],
    "Lexin001892": ["System för avisning av hängrännor.", "نظام لإزالة الجليد من المزاريب."],
    "Lexin001893": ["Avjämna golvet med spackel.", "تسوية الأرضية بالمعجون."],
    "Lexin001894": ["Lägga klinker på avjämnad betong.", "tarkib السيراميك على خرسانة مسواة."],
    "Lexin001895": ["Få en helt avjämnad yta.", "الحصول على سطح مستوٍ تماماً."],
    "Lexin001896": ["Använda en laserstyrd avjämnare.", "استخدام آلة تسوية موجهة بالليزر."],
    "Lexin001897": ["Avjämning av marken inför byggstart.", "تسوية الأرض قبل بدء البناء."],
    "Lexin001901": ["Beräkna fastighetens avkastningsvärde.", "حساب قيمة العائد للعقار."],
    "Lexin001917": ["Avlasta taket med stöttor.", "تخفيف الحمل عن السقف بدعامات."],
    "Lexin001922": ["Avleda regnvattnet från huset.", "تصريف مياه الأمطار بعيداً عن المنزل."],
    "Lexin001929": ["Stopp i avloppet.", "انسداد في الصرف الصحي."],
    "Lexin001930": ["Byta ut gamla avloppsledningar.", "استبدال أنابيب الصرف القديمة."],
    "Lexin001931": ["Koppla in huset på kommunens avloppsnät.", "ربط المنزل بشبكة الصرف الصحي للبلدية."],
    "Lexin001932": ["Installera en avloppspump i källaren.", "تركيب مضخة صرف في القبو."],
    "Lexin001934": ["Rensa gallret i avloppsrännan.", "تنظيف شبكة قناة التصريف (avloppsränna)."],
    "Lexin001935": ["Rena avloppsvattnet.", "تنقية مياه الصرف الصحي."],
    "Lexin001954": ["Göra en avläsning av elmätaren.", "قراءة عداد الكهرباء."],
    "Lexin001980": ["Vila på trappans avsats.", "الاستراحة على بسطة الدرج."],
    "Lexin002001": ["Lägga ett avskiljande skikt mellan betongen och plasten.", "وضع طبقة فاصلة بين الخرسانة والبلاستيك."],
    "Lexin002002": ["Montera en oljeavskiljare i garaget.", "تركيب فاصل زيت في المرآب."],
    "Lexin002016": ["Gräva ett avskärande dike för dränering.", "حفر خندق قاطع (avskärande dike) للصرف."],
    "Lexin002034": ["Vägens avsmalning kräver sänkt fart.", "تضييق الطريق يتطلب خفض السرعة."],
    "Lexin002036": ["Asfaltera ett nytt avsnitt av vägen.", "سفلتة قسم جديد من الطريق."],
    "Lexin002054": ["Göra en avståndsmätning med laser.", "إجراء قياس للمسافة بالليزر."],
    "Lexin002057": ["Använda rummet som avställningsplats.", "استخدام الغرفة كمكان للتخزين المؤقت."],
    "Lexin002062": ["Plasten kräver en lång avsvalningsperiod.", "البلاستيك يتطلب فترة تبريد طويلة."],
    "Lexin002080": ["Läs noga avtalsbestämmelserna.", "اقرأ شروط العقد بعناية."],
    "Lexin002084": ["Välja rätt avtalsform för projektet.", "اختيار نموذج العقد المناسب للمشروع."],
    "Lexin002092": ["Avtalstiden är två år.", "مدة العقد سنتان."],
    "Lexin002104": ["Skon gjorde avtryck i betongen.", "الحذاء ترك أثراً في الخرسانة."],
    "Lexin002132": ["Studera markens avvägningsritning.", "دراسة مخطط تسوية الأرض."],
    "Lexin002138": ["Göra en avväxling för dörrhålet.", "عمل عارضة تحويلة (avväxling) لفتحة الباب."],
    "Lexin002139": ["Fästa balken med avväxlingsbeslag.", "تثبيت العارضة بدعامات التحويل."],
    "Lexin002145": ["Hjulet sitter på en axel.", "العجلة مثبتة على محور."],
    "Lexin002146": ["Vägen klarar inte hög axellast.", "الطريق لا يتحمل حمل المحور العالي."],
    "Lexin002148": ["Mäta lastbilens axeltryck.", "قياس ضغط المحور للشاحنة."],
    "Lexin002149": ["Utsättas för axiell belastning.", "التعرض لحمل محوري."],
    "Lexin002177": ["Installera en backventil på vattenledningen.", "تركيب صمام عدم رجوع على خط المياه."],
    "Lexin002189": ["Lyfta in badkaret.", "إدخال حوض الاستحمام."],
    "Lexin002194": ["Kakla om badrummet.", "إعادة تبليط الحمام."],
    "Lexin002220": ["Leka på husets bakgård.", "الَلعب في الفناء الخلفي للمنزل."],
    "Lexin002269": ["Göra en balansering av ventilationen.", "إجراء موازنة للتهوية."],
    "Lexin002274": ["Företagets balansräkning ser bra ut.", "الميزانية العمومية للشركة تبدو جيدة."],
    "Lexin002284": ["Taket bärs upp av en balk.", "السقف محمول بواسطة عارضة."],
    "Lexin002286": ["Bron är en balkbro.", "الجسر هو جسر عارضة (balkbro)."],
    "Lexin002288": ["Sitta på balkongen.", "الجلوس في الشرفة."],
    "Lexin002289": ["Gjuta en ny balkongplatta.", "صب بلاطة شرفة جديدة."],
    "Lexin002292": ["Lägga ballast under spåret.", "وضع الركام (ballast) تحت السكة."],
    "Lexin002293": ["Köra med ballastspridare.", "القيادة بآلة نشر الركام."],
    "Lexin002302": ["Ett räcke med vacker balustrad.", "درابزين ذو أعمدة جميلة (balustrad)."],
    "Lexin002323": ["Binda virket med bandjärn.", "ربط الخشب بشريط حديدي."],
    "Lexin002324": ["Lastade jord med en bandlastare.", "حمل التربة بجرافة مجنزرة (bandlastare)."],
    "Lexin002327": ["Såga brädan i en bandsåg.", "نشر اللوح بمنشار شريطي."],
    "Lexin002329": ["Väga gruset på en bandvåg.", "وزن الحصى على ميزان سير."],
    "Lexin002344": ["Stabilt material för bankfyllning.", "مادة مستقرة لردم السدود (أو الطرق)."],
    "Lexin002346": ["Bankhöjden är tre meter.", "ارتفاع السد (الطريق) ثلاثة أمتار."],
    "Lexin002349": ["Utföra bankning av jorden.", "تنفيذ دك (رص) للتربة."],
    "Lexin002351": ["Slå ner bankpålar.", "دق خوازيق السد."],
    "Lexin002352": ["Grundlägga med bankpålning.", "التأسيس بخوازيق السد."],
    "Lexin002428": ["Göra fönstren barnsäkra.", "جعل النوافذ آمنة للأطفال."],
    "Lexin002438": ["Flygplanet har en barometerhöjdmätare.", "الطائرة لديها مقياس ارتفاع بارومتري."],
    "Lexin002444": ["Sätta upp barriärer runt hålet.", "وضع حواجز حول الحفرة."],
    "Lexin002469": ["Kärnkraft står för baslasten.", "الطاقة النووية تمثل حمل الأساس."],
    "Lexin002471": ["Basning av trä för möbeltillverkning.", "تبخير الخشب لصناعة الأثاث."],
    "Lexin002472": ["Maskinen står på en basram.", "الآلة تقف على إطار قاعدة."],
    "Lexin002482": ["Bygga en bastu i källaren.", "بناء ساونا في القبو."],
    "Lexin002497": ["Bygget följer BBR.", "البناء يتبع لوائح Boverket (BBR)."],
    "Lexin002499": ["Renare för BDT-vatten.", "منظف لمياه الاستحمام والغسيل (BDT)."],
    "Lexin002508": ["Lämna 2 mm i bearbetningsmån.", "اترك 2 مم كهامش تصنيع."],
    "Lexin002513": ["Bebygga den nya tomten.", "البناء على الأرض الجديدة."],
    "Lexin002514": ["Detta är en bebyggd tomt.", "هذه أرض مبنية."],
    "Lexin002516": ["Tät bebyggelse i staden.", "عمران كثيف في المدينة."],
    "Lexin002517": ["Värna om en god bebyggelsemiljö.", "الحفاظ على بيئة عمرانية جيدة."],
    "Lexin002522": ["Täta taket med beck.", "سد السقف بالقار (beck)."]
};

let content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);
if (!match) { console.error('Error'); process.exit(1); }

let data = eval(match[1]);
console.log(`Loaded ${data.length} entries`);

let updated = 0;
for (let i = 0; i < data.length; i++) {
    if (examples[data[i][0]]) {
        data[i][7] = examples[data[i][0]][0];
        data[i][8] = examples[data[i][0]][1];
        updated++;
    }
}

console.log(`\n📊 Updated ${updated} entries\n`);

const backupPath = DATA_FILE + '.backup_construction3_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 3 completed!`);
