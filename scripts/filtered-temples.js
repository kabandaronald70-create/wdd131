// ============================================================
//  Temple Album – filtered-temples.js
//  Handles: temple data, card rendering, nav filtering,
//           footer year/last-modified, hamburger menu
// ============================================================

// ---------- 1. TEMPLE DATA ARRAY ----------
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // ---- Additional temples (3 required extras) ----
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl: "images/accra-ghana-temple.webp"
  },
  {
    templeName: "Nauvoo Illinois",
    location: "Nauvoo, Illinois, United States",
    dedicated: "2002, June, 27",
    area: 54000,
    imageUrl: "images/nauvoo-illionois-temple.jpg"
  },
  {
    templeName: "London England",
    location: "Newchapel, Surrey, England",
    dedicated: "1958, September, 7",
    area: 42652,
    imageUrl: "images/london-chapel.webp"
  },
  {
    templeName: "Bern Switzerland",
    location: "Zollikofen, Switzerland",
    dedicated: "1955, September, 11",
    area: 35546,
    imageUrl: "images/bern-switzerland.webp"
  }
];


// ---------- 2. HELPER: Parse dedication year from "YYYY, Month, D" ----------
function getDedicationYear(dedicatedStr) {
  // Format is "YYYY, Month, D"
  return parseInt(dedicatedStr.split(",")[0].trim(), 10);
}


// ---------- 3. FILTER FUNCTIONS ----------
const filters = {
  home:  () => temples,
  old:   () => temples.filter(t => getDedicationYear(t.dedicated) < 1900),
  new:   () => temples.filter(t => getDedicationYear(t.dedicated) > 2000),
  large: () => temples.filter(t => t.area > 90000),
  small: () => temples.filter(t => t.area < 10000),
};

// Friendly label shown in the <h1> for each filter
const filterLabels = {
  home:  "Home – All Temples",
  old:   "Old Temples (Before 1900)",
  new:   "New Temples (After 2000)",
  large: "Large Temples (> 90,000 sq ft)",
  small: "Small Temples (< 10,000 sq ft)",
};


// ---------- 4. CARD BUILDER ----------
function createTempleCard(temple) {
  const figure = document.createElement("figure");
  figure.classList.add("temple-card");

  // Image with native lazy loading
  const img = document.createElement("img");
  img.src = temple.imageUrl;
  img.alt = temple.templeName;
  img.loading = "lazy";   // ← native lazy loading
  // Fallback to a local placeholder when remote URL fails
  img.onerror = () => {
    img.src = "images/hero-small.jpg";
    img.alt = `${temple.templeName} (image unavailable)`;
  };

  // Caption block
  const caption = document.createElement("figcaption");
  caption.innerHTML = `
    <strong>${temple.templeName}</strong>
    <span class="temple-location">📍 ${temple.location}</span>
    <span class="temple-dedicated">🕍 Dedicated: ${temple.dedicated}</span>
    <span class="temple-area">📐 ${temple.area.toLocaleString()} sq ft</span>
  `;

  figure.appendChild(img);
  figure.appendChild(caption);
  return figure;
}


// ---------- 5. RENDER CARDS ----------
function displayTemples(filterKey) {
  const grid = document.getElementById("templeGrid");
  const title = document.getElementById("pageTitle");

  // Clear existing cards
  grid.innerHTML = "";

  const filtered = (filters[filterKey] || filters.home)();

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="no-results">No temples match this filter.</p>`;
  } else {
    filtered.forEach(temple => {
      grid.appendChild(createTempleCard(temple));
    });
  }

  // Update the page heading to reflect the active filter
  title.textContent = filterLabels[filterKey] || "Temples";
}


// ---------- 6. DOM READY ----------
document.addEventListener("DOMContentLoaded", () => {

  // --- Footer: copyright year & last modified ---
  const currentYearSpan = document.getElementById("currentYear");
  const lastModifiedSpan = document.getElementById("lastModified");

  if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
  if (lastModifiedSpan) {
    const lm = document.lastModified;
    if (lm && lm !== '') {
      lastModifiedSpan.textContent = lm;
    } else {
      // Fallback: try a HEAD request to read the server's Last-Modified header
      fetch(window.location.href, { method: 'HEAD', cache: 'no-store' })
        .then(res => res.headers.get('last-modified'))
        .then(h => {
          lastModifiedSpan.textContent = h || 'Unknown';
        })
        .catch(() => {
          lastModifiedSpan.textContent = 'Unknown';
        });
    }
  }

  // --- Initial render: show all temples ---
  displayTemples("home");

  // --- Nav link filtering ---
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Highlight active link
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      const filter = link.dataset.filter || "home";
      displayTemples(filter);

      // Close mobile menu after selection
      if (window.innerWidth < 768) {
        mainNav.classList.remove("show");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        hamburgerBtn.textContent = "☰";
      }
    });
  });

  // --- Hamburger menu toggle ---
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mainNav = document.getElementById("mainNav");

  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener("click", () => {
      const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
      mainNav.classList.toggle("show");
      hamburgerBtn.setAttribute("aria-expanded", !isExpanded);
      hamburgerBtn.textContent = isExpanded ? "☰" : "✕";
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        mainNav.classList.remove("show");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        hamburgerBtn.textContent = "☰";
      }
    });
  }
});