/**
 * Add Arabic definitions for JuridikR terms - Final Batch
 */

const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB_DEF = 5;

// Arabic definitions for JuridikR terms - Final Batch
const arabicDefinitions = {
    "Recidivfara": "خطر العود (للجريمة)",
    "Reella bevismedel": "أدلة مادية (ملموسة)",
    "Reella tvångsmedel": "تدابير قسرية مادية (تفتيش/حجز)",
    "Regler och föreskrifter": "قواعد ولوائح",
    "Rekonstruktion": "إعادة تمثيل الجريمة (أو هيكلة الشركة)",
    "Rekvisit": "أركان (المادة القانونية/شروط الجرم)",
    "Reseförbud": "منع سفر",
    "Riskerar fängelsestraff": "مهدد بعقوبة السجن",
    "Rotel": "قسم في المحكمة أو النيابة (دائرة)",
    "RPU Lag om rättspsykiatrisk undersökning": "قانون الفحص النفسي الجنائي (RPU)",
    "Rån": "سلب (سرقة بالإكراه)",
    "Rätten kan förorda om läkarintyg": "المحكمة قد تأمر بشهادة طبية",
    "Rättspsykiatrisk tvångsvård i sluten form": "رعاية نفسية جنائية مغلقة (قسرية)",
    "Rättspsykiatrisk tvångsvård i öppen form": "رعاية نفسية جنائية مفتوحة",
    "Rättsvillfarelse ( Error juris )": "جهل بالقانون (غلط في القانون)",
    "Rörlighet": "حركة (تنقل)",
    "Sakframställning": "عرض الوقائع (بيان الدعوى)",
    "Sakkonfiskation": "مصادرة الشيء (العيني)",
    "Samhällsomstörtare": "مخرب (مهدد للنظام الاجتماعي)",
    "Samhällstjänst ( utföra Samhällstjänst )": "خدمة المجتمع (تنفيذ عقوبة الخدمة العامة)",
    "SIS Schengens Information System": "نظام معلومات شنغن (SIS)",
    "SIS Statens institutionsstyrelse": "مصلحة المؤسسات الحكومية (SIS)",
    "SiS Statens Institutionsstyrelse ( Ungdomshem drivs av SiS )": "مصلحة المؤسسات الحكومية (تدير دور الأحداث)",
    "Sista instans": "المحكمة العليا (آخر درجات التقاضي)",
    "Sjukavdrag": "خصم مرضي (من الراتب)",
    "Sjukbidrag": "إعانة مرضية (بدل عجز مؤقت سابقاً)",
    "Sjukförsäkringsavgift, sjukförsäkringsavgiften": "رسوم التأمين الصحي",
    "Sjukinkomstförsäkring": "تأمين دخل المرض",
    "Sjukkassa": "صندوق التأمين الصحي (سابقاً)",
    "Sjukledighet": "إجازة مرضية",
    "Sjuklig": "مرضي (سقيم)",
    "Sjuklönegaranti": "ضمان أجر المرض",
    "Sjukvårdsförmån": "مزايا الرعاية الصحية",
    "Sjukvårdsregion": "منطقة الرعاية الصحية",
    "Själssjukdom": "مرض عقلي (نفسي)",
    "Självtäkt": "اقتضاء الحق بالذات",
    "Skadeståndsskyldighet": "الالتزام بالتعويض",
    "Skallfraktur": "كسر في الجمجمة",
    "Skens skull": "صورياً (لغرض المظهر)",
    "Skensavtal": "عقد صوري",
    "Skriftlig bevisning": "أدلة كتابية",
    "Skyddstillsyn": "المراقبة (عقوبة)",
    "Skäligen misstänkt": "مشتبه به لسبب معقول",
    "Slagit omkull honom": "طرحه أرضاً",
    "Sluten Ungdomsvård ( på ungdomshem )": "رعاية الشباب المغلقة (سجن الأحداث)",
    "Slutföra förundersökningen": "إنهاء التحقيق الأولي",
    "Smädelse": "شتيمة (قذف)",
    "Sniffas genom näsan ( snorta )": "يستنشق بالأنف (يشم المخدرات)",
    "Snorta kokain ( dra in kokain genom näsan )": "يشم الكوكايين (تعاطي بالأنف)",
    "Snortat kokain": "شم الكوكايين",
    "Spana på": "يراقب (يتجسس على)",
    "Speciellt tillstånd": "تصريح خاص",
    "Stajl": "أسلوب (نمط - عامية)",
    "Stilett": "خنجر (مطواة)",
    "Straff": "عقوبة",
    "Straff i frihet ( dömde hamnar i frivården )": "عقوبة في الحرية (مراقبة خارجية)",
    "Straffas till Medhjälp": "يعاقب على المساعدة (في الجريمة)",
    "Straffmyndig ( 15 år och äldre )": "سن المسؤولية الجنائية (15 سنة فأكثر)",
    "Straffskalan, strafflatitud": "مقياس العقوبة (المدى العقابي)",
    "Straffvarning ( för förstagångs förbrytare )": "تحذير عقابي (للمجرمين لأول مرة)",
    "Straffvite": "غرامة عقابية (تهديدية)",
    "Straffvärde": "القيمة العقابية (جسامة الجريمة)",
    "Strafföreläggande": "أمر جزائي (غرامة يصدرها المدعي العام)",
    "Styrkt eller ställt utom rimliga tvivel": "مؤكد أو مثبت بما لا يدع مجالاً للشك",
    "Stålar": "فلوس (نقود - عامية)",
    "Stämma någon": "يقاضي شخصاً",
    "Stämningsansökan": "لائحة الدعوى",
    "Stämningsman": "محضر المحكمة (المبلغ)",
    "Subjektiva rekvisit": "الركن المعنوي (القصد الجنائي)",
    "Summarisk brottsbeivran": "إجراءات جنائية موجزة",
    "Summarisk process": "إجراءات موجزة (في تحصيل الديون)",
    "Svep ( svepande rörelse, inringande manöver, razzia )": "حملة تمشيط (مداهمة واسعة)",
    "Svindleri": "نصب واحتيال",
    "Syn ( i rättegång )": "معاينة (في المحكمة لمكان الجرم)",
    "Synnerliga skäl": "أسباب خاصة جداً (استثنائية)",
    "Synnerligen ömmande omständigheter": "ظروف إنسانية بالغة القسوة",
    "Sårskador": "جروح وإصابات",
    "Särskild beskaffenhet": "طبيعة خاصة",
    "Särskild handräckning": "مساعدة تنفيذية خاصة",
    "Särskilda bestämmelser": "أحكام خاصة",
    "Tilltalad": "متهم (في المحكمة)",
    "Tog i beslag": "صادر (ضبط)",
    "Trovärdig": "موثوق (صادق)",
    "Tumult": "شجار (هيجان)",
    "Tunnelbanan hade slutat gå": "توقف المترو عن العمل",
    "Två typer av § 7 - intyg": "نوعان من شهادة الفقرة 7 (فحص نفسي صغير)",
    "Tvångsvård i": "رعاية قسرية في",
    "Undandrar sig lagföring eller straff": "يتهرب من الملاحقة أو العقوبة",
    "Undandräkt": "اختلاس (خيانة أمانة بسيطة)",
    "Underhåll för ungarna": "نفقة الأولاد",
    "Underlåtenhet": "امتناع (إغفال)",
    "Ungdomshem ( med öppna och slutna avdelningar )": "دار رعاية الأحداث (بأقسام مفتوحة ومغلقة)",
    "Ungdomskontrakt": "عقد الشباب (عقوبة بديلة للأحداث)",
    "Ungdomstjänst": "خدمة الأحداث (خدمة مجتمعية للصغار)",
    "Uppercut": "لكمة صاعدة (في الملاكمة/شجار)",
    "Uppsåt ( Dolus )": "قصد جنائي (عمد)",
    "Utlämning ( till stat där han är misstänkt )": "تسليم (لدولة تطلبه)",
    "Utpressning": "ابتزاز",
    "Utslag": "حكم (قرار)",
    "Utslussning": "إعادة دمج (تدرج في الإفراج)",
    "Vapen lag": "قانون الأسلحة",
    "Vara anhållen": "يكون موقوفاً",
    "Vara häktad": "يكون محبوساً احتياطياً",
    "Vara misstänkt": "يكون مشتبهاً به",
    "Verkställighet": "تنفيذ (الحكم)",
    "Villkorlig dom": "حكم مع وقف التنفيذ (ووضعه تحت الاختبار)",
    "Villkorlig frigivning": "إفراج مشروط",
    "Vittnesbås": "قفص الشهود (المنصة)",
    "Vittneseden": "يمين الشاهد",
    "Vittnesmål": "شهادة",
    "Vittnesstöd": "دعم الشهود (مرافق للشاهد)",
    "Vållande till annans död": "تسبب في وفاة آخر (قتل خطأ)",
    "Vållande till kroppsskada eller sjukdom": "تسبب في أذى جسدي أو مرض",
    "Vård inom socialtjänsten": "رعاية الخدمات الاجتماعية",
    "Vårdinrättning": "مؤسسة رعاية",
    "Vårdnadsöverflyttning": "نقل الحضانة",
    "Väcka åtal": "يرفع الدعوى الجنائية",
    "Vägrar": "يرفض",
    "Väktare": "حارس أمن",
    "Väljs av kommunfullmäktige": "ينتخب من المجلس البلدي",
    "Yttrande": "بيان (رأي مكتوب)",
    "Åklagare": "مدعي عام",
    "Åklagarjäv": "عدم صلاحية المدعي العام (للتحيز)",
    "Återfallsförbrytare": "مجرم عائد (ذو سوابق)",
    "Återvinning": "استعادة (إعادة المحاكمة في الغيابي)",
    "Äktenskapsskillnad": "طلاق",
    "Öppet anstalt": "سجن مفتوح",
    "Övergrepp i rättssak": "اعتداء في قضية قانونية",
    "Överklaga": "يستأنف",
    "Överklagandetid": "مهلة الاستئناف",
    "Överlämnande till särskild vård": "تسليم لرعاية خاصة (عقوبة)",
    "Övervakare": "مراقب (مشرف على المحكوم)",
    "Övervakningsnämnden": "لجنة المراقبة (الإصلاحية)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'JuridikR.' && !currentDef.trim() && arabicDefinitions[word]) {
        entry[COL_ARB_DEF] = arabicDefinitions[word];
        updatedCount++;
        console.log(`✅ ${word}`);
    }
});

// Write back to data.js
const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log(`\n📊 Uppdaterade ${updatedCount} ord.`);
console.log('✅ Ändringar sparade i data.js');
