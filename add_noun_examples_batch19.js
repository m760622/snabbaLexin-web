/**
 * Add examples to nouns - Batch 19 (100 nouns: Fog to Frikyrka)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin008012": ["Fogen mellan kaklen var smal.", "كانت الوصلة بين البلاط ضيقة."],
    "Lexin008013": ["Det finns fog för oro.", "هناك سبب للقلق."],
    "Lexin008022": ["Fogden övervakade gården.", "أشرف المأمور على المزرعة."],
    "Lexin008032": ["Foldern informerade om produkten.", "أعلم الكتيب عن المنتج."],
    "Lexin008033": ["Folien lindades runt maten.", "لُفت الرقيقة حول الطعام."],
    "Lexin008035": ["Folket hade sina traditioner.", "كان للشعب تقاليده."],
    "Lexin008037": ["Folket krävde förändring.", "طالبت الطبقة الشعبية بالتغيير."],
    "Lexin008039": ["Folkbokföringen uppdaterades.", "حُدّث قيد النفوس."],
    "Lexin008040": ["Folkgruppen hade gemensam kultur.", "كانت للمجموعة العرقية ثقافة مشتركة."],
    "Lexin008041": ["Folkhemmet byggdes på 1900-talet.", "بُني مسكن الرخاء في القرن العشرين."],
    "Lexin008047": ["Folkloren bevarades.", "حُفظ الفولكلور."],
    "Lexin008050": ["Folkomröstningen hölls.", "أُجري الاستفتاء الشعبي."],
    "Lexin008052": ["Folkparken hade konserter.", "أقامت الحديقة الشعبية حفلات."],
    "Lexin008054": ["Folkpensionen utbetalades.", "صُرف معاش التقاعد الشعبي."],
    "Lexin008057": ["Folkrörelsen växte.", "نمت الحركة الشعبية."],
    "Lexin008059": ["Folkskolan ersattes av grundskolan.", "استُبدلت المدرسة الشعبية بالأساسية."],
    "Lexin008060": ["Folkslaget hade unika traditioner.", "كان للشعب تقاليد فريدة."],
    "Lexin008062": ["Folkstormen tvingade fram förändringar.", "أجبرت عاصفة الاحتجاج على تغييرات."],
    "Lexin008064": ["Folktandvården var tillgänglig.", "كانت رعاية الأسنان متاحة."],
    "Lexin008067": ["Folkölet såldes i butiken.", "بيعت البيرة الشعبية في المتجر."],
    "Lexin008073": ["Fontänen sprutade vatten.", "رشت النافورة الماء."],
    "Lexin008078": ["Fordonet parkerades.", "رُكنت العربة."],
    "Lexin008086": ["Fordonsskatten betalades.", "دُفعت ضريبة العربات."],
    "Lexin008089": ["Fordran uppfylldes.", "استُوفيت المطالبة."],
    "Lexin008092": ["Fordringen betalades.", "سُددت المطالبة المالية."],
    "Lexin008095": ["Forellen fångades i sjön.", "صيدت التروتة في البحيرة."],
    "Lexin008096": ["Formen fylldes med deg.", "ملئ القالب بالعجين."],
    "Lexin008099": ["Formen på ordet ändras.", "تتغير صيغة الكلمة."],
    "Lexin008103": ["Formalinet bevarade provet.", "حفظ الفورمالين العينة."],
    "Lexin008104": ["Formalismen kritiserades.", "انتُقدت التشكيلة."],
    "Lexin008107": ["Formatet var A4.", "كان الحجم A4."],
    "Lexin008108": ["Formationen var imponerande.", "كان التشكيل مثيراً للإعجاب."],
    "Lexin008111": ["Formeln löste problemet.", "حلت المعادلة المسألة."],
    "Lexin008117": ["Formgivaren designade stolen.", "صمم المصمم الكرسي."],
    "Lexin008118": ["Formgivningen var modern.", "كان التصميم الصناعي عصرياً."],
    "Lexin008129": ["Formuleringen var tydlig.", "كان التعبير واضحاً."],
    "Lexin008134": ["Forsen var vild.", "كان مسقط المياه جامحاً."],
    "Lexin008138": ["Forskaren upptäckte nytt.", "اكتشف الباحث جديداً."],
    "Lexin008146": ["Fortbildningen fortsatte.", "استمر التعليم التكميلي."],
    "Lexin008150": ["Fortköraren fick böter.", "غُرّم متجاوز السرعة."],
    "Lexin008151": ["Fortkörningen var farlig.", "كانت تجاوز السرعة خطرة."],
    "Lexin008165": ["Fortskaffningsmedlet var cykeln.", "كانت الدراجة وسيلة النقل."],
    "Lexin008175": ["Forwarden gjorde mål.", "سجل لاعب الهجوم هدفاً."],
    "Lexin008176": ["Fosfatet används i gödsel.", "يُستخدم الفوسفات في السماد."],
    "Lexin008178": ["Fosfor lyser i mörkret.", "يضيء الفسفور في الظلام."],
    "Lexin008181": ["Fossilen visade dinosaurier.", "أظهرت الرفات ديناصورات."],
    "Lexin008184": ["Fostret utvecklades normalt.", "تطور الجنين طبيعياً."],
    "Lexin008194": ["Fosterlandet försvarades.", "دُفع عن الوطن."],
    "Lexin008205": ["Fostran är viktig.", "التربية مهمة."],
    "Lexin008207": ["Foten gjorde ont.", "آلمت القدم."],
    "Lexin008213": ["Fotbollen sparkas.", "تُركل كرة القدم."],
    "Lexin008215": ["Fotfolket marscherade.", "سار المشاة."],
    "Lexin008216": ["Fotfästet var stadigt.", "كان موطئ القدم ثابتاً."],
    "Lexin008217": ["Fotgängaren gick över gatan.", "عبر الماشي الشارع."],
    "Lexin008221": ["Fotnoten förklarade detaljer.", "شرح التعليق التفاصيل."],
    "Lexin008222": ["Fotot visade familjen.", "أظهرت الصورة العائلة."],
    "Lexin008224": ["Fotogen användes i lampan.", "استُخدم الكيروسين في المصباح."],
    "Lexin008230": ["Fotografiet var vackert.", "كانت الصورة جميلة."],
    "Lexin008231": ["Fotokopian var tydlig.", "كانت النسخة المصورة واضحة."],
    "Lexin008232": ["Fotosättningen var snabb.", "كان تنضيد الحروف سريعاً."],
    "Lexin008239": ["Fotsteget var högt.", "كان موطئ القدم عالياً."],
    "Lexin008240": ["Fotstegen hördes i korridoren.", "سُمعت أصوات الخطوات في الممر."],
    "Lexin008243": ["Foxterriern var aktiv.", "كان ترير الثعالب نشيطاً."],
    "Lexin008246": ["Fracken bars på festen.", "ارتُديت البدلة الرسمية في الحفلة."],
    "Lexin008249": ["Fragmentet var gammalt.", "كانت الكسرة قديمة."],
    "Lexin008250": ["Frakten kostade extra.", "كلف نقل البضائع إضافياً."],
    "Lexin008252": ["Fraktionen splittrades.", "انقسم الجناح."],
    "Lexin008256": ["Frakturen läkte.", "شُفي الكسر."],
    "Lexin008287": ["Framkallningen tog tid.", "استغرق التظهير وقتاً."],
    "Lexin008295": ["Frammarschen fortsatte.", "استمر التقدم."],
    "Lexin008302": ["Framsteg gjordes.", "تحقق تطور إيجابي."],
    "Lexin008311": ["Framställningen var tydlig.", "كان التعبير واضحاً."],
    "Lexin008312": ["Framställningen ökade.", "زاد التصنيع."],
    "Lexin008313": ["Framställningen godkändes.", "قُبل الطلب."],
    "Lexin008316": ["Framsätet var bekvämt.", "كان المقعد الأمامي مريحاً."],
    "Lexin008317": ["Framtanden var skadad.", "تضرر السن الأمامي."],
    "Lexin008334": ["Framåtskridandet var tydligt.", "كان التطور واضحاً."],
    "Lexin008340": ["Fransen prydde gardinen.", "زينت الهداب الستارة."],
    "Lexin008342": ["Franska talas i Frankrike.", "تُتحدث الفرنسية في فرنسا."],
    "Lexin008343": ["Franskan var nybakad.", "كان الرغيف الفرنسي طازجاً."],
    "Lexin008344": ["Franskbrödet åts med smör.", "أُكل الخبز الفرنسي مع الزبدة."],
    "Lexin008345": ["Fransmannen älskade vin.", "أحب الفرنسي النبيذ."],
    "Lexin008346": ["Fransyskan talade tre språk.", "تحدثت الفرنسية ثلاث لغات."],
    "Lexin008347": ["Fransyskan stektes.", "قُلي اللحم الفرنسي."],
    "Lexin008349": ["Frasen var känd.", "كانت العبارة مشهورة."],
    "Lexin008359": ["Fredsplikten gällde.", "سرى الالتزام بعدم الإضراب."],
    "Lexin008360": ["Fredstiden var lång.", "كان زمن السلم طويلاً."],
    "Lexin008361": ["Freestylen spelades högt.", "شُغل الفريستايل عالياً."],
    "Lexin008362": ["Frekvensen var hög.", "كان العدد عالياً."],
    "Lexin008386": ["Friaren fick ja.", "حصل طالب الزواج على الموافقة."],
    "Lexin008390": ["Friden var välkommen.", "كان السكون مرحباً به."],
    "Lexin008391": ["Fridagen njöts.", "استُمتع بيوم العطلة."],
    "Lexin008399": ["Friggeboden byggdes.", "بُني الكوخ الصغير."],
    "Lexin008407": ["Frihandeln ökade exporten.", "زادت التجارة الحرة الصادرات."],
    "Lexin008408": ["Friherren bodde på slottet.", "سكن اللورد في القصر."],
    "Lexin008416": ["Friidrotten lockade tusentals.", "جذبت ألعاب القوى الآلاف."],
    "Lexin008417": ["Frikadellerna var goda.", "كانت الكفتة المسلوقة لذيذة."],
    "Lexin008422": ["Frikortet användes.", "استُخدمت بطاقة الخدمات المجانية."],
    "Lexin008425": ["Friktionen saktade ner.", "أبطأ الاحتكاك."],
    "Lexin008429": ["Frikyrkan höll gudstjänst.", "أقامت الكنيسة الحرة قداساً."]
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

const backupPath = DATA_FILE + '.backup_nouns19_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 1900 nouns!`);
