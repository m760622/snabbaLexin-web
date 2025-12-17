// ========================================
// PRONUNCIATION GAME - مدرب النطق
// ========================================
console.log("pronunciationGame.js LOADED");

// State
let pronunciationTarget = null;
let pronunciationScore = 0;
let isListening = false;
let recognition = null;

// Initialize Speech Recognition
function initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'sv-SE';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = handleSpeechResult;
        recognition.onerror = handleSpeechError;
        recognition.onend = () => {
            isListening = false;
            updateMicStatus();
        };
    } else if ('SpeechRecognition' in window) {
        recognition = new SpeechRecognition();
        recognition.lang = 'sv-SE';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = handleSpeechResult;
        recognition.onerror = handleSpeechError;
        recognition.onend = () => {
            isListening = false;
            updateMicStatus();
        };
    }
}

// Start Pronunciation Game
window.startPronunciationGame = function () {
    const wordEl = document.getElementById('pronunciationWord');
    const translationEl = document.getElementById('pronunciationTranslation');
    const feedbackEl = document.getElementById('pronunciationFeedback');
    const nextBtn = document.getElementById('nextPronunciationBtn');

    // Reset
    feedbackEl.innerHTML = '';
    feedbackEl.className = 'pronunciation-feedback';
    nextBtn.style.display = 'none';

    // Find a suitable word
    let candidate = null;
    let attempts = 0;

    while (!candidate && attempts < 200) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (item && item[COL_SWE] && item[COL_ARB] &&
            item[COL_SWE].length >= 3 && item[COL_SWE].length <= 12 &&
            !item[COL_SWE].includes(' ')) {
            candidate = item;
        }
        attempts++;
    }

    if (!candidate) {
        wordEl.textContent = "Fel";
        translationEl.textContent = "Kunde inte hitta ett ord";
        return;
    }

    pronunciationTarget = candidate[COL_SWE].toLowerCase();
    wordEl.textContent = candidate[COL_SWE];
    translationEl.textContent = candidate[COL_ARB];

    // Initialize recognition if not done
    if (!recognition) {
        initSpeechRecognition();
    }

    // Speak the word for reference
    if (typeof TTSManager !== 'undefined') {
        setTimeout(() => TTSManager.speak(candidate[COL_SWE], 'sv'), 500);
    }
};

// Toggle Microphone
window.toggleMic = function () {
    if (!recognition) {
        initSpeechRecognition();
        if (!recognition) {
            showPronunciationFeedback('Tyvärr stöds inte tal i denna webbläsare', 'error');
            return;
        }
    }

    if (isListening) {
        recognition.stop();
        isListening = false;
    } else {
        try {
            recognition.start();
            isListening = true;
        } catch (e) {
            console.error('Speech recognition error:', e);
        }
    }
    updateMicStatus();
};

// Update Mic Status
function updateMicStatus() {
    const micBtn = document.getElementById('micBtn');
    const statusEl = document.getElementById('micStatus');

    if (isListening) {
        micBtn.classList.add('listening');
        statusEl.textContent = 'Lyssnar... / أستمع...';
    } else {
        micBtn.classList.remove('listening');
        statusEl.textContent = 'Tryck för att tala / اضغط للتحدث';
    }
}

// Handle Speech Result
function handleSpeechResult(event) {
    const feedbackEl = document.getElementById('pronunciationFeedback');
    const nextBtn = document.getElementById('nextPronunciationBtn');

    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
    }

    transcript = transcript.toLowerCase().trim();
    console.log('Heard:', transcript, 'Target:', pronunciationTarget);

    // Check if correct (allow some flexibility)
    const isCorrect = transcript.includes(pronunciationTarget) ||
        pronunciationTarget.includes(transcript) ||
        levenshteinDistance(transcript, pronunciationTarget) <= 2;

    if (isCorrect) {
        feedbackEl.innerHTML = `✅ Bra uttal! / نطق ممتاز!<br><span style="opacity:0.7">Du sa: "${transcript}"</span>`;
        feedbackEl.className = 'pronunciation-feedback success';
        pronunciationScore++;
        document.getElementById('pronunciationScore').textContent = pronunciationScore;

        if (typeof saveScore === 'function') {
            saveScore('pronunciation', pronunciationScore);
        }
    } else {
        feedbackEl.innerHTML = `⚠️ Försök igen!<br><span style="opacity:0.7">Du sa: "${transcript}"</span>`;
        feedbackEl.className = 'pronunciation-feedback warning';
    }

    nextBtn.style.display = 'block';
}

// Handle Speech Error
function handleSpeechError(event) {
    console.error('Speech error:', event.error);
    showPronunciationFeedback(`Fel: ${event.error}`, 'error');
}

// Show Feedback
function showPronunciationFeedback(message, type) {
    const feedbackEl = document.getElementById('pronunciationFeedback');
    feedbackEl.textContent = message;
    feedbackEl.className = `pronunciation-feedback ${type}`;
}

// Levenshtein Distance (for fuzzy matching)
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initSpeechRecognition();
});
