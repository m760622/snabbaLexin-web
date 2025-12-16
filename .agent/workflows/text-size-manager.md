---
description: Dynamic text sizing rule to keep text within card/container boundaries
---

# Text Size Manager Usage Guide

## Overview

Use `TextSizeManager` to dynamically adjust font size based on text length, keeping content within container boundaries.

## JavaScript API

### Basic Usage

```javascript
// Apply dynamic sizing to an element
TextSizeManager.apply(element, text, containerType);
```

### Container Types

| Type | Use Case | Thresholds |
|------|----------|------------|
| `flashcard` | Small cards (180px height) | xs:50, sm:30, md:20, lg:10 |
| `card` | Medium cards | xs:80, sm:50, md:30, lg:15 |
| `modal` | Large modals | xs:120, sm:80, md:50, lg:25 |
| `default` | General use | xs:50, sm:30, md:20, lg:10 |

### Methods

1. **apply(element, text, containerType)** - Apply sizing to single element

```javascript
const el = document.getElementById('myText');
TextSizeManager.apply(el, el.textContent, 'flashcard');
```

1. **autoApply()** - Auto-apply to all elements with `data-auto-size` attribute

```html
<span data-auto-size="flashcard">Dynamic text here</span>
```

```javascript
TextSizeManager.autoApply();
```

1. **observe(element, containerType)** - Watch for content changes and auto-resize

```javascript
const observer = TextSizeManager.observe(myElement, 'card');
```

## CSS Classes

The system applies these classes automatically:

| Class | Font Size | When Applied |
|-------|-----------|--------------|
| `.text-xl` | 1.75rem | Text ≤ 10 chars |
| `.text-lg` | 1.4rem | Text 11-20 chars |
| `.text-md` | 1.15rem | Text 21-30 chars |
| `.text-sm` | 0.95rem | Text 31-50 chars |
| `.text-xs` | 0.8rem | Text > 50 chars |

## Examples

### Flashcards

```javascript
// In updateUIInline()
TextSizeManager.apply(frontEl, frontText, 'flashcard');
TextSizeManager.apply(backEl, backText, 'flashcard');
```

### Word of the Day

```javascript
TextSizeManager.apply(wodSweElement, swedishWord, 'card');
```

### Quiz Questions

```javascript
TextSizeManager.apply(questionElement, questionText, 'modal');
```

## Best Practices

1. Always use the appropriate container type for accurate sizing
2. Call `apply()` after setting `textContent`
3. Use `observe()` for elements that change content dynamically
4. Add `.auto-size-container` class to parent for proper overflow handling
