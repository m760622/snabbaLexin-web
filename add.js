// Initialize Theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Form Handling
const form = document.getElementById('addWordForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const swe = document.getElementById('swe').value.trim();
    const arb = document.getElementById('arb').value.trim();
    const type = document.getElementById('type').value.trim();
    const sweDef = document.getElementById('sweDef').value.trim();
    const arbDef = document.getElementById('arbDef').value.trim();
    const exSwe = document.getElementById('exSwe').value.trim();
    const exArb = document.getElementById('exArb').value.trim();

    if (!swe || !arb) {
        alert('Fyll i både svenska och arabiska ord / الرجاء إدخال الكلمة بالسويدية والعربية');
        return;
    }

    // Create ID
    const id = 'Custom' + Date.now();

    // Create array structure matching data.js
    // [ID, TYPE, SWE, ARB, ARB_DEF, SWE_DEF, FORMS, EX_SWE, EX_ARB, IDIOM_SWE, IDIOM_ARB]
    const newEntry = [
        id,
        type,
        swe,
        arb,
        arbDef,
        sweDef,
        '', // Forms (optional)
        exSwe,
        exArb,
        '', // Idiom Swe
        ''  // Idiom Arb
    ];

    // Save to localStorage
    let customWords = JSON.parse(localStorage.getItem('customWords') || '[]');
    customWords.push(newEntry);
    localStorage.setItem('customWords', JSON.stringify(customWords));

    alert('Ordet har sparats! / تم حفظ الكلمة!');
    window.location.href = 'index.html';
});
