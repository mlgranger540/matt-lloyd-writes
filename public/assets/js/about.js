window.onload = async function(){
    const postData = await fetch("/getAboutInfo/about_info/about-the-author").then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    }).then(function(res) {
        let id = res.uid;
        let imageSrc = res.data.image.url;
        let imageAlt = res.data.image.alt;
        let rawTitle = res.data.page_title;
        let rawSections = res.data.section;

        // Loop through title objects
        let title = [];
        rawTitle.forEach((ttl) => {
            ttl = ttl.text;
            title.push(ttl);
        });
        // Loop through sections
        let sections = [];
        rawSections.forEach((sect) => {
            let section = [];
            let subheadings = sect.subheading;
            let subheading = [];
            subheadings.forEach((sub) => {
                sub = sub.text;
                subheading.push(sub);
            });
            section.push(subheading);
            let content = sect.content;
            let contentParas = [];
            content.forEach((para) => {
                para = para.text;
                contentParas.push(para);
            })
            section.push(contentParas);
            sections.push(section);
        })
        console.log(sections);

        let aboutDiv = document.getElementById("about-div");
        let aboutContent = '';
        aboutContent += '<div class="bookshelf">';
        aboutContent += `<img class="portrait float-end" src="${imageSrc}" alt="${imageAlt}">`;
        aboutContent += `<h2 class="text-center">${title}</h2>`;
        sections.forEach((section) => {
            aboutContent += `<h3 class="subheading">${section[0]}</h3>`;
            section[1].forEach((para) => {
                aboutContent += `<p class="content">${para}</p>`;
            })
        })
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