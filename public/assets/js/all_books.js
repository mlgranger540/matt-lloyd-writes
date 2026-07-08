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
            let series = x.data.series;
            let bookNumber = x.data.book_number;
            let audience = x.data.audience;
            let rating = x.data.rating;
            let genres = x.data.genres;
            let themes = x.data.themes;
            let tropes = x.data.tropes;
            let archetypes = x.data.story_archetypes;
            let setting = x.data.setting;
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
            book.series = series;
            book.bookNumber = bookNumber;
            book.audience = audience;
            book.rating = rating;
            book.genres = genres;
            book.themes = themes;
            book.tropes = tropes;
            book.archetypes = archetypes;
            book.setting = setting;
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
            let series = allBooks[i].series;
            let bookNumber = allBooks[i].bookNumber;
            let audience = allBooks[i].audience;
            let rating = allBooks[i].rating;
            // Loop through genre objects
            let genreObjs = allBooks[i].genres;
            let genres = [];
            genreObjs.forEach((genre) => {
                genre = genre.genre;
                genres.push(genre);
            });
            // Loop through theme objects
            let themeObjs = allBooks[i].themes;
            let themes = [];
            themeObjs.forEach((theme) => {
                theme = theme.theme;
                themes.push(theme);
            });
            // Loop through trope objects
            let tropeObjs = allBooks[i].tropes;
            let tropes = [];
            tropeObjs.forEach((trope) => {
                trope = trope.trope;
                tropes.push(trope);
            });
            // Loop through archetype objects
            let archeObjs = allBooks[i].archetypes;
            let archetypes = [];
            archeObjs.forEach((arche) => {
                arche = arche.story_archetype;
                archetypes.push(arche);
            });
            let setting = allBooks[i].setting;
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

            // Add content to book tile HTML
            bookTile += '<div id="book-tile-' + j + '" class="col-md-4 col-12">';
            bookTile += '<div id="' + id + '" class="book-panel"><div id="cover-container">';
            if (coverSrc === undefined ) {
                bookTile += '<a href="/book/' + id + '"><img class="book-cover" src="./assets/images/book-cover-placeholder.png" alt="Placeholder book cover image"></img></a>';
            } else {
                bookTile += '<a href="/book/' + id + '"><img class="book-cover" src="' + coverSrc + '" alt="' + coverAlt + '"></img></a>';
            }
            bookTile += '</div>';
            bookTile += '<div class="title-and-series"><h3 class="book-title"><a class="book-title-link" href="/book/' + id + '">' + title + '</a></h3>';
            if (series !== null) {
                bookTile += '<p class="series">Book ' + bookNumber + ' – ' + series + '</p>';
            }
            bookTile += '</div>';
            bookTile += '<p>Audience & Rating:&ensp;' + audience + ' (' + rating + ')</p>';
            bookTile += '<p>Genres:&ensp;' + genres.join(", ") + '</p>';
            bookTile += '<p>Themes:&ensp;' + themes.join(", ") + '</p>';
            bookTile += '<p>Status:&ensp;' + status + '</p>';
            bookTile += '</div></div>';

            // Add book tile to bookshelf
            bookshelf += bookTile;
            j++;
        };
        bookshelf += '</div>';
        booksDiv.innerHTML = bookshelf;
    })

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
