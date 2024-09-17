# Matt Lloyd Writes Website

Matt Lloyd Writes is an author website for me to post pieces of my writing such as short stories, excerpts from my books, and poems, as well as an author profile and information about my upcoming books so my readers can find out more about me and my work.

## Design

## Features

### Features to Add

## Content Management System

[Prismic](https://prismic.io/), a headless content management system (CMS), is used to create, manage and publish entries to the site. In Prismic I have defined a repeatable type which includes an ID number, title, content, date written, type dropdown and tags. I enter this information for each piece of writing in Prismic where it is saved and stored. Once published, this data is then converted into JSON to be accessible in my code, and then displayed as HTML on my webpages.

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
- [Google Fonts](https://fonts.google.com/) for the headings, links and other text fonts
- [Justinmind](https://www.justinmind.com/) to create the wireframes

## Known Bugs

None... so far ;)

## Credits

### Code

This [stackoverflow post](https://stackoverflow.com/questions/60237167/firebase-functions-https-403-forbidden/69158098#69158098) helped fix a 403 Forbidden error when requesting my content from Prismic on the live deployed site, which was due to Firebase not automatically allowing Cloud Function invoking permissions to all users.

### Content and Media

All written content on the website was written by myself.

The Google Font [Seaweed Script](https://fonts.google.com/specimen/Seaweed+Script) was used for the title, [Cinzel](https://fonts.google.com/specimen/Cinzel) for the navbar links and some sub-headings, and [Mate](https://fonts.google.com/specimen/Mate) for the body text.
