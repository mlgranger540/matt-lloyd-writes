window.onload = async function(){
    const postData = await fetch("/getAboutInfo/about_info/about-the-author").then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    }).then(function(res) {
        let id = res.document.uid;
        let imageSrc = res.document.data.image.url;
        let imageAlt = res.document.data.image.alt;
        let rawTitle = res.document.data.page_title;
        let introHTML = res.intro;
        let rawSubheading1 = res.document.data.subheading_1;
        let content1HTML = res.content1;

        // Loop through title objects
        let title = [];
        rawTitle.forEach((ttl) => {
            ttl = ttl.text;
            title.push(ttl);
        });
        // Loop through subheading objects
        let subheading1 = [];
        rawSubheading1.forEach((sub) => {
            sub = sub.text;
            subheading1.push(sub);
        });
        
        let aboutDiv = document.getElementById("about-div");
        let aboutContent = '';
        aboutContent += '<div class="bookshelf">';
        aboutContent += `<img class="portrait float-end" src="${imageSrc}" alt="${imageAlt}">`;
        aboutContent += `<h2 class="text-center">${title}</h2>`;
        aboutContent += `<div class="content">${introHTML}</div>`;
        aboutContent += `<h3 class="subheading">${subheading1}</h3>`;
        aboutContent += `<div class="content">${content1HTML}</div>`;
        aboutContent += '</div>';

        aboutDiv.innerHTML = aboutContent;
    })

    // Add current year to copyright line
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    document.getElementById("year").innerHTML = year + " ";    
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