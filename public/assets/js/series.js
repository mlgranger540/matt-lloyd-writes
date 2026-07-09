window.onload = async function(){
    const bookData = await fetch("/getAllBooks").then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    }).then(function(res) {
        let allSeries = [];
        res.forEach((x) => {
            console.log(x);
            // If book has a series, add data to book object and add object to array
            if (x.data.series !== null) {
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
                allSeries.push(book);
            }
            // Sort series alphabetically by series name, then by book number
            allSeries.sort((a,b) => {
                if (a.series.localeCompare(b.series) === 0) {
                    return a.bookNumber - b.bookNumber;
                } else {
                    return a.series.localeCompare(b.series);
                }
            });
        });
        
        // Add series and their books to series book section
        let seriesDiv = document.getElementById("series-div");
        let seriesBookshelf = '';
        let noOfSeriesBooks = allSeries.length;
        seriesBookshelf += '<div class="row"><h2 class="book-section-heading">Book Series</h2><hr id="series-separator" class="med-separator"></div>';
        seriesBookshelf += '<div class="bookshelf row">';
        seriesBookshelf += '<h3 class="series-title">' + allSeries[0].series + '</h3>';
        let j = 1;
        for (let i = 0; i < noOfSeriesBooks; i++) {
            let bookTile = '';
            // Check if three books have been added
            // if so, start new bookshelf
            if (i > 0) {
                if (j === 5 || allSeries[i].series.localeCompare(allSeries[i-1].series) !== 0) {
                    seriesBookshelf += '</div><div class="bookshelf row">';
                    seriesBookshelf += '<h3 class="series-title">' + allSeries[i].series + '</h3>';
                    j = 1;
                }
            }
            let id = allSeries[i].id;
            let coverSrc = allSeries[i].coverSrc;
            let coverAlt = allSeries[i].coverAlt;
            // Loop through title objects
            let titleObjs = allSeries[i].title;
            let title = [];
            titleObjs.forEach((ttl) => {
                ttl = ttl.text;
                title.push(ttl);
            });
            let series = allSeries[i].series;
            let bookNumber = allSeries[i].bookNumber;
            let audience = allSeries[i].audience;
            let rating = allSeries[i].rating;
            // Loop through genre objects
            let genreObjs = allSeries[i].genres;
            let genres = [];
            genreObjs.forEach((genre) => {
                genre = genre.genre;
                genres.push(genre);
            });
            // Loop through theme objects
            let themeObjs = allSeries[i].themes;
            let themes = [];
            themeObjs.forEach((theme) => {
                theme = theme.theme;
                themes.push(theme);
            });
            let status = allSeries[i].status;

            // Add content to book tile HTML
            bookTile += '<div id="book-tile-' + j + '" class="col-lg-3 col-md-6 col-12">';
            bookTile += '<div id="' + id + '" class="book-panel"><div id="cover-container">';
            if (coverSrc === undefined ) {
                bookTile += '<a href="/book/' + id + '"><img class="book-cover" src="./assets/images/book-cover-placeholder.png" alt="Placeholder book cover image"></img></a>';
            } else {
                bookTile += '<a href="/book/' + id + '"><img class="book-cover" src="' + coverSrc + '" alt="' + coverAlt + '"></img></a>';
            }
            bookTile += '</div>';
            bookTile += '<div class="title-and-series"><h3 class="book-title"><a class="book-title-link" href="/book/' + id + '">' + title + '</a></h3>';
            if (series !== null) {
                bookTile += '<p class="series-white">Book ' + bookNumber + ' – ' + series + '</p>';
            }
            bookTile += '</div>';
            bookTile += '<p>Audience & Rating:&ensp;' + audience + ' (' + rating + ')</p>';
            bookTile += '<p>Genres:&ensp;' + genres.join(", ") + '</p>';
            bookTile += '<p>Themes:&ensp;' + themes.join(", ") + '</p>';
            bookTile += '<p>Status:&ensp;' + status + '</p>';
            bookTile += '</div></div>';

            // Add book tile to bookshelf
            seriesBookshelf += bookTile;
            j++;
        };
        seriesBookshelf += '</div>';
        // Add bookshelf to series div
        seriesDiv.innerHTML = seriesBookshelf;
    })

    // Add current year to copyright line
    var year = new Date().getFullYear();
    document.getElementById("year").innerHTML = year + " ";
}
