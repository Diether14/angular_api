import UserSettingRepository from '../repositories/user.repository.js';
import {matchedData} from 'express-validator';

const repo = new UserSettingRepository();

export default {

    index(req, res) {
        if(!req.session.user) {
            res.status(401).json({
                message: 'Login required',
                data: {},
                code: 401
            });
        }
        const user_id = req.session.user.id_number;
        repo.getSettings(user_id).then(response => {
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },

    update(req, res) {
        const validated = matchedData(req, { locations: ['body'] });
        repo.update(validated).then(response => {
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },
}