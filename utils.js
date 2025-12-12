/**
 * SnabbaLexin Utilities
 * Shared logic for Theme, Favorites, and UI notifications.
 */

// ========================================
// Toast Notification System
// ========================================
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    // Clear any existing timeout to prevent early dismissal
    if (toast.timeoutId) {
        clearTimeout(toast.timeoutId);
    }

    toast.timeoutId = setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ========================================
// Theme Manager
// ========================================
const ThemeManager = {
    init() {
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Add dark-mode class to body for legacy CSS support if needed
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    },

    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
            document.body.classList.add('dark-mode');
            showToast('Mörkt läge aktiverat / الوضع الليلي 🌙');
        } else {
            document.body.classList.remove('dark-mode');
            showToast('Ljust läge aktiverat / الوضع النهاري ☀️');
        }

        return newTheme;
    }
};

// ========================================
// Favorites Manager
// ========================================
const FavoritesManager = {
    getFavorites() {
        try {
            return new Set(JSON.parse(localStorage.getItem('favorites') || '[]'));
        } catch (e) {
            console.error('Error loading favorites:', e);
            return new Set();
        }
    },

    isFavorite(id) {
        return this.getFavorites().has(id);
    },

    toggle(id) {
        let favorites = this.getFavorites(); // Returns a Set
        let isAdded = false;

        if (favorites.has(id)) {
            favorites.delete(id);
            isAdded = false;
        } else {
            favorites.add(id);
            isAdded = true;
        }

        // Save back to localStorage
        localStorage.setItem('favorites', JSON.stringify([...favorites]));

        // Notify user
        if (isAdded) {
            showToast('Tillagt i favoriter / تمت الإضافة للمفضلة ❤️');
        } else {
            showToast('Borttaget från favoriter / تمت الإزالة من المفضلة 🗑️');
        }

        return isAdded;
    }
};

// ========================================
// TTS Manager (Text-to-Speech)
// ========================================
const TTSManager = {
    audio: null,
    lastSpokenText: '',
    cachedSwedishVoice: null,
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
    timeoutId: null,

    // Speed settings (0.5 = slow, 1.0 = normal, 1.5 = fast)
    getSpeed() {
        const saved = localStorage.getItem('ttsSpeed');
        return saved ? parseFloat(saved) : 0.85; // Default: slightly slower for clarity
    },

    setSpeed(speed) {
        const clamped = Math.min(1.5, Math.max(0.5, speed));
        localStorage.setItem('ttsSpeed', clamped.toString());
        showToast(`Uttalshastighet: ${Math.round(clamped * 100)}% / سرعة النطق`);
        return clamped;
    },

    speak(text, lang = 'sv') {
        if (!text || text.trim() === '') return;
        const cleanText = text.replace(/\'/g, "\'").trim();

        // Prevent rapid repeats of the same text
        if (cleanText === this.lastSpokenText && this.audio && !this.audio.paused) {
            return;
        }
        this.lastSpokenText = cleanText;

        // Stop current
        this.stop();

        // 1. Try Google Translate TTS (Primary)
        this.playGoogleTTS(cleanText, lang);
    },

    stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    },

    playGoogleTTS(text, lang) {
        // Clear previous timeout
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }

        this.audio = new Audio();
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`;
        this.audio.src = url;
        this.audio.volume = 1.0;

        const speed = this.getSpeed();

        // iOS Fix: Adjust rate only after metadata is loaded to avoid errors
        this.audio.oncanplay = () => {
            this.audio.playbackRate = speed;
            // Clear timeout on successful load
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
            }
        };

        // Timeout fallback: if audio doesn't start within 5 seconds, use local TTS
        this.timeoutId = setTimeout(() => {
            if (this.audio && (this.audio.readyState < 2 || this.audio.paused)) {
                console.warn('Google TTS timeout (5s), falling back to local.');
                this.audio.pause();
                this.playLocalTTS(text, lang === 'sv' ? 'sv-SE' : lang);
            }
        }, 5000);

        const playPromise = this.audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Playing Google TTS:', text, 'at speed:', speed);
            }).catch(err => {
                console.warn('Google TTS failed/blocked, falling back to local:', err);
                if (this.timeoutId) clearTimeout(this.timeoutId);
                this.playLocalTTS(text, lang === 'sv' ? 'sv-SE' : lang);
            });
        }

        this.audio.onerror = () => {
            console.warn('Google TTS audio error, falling back.');
            if (this.timeoutId) clearTimeout(this.timeoutId);
            this.playLocalTTS(text, lang === 'sv' ? 'sv-SE' : lang);
        };
    },

    playLocalTTS(text, lang) {
        if (!window.speechSynthesis) return;

        // iOS Fix: Small delay after cancel
        const delay = this.isIOS ? 50 : 0;
        const speed = this.getSpeed();

        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = speed;
            utterance.volume = 1.0;

            // Find best voice
            if (lang === 'sv-SE' || lang.startsWith('sv')) {
                utterance.voice = this.getBestSwedishVoice();
            }

            window.speechSynthesis.speak(utterance);

            // iOS Fix: Force resume if it gets stuck
            if (this.isIOS) {
                setTimeout(() => {
                    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
                }, 100);
            }
        }, delay);
    },

    getBestSwedishVoice() {
        if (this.cachedSwedishVoice) return this.cachedSwedishVoice;

        const voices = window.speechSynthesis.getVoices();
        const svVoices = voices.filter(v => v.lang.startsWith('sv'));

        if (svVoices.length === 0) return null;

        // Priority: Alva (iOS), Klara, Google, etc.
        this.cachedSwedishVoice =
            svVoices.find(v => v.name.includes('Alva')) ||
            svVoices.find(v => v.name.includes('Klara')) ||
            svVoices.find(v => v.name.includes('Google')) ||
            svVoices[0];

        return this.cachedSwedishVoice;
    }
};

// Initialize voices on load (needed for Chrome/Safari async voice loading)
if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => {
        TTSManager.cachedSwedishVoice = null; // Reset cache
    };
}

// Auto-initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});
