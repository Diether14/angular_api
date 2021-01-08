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
        const validated = matchedData(req, { locations: ['body'] });
        user_repository.login(validated).then(response => {
            //logs session to mysql
            req.session.regenerate(function(err) {
                const sess= req.session
                sess.cookie.id = response.id
                sess.cookie.name= response.name 
                sess.cookie.sessionID=req.sessionID
                console.log(response.code)
                res.status(response.code)
                    .cookie('isLogin',1)
                    .cookie('nm',response.name)
                    .cookie('id',response.id)
                    .json(response)
            })
            
        }).catch(err => {
            res.status(err.code).json(err);
        });
        
    },
    async register(req, res){
        user_repository.register(req).then(response => {
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },
    async logout(req,res){
        //remove session from mysql
        req.session.destroy(function(err) {
            res.status(200)
        })
        
    }
}