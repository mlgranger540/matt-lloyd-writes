/* eslint-disable no-undef */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const express = require("express");
const prismic = require("@prismicio/client");
const fetch =  (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const repoName = 'matt-lloyd-writes' // Fill in your repository name.
const accessToken = '' // If your repository is private, add an access token.

// The `routes` property is your route resolver. It defines how you will 
// structure URLs in your project. Update the types to match the Custom 
// Types in your project, and edit the paths to match the routing in your 
// project.
const routes = [
    {
        type: 'post',
        path: '/:uid',
    },
]

const client = prismic.createClient(repoName, { 
    fetch, 
    accessToken,
    routes,
})

const app = express();

// Add a middleware function that runs on every route. It will inject 
// the prismic context to the locals so that we can access these in 
// our templates.
app.use((req, res, next) => {
    res.locals.ctx = {
        prismic,
    };
    next();
});

// Page Routes
app.get("/", (req, res) => {
    res.sendFile("index.html", {root : __dirname + "/../public/"});
});

app.get("/writing", (req, res) => {
    res.sendFile("writing.html", {root : __dirname + "/../public/"});
});

app.get("/my-books", (req, res) => {
    res.sendFile("my-books.html", {root : __dirname + "/../public/"});
});

app.get("/about-the-author", (req, res) => {
    res.sendFile("about.html", {root : __dirname + "/../public/"});
});

app.get("/stats-for-nerds", (req, res) => {
    res.sendFile("stats.html", {root : __dirname + "/../public/"});
});

app.get("/post/:uid", (req, res) => {
    res.sendFile("post.html", {root : __dirname + "/../public/"});
});

app.get("/book/:uid", (req, res) => {
    res.sendFile("book.html", {root : __dirname + "/../public/"});
});

// GET Routes for Prismic Data
// Get all posts sorted alphabetically
app.get("/getAllPosts", async (req, res) => {
    const documents = await client.getAllByType("post", {
        orderings: [
            {field: "my.post.title"}
        ]
    });
    res.send(documents);
});

// Get all posts sorted by date written (newest first), then title (reverse alphabetical)
app.get("/getRecentPosts", async (req, res) => {
    const documents = await client.getAllByType("post", {
        orderings: [
            {field: "my.post.date_written", direction: "desc"},
            {field: "my.post.title", direction: "desc"}
        ]
    });
    res.send(documents);
});

// Get single post by UID
app.get("/getPost/post/:uid", async (req, res) => {
    const document = await client.getByUID("post", req.params.uid);
    res.send(document);
});

// Get all books
app.get("/getAllBooks", async (req, res) => {
    const documents = await client.getAllByType("book");
    res.send(documents);
});

// Get all standalone books sorted by title
app.get("/getAllStandaloneBooks", async (req, res) => {
    const documents = await client.getAllByType("book", {
        filters: [
            prismic.filter.at("my.book.series", "No Series"),
        ],
        orderings: [
            {field: "my.book.book_title"}
        ]
    });
    res.send(documents);
});

// Get all series sorted by series name and then book number
app.get("/getAllSeries", async (req, res) => {
    const documents = await client.getAllByType("book", {
        filters: [
            prismic.filter.not("my.book.series", "No Series"),
        ],
        orderings: [
            {field: "my.book.series"},
            {field: "my.book.book_number"}
        ]
    });
    res.send(documents);
});

// Get single book by UID
app.get("/getBook/book/:uid", async (req, res) => {
    const document = await client.getByUID("book", req.params.uid);
    res.send(document);
});

// Get about info
app.get("/getAboutInfo/about_info/:uid", async (req, res) => {
    const document = await client.getByUID("about_info", req.params.uid);
    const intro = prismic.asHTML(document.data.intro);
    const content1 = prismic.asHTML(document.data.content_1);
    res.send({document, intro, content1});
});

exports.mlw_app = functions.https.onRequest(app);
