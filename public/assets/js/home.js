window.onload = async function(){
    const postsData = await fetch("/getPosts").then(function(response) {
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
            let rawDate = new Date(i.data.date_written);
            let dayNum = rawDate.getDate();
            let day = ordinalSuffix(dayNum);
            let month = rawDate.toLocaleString('default', { month: 'long' });
            let year = rawDate.getFullYear();
            let dateWritten = day + " " + month + " " + year;
            let content = i.data.content;
            let type = i.data.type;
            let tags = i.data.tags.split(',');
            post.id = id;
            post.title = title;
            post.dateWritten = dateWritten;
            post.content = content;
            post.type = type;
            post.tags = tags;
            allPosts.push(post);
        });
        
        // Add posts to post section
        let articleDiv = document.getElementById("article-div");
        let quickNav = document.getElementById("quick-nav");
        let article = '';
        let quickNavLinks = '';
        allPosts.forEach((post) => {
            let id = post.id;
            // Loop through title objects
            let titleObjs = post.title;
            let titles = [];
            titleObjs.forEach((title) => {
                title = title.text;
                titles.push(title);
            });
            // Loop through content objects
            let contentObjs = post.content;
            let paragraphs = [];
            contentObjs.forEach((paragraph) => {
                paragraph = paragraph.text;
                paragraphs.push(paragraph);
            });
            let dateWritten = post.dateWritten;
            let type = post.type;
            // Loop through tags and add hash
            let tags = post.tags;
            let hashtags = [];
            tags.forEach((tag) => {
                tag = '#' + tag;
                hashtags.push(tag);
            })

            // Add data to article HTML
            article += '<article id="' + id + '" class="inner-panel">';
            article += '<h3>' + titles + '</h3>';
            article += '<h4 class="entry-date">' + dateWritten + '</h4>';
            paragraphs.forEach((paragraph) => {
                article += '<p>' + paragraph + '</p>';
            })
            article += '<p class="type">' + type + '</p>';
            article += '<p class="tag">';
            hashtags.forEach((tag) => {
                article += tag + '&nbsp;&nbsp;';
            })
            article += '</p>';
            article += '</article>';
            article += '<div class="separator"><hr></div>';

            // Create quick nav links
            quickNavLinks += '<li><a href="#' + id + '">' + titles + '</a></li>';
        });
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
