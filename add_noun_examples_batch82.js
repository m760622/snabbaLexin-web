/**
 * Add examples to nouns - Batch 82 (100 nouns: Virknål to Vägvisare)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin031180": ["Virka med virknål.", "يحيك بسنارة."],
    "Lexin031183": ["Han är en virtuos.", "هو فنان قدير."],
    "Lexin031186": ["En kraftig virvel.", "دوامة قوية."],
    "Lexin031190": ["Sjunga en visa.", "يغني أغنية."],
    "Lexin031194": ["Klockans stora visare.", "عقرب الساعة الكبير."],
    "Lexin031197": ["Samla på visdom.", "يجمع الحكمة."],
    "Lexin031198": ["Dra ut en visdomstand.", "يقلع ضرس العقل."],
    "Lexin031199": ["Visering av pass.", "تأشير جواز السفر."],
    "Lexin031203": ["En stor visionär.", "صاحب رؤية عظيم."],
    "Lexin031204": ["Göra en visit.", "يقوم بزيارة قصيرة."],
    "Lexin031205": ["Kroppslig visitation.", "تفتيش جسدي."],
    "Lexin031207": ["Lämna sitt visitkort.", "يترك بطاقة زيارته."],
    "Lexin031211": ["Vispa med en visp.", "يخفق بالخفاقة."],
    "Lexin031213": ["Tårta med vispgrädde.", "كعكة مع قشدة مخفوقة."],
    "Lexin031217": ["Blåsa i visselpipa.", "ينفخ في الصفارة."],
    "Lexin031220": ["Äga en vissla.", "يملك صفارة."],
    "Lexin031223": ["Få till visso.", "يحصل على تأكيد."], // Idiom: "få veta till visso"
    "Lexin031237": ["Vispa vitorna.", "يخفق زلال البيض."],
    "Lexin031242": ["Full av vitalitet.", "مفعم بالحيوية."],
    "Lexin031243": ["Brist på vitaminer.", "نقص الفيتامينات."],
    "Lexin031244": ["Regeringens vitbok.", "الكتاب الأبيض للحكومة."],
    "Lexin031245": ["Dömas till vite.", "يحكم عليه بغرامة تهديدية."],
    "Lexin031247": ["Stuvad vitkål.", "يخنة ملفوف."],
    "Lexin031248": ["Fånga en vitling.", "يصطاد سمكة غبر."],
    "Lexin031251": ["Krydda med vitpeppar.", "يتبل بالفلفل الأبيض."],
    "Lexin031252": ["Fint vitrinskåp.", "خزانة عرض زجاجية جميلة."],
    "Lexin031255": ["Plocka vitsippor.", "يقطف شقار الغاب."],
    "Lexin031259": ["Akademi för vitterhet.", "أكاديمية الأدب."],
    "Lexin031267": ["Bära vittnesbörd om.", "يشهد على."],
    "Lexin031271": ["Avge vittnesmål.", "يدلي بشهادة."],
    "Lexin031277": ["Få vittring på.", "يلتقط أثر رائحة."],
    "Lexin031278": ["Se vitögat.", "يرى بياض العين."], // Idiom: "se döden i vitögat"
    "Lexin031280": ["Han är en vivör.", "هو شخص مترف (ذواقة)."],
    "Lexin031282": ["Ha stor vokabulär.", "لديه مفردات كثيرة."],
    "Lexin031283": ["Kort vokal.", "حرف علة قصير."],
    "Lexin031284": ["Bandets vokalist.", "مغني الفرقة."],
    "Lexin031285": ["Kjol med volang.", "تنورة بحاشية."],
    "Lexin031286": ["Jobba som volontär.", "يعمل كمتطوع."],
    "Lexin031287": ["Slå en volt.", "يقوم بشقلبة."],
    "Lexin031288": ["220 volt.", "220 فولط."],
    "Lexin031294": ["Begära votering.", "يطلب التصويت."],
    "Lexin031295": ["Snäll vovve.", "كلب لطيف."],
    "Lexin031296": ["Hitta ett vrak.", "يجد حطام سفينة."],
    "Lexin031299": ["Köpa till vrakpris.", "يشتري بسعر بخس."],
    "Lexin031302": ["Vrida på vredet.", "يدير المقبض."],
    "Lexin031304": ["I vredesmod.", "في حالة غضب."],
    "Lexin031315": ["Vricka vristen.", "يلوي كاحله."],
    "Lexin031319": ["Ett hest vrål.", "صرخة أجشة."],
    "Lexin031324": ["Få i vrångstrupen.", "يشرق (يبتلع في المجرى الخطأ)."],
    "Lexin031334": ["Hon har en vurm för hattar.", "لديها ولع بالقبعات."],
    "Lexin031335": ["Göra en vurpa.", "ينقلب (بالدراجة مثلاً)."],
    "Lexin031339": ["Plugga på vuxengymnasium.", "يدرس في ثانوية الكبار."],
    "Lexin031340": ["Få vuxenstudiestöd.", "يحصل على دعم دراسي للكبار."],
    "Lexin031345": ["Skicka ett vykort.", "يرسل بطاقة بريدية."],
    "Lexin031346": ["Av ren våda.", "عن طريق الصدفة (حادث عرضي)."],
    "Lexin031349": ["Grädda våfflor.", "يخبز الفوفلا (الوافل)."],
    "Lexin031351": ["Stå på vågen.", "يقف على الميزان."],
    "Lexin031354": ["Gå på vågbrytaren.", "يمشي على مصد الأمواج."],
    "Lexin031355": ["Han är en våghals.", "هو شخص متهور (جريء)."],
    "Lexin031358": ["Vara på samma våglängd.", "يكون على نفس الموجة (متفاهمان)."],
    "Lexin031359": ["Sända på rätt våglängd.", "يبث على طول الموجة الصحيح."],
    "Lexin031360": ["Vara vågmästare.", "يكون صاحب الصوت المرجح."],
    "Lexin031362": ["Ett politiskt vågspel.", "مقامرة سياسية."],
    "Lexin031379": ["Begå ett våldsdåd.", "يرتكب جريمة عنف."],
    "Lexin031380": ["Dömas för våldshandling.", "يدان بتصرف عنيف."],
    "Lexin031381": ["Känd våldsman.", "مجرم عنيف معروف."],
    "Lexin031384": ["Polisen grep våldsverkarna.", "قبضت الشرطة على مرتكبي العنف."],
    "Lexin031387": ["Dömd för våldtäkt.", "محكوم عليه بتهمة الاغتصاب."],
    "Lexin031397": ["Likna en vålnad.", "يشبه الشبح."],
    "Lexin031403": ["Var inte ett våp.", "لا تكوني ساذجة."],
    "Lexin031407": ["I våras.", "في الربيع الماضي."],
    "Lexin031408": ["Få god vård.", "يتلقى رعاية جيدة."],
    "Lexin031409": ["Resa en vård.", "يقيم نصباً."],
    "Lexin031414": ["Vid vårdagjämningen.", "عند الاعتدال الربيعي."],
    "Lexin031416": ["Duktig vårdare.", "ممرض ماهر."],
    "Lexin031417": ["Söka vårdbidrag.", "يطلب نفقة رعاية طفل معاق."],
    "Lexin031419": ["Jobba som vårdbiträde.", "يعمل كمساعد ممرض."],
    "Lexin031424": ["Bo på vårdhem.", "يعيش في دار رعاية."],
    "Lexin031429": ["Ha delad vårdnad.", "لديه حضانة مشتركة."],
    "Lexin031433": ["Barnets vårdnadshavare.", "ولي أمر الطفل."],
    "Lexin031435": ["Göra en vårdnadsutredning.", "يقوم بتحقيق حضانة."],
    "Lexin031450": ["Välja ett vårdyrke.", "يختار مهنة رعاية."],
    "Lexin031451": ["Kraftig vårflod.", "فيضان ربيعي قوي."],
    "Lexin031452": ["Ha en vårta.", "لديه ثؤلول (حلمة)."],
    "Lexin031456": ["Renovera våtutrymmen.", "يرمم الغرف الرطبة (الحمامات)."],
    "Lexin031460": ["Det blev en väckelse.", "صارت صحوة دينية."],
    "Lexin031466": ["Hundens väderkorn.", "حاسة شم الكلب."],
    "Lexin031467": ["Gammal väderkvarn.", "طاحونة هوائية قديمة."],
    "Lexin031468": ["Dagens väderlek.", "طقس اليوم."],
    "Lexin031475": ["En stor vädur.", "كبش كبير."],
    "Lexin031478": ["Ge vika.", "يستسلم (يعطي طريقاً/وزناً)."], // "Väga" as noun implies weight/balance or idiom "väga upp"
    "Lexin031486": ["Montera vägguttag.", "يركب مقبساً."],
    "Lexin031489": ["Halt väglag.", "طريق زلق."],
    "Lexin031492": ["Få vägledning.", "يحصل على إرشاد."],
    "Lexin031494": ["Följa vägmärken.", "يتبع شواخص الطريق."],
    "Lexin031496": ["På någons vägnar.", "بالنيابة عن شخص ما."],
    "Lexin031500": ["Köra i vägrenen.", "يقود على حافة الطريق."],
    "Lexin031501": ["Stå vid ett vägskäl.", "يقف عند مفترق طرق."],
    "Lexin031506": ["Vara en vägvisare.", "يكون دليلاً."],
    "Lexin031507": ["Titta på vägvisaren.", "ينظر إلى شاخصة الطريق."]
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

const backupPath = DATA_FILE + '.backup_nouns82_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 82 completed!`);
