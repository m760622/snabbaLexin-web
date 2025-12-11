/**
 * Add examples to nouns - Batch 44 (100 nouns: Medkänsla to Modem)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin017482": ["Medkänsla visades.", "أُظهر العطف."],
    "Lexin017489": ["Medlidande kändes.", "شُعر بالشفقة."],
    "Lexin017494": ["Medljudet uttalades.", "نُطق الحرف الساكن."],
    "Lexin017495": ["Medlöparen följde.", "تبع العميل."],
    "Lexin017501": ["Medtävlaren vann.", "فاز الغريم."],
    "Lexin017514": ["Medvursten åts.", "أُكل سجق مدفورست."],
    "Lexin017516": ["Medömkan visades.", "أُظهرت الشفقة."],
    "Lexin017517": ["Megabit är stort.", "الميجابايت كبير."],
    "Lexin017519": ["Megafonen användes.", "استُخدم مضخم الصوت."],
    "Lexin017523": ["Mejeriet producerade.", "أنتجت الملبنة."],
    "Lexin017524": ["Mejseln användes.", "استُخدم المفك."],
    "Lexin017533": ["Melankolin tog över.", "سيطرت السوداء."],
    "Lexin017542": ["Mellangärdet rörde sig.", "تحرك الحجاب الحاجز."],
    "Lexin017543": ["Mellanhanden förmedlade.", "توسط الوسيط."],
    "Lexin017546": ["Mellanhavandet ordnades.", "سُويت المعاملات."],
    "Lexin017552": ["Mellanskillnaden betalades.", "دُفع الفرق."],
    "Lexin017553": ["Mellanslaget skrevs.", "كُتبت المسافة الفارغة."],
    "Lexin017554": ["Mellanspelet spelades.", "عُزفت الساكنة."],
    "Lexin017555": ["Mellanstadium gicks.", "دُرست المرحلة المتوسطة."],
    "Lexin017560": ["Melodin sjöngs.", "غُني اللحن."],
    "Lexin017562": ["Melonen åts.", "أُكل الشمام."],
    "Lexin017563": ["Memoarerna skrevs.", "كُتبت المذكرات."],
    "Lexin017570": ["Mened är olagligt.", "الحنث باليمين غير قانوني."],
    "Lexin017572": ["Menigen marscherade.", "سار الجندي."],
    "Lexin017582": ["Meningit behandlades.", "عولج التهاب السحايا."],
    "Lexin017584": ["Meningsfränden höll med.", "وافق المشارك في الرأي."],
    "Lexin017587": ["Meningsskiljaktighet rådde.", "ساد اختلاف الرأي."],
    "Lexin017588": ["Menisken skadades.", "أُصيب الغضروف الهلالي."],
    "Lexin017595": ["Mensen kom.", "جاء الطمث."],
    "Lexin017596": ["Menstruationen pågick.", "استمر الطمث."],
    "Lexin017601": ["Mentaliteten analyserades.", "حُللت العقلية."],
    "Lexin017603": ["Mentalvården hjälpte.", "ساعدت رعاية الأمراض العقلية."],
    "Lexin017604": ["Menyn lästes.", "قُرئت لائحة الطعام."],
    "Lexin017610": ["Meridianen passerades.", "عُبر خط الزوال."],
    "Lexin017613": ["Meritförteckningen skrevs.", "كُتبت لائحة الكفاءات."],
    "Lexin017617": ["Merparten togs.", "أُخذ الجزء الأكبر."],
    "Lexin017623": ["Mesen sjöng.", "غنى القرقف."],
    "Lexin017624": ["Mesen bars.", "حُمل حامل حقيبة الظهر."],
    "Lexin017625": ["Mesen var rädd.", "كان الجبان خائفاً."],
    "Lexin017627": ["Mesosten smakade.", "طعم جبن الماعز."],
    "Lexin017639": ["Metallarbetaren arbetade.", "عمل عامل المعادن."],
    "Lexin017645": ["Meteorologen förutsade.", "تنبأ خبير الأرصاد الجوية."],
    "Lexin017646": ["Meteorologin studerades.", "دُرس علم الأرصاد الجوية."],
    "Lexin017651": ["Metodisten bad.", "صلى من أتباع الكنيسة الميتودية."],
    "Lexin017652": ["Metropolen besöktes.", "زُيرت الحاضرة."],
    "Lexin017653": ["Mexikanen reste hem.", "عاد المكسيكي للوطن."],
    "Lexin017659": ["Midsommar firades.", "احتُفل بعيد منتصف الصيف."],
    "Lexin017667": ["Migränen smärtade.", "آلمت الشقيقة."],
    "Lexin017671": ["Mikrofonen användes.", "استُخدم الميكروفون."],
    "Lexin017673": ["Mikroskopet användes.", "استُخدم المجهر."],
    "Lexin017677": ["En mil är långt.", "الميل السويدي طويل."],
    "Lexin017696": ["En miljard är mycket.", "المليار كثير."],
    "Lexin017728": ["Milkshaken dracks.", "شُرب الميلك شيك."],
    "Lexin017729": ["Millenniet startade.", "بدأ القرن الحادي والعشرون."],
    "Lexin017731": ["En milliliter mättes.", "قيس مليليتر."],
    "Lexin017732": ["En millimeter är liten.", "المليمتر صغير."],
    "Lexin017733": ["Millimeterrättvisa krävdes.", "طُلبت العدالة المفرطة."],
    "Lexin017735": ["Mimiken syntes.", "ظهرت التعبيرات بالوجه."],
    "Lexin017740": ["Minan exploderade.", "انفجر اللغم."],
    "Lexin017742": ["Mindervärdeskomplex kändes.", "شُعر بعقدة النقص."],
    "Lexin017748": ["Mineralen bröts.", "استُخرج المعدن."],
    "Lexin017753": ["Miniatyren visades.", "عُرض المصغر."],
    "Lexin017756": ["Minimum nåddes.", "بُلغ الحد الأدنى."],
    "Lexin017757": ["Miniräknaren användes.", "استُخدمت الحاسبة الصغيرة."],
    "Lexin017763": ["Ministären beslutade.", "قرر مجلس الوزراء."],
    "Lexin017764": ["Minken jagades.", "طُورد المينك."],
    "Lexin017766": ["Minnet sparades.", "حُفظت الذاكرة."],
    "Lexin017771": ["Minnesmärket invigdes.", "افتُتح النصب التذكاري."],
    "Lexin017780": ["Minspelet syntes.", "ظهرت تعابير الوجه."],
    "Lexin017787": ["Det säljs i minut.", "يُباع بالمفرق."],
    "Lexin017790": ["Miraklet skedde.", "حدثت المعجزة."],
    "Lexin017791": ["Mischmasch blandades.", "خُلط المزيج."],
    "Lexin017802": ["Missbrukaren hjälptes.", "ساعد المدمن."],
    "Lexin017810": ["Missförhållandet åtgärdades.", "أُصلحت الظروف السيئة."],
    "Lexin017813": ["Missgreppet gjordes.", "أُجري الإجراء الخاطئ."],
    "Lexin017816": ["Missgärningen begicks.", "ارتُكب العمل الإجرامي."],
    "Lexin017817": ["Misshandeln anmäldes.", "أُبلغ عن الإيذاء."],
    "Lexin017820": ["Missionen slutfördes.", "اكتملت المهمة."],
    "Lexin017821": ["Missionen pågick.", "استمر التبشير."],
    "Lexin017839": ["Misstanken fanns.", "وُجد الاشتباه."],
    "Lexin017843": ["Misstroende rådde.", "ساد عدم الثقة."],
    "Lexin017844": ["Misstroendeförklaringen antogs.", "أُقر بيان حجب الثقة."],
    "Lexin017855": ["Missuppfattningen klarades.", "أُصلح التفسير الخاطئ."],
    "Lexin017857": ["Missväxt drabbade.", "أصاب الحصاد السيء."],
    "Lexin017861": ["Misären rådde.", "ساد العوز."],
    "Lexin017862": ["Mitellan sattes.", "وُضعت العلاقة."],
    "Lexin017867": ["Mittenpartierna samarbetade.", "تعاونت أحزاب الوسط."],
    "Lexin017869": ["Mixen blandades.", "خُلط الخليط."],
    "Lexin017870": ["Mixern användes.", "استُخدم الخلاط."],
    "Lexin017871": ["I mjugg gömdes det.", "أُخفي بخفاء."],
    "Lexin017879": ["Mjukvaran installerades.", "ثُبت برنامج الحاسوب."],
    "Lexin017883": ["Mjälten undersöktes.", "فُحص الطحال."],
    "Lexin017890": ["Mjölktanden föll.", "سقط السن اللبني."],
    "Lexin017898": ["Mobben samlades.", "تجمع الرعاع."],
    "Lexin017904": ["Mocka dracks.", "شُربت المخاوية."],
    "Lexin017905": ["Mocka användes.", "استُخدمت الشمواه."],
    "Lexin017909": ["Moddet smälte.", "ذاب الرداغ."],
    "Lexin017910": ["Modet ändrades.", "تغير الزي."],
    "Lexin017911": ["Modelejonet köpte.", "اشترى المهتم بالأزياء."],
    "Lexin017915": ["Modemet kopplades.", "وُصل المودم."]
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

const backupPath = DATA_FILE + '.backup_nouns44_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 4400 nouns!`);
