import express, { request } from 'express';
import controller from '../controllers/user_settings.controller.js';
import {check, param} from 'express-validator';
import ValidatorService from '../services/validator.service.js';
const router = express.Router();
const validator = new ValidatorService()

router.get('/', controller.index);

router.post('/update', validator.validate([
    check('user_mode')
        .notEmpty().withMessage('The user mode field is required'),
    check('user_nickname')
        .notEmpty().withMessage('The user nickname field is required')
]), controller.update);

router.post('/delete/:id', validator.validate([
    param('id')
        .notEmpty().withMessage('Invalid ID number.')
]), controller.delete);

router.post('/update/:id', validator.validate([
    param('id')
        .notEmpty().withMessage('Invalid ID number.'),
    check('user_mode')
        .notEmpty().withMessage('The user mode field is required'),
    check('user_nickname')
        .notEmpty().withMessage('The user nickname field is required')
]), controller.update);
export default router;