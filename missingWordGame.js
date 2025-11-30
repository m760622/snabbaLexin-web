// ========================================
// Missing Word Game Logic
// ========================================

let missingWordCurrent = null;

// --- MISSING WORD GAME ---
function startMissingWordGame() {
    const gameSentence = document.getElementById('gameSentence');
    const gameHint = document.getElementById('gameHint');
    const gameOptions = document.getElementById('gameOptions');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');

    // Ensure Next button triggers new round
    nextQuestionBtn.onclick = startMissingWordGame;

    // Check if data is loaded
    if (typeof dictionaryData === 'undefined' || !dictionaryData || dictionaryData.length === 0) {
        gameSentence.textContent = "Fel: Data inte laddad / خطأ: البيانات لم يتم تحميلها";
        return;
    }

    // Reset UI
    gameOptions.innerHTML = '';
    nextQuestionBtn.style.display = 'none';

    // 1. Find a word with an example
    let candidate = null;
    let attempts = 0;

    // Increased attempts to find a valid word
    while (!candidate && attempts < 500) {
        const randomItem = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (randomItem && randomItem[COL_EX_SWE] && randomItem[COL_SWE]) {
            const word = randomItem[COL_SWE].toLowerCase();
            const example = randomItem[COL_EX_SWE].toLowerCase();

            // Create regex here to ensure we can actually hide the word
            // Use word boundary to avoid partial matches (e.g. hiding 'rum' in 'trumma')
            const regex = new RegExp(`\\b${word}\\b`, 'i');

            // Ensure word is long enough and actually matches the regex in the example
            if (word.length > 2 && regex.test(example)) {
                candidate = randomItem;
            }
        }
        attempts++;
    }

    if (!candidate) {
        gameSentence.textContent = "Kunde inte hitta en lämplig fråga. Försök igen!";
        return;
    }

    const targetWord = candidate[COL_SWE];
    currentCorrectAnswer = targetWord;

    // 2. Prepare Sentence (Hide Word)
    // Remove 'g' flag to only replace the first occurrence
    const regex = new RegExp(`\\b${targetWord}\\b`, 'i');
    const displaySentence = candidate[COL_EX_SWE].replace(regex, '<span class="missing-word-slot"></span>');

    gameSentence.innerHTML = displaySentence;
    gameHint.textContent = candidate[COL_EX_ARB] || candidate[COL_ARB];

    // 3. Generate Distractors
    const options = [targetWord];
    while (options.length < 4) {
        const randomDistractor = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (randomDistractor && randomDistractor[COL_SWE]) {
            const distractor = randomDistractor[COL_SWE];
            if (!options.includes(distractor) && distractor !== targetWord) {
                options.push(distractor);
            }
        }
    }

    options.sort(() => Math.random() - 0.5);

    // 4. Render Options
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => checkMissingWordAnswer(btn, opt);
        gameOptions.appendChild(btn);
    });
}

function checkMissingWordAnswer(btn, selected) {
    const isCorrect = selected.toLowerCase() === currentCorrectAnswer.toLowerCase();
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const scoreEl = document.getElementById('gameScore');

    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    if (isCorrect) {
        btn.classList.add('correct');
        gameScore += 10;
        saveScore('missing-word', gameScore); // Save Score
        // Toast removed as per request
    } else {
        btn.classList.add('wrong');
        allBtns.forEach(b => {
            if (b.textContent.toLowerCase() === currentCorrectAnswer.toLowerCase()) {
                b.classList.add('correct');
            }
        });
        // Toast removed as per request
    }

    scoreEl.textContent = gameScore;
    nextQuestionBtn.style.display = 'block';
}
