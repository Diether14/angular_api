import Repository from "./repository.js";
import ChatModel from '../models/chat.js'
import db from "../services/database.service.js";

export default class ChatRepository extends Repository {
    constructor() {
        super();
        this.model = new ChatModel();
    }
    //websocket
    async newMessage(data){
        console.log(data)

        if(!data.body.room_id){
            const q =`INSERT INTO ${this.model.table} (uid1, uid2) 
                    SELECT * FROM (SELECT :uid1 AS id1, :uid2 AS id2) AS tmp
                    WHERE NOT EXISTS (
                        SELECT * FROM ${this.model.table} WHERE uid1 = :uid1 AND uid2 = :uid2 OR uid2 = :uid1 AND uid1 =:uid2
                    );
                    `
            const params = {
                binds: {
                    uid1: data.uid1,
                    uid2: data.uid2
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
                            data: response,
                            code: 200,
                            message: "new message created successfully",
                        });
                        const q2 = `INSERT INTO ${this.model.table2}(room_id,message,sender_id) 
                            VALUES (
                                (SELECT room_id FROM ${this.model.table} WHERE uid1 =:uid1 AND uid2 =:uid2 OR uid2 =:uid1 AND uid2 =:uid1),
                                :message,
                                :sender_id )`;
                        const params2 = {
                            binds: {
                                uid1: data.uid1,
                                uid2: data.uid2,
                                message: data.text,
                                sender_id: data.uid1
                            }
                        };
                        database
                            .execute(q2, params2)
                            .then((response) => {
                                resolve({
                                    data: response.data,
                                    code: 200,
                                    message: "new room and message created successfully",
                                });
                            })
                            .catch((err) => {
                                console.log("caught", err.message);
                                reject({
                                    data: err,
                                    code: 500,
                                    message: err.message,
                                });
                            })

                    })            
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
        const q = `INSERT INTO ${this.model.table2}(room_id,message,sender_id) 
            VALUES (:room_id,:message,:sender_id )`;
        const params = {
            binds: {
                room_id: data.room_id,
                message: data.text,
                sender_id: data.uid1
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
                        message: "new message created successfully",
                    });
                })
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
    //http
    // async newMessage(data){
    //     console.log(data)

    //     if(!data.body.room_id){
    //         const q =`INSERT INTO ${this.model.table} (uid1, uid2) 
    //                 SELECT * FROM (SELECT :uid1 AS id1, :uid2 AS id2) AS tmp
    //                 WHERE NOT EXISTS (
    //                     SELECT * FROM ${this.model.table} WHERE uid1 = :uid1 AND uid2 = :uid2 OR uid2 = :uid1 AND uid1 =:uid2
    //                 );
    //                 `
    //         const params = {
    //             binds: {
    //                 uid1: data.body.uid1,
    //                 uid2: data.body.uid2
    //             }
    //         };
    //         return new Promise(async (resolve, reject) => {
    //             const database = new db();
    //             await database.connect().catch((err) => {
    //                 console.log("caught", err.message);
    //                 reject({
    //                     data: {},
    //                     code: 500,
    //                     message: err.message,
    //                 });
    //             });
    //             database
    //                 .execute(q, params)
    //                 .then((response) => {
    //                     resolve({
    //                         data: response,
    //                         code: 200,
    //                         message: "new message created successfully",
    //                     });
    //                     const q2 = `INSERT INTO ${this.model.table2}(room_id,message,sender_id) 
    //                         VALUES (
    //                             (SELECT room_id FROM ${this.model.table} WHERE uid1 =:uid1 AND uid2 =:uid2 OR uid2 =:uid1 AND uid2 =:uid1),
    //                             :message,
    //                             :sender_id )`;
    //                     const params2 = {
    //                         binds: {
    //                             uid1: data.body.uid1,
    //                             uid2: data.body.uid2,
    //                             message: data.body.text,
    //                             sender_id: data.body.uid1
    //                         }
    //                     };
    //                     database
    //                         .execute(q2, params2)
    //                         .then((response) => {
    //                             resolve({
    //                                 data: response.data,
    //                                 code: 200,
    //                                 message: "new room and message created successfully",
    //                             });
    //                         })
    //                         .catch((err) => {
    //                             console.log("caught", err.message);
    //                             reject({
    //                                 data: err,
    //                                 code: 500,
    //                                 message: err.message,
    //                             });
    //                         })

    //                 })            
    //                 .catch((err) => {
    //                     console.log("caught", err.message);
    //                     reject({
    //                         data: err,
    //                         code: 500,
    //                         message: err.message,
    //                     });
    //                 })
    //                 .finally(() => {
    //                     database.close();
    //                 });
    //         });
    //     }
    //     const q = `INSERT INTO ${this.model.table2}(room_id,message,sender_id) 
    //         VALUES (:room_id,:message,:sender_id )`;
    //     const params = {
    //         binds: {
    //             room_id: data.body.room_id,
    //             message: data.body.text,
    //             sender_id: data.body.uid1
    //         }
    //     };
    //     return new Promise(async (resolve, reject) => {
    //         const database = new db();
    //         await database.connect().catch((err) => {
    //             console.log("caught", err.message);
    //             reject({
    //                 data: {},
    //                 code: 500,
    //                 message: err.message,
    //             });
    //         });
    //         database
    //             .execute(q, params)
    //             .then((response) => {
    //                 resolve({
    //                     data: response.data,
    //                     code: 200,
    //                     message: "new message created successfully",
    //                 });
    //             })
    //             .catch((err) => {
    //                 console.log("caught", err.message);
    //                 reject({
    //                     data: err,
    //                     code: 500,
    //                     message: err.message,
    //                 });
    //             })
    //             .finally(() => {
    //                 database.close();
    //             });
    //     });
        
    // }

    async getMessageByRoomID(data){
        console.log(data.body)
        const q = `SELECT * FROM ${this.model.table2} WHERE room_id = :room_id`;
        const params = {
            binds: {
                room_id: data.room_id
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
                        message: "messages fetched successfuly.",
                    });
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
