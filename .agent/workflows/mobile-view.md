---
description: Apply mobile view mode to all screens and future screens
---

# Mobile View Mode Rule

## Implementation
When creating or modifying any HTML screen/page, always include:

### 1. Viewport Meta Tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### 2. Mobile View Detection Script (before other scripts)
```html
<script>
    // Apply saved theme (default: dark)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Apply mobile view if enabled
    if (localStorage.getItem('mobileView') === 'true') {
        document.body.classList.add('iphone-view');
    }
</script>
```

### 3. Mobile-First CSS
```css
/* Mobile first approach */
body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    overflow-x: hidden;
    overscroll-behavior: none;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
}

/* iPhone view mode */
.iphone-view {
    max-width: 430px;
    margin: 0 auto;
}
```

### 4. Theme CSS Variables
```css
:root {
    /* Dark mode (default) */
    --bg-color: #0f172a;
    --card-bg: #1e293b;
    --text-color: #f8fafc;
    --text-muted: #94a3b8;
    --primary: #38bdf8;
}

[data-theme="light"] {
    --bg-color: #f8fafc;
    --card-bg: #ffffff;
    --text-color: #1e293b;
    --text-muted: #64748b;
}

body {
    background: var(--bg-color);
    color: var(--text-color);
}
```
