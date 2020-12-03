import express from 'express';
import chats_controller from '../controllers/chats.controller.js';
import validator from 'express-validator';
import validate from '../services/validator.service.js';

const {check,param} = validator;

const router  = express.Router()

router.get('/room/:room_id',validate([
    param('room_id')
        .notEmpty().withMessage('Invalid Room ID')]),
        chats_controller.getMessageByRoomID);

router.get('/rooms/:uid1',validate([
    param('uid1')
        .notEmpty().withMessage('Invalid Room ID')]),
        chats_controller.getRoomsByUserID);

router.post('/',chats_controller.newMessage);


export default router