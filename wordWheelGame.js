// ========================================
//  WORD WHEEL GAME LOGIC
// ========================================

let wheelWord = '';
let wheelCurrentInput = '';
let wheelLevel = 3; // Start with 3 letters
let wheelWordsSolved = 0;
let currentWheelItem = null;

// --- WORD WHEEL GAME ---
function startWordWheelGame() {
    const hintEl = document.getElementById('wheelHint');
    const answerBox = document.getElementById('wheelAnswerBox');
    const lettersContainer = document.getElementById('wheelLetters');
    const feedbackEl = document.getElementById('wheelFeedback');
    const nextBtn = document.getElementById('nextWheelBtn');
    const checkBtn = document.getElementById('wheelCheckBtn');
    const skipBtn = document.getElementById('skipWheelBtn');
    const showAnswerBtn = document.getElementById('wheelShowAnswerBtn');

    // Reset
    wheelCurrentInput = '';
    answerBox.textContent = '';
    answerBox.className = 'wheel-answer-box'; // Reset classes
    feedbackEl.textContent = '';
    feedbackEl.className = 'game-feedback';
    const exampleEl = document.getElementById('wheelExample');
    if (exampleEl) {
        exampleEl.style.display = 'none';
        exampleEl.textContent = '';
    }
    nextBtn.style.display = 'none';
    checkBtn.disabled = false;
    checkBtn.onclick = checkWordWheelAnswer; // Bind the check function
    if (skipBtn) {
        skipBtn.style.display = 'inline-block';
        skipBtn.onclick = skipWordWheel;
    }
    if (nextBtn) nextBtn.onclick = startWordWheelGame;
    lettersContainer.innerHTML = '';

    // Get selected length
    const lengthSelect = document.getElementById('wordWheelLength');
    if (lengthSelect) {
        wheelLevel = parseInt(lengthSelect.value) || 3;
    }

    // Find word based on current level (length)
    let candidate = null;
    let attempts = 0;
    if (showAnswerBtn) {
        // Always visible, enabled at start
        showAnswerBtn.style.display = 'inline-block';
        showAnswerBtn.disabled = false;
        showAnswerBtn.onclick = showWordWheelAnswer;
    }

    // Find word based on level (Strict length match now)
    // Removed duplicate declarations here
    while (!candidate && attempts < 500) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        const word = item[COL_SWE] || '';
        // Strict length match
        if (word.length === wheelLevel && !word.includes(' ') && !word.includes('-') && /^[a-zåäö]+$/i.test(word)) {
            candidate = item;
        }
        attempts++;
    }

    if (!candidate) {
        // Fallback: Try +/- 1 length if strict fails
        attempts = 0;
        while (!candidate && attempts < 100) {
            const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
            const word = item[COL_SWE] || '';
            if (Math.abs(word.length - wheelLevel) <= 1 && !word.includes(' ') && !word.includes('-')) {
                candidate = item;
            }
            attempts++;
        }
    }

    if (!candidate) {
        hintEl.textContent = "Kunde inte hitta ord... Försöker igen.";
        setTimeout(startWordWheelGame, 1000);
        return;
    }

    currentWheelItem = candidate; // Store for later use
    wheelWord = candidate[COL_SWE].toLowerCase();
    hintEl.textContent = candidate[COL_ARB] || "Bygg ordet / كوّن الكلمة";

    // Scramble letters
    const letters = wheelWord.split('').sort(() => Math.random() - 0.5);

    // Render Wheel
    const radius = 100; // px
    const centerX = 150; // half of container width
    const centerY = 150; // half of container height
    const angleStep = (2 * Math.PI) / letters.length;

    let clickedButtons = []; // Stack to track clicked buttons

    // Reset undo stack
    clickedButtons = [];

    letters.forEach((char, index) => {
        const btn = document.createElement('button');
        btn.className = 'wheel-letter';
        btn.textContent = char;

        const angle = index * angleStep - (Math.PI / 2); // Start from top
        const x = centerX + radius * Math.cos(angle) - 30; // -30 for half button size (60px width)
        const y = centerY + radius * Math.sin(angle) - 30;

        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;

        btn.onclick = () => {
            if (!btn.classList.contains('selected')) {
                wheelCurrentInput += char;
                answerBox.textContent = wheelCurrentInput;
                answerBox.classList.remove('wrong', 'correct'); // Reset feedback on typing
                btn.classList.add('selected');
                clickedButtons.push(btn); // Add to stack
            }
        };

        lettersContainer.appendChild(btn);
    });

    // Expose undo function globally or bind it
    window.undoWordWheel = () => {
        if (clickedButtons.length > 0) {
            const lastBtn = clickedButtons.pop();
            lastBtn.classList.remove('selected');
            wheelCurrentInput = wheelCurrentInput.slice(0, -1);
            answerBox.textContent = wheelCurrentInput;
            answerBox.classList.remove('wrong', 'correct');
        }
    };
}

