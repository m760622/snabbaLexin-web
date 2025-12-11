/**
 * Add examples to nouns - Batch 5 (100 nouns: Bakverk to Bazooka)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin002261": ["Bageriets bakverk är alltid färska.", "معجنات المخبز دائماً طازجة."],
    "Lexin002264": ["Balen med tyg vägde 50 kilo.", "وزنت حزمة القماش 50 كيلو."],
    "Lexin002273": ["Balansräkningen visar företagets ekonomiska ställning.", "تُظهر الميزانية وضع الشركة المالي."],
    "Lexin002278": ["Baletten var en magisk upplevelse.", "كان الباليه تجربة ساحرة."],
    "Lexin002279": ["Hon tvättade kläderna i en balja.", "غسلت الملابس في حوض."],
    "Lexin002280": ["Ärtornas baljer var fulla av frön.", "كانت قرون البازلاء مليئة بالبذور."],
    "Lexin002282": ["Balken bär upp taket.", "تحمل العارضة السقف."],
    "Lexin002283": ["Ärvdabalken reglerar arvsrätt.", "ينظم قانون الإرث حقوق الميراث."],
    "Lexin002294": ["Ballerinan dansade en vacker solo.", "رقصت راقصة الباليه منفردة جميلة."],
    "Lexin002295": ["Ballongen flög högt i luften.", "طار البالون عالياً في الهواء."],
    "Lexin002299": ["Balten berättade om sitt hemland.", "روى البلطيقي عن وطنه."],
    "Lexin002301": ["Balustraden runt terrassen var vacker.", "كان الدرابزين حول الشرفة جميلاً."],
    "Lexin002303": ["Möblerna är gjorda av bambu.", "الأثاث مصنوع من الخيزران."],
    "Lexin002304": ["Planeten följer sin bana runt solen.", "يتبع الكوكب مساره حول الشمس."],
    "Lexin002305": ["Löparna sprang runt banan.", "ركض العداؤون حول المضمار."],
    "Lexin002312": ["Hon var en banbrytare inom medicin.", "كانت رائدة في مجال الطب."],
    "Lexin002315": ["Bandet spelade på festivalen.", "عزفت الفرقة في المهرجان."],
    "Lexin002321": ["Demonstranterna bar banderoller.", "حمل المتظاهرون لافتات."],
    "Lexin002322": ["Banditen rånade banken.", "نهب قاطع الطريق البنك."],
    "Lexin002326": ["Bandspelaren spelar gamla kassetter.", "يشغل المسجل أشرطة قديمة."],
    "Lexin002328": ["Bandvagnen tar sig fram i djup snö.", "تتقدم المجنزرة في الثلج العميق."],
    "Lexin002330": ["Bandy spelas på is.", "يُلعب الباندي على الجليد."],
    "Lexin002331": ["Banemännen dömdes till livstid.", "حُكم على القتلة بالسجن المؤبد."],
    "Lexin002332": ["Korstågsfararna bar sitt baner.", "حمل الصليبيون رايتهم."],
    "Lexin002333": ["Vi hörde en bang från flygplanet.", "سمعنا دوياً من الطائرة."],
    "Lexin002334": ["Tågen växlas på bangården.", "تُحوّل القطارات في محطة التحويل."],
    "Lexin002335": ["Banhoppning är en populär ridsport.", "قفز الحواجز رياضة فروسية شائعة."],
    "Lexin002337": ["Järnvägen går på en hög bank.", "يسير السكك الحديدية على ضفة عالية."],
    "Lexin002338": ["En bank av moln skymde solen.", "حجب حاجز من الغيوم الشمس."],
    "Lexin002340": ["Pengarna förvaras i banken.", "تُحفظ الأموال في البنك."],
    "Lexin002342": ["Banketten hölls efter prisutdelningen.", "أُقيمت المأدبة بعد توزيع الجوائز."],
    "Lexin002343": ["Smyckena förvaras i bankfacket.", "تُحفظ المجوهرات في صندوق الإيداع."],
    "Lexin002345": ["Betalningen gjordes via bankgiro.", "تمت الدفعة عبر التحويل البنكي."],
    "Lexin002347": ["Bankiren investerade i fastigheter.", "استثمر المصرفي في العقارات."],
    "Lexin002348": ["Bankmannen hjälpte mig med lånet.", "ساعدني موظف البنك في القرض."],
    "Lexin002350": ["Jag tog ut pengar i bankomaten.", "سحبت مالاً من الصراف الآلي."],
    "Lexin002356": ["Påven uttalade bann mot kätteriet.", "أعلن البابا الحرمان على الهرطقة."],
    "Lexin002357": ["Bannbullan lästes upp i kyrkan.", "قُرئ خطاب الحرمان في الكنيسة."],
    "Lexin002359": ["Han fick höra bannor från chefen.", "سمع توبيخات من المدير."],
    "Lexin002361": ["Baptisten döptes som vuxen.", "تعمد المعمداني كبالغ."],
    "Lexin002364": ["Vi drack en drink på baren.", "شربنا مشروباً في الحانة."],
    "Lexin002368": ["Soldaterna bodde i baracken.", "عاش الجنود في الثكنة."],
    "Lexin002371": ["Barberaren klippte mitt hår.", "قص الحلاق شعري."],
    "Lexin002372": ["Barden sjöng om gamla hjältar.", "غنى الشاعر عن الأبطال القدامى."],
    "Lexin002376": ["Barken skyddar trädet.", "يحمي اللحاء الشجرة."],
    "Lexin002377": ["Barkassen förde passagerare till land.", "نقل الباركاس الركاب إلى البر."],
    "Lexin002378": ["Jag köpte en barkis till frukosten.", "اشتريت رغيفاً للفطور."],
    "Lexin002379": ["Barlasten håller båten stabil.", "يحافظ الحمل الإضافي على استقرار القارب."],
    "Lexin002380": ["Barnet sov vid moderns barm.", "نام الطفل على صدر أمه."],
    "Lexin002388": ["Han bevarade sitt barnasinne.", "حافظ على طفولته الداخلية."],
    "Lexin002389": ["Barnavården stöder föräldrar.", "تدعم رعاية الأطفال الآباء."],
    "Lexin002390": ["Barnavårdscentralen erbjuder gratis undersökningar.", "يقدم مركز رعاية الطفولة فحوصات مجانية."],
    "Lexin002393": ["Barnbarnet besöker mormor varje vecka.", "يزور الحفيد جدته كل أسبوع."],
    "Lexin002394": ["Barnbegränsning diskuteras i många länder.", "يُناقش تحديد النسل في كثير من الدول."],
    "Lexin002400": ["Barnflickan lekte med barnen.", "لعبت المربية مع الأطفال."],
    "Lexin002401": ["Vaccinering har minskat barnförlamning.", "قلل التطعيم شلل الأطفال."],
    "Lexin002403": ["Barnhemmet tog hand om föräldralösa barn.", "اعتنت دار رعاية الأطفال بالأيتام."],
    "Lexin002405": ["Barnen åkte till barnkolonin på sommaren.", "ذهب الأطفال إلى المخيم الصيفي."],
    "Lexin002410": ["Barnmorskan hjälpte vid förlossningen.", "ساعدت القابلة في الولادة."],
    "Lexin002416": ["Barnpassningen ordnades av kommunen.", "نظمت البلدية رعاية الأطفال."],
    "Lexin002417": ["Barnpensionen utbetalas till föräldralösa barn.", "يُصرف معاش الطفل للأيتام."],
    "Lexin002420": ["Han har vetat det sedan barnsben.", "عرف ذلك منذ الطفولة."],
    "Lexin002421": ["Hon dog i barnsbörd.", "ماتت أثناء الولادة."],
    "Lexin002427": ["Barnen går på barnstuga.", "يذهب الأطفال إلى الروضة."],
    "Lexin002430": ["Barntillsynen fungerar bra.", "تعمل رعاية الأطفال بشكل جيد."],
    "Lexin002431": ["Barntillägget betalas till pensionärer.", "تُدفع علاوة الطفل للمتقاعدين."],
    "Lexin002436": ["Barocken präglades av överdådiga former.", "تميز الباروك بالأشكال الفخمة."],
    "Lexin002439": ["Baronen bodde i ett slott.", "عاش البارون في قصر."],
    "Lexin002440": ["Barren från granen täcker marken.", "تغطي إبر الصنوبر الأرض."],
    "Lexin002441": ["Gymnaster tränar på barr.", "يتدرب لاعبو الجمباز على العارضة."],
    "Lexin002442": ["Demonstranterna byggde barrikader.", "بنى المتظاهرون متاريس."],
    "Lexin002443": ["Språkbarriären gjorde kommunikationen svår.", "صعّب حاجز اللغة التواصل."],
    "Lexin002447": ["Bartendern mixade en cocktail.", "خلط النادل كوكتيلاً."],
    "Lexin002448": ["Barytonens röst fyllde salen.", "ملأ صوت الباريتون القاعة."],
    "Lexin002449": ["Han sjunger bas i kören.", "يغني بصوت جهير في الجوقة."],
    "Lexin002452": ["Militärbasen ligger utanför staden.", "تقع القاعدة العسكرية خارج المدينة."],
    "Lexin002453": ["Basen neutraliserar syran.", "يعادل القلوي الحمض."],
    "Lexin002455": ["Basaren samlade in pengar till välgörenhet.", "جمع السوق الخيري أموالاً للإحسان."],
    "Lexin002457": ["Basbeloppet justeras varje år.", "يُعدّل المبلغ الأساسي كل عام."],
    "Lexin002461": ["Basfiolen spelar de lägsta tonerna.", "تعزف الكونترباس أخفض النغمات."],
    "Lexin002462": ["Basilika ger smak åt pastan.", "يضفي الريحان نكهة على المعكرونة."],
    "Lexin002463": ["Det är basis för beslutet.", "هذا أساس القرار."],
    "Lexin002464": ["Basken talade sitt egna språk.", "تحدث الباسكي لغته الخاصة."],
    "Lexin002465": ["Han bar en svart basker.", "ارتدى قبعة بيريه سوداء."],
    "Lexin002467": ["Basketboll är populärt i USA.", "كرة السلة شائعة في أمريكا."],
    "Lexin002470": ["Bollen landade utanför baslinjen.", "سقطت الكرة خارج خط النهاية."],
    "Lexin002473": ["Bassängen var 25 meter lång.", "كان طول الحوض 25 متراً."],
    "Lexin002474": ["Korgen är flätad av bast.", "السلة مصنوعة من اللحاء الليفي."],
    "Lexin002478": ["Bastarden kombinerar egenskaper från båda arterna.", "يجمع الهجين صفات من كلا النوعين."],
    "Lexin002479": ["Förr kallades oäkta barn bastard.", "في الماضي سمي الطفل غير الشرعي ابن حرام."],
    "Lexin002480": ["Bastionen försvarade fästningen.", "دافع البستين عن القلعة."],
    "Lexin002483": ["Basunen spelade högt i orkestern.", "عزفت المتردّدة بصوت عالٍ في الأوركسترا."],
    "Lexin002485": ["Bataljen varade i flera timmar.", "استمرت المعركة عدة ساعات."],
    "Lexin002486": ["Bataljonen marscherade mot fronten.", "سارت الكتيبة نحو الجبهة."],
    "Lexin002487": ["Batiken har vackra mönster.", "للباتيك أنماط جميلة."],
    "Lexin002488": ["Blusen är gjord av batist.", "البلوزة مصنوعة من قماش قطني."],
    "Lexin002489": ["Polisen bar en batong.", "حمل الشرطي هراوة."],
    "Lexin002492": ["Trummisen spelade på batteriet.", "عزف عازف الطبول على الدرامز."],
    "Lexin002493": ["Bautastenen restes för tusen år sedan.", "أُقيم حجر الشاهد منذ ألف عام."],
    "Lexin002495": ["Soldaten avfyrade bazookan.", "أطلق الجندي البازوكا."]
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

const backupPath = DATA_FILE + '.backup_nouns5_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns.`);
