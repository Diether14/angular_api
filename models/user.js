import Model from './model.js';
export default class User extends Model {
    table = 'users';
    user_settings_table = 'user_settings';
    constructor() {
        super();
    }

}