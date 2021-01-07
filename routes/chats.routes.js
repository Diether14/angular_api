import express from 'express';
import chats_controller from '../controllers/chats.controller.js';
import chatfile_controller from '../controllers/chatfile.controller.js'
import validator from 'express-validator';
import validate from '../services/validator.service.js';
import user_session from '../services/session.service.js';

const {check,param} = validator;

const router  = express.Router()
router.use(user_session)
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

router.get('/participants/:room_id',validate([
    param('room_id')
        .notEmpty().withMessage('Invalid Room ID')]),
        chats_controller.getParticipantsByRoomID);

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

router.post('/file',chatfile_controller.newFileHttp)
router.get('/file/:chatfid',validate([
    param('chatfid')
        .notEmpty().withMessage('Invalid File ID')]),
        chatfile_controller.getFileByID);


export default router