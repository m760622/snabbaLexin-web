/**
 * SnabbaLexin Utilities
 * Shared logic for Theme, Favorites, and UI notifications.
 */

// ========================================
// Voice Search Manager - Web Speech API
// ========================================
const VoiceSearchManager = {
    recognition: null,
    isListening: false,
    onResult: null,

    // Check if voice search is supported
    isSupported() {
        return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    },

    // Initialize speech recognition
    init(onResultCallback) {
        if (!this.isSupported()) {
            console.warn('Voice search not supported in this browser');
            return false;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;

        // Default to Swedish
        this.recognition.lang = 'sv-SE';

        this.onResult = onResultCallback;

        // Handle results
        this.recognition.onresult = (event) => {
            const last = event.results.length - 1;
            const transcript = event.results[last][0].transcript;
            const isFinal = event.results[last].isFinal;

            if (this.onResult) {
                this.onResult(transcript, isFinal);
            }
        };

        // Handle end of speech
        this.recognition.onend = () => {
            this.isListening = false;
            this.updateUI(false);
        };

        // Handle errors
        this.recognition.onerror = (event) => {
            console.error('Voice search error:', event.error);
            this.isListening = false;
            this.updateUI(false);

            if (event.error === 'not-allowed') {
                showToast('Mikrofon nekad / الميكروفون مرفوض 🎤❌');
            } else if (event.error === 'no-speech') {
                showToast('Inget tal detekterat / لم يتم اكتشاف صوت 🔇');
            }
        };

        return true;
    },

    // Start listening
    start(lang = 'sv-SE') {
        if (!this.recognition) {
            if (!this.init(this.onResult)) return;
        }

        this.recognition.lang = lang;

        try {
            this.recognition.start();
            this.isListening = true;
            this.updateUI(true);

            // Haptic feedback
            if (typeof HapticManager !== 'undefined') {
                HapticManager.light();
            }
        } catch (e) {
            console.error('Voice start error:', e);
        }
    },

    // Stop listening
    stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            this.updateUI(false);
        }
    },

    // Toggle listening
    toggle(lang = 'sv-SE') {
        if (this.isListening) {
            this.stop();
        } else {
            this.start(lang);
        }
    },

    // Update microphone button UI
    updateUI(isActive) {
        const micBtn = document.getElementById('voiceSearchBtn');
        if (micBtn) {
            micBtn.classList.toggle('listening', isActive);
            micBtn.setAttribute('aria-pressed', isActive);
        }
    }
};

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
// Text Size Manager - Dynamic Font Sizing
// ========================================
const TextSizeManager = {
    // Size classes that can be applied
    SIZES: ['text-xs', 'text-sm', 'text-md', 'text-lg', 'text-xl'],

    // Thresholds for different container types
    THRESHOLDS: {
        // For flashcards (smaller container)
        flashcard: { xs: 50, sm: 30, md: 20, lg: 10 },
        // For cards (medium container)
        card: { xs: 80, sm: 50, md: 30, lg: 15 },
        // For modals (larger container)
        modal: { xs: 120, sm: 80, md: 50, lg: 25 },
        // Default
        default: { xs: 50, sm: 30, md: 20, lg: 10 }
    },

    /**
     * Apply dynamic font size to an element based on text length
     * @param {HTMLElement} element - The element to adjust
     * @param {string} text - The text content
     * @param {string} containerType - Type of container: 'flashcard', 'card', 'modal', or 'default'
     */
    apply(element, text, containerType = 'default') {
        if (!element || !text) return;

        // Remove all size classes first
        this.SIZES.forEach(size => element.classList.remove(size));

        const len = text.length;
        const thresholds = this.THRESHOLDS[containerType] || this.THRESHOLDS.default;

        // Determine appropriate size
        if (len > thresholds.xs) {
            element.classList.add('text-xs');
        } else if (len > thresholds.sm) {
            element.classList.add('text-sm');
        } else if (len > thresholds.md) {
            element.classList.add('text-md');
        } else if (len > thresholds.lg) {
            element.classList.add('text-lg');
        } else {
            element.classList.add('text-xl');
        }
    },

    /**
     * Auto-apply sizing to all elements with data-auto-size attribute
     * Usage: <span data-auto-size="flashcard">Long text here</span>
     */
    autoApply() {
        const elements = document.querySelectorAll('[data-auto-size]');
        elements.forEach(el => {
            const containerType = el.getAttribute('data-auto-size') || 'default';
            this.apply(el, el.textContent, containerType);
        });
    },

    /**
     * Observe an element and auto-resize when content changes
     * @param {HTMLElement} element - Element to observe
     * @param {string} containerType - Container type for thresholds
     */
    observe(element, containerType = 'default') {
        if (!element) return;

        // Initial apply
        this.apply(element, element.textContent, containerType);

        // Create mutation observer for content changes
        const observer = new MutationObserver(() => {
            this.apply(element, element.textContent, containerType);
        });

        observer.observe(element, { childList: true, characterData: true, subtree: true });
        return observer;
    }
};

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

        // Load color theme
        const colorTheme = localStorage.getItem('colorTheme') || 'default';
        this.setColorTheme(colorTheme, false);

        // Initialize color theme selector if exists
        const colorSelect = document.getElementById('colorThemeSelect');
        if (colorSelect) {
            colorSelect.value = colorTheme;
            colorSelect.addEventListener('change', (e) => {
                this.setColorTheme(e.target.value, true);
            });
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
    },

    // Color Theme Management
    setColorTheme(theme, showMessage = true) {
        if (theme === 'default') {
            document.documentElement.removeAttribute('data-color-theme');
        } else {
            document.documentElement.setAttribute('data-color-theme', theme);
        }
        localStorage.setItem('colorTheme', theme);

        if (showMessage) {
            const themeNames = {
                'default': 'Standard / افتراضي 🎨',
                'ocean': 'Ocean Blue / أزرق محيطي 🌊',
                'sunset': 'Sunset Orange / برتقالي غروب 🌅',
                'forest': 'Forest Green / أخضر غابي 🌲',
                'purple': 'Purple Haze / بنفسجي ضبابي 💜'
            };
            showToast(themeNames[theme] || theme);
        }
    },

    getColorTheme() {
        return localStorage.getItem('colorTheme') || 'default';
    }
};

