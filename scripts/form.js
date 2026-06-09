// Product array (exactly as provided in the assignment)
const products = [
  { id: "fc-1888", name: "flux capacitor",    averagerating: 4.5 },
  { id: "fc-2050", name: "power laces",        averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits",      averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor",averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer",     averagerating: 5.0 }
];

function populateProductSelect() {
  const select = document.getElementById("productName");
  if (!select) return;

  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;   // id as value
    // Capitalize each word for display
    option.textContent = product.name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    select.appendChild(option);
  });
}

function setFooterDates() {
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const lastModSpan = document.getElementById("lastModified");
  if (lastModSpan) {
    const lastMod = new Date(document.lastModified);
    const formatted = `${lastMod.getMonth()+1}/${lastMod.getDate()}/${lastMod.getFullYear()} ${lastMod.getHours().toString().padStart(2,'0')}:${lastMod.getMinutes().toString().padStart(2,'0')}:${lastMod.getSeconds().toString().padStart(2,'0')}`;
    lastModSpan.textContent = formatted;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateProductSelect();
  setFooterDates();
});