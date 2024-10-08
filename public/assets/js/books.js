window.onload = async function(){
    const bookData = await fetch("/getAllBookDetails").then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    }).then(function(res) {
        // Loop through book details data from Prismic and add to book object
        // then add object to books array
        let allBooks = [];
        res.forEach((i) => {
            let book = {};
            let id = i.uid;
            let title = i.data.book_title;
            let rating = i.data.rating;
            let genres = i.data.genres.split(',');
            let themes = i.data.themes.split(',');
            let archetype = i.data.story_archetype;
            let mainChars = i.data.main_characters.split(',');
            let majChars = i.data.major_characters.split(',');
            let summary = i.data.summary;
            let pov = i.data.pov;
            let tense = i.data.tense;
            let wordCount = i.data.word_count;
            let pageCount = i.data.page_count;
            let status = i.data.status;
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
        
        // Add posts to post section
        let booksDiv = document.getElementById("books-div");
        let bookTile = '';
        // Loop to add books to page
        allBooks.forEach((book) => {
            console.log(book);
            let id = book.id;
            // Loop through title objects
            let titleObjs = book.title;
            let title = [];
            titleObjs.forEach((ttl) => {
                ttl = ttl.text;
                title.push(ttl);
            });
            let rating = book.rating;
            let genres = book.genres;
            let themes = book.themes;
            // Loop through archetype objects
            let archeObjs = book.archetype;
            let archetypes = [];
            archeObjs.forEach((arche) => {
                arche = arche.text;
                archetypes.push(arche);
            });
            let mainChars = book.mainChars;
            let majChars = book.majorChars;
            // Loop through summary objects
            let summObjs = book.summary;
            let summary = [];
            summObjs.forEach((summ) => {
                summ = summ.text;
                summary.push(summ);
            });
            let pov = book.pov;
            let tense = book.tense;
            let wordCount = book.wordCount;
            let pageCount = book.pageCount;
            let status = book.status;

            // Add data to article HTML
            bookTile += '<article id="' + id + '" class="inner-panel">';
            bookTile += '<h3 class="post-title"><a class="title-link" href="./post/' + id + '">' + title + '</a></h3>';
        });
        // booksDiv.innerHTML = bookTile;
    })
}
