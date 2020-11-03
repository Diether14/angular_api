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
router.get('/:id', async (req, res) => {
    console.log("test")
})

router.get('/community/:com_id', async (req, res) => {
    console.log("test")
})

router.get('/users/:user_id', async (req, res) => {
    console.log("test")
})

router.get('/', async (req, res) => {
    console.log("test")
})

router.post('/', async (req, res) => {
    console.log("test")
})

router.put('/:id', async (req, res) => {
    console.log("test")
})

router.delete('/:id', async (req, res) => {
    console.log("test")
})



// comments
router.get('/comments/:id', async (req, res) => {
    console.log("test")
})

router.get('/comments/post/:post_id', async (req, res) => {
    console.log("test")
})

router.get('/comments/users/:user_id', async (req, res) => {
    console.log("test")
})

router.post('/comments', async (req, res) => {
    console.log("test")
})

router.put('/comments/:id', async (req, res) => {
    console.log("test")
})

router.delete('/comments/:id', async (req, res) => {
    console.log("test")
})





// comment replies
router.get('/comments/replies/:id', async (req, res) => {
    console.log("test")
})

router.get('/comments/replies/comments/:comment_id', async (req, res) => {
    console.log("test")
})

router.get('/comments/replies/users/:user_id', async (req, res) => {
    console.log("test")
})

router.post('/comments/replies', async (req, res) => {
    console.log("test")
})

router.put('/comments/replies/:id', async (req, res) => {
    console.log("test")
})

router.delete('/comments/replies/:id', async (req, res) => {
    console.log("test")
})


// repots
router.get('/reports/:id', async (req, res) => {
    console.log("test")
})

router.get('/reports/comments/:comment_id', async (req, res) => {
    console.log("test")
})

router.get('/reports/users/:user_id', async (req, res) => {
    console.log("test")
})

router.post('/reports/', async (req, res) => {
    console.log("test")
})

router.put('/reports/:id', async (req, res) => {
    console.log("test")
})

router.delete('/reports/:id', async (req, res) => {
    console.log("test")
})


// votes
router.get('/votes/:id', async (req, res) => {
    console.log("test")
})

router.get('/votes/posts/:post_id', async (req, res) => {
    console.log("test")
})

router.get('/votes/users/:user_id', async (req, res) => {
    console.log("test")
})

router.post('/votes', async (req, res) => {
    console.log("test")
})

router.put('/votes/:id', async (req, res) => {
    console.log("test")
})

router.delete('/votes/:id', async (req, res) => {
    console.log("test")
})



module.exports = router