/**
 * Add examples to nouns - Batch 54 (100 nouns: Psykologi to Ragu)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin021447": ["Psykologi studerades.", "دُرس علم النفس."],
    "Lexin021449": ["Psykopaten greps.", "اعتُقل المعتل نفسياً."],
    "Lexin021450": ["Psykos behandlades.", "عولج الذهان."],
    "Lexin021456": ["Psykoterapi gavs.", "أُعطيت المعالجة النفسانية."],
    "Lexin021458": ["Puben besöktes.", "زُيرت الحانة."],
    "Lexin021462": ["Public relations sköttes.", "أُديرت العلاقات العامة."],
    "Lexin021464": ["Publicisten skrev.", "كتب الناشر."],
    "Lexin021469": ["Publikationen trycktes.", "طُبع المطبوع."],
    "Lexin021471": ["Pucken slogs.", "ضُرب البك."],
    "Lexin021472": ["Puckeln syntes.", "ظهرت الحدبة."],
    "Lexin021474": ["Pudding serverades.", "قُدم البودينغ."],
    "Lexin021475": ["Puddingen log.", "ابتسمت الفتاة الجميلة."],
    "Lexin021476": ["Pudeln skällde.", "نبح البودل."],
    "Lexin021477": ["Puder användes.", "استُخدمت البودرة."],
    "Lexin021481": ["Puff steg.", "صعدت الفرقعة."],
    "Lexin021484": ["Puffran gömdes.", "خُبئ المسدس."],
    "Lexin021485": ["Pulkan åktes.", "رُكبت زحافة البولكا."],
    "Lexin021486": ["Pullovern bars.", "ارتُدي البلوفر."],
    "Lexin021499": ["Puman jagade.", "طارد الكوجر."],
    "Lexin021500": ["Pumpen fungerade.", "عملت المضخة."],
    "Lexin021501": ["Pumpa skördades.", "حُصد القرع."],
    "Lexin021504": ["Pumps bars.", "ارتُدي الحذاء العالي."],
    "Lexin021505": ["Pund växlades.", "صُرف الجنيه."],
    "Lexin021506": ["Pundaren greps.", "اعتُقل الحشاش."],
    "Lexin021507": ["Pungen öppnades.", "فُتح الكيس."],
    "Lexin021508": ["Pungen undersöktes.", "فُحص الصفن."],
    "Lexin021511": ["Punk spelades.", "شُغلت البونك."],
    "Lexin021518": ["Punktskatt betalades.", "دُفعت ضريبة الاستهلاك."],
    "Lexin021520": ["Punktskrift lästes.", "قُرئت الحروف النافرة."],
    "Lexin021522": ["Punsch dracks.", "شُرب البونش."],
    "Lexin021523": ["Pupillen vidgades.", "توسع البؤبؤ."],
    "Lexin021526": ["Puppan utvecklades.", "تطورت الخادرة."],
    "Lexin021529": ["Puré serverades.", "قُدم البوريه."],
    "Lexin021530": ["Puritanen levde enkelt.", "عاش البيوريتاني بساطة."],
    "Lexin021531": ["Purjolök hackades.", "فُرم الكراث."],
    "Lexin021536": ["Pussen syntes.", "ظهرت البريكة."],
    "Lexin021539": ["Pusselbiten saknades.", "افتُقدت قطعة الأحجية."],
    "Lexin021541": ["Pust kändes.", "شُعر بالنفخة."],
    "Lexin021547": ["Puts sattes.", "وُضع الملاط."],
    "Lexin021554": ["Pyjamas bars.", "ارتُديت البيجاما."],
    "Lexin021555": ["Pynt sattes.", "وُضعت الزينة."],
    "Lexin021559": ["Pyren sov.", "نام الطفل الرضيع."],
    "Lexin021560": ["Pyromanen greps.", "اعتُقل المهووس بالحرق."],
    "Lexin021561": ["Pysen lekte.", "لعب الولد الصغير."],
    "Lexin021564": ["Pyssel gjordes.", "أُجري الشغل."],
    "Lexin021567": ["Pytsen fylldes.", "مُلئ الجردل الصغير."],
    "Lexin021569": ["Pyttipanna serverades.", "قُدمت البيتيبانا."],
    "Lexin021587": ["Påbud gavs.", "أُعطي الأمر."],
    "Lexin021590": ["Pådrivaren pressade.", "ضغط الحافز."],
    "Lexin021595": ["Påfarten togs.", "أُخذ المخرج إلى الأوتوستراد."],
    "Lexin021599": ["Påfund gjordes.", "أُجري الابتكار."],
    "Lexin021600": ["Påfyllning gavs.", "أُعطي المزيد."],
    "Lexin021601": ["Påfågeln visade sig.", "ظهر الطاووس."],
    "Lexin021610": ["Påhitt avslöjades.", "اكتُشف الاختلاق."],
    "Lexin021612": ["Påhopp skedde.", "حدثت المهاجمة."],
    "Lexin021614": ["Påhäng kändes.", "شُعر بالعبء."],
    "Lexin021620": ["Pålen restes.", "رُفع العمود."],
    "Lexin021622": ["Pålle galopperade.", "ركض الحصان."],
    "Lexin021626": ["Pålägg tillkom.", "أُضيفت الإضافة."],
    "Lexin021627": ["Påläggskalven befordrades.", "رُقي رجل المستقبل."],
    "Lexin021631": ["Pånyttfödelse skedde.", "حدث التحديث."],
    "Lexin021635": ["Påringning gjordes.", "أُجريت محاولة الاتصال."],
    "Lexin021640": ["Påskkäringen flög.", "طارت ساحرة عيد الفصح."],
    "Lexin021641": ["Påskliljan blommade.", "أزهر النرجس الأصفر."],
    "Lexin021642": ["Påskriften lästes.", "قُرئ التوقيع."],
    "Lexin021643": ["Påskris dekorerades.", "زُينت أغصان عيد الفصح."],
    "Lexin021646": ["Påslakan byttes.", "بُدل كيس اللحاف."],
    "Lexin021647": ["Påssjuka behandlades.", "عولج النكاف."],
    "Lexin021661": ["Påtår serverades.", "قُدم المزيد من القهوة."],
    "Lexin021663": ["Påven talade.", "تحدث البابا."],
    "Lexin021675": ["Pärlemor syntes.", "ظهرت طبقة المحار الداخلية."],
    "Lexin021681": ["Pöbeln samlades.", "تجمع المشاغبون."],
    "Lexin021682": ["Pölen syntes.", "ظهرت البركة."],
    "Lexin021683": ["Pölsa serverades.", "قُدم البولسا."],
    "Lexin021686": ["Quislingen greps.", "اعتُقل بائع الوطن."],
    "Lexin021688": ["Rabarber skördades.", "حُصد الراوند."],
    "Lexin021691": ["Rabbinen bad.", "صلى الحاخام."],
    "Lexin021696": ["Racern kördes.", "قيدت عربة السباق."],
    "Lexin021697": ["Racket placerades.", "وُضع الرف."],
    "Lexin021699": ["Rackaren bråkade.", "شاغب الوغد."],
    "Lexin021701": ["Racketen användes.", "استُخدم المضرب."],
    "Lexin021705": ["Radar användes.", "استُخدم الرادار."],
    "Lexin021707": ["Radarkontroll gjordes.", "أُجريت مراقبة الرادار."],
    "Lexin021708": ["Radarparet spelade.", "لعب المتناغمان."],
    "Lexin021709": ["Radbandet användes.", "استُخدمت السبحة."],
    "Lexin021710": ["Raddan lästes.", "قُرئ السطر."],
    "Lexin021712": ["Radergummit användes.", "استُخدمت الممحاة المطاطية."],
    "Lexin021713": ["Radhuset beboddes.", "سُكنت الفلل المرتبطة."],
    "Lexin021722": ["Radio lyssnades.", "استُمع إلى المذياع."],
    "Lexin021728": ["Radium är farligt.", "الراديوم خطير."],
    "Lexin021729": ["Radon mättes.", "قيس الرادون."],
    "Lexin021731": ["Raffel upplevdes.", "جُرب الشيء المثير."],
    "Lexin021734": ["Raffinemang visades.", "أُظهر التحسين."],
    "Lexin021741": ["Ragatan skrek.", "صرخت المرأة المشاكسة."],
    "Lexin021742": ["Ragg syntes.", "ظهر الوبر الخشن."],
    "Lexin021744": ["Raggaren körde.", "قاد الرغري."],
    "Lexin021745": ["Raggmunk serverades.", "قُدم الراج مونك."],
    "Lexin021746": ["Raggsockan bars.", "ارتُدي الجورب الخشن."],
    "Lexin021748": ["Ragnarök kom.", "جاء يوم القيامة."],
    "Lexin021749": ["Ragu serverades.", "قُدمت اليخنة باللحم."]
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

const backupPath = DATA_FILE + '.backup_nouns54_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 5400 nouns!`);
