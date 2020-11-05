import UserRepository from '../repositories/user.repository.js';
import {matchedData} from 'express-validator';

const user_repository = new UserRepository();

export default {
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
    }
}