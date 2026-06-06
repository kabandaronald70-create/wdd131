/**
 * TempoTech Labs — Review Confirmation
 * review.js
 *
 * Responsibilities:
 *  1. Increment the review counter in localStorage each page load.
 *  2. Display the counter value.
 *  3. Parse URL query parameters and show a submission summary.
 */

const COUNTER_KEY = "tempotech_review_count";

/** Increment and return the new review count */
function incrementCounter() {
  const current = parseInt(localStorage.getItem(COUNTER_KEY) || "0", 10);
  const updated = current + 1;
  localStorage.setItem(COUNTER_KEY, updated);
  return updated;
}

/** Read URL search params into a plain object */
function getFormData() {
  const params = new URLSearchParams(window.location.search);
  const data = {};
  params.forEach((value, key) => {
    if (data[key]) {
      // Handle multiple values (checkboxes)
      data[key] = [].concat(data[key], value);
    } else {
      data[key] = value;
    }
  });
  return data;
}

/** Turn a camelCase / lowercase key into a readable label */
function formatKey(key) {
  const map = {
    productName:  "Product ID",
    rating:       "Rating",
    installDate:  "Install Date",
    features:     "Useful Features",
    writtenReview:"Written Review",
    userName:     "Reviewer Name"
  };
  return map[key] || key;
}

/** Build star string for rating */
function starsDisplay(n) {
  const num = parseInt(n, 10);
  return "★".repeat(num) + "☆".repeat(5 - num) + `  (${num}/5)`;
}

/** Format features array/string */
function formatFeatures(val) {
  if (!val) return "None selected";
  const arr = Array.isArray(val) ? val : [val];
  return arr.map(f => f.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())).join(", ");
}

function buildSummary(data) {
  const container = document.getElementById("reviewSummary");
  if (!container) return;

  const orderedKeys = ["productName", "rating", "installDate", "features", "writtenReview", "userName"];

  orderedKeys.forEach(key => {
    if (!(key in data)) return;

    let val = data[key];
    if (!val || val === "") return;

    if (key === "rating")   val = starsDisplay(val);
    if (key === "features") val = formatFeatures(val);

    const row = document.createElement("div");
    row.className = "review-row";
    row.innerHTML = `<span class="r-key">${formatKey(key)}</span><span class="r-val">${val}</span>`;
    container.appendChild(row);
  });

  if (container.children.length === 0) {
    container.innerHTML = `<p style="color:var(--text-dim); font-size:0.85rem;">No submission data found.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Increment counter and display it
  const count = incrementCounter();
  const counterEl = document.getElementById("reviewCounter");
  if (counterEl) counterEl.textContent = count;

  // 2. Build submission summary from URL params
  const data = getFormData();
  buildSummary(data);
});

// ---------- 1. DYNAMIC FOOTER: Copyright Year & Last Modified ----------
    const currentYearSpan = document.getElementById('currentYear');
    const lastModifiedSpan = document.getElementById('lastModified');
  
    if (currentYearSpan) {
        const currentYear = new Date().getFullYear();
        currentYearSpan.textContent = currentYear;
    }
  
    if (lastModifiedSpan) {
        const lastModified = document.lastModified;
        // Format: "MM/DD/YYYY HH:MM:SS" or similar, just display as is
        lastModifiedSpan.textContent = lastModified;
    }