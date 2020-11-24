// const express = require('express')
// const db = require('./../config/database.config')
// const router = express.Router()
// import user_controller from '../controllers/users.controllers.js';



//     // emoticons
//     router.get('/',)

//     router.get('/:id', async (req, res) => {
//         console.log(req.params.id)
//         console.log("test")
//     })

//     router.get('/users/:user_id', async (req, res) => {
//         console.log(req.params.id)
//         console.log("test")
//     })

//     router.get('/bundles/:bundle_id', async (req, res) => {
//         console.log(req.params.id)
//         console.log("test")
//     })

//     router.post('/', async (req, res) => {
//         console.log(req.params.id)
//         console.log("test")
//     })

//     router.put('/:id', async (req, res) => {
//         console.log(req.params.id)
//         console.log("test")
//     })

//     router.delete('/:id', async (req, res) => {
//         console.log(req.params.id)
//         console.log("test")
//     })

// module.exports = router

import express from 'express';
import emoticons_controller from '../controllers/emoticons.controller.js';
import validator from 'express-validator';
import validate from '../services/validator.service.js';

const {check,param} = validator;
const router = express.Router();

router.get('/', emoticons_controller.index);


router.get('/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    emoticons_controller.getByID)

router.get('/users/:users_id',validate([
    param('users_id')
        .notEmpty().withMessage('Invalid ID')]),
    emoticons_controller.getByUserID)

router.post('/', emoticons_controller.newEmoticon);

router.put('/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    emoticons_controller.updateByID)

router.delete('/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    emoticons_controller.deleteByID)

export default router;