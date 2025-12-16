# 📚 Lessons Learned & Coding Standards
>
> This file documents common mistakes, strict rules, and false positives encountered during the development of SnabbaLexin. **Consult this before making changes to avoid regression.**

> [!IMPORTANT]
> **Workflow Rule:** Every time an error is fixed or a false positive is identified, it **MUST** be added to this file (if not already present). preventing repetition is critical.

## 🎨 CSS Best Practices

### 1. Vendor Prefix Ordering (CRITICAL)

**Rule:** Vendor prefixed properties MUST come **before** the standard property.
**Why:** Browsers typically use the last valid declaration they see. If the standard property is first and supported (but implementation differs), the prefixed version might override it unexpectedly or cause linting errors.

```css
/* ❌ WRONG */
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);

/* ✅ CORRECT */
-webkit-backdrop-filter: blur(10px);
backdrop-filter: blur(10px);
```

**Applies to:** `backdrop-filter`, `user-select`, `appearance`, `background-clip`.

### 2. No Inline Styles

**Rule:** Do not use `style="..."` in HTML.
**Solution:** Use utility classes in `style.css`.

- `display: none` → `.hidden`
- `visibility: hidden` → `.invisible`
- `color: ...` → Use CSS variables or utility classes (e.g., `.text-danger`)

**Exception:** Dynamic values changed by JavaScript (e.g., progress bar width).

### 3. Cross-Browser Scrollbars

**Rule:** To hide scrollbars, you must support both Firefox and WebKit.

```css
/* Firefox */
scrollbar-width: none;

/* Chrome, Safari, Edge */
&::-webkit-scrollbar {
    display: none;
}
```

---

## 📝 Markdown Formatting Rules

### 1. Vertical Spacing

**Rule:** Headings and Lists MUST be surrounded by blank lines.

```markdown
<!-- ❌ WRONG -->
# Heading
- List item
- List item
# Next Heading

<!-- ✅ CORRECT -->
# Heading

- List item
- List item

# Next Heading
```

### 2. Heading Semantics

**Rule:** Do not use bold/italic text as a heading.

- ❌ `*My Custom Heading*`
- ✅ `# My Custom Heading` or `**My Emphasized Text**` (as part of a paragraph)

### 3. Ordered Lists

**Rule:** Use `1.` for all numbered items to avoid linting errors and make reordering easier (or ensure sequential numbering matches lint rules).

---

## ⚠️ False Positives & Progressive Enhancement

The following IDE warnings are **safe to ignore** and should NOT be "fixed" by removing the code:

1. **`meta[name=theme-color]`**:
    - *Warning:* "Not supported by Firefox/Opera"
    - *Reality:* It is a PWA standard supported by modern mobile browsers (Chrome Android, Safari iOS). Keep it.

2. **`-webkit-overflow-scrolling: touch`**:
    - *Warning:* "Not supported by [modern browsers]"
    - *Reality:* Essential for momentum scrolling on older iOS devices. Modern browsers just ignore it. Safe to keep.

3. **Minified CSS Warnings**:
    - *Issue:* Linter reports errors on "Line 1" of `*.min.css`.
    - *Reality:* These are often column positions in a single-line file. If the source CSS is correct, these are false positives. Verify the source file instead.

4. **`scrollbar-width` Compatibility**:
    - *Warning:* "Property 'scrollbar-width' is not supported by Chrome < 121..."
    - *Reality:* This is expected. We provide the `::-webkit-scrollbar { display: none; }` fallback for older browsers. The warning is just informational and safe to ignore.
