window.onload = async function(){
    // Add current year to copyright line
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    document.getElementById("year").innerHTML = year + " ";

    // Calculate my current age
    var birthday = new Date("1997-02-19");
    var mattAge = calcAge(birthday, currentDate);
    document.getElementById("age").innerHTML = mattAge + " year old ";
}

// If collapsed navbar content is visible, make it not visible on click
// If it's not visible, make it visible
function openNav() {
    var collapsedNavbar = document.getElementById("collapsed-content");
    if (collapsedNavbar.style.display === "block") {
        collapsedNavbar.style.display = "none";
    } else {
        collapsedNavbar.style.display = "block";
    };
}

// When clicking outside of collapsed navbar, close it, unless clicking a link
function closeNav(event) {
    var collapsedNavbar = document.getElementById("collapsed-content");
    if (event.relatedTarget === null) {
        collapsedNavbar.style.display = "none";
    };
}

function calcAge(birthday, currentDate) {
    birthday = new Date(birthday);
    currentDate = new Date(currentDate);

    var years = (currentDate.getFullYear() - birthday.getFullYear());

    if (currentDate.getMonth() < birthday.getMonth() || 
        currentDate.getMonth() == birthday.getMonth() && currentDate.getDate() < birthday.getDate()) {
        years--;
    };
    return years;
}
