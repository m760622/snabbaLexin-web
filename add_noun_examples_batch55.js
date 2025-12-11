/**
 * Add examples to nouns - Batch 55 (100 nouns: Raka to Remissdebatt) ⭐ 5500 MILESTONE!⭐
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin021755": ["Rakan var lång.", "كان المسار المستوي طويلاً."],
    "Lexin021757": ["Rakapparaten användes.", "استُخدمت ماكينة الحلاقة."],
    "Lexin021761": ["Raketen sköts upp.", "أُطلق الصاروخ."],
    "Lexin021763": ["Rakhyveln användes.", "استُخدم موس الحلاقة."],
    "Lexin021767": ["Raksträckan kördes.", "قيدت المسافة المستوية."],
    "Lexin021768": ["Rakvatten användes.", "استُخدم عطر الحلاقة."],
    "Lexin021771": ["Rallaren arbetade.", "عمل عامل مد السكك الحديدية."],
    "Lexin021778": ["Ramavtalet undertecknades.", "وُقعت الاتفاقية العامة."],
    "Lexin021781": ["Ramlagen gällde.", "سرى القانون الإطاري."],
    "Lexin021785": ["Rampen lyste.", "أضاء إفريز الإنارة."],
    "Lexin021786": ["Rampen användes.", "استُخدم الانحدار."],
    "Lexin021787": ["Rampen aktiverades.", "فُعلت منصة الإطلاق."],
    "Lexin021789": ["Rampfeber kändes.", "شُعر بهيبة المسرح."],
    "Lexin021790": ["I rampljuset stod han.", "وقف في أضواء العلانية."],
    "Lexin021792": ["Ramsan lärdes.", "تُعلمت التقفية."],
    "Lexin021799": ["Rangerbangården användes.", "استُخدمت محطة التحويل."],
    "Lexin021805": ["Rankan slingrade.", "تسلقت الدالية."],
    "Lexin021806": ["Ranka skedde.", "حدث الركوب."],
    "Lexin021809": ["Rannsakan gjordes.", "أُجريت المحاسبة."],
    "Lexin021811": ["Ranson delades.", "قُسمت الحصة."],
    "Lexin021814": ["Rap hördes.", "سُمع التجشؤ."],
    "Lexin021817": ["Rapp gavs.", "أُعطيت الجلدة."],
    "Lexin021818": ["Rappakalja talades.", "تُحدث باللغط."],
    "Lexin021822": ["Rapping framfördes.", "قُدمت طريقة الغناء."],
    "Lexin021823": ["Rappningen sattes.", "وُضع الملاط."],
    "Lexin021829": ["Raps skördades.", "حُصد اللفت."],
    "Lexin021833": ["Raringen älskades.", "أُحب العزيز."],
    "Lexin021834": ["Raritet hittades.", "وُجدت الندرة."],
    "Lexin021836": ["Ras skedde.", "حدث الانهيال."],
    "Lexin021847": ["Rasfördom bekämpades.", "كوفح التحامل العرقي."],
    "Lexin021848": ["Rasism fördöms.", "يُدان التمييز العنصري."],
    "Lexin021849": ["Rasisten greps.", "اعتُقل العنصري."],
    "Lexin021852": ["Raspen användes.", "استُخدم مبرد الخشب."],
    "Lexin021853": ["Rasp hördes.", "سُمع القشط."],
    "Lexin021856": ["Rassel hördes.", "سُمعت القرقعة."],
    "Lexin021871": ["Rationen delades.", "قُسمت الحصة."],
    "Lexin021878": ["Rattfylleri är farligt.", "القيادة في حالة السكر خطيرة."],
    "Lexin021879": ["Rauken stod.", "وقف الراوك."],
    "Lexin021880": ["Ravinen besöktes.", "زُير الوهد."],
    "Lexin021886": ["Reaktionen märktes.", "لوحظ رد الفعل."],
    "Lexin021887": ["Reaktionen kritiserades.", "انتُقدت الرجعية."],
    "Lexin021889": ["Reaktionären talade.", "تحدث الرجعي."],
    "Lexin021890": ["Reaktorn fungerade.", "عمل المفاعل."],
    "Lexin021893": ["Realia lärdes.", "تُعلمت المعرفة."],
    "Lexin021894": ["Realisation hölls.", "أُقيمت التصفية."],
    "Lexin021897": ["Realisationsvinst gjordes.", "تحقق الربح من بيع الممتلكات."],
    "Lexin021902": ["Realism visades.", "أُظهرت الواقعية."],
    "Lexin021903": ["Realism studerades.", "دُرست الواقعية."],
    "Lexin021904": ["Realisten talade.", "تحدث الواقعي."],
    "Lexin021909": ["Reallönen beräknades.", "حُسب المرتب الحقيقي."],
    "Lexin021912": ["Rebellen kämpade.", "قاتل المتمرد."],
    "Lexin021913": ["Rebusen löstes.", "حُل لغز الرسوم."],
    "Lexin021914": ["Recensenten kritiserade.", "انتقد الناقد."],
    "Lexin021918": ["Receptet följdes.", "اتُبعت الوصفة."],
    "Lexin021922": ["Recession rådde.", "ساد الركود."],
    "Lexin021924": ["Recidiv skedde.", "حدث الارتداد."],
    "Lexin021935": ["Redaktören redigerade.", "حرر المحرر."],
    "Lexin021937": ["Redaren ägde.", "ملك مالك السفينة."],
    "Lexin021940": ["Redden användes.", "استُخدم المرفأ في عرض البحر."],
    "Lexin021941": ["Redet byggdes.", "بُني عش الطيور."],
    "Lexin021944": ["Rederiet transporterade.", "نقلت شركة النقل البحري."],
    "Lexin021958": ["Reduktion gjordes.", "أُجري التخفيض."],
    "Lexin021967": ["Referens gavs.", "أُعطي المرجع."],
    "Lexin021970": ["Referensräntan gällde.", "سرى سعر الفائدة المرجعي."],
    "Lexin021976": ["Reflex märktes.", "لوحظ رد الفعل."],
    "Lexin021977": ["Reflex syntes.", "ظهر العاكس."],
    "Lexin021983": ["Reformationen studerades.", "دُرس الإصلاح."],
    "Lexin021986": ["Refrängen sjöngs.", "غُنيت اللازمة."],
    "Lexin021987": ["Refugen användes.", "استُخدم المأمن."],
    "Lexin021990": ["Regalier visades.", "عُرض رمز السمو الملكي."],
    "Lexin021992": ["Regattan hölls.", "أُقيم سباق الزوارق."],
    "Lexin021993": ["Regeln följdes.", "اتُبعت القاعدة."],
    "Lexin021995": ["Regeln vreds.", "لُفت الرافدة."],
    "Lexin022006": ["Regenten regerade.", "حكم الملك."],
    "Lexin022014": ["Regeringsförklaringen lästes.", "قُرئ بيان الحكومة."],
    "Lexin022018": ["Reggae spelades.", "شُغلت الريغي."],
    "Lexin022036": ["Regissören regisserade.", "أخرج المخرج."],
    "Lexin022049": ["Registreringsbesiktning gjordes.", "أُجري فحص تسجيل العربات."],
    "Lexin022050": ["Registreringsbeviset visades.", "أُظهرت شهادة التسجيل."],
    "Lexin022052": ["Registreringsskylten sattes.", "وُضعت لوحة التسجيل."],
    "Lexin022054": ["Reglaget justerades.", "عُدلت أداة التحكم."],
    "Lexin022057": ["Reglementet följdes.", "اتُبعت مجموعة القوانين."],
    "Lexin022061": ["Reglerad invandring gällde.", "سرت الهجرة المنظمة."],
    "Lexin022070": ["Regnområdet närmade sig.", "اقتربت السحب الماطرة."],
    "Lexin022072": ["Regression skedde.", "حدث التراجع."],
    "Lexin022111": ["Rekreation behövdes.", "احتُيج إلى النقاهة."],
    "Lexin022113": ["Rekryten utbildades.", "دُرب المجند."],
    "Lexin022120": ["Rektangeln ritades.", "رُسم المستطيل."],
    "Lexin022123": ["Rektorsområdet administrerades.", "أُديرت منطقة مديرية التعليم."],
    "Lexin022127": ["Rekvisita användes.", "استُخدمت المستلزمات."],
    "Lexin022128": ["Rekvisitionen skickades.", "أُرسل الطلب."],
    "Lexin022130": ["Rekyl kändes.", "شُعر بالارتداد."],
    "Lexin022144": ["Relief syntes.", "ظهر النافر."],
    "Lexin022151": ["Reliken bevarades.", "حُفظت الرفات المقدسة."],
    "Lexin022152": ["Relikt hittades.", "وُجدت الرفات."],
    "Lexin022153": ["Relingen vidrördes.", "لُمست الحافة العليا من المركب."],
    "Lexin022154": ["Reläet fungerade.", "عملت المرحلة الكهربائية."],
    "Lexin022155": ["Remmen spändes.", "شُد الحزام."],
    "Lexin022156": ["Remi förklarades.", "أُعلن التعادل."],
    "Lexin022162": ["Remissdebatten hölls.", "أُقيمت المناقشة حول التقييم."]
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

const backupPath = DATA_FILE + '.backup_nouns55_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`\n🎉🎉🎉 MILESTONE ACHIEVED! 🎉🎉🎉`);
console.log(`✅ Total: 5500 nouns now have Swedish & Arabic examples!`);
console.log(`🇸🇪 5500 svenska exempelmeningar`);
console.log(`🇸🇦 5500 arabiska översättningar\n`);
