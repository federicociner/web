var buttons = document.getElementsByClassName("tablink");
var tabs = document.getElementsByClassName("tabcontent");

Array.from(buttons).forEach((element) => {
  element.addEventListener("click", (event) => {
    // Reset tabs display to "none"
    Array.from(tabs).forEach((tab) => {
      tab.style.display = "none";
    });

    // Reset buttons
    Array.from(buttons).forEach((button) => {
      button.classList.remove("active");
    });

    // Display selected tab and set "active" state for selected button
    document.getElementById(event.target.dataset.tabid).style.display = "block";
    event.currentTarget.classList.add("active");
  });
});
