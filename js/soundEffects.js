class SoundManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.enabled = true;
    }

    playTone(freq, type, duration, startTime = 0, volume = 0.1) {
        if (!this.enabled) return;
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

        gainNode.gain.setValueAtTime(volume, this.ctx.currentTime + startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + startTime + duration);

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + startTime);
        osc.stop(this.ctx.currentTime + startTime + duration);
    }

    playClick() {
        // High pitched short pop
        this.playTone(800, 'sine', 0.1);
    }

    // Letter selection sound - soft pop
    playLetterSelect() {
        this.playTone(600 + Math.random() * 100, 'sine', 0.08, 0, 0.08);
    }

    // Word found - happy chime
    playWordFound() {
        this.playTone(523.25, 'sine', 0.15, 0, 0.12);       // C5
        this.playTone(659.25, 'sine', 0.15, 0.08, 0.12);    // E5
        this.playTone(783.99, 'sine', 0.2, 0.16, 0.12);     // G5
    }

    // Streak sound - ascending triumphant
    playStreak(streakLevel) {
        const baseFreq = 400 + (streakLevel * 50); // Higher pitch for higher streaks
        this.playTone(baseFreq, 'sine', 0.1, 0, 0.08);
        this.playTone(baseFreq * 1.25, 'sine', 0.1, 0.08, 0.08);
        this.playTone(baseFreq * 1.5, 'sine', 0.15, 0.16, 0.08);
    }

    playSuccess() {
        // Major chord arpeggio
        this.playTone(523.25, 'sine', 0.2, 0);       // C5
        this.playTone(659.25, 'sine', 0.2, 0.1);     // E5
        this.playTone(783.99, 'sine', 0.4, 0.2);     // G5
        this.playTone(1046.50, 'sine', 0.6, 0.3);    // C6
    }

    // Level complete - fanfare
    playLevelComplete() {
        this.playTone(523.25, 'sine', 0.15, 0, 0.1);
        this.playTone(659.25, 'sine', 0.15, 0.1, 0.1);
        this.playTone(783.99, 'sine', 0.15, 0.2, 0.1);
        this.playTone(1046.50, 'sine', 0.4, 0.3, 0.12);
        this.playTone(1318.51, 'sine', 0.5, 0.5, 0.1);
    }

    playError() {
        // Dissonant buzz
        this.playTone(150, 'sawtooth', 0.2, 0, 0.05);
        this.playTone(140, 'sawtooth', 0.2, 0.08, 0.05);
    }

    playShuffle() {
        // Rapid clicks
        for (let i = 0; i < 5; i++) {
            this.playTone(600 + (Math.random() * 200), 'square', 0.05, i * 0.05, 0.03);
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// Global instance
const soundManager = new SoundManager();

// Enable audio context on first interaction
document.addEventListener('click', () => {
    if (soundManager.ctx.state === 'suspended') {
        soundManager.ctx.resume();
    }
}, { once: true });
