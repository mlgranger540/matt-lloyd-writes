window.onload = async function(){
    const bookData = await fetch(`/getBook${window.location.pathname}`).then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    }).then(function(res) {
        let doc = res.document;
        // Get book data from Prismic
        let id = doc.uid;
        let coverSrc = doc.data.cover.url;
        let coverAlt = doc.data.cover.alt;
        let rawTitle = doc.data.book_title;
        let series = doc.data.series;
        let bookNumber = doc.data.book_number;
        let audience = doc.data.audience;
        let rating = doc.data.rating;
        let rawGenres = doc.data.genres;
        let rawThemes = doc.data.themes;
        let rawTropes = doc.data.tropes;
        let rawArchetypes = doc.data.story_archetypes;
        let setting = doc.data.setting;
        let mainChars = doc.data.main_characters;
        let majChars = doc.data.major_characters;
        let relationships = doc.data.relationships;
        let antagonists = doc.data.antagonists;
        let synopsisHTML = res.synopsis;
        let pov = doc.data.pov;
        let tense = doc.data.tense;
        let rawWordCount = doc.data.word_count;
        let wordCount = commaify(rawWordCount);
        let rawPageCount = doc.data.page_count;
        let pageCount = commaify(rawPageCount);
        let status = doc.data.status;
        
        // Add book to book section
        let bookLeftColumn = document.getElementById("book-left-column");
        let bookRightColumn = document.getElementById("book-right-column");
        let bookLeftContent = '';
        let bookRightContent = '';
        // Loop through title objects
        let title = [];
        rawTitle.forEach((ttl) => {
            ttl = ttl.text;
            title.push(ttl);
        });
        // Update page title with selected book title
        document.title = `${title} | Matt Lloyd Writes`;
        // Loop through genre objects
        let genres = [];
        rawGenres.forEach((genre) => {
            genre = genre.genre;
            genres.push(genre);
        });
        // Loop through theme objects
        let themes = [];
        rawThemes.forEach((theme) => {
            theme = theme.theme;
            themes.push(theme);
        });
        // Loop through trope objects
        let tropes = [];
        rawTropes.forEach((trope) => {
            trope = trope.trope;
            tropes.push(trope);
        });
        // Loop through archetype objects
        let archetypes = [];
        rawArchetypes.forEach((arche) => {
            arche = arche.story_archetype;
            archetypes.push(arche);
        });

        // Add content to book left column HTML
        bookLeftContent += '<div id="cover-container">';
        if (coverSrc === undefined ) {
            bookLeftContent += '<img class="book-cover-thumb" src="../assets/images/book-cover-placeholder.png" alt="Placeholder book cover image"></img>';
        } else {
            bookLeftContent += `<img class="book-cover-thumb" src="${coverSrc}" alt="${coverAlt}"></img>`;
        };
        bookLeftContent += '</div>';
        bookLeftContent += '<div class="book-detail-column">';
        bookLeftContent += `<p class="book-details">Audience & Rating:&ensp;${audience} (${rating})</p>`;
        bookLeftContent += '<p class="book-details">Genres:&ensp;' + genres.join(", ") + '</p>';
        bookLeftContent += '<p class="book-details">Themes:&ensp;' + themes.join(", ") + '</p>';
        bookLeftContent += `<p class="book-details">POV & Tense:&ensp;${pov} / ${tense}</p>`;
        bookLeftContent += '</div>';

        bookLeftColumn.innerHTML = bookLeftContent;

        // Add content to book right column HTML
        bookRightContent += `<div class="title-and-series"><h3 class="book-title-large">${title}</h3>`;
        if (series !== "No Series") {
            bookRightContent += `<p class="series">Book ${bookNumber} – ${series}</p>`;
        };
        bookRightContent += '</div><div class="synopsis">';
        bookRightContent += synopsisHTML;
        bookRightContent += '</div></div><p class="story-details">Archetypes:&ensp;' + archetypes.join(", ") + '</p>';
        bookRightContent += '<p class="story-details">Tropes:&ensp;' + tropes.join(", ") + '</p>';
        bookRightContent += `<p class="story-details">Setting:&ensp;${setting}</p>`;
        bookRightContent += `<p class="story-details">Main Characters:&ensp;${mainChars}</p>`;
        if (majChars !== null) {
            bookRightContent += `<p class="story-details">Major Characters:&ensp;${majChars}</p>`;
        }
        if (relationships !== null) {
            bookRightContent += `<p class="story-details">Relationships:&ensp;${relationships}</p>`;
        }
        if (antagonists !== null) {
            bookRightContent += `<p class="story-details">Antagonists:&ensp;${antagonists}</p>`;
        }
        // Add hidden detail column that unhides only on mobile
        bookRightContent += '<div id="hidden-detail-column" class="book-detail-column"><hr>';
        bookRightContent += `<p class="book-details">Audience & Rating:&ensp;${audience} (${rating})</p>`;
        bookRightContent += '<p class="book-details">Genres:&ensp;' + genres.join(", ") + '</p>';
        bookRightContent += '<p class="book-details">Themes:&ensp;' + themes.join(", ") + '</p>';
        bookRightContent += `<p class="book-details">POV & Tense:&ensp;${pov} / ${tense}</p>`;
        bookRightContent += '</div>';
        bookRightContent += '<hr>'
        bookRightContent += `<p class="book-details stats">Word Count:&ensp;${wordCount} &ensp; | &ensp;Page Count:&ensp;${pageCount}</p>`;
        bookRightContent += `<p class="book-details stats">Status:&ensp;${status}</p>`;

        bookRightColumn.innerHTML = bookRightContent;
    })

    // Add current year to copyright line
    var year = new Date().getFullYear();
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

function commaify(num) {
    // Convert number to string
    let numStr = num.toString();
    // Check if number has at least 7 digits
    if (numStr / 1000000 > 1){
        // Slice string in groups of 3
        var numEnd = numStr.slice(-3);
        var numMid = numStr.slice(-6,-3);
        var numBeg = numStr.slice(0,-6);
        // Recombine with comma separators
        var commaNum = numBeg + ',' + numMid + ',' + numEnd;
        return(commaNum);
    // Check if number has at least 4 digits
    } else if (numStr / 1000 > 1){
        // Slice string in groups of 3
        var numEnd = numStr.slice(-3);
        var numBeg = numStr.slice(0,-3);
        // Recombine with comma separator
        var commaNum = numBeg + ',' + numEnd;
        return commaNum;
    // If number has less than 4 digits, no change
    } else {
        return numStr;
    };
}
