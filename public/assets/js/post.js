window.onload = async function(){
    const postsData = await fetch(`/getPost${window.location.pathname}`).then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    }).then(function(res) {
        // Add post data from Prismic to post object
        let post = {};
        let id = res.uid;
        let number = res.data.number;
        let title = res.data.title;
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
        dateEdited = dayEd + " " + monthEd + " " + yearEd;
        let content = res.data.content;
        let description = res.data.description;
        let type = res.data.type;
        let tags = res.data.tags.split(',');
        post.id = id;
        post.number = number;
        post.title = title;
        post.dateWritten = dateWritten;
        post.dateEdited = dateEdited;
        post.content = content;
        post.description = description;
        post.type = type;
        post.tags = tags;

        // Add post to post section
        let articleDiv = document.getElementById("article-div");
        let article = '';
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
        // Loop through description objects
        let descObjs = post.description;
        let descParas = [];
        descObjs.forEach((line) => {
            line = line.text;
            descParas.push(line);
        });
        // Loop through tags and add hash
        let tags2 = post.tags;
        let hashtags = [];
        tags2.forEach((tag) => {
            tag = '#' + tag;
            hashtags.push(tag);
        })

        // Add data to article HTML
        article += '<article id="' + id + '" class="inner-panel">';
        article += '<h3 class="post-title"><a class="title-link" href="./post/' + id + '">' + titles + '</a></h3>';
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
        articleDiv.innerHTML = article;
    })
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
