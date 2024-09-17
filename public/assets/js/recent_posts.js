window.onload = async function(){
    const postsData = await fetch("/getPosts").then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    }).then(function(res) {
        // Sort responses by post number (largest i.e. newest first)
        res.sort((a,b)=>{return b.data.number-a.data.number});
        // Loop through post data from Prismic and add to post object
        // then add object to posts array
        let allPosts = [];
        res.forEach((i) => {
            let post = {};
            let id = i.uid;
            let number = i.data.number;
            let title = i.data.title;
            let rawDate = new Date(i.data.date_written);
            let dayNum = rawDate.getDate();
            let day = ordinalSuffix(dayNum);
            let month = rawDate.toLocaleString('default', { month: 'long' });
            let year = rawDate.getFullYear();
            let dateWritten = day + " " + month + " " + year;
            let content = i.data.content;
            let description = i.data.description;
            let type = i.data.type;
            let tags = i.data.tags.split(',');
            post.id = id;
            post.number = number;
            post.title = title;
            post.dateWritten = dateWritten;
            post.content = content;
            post.description = description;
            post.type = type;
            post.tags = tags;
            allPosts.push(post);
        });
        
        // Add posts to post section
        let articleDiv = document.getElementById("article-div");
        let quickNav = document.getElementById("quick-nav");
        let article = '';
        let quickNavLinks = '';
        // Loop to add five most recent posts to page
        for (let i = 0; i < 5; i++) {
            let id = allPosts[i].id;
            let number = allPosts[i].number;
            // Loop through title objects
            let titleObjs = allPosts[i].title;
            let titles = [];
            titleObjs.forEach((title) => {
                title = title.text;
                titles.push(title);
            });
            let dateWritten = allPosts[i].dateWritten;
            let type = allPosts[i].type;
            // Loop through content objects
            let contentObjs = allPosts[i].content;
            let paragraphs = [];
            contentObjs.forEach((paragraph) => {
                paragraph = paragraph.text;
                paragraphs.push(paragraph);
            });
            // Loop through description objects
            let descObjs = allPosts[i].description;
            let descParas = [];
            descObjs.forEach((line) => {
                line = line.text;
                descParas.push(line);
            });
            // Loop through tags and add hash
            let tags = allPosts[i].tags;
            let hashtags = [];
            tags.forEach((tag) => {
                tag = '#' + tag;
                hashtags.push(tag);
            })

            // Add data to article HTML
            article += '<article id="' + id + '" class="inner-panel">';
            article += '<h3 class="post-title"><a class="title-link" href="./post/' + id + '">' + titles + '</a></h3>';
            article += '<h4 class="entry-date">' + dateWritten + '&ensp;—&ensp;<span class="type">' + type + '</span></h4>';
            // article += '<p class="type">' + type + '</p>';
            article += '<div class="content">';
            paragraphs.forEach((paragraph) => {
                article += '<p class="paragraph">' + paragraph + '</p>';
            });
            article += '</div>';
            article += '<div class="short-separator"><hr></div>';
            descParas.forEach((paragraph) => {
                article += '<p class="description">' + paragraph + '</p>';
            });
            article += '<p class="tag">';
            hashtags.forEach((tag) => {
                article += tag + ' &ensp;';
            });
            article += '</p>';
            article += '</article>';
            article += '<div><hr></div>';

            // Create quick nav links
            quickNavLinks += '<li><a href="#' + id + '">' + titles + '</a></li>';
        }
        articleDiv.innerHTML = article;
        quickNav.innerHTML = quickNavLinks;
    });
};

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
};
