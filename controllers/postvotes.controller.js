import PostVoteRepository from '../repositories/postvote.repository.js';
import validator from 'express-validator';
const {matchedData} =validator;

const repo = new PostVoteRepository();

export default {

    //posts    

    getVoteByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getVoteByID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    getVoteByPostID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getVoteByPostID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    getVoteByUserID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getVoteByUserID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    newVote(req, res) {
        repo.newVote(req).then(response => {            
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    updateVoteByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.updateVoteById(validated,req).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    deleteVoteByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.deleteVoteById(validated).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    

    


}