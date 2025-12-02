const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacements = [
    {
        // 1-6: KAKOR -> Replace RAK with RO
        find: '{ main: "KAKOR", targets: ["KAKOR","KAKA","KOK","RAK"], data: {"KAKOR":{"t":"كعك","s":"Mormor bakar goda kakor.","st":"الجدة تخبز كعكاً لذيذاً."},"KAKA":{"t":"كعكة","s":"Vill du ha en kaka?","st":"هل تريد كعكة؟"},"KOK":{"t":"غليان","s":"Vattnet är i kok.","st":"الماء يغلي."},"RAK":{"t":"مستقيم","s":"En rak väg.","st":"طريق مستقيم."}} }',
        replace: '{ main: "KAKOR", targets: ["KAKOR","KAKA","KOK","RO"], data: {"KAKOR":{"t":"كعك","s":"Mormor bakar goda kakor.","st":"الجدة تخبز كعكاً لذيذاً."},"KAKA":{"t":"كعكة","s":"Vill du ha en kaka?","st":"هل تريد كعكة؟"},"KOK":{"t":"غليان","s":"Vattnet är i kok.","st":"الماء يغلي."},"RO":{"t":"هدوء","s":"Jag vill ha lugn och ro.","st":"أريد الهدوء والسكينة."}} }'
    },
    {
        // 1-7: OSTAR -> Replace RAS with ART
        find: '{ main: "OSTAR", targets: ["OSTAR","OST","ROS","RAS"], data: {"OSTAR":{"t":"أجبان","s":"Vi provade många olika ostar.","st":"جربنا العديد من الأجبان المختلفة."},"OST":{"t":"جبن","s":"Jag älskar ost.","st":"أنا أحب الجبن."},"ROS":{"t":"وردة","s":"Ingen ros utan taggar.","st":"لا وردة بدون أشواك."},"RAS":{"t":"انهيار","s":"Rasrisk i bergen.","st":"خطر الانهيار في الجبال."}} }',
        replace: '{ main: "OSTAR", targets: ["OSTAR","OST","ROS","ART"], data: {"OSTAR":{"t":"أجبان","s":"Vi provade många olika ostar.","st":"جربنا العديد من الأجبان المختلفة."},"OST":{"t":"جبن","s":"Jag älskar ost.","st":"أنا أحب الجبن."},"ROS":{"t":"وردة","s":"Ingen ros utan taggar.","st":"لا وردة بدون أشواك."},"ART":{"t":"نوع","s":"Detta är en sällsynt art.","st":"هذا نوع نادر."}} }'
    }
];

let updatedCount = 0;

replacements.forEach(item => {
    if (content.includes(item.find)) {
        content = content.replace(item.find, item.replace);
        updatedCount++;
    } else {
        console.warn(`Could not find data block for replacement: ${item.find.substring(0, 50)}...`);
    }
});

fs.writeFileSync(generatorPath, content);
console.log(`Applied ${updatedCount} final duplicate fixes.`);
