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

        console.log(req)
        // console.log(req.session)
        const validated = matchedData(req, { locations: ['body'] });
        user_repository.login(validated).then(response => {
            req.session.regenerate(function(err) {
                const sess= req.session
                sess.cookie.id = response.id
                sess.cookie.name= response.name 
                sess.cookie.sessionID=req.sessionID
                // console.log(req.session.cookie)
                // res.cookie('id',req.sessionID)
                // res.send('')
            })
            
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
        req.session.destroy(function(err) {

        })
    }
}