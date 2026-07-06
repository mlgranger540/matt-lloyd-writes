window.onload = async function(){
    const bookData = await fetch("/getAllBooks").then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    }).then(function(res) {
        // Sort book data alphabetically by uid
        res.sort((a,b)=>{return a.uid.localeCompare(b.uid)});
        // Loop through book data from Prismic and add to book object
        // then add object to books array
        let allBooks = [];
        res.forEach((x) => {
            console.log(x);
            let book = {};
            let id = x.uid;
            let coverSrc = x.data.cover.url;
            let coverAlt = x.data.cover.alt;
            let title = x.data.book_title;
            let seriesName = x.data.series_name;
            let bookNumber = x.data.book_number;
            let audience = x.data.audience;
            let rating = x.data.rating;
            let genres = x.data.genres;
            let themes = x.data.themes;
            let archetype = x.data.story_archetype;
            let mainChars = x.data.main_characters;
            let majChars = x.data.major_characters;
            let antagonists = x.data.antagonists;
            let synopsis = x.data.synopsis;
            let pov = x.data.pov;
            let tense = x.data.tense;
            let rawWordCount = x.data.word_count;
            let wordCount = commaify(rawWordCount);
            let rawPageCount = x.data.page_count;
            let pageCount = commaify(rawPageCount);
            let status = x.data.status;
            book.id = id;
            book.coverSrc = coverSrc;
            book.coverAlt = coverAlt;
            book.title = title;
            book.seriesName = seriesName;
            book.bookNumber = bookNumber;
            book.audience = audience;
            book.rating = rating;
            book.genres = genres;
            book.themes = themes;
            book.archetype = archetype;
            book.mainChars = mainChars;
            book.majChars = majChars;
            book.antagonists = antagonists;
            book.synopsis = synopsis;
            book.pov = pov;
            book.tense = tense;
            book.wordCount = wordCount;
            book.pageCount = pageCount;
            book.status = status;
            allBooks.push(book);
        });
        
        // Add books to book section
        let booksDiv = document.getElementById("books-div");
        let bookshelf = '';
        let noOfBooks = allBooks.length;
        bookshelf += '<div class="bookshelf row">';
        // Loop to add three books to each shelf
        let j = 1;
        for (let i = 0; i < noOfBooks; i++) {
            let bookTile = '';
            // Check if three books have been added
            // if so, start new bookshelf
            if (j === 4) {
                bookshelf += '</div><div class="bookshelf row">';
                j = 1;
            }
            let id = allBooks[i].id;
            let coverSrc = allBooks[i].coverSrc;
            let coverAlt = allBooks[i].coverAlt;
            // Loop through title objects
            let titleObjs = allBooks[i].title;
            let title = [];
            titleObjs.forEach((ttl) => {
                ttl = ttl.text;
                title.push(ttl);
            });
            let seriesName = allBooks[i].seriesName;
            let bookNumber = allBooks[i].bookNumber;
            let audience = allBooks[i].audience;
            let rating = allBooks[i].rating;
            let genres = allBooks[i].genres;
            let themes = allBooks[i].themes;
            let archetype = allBooks[i].archetype;
            let mainChars = allBooks[i].mainChars;
            let majChars = allBooks[i].majChars;
            let antagonists = allBooks[i].antagonists;
            // Loop through synopsis objects
            let synopsisObjs = allBooks[i].synopsis;
            let synopsis = [];
            synopsisObjs.forEach((syn) => {
                syn = syn.text;
                synopsis.push(syn);
            });
            let pov = allBooks[i].pov;
            let tense = allBooks[i].tense;
            let wordCount = allBooks[i].wordCount;
            let pageCount = allBooks[i].pageCount;
            let status = allBooks[i].status;

            // Add to book tile HTML
            bookTile += '<div id="book-tile-' + j + '" class="col-4">';
            bookTile += '<div id=">' + id + '" class="book-panel">';
            bookTile += '<img class="book-cover" src="' + coverSrc + '" alt="' + coverAlt + '"></img>';
            bookTile += '<div class="title-and-series"><h3 class="book-title">' + title + '</h3>';
            if (seriesName !== null) {
                bookTile += '<p class="series">Book ' + bookNumber + ' – ' + seriesName + '</p>';
            }
            bookTile += '</div>';
            bookTile += '<p class="book-details">Audience: ' + audience + '</p>';
            bookTile += '<p class="book-details">Rating: ' + rating + '</p>';
            bookTile += '<p class="book-details">Genres: ' + genres + '</p>';
            bookTile += '<p class="book-details">Themes: ' + themes + '</p>';
            bookTile += '<p class="book-details">Story Archetype: ' + archetype + '</p>';
            bookTile += '<p class="book-details">Synopsis: ' + synopsis + '</p>';
            bookTile += '<p class="book-details">POV/Tense: ' + pov + ' / ' + tense + '</p>';
            bookTile += '<p class="book-details">Main Characters: ' + mainChars + '</p>';
            bookTile += '<p class="book-details">Major Characters: ' + majChars + '</p>';
            bookTile += '<p class="book-details">Antagonists: ' + antagonists + '</p>';
            bookTile += '<hr>'
            bookTile += '<p class="book-details">Word Count: ' + wordCount + '</p>';
            bookTile += '<p class="book-details">Page Count: ' + pageCount + '</p>';
            bookTile += '<p class="book-details">Status: ' + status + '</p>';
            bookTile += '</div></div>'

            // Add book tile to bookshelf
            bookshelf += bookTile;
            j++;
        };
        bookshelf += '</div>';
        booksDiv.innerHTML = bookshelf;
    });

    // Add current year to copyright line
    var year = new Date().getFullYear();
    document.getElementById("year").innerHTML = year + " ";
};

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
};
