document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('download-btn');

    downloadButton.addEventListener('click', async () => {
        downloadButton.disabled = true;
        downloadButton.textContent = 'Extracting Notes...';

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            const injectionResults = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content_script.js'],
            });

            const { result: notesHtml } = injectionResults[0];

            if (!notesHtml) {
                throw new Error("Could not find the notes container. Make sure you are on a NotebookLM page.");
            }

            downloadButton.textContent = 'Generating PDF...';
            generatePdf(notesHtml);

        } catch (error) {
            console.error("Extension Error:", error);
            alert(`An error occurred: ${error.message}`);
        } finally {
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
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    const filename = `NotebookLM-Notes-${formattedDate}.pdf`;
    
    const pdfStyles = `
        <style>
            body { font-family: sans-serif; }
            table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
            th, td { border: 1px solid #dddddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            code { 
                background-color: #eee; 
                border-radius: 3px; 
                font-family: courier, monospace;
                padding: 0 3px; 
            }
            /* --- NEW: Add styles for headings --- */
            h1, h2, h3, h4, h5, h6 {
                text-align: left;
                margin-top: 1.5rem;
            }
        </style>
    `;

    const fullHtml = pdfStyles + htmlContent;

    const opt = {
        margin:       [0.5, 0.5, 0.5, 0.5],
        filename:     filename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak:    { mode: 'avoid-all', avoid: ['h2', 'h3', 'h4', 'table', 'tr'] }
    };

    html2pdf().from(fullHtml).set(opt).save();
}