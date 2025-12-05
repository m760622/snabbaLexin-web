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

// Auto-initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});
