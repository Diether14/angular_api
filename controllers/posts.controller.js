import PostsRepository from '../repositories/posts.repository.js';
import validator from 'express-validator';
const {matchedData} =validator;

const repo = new PostsRepository();

export default {

    //posts
    index(req, res){
        repo.index().then(response => {
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },
    

    getPostByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getPostById(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    getPostByComID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getPostByComID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    getPostByUserID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getPostByUserID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    newPost(req, res) {
        repo.newPost(req).then(response => {            
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    updatePostByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.updatePostById(validated,req).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    deletePostByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.deletePostById(validated).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    

    


}