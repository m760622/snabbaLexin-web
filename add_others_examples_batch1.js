/**
 * Add examples to OTHERS (Samhälle) terms - Batch 1 (100 terms: A-skatt to Avtalsenlig lön)
 * Carefully matching IDs from others_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin000130": ["Företaget betalar A-skatt för de anställda.", "تدفع الشركة ضريبة الدخل (A-skatt) عن الموظفين."],
    "Lexin000170": ["Rätten till liv är en av de absoluta fri- och rättigheterna.", "الحق في الحياة هو أحد الحقوق والحريات المطلقة."],
    "Lexin000275": ["Familjen ansökte om adoptionsbidrag.", "تقدمت الأسرة بطلب للحصول على منحة التبني."],
    "Lexin000381": ["Han investerade sina sparpengar i aktier.", "استثمر مدخراته في الأسهم."],
    "Lexin000471": ["Han fick hjälp med sina alkoholproblem.", "تلقى مساعدة لمشاكله مع الكحول."],
    "Lexin000474": ["Bilen är utrustad med alkolås.", "السيارة مجهزة بقفل الكحول (جهاز فحص السكر)."],
    "Lexin000536": ["Man kan bli beordrad allmän mertid vid behov.", "يمكن أمر الموظف بالعمل الإضافي العام عند الضرورة."],
    "Lexin000538": ["Alla som arbetar omfattas av allmän pensionsförsäkring.", "جميع العاملين مشمولون بتأمين المعاشات العامة."],
    "Lexin000550": ["Hon fick en allmän visstidsanställning på sex månader.", "حصلت على توظيف مؤقت عام لمدة ستة أشهر."],
    "Lexin000552": ["Vi har tak för hur mycket allmän övertid man får arbeta.", "لدينا سقف لمقدار العمل الإضافي العام المسموح به."],
    "Lexin000570": ["Göra allmänna avdrag i deklarationen.", "إجراء استقطاعات عامة في الإقرار الضريبي."],
    "Lexin000576": ["Det är miljövänligt att åka med allmänna kommunikationer.", "من الصديق للبيئة السفر بالمواصلات العامة."],
    "Lexin000580": ["Arbetsgivaren betalar den allmänna pensionsavgiften.", "يدفع صاحب العمل رسوم المعاشات التقاعدية العامة."],
    "Lexin000581": ["Det finns olika allmänna pensionsplaner att välja mellan.", "توجد خطط معاشات تقاعدية عامة مختلفة للاختيار من بينها."],
    "Lexin000590": ["Kommunen satsar på allmännyttan.", "تستثمر البلدية في النفع العام (الإسكان العام)."],
    "Lexin000595": ["Allmänt högriskskydd kan ge ersättning för karensdagar.", "الحماية العامة للمخاطر العالية يمكن أن تعوض أيام الانتظار (بدون أجر)."],
    "Lexin000659": ["Han fick uppehållstillstånd genom alternativ skyddsstatusförklaring.", "حصل على تصريح إقامة من خلال إعلان وضع الحماية البديلة."],
    "Lexin000919": ["Närmaste anhöriga underrättades om olyckan.", "تم إبلاغ أقرب الأقارب بالحادث."],
    "Lexin001023": ["Föreningen fick anordnarbidrag för konferensen.", "حصلت الجمعية على منحة تنظيم للمؤتمر."],
    "Lexin001034": ["Söka anpassningsbidrag för att bygga om huset.", "طلب منحة تكييف (تعديل) لإعادة بناء المنزل."],
    "Lexin001108": ["Företaget har 50 anställda.", "لدى الشركة 50 موظفاً."],
    "Lexin001114": ["Läs noga igenom ditt anställningskontrakt.", "اقرأ عقد عملك بعناية."],
    "Lexin001117": ["Lagen om anställningsskydd (LAS) ger anställningstrygghet.", "قانون حماية التوظيف يوفر الأمان الوظيفي."],
    "Lexin001294": ["Arbetarrörelsen har en lång historia i Sverige.", "الحركة العمالية لها تاريخ طويل في السويد."],
    "Lexin001308": ["Vi måste göra en noggrann arbetsberedning innan start.", "يجب أن نقوم بإعداد عمل دقيق قبل البدء."],
    "Lexin001309": ["Tjänsten har en tydlig arbetsbeskrivning.", "الوظيفة لها وصف وظيفي واضح."],
    "Lexin001311": ["Ställ upp materialet på en arbetsbock.", "ضع المواد على حامل العمل (Sable)."],
    "Lexin001312": ["Snickaren använde en arbetsbock av trä.", "استخدم النجار حامل عمل خشبي."],
    "Lexin001313": ["Mitt arbetsbord är fullt av papper.", "مكتب عملي مليء بالأوراق."],
    "Lexin001316": ["Han klagade på för hög arbetsbörda.", "اشتكى من عبء العمل الزائد."],
    "Lexin001317": ["En vanlig arbetsdag är åtta timmar.", "يوم العمل العادي هو ثماني ساعات."],
    "Lexin001319": ["Den första arbetsetappen är klar.", "المرحلة الأولى من العمل جاهزة."],
    "Lexin001320": ["Parkera arbetsfordonen på gården.", "أوقف مركبات العمل في الفناء."],
    "Lexin001321": ["Kollektivavtalet garanterar arbetsfred.", "اتفاقية العمل الجماعية تضمن السلام العمالي."],
    "Lexin001323": ["Vi måste se över vår arbetsfördelning.", "يجب أن نراجع توزيع العمل لدينا."],
    "Lexin001324": ["Arbetsförhållandena på fabriken har förbättrats.", "ظروف العمل في المصنع تحسنت."],
    "Lexin001326": ["Skriv in dig på Arbetsförmedlingen.", "سجل نفسك في مكتب العمل."],
    "Lexin001327": ["Bedöma patientens arbetsförmåga.", "تقييم قدرة المريض على العمل."],
    "Lexin001329": ["Arbetsgivaravgifter betalas ovanpå lönen.", "تُدفع رسوم صاحب العمل فوق الراتب."],
    "Lexin001334": ["Företaget är med i en arbetsgivarorganisation.", "الشركة عضو في منظمة أصحاب العمل."],
    "Lexin001337": ["Få bidrag till arbetshjälpmedel.", "الحصول على منحة للأدوات المساعدة في العمل."],
    "Lexin001339": ["Trivas med sina arbetskamrater.", "الانسجام مع زملاء العمل."],
    "Lexin001341": ["Träffa en arbetskonsulent för karriärråd.", "مقابلة مستشار توظيف للحصول على نصائح مهنية."],
    "Lexin001342": ["Sänka arbetskostnaden per enhet.", "خفض تكلفة العمل لكل وحدة."],
    "Lexin001345": ["Höga arbetskrav kan leda till stress.", "متطلبات العمل العالية يمكن أن تؤدي إلى التوتر."],
    "Lexin001346": ["Prata med din arbetsledare.", "تحدث مع مشرفك في العمل."],
    "Lexin001347": ["Arbetsledningen beslutade om övertid.", "قررت إدارة العمل العمل الإضافي."],
    "Lexin001349": ["Få arbetslivsinriktad rehabilitering efter sjukskrivningen.", "الحصول على إعادة تأهيل موجهة للحياة العملية بعد الإجازة المرضية."],
    "Lexin001356": ["Beslutet kom från Arbetsmarknadsdepartementet.", "جاء القرار من وزارة العمل."],
    "Lexin001358": ["Delta i ett arbetsmarknadspolitiskt program.", "المشاركة في برنامج لسياسة سوق العمل."],
    "Lexin001363": ["En god arbetsmiljö är viktig för hälsan.", "بيئة العمل الجيدة مهمة للصحة."],
    "Lexin001365": ["Diskutera arbetsmiljöfrågor på mötet.", "مناقشة قضايا بيئة العمل في الاجتماع."],
    "Lexin001366": ["Följa reglerna i arbetsmiljöhandboken.", "اتباع القواعد في دليل بيئة العمل."],
    "Lexin001367": ["Arbetsmiljökommittéer finns på stora arbetsplatser.", "توجد لجان بيئة العمل في أماكن العمل الكبيرة."],
    "Lexin001369": ["Välja ett nytt arbetsmiljöombud.", "انتخاب ممثل جديد لبيئة العمل."],
    "Lexin001370": ["Företaget har en strikt arbetsmiljöpolicy.", "لدى الشركة سياسة صارمة لبيئة العمل."],
    "Lexin001373": ["Detta arbetsmoment är riskfyllt.", "مرحلة العمل هذه محفوفة بالمخاطر."],
    "Lexin001378": ["Anmäla en arbetsolycka till Försäkringskassan.", "الإبلاغ عن حادث عمل إلى صندوق التأمينات الاجتماعية."],
    "Lexin001379": ["Avgränsa arbetsområdet med staket.", "تحديد منطقة العمل بسياج."],
    "Lexin001380": ["Ta fram en arbetsområdesplan (APD-plan).", "إعداد خطة منطقة العمل."],
    "Lexin001381": ["Ta regelbundna arbetspauser.", "أخذ استراحات عمل منتظمة."],
    "Lexin001383": ["Facket gjorde ett arbetsplatsbesök.", "قامت النقابة بزيارة لمكان العمل."],
    "Lexin001385": ["Sitta på arbetsplatskontoret och räkna.", "الجلوس في مكتب الموقع والحساب."],
    "Lexin001386": ["Ingen skadades vid arbetsplatsolyckan.", "لم يصب أحد في حادث مكان العمل."],
    "Lexin001389": ["Belönas för god arbetsprestation.", "المكافأة على الأداء الجيد في العمل."],
    "Lexin001390": ["Öka arbetsproduktiviteten med nya maskiner.", "زيادة إنتاجية العمل بآلات جديدة."],
    "Lexin001392": ["Minska den fysiska arbetspåfrestningen.", "تقليل الإجهاد البدني في العمل."],
    "Lexin001393": ["Hon är expert på arbetsrätt.", "هي خبيرة في قانون العمل."],
    "Lexin001398": ["Få arbetsskadesjukpenning vid godkänd skada.", "الحصول على نقدية إصابة العمل عند اعتماد الإصابة."],
    "Lexin001399": ["Förebygga arbetsskador.", "الوقاية من إصابات العمل."],
    "Lexin001402": ["Variera din arbetsställning ofta.", "غير وضعية عملك كثيراً."],
    "Lexin001403": ["Vi måste ändra vårt arbetssätt.", "يجب أن نغير طريقة عملنا."],
    "Lexin001410": ["Vi har flexibla arbetstider.", "لدينا ساعات عمل مرنة."],
    "Lexin001414": ["Känna arbetstillfredsställelse.", "الشعور بالرضا الوظيفي."],
    "Lexin001417": ["Spränga en arbetstunnel.", "تفجير نفق عمل."],
    "Lexin001418": ["Lösa arbetstvister i domstol.", "حل نزاعات العمل في المحكمة."],
    "Lexin001419": ["Mina arbetsuppgifter är varierande.", "مهام عملي متنوعة."],
    "Lexin001421": ["Kräva bättre arbetsvillkor.", "المطالبة بظروف عمل أفضل."],
    "Lexin001422": ["Uppfylla arbetsvillkoret för a-kassan.", "استيفاء شرط العمل لصندوق البطالة."],
    "Lexin001426": ["Bli uppsagd p.g.a. arbetsvägran.", "الفصل بسبب رفض العمل."],
    "Lexin001427": ["Rengöra arbetsytan efter jobbet.", "تنظيف سطح العمل بعد العمل."],
    "Lexin001601": ["Vila i en askgravplats.", "الرقود في مدفن للرماد."],
    "Lexin001619": ["Jobba som personlig assistent.", "العمل كمساعد شخصي."],
    "Lexin001646": ["Många asylsökande väntar på besked.", "العديد من طالبي اللجوء ينتظرون الرد."],
    "Lexin001699": ["Barnet utreds för ADHD.", "يتم فحص الطفل للتأكد من إصابته باضطراب فرط الحركة ونقص الانتباه."],
    "Lexin001718": ["Ansöka om auktorisation som tolk.", "التقدم بطلب للحصول على ترخيص كمتلجم."],
    "Lexin001730": ["Få diagnosen autismspektrumtillstånd (AST).", "الحصول على تشخيص طيف التوحد."],
    "Lexin001738": ["Bilen har automatväxel.", "السيارة بها ناقل حركة أوتوماتيكي."],
    "Lexin001847": ["Sänka avgifterna för barnomsorg.", "خفض رسوم رعاية الأطفال."],
    "Lexin001851": ["Premiepensionen är en avgiftsbestämd pension.", "معاش القسط هو معاش محدد بالمساهمات."],
    "Lexin001866": ["Anställda har avgångsskyldighet vid 69 år.", "الموظفون ملزمون بالتقاعد عند سن 69."],
    "Lexin001867": ["Få ett generöst avgångsvederlag.", "الحصول على مكافأة نهاية خدمة سخية."],
    "Lexin001958": ["Få avlösarservice i hemmet.", "الحصول على خدمة البديل (للراحة) في المنزل."],
    "Lexin001971": ["Anmäla avregistrering av fordonet.", "الإبلاغ عن إلغاء تسجيل المركبة."],
    "Lexin001995": ["Han blev avskedad på grund av stöld.", "تم فصله بسبب السرقة (Avskedad - طرد تأديبي)."],
    "Lexin001996": ["Bestrida ett felaktigt avskedande.", "الاعتراض على فصل خاطئ."],
    "Lexin001997": ["Antalet avskedanden har ökat.", "عدد حالات الفصل التأديبي قد ازداد."],
    "Lexin002022": ["Överklaga ett avslagsbeslut.", "الاستئناف ضد قرار الرفض."],
    "Lexin002059": ["Avstängning från a-kassan i 45 dagar.", "إيقاف (حرمان) من صندوق البطالة لمدة 45 يوماً."],
    "Lexin002083": ["Kräva lägst avtalsenlig lön.", "المطالبة بالحد الأدنى للراتب وفق الاتفاقية."]
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

const backupPath = DATA_FILE + '.backup_others1_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Others Batch 1 completed!`);
