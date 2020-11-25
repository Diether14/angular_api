import PostReplyRepository from '../repositories/postreply.repository.js';
import validator from 'express-validator';
const {matchedData} =validator;

const repo = new PostReplyRepository();

export default {

    //posts    

    getReplyByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getReplyByID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    getReplyByComID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getReplyByComID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    getReplyByUserID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getReplyByUserID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    newReply(req, res) {
        repo.newReply(req).then(response => {            
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    updateReplyByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.updateReplyById(validated,req).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    deleteReplyByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.deleteReplyById(validated).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    

    


}