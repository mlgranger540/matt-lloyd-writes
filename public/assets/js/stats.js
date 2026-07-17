window.onload = async function(){
    const postData = await fetch("/getAllPosts").then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    });
    const bookData = await fetch("/getAllBooks").then(function(response) {
        return response.json();
    });
    // Loop through post data from Prismic and add to post object
    // then add object to posts array
    let allPosts = [];
    postData.forEach((x) => {
        let post = {};
        let id = x.uid;
        let type = x.data.type;
        let rawWordCount = x.data.word_count;
        let genres = x.data.genres;
        let tags = x.data.tags;
        post.id = id;
        post.type = type;
        post.rawWordCount = rawWordCount;
        post.genres = genres;
        post.tags = tags;
        allPosts.push(post);
    })

    // Loop through book data from Prismic and add to book object
    // then add object to books array
    let allBooks = [];
    bookData.forEach((x) => {
        let book = {};
        let id = x.uid;
        let series = x.data.series;
        let audience = x.data.audience;
        let rating = x.data.rating;
        let genres = x.data.genres;
        let themes = x.data.themes;
        let tropes = x.data.tropes;
        let archetypes = x.data.archetypes;
        let setting = x.data.setting;
        let pov = x.data.pov;
        let tense = x.data.tense;
        let rawWordCount = x.data.word_count;
        let rawPageCount = x.data.page_count;
        let status = x.data.status;
        book.id = id;
        book.series = series;
        book.audience = audience;
        book.rating = rating;
        book.genres = genres;
        book.themes = themes;
        book.archetypes = archetypes;
        book.setting = setting;
        book.pov = pov;
        book.tense = tense;
        book.rawWordCount = rawWordCount;
        book.rawPageCount = rawPageCount;
        book.status = status;
        allBooks.push(book);
    })

    let noOfPosts = allPosts.length;
    let noOfShortStories = 0;
    let noOfExcerpts = 0;
    let noOfPoems = 0;

    // Check post type and increase count
    for (i = 0; i < noOfPosts; i++) {
        if (allPosts[i].type === "Short Story") {
            noOfShortStories++;
        } else if (allPosts[i].type === "Novel Excerpt") {
            noOfExcerpts++;
        } else {
            noOfPoems++;
        };
    }
    
    // Add together all post word counts, then commaify
    let rawPostWordCount = 0;
    for (i = 0; i < noOfPosts; i++) {
        rawPostWordCount += allPosts[i].rawWordCount;
    }
    let totalPostWordCount = commaify(rawPostWordCount);


    // Get post stats row div and make empty string for content
    let postStatsRow = document.getElementById("post-stats-row");
    let postStatsContent = '';

    // Add content to left column for post stats
    postStatsContent += '<div class="col-xl-2 col-lg-1 d-md-block d-none"></div>';
    postStatsContent += '<div class="col-xl-4 col-lg-5 col-md-6 col-12">';
    postStatsContent += '<p class="content stats-content">Number of Short Stories:&ensp;' + noOfShortStories + '</p>';
    postStatsContent += '<p class="content stats-content">Number of Novel Excerpts:&ensp;' + noOfExcerpts + '</p>';
    postStatsContent += '<p class="content stats-content">Number of Poems:&ensp;' + noOfPoems + '</p>';
    postStatsContent += '<p class="content stats-content">Total Number of Posts:&ensp;' + noOfPosts + '</p></div>';

    // Add content to right column for post stats
    postStatsContent += '<div class="stats-right-column col-xl-4 col-lg-5 col-md-6 col-12">'
    postStatsContent += '<p class="content stats-content">Total Word Count (Posts):&ensp;' + totalPostWordCount + '</p></div>';
    postStatsContent += '<div class="col-xl-2 col-lg-1 d-md-block d-none"></div>';

    // Add both columns to post stats row HTML
    postStatsRow.innerHTML = postStatsContent;


    let noOfBooks = allBooks.length;
    let noOfSingleBooks = 0;
    let noOfSeries = 0;
    let seriesNames = [];
    
    // If book has series, push series name to array
    // Otherwise increase standalone book count
    for (i = 0; i < noOfBooks; i++) {
        if (allBooks[i].series !== null) {
            seriesNames.push(allBooks[i].series);
        } else {
            noOfSingleBooks++;
        };
    }
    // When new series name is encountered, increase series count
    for (i = 0; i < seriesNames.length; i++) {
        if (i > 0) {
            if (seriesNames[i].localeCompare(seriesNames[i-1]) !== 0) {
                noOfSeries++;
            };
        };
    }
    
    // Build array of all audiences across all books
    let allAudiences = [];
    for (let i = 0; i < noOfBooks; i++) {
        allAudiences.push(allBooks[i].audience);
    }
    // Count how many of each audience appear and add to new array
    let audienceCountObj = {};
    allAudiences.forEach((audience) => {
        audienceCountObj[audience] = (audienceCountObj[audience] || 0) + 1;
    })
    // Map audiences and counts to new array of objects
    let audienceCount = Object.entries(audienceCountObj).map(([key, value]) => ({ audience: key, count: value }));
    // Sort by count and then alphabetically
    audienceCount.sort((a,b) => {
        if (b.count - a.count === 0) {
            return a.audience.localeCompare(b.audience);
        } else {
            return b.count - a.count;
        };
    })

    // Build array of all ratings across all books
    let allRatings = [];
    for (let i = 0; i < noOfBooks; i++) {
        allRatings.push(allBooks[i].rating);
    }
    // Count how many of each rating appear and add to new array
    let ratingCountObj = {};
    allRatings.forEach((rating) => {
        ratingCountObj[rating] = (ratingCountObj[rating] || 0) + 1;
    })
    // Map ratings and counts to new array of objects
    let ratingCount = Object.entries(ratingCountObj).map(([key, value]) => ({ rating: key, count: value }));
    // Sort by count and then alphabetically
    ratingCount.sort((a,b) => {
        if (b.count - a.count === 0) {
            return a.rating.localeCompare(b.rating);
        } else {
            return b.count - a.count;
        };
    })

    // Build array of all genres across all books
    let allGenres = [];
    for (let i = 0; i < noOfBooks; i++) {
        let genreObjs = allBooks[i].genres;
        genreObjs.forEach((genre) => {
            genre = genre.genre;
            allGenres.push(genre);
        })
    }
    // Count how many of each genre appear and add to new array
    let genreCountObj = {};
    allGenres.forEach((genre) => {
        genreCountObj[genre] = (genreCountObj[genre] || 0) + 1;
    })
    // Map genres and counts to new array of objects
    let genreCount = Object.entries(genreCountObj).map(([key, value]) => ({ genre: key, count: value }));
    // Sort by count and then alphabetically
    genreCount.sort((a,b) => {
        if (b.count - a.count === 0) {
            return a.genre.localeCompare(b.genre);
        } else {
            return b.count - a.count;
        };
    })

    // Add together all book word counts, then commaify
    let rawBookWordCount = 0;
    for (i = 0; i < noOfBooks; i++) {
        rawBookWordCount += allBooks[i].rawWordCount;
    }
    let totalBookWordCount = commaify(rawBookWordCount);

    // Add together all book page counts, then commaify
    let rawPageCount = 0;
    for (i = 0; i < noOfBooks; i++) {
        rawPageCount += allBooks[i].rawPageCount;
    }
    let totalPageCount = commaify(rawPageCount);
  

    // Get book stats row div and make empty string for content
    let bookStatsRow = document.getElementById("book-stats-row");
    let bookStatsContent = '';

    // Add content to left column for first row of book stats
    bookStatsContent += '<div class="col-xl-2 col-lg-1 d-md-block d-none"></div>';
    bookStatsContent += '<div class="col-xl-4 col-lg-5 col-md-6 col-12">';
    bookStatsContent += '<p class="content stats-content">Number of Standalone Books:&ensp;' + noOfSingleBooks + '</p>';
    bookStatsContent += '<p class="content stats-content">Number of Series:&ensp;' + noOfSeries + '</p>';
    bookStatsContent += '<p class="content stats-content">Total Number of Books:&ensp;' + noOfBooks + '</p></div>';

    // Add content to right column for first row of book stats
    bookStatsContent += '<div class="stats-right-column col-xl-4 col-lg-5 col-md-6 col-12">'
    bookStatsContent += '<p class="content stats-content">Total Word Count (Books):&ensp;' + totalBookWordCount + '</p>';
    bookStatsContent += '<p class="content stats-content">Total Page Count:&ensp;' + totalPageCount + '</p>';
    bookStatsContent += '</div><div class="col-xl-2 col-lg-1 d-md-block d-none"></div>';

    // Add genres to left column of second row of book stats
    bookStatsContent += '<div class="row"><div class="col-xl-2 col-lg-1 d-md-block d-none"></div>';
    bookStatsContent += '<div class="col-xl-4 col-lg-5 col-md-6 col-12"><p class="content">Genre Count:&ensp;</p>';
    // Make sub-row within genres column and sub-column
    bookStatsContent += '<div class="row"><div class="col-6">';
    // Split genres into two sub-columns within sub-row
    let genresColumn1 = '';
    for (i = 0; i < 11; i++) {
        genresColumn1 += '<p class="stat-item">' + genreCount[i].genre + ':&ensp;' + genreCount[i].count + '</p>';
    }
    bookStatsContent += genresColumn1;
    bookStatsContent += '</div><div class="col-6">';
    let genresColumn2 = '';
    for (i = 11; i < genreCount.length; i++) {
        genresColumn2 += '<p class="stat-item">' + genreCount[i].genre + ':&ensp;' + genreCount[i].count + '</p>';
    }
    bookStatsContent += genresColumn2;
    // Close sub-column, sub-row and column
    bookStatsContent += '</div></div></div>';

    // Add audiences and ratings to right column of second row of book stats
    bookStatsContent += '<div class="col-xl-4 col-lg-5 col-md-6 col-12">';
    // Make sub-row within audience/ratings column
    // Then make audience count sub-column
    bookStatsContent += '<div class="row"><div class="col-6"><p class="content">Audience Count:&ensp;</p>';
    let audienceColumn = '';
    audienceCount.forEach((audience) => {
        audienceColumn += '<p class="stat-item">' + audience.audience + ':&ensp;' + audience.count + '</p>';
    })
    bookStatsContent += audienceColumn;
    // Make rating count sub-column
    bookStatsContent += '</div><div class="col-6"><p class="content">Rating Count:&ensp;</p>';
    let ratingColumn = '';
    ratingCount.forEach((rating) => {
        ratingColumn += '<p class="stat-item">' + rating.rating + ':&ensp;' + rating.count + '</p>';
    })
    bookStatsContent += ratingColumn;
    // Close sub-column, sub-row and column and add last empty spacer div, then close row
    bookStatsContent += '</div></div></div><div class="col-xl-2 col-lg-1 d-md-block d-none"></div></div>';


    // Add book stats content to book stats row HTML
    bookStatsRow.innerHTML = bookStatsContent;


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