// ========================================
// Export/Import Manager
// ========================================
const ExportManager = {
    // Collect all user data for export
    collectData() {
        return {
            exportDate: new Date().toISOString(),
            version: '1.0',
            data: {
                // Favorites
                favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),

                // Custom words
                customWords: JSON.parse(localStorage.getItem('customWords') || '[]'),

                // Learning progress
                learningProgress: JSON.parse(localStorage.getItem('learningProgress') || '{}'),

                // Spaced repetition data
                spacedRepetition: JSON.parse(localStorage.getItem('spacedRepetition') || '{}'),

                // Achievements
                achievements: JSON.parse(localStorage.getItem('achievements') || '{}'),

                // Settings
                settings: {
                    theme: localStorage.getItem('theme') || 'dark',
                    colorTheme: localStorage.getItem('colorTheme') || 'default',
                    ttsSpeed: localStorage.getItem('ttsSpeed') || '0.85',
                    mobileView: localStorage.getItem('mobileView') || 'false',
                    reminderEnabled: localStorage.getItem('reminderEnabled') || 'false',
                    reminderTime: localStorage.getItem('reminderTime') || '09:00'
                }
            }
        };
    },

    // Export to JSON file
    exportToJSON() {
        const data = this.collectData();
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create download link
        const a = document.createElement('a');
        a.href = url;
        a.download = `snabba-lexin-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast('Data exporterad! / تم تصدير البيانات! 📥');

        if (typeof HapticManager !== 'undefined') {
            HapticManager.success();
        }
    },

    // Import from JSON file
    importFromJSON(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                if (!data.version || !data.data) {
                    throw new Error('Invalid backup format');
                }

                // Import data
                if (data.data.favorites) {
                    localStorage.setItem('favorites', JSON.stringify(data.data.favorites));
                }
                if (data.data.customWords) {
                    localStorage.setItem('customWords', JSON.stringify(data.data.customWords));
                }
                if (data.data.learningProgress) {
                    localStorage.setItem('learningProgress', JSON.stringify(data.data.learningProgress));
                }
                if (data.data.spacedRepetition) {
                    localStorage.setItem('spacedRepetition', JSON.stringify(data.data.spacedRepetition));
                }
                if (data.data.achievements) {
                    localStorage.setItem('achievements', JSON.stringify(data.data.achievements));
                }
                if (data.data.settings) {
                    Object.entries(data.data.settings).forEach(([key, value]) => {
                        localStorage.setItem(key, value);
                    });
                }

                showToast('Data importerad! Laddar om... / تم استيراد البيانات! ⬇️');

                // Reload page to apply changes
                setTimeout(() => window.location.reload(), 1500);

            } catch (err) {
                console.error('Import error:', err);
                showToast('Import misslyckades / فشل الاستيراد ❌');
            }
        };
        reader.readAsText(file);
    },

    // Get summary of current data for display
    getSummary() {
        const data = this.collectData().data;
        return {
            favoritesCount: data.favorites.length,
            customWordsCount: data.customWords.length,
            hasProgress: Object.keys(data.learningProgress).length > 0,
            hasAchievements: Object.keys(data.achievements).length > 0
        };
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
        { id: 'word_expert', name: '1000 ord', nameAr: '1000 كلمة', icon: '🎓', condition: (d) => d.allTime.uniqueWordsViewed.length >= 1000 },
        { id: 'streak_3', name: '3 dagars streak', nameAr: 'سلسلة 3 أيام', icon: '🔥', condition: (d) => d.allTime.currentStreak >= 3 },
        { id: 'streak_7', name: 'Veckans streak', nameAr: 'سلسلة أسبوع', icon: '⚡', condition: (d) => d.allTime.currentStreak >= 7 },
        { id: 'streak_30', name: 'Månads streak', nameAr: 'سلسلة شهر', icon: '💎', condition: (d) => d.allTime.currentStreak >= 30 },
        { id: 'streak_100', name: '100 dagars streak', nameAr: 'سلسلة 100 يوم', icon: '🌟', condition: (d) => d.allTime.currentStreak >= 100 },
        { id: 'daily_10', name: '10 ord idag', nameAr: '10 كلمات اليوم', icon: '⭐', condition: (d) => d.daily.wordsViewed.length >= 10 },
        { id: 'daily_goal', name: 'Dagligt mål', nameAr: 'الهدف اليومي', icon: '🎯', condition: (d) => d.daily.wordsViewed.length >= (parseInt(localStorage.getItem('dailyGoal')) || 10) },
        { id: 'gamer', name: 'Spelaren', nameAr: 'اللاعب', icon: '🎮', condition: (d) => d.allTime.totalGamesPlayed >= 10 },
        { id: 'super_gamer', name: '50 spel', nameAr: '50 لعبة', icon: '🏅', condition: (d) => d.allTime.totalGamesPlayed >= 50 },
        { id: 'tts_master', name: '100 uttal', nameAr: '100 نطق', icon: '🎙️', condition: (d) => d.allTime.totalTtsUsed >= 100 },
        { id: 'search_pro', name: '500 sökningar', nameAr: '500 بحث', icon: '🔎', condition: (d) => d.allTime.totalSearches >= 500 }
    ],

    // Daily goal management
    DAILY_GOAL_KEY: 'dailyGoal',

    getDailyGoal() {
        return parseInt(localStorage.getItem(this.DAILY_GOAL_KEY)) || 10;
    },

    setDailyGoal(goal) {
        const validGoal = Math.max(1, Math.min(100, parseInt(goal) || 10));
        localStorage.setItem(this.DAILY_GOAL_KEY, validGoal.toString());
        showToast(`Dagligt mål: ${validGoal} ord / الهدف اليومي: ${validGoal} كلمة 🎯`);
        return validGoal;
    },

    getDailyProgress() {
        const data = this.getData();
        const goal = this.getDailyGoal();
        const current = data.daily.wordsViewed.length;
        const percentage = Math.min(100, Math.round((current / goal) * 100));
        return { current, goal, percentage };
    },

    // Weekly Goal Management
    WEEKLY_GOAL_KEY: 'weeklyGoal',

    getWeeklyGoal() {
        return parseInt(localStorage.getItem(this.WEEKLY_GOAL_KEY)) || 50;
    },

    setWeeklyGoal(goal) {
        const validGoal = Math.max(10, Math.min(500, parseInt(goal) || 50));
        localStorage.setItem(this.WEEKLY_GOAL_KEY, validGoal.toString());
        showToast(`Veckomål: ${validGoal} ord / الهدف الأسبوعي: ${validGoal} كلمة 🎯`);
        this.dispatchProgressEvent('weeklyGoalUpdated', { goal: validGoal });
        return validGoal;
    },

    getWeeklyProgress() {
        const data = this.getData();
        const goal = this.getWeeklyGoal();
        const current = data.weekly.wordsViewed || 0;
        const percentage = Math.min(100, Math.round((current / goal) * 100));
        return { current, goal, percentage };
    },

    // Activity history for charts (last 7 days)
    ACTIVITY_HISTORY_KEY: 'activityHistory',

    getActivityHistory() {
        try {
            const saved = localStorage.getItem(this.ACTIVITY_HISTORY_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    },

    updateActivityHistory() {
        const today = this.getTodayString();
        const data = this.getData();
        let history = this.getActivityHistory();

        // Find or create today's entry
        const todayIndex = history.findIndex(h => h.date === today);
        const todayData = {
            date: today,
            words: data.daily.wordsViewed.length,
            searches: data.daily.searches,
            games: data.daily.gamesPlayed,
            tts: data.daily.ttsUsed
        };

        if (todayIndex >= 0) {
            history[todayIndex] = todayData;
        } else {
            history.push(todayData);
        }

        // Keep only last 7 days
        history = history
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 7)
            .reverse();

        localStorage.setItem(this.ACTIVITY_HISTORY_KEY, JSON.stringify(history));
        return history;
    },

    // Share progress
    async shareProgress() {
        const stats = this.getStats();
        const dailyProgress = this.getDailyProgress();

        const shareText = `📚 SnabbaLexin - Min progress / تقدمي

🔥 Streak: ${stats.allTime.currentStreak} dagar / أيام
📖 Ord idag: ${dailyProgress.current}/${dailyProgress.goal} (${dailyProgress.percentage}%)
🏆 Totalt: ${stats.allTime.uniqueWords} unika ord / كلمة فريدة
🎮 Spel: ${stats.allTime.totalGames}
🏅 Prestationer: ${stats.achievements.length}/${this.ACHIEVEMENTS.length}

Lär dig svenska med SnabbaLexin! 🇸🇪🇸🇦`;

        // Try Web Share API first
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'SnabbaLexin Progress',
                    text: shareText
                });
                showToast('Delat! / تمت المشاركة! 📤');
                HapticManager.trigger('success');
                return true;
            } catch (e) {
                if (e.name !== 'AbortError') {
                    console.warn('Share failed:', e);
                }
            }
        }

        // Fallback: Copy to clipboard
        try {
            await navigator.clipboard.writeText(shareText);
            showToast('Kopierad till urklipp! / تم النسخ! 📋');
            HapticManager.trigger('success');
            return true;
        } catch (e) {
            showToast('Kunde inte dela / فشلت المشاركة ❌');
            return false;
        }
    },

    // Get all achievements with unlock status
    getAllAchievements() {
        const data = this.getData();
        return this.ACHIEVEMENTS.map(achievement => {
            const unlocked = data.achievements.find(a => a.id === achievement.id);
            return {
                ...achievement,
                unlocked: !!unlocked,
                unlockedAt: unlocked ? unlocked.unlockedAt : null
            };
        });
    },

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

        // Update activity history
        this.updateActivityHistory();
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
        localStorage.removeItem(this.ACTIVITY_HISTORY_KEY);
        showToast('Progress återställd / تم إعادة التعيين');
    }
};

// ========================================
// Spaced Repetition Manager (SM-2 Algorithm)
// ========================================
const SpacedRepetitionManager = {
    STORAGE_KEY: 'spacedRepetitionData',

    getData() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || {};
        } catch (e) {
            return {};
        }
    },

    saveData(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },

    // Get word review data or create defaults
    getWordData(wordId) {
        const data = this.getData();
        if (!data[wordId]) {
            data[wordId] = {
                interval: 1,          // Days until next review
                easeFactor: 2.5,      // Ease factor (starts at 2.5)
                nextReview: new Date().toISOString().split('T')[0], // Today
                reviewCount: 0,
                lastQuality: null
            };
            this.saveData(data);
        }
        return data[wordId];
    },

    // SM-2 Algorithm: Calculate next review date based on quality (0-5)
    calculateNextReview(quality, wordId) {
        const data = this.getData();
        const wordData = data[wordId] || this.getWordData(wordId);

        // SM-2 Algorithm
        let newEF = wordData.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        newEF = Math.max(1.3, newEF); // Minimum EF is 1.3

        let newInterval;
        if (quality < 3) {
            // Incorrect response - reset interval
            newInterval = 1;
        } else {
            if (wordData.reviewCount === 0) {
                newInterval = 1;
            } else if (wordData.reviewCount === 1) {
                newInterval = 6;
            } else {
                newInterval = Math.round(wordData.interval * newEF);
            }
        }

        // Calculate next review date
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + newInterval);

        // Update word data
        data[wordId] = {
            interval: newInterval,
            easeFactor: newEF,
            nextReview: nextDate.toISOString().split('T')[0],
            reviewCount: quality >= 3 ? wordData.reviewCount + 1 : 0,
            lastQuality: quality
        };
        this.saveData(data);

        return data[wordId];
    },

    // Get words due for review today (from favorites)
    getDueWords() {
        const today = new Date().toISOString().split('T')[0];
        const data = this.getData();
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        const dueWords = favorites.filter(wordId => {
            const wordData = data[wordId];
            if (!wordData) return true; // Never reviewed
            return wordData.nextReview <= today;
        });

        return dueWords;
    },

    // Get count of due words
    getDueCount() {
        return this.getDueWords().length;
    }
};

// ========================================
// Flashcard Manager
// ========================================
const FlashcardManager = {
    currentCards: [],
    currentIndex: 0,
    reviewedCount: 0,
    correctCount: 0,
    isFlipped: false,

    init() {
        const self = this; // Store reference for event listeners
        const modal = document.getElementById('flashcardModal');
        const closeBtn = document.getElementById('closeFlashcard');
        const flashcard = document.getElementById('flashcard');
        const controls = document.getElementById('flashcardControls');
        const speakBtn = document.getElementById('flashcardSpeakBtn');

        if (!modal) return;

        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Flip card on click
        if (flashcard) {
            flashcard.addEventListener('click', () => {
                self.flipCard();
            });
        }

        // Speak button
        if (speakBtn) {
            speakBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const currentWord = self.currentCards[self.currentIndex];
                if (currentWord && typeof TTSManager !== 'undefined') {
                    TTSManager.speak(currentWord[2], 'sv'); // COL_SWE = 2
                }
            });
        }

        // Rating buttons
        if (controls) {
            controls.querySelectorAll('.fc-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const quality = parseInt(e.currentTarget.dataset.quality);
                    self.rateCard(quality);
                });
            });
        }
    },

    startSession(source = 'favorites') {
        const container = document.getElementById('flashcardInlineContainer');
        if (!container) return;

        // Get cards based on source
        if (source === 'favorites') {
            const favIds = JSON.parse(localStorage.getItem('favorites') || '[]');
            if (favIds.length < 1) {
                showToast('Lägg till favoriter först! / أضف مفضلات أولاً ⭐');
                return;
            }

            // Get word data from dictionary
            if (typeof dictionaryData !== 'undefined') {
                this.currentCards = dictionaryData.filter(
                    word => favIds.includes(String(word[0])) // COL_ID = 0
                );
            }
        } else if (source === 'due') {
            const dueIds = SpacedRepetitionManager.getDueWords();
            if (dueIds.length < 1) {
                showToast('Inga ord att granska! / لا توجد كلمات للمراجعة 🎉');
                return;
            }
            if (typeof dictionaryData !== 'undefined') {
                this.currentCards = dictionaryData.filter(
                    word => dueIds.includes(String(word[0]))
                );
            }
        }

        // Shuffle cards
        this.currentCards = this.currentCards.sort(() => Math.random() - 0.5).slice(0, 10);

        // Reset state
        this.currentIndex = 0;
        this.reviewedCount = 0;
        this.correctCount = 0;
        this.isFlipped = false;

        // Update UI with inline IDs
        this.updateUIInline();
        document.getElementById('flashcardInline')?.classList.remove('flipped');
        document.getElementById('flashcardControlsInline').style.display = 'none';

        // Show container
        container.style.display = 'block';

        // Close settings menu
        const settingsMenu = document.getElementById('settingsMenu');
        if (settingsMenu) settingsMenu.style.display = 'none';

        // Scroll to flashcard
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Attach flip listener for inline card
        const flashcardEl = document.getElementById('flashcardInline');
        if (flashcardEl && !flashcardEl.hasAttribute('data-flip-attached')) {
            flashcardEl.setAttribute('data-flip-attached', 'true');
            flashcardEl.addEventListener('click', (e) => {
                // Don't flip if clicking speak button
                if (e.target.closest('.flashcard-speak-btn-inline')) return;

                const isFlipped = flashcardEl.classList.contains('flipped');

                // Toggle flip state
                if (isFlipped) {
                    // Flip back to Swedish
                    flashcardEl.classList.remove('flipped');
                    FlashcardManager.isFlipped = false;
                } else {
                    // Flip to Arabic
                    flashcardEl.classList.add('flipped');
                    FlashcardManager.isFlipped = true;
                }

                // Show controls when first flipped
                const controlsEl = document.getElementById('flashcardControlsInline');
                if (controlsEl && FlashcardManager.isFlipped) {
                    controlsEl.style.display = 'grid';
                }

                // Haptic feedback
                if (typeof HapticManager !== 'undefined') {
                    HapticManager.trigger('light');
                }
            });
        }


        // Attach close button listener
        const closeBtn = document.getElementById('closeFlashcardInline');
        if (closeBtn && !closeBtn.hasAttribute('data-close-attached')) {
            closeBtn.setAttribute('data-close-attached', 'true');
            closeBtn.addEventListener('click', () => {
                container.style.display = 'none';
            });
        }

        // Attach rating buttons listeners
        const controlsEl = document.getElementById('flashcardControlsInline');
        if (controlsEl && !controlsEl.hasAttribute('data-controls-attached')) {
            controlsEl.setAttribute('data-controls-attached', 'true');
            controlsEl.querySelectorAll('.fc-btn-inline').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const quality = parseInt(e.currentTarget.dataset.quality);
                    FlashcardManager.rateCardInline(quality);
                });
            });
        }

        // Attach speak button
        const speakBtn = document.getElementById('flashcardSpeakBtnInline');
        if (speakBtn && !speakBtn.hasAttribute('data-speak-attached')) {
            speakBtn.setAttribute('data-speak-attached', 'true');
            speakBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const currentWord = FlashcardManager.currentCards[FlashcardManager.currentIndex];
                if (currentWord && typeof TTSManager !== 'undefined') {
                    TTSManager.speak(currentWord[2], 'sv'); // COL_SWE = 2
                }
            });
        }

        // Attach front speak button
        const speakFrontBtn = document.getElementById('flashcardSpeakFrontInline');
        if (speakFrontBtn && !speakFrontBtn.hasAttribute('data-speak-attached')) {
            speakFrontBtn.setAttribute('data-speak-attached', 'true');
            speakFrontBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const currentWord = FlashcardManager.currentCards[FlashcardManager.currentIndex];
                if (currentWord && typeof TTSManager !== 'undefined') {
                    TTSManager.speak(currentWord[2], 'sv'); // COL_SWE = 2
                }
            });
        }

        // Attach favorite button - Always visible
        const favBtn = document.getElementById('flashcardFavBtn');
        if (favBtn && !favBtn.hasAttribute('data-fav-attached')) {
            favBtn.setAttribute('data-fav-attached', 'true');
            favBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const currentWord = FlashcardManager.currentCards[FlashcardManager.currentIndex];
                if (!currentWord) return;

                const wordId = String(currentWord[0]); // COL_ID = 0
                const isNowFavorite = FavoritesManager.toggle(wordId, favBtn);

                // Update button emoji
                favBtn.textContent = isNowFavorite ? '❤️' : '🤍';

                // Trigger animation
                if (isNowFavorite) {
                    favBtn.classList.add('active');
                    setTimeout(() => favBtn.classList.remove('active'), 600);
                }
            });
        }

        // Update favorite state for current card
        this.updateFavButtonState();
    },

    // Update favorite button state based on current card
    updateFavButtonState() {
        const favBtn = document.getElementById('flashcardFavBtn');
        if (!favBtn) return;

        const currentWord = this.currentCards[this.currentIndex];
        if (!currentWord) return;

        const wordId = String(currentWord[0]);
        const isFav = FavoritesManager.isFavorite(wordId);
        favBtn.textContent = isFav ? '❤️' : '🤍';
    },

    updateUIInline() {
        const currentWord = this.currentCards[this.currentIndex];
        if (!currentWord) return;

        const frontText = currentWord[2] || ''; // COL_SWE = 2
        const backText = currentWord[3] || ''; // COL_ARB = 3

        const frontEl = document.getElementById('flashcardFrontInline');
        const backEl = document.getElementById('flashcardBackInline');

        if (frontEl) {
            frontEl.textContent = frontText;
            // Use global TextSizeManager for dynamic sizing
            TextSizeManager.apply(frontEl, frontText, 'flashcard');
        }

        if (backEl) {
            backEl.textContent = backText;
            TextSizeManager.apply(backEl, backText, 'flashcard');
        }

        document.getElementById('flashcardCurrentInline').textContent = this.currentIndex + 1;
        document.getElementById('flashcardTotalInline').textContent = this.currentCards.length;

        // Update favorite button state for current card
        this.updateFavButtonState();
    },


    rateCardInline(quality) {
        const currentWord = this.currentCards[this.currentIndex];
        if (!currentWord) return;

        const wordId = String(currentWord[0]);
        SpacedRepetitionManager.calculateNextReview(quality, wordId);

        this.reviewedCount++;
        if (quality >= 3) {
            this.correctCount++;
        }

        document.getElementById('fcCorrectInline').textContent = this.correctCount;

        this.currentIndex++;
        if (this.currentIndex >= this.currentCards.length) {
            this.endSessionInline();
        } else {
            this.showNextCardInline();
        }
    },

    showNextCardInline() {
        const flashcard = document.getElementById('flashcardInline');
        const controls = document.getElementById('flashcardControlsInline');

        flashcard?.classList.remove('flipped');
        controls.style.display = 'none';
        this.isFlipped = false;

        this.updateUIInline();
    },

    endSessionInline() {
        const container = document.getElementById('flashcardInlineContainer');
        const percentage = this.reviewedCount > 0 ?
            Math.round((this.correctCount / this.reviewedCount) * 100) : 0;

        let emoji = '🎉';
        if (percentage < 50) emoji = '💪';
        else if (percentage < 80) emoji = '👍';

        showToast(`${emoji} ${this.correctCount}/${this.reviewedCount} rätt (${percentage}%)`);

        setTimeout(() => {
            if (container) container.style.display = 'none';
        }, 1500);

        if (typeof ProgressManager !== 'undefined') {
            ProgressManager.trackGame('flashcards', this.correctCount);
        }
    },

    flipCard() {
        const flashcard = document.getElementById('flashcard');
        const controls = document.getElementById('flashcardControls');

        if (!this.isFlipped) {
            flashcard?.classList.add('flipped');
            controls.style.display = 'grid';
            this.isFlipped = true;

            // Haptic feedback
            if (typeof HapticManager !== 'undefined') {
                HapticManager.trigger('light');
            }
        }
    },

    rateCard(quality) {
        const currentWord = this.currentCards[this.currentIndex];
        if (!currentWord) return;

        const wordId = String(currentWord[0]); // COL_ID = 0

        // Record in spaced repetition
        SpacedRepetitionManager.calculateNextReview(quality, wordId);

        // Update stats
        this.reviewedCount++;
        if (quality >= 3) {
            this.correctCount++;
        }

        // Update UI stats
        document.getElementById('fcReviewedCount').textContent = this.reviewedCount;
        document.getElementById('fcCorrectCount').textContent = this.correctCount;

        // Move to next card or end session
        this.currentIndex++;
        if (this.currentIndex >= this.currentCards.length) {
            this.endSession();
        } else {
            this.showNextCard();
        }
    },

    showNextCard() {
        const flashcard = document.getElementById('flashcard');
        const controls = document.getElementById('flashcardControls');

        // Reset flip
        flashcard?.classList.remove('flipped');
        controls.style.display = 'none';
        this.isFlipped = false;

        // Update UI
        this.updateUI();
    },

    updateUI() {
        const currentWord = this.currentCards[this.currentIndex];
        if (!currentWord) return;

        document.getElementById('flashcardFront').textContent = currentWord[2] || ''; // COL_SWE = 2
        document.getElementById('flashcardBack').textContent = currentWord[3] || ''; // COL_ARB = 3
        document.getElementById('flashcardCurrent').textContent = this.currentIndex + 1;
        document.getElementById('flashcardTotal').textContent = this.currentCards.length;
    },

    endSession() {
        const modal = document.getElementById('flashcardModal');
        if (!modal) return;

        // Show summary
        const percentage = this.reviewedCount > 0 ?
            Math.round((this.correctCount / this.reviewedCount) * 100) : 0;

        let emoji = '🎉';
        if (percentage < 50) emoji = '💪';
        else if (percentage < 80) emoji = '👍';

        showToast(`${emoji} ${this.correctCount}/${this.reviewedCount} rätt (${percentage}%)`);

        // Close modal after delay
        setTimeout(() => {
            modal.style.display = 'none';
        }, 1500);

        // Track in progress
        if (typeof ProgressManager !== 'undefined') {
            ProgressManager.trackGame('flashcards', this.correctCount);
        }
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

    // Send Word of the Day notification
    async sendWODNotification() {
        if (Notification.permission !== 'granted') {
            const granted = await this.requestPermission();
            if (!granted) return;
        }

        try {
            // Get a random word from dictionary
            if (typeof dictionaryData === 'undefined' || dictionaryData.length === 0) {
                console.error('Dictionary data not available');
                return;
            }

            const randomWord = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
            const wordId = randomWord[0];  // COL_ID
            const word = randomWord[1];     // COL_SWE
            const translation = randomWord[2]; // COL_ARB

            // Send via Service Worker
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: 'SHOW_WOD_NOTIFICATION',
                    word: word,
                    translation: translation,
                    wordId: wordId
                });
                console.log('WOD notification sent:', word);
            } else {
                // Fallback
                new Notification('📚 Dagens Ord / كلمة اليوم', {
                    body: `${word}\n${translation}`,
                    icon: './icon.png',
                    tag: 'word-of-day'
                });
            }

            showToast('📚 Dagens ord: ' + word);
        } catch (e) {
            console.error('Error sending WOD notification:', e);
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
            // Add natural pauses for better pronunciation
            let speakText = text;

            // iOS Fix: Add punctuation for better pronunciation
            if (this.isIOS && !text.match(/[.!?]$/)) {
                speakText = text + '.';
            }

            const utterance = new SpeechSynthesisUtterance(speakText);
            utterance.lang = lang;

            // More natural speaking parameters
            utterance.rate = speed * 0.9; // Slightly slower for clarity
            utterance.pitch = 1.0; // Natural pitch
            utterance.volume = 1.0;

            // Find best voice with priority for natural-sounding voices
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

            console.log('Playing Local TTS:', speakText, 'lang:', lang, 'rate:', speed * 0.9);
        }, delay);
    },

    getBestSwedishVoice() {
        if (this.cachedSwedishVoice) return this.cachedSwedishVoice;

        const voices = window.speechSynthesis.getVoices();
        const svVoices = voices.filter(v => v.lang.startsWith('sv'));

        if (svVoices.length === 0) return null;

        // Priority: Premium/Natural sounding voices first
        // Alva (iOS premium), Klara, Oskar, then Google, then any
        this.cachedSwedishVoice =
            svVoices.find(v => v.name.includes('Alva')) ||
            svVoices.find(v => v.name.includes('Premium') || v.name.includes('Enhanced')) ||
            svVoices.find(v => v.name.includes('Klara')) ||
            svVoices.find(v => v.name.includes('Oskar')) ||
            svVoices.find(v => v.name.includes('Google')) ||
            svVoices.find(v => !v.name.includes('Compact')) || // Avoid compact/low quality
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

// ========================================
// Shake to Toggle Theme
// ========================================
const ShakeManager = {
    threshold: 15,        // Acceleration threshold to detect shake
    timeout: 1000,        // Cooldown between shakes
    lastShakeTime: 0,
    lastX: null,
    lastY: null,
    lastZ: null,
    isListening: false,

    init() {
        if (!window.DeviceMotionEvent) {
            console.log('[Shake] DeviceMotion not supported');
            return;
        }

        // iOS 13+ requires permission
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            // Will request on first user interaction
            document.addEventListener('click', () => this.requestPermission(), { once: true });
            document.addEventListener('touchstart', () => this.requestPermission(), { once: true });
        } else {
            this.startListening();
        }
    },

    async requestPermission() {
        if (this.isListening) return;

        try {
            const permission = await DeviceMotionEvent.requestPermission();
            if (permission === 'granted') {
                this.startListening();
            }
        } catch (e) {
            console.warn('[Shake] Permission denied:', e);
        }
    },

    startListening() {
        if (this.isListening) return;
        this.isListening = true;

        window.addEventListener('devicemotion', (e) => this.handleMotion(e), true);
        console.log('[Shake] Started listening for shake gestures');
    },

    handleMotion(event) {
        const acceleration = event.accelerationIncludingGravity;
        if (!acceleration) return;

        const { x, y, z } = acceleration;
        const now = Date.now();

        if (this.lastX !== null) {
            const deltaX = Math.abs(x - this.lastX);
            const deltaY = Math.abs(y - this.lastY);
            const deltaZ = Math.abs(z - this.lastZ);

            if ((deltaX > this.threshold || deltaY > this.threshold || deltaZ > this.threshold) &&
                (now - this.lastShakeTime > this.timeout)) {

                this.lastShakeTime = now;
                this.onShake();
            }
        }

        this.lastX = x;
        this.lastY = y;
        this.lastZ = z;
    },

    onShake() {
        console.log('[Shake] Shake detected! Toggling theme...');
        ThemeManager.toggle();
        HapticManager.trigger('medium');
    }
};

// ========================================
// Long Press to Speak (TTS)
// ========================================
const LongPressTTS = {
    pressTimer: null,
    pressDuration: 500, // ms to hold for long press
    currentElement: null,

    init() {
        // Target speakable elements - including entire cards for Swedish pronunciation
        const speakableSelectors = [
            // Search result cards - will speak Swedish only
            '.card',
            // Word of the Day
            '.wod-swe', '.wod-arb',
            '.wod-def-text', '.wod-example-text', '.wod-idiom-swe', '.wod-idiom-arb',
            // Search results
            '.word-swe', '.word-arb',
            // Details page
            '.word-swe-hero', '.word-arb-hero',
            '.def-swe-detail', '.def-arb-detail',
            '.ex-swe-detail', '.ex-arb-detail',
            '.form-chip',
            // Custom attribute
            '[data-speakable]'
        ];

        document.addEventListener('touchstart', (e) => this.handleTouchStart(e, speakableSelectors), { passive: true });
        document.addEventListener('touchend', () => this.handleTouchEnd(), { passive: true });
        document.addEventListener('touchmove', () => this.handleTouchEnd(), { passive: true });

        // Also support long-press on mouse (for desktop testing)
        document.addEventListener('mousedown', (e) => this.handleTouchStart(e, speakableSelectors));
        document.addEventListener('mouseup', () => this.handleTouchEnd());
        document.addEventListener('mouseleave', () => this.handleTouchEnd());

        console.log('[LongPressTTS] Initialized');
    },

    handleTouchStart(event, selectors) {
        const target = event.target;

        // Check if target matches any speakable selector
        const speakableElement = selectors.reduce((found, selector) => {
            if (found) return found;
            return target.closest(selector);
        }, null);

        if (!speakableElement) return;

        this.currentElement = speakableElement;

        this.pressTimer = setTimeout(() => {
            this.speak(speakableElement);
        }, this.pressDuration);
    },

    handleTouchEnd() {
        if (this.pressTimer) {
            clearTimeout(this.pressTimer);
            this.pressTimer = null;
        }
        this.currentElement = null;
    },

    speak(element) {
        let text = '';
        let lang = 'sv';

        // Check if this is a search result card - always speak Swedish only
        const resultCard = element.closest('.card');
        if (resultCard) {
            // Get Swedish word from the .word-swe element
            const sweElement = resultCard.querySelector('.word-swe, h2');
            text = sweElement?.textContent?.trim() || '';
            lang = 'sv';
        } else {
            // For other elements, use the element's text
            text = element.textContent?.trim();

            // Detect language based on text content or class
            const isArabic = /[\u0600-\u06FF]/.test(text) ||
                element.classList.contains('wod-arb') ||
                element.classList.contains('arb-text') ||
                element.classList.contains('word-arb') ||
                element.dir === 'rtl';

            lang = isArabic ? 'ar' : 'sv';
        }

        if (!text || text.length < 1) return;

        if (typeof TTSManager !== 'undefined') {
            TTSManager.speak(text, lang);
            HapticManager.trigger('success');

            // Visual feedback
            if (typeof AnimationManager !== 'undefined') {
                AnimationManager.animate(element, 'pulse');
            }

            showToast(`🔊 ${text.substring(0, 20)}${text.length > 20 ? '...' : ''}`);
        }
    }
};

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

    // Initialize shake to toggle theme
    ShakeManager.init();

    // Initialize long press to speak
    LongPressTTS.init();
});
