const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

const yearSelector = document.getElementById("yearSelector");
const monthSelector = document.getElementById("monthSelector");
const image = document.getElementById("calendarImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentMonth;
const totalMonths = 12;

// Populate month dropdown
months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelector.appendChild(option);
});

// Get month from URL
function getMonthFromURL() {
    const params = new URLSearchParams(window.location.search);
    const monthParam = params.get("month");
    if (monthParam && !isNaN(monthParam)) {
        const monthIndex = Number(monthParam) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
            return monthIndex;
        }
    }
    return null;
}

// Update URL without reload
function updateURL(monthIndex) {
    const monthNumber = String(monthIndex + 1).padStart(2, '0');
    const newURL = `${window.location.pathname}?month=${monthNumber}`;
    window.history.replaceState({}, '', newURL);
}

// Update calendar
function updateCalendar() {
    const year = yearSelector.value;
    const monthNumber = String(currentMonth + 1).padStart(2, '0');

    image.style.opacity = 0;

    setTimeout(() => {
        image.src = `images/${year}/${monthNumber}.jpg`;
        image.style.opacity = 1;
    }, 120);

    monthSelector.value = currentMonth;
    updateURL(currentMonth);
    preloadNextMonth();
}

// Preload next month
function preloadNextMonth() {
    const nextMonth = (currentMonth + 1) % totalMonths;
    const year = yearSelector.value;
    const nextMonthNumber = String(nextMonth + 1).padStart(2, '0');

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = `images/${year}/${nextMonthNumber}.jpg`;
    document.head.appendChild(link);
}

// Initialize
const urlMonth = getMonthFromURL();
const today = new Date();

if (urlMonth !== null) {
    currentMonth = urlMonth;
} else if (today.getFullYear() === 2026) {
    currentMonth = today.getMonth();
} else {
    currentMonth = 0;
}

updateCalendar();

// Month dropdown change
monthSelector.addEventListener("change", function() {
    currentMonth = Number(this.value);
    updateCalendar();
});

// Prev button
prevBtn.addEventListener("click", function() {
    currentMonth = (currentMonth - 1 + totalMonths) % totalMonths;
    updateCalendar();
});

// Next button
nextBtn.addEventListener("click", function() {
    currentMonth = (currentMonth + 1) % totalMonths;
    updateCalendar();
});

// Swipe support
let touchStartX = 0;
let touchEndX = 0;

image.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

image.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) nextBtn.click();
    if (touchEndX > touchStartX + 50) prevBtn.click();
}, false);


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("Service Worker Registered"))
      .catch(err => console.log("SW registration failed:", err));
  });
}
