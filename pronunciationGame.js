// ========================================
//  PRONUNCIATION GAME LOGIC
// ========================================

let recognition = null;
let pronunciationWord = '';

// --- PRONUNCIATION GAME ---
function startPronunciationGame() {
    const wordDisplay = document.getElementById('pronunciationWord');
    const translationDisplay = document.getElementById('pronunciationTranslation');
    const feedback = document.getElementById('pronunciationFeedback');
    const micStatus = document.getElementById('micStatus');
    const nextBtn = document.getElementById('nextPronunciationBtn');
    const micBtn = document.getElementById('micBtn');

    feedback.textContent = '';
    feedback.className = 'pronunciation-feedback';
    micStatus.textContent = 'Tryck för att tala / اضغط للتحدث';
    nextBtn.style.display = 'none';
    micBtn.classList.remove('listening');

    let candidate = null;
    let attempts = 0;
    while (!candidate && attempts < 50) {
        const randomItem = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (randomItem && randomItem[COL_SWE] && randomItem[COL_SWE].length > 2 && !randomItem[COL_SWE].includes(' ')) {
            candidate = randomItem;
        }
        attempts++;
    }

    if (!candidate) {
        wordDisplay.textContent = "Error";
        return;
    }

    pronunciationWord = candidate[COL_SWE];
    wordDisplay.textContent = pronunciationWord;
    translationDisplay.textContent = candidate[COL_ARB] || '';
}

function toggleMic() {
    const micBtn = document.getElementById('micBtn');
    const micStatus = document.getElementById('micStatus');
    const feedback = document.getElementById('pronunciationFeedback');

    if (!('webkitSpeechRecognition' in window)) {
        alert("Din webbläsare stöder inte taligenkänning. Prova Chrome eller Safari. \n متصفحك لا يدعم التعرف على الصوت.");
        return;
    }

    if (micBtn.classList.contains('listening')) {
        if (recognition) recognition.stop();
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = 'sv-SE';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        micBtn.classList.add('listening');
        micStatus.textContent = 'Lyssnar... / أستمع...';
        feedback.textContent = '';
    };

    recognition.onend = () => {
        micBtn.classList.remove('listening');
        micStatus.textContent = 'Tryck för att tala / اضغط للتحدث';
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const target = pronunciationWord.toLowerCase();

        if (transcript === target || transcript.includes(target) || target.includes(transcript)) {
            feedback.textContent = `Utmärkt! Du sa: "${transcript}" 🎉`;
            feedback.className = 'pronunciation-feedback success';
            triggerConfetti();
            document.getElementById('nextPronunciationBtn').style.display = 'block';
            gameScore += 20;
            saveScore('pronunciation', gameScore); // Save Score
        } else {
            feedback.textContent = `Inte riktigt... Du sa: "${transcript}". Försök igen! 💪`;
            feedback.className = 'pronunciation-feedback error';
        }
    };

    recognition.onerror = (event) => {
        micBtn.classList.remove('listening');
        micStatus.textContent = 'Fel vid igenkänning / خطأ في التعرف';
        console.error('Speech recognition error', event.error);
    };

    recognition.start();
}
