/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                     مجموعة ستايلات العناوين - Title Styles Collection
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * هذا الملف يحتوي على مجموعة من ستايلات العناوين المتاحة للاستخدام.
 * كل ستايل موثق مع CSS و JavaScript اللازمة لتطبيقه.
 * 
 * @author SnabbaLexin Team
 * @version 1.0.0
 * @date 2024-12-20
 */

const TitleStyles = {

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * Style 1: Split Reveal (الظهور المنفصل) ✅ ACTIVE
     * ═══════════════════════════════════════════════════════════════════════
     * 
     * الحروف السويدية تظهر واحدة تلو الأخرى مع دوران 3D
     * الكلمات العربية تظهر ككتل متصلة للحفاظ على اتصال الحروف
     */
    splitReveal: {
        name: "Split Reveal",
        nameAr: "الظهور المنفصل",
        description: "Letters/words appear one by one with 3D rotation",
        isActive: true,

        // CSS Classes
        cssClasses: {
            swedish: "reveal-char",
            arabic: "reveal-word"
        },

        // CSS Keyframes
        keyframes: ["letterReveal", "wordRevealArabic"],

        // JavaScript function to apply
        applySwedish: function (element) {
            if (!element) return;
            const text = element.textContent;
            element.innerHTML = '';
            [...text].forEach((char, i) => {
                const span = document.createElement('span');
                span.className = 'reveal-char';
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.animationDelay = `${i * 0.08}s`;
                element.appendChild(span);
            });
        },

        applyArabic: function (element) {
            if (!element) return;
            const words = element.textContent.trim().split(' ');
            element.innerHTML = '';
            words.forEach((word, i) => {
                const span = document.createElement('span');
                span.className = 'reveal-word';
                span.textContent = word;
                span.style.animationDelay = `${i * 0.2}s`;
                element.appendChild(span);
                if (i < words.length - 1) {
                    element.appendChild(document.createTextNode('\u00A0'));
                }
            });
        }
    },

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * Style 2: Neon Outline (التوهج النيون)
     * ═══════════════════════════════════════════════════════════════════════
     * 
     * حدود نيون متوهجة مع تأثير نبض مستمر
     */
    neonOutline: {
        name: "Neon Outline",
        nameAr: "التوهج النيون",
        description: "Glowing neon outline with pulse animation",
        isActive: false,

        cssClasses: {
            swedish: "neon-title-swe",
            arabic: "neon-title-arb"
        },

        keyframes: ["neonPulse", "neonPulseGold"],

        // CSS code (for reference)
        css: `
            .neon-title-swe {
                color: transparent;
                -webkit-text-fill-color: transparent;
                -webkit-text-stroke: 1.5px #3b82f6;
                text-shadow:
                    0 0 5px #3b82f6,
                    0 0 10px #3b82f6,
                    0 0 20px #3b82f6,
                    0 0 40px #1d4ed8;
                animation: neonPulse 2s ease-in-out infinite;
            }
            
            .neon-title-arb {
                color: transparent;
                -webkit-text-fill-color: transparent;
                -webkit-text-stroke: 1.5px #fbbf24;
                text-shadow:
                    0 0 5px #fbbf24,
                    0 0 10px #fbbf24,
                    0 0 20px #fbbf24,
                    0 0 40px #b45309;
                animation: neonPulseGold 2s ease-in-out infinite;
            }
        `
    },

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * Style 3: Gradient Flow (التدرج المتدفق)
     * ═══════════════════════════════════════════════════════════════════════
     * 
     * تدرج لوني متحرك يتدفق عبر النص
     */
    gradientFlow: {
        name: "Gradient Flow",
        nameAr: "التدرج المتدفق",
        description: "Animated color gradient flowing through text",
        isActive: false,

        cssClasses: {
            swedish: "gradient-flow-swe",
            arabic: "gradient-flow-arb"
        },

        keyframes: ["gradientFlow"],

        css: `
            .gradient-flow-swe {
                background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #667eea);
                background-size: 300% 100%;
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: gradientFlow 4s ease infinite;
            }
            
            @keyframes gradientFlow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `
    },

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * Style 4: Glassmorphism (الزجاجي)
     * ═══════════════════════════════════════════════════════════════════════
     * 
     * نص شفاف مع خلفية زجاجية ضبابية
     */
    glassmorphism: {
        name: "Glassmorphism",
        nameAr: "النص الزجاجي",
        description: "Frosted glass effect on text",
        isActive: false,

        cssClasses: {
            swedish: "glass-title-swe",
            arabic: "glass-title-arb"
        },

        css: `
            .glass-title-swe {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                padding: 0.5rem 1rem;
                border-radius: 1rem;
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #3b82f6;
            }
        `
    },

    /**
     * ═══════════════════════════════════════════════════════════════════════
     * Style 5: 3D Parallax (متعدد الطبقات)
     * ═══════════════════════════════════════════════════════════════════════
     * 
     * نص ثلاثي الأبعاد مع ظلال ملونة متدرجة
     */
    parallax3D: {
        name: "3D Parallax",
        nameAr: "متعدد الطبقات",
        description: "3D layered text with colorful shadows",
        isActive: false,

        cssClasses: {
            swedish: "parallax-title-swe",
            arabic: "parallax-title-arb"
        },

        css: `
            .parallax-title-swe {
                color: #3b82f6;
                text-shadow: 
                    1px 1px 0 #60a5fa,
                    2px 2px 0 #93c5fd,
                    3px 3px 0 #bfdbfe,
                    4px 4px 15px rgba(0,0,0,0.3);
                transform: perspective(500px) rotateX(10deg);
            }
        `
    }
};

/**
 * ═══════════════════════════════════════════════════════════════════════
 * Helper Functions
 * ═══════════════════════════════════════════════════════════════════════
 */

// Get current active style
function getActiveStyle() {
    for (const key in TitleStyles) {
        if (TitleStyles[key].isActive) {
            return TitleStyles[key];
        }
    }
    return null;
}

// Apply a specific style
function applyTitleStyle(styleName) {
    const style = TitleStyles[styleName];
    if (!style) {
        console.error(`Style "${styleName}" not found`);
        return;
    }

    // Deactivate all styles
    for (const key in TitleStyles) {
        TitleStyles[key].isActive = false;
    }

    // Activate selected style
    style.isActive = true;

    // Apply to elements if functions exist
    const sweTitle = document.querySelector('.brand-title-swe');
    const arbTitle = document.querySelector('.brand-title-arb');

    if (style.applySwedish && sweTitle) {
        style.applySwedish(sweTitle);
    }
    if (style.applyArabic && arbTitle) {
        style.applyArabic(arbTitle);
    }

    console.log(`Applied style: ${style.name} (${style.nameAr})`);
}

// List all available styles
function listAvailableStyles() {
    console.log("═══════════════════════════════════════════════════");
    console.log("     Available Title Styles - ستايلات العناوين المتاحة");
    console.log("═══════════════════════════════════════════════════");

    for (const key in TitleStyles) {
        const style = TitleStyles[key];
        const status = style.isActive ? "✅ ACTIVE" : "○";
        console.log(`${status} ${key}: ${style.name} (${style.nameAr})`);
        console.log(`   ${style.description}`);
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TitleStyles, getActiveStyle, applyTitleStyle, listAvailableStyles };
}
