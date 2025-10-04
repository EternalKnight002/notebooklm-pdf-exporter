// This script is injected into the webpage and has access to its DOM.
// Its primary goal is to find the notes container and return its inner HTML.

(function() {
    // --- CRUCIAL CUSTOMIZATION INSTRUCTION ---
    // The CSS selector below is the MOST LIKELY part of this extension to break
    // if Google updates the NotebookLM website structure.
    //
    // HOW TO FIND THE CORRECT SELECTOR:
    // 1. Go to your NotebookLM page and open your browser's Developer Tools
    //    (Right-click anywhere on the page -> "Inspect").
    // 2. Use the element selector tool (usually an icon of a square with a cursor)
    //    to click directly on the main notes area where you type.
    // 3. The DevTools will highlight the corresponding HTML element. Look for an
    //    element with a stable and unique identifier.
    //    - BEST: A unique `id` attribute (e.g., `<div id="notes-editor">...</div>`).
    //      The selector would be `"#notes-editor"`.
    //    - GOOD: A descriptive `class` name that doesn't look auto-generated
    //      (e.g., `<div class="main-notes-container">...</div>`). The selector
    //      would be `".main-notes-container"`.
    //    - OK: A data-attribute like `data-testid` (e.g., `<div data-testid="note-surface">...</div>`).
    //      The selector would be `'div[data-testid="note-surface"]'`.
    //    - AVOID: Obfuscated or auto-generated class names like `css-1a2b3c4d` or
    //      `sc-gHfsfge`. These will change on every website update.
    //
    // The selector below is a plausible example. YOU MUST VERIFY AND UPDATE IT.
    const NOTES_CONTAINER_SELECTOR = '.note-editor';

    const notesContainer = document.querySelector(NOTES_CONTAINER_SELECTOR);

    // Return the innerHTML of the container. The popup script will receive this value.
    // If the container isn't found, this will return null, and the popup script
    // will handle the error.
    return notesContainer ? notesContainer.innerHTML : null;
})();