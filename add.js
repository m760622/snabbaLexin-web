// Initialize Theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);



const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Form Handling
const form = document.getElementById('addWordForm');
const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get('edit');

// Populate form if editing
if (editId) {
    const customWords = JSON.parse(localStorage.getItem('customWords') || '[]');
    const item = customWords.find(word => word[0] === editId); // Index 0 is ID

    if (item) {
        document.getElementById('swe').value = item[2] || '';
        document.getElementById('arb').value = item[3] || '';
        document.getElementById('type').value = item[1] || '';
        document.getElementById('sweDef').value = item[5] || '';
        document.getElementById('arbDef').value = item[4] || '';
        document.getElementById('exSwe').value = item[7] || '';
        document.getElementById('exArb').value = item[8] || '';

        document.querySelector('h1').textContent = 'Redigera ord / تعديل كلمة';
        document.querySelector('.subtitle').textContent = 'Uppdatera ordet / تحديث الكلمة';
        document.querySelector('.submit-btn').textContent = 'Uppdatera / تحديث';
    }
}

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

    // Create or Reuse ID
    const id = editId || 'Custom' + Date.now();

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

    if (editId) {
        // Update existing
        const index = customWords.findIndex(word => word[0] === editId);
        if (index !== -1) {
            customWords[index] = newEntry;
        }
    } else {
        // Add new
        customWords.push(newEntry);
    }

    localStorage.setItem('customWords', JSON.stringify(customWords));

    // alert('Ordet har sparats! / تم حفظ الكلمة!');
    // alert('Ordet har sparats! / تم حفظ الكلمة!');
    window.location.href = `details.html?id=${id}&status=saved`;
});
