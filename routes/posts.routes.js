
import express from 'express';
import posts_controller from '../controllers/posts.controller.js';
import comments_controller from '../controllers/postcomments.controller.js'
import validator from 'express-validator';
import validate from '../services/validator.service.js';


// const express = require('express'),
//     db = require('./../config/database.config'),
//     router = express.Router(),
//     tables = {
//         postsTable: "users_posts",
//         commentsTable: "post_comments",
//         repliesTable: "post_comment_replies",
//         reportsTable: "users_reports",
//         votesTable: "users_vote",
//     }

const router  = express.Router();
const {param} = validator;
// posts
router.get('/', posts_controller.index);

router.get('/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    posts_controller.getPostByID)


router.get('/community/:com_id',validate([
    param('com_id')
        .notEmpty().withMessage('Invalid Community ID')]),
    posts_controller.getPostByComID)


router.get('/users/:user_id',validate([
    param('user_id')
        .notEmpty().withMessage('Invalid User ID')]),
    posts_controller.getPostByUserID)

router.post('/', posts_controller.newPost);

router.put('/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    posts_controller.updatePostByID)

router.delete('/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    posts_controller.deletePostByID)


// comments

router.get('/comments/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    comments_controller.getCommentByID)

router.get('/comments/post/:post_id',validate([
    param('post_id')
        .notEmpty().withMessage('Invalid ID')]),
    comments_controller.getCommentByPostID)
    
router.get('/comments/users/:user_id',validate([
    param('user_id')
        .notEmpty().withMessage('Invalid ID')]),
    comments_controller.getCommentByUserID)

router.post('/comments', comments_controller.newComment);

router.put('/comments/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    comments_controller.updateCommentByID)

router.delete('/comments/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    comments_controller.deleteCommentByID)






// comment replies
// router.get('/comments/replies/:id', async (req, res) => {
//     console.log("test")
// })

// router.get('/comments/replies/comments/:comment_id', async (req, res) => {
//     console.log("test")
// })

// router.get('/comments/replies/users/:user_id', async (req, res) => {
//     console.log("test")
// })

// router.post('/comments/replies', async (req, res) => {
//     console.log("test")
// })

// router.put('/comments/replies/:id', async (req, res) => {
//     console.log("test")
// })

// router.delete('/comments/replies/:id', async (req, res) => {
//     console.log("test")
// })


// repots
// router.get('/reports/:id', async (req, res) => {
//     console.log("test")
// })

// router.get('/reports/comments/:comment_id', async (req, res) => {
//     console.log("test")
// })

// router.get('/reports/users/:user_id', async (req, res) => {
//     console.log("test")
// })

// router.post('/reports/', async (req, res) => {
//     console.log("test")
// })

// router.put('/reports/:id', async (req, res) => {
//     console.log("test")
// })

// router.delete('/reports/:id', async (req, res) => {
//     console.log("test")
// })


// votes
// router.get('/votes/:id', async (req, res) => {
//     console.log("test")
// })

// router.get('/votes/posts/:post_id', async (req, res) => {
//     console.log("test")
// })

// router.get('/votes/users/:user_id', async (req, res) => {
//     console.log("test")
// })

// router.post('/votes', async (req, res) => {
//     console.log("test")
// })

// router.put('/votes/:id', async (req, res) => {
//     console.log("test")
// })

// router.delete('/votes/:id', async (req, res) => {
//     console.log("test")
// })



export default router