// ========================================
//  SPELLING GAME LOGIC
// ========================================

let spellingWord = '';
let currentSpellingItem = null; // Store full item for examples

// --- SPELLING GAME (Refactored to Multiple Choice) ---
function startSpellingGame() {
    const hintEl = document.getElementById('spellingHint');
    const optionsContainer = document.getElementById('spellingOptions');
    const feedbackEl = document.getElementById('spellingFeedback');
    const nextBtn = document.getElementById('nextSpellingBtn');

    // Reset
    optionsContainer.innerHTML = '';
    feedbackEl.textContent = '';
    document.getElementById('spellingExample').textContent = ''; // Clear example
    feedbackEl.className = 'game-feedback';
    nextBtn.style.display = 'none';

    // Find correct word
    let candidate = null;
    let attempts = 0;
    while (!candidate && attempts < 100) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        // Require example sentence (COL_EX_SWE) to be present
        if (item && item[COL_SWE] && item[COL_SWE].length > 2 && !item[COL_SWE].includes(' ') && item[COL_EX_SWE]) {
            candidate = item;
        }
        attempts++;
    }

    if (!candidate) return;

    currentSpellingItem = candidate; // Save for feedback
    spellingWord = candidate[COL_SWE];
    hintEl.textContent = candidate[COL_ARB] || candidate[COL_EX_ARB] || "Välj rätt ord";

    // Find 2 distractors
    const options = [candidate];
    while (options.length < 3) {
        const distractor = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (distractor && distractor[COL_SWE] && distractor[COL_SWE] !== spellingWord && !distractor[COL_SWE].includes(' ')) {
            options.push(distractor);
        }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    // Render Buttons
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'spelling-option-btn';
        btn.textContent = opt[COL_SWE];
        btn.onclick = () => checkSpellingOption(btn, opt[COL_SWE]);
        optionsContainer.appendChild(btn);
    });
}

function checkSpellingOption(btn, selectedWord) {
    const feedbackEl = document.getElementById('spellingFeedback');
    const nextBtn = document.getElementById('nextSpellingBtn');
    const allBtns = document.querySelectorAll('.spelling-option-btn');

    // Disable all buttons
    allBtns.forEach(b => b.disabled = true);

    if (selectedWord === spellingWord) {
        btn.classList.add('correct');
        gameScore += 10;
        document.getElementById('spellingScore').textContent = gameScore;
        saveScore('spelling', gameScore);
        // Confetti removed as per request
        // Toast removed as per request
    } else {
        btn.classList.add('wrong');
        // Highlight correct one
        allBtns.forEach(b => {
            if (b.textContent === spellingWord) b.classList.add('correct');
        });
        // Toast removed as per request
    }

    // Add Example Sentence if available
    if (currentSpellingItem && currentSpellingItem[COL_EX_SWE]) {
        const exampleEl = document.getElementById('spellingExample');
        exampleEl.textContent = `"${currentSpellingItem[COL_EX_SWE]}"`;
        // feedbackEl.innerHTML += `<br><br><div style="font-size: 0.9em; color: #555;">Exempel: "${currentSpellingItem[COL_EX_SWE]}"</div>`;
    }

    nextBtn.style.display = 'block';
}
