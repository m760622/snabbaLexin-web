/**
 * Add examples to nouns - Batch 7 (100 nouns: Bifftomat to Blodpudding)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin003311": ["Bifftomat är perfekt för hamburgare.", "طماطم البيف مثالية للهمبرغر."],
    "Lexin003314": ["Bifokalglas korrigerar både när- och fjärrseende.", "النظارات ثنائية البؤرة تصحح القصر والبعد."],
    "Lexin003315": ["Bigami är förbjudet i Sverige.", "تعدد الزوجات محظور في السويد."],
    "Lexin003316": ["Bigarrån är ett sött körsbär.", "البيغارو كرز حلو."],
    "Lexin003319": ["Bihålan var inflammerad.", "كان الجيب الأنفي ملتهباً."],
    "Lexin003322": ["Bikarbonat används vid bakning.", "يُستخدم البيكربونات في الخبز."],
    "Lexin003324": ["Hon bar en röd bikini på stranden.", "ارتدت بيكيني أحمر على الشاطئ."],
    "Lexin003325": ["Bikten är helig inom kyrkan.", "الاعتراف مقدس في الكنيسة."],
    "Lexin003329": ["Snickaren använde en bila.", "استخدم النجار الفأس العريض."],
    "Lexin003330": ["Bilagan till brevet innehöll viktiga dokument.", "احتوى ملحق الرسالة على وثائق مهمة."],
    "Lexin003331": ["Bilagan till e-postmeddelandet var för stor.", "كانت الوثيقة الملحقة بالبريد كبيرة جداً."],
    "Lexin003337": ["Bilbältet räddade hennes liv.", "أنقذ حزام الأمان حياتها."],
    "Lexin003347": ["Barnet läste i sin bilderbok.", "قرأ الطفل في كتابه المصور."],
    "Lexin003349": ["Bildläsaren skannade dokumentet.", "مسح قارئ الصور الوثيقة."],
    "Lexin003350": ["Hennes bildning är imponerande.", "ثقافتها مثيرة للإعجاب."],
    "Lexin003352": ["Bildröret i den gamla TV:n är trasigt.", "أنبوب الشاشة في التلفزيون القديم تالف."],
    "Lexin003353": ["Bildskärmen visar tydliga färger.", "تعرض الشاشة ألواناً واضحة."],
    "Lexin003354": ["Poetens bildspråk var rikt.", "كانت لغة الشاعر التصويرية غنية."],
    "Lexin003355": ["Hans bildspråk fängslade publiken.", "أسر تعبيره الصوري الجمهور."],
    "Lexin003358": ["Bilismen har ökat kraftigt.", "ازدادت حركة السيارات بشكل كبير."],
    "Lexin003359": ["Bilisten stannade vid rödljuset.", "توقف السائق عند الإشارة الحمراء."],
    "Lexin003360": ["Vi spelade biljard på baren.", "لعبنا البلياردو في الحانة."],
    "Lexin003362": ["En biljon är tusen miljarder.", "البليون ألف مليار."],
    "Lexin003368": ["Bilprovningen visade inga fel.", "لم يُظهر فحص السيارة أي أعطال."],
    "Lexin003369": ["Bilregistret har information om alla fordon.", "يحتوي سجل السيارات على معلومات عن كل المركبات."],
    "Lexin003370": ["Bilskatten betalas årligen.", "تُدفع ضريبة السيارة سنوياً."],
    "Lexin003375": ["Hon köpte bindor på apoteket.", "اشترت فوطاً صحية من الصيدلية."],
    "Lexin003382": ["Han bar en bindel om armen.", "ارتدى عصابة حول ذراعه."],
    "Lexin003384": ["'Och' är ett bindeord.", "'و' كلمة رابطة."],
    "Lexin003387": ["Bindestreck används för att binda samman ord.", "تُستخدم الواصلة لربط الكلمات."],
    "Lexin003388": ["Skriv bindestreck mellan orden.", "اكتب شرطة بين الكلمات."],
    "Lexin003390": ["Skidornas bindningar måste justeras.", "يجب ضبط روابط الزلاجات."],
    "Lexin003406": ["Bingen var full av malm.", "كانت الحاوية مليئة بالخام."],
    "Lexin003407": ["Vi spelade bingo på äldreboendet.", "لعبنا البنغو في دار المسنين."],
    "Lexin003408": ["Det var bingo! Han vann!", "بنغو! لقد فاز!"],
    "Lexin003419": ["Vi gick på bio och såg en film.", "ذهبنا إلى السينما وشاهدنا فيلماً."],
    "Lexin003420": ["Biografin berättade om hans liv.", "روت السيرة الذاتية عن حياته."],
    "Lexin003422": ["Biologen studerade ekosystemet.", "درس عالم الأحياء النظام البيئي."],
    "Lexin003423": ["Biologi är ett spännande ämne.", "علم الأحياء مادة مثيرة."],
    "Lexin003427": ["Biomassa kan användas som energikälla.", "يمكن استخدام الكتلة الحيوية كمصدر طاقة."],
    "Lexin003429": ["Biorytmen påverkar vår sömn.", "يؤثر الإيقاع الحيوي على نومنا."],
    "Lexin003432": ["Han drack en bira efter jobbet.", "شرب بيرة بعد العمل."],
    "Lexin003433": ["Det är bara en bisak.", "هذه مجرد تفاهة."],
    "Lexin003435": ["Bisatsen börjar med 'att'.", "تبدأ العبارة الفرعية بـ'أن'."],
    "Lexin003437": ["Bisittaren gav juridiska råd.", "قدم المستشار المساعد نصائح قانونية."],
    "Lexin003438": ["Biskopen vigde paret.", "زوّج الأسقف الزوجين."],
    "Lexin003439": ["Biskopsstolen var ledig.", "كان منصب الأسقف شاغراً."],
    "Lexin003444": ["Maten hade en bismak av bränt.", "كان للطعام مذاق محترق."],
    "Lexin003447": ["Vi åt lunch på bistron.", "تناولنا الغداء في المقهى."],
    "Lexin003455": ["En bit är antingen 0 eller 1.", "البت إما 0 أو 1."],
    "Lexin003463": ["Biträdet i affären hjälpte mig.", "ساعدني المعاون في المتجر."],
    "Lexin003470": ["Bitsocker passar bra till te.", "السكر المكعب يناسب الشاي."],
    "Lexin003483": ["Bjudningen var en succé.", "كان الحفل ناجحاً."],
    "Lexin003484": ["Bjälken bär upp taket.", "تحمل العارضة السقف."],
    "Lexin003487": ["Bjällran ringde när dörren öppnades.", "رنّ الجرس عندما فُتح الباب."],
    "Lexin003488": ["Bjässen i sagan var snäll.", "كان العملاق في الحكاية طيباً."],
    "Lexin003490": ["Björken är vacker på våren.", "شجرة البتولا جميلة في الربيع."],
    "Lexin003493": ["Vi plockade björnbär i skogen.", "قطفنا العُلّيق في الغابة."],
    "Lexin003494": ["Att hjälpa för mycket kan vara en björntjänst.", "المساعدة الزائدة قد تكون ضارة."],
    "Lexin003497": ["Han fick black på spelningen.", "واجه عقبة في الأداء."],
    "Lexin003498": ["Han fick en blackout under provet.", "أصيب بفقدان وعي مؤقت أثناء الامتحان."],
    "Lexin003501": ["Knivens blad var vasst.", "كان نصل السكين حاداً."],
    "Lexin003503": ["Sluta med det där blajet!", "توقف عن هذا الهراء!"],
    "Lexin003509": ["Sverige har blandekonomi.", "لدى السويد اقتصاد مختلط."],
    "Lexin003515": ["Fyll i blanketten med dina uppgifter.", "املأ الاستمارة ببياناتك."],
    "Lexin003516": ["Underteckna in blanko.", "وقّع على بياض."],
    "Lexin003521": ["Kaffet var bara blask.", "كان القهوة مجرد ماء خفيف."],
    "Lexin003522": ["Blasket gjorde gatorna hala.", "جعل الطين الشوارع زلقة."],
    "Lexin003523": ["Den där blaskan skriver bara skvaller.", "تلك الصحيفة الصفراء تكتب ثرثرة فقط."],
    "Lexin003524": ["Blasten från morötterna kastas.", "يُرمى ورق الجزر."],
    "Lexin003525": ["Han bar en marinblå blazer.", "ارتدى سترة زرقاء داكنة."],
    "Lexin003526": ["Burken är gjord av bleck.", "العلبة مصنوعة من الصفيح."],
    "Lexin003527": ["Blecket i orkestern spelade starkt.", "عزفت آلات النفخ النحاسية بقوة."],
    "Lexin003531": ["De kallade européer för blekansikte.", "أسموا الأوروبيين بوجوه شاحبة."],
    "Lexin003537": ["Hon fick en blessyr på knäet.", "أصيبت بجرح في ركبتها."],
    "Lexin003543": ["Tavlan var ett blickfång i rummet.", "كانت اللوحة محط الأنظار في الغرفة."],
    "Lexin003544": ["Han stod i blickpunkten.", "كان في بؤرة الاهتمام."],
    "Lexin003547": ["Blidväder kom i januari.", "جاء طقس دافئ في يناير."],
    "Lexin003551": ["Barnen lekte blindbock på festen.", "لعب الأطفال الاستغماية في الحفلة."],
    "Lexin003552": ["Blindgångaren röjdes av experter.", "أُزيلت القنبلة غير المنفجرة من قبل خبراء."],
    "Lexin003556": ["Blindskrift gör det möjligt för blinda att läsa.", "تمكّن الكتابة النافرة المكفوفين من القراءة."],
    "Lexin003557": ["Båten gick på ett blindskär.", "اصطدم القارب بصخرة تحت الماء."],
    "Lexin003558": ["Blindtarmen opererades bort.", "أُزيلت الزائدة الدودية."],
    "Lexin003564": ["Blinkern visar att bilen ska svänga.", "يُظهر الغمّاز أن السيارة ستنعطف."],
    "Lexin003579": ["Kamerans blixt lyste upp rummet.", "أضاء فلاش الكاميرا الغرفة."],
    "Lexin003582": ["Blixtlåset på jackan är trasigt.", "السحّاب في السترة تالف."],
    "Lexin003585": ["Jag skrev på ett block.", "كتبت على مجموعة ورق."],
    "Lexin003586": ["Blocket lyfter tunga saker.", "ترفع البكّارة الأشياء الثقيلة."],
    "Lexin003589": ["Blockaden hindrade handeln.", "منع الحصار التجارة."],
    "Lexin003594": ["Hon spelar blockflöjt i orkestern.", "تعزف الناي في الأوركسترا."],
    "Lexin003595": ["Blockhuset gav skydd åt soldaterna.", "وفر المعقل حماية للجنود."],
    "Lexin003603": ["Blodbaddet chockade världen.", "صدمت المذبحة العالم."],
    "Lexin003607": ["Blodbrist ger trötthet.", "يسبب فقر الدم إرهاقاً."],
    "Lexin003618": ["Blodförgiftning kan vara dödlig.", "يمكن أن يكون تسمم الدم مميتاً."],
    "Lexin003624": ["Blodgivaren donerade regelbundet.", "تبرع المتبرع بالدم بانتظام."],
    "Lexin003628": ["Blodhunden spårade den försvunna.", "تتبع كلب الأثر المفقود."],
    "Lexin003636": ["Blodkärlet var skadat.", "كان الوعاء الدموي تالفاً."],
    "Lexin003643": ["Blodomloppet distribuerar syre.", "توزع الدورة الدموية الأكسجين."],
    "Lexin003647": ["Blodproppen orsakade en stroke.", "سببت الجلطة الدموية سكتة دماغية."],
    "Lexin003652": ["Blodpudding serveras med lingon.", "يُقدم بودنغ الدم مع التوت البري."]
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

const backupPath = DATA_FILE + '.backup_nouns7_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns.`);
