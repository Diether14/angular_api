import ChatFileRepository from '../repositories/chatfile.repository.js';
import validator from 'express-validator';
const {matchedData} =validator;
const repo = new ChatFileRepository();

export default{
    newFile(req, res) {
        // const validated = matchedData(req, { locations: ['params'] });
        return new Promise(async (resolve) => {
            await repo.newFile(req).then(response => {
                resolve(response)
            })
        })        
    },
    newFileHttp(req, res) {
        repo.newFileHttp(req).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },
    getFileByID(req, res) {
        repo.getFileByID(req).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },
}
