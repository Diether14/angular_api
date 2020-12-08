import Repository from "./repository.js";
import ChatGroupModel from '../models/chatgroups.js'
import db from "../services/database.service.js";

export default class ChatGroupRepository extends Repository {
    constructor() {
        super();
        this.model = new ChatGroupModel();
    }

    async createNewGroup(data){
        // console.log(data.body[0].group_name)
        const group_name =data.body[0].group_name
        const creator_id = data.body[0].uid
        const q = `INSERT INTO ${this.model.table} (room_name, creator_id)
            VALUES (:group_name, :uid);`;
        const params = {
            binds: {
                group_name: group_name,
                uid: creator_id
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
                    console.log(response.data)
                    const newgroupid = response.data.insertId;
                    
                    data.body[1].forEach(uid => {
                        console.log(uid.uid)
                        const q2 =`INSERT INTO ${this.model.table2} (room_id,user_id) VALUES (:room_id, :uid)`
                        const params2 = {
                            binds:{
                                room_id: newgroupid,
                                uid: uid.uid
                            }
                        }
                        database.execute(q2,params2)
            
                    });
                    resolve({
                        // data: response.data.insertId,
                        code: 200
                    })
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

        

        
        // const q = `SELECT * FROM ${this.model.table} WHERE uid1 = :uid1 OR uid2 = :uid1`;
        // const params = {
        //     binds: {
        //         uid1: data.uid1
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
        //             resolve({
        //                 data: response.data,
        //                 code: 200,
        //                 message: "rooms fetched successfuly.",
        //             });
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
