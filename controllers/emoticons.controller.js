import EmoticonRepository from '../repositories/emoticon.repository.js';
import validator from 'express-validator';
const {matchedData} =validator;

const repo = new EmoticonRepository();

export default {
    index(req, res){
        repo.index().then(response => {
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },
    
    newEmoticon(req, res){
        repo.newEmoticon(req).then(response => {
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },

    getByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getById(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    getByUserID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getByUserId(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    updateByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.updateByID(validated,req).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    deleteByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.deleteByID(validated,req).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    }
}