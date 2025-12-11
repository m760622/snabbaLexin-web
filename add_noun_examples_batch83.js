/**
 * Add examples to nouns - Batch 83 (100 nouns: Väktare to Zombie)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin031510": ["Nattlig väktare.", "حارس ليلي."],
    "Lexin031514": ["Allt väl?", "هل كل شيء بخير؟"],
    "Lexin031517": ["Psykiskt välbefinnande.", "رفاهية نفسية."],
    "Lexin031523": ["Romerska väldet.", "الإمبراطورية الرومانية."],
    "Lexin031524": ["Ha någon i sitt välde.", "يتحكم بشخص ما."],
    "Lexin031528": ["Välfärd för alla.", "رخاء للجميع."],
    "Lexin031531": ["Utföra en välgärning.", "يقوم بعمل خيري."],
    "Lexin031533": ["Skänka till välgörenhet.", "يتبرع للأعمال الخيرية."],
    "Lexin031535": ["Tala till väljarna.", "يتحدث للناخبين."],
    "Lexin031543": ["Äta välling.", "يأكل الثريد."],
    "Lexin031544": ["Musikens välljud.", "عذوبة الموسيقى."],
    "Lexin031566": ["Känna vämjelse.", "يشعر بالقرف."],
    "Lexin031574": ["Min bästa väninna.", "صديقتي المفضلة."],
    "Lexin031579": ["Evig vänskap.", "صداقة أبدية."],
    "Lexin031584": ["Ett litet vänsterprassel.", "علاقة غرامية عابرة."],
    "Lexin031587": ["Lång väntetid.", "وقت انتظار طويل."],
    "Lexin031588": ["Sitta i väntrummet.", "يجلس في غرفة الانتظار."],
    "Lexin031590": ["Väntsalen på stationen.", "قاعة الانتظار في المحطة."],
    "Lexin031597": ["Min värd.", "مالك شقتي."],
    "Lexin031598": ["Var en god värd.", "كن مضيفاً جيداً."],
    "Lexin031601": ["Ett högt värde.", "قيمة عالية."],
    "Lexin031606": ["Skicka som värdeförsändelse.", "يرسل كبريد مضمون."],
    "Lexin031611": ["Köpa värdepapper.", "يشتري أوراقاً مالية."],
    "Lexin031616": ["Göra en värdering.", "يقوم بتقييم."],
    "Lexin031623": ["Tacka värdfolket.", "يشكر المضيفين."],
    "Lexin031626": ["Flygvärdinna.", "مضيفة طيران."],
    "Lexin031627": ["Gammalt värdshus.", "مطعم ريفي قديم."],
    "Lexin031628": ["Fäktas med värja.", "يبارز بالشيش."],
    "Lexin031631": ["Värk i ryggen.", "ألم في الظهر."],
    "Lexin031632": ["Få värkar.", "تبدأ آلام الولادة."],
    "Lexin031636": ["I denna världen.", "في هذا العالم."],
    "Lexin031639": ["En mörk världsbild.", "نظرة سوداوية للعالم."],
    "Lexin031640": ["En annan världsdel.", "قارة أخرى."],
    "Lexin031641": ["Han är en världsförbättrare.", "هو مصلح اجتماعي (مثالي)."],
    "Lexin031643": ["Tredje världskriget.", "الحرب العالمية الثالثة."],
    "Lexin031645": ["Bli världsmästare.", "يصبح بطل العالم."],
    "Lexin031646": ["Vinna världsmästerskapet.", "يفوز ببطولة العالم."],
    "Lexin031647": ["Sätta nytt världsrekord.", "يسجل رقماً قياسياً عالمياً جديداً."],
    "Lexin031651": ["Lida i värmeböljan.", "يعاني في موجة الحر."],
    "Lexin031653": ["Lufta värmeelementet.", "يفرغ الهواء من المشعاع."],
    "Lexin031658": ["Få värmeslag.", "يصاب بضربة شمس."],
    "Lexin031664": ["En glad värmlänning.", "شخص مرح من فيرملاند."],
    "Lexin031665": ["Till stadens värn.", "للدفاع عن المدينة."],
    "Lexin031669": ["Göra värnplikt.", "يؤدي الخدمة العسكرية."],
    "Lexin031678": ["Viktigt värv.", "مهمة جليلة."],
    "Lexin031692": ["Stickad väst.", "صديري محبوك."],
    "Lexin031693": ["Öst och väst.", "الشرق والغرب."],
    "Lexin031694": ["Solen går ner i väster.", "تغرب الشمس في الغرب."],
    "Lexin031700": ["Det blev ett västgötaklimax.", "كانت نهاية مخيبة للآمال."],
    "Lexin031701": ["Han är västgöte.", "هو من فستريوتلاند."],
    "Lexin031708": ["Flytande väte.", "هيدروجين سائل."],
    "Lexin031710": ["Dricka mycket vätska.", "يشرب الكثير من السوائل."],
    "Lexin031727": ["Skadad vävnad.", "نسيج متضرر."],
    "Lexin031728": ["Iransk vävnad.", "نسيج إيراني."],
    "Lexin031732": ["Väva i vävstol.", "ينسج على النول."],
    "Lexin031733": ["Jobba i växeln.", "يعمل في السنترال."],
    "Lexin031737": ["Dollarns växelkurs.", "سعر صرف الدولار."],
    "Lexin031738": ["Automatisk växellåda.", "علبة تروس أوتوماتيكية."],
    "Lexin031739": ["Likström och växelström.", "تيار مستمر ومتردد."],
    "Lexin031740": ["Växelverkan mellan arv och miljö.", "التفاعل بين الوراثة والبيئة."],
    "Lexin031753": ["Tomater i växthus.", "طماطم في بيت بلاستيكي."],
    "Lexin031754": ["Rik växtlighet.", "نباتات وفيرة."],
    "Lexin031755": ["Tillhör växtriket.", "ينتمي لعالم النبات."],
    "Lexin031756": ["Barnet har växtvärk.", "الطفل لديه آلام النمو."],
    "Lexin031759": ["Känna vördnad.", "يشعر بالتبجيل."],
    "Lexin031760": ["Stark vört.", "نقيع شعير قوي."],
    "Lexin031762": ["Anropa på walkie-talkie.", "ينادي باللاسلكي."],
    "Lexin031763": ["Lampa på 60 watt.", "مصباح 60 واط."],
    "Lexin031764": ["Gå på wc.", "يذهب للمرحاض."],
    "Lexin031766": ["Starta webbläsaren.", "يفتح المتصفح."],
    "Lexin031767": ["Kontakta webbmästaren.", "يتصل بمسؤول الموقع."],
    "Lexin031768": ["Besöka en webbplats.", "يزور موقع إنترنت."],
    "Lexin031769": ["Tidningens webbredaktör.", "محرر الموقع الإلكتروني للصحيفة."],
    "Lexin031771": ["Duktig webbtekniker.", "فني ويب ماهر."],
    "Lexin031772": ["Ett glas whisky.", "كأس ويسكي."],
    "Lexin031773": ["Ta ett wienerbröd.", "يأكل كعكة دانمركية."],
    "Lexin031774": ["Varm wienerkorv.", "نقانق ساخنة."],
    "Lexin031775": ["Gå på workout.", "يذهب لتمرين رياضي."],
    "Lexin031777": ["Hänga tavlan på en x-krok.", "يعلق اللوحة على خطاف."],
    "Lexin031779": ["Spela xylofon.", "يعزف على الإكسيليفون."],
    "Lexin031781": ["Strumpor av ylle.", "وارب صوفية."],
    "Lexin031784": ["Fiskens yngel.", "فراخ السمك."],
    "Lexin031786": ["En vacker yngling.", "شاب وسيم."],
    "Lexin031790": ["Du är en ynkrygg.", "أنت جبان."],
    "Lexin031804": ["Byta yrke.", "يغير مهنته."],
    "Lexin031828": ["Prata med yrkesvalsläraren.", "يتحدث مع مرشد التوجيه المهني."],
    "Lexin031831": ["Känna yrsel.", "يشعر بالدوار."],
    "Lexin031833": ["Gå ut i yrvädret.", "يخرج في العاصفة الثلجية."],
    "Lexin031835": ["Husets yta.", "مساحة المنزل."],
    "Lexin031839": ["Han spelar ytter.", "يلعب كجناح."],
    "Lexin031840": ["I stadens ytterkant.", "في أطراف المدينة."],
    "Lexin031841": ["Ta på ytterkläder.", "يلبس ملابس الخروج."],
    "Lexin031854": ["Försvara yttrandefriheten.", "يدافع عن حرية التعبير."],
    "Lexin031864": ["Yttring av missnöje.", "تعبير عن الاستياء."],
    "Lexin031865": ["Leva som en yuppie.", "يعيش كيوبي (شاب غني)."],
    "Lexin031867": ["Hugga med yxa.", "يضرب بالفأس."],
    "Lexin031868": ["God dag yxskaft.", "صباح الخير يا يد الفأس (جواب في غير محله)."],
    "Lexin031870": ["Romska zigenare.", "غجر الروما."], // "Romer" is preferred term now, but sticking to dict entry
    "Lexin031872": ["Rik på zink.", "غني بالزنك."],
    "Lexin031874": ["Sitta som en zombie.", "يجلس كالزومبي (شارد)."]
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

const backupPath = DATA_FILE + '.backup_nouns83_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 83 completed!`);
