/**
 * Add examples to OTHERS (Samhälle) terms - Batch 7 (100 terms: Riksdagsordningen RO to Statsförvaltningen)
 * Carefully matching IDs from others_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin022432": ["Riksdagsordningen (RO) styr riksdagens arbete.", "قانون البرلمان ينظم عمل البرلمان."],
    "Lexin022434": ["Följa debatten under ett riksdagssammanträde.", "متابعة النقاش خلال جلسة برلمانية."],
    "Lexin022438": ["Vi har riksdagsval vart fjärde år.", "لدينا انتخابات برلمانية كل أربع سنوات."],
    "Lexin022441": ["Beviljas riksfärdtjänst för resan till Stockholm.", "يُمنح خدمة نقل وطنية خاصة للرحلة إلى ستوكهولم."],
    "Lexin022449": ["Bidraget beräknas efter riksnormen.", "تُحسب المنحة وفقاً للمعيار الوطني."],
    "Lexin022456": ["Sjöfartsprogrammet är ett riksrekryterande program.", "برنامج النقل البحري هو برنامج توظيف وطني (متاح للجميع بغض النظر عن السكن)."],
    "Lexin022645": ["Du kan göra ROT- och RUT-avdrag för tjänster i hemmet.", "يمكنك إجراء خصم ROT و RUT للخدمات المنزلية."],
    "Lexin022701": ["Vi har rullande inventering på lagret.", "لدينا جرد مستمر (Rullande) في المستودع."],
    "Lexin022702": ["Arbeta enligt rullande schema.", "العمل وفق جدول دوري (متغير)."],
    "Lexin022812": ["Föddes med ryggmärgsbråck.", "ولد بتشوه في النخاع الشوكي (Ryggmärgsbråck)."],
    "Lexin022889": ["Det finns rådighetsinskränkningar vid konkurs.", "توجد قيود على التصرف في حالة الإفلاس."],
    "Lexin022979": ["Deklarera ränteinkomster från banken.", "الإقرار بمداخيل الفوائد من البنك."],
    "Lexin022981": ["Dra av ränteutgifter i deklarationen.", "خصم نفقات الفائدة في الإقرار الضريبي."],
    "Lexin022982": ["Räntorna på bolånet har gått upp.", "ارتفعت فوائد القرض العقاري."],
    "Lexin023033": ["Rättschefen leder den juridiska avdelningen.", "رئيس الشؤون القانونية يرأس القسم القانوني."],
    "Lexin023041": ["Rättsgenetik används för DNA-analys.", "يستخدام علم الوراثة الشرعي لتحليل الحمض النووي."],
    "Lexin023043": ["Avtal och testamenten är rättshandlingar.", "العقود والوصايا هي تصرفات قانونية."],
    "Lexin023077": ["Liken genomgick en rättsmedicinsk undersökning.", "خضعت الجثة لفحص طبي شرعي."],
    "Lexin023139": ["Dömdes för röjande av företagshemligheter.", "أدين بإفشاء أسرار تجارية."],
    "Lexin023232": ["Egenföretagare betalar SA-skatt (särskild A-skatt).", "أصحاب العمل الحر يدفعون ضريبة SA."],
    "Lexin023275": ["Det fanns saklig grund för uppsägningen.", "كان هناك سبب موضوعي للفصل."],
    "Lexin023340": ["Dela på samboegendomen vid separation.", "تقسيم ممتلكات التعايش عند الانفصال."],
    "Lexin023342": ["De lever som sambor.", "يعيشون كمتعايشين (بدون زواج رسمي)."],
    "Lexin023346": ["Samerna är Sveriges ursprungsbefolkning.", "السامي هم السكان الأصليون في السويد."],
    "Lexin023347": ["Gå i sameskola i norr.", "الدراسة في مدرسة سامية في الشمال."],
    "Lexin023356": ["Jobba på Samhall AB.", "العمل في شركة Samhall (شركة حكومية لتوظيف ذوي الاحتياجات)."],
    "Lexin023360": ["Företagen måste ta sitt samhällsansvar.", "يجب على الشركات تحمل مسؤوليتها الاجتماعية."],
    "Lexin023364": ["Vi läser om demokrati i samhällskunskap.", "نقرأ عن الديمقراطية في مادة التربية الوطنية (علوم المجتمع)."],
    "Lexin023366": ["SO (samhällsorienterande ämnen) inkluderar historia och geografi.", "المواد الاجتماعية (SO) تشمل التاريخ والجغرافيا."],
    "Lexin023381": ["Vi fick en samlastad leverans med grannen.", "تلقينا تسليماً مشتركاً مع الجار."],
    "Lexin023383": ["Diskutera olika samlevnadsformer i skolan.", "مناقشة أشكال التعايش المختلفة في المدرسة."],
    "Lexin023387": ["Festen hölls i byns samlingslokal.", "أقيم الحفل في قاعة التجمع بالقرية."],
    "Lexin023490": ["Företaget fick betala en sanktionsavgift.", "اضطرت الشركة لدفع رسوم عقوبة."],
    "Lexin023656": ["Uppgifterna är sekretessbelagda.", "المعلومات سرية."],
    "Lexin023686": ["Du får semesterlön när du är ledig.", "تحصل على راتب الإجازة عندما تكون في عطلة."],
    "Lexin023687": ["Nytt semesterår börjar i april.", "تبدأ سنة الإجازة الجديدة في أبريل."],
    "Lexin023711": ["Flytta till ett seniorboende på äldre dar.", "الانتقال إلى سكن كبار السن (Seniorboende) في الشيخوخة."],
    "Lexin023771": ["Mormor bor på ett servicehus.", "الجدة تعيش في دار خدمات (Servicehus)."],
    "Lexin023851": ["SGI (sjukpenninggrundande inkomst) styr din ersättning.", "الدخل المؤسس لنقدية المرض (SGI) يحدد تعويضك."],
    "Lexin023969": ["Få stöd av en SIUS-konsulent för att hitta jobb.", "الحصول على دعم من مستشار SIUS (دعم خاص) لإيجاد عمل."],
    "Lexin024024": ["Arbetsgivaren betalar sjuklön de första 14 dagarna.", "يدفع صاحب العمل راتب المرض في الـ 14 يوماً الأولى."],
    "Lexin024032": ["Beställa sjukresor till sjukhuset.", "طلب رحلات مرضية (نقل خاص للمرضى) إلى المستشفى."],
    "Lexin024113": ["Sjöfartsverket ansvarar för sjövägarna.", "مصلحة الملاحة البحرية مسؤولة عن الطرق البحرية."],
    "Lexin024142": ["Fyll i en skadeanmälningsblankett.", "املأ استمارة بلاغ الضرر."],
    "Lexin024254": ["Vinsten på lotto är skattefri.", "الربح من اليانصيب معفى من الضرائب."],
    "Lexin024257": ["Sätt in pengar på ditt skattekonto.", "أودع المال في حسابك الضريبي."],
    "Lexin024258": ["Besök närmaste skattekontor.", "زيارة أقرب مكتب ضرائب."],
    "Lexin024263": ["Fastigheten är ett skatteobjekt.", "العقار هو موضوع ضريبي."],
    "Lexin024271": ["Kommunerna har olika skattesatser.", "البلديات لديها معدلات ضريبية مختلفة."],
    "Lexin024274": ["Det svenska skattesystemet är komplext.", "النظام الضريبي السويدي معقد."],
    "Lexin024275": ["Fick skattetillägg för felaktig deklaration.", "حصل على ضريبة إضافية (غرامة) بسبب إقرار خاطئ."],
    "Lexin024320": ["Tillämpa skevdelningsregeln vid bodelning.", "تطبيق قاعدة التوزيع غير المتكافئ عند تقسيم الممتلكات."],
    "Lexin024335": ["Att vara skiftarbetare kan vara slitigt.", "أن تكون عامل ورديات قد يكون مرهقاً."],
    "Lexin024340": ["Tingsrätten utsåg en skiftesman.", "عينت المحكمة الابتدائية قساماً (Skiftesman)."],
    "Lexin024348": ["Tjäna över skiktgränsen för statlig skatt.", "كسب أكثر من حد الشريحة لضريبة الدولة."],
    "Lexin024455": ["Skolinspektionen granskade skolan.", "دققت مفتشية المدارس في المدرسة."],
    "Lexin024462": ["Skollagen ställer krav på utbildningen.", "قانون المدارس يضع متطلبات للتعليم."],
    "Lexin024471": ["Barnen åker skolskjuts till skolan.", "يركب الأطفال حافلة النقل المدرسي إلى المدرسة."],
    "Lexin024481": ["Skolverket tar fram kursplaner.", "مصلحة المدارس تعد مناهج الدورات."],
    "Lexin024579": ["Använda skrivtolk vid föreläsningen.", "استخدام مترجم كتابي في المحاضرة."],
    "Lexin024584": ["Lämna bilen för skrotning.", "تسليم السيارة للخردة (التفكيك)."],
    "Lexin024653": ["Betala av sina skulder.", "سداد الديون."],
    "Lexin024708": ["Arbeta med skydds- och beredskapsarbete.", "العمل في الحماية والتأهب للطوارئ."],
    "Lexin024723": ["Skyddskommittén möts en gång i månaden.", "تجتمع لجنة الحماية مرة في الشهر."],
    "Lexin024724": ["Skyddskommittéer finns på stora arbetsplatser.", "توجد لجان الحماية في أماكن العمل الكبيرة."],
    "Lexin024729": ["Tala med ditt skyddsombud om arbetsmiljön.", "تحدث مع ممثل الحماية الخاص بك حول بيئة العمل."],
    "Lexin024733": ["Vi går skyddsronder regelbundet.", "نقوم بجولات تفتيش السلامة (Skyddsronder) بانتظام."],
    "Lexin024806": ["Få bistånd för skälig bostadskostnad.", "الحصول على مساعدة لتكلفة السكن المعقولة."],
    "Lexin024807": ["Alla ska ha en skälig levnadsnivå.", "يجب أن يكون لدى الجميع مستوى معيشي معقول."],
    "Lexin024808": ["Få ersättning för skäliga kostnader utanför riksnormen (t.ex. medicin).", "الحصول على تعويض تكاليف معقولة خارج المعيار الوطني (مثل الدواء)."],
    "Lexin024810": ["Hyran är skäligen 5000 kr.", "الإيجار المعقول هو 5000 كرونة."],
    "Lexin025056": ["Dömd till rättspsykiatrisk sluten vård.", "محكوم عليه برعاية نفسية شرعية مغلقة."],
    "Lexin025134": ["Köra bil med släp.", "قيادة سيارة مع مقطورة."],
    "Lexin025155": ["Vi hade slöjd i skolan (träslöjd/syslöjd).", "كان لدينا حرف يدوية في المدرسة."],
    "Lexin025235": ["Smittskyddslagen ska förhindra spridning av sjukdomar.", "قانون الحماية من العدوى يهدف لمنع انتشار الأمراض."],
    "Lexin025287": ["Bo i ett område med småhus (villor).", "العيش في منطقة منازل صغيرة (فيلات)."],
    "Lexin025293": ["Det var ett småmål i tingsrätten.", "كانت قضية صغيرة في المحكمة الابتدائية."],
    "Lexin025507": ["Köra snöskoter på vintern.", "قيادة سكوتر الثلج في الشتاء."],
    "Lexin025517": ["Sverige har många sociala förmåner.", "السويد لديها العديد من المزايا الاجتماعية."],
    "Lexin025523": ["Arbetsgivaren betalar socialavgifter.", "صاحب العمل يدفع الرسوم الاجتماعية."],
    "Lexin025527": ["Sverige har präglats av socialdemokrati.", "تميزت السويد بالديمقراطية الاجتماعية."],
    "Lexin025529": ["Socialdepartementet ansvarar för välfärden.", "وزارة الشؤون الاجتماعية مسؤولة عن الرعاية."],
    "Lexin025533": ["Reglerna finns i Socialförsäkringsbalken (SFB).", "القواعد موجودة في قانون التأمين الاجتماعي (SFB)."],
    "Lexin025535": ["Kontakta Socialförvaltningen i din kommun.", "اتصل بإدارة الخدمات الاجتماعية في بلديتك."],
    "Lexin025551": ["Beslutet togs av Socialnämnden.", "تم اتخاذ القرار من قبل لجنة الخدمات الاجتماعية."],
    "Lexin025561": ["Ansöka om socialt bistånd (försörjningsstöd).", "طلب المساعدة الاجتماعية (دعم الإعالة)."],
    "Lexin025567": ["Socialtjänstlagen (SoL) styr socialtjänsten.", "قانون الخدمات الاجتماعية (SoL) يحكم الخدمات الاجتماعية."],
    "Lexin025573": ["Studera sociologi på universitetet.", "دراسة علم الاجتماع في الجامعة."],
    "Lexin025575": ["Socionomer jobbar ofta inom socialtjänsten.", "الأخصائيون الاجتماعيون غالباً ما يعملون في الخدمات الاجتماعية."],
    "Lexin025614": ["De har solidariskt betalningsansvar för lånet.", "لديهم مسؤولية دفع تضامنية للقرض (مشتركة)."],
    "Lexin025771": ["SPSM (Specialpedagogiska skolmyndigheten) ger stöd.", "SPSM (سلطة المدارس التربوية الخاصة) تقدم الدعم."],
    "Lexin025774": ["Gå i en specialskola för döva.", "الالتحاق بمدرسة خاصة للصم."],
    "Lexin025822": ["Använda en spermiedonator.", "استخدام متبرع بالحيوانات المنوية."],
    "Lexin025831": ["Det finns spetsutbildningar i matte.", "توجد برامج تعليمية متفوقة (Spets) في الرياضيات."],
    "Lexin026048": ["Få spärrtid på körkortet efter rattfylleri.", "الحصول على فترة حظر للرخصة بعد القيادة تحت تأثير السكر."],
    "Lexin026156": ["Få stöd vid start av näringsverksamhet.", "الحصول على دعم عند بدء نشاط تجاري."],
    "Lexin026184": ["Få lön via statlig lönegaranti vid konkurs.", "الحصول على راتب عبر ضمان الرواتب الحكومي عند الإفلاس."],
    "Lexin026185": ["SJ var tidigare ett statligt affärsverk.", "SJ كانت سابقاً مؤسسة تجارية حكومية."],
    "Lexin026189": ["Riksdagen beslutar om statsbudgeten.", "البرلمان يقرر الميزانية الحكومية."],
    "Lexin026191": ["Jobba inom statsförvaltningen.", "العمل في الإدارة الحكومية."]
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

const backupPath = DATA_FILE + '.backup_others7_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Others Batch 7 completed!`);
