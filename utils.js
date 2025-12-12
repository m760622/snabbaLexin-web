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
// Progress Tracking Manager
// ========================================
const ProgressManager = {
    STORAGE_KEY: 'learningProgress',

    // Default data structure
    getDefaultData() {
        return {
            daily: {
                date: this.getTodayString(),
                searches: 0,
                wordsViewed: [],
                ttsUsed: 0,
                gamesPlayed: 0
            },
            weekly: {
                weekStart: this.getWeekStartString(),
                searches: 0,
                wordsViewed: 0,
                gamesPlayed: 0
            },
            allTime: {
                totalSearches: 0,
                totalWordsViewed: 0,
                totalTtsUsed: 0,
                totalGamesPlayed: 0,
                uniqueWordsViewed: [],
                firstUse: new Date().toISOString(),
                currentStreak: 0,
                longestStreak: 0,
                lastActiveDate: null
            },
            achievements: []
        };
    },

    // Date helpers
    getTodayString() {
        return new Date().toISOString().split('T')[0];
    },

    getWeekStartString() {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        const monday = new Date(now.setDate(diff));
        return monday.toISOString().split('T')[0];
    },

    // Load data from localStorage
    getData() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                // Check if daily data needs reset
                if (data.daily.date !== this.getTodayString()) {
                    data.daily = {
                        date: this.getTodayString(),
                        searches: 0,
                        wordsViewed: [],
                        ttsUsed: 0,
                        gamesPlayed: 0
                    };
                }
                // Check if weekly data needs reset
                if (data.weekly.weekStart !== this.getWeekStartString()) {
                    data.weekly = {
                        weekStart: this.getWeekStartString(),
                        searches: 0,
                        wordsViewed: 0,
                        gamesPlayed: 0
                    };
                }
                return data;
            }
        } catch (e) {
            console.error('Error loading progress:', e);
        }
        return this.getDefaultData();
    },

    // Save data to localStorage
    saveData(data) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving progress:', e);
        }
    },

    // Track a search event
    trackSearch(query) {
        if (!query || query.length < 2) return;

        const data = this.getData();
        data.daily.searches++;
        data.weekly.searches++;
        data.allTime.totalSearches++;
        this.updateStreak(data);
        this.saveData(data);
        this.checkAchievements(data);

        // Dispatch event for UI updates
        this.dispatchProgressEvent('search', { query, dailyCount: data.daily.searches });
    },

    // Track viewing a word
    trackWordView(wordId, word) {
        if (!wordId) return;

        const data = this.getData();

        // Track daily views (allow duplicates for session)
        if (!data.daily.wordsViewed.includes(wordId)) {
            data.daily.wordsViewed.push(wordId);
        }

        // Track weekly views count
        data.weekly.wordsViewed++;

        // Track all-time views
        data.allTime.totalWordsViewed++;

        // Track unique words
        if (!data.allTime.uniqueWordsViewed.includes(wordId)) {
            data.allTime.uniqueWordsViewed.push(wordId);
        }

        this.updateStreak(data);
        this.saveData(data);
        this.checkAchievements(data);

        this.dispatchProgressEvent('wordView', {
            wordId,
            word,
            dailyCount: data.daily.wordsViewed.length,
            totalUnique: data.allTime.uniqueWordsViewed.length
        });
    },

    // Track TTS usage
    trackTTS(word) {
        const data = this.getData();
        data.daily.ttsUsed++;
        data.allTime.totalTtsUsed++;
        this.saveData(data);

        this.dispatchProgressEvent('tts', { word, dailyCount: data.daily.ttsUsed });
    },

    // Track game played
    trackGame(gameName, score) {
        const data = this.getData();
        data.daily.gamesPlayed++;
        data.weekly.gamesPlayed++;
        data.allTime.totalGamesPlayed++;
        this.updateStreak(data);
        this.saveData(data);
        this.checkAchievements(data);

        this.dispatchProgressEvent('game', { gameName, score, dailyCount: data.daily.gamesPlayed });
    },

    // Update streak
    updateStreak(data) {
        const today = this.getTodayString();
        const lastActive = data.allTime.lastActiveDate;

        if (lastActive === today) {
            // Already active today, no change
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];

        if (lastActive === yesterdayString) {
            // Consecutive day - increase streak
            data.allTime.currentStreak++;
        } else if (lastActive !== today) {
            // Streak broken - reset to 1
            data.allTime.currentStreak = 1;
        }

        // Update longest streak
        if (data.allTime.currentStreak > data.allTime.longestStreak) {
            data.allTime.longestStreak = data.allTime.currentStreak;
        }

        data.allTime.lastActiveDate = today;
    },

    // Get current stats
    getStats() {
        const data = this.getData();
        return {
            today: {
                searches: data.daily.searches,
                wordsViewed: data.daily.wordsViewed.length,
                ttsUsed: data.daily.ttsUsed,
                gamesPlayed: data.daily.gamesPlayed
            },
            week: {
                searches: data.weekly.searches,
                wordsViewed: data.weekly.wordsViewed,
                gamesPlayed: data.weekly.gamesPlayed
            },
            allTime: {
                totalSearches: data.allTime.totalSearches,
                totalWordsViewed: data.allTime.totalWordsViewed,
                uniqueWords: data.allTime.uniqueWordsViewed.length,
                totalGames: data.allTime.totalGamesPlayed,
                currentStreak: data.allTime.currentStreak,
                longestStreak: data.allTime.longestStreak,
                daysSinceStart: Math.floor((new Date() - new Date(data.allTime.firstUse)) / (1000 * 60 * 60 * 24))
            },
            achievements: data.achievements
        };
    },

    // Achievement definitions
    ACHIEVEMENTS: [
        { id: 'first_search', name: 'Första sökning', nameAr: 'البحث الأول', icon: '🔍', condition: (d) => d.allTime.totalSearches >= 1 },
        { id: 'word_explorer', name: '10 ord', nameAr: '10 كلمات', icon: '📚', condition: (d) => d.allTime.uniqueWordsViewed.length >= 10 },
        { id: 'word_collector', name: '50 ord', nameAr: '50 كلمة', icon: '📖', condition: (d) => d.allTime.uniqueWordsViewed.length >= 50 },
        { id: 'word_master', name: '100 ord', nameAr: '100 كلمة', icon: '🏆', condition: (d) => d.allTime.uniqueWordsViewed.length >= 100 },
        { id: 'word_legend', name: '500 ord', nameAr: '500 كلمة', icon: '👑', condition: (d) => d.allTime.uniqueWordsViewed.length >= 500 },
        { id: 'streak_3', name: '3 dagars streak', nameAr: 'سلسلة 3 أيام', icon: '🔥', condition: (d) => d.allTime.currentStreak >= 3 },
        { id: 'streak_7', name: 'Veckans streak', nameAr: 'سلسلة أسبوع', icon: '⚡', condition: (d) => d.allTime.currentStreak >= 7 },
        { id: 'streak_30', name: 'Månads streak', nameAr: 'سلسلة شهر', icon: '💎', condition: (d) => d.allTime.currentStreak >= 30 },
        { id: 'daily_10', name: '10 ord idag', nameAr: '10 كلمات اليوم', icon: '⭐', condition: (d) => d.daily.wordsViewed.length >= 10 },
        { id: 'gamer', name: 'Spelaren', nameAr: 'اللاعب', icon: '🎮', condition: (d) => d.allTime.totalGamesPlayed >= 10 }
    ],

    // Check and unlock achievements
    checkAchievements(data) {
        let newAchievements = [];

        this.ACHIEVEMENTS.forEach(achievement => {
            const alreadyUnlocked = data.achievements.find(a => a.id === achievement.id);
            if (!alreadyUnlocked && achievement.condition(data)) {
                const unlocked = {
                    id: achievement.id,
                    unlockedAt: new Date().toISOString()
                };
                data.achievements.push(unlocked);
                newAchievements.push(achievement);
            }
        });

        if (newAchievements.length > 0) {
            this.saveData(data);
            newAchievements.forEach(a => {
                this.dispatchProgressEvent('achievement', a);
                // Show toast for new achievement
                showToast(`🎉 ${a.icon} ${a.name} / ${a.nameAr}`);
                // Haptic feedback
                if (typeof HapticManager !== 'undefined') {
                    HapticManager.trigger('success');
                }
            });
        }
    },

    // Dispatch custom event for UI updates
    dispatchProgressEvent(type, detail) {
        const event = new CustomEvent('progressUpdate', {
            detail: { type, ...detail }
        });
        document.dispatchEvent(event);
    },

    // Reset all progress (for testing)
    reset() {
        localStorage.removeItem(this.STORAGE_KEY);
        showToast('Progress återställd / تم إعادة التعيين');
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

    toggle(id, buttonElement = null) {
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

        // Haptic feedback (if HapticManager is available)
        if (typeof HapticManager !== 'undefined') {
            HapticManager.trigger(isAdded ? 'success' : 'light');
        }

        // Animation feedback (if AnimationManager and button available)
        if (buttonElement && typeof AnimationManager !== 'undefined') {
            AnimationManager.animate(buttonElement, isAdded ? 'heartbeat' : 'pulse');
        }

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
// Reminder Notifications Manager
// ========================================
const ReminderManager = {
    STORAGE_KEY: 'reminderSettings',
    scheduledTimeoutId: null,

    // Motivational messages for reminders
    MESSAGES: [
        { sv: 'Dags att lära sig nya ord! 📚', ar: 'حان وقت تعلم كلمات جديدة!' },
        { sv: 'Din streak väntar på dig! 🔥', ar: 'سلسلتك في انتظارك!' },
        { sv: 'Bara 5 minuter av lärande! ⏰', ar: '5 دقائق فقط من التعلم!' },
        { sv: 'Håll din inlärning igång! 💪', ar: 'حافظ على استمرار تعلمك!' },
        { sv: 'Nya ord väntar på dig! ✨', ar: 'كلمات جديدة تنتظرك!' },
        { sv: 'Träna ditt ordförråd idag! 🎯', ar: 'درّب مفرداتك اليوم!' },
        { sv: 'En dag utan lärande är en förlorad dag! 📖', ar: 'يوم بدون تعلم يوم ضائع!' },
        { sv: 'Ditt svenska blir bättre varje dag! 🇸🇪', ar: 'سويديتك تتحسن كل يوم!' }
    ],

    // Default settings
    getDefaultSettings() {
        return {
            enabled: false,
            time: '18:00',
            lastNotified: null,
            permissionGranted: false
        };
    },

    // Load settings from localStorage
    getSettings() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            return saved ? JSON.parse(saved) : this.getDefaultSettings();
        } catch (e) {
            console.error('Error loading reminder settings:', e);
            return this.getDefaultSettings();
        }
    },

    // Save settings to localStorage
    saveSettings(settings) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
        } catch (e) {
            console.error('Error saving reminder settings:', e);
        }
    },

    // Check if notifications are supported
    isSupported() {
        return 'Notification' in window && 'serviceWorker' in navigator;
    },

    // Request notification permission
    async requestPermission() {
        if (!this.isSupported()) {
            showToast('Aviseringar stöds inte / الإشعارات غير مدعومة ❌');
            return false;
        }

        try {
            const permission = await Notification.requestPermission();
            const settings = this.getSettings();
            settings.permissionGranted = permission === 'granted';
            this.saveSettings(settings);

            if (permission === 'granted') {
                showToast('Aviseringar aktiverade! / تم تفعيل الإشعارات! ✅');
                return true;
            } else if (permission === 'denied') {
                showToast('Aviseringar blockerade / الإشعارات محظورة ⚠️');
                return false;
            }
            return false;
        } catch (e) {
            console.error('Error requesting permission:', e);
            return false;
        }
    },

    // Enable reminders
    async enable(time = '18:00') {
        const settings = this.getSettings();

        // Request permission if not granted
        if (Notification.permission !== 'granted') {
            const granted = await this.requestPermission();
            if (!granted) {
                return false;
            }
        }

        settings.enabled = true;
        settings.time = time;
        settings.permissionGranted = true;
        this.saveSettings(settings);

        // Schedule the reminder
        this.scheduleReminder();

        showToast(`Påminnelse inställd kl ${time} / تم ضبط التذكير ⏰`);
        return true;
    },

    // Disable reminders
    disable() {
        const settings = this.getSettings();
        settings.enabled = false;
        this.saveSettings(settings);

        // Cancel scheduled reminder
        if (this.scheduledTimeoutId) {
            clearTimeout(this.scheduledTimeoutId);
            this.scheduledTimeoutId = null;
        }

        showToast('Påminnelse avstängd / تم إيقاف التذكير 🔕');
    },

    // Update reminder time
    updateTime(time) {
        const settings = this.getSettings();
        settings.time = time;
        this.saveSettings(settings);

        if (settings.enabled) {
            this.scheduleReminder();
        }
    },

    // Schedule the next reminder
    scheduleReminder() {
        const settings = this.getSettings();
        if (!settings.enabled) return;

        // Clear existing timeout
        if (this.scheduledTimeoutId) {
            clearTimeout(this.scheduledTimeoutId);
        }

        // Calculate ms until the scheduled time
        const now = new Date();
        const [hours, minutes] = settings.time.split(':').map(Number);
        const targetTime = new Date();
        targetTime.setHours(hours, minutes, 0, 0);

        // If the time has passed today, schedule for tomorrow
        if (targetTime <= now) {
            targetTime.setDate(targetTime.getDate() + 1);
        }

        const msUntilReminder = targetTime - now;

        console.log(`Reminder scheduled for ${targetTime.toLocaleString()}, in ${Math.round(msUntilReminder / 1000 / 60)} minutes`);

        // Schedule the notification
        this.scheduledTimeoutId = setTimeout(() => {
            this.sendNotification();
            // Schedule the next day's reminder
            this.scheduleReminder();
        }, msUntilReminder);
    },

    // Get a random motivational message
    getRandomMessage() {
        return this.MESSAGES[Math.floor(Math.random() * this.MESSAGES.length)];
    },

    // Send a notification
    async sendNotification() {
        if (Notification.permission !== 'granted') return;

        const settings = this.getSettings();
        const today = new Date().toISOString().split('T')[0];

        // Don't send if already notified today
        if (settings.lastNotified === today) {
            console.log('Already notified today, skipping');
            return;
        }

        const message = this.getRandomMessage();

        try {
            // Try Service Worker notification first (works in background)
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: 'SHOW_NOTIFICATION',
                    title: 'SnabbaLexin 📚',
                    body: `${message.sv}\n${message.ar}`,
                    icon: './icon.png',
                    badge: './icon.png',
                    tag: 'daily-reminder',
                    data: { url: './' }
                });
            } else {
                // Fallback to regular notification
                new Notification('SnabbaLexin 📚', {
                    body: `${message.sv}\n${message.ar}`,
                    icon: './icon.png',
                    badge: './icon.png',
                    tag: 'daily-reminder'
                });
            }

            // Update last notified date
            settings.lastNotified = today;
            this.saveSettings(settings);

            console.log('Reminder notification sent');
        } catch (e) {
            console.error('Error sending notification:', e);
        }
    },

    // Send a test notification immediately
    async sendTestNotification() {
        if (Notification.permission !== 'granted') {
            const granted = await this.requestPermission();
            if (!granted) return;
        }

        const message = this.getRandomMessage();

        try {
            // Try Service Worker notification first
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: 'SHOW_NOTIFICATION',
                    title: 'SnabbaLexin - Test 🧪',
                    body: `${message.sv}\n${message.ar}`,
                    icon: './icon.png',
                    badge: './icon.png',
                    tag: 'test-reminder',
                    data: { url: './' }
                });
            } else {
                new Notification('SnabbaLexin - Test 🧪', {
                    body: `${message.sv}\n${message.ar}`,
                    icon: './icon.png',
                    badge: './icon.png',
                    tag: 'test-reminder'
                });
            }

            showToast('Testavisering skickad! / تم إرسال إشعار اختباري! 🔔');
            HapticManager.trigger('success');
        } catch (e) {
            console.error('Error sending test notification:', e);
            showToast('Kunde inte skicka avisering / فشل إرسال الإشعار ❌');
        }
    },

    // Initialize on page load
    init() {
        const settings = this.getSettings();
        if (settings.enabled && settings.permissionGranted) {
            this.scheduleReminder();
        }
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
    audioUnlocked: false, // iOS audio unlock state

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

    // iOS requires user gesture to unlock audio - call this on first touch/click
    unlockAudio() {
        if (this.audioUnlocked) return;

        // Unlock HTML5 Audio
        const silentAudio = new Audio();
        silentAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
        silentAudio.play().then(() => {
            silentAudio.pause();
            console.log('iOS Audio unlocked (HTML5)');
        }).catch(() => { });

        // Unlock Web Speech API
        if (window.speechSynthesis) {
            const silentUtterance = new SpeechSynthesisUtterance('');
            silentUtterance.volume = 0;
            window.speechSynthesis.speak(silentUtterance);
            console.log('iOS SpeechSynthesis unlocked');
        }

        this.audioUnlocked = true;
    },

    speak(text, lang = 'sv') {
        if (!text || text.trim() === '') return;
        const cleanText = text.replace(/\'/g, "\'").trim();

        // Prevent rapid repeats of the same text
        if (cleanText === this.lastSpokenText && this.audio && !this.audio.paused) {
            return;
        }
        this.lastSpokenText = cleanText;

        // Track TTS usage in ProgressManager
        if (typeof ProgressManager !== 'undefined') {
            ProgressManager.trackTTS(cleanText);
        }

        // Stop current
        this.stop();

        // On iOS, try local TTS first (more reliable), fallback to Google
        if (this.isIOS) {
            this.playLocalTTS(cleanText, lang === 'sv' ? 'sv-SE' : lang);
        } else {
            // On desktop/Android, try Google TTS first (better quality)
            this.playGoogleTTS(cleanText, lang);
        }
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

        // Timeout fallback: if audio doesn't start within 3 seconds, use local TTS
        this.timeoutId = setTimeout(() => {
            if (this.audio && (this.audio.readyState < 2 || this.audio.paused)) {
                console.warn('Google TTS timeout (3s), falling back to local.');
                this.audio.pause();
                this.playLocalTTS(text, lang === 'sv' ? 'sv-SE' : lang);
            }
        }, 3000);

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
        if (!window.speechSynthesis) {
            console.warn('SpeechSynthesis not available');
            return;
        }

        // iOS Fix: Cancel any pending speech and add delay
        window.speechSynthesis.cancel();
        const delay = this.isIOS ? 100 : 0;
        const speed = this.getSpeed();

        setTimeout(() => {
            // iOS Fix: Add punctuation for better pronunciation
            let speakText = text;
            if (this.isIOS && !text.match(/[.!?]$/)) {
                speakText = text + '.';
            }

            const utterance = new SpeechSynthesisUtterance(speakText);
            utterance.lang = lang;
            utterance.rate = speed;
            utterance.volume = 1.0;

            // Find best voice
            if (lang === 'sv-SE' || lang.startsWith('sv')) {
                const voice = this.getBestSwedishVoice();
                if (voice) utterance.voice = voice;
            }

            // iOS Fix: Ensure voices are loaded
            if (window.speechSynthesis.getVoices().length === 0) {
                window.speechSynthesis.onvoiceschanged = () => {
                    if (lang === 'sv-SE' || lang.startsWith('sv')) {
                        const voice = this.getBestSwedishVoice();
                        if (voice) utterance.voice = voice;
                    }
                    window.speechSynthesis.speak(utterance);
                };
            } else {
                window.speechSynthesis.speak(utterance);
            }

            // iOS Fix: Force resume if it gets stuck (check multiple times)
            if (this.isIOS) {
                const checkAndResume = () => {
                    if (window.speechSynthesis.paused) {
                        window.speechSynthesis.resume();
                    }
                };
                setTimeout(checkAndResume, 100);
                setTimeout(checkAndResume, 300);
                setTimeout(checkAndResume, 500);
            }

            console.log('Playing Local TTS:', speakText, 'lang:', lang);
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

        console.log('Selected Swedish voice:', this.cachedSwedishVoice?.name);
        return this.cachedSwedishVoice;
    }
};

// Initialize voices on load (needed for Chrome/Safari async voice loading)
if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => {
        TTSManager.cachedSwedishVoice = null; // Reset cache
    };
}

// ========================================
// Haptic Feedback Manager
// ========================================
const HapticManager = {
    isSupported: 'vibrate' in navigator,

    // Vibration patterns (in milliseconds)
    patterns: {
        light: [10],           // Very short tap
        medium: [20],          // Short tap
        heavy: [30],           // Longer tap
        success: [10, 50, 10], // Double tap for success
        error: [50, 30, 50, 30, 50], // Triple pulse for error
        warning: [30, 50, 30], // Double pulse for warning
        selection: [5],        // Ultra-light for selections
    },

    /**
     * Trigger haptic feedback
     * @param {string} type - Type of feedback: 'light', 'medium', 'heavy', 'success', 'error', 'warning', 'selection'
     */
    trigger(type = 'light') {
        if (!this.isSupported) return false;

        const pattern = this.patterns[type] || this.patterns.light;

        try {
            navigator.vibrate(pattern);
            return true;
        } catch (e) {
            console.warn('Haptic feedback failed:', e);
            return false;
        }
    },

    /**
     * Stop any ongoing vibration
     */
    stop() {
        if (this.isSupported) {
            navigator.vibrate(0);
        }
    },

    /**
     * Custom vibration pattern
     * @param {number[]} pattern - Array of durations [vibrate, pause, vibrate, pause, ...]
     */
    custom(pattern) {
        if (!this.isSupported) return false;

        try {
            navigator.vibrate(pattern);
            return true;
        } catch (e) {
            return false;
        }
    }
};

// ========================================
// Animation Manager
// ========================================
const AnimationManager = {
    /**
     * Add animation class and remove after completion
     * @param {HTMLElement} element - Target element
     * @param {string} animationClass - CSS class name
     * @param {number} duration - Duration in ms (default: auto-detect from CSS)
     */
    animate(element, animationClass, duration = null) {
        if (!element) return;

        // Remove class first (in case it's already applied)
        element.classList.remove(animationClass);

        // Force reflow to restart animation
        void element.offsetWidth;

        // Add animation class
        element.classList.add(animationClass);

        // Remove after animation completes
        const cleanupDuration = duration || this.getAnimationDuration(element) || 500;
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, cleanupDuration);
    },

    /**
     * Get computed animation duration from CSS
     */
    getAnimationDuration(element) {
        const style = getComputedStyle(element);
        const duration = style.animationDuration || style.transitionDuration || '0s';
        return parseFloat(duration) * (duration.includes('ms') ? 1 : 1000);
    },

    /**
     * Create ripple effect on click
     * @param {Event} event - Click/touch event
     * @param {HTMLElement} container - Container element
     */
    createRipple(event, container) {
        if (!container) container = event.currentTarget;
        if (!container) return;

        // Ensure container has proper positioning
        const position = getComputedStyle(container).position;
        if (position === 'static') {
            container.style.position = 'relative';
        }
        container.style.overflow = 'hidden';

        // Calculate ripple position
        const rect = container.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = (event.clientX || event.touches?.[0]?.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
        const y = (event.clientY || event.touches?.[0]?.clientY || rect.top + rect.height / 2) - rect.top - size / 2;

        // Create ripple element
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;

        container.appendChild(ripple);

        // Remove after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    },

    /**
     * Add staggered animation to children
     * @param {HTMLElement} parent - Parent container
     * @param {string} animationClass - Animation class to apply
     * @param {number} delayStep - Delay between each child (ms)
     */
    staggerChildren(parent, animationClass, delayStep = 50) {
        if (!parent) return;

        const children = parent.children;
        Array.from(children).forEach((child, index) => {
            child.style.animationDelay = `${index * delayStep}ms`;
            child.classList.add(animationClass);
        });
    }
};

// ========================================
// Enhanced Button/Element Interactions
// ========================================

/**
 * Add haptic and visual feedback to buttons
 * Call this on page load for elements with data-haptic attribute
 */
function initHapticButtons() {
    document.querySelectorAll('[data-haptic]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = btn.dataset.haptic || 'light';
            HapticManager.trigger(type);
        });

        btn.addEventListener('touchstart', (e) => {
            AnimationManager.createRipple(e, btn);
        }, { passive: true });
    });
}

/**
 * Add ripple effect to all buttons
 */
function initRippleEffect() {
    document.querySelectorAll('button, .btn, .action-btn, .menu-item, .card').forEach(el => {
        if (!el.dataset.noRipple) {
            el.addEventListener('click', (e) => {
                AnimationManager.createRipple(e, el);
            });
        }
    });
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();

    // Initialize haptic buttons if available
    if (HapticManager.isSupported) {
        initHapticButtons();
    }

    // Initialize ripple effect
    initRippleEffect();

    // Initialize reminder notifications
    if (typeof ReminderManager !== 'undefined') {
        ReminderManager.init();
    }
});
