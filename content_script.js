// This script finds the notes container, cleans it by removing unwanted elements,
// and then returns the clean inner HTML.

(function() {
    // Selector for the main notes container
    const NOTES_CONTAINER_SELECTOR = '.note-editor';

    // Selector for the citation numbers, based on your screenshot
    const CITATION_SELECTOR = '.citation-marker';

    const notesContainer = document.querySelector(NOTES_CONTAINER_SELECTOR);

    if (!notesContainer) {
        // If the main container isn't found, return null.
        return null;
    }

    // Create a temporary, in-memory copy of the notes container to work with.
    // This prevents accidentally changing the live webpage.
    const notesClone = notesContainer.cloneNode(true);

    // Find all the citation markers within our temporary copy.
    const citations = notesClone.querySelectorAll(CITATION_SELECTOR);

    // Loop through each citation marker and remove it.
    citations.forEach(citation => citation.remove());

    // Return the innerHTML of the *cleaned* copy.
    return notesClone.innerHTML;
})();