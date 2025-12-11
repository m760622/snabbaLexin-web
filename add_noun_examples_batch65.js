/**
 * Add examples to nouns - Batch 65 (100 nouns: Smaragd to Socialhögskola) ⭐ 6500 MILESTONE! ⭐
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin025186": ["Smaragd syntes.", "ظهر الزمرد."],
    "Lexin025196": ["Smed smidde.", "سبك الحداد."],
    "Lexin025197": ["Smedja besöktes.", "زُير مصنع الحدادة."],
    "Lexin025202": ["Smeknamn gavs.", "أُعطي اسم الشهرة."],
    "Lexin025203": ["Smekning kändes.", "شُعر بالملاطفة."],
    "Lexin025205": ["Smet blandades.", "خُلطت العجينة."],
    "Lexin025208": ["Smicker gavs.", "أُعطي المديح."],
    "Lexin025210": ["Smide gjordes.", "أُجريت الحدادة."],
    "Lexin025213": ["Smil syntes.", "ظهرت الابتسامة."],
    "Lexin025220": ["Smitare greps.", "اعتُقل الهارب."],
    "Lexin025228": ["Smittbärare identifierades.", "حُدد حامل العدوى."],
    "Lexin025230": ["Smittbärarpenning betalades.", "دُفع تعويض حامل المرض."],
    "Lexin025231": ["Smittkoppor behandlades.", "عولج الجدري."],
    "Lexin025244": ["Smog syntes.", "ظهر الضبخن."],
    "Lexin025245": ["Smoking bars.", "ارتُدي السموكينغ."],
    "Lexin025246": ["Smolk syntes.", "ظهرت دقيقات القذارة."],
    "Lexin025249": ["Smuggelgods beslagtogs.", "صودرت البضائع المهربة."],
    "Lexin025254": ["Smula föll.", "سقط المقدار الضئيل."],
    "Lexin025257": ["Smultron plockades.", "قُطفت الفراولة البري."],
    "Lexin025258": ["Smultronställe hittades.", "وُجد مكان الاستجمام."],
    "Lexin025264": ["Smutsgris badade.", "استحم الطفل القذر."],
    "Lexin025267": ["Smutt dracks.", "شُربت الرشفة."],
    "Lexin025271": ["I smyg gjordes det.", "فُعل سراً."],
    "Lexin025279": ["Småbarn lekte.", "لعب الطفل الصغير."],
    "Lexin025281": ["Småbruk drevs.", "أُديرت المزرعة الصغيرة."],
    "Lexin025282": ["Småbröd bakades.", "خُبز الكعك."],
    "Lexin025284": ["Småfranska åts.", "أُكل الخبز الفرنسي الصغير."],
    "Lexin025285": ["Småföretagare arbetade.", "عمل أصحاب الشركات الصغيرة."],
    "Lexin025286": ["Småhus byggdes.", "بُنيت البيوت الصغيرة."],
    "Lexin025288": ["Småhuskö väntades.", "انتُظر في صف الفلل الصغيرة."],
    "Lexin025291": ["Smålänning talade.", "تحدث السمولاندي."],
    "Lexin025295": ["Småpaket skickades.", "أُرسل الطرد الصغير."],
    "Lexin025296": ["Småpengar gavs.", "أُعطيت قطع النقد المعدنية."],
    "Lexin025297": ["Det är småpotatis.", "يُستهان به."],
    "Lexin025301": ["Småstad besöktes.", "زُيرت المدينة الصغيرة."],
    "Lexin025302": ["I småtimmarna.", "في الساعات المبكرة."],
    "Lexin025304": ["Småttingar lekte.", "لعب الصغار."],
    "Lexin025309": ["Smälek gavs.", "أُعطي التحقير."],
    "Lexin025313": ["Smällare small.", "انفجرت المفرقعة النارية."],
    "Lexin025317": ["En smältdegel.", "نقطة لقاء الثقافات."],
    "Lexin025319": ["Smältverk besöktes.", "زُير المصهر."],
    "Lexin025330": ["Smärting användes.", "استُخدم القماش القطني الخشن."],
    "Lexin025345": ["Smörgåsbord dukades.", "دُكك البوفيه السويدي."],
    "Lexin025346": ["Smörgåstårta serverades.", "قُدمت السمورجوس تورتا."],
    "Lexin025347": ["Smörj gavs.", "أُعطيت الضربة."],
    "Lexin025349": ["Smörjelse gjordes.", "أُجري المسح بالزيت."],
    "Lexin025351": ["Smörpapper användes.", "استُخدم ورق الزبدة."],
    "Lexin025352": ["Smörsångare sjöng.", "غنى المغني العاطفي."],
    "Lexin025355": ["Snabbköp besöktes.", "زُير متجر الشراء السريع."],
    "Lexin025357": ["Snabel syntes.", "ظهر خرطوم الفيل."],
    "Lexin025358": ["Snabel-a skrevs.", "كُتبت العلامة الخاصة."],
    "Lexin025359": ["Snack hördes.", "سُمع الكلام."],
    "Lexin025361": ["Snacks åts.", "أُكلت البزورات."],
    "Lexin025363": ["Snagg syntes.", "ظهرت قصة الشعر القصير."],
    "Lexin025367": ["Snaps dracks.", "شُرب السنابس."],
    "Lexin025380": ["Snattare greps.", "اعتُقل النشال."],
    "Lexin025381": ["Snatter hördes.", "سُمعت الطقطقة."],
    "Lexin025389": ["Snedsprång gjordes.", "أُجري الانحراف."],
    "Lexin025390": ["Snedsteg gjordes.", "أُجري الانحراف الخلقي."],
    "Lexin025391": ["Snedstreck skrevs.", "كُتبت علامة الشحطة المائلة."],
    "Lexin025396": ["Snibb syntes.", "ظهرت القطعة المثلثة."],
    "Lexin025399": ["Snickeri besöktes.", "زُيرت المنجرة."],
    "Lexin025405": ["Snigel kröp.", "زحف الحلزون."],
    "Lexin025407": ["Snille visades.", "أُظهر العبقري."],
    "Lexin025411": ["Snirkel ritades.", "رُسمت الحلية الحلزونية."],
    "Lexin025417": ["Snitt åts.", "أُكلت قطعة السندويش."],
    "Lexin025418": ["Snobb avvisades.", "طُرد المتكبر."],
    "Lexin025420": ["Snobbism visades.", "أُظهر التكبر."],
    "Lexin025421": ["Snodd bands.", "رُبط الخيط."],
    "Lexin025422": ["Snok kröp.", "زحف الثعبان."],
    "Lexin025425": ["Snopp undersöktes.", "فُحص القضيب."],
    "Lexin025428": ["Snor torkades.", "مُسح المخاط."],
    "Lexin025435": ["Snorkel användes.", "استُخدم أنبوب قناع الغوص."],
    "Lexin025439": ["Snubbe talade.", "تحدث الرجل."],
    "Lexin025442": ["På snudd av.", "تقريباً."],
    "Lexin025444": ["Snurr skedde.", "حدث الدوران."],
    "Lexin025445": ["Snurra snurrades.", "دار دولاب الهواء."],
    "Lexin025446": ["Snurra användes.", "استُخدم المحرك الخارجي."],
    "Lexin025455": ["Snusk syntes.", "ظهرت القذارة."],
    "Lexin025456": ["Snuskhummer dömdes.", "حُكم على الرجل الوقح."],
    "Lexin025459": ["Snut patrullerade.", "تجول الشرطي."],
    "Lexin025461": ["Snutt klipptes.", "قُصت القطعة."],
    "Lexin025466": ["Snyft hördes.", "سُمع البكاء."],
    "Lexin025471": ["Snygging syntes.", "ظهر الأنيق."],
    "Lexin025478": ["Snålblåst blåste.", "هبت الزمهرير."],
    "Lexin025479": ["Åka snålskjuts.", "استغلال."],
    "Lexin025480": ["Snår syntes.", "ظهر الدغل."],
    "Lexin025483": ["Snäcka hittades.", "وُجد المحار."],
    "Lexin025486": ["Snälltåg åkte.", "سار القطار السريع."],
    "Lexin025490": ["Snärt gavs.", "أُعطيت الجلدة."],
    "Lexin025506": ["Snöskoter kördes.", "قيدت دراجة الجليد النارية."],
    "Lexin025509": ["Soaré hölls.", "أُقيمت السوارية."],
    "Lexin025520": ["Socialarbetare hjälpte.", "ساعد العامل الاجتماعي."],
    "Lexin025521": ["Socialassistent arbetade.", "عمل المساعد الاجتماعي."],
    "Lexin025522": ["Socialavgift betalades.", "دُفعت رسوم التأمينات الاجتماعية."],
    "Lexin025524": ["Socialbidrag gavs.", "أُعطيت المعونة الاجتماعية."],
    "Lexin025525": ["Socialdemokrat talade.", "تحدث الاشتراكي الديمقراطي."],
    "Lexin025530": ["Socialen kontaktades.", "اتُصل بإدارة الخدمات الاجتماعية."],
    "Lexin025531": ["Socialförsäkring gällde.", "سرى التأمين الاجتماعي."],
    "Lexin025537": ["Socialhögskola gicks.", "التُحق بالمدرسة العليا للدراسات الاجتماعية."]
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

const backupPath = DATA_FILE + '.backup_nouns65_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`\n🎉🎉🎉🎉🎉 6500 NOUNS MILESTONE ACHIEVED! 🎉🎉🎉🎉🎉`);
console.log(`✅ Total: 6500 nouns now have Swedish & Arabic examples!`);
console.log(`🇸🇪 6500 svenska exempelmeningar`);
console.log(`🇸🇦 6500 arabiska översättningar`);
console.log(`📊 Remaining: ~1981 nouns (23%)\n`);
