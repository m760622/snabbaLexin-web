/**
 * دفعة شاملة B: إضافة أمثلة لجميع الأفعال المتبقية
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

const verbExamples = {
    // المعاني الثانوية للأفعال
    "Anslår": { exSwe: "Regeringen anslår pengar till projektet.", exArb: "الحكومة تخصص أموالاً للمشروع." },
    "Bockar": { exSwe: "Han bockar för rätt svar.", exArb: "يؤشر على الإجابة الصحيحة." },
    "Driver": { exSwe: "Han driver runt i stan.", exArb: "يتجول بلا هدف في المدينة." },
    "Fryser": { exSwe: "Maskinen fryser maten.", exArb: "الآلة تجمد الطعام." },
    "Fräser": { exSwe: "Maskinen fräser metall.", exArb: "الآلة تفرز المعدن." },
    "Klackar": { exSwe: "Spelaren klackar bollen.", exArb: "اللاعب يركل الكرة بكعبه." },
    "Kladdar": { exSwe: "Barnet kladdar ned kläderna.", exArb: "الطفل يلطخ الملابس." },
    "Klickar": { exSwe: "Servitören klickar ut grädde.", exArb: "النادل يضع كتلاً من الكريمة." },
    "Spinner": { exSwe: "Katten spinner av belåtenhet.", exArb: "القطة تخرخر من الرضا." },
    "Styrker": { exSwe: "Beviset styrker hans påstående.", exArb: "الدليل يقوي ادعاءه." },
    "Träffar": { exSwe: "De träffar en överenskommelse.", exArb: "يتوصلون لاتفاق." },

    // أفعال مركبة
    "Suger ut": { exSwe: "Företaget suger ut arbetarna.", exArb: "الشركة تستغل العمال." },
    "Svindlar": { exSwe: "Bedragaren svindlar folk.", exArb: "المحتال يغش الناس." },
    "Tredskas": { exSwe: "Barnet tredskas.", exArb: "الطفل يعاند." },
    "Tricksar": { exSwe: "Spelaren tricksar med bollen.", exArb: "اللاعب يستعرض بالكرة." },
    "Tröttnar": { exSwe: "Jag tröttnar på att vänta.", exArb: "أسأم من الانتظار." },
    "Undantar": { exSwe: "Lagen undantar barn.", exArb: "القانون يستثني الأطفال." },
    "Ursäktar": { exSwe: "Jag ursäktar mig.", exArb: "أعتذر." },
    "Åker dit": { exSwe: "Tjuven åker dit.", exArb: "اللص يُقبض عليه." },
    "Avbeställer": { exSwe: "Hon avbeställer biljetten.", exArb: "تلغي التذكرة." },
    "Avsäger sig": { exSwe: "Han avsäger sig tronen.", exArb: "يتنازل عن العرش." },
    "Betygsätter": { exSwe: "Läraren betygsätter proven.", exArb: "المعلم يقيم الامتحانات." },
    "Förlöjligar": { exSwe: "Han förlöjligar sina motståndare.", exArb: "يسخر من خصومه." },
    "Försvenskar": { exSwe: "De försvenskar namnet.", exArb: "يجعلون الاسم سويدياً." },
    "Förtydligar": { exSwe: "Hon förtydligar instruktionerna.", exArb: "توضح التعليمات." },
    "Förutsätter": { exSwe: "Detta förutsätter att du har tid.", exArb: "هذا يفترض أن لديك وقت." },
    "Anbringar": { exSwe: "Han anbringar skylten.", exArb: "يثبت اللافتة." },
    "Anskaffar": { exSwe: "De anskaffar material.", exArb: "يدبرون المواد." },
    "Anstiftar": { exSwe: "Han anstiftar uppror.", exArb: "يحرض على التمرد." },
    "Anträffar": { exSwe: "Polisen anträffar bevis.", exArb: "الشرطة تجد أدلة." },
    "Bakbinder": { exSwe: "De bakbinder fången.", exArb: "يكتفون الأسير." },
    "Buklandar": { exSwe: "Planet buklandar.", exArb: "الطائرة تهبط على بطنها." },
    "Bönfaller": { exSwe: "Hon bönfaller om nåd.", exArb: "تتوسل للرحمة." },
    "Dryper av": { exSwe: "Vattnet dryper av taket.", exArb: "الماء يقطر من السقف." },
    "Efterapar": { exSwe: "Barnet efterapar föräldrarna.", exArb: "الطفل يقلد الوالدين." },
    "Fernissar": { exSwe: "Han fernissar möbeln.", exArb: "يورنش الأثاث." },
    "Hoppar av": { exSwe: "Hon hoppar av universitetet.", exArb: "تترك الجامعة." },
    "Hushållar": { exSwe: "Hon hushållar med pengarna.", exArb: "تدبر الأموال." },
    "Håller av": { exSwe: "Jag håller av dig.", exArb: "أحبك." },
    "Insjuknar": { exSwe: "Han insjuknar i influensa.", exArb: "يصاب بالأنفلونزا." },
    "Inskjuter": { exSwe: "Han inskjuter en kommentar.", exArb: "يقاطع بتعليق." },
    "Invandrar": { exSwe: "Familjen invandrar till Sverige.", exArb: "العائلة تهاجر إلى السويد." },
    "Jämnar ut": { exSwe: "De jämnar ut golvet.", exArb: "يسوون الأرضية." },
    "Kalhugger": { exSwe: "De kalhugger skogen.", exArb: "يقطعون الغابة بالكامل." },
    "Kapsejsar": { exSwe: "Båten kapsejsar.", exArb: "القارب ينقلب." },
    "Kidnappar": { exSwe: "De kidnappar barnet.", exArb: "يختطفون الطفل." },
    "Kommer på": { exSwe: "Jag kommer på en idé.", exArb: "أتذكر فكرة." },
    "Lagfäster": { exSwe: "Riksdagen lagfäster beslutet.", exArb: "البرلمان يثبت القرار قانونياً." },
    "Landstiga": { exSwe: "Trupperna landstiger.", exArb: "الجنود ينزلون إلى اليابسة." },
    "Latar sig": { exSwe: "Han latar sig hela dagen.", exArb: "يتكاسل طوال اليوم." },
    "Listar ut": { exSwe: "Hon listar ut lösningen.", exArb: "تكتشف الحل." },
    "Lägger av": { exSwe: "Han lägger av med rökning.", exArb: "يقلع عن التدخين." },
    "Missleder": { exSwe: "Reklamen missleder konsumenterna.", exArb: "الإعلان يضلل المستهلكين." },
    "Missunnar": { exSwe: "Han missunnar henne framgången.", exArb: "يحسدها على نجاحها." },
    "Möjliggör": { exSwe: "Tekniken möjliggör resor.", exArb: "التقنية تتيح السفر." },
    "Nödlandar": { exSwe: "Planet nödlandar.", exArb: "الطائرة تهبط اضطرارياً." },
    "Parar sig": { exSwe: "Djuren parar sig på våren.", exArb: "الحيوانات تتزاوج في الربيع." },
    "Processar": { exSwe: "Han processar företaget.", exArb: "يقاضي الشركة." },
    "Raskar på": { exSwe: "Raska på!", exArb: "أسرع!" },
    "Ringaktar": { exSwe: "Hon ringaktar hans arbete.", exArb: "تحقر عمله." },
    "Ringer på": { exSwe: "Han ringer på dörren.", exArb: "يرن جرس الباب." },
    "Rycker in": { exSwe: "Han rycker in i armén.", exArb: "يلتحق بالجيش." },
    "Råpluggar": { exSwe: "Hon råpluggar inför provet.", exArb: "تذاكر بجد للامتحان." },
    "Sammanbor": { exSwe: "De sammanbor sedan två år.", exArb: "يعيشون معاً منذ سنتين." },
    "Sammanför": { exSwe: "Festen sammanför familjen.", exArb: "الحفلة تجمع العائلة." },
    "Samtycker": { exSwe: "Han samtycker till planen.", exArb: "يوافق على الخطة." },
    "Sjösätter": { exSwe: "De sjösätter fartyget.", exArb: "ينزلون السفينة للماء." },
    "Skönmålar": { exSwe: "Han skönmålar situationen.", exArb: "يجمل الوضع." },
    "Slår fast": { exSwe: "Domstolen slår fast domen.", exArb: "المحكمة تقرر الحكم." },
    "Slår till": { exSwe: "Han slår till mot tjuven.", exArb: "يضرب اللص." },
    "Spelar av": { exSwe: "Hon spelar av musiken.", exArb: "تشغل الموسيقى." },
    "Stiger av": { exSwe: "Han stiger av bussen.", exArb: "ينزل من الحافلة." },
    "Står till": { exSwe: "Hur står det till?", exArb: "كيف حالك؟" },
    "Står över": { exSwe: "Han står över den här rundan.", exArb: "يفوت هذه الجولة." },
    "Stöter på": { exSwe: "Han stöter på problem.", exArb: "يصادف مشاكل." },
    "Sätter in": { exSwe: "Hon sätter in pengar på banken.", exArb: "تودع المال في البنك." },
    "Sätter på": { exSwe: "Hon sätter på TV:n.", exArb: "تشغل التلفزيون." },
    "Sätter ut": { exSwe: "Läkaren sätter ut medicinen.", exArb: "الطبيب يوقف الدواء." },
    "Tar efter": { exSwe: "Barnet tar efter föräldrarna.", exArb: "الطفل يقلد الوالدين." },
    "Tillägger": { exSwe: "Hon tillägger en kommentar.", exArb: "تضيف تعليقاً." },
    "Tittar in": { exSwe: "Jag tittar in på dig imorgon.", exArb: "سأزورك غداً." },
    "Tröstäter": { exSwe: "Hon tröstäter glass.", exArb: "تأكل الآيسكريم للتسلية." },
    "Tuppar av": { exSwe: "Han tuppar av framför TV:n.", exArb: "يغفو أمام التلفزيون." },
    "Varseblir": { exSwe: "Jag varseblir en förändring.", exArb: "ألاحظ تغييراً." },
    "Vitsordar": { exSwe: "Hon vitsordar hans kompetens.", exArb: "تشهد بكفاءته." },
    "Välsignar": { exSwe: "Prästen välsignar brudparet.", exArb: "القسيس يبارك العروسين." },
    "Kasta upp": { exSwe: "Han kastar upp efter festen.", exArb: "يتقيأ بعد الحفلة." },
    "Besinnar sig": { exSwe: "Han besinnar sig i tid.", exArb: "يتمالك نفسه في الوقت المناسب." },
    "Citerar": { exSwe: "Hon citerar en dikt.", exArb: "تقتبس قصيدة." },
    "Förivrar sig": { exSwe: "Han förivrar sig ibland.", exArb: "يتحمس أحياناً بشكل مفرط." },
    "Förkyler sig": { exSwe: "Hon förkyler sig på vintern.", exArb: "تصاب بالزكام في الشتاء." },
    "Försover sig": { exSwe: "Han försover sig till jobbet.", exArb: "يستغرق في النوم ويتأخر عن العمل." },
    "Förstatligar": { exSwe: "Regeringen förstatligar industrin.", exArb: "الحكومة تؤمم الصناعة." },
    "Försäger sig": { exSwe: "Han försäger sig om hemligheten.", exArb: "يفضح السر بغير قصد." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة الشاملة B');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0, alreadyHasExample = 0, notFound = 0;
for (const [targetWord, example] of Object.entries(verbExamples)) {
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
            if (!entry[7] || entry[7].trim() === '') {
                found = true;
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                addedCount++;
                console.log(`✅ ${entry[2]}`);
                break;
            }
        }
    }
    if (!found) {
        let existsWithExample = false;
        for (let i = 0; i < dictionaryData.length; i++) {
            const entry = dictionaryData[i];
            if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
                if (entry[7] && entry[7].trim() !== '') { existsWithExample = true; alreadyHasExample++; break; }
            }
        }
        if (!existsWithExample) notFound++;
    }
}
fs.writeFileSync('./data.js', 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';');
console.log(`\n✅ المضافة: ${addedCount} | ⚠️ موجودة: ${alreadyHasExample} | ❌ غير موجودة: ${notFound}`);
