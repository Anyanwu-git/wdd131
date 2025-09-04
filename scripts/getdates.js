// Dynamically set the current year
const yearEl = document.getElementById('currentyear');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Show the document's last modified date/time
const modifiedEl = document.getElementById('lastModified');
if (modifiedEl) {
    modifiedEl.textContent = `Last Modified: ${document.lastModified}`;
}