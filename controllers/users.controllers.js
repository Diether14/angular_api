import UserRepository from '../repositories/user.repository.js';
import validator from 'express-validator';
// import cryptoService from '../services/crypto.service.js'

import cryptoService from '../services/crypto.service.js'
const {matchedData} = validator;

const user_repository = new UserRepository();
// const crypto = new cryptoService; 
export default {
       
    async getUsers(req,res){
        user_repository.getUsers().then(response => {
            res.status(response.code).json(response);
        }).catch(err => {
            res.status(err.code).json(err);
        });
    },
    async login(req, res){

        // console.log(req)
        // console.log(req)

        const validated = matchedData(req, { locations: ['body'] });
        user_repository.login(validated).then(response => {
            // const test = crypto.encrypt(response.id)
            // console.log(test)
            req.session.regenerate(function(err) {
                const sess= req.session
                sess.cookie.id = response.id
                sess.cookie.name= response.name 
                sess.cookie.sessionID=req.sessionID
                console.log(response.code)
                // res.cookie('isLogin',1)
                // res.cookie('nm',response.name)
                // res.cookie('id',window.btoa(response.id))
                res.status(response.code)
                    .cookie('isLogin',1)
                    .cookie('nm',response.name)
                    .cookie('id',response.id)
                    .json(response)
            })
            req.session.save(function (err) {
                
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
        console.log(req.cookie)
        req.session.destroy(function(err) {

            res.status(200)
        })
        
    }
}