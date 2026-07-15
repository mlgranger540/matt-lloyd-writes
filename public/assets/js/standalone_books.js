window.onload = async function(){
    const bookData = await fetch("/getAllBooks").then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    }).then(function(res) {
        let allSingleBooks = [];
        res.forEach((x) => {
            console.log(x);
            // If book has no series, add data to book object and add object to array
            if (x.data.series === null) {
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
                book.status = status;
                allSingleBooks.push(book);
            }
            // Sort single books alphabetically by uid
            allSingleBooks.sort((a,b) => {return a.id.localeCompare(b.id)});
        });
        
        // Add books to book section
        let booksDiv = document.getElementById("books-div");
        let singleBookshelf = '';
        let noOfSingleBooks = allSingleBooks.length;
        singleBookshelf += '<div class="row"><h2 class="book-section-heading">Standalone Books</h2><hr id="book-heading-separator" class="med-separator"></div>';
        singleBookshelf += '<div class="bookshelf row">';
        // Loop through book array and add four books to each shelf
        let k = 1;
        for (let i = 0; i < noOfSingleBooks; i++) {
            let bookTile = '';
            // Check if four books have been added
            // if so, start new bookshelf
            if (k === 5) {
                singleBookshelf += '</div><div class="bookshelf row">';
                k = 1;
            }
            let id = allSingleBooks[i].id;
            let coverSrc = allSingleBooks[i].coverSrc;
            let coverAlt = allSingleBooks[i].coverAlt;
            // Loop through title objects
            let titleObjs = allSingleBooks[i].title;
            let title = [];
            titleObjs.forEach((ttl) => {
                ttl = ttl.text;
                title.push(ttl);
            });
            let series = allSingleBooks[i].series;
            let bookNumber = allSingleBooks[i].bookNumber;
            let audience = allSingleBooks[i].audience;
            let rating = allSingleBooks[i].rating;
            // Loop through genre objects
            let genreObjs = allSingleBooks[i].genres;
            let genres = [];
            genreObjs.forEach((genre) => {
                genre = genre.genre;
                genres.push(genre);
            });
            // Loop through theme objects
            let themeObjs = allSingleBooks[i].themes;
            let themes = [];
            themeObjs.forEach((theme) => {
                theme = theme.theme;
                themes.push(theme);
            });
            let status = allSingleBooks[i].status;

            // Add content to book tile HTML
            bookTile += '<div id="book-tile-' + k + '" class="col-lg-3 col-md-6 col-12">';
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
            singleBookshelf += bookTile;
            k++;
        }
        singleBookshelf += '</div>';
        // Add bookshelf to books div
        booksDiv.innerHTML = singleBookshelf;
    })

    // Add current year to copyright line
    var year = new Date().getFullYear();
    document.getElementById("year").innerHTML = year + " ";
}
