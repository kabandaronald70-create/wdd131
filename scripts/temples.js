// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
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
  
  // ---------- 2. HAMBURGER MENU TOGGLE (Mobile) ----------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');
  
  if (hamburgerBtn && mainNav) {
    // Toggle navigation visibility and button symbol (☰ <-> ✕)
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      
      // Toggle 'show' class on nav element
      mainNav.classList.toggle('show');
      
      // Update aria-expanded attribute
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
      
      // Change button icon: ☰ (menu) to ✕ (close)
      if (!isExpanded) {
        hamburgerBtn.textContent = '✕';   // close symbol
      } else {
        hamburgerBtn.textContent = '☰';   // hamburger icon
      }
    });
    
    // Optional: if window resizes to >768px and menu is open via class,
    // we don't need to force close, but CSS hides hamburger and shows nav always.
    // However, to keep state consistent when resizing from mobile to desktop:
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        // On desktop view, ensure nav is visible and remove 'show' class quirks
        mainNav.classList.remove('show');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.textContent = '☰';
      } else {
        // On mobile, if nav was toggled open, keep it; otherwise leave hidden.
        // We don't auto-close to respect user choice.
      }
    });
  }

  // Close menu when a nav link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      mainNav.classList.remove('show');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.textContent = '☰';
    }
  });
});
});