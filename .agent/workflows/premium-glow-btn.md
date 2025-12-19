# Premium Glow Button Style - أزرار التوهج المميزة

## الاسم: `premium-glow-btn`

## كيفية الاستخدام

أضف الفئة `premium-glow-btn` لأي عنصر لتطبيق التصميم المميز.

```html
<button class="premium-glow-btn">زر مميز</button>
<div class="premium-glow-btn">عنصر قابل للنقر</div>
```

## للألوان المخصصة

استخدم الفئات الإضافية:

- `premium-glow-btn--cyan` - سماوي (للمستويات)
- `premium-glow-btn--green` - أخضر زمردي (للعملات)
- `premium-glow-btn--purple` - بنفسجي (للإحصائيات)
- `premium-glow-btn--gold` - ذهبي (للإنجازات)

```html
<button class="premium-glow-btn premium-glow-btn--gold">🏆 إنجاز</button>
```

## CSS Code

```css
/* ============================================
   PREMIUM GLOW BUTTON - أزرار التوهج المميزة
   ============================================ */

.premium-glow-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1.2rem;
    height: 40px;
    border-radius: 20px;
    border: 2px solid rgba(168, 85, 247, 0.4);
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.15));
    color: #e2e8f0;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 
        0 4px 15px rgba(168, 85, 247, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: premiumGlowPulse 3s ease-in-out infinite;
}

/* Shimmer Effect */
.premium-glow-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
    transition: left 0.5s ease;
}

.premium-glow-btn:hover::before {
    left: 100%;
}

/* Hover State */
.premium-glow-btn:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
        0 8px 25px rgba(168, 85, 247, 0.35),
        0 0 20px rgba(168, 85, 247, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* Active State */
.premium-glow-btn:active {
    transform: translateY(-1px) scale(0.98);
}

/* Glow Pulse Animation */
@keyframes premiumGlowPulse {
    0%, 100% {
        box-shadow: 
            0 4px 15px rgba(168, 85, 247, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    50% {
        box-shadow: 
            0 4px 20px rgba(168, 85, 247, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }
}

/* ==== Color Variants ==== */

/* Cyan - سماوي */
.premium-glow-btn--cyan {
    background: linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.15));
    border-color: rgba(34, 211, 238, 0.5);
    animation: cyanGlowPulse 3s ease-in-out infinite;
}
.premium-glow-btn--cyan:hover {
    border-color: #22d3ee;
    box-shadow: 0 8px 25px rgba(34, 211, 238, 0.35), 0 0 20px rgba(34, 211, 238, 0.2);
}

/* Green - أخضر زمردي */
.premium-glow-btn--green {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.15));
    border-color: rgba(16, 185, 129, 0.5);
    animation: greenGlowPulse 3s ease-in-out infinite;
}
.premium-glow-btn--green:hover {
    border-color: #10b981;
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.35), 0 0 20px rgba(16, 185, 129, 0.2);
}

/* Gold - ذهبي */
.premium-glow-btn--gold {
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.2), rgba(251, 191, 36, 0.15));
    border-color: rgba(251, 191, 36, 0.5);
    animation: goldGlowPulse 3s ease-in-out infinite;
}
.premium-glow-btn--gold:hover {
    border-color: #fbbf24;
    box-shadow: 0 8px 25px rgba(251, 191, 36, 0.35), 0 0 20px rgba(251, 191, 36, 0.2);
}

/* ==== Animation Keyframes ==== */
@keyframes cyanGlowPulse {
    0%, 100% { box-shadow: 0 4px 15px rgba(34, 211, 238, 0.2); }
    50% { box-shadow: 0 4px 20px rgba(34, 211, 238, 0.35); }
}
@keyframes greenGlowPulse {
    0%, 100% { box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2); }
    50% { box-shadow: 0 4px 20px rgba(16, 185, 129, 0.35); }
}
@keyframes goldGlowPulse {
    0%, 100% { box-shadow: 0 4px 15px rgba(251, 191, 36, 0.2); }
    50% { box-shadow: 0 4px 20px rgba(251, 191, 36, 0.35); }
}
```

## الميزات

1. ✨ **Shimmer Effect** - وميض أبيض عند التمرير
2. 💫 **Glow Pulse** - توهج نابض كل 3 ثواني
3. ⬆️ **Lift Effect** - ارتفاع 3px + تكبير 2% عند hover
4. 🎨 **4 Color Variants** - بنفسجي، سماوي، أخضر، ذهبي
5. 📱 **Responsive** - يعمل على جميع الأجهزة
