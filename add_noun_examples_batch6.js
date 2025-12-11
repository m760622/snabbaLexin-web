/**
 * Add examples to nouns - Batch 6 (100 nouns: Beatnik to Biennal)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin002509": ["Beatnikerna revolterade mot samhället på 50-talet.", "تمرد البوهيميون على المجتمع في الخمسينيات."],
    "Lexin002520": ["Bebådelsen talade om svåra tider.", "تنبأ التكهن بأوقات صعبة."],
    "Lexin002521": ["Beck används för att täta båtar.", "يُستخدم القطران لإحكام القوارب."],
    "Lexin002523": ["Radioaktiviteten mäts i becquerel.", "تُقاس الإشعاعية بالبكرل."],
    "Lexin002529": ["Bedragaren lurade pensionärer på pengar.", "خدع النصاب المتقاعدين على أموالهم."],
    "Lexin002532": ["Räddningen av barnen var en stor bedrift.", "كان إنقاذ الأطفال إنجازاً عظيماً."],
    "Lexin002542": ["Beduinen lever i öknen.", "يعيش البدوي في الصحراء."],
    "Lexin002550": ["Bedövningen gjorde operationen smärtfri.", "جعل التخدير العملية خالية من الألم."],
    "Lexin002553": ["Soldaten följde befallningen.", "اتبع الجندي الأمر."],
    "Lexin002572": ["Befolkningen i Sverige är ca 10 miljoner.", "عدد سكان السويد حوالي 10 ملايين."],
    "Lexin002607": ["Bröllopet var en stor begivenhet.", "كان الزفاف حدثاً كبيراً."],
    "Lexin002608": ["Begonian trivs i skugga.", "تنمو البغونية في الظل."],
    "Lexin002611": ["Begravningen hölls i kyrkan.", "أقيمت الجنازة في الكنيسة."],
    "Lexin002613": ["Begravningsbyrån ordnade allt.", "نظم مكتب الدفن كل شيء."],
    "Lexin002638": ["Begäret efter makt förblindade honom.", "أعماه الطمع في السلطة."],
    "Lexin002659": ["Behaviorismen studerar observerbart beteende.", "تدرس السلوكية التصرفات الملاحظة."],
    "Lexin002665": ["Behovsprövningen avgör rätten till bidrag.", "يحدد التحقق من الحاجة الحق في الإعانة."],
    "Lexin002667": ["Behån var bekväm att bära.", "كانت الصدرية مريحة للارتداء."],
    "Lexin002668": ["Böckerna var i gott behåll.", "كانت الكتب في حالة جيدة."],
    "Lexin002669": ["Behållaren rymmer 10 liter.", "تتسع الحاوية لـ 10 لترات."],
    "Lexin002677": ["Han visade stor behärskning.", "أظهر سيطرة كبيرة على نفسه."],
    "Lexin002701": ["Beklädnaden var elegant.", "كانت الثياب أنيقة."],
    "Lexin002717": ["Bekämpningen av sjukdomen var framgångsrik.", "كانت مكافحة المرض ناجحة."],
    "Lexin002718": ["Bekämpningsmedel kan skada miljön.", "يمكن لمواد المكافحة أن تضر البيئة."],
    "Lexin002720": ["Hans bekännelse överraskade alla.", "فاجأ اعترافه الجميع."],
    "Lexin002745": ["Belgaren talade både franska och flamländska.", "تحدث البلجيكي الفرنسية والفلمنكية."],
    "Lexin002756": ["Belåningen av huset täckte ombyggnaden.", "غطى رهن المنزل تكاليف التجديد."],
    "Lexin002770": ["Vägens beläggning var sliten.", "كانت تكسية الطريق بالية."],
    "Lexin002776": ["Belägringstillstånd utlystes efter kuppförsöket.", "أُعلنت حالة الطوارئ بعد محاولة الانقلاب."],
    "Lexin002779": ["Hon fick en belöning för sin insats.", "حصلت على مكافأة لجهودها."],
    "Lexin002783": ["Han hade bemyndigande att skriva under.", "كان لديه تفويض للتوقيع."],
    "Lexin002795": ["Benan i håret var rak.", "كان فرق الشعر مستقيماً."],
    "Lexin002798": ["Benbrottet opererades direkt.", "أُجريت عملية الكسر فوراً."],
    "Lexin002799": ["Han fick benbrott vid olyckan.", "أصيب بكسر في الساق في الحادث."],
    "Lexin002834": ["Benådningen räddade hans liv.", "أنقذ العفو حياته."],
    "Lexin002853": ["Beredningen undersökte frågan.", "درست اللجنة المسألة."],
    "Lexin002866": ["Berg- och dalbanan var spännande.", "كانت الأفعوانية مثيرة."],
    "Lexin002879": ["Bergrummet användes som förråd.", "استُخدم الكهف كمخزن."],
    "Lexin002884": ["Bergskedjan sträcker sig genom hela landet.", "تمتد سلسلة الجبال عبر البلاد."],
    "Lexin002886": ["Bergspredikan innehåller Jesu lära.", "تحتوي الموعظة على الجبل على تعاليم يسوع."],
    "Lexin002887": ["Bergsprängaren förberedde sprängningen.", "جهز خبير التفجير العملية."],
    "Lexin002888": ["Han spelade musik på sin bergsprängare.", "شغل الموسيقى على ستيريوه الضخم."],
    "Lexin002897": ["Tidningen publicerade beriktigande.", "نشرت الجريدة تصحيحاً."],
    "Lexin002899": ["Berlocken hängde i kedjan.", "تدلت القلادة من السلسلة."],
    "Lexin002906": ["Vi satt i bersån och drack kaffe.", "جلسنا في التعريشة ونشرب القهوة."],
    "Lexin002917": ["Berättaren fängslade publiken.", "أسر المحدث الجمهور."],
    "Lexin002918": ["Berättaren fick nobelpriset.", "حصل المؤلف على جائزة نوبل."],
    "Lexin002919": ["Berättelsen var gripande.", "كانت القصة مؤثرة."],
    "Lexin002923": ["Han hade berättigande att klaga.", "كان له الحق في الشكوى."],
    "Lexin002927": ["Berömdhet kan vara en börda.", "قد تكون الشهرة عبئاً."],
    "Lexin002928": ["Hans berömmelse spred sig världen över.", "انتشرت شهرته في العالم."],
    "Lexin002940": ["Bilbesiktningen visade inga fel.", "لم يُظهر فحص السيارة أي أخطاء."],
    "Lexin002942": ["Besiktningsinstrumentet ska förvaras i bilen.", "يجب حفظ قسيمة الفحص في السيارة."],
    "Lexin002955": ["Besittningsskyddet gäller för hyresgäster.", "تسري حماية الحيازة على المستأجرين."],
    "Lexin002963": ["Varans beskaffenhet var utmärkt.", "كانت نوعية البضاعة ممتازة."],
    "Lexin002973": ["Beskickningen representerar landet utomlands.", "تمثل المفوضية البلاد في الخارج."],
    "Lexin002982": ["Hon stod under hans beskydd.", "كانت تحت حمايته."],
    "Lexin002992": ["Beslaget på dörren var av mässing.", "كانت الواقية المعدنية على الباب من النحاس."],
    "Lexin003017": ["Hans besparingar räckte till resan.", "كفت مدخراته للرحلة."],
    "Lexin003018": ["Bespisningen serverade gratis mat.", "قدمت صالة الطعام وجبات مجانية."],
    "Lexin003021": ["Besten i skogen skrämde barnen.", "أخاف الوحش في الغابة الأطفال."],
    "Lexin003023": ["Besticken var av silver.", "كانت أدوات المائدة من الفضة."],
    "Lexin003025": ["Bestickningen ledde till fängelsestraff.", "أدت الرشوة إلى السجن."],
    "Lexin003041": ["Boken blev en bestseller.", "أصبح الكتاب الأكثر مبيعاً."],
    "Lexin003044": ["Fartygets bestyckning var imponerande.", "كانت العدة الحربية للسفينة مذهلة."],
    "Lexin003056": ["Artens bestånd är hotat.", "تكاثر النوع مهدد."],
    "Lexin003057": ["Bibliotekets bestånd är stort.", "مجموعة المكتبة كبيرة."],
    "Lexin003070": ["Paketets bestämmelse var Stockholm.", "كانت وجهة الطرد ستوكهولم."],
    "Lexin003076": ["Bestörtningen var stor efter nyheten.", "كان الذهول كبيراً بعد الخبر."],
    "Lexin003084": ["Besvären ledde till ändrat beslut.", "أدى الطعن إلى تغيير القرار."],
    "Lexin003090": ["Besvärjelsen var magisk.", "كانت التعويذة سحرية."],
    "Lexin003112": ["Betal-TV kräver extra abonnemang.", "يتطلب التلفزيون المدفوع اشتراكاً إضافياً."],
    "Lexin003116": ["Betalkortet fungerar utan kredit.", "تعمل بطاقة الائتمان بدون ائتمان."],
    "Lexin003117": ["Betalkursen steg under dagen.", "ارتفع سعر البيع خلال اليوم."],
    "Lexin003121": ["Betalningsföreläggandet kom i posten.", "وصل أمر الدفع بالبريد."],
    "Lexin003125": ["Betalningsinställelsen räddade företaget.", "أنقذ توقيف الدفع الشركة."],
    "Lexin003132": ["Betet lockade fisken.", "جذب الطُعم السمكة."],
    "Lexin003134": ["Elefantens betar var enorma.", "كانت أنياب الفيل ضخمة."],
    "Lexin003138": ["Hans beteende var oprofessionellt.", "كان سلوكه غير مهني."],
    "Lexin003141": ["Betinget krävde hårt arbete.", "تطلب العمل بالقطعة جهداً كبيراً."],
    "Lexin003147": ["Betjäningen på hotellet var utmärkt.", "كانت الخدمة في الفندق ممتازة."],
    "Lexin003151": ["Huset är byggt av betong.", "المنزل مبني من الخرسانة."],
    "Lexin003180": ["Vid betraktande av bilden såg hon detaljer.", "عند تأمل الصورة رأت تفاصيل."],
    "Lexin003191": ["Betsen gav träet en varm färg.", "أعطى الطلاء الشفاف الخشب لوناً دافئاً."],
    "Lexin003194": ["Betslet styrde hästen.", "وجه اللجام الحصان."],
    "Lexin003196": ["Myggbettet kliade.", "حكّت لدغة البعوض."],
    "Lexin003198": ["Hon var i bett att hjälpa.", "كانت مستعدة للمساعدة."],
    "Lexin003199": ["Hans bett var perfekt efter tandställningen.", "أصبحت أسنانه مثالية بعد التقويم."],
    "Lexin003214": ["Betygelsen av tacksamhet var uppriktig.", "كان التعبير عن الامتنان صادقاً."],
    "Lexin003218": ["Betäckningen skedde på gården.", "حدث الجماع في المزرعة."],
    "Lexin003224": ["De fick sex månaders betänketid.", "حصلوا على ستة أشهر للتفكير."],
    "Lexin003229": ["Beundran för hjälten var stor.", "كان الإعجاب بالبطل كبيراً."],
    "Lexin003251": ["Bevisbördan ligger hos åklagaren.", "يقع عبء الإثبات على المدعي العام."],
    "Lexin003253": ["Bevisföringen var övertygande.", "كان الإثبات مقنعاً."],
    "Lexin003276": ["Det skedde på hans bevåg.", "حدث ذلك على مسؤوليته."],
    "Lexin003291": ["Bibliofilen samlade gamla böcker.", "جمع عاشق الكتب كتباً قديمة."],
    "Lexin003292": ["Bibliografin listade alla källor.", "سردت الببليوغرافيا جميع المصادر."],
    "Lexin003294": ["Bibliotekarien hjälpte mig hitta boken.", "ساعدني أمين المكتبة في إيجاد الكتاب."],
    "Lexin003298": ["Bidén finns i badrummet.", "الشطافة موجودة في الحمام."],
    "Lexin003305": ["Biennalen visade modern konst.", "عرض المعرض فناً حديثاً."]
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

const backupPath = DATA_FILE + '.backup_nouns6_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns.`);
