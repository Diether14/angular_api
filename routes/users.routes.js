const express = require('express'),
    db = require('./../config/database.config'),
    router = express.Router(),
    usersTable = "users",
    ipTable = "users_ip",
    settingsTable = "users_settings",
    usersPostTable = "users_post",
    usersReportTable = "users_report"

// users
router.get('/auth', async (req, res) => {
    console.log("test")
})

router.get('/auth/:id', async (req, res) => {
    console.log(req.params.id)
    console.log("test")
})

router.post('/auth', async (req, res) => {
    console.log("test")
})

router.put('/auth/:id', async (req, res) => {
    console.log(req.params.id)
    console.log("test")
})

router.delete('/auth/:id', async (req, res) => {
    console.log("test")
})

// ip addresses
router.get('/auth/ip', async (req, res) => {
    console.log("test")
})

router.get('/auth/ip/:id', async (req, res) => {
    console.log(req.params.id)
    console.log("test")
})

router.post('/auth/ip', async (req, res) => {
    console.log("test")
})

router.put('/auth/ip/:id', async (req, res) => {
    console.log(req.params.id)
    console.log("test")
})

router.delete('/auth/ip/:id', async (req, res) => {
    console.log("test")
})

// user settings
router.get('/auth/settings', async (req, res) => {
    console.log("test")
})

router.get('/auth/settings/:id', async (req, res) => {
    console.log(req.params.id)
    console.log("test")
})

router.post('/auth/settings', async (req, res) => {
    console.log("test")
})

router.put('/auth/settings/:id', async (req, res) => {
    console.log(req.params.id)
    console.log("test")
})

router.delete('/auth/settings/:id', async (req, res) => {
    console.log("test")
})


module.exports = router