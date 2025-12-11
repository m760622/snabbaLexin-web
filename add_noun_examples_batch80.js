/**
 * Add examples to nouns - Batch 80 (100 nouns: Utsändning to Vattenhål)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin030427": ["Kvällens utsändning.", "بث الليلة."],
    "Lexin030436": ["Göra ett uttag.", "يقوم بسحب نقدي."],
    "Lexin030437": ["Jordat uttag.", "مقبس مؤرض."],
    "Lexin030444": ["Ett stående uttryck.", "عبارة ثابتة (شائعة)."],
    "Lexin030453": ["Boken om utvandrarna.", "كتاب عن المهاجرين."],
    "Lexin030454": ["Besöka sitt utvandrarland.", "يزور بلده الأصلي."],
    "Lexin030465": ["Stöd till utvecklingsländer.", "دعم للدول النامية."],
    "Lexin030477": ["Lång utvikning.", "خروج طويل عن الموضوع."],
    "Lexin030478": ["Titta på en utvikningsbild.", "ينظر إلى صورة عارية."],
    "Lexin030479": ["Känd utvikningsflicka.", "عارضة صور عارية مشهورة."],
    "Lexin030486": ["Beslut om utvisning.", "قرار بالطرد."],
    "Lexin030496": ["Konstig utväxt på trädet.", "نمو غريب على الشجرة."],
    "Lexin030510": ["Ta tbe-vaccin.", "يأخذ لقاح التهاب الدماغ."],
    "Lexin030519": ["Kramp i vaden.", "تشنج في بطة الساق."],
    "Lexin030521": ["Anmäla vad.", "يقدم استئنافاً."],
    "Lexin030524": ["Skåda vadare.", "يراقب الطيور الخواضة."],
    "Lexin030526": ["Rengöra med vadd.", "ينظف بالقطن."],
    "Lexin030530": ["Leva som vagabond.", "يعيش كمشرد."],
    "Lexin030533": ["Vaginans slemhinna.", "غشاء المهبل المخاطي."],
    "Lexin030538": ["Ha vagnskadeförsäkring.", "لديه تأمين شامل على السيارة."],
    "Lexin030541": ["Spänd vajer.", "كابل فولاذي مشدود."],
    "Lexin030542": ["Ramla i en vak.", "يسقط في فتحة بالجليد."],
    "Lexin030543": ["Hålla vak.", "يقوم بالسهر (للحراسة أو الرعاية)."],
    "Lexin030544": ["Det har uppstått en vakans.", "ظهر منصب شاغر."],
    "Lexin030552": ["Stå på vakt.", "يقف للحراسة."],
    "Lexin030553": ["Vakten stoppade oss.", "أوقفنا الحارس."],
    "Lexin030555": ["Fråga vaktmästaren.", "اسأل الناطور."],
    "Lexin030556": ["Vaktmästaren serverar.", "النادل يقدم الطعام."],
    "Lexin030557": ["Se på vaktparaden.", "يشاهد استعراض الحرس."],
    "Lexin030558": ["Förpackad i vakuum.", "مغلف بتفريغ الهواء."],
    "Lexin030565": ["Jobba på valbyrån.", "يعمل في مكتب الدعاية الانتخابية."],
    "Lexin030567": ["Indelad i valdistrikt.", "مقسم إلى دوائر انتخابية."],
    "Lexin030568": ["Bara valfläsk.", "مجرد وعود انتخابية كاذبة."],
    "Lexin030570": ["Valfrihet i skolan.", "حرية الاختيار في المدرسة."],
    "Lexin030571": ["Känna valfrändskap.", "يشعر بقرابة روحية."],
    "Lexin030572": ["Utbildad valförrättare.", "موظف انتخابات مدرب."],
    "Lexin030576": ["Testets validitet.", "صحة الاختبار."],
    "Lexin030579": ["Norra valkretsen.", "الدائرة الانتخابية الشمالية."],
    "Lexin030580": ["Bygga en vall.", "يبني سداً ترابياً."],
    "Lexin030581": ["Kor på vallen.", "أبقار في المرعى."],
    "Lexin030582": ["Köpa valla.", "يشتري شمع التزلج."],
    "Lexin030586": ["Göra en vallfart.", "يقوم بحج."],
    "Lexin030587": ["Åka på vallfärd.", "يذهب في رحلة حج."],
    "Lexin030589": ["Simma i vallgraven.", "يسبح في الخندق المائي."],
    "Lexin030590": ["Röd vallmo.", "خشخاش أحمر."],
    "Lexin030593": ["Gå till sin vallokal.", "يذهب لمركز الاقتراع."],
    "Lexin030595": ["Många valmöjligheter.", "خيارات عديدة."],
    "Lexin030596": ["Knäcka en valnöt.", "يكسر حبة جوز."],
    "Lexin030597": ["Lekfull valp.", "جرو لعوب."],
    "Lexin030600": ["Hård valrörelse.", "حملة انتخابية شرسة."],
    "Lexin030601": ["Dansa vals.", "يرقص الفالس."],
    "Lexin030602": ["Smörja valsen.", "يشحم الأسطوانة."],
    "Lexin030603": ["Lägga sin valsedel.", "يضع ورقة تصويته."],
    "Lexin030605": ["Partiets valspråk.", "شعار الحزب."],
    "Lexin030607": ["Tömma valurnan.", "يفرغ صندوق الاقتراع."],
    "Lexin030610": ["Låg valutareserv.", "احتياطي عملات منخفض."],
    "Lexin030611": ["Kyrkans valv.", "قبة الكنيسة."],
    "Lexin030613": ["Mynt av låg valör.", "عملة ذات قيمة منخفضة."],
    "Lexin030619": ["Ren vandalism.", "تخريب محض."],
    "Lexin030621": ["Lasta för vandel.", "يلوم على نمط الحياة."], // Old expression "känd för dygd och vandel"
    "Lexin030626": ["En ensam vandrare.", "جوال وحيد."],
    "Lexin030627": ["Bo på vandrarhem.", "يقيم في نزل شباب."],
    "Lexin030629": ["Markera en vandringsled.", "يحدد مسار تجول."],
    "Lexin030631": ["Lida av vanföreställningar.", "يعاني من أوهام."],
    "Lexin030634": ["Smak av vanilj.", "طعم الفانيليا."],
    "Lexin030651": ["Stickade vantar.", "قفازات صوفية محبوكة."],
    "Lexin030653": ["Det är rent vanvett.", "هذا جنون مطبق."],
    "Lexin030660": ["Val av vapen.", "اختيار السلاح (فرع الجيش)."],
    "Lexin030661": ["Adelsfamiljens vapen.", "شعار العائلة النبيلة."],
    "Lexin030662": ["Mina vapenbröder.", "رفاق السلاح."],
    "Lexin030663": ["Kungens vapendragare.", "حامل سلاح الملك."],
    "Lexin030664": ["Göra vapenfri tjänst.", "يؤدي خدمة مدنية بديلة."],
    "Lexin030666": ["Söka vapenlicens.", "يطلب رخصة سلاح."],
    "Lexin030668": ["Utlysa vapenvila.", "يعلن هدنة."],
    "Lexin030669": ["Dömd vapenvägrare.", "رافض خدمة محكوم عليه."],
    "Lexin030680": ["Ta väl vara på sig.", "يعتني بنفسه جيداً."],
    "Lexin030696": ["I vardagslag.", "في الحياة اليومية العادية."],
    "Lexin030697": ["Det är vardagsmat.", "هذا شيء مألوف/عادي."],
    "Lexin030700": ["I vardande.", "قيد التكوين (وشيك)."],
    "Lexin030710": ["Det är vargatider.", "إنها أوقات عصيبة."],
    "Lexin030711": ["En riktig vargavinter.", "شتاء قارس بحق."],
    "Lexin030712": ["En okänd variabel.", "متغير مجهول."],
    "Lexin030713": ["En annan variant.", "بديل آخر."],
    "Lexin030717": ["Gå på varieté.", "يذهب إلى استعراض."],
    "Lexin030725": ["Varmfronten drar in.", "الجبهة الدافئة تقترب."],
    "Lexin030728": ["Välja varmrätt.", "يختار الطبق الرئيسي."],
    "Lexin030729": ["Inget varmvatten.", "لا يوجد ماء ساخن."],
    "Lexin030735": ["Slå på varningsblinkers.", "يشغل أضواء التحذير الوالضة."],
    "Lexin030738": ["Sätta ut varningstriangel.", "يضع مثلث التحذير."],
    "Lexin030740": ["Vävstolens varp.", "سدى النول."],
    "Lexin030747": ["Sinnesorgan för varseblivning.", "أعضاء الحس للإدراك."],
    "Lexin030763": ["Läs varudeklarationen.", "اقرأ بيان المحتويات."],
    "Lexin030764": ["Handla på varuhus.", "يتسوق في متجر كبير."],
    "Lexin030765": ["Skyddat varumärke.", "علامة تجارية محمية."],
    "Lexin030769": ["Båten ligger på varv.", "القارب في الترسانة (للإصلاح)."],
    "Lexin030776": ["Hälla i vasken.", "يسكب في البالوعة."],
    "Lexin030779": ["Göma sig i vassen.", "يختبئ في القصب."],
    "Lexin030781": ["Svenskt vatten.", "مياه إقليمية سويدية."],
    "Lexin030783": ["Fiska i ett vattendrag.", "يصطاد في مجرى مائي."],
    "Lexin030785": ["Djur vid ett vattenhål.", "حيوانات عند بركة ماء."]
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

const backupPath = DATA_FILE + '.backup_nouns80_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 80 completed!`);
