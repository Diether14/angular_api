const express = require('express')
const db = require('./../config/database.config')
const router = express.Router()
const tables = {
    emoticonStoreTable: "emoticon_store",
    fileTable: "emoticon_store_files"
}


    // emoticons
    router.get('/', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.get('/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.get('/users/:user_id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.get('/bundles/:bundle_id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.post('/', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.put('/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

    router.delete('/:id', async (req, res) => {
        console.log(req.params.id)
        console.log("test")
    })

module.exports = router
