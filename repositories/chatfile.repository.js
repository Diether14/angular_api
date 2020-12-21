import Repository from "./repository.js";
import ChatFileModel from "../models/chatfile.js";
import ChatMessagesModel from '../models/chatmessages.js'
import db from "../services/database.service.js";

export default class ChatFileRepository extends Repository {
    constructor() {
        super();
        this.model1 = new ChatFileModel();
        this.model2 = new ChatMessagesModel();
    }
    
    
    async newFileHttp(data){
        function toBuffer(ab) {
            var buf = Buffer.alloc(ab.byteLength);
            var view = new Uint8Array(ab);
            for (var i = 0; i < buf.length; ++i) {
                buf[i] = view[i];
            }
            return buf;
        }
        var arraybuffer = new Uint8Array(JSON.parse(data.body.file)).buffer 
        // var arraybuffer = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data.body.file)));
        console.log(data.body)
        const q = `INSERT INTO ${this.model1.table}(file_name,file,file_type) VALUES (:file_name,:file,:file_type)`;
        const params = {
            binds:{
                file_name: data.body.file_name,
                file: toBuffer(arraybuffer),
                file_type: data.body.type,
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
                    
                    resolve(response);
                })
                .catch((err) => {
                    console.log("caught", err.message);
                    reject({
                        data: {},
                        code: 500,
                        message: err.message,
                    });
                })
                .finally(() => {
                    database.close();
                });
        });
    }
    async getFileByID(data){
        // console.log(data.chatfid)
        const q = `SELECT * FROM ${this.model1.table} 
        JOIN ${this.model2.table} on ${this.model1.table}.chatf_id = ${this.model2.table}.chatf_id
        WHERE ${this.model1.table}.chatf_id=:chatf_id`;
        const params = {
            binds:{
                chatf_id: data.chatfid
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
                    // console.log(JSON.stringify(response))
                    resolve(JSON.stringify(response));
                })
                .catch((err) => {
                    console.log("caught", err.message);
                    reject({
                        data: {},
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