const express = require('express'),
    db = require('./../config/database.config'),
    router = express.Router(),
    usersTable = "users",
    ipTable = "users_ip",
    settingsTable = "users_settings",
    usersPostTable = "users_post",
    usersReportTable = "users_report"

// users
router.get('/', async (req, res) => {
    console.log("test")
})

router.get('/:id', async (req, res) => {
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

// ip addresses
router.get('/ip', async (req, res) => {
    console.log("test")
})

router.get('/ip/:id', async (req, res) => {
    console.log(req.params.id)
    console.log("test")
})

router.post('/ip', async (req, res) => {
    console.log("test")
})

router.put('/ip/:id', async (req, res) => {
    console.log(req.params.id)
    console.log("test")
})

router.delete('/auth/ip/:id', async (req, res) => {
    console.log("test")
})

// user settings
router.get('/settings', async (req, res) => {
    console.log("test")
})

router.get('/settings/:id', async (req, res) => {
    console.log(req.params.id)
    console.log("test")
})

router.post('/settings', async (req, res) => {
    console.log("test")
})

router.put('/settings/:id', async (req, res) => {
    console.log(req.params.id)
    console.log("test")
})

router.delete('/settings/:id', async (req, res) => {
    console.log("test")
})


module.exports = router