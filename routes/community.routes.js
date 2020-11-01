const express = require('express'),
    db = require('./../config/database.config'),
    router = express.Router(),
    tables = {
        communityTable : "community",
        categoryTable : "community_category",
        subclassTable : "community_category_subclass",
        photosTable : "community_photo",
        bannedUsersTable : "community_banned_users",
    }
    

    // community
    router.get('/community', async (req, res) => {
        console.log("test")
    })

    router.get('/community/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.post('/community', async (req, res) => {
        console.log("test")
    })

    router.put('/community/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.delete('/community/:id', async (req, res) => {
        console.log("test")
    })

    // community photos
    router.get('/community/categories', async (req, res) => {
        console.log("test")
    })

    router.get('/community/categories/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.post('/community/categories', async (req, res) => {
        console.log("test")
    })

    router.put('/community/categories/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.delete('/community/categories/:id', async (req, res) => {
        console.log("test")
    })


    // sub categories
    router.get('/community/subcategories', async (req, res) => {
        console.log("test")
    })

    router.get('/community/subcategories/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.post('/community/subcategories', async (req, res) => {
        console.log("test")
    })

    router.put('/community/subcategories/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.delete('/community/subcategories/:id', async (req, res) => {
        console.log("test")
    })


    // posts
    router.get('community/posts', async (req, res) => {
        console.log("test")
    })

    router.get('community/posts/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.post('community/posts', async (req, res) => {
        console.log("test")
    })

    router.put('community/posts/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.delete('/posts/:id', async (req, res) => {
        console.log("test")
    })

    // category settings
    router.get('/community/category/settings/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.post('/community/category/settings', async (req, res) => {
        console.log("test")
    })

    router.put('/community/category/settings/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.delete('/community/category/settings/:id', async (req, res) => {
        console.log("test")
    })


    // community users
    router.get('/community/users/:com_id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.get('/community/users/:com_id/:user_id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.post('/community/users/:com_id/:user_id', async (req, res) => {
        console.log("test")
    })

    router.put('/community/users/:com_id/:user_id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.delete('/community/users/:com_id/:user_id', async (req, res) => {
        console.log("test")
    })



    
module.exports = router