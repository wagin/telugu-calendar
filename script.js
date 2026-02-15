const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const yearSelector = document.getElementById("yearSelector");
const monthSelector = document.getElementById("monthSelector");
const image = document.getElementById("calendarImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentMonth;

// Populate month dropdown
months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelector.appendChild(option);
});

// Auto load current month
const today = new Date();
if (today.getFullYear() === 2025) {
    currentMonth = today.getMonth();
} else {
    currentMonth = 0; // default January
}

monthSelector.value = currentMonth;

function updateCalendar() {
    const year = yearSelector.value;
    const monthNumber = String(Number(currentMonth) + 1).padStart(2, '0');
    image.src = `images/${year}/${monthNumber}.jpg`;
}

updateCalendar();

// When month changes
monthSelector.addEventListener("change", function() {
    currentMonth = Number(this.value);
    updateCalendar();
});

// Previous button
prevBtn.addEventListener("click", function() {
    currentMonth = (currentMonth - 1 + 12) % 12;
    monthSelector.value = currentMonth;
    updateCalendar();
});

// Next button
nextBtn.addEventListener("click", function() {
    currentMonth = (currentMonth + 1) % 12;
    monthSelector.value = currentMonth;
    updateCalendar();
});
