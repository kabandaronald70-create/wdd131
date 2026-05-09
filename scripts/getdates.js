const yearElement = document.getElementById('currentyear');
const lastModifiedElement = document.getElementById('lastModified');

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;
}
