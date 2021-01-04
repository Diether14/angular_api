import UserRepository from '../repositories/user.repository.js';
import validator from 'express-validator';
const {matchedData} = validator;

const user_repository = new UserRepository();

export default {
        
    async getUsers(req,res){
        user_repository.getUsers().then(response => {
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },
    async login(req, res){
        
        // console.log(req.session)
        const validated = matchedData(req, { locations: ['body'] });
        user_repository.login(validated).then(response => {
            // req.session.user = response.data;
            // req.session.regenerate(function(err) {
                // will have a new session here
                console.log(req.rawHeaders);
                const sess= req.session
                sess.cookie.id = response.id
                sess.cookie.name= response.name 
                sess.cookie.sessionID=req.sessionID
                // response.sessionID = req.sessionID
                console.log(sess)
                res.setHeader('Set-Cookie',['sessionID',sess.cookie.sessionID]);
                // console.log()
                // res.writeHead(response.code).json(response)
                res.status(response.code).json(sess.cookie.sessionID);
                
            // })
            
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },
    async register(req, res){
        // const validated = matchedData(req, { locations: ['body'] });
        user_repository.register(req).then(response => {
            // req.session.user = response.data;
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },
    async logout(req,res){
        console.log(req)
        // req.session
    }
}