import Model from './model.js';
export default class Chat extends Model {
    table = 'chat_room';
    table2 = 'chat_messages'
    constructor() {
        super();
    }

}