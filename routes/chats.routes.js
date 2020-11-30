import express from 'express';
import chats_controller from '../controllers/chats.controller.js';
import validator from 'express-validator';
import validate from '../services/validator.service.js';

const {check,param} = validator;

const router  = express.Router()

router.get('/:room_id',validate([
    param('id')
        .notEmpty().withMessage('Invalid ID')]),
        chats_controller.getMessageByRoomID)
router.post('/',chats_controller.newMessage);


export default router