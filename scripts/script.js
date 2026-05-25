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

    // WEATHER VALUES

    const tempSpan = document.getElementById('temp');
const temperature = parseFloat(tempSpan.textContent);
const windSpeed = 15;  // this matches the displayed value

    // WIND CHILL FUNCTION

    function calculateWindChill(temp, speed) {

        return (
            13.12 +
            (0.6215 * temp) -
            (11.37 * Math.pow(speed, 0.16)) +
            (0.3965 * temp * Math.pow(speed, 0.16))
        ).toFixed(1);
    }

    // DISPLAY WIND CHILL

    let windChill = "N/A";

    if (temperature <= 10 && windSpeed > 4.8) {

        windChill =
            `${calculateWindChill(temperature, windSpeed)} °C`;
    }

    document.getElementById("windchill").textContent =
        windChill;

    // HAMBURGER MENU
    const menuButton = document.querySelector("#menu");
    const navigation = document.querySelector(".navigation");

    menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.classList.toggle("open");
    const isOpen = menuButton.classList.contains("open");
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Menu");


    })
});