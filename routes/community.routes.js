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
    router.get('/', async (req, res) => {
        console.log("community test")
    })

    router.get('//:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.post('/', async (req, res) => {
        console.log("test")
    })

    router.put('/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.delete('/:id', async (req, res) => {
        console.log("test")
    })

    // community photos
    router.get('/categories', async (req, res) => {
        console.log("test")
    })

    router.get('/categories/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.post('/categories', async (req, res) => {
        console.log("test")
    })

    router.put('/categories/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.delete('/categories/:id', async (req, res) => {
        console.log("test")
    })


    // sub categories
    router.get('/subcategories', async (req, res) => {
        console.log("test")
    })

    router.get('/subcategories/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.post('/subcategories', async (req, res) => {
        console.log("test")
    })

    router.put('/subcategories/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.delete('/subcategories/:id', async (req, res) => {
        console.log("test")
    })


    // posts
    router.get('/posts', async (req, res) => {
        console.log("test")
    })

    router.get('/posts/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.post('/posts', async (req, res) => {
        console.log("test")
    })

    router.put('/posts/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.delete('/posts/:id', async (req, res) => {
        console.log("test")
    })

    // category settings
    router.get('/category/settings/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.post('/category/settings', async (req, res) => {
        console.log("test")
    })

    router.put('/category/settings/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.delete('/category/settings/:id', async (req, res) => {
        console.log("test")
    })


    // community users
    router.get('/users/:com_id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.get('/users/:com_id/:user_id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.post('/users/:com_id/:user_id', async (req, res) => {
        console.log("test")
    })

    router.put('/users/:com_id/:user_id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.delete('/users/:com_id/:user_id', async (req, res) => {
        console.log("test")
    })



    
module.exports = router