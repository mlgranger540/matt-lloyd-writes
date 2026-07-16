# Matt Lloyd Writes Website

Matt Lloyd Writes is an author website for me to post pieces of my writing such as short stories, excerpts from my books, and poems, as well as an author profile and information about my upcoming books so my readers can find out more about me and my work.

## Design

The site title uses a cursive font called [Seaweed Script](https://fonts.google.com/specimen/Seaweed+Script). The navbar links and some subheadings use a small caps font called [Cinzel](https://fonts.google.com/specimen/Cinzel).

The colour scheme of the website is mostly navy blue background with light blue/white highlights and text. I may also see if I can create a light mode version for those that might prefer that.

The design is quite minimalist to help keep the focus on my writing.

## Features

### Header and Navbar

The website features a simple header with the website name, Matt Lloyd Writes.

The navbar has links to the four main pages of the website - the [Writing](#writing-page) page, [My Books](#my-books), [About the Author](#about-the-author) and [Stats for Nerds](#stats-for-nerds).

### Home Page

The homepage will feature a brief overview of the website for new visitors, as well as showcasing the most recent entries posted to the site. This was achieved by retrieving all the documents stored in Prismic with the type 'post' (see the [Content Management System](#content-management-system) section for more) and sorting them according to the post number from largest to smallest (i.e. newest to oldest). I then use a forEach function to loop through and create an array of post objects, before using for loop to display this data to the page as HTML.

Currently, the first page displays the first five posts, and I then have a set of pagination functions that keep the other posts hidden until you move to the next page.

The posts also only show the first four paragraphs or the first stanza of poems on this page, and then there is a read more link which takes users to the full post (see below). Clicking the title of the post will also do this. This was achieved by creating a for loop over the paragraphs that stops after four, or when it encounters an empty line.

### Writing Page

The writing page contains all the pieces of writing I have posted. It currently functions the same as the Home page, but in the future will include either some kind of sort and filter functionality to allow people to find what they want to read, and/or sub-sections split by type, so visitors can look at all the short stories, poems or novel excerpts in one place.

### Sidebar

There is a sticky sidebar on the Home and Writing containing quick nav links to entries on the page to avoid having to scroll down/up. These instantly scroll to the heading of the entry when clicked, and also dynamically change based on which posts are currently being displayed to the page.

### Single Post Page

Clicking on the title of any post or the read more link will take you to a page containing the full entry for that post. This was done by adding links to the HTML for the title and read more with each post's UID from Prismic, then creating another route that uses the supplied UID to retrieve the matching post from Prismic, so that on the following page only that post's data is displayed. This page also displays all the paragraphs so the full post can be read, as well as the post description, if present.

### My Books Page

The My Books page contains a snapshot of information about all my books, including cover art, book title, series name and book number, audience and rating, genres, themes and status. The books and their details are also stored in Prismic and retrieved in much the same way as the posts, using another route that looks for the type 'book'.

### Single Book Page

Similar to the Post page, the Book page is accessible by clicking on the link in the title or cover image of a book and will take you to a page displaying the full information about that book. As well as the details included on the My Books page, the single book page has more information such as the book synopsis, story archetypes, tropes, setting, characters, POV, tense, current word count and page count.

### About the Author

This page will include a bit about my and my background and other interests, as well as what I generally like to write and how I got into writing.

### Stats for Nerds

As it says on the tin, this page will include all the stats for my work for all the nerds (*\*waves*\*) to enjoy. There will be stats related to my posts, including total word counts of all my posts, and counts of various categories, numbers of stories posted per year, number of each type of post, etc etc. There will also be stats about my books such as the number of series and standalone, number of books per genre/audience/rating/POV etc, total word counts across these, etc etc. Just all the juicy stats goodness ;)

### Features to Add

- Finish About the Author and Stats pages

- Different sections for each type of post on the writing page

- And/or ability to sort/filter things i.e. by title, date, genres/tags, word count etc.

- Series page that shows the full information for all the books in the series

## Content Management System

[Prismic](https://prismic.io/), a headless content management system (CMS), is used to create, manage and publish content to the site.

In Prismic, I have defined a repeatable 'post' type which includes an ID, post number, title, date written, date edited, content, description, type dropdown and tags. I've also defined a 'book' type, which includes information about my books such as cover art, title and series name, synopsis, genres, themes, tropes, setting, characters, word count and more. I enter this information for each piece of writing or book in Prismic where it is saved and stored.

Once published, this data is then converted into JSON to be accessible in my code (with the help of Express(?)). I create a GET route in the index.js file to request data from Prismic, either by type or by UID, as well adding the route rewrites in the firebase.json if needed. I then use a fetch request in JavaScript with the same URI(?) to pull this data into the code, where I can then access the information and display it as HTML on my webpages.

This method means that if I want to change or add anything to a post or book on my website, I simply make the change in Prismic and the new information is immediately reflected on the website, making it very easy to manage all of my website content.

## Deployment

The site is hosted on [Google Firebase](https://firebase.google.com/).

When I am working on the website, I can use the command `firebase serve --only functions, hosting` to serve the website locally for testing. To then deploy the changes to the live site, I use `firebase deploy`.

The live site can be found on two domains, [matt-lloyd-writes.web.app](https://matt-lloyd-writes.web.app/) or [matt-lloyd-writes.firebaseapp.com](https://matt-lloyd-writes.firebaseapp.com/).

## Technologies

### Languages

- HTML5
- CSS3
- JavaScript (Node.js)

### Frameworks, Libraries, Programs, External Stylesheets etc

- [Git](https://git-scm.com/) for version control
- [GitHub](https://github.com/) to store the project repository and back up git commits
- [Bootstrap v5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/) to assist in the structure and design of the site
- [Prismic Headless CMS](https://prismic.io/) to store, manage and publish my content
- [Express JS framework](https://expressjs.com/) to connect to Prismic as well as enable page routing
- [Google Fonts](https://fonts.google.com/) for the headings, links and other text fonts

## Known Bugs

None... so far ;)

(Well, the navbar will be janky on tablets because the dropdown is on hover which you can't do on a tablet... but having the full collapsible one just seems unnecessary, and I'm not sure how/if I can make it on click on tablet. But that's not so much a bug as just something I haven't figured out yet lol)

## Credits

### Code

This [Stack Overflow post](https://stackoverflow.com/questions/60237167/firebase-functions-https-403-forbidden/69158098#69158098) helped fix a 403 Forbidden error when requesting my content from Prismic on the live deployed site, which was due to Firebase not automatically allowing Cloud Function invoking permissions to all users.

I used the [Express Routing docs](https://expressjs.com/en/guide/routing.html) as well as the [Prismic Express docs](https://prismic.io/docs/express-fetch) to help with setting up page routing and get requests for my posts from Prismic.

This [Stack Overflow post](https://stackoverflow.com/questions/62380765/how-to-remove-html-url-endings-and-configure-redirects-in-firebase) helped when trying to remove .html from URLs in the deployed site (`./writing` etc worked in local but not on the live site).

This [Stack Overflow post](https://stackoverflow.com/questions/413439/how-to-dynamically-change-a-web-pages-title) helped with changing the page title dynamically on the single post and book pages.

I used the [W3 Schools guidance](https://www.w3schools.com/howto/howto_css_dropdown_navbar.asp) to create the dropdown in the navbar, as well as this [Stack Overflow post](https://stackoverflow.com/questions/61628295/make-dropdown-menu-same-width-as-button-parent) to help make the dropdown the same width as the parent button.

These Stack Overflow posts [[1](https://stackoverflow.com/questions/71726629/close-dropdown-menu-when-clicking-outside), [2](https://stackoverflow.com/questions/497094/how-do-i-find-out-which-dom-element-has-the-focus), [3](https://stackoverflow.com/questions/11299832/document-activeelement-returns-body-in-onblur-handler)] as well as W3 Schools guidance on [`onblur`](https://www.w3schools.com/jsref/event_onblur.asp), [`onfocusout`](https://www.w3schools.com/jsref/event_onfocusout.asp), [`activeElement`](https://www.w3schools.com/jsref/prop_document_activeelement.asp) and [`relatedTarget`](https://www.w3schools.com/jsref/event_relatedtarget.asp) helped me to make the collapsible navbar dropdown close when clicked out of (but not when a link is clicked, as it was doing when I used `onblur` not `onfocusout` - the latter allowed me to use `relatedTarget` to check what the focus was moving to as `activeElement` was returning the whole body).

This [Stack Overflow post](https://stackoverflow.com/questions/8900732/sort-objects-in-an-array-alphabetically-on-one-property-of-the-array) helped when trying to sort an array of objects alphabetically by one of the properties. Then [this one](https://stackoverflow.com/questions/33174147/sorting-an-array-twice) helped when trying to sort it by two properties!

This [guide](https://www.geeksforgeeks.org/javascript/count-occurrences-of-all-items-in-an-array-in-javascript/) helped with trying to count how many times each genre was used across my books.

This [guide](https://www.geeksforgeeks.org/javascript/create-a-pagination-using-html-css-and-javascript/) helped me to create the pagination on my pages.

These Stack Overflow posts [[1](https://stackoverflow.com/questions/4313841/insert-a-string-at-a-specific-index), [2](https://stackoverflow.com/questions/1798465/remove-last-3-characters-of-a-string)] as well as the [W3 Schools Guidance](https://www.w3schools.com/jsref/jsref_slice_string.asp) helped when I was trying to create a function to add thousand separators to large numbers.

This [Stack Overflow post](https://stackoverflow.com/questions/4076321/javascript-age-calculation) helped me to create a function to work out my current age.

These guides [[1](https://web-highlights.com/blog/turn-your-website-into-a-beautiful-thumbnail-link-preview/), [2](https://www.digitalocean.com/community/tutorials/how-to-add-twitter-card-and-open-graph-social-metadata-to-your-webpage-with-html)] as well as the [Open Graph Docs](https://ogp.me/) helped me to create link previews for my website. This [website](https://www.opengraph.xyz/) is also helpful for testing the previews.

Not related to the actual website, but this [Stack Overflow post](https://stackoverflow.com/questions/17602611/inspect-a-hover-element) taught me how to force an element to show as hover when inspecting, which is very helpful when trying to style on hover effects!

### Content and Media

All written and visual content on the website was created by myself.

The Google Font [Seaweed Script](https://fonts.google.com/specimen/Seaweed+Script) was used for the title, [Cinzel](https://fonts.google.com/specimen/Cinzel) for the navbar links and some sub-headings, [Merriweather](https://fonts.google.com/specimen/Merriweather) for post descriptions, and [Mate](https://fonts.google.com/specimen/Mate) for the body text.
