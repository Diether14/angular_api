import Repository from "./repository.js";
import ChatModel from '../models/chat.js'
import db from "../services/database.service.js";

export default class ChatRepository extends Repository {
    constructor() {
        super();
        this.model = new ChatModel();
    }

    async newMessage(data){
        console.log(data.body)
        const q =`INSERT INTO ${this.model.table} (uid1, uid2)
                SELECT * FROM (SELECT :uid as temp1, :uid2 AS temp2) AS tmp
                WHERE NOT EXISTS (
                    SELECT * FROM ${this.model.table} WHERE uid1 =:uid1 AND  uid2 =:uid2
                ) VALUES (:uid1 , :uid2) LIMIT 1; `
        // const q = `INSERT INTO ${this.model.table}(user_id,post_id,content) 
        //         VALUES (:user_id, :post_id, :content)`;
        const params = {
            binds: {
                uid1: data.body.uid1,
                uid2: data.body.uid2
            }
        };
        return new Promise(async (resolve, reject) => {
            const database = new db();
            await database.connect().catch((err) => {
                console.log("caught", err.message);
                reject({
                    data: {},
                    code: 500,
                    message: err.message,
                });
            });
            database
                .execute(q, params)
                .then((response) => {
                    resolve({
                        data: response.data,
                        code: 200,
                        message: "new room created successfully",
                    });
                })
                // .then(()=>{

                // })                
                .catch((err) => {
                    console.log("caught", err.message);
                    reject({
                        data: err,
                        code: 500,
                        message: err.message,
                    });
                })
                .finally(() => {
                    database.close();
                });
        });
    }

    
}
