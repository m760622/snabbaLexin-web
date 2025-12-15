/**
 * pwa.js - Global PWA Features & Native App Feel
 * Included in all pages to ensure consistent behavior.
 */

// ==========================================
// 1. iOS Audio Unlock
// ==========================================
let audioUnlockHandled = false;
const unlockAudioOnFirstTouch = () => {
    if (audioUnlockHandled) return;
    audioUnlockHandled = true;

    // Use TTSManager's unlock function if available
    if (typeof TTSManager !== 'undefined' && TTSManager.unlockAudio) {
        TTSManager.unlockAudio();
    }

    // Remove listeners after first touch
    document.removeEventListener('touchstart', unlockAudioOnFirstTouch);
    document.removeEventListener('click', unlockAudioOnFirstTouch);
    // console.log('[Audio] Unlocked on first user interaction');
};
document.addEventListener('touchstart', unlockAudioOnFirstTouch, { once: true, passive: true });
document.addEventListener('click', unlockAudioOnFirstTouch, { once: true });

// ==========================================
// 2. Prevent Zoom (Pinch)
// ==========================================
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
}, { passive: false });

document.addEventListener('gesturechange', function (e) {
    e.preventDefault();
}, { passive: false });

document.addEventListener('gestureend', function (e) {
    e.preventDefault();
}, { passive: false });

// ==========================================
// 3. iOS Utilities
// ==========================================
function isIos() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}

function isInStandaloneMode() {
    return ('standalone' in window.navigator) && (window.navigator.standalone);
}

// ==========================================
// 4. Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // --- iOS Install Prompt ---
    if (isIos() && !isInStandaloneMode()) {
        const iosPrompt = document.getElementById('iosInstallPrompt');
        if (iosPrompt) {
            // Check if user previously closed it
            if (!sessionStorage.getItem('iosPromptClosed')) {
                iosPrompt.style.display = 'block';
            }

            const closeBtn = document.getElementById('closeIosPrompt');
            if (closeBtn) {
                closeBtn.onclick = () => {
                    iosPrompt.style.display = 'none';
                    sessionStorage.setItem('iosPromptClosed', 'true');
                };
            }
        }
    }

    // --- Global Mobile View Preference ---
    // Apply mobile view if saved preference exists
    if (localStorage.getItem('mobileView') === 'true') {
        document.body.classList.add('iphone-view');
        // Update toggle button state if it exists
        const btn = document.getElementById('mobileViewToggle');
        if (btn) btn.classList.add('active'); // Optional styling support
    }

    // Bind Toggle Button (if exists on page)
    const mobileViewToggle = document.getElementById('mobileViewToggle');
    if (mobileViewToggle) {
        mobileViewToggle.addEventListener('click', () => {
            document.body.classList.toggle('iphone-view');
            const isMobileView = document.body.classList.contains('iphone-view');
            localStorage.setItem('mobileView', isMobileView ? 'true' : 'false');
        });
    }

    // --- Daily Streaks (Header Badge) ---
    // Minimal version for header display on all pages
    const streakEl = document.getElementById('streakCounter');
    if (streakEl) {
        const streak = parseInt(localStorage.getItem('dailyStreak') || '0');
        streakEl.innerHTML = `🔥 ${streak} Dag${streak > 1 ? 'ar' : ''}`;
        streakEl.title = `${streak} dagar i rad!`;
        if (streak > 0) streakEl.style.display = 'inline-block';
    }
});
