import Model from './model.js';
export default class ChatGroups extends Model {
    table = 'chat_groups';
    table2 = 'chat_participants'
    table3 = 'chat_messages'
    constructor() {
        super();
    }

}