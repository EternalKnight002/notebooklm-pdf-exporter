# 🚀 NotebookLM PDF Exporter

A simple yet powerful Chromium browser extension that allows you to download your notes from Google's NotebookLM as a clean, formatted PDF file. Perfect for archiving, sharing, or offline viewing of your AI-generated notes.

---

## ✨ Features

* **One-Click PDF Export:** A simple popup with a single button to download your notes.
* **Preserves Formatting:** Keeps essential formatting like headings, bold text, lists, and tables intact.
* **Content Cleaning:** Automatically removes interactive citation markers for a cleaner, print-friendly document.
* **Smart Pagination:** Intelligently handles page breaks to prevent text and tables from being cut in half.
* **Dynamic Filename:** Automatically names the downloaded file with the current date (e.g., `NotebookLM-Notes-2025-10-04.pdf`).
* **Lightweight & Secure:** Built with Manifest V3 and requires minimal permissions (`activeTab` and `scripting` only).

---

## 🛠️ Installation and Setup

Since this extension is not on the Chrome Web Store, you can load it locally in Developer Mode.

1.  **Download the Code:**
    * Clone this repository to your local machine:
        ```bash
        git clone [https://github.com/your-username/notebooklm-pdf-exporter.git](https://github.com/your-username/notebooklm-pdf-exporter.git)
        ```
    * Or, download the project as a ZIP file and extract it.

2.  **Open Chrome Extensions:**
    * Open your Chromium-based browser (Chrome, Brave, Edge).
    * Navigate to `chrome://extensions`.

3.  **Enable Developer Mode:**
    * In the top-right corner, turn on the **"Developer mode"** toggle.

4.  **Load the Extension:**
    * Click the **"Load unpacked"** button.
    * Select the entire `notebooklm-pdf-exporter` project folder.

The extension icon will now appear in your browser's toolbar.

---

##  usage

1.  Navigate to a Google NotebookLM page containing the notes you want to export.
2.  Click the NotebookLM PDF Exporter icon in your browser's toolbar.
3.  In the popup that appears, click the **"Download Notes as PDF"** button.
4.  The PDF will be automatically generated and saved to your computer.

---

## 🔧 Maintaining the Extension

Websites change over time. If the extension stops working, it's almost certainly because Google has updated the CSS class names or HTML structure of the NotebookLM site.

You can easily fix this by updating the selectors in **`content_script.js`**.

1.  **Open `content_script.js`** in a code editor.
2.  **Find the Selectors:** Use your browser's "Inspect" tool (right-click on the element) to find the new CSS selector for:
    * `NOTES_CONTAINER_SELECTOR`: The main container holding all of your notes.
    * `CITATION_SELECTOR`: The small, clickable citation numbers (e.g., ¹).
3.  **Update the Variables:** Replace the old selector strings with the new ones you found.
4.  **Reload the Extension:** Go to `chrome://extensions` and click the reload icon on the extension's card.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
