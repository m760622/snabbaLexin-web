/**
 * Add examples to nouns - Batch 18 (100 nouns: Finsmakare to Fodral)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin007690": ["Finsmakaren njöt av vinet.", "تذوق الذواقة النبيذ."],
    "Lexin007698": ["Fiolen spelade vacker musik.", "عزف الكمان موسيقى جميلة."],
    "Lexin007702": ["Firman anställde nya medarbetare.", "وظفت الشركة موظفين جدد."],
    "Lexin007707": ["Fiskaren kastade ut nätet.", "ألقى صياد السمك الشبكة."],
    "Lexin007711": ["Fiskegränsen reglerar fisket.", "تنظم حدود الصيد الصيد."],
    "Lexin007712": ["Fiskekortet kostade 50 kronor.", "كلف تصريح الصيد 50 كرون."],
    "Lexin007713": ["Fiskeläget var pittoreskt.", "كانت قرية الصيادين خلابة."],
    "Lexin007715": ["Fiskmåsen skrek vid hamnen.", "صاح النورس في الميناء."],
    "Lexin007716": ["Fiskpinnarna serverades med mos.", "قُدمت أصابع السمك مع البوريه."],
    "Lexin007717": ["Fissionen frigjorde energi.", "أطلق الانشطار طاقة."],
    "Lexin007720": ["Fittan är ett könsorgan.", "الفرج عضو تناسلي."],
    "Lexin007723": ["Fixaren löste problemet.", "حل المدبر المشكلة."],
    "Lexin007730": ["Fjanten var löjlig.", "كان السخيف مضحكاً."],
    "Lexin007731": ["I fjol var sommaren varm.", "في العام الفائت كان الصيف حاراً."],
    "Lexin007732": ["Fiollan förstod ingenting.", "لم تفهم الحمقاء شيئاً."],
    "Lexin007734": ["Fjorden var djup.", "كان اللسان البحري عميقاً."],
    "Lexin007737": ["Fjunet var mjukt.", "كان الزغب ناعماً."],
    "Lexin007739": ["Fjädern föll från fågeln.", "سقطت الريشة من الطائر."],
    "Lexin007745": ["Fjädringen var bekväm.", "كان نظام النوابض مريحاً."],
    "Lexin007748": ["Fjällen skrapades bort.", "أُزيلت قشور السمك."],
    "Lexin007753": ["Fjärden var lugn.", "كان الخليج هادئاً."],
    "Lexin007764": ["Fjärrvärmen värmde huset.", "دفأت التدفئة المركزية البيت."],
    "Lexin007766": ["Fjärten hördes.", "سُمعت الضرطة."],
    "Lexin007768": ["Fjäsket var äckligt.", "كان التزلف مقززاً."],
    "Lexin007772": ["Flabbet irriterade.", "أزعج الضحك الاستهزائي."],
    "Lexin007776": ["Fladdermusen flög på natten.", "طار الخفاش ليلاً."],
    "Lexin007778": ["Flagan föll av väggen.", "سقطت القشارة من الجدار."],
    "Lexin007782": ["Flaggan vajade i vinden.", "رفرف العلم في الريح."],
    "Lexin007784": ["Flaggskeppet ledde flottan.", "قادت البارجة الأسطول."],
    "Lexin007788": ["Flaket var slät.", "كان السطح المستوي أملس."],
    "Lexin007790": ["Flamman brann högt.", "اشتعل اللهب عالياً."],
    "Lexin007795": ["Flamskvävnaden var vacker.", "كان النسيج الفلاندري جميلاً."],
    "Lexin007797": ["Flanellen var mjuk.", "كانت الفلانيلة ناعمة."],
    "Lexin007802": ["Flaskhalsen var trång.", "كان عنق الزجاجة ضيقاً."],
    "Lexin007806": ["Flatan gick på paraden.", "شاركت المثلية في الموكب."],
    "Lexin007818": ["Flerfamiljshuset hade många lägenheter.", "احتوت البناية على شقق كثيرة."],
    "Lexin007824": ["Flertalet tyckte det var bra.", "اعتقد العديد أنه جيد."],
    "Lexin007825": ["Flertalet av orden var nya.", "كانت معظم الكلمات جديدة."],
    "Lexin007830": ["Flextiden gav frihet.", "أعطى الدوام المرن حرية."],
    "Lexin007832": ["Flicknamnet var Anna.", "كان اسم البنت آنا."],
    "Lexin007833": ["Flickvännen kom på besök.", "جاءت الصديقة للزيارة."],
    "Lexin007835": ["Flimmret störde synen.", "أزعج الرجفان الرؤية."],
    "Lexin007839": ["Flinet var elakt.", "كانت الابتسامة الساخرة شريرة."],
    "Lexin007841": ["Flingan föll från taket.", "سقطت القشارة من السقف."],
    "Lexin007843": ["Flinten syntes tydligt.", "ظهرت الصلعة بوضوح."],
    "Lexin007844": ["Flintan var hård.", "كان الحجر الصلد صلباً."],
    "Lexin007846": ["Flipperspelet var roligt.", "كانت لعبة الفليبر ممتعة."],
    "Lexin007848": ["Flisen användes för uppvärmning.", "استُخدمت الرقاقة الخشبية للتدفئة."],
    "Lexin007849": ["Flisan skar fingret.", "قطعت الرقاقة الإصبع."],
    "Lexin007851": ["Fliten belönades.", "كوفئ الاجتهاد."],
    "Lexin007854": ["Flocken av får betade.", "رعى قطيع الأغنام."],
    "Lexin007855": ["Floden var bred.", "كان النهر عريضاً."],
    "Lexin007861": ["Floret var tunt.", "كان الحجاب رقيقاً."],
    "Lexin007866": ["Florsockret ströddas över kakan.", "رُش السكر الناعم على الكعكة."],
    "Lexin007867": ["Floskeln var meningslös.", "كانت العبارة الفارغة بلا معنى."],
    "Lexin007869": ["Flottet stekte köttbullar.", "قلى الدهن السائل كرات اللحم."],
    "Lexin007870": ["Flottan seglade ut.", "أبحر الأسطول."],
    "Lexin007872": ["Flotten bar människor.", "حملت الطوافة الناس."],
    "Lexin007873": ["Flottiljen flög över staden.", "حلق سرب الطائرات فوق المدينة."],
    "Lexin007874": ["Flottningen var svår.", "كان تطويف الجذوع صعباً."],
    "Lexin007875": ["Flugan surrade.", "طنت الذبابة."],
    "Lexin007876": ["Flugan matchade kostymen.", "تناسب البابيون مع البدلة."],
    "Lexin007877": ["Flugan för hälsokost dröjde kvar.", "استمر الهوس بالطعام الصحي."],
    "Lexin007880": ["Flugsmällan träffade flugan.", "أصابت ضرابة الذباب الذبابة."],
    "Lexin007881": ["Flugsnapparen fångade insekter.", "اصطاد الشورب الحشرات."],
    "Lexin007885": ["Flundran låg på havsbotten.", "استلقى السمك المفلطح على قاع البحر."],
    "Lexin007886": ["Fluor skyddar tänderna.", "يحمي الفلوريد الأسنان."],
    "Lexin007891": ["Flygaren styrde planet.", "قاد الطيار الطائرة."],
    "Lexin007893": ["Flygbladet delades ut.", "وُزع المنشور."],
    "Lexin007894": ["Flygeln spelade Chopin.", "عزف البيانو الكبير شوبان."],
    "Lexin007895": ["Flygeln på byggnaden var ny.", "كان جناح المبنى جديداً."],
    "Lexin007901": ["Flyglarmet ljöd.", "أُطلق إنذار الغارات."],
    "Lexin007907": ["Flygvapnet skyddade landet.", "حمى سلاح الطيران البلاد."],
    "Lexin007910": ["Flygvärdinnan serverade mat.", "قدمت مضيفة الطائرة الطعام."],
    "Lexin007912": ["Flykten var dramatisk.", "كان الهروب دراماتيكياً."],
    "Lexin007950": ["Flyttfågeln flög söderut.", "طار الطير المهاجر جنوباً."],
    "Lexin007951": ["Flyttlasset packades.", "حُملت حمولة النقل."],
    "Lexin007952": ["Flyttlasspolitiken kritiserades.", "انتُقدت سياسة نقل السكن."],
    "Lexin007953": ["Flyttningen gick smidigt.", "سار تبديل السكن بسلاسة."],
    "Lexin007954": ["Flyttningsanmälan lämnades in.", "قُدم إشعار تغيير العنوان."],
    "Lexin007955": ["Flyttningsbidraget hjälpte ekonomin.", "ساعدت إعانة الانتقال الاقتصاد."],
    "Lexin007956": ["Flyttningshjälpen kom i tid.", "جاءت معونة الانتقال في الوقت."],
    "Lexin007957": ["Flytvästen räddade livet.", "أنقذت سترة النجاة الحياة."],
    "Lexin007969": ["Fläkten kylde rummet.", "بردت المروحة الغرفة."],
    "Lexin007976": ["Han var i fläng.", "كان مسرعاً."],
    "Lexin007978": ["Flärden lockade henne.", "جذبها الشيء الأنيق."],
    "Lexin007980": ["Fläskpannkakan var god.", "كانت فطيرة الخنزير لذيذة."],
    "Lexin007981": ["Flätan var lång.", "كانت الجديلة طويلة."],
    "Lexin007984": ["Flödet av vatten ökade.", "زاد تدفق الماء."],
    "Lexin007990": ["Flöjten spelade melodin.", "عزفت الفلوت اللحن."],
    "Lexin007991": ["Flörten var oskyldig.", "كان الغزل بريئاً."],
    "Lexin007993": ["Flötet sjönk.", "غرقت الفلينة."],
    "Lexin007998": ["Fnasket arresterades.", "اعتُقلت المومس."],
    "Lexin007999": ["Han blev fnatt.", "أصابه الجنون."],
    "Lexin008002": ["Det var en fnurra på tråden.", "كان هناك نكد."],
    "Lexin008005": ["Foajén var pampig.", "كان البهو فخماً."],
    "Lexin008006": ["Fobin kontrollerades med terapi.", "سُيطر على الرهاب بالعلاج."],
    "Lexin008008": ["Fodret gavs till djuren.", "أُعطي العلف للحيوانات."],
    "Lexin008009": ["Fodret syddes fast.", "خيطت البطانة."],
    "Lexin008011": ["Fodralet skyddade mobilen.", "حمى الغمد الهاتف."]
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

const backupPath = DATA_FILE + '.backup_nouns18_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 1800 nouns!`);
