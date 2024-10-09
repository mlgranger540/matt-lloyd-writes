# Matt Lloyd Writes Website

Matt Lloyd Writes is an author website for me to post pieces of my writing such as short stories, excerpts from my books, and poems, as well as an author profile and information about my upcoming books so my readers can find out more about me and my work.

## Design

## Features

### Header

The website features a simple header with the website name, Matt Lloyd Writes, in a cursive font calleed [Seaweed Script](https://fonts.google.com/specimen/Seaweed+Script).

### Navbar

The navbar has links to the four main pages of the website - the [Writing Page](#writing-page), [My Books](#my-books), [About the Author](#about-the-author) and [Stats for Nerds](#stats-for-nerds).

### Side Bar

There is a side bar on some pages containing quicknav links to entries on the page to avoid having to scroll down, and will also probably include other features in the future.

### Home Page

The homepage will feature a brief overview of the website for new visitors, as well as showcasing the five most recent entries posted to the site. This was achieved by getting all the documents stored in Prismic with the type 'post' (see the [Content Management System](#content-management-system) section for more) and sorting them according to the post number from largest to smallest (i.e. newest to oldest). I then use a forEach function to loop through and create an array of post objects, before using for loop to display this data to the page as HTML, but only for the first 5 posts.

### Writing Page

The writing page contains all the pieces of writing I have posted, and will include sub-sections split by type, so visitors can look at all the short stories, poems or novel excerpts in one place.

### Post Page

Clicking on the title of any post will take you to a page containing just that entry. This was done by adding a link to the HTML for the title with each post's uid from Prismic, then creating another route that uses the supplied uid to retrieve the matching post from Prismic, so that on the following page only that post's data is displayed to the page.

### My Books

The My Books page will contain a summary of all my books, including title, genres, characters, summary, word count and so on. These are also stored in Prismic and retrieved in much the same way as the posts, using another route that looks for the type 'book_details'.

### About the Author

This page will include a bit about my and my background and other interests, as well as what I generally like to write and how I got into writing.

### Stats for Nerds

As it says on the tin, this page will include all the stats for my work - including total word counts of everything I've posted, and counts of various categories, numbers of stories posted per year, number of each type of post, etc etc.

### Features to Add

- About the Author and Stats pages

- Different sections for each type of post on the writing page

- Change the sort of things i.e. by title, genres, word count etc.

## Content Management System

[Prismic](https://prismic.io/), a headless content management system (CMS), is used to create, manage and publish entries to the site. In Prismic, I have defined a repeatable 'post' type which includes an ID, post number, title, date written, date edited, content, description, type dropdown and tags. I've also defined a 'book_details' type, which includes information about my books such as title, genres, themes, characters, summary, word count and more. I enter this information for each piece of writing or book in Prismic where it is saved and stored. Once published, this data is then converted into JSON to be accessible in my code (with the help of Express(?)), and then displayed as HTML on my webpages.

## Deployment

The site is hosted on [Google Firebase](https://firebase.google.com/). The live site can be found on two domains, [matt-lloyd-writes.web.app](https://matt-lloyd-writes.web.app/) or [matt-lloyd-writes.firebaseapp.com](https://matt-lloyd-writes.firebaseapp.com/).

## Technologies

### Languages

- HTML5
- CSS3
- JavaScript (Node.js)

### Frameworks, Libraries, Programs, External Stylesheets etc

- [Git](https://git-scm.com/) for version control
- [GitHub](https://github.com/) to store the project repository and back up git commits
- [Bootstrap v5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/) to assist in the structure and design of the site
- [Prismic Headless CMS](https://prismic.io/) to manage my written content
- [Express JS framework](https://expressjs.com/) to connect to Prismic as well as enable page routing
- [Google Fonts](https://fonts.google.com/) for the headings, links and other text fonts
- [Justinmind](https://www.justinmind.com/) to create the wireframes

## Known Bugs

None... so far ;)

## Credits

### Code

This [stackoverflow post](https://stackoverflow.com/questions/60237167/firebase-functions-https-403-forbidden/69158098#69158098) helped fix a 403 Forbidden error when requesting my content from Prismic on the live deployed site, which was due to Firebase not automatically allowing Cloud Function invoking permissions to all users.

I used the [Express Routing docs](https://expressjs.com/en/guide/routing.html) as well as the [Prismic Express docs](https://prismic.io/docs/express-fetch) to help with setting up page routing and get requests for my posts from Prismic.

These stackoverflow posts [[1](https://stackoverflow.com/questions/4313841/insert-a-string-at-a-specific-index), [2](https://stackoverflow.com/questions/1798465/remove-last-3-characters-of-a-string)] as well as the [W3 Schools Guidance](https://www.w3schools.com/jsref/jsref_slice_string.asp) helped when I was trying to create a function to add thousand separators to large numbers.

This [stackoverflow post](https://stackoverflow.com/questions/8900732/sort-objects-in-an-array-alphabetically-on-one-property-of-the-array) helped when trying to sort an array of objects alphabetically by one of the properties.

### Content and Media

All written content on the website was written by myself.

The Google Font [Seaweed Script](https://fonts.google.com/specimen/Seaweed+Script) was used for the title, [Cinzel](https://fonts.google.com/specimen/Cinzel) for the navbar links and some sub-headings, and [Mate](https://fonts.google.com/specimen/Mate) for the body text.
