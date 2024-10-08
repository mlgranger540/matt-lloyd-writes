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

// GET Routes for Prismic Data
app.get("/getPosts", async (req, res) => {
    const documents = await client.getAllByType("post");
    res.send(documents);
});

app.get("/getPost/post/:uid", async (req, res) => {
    const document = await client.getByUID("post", req.params.uid);
    res.send(document);
});

app.get("/getAllBookDetails", async (req, res) => {
    const documents = await client.getAllByType("book_details");
    res.send(documents);
});

exports.mlw_app = functions.https.onRequest(app);
