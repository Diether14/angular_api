const express = require('express')
const db = require('./../config/database.config')
const router = express.Router()
const table = "notifications"

router.get('/', async (req, res) => {
    try{
        await res.json({
            message: "success!",
        }).status(400)
    }catch(err){
        console.log(err)
    }
})

router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    console.log("test")
})

router.get('/sender/:id', async (req, res) => {
    console.log(req.params.id)
    console.log("test")
})

router.get('/receiver/:id', async (req, res) => {
    console.log(req.params.id)
    console.log("test")
})

router.get('/type/:id', async (req, res) => {
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

module.exports = router