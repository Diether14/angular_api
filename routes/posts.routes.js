const express = require('express'),
    db = require('./../config/database.config'),
    router = express.Router(),
    tables = {
        postsTable: "users_posts",
        commentsTable: "post_comments",
        repliesTable: "post_comment_replies",
        reportsTable: "users_reports",
        votesTable: "users_vote",
    }



// posts
router.get('/posts/:id', async (req, res) => {
    console.log("test")
})

router.get('/posts/community/:com_id', async (req, res) => {
    console.log("test")
})

router.get('/posts/users/:user_id', async (req, res) => {
    console.log("test")
})

router.get('/posts', async (req, res) => {
    console.log("test")
})

router.post('/posts', async (req, res) => {
    console.log("test")
})

router.put('/posts/:id', async (req, res) => {
    console.log("test")
})

router.delete('/posts/:id', async (req, res) => {
    console.log("test")
})



// comments
router.get('/posts/comments/:id', async (req, res) => {
    console.log("test")
})

router.get('/posts/comments/post/:post_id', async (req, res) => {
    console.log("test")
})

router.get('/posts/comments/users/:user_id', async (req, res) => {
    console.log("test")
})

router.post('/posts/comments', async (req, res) => {
    console.log("test")
})

router.put('/posts/comments/:id', async (req, res) => {
    console.log("test")
})

router.delete('/posts/comments/:id', async (req, res) => {
    console.log("test")
})





// comment replies
router.get('/posts/comments/replies/:id', async (req, res) => {
    console.log("test")
})

router.get('/posts/comments/replies/comments/:comment_id', async (req, res) => {
    console.log("test")
})

router.get('/posts/comments/replies/users/:user_id', async (req, res) => {
    console.log("test")
})

router.post('/posts/comments/replies', async (req, res) => {
    console.log("test")
})

router.put('/posts/comments/replies/:id', async (req, res) => {
    console.log("test")
})

router.delete('/posts/comments/replies/:id', async (req, res) => {
    console.log("test")
})


// repots
router.get('/posts/reports/:id', async (req, res) => {
    console.log("test")
})

router.get('/posts/reports/comments/:comment_id', async (req, res) => {
    console.log("test")
})

router.get('/posts/reports/users/:user_id', async (req, res) => {
    console.log("test")
})

router.post('/posts/reports/', async (req, res) => {
    console.log("test")
})

router.put('/posts/reports/:id', async (req, res) => {
    console.log("test")
})

router.delete('/posts/reports/:id', async (req, res) => {
    console.log("test")
})


// votes
router.get('/posts/votes/:id', async (req, res) => {
    console.log("test")
})

router.get('/posts/votes/posts/:post_id', async (req, res) => {
    console.log("test")
})

router.get('/posts/votes/users/:user_id', async (req, res) => {
    console.log("test")
})

router.post('/posts/votes', async (req, res) => {
    console.log("test")
})

router.put('/posts/votes/:id', async (req, res) => {
    console.log("test")
})

router.delete('/posts/votes/:id', async (req, res) => {
    console.log("test")
})



module.exports = router