import ChatRepository from '../repositories/chat.repository.js';
import validator from 'express-validator';
const {matchedData} =validator;
const repo = new ChatRepository();

export default {

    newMessage(req) {
        repo.newMessage(req)
    },

    getRoomsByUserID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getRoomsByUserID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    getMessageByRoomID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getMessageByRoomID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },
}