const connection = require('./../config/database.config')

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

    // router.get('/', async (req, res) => {
    //     connection.query("SELECT * FROM communitiy")
    // })

    router.get('/:id', async (req, res) => {
        console.log("test")
    })

    router.get('/user/:user_id', async (req, res) => {
        connection.query(`SELECT * FROM community where user_id = '${req.params.user_id}'`, (err, results, fields) => {
            if(err){
                res.send(err).status(403)
            }else{
                res.json(results).status(400)
            }
        })

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

    // categories
    router.get('/categories', async (req, res) => {
        connection.query(`SELECT * FROM community_category`, (err, results, fields) => {
            if(err){
                res.send(err).status(403)
            }else{
                res.json(results).status(400)
            }
        })
    })

    router.get('/categories/:id', async (req, res) => {
        connection.query(`SELECT * FROM community_category where id = '${req.params.community_id}'`, (err, results, fields) => {
            if(err){
                res.send(err).status(403)
            }else{
                res.json(results).status(400)
            }
        })
    })

    router.get('/categories/cid/:community_id', async (req, res) => {
        connection.query(`SELECT * FROM community_category where community_id = '${req.params.community_id}'`, (err, results, fields) => {
            if(err){
                res.send(err).status(403)
            }else{
                res.json(results).status(400)
            }
        })
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
        connection.query(`SELECT * FROM community_category_subclass`, (err, results, fields) => {
            if(err){
                res.send(err).status(403)
            }else{
                res.json(results).status(400)
            }
        })
    })

    router.get('/subcategories/catid/:category_id', async (req, res) => {
        connection.query(`SELECT * FROM community_category_subclass`, (err, results, fields) => {
            if(err){
                res.send(err).status(403)
            }else{
                res.json(results).status(400)
            }
        })
    })  

    router.get('/subcategories/:id', async (req, res) => {
        connection.query(`SELECT * FROM community_category_subclass where id = ${req.params.id}`, (err, results, fields) => {
            if(err){
                res.send(err).status(403)
            }else{
                res.json(results).status(400)
            }
        })
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
        connection.query(`SELECT * FROM users_post`, (err, results, fields) => {
            if(err){
                res.send(err).status(403)
            }else{
                res.json(results).status(400)
            }
        })
    })

    router.get('/posts/:id', async (req, res) => {
        connection.query(`SELECT * FROM users_post where id = '${req.params.id}'`, (err, results, fields) => {
            if(err){
                res.send(err).status(403)
            }else{
                res.json(results).status(400)
            }
        })
    })

    router.get('/posts/catid/:category_id', async (req, res) => {
        connection.query(`SELECT * FROM users_post where category_id = '${req.params.category_id}'`, (err, results, fields) => {
            if(err){
                res.send(err).status(403)
            }else{
                res.json(results).status(400)
            }
        })
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
        connection.query(`SELECT * FROM community_ac_settings where id = '${req.params.id}'`, (err, results, fields) => {
            if(err){
                res.send(err).status(403)
            }else{
                res.json(results).status(400)
            }
        })
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
    router.get('/users/:userd_id', async (req, res) => {
        connection.query(`SELECT * FROM users_community where user_id = '${req.params.users_id}'`, (err, results, fields) => {
            if(err){
                res.send(err).status(403)
            }else{
                res.json(results).status(400)
            }
        })
    })

    router.get('/users/cid/:community_id', async (req, res) => {
        connection.query(`SELECT * FROM users_community where community_id = '${req.params.users_id}'`, (err, results, fields) => {
            if(err){
                res.send(err).status(403)
            }else{
                res.json(results).status(400)
            }
        })
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