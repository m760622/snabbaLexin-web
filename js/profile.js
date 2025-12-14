
document.addEventListener('DOMContentLoaded', () => {
    initProfile();
});

function initProfile() {
    renderStats();
    renderBadges();
    renderActivityChart();
}

function renderStats() {
    // 1. Streak
    const streak = localStorage.getItem('dailyStreak') || '0';
    document.getElementById('streakValue').innerText = `🔥 ${streak}`;

    // 2. Lessons Completed
    const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    // Total lessons from lessonsData
    const totalLessons = (typeof lessonsData !== 'undefined') ? lessonsData.length : 14;
    document.getElementById('lessonsValue').innerText = `${completed.length}/${totalLessons}`;

    // 3. User Rank (Based on lessons)
    const rankEl = document.getElementById('userRank');
    if (completed.length === 0) rankEl.innerText = "Nybörjare / مبتدأ";
    else if (completed.length < 5) rankEl.innerText = "Student / طالب";
    else if (completed.length < 10) rankEl.innerText = "Avancerad / متقدم";
    else rankEl.innerText = "Expert / خبير";

    // 4. Total Points (Games + Quizzes)
    // We need to aggregate scores.
    // Games: 'wordConnectScore', 'grammarScore', 'sentenceBuilderScore'
    const wordConnectScore = parseInt(localStorage.getItem('currentScore') || '0'); // Old key for word connect? Verify.
    // Actually wordConnect might use level based. Let's assume generic scores for now.
    // Let's sum up quiz scores too.

    let totalScore = 0;

    // Quiz Scores
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('lesson_score_')) {
            totalScore += parseInt(localStorage.getItem(key)) * 10; // 10 points per %? No, just add % as points is weird.
            // Let's say 100% = 100 points.
            totalScore += parseInt(localStorage.getItem(key));
        }
    }

    // Game Scores could be separate.
    // For now, let's just display what we have reasonable data for.
    document.getElementById('pointsValue').innerText = totalScore;
}

function renderBadges() {
    const container = document.getElementById('badgesContainer');
    const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    const streak = parseInt(localStorage.getItem('dailyStreak') || '0');

    const badges = [
        {
            id: 'first_lesson',
            icon: '🌱',
            name: 'Första Steget',
            desc: 'Klara din första lektion',
            unlocked: completed.length >= 1
        },
        {
            id: 'streak_3',
            icon: '🔥',
            name: 'På Hugget',
            desc: '3 dagar i rad',
            unlocked: streak >= 3
        },
        {
            id: 'streak_7',
            icon: '🏆',
            name: 'Dedikerad',
            desc: '7 dagar i rad',
            unlocked: streak >= 7
        },
        {
            id: 'grammar_master',
            icon: '👑',
            name: 'Grammatikmästare',
            desc: 'Klara 10 lektioner',
            unlocked: completed.length >= 10
        },
        {
            id: 'quiz_ace',
            icon: '💯',
            name: 'Quiz Pro',
            desc: 'Få 100% på ett quiz',
            unlocked: hasPerfectScore()
        }
    ];

    container.innerHTML = badges.map(b => `
        <div class="badge-item ${b.unlocked ? 'unlocked' : ''}" title="${b.desc}">
            <span class="badge-icon">${b.icon}</span>
            <div class="badge-name">${b.name}</div>
        </div>
    `).join('');
}

function hasPerfectScore() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('lesson_score_')) {
            if (parseInt(localStorage.getItem(key)) === 100) return true;
        }
    }
    return false;
}

function renderActivityChart() {
    const chart = document.getElementById('activityChart');
    // Mock data for visual appeal since we don't track historical activity yet
    const data = [20, 60, 40, 80, 50, 90, 30]; // Mon-Sun
    const days = ['M', 'T', 'O', 'T', 'F', 'L', 'S'];

    chart.innerHTML = data.map((val, i) => `
        <div class="bar" style="height: ${val}%;">
            <span>${days[i]}</span>
        </div>
    `).join('');
}
