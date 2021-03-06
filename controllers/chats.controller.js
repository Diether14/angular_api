import ChatRepository from '../repositories/chat.repository.js';
import validator from 'express-validator';
const {matchedData} =validator;
const repo = new ChatRepository();

export default {
    //websocket
    newMessage(req) {
        repo.newMessage(req)
    },
    createNewGroup(req) {
        repo.createNewGroup(req);
    },
    updateTime(req) {
        repo.updateTime(req);
    },
    
    getRoomsByUserID(req, res) {
        // const validated = matchedData(req, { locations: ['params'] });
        return new Promise(async (resolve) => {
            await repo.getRoomsByUserID(req).then(response => {
                resolve(response)
                  
            })
        })
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
    getParticipantsByRoomID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getParticipantsByRoomID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    getMessageByRoomIDLimit(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getMessageByRoomIDLimit(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    updateMessageByMsgID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.updateMessageByMsgID(validated,req).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },
    deleteMessageByMsgID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.deleteMessageByMsgID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    deleteMessageByRoomID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.deleteMessageByRoomID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },
}