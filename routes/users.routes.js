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

import express, { request } from 'express';
import user_controller from '../controllers/users.controllers.js';
import {check} from 'express-validator';
import ValidatorService from '../services/validator.service.js';
const router = express.Router();
const validator = new ValidatorService()

router.post('/login', validator.validate([
        check('username')
            .notEmpty().withMessage('The username field is required')
            .isEmail().withMessage('The username field should be an email'),
        check('password')
            .notEmpty().withMessage('The password field is required')
            .isLength({min: 8}).withMessage('The password field should be atleast 8 characters')
    ]), user_controller.login);

router.get('/web-user', user_controller.getWebUser)

router.post('/register', validator.validate([
    check('birthdate')
        .notEmpty().withMessage('The birthdate field is required'),
    check('gender')
        .notEmpty().withMessage('The gender field is required'),
    check('nickname')
        .notEmpty().withMessage('The nickname field is required')
        .isLength({min: 8, max:20}).withMessage('The nickname field should be atleast 8 characters and not exceed 20 characters'),
    check('email')
        .notEmpty().withMessage('The email field is required')
        .isLength({min: 8, max:50}).withMessage('The email field should be atleast 8 characters and not exceed 50 characters')
        .custom(value => {return validator.unique(value, 'users.email')}),
    check('password')
        .notEmpty().withMessage('The password field is required')
        .isLength({min: 8}).withMessage('The password field should be atleast 8 characters')
        .custom(value => {return validator.strong(value)}),
    check('confirm_password')
        .custom((value, {req}) => {return validator.matches(value, {field: 'password' ,value: req})}),
]), user_controller.register)

export default router;