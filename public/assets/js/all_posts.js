window.onload = async function(){
    const postData = await fetch("/getAllPosts").then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    }).then(function(res) {
        // Loop through post data from Prismic and add to post object
        // then add object to posts array
        let allPosts = [];
        res.forEach((i) => {
            let post = {};
            let id = i.uid;
            let title = i.data.title;
            let type = i.data.type;
            let rawDate = new Date(i.data.date_written);
            let dayNum = rawDate.getDate();
            let day = ordinalSuffix(dayNum);
            let month = rawDate.toLocaleString('default', { month: 'long' });
            let year = rawDate.getFullYear();
            let dateWritten = day + " " + month + " " + year;
            let rawDateEd = new Date(i.data.date_edited);
            let dayEdNum = rawDateEd.getDate();
            let dayEd = ordinalSuffix(dayEdNum);
            let monthEd = rawDateEd.toLocaleString('default', { month: 'short' });
            let yearEd = rawDateEd.getFullYear();
            let dateEdited = dayEd + " " + monthEd + " " + yearEd;
            let content = i.data.content;
            let rawWordCount = i.data.word_count;
            let wordCount = commaify(rawWordCount);
            let genres = i.data.genres;
            let tags = i.data.tags;
            post.id = id;
            post.title = title;
            post.type = type;
            post.dateWritten = dateWritten;
            post.dateEdited = dateEdited;
            post.content = content;
            post.wordCount = wordCount;
            post.genres = genres;
            post.tags = tags;
            allPosts.push(post);
        })

        // Loop through posts and make array of all types
        let allTypes = [];
        allPosts.forEach((post) => {
            allTypes.push(post.type);
        })
        // Then add to new array if type isn't already present
        let typeOptions = [];
        allTypes.forEach((type) => {
            if (!typeOptions.includes(type)) {
                typeOptions.push(type);
            };
        })

        // Loop through posts and make array of all genres
        let allGenres = [];
        allPosts.forEach((post) => {
            let genres = post.genres;
            genres.forEach((gen) => {
                if (gen.genre !== null) {
                    gen = gen.genre;
                    allGenres.push(gen);
                };
            });
        })
        // Then add to new array if genre isn't already present
        let genreOptions = [];
        allGenres.forEach((genre) => {
            if (!genreOptions.includes(genre)) {
                genreOptions.push(genre);
            };
        })

        // Loop through posts and make array of all tags
        let allTags = [];
        allPosts.forEach((post) => {
            let tags = post.tags;
            tags.forEach((tag) => {
                if (tag.tag !== null) {
                    tag = tag.tag;
                    allTags.push(tag);
                };
            });
        })
        // Then add to new array if tag isn't already present
        let tagOptions = [];
        allTags.forEach((tag) => {
            if (!tagOptions.includes(tag)) {
                tagOptions.push(tag);
            };
        })

        // Add list of types to types dropdown
        let typeList = document.getElementById("type-list");
        typeOptions.forEach((option) => {
            typeList.innerHTML += '<li class="list-item">' + option + '</li>';
        })
        // Add list of genres to genres dropdown
        let genresList = document.getElementById("genres-list");
        genreOptions.forEach((option) => {
            genresList.innerHTML += '<li class="list-item">' + option + '</li>';
        })
        // Add list of tags to tags dropdown
        let tagsList = document.getElementById("tags-list");
        tagOptions.forEach((option) => {
            tagsList.innerHTML += '<li class="list-item">' + option + '</li>';
        })

        // Add posts to post section
        let articleDiv = document.getElementById("article-div");
        let quickNav = document.getElementById("quick-nav");
        let article = '';
        let quickNavLinks = '';
        // Loop to add all posts to page
        for (let i = 0; i < allPosts.length; i++) {
            let id = allPosts[i].id;
            // Loop through title objects
            let titleObjs = allPosts[i].title;
            let title = [];
            titleObjs.forEach((ttl) => {
                ttl = ttl.text;
                title.push(ttl);
            });
            let dateWritten = allPosts[i].dateWritten;
            let dateEdited = allPosts[i].dateEdited;
            let type = allPosts[i].type;
            // Loop through content objects
            let contentObjs = allPosts[i].content;
            let paragraphs = [];
            contentObjs.forEach((paragraph) => {
                paragraph = paragraph.text;
                paragraphs.push(paragraph);
            });
            let wordCount = allPosts[i].wordCount;
            // Loop through genres and tags, add hash and push to hashtags array
            let genres = allPosts[i].genres;
            let tags = allPosts[i].tags;
            let hashtags = [];
            genres.forEach((gen) => {
                if (gen.genre !== null) {
                    gen = gen.genre;
                    gen = '#' + gen;
                    hashtags.push(gen);
                };
            });
            tags.forEach((tag) => {
                tag = tag.tag;
                tag = '#' + tag;
                hashtags.push(tag);
            });

            // Add data to article HTML
            article += '<article id="' + id + '" class="inner-panel ' + type.replace(' ','-') + '">';
            article += '<h3 class="post-title"><a class="title-link" href="/post/' + id + '">' + title + '</a></h3>';
            article += '<h4 class="entry-date">' + dateWritten;
            if (dateEdited !== '1st Jan 1970'){
                article += '<span class="edit-date">&ensp;(ed. ' + dateEdited + ')</span>';
            }
            article += '&ensp;—&ensp;<span class="type">' + type + '</span></h4>';
            article += '<div class="content">';
            // Loop through paragraphs and add first four
            // But when encountering empty line, break
            for (let i = 0; i < 4; i++) {
                if (paragraphs[i] === " ") {
                    break;
                } else {
                    article += '<p class="paragraph">' + paragraphs[i] + '</p>';
                };
            };
            article += '<p class="word-count-preview">' + wordCount + ' words</p>';
            article += '<p class="tbc-dots">...</p>'
            article += '</div>';
            article += '<p class="read-more"><a class="read-more-link" href="/post/' + id + '">Read More</a></p>';
            article += '<p class="tags">';
            hashtags.forEach((tag) => {
                article += tag + ' &ensp;';
            });
            article += '</p>';
            article += '<div><hr></div>';
            article += '</article>';

            // Create quick nav links
            quickNavLinks += '<li class="quick-nav-link"><a href="#' + id + '">' + title + '</a></li>';
        }

        // Create pagination div
        let paginationDiv = '';
        paginationDiv += '<div id="pagination" class="pagination"><button id="prev" class="pagination-link" type="button" href="#">Previous</button>';
        paginationDiv += '<div id="page-link-div" class="pagination-link"></div><button id="next" class="pagination-link" type="button" href="#">Next</button>';
        paginationDiv += '<div class="break"></div><div id="pagination-row-2"><p id="page-numbers"></p></div>';

        // Add articles, pagination and quick nav links to page
        articleDiv.innerHTML = article;
        articleDiv.innerHTML += paginationDiv;
        quickNav.innerHTML = quickNavLinks;

        const postsPerPage = 5;
        const pagination = document.getElementById('pagination');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        const pageNumbers = document.getElementById('page-numbers');
        // Make arrays from posts and quick nav links
        const posts = Array.from(articleDiv.getElementsByClassName('inner-panel'));
        const quickNavArray = Array.from(quickNav.getElementsByClassName('quick-nav-link'));

        // Calculate the total number of pages 
        const totalPages = Math.ceil(posts.length / postsPerPage);
        let currentPage = 1;

        // Add page number links for number of pages
        let pageLinkDiv = document.getElementById('page-link-div');
        for (let i = 0; i < totalPages; i++) {
            pageLinkDiv.innerHTML += '<button class="pagination-link page-link" type="button" href="#" data-page="' + (i+1) + '">' + (i+1) + '</button>';
        }
        const pageLinks = document.querySelectorAll('.page-link');

        // Function to display posts for a specific page 
        function displayPage(page) {
            const startIndex = (page - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            posts.forEach((post, index) => {
                if (index >= startIndex && index < endIndex) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                };
            });
            quickNavArray.forEach((link, index) => {
                if (index >= startIndex && index < endIndex) {
                    link.style.display = 'block';
                } else {
                    link.style.display = 'none';
                };
            });
        }

        // Function to update pagination buttons and page numbers 
        function updatePagination() {
            pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
            // Toggle Previous/Next buttons disabled when there are no more pages
            if (currentPage === 1) {
                prevButton.disabled = true;
            } else {
                prevButton.disabled = false;
            }
            if (currentPage === totalPages) {
                nextButton.disabled = true;
            } else {
                nextButton.disabled = false;
            };
            // Make page link show active for current page
            pageLinks.forEach((link) => {
                const page = parseInt(link.getAttribute('data-page')); 
                link.classList.toggle('active', page === currentPage); 
            });
        }

        let pageTop = document.getElementById("top");

        // Event listener for Previous button
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayPage(currentPage);
                updatePagination();
                pageTop.scrollIntoView();
            };
        })

        // Event listener for Next button
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayPage(currentPage);
                updatePagination();
                pageTop.scrollIntoView();
            };
        })

        // Event listener for page number buttons
        pageLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(link.getAttribute('data-page'));
                if (page !== currentPage) {
                    currentPage = page;
                    displayPage(currentPage);
                    updatePagination();
                    pageTop.scrollIntoView();
                };
            });
        })

        // Initial page load 
        displayPage(currentPage); 
        updatePagination();

        // for (i = 0; i < posts.length; i++) {
        //     let classNames = posts[i].className.split(" ");
        //     if (classNames.includes("Short-Story")) {
        //         posts[i].style.display = "block";
        //     } else {
        //         posts[i].style.display = "none";
        //         console.log(posts[i]);
        //         console.log(posts[i].style.display);
        //     };
        // }
    })

    // Get sort/filter buttons and dropdowns
    let typeButton = document.getElementById("type-button");
    let genresButton = document.getElementById("genres-button");
    let tagsButton = document.getElementById("tags-button");
    let sortButton = document.getElementById("sort-button");
    let typeDropdown = document.getElementById("type-dropdown");
    let genresDropdown = document.getElementById("genres-dropdown");
    let tagsDropdown = document.getElementById("tags-dropdown");
    let sortDropdown = document.getElementById("sort-dropdown");

    // If type dropdown is open, close it and change caret; if it's closed, open it and change caret
    // Also if any other dropdowns are open when opening type, close them and change their carets
    function openTypeDropdown() {
        if (typeDropdown.style.display === "block") {
            typeDropdown.style.display = "none";
            typeButton.innerHTML = 'Type&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        } else {
            typeDropdown.style.display = "block";
            typeButton.innerHTML = 'Type&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C7</span>';
        };
        if (genresDropdown.style.display === "block") {
            genresDropdown.style.display = "none";
            genresButton.innerHTML = 'Genres&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        };
        if (tagsDropdown.style.display === "block") {
            tagsDropdown.style.display = "none";
            tagsButton.innerHTML = 'Tags&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        };
        if (sortDropdown.style.display === "block") {
            sortDropdown.style.display = "none";
            sortButton.innerHTML = 'Sort&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        };
    }

    // If genres dropdown is open, close it and change caret; if it's closed, open it and change caret
    // Also if any other dropdowns are open when opening genres, close them and change their carets
    function openGenresDropdown() {
        if (genresDropdown.style.display === "block") {
            genresDropdown.style.display = "none";
            genresButton.innerHTML = 'Genres&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        } else {
            genresDropdown.style.display = "block";
            genresButton.innerHTML = 'Genres&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C7</span>';
        };
        if (typeDropdown.style.display === "block") {
            typeDropdown.style.display = "none";
            typeButton.innerHTML = 'Type&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        };
        if (tagsDropdown.style.display === "block") {
            tagsDropdown.style.display = "none";
            tagsButton.innerHTML = 'Tags&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        };
        if (sortDropdown.style.display === "block") {
            sortDropdown.style.display = "none";
            sortButton.innerHTML = 'Sort&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        };
    }

    // If tags dropdown is open, close it and change caret; if it's closed, open it and change caret
    // Also if any other dropdowns are open when opening tags, close them and change their carets
    function openTagsDropdown() {
        if (tagsDropdown.style.display === "block") {
            tagsDropdown.style.display = "none";
            tagsButton.innerHTML = 'Tags&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        } else {
            tagsDropdown.style.display = "block";
            tagsButton.innerHTML = 'Tags&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C7</span>';
        };
        if (typeDropdown.style.display === "block") {
            typeDropdown.style.display = "none";
            typeButton.innerHTML = 'Type&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        };
        if (genresDropdown.style.display === "block") {
            genresDropdown.style.display = "none";
            genresButton.innerHTML = 'Genres&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        };
        if (sortDropdown.style.display === "block") {
            sortDropdown.style.display = "none";
            sortButton.innerHTML = 'Sort&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        };
    }

    // If sort dropdown is open, close it and change caret; if it's closed, open it and change caret
    // Also if any other dropdowns are open when opening sort, close them and change their carets
    function openSortDropdown() {
        if (sortDropdown.style.display === "block") {
            sortDropdown.style.display = "none";
            sortButton.innerHTML = 'Sort&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        } else {
            sortDropdown.style.display = "block";
            sortButton.innerHTML = 'Sort&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C7</span>';
        };
        if (typeDropdown.style.display === "block") {
            typeDropdown.style.display = "none";
            typeButton.innerHTML = 'Type&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        };
        if (genresDropdown.style.display === "block") {
            genresDropdown.style.display = "none";
            genresButton.innerHTML = 'Genres&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        };
        if (tagsDropdown.style.display === "block") {
            tagsDropdown.style.display = "none";
            tagsButton.innerHTML = 'Tags&ensp;<span class="material-symbols-outlined dropdown-caret">&#xE5C5</span>';
        };
    }

    // Add event listeners for sort/filter buttons
    typeButton.addEventListener("click", openTypeDropdown);
    genresButton.addEventListener("click", openGenresDropdown);
    tagsButton.addEventListener("click", openTagsDropdown);
    sortButton.addEventListener("click", openSortDropdown);


    var sidebar = document.getElementById("side-panel-1");
    var offsetTop = sidebar.offsetTop;
    
    // When scrolling past sidebar, make sticky
    // When scrolling back up, unstick
    function stick() {
        if (window.scrollY >= offsetTop) {
            sidebar.classList.add("sticky");
        } else {
            sidebar.classList.remove("sticky");
        };
    }

    window.addEventListener("scroll", stick);

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

// Add ordinal suffixes to numbers in date
function ordinalSuffix(day) {
    if (day % 10 == 1 && day != 11){
        return day + 'st';
    } else if (day % 10 == 2 && day != 12){
        return day + 'nd';
    } else if (day % 10 == 3 && day != 13){
        return day + 'rd';
    } else {
        return day + 'th';
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
