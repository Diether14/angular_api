import Model from './model.js';
export default class User extends Model {
    table = 'users';
    constructor() {
        super();
    }
}