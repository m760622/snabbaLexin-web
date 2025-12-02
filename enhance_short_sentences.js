const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const enhancements = [
    { w: "OST", s_old: "Jag älskar ost.", s_new: "Jag älskar att äta lagrad ost.", st_new: "أحب تناول الجبن المعتق." },
    { w: "BULLAR", s_old: "Vi bakar bullar.", s_new: "Vi bakar goda bullar med kanel.", st_new: "نخبز كعكاً لذيذاً بالقرفة." },
    { w: "RULLA", s_old: "Rulla köttbullarna.", s_new: "Det är roligt att rulla köttbullar.", st_new: "من الممتع دحرج كرات اللحم." },
    { w: "ROST", s_old: "Rost på bilen.", s_new: "Det finns mycket rost på den gamla bilen.", st_new: "يوجد الكثير من الصدأ على السيارة القديمة." },
    { w: "BERGET", s_old: "Vi besteg berget.", s_new: "Vi besteg det höga berget tillsammans.", st_new: "تسلقنا الجبل العالي معاً." },
    { w: "BERG", s_old: "Ett högt berg.", s_new: "Kebnekaise är Sveriges högsta berg.", st_new: "كيبنيكايس هو أعلى جبل في السويد." },
    { w: "GET", s_old: "En get bräkte.", s_new: "En liten get bräkte i hagen.", st_new: "ثغت ماعز صغيرة في المرعى." },
    { w: "SNAR", s_old: "En snar framtid.", s_new: "Vi ses inom en snar framtid.", st_new: "نراك في المستقبل القريب." },
    { w: "ORT", s_old: "En liten ort.", s_new: "Vi bor på en liten och lugn ort.", st_new: "نعيش في منطقة صغيرة وهادئة." },
    { w: "KAL", s_old: "En kal fläck.", s_new: "Han har en kal fläck på huvudet.", st_new: "لديه بقعة صلعاء في رأسه." },
    { w: "SPÅR", s_old: "Följ spåren.", s_new: "Vi följde spåren i den djupa snön.", st_new: "تتبعنا الآثار في الثلج العميق." },
    { w: "PÅ", s_old: "Ligg på soffan.", s_new: "Det är skönt att ligga på soffan.", st_new: "من الرائع الاستلقاء على الأريكة." },
    { w: "SÅ", s_old: "Så ett frö.", s_new: "Man måste så ett frö för att skörda.", st_new: "يجب أن تزرع بذرة لتحصد." },
    { w: "ARG", s_old: "Han var arg.", s_new: "Han var mycket arg på sin bror.", st_new: "كان غاضباً جداً من أخيه." },
    { w: "VÄG", s_old: "En lång väg.", s_new: "Vi har en lång väg att vandra.", st_new: "لدينا طريق طويل لنقطعه." },
    { w: "BIL", s_old: "En snabb bil.", s_new: "Han körde en mycket snabb bil.", st_new: "قاد سيارة سريعة جداً." },
    { w: "NAV", s_old: "Hjulets nav.", s_new: "Navet är hjulets viktigaste del.", st_new: "المحور هو أهم جزء في العجلة." },
    { w: "GARN", s_old: "Nystan av garn.", s_new: "Katten lekte med ett nystan av garn.", st_new: "لعبت القطة بكرة من الغزل." },
    { w: "SIA", s_old: "Sia om framtiden.", s_new: "Ingen kan med säkerhet sia om framtiden.", st_new: "لا أحد يستطيع التنبؤ بالمستقبل بيقين." },
    { w: "RAK", s_old: "En rak linje.", s_new: "Rita en rak linje med linjalen.", st_new: "ارسم خطاً مستقيماً بالمسطرة." }
];

let updatedCount = 0;

enhancements.forEach(item => {
    // Regex to match the specific sentence field
    // We look for s: "OLD_SENTENCE" and replace it with s: "NEW_SENTENCE", st: "NEW_TRANS"
    // Note: The st field usually follows s, but we should be careful.
    // The structure is usually: "WORD": { t: "...", s: "...", st: "..." }

    // Let's try to match the s: "..." part and replace it, and also replace the st: "..." part if it follows.
    // Or better, match the whole object part if possible, but that's hard with regex.
    // Let's rely on the unique sentence string.

    if (content.includes(item.s_old)) {
        // Replace sentence
        content = content.replace(`s: "${item.s_old}"`, `s: "${item.s_new}"`);

        // Find the Arabic translation associated with this block.
        // Since we just replaced the sentence, we can find the translation that follows it.
        // But we need to know the OLD translation to replace it safely, or use a regex that captures it.
        // The old translation is not in my list above, but I can infer it or just replace the whole block if I knew it.

        // Let's do a safer approach: Replace the whole line/segment.
        // We know the structure is `s: "OLD", st: "OLD_TRANS"`
        // Let's use a regex that matches `s: "OLD", st: ".*?"`

        const regex = new RegExp(`s: "${item.s_old}", st: ".*?"`);
        const replacement = `s: "${item.s_new}", st: "${item.st_new}"`;

        // Re-read content to ensure we are working on fresh string (though string is immutable)
        // Actually, I already did a replace above which might have broken the regex match if I didn't save it.
        // Wait, I did `content = content.replace(...)`.
        // So the `s` is already new.
        // I should have done it in one go.

        // Let's revert and do it properly.
        // Reload content? No, just fix the logic loop.
    }
});

// Reset content to be safe
content = fs.readFileSync(generatorPath, 'utf8');
updatedCount = 0;

enhancements.forEach(item => {
    const regex = new RegExp(`s: "${item.s_old}", st: ".*?"`);
    if (regex.test(content)) {
        const replacement = `s: "${item.s_new}", st: "${item.st_new}"`;
        content = content.replace(regex, replacement);
        updatedCount++;
    } else {
        console.warn(`Could not find sentence: "${item.s_old}"`);
    }
});

fs.writeFileSync(generatorPath, content);
console.log(`Enhanced ${updatedCount} short sentences.`);
