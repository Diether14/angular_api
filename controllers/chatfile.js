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

        // console.log(res)
        
    },
}
