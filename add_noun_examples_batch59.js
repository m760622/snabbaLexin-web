/**
 * Add examples to nouns - Batch 59 (100 nouns: S-märke to Schizofreni)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin023229": ["S-märke sattes.", "وُضعت علامة إس."],
    "Lexin023234": ["Sabbat firades.", "احتُفل بالسبت."],
    "Lexin023235": ["Sabbatsår togs.", "أُخذت سنة التفرغ."],
    "Lexin023236": ["Sabeln bars.", "ارتُدي السيف الضالع."],
    "Lexin023240": ["Sabotage begicks.", "ارتُكب التخريب."],
    "Lexin023245": ["Sadeln sattes.", "وُضع السرج."],
    "Lexin023248": ["Sadism förekom.", "حدثت السادية."],
    "Lexin023249": ["Sadisten straffades.", "عوقب السادي."],
    "Lexin023252": ["Safari gjordes.", "أُجريت رحلة الصيد البري."],
    "Lexin023253": ["Saffran användes.", "استُخدم الزعفران."],
    "Lexin023254": ["Safir syntes.", "ظهر الصفير."],
    "Lexin023258": ["Sagesmannen talade.", "تحدث الناطق الرسمي."],
    "Lexin023263": ["Sak prövades.", "حُكم في القضية."],
    "Lexin023284": ["Sakrament gavs.", "أُعطي القربان المقدس."],
    "Lexin023288": ["Sakskäl gavs.", "أُعطي سبب موضوعي."],
    "Lexin023292": ["Saktmod visades.", "أُظهرت المسالمة."],
    "Lexin023296": ["Saldo kontrollerades.", "فُحص الرصيد."],
    "Lexin023299": ["Saliv producerades.", "أُنتج اللعاب."],
    "Lexin023304": ["Sallad serverades.", "قُدمت السلطة."],
    "Lexin023305": ["Salmonella behandlades.", "عولج السالمونيلا."],
    "Lexin023306": ["Salongen användes.", "استُخدم الصالون."],
    "Lexin023309": ["Salpeter användes.", "استُخدم النطرون."],
    "Lexin023314": ["Saltomortal gjordes.", "أُجريت اللفة في الهواء."],
    "Lexin023315": ["Saltsyra är farlig.", "حامض الهيدروكلوريك خطير."],
    "Lexin023316": ["Saltvatten dracks.", "شُرب الماء المالح."],
    "Lexin023317": ["Till salu stod det.", "كان معروضاً للبيع."],
    "Lexin023319": ["Saluhallen besöktes.", "زُير السوق المسقوف."],
    "Lexin023320": ["Salut sköts.", "أُطلقت التحية."],
    "Lexin023323": ["Salva avfyrades.", "أُطلق الوابل."],
    "Lexin023324": ["Salvelse visades.", "أُظهرت المشاعر المفرطة."],
    "Lexin023333": ["Samba dansades.", "رُقصت السامبا."],
    "Lexin023337": ["Sambon bodde.", "سكن المتعايش."],
    "Lexin023344": ["Samen talade.", "تحدث اللابي."],
    "Lexin023349": ["Samfundet samlades.", "تجمعت الطائفة."],
    "Lexin023353": ["Samfärdsel fungerade.", "عملت حركة المرور والنقل."],
    "Lexin023363": ["Samhällskunskap lärdes.", "تُعلمت العلوم الاجتماعية."],
    "Lexin023371": ["Samiska talades.", "نُطقت اللابية."],
    "Lexin023372": ["Samiskan talade.", "تحدثت السامية."],
    "Lexin023373": ["Samklang uppnåddes.", "بُلغ التناغم."],
    "Lexin023374": ["Samkväm hölls.", "أُقيم الحفل البسيط."],
    "Lexin023375": ["Samkörning gjordes.", "أُجريت المعالجة المشتركة للمعلومات."],
    "Lexin023377": ["Samlag ägde rum.", "حدث الجماع."],
    "Lexin023382": ["Samlevnad upplevdes.", "جُربت المعايشة."],
    "Lexin023388": ["Samlingsregering bildades.", "شُكلت الحكومة الائتلافية."],
    "Lexin023392": ["Sammanblandning skedde.", "حدث الخلط."],
    "Lexin023396": ["Sammandrabbning skedde.", "حدثت المعركة."],
    "Lexin023397": ["Sammandrag skrevs.", "كُتب الاختصار."],
    "Lexin023409": ["Sammanhållning visades.", "أُظهر التضامن."],
    "Lexin023412": ["Sammankomst hölls.", "عُقد الاجتماع."],
    "Lexin023419": ["Sammanslutning bildades.", "شُكل الاتحاد."],
    "Lexin023424": ["Sammansvärjning avslöjades.", "اكتُشفت المؤامرة."],
    "Lexin023425": ["Sammansättning gjordes.", "أُجري التركيب."],
    "Lexin023432": ["Sammelsurium rådde.", "سادت اللخبطة."],
    "Lexin023433": ["Sammet användes.", "استُخدم المخمل."],
    "Lexin023447": ["Samsändning gjordes.", "أُجري البث المشترك."],
    "Lexin023462": ["Samvete kändes.", "شُعر بالضمير."],
    "Lexin023464": ["Samvetskval kändes.", "شُعر بالندم."],
    "Lexin023468": ["Sanatorium besöktes.", "زُير مستشفى السل."],
    "Lexin023470": ["Sandal bars.", "ارتُدي الصندل."],
    "Lexin023476": ["Sandlådan lektes i.", "لُعب في الصندوق الرملي."],
    "Lexin023477": ["Sandpapper användes.", "استُخدم ورق الصنفرة."],
    "Lexin023478": ["Sandwich åts.", "أُكل السندويش."],
    "Lexin023483": ["Sanitetsbinda användes.", "استُخدمت الفوطة الصحية."],
    "Lexin023486": ["I sank gick det.", "غرق."],
    "Lexin023488": ["Sanktion gavs.", "أُعطيت الموافقة."],
    "Lexin023499": ["Sanningsförsäkran avgavs.", "أُعطي تأكيد قول الصدق."],
    "Lexin023512": ["Sardin åts.", "أُكل السردين."],
    "Lexin023514": ["Sarg syntes.", "ظهرت الرافدة."],
    "Lexin023517": ["Satan nämndes.", "ذُكر الشيطان."],
    "Lexin023519": ["Saten bemötts.", "رُحم المسكين."],
    "Lexin023520": ["Satellit sköts upp.", "أُطلق القمر الصناعي."],
    "Lexin023522": ["Satir skrevs.", "كُتبت المسخرة."],
    "Lexin023523": ["Satkärringen klagade.", "اشتكت الحيزبون."],
    "Lexin023524": ["Sats analyserades.", "حُللت العبارة."],
    "Lexin023527": ["Sats bestämdes.", "حُددت النسبة."],
    "Lexin023529": ["Satsdel identifierades.", "حُدد المركب."],
    "Lexin023530": ["Satslära studerades.", "دُرس علم بناء الجملة."],
    "Lexin023535": ["Sattyg begicks.", "ارتُكب الأذى."],
    "Lexin023536": ["Satäng användes.", "استُخدم الأطلس."],
    "Lexin023538": ["Sav flödade.", "جرى النسغ."],
    "Lexin023540": ["Sax gillrades.", "نُصبت المصيدة."],
    "Lexin023541": ["Saxofon spelades.", "عُزفت السكسية."],
    "Lexin023542": ["Scarf bars.", "ارتُدي الوشاح."],
    "Lexin023545": ["Scenario skrevs.", "كُتب السيناريو."],
    "Lexin023547": ["Scenografi användes.", "استُخدم جهاز المسرح."],
    "Lexin023548": ["Scenskola gicks.", "التُحق بمدرسة المسرح."],
    "Lexin023549": ["Schablon användes.", "استُخدم النموذج."],
    "Lexin023550": ["Schablonavdrag gjordes.", "أُجري الاقتطاع القياسي."],
    "Lexin023552": ["Schabrak lades.", "وُضع الغطاء المزركش."],
    "Lexin023553": ["Schack spelades.", "لُعب الشطرنج."],
    "Lexin023555": ["Schackningsperiod rådde.", "سادت فترة الوهن."],
    "Lexin023556": ["Schah regerade.", "حكم الشاه."],
    "Lexin023557": ["Schakt grävdes.", "حُفر المهوى."],
    "Lexin023562": ["Schampo användes.", "استُخدم الشامبو."],
    "Lexin023563": ["Scharlakansfeber behandlades.", "عولجت الحمى القرمزية."],
    "Lexin023565": ["Schattering syntes.", "ظهر الظل."],
    "Lexin023566": ["Schejken talade.", "تحدث الشيخ."],
    "Lexin023569": ["Schemalegt bestämdes.", "حُدد المقرر."],
    "Lexin023574": ["Schism uppstod.", "نشأ الخلاف."],
    "Lexin023577": ["Schizofreni behandlades.", "عولج الفصام."]
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

const backupPath = DATA_FILE + '.backup_nouns59_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 5900 nouns!`);
