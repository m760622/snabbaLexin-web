# Brand Title Style Documentation

## الستايل المختار: Glassmorphism + Synchronized Animation

تاريخ التحديث: 2025-12-20

---

## 📋 وصف الستايل

ستايل **Glassmorphism** مع حركة متناسقة للعناوين:

- العنوان السويدي يتحرك ببطء لليمين
- العنوان العربي يتحرك ببطء لليسار (عكسي)
- كلاهما يعمل بنفس السرعة (6 ثوانٍ)

---

## 🎨 CSS Classes

### العنوان السويدي `.brand-title-swe`

```css
.brand-title-swe {
    font-size: clamp(0.6rem, 2.2vw, 0.85rem);
    font-weight: 800;
    letter-spacing: 2px;
    white-space: nowrap;
    /* Glassmorphism Effect */
    background: rgba(59, 130, 246, 0.15);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    padding: 0.15rem 1rem;
    border-radius: 1rem;
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: #3b82f6;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 
        0 4px 16px rgba(59, 130, 246, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: floatRight 6s ease-in-out infinite;
}
```

### العنوان العربي `.brand-title-arb`

```css
.brand-title-arb {
    font-size: 1.2rem;
    font-weight: 700;
    font-family: var(--arabic-font);
    direction: rtl;
    white-space: nowrap;
    /* Glassmorphism Effect - Golden */
    background: rgba(251, 191, 36, 0.15);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    padding: 0.15rem 1rem;
    border-radius: 1rem;
    border: 1px solid rgba(251, 191, 36, 0.3);
    color: #f59e0b;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 
        0 4px 16px rgba(251, 191, 36, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: floatLeft 6s ease-in-out infinite;
}
```

---

## 🔄 Animations

```css
@keyframes floatRight {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(8px); }
}

@keyframes floatLeft {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-8px); }
}
```

---

## 🌙 Dark Mode

```css
[data-theme="dark"] .brand-title-swe {
    background: rgba(96, 165, 250, 0.2);
    border: 1px solid rgba(96, 165, 250, 0.4);
    color: #93c5fd;
    box-shadow: 
        0 4px 20px rgba(96, 165, 250, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

[data-theme="dark"] .brand-title-arb {
    background: rgba(251, 191, 36, 0.2);
    border: 1px solid rgba(251, 191, 36, 0.4);
    color: #fcd34d;
    box-shadow: 
        0 4px 20px rgba(251, 191, 36, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
```

---

## 📍 Location in style.css

- العنوان السويدي: الأسطر ~3714-3745
- العنوان العربي: الأسطر ~3963-3995
- Animations: الأسطر ~3995-4020
- Dark Mode: الأسطر ~4063-4085
