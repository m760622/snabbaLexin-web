/**
 * Add examples to nouns - Batch 73 (100 nouns: Tandkött to Tesked)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin027890": ["Inflammerat tandkött.", "لثة ملتهبة."],
    "Lexin027894": ["Lida av tandlossning.", "يعاني من تخلخل الأسنان."],
    "Lexin027900": ["Använda tandpetare.", "يستخدم نكاشة أسنان."],
    "Lexin027901": ["Göra en tandprotes.", "يصنع طقم أسنان."],
    "Lexin027905": ["Tandsköterska assisterade.", "ساعدت ممرضة طب الأسنان."],
    "Lexin027907": ["Ta bort tandsten.", "يزيل القلاح (الجير)."],
    "Lexin027909": ["Få tandställning.", "يحصل على تقويم أسنان."],
    "Lexin027911": ["Rengöra med tandtråd.", "ينظف بخيط الأسنان."],
    "Lexin027913": ["Fri tandvård.", "رعاية أسنان مجانية."],
    "Lexin027915": ["Täcka med tandvårdsförsäkring.", "يغطي بتأمين رعاية الأسنان."],
    "Lexin027916": ["Statlig tandvårdstaxa.", "تسعيرة رعاية أسنان حكومية."],
    "Lexin027917": ["Svår tandvärk.", "ألم أسنان شديد."],
    "Lexin027919": ["Trycka på en tangent.", "يضغط على مفتاح."],
    "Lexin027922": ["Dansa tango.", "يرقص التانغو."],
    "Lexin027925": ["Köra en tank.", "يقود دبابة."],
    "Lexin027927": ["En god tanke.", "فكرة جيدة."],
    "Lexin027928": ["Följa tankegången.", "يتبع حبل الأفكار."],
    "Lexin027929": ["Stor tanker.", "ناقلة صهريجية كبيرة."],
    "Lexin027935": ["Sätta ut tankstreck.", "يضع شرطة."],
    "Lexin027938": ["Klistra med tape.", "يلصق بالشريط اللاصق."],
    "Lexin027939": ["Spela in på tape.", "يسجل على شريط."],
    "Lexin027940": ["Sätta upp tapet.", "يعلق ورق الجدران."],
    "Lexin027944": ["Anlita en tapetserare.", "يستعين بمنجد."],
    "Lexin027945": ["Tapp av metall.", "إسفين معدني."],
    "Lexin027946": ["Sätta i en tapp.", "يضع سدادة."],
    "Lexin027947": ["Tanka på en tapp.", "يملأ الوقود في محطة وقود."],
    "Lexin027984": ["Nuvarande tariff.", "التعريفة الحالية."],
    "Lexin027985": ["Problem med tarmen.", "مشكلة في المصران."],
    "Lexin027990": ["Få tarmvred.", "يصاب بالتواء المصران."],
    "Lexin027996": ["Han visade tasken.", "أظهر قضيبه."],
    "Lexin027998": ["Hundens tass.", "كف الكلب."],
    "Lexin028002": ["Han kallades tattare.", "دعي بالتتري (الغجري)."],
    "Lexin028005": ["Måla en tavla.", "يرسم لوحة."],
    "Lexin028006": ["En liten tax.", "كلب دشهند صغير."],
    "Lexin028007": ["Åka efter taxa.", "يركب حسب التعرفة."],
    "Lexin028015": ["Husets taxeringsvärde.", "القيمة الضريبية للمنزل."],
    "Lexin028026": ["Möbler av teak.", "أثاث من خشب الساج."],
    "Lexin028027": ["Ett starkt team.", "فريق قوي."],
    "Lexin028039": ["Fin teckning.", "رسم جميل."],
    "Lexin028041": ["Krama en teddybjörn.", "يعانق دبدوباً."],
    "Lexin028042": ["Kopp och tefat.", "فنجان وصحن."],
    "Lexin028043": ["Stekpanna av teflon.", "مقلاة تيفال."],
    "Lexin028045": ["Rött tegel.", "طابوق أحمر."],
    "Lexin028048": ["Byta tegelpanna.", "يغير حجر القرميد."],
    "Lexin028055": ["Duktig tekniker.", "فني ماهر."],
    "Lexin028061": ["En kall teknokrat.", "تكنوقراطي بارد المشاعر."],
    "Lexin028062": ["Modern teknologi.", "تكنولوجيا حديثة."],
    "Lexin028063": ["Svensk tekoindustri.", "صناعة النسيج السويدية."],
    "Lexin028067": ["Skicka telefax.", "يرسل فاكساً."],
    "Lexin028069": ["Ringa från telefonautomat.", "يتصل من هاتف عمومي."],
    "Lexin028072": ["Arbeta som telefonist.", "يعمل كعامل مقسم."],
    "Lexin028073": ["Söka i telefonkatalogen.", "يبحث في دليل الهاتف."],
    "Lexin028074": ["Stå i en telefonkiosk.", "يقف i كشك هاتف."],
    "Lexin028075": ["Hamna i telefonkö.", "يعلق في طابور المكالمات."],
    "Lexin028077": ["Mitt telefonnummer.", "رقم هاتفي."],
    "Lexin028078": ["Tala in på telefonsvarare.", "يتحدث إلى جهاز الإجابة."],
    "Lexin028080": ["Beställa telefonväckning.", "يطلب إيقاظاً هاتفياً."],
    "Lexin028081": ["Jobba som telefonväktare.", "يعمل كمذيع لاستقبال المكالمات."],
    "Lexin028082": ["Ringa via telefonväxel.", "يتصل عبر البدالة."],
    "Lexin028083": ["Uppfinna telegrafen.", "يخترع التلغراف."],
    "Lexin028085": ["Få ett telegram.", "يتلقى برقية."],
    "Lexin028086": ["Använda teleobjektiv.", "يستخدم عدسة مقربة."],
    "Lexin028088": ["Skriva på teleprinter.", "يكتب على طابعة البرقيات."],
    "Lexin028089": ["Titta i teleskop.", "ينظر في المقراب."],
    "Lexin028091": ["Skicka telex.", "يرسل تلكس."],
    "Lexin028094": ["Trädets telning.", "برعم الشجرة."], // Also figuratively "child"
    "Lexin028097": ["Ta en temp.", "يقيس الحرارة."],
    "Lexin028098": ["Besöka ett tempel.", "يزور معبداً."],
    "Lexin028103": ["Enformigt tempoarbete.", "عمل متسلسل رتيب."],
    "Lexin028106": ["Verbets tempus.", "زمن الفعل."],
    "Lexin028110": ["Smälta tenn.", "يصهر القصدير."],
    "Lexin028112": ["Sjunga tenor.", "يغني تينور."],
    "Lexin028113": ["Plugga till en tenta.", "يدرس للامتحان."],
    "Lexin028114": ["Skriftlig tentamen.", "امتحان تحريري."],
    "Lexin028119": ["Han är teolog.", "هو لاهوتي."],
    "Lexin028120": ["Studera teologi.", "يدرس اللاهوت."],
    "Lexin028121": ["Politisk teoretiker.", "منظر سياسي."],
    "Lexin028125": ["Doppa en tepåse.", "يغمس كيس الشاي."],
    "Lexin028127": ["Gå till en terapeut.", "يذهب لمعالج."],
    "Lexin028130": ["Medicinsk term.", "مصطلح طبي."],
    "Lexin028132": ["Höstterminen börjar.", "يبدأ الفصل الدراسي الخريفي."],
    "Lexin028133": ["Sista termin.", "آخر موعد للدفع (قسط)."],
    "Lexin028134": ["Termin på börsen.", "عقود آجلة في البورصة."],
    "Lexin028136": ["Arbeta vid en terminal.", "يعمل عند محطة طرفية."],
    "Lexin028137": ["Svår terminologi.", "مصطلحات صعبة."],
    "Lexin028139": ["Kaffe i termos.", "قهوة في ترموس."],
    "Lexin028140": ["Ställa in termostat.", "يضبط الثرموستات."],
    "Lexin028141": ["Lukta terpentin.", "رائحته زيت التربنتين."],
    "Lexin028142": ["Kruka av terrakotta.", "جرة فخارية."],
    "Lexin028144": ["Sitta på en terrass.", "يجلس على مصطبة (شرفة)."],
    "Lexin028146": ["En ettrig terrier.", "كلب تيرير شرس."],
    "Lexin028148": ["Svenskt territorium.", "إقليم سويدي."],
    "Lexin028149": ["Leva i terror.", "يعيش في رعب."],
    "Lexin028150": ["Bekämpa terrorism.", "يكافح الإرهاب."],
    "Lexin028152": ["Dömd terrorist.", "إرهابي مدان."],
    "Lexin028154": ["Svår terräng.", "تضاريس صعبة."],
    "Lexin028157": ["Första tertialet.", "الثلث الأول من العام."],
    "Lexin028158": ["Driva en tes.", "يسوق فرضية."],
    "Lexin028159": ["Slå upp i tesaurus.", "يبحث في معجم المترادفات."],
    "Lexin028160": ["En tesked socker.", "ملعقة شاي من السكر."]
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

const backupPath = DATA_FILE + '.backup_nouns73_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 73 completed!`);
