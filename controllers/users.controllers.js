import UserRepository from '../repositories/user.repository.js';
import {matchedData} from 'express-validator';

const user_repository = new UserRepository();

export default {

    getAll(req, res){
        user_repository.getAll().then(response => {
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },

    getByID(req, res){
        user_repository.getByID(req.params.id).then(response => {
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },

    login(req, res){
        const validated = matchedData(req, { locations: ['body'] });
        user_repository.login(validated).then(response => {
            req.session.user = response.data;
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },

    getWebUser(req, res, next) {
        res.status(200).json(req.session.user);
    },

    register(req, res) {
        const validated = matchedData(req, { locations: ['body'] });
        user_repository.register(validated).then(response => {
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },

    update(req, res) {
        const validated = matchedData(req, { locations: ['body', 'params'] });
        user_repository.update(validated).then(response => {
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },

    delete(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        user_repository.delete(validated).then(response => {
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },

    getSettings(req, res) {
        if(!req.session.user) {
            res.status(401).json({
                message: 'Login required',
                data: {},
                code: 401
            });
        }
        const user_id = req.session.user.id_number;
        user_repository.getSettings(user_id).then(response => {
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    }
}