function showWordWheelAnswer() {
    const answerBox = document.getElementById('wheelAnswerBox');
    const feedbackEl = document.getElementById('wheelFeedback');
    const nextBtn = document.getElementById('nextWheelBtn');
    const checkBtn = document.getElementById('wheelCheckBtn');
    const skipBtn = document.getElementById('skipWheelBtn');
    const showAnswerBtn = document.getElementById('wheelShowAnswerBtn');

    // Reveal the correct answer
    wheelCurrentInput = wheelWord;
    answerBox.textContent = wheelWord;
    document.querySelectorAll('.wheel-letter').forEach(btn => btn.classList.add('selected'));
    feedbackEl.textContent = `Rätt svar var: ${wheelWord}`;
    feedbackEl.className = 'game-feedback'; // neutral

    // Keep Skip button visible in column 2
    if (skipBtn) {
        skipBtn.style.display = 'inline-flex';
        skipBtn.style.gridColumn = '2';
    }
    // Show Next button in column 4
    if (nextBtn) {
        nextBtn.style.display = 'inline-flex';
        nextBtn.style.gridColumn = '4';
    }
    // Hide Show Answer button
    if (showAnswerBtn) {
        showAnswerBtn.style.display = 'none';
    }
    // Disable Check button (no longer needed)
    if (checkBtn) {
        checkBtn.disabled = true;
    }
}

function skipWordWheel() {
    startWordWheelGame();
}



function checkWordWheelAnswer() {
    const answerBox = document.getElementById('wheelAnswerBox');
    const feedbackEl = document.getElementById('wheelFeedback');
    const nextBtn = document.getElementById('nextWheelBtn');
    const checkBtn = document.getElementById('wheelCheckBtn');
    const skipBtn = document.getElementById('skipWheelBtn');
    const showAnswerBtn = document.getElementById('wheelShowAnswerBtn');
    const exampleEl = document.getElementById('wheelExample'); // New element

    if (wheelCurrentInput.toLowerCase() === wheelWord) {
        // Correct!
        answerBox.classList.add('correct');
        feedbackEl.textContent = "Rätt svar! 🎉 / إجابة صحيحة!";
        feedbackEl.className = 'game-feedback success';

        // Update Score
        gameScore += 10;
        const scoreEl = document.getElementById('wordWheelScore');
        if (scoreEl) scoreEl.textContent = gameScore;
        saveScore('word-wheel', gameScore);

        // Show Example Sentence
        if (currentWheelItem && currentWheelItem[COL_EX_SWE]) {
            exampleEl.innerHTML = `Exempel: <em>"${currentWheelItem[COL_EX_SWE]}"</em>`;
            exampleEl.style.display = 'block';
        } else {
            exampleEl.style.display = 'none';
        }

        // Button Logic
        if (skipBtn) {
            skipBtn.style.display = 'inline-flex';
            skipBtn.style.gridColumn = '2';
        }
        nextBtn.style.display = 'inline-flex';
        nextBtn.style.gridColumn = '4';

        if (showAnswerBtn) {
            showAnswerBtn.style.display = 'none';
        }

        checkBtn.disabled = true;

        if (showAnswerBtn) {
            showAnswerBtn.disabled = true;
            showAnswerBtn.style.display = 'inline-flex';
            showAnswerBtn.style.gridColumn = '3';
        }

        wheelWordsSolved++;
    } else {
        // Wrong
        answerBox.classList.add('wrong');
        feedbackEl.textContent = "Försök igen... / حاول مجدداً";
        feedbackEl.className = 'game-feedback error';
        setTimeout(() => {
            feedbackEl.textContent = "";
            answerBox.classList.remove('wrong');
        }, 1500);
    }
}
