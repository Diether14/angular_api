// import UserController from '../controllers/users.controllers';
// const express = require('express'),
//     db = require('./../config/database.config'),
//     router = express.Router(),
//     usersTable = "users",
//     ipTable = "users_ip",
//     settingsTable = "users_settings",
//     usersPostTable = "users_post",
//     usersReportTable = "users_report"
// router.route('/test').get(UserController.test);
// // users
// router.get('/', async (req, res) => {
//     console.log("test")
// })

// router.get('/:id', async (req, res) => {
//     console.log(req.params.id)
//     console.log("test")
// })

// router.post('/', async (req, res) => {
//     console.log("test")
// })

// router.put('/:id', async (req, res) => {
//     console.log(req.params.id)
//     console.log("test")
// })

// router.delete('/:id', async (req, res) => {
//     console.log("test")
// })

// // ip addresses
// router.get('/ip', async (req, res) => {
//     console.log("test")
// })

// router.get('/ip/:id', async (req, res) => {
//     console.log(req.params.id)
//     console.log("test")
// })

// router.post('/ip', async (req, res) => {
//     console.log("test")
// })

// router.put('/ip/:id', async (req, res) => {
//     console.log(req.params.id)
//     console.log("test")
// })

// router.delete('/auth/ip/:id', async (req, res) => {
//     console.log("test")
// })

// // user settings
// router.get('/settings', async (req, res) => {
//     console.log("test")
// })

// router.get('/settings/:id', async (req, res) => {
//     console.log(req.params.id)
//     console.log("test")
// })

// router.post('/settings', async (req, res) => {
//     console.log("test")
// })

// router.put('/settings/:id', async (req, res) => {
//     console.log(req.params.id)
//     console.log("test")
// })

// router.delete('/settings/:id', async (req, res) => {
//     console.log("test")
// })


// module.exports = router

import express from 'express';
import user_controller from '../controllers/users.controllers.js';
import validator from 'express-validator';
import validate from '../services/validator.service.js';
const router = express.Router();
const {check} = validator;
router.post('/login', validate([
        check('username')
            .notEmpty().withMessage('The username field is required')
            .isEmail().withMessage('The username field should be an email'),
        check('password')
            .isLength({min: 8}).withMessage('The password field should be atleast 8 characters')
    ]), user_controller.login);
router.post('/register', user_controller.register);
router.get('/userlist', user_controller.getUsers);

export default router;