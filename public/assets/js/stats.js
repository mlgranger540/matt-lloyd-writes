window.onload = async function(){
    const postData = await fetch("/getAllPosts").then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    });
    const bookData = await fetch("/getAllBooks").then(function(response) {
        return response.json();
    });

    console.log(postData);

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

    let statsDiv = document.getElementById("book-div");
    let statsContent = '';

    // Update page heading
    statsContent += '<div class="row"><h2 id="stats-heading">Stats for Nerds</h2>';

    let noOfSingleBooks = 0;
    let noOfSeries = 0;
    let noOfBooks = 0;
    let seriesNames = [];
    
    // If book has series, push series name to array
    // Otherwise increase standalone book count
    for (i = 0; i < allBooks.length; i++) {
        noOfBooks++;
        if (allBooks[i].series !== null) {
            seriesNames.push(allBooks[i].series);
        } else {
            noOfSingleBooks++;
        }
    }

    // When new series name is encountered, increase series count
    for (i = 0; i < seriesNames.length; i++) {
        if (i > 0) {
            if (seriesNames[i].localeCompare(seriesNames[i-1]) !== 0) {
                noOfSeries++;
            }
        } 
    }  

    // Add content to left column HTML
    statsContent += '<div class="col-2"></div>';
    statsContent += '<div id="stats-left-column" class="col-4">';
    statsContent += '<p class="content">Number of Standalone Books:&ensp;' + noOfSingleBooks + '</p>';
    statsContent += '<p class="content">Number of Series:&ensp;' + noOfSeries + '</p>';
    statsContent += '<p class="content">Total Number of Books:&ensp;' + noOfBooks + '</p></div>';

    // Add together all book word counts, then commaify
    let rawTotalWordCount = 0;
    for (i = 0; i < allBooks.length; i++) {
        rawTotalWordCount += allBooks[i].rawWordCount;
    }
    let totalWordCount = commaify(rawTotalWordCount);

    // Add content to right column HTML
    statsContent += '<div id="stats-right-column" class="col-4">'
    statsContent += '<p class="content">Total Word Count:&ensp;' + totalWordCount + '</p></div>';
    statsContent += '<div class="col-2"></div>';

    statsDiv.innerHTML = statsContent;

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
