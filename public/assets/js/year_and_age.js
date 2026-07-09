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

function calcAge(birthday, currentDate) {
    birthday = new Date(birthday);
    currentDate = new Date(currentDate);

    var years = (currentDate.getFullYear() - birthday.getFullYear());

    if (currentDate.getMonth() < birthday.getMonth() || 
        currentDate.getMonth() == birthday.getMonth() && currentDate.getDate() < birthday.getDate()) {
        years--;
    }
    return years;
}
