function toggleMenu() {
    let button = document.getElementById("menuButton");
    if (button.innerHTML === "☰") {
        button.innerHTML = "✖"; // Change to close icon
        button.style.color = "red"; // Change color to red
        showMenu(); // Call showMenu function
    } else {
        button.innerHTML = "☰"; // Change back to menu icon
        button.style.color = ""; // Reset color
        hideMenu(); // Call hideMenu function
    }
}

function showMenu() {
    console.log("Menu shown");
    // Add your menu display logic here
    document.querySelector('.mobile-menu-items').style.display = 'flex';
    document.querySelector("nav").style.height = "100%";
}

function hideMenu() {
    console.log("Menu hidden");
    // Add your menu hide logic here
    document.querySelector('.mobile-menu-items').style.display = 'none';
    document.querySelector("nav").style.height = "max-content";
}
