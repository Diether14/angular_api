import PostReportRepository from '../repositories/postreport.repository.js';
import validator from 'express-validator';
const {matchedData} =validator;

const repo = new PostReportRepository();

export default {

    //posts    

    getReportByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getReportByID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    getReportByPostID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getReportByPostID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },


    getReportByUserID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.getReportByUserID(validated).then(response => {
            // req.session.user = response.data;
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    newReport(req, res) {
        repo.newReport(req).then(response => {            
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    updateReportByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.updateReportById(validated,req).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    deleteReportByID(req, res) {
        const validated = matchedData(req, { locations: ['params'] });
        console.log({validated})
        repo.deleteReportById(validated).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    

    


}