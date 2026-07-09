window.onload = async function(){
    const bookData = await fetch(`/getBook${window.location.pathname}`).then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    }).then(function(x) {
        // Add book data from Prismic to book object
        let book = {};
        let rawID = x.uid;
        let rawCoverSrc = x.data.cover.url;
        let rawCoverAlt = x.data.cover.alt;
        let rawTitle = x.data.book_title;
        let rawSeries = x.data.series;
        let rawBookNumber = x.data.book_number;
        let rawAudience = x.data.audience;
        let rawRating = x.data.rating;
        let rawGenres = x.data.genres;
        let rawThemes = x.data.themes;
        let rawTropes = x.data.tropes;
        let rawArchetypes = x.data.story_archetypes;
        let rawSetting = x.data.setting;
        let rawMainChars = x.data.main_characters;
        let rawMajChars = x.data.major_characters;
        let rawAntagonists = x.data.antagonists;
        let rawSynopsis = x.data.synopsis;
        let rawPOV = x.data.pov;
        let rawTense = x.data.tense;
        let rawWordCount = x.data.word_count;
        let commaWordCount = commaify(rawWordCount);
        let rawPageCount = x.data.page_count;
        let commaPageCount = commaify(rawPageCount);
        let rawStatus = x.data.status;
        book.id = rawID;
        book.coverSrc = rawCoverSrc;
        book.coverAlt = rawCoverAlt;
        book.title = rawTitle;
        book.series = rawSeries;
        book.bookNumber = rawBookNumber;
        book.audience = rawAudience;
        book.rating = rawRating;
        book.genres = rawGenres;
        book.themes = rawThemes;
        book.tropes = rawTropes;
        book.archetypes = rawArchetypes;
        book.setting = rawSetting;
        book.mainChars = rawMainChars;
        book.majChars = rawMajChars;
        book.antagonists = rawAntagonists;
        book.synopsis = rawSynopsis;
        book.pov = rawPOV;
        book.tense = rawTense;
        book.wordCount = commaWordCount;
        book.pageCount = commaPageCount;
        book.status = rawStatus;
        
        // Add book to book section
        let bookLeftColumn = document.getElementById("book-left-column");
        let bookRightColumn = document.getElementById("book-right-column");
        let bookLeftContent = '';
        let bookRightContent = '';
        let id = book.id;
        let coverSrc = book.coverSrc;
        let coverAlt = book.coverAlt;
        // Loop through title objects
        let titleObjs = book.title;
        let title = [];
        titleObjs.forEach((ttl) => {
            ttl = ttl.text;
            title.push(ttl);
        });
        let series = book.series;
        let bookNumber = book.bookNumber;
        let audience = book.audience;
        let rating = book.rating;
        // Loop through genre objects
        let genreObjs = book.genres;
        let genres = [];
        genreObjs.forEach((genre) => {
            genre = genre.genre;
            genres.push(genre);
        });
        // Loop through theme objects
        let themeObjs = book.themes;
        let themes = [];
        themeObjs.forEach((theme) => {
            theme = theme.theme;
            themes.push(theme);
        });
        // Loop through trope objects
        let tropeObjs = book.tropes;
        let tropes = [];
        tropeObjs.forEach((trope) => {
            trope = trope.trope;
            tropes.push(trope);
        });
        // Loop through archetype objects
        let archeObjs = book.archetypes;
        let archetypes = [];
        archeObjs.forEach((arche) => {
            arche = arche.story_archetype;
            archetypes.push(arche);
        });
        let setting = book.setting;
        let mainChars = book.mainChars;
        let majChars = book.majChars;
        let antagonists = book.antagonists;
        // Loop through synopsis objects
        let synopsisObjs = book.synopsis;
        let synopsis = [];
        synopsisObjs.forEach((syn) => {
            syn = syn.text;
            synopsis.push(syn);
        });
        let pov = book.pov;
        let tense = book.tense;
        let wordCount = book.wordCount;
        let pageCount = book.pageCount;
        let status = book.status;

        // Add content to book left column HTML
        bookLeftContent += '<div id="cover-container">';
        if (coverSrc === undefined ) {
            bookLeftContent += '<img class="book-cover-thumb" src="../assets/images/book-cover-placeholder.png" alt="Placeholder book cover image"></img>';
        } else {
            bookLeftContent += '<img class="book-cover-thumb" src="' + coverSrc + '" alt="' + coverAlt + '"></img>';
        }
        bookLeftContent += '</div>';
        bookLeftContent += '<div class="book-detail-column">';
        bookLeftContent += '<p class="book-details">Audience & Rating:&ensp;' + audience + ' (' + rating + ')</p>';
        bookLeftContent += '<p class="book-details">Genres:&ensp;' + genres.join(", ") + '</p>';
        bookLeftContent += '<p class="book-details">Themes:&ensp;' + themes.join(", ") + '</p>';
        bookLeftContent += '<p class="book-details">POV & Tense:&ensp;' + pov + ' / ' + tense + '</p>';
        bookLeftContent += '</div>';

        bookLeftColumn.innerHTML = bookLeftContent;

        // Add content to book right column HTML
        bookRightContent += '<div class="title-and-series"><h3 class="book-title-large">' + title + '</h3>';
        if (series !== null) {
            bookRightContent += '<p class="series">Book ' + bookNumber + ' – ' + series + '</p>';
        }
        bookRightContent += '</div>';
        bookRightContent += '<p class="synopsis">Synopsis:&ensp;' + synopsis + '</p>';
        bookRightContent += '<p class="story-details">Archetypes:&ensp;' + archetypes.join(", ") + '</p>';
        bookRightContent += '<p class="story-details">Tropes:&ensp;' + tropes.join(", ") + '</p>';
        bookRightContent += '<p class="story-details">Setting:&ensp;' + setting + '</p>';
        bookRightContent += '<p class="story-details">Main Characters:&ensp;' + mainChars + '</p>';
        bookRightContent += '<p class="story-details">Major Characters:&ensp;' + majChars + '</p>';
        bookRightContent += '<p class="story-details">Antagonists:&ensp;' + antagonists + '</p>';
        bookRightContent += '<hr>'
        bookRightContent += '<p class="book-details stats">Word Count:&ensp;' + wordCount + ' &ensp; | &ensp;Page Count:&ensp;' + pageCount + '</p>';
        bookRightContent += '<p class="book-details stats">Status:&ensp;' + status + '</p>';

        bookRightColumn.innerHTML = bookRightContent;
    })

    // Add current year to copyright line
    var year = new Date().getFullYear();
    document.getElementById("year").innerHTML = year + " ";
}

function commaify(num){
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
    }
}
