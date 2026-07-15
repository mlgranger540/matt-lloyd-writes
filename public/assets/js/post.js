window.onload = async function(){
    const postData = await fetch(`/getPost${window.location.pathname}`).then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    }).then(function(res) {
        // Add post data from Prismic to post object
        let post = {};
        let id = res.uid;
        let rawTitle = res.data.title;
        let type = res.data.type;
        let rawDate = new Date(res.data.date_written);
        let dayNum = rawDate.getDate();
        let day = ordinalSuffix(dayNum);
        let month = rawDate.toLocaleString('default', { month: 'long' });
        let year = rawDate.getFullYear();
        let dateWritten = day + " " + month + " " + year;
        let rawDateEd = new Date(res.data.date_edited);
        let dayEdNum = rawDateEd.getDate();
        let dayEd = ordinalSuffix(dayEdNum);
        let monthEd = rawDateEd.toLocaleString('default', { month: 'short' });
        let yearEd = rawDateEd.getFullYear();
        let dateEdited = dayEd + " " + monthEd + " " + yearEd;
        let content = res.data.content;
        let description = res.data.description;
        let rawWordCount = res.data.word_count;
        let wordCount = commaify(rawWordCount);
        let rawGenres = res.data.genres;
        let rawTags = res.data.tags;
        post.id = id;
        post.rawTitle = rawTitle;
        post.type = type;
        post.dateWritten = dateWritten;
        post.dateEdited = dateEdited;
        post.content = content;
        post.description = description;
        post.wordCount = wordCount;
        post.rawGenres = rawGenres;
        post.rawTags = rawTags;

        // Add post to post section
        let articleDiv = document.getElementById("article-div");
        let article = '';
        // Loop through title objects
        let titleObjs = post.rawTitle;
        let title = [];
        titleObjs.forEach((ttl) => {
            ttl = ttl.text;
            title.push(ttl);
        });
        // Update page title with selected post title
        document.title = title + " | Matt Lloyd Writes";
        // Loop through content objects
        let contentObjs = post.content;
        let paragraphs = [];
        contentObjs.forEach((paragraph) => {
            paragraph = paragraph.text;
            paragraphs.push(paragraph);
        });
        // Loop through description objects
        let descObjs = post.description;
        let descParas = [];
        descObjs.forEach((line) => {
            line = line.text;
            descParas.push(line);
        });
        // Loop through genres and tags, add hash and push to hashtags array
        let genres = post.rawGenres;
        let tags = post.rawTags;
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
        article += '<article id="' + id + '" class="inner-panel">';
        article += '<h3 class="post-title"><a class="title-link" href="/post/' + id + '">' + title + '</a></h3>';
        article += '<h4 class="entry-date">' + dateWritten;
        if (dateEdited !== '1st Jan 1970'){
            article += '<span class="edit-date">&ensp;(ed. ' + dateEdited + ')</span>';
        }
        article += '&ensp;—&ensp;<span class="type">' + type + '</span></h4>';
        article += '<div class="content">';
        paragraphs.forEach((paragraph) => {
            article += '<p class="paragraph">' + paragraph + '</p>';
        });
        article += '</div>';
        article += '<p class="word-count">' + wordCount + ' words</p>';
        article += '<div class="short-separator"><hr></div>';
        descParas.forEach((paragraph) => {
            article += '<p class="description">' + paragraph + '</p>';
        });
        article += '<p class="tags">';
        hashtags.forEach((tag) => {
            article += tag + ' &ensp;';
        });
        article += '</p>';
        article += '</article>';
        
        articleDiv.innerHTML = article;
    })

    // Add current year to copyright line
    var year = new Date().getFullYear();
    document.getElementById("year").innerHTML = year + " ";
}

// If collapsed navbar content is visible, make it not visible on click
// If it's not visible, make it visible
function openNav(){
    var collapsedNavbar = document.getElementById("collapsed-content");
    if (collapsedNavbar.style.display === "block") {
        collapsedNavbar.style.display = "none";
    } else {
        collapsedNavbar.style.display = "block";
    }
}

// Add ordinal suffixes to numbers in date
function ordinalSuffix(day){
    if (day % 10 == 1 && day != 11){
        return day + 'st';
    } else if (day % 10 == 2 && day != 12){
        return day + 'nd';
    } else if (day % 10 == 3 && day != 13){
        return day + 'rd';
    } else {
        return day + 'th';
    }
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
