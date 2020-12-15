import Repository from "./repository.js";
import ChatFileModel from "../models/chatfile.js";
import db from "../services/database.service.js";

export default class ChatFileRepository extends Repository {
    constructor() {
        super();
        this.model = new ChatFileModel();
    }
    
    async newFile(data){
        console.log(data)
        // const q = `INSERT INTO ${this.model.table}(file) VALUES :file`;
        // const params = {
        //     binds:{
        //         file: data.file
        //     }
        // };
        // return new Promise(async (resolve, reject) => {
        //     const database = new db();
        //     await database.connect().catch((err) => {
        //         console.log("caught", err.message);
        //         reject({
        //             data: {},
        //             code: 500,
        //             message: err.message,
        //         });
        //     });
        //     database
        //         .execute(q, params)
        //         .then((response) => {
        //             resolve(response);
        //         })
        //         .catch((err) => {
        //             console.log("caught", err.message);
        //             reject({
        //                 data: {},
        //                 code: 500,
        //                 message: err.message,
        //             });
        //         })
        //         .finally(() => {
        //             database.close();
        //         });
        // });
    }
}