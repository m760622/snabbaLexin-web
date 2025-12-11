/**
 * Add examples to nouns - Batch 50 (100 nouns: Panorama to Perenn) ⭐ 5000 MILESTONE!⭐
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin020157": ["Panorama syntes.", "ظهرت البانوراما."],
    "Lexin020159": ["Pansaret skyddade.", "حمى الدرع."],
    "Lexin020165": ["Pantern jagade.", "طارد الفهد."],
    "Lexin020166": ["Pantomimen framfördes.", "قُدمت الإيمائية."],
    "Lexin020172": ["Papegojan talade.", "تحدث الببغاء."],
    "Lexin020173": ["Papier-maché användes.", "استُخدم الورق المعجن."],
    "Lexin020174": ["Papiljotten sattes.", "وُضعت العقصة."],
    "Lexin020175": ["Papp är tjockt.", "الكرتون سميك."],
    "Lexin020181": ["Pappersbruket producerade.", "أنتج مصنع الورق."],
    "Lexin020182": ["Pappersexercisen fortsatte.", "استمرت المراسلة البيروقراطية."],
    "Lexin020183": ["Papperskorgen tömdes.", "أُفرغت سلة المهملات."],
    "Lexin020186": ["Pappersmassan blandades.", "خُلطت عجينة الورق."],
    "Lexin020187": ["Papperstigern visade sig.", "ظهر النمر من ورق."],
    "Lexin020188": ["Pappskallen missade.", "أخطأ الأخرق."],
    "Lexin020192": ["Parabeln berättades.", "رُويت المثل الرمزي."],
    "Lexin020193": ["Parabolantennen installerades.", "رُكب الأنتين الطبقي."],
    "Lexin020194": ["Paraden gick.", "سار الاستعراض."],
    "Lexin020195": ["Paraden lyckades.", "نجحت المناورة."],
    "Lexin020197": ["Paradigmet studerades.", "دُرس النموذج."],
    "Lexin020198": ["Paradigmet ändrades.", "تغير النموذج الفكري."],
    "Lexin020200": ["Paradoxen förklarades.", "فُسرت العبارة المناقضة للعقل."],
    "Lexin020202": ["Parafrasen skrevs.", "كُتبت الصياغة الجديدة."],
    "Lexin020210": ["Paranoia behandlades.", "عولج جنون الإضطهاد."],
    "Lexin020213": ["Paraplyorganisationen styrde.", "قادت المنظمة الجامعة."],
    "Lexin020216": ["Parasiten levde.", "عاش الطفيلي."],
    "Lexin020217": ["Parasollen användes.", "استُخدمت الشمسية."],
    "Lexin020218": ["Paratyfus behandlades.", "عولج الباراتيفوئيد."],
    "Lexin020220": ["Parentesen lades till.", "أُضيفت الجملة المعترضة."],
    "Lexin020222": ["Parfymen doftade gott.", "عطر العطر جيداً."],
    "Lexin020224": ["Parhästarna samarbetade.", "تعاون الشخصان المتلازمان."],
    "Lexin020225": ["Pariserhjulet snurrade.", "دار العجلة الباريسية."],
    "Lexin020227": ["Parken utökades.", "توسع الأسطول."],
    "Lexin020228": ["Parkasen bars.", "ارتُديت السترة الفرائية المقلنسة."],
    "Lexin020234": ["Parketten lades.", "وُضع الباركيه."],
    "Lexin020237": ["Parlamentet röstade.", "صوت البرلمان."],
    "Lexin020238": ["Parlamentarism praktiserades.", "مورس النظام البرلماني."],
    "Lexin020240": ["Parlören användes.", "استُخدم الدليل اللغوي."],
    "Lexin020246": ["En part föll bort.", "سقط طرف."],
    "Lexin020248": ["Partajet hölls.", "أُقيمت المؤانسة."],
    "Lexin020254": ["Partiapparaten styrde.", "قادت مجموعة قيادة الحزب."],
    "Lexin020258": ["Partifärgen syntes.", "ظهر الانتماء الحزبي."],
    "Lexin020259": ["Partihandeln ökade.", "زادت تجارة الجملة."],
    "Lexin020260": ["Partikeln studerades.", "دُرست الذرة."],
    "Lexin020261": ["Partikeln identifierades.", "حُددت الأداة."],
    "Lexin020270": ["Partsinlagan lämnades.", "سُلمت رسالة من أحد الأطراف."],
    "Lexin020277": ["Passet korsades.", "عُبر المضيق."],
    "Lexin020278": ["Passet arbetades.", "عُملت الوردية."],
    "Lexin020279": ["Pass sades.", "قيل التخلي عن الدور."],
    "Lexin020281": ["Passagen gicks.", "مُر بالممر."],
    "Lexin020289": ["Passaren användes.", "استُخدم الفرجار."],
    "Lexin020294": ["Passersedeln visades.", "أُظهر تصريح المرور."],
    "Lexin020295": ["Passformen var bra.", "كانت أناقة الزي جيدة."],
    "Lexin020305": ["Passus citerades.", "استُشهد بالقطعة من النص."],
    "Lexin020307": ["Pasta smörjdes.", "دُهن المرهم."],
    "Lexin020308": ["Pastejen bakades.", "خُبز الباتيه."],
    "Lexin020309": ["Pastellen målades.", "رُسم البستل."],
    "Lexin020311": ["Pastillen sugs.", "مُصت قطعة الكرميل."],
    "Lexin020314": ["Pastorsexpeditionen besöktes.", "زُير مكتب الأبرشية."],
    "Lexin020315": ["Patent beviljades.", "مُنحت براءة الاختراع."],
    "Lexin020321": ["Patentlåset låstes.", "قُفل قفل الأمان."],
    "Lexin020326": ["Patientavgiften betalades.", "دُفع رسم المريض."],
    "Lexin020328": ["Patientförsäkringen gällde.", "سرى تأمين المرضى."],
    "Lexin020334": ["Patrasket samlades.", "تجمع الخسيس."],
    "Lexin020335": ["Patriarken talade.", "تحدث عظيم القوم."],
    "Lexin020336": ["Patriarken ledde.", "قاد البطريرك."],
    "Lexin020338": ["Patrioten kämpade.", "قاتل الوطني."],
    "Lexin020339": ["Patronen avfyrades.", "أُطلقت الخرطوشة."],
    "Lexin020340": ["Patronen ägde.", "ملك السيد المعتق."],
    "Lexin020341": ["Patrullen patrullerade.", "دارت الدورية."],
    "Lexin020345": ["Pattarna syntes.", "ظهر الثدي."],
    "Lexin020347": ["Paviljongen byggdes.", "بُنيت المقصورة."],
    "Lexin020356": ["Pedagogik studerades.", "دُرس علم أصول التربية والتعليم."],
    "Lexin020362": ["Pedalen trampades.", "دُعست الدواسة."],
    "Lexin020367": ["Pekfingret höjdes.", "رُفعت السبابة."],
    "Lexin020368": ["Pekpinnen användes.", "استُخدمت العصا للإشارة."],
    "Lexin020369": ["Pelaren restes.", "رُفع العمود."],
    "Lexin020372": ["Pelargonian blommade.", "أزهر الغرنوقي."],
    "Lexin020374": ["Pendeln svängde.", "تأرجح البندول."],
    "Lexin020375": ["Pendeltåget åkte.", "سار قطار الضواحي."],
    "Lexin020377": ["Pendylen tickade.", "دقت ساعة الحائط."],
    "Lexin020379": ["Pengen sparades.", "حُفظت النقود."],
    "Lexin020383": ["Penicillin gavs.", "أُعطي البنسلين."],
    "Lexin020385": ["Penis undersöktes.", "فُحص القضيب."],
    "Lexin020388": ["Pennalism förbjöds.", "حُرم الاضطهاد."],
    "Lexin020389": ["Penningen betalades.", "دُفع النقد."],
    "Lexin020395": ["Pennkniven öppnades.", "فُتحت المطواة."],
    "Lexin020396": ["Pennvässaren användes.", "استُخدمت مبراة القلم."],
    "Lexin020397": ["Penseln doppades.", "غُمست الفرشاة."],
    "Lexin020400": ["Pensionatet bokades.", "حُجز النزل."],
    "Lexin020407": ["Pensionsbrevet skickades.", "أُرسلت وثيقة التقاعد."],
    "Lexin020422": ["Pensionstillskott gavs.", "أُعطيت علاوة التقاعد."],
    "Lexin020426": ["Pensionsåldern uppnåddes.", "بُلغ سن التقاعد."],
    "Lexin020428": ["Pensionärsbiljetten köptes.", "اشتُريت البطاقة المخفضة للمتقاعدين."],
    "Lexin020429": ["Pensionärsbostaden beboddes.", "سُكن مسكن المتقاعدين."],
    "Lexin020430": ["Pensionärshemmet besöktes.", "زُير منزل المتقاعدين."],
    "Lexin020434": ["Pentryt användes.", "استُخدم المطبخ الصغير."],
    "Lexin020438": ["Pepparkakan bakades.", "خُبزت كعكة الزنجبيل."],
    "Lexin020439": ["Pepparroten rivs.", "بُشر الفجل الحار."],
    "Lexin020443": ["Perception studerades.", "دُرس الإدراك الحسي."],
    "Lexin020445": ["Perennen blommar.", "تزهر النبتة المعمرة."]
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

const backupPath = DATA_FILE + '.backup_nouns50_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`\n🎉🎉🎉 MILESTONE ACHIEVED! 🎉🎉🎉`);
console.log(`✅ Total: 5000 nouns now have Swedish & Arabic examples!`);
console.log(`🇸🇪 5000 svenska exempelmeningar`);
console.log(`🇸🇦 5000 arabiska översättningar\n`);
