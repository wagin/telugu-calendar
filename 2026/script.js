const selector = document.getElementById("monthSelector");
const image = document.getElementById("calendarImage");

selector.addEventListener("change", function() {
    image.src = "images/" + this.value;
});
