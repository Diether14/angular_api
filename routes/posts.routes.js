
import express from 'express';
import posts_controller from '../controllers/posts.controller.js';
import comments_controller from '../controllers/postcomments.controller.js'
import replies_controller from '../controllers/postreplies.controller.js'
import report_controller from '../controllers/postreports.controller.js'
import votes_controller from '../controllers/postvotes.controller.js'
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
        .notEmpty().withMessage('Invalid Post ID')]),
    comments_controller.getCommentByPostID)
    
router.get('/comments/users/:user_id',validate([
    param('user_id')
        .notEmpty().withMessage('Invalid User ID')]),
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

router.get('/comments/replies/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    replies_controller.getReplyByID)

router.get('/comments/replies/comments/:comment_id',validate([
    param('comment_id')
        .notEmpty().withMessage('Invalid Comment ID')]),
    replies_controller.getReplyByComID)

router.get('/comments/replies/users/:user_id',validate([
    param('user_id')
        .notEmpty().withMessage('Invalid User ID')]),
    replies_controller.getReplyByUserID)

router.post('/comments/replies', replies_controller.newReply);

router.put('/comments/replies/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    replies_controller.updateReplyByID)

router.delete('/comments/replies/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    replies_controller.deleteReplyByID)



// reports

router.get('/reports/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    report_controller.getReportByID)

router.get('/reports/posts/:post_id',validate([
    param('post_id')
        .notEmpty().withMessage('Invalid Post ID')]),
    report_controller.getReportByPostID)

router.get('/reports/users/:user_id',validate([
    param('user_id')
        .notEmpty().withMessage('Invalid User ID')]),
    report_controller.getReportByUserID)

router.post('/reports', report_controller.newReport);

router.put('/reports/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    report_controller.updateReportByID)

router.delete('/reports/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    report_controller.deleteReportByID)



// votes

router.get('/votes/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    votes_controller.getVoteByID)

router.get('/votes/posts/:post_id',validate([
    param('post_id')
        .notEmpty().withMessage('Invalid Post ID')]),
    votes_controller.getVoteByPostID)

router.get('/votes/users/:user_id',validate([
    param('user_id')
        .notEmpty().withMessage('Invalid User ID')]),
    votes_controller.getVoteByUserID)

router.post('/votes', votes_controller.newVote);

router.put('/votes/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    votes_controller.updateVoteByID)

router.delete('/votes/:id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
    votes_controller.deleteVoteByID)

export default router