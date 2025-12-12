/**
 * Add examples to CONSTRUCTION terms - Batch 4 (100 terms: Befintlig byggnad to Bjälke)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin002563": ["Renovera en befintlig byggnad.", "تجديد مبنى قائم (موجود)."],
    "Lexin002564": ["Kartan visar befintlig markanvändning.", "الخريطة تظهر استخدام الأرض الحالي."],
    "Lexin002565": ["Lokalisera befintlig tjänst (kabel/rör).", "تحديد موقع الخدمات الموجودة (كابلات/أنابيب)."],
    "Lexin002574": ["Hög befolkningstäthet i området.", "كثافة سكانية عالية في المنطقة."],
    "Lexin002594": ["System för befuktning av luften.", "نظام لترطيب الهواء."],
    "Lexin002625": ["Begränsa tillträdet till byggplatsen.", "تحديد (تقييد) الوصول إلى موقع البناء."],
    "Lexin002626": ["Göra en begränsad anbudsinfordran.", "إجراء دعوة مناقصة محدودة."],
    "Lexin002666": ["Starta med en behovsutredning.", "البدء بدراسة احتياجات."],
    "Lexin002733": ["Bron har nått hög belastningsgrad.", "الجسر وصل إلى درجة تحميل عالية."],
    "Lexin002734": ["Beräkna max belastningsnivå.", "حساب أقصى مستوى تحميل."],
    "Lexin002740": ["Identifiera vilken belastningstyp det är.", "تحديد نوع الحمل."],
    "Lexin002741": ["Ta hänsyn till belastningsvariationer.", "مراعاة تباينات (تغيرات) الحمل."],
    "Lexin002742": ["Dokumentera alla belastningsvärden.", "توثيق جميع قيم التحميل."],
    "Lexin002753": ["Montera belysning i taket.", "تركيب الإضاءة في السقف."],
    "Lexin002754": ["Följa belysningsplanerna.", "اتباع مخططات الإضاءة."],
    "Lexin002757": ["Huset har ett högt belåningsvärde.", "المنزل لديه قيمة رهن عالية."],
    "Lexin002772": ["Slitstark beläggning på golvet.", "طبقة (كسوة) مقاومة للاهتراء على الأرضية."],
    "Lexin002773": ["Vägen fick ny beläggning (asfalt).", "الطريق حصل على رصف جديد."],
    "Lexin002781": ["Hyra personal från ett bemanningsföretag.", "استئجار عمال من شركة توظيف."],
    "Lexin002802": ["Utgå från en benchmark (fixpunkt).", "الانطلاق من نقطة مرجعية ثابتة."],
    "Lexin002859": ["Projektet startades som beredskapsarbete.", "المشروع بدأ كعمل طوارئ (لإيجاد فرص عمل)."],
    "Lexin002860": ["Ha en beredskapsplan för olyckor.", "امتلاك خطة طوارئ للحوادث."],
    "Lexin002861": ["Vidta en beredskapsåtgärd.", "اتخاذ إجراء احترازي (للطوارئ)."],
    "Lexin002865": ["Huset står på fast berg.", "المنزل يقف على صخر صلب."],
    "Lexin002867": ["Byta spets på bergborren.", "تغيير رأس مثقاب الصخور."],
    "Lexin002868": ["Köra en stor bergborrmaskin.", "تشغيل آلة حفر صخور كبيرة."],
    "Lexin002872": ["Bestämma vilken bergklass det är.", "تحديد فئة الصخر."],
    "Lexin002873": ["Göra en bergklassificering innan tunnelbygget.", "إجراء تصنيف للصخور قبل بناء النفق."],
    "Lexin002874": ["Fyll ut med bergkross.", "الردم باستخدام كسر الصخور."],
    "Lexin002875": ["Beräkna volymen bergmjöl (bergmassa).", "حساب حجم الكتلة الصخرية."],
    "Lexin002876": ["Använda krossat bergmaterial.", "استخدام مواد صخرية مكسرة."],
    "Lexin002877": ["Borra ner till bergnivå.", "الحفر وصولاً إلى مستوى الصخر."],
    "Lexin002878": ["Utföra bergrensning efter sprängning.", "تنفيذ تنظيف للصخور (إزالة الصخور السائبة) بعد التفجير."],
    "Lexin002881": ["Sänka ner utrustning i ett bergschakt.", "إنزال المعدات في بئر (عمود) صخري."],
    "Lexin002882": ["Starta arbetet med bergschaktning.", "بدء أعمال الحفر في الصخر."],
    "Lexin002883": ["Rita upp en bergsektion.", "رسم مقطع للصخر."],
    "Lexin002885": ["Skjuta ett litet bergskott.", "تفجير شحنة صغيرة في الصخر."],
    "Lexin002889": ["Tillstånd för bergsprängning.", "تصريح لتفجير الصخور."],
    "Lexin002890": ["Mäta bergspänning i tunneln.", "قياس إجهاد الصخر في النفق."],
    "Lexin002892": ["Förstärka mot högt bergtryck.", "التقوية ضد ضغط الصخر العالي."],
    "Lexin002893": ["Stort berguttag vid bygget.", "استخراج كميات كبيرة من الصخور عند البناء."],
    "Lexin002894": ["Installera bergvärme.", "تركيب تدفئة جوفية (من الصخر)."],
    "Lexin002915": ["Använda rätt beräkningstryck.", "استخدام ضغط الحساب (التصميمي) الصحيح."],
    "Lexin002943": ["Anlita en oberoende besiktningsman.", "توظيف مفتش مستقل."],
    "Lexin002944": ["Följa projektets besiktningsplan.", "اتباع خطة الفحص للمشروع."],
    "Lexin002945": ["Skriva under besiktningsprotokollet.", "التوقيع على محضر الفحص."],
    "Lexin002979": ["Läsa teknisk beskrivning.", "قراءة الوصف الفني."],
    "Lexin002980": ["Samla alla ritningar och beskrivningar.", "جمع كل الرسومات والمواصفات."],
    "Lexin002999": ["Vänta på kommunens beslut.", "انتظار قرار البلدية."],
    "Lexin003002": ["Platschefen har beslutanderätt.", "مدير الموقع لديه حق اتخاذ القرار."],
    "Lexin003006": ["Möte med viktiga beslutsfattare.", "اجتماع مع صناع القرار الرئيسيين."],
    "Lexin003047": ["Bestyrka kopian av certifikatet.", "التصديق على نسخة الشهادة."],
    "Lexin003062": ["Beställaren godkände ritningen.", "العم일 (صاحب العمل) وافق على الرسم."],
    "Lexin003065": ["Göra en beställning på virke.", "عمل طلبية للخشب."],
    "Lexin003066": ["Detta är ett beställningsarbete.", "هذا عمل حسب الطلب."],
    "Lexin003105": ["Parkera på besöksparkeringen.", "الوقوف في مواقف الزوار."],
    "Lexin003129": ["Följa uppgjord betalningsplan.", "اتباع خطة الدفع الموضوعة."],
    "Lexin003152": ["Gjuta plattan i betong.", "صب البلاطة بالخرسانة."],
    "Lexin003153": ["Han jobbar som betongare.", "هو يعمل كعامل خرسانة."],
    "Lexin003154": ["Slitstark betongbeläggning.", "كثوة خرسانية متينة."],
    "Lexin003155": ["Betongbilen kommer klockan sju.", "سيارة الخرسانة تأتي في السابعة."],
    "Lexin003156": ["Blanda bruk i en betongblandare.", "خلط المونة في خلاطة خرسانة."],
    "Lexin003159": ["Bygga en betonggjutform av trä.", "بناء قالب صب خرسانة من الخشب."],
    "Lexin003160": ["Förbereda för betonggjutning.", "التحضير لصب الخرسانة."],
    "Lexin003161": ["Köra med betongglättare.", "العمل بمروحة تنعيم الخرسانة."],
    "Lexin003162": ["Huset har en tung betongkonstruktion.", "المنزل له هيكل خرساني ثقيل."],
    "Lexin003164": ["Vibrera betongmassan väl.", "هز (دمك) كتلة الخرسانة جيداً."],
    "Lexin003165": ["Lägga betongpannor på taket.", "وضع بلاط خرساني (قرميد) على السقف."],
    "Lexin003166": ["Huset står på en betongplatta.", "المنزل يقف على بلاطة خرسانية."],
    "Lexin003167": ["Skicka kuben för betongprovning.", "إرسال المكعب لاختبار الخرسانة."],
    "Lexin003168": ["Beställa en betongpump.", "طلب مضخة خرسانة."],
    "Lexin003169": ["Lägga ner betongrör för avloppet.", "tarkib أنابيب خرسانية للصرف."],
    "Lexin003170": ["Kontrollera varje betongsats.", "فحص كل عجنة (دفعة) خرسانة."],
    "Lexin003171": ["Lägga ett tunt betongskikt.", "وضع طبقة رقيقة من الخرسانة."],
    "Lexin003172": ["Montera betongskivor på fasaden.", "تركيب ألواح خرسانية على الواجهة."],
    "Lexin003173": ["Använda en betongspruta för tunneln.", "استخدام قاذف خرسانة للنفق."],
    "Lexin003174": ["Hämta betong från betongstationen.", "جلب الخرسانة من محطة الخرسانة."],
    "Lexin003176": ["Kapa dörrhålet med en betongsåg.", "قص فتحة الباب بمنشار خرسانة."],
    "Lexin003177": ["Mäta betongtemperaturen vid gjutning.", "قياس درجة حرارة الخرسانة عند الصب."],
    "Lexin003178": ["Försenad betongtransport.", "نقل خرسانة متأخر."],
    "Lexin003192": ["Dörren är mörkt betsad.", "الباب مطلي بطلاء (مصبوغ) غامق."],
    "Lexin003235": ["Huset ligger i ett bevarandeområde.", "المنزل يقع في منطقة محمية (تراثية)."],
    "Lexin003280": ["Kolla reglerna i BFS.", "تحقق من القواعد في مجموعة لوائح Boverket (BFS)."],
    "Lexin003286": ["Lägenheten har stor biyta (BIA).", "الشقة بها مساحة ثانوية (BIA) كبيرة."],
    "Lexin003332": ["Se bilaga 1 för detaljer.", "انظر الملحق 1 للتفاصيل."],
    "Lexin003367": ["Hacka upp golvet med en bilningshammare.", "تكسير الأرضية بمطرقة تكسير."],
    "Lexin003372": ["Leda om biltrafiken under bygget.", "تحويل مسار حركة السيارات أثناء البناء."],
    "Lexin003379": ["Använda en bindare i cementen.", "استخدام رابط في الأسمنت."],
    "Lexin003383": ["Cement fungerar som bindemedel.", "الأسمنت يعمل كمادة رابطة."],
    "Lexin003392": ["Få god bindning mellan lagren.", "الحصول على تماسك (رابط) جيد بين الطبقات."],
    "Lexin003393": ["Limmet har kort bindningstid.", "الغراء لديه وقت جفاف (تماسك) قصير."],
    "Lexin003416": ["Värma huset med biobränsle.", "تدفئة المنزل بالوقود الحيوي."],
    "Lexin003418": ["Produktion av biogas.", "إنتاج الغاز الحيوي."],
    "Lexin003425": ["Ta hänsyn till biologisk mångfald vid bygget.", "مراعاة التنوع البيولوجي عند البناء."],
    "Lexin003468": ["Byta bits i skruvdragaren.", "تغيير الرأس (bits) في مفك البراغي."],
    "Lexin003475": ["Ett lager av bitumen.", "طبقة من البيتومين."],
    "Lexin003476": ["Vägen är gjord av bitumenbundet grus.", "الطريق مصنوع من حصى مربوط بالبيتومين."],
    "Lexin003477": ["Spruta ut bitumenemulsion.", "رش مستحلب البيتومين."],
    "Lexin003478": ["Lägga en bituminös beläggning.", "وضع طبقة بيتومينية."],
    "Lexin003485": ["Golvet vilar på en kraftig bjälke.", "الأرضية ترتكز على عارضة (bjälke) قوية."]
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

const backupPath = DATA_FILE + '.backup_construction4_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 4 completed!`);
