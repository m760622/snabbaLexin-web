
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
let WC_DICTIONARY;
eval('WC_DICTIONARY = ' + dictMatch[1]);

const PLANS = {
    5: [
        { main: "HÄLSAN", targets: ["HÄLSAN", "HÄLSA", "LÄNSA", "ANSLÅ", "SÅLLA"] }
    ]
};

const allData = {};

Object.keys(PLANS).forEach(chapter => {
    const chapterData = [];
    PLANS[chapter].forEach(level => {
        const levelObj = {
            main: level.main,
            targets: level.targets,
            data: {}
        };

        level.targets.forEach(word => {
            const entry = WC_DICTIONARY.find(e => e.w === word);
            if (entry) {
                levelObj.data[word] = {
                    t: entry.t,
                    s: entry.s,
                    st: entry.st
                };
            } else {
                // Manual data
                if (word === "LÄNSA") levelObj.data[word] = { t: "يفرغ (ماء)", s: "Vi måste länsa båten.", st: "يجب أن نفرغ القارب من الماء." };
                else if (word === "ANSLÅ") levelObj.data[word] = { t: "يخصص / يعلن", s: "Regeringen ska anslå pengar.", st: "الحكومة ستخصص أموالاً." };
                else if (word === "SÅLLA") levelObj.data[word] = { t: "يغربل", s: "Sålla mjölet.", st: "غربل الدقيق." };
                else if (word === "HÄLSAN") levelObj.data[word] = { t: "الصحة", s: "Hälsan är viktig.", st: "الصحة مهمة." }; // Ensure main word data exists if missing
                else if (word === "HÄLSA") levelObj.data[word] = { t: "صحة / يحيي", s: "God hälsa.", st: "صحة جيدة." };
                else console.error(`Missing data for ${word}`);
            }
        });

        chapterData.push(levelObj);
    });
    allData[chapter] = chapterData;
});

console.log(JSON.stringify(allData, null, 4));
