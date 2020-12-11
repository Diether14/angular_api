import express from 'express';
import chats_controller from '../controllers/chats.controller.js';
// import chatgroups_controller from '../controllers/chatgroups.controller.js'
import validator from 'express-validator';
import validate from '../services/validator.service.js';

const {check,param} = validator;

const router  = express.Router()

//one to one
router.get('/room/:room_id',validate([
    param('room_id')
        .notEmpty().withMessage('Invalid Room ID')]),
        chats_controller.getMessageByRoomID);

router.get('/room/:room_id/:limit',validate([
    param(['room_id','limit'])
        .notEmpty().withMessage('Invalid Room ID')]),
        chats_controller.getMessageByRoomIDLimit);

router.get('/rooms/:uid1',validate([
    param('uid1')
        .notEmpty().withMessage('Invalid User ID')]),
        chats_controller.getRoomsByUserID);

// router.post('/',chats_controller.newMessage);
router.put('/msg/:msg_id',validate([
    param('msg_id')
        .notEmpty().withMessage('Invalid Message ID')]),
        chats_controller.updateMessageByMsgID);
router.delete('/msg/:msg_id',validate([
    param('msg_id')
        .notEmpty().withMessage('Invalid Message ID')]),
        chats_controller.deleteMessageByMsgID)

router.delete('/msg/room/:room_id',validate([
    param('room_id')
        .notEmpty().withMessage('Invalid Room ID')]),
        chats_controller.deleteMessageByRoomID)

//group chat
// router.post('/creategroup',chatgroups_controller.createNewGroup);


export default router