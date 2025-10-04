document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('download-btn');

    downloadButton.addEventListener('click', async () => {
        // 1. Provide user feedback
        downloadButton.disabled = true;
        downloadButton.textContent = 'Extracting Notes...';

        try {
            // 2. Get the current active tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            // 3. Inject the content script into the active tab
            const injectionResults = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content_script.js'],
            });

            // The result is an array, we want the result from the first (and only) injection
            const { result: notesHtml } = injectionResults[0];

            if (!notesHtml) {
                throw new Error("Could not find the notes container. Make sure you are on a NotebookLM page.");
            }

            // 4. Generate and download the PDF
            downloadButton.textContent = 'Generating PDF...';
            generatePdf(notesHtml);

        } catch (error) {
            console.error("Extension Error:", error);
            alert(`An error occurred: ${error.message}`);
        } finally {
            // 5. Reset the button state
            downloadButton.disabled = false;
            downloadButton.textContent = 'Download Notes as PDF';
        }
    });
});

/**
 * Generates a PDF from an HTML string and triggers a download.
 * @param {string} htmlContent The HTML content of the notes.
 */
function generatePdf(htmlContent) {
    // Format the filename with the current date
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    const filename = `NotebookLM-Notes-${formattedDate}.pdf`;

    // Options for html2pdf.js
    const opt = {
        margin:       [0.5, 0.5, 0.5, 0.5], // Margins in inches [top, left, bottom, right]
        filename:     filename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true }, // Higher scale for better quality
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Use html2pdf library to generate the PDF
    // The library is loaded via popup.html, so the `html2pdf` global is available.
    html2pdf().from(htmlContent).set(opt).save();
}