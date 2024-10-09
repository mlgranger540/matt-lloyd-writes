window.onload = async function(){
    const bookData = await fetch("/getAllBookDetails").then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    }).then(function(res) {
        // Loop through book details data from Prismic and add to book object
        // then add object to books array
        let allBooks = [];
        res.forEach((x) => {
            let book = {};
            let id = x.uid;
            let title = x.data.book_title;
            let rating = x.data.rating;
            let genres = x.data.genres;
            let themes = x.data.themes;
            let archetype = x.data.story_archetype;
            let mainChars = x.data.main_characters;
            let majChars = x.data.major_characters;
            let summary = x.data.summary;
            let pov = x.data.pov;
            let tense = x.data.tense;
            let rawWordCount = x.data.word_count;
            let wordCount = commaify(rawWordCount);
            let rawPageCount = x.data.page_count;
            let pageCount = commaify(rawPageCount);
            let status = x.data.status;
            book.id = id;
            book.title = title;
            book.rating = rating;
            book.genres = genres;
            book.themes = themes;
            book.archetype = archetype;
            book.mainChars = mainChars;
            book.majChars = majChars;
            book.summary = summary;
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
            // Loop through title objects
            let titleObjs = allBooks[i].title;
            let title = [];
            titleObjs.forEach((ttl) => {
                ttl = ttl.text;
                title.push(ttl);
            });
            let rating = allBooks[i].rating;
            let genres = allBooks[i].genres;
            let themes = allBooks[i].themes;
            // Loop through archetype objects
            let archeObjs = allBooks[i].archetype;
            let archetypes = [];
            archeObjs.forEach((arche) => {
                arche = arche.text;
                archetypes.push(arche);
            });
            let mainChars = allBooks[i].mainChars;
            let majChars = allBooks[i].majChars;
            // Loop through summary objects
            let summObjs = allBooks[i].summary;
            let summary = [];
            summObjs.forEach((summ) => {
                summ = summ.text;
                summary.push(summ);
            });
            let pov = allBooks[i].pov;
            let tense = allBooks[i].tense;
            let wordCount = allBooks[i].wordCount;
            let pageCount = allBooks[i].pageCount;
            let status = allBooks[i].status;

            // Add to book tile HTML
            bookTile += '<div id="book-tile-' + j + '" class="col-4">';
            bookTile += '<div id=">' + id + '" class="book-panel">';
            bookTile += '<h3 class="book-title">' + title + '</h3>';
            bookTile += '<p class="book-details">Rating: ' + rating + '</p>';
            bookTile += '<p class="book-details">Genres: ' + genres + '</p>';
            bookTile += '<p class="book-details">Themes: ' + themes + '</p>';
            bookTile += '<p class="book-details">Story Archetype: ' + archetypes + '</p>';
            bookTile += '<p class="book-details">POV/Tense: ' + pov + ' / ' + tense + '</p>';
            bookTile += '<p class="book-details">Main Characters: ' + mainChars + '</p>';
            bookTile += '<p class="book-details">Major Characters: ' + majChars + '</p>';
            bookTile += '<p class="book-details">Summary: ' + summary + '</p>';
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
};

function commaify(num){
    let numStr = num.toString();
    if (numStr / 1000000 >1){
        var numEnd = numStr.slice(-3);
        var numMid = numStr.slice(-6,-3);
        var numBeg = numStr.slice(0,-6);
        var commaNum = numBeg + ',' + numMid + ',' + numEnd;
        return(commaNum);
    } else if (numStr / 1000 >1){
        var numEnd = numStr.slice(-3);
        var numBeg = numStr.slice(0,-3);
        var commaNum = numBeg + ',' + numEnd;
        return commaNum;
    } else {
        return numStr;
    }
};
