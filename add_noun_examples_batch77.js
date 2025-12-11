/**
 * Add examples to nouns - Batch 77 (100 nouns: Tumme to Törne)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin029141": ["Vika tummen.", "يثني إبهامه."],
    "Lexin029142": ["En tummelplats för barn.", "ملعب للأطفال."],
    "Lexin029144": ["Det är en bra tumregel.", "إنها قاعدة تطبيقية جيدة."],
    "Lexin029145": ["Sätta tumskruvar på någon.", "يمارس الضغط على شخص ما."],
    "Lexin029146": ["Mäta med tumstock.", "يقيس بمسطرة منطوية."],
    "Lexin029149": ["Det uppstod tumult.", "حدث شغب."],
    "Lexin029150": ["Operera en tumör.", "يستأصل ورماً."],
    "Lexin029155": ["Stekt tunga.", "سمك موسى مقلي."],
    "Lexin029157": ["Få tunghäfta.", "يصاب بمعقود اللسان (يعجز عن الكلام)."],
    "Lexin029158": ["Tala i tungomål.", "يتحدث بألسنة (لغات)."],
    "Lexin029160": ["Lida av tungsinne.", "يعاني من الاكتئاب."],
    "Lexin029165": ["En tom tunna.", "برميل فارغ."],
    "Lexin029166": ["Äta tunnbröd.", "يأكل خبز التن برود."],
    "Lexin029173": ["Två tunnland jord.", "أكران من الأرض."],
    "Lexin029176": ["Han bär tupé.", "هو يرتدي خصلة شعر مستعار."],
    "Lexin029184": ["Bära en turban.", "يرتدي عمامة."],
    "Lexin029185": ["Drivas av en turbin.", "يعمل بواسطة توربين."],
    "Lexin029187": ["Öka turismen.", "يزيد السياحة."],
    "Lexin029188": ["Vara turist.", "يكون سائحاً."],
    "Lexin029190": ["Han är turk.", "هو تركي."],
    "Lexin029193": ["Prata turkiska.", "يتحدث التركية."],
    "Lexin029194": ["Hon är turkiska.", "هي تركية."],
    "Lexin029196": ["Kolla turlistan.", "يفحص الجدول الزمني."],
    "Lexin029197": ["Åka på turné.", "يذهب في جولة."],
    "Lexin029199": ["Vinna en turnering.", "يفوز في دورة مباريات."],
    "Lexin029202": ["Rita med tusch.", "يرسم بالحبر."],
    "Lexin029204": ["En tusendel.", "جزء من الألف."],
    "Lexin029205": ["Han är en tusenkonstnär.", "هو بارع في كل شيء (صاحب صنائع سبع)."],
    "Lexin029206": ["Växla en tusenlapp.", "يصرف ورقة ألف كرونة."],
    "Lexin029207": ["Tuss av bomull.", "قطعة قطن."],
    "Lexin029208": ["Plocka tussilago.", "يقطف زهرة الفرفارة."],
    "Lexin029209": ["Höra ett tut.", "يسمع صفيراً."],
    "Lexin029213": ["Sitta på en tuva.", "يجلس على كومة عشب."],
    "Lexin029215": ["Betala TV-avgift.", "يدفع رسم التلفزيون."],
    "Lexin029217": ["Daglig tvagning.", "اغتسال يومي."],
    "Lexin029226": ["Utmana på tvekamp.", "يتحدى للمبارزة."],
    "Lexin029232": ["Få tvillingar.", "تنجب توأماً."],
    "Lexin029235": ["Fästa med tving.", "يثبت بالقامطة."],
    "Lexin029239": ["Lösa en tvist.", "يحل نزاعاً."],
    "Lexin029242": ["Det blev ett tvistemål.", "أصبحت قضية مدنية."],
    "Lexin029245": ["Hysa tvivelsmål.", "يساوره شك."],
    "Lexin029252": ["Bli tvåa.", "يحل ثانياً."],
    "Lexin029253": ["Köra tvåhjuling.", "يقود دراجة بعجلتين."],
    "Lexin029257": ["Under tvång.", "تحت الإكراه."],
    "Lexin029263": ["Beslut om tvångsintagning.", "قرار بالإدخال القسري."],
    "Lexin029267": ["Omedelbart tvångsomhändertagande.", "وضع يد قسري فوري."],
    "Lexin029270": ["Ha tvångstankar.", "لديه أفكار قهرية."],
    "Lexin029271": ["Sättas i tvångströja.", "يوضع في سترة المجانين."],
    "Lexin029279": ["Bo i en tvårummare.", "يسكن في شقة غرفتين."],
    "Lexin029280": ["Jobba tvåskift.", "يعمل بنوبتين."],
    "Lexin029283": ["På tvären.", "بالعرض."], // Adverbial usage mostly
    "Lexin029285": ["Korsa en tvärgata.", "يعبر شارعاً فرعياً/مستعرضاً."],
    "Lexin029287": ["Ett tvärsnitt av befolkningen.", "شريحة (مقطع عرضي) من السكان."],
    "Lexin029301": ["Lämna till tvätteriet.", "يسلم للمصبغة (المغسلة)."],
    "Lexin029303": ["Köpa tvättmedel.", "يشتري مسحوق غسيل."],
    "Lexin029304": ["Stort tvättrum.", "حجرة غسيل كبيرة."],
    "Lexin029305": ["Boka tvättstugan.", "يحجز غرفة الغسيل."],
    "Lexin029306": ["Tvätta sig i tvättstället.", "يغسل في الحوض."],
    "Lexin029319": ["Smittas av tyfus.", "يصاب بالتيفوئيد."],
    "Lexin029322": ["Hålla i tyglarna.", "يمسك بالأعنة."],
    "Lexin029328": ["Lyfta en tyngd.", "يرفع ثقلاً."],
    "Lexin029329": ["Upphäva tyngdkraften.", "يلغي الجاذبية."],
    "Lexin029332": ["Hitta tyngdpunkten.", "يجد مركز الثقل."],
    "Lexin029344": ["Arbeta som typograf.", "يعمل كمنضد حروف."],
    "Lexin029345": ["Välja typsnitt.", "يختار نوع الخط."],
    "Lexin029347": ["Han var en tyrann.", "كان طاغية."],
    "Lexin029350": ["Han är tysk.", "هو ألماني."],
    "Lexin029351": ["Tala tyska.", "يتحدث الألمانية."],
    "Lexin029364": ["Gå i ett tåg.", "يمشي في موكب."], // Also train, but definition says procession
    "Lexin029373": ["Ge dig till tåls.", "تحل بالصبر."],
    "Lexin029375": ["Simma bland tång.", "يسبح بين عشب البحر."],
    "Lexin029381": ["Använda tårgas.", "يستخدم الغاز المسيل للدموع."],
    "Lexin029387": ["Varm täckjacka.", "سترة مبطنة دافئة."],
    "Lexin029389": ["Under täckmantel.", "تحت غطاء (تخف)."],
    "Lexin029390": ["Använda täcknamn.", "يستخدم اسماً مستعاراً."],
    "Lexin029392": ["Täljare och nämnare.", "بسط ومقام."],
    "Lexin029394": ["Vass täljkniv.", "سكين نحت حادة."],
    "Lexin029396": ["Resa ett tält.", "ينصب خيمة."],
    "Lexin029400": ["Låna en tändare.", "يستعير قداحة."],
    "Lexin029404": ["Slå på tändningen.", "يشغل الإشعال."],
    "Lexin029405": ["Sista tändstickan.", "آخر عود ثقاب."],
    "Lexin029406": ["Byta tändstift.", "يغير شمعات الاحتراق."],
    "Lexin029410": ["Stor tänkare.", "مفكر عظيم."],
    "Lexin029417": ["Gammalt tänkespråk.", "قول مأثور قديم."],
    "Lexin029420": ["Odla i sin täppa.", "يزرع في حديقته الصغيرة."],
    "Lexin029426": ["En flygande tärna.", "طائر خرشنة طائر."],
    "Lexin029427": ["Vara tärna.", "تكون إشبينة."],
    "Lexin029429": ["Kasta tärning.", "يرمي النرد."],
    "Lexin029438": ["Bo i en tätort.", "يسكن في منطقة آهلة."],
    "Lexin029441": ["Liten tätting.", "عصفور صغير."],
    "Lexin029444": ["Vinna en tävling.", "يفوز بمسابقة."],
    "Lexin029445": ["Det är tö ute.", "الجو دافئ (يذيب الثلج) في الخارج."],
    "Lexin029447": ["Försvinna i töcken.", "يختفي في الغمام."],
    "Lexin029450": ["Vilken tölp!", "يا له من جلف!"],
    "Lexin029451": ["Hålla i tömmarna.", "يمسك باللجام."],
    "Lexin029454": ["Han är en tönt.", "هو أخرق."],
    "Lexin029456": ["Få en törn.", "يتلقى صدمة."],
    "Lexin029457": ["Ta en törn.", "يأخذ نوبة عمل (في البحر)."],
    "Lexin029458": ["Rivs av törne.", "يخدش بالورد البري."],
    "Lexin029459": ["Ingen ros utan törne.", "لا ورد بلا شوك."]
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

const backupPath = DATA_FILE + '.backup_nouns77_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 77 completed!`);
