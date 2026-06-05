/**
 * TempoTech Labs — Product Review Form
 * form.js
 *
 * Responsibilities:
 *  1. Populate the Product Name <select> dynamically from the products array.
 *  2. (review.html picks up the localStorage counter logic in review.js)
 */

const products = [
  { id: "fc-1888", name: "flux capacitor",    averagerating: 4.5 },
  { id: "fc-2050", name: "power laces",        averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits",      averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor",averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer",     averagerating: 5.0 }
];

/**
 * Populate the product <select> element with options
 * built from the products array.
 * - option text  → product.name  (title-cased for display)
 * - option value → product.id
 */
function populateProductSelect() {
  const select = document.getElementById("productName");
  if (!select) return;

  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    // Capitalise each word for nicer display
    option.textContent = product.name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    select.appendChild(option);
  });
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", populateProductSelect);