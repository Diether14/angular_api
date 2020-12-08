import ChatGroupRepository from '../repositories/chatgroup.repository.js';
import validator from 'express-validator';
const {matchedData} =validator;
const repo = new ChatGroupRepository();

export default {

    // newMessage(req) {
    //     repo.newMessage(req)
    // },
    createNewGroup(req, res) {
        repo.createNewGroup(req).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },


}